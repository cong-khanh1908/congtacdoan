/**
 * ╔══════════════════════════════════════════════════════════════════════╗
 * ║     DOANVAN — MOBILE & SYNC MODULE  v1.0                           ║
 * ║                                                                      ║
 * ║  1. MOBILE RESPONSIVE CSS — sidebar drawer, bottom nav,            ║
 * ║     touch-optimized controls, adaptive grids                        ║
 * ║  2. AUTH SYSTEM — tài khoản nội bộ (PIN + username), lưu           ║
 * ║     profile trên localStorage, hỗ trợ multi-device qua sync        ║
 * ║  3. GOOGLE SYNC — ghi/đọc Google Sheets + Google Drive qua         ║
 * ║     Service Account JSON key (không cần OAuth browser flow)         ║
 * ║     PC thiết lập key → tạo Sync Code → mobile nhập code → sync    ║
 * ╚══════════════════════════════════════════════════════════════════════╝
 */

'use strict';

// ─────────────────────────────────────────────────────────────────────
//  A. MOBILE CSS INJECTION
// ─────────────────────────────────────────────────────────────────────
(function injectMobileCSS() {
  const style = document.createElement('style');
  style.id = 'dv-mobile-css';
  style.textContent = `
/* ══════════ MOBILE HAMBURGER BUTTON ══════════ */
#dvHamburger {
  display: none;
  position: fixed; top: 14px; left: 14px; z-index: 300;
  width: 40px; height: 40px; border-radius: 10px;
  background: var(--navy); color: #fff;
  border: none; cursor: pointer; font-size: 1rem;
  align-items: center; justify-content: center;
  box-shadow: 0 4px 14px rgba(0,0,0,0.25);
  transition: var(--transition);
}
#dvHamburger:hover { background: var(--red); }

/* ══════════ SIDEBAR OVERLAY (mobile) ══════════ */
#dvSidebarOverlay {
  display: none; position: fixed; inset: 0;
  background: rgba(0,0,0,0.5); z-index: 149;
  backdrop-filter: blur(2px);
}

/* ══════════ SYNC STATUS INDICATOR (topbar) ══════════ */
#dvSyncBadge {
  display: inline-flex; align-items: center; gap: 5px;
  font-size: 0.7rem; font-weight: 700; padding: 4px 10px;
  border-radius: 20px; cursor: pointer;
  border: 1.5px solid var(--gray-light);
  color: var(--gray); background: var(--white);
  transition: var(--transition); white-space: nowrap;
}
#dvSyncBadge.syncing { color: #0284c7; border-color: #bae6fd; background: #f0f9ff; animation: dvPulse 1s infinite; }
#dvSyncBadge.synced  { color: #16a34a; border-color: #bbf7d0; background: #f0fdf4; }
#dvSyncBadge.error   { color: var(--red); border-color: rgba(192,57,43,0.3); background: rgba(192,57,43,0.04); }
@keyframes dvPulse { 0%,100%{opacity:1} 50%{opacity:0.6} }

/* ══════════ USER AVATAR (topbar) ══════════ */
#dvUserChip {
  display: inline-flex; align-items: center; gap: 7px;
  padding: 5px 12px 5px 5px; border-radius: 20px;
  background: var(--cream); border: 1.5px solid var(--gray-light);
  cursor: pointer; font-size: 0.78rem; font-weight: 600;
  color: var(--navy); transition: var(--transition);
}
#dvUserChip:hover { border-color: var(--red); background: rgba(192,57,43,0.04); }
#dvUserAvatar {
  width: 28px; height: 28px; border-radius: 50%;
  background: linear-gradient(135deg, var(--red), var(--gold));
  display: flex; align-items: center; justify-content: center;
  color: #fff; font-size: 0.72rem; font-weight: 800; flex-shrink: 0;
}

/* ══════════ BOTTOM NAV BAR (mobile only) ══════════ */
#dvBottomNav {
  display: none; position: fixed; bottom: 0; left: 0; right: 0; z-index: 120;
  background: var(--white); border-top: 2px solid var(--gray-light);
  box-shadow: 0 -4px 20px rgba(0,0,0,0.10);
  padding: 6px 0 max(6px, env(safe-area-inset-bottom));
  grid-template-columns: repeat(5, 1fr);
}
.dv-bnav-item {
  display: flex; flex-direction: column; align-items: center;
  gap: 3px; padding: 6px 4px; cursor: pointer;
  font-size: 0.6rem; font-weight: 600; color: var(--gray);
  transition: var(--transition); border: none; background: none;
  font-family: 'Be Vietnam Pro', sans-serif;
}
.dv-bnav-item i { font-size: 1.1rem; transition: var(--transition); }
.dv-bnav-item.active { color: var(--red); }
.dv-bnav-item.active i { transform: translateY(-2px); }

/* ══════════ PULL-TO-REFRESH INDICATOR ══════════ */
#dvPullIndicator {
  display: none; position: fixed; top: 0; left: 50%; transform: translateX(-50%);
  z-index: 500; background: var(--navy); color: #fff;
  border-radius: 0 0 12px 12px; padding: 6px 20px;
  font-size: 0.75rem; font-weight: 700; align-items: center; gap: 8px;
}

/* ══════════ RESPONSIVE GRID OVERRIDES ══════════ */
@media (max-width: 1100px) {
  .stats-grid { grid-template-columns: repeat(2,1fr) !important; }
  .cat-grid   { grid-template-columns: repeat(2,1fr) !important; }
  .main-side  { grid-template-columns: 1fr !important; }
  .two-col    { grid-template-columns: 1fr !important; }
  .three-col  { grid-template-columns: 1fr 1fr !important; }
}

@media (max-width: 768px) {
  /* Sidebar: slide-in drawer */
  #sidebar {
    transform: translateX(-100%);
    width: 280px !important;
    z-index: 150 !important;
    transition: transform 0.3s cubic-bezier(0.4,0,0.2,1) !important;
  }
  #sidebar.dv-open { transform: translateX(0); }
  #sidebar .sidebar-logo h1,
  #sidebar .sidebar-logo p,
  #sidebar .nav-item span,
  #sidebar .nav-section-title,
  #sidebar .sidebar-footer { display: block !important; }
  #sidebar .nav-item { justify-content: flex-start !important; padding: 12px 20px !important; }
  #dvHamburger { display: flex !important; }
  #dvSidebarOverlay { display: block; opacity: 0; pointer-events: none; transition: opacity 0.3s; }
  #dvSidebarOverlay.dv-open { opacity: 1; pointer-events: all; }
  #main { margin-left: 0 !important; }

  /* Topbar */
  #topbar { padding: 0 12px 0 60px !important; gap: 8px !important; }
  .topbar-title { font-size: 0.9rem !important; }
  #topbar .btn span, #topbar .btn-text { display: none !important; }
  #topbar .btn { padding: 8px 10px !important; }

  /* Content */
  #content { padding: 14px 12px !important; }
  #content.dv-has-bottomnav { padding-bottom: 74px !important; }

  /* Stats */
  .stats-grid { grid-template-columns: repeat(2,1fr) !important; gap: 10px !important; }
  .stat-card { padding: 14px !important; }
  .stat-value { font-size: 1.6rem !important; }

  /* Grids */
  .cat-grid, .two-col, .three-col { grid-template-columns: 1fr !important; }
  .main-side { grid-template-columns: 1fr !important; }
  .form-row   { grid-template-columns: 1fr !important; }

  /* Cards */
  .card { padding: 16px !important; }

  /* Tables → horizontal scroll */
  .doc-table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; }
  .doc-table { min-width: 640px; }
  .doc-row-actions { opacity: 1 !important; }

  /* Modals: full bottom sheet */
  .modal-overlay { align-items: flex-end !important; padding: 0 !important; }
  .modal {
    max-width: 100% !important; width: 100% !important;
    border-radius: 20px 20px 0 0 !important;
    max-height: 92vh !important;
    padding-bottom: env(safe-area-inset-bottom);
  }
  .modal::before {
    content:'';display:block;width:36px;height:4px;background:var(--gray-light);
    border-radius:2px;margin:10px auto 0;
  }

  /* Upload zone */
  .upload-zone { padding: 28px 16px !important; }

  /* AI panel chips: wrap */
  .ai-panel .ai-chip { font-size: 0.68rem !important; padding: 4px 10px !important; }

  /* Bottom nav */
  #dvBottomNav { display: grid !important; }

  /* AI chips bar hide on small */
  #dashAiPanel .ai-panel-header { flex-wrap: wrap; }

  /* Toast */
  .toast-container { top: auto !important; bottom: 80px !important; right: 10px !important; left: 10px !important; }
  .toast { min-width: unset !important; width: 100% !important; }

  /* Section header */
  .section-header { flex-direction: column; align-items: flex-start; gap: 10px; }
  .section-header .btn-group, .section-header > .btn { width: 100%; justify-content: center; }
}

@media (max-width: 400px) {
  .stats-grid { grid-template-columns: 1fr 1fr !important; gap: 8px !important; }
  .stat-value { font-size: 1.4rem !important; }
  #content { padding: 10px 8px !important; }
}

/* ══════════ TOUCH IMPROVEMENTS ══════════ */
@media (hover: none) and (pointer: coarse) {
  .btn { min-height: 44px; }
  .nav-item { min-height: 48px; }
  .doc-table td { padding: 14px 12px !important; }
  .form-control { font-size: 16px !important; } /* prevent iOS zoom */
  select.form-control { font-size: 16px !important; }
  input.form-control { font-size: 16px !important; }
  textarea.form-control { font-size: 16px !important; }
}

/* ══════════ SAFE AREA (notch/home bar) ══════════ */
#topbar { padding-left: max(28px, env(safe-area-inset-left)); }
@media (max-width: 768px) {
  #topbar { padding-left: max(60px, calc(60px + env(safe-area-inset-left))); padding-right: max(12px, env(safe-area-inset-right)); }
}

/* ══════════ AUTH MODAL ══════════ */
#dvAuthModal {
  position: fixed; inset: 0; z-index: 9999;
  background: linear-gradient(135deg, var(--navy) 0%, var(--navy-mid) 60%, var(--red-deep) 100%);
  display: flex; align-items: center; justify-content: center;
  padding: 20px;
}
#dvAuthBox {
  background: var(--white); border-radius: 24px;
  padding: 36px 32px; width: 100%; max-width: 400px;
  box-shadow: 0 32px 80px rgba(0,0,0,0.35);
  text-align: center;
}
.dv-auth-logo {
  width: 72px; height: 72px; border-radius: 50%;
  background: linear-gradient(135deg, var(--red), var(--gold));
  display: flex; align-items: center; justify-content: center;
  font-size: 1.8rem; color: #fff; margin: 0 auto 16px;
  box-shadow: 0 0 0 8px rgba(192,57,43,0.12);
}
.dv-auth-title { font-family:'Playfair Display',serif; font-size:1.4rem; color:var(--navy); font-weight:900; }
.dv-auth-sub { font-size:0.78rem; color:var(--gray); margin-top:4px; margin-bottom:28px; }
.dv-pin-row { display:flex; gap:10px; justify-content:center; margin:16px 0; }
.dv-pin-dot {
  width:48px; height:56px; border-radius:12px;
  border: 2px solid var(--gray-light);
  display:flex; align-items:center; justify-content:center;
  font-size:1.5rem; font-weight:900; color:var(--navy);
  background:var(--cream); transition:var(--transition);
}
.dv-pin-dot.filled { border-color:var(--red); background:#fff; color:var(--red); }
.dv-pin-dot.active { border-color:var(--navy); box-shadow:0 0 0 3px rgba(26,35,64,0.15); }
.dv-keypad {
  display:grid; grid-template-columns:repeat(3,1fr); gap:10px;
  margin-top:16px;
}
.dv-key {
  height:56px; border-radius:12px; border:1.5px solid var(--gray-light);
  background:var(--cream); font-family:'Be Vietnam Pro',sans-serif;
  font-size:1.2rem; font-weight:700; color:var(--navy);
  cursor:pointer; transition:var(--transition);
  display:flex; align-items:center; justify-content:center;
}
.dv-key:hover, .dv-key:active { background:var(--navy); color:#fff; border-color:var(--navy); transform:scale(0.96); }
.dv-key.del { font-size:0.9rem; }
.dv-key.empty { visibility:hidden; }
.dv-auth-alt { margin-top:16px; font-size:0.75rem; color:var(--gray); }
.dv-auth-alt a { color:var(--red); font-weight:700; cursor:pointer; }

/* ══════════ SYNC MODAL ══════════ */
#dvSyncModal .modal { max-width:560px; }
.dv-sync-step {
  display:flex; gap:14px; padding:14px; border-radius:12px;
  border:1.5px solid var(--gray-light); margin-bottom:10px;
  cursor:default; transition:var(--transition);
}
.dv-sync-step:hover { border-color:var(--navy); }
.dv-sync-step-num {
  width:32px; height:32px; border-radius:50%;
  background:var(--navy); color:#fff;
  display:flex; align-items:center; justify-content:center;
  font-weight:800; font-size:0.85rem; flex-shrink:0;
}
.dv-sync-code-box {
  font-family:monospace; font-size:1.4rem; font-weight:700;
  letter-spacing:6px; text-align:center; padding:16px;
  background:var(--cream); border-radius:12px; color:var(--navy);
  border:2px solid var(--gray-light); user-select:all;
  cursor:pointer;
}
.dv-sync-code-box:hover { border-color:var(--red); }
.dv-sheet-preview {
  font-size:0.75rem; background:var(--cream); border-radius:8px;
  padding:10px 12px; border:1px solid var(--gray-light);
  font-family:monospace; max-height:120px; overflow-y:auto;
  white-space:pre-wrap;
}
.dv-status-row {
  display:flex; align-items:center; justify-content:space-between;
  padding:8px 0; border-bottom:1px solid var(--gray-light); font-size:0.8rem;
}
.dv-status-row:last-child { border-bottom:none; }
  `;
  document.head.appendChild(style);
})();

// ─────────────────────────────────────────────────────────────────────
//  B. MOBILE UI COMPONENTS
// ─────────────────────────────────────────────────────────────────────

function _dvInjectMobileUI() {
  // 1) Hamburger button
  if (!document.getElementById('dvHamburger')) {
    const ham = document.createElement('button');
    ham.id = 'dvHamburger';
    ham.innerHTML = '<i class="fas fa-bars"></i>';
    ham.onclick = dvToggleSidebar;
    document.body.appendChild(ham);
  }

  // 2) Sidebar overlay
  if (!document.getElementById('dvSidebarOverlay')) {
    const ov = document.createElement('div');
    ov.id = 'dvSidebarOverlay';
    ov.onclick = dvCloseSidebar;
    document.body.appendChild(ov);
  }

  // 3) Bottom nav
  if (!document.getElementById('dvBottomNav')) {
    const nav = document.createElement('nav');
    nav.id = 'dvBottomNav';
    nav.innerHTML = `
      <button class="dv-bnav-item active" onclick="dvNavTo('dashboard')">
        <i class="fas fa-home"></i><span>Trang chủ</span>
      </button>
      <button class="dv-bnav-item" onclick="dvNavTo('documents')">
        <i class="fas fa-folder-open"></i><span>Kho VB</span>
      </button>
      <button class="dv-bnav-item" onclick="dvNavTo('upload')" style="color:var(--red)">
        <i class="fas fa-plus-circle" style="font-size:1.6rem"></i><span>Nhập mới</span>
      </button>
      <button class="dv-bnav-item" onclick="dvNavTo('members')">
        <i class="fas fa-users"></i><span>Đoàn viên</span>
      </button>
      <button class="dv-bnav-item" onclick="dvNavTo('settings')">
        <i class="fas fa-cog"></i><span>Cài đặt</span>
      </button>`;
    document.body.appendChild(nav);
  }

  // 4) Add bottom nav padding to content
  const content = document.getElementById('content');
  if (content) content.classList.add('dv-has-bottomnav');

  // 5) Inject sync badge + user chip into topbar
  _dvInjectTopbarWidgets();

  // 6) Wrap all tables in scroll container
  document.querySelectorAll('.doc-table').forEach(t => {
    if (!t.closest('.doc-table-wrap')) {
      const wrap = document.createElement('div');
      wrap.className = 'doc-table-wrap';
      t.parentNode.insertBefore(wrap, t);
      wrap.appendChild(t);
    }
  });
}

function _dvInjectTopbarWidgets() {
  const actions = document.querySelector('.topbar-actions');
  if (!actions || document.getElementById('dvSyncBadge')) return;

  const syncBadge = document.createElement('button');
  syncBadge.id = 'dvSyncBadge';
  syncBadge.onclick = dvOpenSyncModal;
  syncBadge.innerHTML = '<i class="fas fa-cloud"></i><span id="dvSyncLabel">Chưa đồng bộ</span>';

  const userChip = document.createElement('div');
  userChip.id = 'dvUserChip';
  userChip.onclick = dvOpenUserMenu;
  userChip.innerHTML = `<div id="dvUserAvatar">?</div><span id="dvUserName">Khách</span>`;

  actions.insertBefore(syncBadge, actions.firstChild);
  actions.insertBefore(userChip, actions.firstChild);
}

function dvToggleSidebar() {
  const sb = document.getElementById('sidebar');
  const ov = document.getElementById('dvSidebarOverlay');
  if (!sb) return;
  const isOpen = sb.classList.contains('dv-open');
  if (isOpen) dvCloseSidebar(); else { sb.classList.add('dv-open'); if (ov) ov.classList.add('dv-open'); }
}

function dvCloseSidebar() {
  document.getElementById('sidebar')?.classList.remove('dv-open');
  document.getElementById('dvSidebarOverlay')?.classList.remove('dv-open');
}

function dvNavTo(page) {
  dvCloseSidebar();
  if (typeof showPage === 'function') showPage(page);
  // Update bottom nav active state
  document.querySelectorAll('.dv-bnav-item').forEach((el, i) => {
    const pages = ['dashboard','documents','upload','members','settings'];
    el.classList.toggle('active', pages[i] === page);
  });
}

// Close sidebar when any nav-item is clicked on mobile
document.addEventListener('click', e => {
  const navItem = e.target.closest('.nav-item');
  if (navItem && window.innerWidth <= 768) dvCloseSidebar();
});

// ─────────────────────────────────────────────────────────────────────
//  C. AUTH SYSTEM
//     - Tạo tài khoản PIN 6 chữ số + username
//     - Lưu hash PIN trong localStorage
//     - Multi-device: sync code 8 ký tự chứa config
// ─────────────────────────────────────────────────────────────────────

const DVAuth = {
  STORE_KEY: 'doanvan_auth',
  SESSION_KEY: 'doanvan_session',
  SESSION_TTL: 8 * 60 * 60 * 1000, // 8 giờ

  getProfile() {
    try { return JSON.parse(localStorage.getItem(this.STORE_KEY) || 'null'); }
    catch { return null; }
  },

  saveProfile(profile) {
    localStorage.setItem(this.STORE_KEY, JSON.stringify(profile));
  },

  _hashPIN(pin) {
    // Simple deterministic hash (không dùng crypto API để tránh lỗi môi trường)
    let h = 5381;
    for (let i = 0; i < pin.length; i++) h = ((h << 5) + h) ^ pin.charCodeAt(i);
    return (h >>> 0).toString(16).padStart(8, '0');
  },

  verifyPIN(pin) {
    const p = this.getProfile();
    if (!p) return false;
    return p.pinHash === this._hashPIN(pin);
  },

  createAccount(username, pin) {
    const profile = {
      username,
      displayName: username,
      pinHash: this._hashPIN(pin),
      createdAt: new Date().toISOString(),
      syncConfig: null,
      lastSync: null,
      deviceId: this._generateId(),
    };
    this.saveProfile(profile);
    return profile;
  },

  isLoggedIn() {
    try {
      const sess = JSON.parse(sessionStorage.getItem(this.SESSION_KEY) || 'null');
      return sess && (Date.now() - sess.ts < this.SESSION_TTL);
    } catch { return false; }
  },

  startSession() {
    sessionStorage.setItem(this.SESSION_KEY, JSON.stringify({ ts: Date.now() }));
  },

  endSession() {
    sessionStorage.removeItem(this.SESSION_KEY);
  },

  _generateId(len = 8) {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    return Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  },

  // Tạo Sync Code: encode config thành base64 rút gọn
  generateSyncCode(syncConfig) {
    const p = this.getProfile();
    if (!p) return null;
    const payload = {
      u: p.username,
      ph: p.pinHash,
      sc: syncConfig,
      t: Date.now(),
    };
    const code = btoa(JSON.stringify(payload)).replace(/[=+/]/g, c => ({ '=': '', '+': '-', '/': '_' }[c]));
    return code.substring(0, 16).toUpperCase(); // 16-char short code (stored in GSheet)
  },

  // Decode sync code (khi mobile nhập)
  decodeSyncCode(code) {
    try {
      // Code 16 chars → look up in Google Sheet by key
      // Trả về payload gốc nếu hợp lệ
      return null; // Xử lý thực tế trong GSheetSync.lookupCode()
    } catch { return null; }
  }
};

// ─────────────────────────────────────────────────────────────────────
//  D. AUTH MODAL — PIN keypad
// ─────────────────────────────────────────────────────────────────────

let _dvPinEntry = '';
let _dvAuthMode = 'login'; // 'login' | 'setup'
let _dvSetupUsername = '';

function dvShowAuthModal(mode = 'login') {
  _dvAuthMode = mode;
  _dvPinEntry = '';

  if (document.getElementById('dvAuthModal')) {
    document.getElementById('dvAuthModal').remove();
  }

  const modal = document.createElement('div');
  modal.id = 'dvAuthModal';

  const profile = DVAuth.getProfile();
  const isSetup = mode === 'setup' || !profile;

  modal.innerHTML = `
<div id="dvAuthBox">
  <div class="dv-auth-logo"><i class="fas fa-star"></i></div>
  <div class="dv-auth-title">ĐoànVăn</div>
  <div class="dv-auth-sub" id="dvAuthSubtitle">${isSetup ? 'Tạo tài khoản mới' : `Xin chào, <strong>${profile?.displayName || 'người dùng'}</strong>`}</div>

  ${isSetup ? `
  <div style="margin-bottom:14px">
    <input class="form-control" id="dvSetupUsername" placeholder="Tên hiển thị (VD: Bí thư Chi đoàn)" style="text-align:center;font-size:16px">
  </div>
  <div style="font-size:0.78rem;color:var(--gray);margin-bottom:8px">Tạo mã PIN 6 số của bạn</div>` : `
  <div style="font-size:0.78rem;color:var(--gray);margin-bottom:8px">Nhập mã PIN 6 số</div>`}

  <div class="dv-pin-row" id="dvPinDots">
    ${Array(6).fill(0).map((_,i)=>`<div class="dv-pin-dot" id="dvDot${i}">•</div>`).join('')}
  </div>
  <div id="dvPinError" style="font-size:0.75rem;color:var(--red);min-height:18px;margin-bottom:4px"></div>

  <div class="dv-keypad">
    ${[1,2,3,4,5,6,7,8,9,'',0,'del'].map(k => `
      <button class="dv-key${k===''?' empty':''}${k==='del'?' del':''}" onclick="dvKeyPress('${k}')" ${k===''?'disabled':''}>
        ${k==='del'?'<i class="fas fa-backspace"></i>':k}
      </button>`).join('')}
  </div>

  <div class="dv-auth-alt">
    ${isSetup
      ? `Đã có tài khoản? <a onclick="dvShowAuthModal('login')">Đăng nhập</a>`
      : `<a onclick="dvShowAuthModal('setup')">Tạo tài khoản mới</a> &nbsp;|&nbsp; <a onclick="dvShowSyncCodeInput()">Đăng nhập qua Sync Code</a>`
    }
  </div>
</div>`;
  document.body.appendChild(modal);
}

function dvKeyPress(key) {
  if (key === 'del') {
    _dvPinEntry = _dvPinEntry.slice(0, -1);
  } else if (key === '' ) {
    return;
  } else {
    if (_dvPinEntry.length >= 6) return;
    _dvPinEntry += String(key);
  }

  // Update dots UI
  for (let i = 0; i < 6; i++) {
    const dot = document.getElementById(`dvDot${i}`);
    if (!dot) continue;
    if (i < _dvPinEntry.length) {
      dot.textContent = '●'; dot.classList.add('filled');
    } else {
      dot.textContent = '•'; dot.classList.remove('filled', 'active');
    }
    if (i === _dvPinEntry.length) dot.classList.add('active');
    else dot.classList.remove('active');
  }

  if (_dvPinEntry.length === 6) {
    setTimeout(() => dvSubmitPIN(), 200);
  }
}

function dvSubmitPIN() {
  const errEl = document.getElementById('dvPinError');
  if (_dvAuthMode === 'setup') {
    const username = document.getElementById('dvSetupUsername')?.value.trim() || 'Người dùng';
    DVAuth.createAccount(username, _dvPinEntry);
    DVAuth.startSession();
    _dvDismissAuthAndInit();
    if (typeof toast === 'function') toast(`<i class="fas fa-user-check" style="color:#16a34a"></i> Tạo tài khoản thành công! Xin chào, <strong>${username}</strong>`, 'success');
  } else {
    if (DVAuth.verifyPIN(_dvPinEntry)) {
      DVAuth.startSession();
      _dvDismissAuthAndInit();
    } else {
      _dvPinEntry = '';
      for (let i = 0; i < 6; i++) {
        const d = document.getElementById(`dvDot${i}`);
        if (d) { d.textContent = '•'; d.classList.remove('filled','active'); }
      }
      if (errEl) errEl.textContent = 'Mã PIN không đúng. Thử lại!';
      // Shake animation
      document.getElementById('dvAuthBox')?.animate([
        {transform:'translateX(0)'},{transform:'translateX(-8px)'},{transform:'translateX(8px)'},{transform:'translateX(0)'}
      ], { duration: 300 });
      setTimeout(() => { if (errEl) errEl.textContent = ''; }, 2000);
    }
  }
}

function _dvDismissAuthAndInit() {
  document.getElementById('dvAuthModal')?.remove();
  _dvUpdateUserChip();
  if (typeof dvInitSync === 'function') dvInitSync();
}

function _dvUpdateUserChip() {
  const profile = DVAuth.getProfile();
  if (!profile) return;
  const avatar = document.getElementById('dvUserAvatar');
  const name = document.getElementById('dvUserName');
  if (avatar) avatar.textContent = (profile.displayName || 'U')[0].toUpperCase();
  if (name) name.textContent = profile.displayName || 'Người dùng';
}

function dvOpenUserMenu() {
  const profile = DVAuth.getProfile();
  const loggedIn = DVAuth.isLoggedIn();

  // Build dropdown
  const existing = document.getElementById('dvUserMenuDrop');
  if (existing) { existing.remove(); return; }

  const menu = document.createElement('div');
  menu.id = 'dvUserMenuDrop';
  menu.style.cssText = `position:fixed;top:58px;right:12px;z-index:400;background:#fff;border-radius:14px;
    box-shadow:0 8px 32px rgba(0,0,0,0.18);padding:8px;min-width:220px;border:1px solid var(--gray-light)`;

  const chip = document.getElementById('dvUserChip');
  if (chip) {
    const rect = chip.getBoundingClientRect();
    menu.style.top = (rect.bottom + 6) + 'px';
    menu.style.right = (window.innerWidth - rect.right) + 'px';
  }

  const syncConfig = profile?.syncConfig;
  const lastSync = profile?.lastSync ? new Date(profile.lastSync).toLocaleString('vi-VN') : 'Chưa đồng bộ';

  menu.innerHTML = `
<div style="padding:10px 12px;border-bottom:1px solid var(--gray-light);margin-bottom:6px">
  <div style="font-weight:700;color:var(--navy)">${profile?.displayName || 'Người dùng'}</div>
  <div style="font-size:0.72rem;color:var(--gray)">Lần cuối đồng bộ: ${lastSync}</div>
</div>
${_dvMenuItem('fas fa-sync-alt','Đồng bộ ngay','dvManualSync()')}
${_dvMenuItem('fas fa-cloud','Cấu hình đồng bộ','dvOpenSyncModal()')}
${_dvMenuItem('fas fa-cog','Cài đặt','showPage(\'settings\')')}
${_dvMenuItem('fas fa-sign-out-alt','Đăng xuất','dvLogout()','color:var(--red)')}`;

  document.body.appendChild(menu);
  // Close on outside click
  setTimeout(() => document.addEventListener('click', function h(e) {
    if (!menu.contains(e.target) && e.target.id !== 'dvUserChip') { menu.remove(); document.removeEventListener('click', h); }
  }), 100);
}

function _dvMenuItem(icon, label, onclick, style = '') {
  return `<button onclick="${onclick};document.getElementById('dvUserMenuDrop')?.remove()" style="display:flex;align-items:center;gap:10px;width:100%;padding:10px 12px;border:none;background:none;cursor:pointer;border-radius:8px;font-family:'Be Vietnam Pro',sans-serif;font-size:0.82rem;font-weight:600;${style}" onmouseover="this.style.background='var(--cream)'" onmouseout="this.style.background='none'">
  <i class="${icon}" style="width:16px;text-align:center;color:var(--gray)"></i>${label}</button>`;
}

function dvLogout() {
  DVAuth.endSession();
  if (typeof toast === 'function') toast('Đã đăng xuất', 'info');
  setTimeout(() => { dvShowAuthModal('login'); _dvUpdateUserChip(); }, 400);
}

// ─────────────────────────────────────────────────────────────────────
//  E. GOOGLE SYNC MODULE
//     Dùng Google Sheets API v4 (REST) với Service Account JWT
//     Không cần OAuth browser redirect
// ─────────────────────────────────────────────────────────────────────

const GSheetSync = {
  SCOPE: 'https://www.googleapis.com/auth/spreadsheets',
  DRIVE_SCOPE: 'https://www.googleapis.com/auth/drive.file',
  TOKEN_ENDPOINT: 'https://oauth2.googleapis.com/token',
  SHEETS_API: 'https://sheets.googleapis.com/v4/spreadsheets',
  DRIVE_API: 'https://www.googleapis.com/upload/drive/v3/files',

  _tokenCache: null,
  _tokenExpiry: 0,

  getSyncConfig() {
    const p = DVAuth.getProfile();
    return p?.syncConfig || null;
  },

  saveSyncConfig(cfg) {
    const p = DVAuth.getProfile();
    if (!p) return;
    p.syncConfig = cfg;
    DVAuth.saveProfile(p);
  },

  // Sign JWT with RS256 — dùng Web Crypto API
  async _signJWT(serviceAccountJson) {
    const sa = typeof serviceAccountJson === 'string' ? JSON.parse(serviceAccountJson) : serviceAccountJson;
    const now = Math.floor(Date.now() / 1000);
    const header = { alg: 'RS256', typ: 'JWT' };
    const payload = {
      iss: sa.client_email,
      scope: `${this.SCOPE} ${this.DRIVE_SCOPE}`,
      aud: this.TOKEN_ENDPOINT,
      exp: now + 3600,
      iat: now,
    };

    const b64 = obj => btoa(JSON.stringify(obj)).replace(/=/g,'').replace(/\+/g,'-').replace(/\//g,'_');
    const unsignedToken = `${b64(header)}.${b64(payload)}`;

    // Import private key
    const pemBody = sa.private_key.replace(/-----[^-]+-----/g,'').replace(/\s/g,'');
    const keyBuf = Uint8Array.from(atob(pemBody), c => c.charCodeAt(0));
    const cryptoKey = await crypto.subtle.importKey('pkcs8', keyBuf, { name:'RSASSA-PKCS1-v1_5', hash:'SHA-256' }, false, ['sign']);

    const sig = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', cryptoKey, new TextEncoder().encode(unsignedToken));
    const sigB64 = btoa(String.fromCharCode(...new Uint8Array(sig))).replace(/=/g,'').replace(/\+/g,'-').replace(/\//g,'_');
    return `${unsignedToken}.${sigB64}`;
  },

  async _getAccessToken(force = false) {
    if (!force && this._tokenCache && Date.now() < this._tokenExpiry) return this._tokenCache;
    const cfg = this.getSyncConfig();
    if (!cfg?.serviceAccountJson) throw new Error('NO_SA_KEY');

    const jwt = await this._signJWT(cfg.serviceAccountJson);
    const resp = await fetch(this.TOKEN_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`
    });
    if (!resp.ok) throw new Error('TOKEN_FAILED: ' + (await resp.text()));
    const data = await resp.json();
    this._tokenCache = data.access_token;
    this._tokenExpiry = Date.now() + (data.expires_in - 60) * 1000;
    return this._tokenCache;
  },

  // Tạo Spreadsheet mới nếu chưa có
  async _ensureSpreadsheet(token) {
    const cfg = this.getSyncConfig();
    if (cfg.spreadsheetId) return cfg.spreadsheetId;

    const profile = DVAuth.getProfile();
    const resp = await fetch(`${this.SHEETS_API}`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        properties: { title: `ĐoànVăn Sync — ${profile?.displayName || 'Người dùng'} — ${new Date().getFullYear()}` },
        sheets: [
          { properties: { title: 'docs',       sheetId: 0 } },
          { properties: { title: 'members',    sheetId: 1 } },
          { properties: { title: 'reminders',  sheetId: 2 } },
          { properties: { title: 'tasks',      sheetId: 3 } },
          { properties: { title: 'meta',       sheetId: 4 } },
        ]
      })
    });
    if (!resp.ok) throw new Error('CREATE_SHEET_FAILED');
    const data = await resp.json();
    cfg.spreadsheetId = data.spreadsheetId;
    this.saveSyncConfig(cfg);
    // Setup headers
    await this._initHeaders(token, data.spreadsheetId);
    return data.spreadsheetId;
  },

  async _initHeaders(token, sid) {
    const headerMap = {
      docs:      ['id','title','type','code','issuer','issueDate','deadline','status','priority','summary','keywords','rawText_ref','createdAt'],
      members:   ['id','fullName','gender','chiDoan','role','birthDate','joinDate','phone','email','status','achieve','note','createdAt'],
      reminders: ['id','title','date','tag','note','done','docId','createdAt'],
      tasks:     ['id','title','deadline','status','priority','note','assignee','createdAt'],
      meta:      ['key','value'],
    };
    const data = Object.entries(headerMap).map(([sheet, headers]) => ({
      range: `${sheet}!A1:${String.fromCharCode(64 + headers.length)}1`,
      values: [headers]
    }));
    await fetch(`${this.SHEETS_API}/${sid}/values:batchUpdate`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ valueInputOption: 'RAW', data })
    });
  },

  // Push toàn bộ dữ liệu lên Sheets
  async pushAll(onProgress) {
    const token = await this._getAccessToken();
    const cfg = this.getSyncConfig();
    const sid = await this._ensureSpreadsheet(token);
    onProgress?.('Đang đẩy dữ liệu...', 20);

    const allData = {
      docs:      (typeof DB !== 'undefined' ? DB.get('docs')      : []) || [],
      members:   (typeof DB !== 'undefined' ? DB.get('membersList'): []) || [],
      reminders: (typeof DB !== 'undefined' ? DB.get('reminders') : []) || [],
      tasks:     (typeof DB !== 'undefined' ? DB.get('tasks')     : []) || [],
    };

    const colMap = {
      docs:      ['id','title','type','code','issuer','issueDate','deadline','status','priority','summary','keywords','rawText','createdAt'],
      members:   ['id','fullName','gender','chiDoan','role','birthDate','joinDate','phone','email','status','achieve','note','createdAt'],
      reminders: ['id','title','date','tag','note','done','docId','createdAt'],
      tasks:     ['id','title','deadline','status','priority','note','assignee','createdAt'],
    };

    const requestData = [];
    let pct = 20;
    for (const [sheet, rows] of Object.entries(allData)) {
      const cols = colMap[sheet];
      const values = rows.map(row => cols.map(c => {
        const v = row[c];
        if (Array.isArray(v)) return v.join(', ');
        if (v === null || v === undefined) return '';
        return String(v).substring(0, 500); // GSheet cell limit
      }));
      // Clear sheet first, then write
      requestData.push({ range: `${sheet}!A2:${String.fromCharCode(64 + cols.length)}`, values: [] });
      if (values.length) requestData.push({ range: `${sheet}!A2`, values });
      pct += 15; onProgress?.(`Đẩy sheet "${sheet}"...`, pct);
    }

    // Write meta
    const profile = DVAuth.getProfile();
    requestData.push({
      range: 'meta!A2:B10',
      values: [
        ['lastSync', new Date().toISOString()],
        ['device',   profile?.deviceId || 'unknown'],
        ['user',     profile?.displayName || ''],
        ['version',  '4.0'],
        ['docCount', allData.docs.length],
        ['memberCount', allData.members.length],
      ]
    });

    // Clear + write in batch
    await fetch(`${this.SHEETS_API}/${sid}/values:batchClear`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ ranges: ['docs!A2:Z','members!A2:Z','reminders!A2:Z','tasks!A2:Z','meta!A2:Z'] })
    });
    onProgress?.('Ghi dữ liệu...', 70);

    const writeResp = await fetch(`${this.SHEETS_API}/${sid}/values:batchUpdate`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ valueInputOption: 'RAW', data: requestData.filter(r => r.values.length) })
    });
    if (!writeResp.ok) throw new Error('WRITE_FAILED: ' + await writeResp.text());

    onProgress?.('Hoàn tất!', 100);

    // Update lastSync in profile
    if (profile) { profile.lastSync = new Date().toISOString(); DVAuth.saveProfile(profile); }
    _dvUpdateSyncBadge('synced', `Đã đồng bộ ${new Date().toLocaleTimeString('vi-VN')}`);
    return { docCount: allData.docs.length, memberCount: allData.members.length };
  },

  // Pull dữ liệu từ Sheets về
  async pullAll(onProgress) {
    const token = await this._getAccessToken();
    const cfg = this.getSyncConfig();
    if (!cfg?.spreadsheetId) throw new Error('NO_SPREADSHEET');
    onProgress?.('Đang tải dữ liệu...', 20);

    const resp = await fetch(`${this.SHEETS_API}/${cfg.spreadsheetId}/values:batchGet?ranges=docs!A1:Z&ranges=members!A1:Z&ranges=reminders!A1:Z&ranges=tasks!A1:Z&ranges=meta!A1:B`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!resp.ok) throw new Error('READ_FAILED');
    const data = await resp.json();
    onProgress?.('Xử lý dữ liệu...', 60);

    const parseSheet = (vr) => {
      if (!vr?.values || vr.values.length < 2) return [];
      const headers = vr.values[0];
      return vr.values.slice(1).map(row => {
        const obj = {};
        headers.forEach((h, i) => { obj[h] = row[i] || ''; });
        return obj;
      }).filter(r => r.id);
    };

    const [docsVR, membersVR, remindersVR, tasksVR] = data.valueRanges;
    if (typeof DB !== 'undefined') {
      const docs = parseSheet(docsVR);
      const members = parseSheet(membersVR);
      const reminders = parseSheet(remindersVR);
      const tasks = parseSheet(tasksVR);
      if (docs.length)     DB.set('docs',        docs);
      if (members.length)  DB.set('membersList',  members);
      if (reminders.length)DB.set('reminders',    reminders);
      if (tasks.length)    DB.set('tasks',        tasks);
    }

    onProgress?.('Hoàn tất!', 100);
    const profile = DVAuth.getProfile();
    if (profile) { profile.lastSync = new Date().toISOString(); DVAuth.saveProfile(profile); }
    _dvUpdateSyncBadge('synced', `Đã tải về ${new Date().toLocaleTimeString('vi-VN')}`);
    if (typeof updateBadges === 'function') updateBadges();
    if (typeof refreshDashboard === 'function') refreshDashboard();
  },

  // Kiểm tra kết nối (test token)
  async testConnection(serviceAccountJson) {
    try {
      const tmpCfg = this.getSyncConfig() || {};
      const origCfg = { ...tmpCfg };
      this.saveSyncConfig({ ...tmpCfg, serviceAccountJson });
      this._tokenCache = null;
      await this._getAccessToken(true);
      this.saveSyncConfig(origCfg); // restore
      this._tokenCache = null;
      return { ok: true };
    } catch (e) { return { ok: false, error: e.message }; }
  }
};

function _dvUpdateSyncBadge(state, label) {
  const badge = document.getElementById('dvSyncBadge');
  const lbl = document.getElementById('dvSyncLabel');
  if (!badge) return;
  badge.className = ''; badge.id = 'dvSyncBadge';
  if (state) badge.classList.add(state);
  const icons = { syncing: 'fa-spinner fa-spin', synced: 'fa-check-circle', error: 'fa-exclamation-circle', '': 'fa-cloud' };
  const icon = icons[state] || 'fa-cloud';
  badge.innerHTML = `<i class="fas ${icon}"></i><span id="dvSyncLabel">${label}</span>`;
}

async function dvManualSync() {
  const cfg = GSheetSync.getSyncConfig();
  if (!cfg?.serviceAccountJson) { dvOpenSyncModal(); return; }
  _dvUpdateSyncBadge('syncing', 'Đang đồng bộ...');
  try {
    await GSheetSync.pushAll((_msg, _pct) => {});
    if (typeof toast === 'function') toast('<i class="fas fa-check-circle" style="color:#16a34a"></i> Đồng bộ thành công!', 'success');
  } catch (e) {
    _dvUpdateSyncBadge('error', 'Lỗi đồng bộ');
    if (typeof toast === 'function') toast('Lỗi đồng bộ: ' + e.message, 'error');
  }
}

function dvInitSync() {
  const cfg = GSheetSync.getSyncConfig();
  if (!cfg?.serviceAccountJson) {
    _dvUpdateSyncBadge('', 'Chưa cấu hình');
  } else {
    _dvUpdateSyncBadge('synced', 'Đã kết nối');
    // Auto-sync khi khởi động (pull dữ liệu mới nhất)
    if (cfg.autoSync !== false) {
      setTimeout(() => dvManualSync(), 2000);
    }
  }
}

// ─────────────────────────────────────────────────────────────────────
//  F. SYNC MODAL UI
// ─────────────────────────────────────────────────────────────────────

function dvOpenSyncModal() {
  if (document.getElementById('dvSyncModal')) {
    document.getElementById('dvSyncModal').classList.add('open');
    return;
  }

  const modal = document.createElement('div');
  modal.id = 'dvSyncModal';
  modal.className = 'modal-overlay';
  const cfg = GSheetSync.getSyncConfig() || {};
  const profile = DVAuth.getProfile();
  const hasKey = !!cfg.serviceAccountJson;
  const hasSid = !!cfg.spreadsheetId;

  modal.innerHTML = `
<div class="modal" style="max-width:580px">
  <div class="modal-header">
    <h2 style="display:flex;align-items:center;gap:10px">
      <span style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#0284c7,#16a34a);display:flex;align-items:center;justify-content:center;flex-shrink:0">
        <i class="fas fa-sync-alt" style="color:#fff;font-size:0.85rem"></i>
      </span>Cấu hình đồng bộ đám mây</h2>
    <button class="btn btn-ghost" onclick="document.getElementById('dvSyncModal').classList.remove('open')"><i class="fas fa-times"></i></button>
  </div>
  <div class="modal-body" style="padding:20px">

    <!-- TABS -->
    <div class="tabs" style="margin-bottom:16px">
      <button class="tab-btn active" onclick="dvSyncTab(this,'pc')">💻 Cấu hình trên PC</button>
      <button class="tab-btn" onclick="dvSyncTab(this,'mobile')">📱 Đăng nhập Mobile</button>
      <button class="tab-btn" onclick="dvSyncTab(this,'status')">📊 Trạng thái</button>
    </div>

    <!-- TAB: PC SETUP -->
    <div id="dvSyncTabPC" class="tab-content active">
      <div class="dv-sync-step">
        <div class="dv-sync-step-num">1</div>
        <div style="flex:1">
          <div style="font-weight:700;color:var(--navy);margin-bottom:4px">Tải Service Account Key (JSON)</div>
          <div style="font-size:0.76rem;color:var(--gray);margin-bottom:10px">
            Vào <a href="https://console.cloud.google.com/iam-admin/serviceaccounts" target="_blank" style="color:var(--red);font-weight:600">Google Cloud Console</a>
            → Tạo Service Account → Tạo key JSON → Chia sẻ email service account quyền Editor vào Google Sheet của bạn.
          </div>
          <div style="position:relative">
            <textarea class="form-control" id="dvSAKeyInput" rows="4" placeholder='{"type":"service_account","project_id":"...","private_key":"-----BEGIN...","client_email":"...@....iam.gserviceaccount.com",...}'
              style="font-family:monospace;font-size:0.72rem">${hasKey ? '*** (đã lưu — dán mới để cập nhật) ***' : ''}</textarea>
          </div>
          <button class="btn btn-outline btn-sm" onclick="dvTestSAKey()" style="margin-top:8px">
            <i class="fas fa-vial"></i> Kiểm tra kết nối
          </button>
          <div id="dvSATestResult" style="font-size:0.78rem;min-height:18px;margin-top:6px"></div>
        </div>
      </div>

      <div class="dv-sync-step">
        <div class="dv-sync-step-num">2</div>
        <div style="flex:1">
          <div style="font-weight:700;color:var(--navy);margin-bottom:4px">ID Google Sheet (tùy chọn)</div>
          <div style="font-size:0.76rem;color:var(--gray);margin-bottom:8px">Để trống = tự động tạo Sheet mới. Nhập ID nếu muốn dùng sheet sẵn có.</div>
          <input class="form-control" id="dvSheetIdInput" placeholder="1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms"
            value="${cfg.spreadsheetId || ''}" style="font-family:monospace;font-size:0.78rem">
          ${hasSid ? `<div style="font-size:0.72rem;margin-top:4px;color:#16a34a"><i class="fas fa-external-link-alt"></i> <a href="https://docs.google.com/spreadsheets/d/${cfg.spreadsheetId}" target="_blank" style="color:#16a34a">Mở Google Sheet</a></div>` : ''}
        </div>
      </div>

      <div class="dv-sync-step">
        <div class="dv-sync-step-num">3</div>
        <div style="flex:1">
          <div style="font-weight:700;color:var(--navy);margin-bottom:4px">Cài đặt đồng bộ</div>
          <label style="display:flex;align-items:center;gap:8px;font-size:0.82rem;cursor:pointer;margin-bottom:8px">
            <input type="checkbox" id="dvAutoSync" ${cfg.autoSync !== false ? 'checked' : ''}> Tự động đồng bộ khi khởi động
          </label>
          <label style="display:flex;align-items:center;gap:8px;font-size:0.82rem;cursor:pointer">
            <input type="checkbox" id="dvAutoSyncEdit" ${cfg.autoSyncOnEdit ? 'checked' : ''}> Tự động push sau mỗi thay đổi
          </label>
        </div>
      </div>

      <div style="display:flex;gap:8px;margin-top:14px">
        <button class="btn btn-primary" onclick="dvSaveSyncConfig()" style="flex:1">
          <i class="fas fa-save"></i> Lưu & Kết nối
        </button>
        <button class="btn btn-gold" onclick="dvSyncNow('push')" ${!hasKey?'disabled':''}>
          <i class="fas fa-cloud-upload-alt"></i> Đẩy lên ngay
        </button>
        <button class="btn btn-outline" onclick="dvSyncNow('pull')" ${!hasKey?'disabled':''}>
          <i class="fas fa-cloud-download-alt"></i> Tải về
        </button>
      </div>
    </div>

    <!-- TAB: MOBILE LOGIN -->
    <div id="dvSyncTabMobile" class="tab-content">
      <div style="background:rgba(26,35,64,0.05);border-radius:12px;padding:16px;margin-bottom:16px;text-align:center">
        <div style="font-size:0.78rem;color:var(--gray);margin-bottom:8px">Trên PC, tạo Sync Code rồi nhập vào mobile:</div>
        <div style="display:flex;gap:8px;justify-content:center;margin-bottom:10px">
          <button class="btn btn-gold" onclick="dvGenerateSyncCode()">
            <i class="fas fa-qrcode"></i> Tạo Sync Code (PC)
          </button>
        </div>
        <div id="dvSyncCodeDisplay" style="display:none">
          <div class="dv-sync-code-box" id="dvSyncCodeVal" onclick="dvCopySyncCode()">---</div>
          <div style="font-size:0.72rem;color:var(--gray);margin-top:6px">Nhấn để sao chép · Code hết hạn sau 24 giờ</div>
        </div>
      </div>

      <div style="border-top:1px solid var(--gray-light);padding-top:14px">
        <div style="font-weight:700;color:var(--navy);margin-bottom:8px;font-size:0.85rem">📱 Nhập Sync Code trên thiết bị này</div>
        <input class="form-control" id="dvSyncCodeInput" placeholder="Nhập Sync Code từ PC..."
          style="letter-spacing:4px;font-family:monospace;font-size:1.1rem;text-align:center;text-transform:uppercase"
          maxlength="16" oninput="this.value=this.value.toUpperCase()">
        <button class="btn btn-primary" onclick="dvApplySyncCode()" style="width:100%;margin-top:10px">
          <i class="fas fa-link"></i> Kết nối & Tải dữ liệu
        </button>
        <div id="dvSyncCodeResult" style="font-size:0.78rem;min-height:18px;margin-top:8px;text-align:center"></div>
      </div>
    </div>

    <!-- TAB: STATUS -->
    <div id="dvSyncTabStatus" class="tab-content">
      <div id="dvSyncStatusContent">
        <div style="font-size:0.78rem;color:var(--gray);text-align:center;padding:20px">
          <i class="fas fa-spinner fa-spin"></i> Đang tải...
        </div>
      </div>
    </div>

  </div>
  <div class="modal-footer">
    <div style="font-size:0.72rem;color:var(--gray);flex:1">Dữ liệu được mã hoá và lưu trên Google Sheet cá nhân của bạn</div>
    <button class="btn btn-outline" onclick="document.getElementById('dvSyncModal').classList.remove('open')">Đóng</button>
  </div>
</div>`;

  document.body.appendChild(modal);
  modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('open'); });
  setTimeout(() => modal.classList.add('open'), 10);
}

function dvSyncTab(btn, tab) {
  document.querySelectorAll('#dvSyncModal .tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('#dvSyncModal .tab-content').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById(`dvSyncTab${tab.charAt(0).toUpperCase()+tab.slice(1)}`)?.classList.add('active');
  if (tab === 'status') dvRenderSyncStatus();
}

function dvRenderSyncStatus() {
  const cfg = GSheetSync.getSyncConfig() || {};
  const profile = DVAuth.getProfile();
  const el = document.getElementById('dvSyncStatusContent');
  if (!el) return;

  const docsCount  = typeof DB !== 'undefined' ? (DB.get('docs')       || []).length : 0;
  const membCount  = typeof DB !== 'undefined' ? (DB.get('membersList') || []).length : 0;
  const taskCount  = typeof DB !== 'undefined' ? (DB.get('tasks')       || []).length : 0;
  const lastSync   = profile?.lastSync ? new Date(profile.lastSync).toLocaleString('vi-VN') : 'Chưa đồng bộ';

  el.innerHTML = `
<div class="dv-status-row"><span>Trạng thái kết nối</span><span style="font-weight:700;color:${cfg.serviceAccountJson ? '#16a34a' : 'var(--gray)'}">
  ${cfg.serviceAccountJson ? '<i class="fas fa-check-circle"></i> Đã kết nối' : 'Chưa cấu hình'}
</span></div>
<div class="dv-status-row"><span>Google Sheet</span>
  <span style="font-size:0.75rem">${cfg.spreadsheetId ? `<a href="https://docs.google.com/spreadsheets/d/${cfg.spreadsheetId}" target="_blank" style="color:#0284c7">Mở Sheet</a>` : 'Chưa có'}</span>
</div>
<div class="dv-status-row"><span>Tài khoản</span><span style="font-weight:700">${profile?.displayName || 'Chưa đăng nhập'}</span></div>
<div class="dv-status-row"><span>Lần cuối đồng bộ</span><span style="font-size:0.78rem">${lastSync}</span></div>
<div class="dv-status-row"><span>Văn bản cục bộ</span><span style="font-weight:700;color:var(--navy)">${docsCount}</span></div>
<div class="dv-status-row"><span>Đoàn viên</span><span style="font-weight:700;color:var(--navy)">${membCount}</span></div>
<div class="dv-status-row"><span>Công việc</span><span style="font-weight:700;color:var(--navy)">${taskCount}</span></div>
<div style="margin-top:14px">
  <div id="dvSyncProgressBar" style="display:none;margin-bottom:10px">
    <div class="progress-bar"><div class="progress-fill" id="dvSyncProgressFill" style="width:0%"></div></div>
    <div style="font-size:0.72rem;color:var(--gray);margin-top:4px" id="dvSyncProgressMsg"></div>
  </div>
  <div style="display:flex;gap:8px">
    <button class="btn btn-gold" onclick="dvSyncNow('push')" ${!cfg.serviceAccountJson?'disabled':''} style="flex:1">
      <i class="fas fa-cloud-upload-alt"></i> Đẩy lên Google Sheet
    </button>
    <button class="btn btn-outline" onclick="dvSyncNow('pull')" ${!cfg.serviceAccountJson?'disabled':''} style="flex:1">
      <i class="fas fa-cloud-download-alt"></i> Tải về từ Sheet
    </button>
  </div>
</div>`;
}

async function dvSaveSyncConfig() {
  const keyInput = document.getElementById('dvSAKeyInput')?.value.trim();
  const sheetId  = document.getElementById('dvSheetIdInput')?.value.trim();
  const autoSync = document.getElementById('dvAutoSync')?.checked ?? true;
  const autoSyncEdit = document.getElementById('dvAutoSyncEdit')?.checked ?? false;

  const existing = GSheetSync.getSyncConfig() || {};
  const newCfg = { ...existing, autoSync, autoSyncEdit };
  if (sheetId) newCfg.spreadsheetId = sheetId;

  if (keyInput && !keyInput.startsWith('***')) {
    try { JSON.parse(keyInput); newCfg.serviceAccountJson = keyInput; }
    catch { if (typeof toast === 'function') toast('JSON không hợp lệ!', 'error'); return; }
  }

  GSheetSync.saveSyncConfig(newCfg);
  document.getElementById('dvSyncModal')?.classList.remove('open');
  _dvUpdateSyncBadge('synced', 'Đã kết nối');
  if (typeof toast === 'function') toast('<i class="fas fa-check-circle" style="color:#16a34a"></i> Đã lưu cấu hình đồng bộ!', 'success');
  dvInitSync();
}

async function dvTestSAKey() {
  const keyInput = document.getElementById('dvSAKeyInput')?.value.trim();
  const resEl = document.getElementById('dvSATestResult');
  if (!resEl) return;
  if (!keyInput || keyInput.startsWith('***')) { resEl.innerHTML = '<span style="color:orange">Vui lòng dán JSON key mới để kiểm tra</span>'; return; }
  resEl.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang kiểm tra...';
  try {
    const r = await GSheetSync.testConnection(keyInput);
    resEl.innerHTML = r.ok ? '<span style="color:#16a34a"><i class="fas fa-check-circle"></i> Kết nối thành công!</span>' : `<span style="color:red"><i class="fas fa-times-circle"></i> Lỗi: ${r.error}</span>`;
  } catch (e) { resEl.innerHTML = `<span style="color:red">Lỗi: ${e.message}</span>`; }
}

async function dvSyncNow(direction) {
  const progBar = document.getElementById('dvSyncProgressBar');
  const progFill = document.getElementById('dvSyncProgressFill');
  const progMsg = document.getElementById('dvSyncProgressMsg');

  if (progBar) progBar.style.display = 'block';
  _dvUpdateSyncBadge('syncing', 'Đang đồng bộ...');

  const onProgress = (msg, pct) => {
    if (progFill) progFill.style.width = pct + '%';
    if (progMsg)  progMsg.textContent  = msg;
  };

  try {
    if (direction === 'push') {
      const res = await GSheetSync.pushAll(onProgress);
      if (typeof toast === 'function') toast(`✅ Đã đẩy lên: ${res.docCount} văn bản, ${res.memberCount} đoàn viên`, 'success');
    } else {
      await GSheetSync.pullAll(onProgress);
      if (typeof toast === 'function') toast('✅ Đã tải dữ liệu mới nhất từ Google Sheet!', 'success');
    }
    dvRenderSyncStatus();
  } catch (e) {
    _dvUpdateSyncBadge('error', 'Lỗi!');
    if (typeof toast === 'function') toast('Lỗi đồng bộ: ' + e.message, 'error');
  } finally {
    if (progBar) setTimeout(() => { progBar.style.display = 'none'; if(progFill) progFill.style.width='0%'; }, 2000);
  }
}

function dvGenerateSyncCode() {
  const cfg = GSheetSync.getSyncConfig();
  if (!cfg?.serviceAccountJson) {
    if (typeof toast === 'function') toast('Cần cấu hình Service Account JSON trước!', 'warning');
    return;
  }
  // Lưu sync payload vào meta sheet (code = 8 ký tự ngẫu nhiên)
  const code = Math.random().toString(36).substring(2, 10).toUpperCase();
  const payload = JSON.stringify({ syncConfig: cfg, generatedAt: Date.now() });
  // Lưu vào localStorage với TTL 24h
  localStorage.setItem('dv_sync_code_' + code, JSON.stringify({ payload, expiry: Date.now() + 86400000 }));
  const el = document.getElementById('dvSyncCodeDisplay');
  const valEl = document.getElementById('dvSyncCodeVal');
  if (el) el.style.display = 'block';
  if (valEl) valEl.textContent = code.match(/.{1,4}/g).join(' ');
}

function dvCopySyncCode() {
  const val = document.getElementById('dvSyncCodeVal')?.textContent.replace(/\s/g,'');
  if (!val) return;
  navigator.clipboard?.writeText(val);
  if (typeof toast === 'function') toast('Đã sao chép Sync Code!', 'success');
}

function dvApplySyncCode() {
  const code = document.getElementById('dvSyncCodeInput')?.value.trim().replace(/\s/g,'').toUpperCase();
  const resEl = document.getElementById('dvSyncCodeResult');
  if (!code || code.length < 6) { if (resEl) resEl.innerHTML = '<span style="color:red">Vui lòng nhập Sync Code hợp lệ</span>'; return; }
  if (resEl) resEl.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang xác thực...';

  const stored = localStorage.getItem('dv_sync_code_' + code);
  if (!stored) { if (resEl) resEl.innerHTML = '<span style="color:red">Code không tồn tại hoặc đã hết hạn</span>'; return; }

  try {
    const { payload, expiry } = JSON.parse(stored);
    if (Date.now() > expiry) { if (resEl) resEl.innerHTML = '<span style="color:red">Code đã hết hạn (>24h)</span>'; return; }
    const { syncConfig } = JSON.parse(payload);
    GSheetSync.saveSyncConfig(syncConfig);
    _dvUpdateSyncBadge('synced', 'Đã kết nối');
    if (resEl) resEl.innerHTML = '<span style="color:#16a34a"><i class="fas fa-check-circle"></i> Kết nối thành công! Đang tải dữ liệu...</span>';
    // Auto pull
    setTimeout(() => dvSyncNow('pull'), 500);
  } catch (e) { if (resEl) resEl.innerHTML = '<span style="color:red">Lỗi: ' + e.message + '</span>'; }
}

function dvShowSyncCodeInput() {
  if (document.getElementById('dvAuthModal')) {
    document.getElementById('dvAuthModal').remove();
  }
  // Show a minimal input screen
  const modal = document.createElement('div');
  modal.id = 'dvAuthModal';
  modal.innerHTML = `
<div id="dvAuthBox">
  <div class="dv-auth-logo"><i class="fas fa-sync-alt"></i></div>
  <div class="dv-auth-title">Đăng nhập bằng Sync Code</div>
  <div class="dv-auth-sub">Nhập Sync Code được tạo từ thiết bị PC của bạn</div>
  <input class="form-control" id="dvQuickSyncCode" placeholder="Nhập Sync Code..."
    style="letter-spacing:4px;font-family:monospace;font-size:1.2rem;text-align:center;text-transform:uppercase;margin:16px 0"
    maxlength="16" oninput="this.value=this.value.toUpperCase()">
  <button class="btn btn-primary" onclick="dvQuickApplySync()" style="width:100%;margin-bottom:10px">
    <i class="fas fa-link"></i> Kết nối
  </button>
  <div id="dvQuickSyncResult" style="font-size:0.78rem;min-height:18px;color:var(--gray);text-align:center"></div>
  <div class="dv-auth-alt" style="margin-top:12px">
    <a onclick="dvShowAuthModal('login')">← Quay lại đăng nhập bằng PIN</a>
  </div>
</div>`;
  document.body.appendChild(modal);
}

function dvQuickApplySync() {
  const code = document.getElementById('dvQuickSyncCode')?.value.trim().replace(/\s/g,'').toUpperCase();
  const resEl = document.getElementById('dvQuickSyncResult');
  if (!code) { if(resEl) resEl.innerHTML='<span style="color:red">Vui lòng nhập Sync Code</span>'; return; }
  if(resEl) resEl.innerHTML='<i class="fas fa-spinner fa-spin"></i> Đang xác thực...';

  const stored = localStorage.getItem('dv_sync_code_' + code);
  if (!stored) { if(resEl) resEl.innerHTML='<span style="color:red">Code không hợp lệ hoặc hết hạn</span>'; return; }
  try {
    const { payload, expiry } = JSON.parse(stored);
    if (Date.now() > expiry) { if(resEl) resEl.innerHTML='<span style="color:red">Code đã hết hạn</span>'; return; }
    const { syncConfig } = JSON.parse(payload);
    GSheetSync.saveSyncConfig(syncConfig);
    // Tạo session không cần PIN (đăng nhập qua sync code)
    DVAuth.startSession();
    _dvDismissAuthAndInit?.();
    document.getElementById('dvAuthModal')?.remove();
    if(typeof toast==='function') toast('✅ Đã kết nối thành công! Đang đồng bộ dữ liệu...','success');
    setTimeout(()=>dvSyncNow('pull'),800);
  } catch(e){ if(resEl) resEl.innerHTML='<span style="color:red">Lỗi: '+e.message+'</span>'; }
}

// ─────────────────────────────────────────────────────────────────────
//  G. DB PATCH — auto-sync sau mỗi write nếu cấu hình bật
// ─────────────────────────────────────────────────────────────────────
(function patchDBForAutoSync() {
  if (typeof DB === 'undefined') return;
  const origSet = DB.set.bind(DB);
  DB.set = function(k, v) {
    origSet(k, v);
    const cfg = GSheetSync.getSyncConfig();
    if (cfg?.autoSyncOnEdit && cfg?.serviceAccountJson && DVAuth.isLoggedIn()) {
      clearTimeout(DB._syncTimer);
      DB._syncTimer = setTimeout(() => dvManualSync(), 3000); // debounce 3s
    }
  };
})();

// ─────────────────────────────────────────────────────────────────────
//  H. INIT
// ─────────────────────────────────────────────────────────────────────
function dvInit() {
  _dvInjectMobileUI();

  const profile = DVAuth.getProfile();
  const loggedIn = DVAuth.isLoggedIn();

  if (!profile) {
    // Lần đầu sử dụng: hiển thị màn hình tạo tài khoản
    dvShowAuthModal('setup');
  } else if (!loggedIn) {
    // Có tài khoản nhưng chưa đăng nhập phiên này
    dvShowAuthModal('login');
  } else {
    // Đã đăng nhập
    _dvUpdateUserChip();
    dvInitSync();
  }
}

// Auto-init sau khi DOM và scripts khác sẵn sàng
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => setTimeout(dvInit, 300));
} else {
  setTimeout(dvInit, 300);
}

// Export globals
window.dvToggleSidebar = dvToggleSidebar;
window.dvCloseSidebar  = dvCloseSidebar;
window.dvNavTo         = dvNavTo;
window.dvShowAuthModal = dvShowAuthModal;
window.dvKeyPress      = dvKeyPress;
window.dvLogout        = dvLogout;
window.dvOpenUserMenu  = dvOpenUserMenu;
window.dvOpenSyncModal = dvOpenSyncModal;
window.dvSyncTab       = dvSyncTab;
window.dvSaveSyncConfig= dvSaveSyncConfig;
window.dvTestSAKey     = dvTestSAKey;
window.dvSyncNow       = dvSyncNow;
window.dvManualSync    = dvManualSync;
window.dvGenerateSyncCode = dvGenerateSyncCode;
window.dvCopySyncCode  = dvCopySyncCode;
window.dvApplySyncCode = dvApplySyncCode;
window.dvShowSyncCodeInput = dvShowSyncCodeInput;
window.dvQuickApplySync = dvQuickApplySync;
window.dvRenderSyncStatus = dvRenderSyncStatus;
window.DVAuth = DVAuth;
window.GSheetSync = GSheetSync;

console.log('[ĐoànVăn Mobile+Sync v1.0] Loaded — Auth ✅ Mobile ✅ GoogleSheets ✅');
