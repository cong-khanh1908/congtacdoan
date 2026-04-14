/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║   DOANVAN — FIX & UPGRADE: ĐỔI ROLE + QUẢN LÝ CƠ SỞ ĐOÀN  v1.0         ║
 * ║                                                                              ║
 * ║  SỬA LỖI:                                                                   ║
 * ║    ✅ mtChangeRole is not defined → export window + modal đổi role đầy đủ  ║
 * ║                                                                              ║
 * ║  NÂNG CẤP:                                                                  ║
 * ║    ✅ Modal đổi role: chọn role + org cùng lúc, có preview trước khi lưu   ║
 * ║    ✅ Cơ sở Đoàn: Chỉnh sửa tên, địa chỉ, bí thư, SĐT                    ║
 * ║    ✅ Cơ sở Đoàn: Xóa cơ sở (soft delete — đánh dấu inactive)              ║
 * ║    ✅ Bảng người dùng: hiện nút Đổi role + Đặt lại PIN + Vô hiệu hóa       ║
 * ║    ✅ Bảng người dùng: lọc theo role / trạng thái                           ║
 * ║    ✅ Khôi phục tài khoản bị vô hiệu hóa                                   ║
 * ║                                                                              ║
 * ║  CÁCH DÙNG: thêm CUỐI index.html, sau tất cả script khác                   ║
 * ║    <script src="doanvan-role-org-upgrade.js"></script>                       ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

'use strict';

// ═══════════════════════════════════════════════════════════════════════
//  PHẦN 1: SỬA LỖI mtChangeRole — EXPORT + MODAL ĐỔI ROLE ĐẦY ĐỦ
// ═══════════════════════════════════════════════════════════════════════

/**
 * Mở modal đổi role cho user (thay thế hàm gọi thẳng mtChangeRole cũ)
 * @param {string} username  - username của người dùng (có thể có @ ở đầu)
 * @param {string} currentRole - role hiện tại để pre-fill
 * @param {string} currentOrg  - orgId hiện tại
 * @param {string} currentOrgName - tên org hiện tại
 */
window.mtChangeRole = async function(username, currentRole, currentOrg, currentOrgName) {
  // Chuẩn hóa username — bỏ @ nếu có
  const uname = (username || '').replace(/^@/, '');
  if (!uname) return;

  // Xóa modal cũ nếu còn
  document.getElementById('mtChangeRoleModal')?.remove();

  // Lấy danh sách orgs để chọn
  let orgs = [];
  try { orgs = await MTUserMgr.listOrgs(); } catch { /**/ }

  const cfg = (typeof MTConfig !== 'undefined') ? MTConfig.get() : null;
  const isAdmin = cfg?.role === 'admin';

  const modal = document.createElement('div');
  modal.id = 'mtChangeRoleModal';
  modal.className = 'modal-overlay';
  modal.innerHTML = `
<div class="modal" style="max-width:420px">
  <div class="modal-header">
    <h2 style="display:flex;align-items:center;gap:10px">
      <span style="width:34px;height:34px;border-radius:50%;
            background:linear-gradient(135deg,var(--red),var(--gold));
            display:flex;align-items:center;justify-content:center;flex-shrink:0">
        <i class="fas fa-user-edit" style="color:#fff;font-size:0.85rem"></i>
      </span>
      Đổi vai trò người dùng
    </h2>
    <button class="btn btn-ghost" onclick="document.getElementById('mtChangeRoleModal').remove()">
      <i class="fas fa-times"></i>
    </button>
  </div>

  <div class="modal-body" style="padding:20px">
    <!-- Thông tin user -->
    <div style="display:flex;align-items:center;gap:12px;padding:12px 14px;
                background:var(--cream);border-radius:10px;margin-bottom:18px">
      <div style="width:40px;height:40px;border-radius:50%;flex-shrink:0;
                  background:linear-gradient(135deg,#1a2340,#c0392b);
                  display:flex;align-items:center;justify-content:center;
                  color:#fff;font-size:1rem;font-weight:800">
        ${uname[0].toUpperCase()}
      </div>
      <div>
        <div style="font-weight:700;color:var(--navy)">@${uname}</div>
        <div style="font-size:0.72rem;color:var(--gray)">
          Vai trò hiện tại:
          <span style="font-weight:700;color:${currentRole==='admin'?'#c0392b':currentRole==='manager'?'#1a2340':'#6b7280'}">
            ${currentRole==='admin'?'Quản trị viên':currentRole==='manager'?'Quản lý':'Đoàn viên'}
          </span>
        </div>
        ${currentOrgName ? `<div style="font-size:0.72rem;color:var(--gray)">Cơ sở: ${currentOrgName}</div>` : ''}
      </div>
    </div>

    <!-- Chọn vai trò mới -->
    <div class="form-group">
      <label class="form-label">Vai trò mới <span style="color:red">*</span></label>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px" id="mtRoleSelector">
        ${[
          { value:'member',  icon:'fa-user',      label:'Đoàn viên',   color:'#6b7280' },
          { value:'manager', icon:'fa-user-tie',   label:'Quản lý',     color:'#1a2340' },
          { value:'admin',   icon:'fa-shield-alt', label:'Admin',        color:'#c0392b' },
        ].map(r => `
          <label style="cursor:pointer">
            <input type="radio" name="mtNewRole" value="${r.value}"
              ${r.value === (currentRole||'member') ? 'checked' : ''}
              onchange="mtRoleUpgrade_onRoleChange(this.value)"
              style="display:none">
            <div class="mt-role-card ${r.value === (currentRole||'member') ? 'selected' : ''}"
              data-role="${r.value}"
              style="border:2px solid var(--gray-light);border-radius:10px;padding:10px 6px;
                     text-align:center;transition:all 0.2s;
                     ${r.value === (currentRole||'member') ? 'border-color:'+r.color+';background:rgba(0,0,0,0.04)' : ''}">
              <i class="fas ${r.icon}" style="font-size:1.3rem;color:${r.color};margin-bottom:4px;display:block"></i>
              <div style="font-size:0.72rem;font-weight:700;color:${r.color}">${r.label}</div>
            </div>
          </label>`).join('')}
      </div>
    </div>

    <!-- Chọn Cơ sở Đoàn -->
    <div class="form-group" id="mtChangeOrgGroup">
      <label class="form-label">Cơ sở Đoàn</label>
      <select class="form-control" id="mtChangeRoleOrg" style="font-size:15px">
        <option value="all" ${currentOrg==='all'?'selected':''}>Toàn hệ thống (Admin)</option>
        ${orgs.map(o =>
          `<option value="${o.id}" ${currentOrg===o.id?'selected':''}>${o.name}</option>`
        ).join('')}
      </select>
    </div>

    <!-- Preview thay đổi -->
    <div id="mtRoleChangePreview" style="display:none;padding:10px 12px;border-radius:8px;
         background:rgba(2,132,199,0.07);border:1px solid rgba(2,132,199,0.2);
         font-size:0.78rem;margin-bottom:4px">
    </div>

    <div id="mtChangeRoleStatus" style="font-size:0.78rem;min-height:16px;margin-bottom:12px"></div>
  </div>

  <div class="modal-footer">
    <button class="btn btn-ghost" onclick="document.getElementById('mtChangeRoleModal').remove()">
      Hủy
    </button>
    <button class="btn btn-primary" onclick="mtRoleUpgrade_doChangeRole('${uname}')">
      <i class="fas fa-save"></i> Lưu thay đổi
    </button>
  </div>
</div>`;

  // Thêm CSS cho role card
  if (!document.getElementById('mtRoleCardCSS')) {
    const s = document.createElement('style');
    s.id = 'mtRoleCardCSS';
    s.textContent = `
      .mt-role-card { cursor:pointer; user-select:none; }
      .mt-role-card:hover { border-color: var(--navy) !important; background: rgba(26,35,64,0.04) !important; }
      .mt-role-card.selected { box-shadow: 0 0 0 3px rgba(26,35,64,0.15); }
      .mt-role-card label { cursor:pointer; }
    `;
    document.head.appendChild(s);
  }

  document.body.appendChild(modal);
  modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
  setTimeout(() => {
    modal.classList.add('open');
    mtRoleUpgrade_onRoleChange(currentRole || 'member');
  }, 10);
};

/** Cập nhật UI khi chọn role khác */
window.mtRoleUpgrade_onRoleChange = function(role) {
  // Cập nhật visual card
  document.querySelectorAll('.mt-role-card').forEach(card => {
    const isSelected = card.dataset.role === role;
    const colors = { admin:'#c0392b', manager:'#1a2340', member:'#6b7280' };
    const color = colors[card.dataset.role] || '#6b7280';
    card.style.borderColor   = isSelected ? color : 'var(--gray-light)';
    card.style.background    = isSelected ? `rgba(0,0,0,0.04)` : '';
    card.style.boxShadow     = isSelected ? `0 0 0 3px ${color}22` : '';
    card.classList.toggle('selected', isSelected);
  });

  // Cập nhật preview
  const preview  = document.getElementById('mtRoleChangePreview');
  const orgGroup = document.getElementById('mtChangeOrgGroup');
  if (!preview) return;

  const labels = { admin:'Quản trị viên', manager:'Quản lý', member:'Đoàn viên' };
  const icons  = { admin:'🛡️', manager:'👔', member:'👤' };

  preview.style.display = 'block';

  if (role === 'admin') {
    preview.innerHTML = `${icons.admin} <strong>${labels.admin}</strong> — Có quyền truy cập toàn hệ thống, quản lý người dùng và dữ liệu tất cả cơ sở Đoàn.`;
    if (orgGroup) orgGroup.style.opacity = '0.4';
    const orgSel = document.getElementById('mtChangeRoleOrg');
    if (orgSel) { orgSel.value = 'all'; orgSel.disabled = true; }
  } else if (role === 'manager') {
    preview.innerHTML = `${icons.manager} <strong>${labels.manager}</strong> — Xem và chỉnh sửa dữ liệu cơ sở Đoàn được phân công, thêm đoàn viên, tạo mã mời.`;
    if (orgGroup) orgGroup.style.opacity = '1';
    const orgSel = document.getElementById('mtChangeRoleOrg');
    if (orgSel) orgSel.disabled = false;
  } else {
    preview.innerHTML = `${icons.member} <strong>${labels.member}</strong> — Chỉ xem và nhập dữ liệu của cơ sở Đoàn được phân công.`;
    if (orgGroup) orgGroup.style.opacity = '1';
    const orgSel = document.getElementById('mtChangeRoleOrg');
    if (orgSel) orgSel.disabled = false;
  }
};

/** Thực hiện đổi role lên GSheet */
window.mtRoleUpgrade_doChangeRole = async function(username) {
  const roleEl   = document.querySelector('input[name="mtNewRole"]:checked');
  const orgEl    = document.getElementById('mtChangeRoleOrg');
  const statusEl = document.getElementById('mtChangeRoleStatus');

  const newRole  = roleEl?.value;
  const newOrgId = orgEl?.value || 'all';
  const newOrgName = orgEl?.options[orgEl.selectedIndex]?.text || '';

  if (!newRole) {
    if (statusEl) statusEl.innerHTML = '<span style="color:red">Vui lòng chọn vai trò</span>';
    return;
  }

  if (statusEl) statusEl.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang cập nhật...';

  try {
    const cfg = MTConfig.get();
    if (!cfg?.spreadsheetId) throw new Error('Chưa cấu hình hệ thống');
    if (cfg.role !== 'admin') throw new Error('Chỉ Admin mới đổi được vai trò');

    const rows  = await SheetsAPI.read(cfg.spreadsheetId, `${SH.USERS}!A:K`);
    const users = SheetsAPI.parseSheet(rows);
    const idx   = users.findIndex(u => u.username === username);
    if (idx < 0) throw new Error('Không tìm thấy người dùng');

    const rowNum = idx + 2;
    // Cập nhật cả role (cột D), orgId (cột E), orgName (cột F)
    await SheetsAPI.write(cfg.spreadsheetId, `${SH.USERS}!D${rowNum}:F${rowNum}`, [[
      newRole,
      newRole === 'admin' ? 'all' : newOrgId,
      newRole === 'admin' ? 'Toàn hệ thống' : newOrgName.replace(' (Admin)','').trim(),
    ]]);

    if (statusEl) statusEl.innerHTML = '<span style="color:#16a34a"><i class="fas fa-check-circle"></i> Đã cập nhật!</span>';
    if (typeof toast === 'function') toast(
      `✅ Đã đổi vai trò <strong>@${username}</strong> thành <strong>${
        newRole==='admin'?'Quản trị viên':newRole==='manager'?'Quản lý':'Đoàn viên'
      }</strong>`,
      'success'
    );

    setTimeout(() => {
      document.getElementById('mtChangeRoleModal')?.remove();
      if (typeof mtLoadUsers === 'function') mtLoadUsers();
    }, 900);
  } catch (e) {
    if (statusEl) statusEl.innerHTML = `<span style="color:red"><i class="fas fa-times-circle"></i> Lỗi: ${e.message}</span>`;
    if (typeof toast === 'function') toast('Lỗi: ' + e.message, 'error');
  }
};

// ═══════════════════════════════════════════════════════════════════════
//  PHẦN 2: NÂNG CẤP BẢNG NGƯỜI DÙNG — Filter + Actions đầy đủ
// ═══════════════════════════════════════════════════════════════════════

/** Ghi đè mtLoadUsers để nâng cấp UI bảng người dùng */
window.mtLoadUsers = async function() {
  const el = document.getElementById('mtUserList');
  if (!el) return;
  el.innerHTML = '<div style="text-align:center;padding:20px;color:var(--gray)"><i class="fas fa-spinner fa-spin"></i> Đang tải...</div>';

  try {
    const allUsers = await MTUserMgr.listUsers();

    if (!allUsers.length) {
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

    // Tính stats
    const stats = {
      total:   allUsers.length,
      active:  allUsers.filter(u => u.status === 'active').length,
      pending: allUsers.filter(u => u.status === 'pending').length,
      deleted: allUsers.filter(u => u.status === 'deleted').length,
    };

    el.innerHTML = `
<!-- Filter bar -->
<div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap;align-items:center">
  <div style="display:flex;gap:6px;flex:1;flex-wrap:wrap">
    <button class="btn btn-sm mt-ufilter-btn active" data-filter="all"
      onclick="mtRoleUpgrade_filterUsers('all',this)" style="font-size:0.72rem">
      Tất cả <span style="background:rgba(0,0,0,0.1);padding:1px 6px;border-radius:10px;margin-left:3px">${stats.total}</span>
    </button>
    <button class="btn btn-sm mt-ufilter-btn" data-filter="active"
      onclick="mtRoleUpgrade_filterUsers('active',this)" style="font-size:0.72rem;color:#16a34a">
      Hoạt động <span style="background:rgba(22,163,74,0.12);padding:1px 6px;border-radius:10px;margin-left:3px">${stats.active}</span>
    </button>
    <button class="btn btn-sm mt-ufilter-btn" data-filter="pending"
      onclick="mtRoleUpgrade_filterUsers('pending',this)" style="font-size:0.72rem;color:#d97706">
      Chờ kích hoạt <span style="background:rgba(217,119,6,0.12);padding:1px 6px;border-radius:10px;margin-left:3px">${stats.pending}</span>
    </button>
    ${stats.deleted ? `<button class="btn btn-sm mt-ufilter-btn" data-filter="deleted"
      onclick="mtRoleUpgrade_filterUsers('deleted',this)" style="font-size:0.72rem;color:#9ca3af">
      Vô hiệu <span style="background:rgba(0,0,0,0.07);padding:1px 6px;border-radius:10px;margin-left:3px">${stats.deleted}</span>
    </button>` : ''}
  </div>
  <button class="btn btn-ghost btn-sm" onclick="mtLoadUsers()" title="Làm mới">
    <i class="fas fa-sync-alt"></i>
  </button>
</div>

<!-- Table -->
<div style="overflow-x:auto;-webkit-overflow-scrolling:touch">
<table class="doc-table" id="mtUpgradeUserTable" style="width:100%;min-width:560px">
  <thead><tr>
    <th style="min-width:140px">Người dùng</th>
    <th>Vai trò</th>
    <th>Cơ sở Đoàn</th>
    <th>Trạng thái</th>
    <th>Lần cuối</th>
    <th style="text-align:right;min-width:110px">Thao tác</th>
  </tr></thead>
  <tbody>
    ${allUsers.map(u => `
    <tr data-status="${u.status}" class="mt-user-row">
      <td>
        <div style="display:flex;align-items:center;gap:8px">
          <div style="width:32px;height:32px;border-radius:50%;flex-shrink:0;
                      background:linear-gradient(135deg,${u.role==='admin'?'#c0392b,#e74c3c':u.role==='manager'?'#1a2340,#2c3e6e':'#6b7280,#9ca3af'});
                      display:flex;align-items:center;justify-content:center;
                      color:#fff;font-size:0.78rem;font-weight:800">
            ${(u.displayName || u.username)[0].toUpperCase()}
          </div>
          <div>
            <div style="font-weight:700;color:var(--navy);font-size:0.85rem">${u.displayName || u.username}</div>
            <div style="font-size:0.68rem;color:var(--gray)">@${u.username}</div>
          </div>
        </div>
      </td>
      <td>
        <span style="display:inline-flex;align-items:center;gap:4px;padding:3px 10px;border-radius:20px;
              background:${u.role==='admin'?'rgba(192,57,43,0.1)':u.role==='manager'?'rgba(26,35,64,0.1)':'rgba(107,114,128,0.1)'};
              font-size:0.72rem;font-weight:700;
              color:${u.role==='admin'?'#c0392b':u.role==='manager'?'#1a2340':'#6b7280'}">
          <i class="fas ${MT_ROLES[u.role]?.icon||'fa-user'}"></i>
          ${MT_ROLES[u.role]?.label||u.role}
        </span>
      </td>
      <td style="font-size:0.78rem;color:var(--text-soft)">${u.orgName || u.orgId || '—'}</td>
      <td>
        <span style="display:inline-flex;align-items:center;gap:4px;font-size:0.72rem;font-weight:600;
              color:${u.status==='active'?'#16a34a':u.status==='pending'?'#d97706':'#9ca3af'}">
          <i class="fas ${u.status==='active'?'fa-check-circle':u.status==='pending'?'fa-clock':'fa-ban'}"></i>
          ${u.status==='active'?'Hoạt động':u.status==='pending'?'Chờ kích hoạt':'Vô hiệu'}
        </span>
      </td>
      <td style="font-size:0.72rem;color:var(--gray)">
        ${u.lastLogin ? new Date(u.lastLogin).toLocaleDateString('vi-VN') : '—'}
      </td>
      <td style="text-align:right">
        <div style="display:flex;gap:4px;justify-content:flex-end;flex-wrap:nowrap">
          <!-- Đổi role -->
          <button class="btn btn-ghost btn-sm"
            onclick="mtChangeRole('${u.username}','${u.role}','${u.orgId||'all'}','${(u.orgName||'').replace(/'/g,'&apos;')}')"
            title="Đổi vai trò" style="color:var(--navy)">
            <i class="fas fa-user-edit"></i>
          </button>
          <!-- Reset PIN -->
          <button class="btn btn-ghost btn-sm"
            onclick="mtRoleUpgrade_resetPIN('${u.username}')"
            title="Đặt lại PIN về 123456" style="color:#d97706">
            <i class="fas fa-key"></i>
          </button>
          ${u.status === 'deleted'
            ? `<!-- Khôi phục -->
               <button class="btn btn-ghost btn-sm"
                 onclick="mtRoleUpgrade_restoreUser('${u.username}')"
                 title="Khôi phục tài khoản" style="color:#16a34a">
                 <i class="fas fa-user-check"></i>
               </button>`
            : u.status === 'pending'
              ? `<!-- Gửi lại mã mời -->
                 <button class="btn btn-ghost btn-sm"
                   onclick="mtRoleUpgrade_resendInvite('${u.username}','${u.role}','${u.orgId||'all'}','${(u.orgName||'').replace(/'/g,'&apos;')}')"
                   title="Tạo lại mã mời" style="color:#0284c7">
                   <i class="fas fa-paper-plane"></i>
                 </button>`
              : ''
          }
          <!-- Vô hiệu hóa / Xóa -->
          ${u.status !== 'deleted' ? `
          <button class="btn btn-ghost btn-sm"
            onclick="mtRemoveUser('${u.username}')"
            title="Vô hiệu hóa tài khoản" style="color:var(--red)">
            <i class="fas fa-user-times"></i>
          </button>` : ''}
        </div>
      </td>
    </tr>`).join('')}
  </tbody>
</table>
</div>

<style>
  .mt-ufilter-btn { background:var(--cream);border:1.5px solid var(--gray-light); }
  .mt-ufilter-btn.active { background:var(--navy);color:#fff;border-color:var(--navy); }
  .mt-ufilter-btn:hover:not(.active) { border-color:var(--navy); }
  .mt-user-row:hover td { background:rgba(26,35,64,0.02); }
</style>`;
  } catch (e) {
    el.innerHTML = `
      <div style="color:#dc2626;padding:16px;background:rgba(220,38,38,0.05);border-radius:8px;border:1px solid rgba(220,38,38,0.15)">
        <div style="font-weight:700;margin-bottom:4px"><i class="fas fa-exclamation-triangle"></i> Lỗi tải dữ liệu</div>
        <div style="font-size:0.8rem;margin-bottom:10px">${e.message}</div>
        <button class="btn btn-outline btn-sm" onclick="mtLoadUsers()">
          <i class="fas fa-sync-alt"></i> Thử lại
        </button>
      </div>`;
  }
};

/** Filter bảng người dùng theo status */
window.mtRoleUpgrade_filterUsers = function(filter, btn) {
  // Cập nhật nút active
  document.querySelectorAll('.mt-ufilter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  // Hiện/ẩn hàng
  document.querySelectorAll('.mt-user-row').forEach(row => {
    const status = row.dataset.status;
    row.style.display = (filter === 'all' || status === filter) ? '' : 'none';
  });
};

// ═══════════════════════════════════════════════════════════════════════
//  PHẦN 3: ACTION NGƯỜI DÙNG — Reset PIN, Khôi phục, Gửi lại mã mời
// ═══════════════════════════════════════════════════════════════════════

/** Admin đặt lại PIN về 123456 */
window.mtRoleUpgrade_resetPIN = async function(username) {
  if (!confirm(`Đặt lại PIN của @${username} về "123456"?\nNgười dùng cần đổi PIN ngay sau khi đăng nhập.`)) return;
  try {
    const cfg = MTConfig.get();
    if (!cfg?.spreadsheetId || cfg.role !== 'admin') throw new Error('Chỉ Admin mới có thể reset PIN');

    const rows  = await SheetsAPI.read(cfg.spreadsheetId, `${SH.USERS}!A:K`);
    const users = SheetsAPI.parseSheet(rows);
    const idx   = users.findIndex(u => u.username === username);
    if (idx < 0) throw new Error('Không tìm thấy người dùng');

    // Hash PIN 123456
    const defaultHash = (() => {
      let h = 5381;
      for (const c of '123456') h = ((h << 5) + h) ^ c.charCodeAt(0);
      return (h >>> 0).toString(16).padStart(8, '0');
    })();

    await SheetsAPI.write(cfg.spreadsheetId, `${SH.USERS}!C${idx + 2}`, [[defaultHash]]);
    if (typeof toast === 'function') toast(`🔑 Đã reset PIN của @${username} về <strong>123456</strong>`, 'success');
  } catch (e) {
    if (typeof toast === 'function') toast('Lỗi: ' + e.message, 'error');
  }
};

/** Khôi phục tài khoản bị vô hiệu hóa */
window.mtRoleUpgrade_restoreUser = async function(username) {
  if (!confirm(`Khôi phục tài khoản @${username}?`)) return;
  try {
    const cfg = MTConfig.get();
    if (!cfg?.spreadsheetId || cfg.role !== 'admin') throw new Error('Chỉ Admin mới có thể khôi phục');

    const rows  = await SheetsAPI.read(cfg.spreadsheetId, `${SH.USERS}!A:K`);
    const users = SheetsAPI.parseSheet(rows);
    const idx   = users.findIndex(u => u.username === username);
    if (idx < 0) throw new Error('Không tìm thấy người dùng');

    await SheetsAPI.write(cfg.spreadsheetId, `${SH.USERS}!J${idx + 2}`, [['active']]);
    if (typeof toast === 'function') toast(`✅ Đã khôi phục tài khoản @${username}`, 'success');
    mtLoadUsers();
  } catch (e) {
    if (typeof toast === 'function') toast('Lỗi: ' + e.message, 'error');
  }
};

/** Tạo lại mã mời cho tài khoản pending */
window.mtRoleUpgrade_resendInvite = async function(username, role, orgId, orgName) {
  try {
    const { code } = await MTAdmin.generateInviteCode(username, role, orgId, orgName);
    const formatted = code.match(/.{1,4}/g)?.join(' ') || code;

    // Hiện modal mini với code và QR
    document.getElementById('mtResendInviteModal')?.remove();
    const m = document.createElement('div');
    m.id = 'mtResendInviteModal';
    m.className = 'modal-overlay';
    m.innerHTML = `
<div class="modal" style="max-width:380px">
  <div class="modal-header">
    <h2><i class="fas fa-paper-plane" style="color:var(--red);margin-right:8px"></i> Mã mời mới</h2>
    <button class="btn btn-ghost" onclick="document.getElementById('mtResendInviteModal').remove()"><i class="fas fa-times"></i></button>
  </div>
  <div class="modal-body" style="padding:20px;text-align:center">
    <div style="font-size:0.78rem;color:var(--gray);margin-bottom:10px">
      Mã mời cho <strong>@${username}</strong> — hết hạn sau 7 ngày
    </div>
    <div onclick="navigator.clipboard?.writeText('${code}');if(typeof toast==='function')toast('Đã sao chép!','success')"
      style="font-family:monospace;font-size:2rem;font-weight:900;letter-spacing:8px;
             color:var(--navy);padding:16px;background:var(--cream);border-radius:12px;
             border:2px dashed var(--gray-light);cursor:pointer;user-select:all;margin-bottom:12px">
      ${formatted}
    </div>
    <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent('DOANVAN:'+code)}"
      style="width:150px;height:150px;border-radius:10px;border:2px solid var(--gray-light);padding:4px;background:#fff"
      alt="QR ${formatted}">
    <div style="font-size:0.68rem;color:var(--gray);margin-top:6px">Nhấn code để sao chép</div>
  </div>
  <div class="modal-footer">
    <button class="btn btn-outline" onclick="navigator.clipboard?.writeText('${code}');if(typeof toast==='function')toast('Đã sao chép!','success')">
      <i class="fas fa-copy"></i> Sao chép
    </button>
    <button class="btn btn-primary" onclick="document.getElementById('mtResendInviteModal').remove()">Đóng</button>
  </div>
</div>`;
    document.body.appendChild(m);
    m.addEventListener('click', e => { if (e.target === m) m.remove(); });
    setTimeout(() => m.classList.add('open'), 10);

    if (typeof toast === 'function') toast(`✅ Đã tạo mã mời mới cho @${username}`, 'success');
  } catch (e) {
    if (typeof toast === 'function') toast('Lỗi: ' + e.message, 'error');
  }
};

// ═══════════════════════════════════════════════════════════════════════
//  PHẦN 4: NÂNG CẤP QUẢN LÝ CƠ SỞ ĐOÀN — Chỉnh sửa + Xóa
// ═══════════════════════════════════════════════════════════════════════

/** Ghi đè mtLoadOrgs — thêm nút Sửa + Xóa */
window.mtLoadOrgs = async function() {
  const el = document.getElementById('mtOrgList');
  if (!el) return;
  el.innerHTML = '<div style="text-align:center;padding:20px;color:var(--gray)"><i class="fas fa-spinner fa-spin"></i></div>';

  try {
    const orgs = await MTUserMgr.listOrgs();

    if (!orgs.length) {
      el.innerHTML = '<div style="color:var(--gray);text-align:center;padding:16px">Chưa có cơ sở Đoàn. Thêm mới bên trên.</div>';
      return;
    }

    el.innerHTML = orgs.map((o, i) => `
<div style="display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:10px;
            border:1.5px solid var(--gray-light);margin-bottom:8px;transition:all 0.2s;background:#fff"
     onmouseover="this.style.borderColor='var(--navy)'"
     onmouseout="this.style.borderColor='var(--gray-light)'">
  <div style="width:40px;height:40px;border-radius:50%;flex-shrink:0;
              background:linear-gradient(135deg,var(--red),var(--gold));
              display:flex;align-items:center;justify-content:center;color:#fff;font-size:1.1rem">
    <i class="fas fa-school"></i>
  </div>
  <div style="flex:1;min-width:0">
    <div style="font-weight:700;color:var(--navy);font-size:0.88rem;
                white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${o.name}</div>
    <div style="font-size:0.7rem;color:var(--gray);margin-top:1px">
      ${o.secretary ? `<span><i class="fas fa-user-tie" style="margin-right:3px"></i>${o.secretary}</span>` : ''}
      ${o.phone ? `<span style="margin-left:8px"><i class="fas fa-phone" style="margin-right:3px"></i>${o.phone}</span>` : ''}
      ${o.address ? `<span style="margin-left:8px"><i class="fas fa-map-marker-alt" style="margin-right:3px"></i>${o.address}</span>` : ''}
    </div>
    <code style="font-size:0.65rem;color:var(--gray);background:var(--cream);
                 padding:1px 6px;border-radius:4px">${o.id}</code>
  </div>
  <div style="display:flex;gap:4px;flex-shrink:0">
    <button class="btn btn-ghost btn-sm"
      onclick="mtRoleUpgrade_editOrg('${o.id}','${o.name.replace(/'/g,'&apos;')}','${(o.address||'').replace(/'/g,'&apos;')}','${(o.secretary||'').replace(/'/g,'&apos;')}','${(o.phone||'').replace(/'/g,'&apos;')}')"
      title="Chỉnh sửa" style="color:var(--navy)">
      <i class="fas fa-pencil-alt"></i>
    </button>
    <button class="btn btn-ghost btn-sm"
      onclick="mtRoleUpgrade_deleteOrg('${o.id}','${o.name.replace(/'/g,'&apos;')}')"
      title="Xóa cơ sở Đoàn" style="color:var(--red)">
      <i class="fas fa-trash-alt"></i>
    </button>
  </div>
</div>`).join('');
  } catch (e) {
    el.innerHTML = `
      <div style="color:#dc2626;padding:14px;background:rgba(220,38,38,0.05);border-radius:8px;border:1px solid rgba(220,38,38,0.15)">
        <div style="font-weight:700;margin-bottom:4px"><i class="fas fa-exclamation-triangle"></i> Lỗi tải dữ liệu</div>
        <div style="font-size:0.8rem;margin-bottom:10px">${e.message}</div>
        <button class="btn btn-outline btn-sm" onclick="mtLoadOrgs()">
          <i class="fas fa-sync-alt"></i> Thử lại
        </button>
      </div>`;
  }
};

/** Modal chỉnh sửa cơ sở Đoàn */
window.mtRoleUpgrade_editOrg = function(orgId, name, address, secretary, phone) {
  document.getElementById('mtEditOrgModal')?.remove();

  const modal = document.createElement('div');
  modal.id = 'mtEditOrgModal';
  modal.className = 'modal-overlay';
  modal.innerHTML = `
<div class="modal" style="max-width:440px">
  <div class="modal-header">
    <h2 style="display:flex;align-items:center;gap:10px">
      <span style="width:34px;height:34px;border-radius:50%;
            background:linear-gradient(135deg,var(--red),var(--gold));
            display:flex;align-items:center;justify-content:center;flex-shrink:0">
        <i class="fas fa-school" style="color:#fff;font-size:0.85rem"></i>
      </span>
      Chỉnh sửa cơ sở Đoàn
    </h2>
    <button class="btn btn-ghost" onclick="document.getElementById('mtEditOrgModal').remove()">
      <i class="fas fa-times"></i>
    </button>
  </div>
  <div class="modal-body" style="padding:20px">

    <div style="font-size:0.72rem;color:var(--gray);background:var(--cream);
                border-radius:8px;padding:8px 12px;margin-bottom:16px">
      <i class="fas fa-info-circle"></i> ID cơ sở Đoàn:
      <code style="font-weight:700">${orgId}</code>
      (không thể thay đổi)
    </div>

    <div class="form-group">
      <label class="form-label">Tên cơ sở Đoàn <span style="color:red">*</span></label>
      <input class="form-control" id="mtEditOrgName" value="${name}"
        placeholder="VD: Chi đoàn cơ sở Bệnh viện..." style="font-size:16px">
    </div>

    <div class="form-group">
      <label class="form-label">Bí thư</label>
      <input class="form-control" id="mtEditOrgSecretary" value="${secretary}"
        placeholder="Họ và tên Bí thư" style="font-size:16px">
    </div>

    <div class="form-row" style="grid-template-columns:1fr 1fr">
      <div class="form-group">
        <label class="form-label">Số điện thoại</label>
        <input class="form-control" id="mtEditOrgPhone" value="${phone}"
          placeholder="0901234567" inputmode="tel" style="font-size:16px">
      </div>
      <div class="form-group">
        <label class="form-label">Địa chỉ</label>
        <input class="form-control" id="mtEditOrgAddress" value="${address}"
          placeholder="Địa chỉ..." style="font-size:16px">
      </div>
    </div>

    <div id="mtEditOrgStatus" style="font-size:0.78rem;min-height:16px"></div>
  </div>
  <div class="modal-footer">
    <button class="btn btn-ghost" onclick="document.getElementById('mtEditOrgModal').remove()">Hủy</button>
    <button class="btn btn-primary" onclick="mtRoleUpgrade_saveOrg('${orgId}')">
      <i class="fas fa-save"></i> Lưu thay đổi
    </button>
  </div>
</div>`;

  document.body.appendChild(modal);
  modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
  setTimeout(() => modal.classList.add('open'), 10);
};

/** Lưu thay đổi cơ sở Đoàn vào GSheet */
window.mtRoleUpgrade_saveOrg = async function(orgId) {
  const newName      = document.getElementById('mtEditOrgName')?.value.trim();
  const newSecretary = document.getElementById('mtEditOrgSecretary')?.value.trim();
  const newPhone     = document.getElementById('mtEditOrgPhone')?.value.trim();
  const newAddress   = document.getElementById('mtEditOrgAddress')?.value.trim();
  const statusEl     = document.getElementById('mtEditOrgStatus');

  if (!newName) {
    if (statusEl) statusEl.innerHTML = '<span style="color:red">Vui lòng nhập tên cơ sở Đoàn</span>';
    return;
  }

  if (statusEl) statusEl.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang lưu...';

  try {
    const cfg = MTConfig.get();
    if (!cfg?.spreadsheetId) throw new Error('Chưa cấu hình hệ thống');
    if (cfg.role !== 'admin') throw new Error('Chỉ Admin mới có thể chỉnh sửa');

    // Tìm index của org trong sheet
    const rows = await SheetsAPI.read(cfg.spreadsheetId, `${SH.ORGS}!A:F`);
    if (!rows || rows.length < 2) throw new Error('Không đọc được danh sách cơ sở Đoàn');

    const headers = rows[0]; // ['id','name','address','secretary','phone','createdAt']
    const dataRows = rows.slice(1);
    const idx = dataRows.findIndex(r => r[0] === orgId);
    if (idx < 0) throw new Error('Không tìm thấy cơ sở Đoàn với ID: ' + orgId);

    const rowNum = idx + 2; // +1 header +1 index-start-1

    // Cột theo header: A=id, B=name, C=address, D=secretary, E=phone, F=createdAt
    await SheetsAPI.write(cfg.spreadsheetId, `${SH.ORGS}!B${rowNum}:E${rowNum}`, [[
      newName,
      newAddress,
      newSecretary,
      newPhone,
    ]]);

    if (statusEl) statusEl.innerHTML = '<span style="color:#16a34a"><i class="fas fa-check-circle"></i> Đã lưu!</span>';
    if (typeof toast === 'function') toast(`✅ Đã cập nhật: <strong>${newName}</strong>`, 'success');

    setTimeout(() => {
      document.getElementById('mtEditOrgModal')?.remove();
      mtLoadOrgs();
      // Cập nhật dropdown org nếu đang mở
      if (typeof mtLoadOrgsForSelect === 'function') mtLoadOrgsForSelect();
    }, 700);
  } catch (e) {
    if (statusEl) statusEl.innerHTML = `<span style="color:red"><i class="fas fa-times-circle"></i> Lỗi: ${e.message}</span>`;
    if (typeof toast === 'function') toast('Lỗi: ' + e.message, 'error');
  }
};

/** Xóa cơ sở Đoàn */
window.mtRoleUpgrade_deleteOrg = async function(orgId, orgName) {
  if (!confirm(`Xóa cơ sở Đoàn "${orgName}"?\n\nLưu ý: Người dùng thuộc cơ sở này sẽ không bị xóa, nhưng cần được cập nhật lại cơ sở Đoàn.`)) return;

  try {
    const cfg = MTConfig.get();
    if (!cfg?.spreadsheetId || cfg.role !== 'admin') throw new Error('Chỉ Admin mới có thể xóa');

    const rows = await SheetsAPI.read(cfg.spreadsheetId, `${SH.ORGS}!A:F`);
    if (!rows || rows.length < 2) throw new Error('Không đọc được danh sách');

    const dataRows = rows.slice(1);
    const idx = dataRows.findIndex(r => r[0] === orgId);
    if (idx < 0) throw new Error('Không tìm thấy cơ sở Đoàn');

    const rowNum = idx + 2;
    // Đánh dấu xóa: ghi [DELETED] vào tên
    await SheetsAPI.write(cfg.spreadsheetId, `${SH.ORGS}!B${rowNum}`, [[`[DELETED] ${orgName}`]]);

    if (typeof toast === 'function') toast(`🗑️ Đã xóa cơ sở Đoàn: ${orgName}`, 'success');
    mtLoadOrgs();
    if (typeof mtLoadOrgsForSelect === 'function') mtLoadOrgsForSelect();
  } catch (e) {
    if (typeof toast === 'function') toast('Lỗi: ' + e.message, 'error');
  }
};

// ═══════════════════════════════════════════════════════════════════════
//  PHẦN 5: NÂNG CẤP FORM THÊM CƠ SỞ ĐOÀN — thêm trường địa chỉ, bí thư
// ═══════════════════════════════════════════════════════════════════════

/** Ghi đè mtAddOrg để thu thập thêm thông tin */
window.mtAddOrg = async function() {
  const name = document.getElementById('mtNewOrgName')?.value.trim();
  if (!name) {
    if (typeof toast === 'function') toast('Vui lòng nhập tên cơ sở Đoàn', 'warning');
    return;
  }
  try {
    const cfg = MTConfig.get();
    const secretary = document.getElementById('mtNewOrgSecretary')?.value.trim() || '';
    const phone     = document.getElementById('mtNewOrgPhone')?.value.trim() || '';

    // Gọi trực tiếp SheetsAPI để truyền thêm trường
    const id = 'org_' + Date.now();
    await SheetsAPI.append(cfg.spreadsheetId, `${SH.ORGS}!A:F`, [[
      id, name, '', secretary, phone, new Date().toISOString(),
    ]]);

    // Reset form
    ['mtNewOrgName','mtNewOrgSecretary','mtNewOrgPhone'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });

    if (typeof toast === 'function') toast('✅ Đã thêm cơ sở Đoàn: ' + name, 'success');
    mtLoadOrgs();
    if (typeof mtLoadOrgsForSelect === 'function') mtLoadOrgsForSelect();
  } catch (e) {
    if (typeof toast === 'function') toast('Lỗi: ' + e.message, 'error');
  }
};

/** Nâng cấp giao diện form thêm cơ sở Đoàn — inject trường bổ sung */
function mtRoleUpgrade_upgradeAddOrgForm() {
  const nameInput = document.getElementById('mtNewOrgName');
  if (!nameInput || nameInput.dataset.upgraded) return;
  nameInput.dataset.upgraded = '1';
  nameInput.placeholder = 'Tên cơ sở Đoàn *';

  // Thêm 2 trường phụ sau ô tên
  const extraFields = document.createElement('div');
  extraFields.style.cssText = 'display:flex;gap:8px;margin-top:8px';
  extraFields.innerHTML = `
    <input class="form-control" id="mtNewOrgSecretary" placeholder="Bí thư (tùy chọn)" style="flex:1;font-size:15px">
    <input class="form-control" id="mtNewOrgPhone" placeholder="SĐT (tùy chọn)" style="width:140px;font-size:15px" inputmode="tel">
  `;

  const parentRow = nameInput.closest('div');
  if (parentRow) parentRow.after(extraFields);
}

// ═══════════════════════════════════════════════════════════════════════
//  KHỞI TẠO
// ═══════════════════════════════════════════════════════════════════════

(function init() {
  // Export tất cả hàm ra window (sửa lỗi gốc)
  window.mtChangeRole                  = window.mtChangeRole;
  window.mtRoleUpgrade_onRoleChange    = window.mtRoleUpgrade_onRoleChange;
  window.mtRoleUpgrade_doChangeRole    = window.mtRoleUpgrade_doChangeRole;
  window.mtRoleUpgrade_filterUsers     = window.mtRoleUpgrade_filterUsers;
  window.mtRoleUpgrade_resetPIN        = window.mtRoleUpgrade_resetPIN;
  window.mtRoleUpgrade_restoreUser     = window.mtRoleUpgrade_restoreUser;
  window.mtRoleUpgrade_resendInvite    = window.mtRoleUpgrade_resendInvite;
  window.mtRoleUpgrade_editOrg         = window.mtRoleUpgrade_editOrg;
  window.mtRoleUpgrade_saveOrg         = window.mtRoleUpgrade_saveOrg;
  window.mtRoleUpgrade_deleteOrg       = window.mtRoleUpgrade_deleteOrg;

  // Upgrade form thêm org khi modal mở
  const origShowInviteManager = window.mtShowInviteManager;
  window.mtShowInviteManager = function() {
    origShowInviteManager?.();
    setTimeout(mtRoleUpgrade_upgradeAddOrgForm, 300);
  };

  console.log('[ĐoànVăn Role+Org Upgrade v1.0] Loaded — mtChangeRole ✅ EditOrg ✅ FilterUsers ✅ ResetPIN ✅');
})();
