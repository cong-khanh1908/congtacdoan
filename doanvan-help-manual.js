/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║       DOANVAN — MODULE HƯỚNG DẪN SỬ DỤNG CHI TIẾT             ║
 * ║       doanvan-help-manual.js  v1.0  2025–2026                  ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 *  Chức năng:
 *  - Nút trợ giúp (?) trên màn hình đăng nhập
 *  - Nút trợ giúp trong sidebar + topbar của phần mềm chính
 *  - Modal hướng dẫn chi tiết từng chức năng, từng logic hoạt động
 *  - Hướng dẫn tích hợp bên ngoài (Google Sheet, Gemini API...)
 *  - Thanh tìm kiếm nội bộ trong hướng dẫn
 */

(function () {
  'use strict';

  /* ─── CSS ─────────────────────────────────────────────────────── */
  const HELP_CSS = `
    /* === HELP BUTTON === */
    .dv-help-btn {
      display: inline-flex; align-items: center; justify-content: center;
      gap: 6px;
      background: rgba(212,160,23,0.15);
      border: 1.5px solid rgba(212,160,23,0.5);
      color: #d4a017;
      border-radius: 8px;
      padding: 7px 14px;
      font-family: 'Be Vietnam Pro', sans-serif;
      font-size: 0.78rem; font-weight: 700;
      cursor: pointer; transition: all 0.2s;
      white-space: nowrap;
    }
    .dv-help-btn:hover {
      background: rgba(212,160,23,0.28);
      border-color: #d4a017;
      transform: translateY(-1px);
      box-shadow: 0 4px 14px rgba(212,160,23,0.25);
    }

    /* === HELP LOGIN FLOATING BUTTON === */
    #dvHelpLoginBtn {
      position: fixed;
      bottom: 28px; right: 28px;
      z-index: 99999;
      width: 48px; height: 48px;
      border-radius: 50%;
      background: linear-gradient(135deg,#d4a017,#f0c040);
      color: #1a2340;
      border: none; cursor: pointer;
      font-size: 1.1rem; font-weight: 900;
      box-shadow: 0 4px 20px rgba(212,160,23,0.4);
      transition: all 0.25s;
      display: flex; align-items: center; justify-content: center;
      font-family: serif;
    }
    #dvHelpLoginBtn:hover {
      transform: scale(1.12);
      box-shadow: 0 6px 28px rgba(212,160,23,0.55);
    }
    #dvHelpLoginBtn .dv-help-tooltip {
      position: absolute; right: 58px; bottom: 50%;
      transform: translateY(50%);
      background: #1a2340; color: #fff;
      border-radius: 6px; padding: 5px 12px;
      font-size: 0.72rem; font-weight: 600;
      white-space: nowrap; pointer-events: none;
      opacity: 0; transition: opacity 0.2s;
    }
    #dvHelpLoginBtn:hover .dv-help-tooltip { opacity: 1; }

    /* === MODAL OVERLAY === */
    #dvHelpModal {
      position: fixed; inset: 0; z-index: 999999;
      background: rgba(10,15,35,0.65);
      backdrop-filter: blur(6px);
      display: flex; align-items: flex-start; justify-content: center;
      padding: 24px 16px;
      overflow-y: auto;
      animation: dvHelpFadeIn 0.25s ease;
    }
    @keyframes dvHelpFadeIn { from { opacity:0; } to { opacity:1; } }

    /* === MODAL BOX === */
    #dvHelpBox {
      background: #fff;
      border-radius: 20px;
      width: 100%; max-width: 900px;
      box-shadow: 0 24px 80px rgba(0,0,0,0.28);
      display: flex; flex-direction: column;
      max-height: calc(100vh - 48px);
      overflow: hidden;
      animation: dvHelpSlideIn 0.28s cubic-bezier(0.4,0,0.2,1);
      position: relative;
    }
    @keyframes dvHelpSlideIn {
      from { opacity:0; transform: translateY(32px) scale(0.97); }
      to   { opacity:1; transform: translateY(0) scale(1); }
    }

    /* === MODAL HEADER === */
    #dvHelpHeader {
      background: linear-gradient(120deg,#1a2340 0%,#243060 60%,#2e3f80 100%);
      padding: 24px 28px 0;
      flex-shrink: 0;
    }
    .dvh-close-btn {
      position: absolute; top: 16px; right: 16px;
      background: rgba(255,255,255,0.12); border: none;
      border-radius: 50%; width: 36px; height: 36px;
      color: rgba(255,255,255,0.8); font-size: 1rem;
      cursor: pointer; transition: all 0.2s;
      display: flex; align-items: center; justify-content: center;
    }
    .dvh-close-btn:hover { background: rgba(255,255,255,0.25); color:#fff; }
    .dvh-logo-row {
      display: flex; align-items: center; gap: 14px;
      margin-bottom: 18px;
    }
    .dvh-logo-icon {
      width: 52px; height: 52px;
      background: #c0392b;
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 1.5rem; color: #f0c040;
      box-shadow: 0 0 0 4px rgba(212,160,23,0.2);
      flex-shrink: 0;
    }
    .dvh-logo-text h2 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 1.3rem; color: #f0c040; font-weight: 900; margin:0;
    }
    .dvh-logo-text p {
      font-size: 0.72rem; color: rgba(255,255,255,0.5);
      margin: 2px 0 0; text-transform: uppercase; letter-spacing: 1.5px;
    }

    /* === SEARCH BAR IN HELP === */
    .dvh-search-wrap {
      position: relative; margin-bottom: 18px;
    }
    .dvh-search-wrap i {
      position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
      color: rgba(255,255,255,0.4); font-size: 0.85rem;
    }
    #dvHelpSearch {
      width: 100%; padding: 10px 14px 10px 38px;
      border-radius: 10px; border: 1.5px solid rgba(255,255,255,0.15);
      background: rgba(255,255,255,0.09);
      color: #fff; font-family: 'Be Vietnam Pro', sans-serif;
      font-size: 0.82rem;
      outline: none; transition: border-color 0.2s;
    }
    #dvHelpSearch::placeholder { color: rgba(255,255,255,0.35); }
    #dvHelpSearch:focus { border-color: rgba(212,160,23,0.6); }

    /* === TABS === */
    .dvh-tabs {
      display: flex; gap: 4px; overflow-x: auto; padding-bottom: 0;
    }
    .dvh-tabs::-webkit-scrollbar { height: 3px; }
    .dvh-tab {
      padding: 9px 16px; border-radius: 10px 10px 0 0;
      font-size: 0.75rem; font-weight: 700; white-space: nowrap;
      cursor: pointer; color: rgba(255,255,255,0.55);
      background: transparent; border: none;
      font-family: 'Be Vietnam Pro', sans-serif;
      transition: all 0.2s; flex-shrink: 0;
    }
    .dvh-tab:hover { color: rgba(255,255,255,0.85); background: rgba(255,255,255,0.07); }
    .dvh-tab.active { background: #fff; color: #1a2340; border-radius: 10px 10px 0 0; }

    /* === MODAL BODY === */
    #dvHelpBody {
      flex: 1; overflow-y: auto; padding: 0;
    }
    #dvHelpBody::-webkit-scrollbar { width: 6px; }
    #dvHelpBody::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 3px; }

    /* === TAB PANELS === */
    .dvh-panel { display: none; padding: 28px; }
    .dvh-panel.active { display: block; animation: dvHelpFadeIn 0.2s ease; }

    /* === SECTION BLOCKS === */
    .dvh-section {
      margin-bottom: 28px;
      border: 1.5px solid #f0f0f0;
      border-radius: 14px; overflow: hidden;
    }
    .dvh-section-head {
      display: flex; align-items: center; gap: 12px;
      padding: 14px 18px;
      background: linear-gradient(90deg,rgba(26,35,64,0.04),transparent);
      cursor: pointer; user-select: none;
      border-bottom: 1.5px solid #f0f0f0;
    }
    .dvh-section-head:hover { background: rgba(26,35,64,0.06); }
    .dvh-section-icon {
      width: 36px; height: 36px; border-radius: 9px;
      display: flex; align-items: center; justify-content: center;
      font-size: 1rem; flex-shrink: 0;
    }
    .dvh-section-head h3 {
      font-size: 0.9rem; font-weight: 700; color: #1a2340; flex: 1;
      margin: 0;
    }
    .dvh-section-head .dvh-badge {
      font-size: 0.65rem; font-weight: 700; text-transform: uppercase;
      letter-spacing: 1px; padding: 2px 9px; border-radius: 10px;
    }
    .dvh-chevron {
      color: #9ca3af; transition: transform 0.25s; font-size: 0.8rem;
    }
    .dvh-section.open .dvh-chevron { transform: rotate(180deg); }
    .dvh-section-body {
      display: none; padding: 18px;
      font-size: 0.82rem; color: #374151; line-height: 1.75;
    }
    .dvh-section.open .dvh-section-body { display: block; }

    /* === STEP LIST === */
    .dvh-steps { margin: 10px 0; display: flex; flex-direction: column; gap: 10px; }
    .dvh-step {
      display: flex; gap: 12px; align-items: flex-start;
      padding: 12px 14px; border-radius: 10px;
      background: #f9fafb; border: 1px solid #e5e7eb;
    }
    .dvh-step-num {
      width: 26px; height: 26px; border-radius: 50%;
      background: #1a2340; color: #f0c040;
      font-size: 0.72rem; font-weight: 900;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; margin-top: 1px;
    }
    .dvh-step-content { flex: 1; }
    .dvh-step-content strong {
      display: block; font-size: 0.83rem; color: #111827; margin-bottom: 2px;
    }
    .dvh-step-content span { font-size: 0.78rem; color: #6b7280; }

    /* === TIP / WARNING / INFO BOXES === */
    .dvh-tip {
      display: flex; gap: 10px; align-items: flex-start;
      border-radius: 10px; padding: 11px 14px; margin: 10px 0;
      font-size: 0.79rem;
    }
    .dvh-tip.info { background: rgba(26,35,64,0.05); border-left: 3px solid #1a2340; color:#1e3a5f; }
    .dvh-tip.warn { background: rgba(217,119,6,0.07); border-left: 3px solid #d97706; color:#92400e; }
    .dvh-tip.success { background: rgba(22,163,74,0.07); border-left: 3px solid #16a34a; color:#14532d; }
    .dvh-tip.danger { background: rgba(192,57,43,0.06); border-left: 3px solid #c0392b; color:#7f1d1d; }
    .dvh-tip i { margin-top: 2px; font-size: 0.9rem; flex-shrink: 0; }

    /* === EXTERNAL LINK BOX === */
    .dvh-ext-box {
      border: 1.5px dashed #d1d5db; border-radius: 12px;
      padding: 14px 16px; margin: 12px 0;
      background: #fafafa;
    }
    .dvh-ext-box-title {
      font-size: 0.8rem; font-weight: 700; color: #1a2340;
      display: flex; align-items: center; gap: 8px; margin-bottom: 8px;
    }
    .dvh-ext-box-title .dvh-ext-icon {
      width: 28px; height: 28px; border-radius: 7px;
      background: #fff; border: 1px solid #e5e7eb;
      display: flex; align-items: center; justify-content: center;
      font-size: 0.9rem;
    }
    .dvh-ext-link {
      display: inline-flex; align-items: center; gap: 6px;
      background: #c0392b; color: #fff; border: none; border-radius: 7px;
      padding: 6px 14px; font-size: 0.75rem; font-weight: 700;
      cursor: pointer; text-decoration: none; transition: all 0.2s;
      margin-top: 8px;
    }
    .dvh-ext-link:hover { background: #96281b; transform: translateY(-1px); }

    /* === KEY BADGE === */
    kbd {
      display: inline-flex; align-items: center;
      background: #f3f4f6; border: 1px solid #d1d5db;
      border-radius: 5px; padding: 1px 7px;
      font-size: 0.72rem; font-family: monospace;
      color: #1f2937; font-weight: 700;
      box-shadow: 0 1px 2px rgba(0,0,0,0.1);
    }

    /* === ROLE TABLE === */
    .dvh-role-table {
      width: 100%; border-collapse: collapse; font-size: 0.78rem;
      margin: 10px 0; border-radius: 10px; overflow: hidden;
    }
    .dvh-role-table th {
      background: #1a2340; color: #f0c040;
      padding: 8px 12px; text-align: left; font-size: 0.72rem;
      font-weight: 700; text-transform: uppercase; letter-spacing: 1px;
    }
    .dvh-role-table td {
      padding: 8px 12px; border-bottom: 1px solid #f0f0f0;
      vertical-align: top;
    }
    .dvh-role-table tr:last-child td { border-bottom: none; }
    .dvh-role-table tr:nth-child(even) td { background: #fafafa; }
    .dvh-ok { color: #16a34a; font-weight: 700; }
    .dvh-no { color: #9ca3af; }

    /* === FEATURE GRID === */
    .dvh-feat-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 12px; margin: 12px 0;
    }
    .dvh-feat-card {
      background: #fff; border: 1.5px solid #e5e7eb;
      border-radius: 11px; padding: 14px;
      transition: all 0.2s; cursor: default;
    }
    .dvh-feat-card:hover { border-color: #c0392b; box-shadow: 0 4px 14px rgba(192,57,43,0.1); }
    .dvh-feat-card i { font-size: 1.2rem; margin-bottom: 8px; display: block; }
    .dvh-feat-card strong { font-size: 0.82rem; color: #111827; display: block; margin-bottom: 3px; }
    .dvh-feat-card span { font-size: 0.72rem; color: #6b7280; line-height: 1.5; }

    /* === SEARCH HIGHLIGHT === */
    mark { background: rgba(212,160,23,0.35); border-radius: 3px; padding: 0 2px; }

    /* === FOOTER === */
    .dvh-footer {
      padding: 14px 28px;
      border-top: 1.5px solid #f0f0f0;
      display: flex; justify-content: space-between; align-items: center;
      font-size: 0.72rem; color: #9ca3af;
      flex-shrink: 0;
    }
    .dvh-footer a { color: #c0392b; text-decoration: none; font-weight: 600; }
    .dvh-footer a:hover { text-decoration: underline; }

    @media (max-width: 600px) {
      #dvHelpBox { max-width: 100%; border-radius: 14px; }
      .dvh-panel { padding: 18px; }
      .dvh-feat-grid { grid-template-columns: 1fr 1fr; }
    }
  `;

  /* ─── HELP DATA ───────────────────────────────────────────────── */
  const TABS = [
    { id: 'overview',   label: '📋 Tổng quan', icon: 'fa-home' },
    { id: 'login',      label: '🔐 Đăng nhập', icon: 'fa-key' },
    { id: 'docs',       label: '📄 Văn bản', icon: 'fa-file-alt' },
    { id: 'tasks',      label: '✅ Công việc', icon: 'fa-tasks' },
    { id: 'reports',    label: '📊 Báo cáo', icon: 'fa-chart-bar' },
    { id: 'ai',         label: '🤖 AI Gemini', icon: 'fa-brain' },
    { id: 'gsheet',     label: '📊 Google Sheet', icon: 'fa-table' },
    { id: 'members',    label: '👥 Đoàn viên', icon: 'fa-users' },
    { id: 'admin',      label: '⚙️ Quản trị', icon: 'fa-crown' },
    { id: 'shortcuts',  label: '⌨️ Phím tắt', icon: 'fa-keyboard' },
  ];

  function buildOverview() {
    return `
      <div style="text-align:center;padding:8px 0 24px">
        <div style="font-size:2.5rem;margin-bottom:10px">🏛️</div>
        <h2 style="font-family:'Playfair Display',serif;font-size:1.4rem;color:#1a2340;margin:0 0 6px">ĐoànVăn v5.0</h2>
        <p style="font-size:0.82rem;color:#6b7280">Hệ thống quản lý văn bản &amp; hoạt động Đoàn TNCS Hồ Chí Minh</p>
      </div>
      <div class="dvh-feat-grid">
        <div class="dvh-feat-card">
          <i class="fas fa-file-alt" style="color:#c0392b"></i>
          <strong>Quản lý văn bản</strong>
          <span>Lưu trữ, phân loại và tra cứu toàn bộ văn bản Đoàn theo chuẩn</span>
        </div>
        <div class="dvh-feat-card">
          <i class="fas fa-brain" style="color:#d4a017"></i>
          <strong>AI Gemini tích hợp</strong>
          <span>Phân tích văn bản, trích xuất thông tin, tổng hợp báo cáo tự động</span>
        </div>
        <div class="dvh-feat-card">
          <i class="fas fa-table" style="color:#1a7fcb"></i>
          <strong>Đồng bộ Google Sheet</strong>
          <span>Dữ liệu lưu trên Google Sheet, chia sẻ thời gian thực giữa nhiều người</span>
        </div>
        <div class="dvh-feat-card">
          <i class="fas fa-tasks" style="color:#16a34a"></i>
          <strong>Quản lý công việc</strong>
          <span>Theo dõi tiến độ, deadline, nhắc nhở tự động các nhiệm vụ của Đoàn</span>
        </div>
        <div class="dvh-feat-card">
          <i class="fas fa-chart-pie" style="color:#7c3aed"></i>
          <strong>Thống kê phân tích</strong>
          <span>Biểu đồ trực quan về văn bản, hoạt động, thành tích của Đoàn</span>
        </div>
        <div class="dvh-feat-card">
          <i class="fas fa-users" style="color:#c0392b"></i>
          <strong>Quản lý đoàn viên</strong>
          <span>Danh sách, hoạt động, điểm rèn luyện của từng đoàn viên</span>
        </div>
        <div class="dvh-feat-card">
          <i class="fas fa-layer-group" style="color:#d4a017"></i>
          <strong>Mẫu văn bản</strong>
          <span>Thư viện mẫu chuẩn, AI tạo nội dung theo mẫu tự động</span>
        </div>
        <div class="dvh-feat-card">
          <i class="fas fa-shield-alt" style="color:#1a2340"></i>
          <strong>Bảo mật đa tầng</strong>
          <span>PIN mã hóa SHA-256, phân quyền Admin/Quản lý/Đoàn viên, khóa tài khoản tự động</span>
        </div>
      </div>
      <div class="dvh-tip info">
        <i class="fas fa-info-circle"></i>
        <div><strong>Yêu cầu kỹ thuật:</strong> Trình duyệt hiện đại (Chrome 90+, Edge 90+, Firefox 88+). Phần mềm chạy hoàn toàn trên trình duyệt — không cần cài đặt. Internet cần thiết để dùng AI Gemini và đồng bộ Google Sheet.</div>
      </div>
    `;
  }

  function buildLogin() {
    return `
      <div class="dvh-section open">
        <div class="dvh-section-head" onclick="dvhToggle(this)">
          <div class="dvh-section-icon" style="background:rgba(26,35,64,0.08);color:#1a2340"><i class="fas fa-rocket"></i></div>
          <h3>Lần đầu sử dụng — Cài đặt Admin</h3>
          <span class="dvh-badge" style="background:#fee2e2;color:#c0392b">QUAN TRỌNG</span>
          <i class="fas fa-chevron-down dvh-chevron"></i>
        </div>
        <div class="dvh-section-body">
          <div class="dvh-tip warn"><i class="fas fa-exclamation-triangle"></i><div>Bước này chỉ cần làm <strong>một lần duy nhất</strong> khi khởi tạo hệ thống. Sau đó các thành viên dùng <em>Mã mời</em> để tham gia.</div></div>
          <div class="dvh-steps">
            <div class="dvh-step"><div class="dvh-step-num">1</div><div class="dvh-step-content"><strong>Tạo Google Sheet làm cơ sở dữ liệu</strong><span>Truy cập <strong>sheets.google.com</strong> → Tạo bảng tính mới → Sao chép <em>Sheet ID</em> từ URL (chuỗi ký tự giữa /d/ và /edit)</span></div></div>
            <div class="dvh-step"><div class="dvh-step-num">2</div><div class="dvh-step-content"><strong>Tạo Google Apps Script (GAS)</strong><span>Trong Google Sheet → <kbd>Tiện ích mở rộng</kbd> → <kbd>Apps Script</kbd> → Dán code GAS vào → <kbd>Triển khai</kbd> → Sao chép <em>Web App URL</em></span></div></div>
            <div class="dvh-step"><div class="dvh-step-num">3</div><div class="dvh-step-content"><strong>Mở phần mềm → Nhấn "Cài đặt Admin (lần đầu)"</strong><span>Màn hình đăng nhập hiển thị nút này khi hệ thống chưa được thiết lập</span></div></div>
            <div class="dvh-step"><div class="dvh-step-num">4</div><div class="dvh-step-content"><strong>Điền thông tin Admin</strong><span>Tên hiển thị, tên tổ chức Đoàn, GAS URL, Sheet ID và đặt mã PIN 6 chữ số bảo mật</span></div></div>
            <div class="dvh-step"><div class="dvh-step-num">5</div><div class="dvh-step-content"><strong>Hoàn tất — Đăng nhập bằng PIN Admin</strong><span>Hệ thống sẵn sàng. Admin có thể tạo <em>Mã mời</em> để mời thành viên khác tham gia</span></div></div>
          </div>
          <div class="dvh-ext-box">
            <div class="dvh-ext-box-title"><div class="dvh-ext-icon">📊</div> Google Sheets — Tạo cơ sở dữ liệu</div>
            <div style="font-size:0.78rem;color:#6b7280;margin-bottom:4px">Phần mềm lưu toàn bộ dữ liệu lên Google Sheet của bạn. Bạn cần có tài khoản Google và tạo bảng tính trống.</div>
            <a class="dvh-ext-link" href="https://sheets.google.com" target="_blank"><i class="fas fa-external-link-alt"></i> Mở Google Sheets</a>
          </div>
        </div>
      </div>

      <div class="dvh-section open">
        <div class="dvh-section-head" onclick="dvhToggle(this)">
          <div class="dvh-section-icon" style="background:rgba(192,57,43,0.08);color:#c0392b"><i class="fas fa-key"></i></div>
          <h3>Đăng nhập hàng ngày — Nhập PIN</h3>
          <i class="fas fa-chevron-down dvh-chevron"></i>
        </div>
        <div class="dvh-section-body">
          <div class="dvh-steps">
            <div class="dvh-step"><div class="dvh-step-num">1</div><div class="dvh-step-content"><strong>Mở file index.html bằng trình duyệt</strong><span>Nhấn đúp vào file hoặc kéo vào cửa sổ Chrome/Edge</span></div></div>
            <div class="dvh-step"><div class="dvh-step-num">2</div><div class="dvh-step-content"><strong>Màn hình đăng nhập hiện lên</strong><span>Hiển thị tên và vai trò tài khoản đã đăng nhập lần trước</span></div></div>
            <div class="dvh-step"><div class="dvh-step-num">3</div><div class="dvh-step-content"><strong>Nhập mã PIN 6 chữ số</strong><span>Sử dụng bàn phím số trên màn hình hoặc bàn phím vật lý. PIN được mã hóa SHA-256, không ai đọc được kể cả Admin</span></div></div>
            <div class="dvh-step"><div class="dvh-step-num">4</div><div class="dvh-step-content"><strong>Vào phần mềm chính</strong><span>Sau khi PIN đúng, hệ thống đồng bộ dữ liệu từ Google Sheet và hiển thị Bảng điều khiển</span></div></div>
          </div>
          <div class="dvh-tip warn"><i class="fas fa-lock"></i><div><strong>Bảo mật tự động:</strong> Nhập sai PIN <strong>5 lần</strong> → tài khoản bị khoá tạm 30 giây. Tăng dần với mỗi lần vi phạm tiếp theo.</div></div>
          <div class="dvh-tip info"><i class="fas fa-exchange-alt"></i><div><strong>Đổi tài khoản:</strong> Nhấn nút <em>"Đổi tài khoản"</em> góc trên màn hình PIN → chọn tài khoản hoặc đăng nhập bằng Tên đăng nhập + PIN.</div></div>
        </div>
      </div>

      <div class="dvh-section">
        <div class="dvh-section-head" onclick="dvhToggle(this)">
          <div class="dvh-section-icon" style="background:rgba(22,163,74,0.08);color:#16a34a"><i class="fas fa-ticket-alt"></i></div>
          <h3>Tham gia bằng Mã mời (thành viên mới)</h3>
          <i class="fas fa-chevron-down dvh-chevron"></i>
        </div>
        <div class="dvh-section-body">
          <div class="dvh-tip info"><i class="fas fa-info-circle"></i><div>Thành viên không cần cài đặt. Chỉ cần <strong>Mã mời</strong> do Admin cấp — thường là chuỗi 8 ký tự dạng <code>DV-XXXXXX</code>.</div></div>
          <div class="dvh-steps">
            <div class="dvh-step"><div class="dvh-step-num">1</div><div class="dvh-step-content"><strong>Nhận Mã mời từ Admin</strong><span>Admin tạo mã tại: Phần mềm → Quản trị → Người dùng &amp; Mã mời → Tạo mã mời</span></div></div>
            <div class="dvh-step"><div class="dvh-step-num">2</div><div class="dvh-step-content"><strong>Màn hình đăng nhập → Nhấn "Tham gia bằng Mã mời"</strong><span>Hoặc chọn "Đã có tài khoản? Dùng Sync Code" nếu đã dùng trên thiết bị khác</span></div></div>
            <div class="dvh-step"><div class="dvh-step-num">3</div><div class="dvh-step-content"><strong>Nhập Mã mời → Điền thông tin cá nhân + PIN</strong><span>Hệ thống tự tải cấu hình từ Google Sheet và tạo tài khoản cục bộ</span></div></div>
            <div class="dvh-step"><div class="dvh-step-num">4</div><div class="dvh-step-content"><strong>Đăng nhập bình thường bằng PIN từ lần sau</strong><span></span></div></div>
          </div>
        </div>
      </div>
    `;
  }

  function buildDocs() {
    return `
      <div class="dvh-section open">
        <div class="dvh-section-head" onclick="dvhToggle(this)">
          <div class="dvh-section-icon" style="background:rgba(192,57,43,0.08);color:#c0392b"><i class="fas fa-upload"></i></div>
          <h3>Nhập văn bản mới</h3>
          <span class="dvh-badge" style="background:#dcfce7;color:#16a34a">Chức năng chính</span>
          <i class="fas fa-chevron-down dvh-chevron"></i>
        </div>
        <div class="dvh-section-body">
          <p style="margin-bottom:12px">Có <strong>2 cách</strong> nhập văn bản vào hệ thống:</p>

          <div style="font-weight:700;color:#1a2340;margin-bottom:8px;font-size:0.85rem">📎 Cách 1: Tải tệp lên (Khuyến nghị — có AI hỗ trợ)</div>
          <div class="dvh-steps">
            <div class="dvh-step"><div class="dvh-step-num">1</div><div class="dvh-step-content"><strong>Vào menu "Nhập văn bản mới"</strong><span>Hoặc nhấn nút <kbd>+ Nhập văn bản</kbd> trên thanh topbar hoặc phím <kbd>Ctrl</kbd>+<kbd>N</kbd></span></div></div>
            <div class="dvh-step"><div class="dvh-step-num">2</div><div class="dvh-step-content"><strong>Kéo thả tệp vào vùng upload hoặc nhấn để chọn</strong><span>Hỗ trợ: <strong>PDF, DOCX, DOC, TXT, PNG, JPG</strong>. Có thể chọn nhiều tệp cùng lúc</span></div></div>
            <div class="dvh-step"><div class="dvh-step-num">3</div><div class="dvh-step-content"><strong>AI Gemini tự động phân tích</strong><span>Trích xuất tiêu đề, số ký hiệu, ngày ban hành, cơ quan, hạn xử lý, phân loại loại văn bản</span></div></div>
            <div class="dvh-step"><div class="dvh-step-num">4</div><div class="dvh-step-content"><strong>Kiểm tra và xác nhận thông tin</strong><span>AI hiển thị kết quả phân tích — bạn có thể chỉnh sửa trước khi lưu</span></div></div>
            <div class="dvh-step"><div class="dvh-step-num">5</div><div class="dvh-step-content"><strong>Nhấn "Lưu văn bản"</strong><span>Dữ liệu được lưu cục bộ và đồng bộ lên Google Sheet tự động</span></div></div>
          </div>

          <div style="font-weight:700;color:#1a2340;margin:14px 0 8px;font-size:0.85rem">✏️ Cách 2: Nhập thủ công</div>
          <div class="dvh-steps">
            <div class="dvh-step"><div class="dvh-step-num">1</div><div class="dvh-step-content"><strong>Điền form bên dưới vùng upload</strong><span>Các trường: Tiêu đề (*bắt buộc*), Loại văn bản, Số/Ký hiệu, Ngày ban hành, Hạn hoàn thành, Cơ quan ban hành, Nội dung/Trích yếu, Mức ưu tiên</span></div></div>
            <div class="dvh-step"><div class="dvh-step-num">2</div><div class="dvh-step-content"><strong>Chọn Mức ưu tiên phù hợp</strong><span>Thông thường / Quan trọng / Khẩn cấp — ảnh hưởng màu hiển thị và thứ tự cảnh báo</span></div></div>
            <div class="dvh-step"><div class="dvh-step-num">3</div><div class="dvh-step-content"><strong>Nhấn "Lưu văn bản"</strong><span></span></div></div>
          </div>

          <div class="dvh-tip success"><i class="fas fa-robot"></i><div><strong>Loại văn bản AI nhận diện được:</strong> Chỉ thị · Nghị quyết · Kế hoạch · Báo cáo · Công văn · Thông báo · Tờ trình · Biên bản</div></div>
        </div>
      </div>

      <div class="dvh-section">
        <div class="dvh-section-head" onclick="dvhToggle(this)">
          <div class="dvh-section-icon" style="background:rgba(26,35,64,0.08);color:#1a2340"><i class="fas fa-folder-open"></i></div>
          <h3>Kho văn bản — Tra cứu &amp; Quản lý</h3>
          <i class="fas fa-chevron-down dvh-chevron"></i>
        </div>
        <div class="dvh-section-body">
          <div class="dvh-steps">
            <div class="dvh-step"><div class="dvh-step-num">1</div><div class="dvh-step-content"><strong>Xem toàn bộ văn bản</strong><span>Vào menu "Kho văn bản" → Bảng hiển thị tất cả văn bản đã nhập, sắp xếp theo ngày mới nhất</span></div></div>
            <div class="dvh-step"><div class="dvh-step-num">2</div><div class="dvh-step-content"><strong>Lọc nhanh</strong><span>Dùng ô tìm kiếm (theo tiêu đề) hoặc dropdown "Lọc loại văn bản"</span></div></div>
            <div class="dvh-step"><div class="dvh-step-num">3</div><div class="dvh-step-content"><strong>Thao tác với văn bản</strong><span>Mỗi hàng có nút: <i class="fas fa-eye"></i> Xem chi tiết · <i class="fas fa-edit"></i> Chỉnh sửa · <i class="fas fa-robot"></i> Hỏi AI · <i class="fas fa-trash"></i> Xóa</span></div></div>
            <div class="dvh-step"><div class="dvh-step-num">4</div><div class="dvh-step-content"><strong>Xem chi tiết — Hỏi AI về văn bản</strong><span>Mở popup chi tiết → Tab "Hỏi AI" → Gõ câu hỏi bằng tiếng Việt, AI trả lời dựa trên nội dung văn bản đó</span></div></div>
          </div>
          <div class="dvh-tip info"><i class="fas fa-info-circle"></i><div><strong>Màu cờ ưu tiên:</strong> 🔴 Đỏ = Khẩn cấp · 🟠 Cam = Quan trọng · 🟢 Xanh = Thông thường. Văn bản sắp đến hạn sẽ hiện cảnh báo tự động.</div></div>
        </div>
      </div>

      <div class="dvh-section">
        <div class="dvh-section-head" onclick="dvhToggle(this)">
          <div class="dvh-section-icon" style="background:rgba(212,160,23,0.1);color:#d4a017"><i class="fas fa-archive"></i></div>
          <h3>Danh mục văn bản — Phân loại theo tủ hồ sơ</h3>
          <i class="fas fa-chevron-down dvh-chevron"></i>
        </div>
        <div class="dvh-section-body">
          <p>Màn hình "Danh mục văn bản" hiển thị văn bản được phân nhóm theo <strong>loại</strong> (Chỉ thị, Nghị quyết, Kế hoạch...) dạng thẻ bìa hồ sơ. Nhấn vào từng thẻ để xem danh sách văn bản trong nhóm đó.</p>
          <div class="dvh-tip info"><i class="fas fa-lightbulb"></i><div>Phù hợp để tra cứu nhanh khi biết loại văn bản cần tìm nhưng không nhớ tiêu đề chính xác.</div></div>
        </div>
      </div>

      <div class="dvh-section">
        <div class="dvh-section-head" onclick="dvhToggle(this)">
          <div class="dvh-section-icon" style="background:rgba(124,58,237,0.08);color:#7c3aed"><i class="fas fa-search-plus"></i></div>
          <h3>Tìm kiếm nâng cao</h3>
          <i class="fas fa-chevron-down dvh-chevron"></i>
        </div>
        <div class="dvh-section-body">
          <p style="margin-bottom:10px">Vào menu "Tìm kiếm nâng cao" hoặc nhấn <kbd>Ctrl</kbd>+<kbd>F</kbd>. Tìm kiếm theo nhiều điều kiện kết hợp:</p>
          <ul style="padding-left:18px;line-height:2">
            <li>Từ khóa trong tiêu đề hoặc nội dung</li>
            <li>Loại văn bản (chỉ thị, kế hoạch...)</li>
            <li>Khoảng thời gian ban hành</li>
            <li>Cơ quan ban hành</li>
            <li>Mức ưu tiên</li>
            <li>Trạng thái hạn (còn hạn / quá hạn / sắp hạn)</li>
          </ul>
          <div class="dvh-tip success"><i class="fas fa-bolt"></i><div>Phím tắt <kbd>Ctrl</kbd>+<kbd>F</kbd> mở trang Tìm kiếm nâng cao từ bất kỳ đâu trong phần mềm.</div></div>
        </div>
      </div>
    `;
  }

  function buildTasks() {
    return `
      <div class="dvh-section open">
        <div class="dvh-section-head" onclick="dvhToggle(this)">
          <div class="dvh-section-icon" style="background:rgba(22,163,74,0.08);color:#16a34a"><i class="fas fa-tasks"></i></div>
          <h3>Quản lý công việc — Kanban Board</h3>
          <i class="fas fa-chevron-down dvh-chevron"></i>
        </div>
        <div class="dvh-section-body">
          <p style="margin-bottom:10px">Công việc được tổ chức theo 4 cột trạng thái kiểu Kanban:</p>
          <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:14px">
            <div style="background:#f0fdf4;border:1.5px solid #bbf7d0;border-radius:10px;padding:12px">
              <strong style="color:#16a34a">📋 Cần làm</strong><br>
              <span style="font-size:0.76rem;color:#6b7280">Công việc mới, chưa bắt đầu</span>
            </div>
            <div style="background:#eff6ff;border:1.5px solid #bfdbfe;border-radius:10px;padding:12px">
              <strong style="color:#1d4ed8">⚙️ Đang làm</strong><br>
              <span style="font-size:0.76rem;color:#6b7280">Đang trong tiến trình thực hiện</span>
            </div>
            <div style="background:#fefce8;border:1.5px solid #fde68a;border-radius:10px;padding:12px">
              <strong style="color:#d97706">👁️ Đang duyệt</strong><br>
              <span style="font-size:0.76rem;color:#6b7280">Chờ xét duyệt, phê duyệt</span>
            </div>
            <div style="background:#f5f3ff;border:1.5px solid #ddd6fe;border-radius:10px;padding:12px">
              <strong style="color:#7c3aed">✅ Hoàn thành</strong><br>
              <span style="font-size:0.76rem;color:#6b7280">Đã xong, đã được nghiệm thu</span>
            </div>
          </div>
          <div class="dvh-steps">
            <div class="dvh-step"><div class="dvh-step-num">1</div><div class="dvh-step-content"><strong>Thêm công việc mới</strong><span>Nhấn <kbd>+ Thêm công việc</kbd> trong trang Quản lý công việc hoặc dùng nút FAB (⊕) → "Thêm công việc"</span></div></div>
            <div class="dvh-step"><div class="dvh-step-num">2</div><div class="dvh-step-content"><strong>Điền thông tin</strong><span>Tiêu đề (*), Mô tả, Deadline, Phân công cho đoàn viên, Mức ưu tiên, Gắn thẻ tag</span></div></div>
            <div class="dvh-step"><div class="dvh-step-num">3</div><div class="dvh-step-content"><strong>Chuyển trạng thái</strong><span>Nhấn nút trên thẻ công việc để chuyển sang trạng thái tiếp theo. Logic: Cần làm → Đang làm → Đang duyệt → Hoàn thành</span></div></div>
            <div class="dvh-step"><div class="dvh-step-num">4</div><div class="dvh-step-content"><strong>AI hỗ trợ</strong><span>Nhấn <i class="fas fa-robot"></i> trên thẻ công việc → AI phân tích và đề xuất cách thực hiện, ước tính thời gian</span></div></div>
          </div>
          <div class="dvh-tip warn"><i class="fas fa-bell"></i><div>Công việc có deadline trong <strong>3 ngày</strong> sẽ hiện cảnh báo trên Bảng điều khiển và biểu tượng lịch nhắc.</div></div>
        </div>
      </div>

      <div class="dvh-section">
        <div class="dvh-section-head" onclick="dvhToggle(this)">
          <div class="dvh-section-icon" style="background:rgba(26,35,64,0.08);color:#1a2340"><i class="fas fa-calendar-alt"></i></div>
          <h3>Lịch nhắc việc</h3>
          <i class="fas fa-chevron-down dvh-chevron"></i>
        </div>
        <div class="dvh-section-body">
          <p style="margin-bottom:10px">Hiển thị lịch tháng với các mốc quan trọng: deadline văn bản, ngày thực hiện công việc, các sự kiện Đoàn.</p>
          <div class="dvh-steps">
            <div class="dvh-step"><div class="dvh-step-num">1</div><div class="dvh-step-content"><strong>Xem lịch</strong><span>Nhấn vào ô ngày để xem chi tiết sự kiện/văn bản/công việc trong ngày đó</span></div></div>
            <div class="dvh-step"><div class="dvh-step-num">2</div><div class="dvh-step-content"><strong>Thêm nhắc việc</strong><span>Nhấn <kbd>+ Thêm nhắc</kbd> → Điền tiêu đề, ngày, giờ nhắc, ghi chú</span></div></div>
            <div class="dvh-step"><div class="dvh-step-num">3</div><div class="dvh-step-content"><strong>Nhắc việc nhanh</strong><span>Dùng nút FAB (⊕) → "Nhắc việc" để thêm nhắc nhanh từ bất kỳ trang nào</span></div></div>
          </div>
          <div class="dvh-tip info"><i class="fas fa-palette"></i><div><strong>Màu sắc trên lịch:</strong> 🔴 Đỏ = Deadline khẩn · 🔵 Xanh = Công việc · 🟡 Vàng = Nhắc việc thủ công</div></div>
        </div>
      </div>
    `;
  }

  function buildReports() {
    return `
      <div class="dvh-section open">
        <div class="dvh-section-head" onclick="dvhToggle(this)">
          <div class="dvh-section-icon" style="background:rgba(26,35,64,0.08);color:#1a2340"><i class="fas fa-clipboard-list"></i></div>
          <h3>Tổng hợp trích yếu</h3>
          <i class="fas fa-chevron-down dvh-chevron"></i>
        </div>
        <div class="dvh-section-body">
          <p style="margin-bottom:10px">Tạo bản tổng hợp văn bản và hoạt động theo giai đoạn. Có <strong>3 tab:</strong></p>
          <div class="dvh-steps">
            <div class="dvh-step"><div class="dvh-step-num">1</div><div class="dvh-step-content"><strong>Tab "Trích yếu văn bản"</strong><span>Lọc theo khoảng ngày + loại văn bản → Nhấn "Lọc" → Xem danh sách trích yếu bên trái. Nhấn "Tổng hợp bằng AI" để AI tự viết bản tổng hợp hoàn chỉnh.</span></div></div>
            <div class="dvh-step"><div class="dvh-step-num">2</div><div class="dvh-step-content"><strong>Tab "Hoạt động đoàn viên"</strong><span>Lọc theo ngày, loại hoạt động, tên đoàn viên → Xem danh sách và thống kê. Nhấn "In" để in báo cáo.</span></div></div>
            <div class="dvh-step"><div class="dvh-step-num">3</div><div class="dvh-step-content"><strong>Tab "Báo cáo tháng/quý"</strong><span>Chọn loại kỳ (tháng/quý/theo hoạt động) → Chọn kỳ cụ thể → Điền tên đơn vị → Nhấn "Tạo báo cáo" → AI tự điền đầy đủ nội dung theo mẫu chuẩn.</span></div></div>
            <div class="dvh-step"><div class="dvh-step-num">4</div><div class="dvh-step-content"><strong>Xuất báo cáo</strong><span>Nhấn "Xuất báo cáo" để tải về tệp PDF/Word hoặc "In" để in trực tiếp</span></div></div>
          </div>
        </div>
      </div>

      <div class="dvh-section">
        <div class="dvh-section-head" onclick="dvhToggle(this)">
          <div class="dvh-section-icon" style="background:rgba(192,57,43,0.08);color:#c0392b"><i class="fas fa-chart-bar"></i></div>
          <h3>Báo cáo thành tích</h3>
          <i class="fas fa-chevron-down dvh-chevron"></i>
        </div>
        <div class="dvh-section-body">
          <p>Tạo báo cáo thành tích hoạt động Đoàn theo mẫu chuẩn với AI hỗ trợ soạn thảo.</p>
          <div class="dvh-steps">
            <div class="dvh-step"><div class="dvh-step-num">1</div><div class="dvh-step-content"><strong>Chọn giai đoạn &amp; hạng mục báo cáo</strong><span>Học kỳ, năm học, các phong trào trọng tâm cần đề cập</span></div></div>
            <div class="dvh-step"><div class="dvh-step-num">2</div><div class="dvh-step-content"><strong>Nhấn "AI soạn báo cáo"</strong><span>AI Gemini tự động soạn toàn bộ nội dung báo cáo dựa trên dữ liệu thực của đơn vị</span></div></div>
            <div class="dvh-step"><div class="dvh-step-num">3</div><div class="dvh-step-content"><strong>Chỉnh sửa và xuất</strong><span>Đọc lại, chỉnh sửa nếu cần, sau đó xuất Word/PDF hoặc in</span></div></div>
          </div>
        </div>
      </div>

      <div class="dvh-section">
        <div class="dvh-section-head" onclick="dvhToggle(this)">
          <div class="dvh-section-icon" style="background:rgba(124,58,237,0.08);color:#7c3aed"><i class="fas fa-chart-pie"></i></div>
          <h3>Thống kê phân tích</h3>
          <i class="fas fa-chevron-down dvh-chevron"></i>
        </div>
        <div class="dvh-section-body">
          <p style="margin-bottom:10px">Biểu đồ trực quan về toàn bộ hoạt động của đơn vị Đoàn:</p>
          <ul style="padding-left:18px;line-height:2">
            <li>Số lượng văn bản theo loại (biểu đồ tròn)</li>
            <li>Xu hướng nhập văn bản theo tháng (biểu đồ cột)</li>
            <li>Tỷ lệ hoàn thành công việc</li>
            <li>Thống kê hoạt động đoàn viên</li>
            <li>Phân tích ưu tiên văn bản tồn đọng</li>
          </ul>
          <div class="dvh-tip info"><i class="fas fa-sync-alt"></i><div>Biểu đồ cập nhật tự động mỗi khi bạn vào trang này. Nhấn <kbd>F5</kbd> để làm mới thủ công.</div></div>
        </div>
      </div>
    `;
  }

  function buildAI() {
    return `
      <div class="dvh-section open">
        <div class="dvh-section-head" onclick="dvhToggle(this)">
          <div class="dvh-section-icon" style="background:rgba(212,160,23,0.1);color:#d4a017"><i class="fas fa-brain"></i></div>
          <h3>Kiến trúc AI Engine 3 tầng</h3>
          <span class="dvh-badge" style="background:#fef3c7;color:#d97706">Tự động</span>
          <i class="fas fa-chevron-down dvh-chevron"></i>
        </div>
        <div class="dvh-section-body">
          <p style="margin-bottom:12px">AI Engine hoạt động hoàn toàn tự động — bạn không cần chọn model. Hệ thống tự thử từng tầng theo thứ tự:</p>
          <div class="dvh-steps">
            <div class="dvh-step">
              <div class="dvh-step-num" style="background:#16a34a">1</div>
              <div class="dvh-step-content">
                <strong>Gemini 2.5 Flash-Lite (Primary)</strong>
                <span>15 req/phút · 1.000 req/ngày · Nhanh nhất, tiết kiệm quota nhất. Dùng trước tiên.</span>
              </div>
            </div>
            <div class="dvh-step">
              <div class="dvh-step-num" style="background:#d97706">2</div>
              <div class="dvh-step-content">
                <strong>Gemini 2.5 Flash (Fallback 1)</strong>
                <span>10 req/phút · 250 req/ngày · Tự động dùng khi Flash-Lite hết quota. Chất lượng cao hơn.</span>
              </div>
            </div>
            <div class="dvh-step">
              <div class="dvh-step-num" style="background:#1d4ed8">3</div>
              <div class="dvh-step-content">
                <strong>Gemini 2.0 Flash (Fallback 2)</strong>
                <span>15 req/phút · 1.500 req/ngày · Cực kỳ ổn định, dùng khi 2 model trên đều hết quota.</span>
              </div>
            </div>
            <div class="dvh-step">
              <div class="dvh-step-num" style="background:#6b7280">4</div>
              <div class="dvh-step-content">
                <strong>Offline NLP Engine (Fallback cuối)</strong>
                <span>Không cần internet, không quota. 18 công cụ nội bộ: phân loại, trích xuất deadline, tóm tắt, gợi ý hoạt động, hỏi đáp về Đoàn...</span>
              </div>
            </div>
          </div>
          <div class="dvh-tip info"><i class="fas fa-redo"></i><div><strong>Retry logic:</strong> Mỗi model thử tối đa 3 lần, chờ lần lượt 1.2s → 2.4s → 4.8s giữa các lần. Khi gặp lỗi 429 (hết quota), tự chuyển xuống tầng tiếp theo.</div></div>
        </div>
      </div>

      <div class="dvh-section open">
        <div class="dvh-section-head" onclick="dvhToggle(this)">
          <div class="dvh-section-icon" style="background:rgba(192,57,43,0.08);color:#c0392b"><i class="fas fa-key"></i></div>
          <h3>Lấy Gemini API Key miễn phí</h3>
          <span class="dvh-badge" style="background:#fee2e2;color:#c0392b">Bắt buộc</span>
          <i class="fas fa-chevron-down dvh-chevron"></i>
        </div>
        <div class="dvh-section-body">
          <div class="dvh-tip warn"><i class="fas fa-exclamation-triangle"></i><div>API Key phải được cấu hình trước khi dùng bất kỳ tính năng AI nào. Không có API Key, phần mềm vẫn hoạt động nhưng chỉ dùng Offline NLP Engine.</div></div>
          <div class="dvh-steps">
            <div class="dvh-step"><div class="dvh-step-num">1</div><div class="dvh-step-content"><strong>Truy cập Google AI Studio</strong><span>Mở <strong>aistudio.google.com</strong> — đăng nhập bằng tài khoản Google</span></div></div>
            <div class="dvh-step"><div class="dvh-step-num">2</div><div class="dvh-step-content"><strong>Tạo API Key</strong><span>Góc trái → <kbd>Get API Key</kbd> → <kbd>Create API key in new project</kbd> (hoặc chọn project có sẵn)</span></div></div>
            <div class="dvh-step"><div class="dvh-step-num">3</div><div class="dvh-step-content"><strong>Sao chép API Key</strong><span>Key có dạng <code>AIza...</code> (khoảng 39 ký tự). Lưu ý: Key này là riêng tư, không chia sẻ!</span></div></div>
            <div class="dvh-step"><div class="dvh-step-num">4</div><div class="dvh-step-content"><strong>Dán vào phần mềm</strong><span>Phần mềm → <kbd>Cài đặt &amp; API</kbd> → Ô "Gemini API Key" → Dán key vào → Nhấn <kbd>Kiểm tra kết nối</kbd> → <kbd>Lưu cài đặt</kbd></span></div></div>
          </div>
          <div class="dvh-ext-box">
            <div class="dvh-ext-box-title"><div class="dvh-ext-icon">🤖</div> Google AI Studio — Lấy API Key</div>
            <div style="font-size:0.78rem;color:#6b7280">Miễn phí với giới hạn sử dụng hàng ngày. Không cần thẻ tín dụng cho gói Free Tier.</div>
            <a class="dvh-ext-link" href="https://aistudio.google.com/apikey" target="_blank"><i class="fas fa-external-link-alt"></i> Lấy API Key tại đây</a>
          </div>
          <div class="dvh-tip success"><i class="fas fa-chart-bar"></i><div><strong>Theo dõi quota:</strong> Vào Cài đặt → Nhấn "Xem quota" để kiểm tra số lần đã dùng trong ngày. Có thể nhấn "Reset đếm" để bắt đầu đếm lại vào ngày mới.</div></div>
        </div>
      </div>

      <div class="dvh-section">
        <div class="dvh-section-head" onclick="dvhToggle(this)">
          <div class="dvh-section-icon" style="background:rgba(22,163,74,0.08);color:#16a34a"><i class="fas fa-list-ul"></i></div>
          <h3>Các tính năng AI trong phần mềm</h3>
          <i class="fas fa-chevron-down dvh-chevron"></i>
        </div>
        <div class="dvh-section-body">
          <div style="display:flex;flex-direction:column;gap:8px">
            <div style="display:flex;align-items:center;gap:10px;padding:10px;background:#f9fafb;border-radius:8px;border:1px solid #f0f0f0">
              <i class="fas fa-file-search" style="color:#c0392b;width:18px;text-align:center"></i>
              <div><strong style="font-size:0.82rem">Phân tích văn bản khi tải lên</strong><span style="font-size:0.75rem;color:#6b7280;display:block">Tự động trích xuất: tiêu đề, ký hiệu, ngày ban hành, hạn xử lý, cơ quan, phân loại</span></div>
            </div>
            <div style="display:flex;align-items:center;gap:10px;padding:10px;background:#f9fafb;border-radius:8px;border:1px solid #f0f0f0">
              <i class="fas fa-comments" style="color:#d4a017;width:18px;text-align:center"></i>
              <div><strong style="font-size:0.82rem">Hỏi đáp về văn bản cụ thể</strong><span style="font-size:0.75rem;color:#6b7280;display:block">Mở chi tiết văn bản → Tab Hỏi AI → Đặt câu hỏi bằng tiếng Việt về nội dung văn bản đó</span></div>
            </div>
            <div style="display:flex;align-items:center;gap:10px;padding:10px;background:#f9fafb;border-radius:8px;border:1px solid #f0f0f0">
              <i class="fas fa-file-contract" style="color:#1a2340;width:18px;text-align:center"></i>
              <div><strong style="font-size:0.82rem">Tổng hợp trích yếu tự động</strong><span style="font-size:0.75rem;color:#6b7280;display:block">Tổng hợp trích yếu → Nhấn "Tổng hợp bằng AI" → Bản tổng hợp hoàn chỉnh theo giai đoạn lọc</span></div>
            </div>
            <div style="display:flex;align-items:center;gap:10px;padding:10px;background:#f9fafb;border-radius:8px;border:1px solid #f0f0f0">
              <i class="fas fa-pen-fancy" style="color:#7c3aed;width:18px;text-align:center"></i>
              <div><strong style="font-size:0.82rem">Soạn báo cáo thành tích</strong><span style="font-size:0.75rem;color:#6b7280;display:block">Báo cáo thành tích → AI soạn toàn bộ báo cáo theo mẫu chuẩn của Đoàn</span></div>
            </div>
            <div style="display:flex;align-items:center;gap:10px;padding:10px;background:#f9fafb;border-radius:8px;border:1px solid #f0f0f0">
              <i class="fas fa-layer-group" style="color:#16a34a;width:18px;text-align:center"></i>
              <div><strong style="font-size:0.82rem">Tạo nội dung theo mẫu văn bản</strong><span style="font-size:0.75rem;color:#6b7280;display:block">Mẫu văn bản → Chọn mẫu → AI điền nội dung phù hợp theo thông tin đơn vị</span></div>
            </div>
            <div style="display:flex;align-items:center;gap:10px;padding:10px;background:#f9fafb;border-radius:8px;border:1px solid #f0f0f0">
              <i class="fas fa-lightbulb" style="color:#d97706;width:18px;text-align:center"></i>
              <div><strong style="font-size:0.82rem">Gợi ý hoạt động Đoàn</strong><span style="font-size:0.75rem;color:#6b7280;display:block">Bảng điều khiển → AI Assistant → Hỏi về kế hoạch hoạt động, sự kiện phù hợp</span></div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function buildGSheet() {
    return `
      <div class="dvh-section open">
        <div class="dvh-section-head" onclick="dvhToggle(this)">
          <div class="dvh-section-icon" style="background:rgba(22,163,74,0.08);color:#16a34a"><i class="fas fa-table"></i></div>
          <h3>Tại sao cần Google Sheet?</h3>
          <i class="fas fa-chevron-down dvh-chevron"></i>
        </div>
        <div class="dvh-section-body">
          <p>Phần mềm ĐoànVăn lưu toàn bộ dữ liệu lên <strong>Google Sheet</strong> của bạn — không lưu trên server của bên thứ ba. Điều này có nghĩa:</p>
          <div class="dvh-feat-grid" style="margin:12px 0">
            <div class="dvh-feat-card">
              <i class="fas fa-user-shield" style="color:#16a34a"></i>
              <strong>Dữ liệu thuộc về bạn</strong>
              <span>Tổ chức Đoàn hoàn toàn kiểm soát dữ liệu, không phụ thuộc server của chúng tôi</span>
            </div>
            <div class="dvh-feat-card">
              <i class="fas fa-users" style="color:#1a7fcb"></i>
              <strong>Chia sẻ nhiều người</strong>
              <span>Nhiều thiết bị, nhiều thành viên cùng truy cập và đồng bộ dữ liệu thời gian thực</span>
            </div>
            <div class="dvh-feat-card">
              <i class="fas fa-cloud" style="color:#7c3aed"></i>
              <strong>Sao lưu tự động</strong>
              <span>Google tự động sao lưu, khôi phục được phiên bản trước nếu có sự cố</span>
            </div>
          </div>
        </div>
      </div>

      <div class="dvh-section open">
        <div class="dvh-section-head" onclick="dvhToggle(this)">
          <div class="dvh-section-icon" style="background:rgba(26,35,64,0.08);color:#1a2340"><i class="fas fa-cogs"></i></div>
          <h3>Thiết lập Google Sheet + Apps Script</h3>
          <span class="dvh-badge" style="background:#fee2e2;color:#c0392b">Cần làm 1 lần</span>
          <i class="fas fa-chevron-down dvh-chevron"></i>
        </div>
        <div class="dvh-section-body">
          <div class="dvh-ext-box" style="margin-bottom:12px">
            <div class="dvh-ext-box-title"><div class="dvh-ext-icon">📊</div> Bước 1: Tạo Google Sheet mới</div>
            <div style="font-size:0.78rem;color:#6b7280;margin-bottom:6px">Truy cập sheets.google.com → Tạo bảng tính trống → Đặt tên (VD: "ĐoànVăn Database") → <strong>Sao chép Sheet ID</strong> từ URL (phần giữa /d/ và /edit trong thanh địa chỉ)</div>
            <a class="dvh-ext-link" href="https://sheets.google.com/create" target="_blank"><i class="fas fa-plus"></i> Tạo Google Sheet mới</a>
          </div>

          <div class="dvh-ext-box" style="margin-bottom:12px">
            <div class="dvh-ext-box-title"><div class="dvh-ext-icon">⚙️</div> Bước 2: Tạo Google Apps Script</div>
            <div style="font-size:0.78rem;color:#6b7280;margin-bottom:6px">Trong Google Sheet vừa tạo:</div>
            <div class="dvh-steps" style="margin:0">
              <div class="dvh-step"><div class="dvh-step-num" style="background:#1a7fcb">a</div><div class="dvh-step-content"><strong>Mở Apps Script</strong><span>Menu → <kbd>Tiện ích mở rộng</kbd> → <kbd>Apps Script</kbd></span></div></div>
              <div class="dvh-step"><div class="dvh-step-num" style="background:#1a7fcb">b</div><div class="dvh-step-content"><strong>Dán code GAS vào</strong><span>Xóa code mẫu → Dán code Google Apps Script của ĐoànVăn vào (liên hệ Admin để lấy code)</span></div></div>
              <div class="dvh-step"><div class="dvh-step-num" style="background:#1a7fcb">c</div><div class="dvh-step-content"><strong>Triển khai Web App</strong><span><kbd>Triển khai</kbd> → <kbd>Triển khai mới</kbd> → Loại: <strong>Ứng dụng web</strong> → Thực thi là: <em>Tôi</em> → Quyền truy cập: <em>Mọi người</em> → <kbd>Triển khai</kbd></span></div></div>
              <div class="dvh-step"><div class="dvh-step-num" style="background:#1a7fcb">d</div><div class="dvh-step-content"><strong>Sao chép Web App URL</strong><span>URL có dạng <code>https://script.google.com/macros/s/.../exec</code> — đây là GAS URL cần điền vào phần mềm</span></div></div>
            </div>
          </div>

          <div class="dvh-ext-box">
            <div class="dvh-ext-box-title"><div class="dvh-ext-icon">🔗</div> Bước 3: Điền vào phần mềm</div>
            <div style="font-size:0.78rem;color:#6b7280;margin-bottom:6px">Phần mềm → <kbd>Cài đặt &amp; API</kbd> → Dán <strong>GAS URL</strong> và <strong>Sheet ID</strong> → Nhấn <kbd>Kiểm tra kết nối</kbd> → <kbd>Lưu cài đặt</kbd></div>
          </div>

          <div class="dvh-tip success"><i class="fas fa-sync-alt"></i><div><strong>Đồng bộ dữ liệu:</strong> Phần mềm tự đồng bộ mỗi khi có thay đổi. Có thể đồng bộ thủ công tại Cài đặt → Nhấn "Đồng bộ" hoặc vào sidebar → <em>Đồng bộ dữ liệu</em>.</div></div>
          <div class="dvh-tip warn"><i class="fas fa-exclamation-triangle"></i><div>Nếu GAS URL hết hạn (Google Apps Script có thể hết hạn sau 1 năm), cần vào Google Apps Script → Triển khai → Quản lý → Tạo phiên bản mới → Cập nhật URL mới vào phần mềm.</div></div>
        </div>
      </div>

      <div class="dvh-section">
        <div class="dvh-section-head" onclick="dvhToggle(this)">
          <div class="dvh-section-icon" style="background:rgba(217,119,6,0.08);color:#d97706"><i class="fas fa-question-circle"></i></div>
          <h3>Xử lý sự cố kết nối Google Sheet</h3>
          <i class="fas fa-chevron-down dvh-chevron"></i>
        </div>
        <div class="dvh-section-body">
          <div style="display:flex;flex-direction:column;gap:8px">
            <div style="padding:10px;background:#fefce8;border:1px solid #fde68a;border-radius:8px;font-size:0.78rem">
              <strong style="color:#92400e">❌ Lỗi "Không kết nối được Google Sheet"</strong><br>
              <span style="color:#78350f">→ Kiểm tra GAS URL đã đúng chưa (không có dấu cách, không bị cắt bớt)<br>→ Vào Google Apps Script xem thử đã triển khai chưa, quyền truy cập có phải "Mọi người" không</span>
            </div>
            <div style="padding:10px;background:#fef2f2;border:1px solid #fecaca;border-radius:8px;font-size:0.78rem">
              <strong style="color:#7f1d1d">❌ Lỗi "Script đã hết hạn"</strong><br>
              <span style="color:#7f1d1d">→ Vào Apps Script → Triển khai → Quản lý triển khai → Chỉnh sửa → Tạo phiên bản mới → Triển khai lại → Sao chép URL mới → Cập nhật trong Cài đặt phần mềm</span>
            </div>
            <div style="padding:10px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;font-size:0.78rem">
              <strong style="color:#14532d">✅ Khi kết nối thành công</strong><br>
              <span style="color:#15803d">→ Thanh trạng thái trong Cài đặt chuyển sang màu xanh · Dot xanh · Dữ liệu đồng bộ 2 chiều</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function buildMembers() {
    return `
      <div class="dvh-section open">
        <div class="dvh-section-head" onclick="dvhToggle(this)">
          <div class="dvh-section-icon" style="background:rgba(192,57,43,0.08);color:#c0392b"><i class="fas fa-users"></i></div>
          <h3>Quản lý hồ sơ đoàn viên</h3>
          <i class="fas fa-chevron-down dvh-chevron"></i>
        </div>
        <div class="dvh-section-body">
          <div class="dvh-steps">
            <div class="dvh-step"><div class="dvh-step-num">1</div><div class="dvh-step-content"><strong>Xem danh sách đoàn viên</strong><span>Vào menu "Quản lý đoàn viên" → Bảng hiển thị tên, chi đoàn, ngày vào Đoàn, trạng thái, điểm rèn luyện</span></div></div>
            <div class="dvh-step"><div class="dvh-step-num">2</div><div class="dvh-step-content"><strong>Thêm đoàn viên mới</strong><span>Nhấn <kbd>+ Thêm đoàn viên</kbd> → Điền đầy đủ thông tin cá nhân, chi đoàn, ngày kết nạp</span></div></div>
            <div class="dvh-step"><div class="dvh-step-num">3</div><div class="dvh-step-content"><strong>Ghi nhận hoạt động</strong><span>Chọn đoàn viên → Tab "Hoạt động" → Thêm hoạt động (loại, ngày, mô tả, điểm cộng)</span></div></div>
            <div class="dvh-step"><div class="dvh-step-num">4</div><div class="dvh-step-content"><strong>Phân công công việc</strong><span>Khi tạo công việc trong "Quản lý công việc", chọn đoàn viên phụ trách tại trường "Phân công"</span></div></div>
            <div class="dvh-step"><div class="dvh-step-num">5</div><div class="dvh-step-content"><strong>Xuất danh sách</strong><span>Nhấn <kbd>Xuất Excel</kbd> để tải về danh sách đoàn viên dạng bảng tính</span></div></div>
          </div>
          <div class="dvh-tip info"><i class="fas fa-star"></i><div><strong>Điểm rèn luyện:</strong> Tự động tính dựa trên hoạt động đã ghi nhận. Xem thống kê điểm tại tab "Thống kê" trong trang Quản lý đoàn viên.</div></div>
        </div>
      </div>

      <div class="dvh-section">
        <div class="dvh-section-head" onclick="dvhToggle(this)">
          <div class="dvh-section-icon" style="background:rgba(26,35,64,0.08);color:#1a2340"><i class="fas fa-layer-group"></i></div>
          <h3>Mẫu văn bản</h3>
          <i class="fas fa-chevron-down dvh-chevron"></i>
        </div>
        <div class="dvh-section-body">
          <p style="margin-bottom:10px">Thư viện mẫu chuẩn của các loại văn bản Đoàn — AI có thể điền nội dung tự động.</p>
          <div class="dvh-steps">
            <div class="dvh-step"><div class="dvh-step-num">1</div><div class="dvh-step-content"><strong>Chọn mẫu văn bản</strong><span>Vào "Mẫu văn bản" → Chọn loại cần soạn (Kế hoạch, Báo cáo, Thông báo...)</span></div></div>
            <div class="dvh-step"><div class="dvh-step-num">2</div><div class="dvh-step-content"><strong>Điền thông số</strong><span>Nhập chủ đề, ngày, tên đơn vị và các thông tin đặc thù của văn bản</span></div></div>
            <div class="dvh-step"><div class="dvh-step-num">3</div><div class="dvh-step-content"><strong>Nhấn "AI tạo nội dung"</strong><span>Gemini AI điền đầy đủ nội dung theo đúng cấu trúc mẫu chuẩn của Đoàn</span></div></div>
            <div class="dvh-step"><div class="dvh-step-num">4</div><div class="dvh-step-content"><strong>Chỉnh sửa và lưu/in</strong><span>Xem lại, chỉnh sửa nội dung nếu cần → Lưu vào Kho văn bản hoặc In trực tiếp</span></div></div>
          </div>
        </div>
      </div>
    `;
  }

  function buildAdmin() {
    return `
      <div class="dvh-section open">
        <div class="dvh-section-head" onclick="dvhToggle(this)">
          <div class="dvh-section-icon" style="background:rgba(212,160,23,0.1);color:#d4a017"><i class="fas fa-crown"></i></div>
          <h3>Phân quyền trong hệ thống</h3>
          <i class="fas fa-chevron-down dvh-chevron"></i>
        </div>
        <div class="dvh-section-body">
          <table class="dvh-role-table">
            <thead>
              <tr><th>Chức năng</th><th>Admin</th><th>Quản lý</th><th>Đoàn viên</th></tr>
            </thead>
            <tbody>
              <tr><td>Xem &amp; Tìm kiếm văn bản</td><td class="dvh-ok">✔</td><td class="dvh-ok">✔</td><td class="dvh-ok">✔</td></tr>
              <tr><td>Nhập văn bản mới</td><td class="dvh-ok">✔</td><td class="dvh-ok">✔</td><td class="dvh-ok">✔</td></tr>
              <tr><td>Chỉnh sửa văn bản</td><td class="dvh-ok">✔</td><td class="dvh-ok">✔</td><td class="dvh-no">—</td></tr>
              <tr><td>Xóa văn bản</td><td class="dvh-ok">✔</td><td class="dvh-no">—</td><td class="dvh-no">—</td></tr>
              <tr><td>Quản lý công việc</td><td class="dvh-ok">✔</td><td class="dvh-ok">✔</td><td class="dvh-ok">✔ (của mình)</td></tr>
              <tr><td>Xem báo cáo &amp; thống kê</td><td class="dvh-ok">✔</td><td class="dvh-ok">✔</td><td class="dvh-ok">✔</td></tr>
              <tr><td>Cấu hình API Key riêng</td><td class="dvh-ok">✔</td><td class="dvh-ok">✔</td><td class="dvh-ok">✔</td></tr>
              <tr><td>Quản lý đoàn viên</td><td class="dvh-ok">✔</td><td class="dvh-ok">✔</td><td class="dvh-no">—</td></tr>
              <tr><td>Tạo mã mời người dùng mới</td><td class="dvh-ok">✔</td><td class="dvh-no">—</td><td class="dvh-no">—</td></tr>
              <tr><td>Cài đặt hệ thống toàn cục</td><td class="dvh-ok">✔</td><td class="dvh-no">—</td><td class="dvh-no">—</td></tr>
              <tr><td>Đồng bộ dữ liệu thủ công</td><td class="dvh-ok">✔</td><td class="dvh-ok">✔</td><td class="dvh-no">—</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="dvh-section">
        <div class="dvh-section-head" onclick="dvhToggle(this)">
          <div class="dvh-section-icon" style="background:rgba(192,57,43,0.08);color:#c0392b"><i class="fas fa-user-plus"></i></div>
          <h3>Tạo &amp; Quản lý người dùng (Admin)</h3>
          <i class="fas fa-chevron-down dvh-chevron"></i>
        </div>
        <div class="dvh-section-body">
          <div class="dvh-steps">
            <div class="dvh-step"><div class="dvh-step-num">1</div><div class="dvh-step-content"><strong>Vào Người dùng &amp; Mã mời</strong><span>Sidebar → Quản trị hệ thống → "Người dùng &amp; Mã mời" (chỉ hiện với Admin)</span></div></div>
            <div class="dvh-step"><div class="dvh-step-num">2</div><div class="dvh-step-content"><strong>Tạo Mã mời</strong><span>Nhấn "Tạo mã mời mới" → Chọn vai trò (Quản lý/Đoàn viên) → Đặt thời hạn → Sao chép mã gửi cho người dùng</span></div></div>
            <div class="dvh-step"><div class="dvh-step-num">3</div><div class="dvh-step-content"><strong>Xem danh sách người dùng</strong><span>Danh sách hiển thị tất cả tài khoản đã tham gia, vai trò, lần đăng nhập cuối</span></div></div>
            <div class="dvh-step"><div class="dvh-step-num">4</div><div class="dvh-step-content"><strong>Thay đổi vai trò hoặc vô hiệu hóa</strong><span>Nhấn vào người dùng → Chọn "Đổi vai trò" hoặc "Vô hiệu hóa tài khoản"</span></div></div>
          </div>
          <div class="dvh-tip warn"><i class="fas fa-shield-alt"></i><div>Mã mời có hiệu lực một lần duy nhất và hết hạn sau thời gian thiết lập. Không chia sẻ mã mời ra ngoài tổ chức.</div></div>
        </div>
      </div>
    `;
  }

  function buildShortcuts() {
    return `
      <div class="dvh-section open">
        <div class="dvh-section-head" onclick="dvhToggle(this)">
          <div class="dvh-section-icon" style="background:rgba(26,35,64,0.08);color:#1a2340"><i class="fas fa-keyboard"></i></div>
          <h3>Phím tắt toàn cục</h3>
          <i class="fas fa-chevron-down dvh-chevron"></i>
        </div>
        <div class="dvh-section-body">
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:10px">
            ${[
              ['Ctrl + N', 'Mở trang Nhập văn bản mới', '#c0392b'],
              ['Ctrl + F', 'Mở trang Tìm kiếm nâng cao', '#1a7fcb'],
              ['Ctrl + Home', 'Về Bảng điều khiển', '#1a2340'],
              ['Ctrl + B', 'Xuất báo cáo nhanh', '#16a34a'],
              ['Ctrl + D', 'Tổng hợp Bảng điều khiển', '#d97706'],
              ['Ctrl + /', 'Xem danh sách phím tắt', '#7c3aed'],
            ].map(([key, desc, color]) => `
              <div style="display:flex;align-items:center;gap:12px;padding:10px;background:#f9fafb;border-radius:8px;border:1px solid #f0f0f0">
                <kbd style="font-size:0.7rem;padding:2px 8px;color:${color};border-color:${color}40;background:${color}08;flex-shrink:0">${key}</kbd>
                <span style="font-size:0.8rem;color:#374151">${desc}</span>
              </div>
            `).join('')}
          </div>
          <div class="dvh-tip info" style="margin-top:12px"><i class="fas fa-info-circle"></i><div>Phím tắt không hoạt động khi bạn đang gõ trong ô nhập liệu (input, textarea). Nhấn <kbd>Esc</kbd> để thoát khỏi ô nhập liệu trước.</div></div>
        </div>
      </div>

      <div class="dvh-section">
        <div class="dvh-section-head" onclick="dvhToggle(this)">
          <div class="dvh-section-icon" style="background:rgba(16,185,129,0.08);color:#059669"><i class="fas fa-plus-circle"></i></div>
          <h3>Nút FAB — Thao tác nhanh (góc phải dưới)</h3>
          <i class="fas fa-chevron-down dvh-chevron"></i>
        </div>
        <div class="dvh-section-body">
          <p style="margin-bottom:10px">Nút <strong>⊕</strong> màu đỏ ở góc phải dưới màn hình là trung tâm thao tác nhanh:</p>
          <div style="display:flex;flex-direction:column;gap:8px">
            <div style="display:flex;align-items:center;gap:10px;font-size:0.82rem">
              <i class="fas fa-file-plus" style="color:#c0392b;width:18px;text-align:center"></i>
              <span><strong>Nhập văn bản</strong> — Mở trang nhập văn bản mới</span>
            </div>
            <div style="display:flex;align-items:center;gap:10px;font-size:0.82rem">
              <i class="fas fa-tasks" style="color:#d4a017;width:18px;text-align:center"></i>
              <span><strong>Thêm công việc</strong> — Popup thêm công việc nhanh</span>
            </div>
            <div style="display:flex;align-items:center;gap:10px;font-size:0.82rem">
              <i class="fas fa-bell" style="color:#1a2340;width:18px;text-align:center"></i>
              <span><strong>Nhắc việc</strong> — Popup thêm nhắc nhanh với ngày hôm nay</span>
            </div>
            <div style="display:flex;align-items:center;gap:10px;font-size:0.82rem">
              <i class="fas fa-search" style="color:#6b7280;width:18px;text-align:center"></i>
              <span><strong>Tìm kiếm</strong> — Mở trang tìm kiếm nâng cao</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /* ─── RENDER FUNCTION ─────────────────────────────────────────── */
  function renderPanel(tabId) {
    switch (tabId) {
      case 'overview':  return buildOverview();
      case 'login':     return buildLogin();
      case 'docs':      return buildDocs();
      case 'tasks':     return buildTasks();
      case 'reports':   return buildReports();
      case 'ai':        return buildAI();
      case 'gsheet':    return buildGSheet();
      case 'members':   return buildMembers();
      case 'admin':     return buildAdmin();
      case 'shortcuts': return buildShortcuts();
      default:          return buildOverview();
    }
  }

  /* ─── MODAL BUILDER ───────────────────────────────────────────── */
  function buildModal(activeTab) {
    activeTab = activeTab || 'overview';
    const tabsHTML = TABS.map(t =>
      `<button class="dvh-tab${t.id === activeTab ? ' active' : ''}" onclick="dvhSwitchTab('${t.id}')">${t.label}</button>`
    ).join('');

    return `
      <div id="dvHelpBox">
        <button class="dvh-close-btn" onclick="dvhClose()" title="Đóng hướng dẫn"><i class="fas fa-times"></i></button>
        <div id="dvHelpHeader">
          <div class="dvh-logo-row">
            <div class="dvh-logo-icon"><i class="fas fa-star"></i></div>
            <div class="dvh-logo-text">
              <h2>Hướng dẫn sử dụng ĐoànVăn</h2>
              <p>Hệ thống quản lý văn bản &amp; hoạt động Đoàn TNCS Hồ Chí Minh</p>
            </div>
          </div>
          <div class="dvh-search-wrap">
            <i class="fas fa-search"></i>
            <input type="text" id="dvHelpSearch" placeholder="Tìm kiếm trong hướng dẫn... (VD: API Key, Google Sheet, đăng nhập...)" oninput="dvhSearch(this.value)">
          </div>
          <div class="dvh-tabs">${tabsHTML}</div>
        </div>
        <div id="dvHelpBody">
          ${TABS.map(t =>
            `<div class="dvh-panel${t.id === activeTab ? ' active' : ''}" id="dvhPanel-${t.id}">${renderPanel(t.id)}</div>`
          ).join('')}
          <div class="dvh-panel" id="dvhPanel-search" style="display:none">
            <div id="dvhSearchResults"></div>
          </div>
        </div>
        <div class="dvh-footer">
          <span>ĐoànVăn v5.0 &copy; 2025–2026 — Hệ thống quản lý Đoàn TNCS Hồ Chí Minh</span>
          <span>Mọi thắc mắc liên hệ Admin tổ chức Đoàn của bạn</span>
        </div>
      </div>
    `;
  }

  /* ─── PUBLIC API ──────────────────────────────────────────────── */
  window.dvhOpen = function (tab) {
    if (document.getElementById('dvHelpModal')) return;
    const modal = document.createElement('div');
    modal.id = 'dvHelpModal';
    modal.innerHTML = buildModal(tab || 'overview');
    modal.addEventListener('click', function (e) {
      if (e.target === modal) dvhClose();
    });
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
  };

  window.dvhClose = function () {
    const modal = document.getElementById('dvHelpModal');
    if (modal) {
      modal.style.opacity = '0';
      modal.style.transition = 'opacity 0.2s';
      setTimeout(() => { modal.remove(); document.body.style.overflow = ''; }, 200);
    }
  };

  window.dvhSwitchTab = function (tabId) {
    // Hide search panel
    document.querySelectorAll('.dvh-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.dvh-tab').forEach(t => t.classList.remove('active'));
    const panel = document.getElementById('dvhPanel-' + tabId);
    if (panel) {
      panel.style.display = '';
      panel.classList.add('active');
    }
    const tab = document.querySelector(`.dvh-tab[onclick="dvhSwitchTab('${tabId}')"]`);
    if (tab) tab.classList.add('active');
    document.getElementById('dvHelpBody').scrollTop = 0;
    document.getElementById('dvHelpSearch').value = '';
  };

  window.dvhToggle = function (headEl) {
    const section = headEl.closest('.dvh-section');
    section.classList.toggle('open');
  };

  window.dvhSearch = function (query) {
    query = (query || '').trim().toLowerCase();
    if (!query) {
      // Restore current tab
      const activeTab = document.querySelector('.dvh-tab.active');
      if (activeTab) {
        const tabId = activeTab.getAttribute('onclick').match(/'([^']+)'/)?.[1];
        if (tabId) dvhSwitchTab(tabId);
      }
      document.getElementById('dvhPanel-search').style.display = 'none';
      return;
    }

    // Search across all panels
    const allText = [];
    TABS.forEach(t => {
      const panel = document.getElementById('dvhPanel-' + t.id);
      if (!panel) return;
      const sections = panel.querySelectorAll('.dvh-section');
      sections.forEach(sec => {
        const head = sec.querySelector('h3');
        const body = sec.querySelector('.dvh-section-body');
        if (!head || !body) return;
        const headText = head.textContent;
        const bodyText = body.textContent;
        if (headText.toLowerCase().includes(query) || bodyText.toLowerCase().includes(query)) {
          allText.push({ tab: t, headText, bodyInner: body.innerHTML });
        }
      });
    });

    // Show search results
    document.querySelectorAll('.dvh-panel').forEach(p => { p.classList.remove('active'); p.style.display = 'none'; });
    document.querySelectorAll('.dvh-tab').forEach(t => t.classList.remove('active'));
    const searchPanel = document.getElementById('dvhPanel-search');
    searchPanel.style.display = 'block';
    searchPanel.classList.add('active');

    if (!allText.length) {
      document.getElementById('dvhSearchResults').innerHTML = `
        <div style="text-align:center;padding:48px;color:#9ca3af">
          <i class="fas fa-search" style="font-size:2rem;margin-bottom:12px;display:block"></i>
          <p>Không tìm thấy kết quả cho "<strong>${query}</strong>"</p>
          <p style="font-size:0.78rem;margin-top:6px">Thử từ khóa khác hoặc duyệt các tab ở trên</p>
        </div>`;
      return;
    }

    document.getElementById('dvhSearchResults').innerHTML = `
      <div style="padding:0 0 12px;font-size:0.78rem;color:#6b7280;font-weight:600">${allText.length} kết quả cho "<strong style="color:#1a2340">${query}</strong>"</div>
      ${allText.map(r => `
        <div class="dvh-section open" style="margin-bottom:14px">
          <div class="dvh-section-head" style="cursor:default">
            <div class="dvh-section-icon" style="background:rgba(192,57,43,0.08);color:#c0392b"><i class="fas fa-search"></i></div>
            <h3>${r.headText}</h3>
            <span class="dvh-badge" style="background:#f3f4f6;color:#374151;cursor:pointer" onclick="dvhSwitchTab('${r.tab.id}')">${r.tab.label}</span>
          </div>
          <div class="dvh-section-body">${r.bodyInner}</div>
        </div>
      `).join('')}
    `;
  };

  /* ─── INJECT HELP BUTTON IN LOGIN SCREEN ─────────────────────── */
  function injectLoginHelpBtn() {
    if (document.getElementById('dvHelpLoginBtn')) return;
    const btn = document.createElement('button');
    btn.id = 'dvHelpLoginBtn';
    btn.title = 'Hướng dẫn sử dụng';
    btn.innerHTML = `<span style="font-size:1.1rem;font-weight:900">?</span><span class="dv-help-tooltip">Hướng dẫn sử dụng</span>`;
    btn.onclick = () => dvhOpen('overview');
    document.body.appendChild(btn);
  }

  /* ─── INJECT HELP BUTTON IN SIDEBAR ──────────────────────────── */
  function injectSidebarHelpBtn() {
    const footer = document.querySelector('.sidebar-footer');
    if (!footer || footer.querySelector('.dv-help-sidebar-btn')) return;
    const btn = document.createElement('button');
    btn.className = 'dv-help-btn dv-help-sidebar-btn';
    btn.style.cssText = 'width:100%;justify-content:center;margin-bottom:10px;border-radius:8px';
    btn.innerHTML = '<i class="fas fa-question-circle"></i> Hướng dẫn sử dụng';
    btn.onclick = () => dvhOpen('overview');
    footer.insertBefore(btn, footer.firstChild);
  }

  /* ─── INJECT HELP BUTTON IN TOPBAR ───────────────────────────── */
  function injectTopbarHelpBtn() {
    const actions = document.querySelector('.topbar-actions');
    if (!actions || document.getElementById('dvHelpTopbarBtn')) return;
    const btn = document.createElement('button');
    btn.id = 'dvHelpTopbarBtn';
    btn.className = 'btn btn-ghost';
    btn.title = 'Hướng dẫn sử dụng (F1)';
    btn.style.cssText = 'display:flex;align-items:center;gap:6px;color:#d4a017;border:1.5px solid rgba(212,160,23,0.4);border-radius:8px;font-size:0.75rem;font-weight:700';
    btn.innerHTML = '<i class="fas fa-question-circle"></i> <span style="display:none" class="help-btn-label">Hướng dẫn</span>';
    btn.onclick = () => dvhOpen('overview');

    // Show label on wider screens
    const mq = window.matchMedia('(min-width: 1100px)');
    const updateLabel = () => {
      const label = btn.querySelector('.help-btn-label');
      if (label) label.style.display = mq.matches ? 'inline' : 'none';
    };
    updateLabel();
    mq.addEventListener('change', updateLabel);

    // Insert before the settings button (last item)
    const settingsBtn = actions.querySelector('[title="Cài đặt"]');
    if (settingsBtn) actions.insertBefore(btn, settingsBtn);
    else actions.appendChild(btn);
  }

  /* ─── ADD NAV ITEM ─────────────────────────────────────────────  */
  function injectNavItem() {
    const nav = document.querySelector('.sidebar-nav');
    if (!nav || document.getElementById('dvHelpNavItem')) return;
    const item = document.createElement('div');
    item.id = 'dvHelpNavItem';
    item.className = 'nav-item';
    item.style.cssText = 'border-left-color: rgba(212,160,23,0.6)';
    item.innerHTML = `<i class="fas fa-question-circle icon" style="color:#d4a017"></i><span style="color:rgba(255,255,255,0.85)">Hướng dẫn sử dụng</span>`;
    item.onclick = () => dvhOpen('overview');

    // Add separator before nav item
    const sep = document.createElement('div');
    sep.className = 'nav-section-title';
    sep.textContent = 'Trợ giúp';
    nav.appendChild(sep);
    nav.appendChild(item);
  }

  /* ─── F1 SHORTCUT ──────────────────────────────────────────────  */
  function bindF1() {
    document.addEventListener('keydown', function (e) {
      if (e.key === 'F1') {
        e.preventDefault();
        if (document.getElementById('dvHelpModal')) {
          dvhClose();
        } else {
          dvhOpen('overview');
        }
      }
      if (e.key === 'Escape' && document.getElementById('dvHelpModal')) {
        dvhClose();
      }
    });
  }

  /* ─── WATCH FOR LOGIN OVERLAY ──────────────────────────────────  */
  function watchForLoginOverlay() {
    function startObserver() {
      var obs = new MutationObserver(function () {
        var loginOverlay = document.getElementById('dvSecureAuth');
        var loginBtn = document.getElementById('dvHelpLoginBtn');
        if (loginOverlay) {
          injectLoginHelpBtn();
        } else if (loginBtn) {
          loginBtn.remove();
        }
      });
      obs.observe(document.body, { childList: true, subtree: false });
      if (document.getElementById('dvSecureAuth')) injectLoginHelpBtn();
    }
    if (document.body) {
      startObserver();
    } else {
      document.addEventListener('DOMContentLoaded', startObserver);
    }
  }

  /* ─── INJECT CSS ───────────────────────────────────────────────  */
  function injectCSS() {
    if (document.getElementById('dvHelpCSS')) return;
    const style = document.createElement('style');
    style.id = 'dvHelpCSS';
    style.textContent = HELP_CSS;
    document.head.appendChild(style);
  }

  /* ─── INIT ─────────────────────────────────────────────────────  */
  function init() {
    injectCSS();
    bindF1();
    watchForLoginOverlay();

    // Inject into main UI once DOM is ready
    function injectMainUI() {
      injectSidebarHelpBtn();
      injectTopbarHelpBtn();
      injectNavItem();
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', injectMainUI);
    } else {
      // DOM already ready — but sidebar may render after auth
      setTimeout(injectMainUI, 800);
    }

    // Also retry when page changes (showPage calls)
    const origShowPage = window.showPage;
    if (origShowPage) {
      window.showPage = function (name) {
        origShowPage(name);
        setTimeout(injectMainUI, 100);
      };
    }
  }

  // Delay init until DOM is fully parsed — script runs in <head>
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
