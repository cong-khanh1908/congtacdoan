/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║   DOANVAN — AUTH SECURE PATCH  v3.0                                        ║
 * ║   Tác giả: Nâng cấp bảo mật hệ thống đăng nhập                            ║
 * ║                                                                              ║
 * ║  KHẮC PHỤC CÁC LỖ HỔNG BẢO MẬT NGHIÊM TRỌNG:                             ║
 * ║  ❌ LỖI CŨ: Nhập 6 số bất kỳ → vào được với quyền Admin cao nhất          ║
 * ║  ❌ LỖI CŨ: "Quên PIN? Đặt lại mặc định" cho phép bất kỳ ai bypass auth  ║
 * ║  ❌ LỖI CŨ: Tài khoản local (DVAuth) không có phân biệt role               ║
 * ║  ❌ LỖI CŨ: dvSeedDefaultAccount() tạo PIN 123456 ẩn, ai cũng đăng nhập  ║
 * ║                                                                              ║
 * ║  THIẾT KẾ MỚI — 3 LUỒNG ĐĂNG NHẬP RÕ RÀNG:                               ║
 * ║                                                                              ║
 * ║  [1] ADMIN (cấu hình GS + quản lý tài khoản)                               ║
 * ║      → Phải có MTConfig với role='admin' trong Google Sheet                 ║
 * ║      → Đăng nhập bằng PIN đã đăng ký qua Google Sheet                      ║
 * ║      → Toàn quyền: cấu hình, tạo mã mời, quản lý user                     ║
 * ║                                                                              ║
 * ║  [2] USER THƯỜNG (dùng ứng dụng sau khi được cấp mã mời)                   ║
 * ║      → Phải có Invite Code từ Admin                                         ║
 * ║      → Đăng nhập bằng PIN cá nhân đã tạo khi tham gia                      ║
 * ║      → Quyền hạn: sử dụng ứng dụng, cấu hình kết nối GS/AI cá nhân        ║
 * ║      → KHÔNG được: tạo tài khoản khác, quản lý user, cấu hình hệ thống    ║
 * ║                                                                              ║
 * ║  [3] CHƯA CÀI ĐẶT (lần đầu sử dụng, chưa có GS)                          ║
 * ║      → Màn hình hướng dẫn cài đặt Google Sheet                             ║
 * ║      → Không cho phép vào ứng dụng khi chưa cấu hình                       ║
 * ║                                                                              ║
 * ║  CÀI ĐẶT: Thêm script này SAU tất cả các module khác, CUỐI cùng            ║
 * ║  <script src="doanvan-auth-secure.js"></script>                             ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

'use strict';

// ─────────────────────────────────────────────────────────────────────
//  HẰNG SỐ & CẤU HÌNH
// ─────────────────────────────────────────────────────────────────────
const AUTH_SECURE_VERSION = '3.0';
const SESSION_TTL = 8 * 60 * 60 * 1000; // 8 giờ
const MAX_FAILED_ATTEMPTS = 5;           // Khoá sau 5 lần sai PIN
const LOCKOUT_DURATION = 5 * 60 * 1000; // Khoá 5 phút

// Keys lưu trữ
const KEYS = {
  MT_CONFIG:     'mt_config',           // Cấu hình multitenant (có role)
  SESSION:       'dv_secure_session',   // Session hiện tại (sessionStorage)
  FAILED:        'dv_auth_failed',      // Số lần nhập sai
  LOCKOUT_UNTIL: 'dv_lockout_until',    // Thời gian hết khoá
};

// ─────────────────────────────────────────────────────────────────────
//  TIỆN ÍCH: HASH SHA-256 (async)
// ─────────────────────────────────────────────────────────────────────
async function _secureHash(pin) {
  const data = new TextEncoder().encode('doanvan_salt_2024_' + pin);
  const buf  = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

// Hash đồng bộ fallback (DJB2) — chỉ dùng khi crypto.subtle không khả dụng
function _fallbackHash(pin) {
  let h = 5381;
  const salt = 'doanvan_salt_2024_' + pin;
  for (let i = 0; i < salt.length; i++) h = ((h << 5) + h) ^ salt.charCodeAt(i);
  return 'fb_' + (h >>> 0).toString(16).padStart(8, '0');
}

async function _hashPIN(pin) {
  try {
    if (crypto?.subtle) return await _secureHash(pin);
    return _fallbackHash(pin);
  } catch {
    return _fallbackHash(pin);
  }
}

// ─────────────────────────────────────────────────────────────────────
//  QUẢN LÝ SESSION BẢO MẬT
// ─────────────────────────────────────────────────────────────────────
const SecureSession = {
  start(role, username, orgId) {
    const sess = {
      ts:        Date.now(),
      role,
      username,
      orgId:     orgId || 'all',
      token:     Array.from(crypto.getRandomValues(new Uint8Array(16)))
                      .map(b => b.toString(16).padStart(2, '0')).join(''),
    };
    sessionStorage.setItem(KEYS.SESSION, JSON.stringify(sess));
    return sess;
  },

  get() {
    try {
      const sess = JSON.parse(sessionStorage.getItem(KEYS.SESSION) || 'null');
      if (!sess) return null;
      if (Date.now() - sess.ts > SESSION_TTL) {
        this.end();
        return null;
      }
      return sess;
    } catch { return null; }
  },

  isValid() { return !!this.get(); },

  getRole() { return this.get()?.role || null; },

  isAdmin() { return this.getRole() === 'admin'; },

  end() {
    sessionStorage.removeItem(KEYS.SESSION);
  },
};

// ─────────────────────────────────────────────────────────────────────
//  QUẢN LÝ KHOÁ TÀI KHOẢN (anti-brute-force)
// ─────────────────────────────────────────────────────────────────────
const AuthLock = {
  isLocked() {
    const until = parseInt(localStorage.getItem(KEYS.LOCKOUT_UNTIL) || '0');
    if (Date.now() < until) return true;
    // Hết hạn khoá → xoá
    if (until > 0) {
      localStorage.removeItem(KEYS.LOCKOUT_UNTIL);
      localStorage.removeItem(KEYS.FAILED);
    }
    return false;
  },

  remainingSeconds() {
    const until = parseInt(localStorage.getItem(KEYS.LOCKOUT_UNTIL) || '0');
    return Math.max(0, Math.ceil((until - Date.now()) / 1000));
  },

  recordFailure() {
    const count = parseInt(localStorage.getItem(KEYS.FAILED) || '0') + 1;
    localStorage.setItem(KEYS.FAILED, String(count));
    if (count >= MAX_FAILED_ATTEMPTS) {
      localStorage.setItem(KEYS.LOCKOUT_UNTIL, String(Date.now() + LOCKOUT_DURATION));
      localStorage.removeItem(KEYS.FAILED);
      return { locked: true, remaining: LOCKOUT_DURATION / 1000 };
    }
    return { locked: false, attemptsLeft: MAX_FAILED_ATTEMPTS - count };
  },

  clearFailures() {
    localStorage.removeItem(KEYS.FAILED);
    localStorage.removeItem(KEYS.LOCKOUT_UNTIL);
  },
};

// ─────────────────────────────────────────────────────────────────────
//  PHÂN TÍCH TRẠNG THÁI ỨNG DỤNG
//  Xác định luồng đăng nhập phù hợp
// ─────────────────────────────────────────────────────────────────────
function _getAppState() {
  const mtCfg = (() => {
    try { return JSON.parse(localStorage.getItem(KEYS.MT_CONFIG) || 'null'); } catch { return null; }
  })();

  if (!mtCfg?.spreadsheetId || !mtCfg?.user) {
    return { mode: 'NO_SETUP' };               // Chưa cài đặt GS
  }

  return {
    mode:          'MT_AUTH',                  // Có GS → dùng MT auth
    role:          mtCfg.role || 'member',
    username:      mtCfg.user?.username || '',
    displayName:   mtCfg.user?.displayName || 'Người dùng',
    pinHash:       mtCfg.user?.pinHash || null,
    spreadsheetId: mtCfg.spreadsheetId,
    orgName:       mtCfg.orgName || 'Hệ thống',
    mtCfg,
  };
}

// ─────────────────────────────────────────────────────────────────────
//  INJECT CSS SECURE AUTH
// ─────────────────────────────────────────────────────────────────────
function _injectSecureCSS() {
  if (document.getElementById('dv-secure-css')) return;
  const style = document.createElement('style');
  style.id = 'dv-secure-css';
  style.textContent = `
  /* ── Secure Auth Overlay ── */
  #dvSecureAuth {
    position:fixed;inset:0;z-index:9999;
    background:linear-gradient(145deg,#0f172a 0%,#1e293b 50%,#0f172a 100%);
    display:flex;align-items:center;justify-content:center;
    font-family:'Be Vietnam Pro',sans-serif;
    animation:dvFadeIn 0.3s ease;
  }
  @keyframes dvFadeIn { from{opacity:0;transform:scale(0.97)} to{opacity:1;transform:scale(1)} }

  #dvSecureBox {
    background:#fff;border-radius:20px;width:100%;max-width:400px;
    box-shadow:0 20px 60px rgba(0,0,0,0.4);overflow:hidden;
    animation:dvSlideUp 0.35s cubic-bezier(.34,1.56,.64,1);
  }
  @keyframes dvSlideUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }

  .dvsec-header {
    background:linear-gradient(135deg,#1a2340,#c0392b);
    padding:28px 24px 24px;text-align:center;color:#fff;
  }
  .dvsec-logo {
    width:64px;height:64px;border-radius:50%;
    background:rgba(255,255,255,0.15);
    display:flex;align-items:center;justify-content:center;
    font-size:1.8rem;margin:0 auto 12px;
    border:3px solid rgba(255,255,255,0.3);
  }
  .dvsec-title { font-size:1.3rem;font-weight:700;margin:0 0 4px }
  .dvsec-sub   { font-size:0.82rem;opacity:0.85;margin:0 }

  .dvsec-body  { padding:24px }

  .dvsec-role-badge {
    display:inline-flex;align-items:center;gap:6px;
    padding:5px 12px;border-radius:20px;font-size:0.75rem;font-weight:700;
    margin-bottom:16px;
  }
  .dvsec-role-badge.admin   { background:#fef2f2;color:#c0392b;border:1px solid #fecaca }
  .dvsec-role-badge.manager { background:#eff6ff;color:#1a2340;border:1px solid #bfdbfe }
  .dvsec-role-badge.member  { background:#f0fdf4;color:#16a34a;border:1px solid #bbf7d0 }

  /* PIN dots */
  .dvsec-pin-row {
    display:flex;gap:10px;justify-content:center;margin:16px 0 6px;
  }
  .dvsec-dot {
    width:44px;height:44px;border-radius:50%;
    border:2px solid #e2e8f0;background:#f8fafc;
    display:flex;align-items:center;justify-content:center;
    font-size:1.6rem;color:transparent;transition:all .2s;
  }
  .dvsec-dot.filled { background:#1a2340;border-color:#1a2340;color:#fff }
  .dvsec-dot.active { border-color:#c0392b;box-shadow:0 0 0 3px rgba(192,57,43,0.15) }
  .dvsec-dot.error  { border-color:#dc2626;background:#fef2f2;animation:dvShake .3s }
  @keyframes dvShake {
    0%,100%{transform:translateX(0)}
    20%{transform:translateX(-6px)}60%{transform:translateX(6px)}
  }

  /* Keypad */
  .dvsec-keypad {
    display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:16px;
  }
  .dvsec-key {
    padding:14px 0;border-radius:12px;border:1.5px solid #e2e8f0;background:#f8fafc;
    font-size:1.1rem;font-weight:600;color:#1a2340;cursor:pointer;
    transition:all .15s;font-family:inherit;
  }
  .dvsec-key:hover:not(:disabled) { background:#1a2340;color:#fff;border-color:#1a2340 }
  .dvsec-key:active:not(:disabled){ transform:scale(0.94) }
  .dvsec-key.del { color:#c0392b }
  .dvsec-key:disabled { opacity:0;cursor:default }

  .dvsec-error {
    font-size:0.78rem;color:#dc2626;min-height:18px;text-align:center;margin:4px 0;
  }
  .dvsec-lock-msg {
    background:#fef2f2;border:1px solid #fecaca;border-radius:10px;
    padding:12px;text-align:center;font-size:0.82rem;color:#dc2626;margin:8px 0;
  }
  .dvsec-link-row {
    text-align:center;font-size:0.78rem;color:#94a3b8;margin-top:14px;
  }
  .dvsec-link-row a {
    color:#1a2340;text-decoration:none;font-weight:600;cursor:pointer;
  }
  .dvsec-link-row a:hover { color:#c0392b }

  /* No-setup screen */
  .dvsec-nosetup {
    text-align:center;padding:8px 0 16px;
  }
  .dvsec-nosetup-icon {
    font-size:3rem;margin-bottom:12px;
    background:linear-gradient(135deg,#1a2340,#c0392b);
    -webkit-background-clip:text;-webkit-text-fill-color:transparent;
  }
  .dvsec-info-box {
    background:#f0f9ff;border:1px solid #bae6fd;border-radius:10px;
    padding:12px 14px;text-align:left;font-size:0.8rem;color:#0c4a6e;
    margin:12px 0;line-height:1.6;
  }
  .dvsec-info-box strong { color:#1a2340 }
  .dvsec-divider {
    border:none;border-top:1px solid #f1f5f9;margin:16px 0;
  }
  .dvsec-btn {
    display:block;width:100%;padding:13px;border-radius:12px;border:none;
    font-family:inherit;font-size:0.9rem;font-weight:600;cursor:pointer;
    transition:all .2s;margin-bottom:8px;
  }
  .dvsec-btn.primary {
    background:linear-gradient(135deg,#1a2340,#c0392b);color:#fff;
  }
  .dvsec-btn.primary:hover { opacity:0.9;transform:translateY(-1px) }
  .dvsec-btn.ghost {
    background:#f8fafc;color:#64748b;border:1px solid #e2e8f0;
  }
  .dvsec-btn.ghost:hover { background:#f1f5f9 }

  /* User role indicator badge trên app */
  #dvSecureRoleBadge {
    position:fixed;bottom:14px;left:50%;transform:translateX(-50%);
    background:rgba(26,35,64,0.92);color:#fff;
    padding:5px 14px;border-radius:20px;font-size:0.72rem;font-weight:600;
    display:flex;align-items:center;gap:7px;z-index:500;
    backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.1);
    pointer-events:none;
  }
  #dvSecureRoleBadge .role-dot {
    width:7px;height:7px;border-radius:50%;
  }
  `;
  document.head.appendChild(style);
}

// ─────────────────────────────────────────────────────────────────────
//  HIỂN THỊ MÀN HÌNH ĐĂNG NHẬP CHÍNH
// ─────────────────────────────────────────────────────────────────────
let _secPinEntry = '';
let _secAppState = null;

function dvSecureShowLogin() {
  _injectSecureCSS();
  _secPinEntry = '';
  _secAppState = _getAppState();

  document.getElementById('dvSecureAuth')?.remove();

  const overlay = document.createElement('div');
  overlay.id = 'dvSecureAuth';

  if (_secAppState.mode === 'NO_SETUP') {
    overlay.innerHTML = _buildNoSetupUI();
  } else {
    overlay.innerHTML = _buildPINLoginUI(_secAppState);
  }

  document.body.appendChild(overlay);

  // Focus event listener
  if (_secAppState.mode !== 'NO_SETUP') {
    _startLockoutTimer();
  }
}

// ─── UI: Chưa cài đặt ────────────────────────────────────────────────
function _buildNoSetupUI() {
  return `
  <div id="dvSecureBox">
    <div class="dvsec-header">
      <div class="dvsec-logo"><i class="fas fa-star"></i></div>
      <div class="dvsec-title">ĐoànVăn</div>
      <div class="dvsec-sub">Phần mềm quản lý Đoàn viên</div>
    </div>
    <div class="dvsec-body">
      <div class="dvsec-nosetup">
        <div class="dvsec-nosetup-icon"><i class="fas fa-cog"></i></div>
        <div style="font-weight:700;font-size:1rem;color:#1a2340;margin-bottom:8px">
          Chưa cài đặt hệ thống
        </div>
        <div style="font-size:0.82rem;color:#64748b;margin-bottom:14px">
          Để sử dụng phần mềm, Admin cần cài đặt kết nối Google Sheet trước.
        </div>
        <div class="dvsec-info-box">
          <strong><i class="fas fa-shield-alt" style="color:#c0392b;margin-right:5px"></i>Lưu ý bảo mật:</strong><br>
          • Chỉ <strong>Admin</strong> mới có thể cài đặt ban đầu<br>
          • Người dùng khác cần <strong>Mã mời</strong> từ Admin<br>
          • Mọi tài khoản đều phải xác thực qua PIN riêng
        </div>
      </div>
      <hr class="dvsec-divider">
      <button class="dvsec-btn primary" onclick="dvSecureOpenAdminSetup()">
        <i class="fas fa-crown" style="margin-right:8px"></i>Cài đặt Admin (lần đầu)
      </button>
      <button class="dvsec-btn ghost" onclick="dvSecureOpenJoinWithCode()">
        <i class="fas fa-ticket-alt" style="margin-right:8px"></i>Tham gia bằng Mã mời
      </button>
      <div class="dvsec-link-row" style="margin-top:8px">
        <i class="fas fa-info-circle" style="margin-right:4px"></i>
        Nếu đã có tài khoản, hãy dùng <a onclick="dvSecureOpenSyncCode()">Sync Code</a>
      </div>
    </div>
  </div>`;
}

// ─── UI: Đăng nhập PIN ───────────────────────────────────────────────
function _buildPINLoginUI(state) {
  const roleName  = { admin: 'Admin', manager: 'Quản lý', member: 'Đoàn viên' }[state.role] || 'Người dùng';
  const roleClass = state.role === 'admin' ? 'admin' : state.role === 'manager' ? 'manager' : 'member';
  const roleIcon  = state.role === 'admin' ? 'fa-crown' : state.role === 'manager' ? 'fa-user-tie' : 'fa-user';

  const isLocked = AuthLock.isLocked();
  const failedCount = parseInt(localStorage.getItem(KEYS.FAILED) || '0');

  return `
  <div id="dvSecureBox">
    <div class="dvsec-header">
      <div class="dvsec-logo"><i class="fas fa-star"></i></div>
      <div class="dvsec-title">ĐoànVăn</div>
      <div class="dvsec-sub">Xin chào, <strong>${state.displayName}</strong></div>
    </div>
    <div class="dvsec-body">
      <div style="text-align:center">
        <span class="dvsec-role-badge ${roleClass}">
          <i class="fas ${roleIcon}"></i>${roleName} · ${state.orgName}
        </span>
      </div>

      ${isLocked ? `
      <div class="dvsec-lock-msg" id="dvSecLockMsg">
        <i class="fas fa-lock"></i>
        Tài khoản tạm khoá do nhập sai nhiều lần.<br>
        Thử lại sau: <strong id="dvSecLockTimer">${AuthLock.remainingSeconds()}s</strong>
      </div>` : `
      <div style="font-size:0.8rem;color:#94a3b8;text-align:center;margin-bottom:2px">
        Nhập mã PIN để đăng nhập
      </div>`}

      <div class="dvsec-pin-row" id="dvSecPinDots">
        ${Array(6).fill(0).map((_, i) => `<div class="dvsec-dot" id="dvSecDot${i}">•</div>`).join('')}
      </div>
      <div class="dvsec-error" id="dvSecError">
        ${!isLocked && failedCount > 0 ? `Còn ${MAX_FAILED_ATTEMPTS - failedCount} lần thử` : ''}
      </div>

      <div class="dvsec-keypad" id="dvSecKeypad" ${isLocked ? 'style="pointer-events:none;opacity:0.4"' : ''}>
        ${[1,2,3,4,5,6,7,8,9,'',0,'del'].map(k => `
          <button class="dvsec-key${k===''?' ':k==='del'?' del':''}"
            onclick="dvSecKeyPress('${k}')"
            ${k===''?'disabled':''}>
            ${k==='del' ? '<i class="fas fa-backspace"></i>' : k}
          </button>`).join('')}
      </div>

      <div class="dvsec-link-row">
        <a onclick="dvSecureOpenSyncCode()">
          <i class="fas fa-sync-alt" style="margin-right:4px"></i>Dùng Sync Code
        </a>
        &nbsp;|&nbsp;
        <a onclick="dvSecureOpenJoinWithCode()">
          <i class="fas fa-ticket-alt" style="margin-right:4px"></i>Mã mời
        </a>
      </div>

      <div style="text-align:center;margin-top:10px;font-size:0.72rem;color:#cbd5e1">
        <i class="fas fa-shield-alt" style="margin-right:4px;color:#10b981"></i>
        Phiên đăng nhập bảo mật · ${AUTH_SECURE_VERSION}
      </div>
    </div>
  </div>`;
}

// ─────────────────────────────────────────────────────────────────────
//  XỬ LÝ NHẬP PIN
// ─────────────────────────────────────────────────────────────────────
window.dvSecKeyPress = function(key) {
  if (AuthLock.isLocked()) return;
  if (key === 'del') {
    _secPinEntry = _secPinEntry.slice(0, -1);
  } else if (key === '' || key === 'undefined') {
    return;
  } else {
    if (_secPinEntry.length >= 6) return;
    _secPinEntry += String(key);
  }
  _updateSecureDots();
  if (_secPinEntry.length === 6) {
    setTimeout(() => dvSecSubmitPIN(), 180);
  }
};

function _updateSecureDots() {
  for (let i = 0; i < 6; i++) {
    const dot = document.getElementById(`dvSecDot${i}`);
    if (!dot) continue;
    dot.textContent = i < _secPinEntry.length ? '●' : '•';
    dot.className = 'dvsec-dot';
    if (i < _secPinEntry.length) dot.classList.add('filled');
    if (i === _secPinEntry.length) dot.classList.add('active');
  }
}

function _shakeAndClearPIN(errorMsg) {
  _secPinEntry = '';
  for (let i = 0; i < 6; i++) {
    const d = document.getElementById(`dvSecDot${i}`);
    if (d) { d.textContent = '•'; d.className = 'dvsec-dot error'; }
  }
  const errEl = document.getElementById('dvSecError');
  if (errEl) errEl.textContent = errorMsg;
  setTimeout(() => {
    for (let i = 0; i < 6; i++) {
      const d = document.getElementById(`dvSecDot${i}`);
      if (d) d.className = 'dvsec-dot';
    }
  }, 400);
}

// ─────────────────────────────────────────────────────────────────────
//  XÁC THỰC PIN & ĐĂNG NHẬP
// ─────────────────────────────────────────────────────────────────────
window.dvSecSubmitPIN = async function() {
  if (AuthLock.isLocked()) return;
  const pin = _secPinEntry;
  if (pin.length !== 6) return;

  const state = _secAppState;
  if (!state || state.mode !== 'MT_AUTH') return;

  // Vô hiệu hoá keypad trong lúc xác thực
  const keypad = document.getElementById('dvSecKeypad');
  if (keypad) keypad.style.pointerEvents = 'none';

  try {
    // Thử verify qua MTAuth trước (có GSheet)
    let loginSuccess = false;
    let loginCfg     = null;

    // Xác thực PIN: so sánh hash với pinHash trong MT config
    const storedCfg = (() => {
      try { return JSON.parse(localStorage.getItem(KEYS.MT_CONFIG) || 'null'); } catch { return null; }
    })();

    if (!storedCfg?.user?.pinHash) {
      _shakeAndClearPIN('Tài khoản chưa có PIN. Liên hệ Admin.');
      return;
    }

    // Thử hash mới (SHA-256) trước
    const hashNew  = await _hashPIN(pin);
    // Thử hash cũ (DJB2) để tương thích ngược
    const hashOld  = _legacyHash(pin);
    const hashFb   = _fallbackHash(pin);

    const stored = storedCfg.user.pinHash;
    if (stored === hashNew || stored === hashOld || stored === hashFb || stored === _mtLegacyHash(pin)) {
      loginSuccess = true;
      loginCfg     = storedCfg;
    }

    if (loginSuccess && loginCfg) {
      AuthLock.clearFailures();
      SecureSession.start(loginCfg.role, loginCfg.user.username, loginCfg.orgId);

      // Đồng bộ session với DVAuth cũ (tương thích các module khác)
      _bridgeLegacySession(loginCfg);

      _dismissAndLaunch(loginCfg);
    } else {
      // PIN sai
      const result = AuthLock.recordFailure();
      if (result.locked) {
        _shakeAndClearPIN('');
        dvSecureShowLogin(); // Re-render với lockout message
      } else {
        _shakeAndClearPIN(`PIN không đúng. Còn ${result.attemptsLeft} lần thử.`);
        if (keypad) keypad.style.pointerEvents = '';
      }
    }
  } catch (err) {
    console.error('[AuthSecure] Lỗi xác thực:', err);
    _shakeAndClearPIN('Lỗi xác thực. Thử lại.');
    if (keypad) keypad.style.pointerEvents = '';
  }
};

// Hash tương thích ngược với MTAuth cũ (DJB2 đơn giản)
function _mtLegacyHash(pin) {
  let h = 5381;
  for (let i = 0; i < pin.length; i++) h = ((h << 5) + h) ^ pin.charCodeAt(i);
  return (h >>> 0).toString(16).padStart(8, '0');
}

// Hash tương thích với DVAuth cũ
function _legacyHash(pin) {
  let h = 5381;
  for (let i = 0; i < pin.length; i++) h = ((h << 5) + h) ^ pin.charCodeAt(i);
  return (h >>> 0).toString(16).padStart(8, '0');
}

// ─── Bridge với các module cũ (DVAuth session) ───────────────────────
function _bridgeLegacySession(cfg) {
  // Tạo session cho DVAuth để các module cũ nhận ra đã login
  sessionStorage.setItem('doanvan_session', JSON.stringify({ ts: Date.now() }));

  // Cập nhật DVAuth profile nếu cần
  if (typeof DVAuth !== 'undefined') {
    const existingProfile = DVAuth.getProfile();
    if (!existingProfile || existingProfile.username !== cfg.user?.username) {
      // Tạo profile giả với thông tin từ MT config (KHÔNG tạo account mới)
      const profile = {
        username:    cfg.user?.username || 'user',
        displayName: cfg.user?.displayName || 'Người dùng',
        pinHash:     cfg.user?.pinHash,
        createdAt:   cfg.user?.createdAt || new Date().toISOString(),
        syncConfig:  { spreadsheetId: cfg.spreadsheetId, serviceAccountJson: cfg.serviceAccountJson },
        lastSync:    null,
        deviceId:    cfg.user?.deviceId || 'secure',
      };
      DVAuth.saveProfile(profile);
    }
    DVAuth.startSession();
  }
}

// ─── Sau đăng nhập thành công ────────────────────────────────────────
function _dismissAndLaunch(cfg) {
  document.getElementById('dvSecureAuth')?.remove();

  // Cập nhật UI
  _renderSecureRoleBadge(cfg);
  _applyRoleRestrictions(cfg.role);

  // Cập nhật user chip
  if (typeof _dvUpdateUserChip === 'function') {
    setTimeout(() => _dvUpdateUserChip(), 100);
  }

  // Trigger MT UI update
  if (typeof mtUpdateUIAfterLogin === 'function') {
    mtUpdateUIAfterLogin();
  } else if (typeof window._mtAfterLogin === 'function') {
    window._mtAfterLogin();
  }

  // Init sync
  if (typeof dvInitSync === 'function') dvInitSync();

  // Auto pull từ GSheet
  if (cfg.spreadsheetId && typeof MTSync !== 'undefined') {
    setTimeout(() => MTSync.pullAll(() => {}).catch(() => {}), 2000);
  }

  if (typeof toast === 'function') {
    const roleName = { admin: '⚙️ Admin', manager: '👔 Quản lý', member: '👤 Đoàn viên' }[cfg.role] || '👤';
    toast(`${roleName} <strong>${cfg.user?.displayName || ''}</strong> — Đăng nhập thành công!`, 'success');
  }
}

// ─────────────────────────────────────────────────────────────────────
//  PHÂN QUYỀN GIAO DIỆN THEO ROLE
// ─────────────────────────────────────────────────────────────────────
function _applyRoleRestrictions(role) {
  const isAdmin   = role === 'admin';
  const isManager = role === 'admin' || role === 'manager';

  // Ẩn Admin nav với người không phải admin
  const adminNav = document.getElementById('mtAdminNav');
  if (adminNav) adminNav.style.display = isAdmin ? 'block' : 'none';

  // Ẩn nút quản lý user
  const adminQuickBtn = document.getElementById('mtAdminQuickBtn');
  if (adminQuickBtn) adminQuickBtn.style.display = isAdmin ? 'inline-flex' : 'none';

  // Ẩn toàn bộ tab "Người dùng & Mã mời" với non-admin
  document.querySelectorAll('[data-admin-only], .admin-only-nav').forEach(el => {
    el.style.display = isAdmin ? '' : 'none';
  });

  // Người dùng thường: chỉ được cấu hình kết nối GS/AI cá nhân
  // Các nút cấu hình hệ thống bị ẩn
  if (!isAdmin) {
    // Ẩn các nút tạo invite code
    document.querySelectorAll('[onclick*="mtShowInviteManager"], [onclick*="generateInviteCode"]').forEach(el => {
      el.style.display = 'none';
    });
    // Ẩn các nút quản lý user system
    document.querySelectorAll('[onclick*="mtChangeRole"], [onclick*="mtDeleteUser"]').forEach(el => {
      el.style.display = 'none';
    });
  }

  // Lưu role vào window để các module khác check
  window._dvCurrentRole = role;
  window._dvIsAdmin     = isAdmin;
  window._dvIsManager   = isManager;
}

// ─────────────────────────────────────────────────────────────────────
//  BADGE HIỂN THỊ ROLE (góc dưới màn hình)
// ─────────────────────────────────────────────────────────────────────
function _renderSecureRoleBadge(cfg) {
  document.getElementById('dvSecureRoleBadge')?.remove();
  const roleMap = {
    admin:   { label: 'Admin',    color: '#c0392b' },
    manager: { label: 'Quản lý',  color: '#1a2340' },
    member:  { label: 'Đoàn viên', color: '#16a34a' },
  };
  const r = roleMap[cfg.role] || roleMap.member;
  const badge = document.createElement('div');
  badge.id = 'dvSecureRoleBadge';
  badge.innerHTML = `
    <span class="role-dot" style="background:${r.color}"></span>
    ${r.label} · ${cfg.user?.displayName || 'Người dùng'}
    <span style="opacity:0.6">· ${cfg.orgName || 'Hệ thống'}</span>`;
  document.body.appendChild(badge);
  setTimeout(() => { if (badge.parentNode) badge.remove(); }, 5000);
}

// ─────────────────────────────────────────────────────────────────────
//  ĐỒNG HỒ ĐẾM NGƯỢC LOCKOUT
// ─────────────────────────────────────────────────────────────────────
let _lockoutInterval = null;
function _startLockoutTimer() {
  clearInterval(_lockoutInterval);
  if (!AuthLock.isLocked()) return;

  _lockoutInterval = setInterval(() => {
    const timerEl = document.getElementById('dvSecLockTimer');
    const keypad  = document.getElementById('dvSecKeypad');
    const rem     = AuthLock.remainingSeconds();

    if (rem <= 0) {
      clearInterval(_lockoutInterval);
      // Re-render màn hình đăng nhập bình thường
      dvSecureShowLogin();
      return;
    }
    if (timerEl) timerEl.textContent = rem + 's';
    if (keypad)  keypad.style.pointerEvents = 'none';
  }, 1000);
}

// ─────────────────────────────────────────────────────────────────────
//  CÁC MÀN HÌNH PHỤ (Admin setup, Join with code, Sync code)
// ─────────────────────────────────────────────────────────────────────

/** Mở màn hình cài đặt Admin (gọi ra mtShowAdminSetup đã có) */
window.dvSecureOpenAdminSetup = function() {
  document.getElementById('dvSecureAuth')?.remove();
  if (typeof mtShowAdminSetup === 'function') {
    mtShowAdminSetup();
  } else {
    // Fallback nếu chưa load module
    alert('Vui lòng đợi tải xong trang rồi thử lại.');
    dvSecureShowLogin();
  }
};

/** Mở màn hình tham gia bằng Mã mời */
window.dvSecureOpenJoinWithCode = function() {
  document.getElementById('dvSecureAuth')?.remove();
  if (typeof mtShowJoinWithCode === 'function') {
    mtShowJoinWithCode();
  } else if (typeof window.mtShowInviteManager === 'function') {
    dvSecureShowJoinUI();
  } else {
    dvSecureShowJoinUI();
  }
};

/** UI tham gia bằng Invite Code */
window.dvSecureShowJoinUI = function() {
  _injectSecureCSS();
  document.getElementById('dvSecureAuth')?.remove();

  const overlay = document.createElement('div');
  overlay.id = 'dvSecureAuth';
  overlay.innerHTML = `
  <div id="dvSecureBox">
    <div class="dvsec-header">
      <div class="dvsec-logo"><i class="fas fa-ticket-alt"></i></div>
      <div class="dvsec-title">Tham gia hệ thống</div>
      <div class="dvsec-sub">Nhập Mã mời từ Admin</div>
    </div>
    <div class="dvsec-body">
      <div style="margin-bottom:14px">
        <label style="font-size:0.8rem;font-weight:600;color:#475569;margin-bottom:6px;display:block">
          <i class="fas fa-ticket-alt" style="color:#c0392b;margin-right:5px"></i>Mã mời
        </label>
        <input class="form-control" id="dvSecInviteCode"
          placeholder="Nhập mã mời từ Admin"
          style="text-align:center;font-family:monospace;font-size:1.1rem;letter-spacing:4px;text-transform:uppercase"
          maxlength="16"
          oninput="this.value=this.value.toUpperCase().replace(/[^A-Z0-9]/g,'')">
      </div>
      <div style="margin-bottom:14px">
        <label style="font-size:0.8rem;font-weight:600;color:#475569;margin-bottom:6px;display:block">
          <i class="fas fa-user" style="color:#1a2340;margin-right:5px"></i>Tên hiển thị
        </label>
        <input class="form-control" id="dvSecJoinName" placeholder="Họ và tên của bạn">
      </div>
      <div style="margin-bottom:14px">
        <label style="font-size:0.8rem;font-weight:600;color:#475569;margin-bottom:6px;display:block">
          <i class="fas fa-lock" style="color:#1a2340;margin-right:5px"></i>Tạo mã PIN (6 số)
        </label>
        <input type="password" class="form-control" id="dvSecJoinPIN"
          placeholder="6 chữ số" maxlength="6" inputmode="numeric"
          oninput="this.value=this.value.replace(/[^0-9]/g,'')">
      </div>
      <div style="margin-bottom:16px">
        <label style="font-size:0.8rem;font-weight:600;color:#475569;margin-bottom:6px;display:block">
          <i class="fas fa-lock" style="color:#1a2340;margin-right:5px"></i>Xác nhận PIN
        </label>
        <input type="password" class="form-control" id="dvSecJoinPIN2"
          placeholder="Nhập lại PIN" maxlength="6" inputmode="numeric"
          oninput="this.value=this.value.replace(/[^0-9]/g,'')">
      </div>
      <div class="dvsec-error" id="dvSecJoinError" style="margin-bottom:8px"></div>
      <button class="dvsec-btn primary" onclick="dvSecureDoJoin()">
        <i class="fas fa-sign-in-alt" style="margin-right:8px"></i>Tham gia
      </button>
      <div class="dvsec-link-row">
        <a onclick="dvSecureShowLogin()">← Quay lại đăng nhập</a>
      </div>
    </div>
  </div>`;
  document.body.appendChild(overlay);
};

/** Thực hiện join */
window.dvSecureDoJoin = async function() {
  const code  = document.getElementById('dvSecInviteCode')?.value.trim().toUpperCase();
  const name  = document.getElementById('dvSecJoinName')?.value.trim();
  const pin   = document.getElementById('dvSecJoinPIN')?.value.trim();
  const pin2  = document.getElementById('dvSecJoinPIN2')?.value.trim();
  const errEl = document.getElementById('dvSecJoinError');

  if (!code || code.length < 6) { errEl.textContent = 'Vui lòng nhập Mã mời'; return; }
  if (!name)                     { errEl.textContent = 'Vui lòng nhập tên hiển thị'; return; }
  if (!pin || pin.length !== 6 || !/^\d{6}$/.test(pin)) {
    errEl.textContent = 'PIN phải là 6 chữ số'; return;
  }
  if (pin !== pin2) { errEl.textContent = 'Xác nhận PIN không khớp'; return; }

  errEl.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang xác thực mã mời...';

  try {
    if (typeof MTAuth === 'undefined') throw new Error('Module chưa sẵn sàng. Tải lại trang.');
    const cfg = await MTAuth.joinWithCode(code, null, name, pin);
    errEl.innerHTML = '<span style="color:#16a34a"><i class="fas fa-check-circle"></i> Tham gia thành công!</span>';
    setTimeout(() => dvSecureShowLogin(), 1000);
  } catch(err) {
    errEl.innerHTML = `<span style="color:#dc2626"><i class="fas fa-times-circle"></i> ${err.message}</span>`;
  }
};

/** Mở Sync Code input */
window.dvSecureOpenSyncCode = function() {
  document.getElementById('dvSecureAuth')?.remove();
  if (typeof dvShowSyncCodeInput === 'function') {
    dvShowSyncCodeInput();
    // Sau khi sync code thành công → callback về dvSecureShowLogin
    const origDismiss = window._dvDismissAuthAndInit;
    window._dvDismissAuthAndInit = function() {
      document.getElementById('dvAuthModal')?.remove();
      _secAppState = _getAppState();
      if (_secAppState.mode === 'MT_AUTH') {
        const cfg = (() => {
          try { return JSON.parse(localStorage.getItem(KEYS.MT_CONFIG) || 'null'); } catch { return null; }
        })();
        if (cfg) {
          SecureSession.start(cfg.role, cfg.user?.username, cfg.orgId);
          _bridgeLegacySession(cfg);
          _dismissAndLaunch(cfg);
          return;
        }
      }
      if (origDismiss) origDismiss();
    };
  } else {
    alert('Module Sync Code chưa sẵn sàng.');
    dvSecureShowLogin();
  }
};

// ─────────────────────────────────────────────────────────────────────
//  ĐĂNG XUẤT AN TOÀN
// ─────────────────────────────────────────────────────────────────────
window.dvSecureLogout = function() {
  SecureSession.end();
  sessionStorage.removeItem('doanvan_session');

  // Reset role restrictions
  window._dvCurrentRole = null;
  window._dvIsAdmin     = false;
  window._dvIsManager   = false;

  document.getElementById('dvSecureRoleBadge')?.remove();

  // Gọi dvLogout nếu có
  if (typeof dvLogout === 'function') {
    // DVAuth logout đã xử lý session
  }

  if (typeof toast === 'function') {
    toast('<i class="fas fa-sign-out-alt"></i> Đã đăng xuất', 'info');
  }

  setTimeout(() => dvSecureShowLogin(), 400);
};

// ─────────────────────────────────────────────────────────────────────
//  GUARD: CHẶN TRUY CẬP TRÁI PHÉP TRONG LÚC CHẠY
// ─────────────────────────────────────────────────────────────────────
/** Kiểm tra quyền admin — dùng cho các hàm nhạy cảm */
window.dvSecureRequireAdmin = function(actionName) {
  if (!SecureSession.isAdmin()) {
    if (typeof toast === 'function') {
      toast(`<i class="fas fa-ban"></i> Bạn không có quyền Admin để thực hiện: <strong>${actionName || 'hành động này'}</strong>`, 'error');
    }
    return false;
  }
  return true;
};

/** Kiểm tra đã đăng nhập */
window.dvSecureIsLoggedIn = function() {
  return SecureSession.isValid();
};

window.dvSecureGetRole = function() {
  return SecureSession.getRole();
};

// ─────────────────────────────────────────────────────────────────────
//  VÔ HIỆU HOÁ CÁC LỖ HỔNG CŨ
// ─────────────────────────────────────────────────────────────────────
function _patchLegacyVulnerabilities() {
  // [1] Chặn dvResetToDefault — lỗ hổng nghiêm trọng nhất
  //     Cũ: bất kỳ ai cũng có thể reset PIN về 123456 và đăng nhập ngay
  window.dvResetToDefault = function() {
    if (typeof toast === 'function') {
      toast('<i class="fas fa-ban"></i> Tính năng "Reset mặc định" đã bị vô hiệu hoá vì lý do bảo mật. Liên hệ Admin để được hỗ trợ.', 'error');
    }
  };

  // [2] Chặn dvSeedDefaultAccount — không tự tạo tài khoản mặc định nữa
  window.dvSeedDefaultAccount = function() {
    // NOP: chỉ tạo khi có MT config hợp lệ từ Admin
  };

  // [3] Override DVAuth.isLoggedIn để luôn tham chiếu SecureSession
  if (typeof DVAuth !== 'undefined') {
    const origIsLoggedIn = DVAuth.isLoggedIn.bind(DVAuth);
    DVAuth.isLoggedIn = function() {
      return SecureSession.isValid() || origIsLoggedIn();
    };
  }

  // [4] Chặn tạo tài khoản trực tiếp qua DVAuth.createAccount nếu không phải setup
  if (typeof DVAuth !== 'undefined') {
    const origCreate = DVAuth.createAccount.bind(DVAuth);
    DVAuth.createAccount = function(username, pin) {
      // Chỉ cho phép tạo từ context hợp lệ (joinWithCode)
      const stack = new Error().stack || '';
      const isFromJoin = stack.includes('dvSecureDoJoin') || stack.includes('joinWithCode') || stack.includes('dvResetToDefault_DISABLED');
      if (!isFromJoin && !SecureSession.isAdmin()) {
        console.warn('[AuthSecure] Blocked unauthorized DVAuth.createAccount call');
        return null;
      }
      return origCreate(username, pin);
    };
  }

  // [5] Override dvShowAuthModal cũ → redirect về secure login
  window.dvShowAuthModal = function(mode) {
    if (mode === 'setup') {
      // Cho phép setup qua secure UI
      dvSecureShowLogin();
    } else {
      dvSecureShowLogin();
    }
  };

  // [6] Patch mtShowInviteManager để check admin
  const origMtShowInvite = window.mtShowInviteManager;
  if (typeof origMtShowInvite === 'function') {
    window.mtShowInviteManager = function() {
      if (!dvSecureRequireAdmin('Quản lý người dùng')) return;
      origMtShowInvite();
    };
  }

  // [7] Patch mtShowAdminSetup — chỉ chạy khi chưa setup HOẶC đang là admin
  const origMtShowAdmin = window.mtShowAdminSetup;
  if (typeof origMtShowAdmin === 'function') {
    window.mtShowAdminSetup = function() {
      const cfg = (() => {
        try { return JSON.parse(localStorage.getItem(KEYS.MT_CONFIG) || 'null'); } catch { return null; }
      })();
      const isSetupDone = !!(cfg?.spreadsheetId && cfg?.user);

      if (isSetupDone && !SecureSession.isAdmin()) {
        if (typeof toast === 'function') {
          toast('<i class="fas fa-ban"></i> Chỉ Admin mới có thể truy cập cài đặt hệ thống.', 'error');
        }
        return;
      }
      origMtShowAdmin();
    };
  }
}

// ─────────────────────────────────────────────────────────────────────
//  KIỂM TRA SESSION KHI RELOAD TRANG
// ─────────────────────────────────────────────────────────────────────
function _checkSessionOnLoad() {
  const sess = SecureSession.get();
  if (sess) {
    // Vẫn còn session hợp lệ → không cần đăng nhập lại
    const cfg = (() => {
      try { return JSON.parse(localStorage.getItem(KEYS.MT_CONFIG) || 'null'); } catch { return null; }
    })();
    if (cfg) {
      _applyRoleRestrictions(sess.role);
      // Cập nhật bridge
      _bridgeLegacySession(cfg);
      if (typeof mtUpdateUIAfterLogin === 'function') {
        setTimeout(() => mtUpdateUIAfterLogin(), 200);
      }
      if (typeof _dvUpdateUserChip === 'function') {
        setTimeout(() => _dvUpdateUserChip(), 200);
      }
      return true; // Đã đăng nhập
    }
  }
  return false; // Chưa đăng nhập
}

// ─────────────────────────────────────────────────────────────────────
//  KHỞI CHẠY HỆ THỐNG AUTH MỚI
// ─────────────────────────────────────────────────────────────────────
function dvSecureInit() {
  // Vá các lỗ hổng cũ trước
  _patchLegacyVulnerabilities();

  // Chặn luồng dvInit cũ không cho chạy lại sau khi ta đã control
  // (dvInit cũ sẽ tự gọi dvSeedDefaultAccount và dvShowAuthModal)
  // Ta đã override dvShowAuthModal ở trên nên nó sẽ dẫn về UI mới

  // Kiểm tra session hiện tại
  if (_checkSessionOnLoad()) {
    // Đã có session → xoá auth modal cũ nếu còn
    document.getElementById('dvAuthModal')?.remove();
    return;
  }

  // Chưa có session → hiển thị secure login
  // Xoá modal cũ nếu đang hiển thị
  document.getElementById('dvAuthModal')?.remove();
  dvSecureShowLogin();
}

// Auto-init sau khi tất cả scripts đã load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => setTimeout(dvSecureInit, 500));
} else {
  setTimeout(dvSecureInit, 500);
}

// ─────────────────────────────────────────────────────────────────────
//  EXPORT GLOBALS
// ─────────────────────────────────────────────────────────────────────
window.dvSecureShowLogin        = dvSecureShowLogin;
window.dvSecureInit             = dvSecureInit;
window.dvSecureLogout           = window.dvSecureLogout;
window.dvSecureRequireAdmin     = window.dvSecureRequireAdmin;
window.dvSecureIsLoggedIn       = window.dvSecureIsLoggedIn;
window.dvSecureGetRole          = window.dvSecureGetRole;
window.dvSecureOpenAdminSetup   = window.dvSecureOpenAdminSetup;
window.dvSecureOpenJoinWithCode = window.dvSecureOpenJoinWithCode;
window.dvSecureOpenSyncCode     = window.dvSecureOpenSyncCode;
window.SecureSession            = SecureSession;

// Override dvLogout để dẫn về dvSecureLogout
window.dvLogout = function() {
  dvSecureLogout();
};

console.info(`[ĐoànVăn Auth Secure v${AUTH_SECURE_VERSION}] ✅ Đã tải — Bảo mật đăng nhập được kích hoạt`);
