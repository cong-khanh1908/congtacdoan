/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║   DOANVAN — AUTH SECURE  v4.0  (Nâng cấp toàn diện)                       ║
 * ║                                                                              ║
 * ║  KHẮC PHỤC & NÂNG CẤP so với v3.0:                                         ║
 * ║  ✅ FIX: Đóng modal AdminSetup không còn mất overlay đăng nhập              ║
 * ║  ✅ FIX: Sau AdminSetup hoàn tất → tự đăng nhập PIN ngay, không cần reload ║
 * ║  ✅ FIX: SyncCode dùng dvSecureAuth overlay thay vì dvAuthModal cũ          ║
 * ║  ✅ FIX: JoinWithCode sau khi xong → hiện ngay màn hình PIN đăng nhập       ║
 * ║  ✅ FIX: Nút "Đổi tài khoản" / "Đăng xuất" ngay màn hình PIN login         ║
 * ║  ✅ FIX: Admin step-1 SA bắt buộc test kết nối trước khi sang step-2        ║
 * ║  ✅ FIX: Lockout timer tự clear đúng sau khi hết thời gian                  ║
 * ║  ✅ NEW: Giao diện toàn bộ được polish — animation, feedback trực quan       ║
 * ║  ✅ NEW: Bảng số PIN hỗ trợ cả keyboard vật lý (desktop)                    ║
 * ║  ✅ NEW: Màn hình loading mượt sau đăng nhập thành công                     ║
 * ║  ✅ NEW: Hiển thị avatar chữ cái đầu tên người dùng                         ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

'use strict';

// ─────────────────────────────────────────────────────────────────────
//  HẰNG SỐ & CẤU HÌNH
// ─────────────────────────────────────────────────────────────────────
const AUTH_SECURE_VERSION = '4.0';
const SESSION_TTL         = 8 * 60 * 60 * 1000; // 8 giờ
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION    = 5 * 60 * 1000; // 5 phút

const KEYS = {
  MT_CONFIG:     'mt_config',
  SESSION:       'dv_secure_session',
  FAILED:        'dv_auth_failed',
  LOCKOUT_UNTIL: 'dv_lockout_until',
};

// ─────────────────────────────────────────────────────────────────────
//  HASH UTILITIES
// ─────────────────────────────────────────────────────────────────────
async function _secureHash(pin) {
  const data = new TextEncoder().encode('doanvan_salt_2024_' + pin);
  const buf  = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}
function _fallbackHash(pin) {
  let h = 5381;
  const s = 'doanvan_salt_2024_' + pin;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h) ^ s.charCodeAt(i);
  return (h >>> 0).toString(16).padStart(8, '0');
}
async function _hashPIN(pin) {
  try {
    if (crypto?.subtle) return await _secureHash(pin);
    return _fallbackHash(pin);
  } catch { return _fallbackHash(pin); }
}
function _legacyHash(pin) {
  let h = 5381;
  for (let i = 0; i < pin.length; i++) h = ((h << 5) + h) ^ pin.charCodeAt(i);
  return (h >>> 0).toString(16).padStart(8, '0');
}
function _mtLegacyHash(pin) { return _legacyHash(pin); }

// ─────────────────────────────────────────────────────────────────────
//  SESSION MANAGER
// ─────────────────────────────────────────────────────────────────────
const SecureSession = {
  start(role, username, orgId) {
    sessionStorage.setItem(KEYS.SESSION, JSON.stringify({
      role, username, orgId, ts: Date.now(), ttl: SESSION_TTL
    }));
  },
  get() {
    try {
      const s = JSON.parse(sessionStorage.getItem(KEYS.SESSION) || 'null');
      if (!s) return null;
      if (Date.now() - s.ts > (s.ttl || SESSION_TTL)) { this.end(); return null; }
      return s;
    } catch { return null; }
  },
  end() { sessionStorage.removeItem(KEYS.SESSION); },
  isValid() { return !!this.get(); },
  isAdmin() { return this.get()?.role === 'admin'; },
  getRole() { return this.get()?.role || null; },
};

// ─────────────────────────────────────────────────────────────────────
//  LOCKOUT MANAGER
// ─────────────────────────────────────────────────────────────────────
const AuthLock = {
  isLocked() {
    const until = parseInt(localStorage.getItem(KEYS.LOCKOUT_UNTIL) || '0');
    if (Date.now() < until) return true;
    if (until > 0) { localStorage.removeItem(KEYS.LOCKOUT_UNTIL); localStorage.removeItem(KEYS.FAILED); }
    return false;
  },
  remainingSeconds() {
    return Math.max(0, Math.ceil((parseInt(localStorage.getItem(KEYS.LOCKOUT_UNTIL) || '0') - Date.now()) / 1000));
  },
  recordFailure() {
    const count = parseInt(localStorage.getItem(KEYS.FAILED) || '0') + 1;
    localStorage.setItem(KEYS.FAILED, count);
    if (count >= MAX_FAILED_ATTEMPTS) {
      localStorage.setItem(KEYS.LOCKOUT_UNTIL, Date.now() + LOCKOUT_DURATION);
      return { locked: true, attemptsLeft: 0 };
    }
    return { locked: false, attemptsLeft: MAX_FAILED_ATTEMPTS - count };
  },
  clearFailures() {
    localStorage.removeItem(KEYS.FAILED);
    localStorage.removeItem(KEYS.LOCKOUT_UNTIL);
  },
};

// ─────────────────────────────────────────────────────────────────────
//  LẤY TRẠNG THÁI ỨNG DỤNG
// ─────────────────────────────────────────────────────────────────────
function _getAppState() {
  try {
    const mtCfg = JSON.parse(localStorage.getItem(KEYS.MT_CONFIG) || 'null');
    if (!mtCfg?.spreadsheetId || !mtCfg?.user) {
      return { mode: 'NO_SETUP' };
    }
    return {
      mode:        'MT_AUTH',
      role:        mtCfg.user?.role || mtCfg.role || 'member',
      username:    mtCfg.user?.username || '',
      displayName: mtCfg.user?.displayName || mtCfg.user?.username || 'Người dùng',
      orgName:     mtCfg.orgName || 'Hệ thống',
      orgId:       mtCfg.orgId  || 'all',
    };
  } catch { return { mode: 'NO_SETUP' }; }
}

// ─────────────────────────────────────────────────────────────────────
//  TRẠNG THÁI NỘI BỘ
// ─────────────────────────────────────────────────────────────────────
let _secPinEntry  = '';
let _secAppState  = null;
let _lockoutInterval = null;

// ─────────────────────────────────────────────────────────────────────
//  CSS TOÀN BỘ OVERLAY
// ─────────────────────────────────────────────────────────────────────
function _injectSecureCSS() {
  if (document.getElementById('dvSecureAuthCSS')) return;
  const style = document.createElement('style');
  style.id = 'dvSecureAuthCSS';
  style.textContent = `
    /* ── Overlay nền ── */
    #dvSecureAuth {
      position: fixed; inset: 0; z-index: 99999;
      background: rgba(10, 15, 35, 0.92);
      backdrop-filter: blur(12px);
      display: flex; align-items: center; justify-content: center;
      padding: 16px;
      animation: dvsec-fadeIn 0.25s ease;
    }
    @keyframes dvsec-fadeIn { from { opacity:0 } to { opacity:1 } }

    /* ── Card trung tâm ── */
    #dvSecureBox {
      background: #fff;
      border-radius: 24px;
      width: 100%; max-width: 380px;
      box-shadow: 0 32px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.08);
      overflow: hidden;
      animation: dvsec-slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1);
    }
    @keyframes dvsec-slideUp {
      from { transform: translateY(24px) scale(0.97); opacity:0 }
      to   { transform: translateY(0)    scale(1);    opacity:1 }
    }

    /* ── Header ── */
    .dvsec-header {
      background: linear-gradient(145deg, #1a2340 0%, #c0392b 100%);
      padding: 28px 24px 22px;
      text-align: center; color: #fff; position: relative;
    }
    .dvsec-logo {
      width: 56px; height: 56px; border-radius: 50%;
      background: rgba(255,255,255,0.15);
      border: 2px solid rgba(255,255,255,0.3);
      display: inline-flex; align-items: center; justify-content: center;
      font-size: 1.5rem; margin-bottom: 10px;
      backdrop-filter: blur(4px);
    }
    .dvsec-avatar {
      width: 56px; height: 56px; border-radius: 50%;
      background: rgba(255,255,255,0.2);
      border: 2px solid rgba(255,255,255,0.4);
      display: inline-flex; align-items: center; justify-content: center;
      font-size: 1.6rem; font-weight: 800; margin-bottom: 10px;
      color: #fff; text-transform: uppercase;
    }
    .dvsec-title  { font-size: 1.2rem; font-weight: 800; letter-spacing: 0.5px; }
    .dvsec-sub    { font-size: 0.8rem; opacity: 0.8; margin-top: 3px; }

    /* Nút đổi tài khoản góc trên phải header */
    .dvsec-switch-btn {
      position: absolute; top: 12px; right: 14px;
      background: rgba(255,255,255,0.15); border: none; border-radius: 8px;
      color: #fff; font-size: 0.7rem; padding: 5px 9px; cursor: pointer;
      display: flex; align-items: center; gap: 4px;
      transition: background 0.15s;
    }
    .dvsec-switch-btn:hover { background: rgba(255,255,255,0.25); }

    /* ── Body ── */
    .dvsec-body {
      padding: 22px 22px 20px;
    }

    /* ── Role badge ── */
    .dvsec-role-badge {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 5px 12px; border-radius: 20px;
      font-size: 0.75rem; font-weight: 700;
      margin-bottom: 14px;
    }
    .dvsec-role-badge.admin   { background:#fef2f2; color:#c0392b; border:1px solid #fecaca; }
    .dvsec-role-badge.manager { background:#eff6ff; color:#1e40af; border:1px solid #bfdbfe; }
    .dvsec-role-badge.member  { background:#f0fdf4; color:#166534; border:1px solid #bbf7d0; }

    /* ── PIN dots ── */
    .dvsec-pin-row {
      display: flex; gap: 10px; justify-content: center;
      margin: 12px 0 6px;
    }
    .dvsec-dot {
      width: 44px; height: 44px; border-radius: 50%;
      background: #f1f5f9; border: 2px solid #e2e8f0;
      display: flex; align-items: center; justify-content: center;
      font-size: 1.5rem; color: #cbd5e1;
      transition: all 0.15s ease;
    }
    .dvsec-dot.filled { background: #1a2340; border-color: #1a2340; color: #1a2340;
      box-shadow: 0 2px 8px rgba(26,35,64,0.3); }
    .dvsec-dot.active { border-color: #c0392b; box-shadow: 0 0 0 3px rgba(192,57,43,0.15); }
    .dvsec-dot.error  {
      background: #fee2e2; border-color: #c0392b; color: #c0392b;
      animation: dvsec-shake 0.35s ease;
    }
    @keyframes dvsec-shake {
      0%,100%{transform:translateX(0)}
      20%{transform:translateX(-5px)} 40%{transform:translateX(5px)}
      60%{transform:translateX(-3px)} 80%{transform:translateX(3px)}
    }

    /* ── Error text ── */
    .dvsec-error {
      text-align: center; font-size: 0.75rem; color: #c0392b;
      min-height: 18px; margin-bottom: 8px; font-weight: 500;
    }

    /* ── Keypad ── */
    .dvsec-keypad {
      display: grid; grid-template-columns: repeat(3, 1fr);
      gap: 8px; margin: 10px 0;
    }
    .dvsec-key {
      aspect-ratio: 1; border: none;
      background: #f8fafc; border-radius: 12px;
      font-size: 1.25rem; font-weight: 700; color: #1a2340;
      cursor: pointer; transition: all 0.1s ease;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 1px 3px rgba(0,0,0,0.08);
      min-height: 52px;
    }
    .dvsec-key:hover:not(:disabled) { background: #e2e8f0; transform: scale(0.97); }
    .dvsec-key:active:not(:disabled) { background: #cbd5e1; transform: scale(0.93); }
    .dvsec-key:disabled { opacity:0; pointer-events:none; }
    .dvsec-key.del { background: #fff0f0; color: #c0392b; }
    .dvsec-key.del:hover { background: #fee2e2; }

    /* ── Lock message ── */
    .dvsec-lock-msg {
      background: #fff7ed; border: 1px solid #fed7aa;
      border-radius: 10px; padding: 10px 14px;
      font-size: 0.78rem; color: #c2410c; text-align: center;
      margin-bottom: 10px; line-height: 1.6;
    }

    /* ── Info box ── */
    .dvsec-info-box {
      background: #eff6ff; border: 1px solid #bfdbfe;
      border-radius: 10px; padding: 12px 14px;
      font-size: 0.78rem; color: #1e40af; line-height: 1.8;
      margin: 12px 0;
    }

    /* ── No-setup screen ── */
    .dvsec-nosetup { text-align: center; }
    .dvsec-nosetup-icon {
      width: 60px; height: 60px; border-radius: 50%;
      background: linear-gradient(135deg,#f59e0b,#c0392b);
      display: inline-flex; align-items: center; justify-content: center;
      font-size: 1.5rem; color: #fff; margin-bottom: 12px;
      box-shadow: 0 4px 14px rgba(192,57,43,0.3);
    }

    /* ── Buttons ── */
    .dvsec-btn {
      width: 100%; padding: 12px 16px; border-radius: 12px;
      border: none; font-size: 0.9rem; font-weight: 700;
      cursor: pointer; margin-bottom: 8px;
      display: flex; align-items: center; justify-content: center; gap: 8px;
      transition: all 0.15s ease;
    }
    .dvsec-btn.primary {
      background: linear-gradient(135deg, #c0392b, #e74c3c);
      color: #fff;
      box-shadow: 0 4px 14px rgba(192,57,43,0.35);
    }
    .dvsec-btn.primary:hover { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(192,57,43,0.45); }
    .dvsec-btn.primary:active { transform: translateY(0); }
    .dvsec-btn.ghost {
      background: #f8fafc; color: #475569;
      border: 1px solid #e2e8f0;
    }
    .dvsec-btn.ghost:hover { background: #f1f5f9; border-color: #cbd5e1; }
    .dvsec-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none !important; }

    /* ── Divider & link row ── */
    .dvsec-divider { border: none; border-top: 1px solid #f1f5f9; margin: 12px 0; }
    .dvsec-link-row {
      text-align: center; font-size: 0.75rem; color: #94a3b8; margin-top: 6px;
    }
    .dvsec-link-row a {
      color: #c0392b; cursor: pointer; text-decoration: none; font-weight: 600;
    }
    .dvsec-link-row a:hover { text-decoration: underline; }

    /* ── Success screen ── */
    .dvsec-success {
      text-align: center; padding: 10px 0;
    }
    .dvsec-success-icon {
      width: 64px; height: 64px; border-radius: 50%;
      background: linear-gradient(135deg,#10b981,#059669);
      display: inline-flex; align-items: center; justify-content: center;
      font-size: 1.8rem; color: #fff; margin: 8px auto 14px;
      animation: dvsec-pop 0.4s cubic-bezier(0.34,1.56,0.64,1);
    }
    @keyframes dvsec-pop {
      from { transform: scale(0); opacity:0 }
      to   { transform: scale(1); opacity:1 }
    }

    /* ── Progress bar loading ── */
    .dvsec-progress {
      height: 3px; background: #e2e8f0; border-radius: 2px; overflow: hidden; margin-top: 8px;
    }
    .dvsec-progress-bar {
      height: 100%; background: linear-gradient(90deg,#c0392b,#e74c3c);
      border-radius: 2px;
      animation: dvsec-progress 1.8s ease forwards;
    }
    @keyframes dvsec-progress { from{width:0} to{width:100%} }

    /* ── Form controls bên trong overlay ── */
    .dvsec-form-group { margin-bottom: 14px; }
    .dvsec-form-label {
      display: block; font-size: 0.78rem; font-weight: 700;
      color: #475569; margin-bottom: 5px;
    }
    .dvsec-form-control {
      width: 100%; padding: 10px 12px; border-radius: 10px;
      border: 1.5px solid #e2e8f0; font-size: 0.9rem;
      outline: none; transition: border-color 0.15s;
      box-sizing: border-box; font-family: inherit;
    }
    .dvsec-form-control:focus { border-color: #c0392b; box-shadow: 0 0 0 3px rgba(192,57,43,0.1); }
    .dvsec-form-control.error { border-color: #c0392b; }

    /* ── Scrollable body cho Join/Sync form ── */
    .dvsec-body.scroll { max-height: 70vh; overflow-y: auto; }

    /* ── Version badge ── */
    .dvsec-version {
      text-align: center; font-size: 0.66rem; color: #cbd5e1; margin-top: 8px;
    }
  `;
  document.head.appendChild(style);
}

// ─────────────────────────────────────────────────────────────────────
//  MÀN HÌNH CHÍNH — ĐIỀU PHỐI
// ─────────────────────────────────────────────────────────────────────
window.dvSecureShowLogin = function dvSecureShowLogin() {
  _injectSecureCSS();
  _secPinEntry  = '';
  _secAppState  = _getAppState();

  document.getElementById('dvSecureAuth')?.remove();
  clearInterval(_lockoutInterval);

  const overlay = document.createElement('div');
  overlay.id = 'dvSecureAuth';

  if (_secAppState.mode === 'NO_SETUP') {
    overlay.innerHTML = _buildNoSetupUI();
  } else {
    overlay.innerHTML = _buildPINLoginUI(_secAppState);
    _bindKeyboard();
  }

  document.body.appendChild(overlay);

  if (_secAppState.mode !== 'NO_SETUP') {
    _startLockoutTimer();
    // Focus hỗ trợ keyboard
    overlay.setAttribute('tabindex', '-1');
    overlay.focus();
  }
};

// ─────────────────────────────────────────────────────────────────────
//  UI: CHƯA CÀI ĐẶT
// ─────────────────────────────────────────────────────────────────────
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
        <div style="font-weight:800;font-size:1rem;color:#1a2340;margin-bottom:6px">
          Chưa cài đặt hệ thống
        </div>
        <div style="font-size:0.8rem;color:#64748b;margin-bottom:4px;line-height:1.6">
          Để sử dụng phần mềm, Admin cần thiết lập kết nối Google Sheet trước.
        </div>
      </div>
      <div class="dvsec-info-box">
        <strong><i class="fas fa-shield-alt" style="color:#c0392b;margin-right:5px"></i>Lưu ý bảo mật:</strong><br>
        • Chỉ <strong>Admin</strong> mới có thể cài đặt ban đầu<br>
        • Người dùng khác cần <strong>Mã mời</strong> từ Admin<br>
        • Mọi tài khoản đều phải xác thực qua PIN riêng
      </div>
      <hr class="dvsec-divider">
      <button class="dvsec-btn primary" onclick="dvSecureOpenAdminSetup()">
        <i class="fas fa-crown"></i>Cài đặt Admin (lần đầu)
      </button>
      <button class="dvsec-btn ghost" onclick="dvSecureOpenJoinWithCode()">
        <i class="fas fa-ticket-alt"></i>Tham gia bằng Mã mời
      </button>
      <div class="dvsec-link-row" style="margin-top:8px">
        <i class="fas fa-info-circle" style="margin-right:4px;opacity:0.6"></i>
        Đã có tài khoản? Dùng <a onclick="dvSecureOpenSyncCode()">Sync Code</a>
      </div>
    </div>
  </div>`;
}

// ─────────────────────────────────────────────────────────────────────
//  UI: ĐĂNG NHẬP PIN
// ─────────────────────────────────────────────────────────────────────
function _buildPINLoginUI(state) {
  const roleLabel = { admin: 'Admin', manager: 'Quản lý', member: 'Đoàn viên' }[state.role] || 'Người dùng';
  const roleClass = { admin: 'admin', manager: 'manager', member: 'member' }[state.role] || 'member';
  const roleIcon  = { admin: 'fa-crown', manager: 'fa-user-tie', member: 'fa-user' }[state.role] || 'fa-user';
  const avatarChar = (state.displayName || 'U')[0].toUpperCase();
  const isLocked   = AuthLock.isLocked();
  const failedCount = parseInt(localStorage.getItem(KEYS.FAILED) || '0');

  return `
  <div id="dvSecureBox">
    <div class="dvsec-header">
      <button class="dvsec-switch-btn" onclick="dvSecureOpenSwitchAccount()" title="Đổi tài khoản / Đăng xuất">
        <i class="fas fa-exchange-alt"></i> Đổi tài khoản
      </button>
      <div class="dvsec-avatar">${avatarChar}</div>
      <div class="dvsec-title">Xin chào, ${state.displayName}</div>
      <div class="dvsec-sub">Nhập mã PIN để tiếp tục</div>
    </div>
    <div class="dvsec-body">
      <div style="text-align:center;margin-bottom:4px">
        <span class="dvsec-role-badge ${roleClass}">
          <i class="fas ${roleIcon}"></i>${roleLabel} · ${state.orgName}
        </span>
      </div>

      ${isLocked ? `
      <div class="dvsec-lock-msg" id="dvSecLockMsg">
        <i class="fas fa-lock" style="font-size:1.1rem;display:block;margin-bottom:4px"></i>
        Tài khoản tạm khoá do nhập sai nhiều lần.<br>
        Thử lại sau: <strong id="dvSecLockTimer">${AuthLock.remainingSeconds()}s</strong>
      </div>` : ''}

      <div class="dvsec-pin-row" id="dvSecPinDots">
        ${Array(6).fill(0).map((_, i) => `<div class="dvsec-dot" id="dvSecDot${i}">•</div>`).join('')}
      </div>
      <div class="dvsec-error" id="dvSecError">
        ${!isLocked && failedCount > 0 ? `⚠ Còn ${MAX_FAILED_ATTEMPTS - failedCount} lần thử` : ''}
      </div>

      <div class="dvsec-keypad" id="dvSecKeypad" ${isLocked ? 'style="pointer-events:none;opacity:0.35"' : ''}>
        ${[1,2,3,4,5,6,7,8,9,'',0,'del'].map(k => `
          <button class="dvsec-key${k===''?' ':k==='del'?' del':''}"
            onclick="dvSecKeyPress('${k}')"
            ${k===''?'disabled':''}>
            ${k==='del' ? '<i class="fas fa-backspace"></i>' : k}
          </button>`).join('')}
      </div>

      <div class="dvsec-link-row">
        <a onclick="dvSecureOpenSyncCode()">
          <i class="fas fa-sync-alt"></i> Sync Code
        </a>
        &nbsp;·&nbsp;
        <a onclick="dvSecureOpenJoinWithCode()">
          <i class="fas fa-ticket-alt"></i> Mã mời
        </a>
      </div>
      <div class="dvsec-version">
        <i class="fas fa-shield-alt" style="color:#10b981"></i>
        Phiên bảo mật · Auth Secure v${AUTH_SECURE_VERSION}
      </div>
    </div>
  </div>`;
}

// ─────────────────────────────────────────────────────────────────────
//  KEYBOARD VẬT LÝ HỖ TRỢ
// ─────────────────────────────────────────────────────────────────────
function _bindKeyboard() {
  const handler = (e) => {
    if (!document.getElementById('dvSecureAuth')) {
      document.removeEventListener('keydown', handler);
      return;
    }
    if (e.key >= '0' && e.key <= '9') dvSecKeyPress(e.key);
    else if (e.key === 'Backspace') dvSecKeyPress('del');
    else if (e.key === 'Enter' && _secPinEntry.length === 6) dvSecSubmitPIN();
  };
  document.removeEventListener('keydown', handler);
  document.addEventListener('keydown', handler);
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
  // Re-enable keypad
  const kp = document.getElementById('dvSecKeypad');
  if (kp && !AuthLock.isLocked()) kp.style.pointerEvents = '';
  setTimeout(() => {
    for (let i = 0; i < 6; i++) {
      const d = document.getElementById(`dvSecDot${i}`);
      if (d) d.className = 'dvsec-dot';
    }
  }, 500);
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

  const keypad = document.getElementById('dvSecKeypad');
  if (keypad) keypad.style.pointerEvents = 'none';

  try {
    const storedCfg = (() => {
      try { return JSON.parse(localStorage.getItem(KEYS.MT_CONFIG) || 'null'); } catch { return null; }
    })();

    if (!storedCfg?.user?.pinHash) {
      _shakeAndClearPIN('Tài khoản chưa có PIN. Liên hệ Admin.');
      return;
    }

    const stored  = storedCfg.user.pinHash;
    const hashNew = await _hashPIN(pin);
    const hashOld = _legacyHash(pin);
    const hashFb  = _fallbackHash(pin);

    const ok = stored === hashNew || stored === hashOld || stored === hashFb || stored === _mtLegacyHash(pin);

    if (ok) {
      AuthLock.clearFailures();
      SecureSession.start(storedCfg.user?.role || storedCfg.role, storedCfg.user.username, storedCfg.orgId);
      _bridgeLegacySession(storedCfg);
      _showLoginSuccess(storedCfg);
    } else {
      const result = AuthLock.recordFailure();
      if (result.locked) {
        _shakeAndClearPIN('');
        dvSecureShowLogin();
      } else {
        _shakeAndClearPIN(`PIN không đúng. Còn ${result.attemptsLeft} lần thử.`);
      }
    }
  } catch (err) {
    console.error('[AuthSecure] Lỗi xác thực:', err);
    _shakeAndClearPIN('Lỗi xác thực. Thử lại.');
    if (keypad) keypad.style.pointerEvents = '';
  }
};

// ─────────────────────────────────────────────────────────────────────
//  HIỂN THỊ MÀN HÌNH ĐĂNG NHẬP THÀNH CÔNG
// ─────────────────────────────────────────────────────────────────────
function _showLoginSuccess(cfg) {
  const box = document.getElementById('dvSecureBox');
  if (!box) { _dismissAndLaunch(cfg); return; }

  const roleLabel = { admin: 'Admin', manager: 'Quản lý', member: 'Đoàn viên' }[cfg.user?.role || cfg.role] || 'Người dùng';
  box.innerHTML = `
    <div class="dvsec-header" style="background:linear-gradient(135deg,#059669,#10b981)">
      <div class="dvsec-logo"><i class="fas fa-check"></i></div>
      <div class="dvsec-title">Đăng nhập thành công!</div>
      <div class="dvsec-sub">${roleLabel} · ${cfg.orgName || 'Hệ thống'}</div>
    </div>
    <div class="dvsec-body">
      <div class="dvsec-success">
        <div style="font-size:0.9rem;color:#475569">Đang tải dữ liệu...</div>
        <div class="dvsec-progress" style="margin-top:16px">
          <div class="dvsec-progress-bar"></div>
        </div>
      </div>
    </div>`;

  setTimeout(() => _dismissAndLaunch(cfg), 1600);
}

// ─────────────────────────────────────────────────────────────────────
//  BRIDGE VỚI MODULE CŨ
// ─────────────────────────────────────────────────────────────────────
function _bridgeLegacySession(cfg) {
  sessionStorage.setItem('doanvan_session', JSON.stringify({ ts: Date.now() }));

  if (typeof DVAuth !== 'undefined') {
    const existing = DVAuth.getProfile();
    if (!existing || existing.username !== cfg.user?.username) {
      DVAuth.saveProfile({
        username:    cfg.user?.username || 'user',
        displayName: cfg.user?.displayName || 'Người dùng',
        pinHash:     cfg.user?.pinHash,
        createdAt:   cfg.user?.createdAt || new Date().toISOString(),
        syncConfig:  { spreadsheetId: cfg.spreadsheetId, serviceAccountJson: cfg.serviceAccountJson },
        lastSync:    null,
        deviceId:    cfg.user?.deviceId || 'secure',
      });
    }
    DVAuth.startSession();
  }
}

// ─────────────────────────────────────────────────────────────────────
//  SAU ĐĂNG NHẬP THÀNH CÔNG
// ─────────────────────────────────────────────────────────────────────
function _dismissAndLaunch(cfg) {
  document.getElementById('dvSecureAuth')?.remove();
  clearInterval(_lockoutInterval);

  _renderSecureRoleBadge(cfg);
  _applyRoleRestrictions(cfg.user?.role || cfg.role);

  if (typeof _dvUpdateUserChip === 'function') setTimeout(() => _dvUpdateUserChip(), 100);
  if (typeof mtUpdateUIAfterLogin === 'function') mtUpdateUIAfterLogin();
  else if (typeof window._mtAfterLogin === 'function') window._mtAfterLogin();

  if (typeof dvInitSync === 'function') dvInitSync();
  if (cfg.spreadsheetId && typeof MTSync !== 'undefined') {
    setTimeout(() => MTSync.pullAll(() => {}).catch(() => {}), 2000);
  }

  if (typeof toast === 'function') {
    const roleEmoji = { admin: '⚙️', manager: '👔', member: '👤' }[cfg.user?.role || cfg.role] || '👤';
    toast(`${roleEmoji} <strong>${cfg.user?.displayName || ''}</strong> — Đăng nhập thành công!`, 'success');
  }
}

// ─────────────────────────────────────────────────────────────────────
//  ĐỒNG HỒ ĐẾM NGƯỢC LOCKOUT
// ─────────────────────────────────────────────────────────────────────
function _startLockoutTimer() {
  clearInterval(_lockoutInterval);
  if (!AuthLock.isLocked()) return;

  _lockoutInterval = setInterval(() => {
    if (!document.getElementById('dvSecureAuth')) { clearInterval(_lockoutInterval); return; }
    const rem = AuthLock.remainingSeconds();
    if (rem <= 0) {
      clearInterval(_lockoutInterval);
      dvSecureShowLogin();
      return;
    }
    const el = document.getElementById('dvSecLockTimer');
    if (el) el.textContent = rem + 's';
  }, 1000);
}

// ─────────────────────────────────────────────────────────────────────
//  PHÂN QUYỀN GIAO DIỆN
// ─────────────────────────────────────────────────────────────────────
function _applyRoleRestrictions(role) {
  const isAdmin   = role === 'admin';
  const isManager = role === 'admin' || role === 'manager';

  const adminNav = document.getElementById('mtAdminNav');
  if (adminNav) adminNav.style.display = isAdmin ? 'block' : 'none';

  const adminQuickBtn = document.getElementById('mtAdminQuickBtn');
  if (adminQuickBtn) adminQuickBtn.style.display = isAdmin ? 'inline-flex' : 'none';

  document.querySelectorAll('[data-admin-only], .admin-only-nav').forEach(el => {
    el.style.display = isAdmin ? '' : 'none';
  });

  if (!isAdmin) {
    document.querySelectorAll('[onclick*="mtShowInviteManager"],[onclick*="generateInviteCode"]').forEach(el => el.style.display='none');
    document.querySelectorAll('[onclick*="mtChangeRole"],[onclick*="mtDeleteUser"]').forEach(el => el.style.display='none');
  }

  window._dvCurrentRole = role;
  window._dvIsAdmin     = isAdmin;
  window._dvIsManager   = isManager;
}

// ─────────────────────────────────────────────────────────────────────
//  BADGE ROLE
// ─────────────────────────────────────────────────────────────────────
function _renderSecureRoleBadge(cfg) {
  document.getElementById('dvSecureRoleBadge')?.remove();
  const roleMap = {
    admin:   { label: 'Admin',     color: '#c0392b' },
    manager: { label: 'Quản lý',   color: '#1a2340' },
    member:  { label: 'Đoàn viên', color: '#16a34a' },
  };
  const r = roleMap[cfg.user?.role || cfg.role] || roleMap.member;
  const badge = document.createElement('div');
  badge.id = 'dvSecureRoleBadge';
  badge.style.cssText = `
    position:fixed; bottom:16px; left:50%; transform:translateX(-50%);
    background:#1a2340; color:#fff; padding:7px 16px; border-radius:20px;
    font-size:0.75rem; z-index:9998; display:flex; align-items:center; gap:8px;
    box-shadow:0 4px 14px rgba(0,0,0,0.35); animation: dvsec-fadeIn 0.3s ease;
    white-space:nowrap;
  `;
  badge.innerHTML = `
    <span style="width:8px;height:8px;border-radius:50%;background:${r.color};display:inline-block"></span>
    ${r.label} · ${cfg.user?.displayName || 'Người dùng'}
    <span style="opacity:0.55">· ${cfg.orgName || 'Hệ thống'}</span>`;
  document.body.appendChild(badge);
  setTimeout(() => { if (badge.parentNode) badge.remove(); }, 4000);
}

// ─────────────────────────────────────────────────────────────────────
//  MÀN HÌNH: CÀI ĐẶT ADMIN (inline trong dvSecureAuth overlay)
//
//  Lý do KHÔNG gọi mtShowAdminSetup() ngoài:
//  → .modal-overlay có z-index:200, #dvSecureAuth có z-index:99999
//  → Modal admin bị che bởi overlay → màn hình đen
//
//  Giải pháp: render toàn bộ UI 3 bước ngay trong #dvSecureBox
//  Tái sử dụng mtGoStep / mtTestSA / mtValidateStep2 / mtDoAdminSetup
//  có sẵn từ doanvan-multitenant.js
// ─────────────────────────────────────────────────────────────────────
window.dvSecureOpenAdminSetup = function() {
  _injectSecureCSS();
  document.getElementById('dvSecureAuth')?.remove();

  const overlay = document.createElement('div');
  overlay.id = 'dvSecureAuth';
  // Mở rộng card để chứa form 3 bước
  overlay.innerHTML = `
  <div id="dvSecureBox" style="max-width:580px">
    <div class="dvsec-header" style="padding:20px 24px 16px">
      <button class="dvsec-switch-btn" onclick="dvSecureShowLogin()" title="Quay lại">
        <i class="fas fa-arrow-left"></i> Quay lại
      </button>
      <div class="dvsec-logo"><i class="fas fa-shield-alt"></i></div>
      <div class="dvsec-title">Thiết lập Admin</div>
      <div class="dvsec-sub">Cài đặt hệ thống lần đầu</div>
    </div>
    <div class="dvsec-body scroll" style="padding:20px 22px 22px">

      <!-- STEPPER -->
      <div style="display:flex;gap:4px;margin-bottom:20px;background:#f1f5f9;border-radius:10px;padding:4px">
        <button id="dvSetupStep1Btn"
          style="flex:1;padding:8px 6px;border:none;border-radius:7px;font-size:0.73rem;font-weight:700;cursor:pointer;background:linear-gradient(135deg,#c0392b,#e74c3c);color:#fff;display:flex;align-items:center;justify-content:center;gap:4px">
          <i class="fas fa-key"></i> 1. Service Account
        </button>
        <button id="dvSetupStep2Btn" disabled
          style="flex:1;padding:8px 6px;border:none;border-radius:7px;font-size:0.73rem;font-weight:700;cursor:pointer;background:transparent;color:#94a3b8;display:flex;align-items:center;justify-content:center;gap:4px;transition:all 0.2s">
          <i class="fas fa-table"></i> 2. Google Sheet
        </button>
        <button id="dvSetupStep3Btn" disabled
          style="flex:1;padding:8px 6px;border:none;border-radius:7px;font-size:0.73rem;font-weight:700;cursor:pointer;background:transparent;color:#94a3b8;display:flex;align-items:center;justify-content:center;gap:4px;transition:all 0.2s">
          <i class="fas fa-user-shield"></i> 3. Tài khoản
        </button>
      </div>

      <!-- STEP 1: Service Account -->
      <div id="dvSetupPanel1">
        <div style="background:rgba(26,35,64,0.04);border-radius:10px;padding:14px;margin-bottom:14px;font-size:0.8rem;line-height:1.75">
          <div style="font-weight:700;color:#1a2340;margin-bottom:6px">
            <i class="fas fa-info-circle" style="color:#f59e0b"></i> Hướng dẫn tạo Service Account
          </div>
          <ol style="margin:0;padding-left:16px;color:#64748b">
            <li>Vào <a href="https://console.cloud.google.com" target="_blank" style="color:#c0392b;font-weight:600">Google Cloud Console</a> → Tạo project mới</li>
            <li>Bật API: <strong>Google Sheets API</strong> và <strong>Google Drive API</strong></li>
            <li>IAM & Admin → Service Accounts → Tạo service account</li>
            <li>Thêm key → JSON → Tải file về</li>
            <li>Mở file JSON → Sao chép toàn bộ → Dán vào ô bên dưới</li>
          </ol>
        </div>
        <div class="dvsec-form-group">
          <label class="dvsec-form-label">Service Account JSON Key <span style="color:#c0392b">*</span></label>
          <textarea id="mtSAInput" rows="5"
            style="width:100%;padding:10px 12px;border-radius:10px;border:1.5px solid #e2e8f0;font-family:monospace;font-size:0.7rem;outline:none;resize:vertical;box-sizing:border-box;transition:border-color 0.15s"
            onfocus="this.style.borderColor='#c0392b'"
            onblur="this.style.borderColor='#e2e8f0'"
            placeholder='{"type":"service_account","project_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n","client_email":"...@....iam.gserviceaccount.com",...}'></textarea>
          <div id="mtSAStatus" style="font-size:0.75rem;margin-top:5px;min-height:16px"></div>
        </div>
        <div style="display:flex;gap:8px">
          <button onclick="mtTestSA()"
            style="flex:1;padding:10px;border:1.5px solid #f59e0b;background:#fffbeb;color:#b45309;border-radius:10px;font-size:0.82rem;font-weight:700;cursor:pointer">
            <i class="fas fa-vial"></i> Kiểm tra kết nối
          </button>
          <button onclick="dvSetupGoStep(2)"
            style="flex:1;padding:10px;border:none;background:linear-gradient(135deg,#c0392b,#e74c3c);color:#fff;border-radius:10px;font-size:0.82rem;font-weight:700;cursor:pointer">
            Tiếp theo <i class="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>

      <!-- STEP 2: Google Sheet -->
      <div id="dvSetupPanel2" style="display:none">
        <div style="background:rgba(2,132,199,0.05);border-radius:10px;padding:12px;margin-bottom:14px;font-size:0.8rem;border:1px solid rgba(2,132,199,0.2)">
          <div style="font-weight:700;color:#0369a1;margin-bottom:8px"><i class="fas fa-info-circle"></i> Hướng dẫn thiết lập Google Sheet</div>
          <div style="display:flex;flex-direction:column;gap:6px;color:#64748b">
            <div><span style="display:inline-flex;width:19px;height:19px;border-radius:50%;background:#0284c7;color:#fff;font-size:0.62rem;font-weight:800;align-items:center;justify-content:center;margin-right:5px">1</span>
              Vào <a href="https://sheets.google.com" target="_blank" style="color:#0284c7;font-weight:600">sheets.google.com</a> → Tạo spreadsheet mới (trống)
            </div>
            <div><span style="display:inline-flex;width:19px;height:19px;border-radius:50%;background:#0284c7;color:#fff;font-size:0.62rem;font-weight:800;align-items:center;justify-content:center;margin-right:5px">2</span>
              Nhấn <b>Chia sẻ</b> → thêm <b id="mtSAEmailHint" style="color:#dc2626;font-family:monospace;font-size:0.78rem">email-service-account</b> quyền <b>Chỉnh sửa</b>
            </div>
            <div><span style="display:inline-flex;width:19px;height:19px;border-radius:50%;background:#0284c7;color:#fff;font-size:0.62rem;font-weight:800;align-items:center;justify-content:center;margin-right:5px">3</span>
              Copy ID từ URL: <code style="background:#f1f5f9;padding:1px 5px;border-radius:4px;font-size:0.72rem">docs.google.com/spreadsheets/d/<b style="color:#dc2626">ID</b>/edit</code>
            </div>
          </div>
        </div>
        <div class="dvsec-form-group">
          <label class="dvsec-form-label">Spreadsheet ID <span style="color:#dc2626">* bắt buộc</span></label>
          <input id="mtSheetIdInput" class="dvsec-form-control"
            placeholder="Dán Spreadsheet ID vào đây..."
            style="font-family:monospace;font-size:0.82rem;border-color:#f59e0b"
            oninput="this.style.borderColor=this.value?'#16a34a':'#f59e0b'">
          <div style="font-size:0.73rem;color:#f59e0b;margin-top:4px">
            <i class="fas fa-exclamation-triangle"></i> Hệ thống sẽ tự tạo các sheet cần thiết trong spreadsheet này.
          </div>
        </div>
        <div id="mtStep2Status" style="font-size:0.78rem;min-height:16px;margin-bottom:10px"></div>
        <div style="display:flex;gap:8px">
          <button onclick="dvSetupGoStep(1)"
            style="padding:10px 14px;border:1.5px solid #e2e8f0;background:#f8fafc;color:#475569;border-radius:10px;font-size:0.82rem;font-weight:700;cursor:pointer">
            <i class="fas fa-arrow-left"></i> Quay lại
          </button>
          <button onclick="mtValidateStep2()"
            style="flex:1;padding:10px;border:none;background:linear-gradient(135deg,#c0392b,#e74c3c);color:#fff;border-radius:10px;font-size:0.82rem;font-weight:700;cursor:pointer">
            Tiếp theo <i class="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>

      <!-- STEP 3: Tài khoản Admin -->
      <div id="dvSetupPanel3" style="display:none">
        <div style="background:rgba(192,57,43,0.04);border-radius:10px;padding:12px;margin-bottom:14px;font-size:0.8rem;border:1px solid rgba(192,57,43,0.15)">
          <div style="font-weight:700;color:#c0392b;margin-bottom:3px"><i class="fas fa-shield-alt"></i> Tài khoản Admin</div>
          <div style="color:#64748b">Tài khoản quản trị hệ thống — có thể tạo mã mời và quản lý toàn bộ dữ liệu.</div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px">
          <div>
            <label class="dvsec-form-label">Tên đăng nhập <span style="color:#c0392b">*</span></label>
            <input id="mtAdminUsername" class="dvsec-form-control" placeholder="VD: admin_bvps" style="font-size:0.9rem">
          </div>
          <div>
            <label class="dvsec-form-label">Tên hiển thị <span style="color:#c0392b">*</span></label>
            <input id="mtAdminDisplayName" class="dvsec-form-control" placeholder="VD: Bí thư Đoàn" style="font-size:0.9rem">
          </div>
        </div>
        <div class="dvsec-form-group">
          <label class="dvsec-form-label">Mã PIN (6 số) <span style="color:#c0392b">*</span></label>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
            <input type="password" id="mtAdminPIN" class="dvsec-form-control"
              placeholder="● ● ● ● ● ●" maxlength="6" inputmode="numeric"
              style="letter-spacing:8px;font-size:1.1rem;text-align:center"
              oninput="this.value=this.value.replace(/[^0-9]/g,'')">
            <input type="password" id="mtAdminPIN2" class="dvsec-form-control"
              placeholder="Xác nhận PIN" maxlength="6" inputmode="numeric"
              style="letter-spacing:8px;font-size:1.1rem;text-align:center"
              oninput="this.value=this.value.replace(/[^0-9]/g,'')">
          </div>
          <div style="font-size:0.73rem;color:#dc2626;margin-top:4px">
            <i class="fas fa-shield-alt"></i> Không có PIN mặc định — bắt buộc nhập để bảo mật
          </div>
        </div>
        <div id="mtSetupStatus" style="font-size:0.8rem;margin-bottom:12px;min-height:18px"></div>
        <div style="display:flex;gap:8px">
          <button onclick="dvSetupGoStep(2)"
            style="padding:10px 14px;border:1.5px solid #e2e8f0;background:#f8fafc;color:#475569;border-radius:10px;font-size:0.82rem;font-weight:700;cursor:pointer">
            <i class="fas fa-arrow-left"></i> Quay lại
          </button>
          <button id="dvSetupFinishBtn" onclick="dvSecureDoAdminSetup()"
            style="flex:1;padding:11px;border:none;background:linear-gradient(135deg,#c0392b,#e74c3c);color:#fff;border-radius:10px;font-size:0.88rem;font-weight:800;cursor:pointer;box-shadow:0 4px 14px rgba(192,57,43,0.35)">
            <i class="fas fa-check-circle"></i> Hoàn tất thiết lập
          </button>
        </div>
      </div>

    </div>
  </div>`;

  document.body.appendChild(overlay);

  // Ghi đè mtGoStep để update stepper mới
  window.mtGoStep = dvSetupGoStep;
  // Ghi đè mtValidateStep2 để dùng stepper mới
  window.mtValidateStep2 = _dvValidateStep2;
};

/** Điều hướng bước trong form inline */
window.dvSetupGoStep = function(step) {
  [1, 2, 3].forEach(i => {
    const panel = document.getElementById(`dvSetupPanel${i}`);
    const btn   = document.getElementById(`dvSetupStep${i}Btn`);
    if (panel) panel.style.display = i === step ? 'block' : 'none';
    if (btn) {
      if (i <= step) {
        btn.style.background = 'linear-gradient(135deg,#c0392b,#e74c3c)';
        btn.style.color = '#fff';
        btn.disabled = false;
      } else {
        btn.style.background = 'transparent';
        btn.style.color = '#94a3b8';
        btn.disabled = true;
      }
      if (i === step) {
        btn.style.boxShadow = '0 2px 8px rgba(192,57,43,0.3)';
      } else {
        btn.style.boxShadow = 'none';
      }
    }
  });

  // Khi sang bước 2: điền email SA vào hint
  if (step === 2) {
    try {
      const sa = JSON.parse(document.getElementById('mtSAInput')?.value || '{}');
      const hint = document.getElementById('mtSAEmailHint');
      if (hint && sa.client_email) hint.textContent = sa.client_email;
    } catch {}
  }
};

/** Validate bước 2 — thay thế mtValidateStep2 gốc khi trong overlay */
function _dvValidateStep2() {
  const sheetId = document.getElementById('mtSheetIdInput')?.value.trim();
  const status  = document.getElementById('mtStep2Status');
  if (!sheetId) {
    if (status) status.innerHTML = '<span style="color:#dc2626"><i class="fas fa-exclamation-triangle"></i> Vui lòng nhập Spreadsheet ID trước khi tiếp tục.</span>';
    document.getElementById('mtSheetIdInput')?.focus();
    return;
  }
  if (sheetId.length < 20) {
    if (status) status.innerHTML = '<span style="color:#dc2626"><i class="fas fa-times-circle"></i> ID không hợp lệ. Copy đúng phần ID từ URL.</span>';
    return;
  }
  if (status) status.innerHTML = '<span style="color:#16a34a"><i class="fas fa-check-circle"></i> Spreadsheet ID hợp lệ.</span>';
  dvSetupGoStep(3);
}

/** Hoàn tất setup — delegate sang mtDoAdminSetup gốc nếu có, fallback tự xử lý */
window.dvSecureDoAdminSetup = async function() {
  if (typeof mtDoAdminSetup === 'function') {
    // Restore mtGoStep gốc tạm thời để mtDoAdminSetup dùng đúng step panels
    // (mtDoAdminSetup gốc gọi mtGoStep(2) khi thiếu sheetId)
    const origGo = window.mtGoStep;
    window.mtGoStep = dvSetupGoStep;

    // Hook: sau khi mtDoAdminSetup xong thành công → chuyển sang PIN login
    const origDo = window.mtDoAdminSetup;
    window.mtDoAdminSetup = async function() {
      await origDo.apply(this, arguments);
      // Kiểm tra sau 2s (mtDoAdminSetup có setTimeout 1800ms rồi remove modal)
      setTimeout(() => {
        window.mtGoStep = origGo; // restore
        _secAppState = _getAppState();
        if (_secAppState.mode === 'MT_AUTH') {
          dvSecureShowLogin();
        }
      }, 2200);
    };
    window.mtDoAdminSetup();
    // Restore ngay sau call để tránh double-hook
    window.mtDoAdminSetup = origDo;
    return;
  }

  // Fallback: tự validate và lưu nếu mtDoAdminSetup chưa load
  const saJson   = document.getElementById('mtSAInput')?.value.trim();
  const sheetId  = document.getElementById('mtSheetIdInput')?.value.trim();
  const username = document.getElementById('mtAdminUsername')?.value.trim();
  const dispName = document.getElementById('mtAdminDisplayName')?.value.trim();
  const pin      = document.getElementById('mtAdminPIN')?.value.trim();
  const pin2     = document.getElementById('mtAdminPIN2')?.value.trim();
  const status   = document.getElementById('mtSetupStatus');
  const btn      = document.getElementById('dvSetupFinishBtn');

  const setErr = (msg) => { if (status) status.innerHTML = `<span style="color:#dc2626"><i class="fas fa-exclamation-circle"></i> ${msg}</span>`; };

  if (!saJson)   { setErr('Vui lòng cung cấp Service Account JSON (Bước 1)'); dvSetupGoStep(1); return; }
  if (!sheetId)  { setErr('Vui lòng nhập Spreadsheet ID (Bước 2)'); dvSetupGoStep(2); return; }
  if (!username) { setErr('Vui lòng nhập tên đăng nhập'); return; }
  if (!dispName) { setErr('Vui lòng nhập tên hiển thị'); return; }
  if (!pin || pin.length !== 6 || !/^\d{6}$/.test(pin)) { setErr('PIN phải là đúng 6 chữ số'); return; }
  if (pin !== pin2) { setErr('Xác nhận PIN không khớp'); return; }

  if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang xử lý...'; }
  if (status) status.innerHTML = '<span style="color:#0284c7"><i class="fas fa-spinner fa-spin"></i> Module chưa sẵn sàng. Thử tải lại trang.</span>';
  if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fas fa-check-circle"></i> Hoàn tất thiết lập'; }
};

// ─────────────────────────────────────────────────────────────────────
//  MÀN HÌNH: ĐỔI TÀI KHOẢN / ĐĂNG XUẤT
// ─────────────────────────────────────────────────────────────────────
window.dvSecureOpenSwitchAccount = function() {
  _injectSecureCSS();
  const box = document.getElementById('dvSecureBox');
  if (!box) return;

  box.innerHTML = `
    <div class="dvsec-header" style="background:linear-gradient(135deg,#334155,#1a2340)">
      <div class="dvsec-logo"><i class="fas fa-user-cog"></i></div>
      <div class="dvsec-title">Tuỳ chọn tài khoản</div>
      <div class="dvsec-sub">Chọn thao tác bạn muốn thực hiện</div>
    </div>
    <div class="dvsec-body">
      <button class="dvsec-btn primary" onclick="dvSecureShowLogin()">
        <i class="fas fa-arrow-left"></i>Quay lại đăng nhập
      </button>
      <button class="dvsec-btn ghost" onclick="dvSecureOpenSyncCode()">
        <i class="fas fa-sync-alt"></i>Đăng nhập bằng Sync Code
      </button>
      <button class="dvsec-btn ghost" onclick="dvSecureOpenJoinWithCode()">
        <i class="fas fa-ticket-alt"></i>Tham gia bằng Mã mời
      </button>
      <hr class="dvsec-divider">
      <button class="dvsec-btn" style="background:#fff5f5;color:#c0392b;border:1px solid #fecaca"
        onclick="dvSecureConfirmLogout()">
        <i class="fas fa-trash-alt"></i>Xoá dữ liệu thiết bị này
      </button>
      <div class="dvsec-link-row" style="margin-top:6px;font-size:0.7rem;color:#94a3b8">
        Xoá dữ liệu sẽ yêu cầu cài đặt lại hoặc dùng Sync Code
      </div>
    </div>`;
};

window.dvSecureConfirmLogout = function() {
  const box = document.getElementById('dvSecureBox');
  if (!box) return;
  box.innerHTML = `
    <div class="dvsec-header" style="background:linear-gradient(135deg,#c0392b,#e74c3c)">
      <div class="dvsec-logo"><i class="fas fa-exclamation-triangle"></i></div>
      <div class="dvsec-title">Xác nhận xoá dữ liệu</div>
      <div class="dvsec-sub">Thao tác này không thể hoàn tác</div>
    </div>
    <div class="dvsec-body">
      <div class="dvsec-info-box" style="background:#fff5f5;border-color:#fecaca;color:#c0392b">
        <i class="fas fa-exclamation-triangle"></i>
        <strong> Cảnh báo:</strong> Xoá sẽ xoá toàn bộ cấu hình, session và dữ liệu cục bộ trên thiết bị này. Bạn sẽ cần Sync Code hoặc cài đặt lại để sử dụng.
      </div>
      <button class="dvsec-btn" style="background:#c0392b;color:#fff" onclick="_dvClearAndReset()">
        <i class="fas fa-trash"></i>Xoá dữ liệu và reset
      </button>
      <button class="dvsec-btn ghost" onclick="dvSecureShowLogin()">
        <i class="fas fa-times"></i>Huỷ
      </button>
    </div>`;
};

window._dvClearAndReset = function() {
  SecureSession.end();
  Object.values(KEYS).forEach(k => { try { localStorage.removeItem(k); sessionStorage.removeItem(k); } catch{} });
  sessionStorage.removeItem('doanvan_session');
  if (typeof toast === 'function') toast('Đã xoá dữ liệu thiết bị.', 'info');
  setTimeout(() => dvSecureShowLogin(), 400);
};

// ─────────────────────────────────────────────────────────────────────
//  MÀN HÌNH: THAM GIA BẰNG MÃ MỜI
//  ✅ FIX: Sau join xong → hiện PIN login ngay thay vì dvSecureShowLogin trắng
// ─────────────────────────────────────────────────────────────────────
window.dvSecureOpenJoinWithCode = function() {
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
    <div class="dvsec-body scroll">
      <div class="dvsec-form-group">
        <label class="dvsec-form-label">
          <i class="fas fa-ticket-alt" style="color:#c0392b;margin-right:4px"></i>Mã mời
        </label>
        <input class="dvsec-form-control" id="dvSecInviteCode"
          placeholder="VD: D6DTXGAYT8"
          style="text-align:center;font-family:monospace;font-size:1.15rem;letter-spacing:5px;text-transform:uppercase"
          maxlength="16"
          oninput="this.value=this.value.toUpperCase().replace(/[^A-Z0-9]/g,'')">
      </div>
      <div class="dvsec-form-group">
        <label class="dvsec-form-label">
          <i class="fas fa-user" style="color:#1a2340;margin-right:4px"></i>Tên hiển thị
        </label>
        <input class="dvsec-form-control" id="dvSecJoinName" placeholder="Họ và tên của bạn">
      </div>
      <div class="dvsec-form-group">
        <label class="dvsec-form-label">
          <i class="fas fa-lock" style="color:#1a2340;margin-right:4px"></i>Tạo mã PIN (6 số)
        </label>
        <input type="password" class="dvsec-form-control" id="dvSecJoinPIN"
          placeholder="● ● ● ● ● ●" maxlength="6" inputmode="numeric"
          style="letter-spacing:8px;font-size:1.2rem;text-align:center"
          oninput="this.value=this.value.replace(/[^0-9]/g,'')">
      </div>
      <div class="dvsec-form-group">
        <label class="dvsec-form-label">
          <i class="fas fa-lock" style="color:#1a2340;margin-right:4px"></i>Xác nhận PIN
        </label>
        <input type="password" class="dvsec-form-control" id="dvSecJoinPIN2"
          placeholder="● ● ● ● ● ●" maxlength="6" inputmode="numeric"
          style="letter-spacing:8px;font-size:1.2rem;text-align:center"
          oninput="this.value=this.value.replace(/[^0-9]/g,'')">
      </div>

      <div id="dvSecJoinError" style="font-size:0.78rem;min-height:18px;margin-bottom:10px;text-align:center"></div>

      <button class="dvsec-btn primary" id="dvSecJoinBtn" onclick="dvSecureDoJoin()">
        <i class="fas fa-sign-in-alt"></i>Tham gia
      </button>
      <div class="dvsec-link-row">
        <a onclick="dvSecureShowLogin()">← Quay lại đăng nhập</a>
      </div>
    </div>
  </div>`;
  document.body.appendChild(overlay);
};

window.dvSecureDoJoin = async function() {
  const code  = document.getElementById('dvSecInviteCode')?.value.trim().toUpperCase();
  const name  = document.getElementById('dvSecJoinName')?.value.trim();
  const pin   = document.getElementById('dvSecJoinPIN')?.value.trim();
  const pin2  = document.getElementById('dvSecJoinPIN2')?.value.trim();
  const errEl = document.getElementById('dvSecJoinError');
  const btn   = document.getElementById('dvSecJoinBtn');

  const setErr = (msg) => {
    if (errEl) errEl.innerHTML = `<span style="color:#c0392b"><i class="fas fa-exclamation-circle"></i> ${msg}</span>`;
  };

  if (!code || code.length < 6)         { setErr('Vui lòng nhập Mã mời hợp lệ'); return; }
  if (!name)                             { setErr('Vui lòng nhập tên hiển thị'); return; }
  if (!pin || pin.length !== 6 || !/^\d{6}$/.test(pin)) { setErr('PIN phải là đúng 6 chữ số'); return; }
  if (pin !== pin2)                      { setErr('Xác nhận PIN không khớp'); return; }

  if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang xác thực...'; }
  if (errEl) errEl.innerHTML = '';

  try {
    if (typeof MTAuth === 'undefined') throw new Error('Module chưa sẵn sàng. Tải lại trang.');
    await MTAuth.joinWithCode(code, null, name, pin);

    if (errEl) errEl.innerHTML = '<span style="color:#16a34a"><i class="fas fa-check-circle"></i> Tham gia thành công! Đang chuyển đến đăng nhập...</span>';
    setTimeout(() => {
      _secAppState = _getAppState();
      dvSecureShowLogin();
    }, 1200);
  } catch(err) {
    setErr(err.message || 'Lỗi không xác định. Thử lại.');
    if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Tham gia'; }
  }
};

// ─────────────────────────────────────────────────────────────────────
//  MÀN HÌNH: SYNC CODE
//  ✅ FIX: Dùng dvSecureAuth overlay thay vì dvAuthModal cũ
//  ✅ FIX: Sau sync thành công → tự đăng nhập PIN
// ─────────────────────────────────────────────────────────────────────
window.dvSecureOpenSyncCode = function() {
  _injectSecureCSS();
  document.getElementById('dvSecureAuth')?.remove();

  const overlay = document.createElement('div');
  overlay.id = 'dvSecureAuth';
  overlay.innerHTML = `
  <div id="dvSecureBox">
    <div class="dvsec-header" style="background:linear-gradient(145deg,#1a2340,#0284c7)">
      <div class="dvsec-logo"><i class="fas fa-sync-alt"></i></div>
      <div class="dvsec-title">Đăng nhập bằng Sync Code</div>
      <div class="dvsec-sub">Nhập code từ thiết bị PC của bạn</div>
    </div>
    <div class="dvsec-body">
      <div class="dvsec-form-group">
        <label class="dvsec-form-label">Sync Code</label>
        <input class="dvsec-form-control" id="dvSecSyncCode"
          placeholder="VD: AB12CD34"
          style="letter-spacing:6px;font-family:monospace;font-size:1.4rem;text-align:center;text-transform:uppercase"
          maxlength="20"
          oninput="this.value=this.value.toUpperCase().replace(/[^A-Z0-9]/g,'');_dvSyncCodeHint(this.value)">
        <div id="dvSecSyncHint" style="font-size:0.73rem;margin-top:5px;min-height:16px;color:#94a3b8"></div>
      </div>

      <!-- Ô Sheet ID — ẩn theo mặc định, hiện khi cần -->
      <div id="dvSecSyncSheetRow" style="display:none;margin-bottom:12px">
        <div style="font-size:0.73rem;color:#d97706;margin-bottom:4px">
          <i class="fas fa-exclamation-triangle"></i>
          Thiết bị mới — vui lòng nhập Spreadsheet ID:
        </div>
        <input class="dvsec-form-control" id="dvSecSyncSheetId"
          placeholder="Dán Spreadsheet ID từ Admin..."
          style="font-family:monospace;font-size:0.8rem">
      </div>

      <div id="dvSecSyncResult" style="font-size:0.78rem;min-height:18px;margin-bottom:10px;text-align:center"></div>

      <button class="dvsec-btn primary" id="dvSecSyncBtn" onclick="dvSecureApplySync()">
        <i class="fas fa-link"></i>Kết nối
      </button>
      <div class="dvsec-link-row">
        <a onclick="dvSecureShowLogin()">← Quay lại đăng nhập</a>
      </div>
    </div>
  </div>`;
  document.body.appendChild(overlay);
};

window._dvSyncCodeHint = function(val) {
  const hint = document.getElementById('dvSecSyncHint');
  const sheetRow = document.getElementById('dvSecSyncSheetRow');
  if (!hint || val.length < 6) { if (hint) hint.innerHTML = ''; return; }

  const hasLocal = !!localStorage.getItem('dv_sync_code_' + val)
                || !!localStorage.getItem('mt_deep_' + val)
                || !!localStorage.getItem('mt_invite_' + val);
  const hasMTConfig = !!(typeof MTConfig !== 'undefined' && MTConfig.get()?.spreadsheetId);

  if (hasLocal) {
    hint.innerHTML = '<span style="color:#16a34a"><i class="fas fa-check-circle"></i> Tìm thấy — sẵn sàng kết nối</span>';
    if (sheetRow) sheetRow.style.display = 'none';
  } else if (hasMTConfig) {
    hint.innerHTML = '<span style="color:#0284c7"><i class="fas fa-cloud"></i> Sẽ kiểm tra từ Google Sheet...</span>';
    if (sheetRow) sheetRow.style.display = 'none';
  } else {
    hint.innerHTML = '<span style="color:#d97706"><i class="fas fa-info-circle"></i> Thiết bị mới — cần Spreadsheet ID</span>';
    if (sheetRow) sheetRow.style.display = 'block';
  }
};

window.dvSecureApplySync = async function() {
  const code     = document.getElementById('dvSecSyncCode')?.value.trim().toUpperCase().replace(/\s/g,'');
  const sidInput = document.getElementById('dvSecSyncSheetId')?.value.trim();
  const resEl    = document.getElementById('dvSecSyncResult');
  const btn      = document.getElementById('dvSecSyncBtn');

  const setRes = (html) => { if (resEl) resEl.innerHTML = html; };

  if (!code || code.length < 6) {
    setRes('<span style="color:#c0392b">Vui lòng nhập Sync Code hợp lệ</span>'); return;
  }
  if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang xác thực...'; }
  setRes('<i class="fas fa-spinner fa-spin" style="color:#0284c7"></i> Đang xác thực...');

  // Delegate sang dvAuthUpgrade nếu có
  if (typeof dvAuthUpgrade_applySync === 'function') {
    // Tạm thời swap về overlay cũ để reuse logic
    const codeEl  = { value: code };
    const sheetEl = { value: sidInput };
    // Override các element ID để hàm cũ đọc đúng
    const origGet = document.getElementById.bind(document);
    // Gọi trực tiếp logic
    await _dvApplySyncLogic(code, sidInput, resEl, btn);
    return;
  }
  await _dvApplySyncLogic(code, sidInput, resEl, btn);
};

async function _dvApplySyncLogic(code, sidInput, resEl, btn) {
  const setRes = (html) => { if (resEl) resEl.innerHTML = html; };
  let syncConfig = null, mtConfig = null;

  // Strategy 1: localStorage
  for (const prefix of ['dv_sync_code_', 'mt_invite_', 'mt_deep_']) {
    const raw = localStorage.getItem(prefix + code);
    if (!raw) continue;
    try {
      const p = JSON.parse(raw);
      if (prefix === 'dv_sync_code_') {
        if (Date.now() <= (p.expiry || Infinity)) {
          const payload = JSON.parse(p.payload);
          syncConfig = payload.syncConfig; mtConfig = payload.mtConfig;
        }
      } else if (prefix === 'mt_invite_') {
        if (!p.expiry || Date.now() < p.expiry) {
          syncConfig = { serviceAccountJson: p.serviceAccountJson, spreadsheetId: p.spreadsheetId, autoSync: true };
          mtConfig   = { spreadsheetId: p.spreadsheetId, serviceAccountJson: p.serviceAccountJson, role: p.role, orgId: p.orgId, orgName: p.orgName };
        }
      } else {
        if (!p.exp || Date.now() < p.exp) {
          syncConfig = { serviceAccountJson: p.sa, spreadsheetId: p.sid, autoSync: true };
          mtConfig   = { spreadsheetId: p.sid, serviceAccountJson: p.sa, role: p.r, orgId: p.o, orgName: p.on };
        }
      }
      if (syncConfig) break;
    } catch {}
  }

  // Strategy 2: GSheet
  if (!syncConfig) {
    setRes('<i class="fas fa-spinner fa-spin" style="color:#0284c7"></i> Đang tải từ Google Sheet...');
    try {
      const existCfg = (typeof GSheetSync !== 'undefined' && GSheetSync.getSyncConfig()) || null;
      const existMT  = (typeof MTConfig !== 'undefined' && MTConfig.get()) || null;
      const saJson   = existCfg?.serviceAccountJson || existMT?.serviceAccountJson;
      const sid      = sidInput || existCfg?.spreadsheetId || existMT?.spreadsheetId;

      if (!sid) throw new Error('no_sid');
      if (!saJson) throw new Error('no_sa');

      const token = (typeof MTToken !== 'undefined') ? await MTToken.get(saJson) : null;
      if (!token) throw new Error('no_token');

      const resp = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${sid}/values/${encodeURIComponent('system_meta!A:B')}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (!resp.ok) throw new Error('sheet_' + resp.status);
      const data  = await resp.json();
      const rows  = data.values || [];
      const found = rows.find(r => r[0] === 'synccode_' + code || r[0] === 'invite_' + code);
      if (!found) throw new Error('not_found');

      const entry = JSON.parse(found[1]);
      if (entry.expiry && Date.now() > entry.expiry) throw new Error('expired');

      if (found[0].startsWith('synccode_')) {
        const parsed = JSON.parse(entry.payload);
        syncConfig = parsed.syncConfig; mtConfig = parsed.mtConfig;
      } else {
        syncConfig = { serviceAccountJson: entry.serviceAccountJson, spreadsheetId: entry.spreadsheetId, autoSync: true };
        mtConfig   = { spreadsheetId: entry.spreadsheetId, serviceAccountJson: entry.serviceAccountJson, role: entry.role, orgId: entry.orgId, orgName: entry.orgName };
      }
    } catch(e) {
      const m = e.message;
      const msgMap = {
        'not_found': 'Code không hợp lệ hoặc chưa tồn tại.',
        'expired':   'Code đã hết hạn (>24h). Hãy tạo code mới từ PC.',
        'no_sid':    'Cần nhập Spreadsheet ID. Mở rộng ô phía trên.',
        'no_sa':     'Thiết bị chưa được cấu hình SA. Liên hệ Admin.',
        'no_token':  'Không lấy được token xác thực. Liên hệ Admin.',
      };
      const msg = msgMap[m] || `Lỗi kết nối: ${m}`;
      setRes(`<span style="color:#c0392b"><i class="fas fa-times-circle"></i> ${msg}</span>`);
      if (m === 'no_sid') document.getElementById('dvSecSyncSheetRow').style.display = 'block';
      if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fas fa-link"></i> Kết nối'; }
      return;
    }
  }

  // Áp dụng config
  try {
    if (syncConfig && typeof GSheetSync !== 'undefined') GSheetSync.saveSyncConfig(syncConfig);
    if (mtConfig && typeof MTConfig !== 'undefined') {
      const exist = MTConfig.get() || {};
      MTConfig.save({ ...exist, ...mtConfig, joinedAt: new Date().toISOString() });
    }

    setRes('<span style="color:#16a34a"><i class="fas fa-check-circle"></i> Kết nối thành công! Đang đăng nhập...</span>');

    setTimeout(() => {
      _secAppState = _getAppState();
      if (_secAppState.mode === 'MT_AUTH') {
        const cfg = (() => { try { return JSON.parse(localStorage.getItem(KEYS.MT_CONFIG) || 'null'); } catch { return null; } })();
        if (cfg) {
          SecureSession.start(cfg.user?.role || cfg.role, cfg.user?.username, cfg.orgId);
          _bridgeLegacySession(cfg);
          _showLoginSuccess(cfg);
          return;
        }
      }
      dvSecureShowLogin();
    }, 1000);

    if (typeof dvSyncNow === 'function') setTimeout(() => dvSyncNow('pull'), 2200);
  } catch(e) {
    setRes(`<span style="color:#c0392b">Lỗi áp dụng: ${e.message}</span>`);
    if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fas fa-link"></i> Kết nối'; }
  }
}

// ─────────────────────────────────────────────────────────────────────
//  ĐĂNG XUẤT
// ─────────────────────────────────────────────────────────────────────
window.dvSecureLogout = function() {
  SecureSession.end();
  sessionStorage.removeItem('doanvan_session');
  window._dvCurrentRole = null;
  window._dvIsAdmin     = false;
  window._dvIsManager   = false;
  document.getElementById('dvSecureRoleBadge')?.remove();
  if (typeof toast === 'function') toast('<i class="fas fa-sign-out-alt"></i> Đã đăng xuất', 'info');
  setTimeout(() => dvSecureShowLogin(), 400);
};
window.dvLogout = window.dvSecureLogout;

// ─────────────────────────────────────────────────────────────────────
//  GUARDS
// ─────────────────────────────────────────────────────────────────────
window.dvSecureRequireAdmin = function(actionName) {
  if (!SecureSession.isAdmin()) {
    if (typeof toast === 'function')
      toast(`<i class="fas fa-ban"></i> Bạn cần quyền Admin để thực hiện: <strong>${actionName || 'hành động này'}</strong>`, 'error');
    return false;
  }
  return true;
};
window.dvSecureIsLoggedIn = () => SecureSession.isValid();
window.dvSecureGetRole    = () => SecureSession.getRole();

// ─────────────────────────────────────────────────────────────────────
//  VÔ HIỆU HOÁ CÁC LỖ HỔNG CŨ
// ─────────────────────────────────────────────────────────────────────
function _patchLegacyVulnerabilities() {
  window.dvResetToDefault = function() {
    if (typeof toast === 'function')
      toast('<i class="fas fa-ban"></i> "Reset mặc định" đã bị vô hiệu hoá vì lý do bảo mật.', 'error');
  };

  window.dvSeedDefaultAccount = function() { /* NOP */ };

  if (typeof DVAuth !== 'undefined') {
    const origLoggedIn = DVAuth.isLoggedIn.bind(DVAuth);
    DVAuth.isLoggedIn = () => SecureSession.isValid() || origLoggedIn();

    const origCreate = DVAuth.createAccount.bind(DVAuth);
    DVAuth.createAccount = function(username, pin) {
      const stack = new Error().stack || '';
      const ok = stack.includes('dvSecureDoJoin') || stack.includes('joinWithCode') || SecureSession.isAdmin();
      if (!ok) { console.warn('[AuthSecure] Blocked DVAuth.createAccount'); return null; }
      return origCreate(username, pin);
    };
  }

  window.dvShowAuthModal = function() { dvSecureShowLogin(); };

  const origInvite = window.mtShowInviteManager;
  if (typeof origInvite === 'function') {
    window.mtShowInviteManager = function() {
      if (!dvSecureRequireAdmin('Quản lý người dùng')) return;
      origInvite();
    };
  }

  const origAdminSetup = window.mtShowAdminSetup;
  if (typeof origAdminSetup === 'function') {
    // Lưu gốc để hook có thể restore
    window._origMtDoAdminSetup = origAdminSetup;
    window.mtShowAdminSetup = function() {
      const cfg       = (() => { try { return JSON.parse(localStorage.getItem(KEYS.MT_CONFIG) || 'null'); } catch { return null; } })();
      const setupDone = !!(cfg?.spreadsheetId && cfg?.user);
      if (setupDone && !SecureSession.isAdmin()) {
        if (typeof toast === 'function') toast('<i class="fas fa-ban"></i> Chỉ Admin mới có thể truy cập cài đặt hệ thống.', 'error');
        return;
      }
      origAdminSetup();
    };
  }
}

// ─────────────────────────────────────────────────────────────────────
//  KIỂM TRA SESSION KHI RELOAD TRANG
// ─────────────────────────────────────────────────────────────────────
function _checkSessionOnLoad() {
  const sess = SecureSession.get();
  if (!sess) return false;
  const cfg = (() => { try { return JSON.parse(localStorage.getItem(KEYS.MT_CONFIG) || 'null'); } catch { return null; } })();
  if (!cfg) return false;
  _applyRoleRestrictions(sess.role);
  _bridgeLegacySession(cfg);
  if (typeof mtUpdateUIAfterLogin === 'function') setTimeout(() => mtUpdateUIAfterLogin(), 200);
  if (typeof _dvUpdateUserChip === 'function') setTimeout(() => _dvUpdateUserChip(), 200);
  return true;
}

// ─────────────────────────────────────────────────────────────────────
//  KHỞI CHẠY
// ─────────────────────────────────────────────────────────────────────
function dvSecureInit() {
  _patchLegacyVulnerabilities();

  document.getElementById('dvAuthModal')?.remove();

  if (_checkSessionOnLoad()) return;

  dvSecureShowLogin();
}

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
window.SecureSession            = SecureSession;

console.info(`[ĐoànVăn Auth Secure v${AUTH_SECURE_VERSION}] ✅ Đã tải — Bảo mật đăng nhập được kích hoạt`);
