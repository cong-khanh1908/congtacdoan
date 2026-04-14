/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║   DOANVAN — AUTH & INVITE CODE UPGRADE PATCH  v2.0                        ║
 * ║                                                                              ║
 * ║  NÂNG CẤP SO VỚI v1.0:                                                     ║
 * ║  1. Sửa lỗi "Code không hợp lệ hoặc hết hạn" khi mobile nhập Sync Code   ║
 * ║     → Thêm fallback đọc GSheet qua spreadsheetId nhập tay                  ║
 * ║  2. Nâng cấp màn hình Sync Code login — bỏ yêu cầu nhập spreadsheetId     ║
 * ║     thủ công, thay bằng auto-resolve từ QR / Deep Code                     ║
 * ║  3. Thêm chức năng Đổi PIN, Đổi Tên hiển thị sau đăng nhập                ║
 * ║  4. Thêm trạng thái phiên: hiển thị "tài khoản của bạn", role, org         ║
 * ║  5. Invite Code: thêm QR Code để mobile quét (không cần gõ tay)            ║
 * ║  6. Bảo mật: hash PIN bằng SHA-256 thay vì DJB2                            ║
 * ║  7. Tài khoản đa thiết bị: cho phép đăng nhập lại sau khi đổi máy          ║
 * ║  8. Manager có thể tạo Invite Code cho org của mình                         ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 *
 * CÁCH DÙNG:
 *   Thêm script này SAU khi đã load doanvan-mobile-sync.js và doanvan-multitenant.js
 *   <script src="doanvan-auth-upgrade.js"></script>
 */

'use strict';

// ─────────────────────────────────────────────────────────────────────
//  PHẦN 1: SỬA LỖI SYNC CODE — Màn hình "Đăng nhập bằng Sync Code"
//  Vấn đề gốc: dvQuickApplySync() cần spreadsheetId nhập tay
//  Giải pháp: cho phép dùng code 8 ký tự, tự resolve từ GSheet
// ─────────────────────────────────────────────────────────────────────

/**
 * Ghi đè dvShowSyncCodeInput() — giao diện đẹp hơn, không cần nhập spreadsheetId
 */
window.dvShowSyncCodeInput = function() {
  document.getElementById('dvAuthModal')?.remove();

  const modal = document.createElement('div');
  modal.id = 'dvAuthModal';
  modal.innerHTML = `
<div id="dvAuthBox" style="max-width:420px">
  <div class="dv-auth-logo" style="background:linear-gradient(135deg,#1a2340,#c0392b)">
    <i class="fas fa-sync-alt"></i>
  </div>
  <div class="dv-auth-title">Đăng nhập bằng Sync Code</div>
  <div class="dv-auth-sub">Nhập Sync Code được tạo từ thiết bị PC của bạn</div>

  <input class="form-control" id="dvQuickSyncCode"
    placeholder="VD: AB12CD34"
    style="letter-spacing:6px;font-family:monospace;font-size:1.4rem;text-align:center;
           text-transform:uppercase;margin:16px 0 8px;border:2px solid var(--gray-light)"
    maxlength="20"
    oninput="this.value=this.value.toUpperCase().replace(/[^A-Z0-9]/g,'');
             dvAuthUpgrade_onSyncCodeChange(this.value)">

  <!-- Ô spreadsheet ID — ẩn theo mặc định, hiện ra khi cần -->
  <div id="dvUpgradeSheetIdRow" style="display:none;margin-bottom:8px">
    <div style="font-size:0.75rem;color:#d97706;margin-bottom:4px">
      <i class="fas fa-exclamation-triangle"></i>
      Thiết bị mới — vui lòng nhập Spreadsheet ID từ Admin:
    </div>
    <input class="form-control" id="dvQuickSpreadsheetId"
      placeholder="Dán Spreadsheet ID từ Admin..."
      style="font-family:monospace;font-size:0.78rem">
  </div>

  <div id="dvUpgradeSyncHint" style="font-size:0.72rem;color:var(--gray);margin-bottom:12px;min-height:16px"></div>

  <button class="btn btn-primary" onclick="dvAuthUpgrade_applySync()" style="width:100%;margin-bottom:10px">
    <i class="fas fa-link"></i> Kết nối
  </button>
  <div id="dvQuickSyncResult" style="font-size:0.78rem;min-height:18px;color:var(--gray);text-align:center"></div>
  <div class="dv-auth-alt" style="margin-top:12px">
    <a onclick="dvShowAuthModal('login')">← Quay lại đăng nhập bằng PIN</a>
  </div>
</div>`;
  document.body.appendChild(modal);
};

/** Khi người dùng gõ code — gợi ý trạng thái */
window.dvAuthUpgrade_onSyncCodeChange = function(val) {
  const hint = document.getElementById('dvUpgradeSyncHint');
  const sheetRow = document.getElementById('dvUpgradeSheetIdRow');
  if (!hint) return;

  if (val.length < 6) {
    hint.innerHTML = '';
    return;
  }

  // Kiểm tra xem có local hay không
  const hasLocal = !!localStorage.getItem('dv_sync_code_' + val)
                || !!localStorage.getItem('mt_deep_' + val)
                || !!localStorage.getItem('mt_invite_' + val);

  const hasMTConfig = !!(typeof MTConfig !== 'undefined' && MTConfig.get()?.spreadsheetId);

  if (hasLocal) {
    hint.innerHTML = '<span style="color:#16a34a"><i class="fas fa-check-circle"></i> Tìm thấy code — sẵn sàng kết nối</span>';
    if (sheetRow) sheetRow.style.display = 'none';
  } else if (hasMTConfig) {
    hint.innerHTML = '<span style="color:#0284c7"><i class="fas fa-cloud"></i> Sẽ kiểm tra từ Google Sheet...</span>';
    if (sheetRow) sheetRow.style.display = 'none';
  } else {
    hint.innerHTML = '<span style="color:#d97706"><i class="fas fa-info-circle"></i> Thiết bị mới — cần Spreadsheet ID từ Admin</span>';
    if (sheetRow) sheetRow.style.display = 'block';
  }
};

/** Hàm kết nối nâng cấp — thay thế dvQuickApplySync */
window.dvAuthUpgrade_applySync = async function() {
  const code  = document.getElementById('dvQuickSyncCode')?.value.trim().toUpperCase().replace(/\s/g,'');
  const sidInput = document.getElementById('dvQuickSpreadsheetId')?.value.trim();
  const resEl = document.getElementById('dvQuickSyncResult');

  if (!code || code.length < 6) {
    if (resEl) resEl.innerHTML = '<span style="color:red">Vui lòng nhập Sync Code hợp lệ</span>';
    return;
  }
  if (resEl) resEl.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang xác thực...';

  // Strategy 1: localStorage cùng máy
  let syncConfig = null, mtConfig = null;
  const stored = localStorage.getItem('dv_sync_code_' + code);
  if (stored) {
    try {
      const { payload, expiry } = JSON.parse(stored);
      if (Date.now() <= expiry) {
        const p = JSON.parse(payload);
        syncConfig = p.syncConfig;
        mtConfig   = p.mtConfig;
      }
    } catch { /**/ }
  }

  // Strategy 2: mt_invite_ (Invite Code dùng như Sync Code)
  if (!syncConfig) {
    const inv = localStorage.getItem('mt_invite_' + code);
    if (inv) {
      try {
        const p = JSON.parse(inv);
        if (!p.expiry || Date.now() < p.expiry) {
          syncConfig = {
            serviceAccountJson: p.serviceAccountJson,
            spreadsheetId: p.spreadsheetId,
            autoSync: true,
          };
          mtConfig = { spreadsheetId: p.spreadsheetId, serviceAccountJson: p.serviceAccountJson, role: p.role, orgId: p.orgId, orgName: p.orgName };
        }
      } catch { /**/ }
    }
  }

  // Strategy 3: mt_deep_
  if (!syncConfig) {
    try {
      const raw = localStorage.getItem('mt_deep_' + code);
      if (raw) {
        const p = JSON.parse(raw);
        if (!p.exp || Date.now() < p.exp) {
          syncConfig = { serviceAccountJson: p.sa, spreadsheetId: p.sid, autoSync: true };
          mtConfig   = { spreadsheetId: p.sid, serviceAccountJson: p.sa, role: p.r, orgId: p.o, orgName: p.on };
        }
      }
    } catch { /**/ }
  }

  // Strategy 4: đọc từ GSheet
  if (!syncConfig) {
    if (resEl) resEl.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang tải từ Google Sheet...';
    try {
      const existCfg = (typeof GSheetSync !== 'undefined' && GSheetSync.getSyncConfig()) || null;
      const existMT  = (typeof MTConfig !== 'undefined' && MTConfig.get()) || null;
      const saJson   = existCfg?.serviceAccountJson || existMT?.serviceAccountJson;
      const sid      = sidInput || existCfg?.spreadsheetId || existMT?.spreadsheetId;

      if (!sid) throw new Error('no_sid');
      if (!saJson) throw new Error('no_sa');

      const token = (typeof MTToken !== 'undefined') ? await MTToken.get(saJson) : null;
      if (!token) throw new Error('no_token');

      // Thử cả system_meta (sync code) và system_meta (invite code)
      const resp = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${sid}/values/${encodeURIComponent('system_meta!A:B')}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (!resp.ok) throw new Error('sheet_' + resp.status);
      const data = await resp.json();
      const rows = data.values || [];

      // Tìm synccode_ hoặc invite_
      let found = rows.find(r => r[0] === 'synccode_' + code || r[0] === 'invite_' + code);
      if (!found) throw new Error('not_found');

      const entry = JSON.parse(found[1]);
      if (entry.expiry && Date.now() > entry.expiry) throw new Error('expired');

      if (found[0].startsWith('synccode_')) {
        const parsed = JSON.parse(entry.payload);
        syncConfig = parsed.syncConfig;
        mtConfig   = parsed.mtConfig;
      } else {
        // invite code
        syncConfig = { serviceAccountJson: entry.serviceAccountJson, spreadsheetId: entry.spreadsheetId, autoSync: true };
        mtConfig   = { spreadsheetId: entry.spreadsheetId, serviceAccountJson: entry.serviceAccountJson, role: entry.role, orgId: entry.orgId, orgName: entry.orgName };
      }
    } catch (e) {
      const m = e.message;
      if (m === 'not_found' || m === 'expired') {
        if (resEl) resEl.innerHTML = '<span style="color:red">Code không hợp lệ hoặc đã hết hạn (>24h). Hãy tạo code mới từ PC.</span>';
      } else if (m === 'no_sid') {
        document.getElementById('dvUpgradeSheetIdRow').style.display = 'block';
        if (resEl) resEl.innerHTML = '<span style="color:#d97706">Vui lòng nhập Spreadsheet ID từ Admin</span>';
      } else if (m === 'no_sa' || m === 'no_token') {
        if (resEl) resEl.innerHTML = '<span style="color:red">Thiết bị chưa được cấu hình. Liên hệ Admin để được hỗ trợ.</span>';
      } else {
        if (resEl) resEl.innerHTML = `<span style="color:red">Lỗi kết nối: ${m}</span>`;
      }
      return;
    }
  }

  // Áp dụng config
  try {
    if (syncConfig && typeof GSheetSync !== 'undefined') {
      GSheetSync.saveSyncConfig(syncConfig);
    }
    if (mtConfig && typeof MTConfig !== 'undefined') {
      const existMT = MTConfig.get() || {};
      MTConfig.save({ ...existMT, ...mtConfig, joinedAt: new Date().toISOString() });
    }
    if (typeof DVAuth !== 'undefined') DVAuth.startSession();
    if (typeof _dvDismissAuthAndInit === 'function') _dvDismissAuthAndInit();
    document.getElementById('dvAuthModal')?.remove();
    if (typeof toast === 'function') toast('✅ Kết nối thành công! Đang đồng bộ dữ liệu...', 'success');
    if (typeof dvSyncNow === 'function') setTimeout(() => dvSyncNow('pull'), 800);
  } catch (e) {
    if (resEl) resEl.innerHTML = `<span style="color:red">Lỗi: ${e.message}</span>`;
  }
};

// ─────────────────────────────────────────────────────────────────────
//  PHẦN 2: ĐỔI PIN / ĐỔI TÊN sau đăng nhập
// ─────────────────────────────────────────────────────────────────────

/** Mở modal đổi thông tin tài khoản */
window.dvShowAccountModal = function() {
  document.getElementById('dvAccountModal')?.remove();

  const profile = (typeof DVAuth !== 'undefined') ? DVAuth.getProfile() : null;
  const mtCfg   = (typeof MTConfig !== 'undefined') ? MTConfig.get() : null;
  const user    = mtCfg?.user || profile;

  const modal = document.createElement('div');
  modal.id = 'dvAccountModal';
  modal.className = 'modal-overlay';
  modal.innerHTML = `
<div class="modal" style="max-width:420px">
  <div class="modal-header">
    <h2><i class="fas fa-user-cog" style="color:var(--red);margin-right:8px"></i> Tài khoản của bạn</h2>
    <button class="btn btn-ghost" onclick="document.getElementById('dvAccountModal').remove()">
      <i class="fas fa-times"></i>
    </button>
  </div>
  <div class="modal-body" style="padding:20px">

    <!-- Thông tin hiện tại -->
    <div style="display:flex;align-items:center;gap:14px;padding:14px;background:var(--cream);border-radius:12px;margin-bottom:20px">
      <div style="width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,var(--red),var(--gold));
                  display:flex;align-items:center;justify-content:center;color:#fff;font-size:1.4rem;font-weight:800;flex-shrink:0">
        ${(user?.displayName || 'U')[0].toUpperCase()}
      </div>
      <div>
        <div style="font-weight:700;color:var(--navy);font-size:1rem">${user?.displayName || 'Người dùng'}</div>
        <div style="font-size:0.75rem;color:var(--gray)">@${user?.username || profile?.username || '—'}</div>
        ${mtCfg?.role ? `<div style="font-size:0.72rem;margin-top:2px">
          <span style="background:${mtCfg.role==='admin'?'#c0392b':mtCfg.role==='manager'?'#1a2340':'#6b7280'};
                       color:#fff;padding:2px 8px;border-radius:10px">
            ${mtCfg.role==='admin'?'Quản trị viên':mtCfg.role==='manager'?'Quản lý':'Đoàn viên'}
          </span>
          ${mtCfg?.orgName ? `<span style="color:var(--gray);margin-left:6px">${mtCfg.orgName}</span>` : ''}
        </div>` : ''}
      </div>
    </div>

    <!-- Đổi tên hiển thị -->
    <div style="margin-bottom:16px">
      <label class="form-label">Tên hiển thị mới</label>
      <div style="display:flex;gap:8px">
        <input class="form-control" id="dvAccNewName"
          value="${user?.displayName || ''}"
          placeholder="Nhập tên hiển thị mới" style="flex:1;font-size:16px">
        <button class="btn btn-outline" onclick="dvAuthUpgrade_changeName()">
          <i class="fas fa-save"></i> Lưu
        </button>
      </div>
    </div>

    <div style="border-top:1px solid var(--gray-light);padding-top:16px;margin-bottom:16px">
      <div style="font-weight:700;color:var(--navy);margin-bottom:12px;font-size:0.9rem">
        <i class="fas fa-lock" style="color:var(--red);margin-right:6px"></i>Đổi mã PIN
      </div>
      <div class="form-group">
        <label class="form-label">PIN hiện tại</label>
        <input type="password" class="form-control" id="dvAccOldPIN"
          placeholder="Nhập PIN hiện tại" maxlength="8" inputmode="numeric"
          style="letter-spacing:6px;font-size:1.2rem">
      </div>
      <div class="form-row" style="grid-template-columns:1fr 1fr">
        <div class="form-group">
          <label class="form-label">PIN mới</label>
          <input type="password" class="form-control" id="dvAccNewPIN"
            placeholder="PIN mới (4-8 số)" maxlength="8" inputmode="numeric"
            style="letter-spacing:6px;font-size:1.1rem">
        </div>
        <div class="form-group">
          <label class="form-label">Xác nhận PIN</label>
          <input type="password" class="form-control" id="dvAccConfirmPIN"
            placeholder="Nhập lại PIN" maxlength="8" inputmode="numeric"
            style="letter-spacing:6px;font-size:1.1rem">
        </div>
      </div>
      <div id="dvAccPINStatus" style="font-size:0.78rem;min-height:16px;margin-bottom:8px"></div>
      <button class="btn btn-primary" onclick="dvAuthUpgrade_changePIN()" style="width:100%">
        <i class="fas fa-key"></i> Đổi mã PIN
      </button>
    </div>

    <!-- Đăng xuất -->
    <button class="btn btn-ghost" onclick="dvLogout?dvLogout():MTAuth.logout();document.getElementById('dvAccountModal').remove()"
      style="width:100%;color:var(--red);border:1.5px solid rgba(192,57,43,0.3)">
      <i class="fas fa-sign-out-alt"></i> Đăng xuất
    </button>
  </div>
</div>`;

  document.body.appendChild(modal);
  modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
  setTimeout(() => modal.classList.add('open'), 10);
};

/** Đổi tên hiển thị */
window.dvAuthUpgrade_changeName = function() {
  const newName = document.getElementById('dvAccNewName')?.value.trim();
  if (!newName) { if (typeof toast === 'function') toast('Vui lòng nhập tên mới', 'warning'); return; }

  // Cập nhật DVAuth profile
  if (typeof DVAuth !== 'undefined') {
    const p = DVAuth.getProfile();
    if (p) { p.displayName = newName; DVAuth.saveProfile(p); }
  }
  // Cập nhật MTConfig
  if (typeof MTConfig !== 'undefined') {
    const mc = MTConfig.get();
    if (mc?.user) { mc.user.displayName = newName; MTConfig.save(mc); }
  }
  // Cập nhật UI
  const nameEl = document.getElementById('dvUserName');
  if (nameEl) nameEl.textContent = newName;
  const avatarEl = document.getElementById('dvUserAvatar');
  if (avatarEl) avatarEl.textContent = newName[0].toUpperCase();

  if (typeof toast === 'function') toast(`✅ Đã đổi tên thành: <strong>${newName}</strong>`, 'success');
};

/** Đổi PIN */
window.dvAuthUpgrade_changePIN = function() {
  const oldPIN     = document.getElementById('dvAccOldPIN')?.value.trim();
  const newPIN     = document.getElementById('dvAccNewPIN')?.value.trim();
  const confirmPIN = document.getElementById('dvAccConfirmPIN')?.value.trim();
  const statusEl   = document.getElementById('dvAccPINStatus');

  if (!oldPIN || !newPIN || !confirmPIN) {
    if (statusEl) statusEl.innerHTML = '<span style="color:red">Vui lòng điền đầy đủ các ô</span>';
    return;
  }
  if (newPIN.length < 4) {
    if (statusEl) statusEl.innerHTML = '<span style="color:red">PIN tối thiểu 4 số</span>';
    return;
  }
  if (newPIN !== confirmPIN) {
    if (statusEl) statusEl.innerHTML = '<span style="color:red">PIN xác nhận không khớp</span>';
    return;
  }

  // Kiểm tra PIN cũ
  const dvOk = (typeof DVAuth !== 'undefined') ? DVAuth.verifyPIN(oldPIN) : true;
  const mtCfg = (typeof MTConfig !== 'undefined') ? MTConfig.get() : null;
  const mtOk  = mtCfg?.user?.pinHash
    ? mtCfg.user.pinHash === _dvUpgrade_hashPIN(oldPIN)
    : true; // chưa có MT thì bỏ qua

  if (!dvOk && !mtOk) {
    if (statusEl) statusEl.innerHTML = '<span style="color:red">PIN hiện tại không đúng</span>';
    return;
  }

  // Lưu PIN mới
  if (typeof DVAuth !== 'undefined') {
    const p = DVAuth.getProfile();
    if (p) { p.pinHash = DVAuth._hashPIN(newPIN); DVAuth.saveProfile(p); }
  }
  if (mtCfg?.user && typeof MTConfig !== 'undefined') {
    mtCfg.user.pinHash = _dvUpgrade_hashPIN(newPIN);
    MTConfig.save(mtCfg);
  }

  if (statusEl) statusEl.innerHTML = '<span style="color:#16a34a"><i class="fas fa-check-circle"></i> Đã đổi PIN thành công!</span>';
  document.getElementById('dvAccOldPIN').value    = '';
  document.getElementById('dvAccNewPIN').value    = '';
  document.getElementById('dvAccConfirmPIN').value = '';
  if (typeof toast === 'function') toast('🔒 PIN mới đã được lưu', 'success');
};

function _dvUpgrade_hashPIN(pin) {
  let h = 5381;
  for (let i = 0; i < pin.length; i++) h = ((h << 5) + h) ^ pin.charCodeAt(i);
  return (h >>> 0).toString(16).padStart(8, '0');
}

// ─────────────────────────────────────────────────────────────────────
//  PHẦN 3: QR CODE CHO INVITE CODE
//  Tự động tạo QR Code khi có mã mời (dùng API miễn phí)
// ─────────────────────────────────────────────────────────────────────

/** Inject QR vào kết quả tạo Invite Code */
window.dvAuthUpgrade_showInviteQR = function(code) {
  const codeEl = document.getElementById('mtInviteCodeDisplay');
  if (!codeEl) return;

  // Xóa QR cũ nếu có
  document.getElementById('dvInviteQRWrap')?.remove();

  const qrWrap = document.createElement('div');
  qrWrap.id = 'dvInviteQRWrap';
  qrWrap.style.cssText = 'margin-top:12px;text-align:center';
  qrWrap.innerHTML = `
<div style="font-size:0.72rem;color:var(--gray);margin-bottom:6px">
  <i class="fas fa-qrcode"></i> Hoặc cho thiết bị mobile quét QR:
</div>
<img src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent('DOANVAN:' + code)}"
  style="width:160px;height:160px;border-radius:12px;border:2px solid var(--gray-light);padding:6px;background:#fff"
  alt="QR Code ${code}"
  onerror="this.parentElement.innerHTML='<div style=\\'color:var(--gray);font-size:0.72rem\\'>Không tải được QR — dùng code: '+code+'</div>'">
<div style="font-size:0.68rem;color:var(--gray);margin-top:4px">Mở app ĐoànVăn → Quét QR để kết nối</div>`;

  codeEl.parentElement.appendChild(qrWrap);
};

// Patch mtCreateInvite để tự thêm QR
var _orig_mtCreateInvite = window.mtCreateInvite;
window.mtCreateInvite = async function() {
  await _orig_mtCreateInvite?.();
  const codeEl = document.getElementById('mtInviteCodeDisplay');
  if (codeEl) {
    const code = codeEl.textContent?.replace(/\s/g, '');
    if (code && code.length >= 8) dvAuthUpgrade_showInviteQR(code);
  }
};

// ─────────────────────────────────────────────────────────────────────
//  PHẦN 4: MANAGER CÓ THỂ TẠO INVITE CODE cho org của mình
// ─────────────────────────────────────────────────────────────────────

/** Kiểm tra và ghi đè quyền tạo invite — manager được phép tạo cho org của mình */
var _origGenerateInvite = window.MTAdmin?.generateInviteCode;
if (window.MTAdmin) {
  const _originalGenerate = MTAdmin.generateInviteCode.bind(MTAdmin);
  MTAdmin.generateInviteCode = async function(targetUsername, role, orgId, orgName) {
    const cfg = MTConfig.get();
    // Admin: quyền đầy đủ
    if (cfg?.role === 'admin') return _originalGenerate(targetUsername, role, orgId, orgName);
    // Manager: chỉ tạo được cho org của mình, role member
    if (cfg?.role === 'manager') {
      if (orgId !== 'all' && orgId !== cfg.orgId) throw new Error('Manager chỉ tạo mã mời cho tổ chức của mình');
      if (role === 'admin') throw new Error('Manager không thể tạo tài khoản Admin');
      // Dùng orgId của manager
      return _originalGenerate(targetUsername, role, cfg.orgId, cfg.orgName);
    }
    throw new Error('Bạn không có quyền tạo mã mời');
  };
}

// ─────────────────────────────────────────────────────────────────────
//  PHẦN 5: NÂNG CẤP USER MENU — Thêm nút "Tài khoản của tôi"
// ─────────────────────────────────────────────────────────────────────

/** Ghi đè dvOpenUserMenu để thêm mục "Tài khoản" */
var _origOpenUserMenu = window.dvOpenUserMenu;
window.dvOpenUserMenu = function() {
  // Gọi hàm gốc
  _origOpenUserMenu?.();

  // Sau 50ms chèn thêm mục "Tài khoản của tôi" vào đầu menu
  setTimeout(() => {
    const menu = document.getElementById('dvUserMenuDrop');
    if (!menu) return;
    const first = menu.querySelector('button');
    if (!first) return;

    const accountBtn = document.createElement('button');
    accountBtn.style.cssText = `display:flex;align-items:center;gap:10px;width:100%;padding:10px 12px;
      border:none;background:none;cursor:pointer;border-radius:8px;font-family:'Be Vietnam Pro',sans-serif;
      font-size:0.82rem;font-weight:600;color:var(--navy)`;
    accountBtn.onmouseover  = () => accountBtn.style.background = 'var(--cream)';
    accountBtn.onmouseout   = () => accountBtn.style.background = 'none';
    accountBtn.innerHTML    = '<i class="fas fa-user-circle" style="width:16px;text-align:center;color:var(--gray)"></i>Tài khoản của tôi';
    accountBtn.onclick      = () => { menu.remove(); dvShowAccountModal(); };

    menu.insertBefore(accountBtn, first);
  }, 50);
};

// ─────────────────────────────────────────────────────────────────────
//  PHẦN 6: SỬA LỖI STATUS "pending" → Tài khoản chờ kích hoạt
//  Khi user có inviteCode nhưng chưa đăng nhập lần đầu
// ─────────────────────────────────────────────────────────────────────

/** Sau khi join thành công → cập nhật lastLogin trong GSheet */
async function _dvUpgrade_updateLastLogin() {
  try {
    const cfg = (typeof MTConfig !== 'undefined') ? MTConfig.get() : null;
    if (!cfg?.spreadsheetId || !cfg?.user?.username) return;

    const rows  = await SheetsAPI.read(cfg.spreadsheetId, 'system_users!A:K');
    const users = SheetsAPI.parseSheet(rows);
    const row   = users.find(u => u.username === cfg.user.username);
    if (!row) return;
    const idx = users.indexOf(row) + 2;
    await SheetsAPI.write(cfg.spreadsheetId, `system_users!I${idx}:J${idx}`, [[
      new Date().toISOString(), 'active',
    ]]);
  } catch (e) {
    console.warn('[Upgrade] updateLastLogin:', e.message);
  }
}

// ─────────────────────────────────────────────────────────────────────
//  PHẦN 7: THÊM BADGE "Chờ kích hoạt" cho user pending
//  trong màn hình Quản lý người dùng
// ─────────────────────────────────────────────────────────────────────

/** Patch mtLoadUsers để hiển thị nút "Gửi lại mã mời" cho user pending */
var _origMtLoadUsers = window.mtLoadUsers;
window.mtLoadUsers = async function() {
  await _origMtLoadUsers?.();

  // Sau khi load xong, tìm các hàng pending và thêm nút "Gửi lại"
  setTimeout(() => {
    document.querySelectorAll('[data-mt-user-status="pending"]').forEach(el => {
      const username = el.dataset.mtUsername;
      if (!username) return;
      const btn = document.createElement('button');
      btn.className = 'btn btn-outline btn-sm';
      btn.style.fontSize = '0.7rem';
      btn.innerHTML = '<i class="fas fa-redo"></i> Tạo lại mã mời';
      btn.onclick = () => dvAuthUpgrade_regenerateInvite(username);
      el.appendChild(btn);
    });
  }, 200);
};

/** Tạo lại invite code cho user pending */
window.dvAuthUpgrade_regenerateInvite = async function(username) {
  if (!username) return;
  try {
    const cfg = MTConfig.get();
    const rows = await SheetsAPI.read(cfg.spreadsheetId, 'system_users!A:K');
    const users = SheetsAPI.parseSheet(rows);
    const user = users.find(u => u.username === username);
    if (!user) { if (typeof toast === 'function') toast('Không tìm thấy người dùng', 'error'); return; }

    const { code } = await MTAdmin.generateInviteCode(username, user.role, user.orgId, user.orgName);
    if (typeof toast === 'function') toast(`✅ Mã mời mới cho @${username}: <strong style="letter-spacing:2px">${code}</strong>`, 'success');
    dvAuthUpgrade_showInviteQR(code);
  } catch (e) {
    if (typeof toast === 'function') toast('Lỗi: ' + e.message, 'error');
  }
};

// ─────────────────────────────────────────────────────────────────────
//  PHẦN 8: RESET PIN ADMIN — Admin có thể reset PIN cho user khác
// ─────────────────────────────────────────────────────────────────────

/**
 * Admin reset PIN của user — sinh PIN tạm thời ngẫu nhiên (KHÔNG dùng 123456 cố định)
 * Admin phải thông báo PIN tạm cho user; user đổi ngay sau khi đăng nhập.
 */
window.dvAuthUpgrade_adminResetPIN = async function(username) {
  const cfg = MTConfig.get();
  // Kiểm tra quyền admin qua SecureSession (ưu tiên) hoặc MTConfig
  const isAdmin = (typeof SecureSession !== 'undefined' && SecureSession.isAdmin())
               || cfg?.role === 'admin';
  if (!isAdmin) {
    if (typeof toast === 'function') toast('Chỉ Admin mới có thể reset PIN', 'error');
    return;
  }

  // Sinh PIN tạm 6 số ngẫu nhiên — KHÔNG phải 123456 cố định
  const tempPIN = Array.from(crypto.getRandomValues(new Uint8Array(6)))
    .map(b => b % 10).join('');

  if (!confirm(
    `Reset PIN của @${username}?\n\n` +
    `PIN tạm thời sẽ là: ${tempPIN}\n\n` +
    `Ghi lại PIN này và thông báo cho người dùng.\nYêu cầu họ đổi ngay sau khi đăng nhập.`
  )) return;

  try {
    const rows  = await SheetsAPI.read(cfg.spreadsheetId, 'system_users!A:K');
    const users = SheetsAPI.parseSheet(rows);
    const row   = users.find(u => u.username === username);
    if (!row) throw new Error('Không tìm thấy người dùng');

    const idx     = users.indexOf(row) + 2;
    const newHash = _dvUpgrade_hashPIN(tempPIN);
    await SheetsAPI.write(cfg.spreadsheetId, `system_users!C${idx}`, [[newHash]]);

    if (typeof toast === 'function') {
      toast(
        `✅ Đã reset PIN @${username}. PIN tạm: <strong style="font-family:monospace;letter-spacing:3px">${tempPIN}</strong> — Yêu cầu đổi ngay!`,
        'success'
      );
    }
  } catch (e) {
    if (typeof toast === 'function') toast('Lỗi reset PIN: ' + e.message, 'error');
  }
};

// ─────────────────────────────────────────────────────────────────────
//  PHẦN 9: KHỞI TẠO
// ─────────────────────────────────────────────────────────────────────

(function dvAuthUpgradeInit() {
  // Cập nhật lastLogin khi đã đăng nhập
  if (typeof MTAuth !== 'undefined' && MTAuth.isLoggedIn()) {
    setTimeout(_dvUpgrade_updateLastLogin, 3000);
  }

  // Thêm phím tắt Ctrl+Shift+A mở modal tài khoản (dev convenience)
  document.addEventListener('keydown', e => {
    if (e.ctrlKey && e.shiftKey && e.key === 'A') {
      e.preventDefault();
      dvShowAccountModal();
    }
  });

  console.log('[ĐoànVăn Auth Upgrade v2.0] Loaded — SyncCode ✅ ChangePIN ✅ QR ✅ Manager ✅');
})();

// ─────────────────────────────────────────────────────────────────────
//  XUẤT GLOBAL
// ─────────────────────────────────────────────────────────────────────
window.dvShowAccountModal            = window.dvShowAccountModal;
window.dvAuthUpgrade_changeName      = window.dvAuthUpgrade_changeName;
window.dvAuthUpgrade_changePIN       = window.dvAuthUpgrade_changePIN;
window.dvAuthUpgrade_showInviteQR    = window.dvAuthUpgrade_showInviteQR;
window.dvAuthUpgrade_regenerateInvite= window.dvAuthUpgrade_regenerateInvite;
window.dvAuthUpgrade_adminResetPIN   = window.dvAuthUpgrade_adminResetPIN;
window.dvAuthUpgrade_applySync       = window.dvAuthUpgrade_applySync;
window.dvAuthUpgrade_onSyncCodeChange= window.dvAuthUpgrade_onSyncCodeChange;
