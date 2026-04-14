/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║   DOANVAN — MULTI-TENANT & SHARED GOOGLE SHEET SYSTEM  v1.0               ║
 * ║                                                                              ║
 * ║  KIẾN TRÚC:                                                                 ║
 * ║  ┌─────────────────────────────────────────────────────────────────┐        ║
 * ║  │ ADMIN (lần đầu) → Cấu hình GSheet trung tâm → Tạo Invite Code │        ║
 * ║  │       ↓                                                          │        ║
 * ║  │ USERS (PC/Mobile) → Nhập Invite Code → Kết nối GSheet chung   │        ║
 * ║  │       ↓                                                          │        ║
 * ║  │ GSheet cấu trúc:                                                │        ║
 * ║  │   Sheet "system_users"  → danh sách tài khoản + quyền          │        ║
 * ║  │   Sheet "docs"          → văn bản (có cột org_id để lọc)        │        ║
 * ║  │   Sheet "members"       → đoàn viên (có cột org_id)             │        ║
 * ║  │   Sheet "reminders"     → nhắc nhở                              │        ║
 * ║  │   Sheet "tasks"         → công việc                             │        ║
 * ║  │   Sheet "organizations" → danh sách cơ sở đoàn                 │        ║
 * ║  │   Sheet "system_meta"   → cấu hình hệ thống                    │        ║
 * ║  └─────────────────────────────────────────────────────────────────┘        ║
 * ║                                                                              ║
 * ║  PHÂN QUYỀN:                                                                ║
 * ║    admin      → Xem/Sửa/Xóa toàn bộ, quản lý người dùng                   ║
 * ║    manager    → Xem/Sửa toàn bộ org của mình, thêm thành viên              ║
 * ║    member     → Chỉ xem/nhập dữ liệu org của mình                          ║
 * ║                                                                              ║
 * ║  PC ↔ MOBILE:                                                               ║
 * ║    Mỗi thiết bị dùng chung 1 GSheet → auto sync 2 chiều                   ║
 * ║    Mobile chỉ cần nhập Invite Code (không cần Service Account JSON)         ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

'use strict';

// ─────────────────────────────────────────────────────────────────────
//  CONSTANTS
// ─────────────────────────────────────────────────────────────────────
const MT_STORE    = 'doanvan_mt_config';     // localStorage key lưu cấu hình tenant
const MT_SESSION  = 'doanvan_mt_session';    // sessionStorage key phiên đăng nhập
const MT_VERSION  = '1.0.0';

const MT_ROLES = {
  admin:   { label: 'Quản trị viên', icon: 'fa-shield-alt',   color: '#c0392b' },
  manager: { label: 'Quản lý',       icon: 'fa-user-tie',     color: '#1a2340' },
  member:  { label: 'Đoàn viên',     icon: 'fa-user',         color: '#6b7280' },
};

const SHEETS_API   = 'https://sheets.googleapis.com/v4/spreadsheets';
const TOKEN_EP     = 'https://oauth2.googleapis.com/token';
const SCOPE        = 'https://www.googleapis.com/auth/spreadsheets';

// Sheet names trong GSheet trung tâm
const SH = {
  USERS:  'system_users',
  ORGS:   'organizations',
  META:   'system_meta',
  DOCS:   'docs',
  MEMBERS:'members',
  REMIND: 'reminders',
  TASKS:  'tasks',
};

// ─────────────────────────────────────────────────────────────────────
//  A. CONFIG STORE — Quản lý cấu hình local
// ─────────────────────────────────────────────────────────────────────
const MTConfig = {
  get() {
    try { return JSON.parse(localStorage.getItem(MT_STORE) || 'null'); }
    catch { return null; }
  },
  save(cfg) {
    localStorage.setItem(MT_STORE, JSON.stringify({ ...cfg, _v: MT_VERSION, _ts: Date.now() }));
  },
  clear() { localStorage.removeItem(MT_STORE); },

  isAdmin()    { return this.get()?.role === 'admin'; },
  isManager()  { const r = this.get()?.role; return r === 'admin' || r === 'manager'; },
  getOrgId()   { return this.get()?.orgId || null; },
  getRole()    { return this.get()?.role || 'member'; },
  getUser()    { return this.get()?.user || null; },
  isConfigured(){ return !!this.get()?.spreadsheetId; },
};

// ─────────────────────────────────────────────────────────────────────
//  B. TOKEN MANAGER — Google Service Account JWT
// ─────────────────────────────────────────────────────────────────────
const MTToken = {
  _cache: null, _expiry: 0,

  async get(serviceAccountJson, force = false) {
    if (!force && this._cache && Date.now() < this._expiry) return this._cache;

    const sa = typeof serviceAccountJson === 'string'
      ? JSON.parse(serviceAccountJson) : serviceAccountJson;

    const now = Math.floor(Date.now() / 1000);
    const hdr  = { alg: 'RS256', typ: 'JWT' };
    const pay  = { iss: sa.client_email, scope: SCOPE, aud: TOKEN_EP, exp: now + 3600, iat: now };
    const b64  = o => btoa(JSON.stringify(o)).replace(/=/g,'').replace(/\+/g,'-').replace(/\//g,'_');
    const unsigned = `${b64(hdr)}.${b64(pay)}`;

    const pemBody  = sa.private_key.replace(/-----[^-]+-----/g,'').replace(/\s/g,'');
    const keyBuf   = Uint8Array.from(atob(pemBody), c => c.charCodeAt(0));
    const cryptoKey = await crypto.subtle.importKey(
      'pkcs8', keyBuf, { name:'RSASSA-PKCS1-v1_5', hash:'SHA-256' }, false, ['sign']
    );
    const sig = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', cryptoKey, new TextEncoder().encode(unsigned));
    const jwt = `${unsigned}.${btoa(String.fromCharCode(...new Uint8Array(sig))).replace(/=/g,'').replace(/\+/g,'-').replace(/\//g,'_')}`;

    const resp = await fetch(TOKEN_EP, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`,
    });
    if (!resp.ok) throw new Error('Lỗi lấy token: ' + await resp.text());
    const data = await resp.json();
    this._cache  = data.access_token;
    this._expiry = Date.now() + (data.expires_in - 60) * 1000;
    return this._cache;
  },

  invalidate() { this._cache = null; this._expiry = 0; },
};

// ─────────────────────────────────────────────────────────────────────
//  C. SHEETS HELPER — CRUD đơn giản
// ─────────────────────────────────────────────────────────────────────
const SheetsAPI = {
  async _token() {
    const cfg = MTConfig.get();
    if (!cfg?.serviceAccountJson) throw new Error('Chưa có Service Account JSON');
    return MTToken.get(cfg.serviceAccountJson);
  },

  async read(sid, range) {
    const token = await this._token();
    const resp  = await fetch(`${SHEETS_API}/${sid}/values/${encodeURIComponent(range)}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (resp.status === 400) {
      // Sheet chưa tồn tại — trả về mảng rỗng thay vì throw
      return [];
    }
    if (!resp.ok) throw new Error(`Đọc sheet lỗi (${resp.status})`);
    const d = await resp.json();
    return d.values || [];
  },

  async batchRead(sid, ranges) {
    const token = await this._token();
    const qs    = ranges.map(r => `ranges=${encodeURIComponent(r)}`).join('&');
    const resp  = await fetch(`${SHEETS_API}/${sid}/values:batchGet?${qs}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (resp.status === 400) return ranges.map(() => []); // Sheet chưa tồn tại
    if (!resp.ok) throw new Error(`Batch read lỗi (${resp.status})`);
    const d = await resp.json();
    return (d.valueRanges || []).map(vr => vr.values || []);
  },

  async write(sid, range, values) {
    const token = await this._token();
    // values must be 2D array; if caller passes [['']] to clear, ensure it's valid
    const safeValues = (values && values.length && Array.isArray(values[0])) ? values : [values];
    const resp  = await fetch(
      `${SHEETS_API}/${sid}/values/${encodeURIComponent(range)}?valueInputOption=RAW`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ range, values: safeValues }),
    });
    if (!resp.ok) {
      const errText = await resp.text();
      throw new Error(`Ghi sheet lỗi (${resp.status}): ${errText}`);
    }
    return resp.json();
  },

  async append(sid, range, values) {
    const token = await this._token();
    const resp  = await fetch(
      `${SHEETS_API}/${sid}/values/${encodeURIComponent(range)}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ values }),
    });
    if (!resp.ok) throw new Error(`Append sheet lỗi (${resp.status})`);
    return resp.json();
  },

  async batchUpdate(sid, data) {
    const token = await this._token();
    const resp  = await fetch(`${SHEETS_API}/${sid}/values:batchUpdate`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ valueInputOption: 'RAW', data }),
    });
    if (!resp.ok) throw new Error(`Batch update lỗi (${resp.status})`);
    return resp.json();
  },

  async batchClear(sid, ranges) {
    const token = await this._token();
    const resp  = await fetch(`${SHEETS_API}/${sid}/values:batchClear`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ ranges }),
    });
    if (!resp.ok) throw new Error(`Batch clear lỗi (${resp.status})`);
  },

  // Parse rows → array of objects
  parseSheet(rows) {
    if (!rows || rows.length < 2) return [];
    const headers = rows[0];
    return rows.slice(1)
      .map(row => {
        const obj = {};
        headers.forEach((h, i) => { obj[h] = row[i] ?? ''; });
        return obj;
      })
      .filter(r => r.id || r.username); // bỏ hàng trống
  },

  // Convert object → row theo headers
  objToRow(headers, obj) {
    return headers.map(h => {
      const v = obj[h];
      if (Array.isArray(v)) return v.join(', ');
      if (v === null || v === undefined) return '';
      return String(v).substring(0, 500);
    });
  },
};

// ─────────────────────────────────────────────────────────────────────
//  D. ADMIN SETUP — Khởi tạo GSheet trung tâm
// ─────────────────────────────────────────────────────────────────────
const MTAdmin = {

  // Tạo spreadsheet mới với đầy đủ sheets
  async initSpreadsheet(saJson, spreadsheetId, adminInfo, onProgress) {
    onProgress?.('Đang xác thực Service Account...', 10);
    // Lưu tạm để dùng token
    MTConfig.save({
      serviceAccountJson: saJson,
      spreadsheetId: spreadsheetId || null,
      role: 'admin',
      user: adminInfo,
    });

    let sid = spreadsheetId;

    if (!sid) {
      // Không cho tự tạo — SA không có quyền tạo file trên Drive người dùng
      throw new Error('Vui lòng nhập Spreadsheet ID ở Bước 2. Tạo Google Sheet → share cho Service Account → dán ID vào đây.');
    }

    // Kiểm tra và tạo các sheet còn thiếu trong spreadsheet có sẵn
    onProgress?.('Đang kiểm tra cấu trúc Google Sheet...', 25);
    await this._ensureSheets(saJson, sid);

    // Ghi headers + admin account
    onProgress?.('Đang khởi tạo cấu trúc dữ liệu...', 50);
    await this._initHeaders(sid);

    onProgress?.('Đang tạo tài khoản Admin...', 75);
    await this._createAdminAccount(sid, adminInfo);

    // Lưu config hoàn chỉnh
    MTConfig.save({
      serviceAccountJson: saJson,
      spreadsheetId: sid,
      role: 'admin',
      user: adminInfo,
      orgId: 'all',
      setupAt: new Date().toISOString(),
    });

    onProgress?.('Hoàn tất!', 100);
    return sid;
  },

  // Kiểm tra và tạo các sheet còn thiếu trong spreadsheet đã có
  async _ensureSheets(saJson, sid) {
    const REQUIRED = Object.values(SH); // ['system_users','organizations','system_meta','docs','members','reminders','tasks']
    const token = await MTToken.get(saJson);

    // Lấy danh sách sheet hiện có
    const resp = await fetch(`${SHEETS_API}/${sid}?fields=sheets.properties.title`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!resp.ok) throw new Error(`Không đọc được spreadsheet (${resp.status}). Kiểm tra lại Spreadsheet ID và quyền share cho Service Account.`);
    const data = await resp.json();
    const existing = (data.sheets || []).map(s => s.properties.title);

    const missing = REQUIRED.filter(name => !existing.includes(name));
    if (!missing.length) return; // Đã đủ sheet

    // Tạo các sheet còn thiếu
    const requests = missing.map(title => ({ addSheet: { properties: { title } } }));
    const addResp = await fetch(`${SHEETS_API}/${sid}:batchUpdate`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ requests }),
    });
    if (!addResp.ok) throw new Error(`Không tạo được sheet: ${await addResp.text()}`);
  },

  async _initHeaders(sid) {
    const data = [
      {
        range: `${SH.USERS}!A1:K1`,
        values: [['username','displayName','pinHash','role','orgId','orgName','deviceId','createdAt','lastLogin','status','inviteCode']],
      },
      {
        range: `${SH.ORGS}!A1:F1`,
        values: [['id','name','address','secretary','phone','createdAt']],
      },
      {
        range: `${SH.DOCS}!A1:O1`,
        values: [['id','org_id','title','type','code','issuer','issueDate','deadline','status','priority','summary','keywords','rawText','createdAt','updatedBy']],
      },
      {
        range: `${SH.MEMBERS}!A1:O1`,
        values: [['id','org_id','fullName','gender','chiDoan','role','birthDate','joinDate','phone','email','status','achieve','note','createdAt','updatedBy']],
      },
      {
        range: `${SH.REMIND}!A1:I1`,
        values: [['id','org_id','title','date','tag','note','done','docId','createdAt']],
      },
      {
        range: `${SH.TASKS}!A1:J1`,
        values: [['id','org_id','title','deadline','status','priority','note','assignee','createdAt','updatedBy']],
      },
      {
        range: `${SH.META}!A1:B1`,
        values: [['key','value']],
      },
    ];
    await SheetsAPI.batchUpdate(sid, data);

    // Ghi meta hệ thống
    await SheetsAPI.append(sid, `${SH.META}!A:B`, [
      ['version', MT_VERSION],
      ['initAt',  new Date().toISOString()],
      ['type',    'doanvan_central'],
    ]);
  },

  async _createAdminAccount(sid, adminInfo) {
    if (!adminInfo.pin) throw new Error('[AuthSecure] Admin PIN là bắt buộc');
    const pinHash = _mtHashPIN(adminInfo.pin);
    await SheetsAPI.append(sid, `${SH.USERS}!A:K`, [[
      adminInfo.username,
      adminInfo.displayName,
      pinHash,
      'admin',
      'all',
      'Toàn hệ thống',
      _mtDeviceId(),
      new Date().toISOString(),
      new Date().toISOString(),
      'active',
      '',
    ]]);
  },

  // Tạo Invite Code cho người dùng mới — ghi vào GSheet để mobile quét được
  async generateInviteCode(targetUsername, role, orgId, orgName) {
    const cfg = MTConfig.get();
    if (!cfg?.spreadsheetId || cfg.role !== 'admin') throw new Error('Chỉ admin mới tạo được Invite Code');

    const code    = _mtRandomCode(10);
    const payload = {
      spreadsheetId: cfg.spreadsheetId,
      serviceAccountJson: cfg.serviceAccountJson, // chia sẻ key SA
      role,
      orgId,
      orgName,
      username: targetUsername,
      code,
      expiry: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 ngày
    };

    // Ghi invite code vào GSheet (cột inviteCode trong users)
    // Tìm hàng user nếu đã tồn tại, hoặc tạo mới placeholder
    const rows = await SheetsAPI.read(cfg.spreadsheetId, `${SH.USERS}!A:K`);
    const users = SheetsAPI.parseSheet(rows);
    const existing = users.find(u => u.username === targetUsername);

    if (!existing) {
      await SheetsAPI.append(cfg.spreadsheetId, `${SH.USERS}!A:K`, [[
        targetUsername, targetUsername, '', role, orgId, orgName,
        '', new Date().toISOString(), '', 'pending', code,
      ]]);
    } else {
      // Cập nhật invite code
      const rowIdx = users.indexOf(existing) + 2; // +2 vì header + 1-indexed
      await SheetsAPI.write(cfg.spreadsheetId, `${SH.USERS}!K${rowIdx}`, [[code]]);
    }

    // Lưu payload lên GSheet để mobile từ xa dùng được
    // Dùng sheet system_meta với key "invite_CODE"
    try {
      const payloadStr = JSON.stringify(payload);
      // Lưu compressed: key=invite_CODE, value=JSON payload (cắt bớt saJson nếu quá dài)
      // saJson thường rất dài, lưu nguyên để mobile có thể dùng
      await SheetsAPI.append(cfg.spreadsheetId, `${SH.META}!A:B`, [[
        'invite_' + code,
        payloadStr,
      ]]);
    } catch (e) {
      console.warn('Không ghi được invite lên GSheet:', e.message);
    }
    // Cũng lưu localStorage cho cùng thiết bị dùng ngay
    localStorage.setItem('mt_invite_' + code, JSON.stringify(payload));

    return { code, payload };
  },
};

// ─────────────────────────────────────────────────────────────────────
//  E. USER AUTH — Đăng ký / Đăng nhập qua Invite Code
// ─────────────────────────────────────────────────────────────────────
const MTAuth = {

  // Đăng nhập bằng Invite Code (lần đầu trên thiết bị mới)
  async joinWithCode(code, username, displayName, pin) {
    code = code.toUpperCase().replace(/\s/g, '');

    // 1) Thử tìm trong localStorage trước (cùng máy với admin)
    let payload = null;
    const local = localStorage.getItem('mt_invite_' + code);
    if (local) {
      try { payload = JSON.parse(local); } catch { /**/ }
    }

    // 2) Nếu không có local → tìm "Deep Code" localStorage (cùng máy)
    if (!payload) {
      payload = _mtDecodeDeepCode(code);
    }

    // 3) Nếu vẫn không có → đọc từ GSheet qua bootstrap spreadsheetId
    //    Mobile cần biết spreadsheetId trước — lấy từ config hiện tại nếu có
    if (!payload) {
      payload = await _mtFetchInviteFromSheet(code);
    }

    if (!payload) throw new Error('Mã mời không hợp lệ hoặc đã hết hạn. Hãy đảm bảo bạn đã nhập đúng mã từ PC.');
    if (payload.expiry && Date.now() > payload.expiry) throw new Error('Mã mời đã hết hạn (>7 ngày)');

    // 3) Xác thực với GSheet: tìm user trong system_users
    MTConfig.save({
      serviceAccountJson: payload.serviceAccountJson,
      spreadsheetId: payload.spreadsheetId,
      role: payload.role,
      orgId: payload.orgId,
      orgName: payload.orgName,
      user: { username: username || payload.username, displayName, pin },
    });

    const rows  = await SheetsAPI.read(payload.spreadsheetId, `${SH.USERS}!A:K`);
    const users = SheetsAPI.parseSheet(rows);
    const row   = users.find(u => u.inviteCode === code || u.username === (username || payload.username));

    if (!row) throw new Error('Không tìm thấy tài khoản trong hệ thống');

    const pinHash  = _mtHashPIN(pin);
    const rowIdx   = users.indexOf(row) + 2;
    const deviceId = _mtDeviceId();

    // Cập nhật thông tin user
    await SheetsAPI.write(payload.spreadsheetId, `${SH.USERS}!A${rowIdx}:K${rowIdx}`, [[
      username || row.username,
      displayName || row.displayName,
      pinHash,
      row.role || payload.role,
      row.orgId || payload.orgId,
      row.orgName || payload.orgName,
      deviceId,
      row.createdAt || new Date().toISOString(),
      new Date().toISOString(),
      'active',
      '', // xoá invite code sau khi dùng
    ]]);

    // Lưu config hoàn chỉnh
    const finalCfg = {
      serviceAccountJson: payload.serviceAccountJson,
      spreadsheetId: payload.spreadsheetId,
      role: row.role || payload.role,
      orgId: row.orgId || payload.orgId,
      orgName: row.orgName || payload.orgName,
      user: {
        username: username || row.username,
        displayName: displayName || row.displayName,
        pinHash,
      },
      deviceId,
      joinedAt: new Date().toISOString(),
    };
    MTConfig.save(finalCfg);
    _mtStartSession(finalCfg);

    return finalCfg;
  },

  // Đăng nhập bằng PIN (đã có config trước)
  async loginWithPIN(pin) {
    const cfg = MTConfig.get();
    if (!cfg?.user) throw new Error('Chưa có tài khoản. Vui lòng dùng Mã mời.');

    const pinHash = _mtHashPIN(pin);
    if (cfg.user.pinHash !== pinHash) throw new Error('Mã PIN không đúng');

    // Cập nhật lastLogin trên GSheet (bất đồng bộ, không chặn)
    this._updateLastLogin(cfg).catch(() => {});

    _mtStartSession(cfg);
    return cfg;
  },

  async _updateLastLogin(cfg) {
    if (!cfg.spreadsheetId) return;
    const rows  = await SheetsAPI.read(cfg.spreadsheetId, `${SH.USERS}!A:K`);
    const users = SheetsAPI.parseSheet(rows);
    const row   = users.find(u => u.username === cfg.user.username);
    if (!row) return;
    const idx = users.indexOf(row) + 2;
    await SheetsAPI.write(cfg.spreadsheetId, `${SH.USERS}!I${idx}`, [[new Date().toISOString()]]);
  },

  isLoggedIn() {
    try {
      const s = JSON.parse(sessionStorage.getItem(MT_SESSION) || 'null');
      return s && (Date.now() - s.ts < 8 * 60 * 60 * 1000);
    } catch { return false; }
  },

  logout() {
    sessionStorage.removeItem(MT_SESSION);
  },
};

// ─────────────────────────────────────────────────────────────────────
//  F. DATA SYNC — Push/Pull dữ liệu với phân quyền org_id
// ─────────────────────────────────────────────────────────────────────
const MTSync = {

  // Pull dữ liệu từ GSheet về localStorage (dùng lại bởi DB.get)
  async pullAll(onProgress) {
    const cfg = MTConfig.get();
    if (!cfg?.spreadsheetId) throw new Error('Chưa cấu hình hệ thống');

    onProgress?.('Đang tải dữ liệu...', 10);

    const [docsRows, membersRows, remindsRows, tasksRows] =
      await SheetsAPI.batchRead(cfg.spreadsheetId, [
        `${SH.DOCS}!A:O`,
        `${SH.MEMBERS}!A:O`,
        `${SH.REMIND}!A:I`,
        `${SH.TASKS}!A:J`,
      ]);

    onProgress?.('Xử lý dữ liệu...', 60);

    const filterOrg = (rows) => {
      const all = SheetsAPI.parseSheet(rows);
      if (cfg.role === 'admin') return all; // admin thấy tất cả
      return all.filter(r => !r.org_id || r.org_id === cfg.orgId || r.org_id === '');
    };

    const docs     = filterOrg(docsRows);
    const members  = filterOrg(membersRows);
    const reminds  = filterOrg(remindsRows);
    const tasks    = filterOrg(tasksRows);

    if (docs.length)    DB.set('docs',        docs);
    if (members.length) DB.set('membersList',  members);
    if (reminds.length) DB.set('reminders',    reminds);
    if (tasks.length)   DB.set('tasks',        tasks);

    // Cập nhật timestamp
    const profile = MTConfig.get();
    if (profile) { profile.lastSync = new Date().toISOString(); MTConfig.save(profile); }

    onProgress?.('Hoàn tất!', 100);
    _mtUpdateSyncBadge('synced', `Đã tải ${new Date().toLocaleTimeString('vi-VN')}`);

    if (typeof updateBadges      === 'function') updateBadges();
    if (typeof refreshDashboard  === 'function') refreshDashboard();

    return { docs: docs.length, members: members.length };
  },

  // Push toàn bộ dữ liệu lên GSheet
  async pushAll(onProgress) {
    const cfg = MTConfig.get();
    if (!cfg?.spreadsheetId) throw new Error('Chưa cấu hình hệ thống');

    onProgress?.('Chuẩn bị dữ liệu...', 10);

    const orgId    = cfg.orgId || 'unknown';
    const username = cfg.user?.username || 'unknown';
    const now      = new Date().toISOString();

    // Đọc dữ liệu local
    const localDocs    = (typeof DB !== 'undefined' ? DB.get('docs')        : []) || [];
    const localMembers = (typeof DB !== 'undefined' ? DB.get('membersList') : []) || [];
    const localReminds = (typeof DB !== 'undefined' ? DB.get('reminders')   : []) || [];
    const localTasks   = (typeof DB !== 'undefined' ? DB.get('tasks')       : []) || [];

    // Gắn org_id và updatedBy nếu chưa có
    const tagOrg = (arr) => arr.map(r => ({ org_id: orgId, ...r, updatedBy: username, _ts: now }));

    onProgress?.('Đọc dữ liệu hiện tại từ Sheet...', 25);

    // Pull dữ liệu hiện tại từ sheet
    const [docsRows, membersRows, remindsRows, tasksRows] =
      await SheetsAPI.batchRead(cfg.spreadsheetId, [
        `${SH.DOCS}!A:O`, `${SH.MEMBERS}!A:O`,
        `${SH.REMIND}!A:I`, `${SH.TASKS}!A:J`,
      ]);

    onProgress?.('Gộp dữ liệu...', 50);

    // Merge: giữ dữ liệu org khác, thay dữ liệu org mình
    const merge = (sheetRows, localArr, idKey = 'id') => {
      const sheetAll = SheetsAPI.parseSheet(sheetRows);
      // Xoá dữ liệu cũ của org mình
      const others   = cfg.role === 'admin'
        ? []
        : sheetAll.filter(r => r.org_id && r.org_id !== orgId);
      // Gộp với dữ liệu mới của mình
      const myNew    = tagOrg(localArr);
      return [...others, ...myNew];
    };

    const mergedDocs    = merge(docsRows,    localDocs);
    const mergedMembers = merge(membersRows, localMembers);
    const mergedReminds = merge(remindsRows, localReminds);
    const mergedTasks   = merge(tasksRows,   localTasks);

    onProgress?.('Ghi lên Google Sheet...', 70);

    // Headers
    const docHdr  = ['id','org_id','title','type','code','issuer','issueDate','deadline','status','priority','summary','keywords','rawText','createdAt','updatedBy'];
    const memHdr  = ['id','org_id','fullName','gender','chiDoan','role','birthDate','joinDate','phone','email','status','achieve','note','createdAt','updatedBy'];
    const remHdr  = ['id','org_id','title','date','tag','note','done','docId','createdAt'];
    const tskHdr  = ['id','org_id','title','deadline','status','priority','note','assignee','createdAt','updatedBy'];

    const toRows = (arr, hdrs) => arr.map(r => SheetsAPI.objToRow(hdrs, r));

    // Clear + rewrite per sheet using individual PUT (avoids batchClear 400 on fresh sheets)
    const sheetDefs = [
      { name: SH.DOCS,    rows: mergedDocs,    hdr: docHdr  },
      { name: SH.MEMBERS, rows: mergedMembers, hdr: memHdr  },
      { name: SH.REMIND,  rows: mergedReminds, hdr: remHdr  },
      { name: SH.TASKS,   rows: mergedTasks,   hdr: tskHdr  },
    ];
    for (const { name, rows, hdr } of sheetDefs) {
      const lastCol = String.fromCharCode(64 + hdr.length);
      const clearRange = `${name}!A2:${lastCol}1000`;
      // Clear first
      await SheetsAPI.write(cfg.spreadsheetId, clearRange, [['']]).catch(() => {});
      // Write data if any
      if (rows.length) {
        const writeRange = `${name}!A2:${lastCol}${rows.length + 1}`;
        await SheetsAPI.write(cfg.spreadsheetId, writeRange, toRows(rows, hdr));
      }
    }

    onProgress?.('Cập nhật meta...', 90);

    // Cập nhật meta
    await SheetsAPI.append(cfg.spreadsheetId, `${SH.META}!A:B`, [
      [`lastSync_${orgId}`, now],
      [`lastDevice_${orgId}`, cfg.deviceId || 'unknown'],
    ]);

    const profile = MTConfig.get();
    if (profile) { profile.lastSync = now; MTConfig.save(profile); }

    onProgress?.('Hoàn tất!', 100);
    _mtUpdateSyncBadge('synced', `Đã đồng bộ ${new Date().toLocaleTimeString('vi-VN')}`);

    return { docs: localDocs.length, members: localMembers.length };
  },

  // Auto-sync khi có thay đổi
  scheduleAutoSync() {
    const cfg = MTConfig.get();
    if (!cfg?.spreadsheetId) return;
    if (this._autoTimer) clearTimeout(this._autoTimer);
    this._autoTimer = setTimeout(async () => {
      try {
        _mtUpdateSyncBadge('syncing', 'Đang đồng bộ...');
        await this.pushAll(() => {});
        if (typeof toast === 'function') toast('✅ Đồng bộ tự động thành công', 'success');
      } catch (e) {
        _mtUpdateSyncBadge('error', 'Lỗi đồng bộ');
      }
    }, 3000); // debounce 3 giây
  },
};

// ─────────────────────────────────────────────────────────────────────
//  G. USER MANAGEMENT (Admin only)
// ─────────────────────────────────────────────────────────────────────
const MTUserMgr = {
  async listUsers() {
    const cfg = MTConfig.get();
    if (!cfg?.spreadsheetId) return [];
    const rows = await SheetsAPI.read(cfg.spreadsheetId, `${SH.USERS}!A:K`);
    return SheetsAPI.parseSheet(rows);
  },

  async listOrgs() {
    const cfg = MTConfig.get();
    if (!cfg?.spreadsheetId) return [];
    const rows = await SheetsAPI.read(cfg.spreadsheetId, `${SH.ORGS}!A:F`);
    return SheetsAPI.parseSheet(rows);
  },

  async addOrg(org) {
    const cfg = MTConfig.get();
    if (!cfg?.spreadsheetId || cfg.role !== 'admin') throw new Error('Không có quyền');
    const id = 'org_' + Date.now();
    await SheetsAPI.append(cfg.spreadsheetId, `${SH.ORGS}!A:F`, [[
      id, org.name, org.address || '', org.secretary || '',
      org.phone || '', new Date().toISOString(),
    ]]);
    return id;
  },

  async removeUser(username) {
    const cfg = MTConfig.get();
    if (!cfg?.spreadsheetId || cfg.role !== 'admin') throw new Error('Không có quyền');
    const rows  = await SheetsAPI.read(cfg.spreadsheetId, `${SH.USERS}!A:K`);
    const users = SheetsAPI.parseSheet(rows);
    const idx   = users.findIndex(u => u.username === username);
    if (idx < 0) throw new Error('Không tìm thấy người dùng');
    // Đánh dấu status = deleted thay vì xoá hẳn
    await SheetsAPI.write(cfg.spreadsheetId, `${SH.USERS}!J${idx + 2}`, [['deleted']]);
  },

  async changeRole(username, newRole) {
    const cfg = MTConfig.get();
    if (!cfg?.spreadsheetId || cfg.role !== 'admin') throw new Error('Không có quyền');
    const rows  = await SheetsAPI.read(cfg.spreadsheetId, `${SH.USERS}!A:K`);
    const users = SheetsAPI.parseSheet(rows);
    const idx   = users.findIndex(u => u.username === username);
    if (idx < 0) throw new Error('Không tìm thấy người dùng');
    await SheetsAPI.write(cfg.spreadsheetId, `${SH.USERS}!D${idx + 2}`, [[newRole]]);
  },
};

// ─────────────────────────────────────────────────────────────────────
//  H. DEEP INVITE CODE — Encode/decode thông tin kết nối trong code
//     Giải quyết vấn đề mobile cần biết spreadsheetId + saJson
//     mà không cần gõ tay (dài)
// ─────────────────────────────────────────────────────────────────────
function _mtEncodeDeepCode(cfg, role, orgId, orgName, username) {
  const payload = {
    sid: cfg.spreadsheetId,
    sa:  cfg.serviceAccountJson,
    r:   role,
    o:   orgId,
    on:  orgName,
    u:   username,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000,
  };
  // Nén thành base64url, lưu vào GSheet dưới một key ngắn
  const code = _mtRandomCode(12);
  localStorage.setItem('mt_deep_' + code, JSON.stringify(payload));
  return code;
}

function _mtDecodeDeepCode(code) {
  try {
    const raw = localStorage.getItem('mt_deep_' + code);
    if (!raw) return null;
    const p = JSON.parse(raw);
    if (Date.now() > p.exp) return null;
    return {
      spreadsheetId: p.sid,
      serviceAccountJson: p.sa,
      role: p.r,
      orgId: p.o,
      orgName: p.on,
      username: p.u,
      expiry: p.exp,
    };
  } catch { return null; }
}

// ─────────────────────────────────────────────────────────────────────
//  I. UTILITIES
// ─────────────────────────────────────────────────────────────────────

// Đọc invite payload từ GSheet — dùng khi mobile không có localStorage
// Cần spreadsheetId: lấy từ MTConfig hiện tại, hoặc từ payload đã biết trước
async function _mtFetchInviteFromSheet(code) {
  try {
    // Lấy spreadsheetId + saJson từ config hiện tại (nếu mobile đã từng login)
    const cfg = MTConfig.get();
    if (!cfg?.spreadsheetId || !cfg?.serviceAccountJson) return null;

    const rows = await SheetsAPI.read(cfg.spreadsheetId, `${SH.META}!A:B`);
    if (!rows || rows.length < 2) return null;

    // Tìm hàng có key = "invite_CODE"
    const targetKey = 'invite_' + code;
    const found = rows.slice(1).find(r => r[0] === targetKey);
    if (!found || !found[1]) return null;

    const payload = JSON.parse(found[1]);
    if (payload.expiry && Date.now() > payload.expiry) return null; // Hết hạn
    return payload;
  } catch (e) {
    console.warn('_mtFetchInviteFromSheet:', e.message);
    return null;
  }
}
function _mtHashPIN(pin) {
  let h = 5381;
  for (let i = 0; i < pin.length; i++) h = ((h << 5) + h) ^ pin.charCodeAt(i);
  return (h >>> 0).toString(16).padStart(8, '0');
}

function _mtRandomCode(len = 10) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

function _mtDeviceId() {
  let id = localStorage.getItem('mt_device_id');
  if (!id) { id = _mtRandomCode(16); localStorage.setItem('mt_device_id', id); }
  return id;
}

function _mtStartSession(cfg) {
  sessionStorage.setItem(MT_SESSION, JSON.stringify({ ts: Date.now(), role: cfg.role, orgId: cfg.orgId }));
}

function _mtUpdateSyncBadge(state, label) {
  // Dùng lại hàm từ doanvan-mobile-sync.js nếu có
  if (typeof _dvUpdateSyncBadge === 'function') {
    _dvUpdateSyncBadge(state, label);
  } else {
    const badge = document.getElementById('dvSyncBadge');
    const lbl   = document.getElementById('dvSyncLabel');
    if (!badge) return;
    badge.className = 'dvSyncBadge ' + state;
    if (lbl) lbl.textContent = label;
  }
}

// ─────────────────────────────────────────────────────────────────────
//  J. UI — ADMIN SETUP MODAL
// ─────────────────────────────────────────────────────────────────────
function mtShowAdminSetup() {
  if (document.getElementById('mtAdminSetupModal')) return;

  const modal = document.createElement('div');
  modal.id    = 'mtAdminSetupModal';
  modal.className = 'modal-overlay';
  modal.innerHTML = `
<div class="modal" style="max-width:640px">
  <div class="modal-header">
    <h2 style="display:flex;align-items:center;gap:10px">
      <span style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,var(--red),var(--gold));display:flex;align-items:center;justify-content:center;flex-shrink:0">
        <i class="fas fa-shield-alt" style="color:#fff;font-size:0.9rem"></i>
      </span>
      Thiết lập Admin — Hệ thống trung tâm
    </h2>
    <button class="btn btn-ghost" onclick="document.getElementById('mtAdminSetupModal').remove()"><i class="fas fa-times"></i></button>
  </div>

  <div class="modal-body" style="padding:24px">
    <!-- STEPPER -->
    <div style="display:flex;gap:0;margin-bottom:24px;background:var(--cream);border-radius:12px;padding:4px">
      <button class="btn btn-primary mt-step-btn active" id="mtStep1Btn" onclick="mtGoStep(1)" style="flex:1;border-radius:8px">
        <i class="fas fa-key"></i> 1. Service Account
      </button>
      <button class="btn btn-ghost mt-step-btn" id="mtStep2Btn" onclick="mtGoStep(2)" style="flex:1;border-radius:8px" disabled>
        <i class="fas fa-table"></i> 2. Google Sheet
      </button>
      <button class="btn btn-ghost mt-step-btn" id="mtStep3Btn" onclick="mtGoStep(3)" style="flex:1;border-radius:8px" disabled>
        <i class="fas fa-user-shield"></i> 3. Tài khoản Admin
      </button>
    </div>

    <!-- STEP 1 -->
    <div id="mtStepPanel1">
      <div style="background:rgba(26,35,64,0.04);border-radius:12px;padding:16px;margin-bottom:16px;font-size:0.82rem;line-height:1.7">
        <div style="font-weight:700;color:var(--navy);margin-bottom:6px"><i class="fas fa-info-circle" style="color:var(--gold)"></i> Hướng dẫn tạo Service Account</div>
        <ol style="margin:0;padding-left:18px;color:var(--text-soft)">
          <li>Vào <a href="https://console.cloud.google.com" target="_blank" style="color:var(--red);font-weight:600">Google Cloud Console</a> → Tạo project mới</li>
          <li>Bật API: <strong>Google Sheets API</strong> và <strong>Google Drive API</strong></li>
          <li>IAM & Admin → Service Accounts → Tạo service account</li>
          <li>Thêm key → JSON → Tải file về</li>
          <li>Mở file JSON → Sao chép toàn bộ nội dung → Dán vào ô bên dưới</li>
        </ol>
      </div>
      <div class="form-group">
        <label class="form-label">Service Account JSON Key <span class="required">*</span></label>
        <textarea class="form-control" id="mtSAInput" rows="6"
          placeholder='{"type":"service_account","project_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\\n...\\n-----END PRIVATE KEY-----\\n","client_email":"...@....iam.gserviceaccount.com",...}'
          style="font-family:monospace;font-size:0.72rem"></textarea>
        <div id="mtSAStatus" style="font-size:0.78rem;margin-top:6px;min-height:18px"></div>
      </div>
      <div style="display:flex;gap:8px">
        <button class="btn btn-gold" onclick="mtTestSA()" style="flex:1">
          <i class="fas fa-vial"></i> Kiểm tra kết nối
        </button>
        <button class="btn btn-primary" onclick="mtGoStep(2)" style="flex:1">
          Tiếp theo <i class="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>

    <!-- STEP 2 -->
    <div id="mtStepPanel2" style="display:none">

      <!-- Hướng dẫn 3 bước -->
      <div style="background:rgba(2,132,199,0.05);border-radius:12px;padding:14px;margin-bottom:14px;font-size:0.82rem;border:1px solid rgba(2,132,199,0.2)">
        <div style="font-weight:700;color:#0369a1;margin-bottom:8px"><i class="fas fa-info-circle"></i> Hướng dẫn thiết lập Google Sheet</div>
        <div style="display:flex;flex-direction:column;gap:6px;color:var(--text-soft)">
          <div><span style="display:inline-flex;width:20px;height:20px;border-radius:50%;background:#0284c7;color:#fff;font-size:0.65rem;font-weight:700;align-items:center;justify-content:center;margin-right:6px">1</span>
            Vào <a href="https://sheets.google.com" target="_blank" style="color:#0284c7;font-weight:600">sheets.google.com</a> → Tạo spreadsheet mới (trống)
          </div>
          <div><span style="display:inline-flex;width:20px;height:20px;border-radius:50%;background:#0284c7;color:#fff;font-size:0.65rem;font-weight:700;align-items:center;justify-content:center;margin-right:6px">2</span>
            Nhấn <b>Chia sẻ</b> → thêm <b id="mtSAEmailHint" style="color:#dc2626;font-family:monospace;font-size:0.8rem">email-service-account</b> với quyền <b>Người chỉnh sửa</b>
          </div>
          <div><span style="display:inline-flex;width:20px;height:20px;border-radius:50%;background:#0284c7;color:#fff;font-size:0.65rem;font-weight:700;align-items:center;justify-content:center;margin-right:6px">3</span>
            Copy ID từ URL và dán vào ô bên dưới: <br>
            <span style="font-family:monospace;font-size:0.75rem;background:#f1f5f9;padding:2px 6px;border-radius:4px;margin-top:3px;display:inline-block">
              docs.google.com/spreadsheets/d/<b style="color:#dc2626">ID_CẦN_COPY</b>/edit
            </span>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">
          Spreadsheet ID <span style="color:#dc2626;font-size:0.8rem">* bắt buộc</span>
        </label>
        <input class="form-control" id="mtSheetIdInput" placeholder="Dán Spreadsheet ID vào đây..."
          style="font-family:monospace;font-size:0.82rem;border-color:#f59e0b"
          oninput="this.style.borderColor=this.value?'var(--green)':'#f59e0b'">
        <div class="form-hint" style="color:#f59e0b">
          <i class="fas fa-exclamation-triangle"></i>
          Bắt buộc — hệ thống sẽ tự tạo các sheet cần thiết trong spreadsheet này.
        </div>
      </div>

      <div id="mtStep2Status" style="font-size:0.8rem;min-height:16px;margin-bottom:10px"></div>

      <div style="display:flex;gap:8px">
        <button class="btn btn-outline" onclick="mtGoStep(1)"><i class="fas fa-arrow-left"></i> Quay lại</button>
        <button class="btn btn-primary" onclick="mtValidateStep2()" style="flex:1">
          Tiếp theo <i class="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>

    <!-- STEP 3 -->
    <div id="mtStepPanel3" style="display:none">
      <div style="background:rgba(192,57,43,0.04);border-radius:12px;padding:14px;margin-bottom:16px;font-size:0.82rem;border:1px solid rgba(192,57,43,0.15)">
        <div style="font-weight:700;color:var(--red);margin-bottom:4px"><i class="fas fa-shield-alt"></i> Tài khoản Admin</div>
        <div style="color:var(--text-soft)">Đây là tài khoản quản trị hệ thống. Admin có thể tạo mã mời cho người dùng khác và quản lý toàn bộ dữ liệu.</div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Tên đăng nhập <span class="required">*</span></label>
          <input class="form-control" id="mtAdminUsername" placeholder="VD: admin_truong_le_quy_don" style="font-size:16px">
        </div>
        <div class="form-group">
          <label class="form-label">Tên hiển thị <span class="required">*</span></label>
          <input class="form-control" id="mtAdminDisplayName" placeholder="VD: Bí thư Đoàn trường" style="font-size:16px">
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Mã PIN (6 số) <span class="required">*</span></label>
        <div style="display:flex;gap:8px">
          <input type="password" class="form-control" id="mtAdminPIN" placeholder="6 chữ số" maxlength="6"
            pattern="[0-9]{6}" inputmode="numeric" style="font-size:1.2rem;letter-spacing:8px;flex:1">
          <input type="password" class="form-control" id="mtAdminPIN2" placeholder="Xác nhận PIN" maxlength="6"
            pattern="[0-9]{6}" inputmode="numeric" style="font-size:1.2rem;letter-spacing:8px;flex:1">
        </div>
        <div class="form-hint" style="color:#dc2626"><i class="fas fa-shield-alt"></i> Bắt buộc nhập PIN — không có PIN mặc định vì lý do bảo mật</div>
      </div>
      <div id="mtSetupStatus" style="font-size:0.82rem;margin-bottom:12px;min-height:18px"></div>
      <div style="display:flex;gap:8px">
        <button class="btn btn-outline" onclick="mtGoStep(2)"><i class="fas fa-arrow-left"></i> Quay lại</button>
        <button class="btn btn-primary" onclick="mtDoAdminSetup()" style="flex:1">
          <i class="fas fa-check-circle"></i> Hoàn tất thiết lập
        </button>
      </div>
    </div>
  </div>
</div>`;

  document.body.appendChild(modal);
  setTimeout(() => modal.classList.add('open'), 10);
}

function mtGoStep(step) {
  [1, 2, 3].forEach(i => {
    document.getElementById(`mtStepPanel${i}`).style.display = i === step ? 'block' : 'none';
    const btn = document.getElementById(`mtStep${i}Btn`);
    if (btn) {
      btn.classList.toggle('active', i === step);
      btn.classList.toggle('btn-primary', i <= step);
      btn.classList.toggle('btn-ghost', i > step);
      btn.disabled = i > step;
    }
  });
  // Khi vào bước 2: điền email SA vào hint
  if (step === 2) {
    try {
      const saRaw = document.getElementById('mtSAInput')?.value.trim();
      if (saRaw) {
        const sa = JSON.parse(saRaw);
        const hint = document.getElementById('mtSAEmailHint');
        if (hint && sa.client_email) hint.textContent = sa.client_email;
      }
    } catch {}
  }
}

// Validate bước 2 trước khi sang bước 3
function mtValidateStep2() {
  const sheetId = document.getElementById('mtSheetIdInput')?.value.trim();
  const status  = document.getElementById('mtStep2Status');
  if (!sheetId) {
    if (status) status.innerHTML = '<span style="color:#dc2626"><i class="fas fa-exclamation-triangle"></i> Vui lòng nhập Spreadsheet ID trước khi tiếp tục.</span>';
    document.getElementById('mtSheetIdInput')?.focus();
    return;
  }
  // Validate độ dài ID (Google Sheet ID thường 44 ký tự)
  if (sheetId.length < 20) {
    if (status) status.innerHTML = '<span style="color:#dc2626"><i class="fas fa-times-circle"></i> ID không hợp lệ. Hãy copy đúng phần ID từ URL.</span>';
    return;
  }
  if (status) status.innerHTML = '<span style="color:#16a34a"><i class="fas fa-check-circle"></i> Spreadsheet ID hợp lệ.</span>';
  mtGoStep(3);
}

async function mtTestSA() {
  const saInput = document.getElementById('mtSAInput')?.value.trim();
  const status  = document.getElementById('mtSAStatus');
  if (!status) return;
  if (!saInput) { status.innerHTML = '<span style="color:orange">Vui lòng dán JSON key</span>'; return; }

  status.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang kiểm tra...';
  try {
    JSON.parse(saInput); // validate JSON
    await MTToken.get(saInput, true);
    MTToken.invalidate();
    status.innerHTML = '<span style="color:#16a34a"><i class="fas fa-check-circle"></i> Kết nối thành công! Service Account hợp lệ.</span>';
  } catch (e) {
    status.innerHTML = `<span style="color:red"><i class="fas fa-times-circle"></i> Lỗi: ${e.message}</span>`;
  }
}

async function mtDoAdminSetup() {
  const saJson   = document.getElementById('mtSAInput')?.value.trim();
  const sheetId  = document.getElementById('mtSheetIdInput')?.value.trim();
  const username = document.getElementById('mtAdminUsername')?.value.trim();
  const dispName = document.getElementById('mtAdminDisplayName')?.value.trim();
  const pin      = document.getElementById('mtAdminPIN')?.value.trim();
  const pin2     = document.getElementById('mtAdminPIN2')?.value.trim();
  const status   = document.getElementById('mtSetupStatus');

  if (!saJson)   { status.innerHTML = '<span style="color:red">Vui lòng cung cấp Service Account JSON</span>'; return; }
  if (!username) { status.innerHTML = '<span style="color:red">Vui lòng nhập tên đăng nhập</span>'; return; }
  if (!dispName) { status.innerHTML = '<span style="color:red">Vui lòng nhập tên hiển thị</span>'; return; }
  if (!pin || pin.length < 6) { status.innerHTML = '<span style="color:red"><i class="fas fa-shield-alt"></i> Bắt buộc nhập PIN tối thiểu 6 số để bảo mật tài khoản Admin</span>'; return; }
  if (!/^\d{6,8}$/.test(pin)) { status.innerHTML = '<span style="color:red">PIN phải là 6-8 chữ số</span>'; return; }
  if (pin !== pin2) { status.innerHTML = '<span style="color:red">Mã PIN xác nhận không khớp</span>'; return; }

  // Validate: bắt buộc nhập spreadsheet ID (SA không thể tự tạo file)
  if (!sheetId) {
    status.innerHTML = '<span style="color:#dc2626"><i class="fas fa-exclamation-triangle"></i> ' +
      'Vui lòng quay lại Bước 2 và nhập Spreadsheet ID. ' +
      'Tạo Google Sheet → Share cho Service Account → Dán ID vào ô.</span>';
    document.getElementById('mtStep2Btn')?.click?.();
    mtGoStep(2);
    return;
  }

  const btn = document.querySelector('#mtStepPanel3 .btn-primary');
  if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang xử lý...'; }

  const onProgress = (msg, pct) => {
    status.innerHTML = `
      <div style="margin-bottom:6px;color:var(--navy);font-size:0.8rem">
        <i class="fas fa-spinner fa-spin" style="color:var(--red)"></i> ${msg}
      </div>
      <div style="background:#e5e7eb;border-radius:999px;height:6px;overflow:hidden">
        <div style="height:100%;border-radius:999px;background:linear-gradient(90deg,var(--red),#f59e0b);width:${pct}%;transition:width 0.4s ease"></div>
      </div>`;
  };

  try {
    const sid = await MTAdmin.initSpreadsheet(saJson, sheetId, { username, displayName: dispName, pin }, onProgress);
    status.innerHTML = `
      <div style="color:#16a34a;font-weight:600;margin-bottom:6px">
        <i class="fas fa-check-circle"></i> Thiết lập thành công!
      </div>
      <div style="font-size:0.76rem;color:var(--gray)">
        Sheet ID: <code style="background:#f3f4f6;padding:1px 5px;border-radius:4px">${sid}</code>
        &nbsp;<a href="https://docs.google.com/spreadsheets/d/${sid}" target="_blank" style="color:#0284c7">
          <i class="fas fa-external-link-alt"></i> Mở
        </a>
      </div>`;
    _mtStartSession(MTConfig.get());
    if (typeof toast === 'function') toast('🎉 Hệ thống trung tâm đã sẵn sàng! Bạn đang đăng nhập với quyền Admin.', 'success');
    setTimeout(() => {
      document.getElementById('mtAdminSetupModal')?.remove();
      mtUpdateUIAfterLogin();
      if (typeof dvInitSync === 'function') dvInitSync();
    }, 1800);
  } catch (e) {
    if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fas fa-check-circle"></i> Hoàn tất thiết lập'; }
    // Gợi ý hành động dựa theo loại lỗi
    let hint = '';
    if (e.message.includes('403') || e.message.includes('Forbidden')) {
      hint = ' → Kiểm tra lại email Service Account đã được <b>share quyền Chỉnh sửa</b> vào spreadsheet chưa.';
    } else if (e.message.includes('404') || e.message.includes('spreadsheet')) {
      hint = ' → Spreadsheet ID không tồn tại hoặc chưa được share. Kiểm tra lại Bước 2.';
    } else if (e.message.includes('400')) {
      hint = ' → Sheet không hợp lệ. Thử tạo Google Sheet mới và share lại.';
    }
    status.innerHTML = `<span style="color:#dc2626"><i class="fas fa-times-circle"></i> <b>Lỗi:</b> ${e.message}${hint}</span>`;
  }
}

// ─────────────────────────────────────────────────────────────────────
//  K. UI — INVITE CODE MANAGER (Admin)
// ─────────────────────────────────────────────────────────────────────
function mtShowInviteManager() {
  if (!MTConfig.isAdmin()) {
    if (typeof toast === 'function') toast('Chỉ Admin mới có quyền tạo mã mời', 'warning');
    return;
  }

  const existing = document.getElementById('mtInviteModal');
  if (existing) { existing.classList.add('open'); mtEnsureSheetsAndLoad(); return; }

  const modal = document.createElement('div');
  modal.id    = 'mtInviteModal';
  modal.className = 'modal-overlay';
  modal.innerHTML = `
<div class="modal" style="max-width:700px">
  <div class="modal-header">
    <h2><i class="fas fa-user-plus" style="color:var(--red);margin-right:8px"></i> Quản lý người dùng & Mã mời</h2>
    <button class="btn btn-ghost" onclick="document.getElementById('mtInviteModal').classList.remove('open')"><i class="fas fa-times"></i></button>
  </div>
  <div class="modal-body" style="padding:24px">

    <!-- Banner khởi tạo hệ thống (ẩn sau khi init xong) -->
    <div id="mtInitBanner" style="display:none;background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.3);border-radius:10px;padding:12px 14px;margin-bottom:14px;font-size:0.82rem">
      <div style="display:flex;align-items:center;gap:10px">
        <i class="fas fa-tools" style="color:#d97706;font-size:1.1rem"></i>
        <div style="flex:1">
          <div style="font-weight:700;color:#92400e;margin-bottom:2px">Chưa khởi tạo sheet hệ thống</div>
          <div style="color:#78350f">Sheet <code>system_users</code> và <code>organizations</code> chưa tồn tại trong Google Sheet. Nhấn nút bên phải để tạo tự động.</div>
        </div>
        <button class="btn btn-sm" style="background:#d97706;color:#fff;white-space:nowrap;flex-shrink:0" onclick="mtInitSystemSheets(this)">
          <i class="fas fa-magic"></i> Khởi tạo ngay
        </button>
      </div>
    </div>

    <!-- Tabs -->
    <div class="tabs" style="margin-bottom:16px">
      <button class="tab-btn active" onclick="mtInviteTab(this,'users')">👥 Người dùng</button>
      <button class="tab-btn" onclick="mtInviteTab(this,'orgs')">🏢 Cơ sở Đoàn</button>
      <button class="tab-btn" onclick="mtInviteTab(this,'create')">➕ Tạo mã mời</button>
    </div>

    <!-- TAB: USERS -->
    <div id="mtInviteTabUsers" class="tab-content active">
      <div id="mtUserList" style="font-size:0.82rem">
        <div style="text-align:center;padding:20px;color:var(--gray)"><i class="fas fa-spinner fa-spin"></i> Đang tải...</div>
      </div>
    </div>

    <!-- TAB: ORGS -->
    <div id="mtInviteTabOrgs" class="tab-content">
      <div style="margin-bottom:12px;display:flex;gap:8px">
        <input class="form-control" id="mtNewOrgName" placeholder="Tên cơ sở Đoàn (VD: Đoàn trường THPT A)" style="flex:1">
        <button class="btn btn-primary" onclick="mtAddOrg()"><i class="fas fa-plus"></i> Thêm</button>
      </div>
      <div id="mtOrgList" style="font-size:0.82rem">
        <div style="text-align:center;padding:20px;color:var(--gray)"><i class="fas fa-spinner fa-spin"></i> Đang tải...</div>
      </div>
    </div>

    <!-- TAB: CREATE INVITE -->
    <div id="mtInviteTabCreate" class="tab-content">
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Tên đăng nhập</label>
          <input class="form-control" id="mtInviteUsername" placeholder="VD: bithubidoanchinh" style="font-size:16px">
        </div>
        <div class="form-group">
          <label class="form-label">Vai trò</label>
          <select class="form-control" id="mtInviteRole" style="font-size:16px">
            <option value="manager">Quản lý</option>
            <option value="member">Đoàn viên</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Cơ sở Đoàn</label>
        <select class="form-control" id="mtInviteOrg" style="font-size:16px">
          <option value="">Đang tải...</option>
        </select>
      </div>
      <button class="btn btn-primary" onclick="mtCreateInvite()" style="width:100%;margin-bottom:16px">
        <i class="fas fa-qrcode"></i> Tạo Mã Mời
      </button>

      <!-- Result -->
      <div id="mtInviteResult" style="display:none">
        <div style="background:var(--cream);border-radius:12px;padding:20px;text-align:center;border:2px dashed var(--gray-light)">
          <div style="font-size:0.72rem;color:var(--gray);margin-bottom:8px;text-transform:uppercase;letter-spacing:1px">Mã mời (chia sẻ cho người dùng)</div>
          <div id="mtInviteCodeDisplay" style="font-family:monospace;font-size:1.8rem;font-weight:900;letter-spacing:6px;color:var(--navy);cursor:pointer;user-select:all" onclick="mtCopyInviteCode(this)">
            ----
          </div>
          <div style="font-size:0.72rem;color:var(--gray);margin-top:6px">Nhấn để sao chép · Hết hạn sau 7 ngày</div>
          <div style="margin-top:12px;display:flex;gap:8px;justify-content:center">
            <button class="btn btn-outline btn-sm" onclick="mtCopyInviteCode(document.getElementById('mtInviteCodeDisplay'))">
              <i class="fas fa-copy"></i> Sao chép
            </button>
            <button class="btn btn-outline btn-sm" onclick="mtShareInviteCode()">
              <i class="fas fa-share-alt"></i> Chia sẻ
            </button>
          </div>
        </div>
        <div id="mtInviteCodePayload" style="display:none"></div>
      </div>
    </div>

  </div>
</div>`;

  document.body.appendChild(modal);
  modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('open'); });
  setTimeout(() => { modal.classList.add('open'); mtEnsureSheetsAndLoad(); }, 10);
}

function mtInviteTab(btn, tab) {
  document.querySelectorAll('#mtInviteModal .tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('#mtInviteModal .tab-content').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  const panel = document.getElementById(`mtInviteTab${tab.charAt(0).toUpperCase() + tab.slice(1)}`);
  if (panel) panel.classList.add('active');
  if (tab === 'users') mtEnsureSheetsAndLoad();
  if (tab === 'orgs')  mtEnsureAndLoadOrgs();
}

// Khởi tạo sheet hệ thống từ nút trong banner
async function mtInitSystemSheets(btn) {
  const cfg = MTConfig.get();
  if (!cfg?.spreadsheetId || !cfg?.serviceAccountJson) return;
  if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang tạo...'; }
  try {
    await MTAdmin._ensureSheets(cfg.serviceAccountJson, cfg.spreadsheetId);
    await MTAdmin._initHeaders(cfg.spreadsheetId);
    document.getElementById('mtInitBanner')?.style && (document.getElementById('mtInitBanner').style.display = 'none');
    if (typeof toast === 'function') toast('<i class="fas fa-check-circle" style="color:#16a34a"></i> Đã khởi tạo sheet hệ thống!', 'success');
    mtLoadUsers();
    mtLoadOrgsForSelect();
  } catch (e) {
    if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fas fa-magic"></i> Khởi tạo ngay'; }
    if (typeof toast === 'function') toast('Lỗi khởi tạo: ' + e.message, 'error');
  }
}

// Đảm bảo sheet tồn tại rồi mới load data — tránh lỗi 400
async function mtEnsureSheetsAndLoad() {
  const cfg = MTConfig.get();
  if (!cfg?.spreadsheetId || !cfg?.serviceAccountJson) {
    mtLoadUsers(); mtLoadOrgsForSelect(); return;
  }

  const userList = document.getElementById('mtUserList');
  if (userList) userList.innerHTML = '<div style="text-align:center;padding:20px;color:var(--gray)"><i class="fas fa-spinner fa-spin"></i> Đang kiểm tra cấu trúc hệ thống...</div>';

  try {
    // Bước 1: Kiểm tra sheet nào đang thiếu
    const token = await MTToken.get(cfg.serviceAccountJson);
    const metaResp = await fetch(`${SHEETS_API}/${cfg.spreadsheetId}?fields=sheets.properties.title`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    let needsInit = false;
    if (metaResp.ok) {
      const metaData = await metaResp.json();
      const existing = (metaData.sheets || []).map(s => s.properties.title);
      const allRequired = Object.values(SH);
      const missing = allRequired.filter(n => !existing.includes(n));
      if (missing.length > 0) {
        // Hiện banner cảnh báo
        const banner = document.getElementById('mtInitBanner');
        if (banner) banner.style.display = 'block';
        needsInit = true;
        // Auto-init
        if (userList) userList.innerHTML = '<div style="text-align:center;padding:20px;color:#d97706"><i class="fas fa-tools"></i> Đang tạo sheet còn thiếu: ' + missing.join(', ') + '...</div>';
        await MTAdmin._ensureSheets(cfg.serviceAccountJson, cfg.spreadsheetId);
        await MTAdmin._initHeaders(cfg.spreadsheetId);
        document.getElementById('mtInitBanner')?.style && (document.getElementById('mtInitBanner').style.display = 'none');
      }
    }
  } catch (e) {
    console.warn('mtEnsureSheetsAndLoad init:', e.message);
  }

  mtLoadUsers();
  mtLoadOrgsForSelect();
}

// Đảm bảo sheet tồn tại rồi mới load tab Cơ sở Đoàn
async function mtEnsureAndLoadOrgs() {
  const cfg = MTConfig.get();
  const el  = document.getElementById('mtOrgList');
  if (!cfg?.spreadsheetId || !cfg?.serviceAccountJson) {
    mtLoadOrgs(); return;
  }
  if (el) el.innerHTML = '<div style="text-align:center;padding:16px;color:var(--gray)"><i class="fas fa-spinner fa-spin"></i> Đang kiểm tra...</div>';
  try {
    await MTAdmin._ensureSheets(cfg.serviceAccountJson, cfg.spreadsheetId);
    const metaRows = await SheetsAPI.read(cfg.spreadsheetId, `${SH.META}!A:B`);
    if (!metaRows || metaRows.length < 2) await MTAdmin._initHeaders(cfg.spreadsheetId);
  } catch (e) { console.warn('mtEnsureAndLoadOrgs:', e.message); }
  mtLoadOrgs();
  mtLoadOrgsForSelect();
}

async function mtLoadUsers() {
  const el = document.getElementById('mtUserList');
  if (!el) return;
  el.innerHTML = '<div style="text-align:center;padding:20px;color:var(--gray)"><i class="fas fa-spinner fa-spin"></i> Đang tải...</div>';
  try {
    const users = await MTUserMgr.listUsers();
    if (!users.length) {
      el.innerHTML = `
        <div style="text-align:center;padding:24px;color:var(--gray)">
          <i class="fas fa-users" style="font-size:2rem;opacity:0.3;display:block;margin-bottom:8px"></i>
          <div style="font-weight:600;margin-bottom:4px">Chưa có người dùng nào</div>
          <div style="font-size:0.78rem;margin-bottom:12px">Sheet <code>system_users</code> trống hoặc chưa được khởi tạo.</div>
          <button class="btn btn-outline btn-sm" onclick="mtEnsureSheetsAndLoad()">
            <i class="fas fa-sync-alt"></i> Khởi tạo lại &amp; Tải
          </button>
        </div>`;
      return;
    }

    el.innerHTML = `
<table class="doc-table" style="width:100%">
  <thead><tr>
    <th>Người dùng</th><th>Vai trò</th><th>Cơ sở Đoàn</th><th>Trạng thái</th><th>Lần cuối</th><th></th>
  </tr></thead>
  <tbody>
    ${users.map((u, i) => `
    <tr>
      <td><div style="font-weight:700">${u.displayName || u.username}</div><div style="font-size:0.72rem;color:var(--gray)">@${u.username}</div></td>
      <td><span style="display:inline-flex;align-items:center;gap:5px;padding:3px 10px;border-radius:20px;background:rgba(26,35,64,0.08);font-size:0.72rem;font-weight:700;color:${MT_ROLES[u.role]?.color||'var(--gray)'}">
        <i class="fas ${MT_ROLES[u.role]?.icon||'fa-user'}"></i> ${MT_ROLES[u.role]?.label||u.role}
      </span></td>
      <td style="font-size:0.8rem">${u.orgName || u.orgId || '—'}</td>
      <td><span style="font-size:0.72rem;color:${u.status==='active'?'#16a34a':u.status==='pending'?'#d97706':'#9ca3af'}">${u.status==='active'?'Hoạt động':u.status==='pending'?'Chờ kích hoạt':'Vô hiệu'}</span></td>
      <td style="font-size:0.72rem;color:var(--gray)">${u.lastLogin ? new Date(u.lastLogin).toLocaleDateString('vi-VN') : '—'}</td>
      <td>
        <button class="btn btn-ghost btn-sm" onclick="mtChangeRole('@${u.username}','admin')" title="Đổi role"><i class="fas fa-user-edit"></i></button>
        <button class="btn btn-ghost btn-sm" style="color:var(--red)" onclick="mtRemoveUser('${u.username}')" title="Xoá"><i class="fas fa-user-times"></i></button>
      </td>
    </tr>`).join('')}
  </tbody>
</table>`;
  } catch (e) {
    el.innerHTML = `
      <div style="color:#dc2626;padding:16px;background:rgba(220,38,38,0.05);border-radius:8px;border:1px solid rgba(220,38,38,0.15)">
        <div style="font-weight:700;margin-bottom:4px"><i class="fas fa-exclamation-triangle"></i> Lỗi tải dữ liệu</div>
        <div style="font-size:0.8rem;margin-bottom:10px">${e.message}</div>
        <button class="btn btn-outline btn-sm" onclick="mtEnsureSheetsAndLoad()">
          <i class="fas fa-sync-alt"></i> Thử lại
        </button>
      </div>`;
  }
}

async function mtLoadOrgs() {
  const el = document.getElementById('mtOrgList');
  if (!el) return;
  el.innerHTML = '<div style="text-align:center;padding:20px;color:var(--gray)"><i class="fas fa-spinner fa-spin"></i></div>';
  try {
    const orgs = await MTUserMgr.listOrgs();
    if (!orgs.length) { el.innerHTML = '<div style="color:var(--gray);text-align:center;padding:16px">Chưa có cơ sở Đoàn. Thêm mới bên trên.</div>'; return; }
    el.innerHTML = orgs.map(o => `
<div style="display:flex;align-items:center;gap:12px;padding:10px;border-radius:8px;border:1px solid var(--gray-light);margin-bottom:8px">
  <div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,var(--red),var(--gold));display:flex;align-items:center;justify-content:center;color:#fff;font-size:1rem;flex-shrink:0">
    <i class="fas fa-school"></i>
  </div>
  <div style="flex:1">
    <div style="font-weight:700;color:var(--navy)">${o.name}</div>
    <div style="font-size:0.72rem;color:var(--gray)">ID: ${o.id} ${o.secretary ? '· Bí thư: ' + o.secretary : ''}</div>
  </div>
  <code style="font-size:0.7rem;color:var(--gray);background:var(--cream);padding:3px 8px;border-radius:6px">${o.id}</code>
</div>`).join('');
  } catch (e) {
    el.innerHTML = `
      <div style="color:#dc2626;padding:14px;background:rgba(220,38,38,0.05);border-radius:8px;border:1px solid rgba(220,38,38,0.15)">
        <div style="font-weight:700;margin-bottom:4px"><i class="fas fa-exclamation-triangle"></i> Lỗi tải dữ liệu</div>
        <div style="font-size:0.8rem;margin-bottom:10px">${e.message}</div>
        <button class="btn btn-outline btn-sm" onclick="mtEnsureAndLoadOrgs()">
          <i class="fas fa-sync-alt"></i> Thử lại
        </button>
      </div>`;
  }
}

async function mtLoadOrgsForSelect() {
  const sel = document.getElementById('mtInviteOrg');
  if (!sel) return;
  try {
    const orgs = await MTUserMgr.listOrgs();
    sel.innerHTML = `<option value="all">Toàn hệ thống (Admin)</option>` +
      orgs.map(o => `<option value="${o.id}">${o.name}</option>`).join('');
  } catch { sel.innerHTML = '<option value="">Lỗi tải cơ sở đoàn</option>'; }
}

async function mtAddOrg() {
  const name = document.getElementById('mtNewOrgName')?.value.trim();
  if (!name) { if (typeof toast === 'function') toast('Vui lòng nhập tên cơ sở Đoàn', 'warning'); return; }
  try {
    await MTUserMgr.addOrg({ name });
    document.getElementById('mtNewOrgName').value = '';
    if (typeof toast === 'function') toast('Đã thêm cơ sở Đoàn: ' + name, 'success');
    mtLoadOrgs();
    mtLoadOrgsForSelect();
  } catch (e) {
    if (typeof toast === 'function') toast('Lỗi: ' + e.message, 'error');
  }
}

async function mtCreateInvite() {
  const username = document.getElementById('mtInviteUsername')?.value.trim();
  const role     = document.getElementById('mtInviteRole')?.value || 'member';
  const orgSel   = document.getElementById('mtInviteOrg');
  const orgId    = orgSel?.value || 'all';
  const orgName  = orgSel?.options[orgSel.selectedIndex]?.text || '';

  if (!username) { if (typeof toast === 'function') toast('Vui lòng nhập tên đăng nhập', 'warning'); return; }

  try {
    const { code } = await MTAdmin.generateInviteCode(username, role, orgId, orgName);
    const resEl = document.getElementById('mtInviteResult');
    const codeEl = document.getElementById('mtInviteCodeDisplay');
    if (resEl) resEl.style.display = 'block';
    if (codeEl) codeEl.textContent = code.match(/.{1,4}/g)?.join(' ') || code;
    if (typeof toast === 'function') toast('✅ Đã tạo mã mời thành công!', 'success');
  } catch (e) {
    if (typeof toast === 'function') toast('Lỗi: ' + e.message, 'error');
  }
}

function mtCopyInviteCode(el) {
  const code = el?.textContent?.replace(/\s/g, '');
  if (!code) return;
  navigator.clipboard?.writeText(code);
  if (typeof toast === 'function') toast('Đã sao chép mã mời!', 'success');
}

function mtShareInviteCode() {
  const codeEl = document.getElementById('mtInviteCodeDisplay');
  const code   = codeEl?.textContent?.replace(/\s/g, '') || '';
  const text   = `Mã mời ĐoànVăn: ${code}\nDùng để đăng nhập hệ thống quản lý Đoàn TNCS HCM`;
  if (navigator.share) {
    navigator.share({ title: 'Mã mời ĐoànVăn', text });
  } else {
    navigator.clipboard?.writeText(text);
    if (typeof toast === 'function') toast('Đã sao chép nội dung chia sẻ!', 'success');
  }
}

async function mtRemoveUser(username) {
  if (!confirm(`Vô hiệu hóa tài khoản "${username}"?`)) return;
  try {
    await MTUserMgr.removeUser(username);
    if (typeof toast === 'function') toast('Đã vô hiệu hóa tài khoản', 'success');
    mtLoadUsers();
  } catch (e) {
    if (typeof toast === 'function') toast('Lỗi: ' + e.message, 'error');
  }
}

// ─────────────────────────────────────────────────────────────────────
//  L. UI — USER JOIN MODAL (dùng Invite Code)
// ─────────────────────────────────────────────────────────────────────
function mtShowJoinModal() {
  if (document.getElementById('mtJoinModal')) return;

  const modal = document.createElement('div');
  modal.id    = 'mtJoinModal';
  modal.className = 'modal-overlay';
  modal.innerHTML = `
<div class="modal" style="max-width:480px">
  <div class="modal-header">
    <h2><i class="fas fa-link" style="color:var(--red);margin-right:8px"></i> Tham gia bằng Mã mời</h2>
    <button class="btn btn-ghost" onclick="document.getElementById('mtJoinModal').remove()"><i class="fas fa-times"></i></button>
  </div>
  <div class="modal-body" style="padding:24px">
    <div style="background:rgba(26,35,64,0.04);border-radius:12px;padding:14px;margin-bottom:16px;font-size:0.82rem;color:var(--text-soft)">
      Nhập mã mời được cấp bởi Admin để kết nối với hệ thống Google Sheet chung của tổ chức.
    </div>
    <div class="form-group">
      <label class="form-label">Mã mời <span class="required">*</span></label>
      <input class="form-control" id="mtJoinCode" placeholder="VD: AB12 CD34 EF56"
        style="letter-spacing:4px;font-family:monospace;font-size:1.2rem;text-align:center;text-transform:uppercase"
        maxlength="14" oninput="this.value=this.value.toUpperCase()">
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Tên đăng nhập</label>
        <input class="form-control" id="mtJoinUsername" placeholder="Tên đăng nhập" style="font-size:16px">
      </div>
      <div class="form-group">
        <label class="form-label">Tên hiển thị</label>
        <input class="form-control" id="mtJoinDisplay" placeholder="Họ và tên" style="font-size:16px">
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Tạo mã PIN (4-8 số)</label>
      <input type="password" class="form-control" id="mtJoinPIN" placeholder="Tạo mã PIN của bạn"
        maxlength="8" inputmode="numeric" style="font-size:1.2rem;letter-spacing:8px">
    </div>
    <div id="mtJoinStatus" style="font-size:0.82rem;margin-bottom:12px;min-height:18px"></div>
    <button class="btn btn-primary" onclick="mtDoJoin()" style="width:100%">
      <i class="fas fa-link"></i> Kết nối & Tải dữ liệu
    </button>
  </div>
</div>`;

  document.body.appendChild(modal);
  modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
  setTimeout(() => modal.classList.add('open'), 10);
}

async function mtDoJoin() {
  const code     = document.getElementById('mtJoinCode')?.value.trim().replace(/\s/g,'').toUpperCase();
  const username = document.getElementById('mtJoinUsername')?.value.trim();
  const display  = document.getElementById('mtJoinDisplay')?.value.trim();
  const pin      = document.getElementById('mtJoinPIN')?.value.trim();
  const status   = document.getElementById('mtJoinStatus');

  if (!code || code.length < 8) { status.innerHTML = '<span style="color:red">Vui lòng nhập mã mời hợp lệ</span>'; return; }
  if (!username) { status.innerHTML = '<span style="color:red">Vui lòng nhập tên đăng nhập</span>'; return; }

  status.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang xác thực...';
  try {
    const cfg = await MTAuth.joinWithCode(code, username, display, pin);
    status.innerHTML = `<span style="color:#16a34a"><i class="fas fa-check-circle"></i> Kết nối thành công! Vai trò: ${MT_ROLES[cfg.role]?.label}</span>`;
    if (typeof toast === 'function') toast(`🎉 Chào mừng ${display || username}! Đang tải dữ liệu...`, 'success');
    setTimeout(async () => {
      document.getElementById('mtJoinModal')?.remove();
      mtUpdateUIAfterLogin();
      // Pull dữ liệu về
      try {
        await MTSync.pullAll(() => {});
        if (typeof toast === 'function') toast('✅ Đã tải dữ liệu từ hệ thống!', 'success');
      } catch { /**/ }
    }, 1200);
  } catch (e) {
    status.innerHTML = `<span style="color:red"><i class="fas fa-times-circle"></i> Lỗi: ${e.message}</span>`;
  }
}

// ─────────────────────────────────────────────────────────────────────
//  M. SETTINGS PAGE INJECTION — Thêm section Hệ thống vào trang Cài đặt
// ─────────────────────────────────────────────────────────────────────
function mtInjectSettingsSection() {
  // Tìm card Quản lý dữ liệu và thêm section trước nó
  const cards = document.querySelectorAll('#page-settings .card');
  if (!cards.length) return;
  const targetCard = cards[cards.length - 2] || cards[0]; // card gần cuối

  if (document.getElementById('mtSettingsSection')) return;

  const section = document.createElement('div');
  section.id    = 'mtSettingsSection';
  section.className = 'card';
  section.style.marginBottom = '16px';
  section.innerHTML = `
<div class="settings-section">
  <h3>
    <i class="fas fa-network-wired" style="color:var(--red);margin-right:8px"></i>
    Hệ thống đa người dùng
    <span id="mtRoleBadge" style="margin-left:8px;font-size:0.65rem;padding:3px 10px;border-radius:20px;background:rgba(192,57,43,0.1);color:var(--red);font-weight:700;vertical-align:middle"></span>
  </h3>

  <div id="mtSystemStatus" style="background:var(--cream);border-radius:10px;padding:12px;margin-bottom:14px;font-size:0.8rem">
    <div style="text-align:center;color:var(--gray)"><i class="fas fa-spinner fa-spin"></i> Đang kiểm tra...</div>
  </div>

  <div style="display:flex;flex-direction:column;gap:8px">
    <div id="mtAdminBtns" style="display:none;flex-direction:column;gap:8px">
      <button class="btn btn-primary" onclick="mtShowAdminSetup()">
        <i class="fas fa-cog"></i> Cấu hình lại hệ thống Admin
      </button>
      <button class="btn btn-gold" onclick="mtShowInviteManager()">
        <i class="fas fa-user-plus"></i> Quản lý người dùng & Mã mời
      </button>
    </div>
    <button class="btn btn-outline" onclick="mtShowJoinModal()">
      <i class="fas fa-link"></i> Tham gia bằng Mã mời
    </button>
    <button class="btn btn-outline" onclick="mtManualSync('pull')">
      <i class="fas fa-cloud-download-alt"></i> Tải dữ liệu từ hệ thống
    </button>
    <button class="btn btn-outline" onclick="mtManualSync('push')">
      <i class="fas fa-cloud-upload-alt"></i> Đẩy dữ liệu lên hệ thống
    </button>
    <button class="btn btn-outline" style="color:var(--gray)" onclick="mtSetupFirst()">
      <i class="fas fa-shield-alt"></i> Thiết lập Admin (lần đầu)
    </button>
  </div>
</div>`;

  targetCard.parentNode.insertBefore(section, targetCard);
  mtRefreshSystemStatus();
}

function mtRefreshSystemStatus() {
  const cfg = MTConfig.get();
  const el  = document.getElementById('mtSystemStatus');
  const badge = document.getElementById('mtRoleBadge');
  const adminBtns = document.getElementById('mtAdminBtns');

  if (!el) return;

  if (!cfg?.spreadsheetId) {
    el.innerHTML = `<div style="color:var(--gray);text-align:center">
      <i class="fas fa-unlink" style="font-size:1.4rem;margin-bottom:6px;display:block"></i>
      Chưa kết nối hệ thống. Nhập <strong>Mã mời</strong> hoặc <strong>Thiết lập Admin</strong>.
    </div>`;
    if (badge) badge.textContent = 'Chưa kết nối';
    if (adminBtns) adminBtns.style.display = 'none';
    return;
  }

  const role    = cfg.role || 'member';
  const roleInfo = MT_ROLES[role] || MT_ROLES.member;
  const lastSync = cfg.lastSync ? new Date(cfg.lastSync).toLocaleString('vi-VN') : 'Chưa đồng bộ';

  el.innerHTML = `
<div style="display:flex;flex-direction:column;gap:6px">
  <div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0;border-bottom:1px solid var(--gray-light)">
    <span>Trạng thái</span>
    <span style="color:#16a34a;font-weight:700"><i class="fas fa-check-circle"></i> Đã kết nối</span>
  </div>
  <div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid var(--gray-light)">
    <span>Người dùng</span><span style="font-weight:700">${cfg.user?.displayName || cfg.user?.username || '—'}</span>
  </div>
  <div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid var(--gray-light)">
    <span>Vai trò</span>
    <span style="color:${roleInfo.color};font-weight:700"><i class="fas ${roleInfo.icon}"></i> ${roleInfo.label}</span>
  </div>
  <div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid var(--gray-light)">
    <span>Cơ sở Đoàn</span><span style="font-weight:700">${cfg.orgName || cfg.orgId || '—'}</span>
  </div>
  <div style="display:flex;justify-content:space-between;padding:6px 0">
    <span>Lần cuối đồng bộ</span><span style="font-size:0.75rem">${lastSync}</span>
  </div>
</div>`;

  if (badge) { badge.textContent = roleInfo.label; badge.style.color = roleInfo.color; }
  if (adminBtns) adminBtns.style.display = cfg.role === 'admin' ? 'flex' : 'none';
}

async function mtManualSync(direction = 'pull') {
  _mtUpdateSyncBadge('syncing', 'Đang đồng bộ...');
  try {
    if (direction === 'pull') {
      await MTSync.pullAll((msg, pct) => {});
      if (typeof toast === 'function') toast('✅ Đã tải dữ liệu mới nhất từ hệ thống!', 'success');
    } else {
      const res = await MTSync.pushAll((msg, pct) => {});
      if (typeof toast === 'function') toast(`✅ Đã đẩy lên: ${res.docs} văn bản, ${res.members} đoàn viên`, 'success');
    }
    mtRefreshSystemStatus();
  } catch (e) {
    _mtUpdateSyncBadge('error', 'Lỗi đồng bộ');
    if (typeof toast === 'function') toast('Lỗi: ' + e.message, 'error');
  }
}

function mtSetupFirst() {
  if (MTConfig.isConfigured()) {
    if (!confirm('Hệ thống đã được cấu hình. Bạn có muốn cấu hình lại?')) return;
  }
  mtShowAdminSetup();
}

// ─────────────────────────────────────────────────────────────────────
//  N. INIT — Tích hợp vào ứng dụng chính
// ─────────────────────────────────────────────────────────────────────
function mtUpdateUIAfterLogin() {
  const cfg = MTConfig.get();
  if (!cfg) return;

  // Cập nhật user chip (từ doanvan-mobile-sync.js)
  const avatar = document.getElementById('dvUserAvatar');
  const name   = document.getElementById('dvUserName');
  if (avatar) avatar.textContent = (cfg.user?.displayName || cfg.user?.username || 'U')[0].toUpperCase();
  if (name)   name.textContent   = cfg.user?.displayName || cfg.user?.username || 'Người dùng';

  // Badge vai trò
  const roleInfo = MT_ROLES[cfg.role] || MT_ROLES.member;
  _mtUpdateSyncBadge('synced', roleInfo.label);

  // Ẩn/hiện menu admin trong sidebar
  const adminNavSection = document.getElementById('mtAdminNav');
  if (adminNavSection) adminNavSection.style.display = cfg.role === 'admin' ? 'block' : 'none';

  mtRefreshSystemStatus();
}

function mtInit() {
  // Chờ DOM sẵn sàng
  const tryInit = () => {
    const pageSettings = document.getElementById('page-settings');
    if (!pageSettings) { setTimeout(tryInit, 500); return; }

    // Inject section cài đặt
    mtInjectSettingsSection();

    // Kiểm tra nếu đã login → update UI
    const cfg = MTConfig.get();
    if (cfg?.spreadsheetId) {
      if (!MTAuth.isLoggedIn()) {
        // Chưa có session → PIN login (nếu doanvan-mobile-sync.js đang dùng)
        // Tích hợp với auth flow hiện có
        const origLogin = window.dvShowAuthModal;
        if (typeof origLogin === 'function') {
          // auth đã có PIN-based, chỉ cần patch submit
          window._mtAfterLogin = mtUpdateUIAfterLogin;
        }
      } else {
        mtUpdateUIAfterLogin();
        // Auto pull nếu có config
        if (cfg.spreadsheetId) {
          setTimeout(() => {
            MTSync.pullAll(() => {}).catch(() => {});
          }, 3000);
        }
      }
    }

    // Patch DB để auto-sync sau mỗi thay đổi
    if (typeof DB !== 'undefined') {
      const origSet  = DB.set.bind(DB);
      const origPush = DB.push.bind(DB);
      const origUpd  = DB.update.bind(DB);
      const origRem  = DB.remove.bind(DB);

      const scheduleIfNeeded = () => {
        const c = MTConfig.get();
        if (c?.spreadsheetId && c?.serviceAccountJson) MTSync.scheduleAutoSync();
      };

      DB.set    = (k, v) => { const r = origSet(k, v);    scheduleIfNeeded(); return r; };
      DB.push   = (k, v) => { const r = origPush(k, v);   scheduleIfNeeded(); return r; };
      DB.update = (k,id,p) => { origUpd(k,id,p);          scheduleIfNeeded(); };
      DB.remove = (k, id)  => { origRem(k, id);            scheduleIfNeeded(); };
    }

    // Thêm nút Admin vào user menu (nếu là admin)
    const origOpenUserMenu = window.dvOpenUserMenu;
    if (typeof origOpenUserMenu === 'function') {
      window.dvOpenUserMenu = function() {
        origOpenUserMenu();
        // Chèn thêm mục Admin vào menu sau khi render
        setTimeout(() => {
          const menu = document.getElementById('dvUserMenuDrop');
          const cfg  = MTConfig.get();
          if (!menu || !cfg) return;
          if (cfg.role === 'admin') {
            const adminBtn = document.createElement('div');
            adminBtn.innerHTML = `<button onclick="mtShowInviteManager();document.getElementById('dvUserMenuDrop')?.remove()"
              style="display:flex;align-items:center;gap:10px;width:100%;padding:10px 12px;border:none;background:none;cursor:pointer;border-radius:8px;font-family:'Be Vietnam Pro',sans-serif;font-size:0.82rem;font-weight:600;color:var(--red)"
              onmouseover="this.style.background='rgba(192,57,43,0.06)'" onmouseout="this.style.background='none'">
              <i class="fas fa-user-plus" style="width:16px;text-align:center"></i>Quản lý người dùng</button>`;
            menu.insertBefore(adminBtn.firstChild, menu.firstChild);
          }
        }, 50);
      };
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tryInit);
  } else {
    tryInit();
  }
}

// Khởi chạy
mtInit();

// Export global
window.MTConfig   = MTConfig;
window.MTAuth     = MTAuth;
window.MTSync     = MTSync;
window.MTAdmin    = MTAdmin;
window.MTUserMgr  = MTUserMgr;

window.mtShowAdminSetup    = mtShowAdminSetup;
window.mtShowInviteManager = mtShowInviteManager;
window.mtShowJoinModal     = mtShowJoinModal;
window.mtManualSync        = mtManualSync;
window.mtSetupFirst        = mtSetupFirst;
window.mtDoAdminSetup      = mtDoAdminSetup;
window.mtTestSA            = mtTestSA;
window.mtGoStep            = mtGoStep;
window.mtCreateInvite      = mtCreateInvite;
window.mtDoJoin            = mtDoJoin;
window.mtLoadUsers         = mtLoadUsers;
window.mtLoadOrgs          = mtLoadOrgs;
window.mtAddOrg            = mtAddOrg;
window.mtRemoveUser        = mtRemoveUser;
window.mtInviteTab         = mtInviteTab;
window.mtCopyInviteCode    = mtCopyInviteCode;
window.mtShareInviteCode   = mtShareInviteCode;
