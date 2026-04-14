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
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
window.mtChangeRole = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(username, currentRole, currentOrg, currentOrgName) {
    var _document$getElementB;
    var uname, orgs, cfg, isAdmin, modal, s, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          // Chuẩn hóa username — bỏ @ nếu có
          uname = (username || '').replace(/^@/, '');
          if (uname) {
            _context.n = 1;
            break;
          }
          return _context.a(2);
        case 1:
          // Xóa modal cũ nếu còn
          (_document$getElementB = document.getElementById('mtChangeRoleModal')) === null || _document$getElementB === void 0 || _document$getElementB.remove();

          // Lấy danh sách orgs để chọn
          orgs = [];
          _context.p = 2;
          _context.n = 3;
          return MTUserMgr.listOrgs();
        case 3:
          orgs = _context.v;
          _context.n = 5;
          break;
        case 4:
          _context.p = 4;
          _t = _context.v;
        case 5:
          cfg = typeof MTConfig !== 'undefined' ? MTConfig.get() : null;
          isAdmin = (cfg === null || cfg === void 0 ? void 0 : cfg.role) === 'admin';
          modal = document.createElement('div');
          modal.id = 'mtChangeRoleModal';
          modal.className = 'modal-overlay';
          modal.innerHTML = "\n<div class=\"modal\" style=\"max-width:420px\">\n  <div class=\"modal-header\">\n    <h2 style=\"display:flex;align-items:center;gap:10px\">\n      <span style=\"width:34px;height:34px;border-radius:50%;\n            background:linear-gradient(135deg,var(--red),var(--gold));\n            display:flex;align-items:center;justify-content:center;flex-shrink:0\">\n        <i class=\"fas fa-user-edit\" style=\"color:#fff;font-size:0.85rem\"></i>\n      </span>\n      \u0110\u1ED5i vai tr\xF2 ng\u01B0\u1EDDi d\xF9ng\n    </h2>\n    <button class=\"btn btn-ghost\" onclick=\"document.getElementById('mtChangeRoleModal').remove()\">\n      <i class=\"fas fa-times\"></i>\n    </button>\n  </div>\n\n  <div class=\"modal-body\" style=\"padding:20px\">\n    <!-- Th\xF4ng tin user -->\n    <div style=\"display:flex;align-items:center;gap:12px;padding:12px 14px;\n                background:var(--cream);border-radius:10px;margin-bottom:18px\">\n      <div style=\"width:40px;height:40px;border-radius:50%;flex-shrink:0;\n                  background:linear-gradient(135deg,#1a2340,#c0392b);\n                  display:flex;align-items:center;justify-content:center;\n                  color:#fff;font-size:1rem;font-weight:800\">\n        ".concat(uname[0].toUpperCase(), "\n      </div>\n      <div>\n        <div style=\"font-weight:700;color:var(--navy)\">@").concat(uname, "</div>\n        <div style=\"font-size:0.72rem;color:var(--gray)\">\n          Vai tr\xF2 hi\u1EC7n t\u1EA1i:\n          <span style=\"font-weight:700;color:").concat(currentRole === 'admin' ? '#c0392b' : currentRole === 'manager' ? '#1a2340' : '#6b7280', "\">\n            ").concat(currentRole === 'admin' ? 'Quản trị viên' : currentRole === 'manager' ? 'Quản lý' : 'Đoàn viên', "\n          </span>\n        </div>\n        ").concat(currentOrgName ? "<div style=\"font-size:0.72rem;color:var(--gray)\">C\u01A1 s\u1EDF: ".concat(currentOrgName, "</div>") : '', "\n      </div>\n    </div>\n\n    <!-- Ch\u1ECDn vai tr\xF2 m\u1EDBi -->\n    <div class=\"form-group\">\n      <label class=\"form-label\">Vai tr\xF2 m\u1EDBi <span style=\"color:red\">*</span></label>\n      <div style=\"display:grid;grid-template-columns:repeat(3,1fr);gap:8px\" id=\"mtRoleSelector\">\n        ").concat([{
            value: 'member',
            icon: 'fa-user',
            label: 'Đoàn viên',
            color: '#6b7280'
          }, {
            value: 'manager',
            icon: 'fa-user-tie',
            label: 'Quản lý',
            color: '#1a2340'
          }, {
            value: 'admin',
            icon: 'fa-shield-alt',
            label: 'Admin',
            color: '#c0392b'
          }].map(function (r) {
            return "\n          <label style=\"cursor:pointer\">\n            <input type=\"radio\" name=\"mtNewRole\" value=\"".concat(r.value, "\"\n              ").concat(r.value === (currentRole || 'member') ? 'checked' : '', "\n              onchange=\"mtRoleUpgrade_onRoleChange(this.value)\"\n              style=\"display:none\">\n            <div class=\"mt-role-card ").concat(r.value === (currentRole || 'member') ? 'selected' : '', "\"\n              data-role=\"").concat(r.value, "\"\n              style=\"border:2px solid var(--gray-light);border-radius:10px;padding:10px 6px;\n                     text-align:center;transition:all 0.2s;\n                     ").concat(r.value === (currentRole || 'member') ? 'border-color:' + r.color + ';background:rgba(0,0,0,0.04)' : '', "\">\n              <i class=\"fas ").concat(r.icon, "\" style=\"font-size:1.3rem;color:").concat(r.color, ";margin-bottom:4px;display:block\"></i>\n              <div style=\"font-size:0.72rem;font-weight:700;color:").concat(r.color, "\">").concat(r.label, "</div>\n            </div>\n          </label>");
          }).join(''), "\n      </div>\n    </div>\n\n    <!-- Ch\u1ECDn C\u01A1 s\u1EDF \u0110o\xE0n -->\n    <div class=\"form-group\" id=\"mtChangeOrgGroup\">\n      <label class=\"form-label\">C\u01A1 s\u1EDF \u0110o\xE0n</label>\n      <select class=\"form-control\" id=\"mtChangeRoleOrg\" style=\"font-size:15px\">\n        <option value=\"all\" ").concat(currentOrg === 'all' ? 'selected' : '', ">To\xE0n h\u1EC7 th\u1ED1ng (Admin)</option>\n        ").concat(orgs.map(function (o) {
            return "<option value=\"".concat(o.id, "\" ").concat(currentOrg === o.id ? 'selected' : '', ">").concat(o.name, "</option>");
          }).join(''), "\n      </select>\n    </div>\n\n    <!-- Preview thay \u0111\u1ED5i -->\n    <div id=\"mtRoleChangePreview\" style=\"display:none;padding:10px 12px;border-radius:8px;\n         background:rgba(2,132,199,0.07);border:1px solid rgba(2,132,199,0.2);\n         font-size:0.78rem;margin-bottom:4px\">\n    </div>\n\n    <div id=\"mtChangeRoleStatus\" style=\"font-size:0.78rem;min-height:16px;margin-bottom:12px\"></div>\n  </div>\n\n  <div class=\"modal-footer\">\n    <button class=\"btn btn-ghost\" onclick=\"document.getElementById('mtChangeRoleModal').remove()\">\n      H\u1EE7y\n    </button>\n    <button class=\"btn btn-primary\" onclick=\"mtRoleUpgrade_doChangeRole('").concat(uname, "')\">\n      <i class=\"fas fa-save\"></i> L\u01B0u thay \u0111\u1ED5i\n    </button>\n  </div>\n</div>");

          // Thêm CSS cho role card
          if (!document.getElementById('mtRoleCardCSS')) {
            s = document.createElement('style');
            s.id = 'mtRoleCardCSS';
            s.textContent = "\n      .mt-role-card { cursor:pointer; user-select:none; }\n      .mt-role-card:hover { border-color: var(--navy) !important; background: rgba(26,35,64,0.04) !important; }\n      .mt-role-card.selected { box-shadow: 0 0 0 3px rgba(26,35,64,0.15); }\n      .mt-role-card label { cursor:pointer; }\n    ";
            document.head.appendChild(s);
          }
          document.body.appendChild(modal);
          modal.addEventListener('click', function (e) {
            if (e.target === modal) modal.remove();
          });
          setTimeout(function () {
            modal.classList.add('open');
            mtRoleUpgrade_onRoleChange(currentRole || 'member');
          }, 10);
        case 6:
          return _context.a(2);
      }
    }, _callee, null, [[2, 4]]);
  }));
  return function (_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

/** Cập nhật UI khi chọn role khác */
window.mtRoleUpgrade_onRoleChange = function (role) {
  // Cập nhật visual card
  document.querySelectorAll('.mt-role-card').forEach(function (card) {
    var isSelected = card.dataset.role === role;
    var colors = {
      admin: '#c0392b',
      manager: '#1a2340',
      member: '#6b7280'
    };
    var color = colors[card.dataset.role] || '#6b7280';
    card.style.borderColor = isSelected ? color : 'var(--gray-light)';
    card.style.background = isSelected ? "rgba(0,0,0,0.04)" : '';
    card.style.boxShadow = isSelected ? "0 0 0 3px ".concat(color, "22") : '';
    card.classList.toggle('selected', isSelected);
  });

  // Cập nhật preview
  var preview = document.getElementById('mtRoleChangePreview');
  var orgGroup = document.getElementById('mtChangeOrgGroup');
  if (!preview) return;
  var labels = {
    admin: 'Quản trị viên',
    manager: 'Quản lý',
    member: 'Đoàn viên'
  };
  var icons = {
    admin: '🛡️',
    manager: '👔',
    member: '👤'
  };
  preview.style.display = 'block';
  if (role === 'admin') {
    preview.innerHTML = "".concat(icons.admin, " <strong>").concat(labels.admin, "</strong> \u2014 C\xF3 quy\u1EC1n truy c\u1EADp to\xE0n h\u1EC7 th\u1ED1ng, qu\u1EA3n l\xFD ng\u01B0\u1EDDi d\xF9ng v\xE0 d\u1EEF li\u1EC7u t\u1EA5t c\u1EA3 c\u01A1 s\u1EDF \u0110o\xE0n.");
    if (orgGroup) orgGroup.style.opacity = '0.4';
    var orgSel = document.getElementById('mtChangeRoleOrg');
    if (orgSel) {
      orgSel.value = 'all';
      orgSel.disabled = true;
    }
  } else if (role === 'manager') {
    preview.innerHTML = "".concat(icons.manager, " <strong>").concat(labels.manager, "</strong> \u2014 Xem v\xE0 ch\u1EC9nh s\u1EEDa d\u1EEF li\u1EC7u c\u01A1 s\u1EDF \u0110o\xE0n \u0111\u01B0\u1EE3c ph\xE2n c\xF4ng, th\xEAm \u0111o\xE0n vi\xEAn, t\u1EA1o m\xE3 m\u1EDDi.");
    if (orgGroup) orgGroup.style.opacity = '1';
    var _orgSel = document.getElementById('mtChangeRoleOrg');
    if (_orgSel) _orgSel.disabled = false;
  } else {
    preview.innerHTML = "".concat(icons.member, " <strong>").concat(labels.member, "</strong> \u2014 Ch\u1EC9 xem v\xE0 nh\u1EADp d\u1EEF li\u1EC7u c\u1EE7a c\u01A1 s\u1EDF \u0110o\xE0n \u0111\u01B0\u1EE3c ph\xE2n c\xF4ng.");
    if (orgGroup) orgGroup.style.opacity = '1';
    var _orgSel2 = document.getElementById('mtChangeRoleOrg');
    if (_orgSel2) _orgSel2.disabled = false;
  }
};

/** Thực hiện đổi role lên GSheet */
window.mtRoleUpgrade_doChangeRole = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(username) {
    var _orgEl$options$orgEl$;
    var roleEl, orgEl, statusEl, newRole, newOrgId, newOrgName, cfg, rows, users, idx, rowNum, _t2;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          roleEl = document.querySelector('input[name="mtNewRole"]:checked');
          orgEl = document.getElementById('mtChangeRoleOrg');
          statusEl = document.getElementById('mtChangeRoleStatus');
          newRole = roleEl === null || roleEl === void 0 ? void 0 : roleEl.value;
          newOrgId = (orgEl === null || orgEl === void 0 ? void 0 : orgEl.value) || 'all';
          newOrgName = (orgEl === null || orgEl === void 0 || (_orgEl$options$orgEl$ = orgEl.options[orgEl.selectedIndex]) === null || _orgEl$options$orgEl$ === void 0 ? void 0 : _orgEl$options$orgEl$.text) || '';
          if (newRole) {
            _context2.n = 1;
            break;
          }
          if (statusEl) statusEl.innerHTML = '<span style="color:red">Vui lòng chọn vai trò</span>';
          return _context2.a(2);
        case 1:
          if (statusEl) statusEl.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang cập nhật...';
          _context2.p = 2;
          cfg = MTConfig.get();
          if (cfg !== null && cfg !== void 0 && cfg.spreadsheetId) {
            _context2.n = 3;
            break;
          }
          throw new Error('Chưa cấu hình hệ thống');
        case 3:
          if (!(cfg.role !== 'admin')) {
            _context2.n = 4;
            break;
          }
          throw new Error('Chỉ Admin mới đổi được vai trò');
        case 4:
          _context2.n = 5;
          return SheetsAPI.read(cfg.spreadsheetId, "".concat(SH.USERS, "!A:K"));
        case 5:
          rows = _context2.v;
          users = SheetsAPI.parseSheet(rows);
          idx = users.findIndex(function (u) {
            return u.username === username;
          });
          if (!(idx < 0)) {
            _context2.n = 6;
            break;
          }
          throw new Error('Không tìm thấy người dùng');
        case 6:
          rowNum = idx + 2; // Cập nhật cả role (cột D), orgId (cột E), orgName (cột F)
          _context2.n = 7;
          return SheetsAPI.write(cfg.spreadsheetId, "".concat(SH.USERS, "!D").concat(rowNum, ":F").concat(rowNum), [[newRole, newRole === 'admin' ? 'all' : newOrgId, newRole === 'admin' ? 'Toàn hệ thống' : newOrgName.replace(' (Admin)', '').trim()]]);
        case 7:
          if (statusEl) statusEl.innerHTML = '<span style="color:#16a34a"><i class="fas fa-check-circle"></i> Đã cập nhật!</span>';
          if (typeof toast === 'function') toast("\u2705 \u0110\xE3 \u0111\u1ED5i vai tr\xF2 <strong>@".concat(username, "</strong> th\xE0nh <strong>").concat(newRole === 'admin' ? 'Quản trị viên' : newRole === 'manager' ? 'Quản lý' : 'Đoàn viên', "</strong>"), 'success');
          setTimeout(function () {
            var _document$getElementB2;
            (_document$getElementB2 = document.getElementById('mtChangeRoleModal')) === null || _document$getElementB2 === void 0 || _document$getElementB2.remove();
            if (typeof mtLoadUsers === 'function') mtLoadUsers();
          }, 900);
          _context2.n = 9;
          break;
        case 8:
          _context2.p = 8;
          _t2 = _context2.v;
          if (statusEl) statusEl.innerHTML = "<span style=\"color:red\"><i class=\"fas fa-times-circle\"></i> L\u1ED7i: ".concat(_t2.message, "</span>");
          if (typeof toast === 'function') toast('Lỗi: ' + _t2.message, 'error');
        case 9:
          return _context2.a(2);
      }
    }, _callee2, null, [[2, 8]]);
  }));
  return function (_x5) {
    return _ref2.apply(this, arguments);
  };
}();

// ═══════════════════════════════════════════════════════════════════════
//  PHẦN 2: NÂNG CẤP BẢNG NGƯỜI DÙNG — Filter + Actions đầy đủ
// ═══════════════════════════════════════════════════════════════════════

/** Ghi đè mtLoadUsers để nâng cấp UI bảng người dùng */
window.mtLoadUsers = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
  var el, allUsers, stats, _t3;
  return _regenerator().w(function (_context3) {
    while (1) switch (_context3.p = _context3.n) {
      case 0:
        el = document.getElementById('mtUserList');
        if (el) {
          _context3.n = 1;
          break;
        }
        return _context3.a(2);
      case 1:
        el.innerHTML = '<div style="text-align:center;padding:20px;color:var(--gray)"><i class="fas fa-spinner fa-spin"></i> Đang tải...</div>';
        _context3.p = 2;
        _context3.n = 3;
        return MTUserMgr.listUsers();
      case 3:
        allUsers = _context3.v;
        if (allUsers.length) {
          _context3.n = 4;
          break;
        }
        el.innerHTML = "\n        <div style=\"text-align:center;padding:24px;color:var(--gray)\">\n          <i class=\"fas fa-users\" style=\"font-size:2rem;opacity:0.3;display:block;margin-bottom:8px\"></i>\n          <div style=\"font-weight:600;margin-bottom:4px\">Ch\u01B0a c\xF3 ng\u01B0\u1EDDi d\xF9ng n\xE0o</div>\n          <div style=\"font-size:0.78rem;margin-bottom:12px\">Sheet <code>system_users</code> tr\u1ED1ng ho\u1EB7c ch\u01B0a \u0111\u01B0\u1EE3c kh\u1EDFi t\u1EA1o.</div>\n          <button class=\"btn btn-outline btn-sm\" onclick=\"mtEnsureSheetsAndLoad()\">\n            <i class=\"fas fa-sync-alt\"></i> Kh\u1EDFi t\u1EA1o l\u1EA1i &amp; T\u1EA3i\n          </button>\n        </div>";
        return _context3.a(2);
      case 4:
        // Tính stats
        stats = {
          total: allUsers.length,
          active: allUsers.filter(function (u) {
            return u.status === 'active';
          }).length,
          pending: allUsers.filter(function (u) {
            return u.status === 'pending';
          }).length,
          deleted: allUsers.filter(function (u) {
            return u.status === 'deleted';
          }).length
        };
        el.innerHTML = "\n<!-- Filter bar -->\n<div style=\"display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap;align-items:center\">\n  <div style=\"display:flex;gap:6px;flex:1;flex-wrap:wrap\">\n    <button class=\"btn btn-sm mt-ufilter-btn active\" data-filter=\"all\"\n      onclick=\"mtRoleUpgrade_filterUsers('all',this)\" style=\"font-size:0.72rem\">\n      T\u1EA5t c\u1EA3 <span style=\"background:rgba(0,0,0,0.1);padding:1px 6px;border-radius:10px;margin-left:3px\">".concat(stats.total, "</span>\n    </button>\n    <button class=\"btn btn-sm mt-ufilter-btn\" data-filter=\"active\"\n      onclick=\"mtRoleUpgrade_filterUsers('active',this)\" style=\"font-size:0.72rem;color:#16a34a\">\n      Ho\u1EA1t \u0111\u1ED9ng <span style=\"background:rgba(22,163,74,0.12);padding:1px 6px;border-radius:10px;margin-left:3px\">").concat(stats.active, "</span>\n    </button>\n    <button class=\"btn btn-sm mt-ufilter-btn\" data-filter=\"pending\"\n      onclick=\"mtRoleUpgrade_filterUsers('pending',this)\" style=\"font-size:0.72rem;color:#d97706\">\n      Ch\u1EDD k\xEDch ho\u1EA1t <span style=\"background:rgba(217,119,6,0.12);padding:1px 6px;border-radius:10px;margin-left:3px\">").concat(stats.pending, "</span>\n    </button>\n    ").concat(stats.deleted ? "<button class=\"btn btn-sm mt-ufilter-btn\" data-filter=\"deleted\"\n      onclick=\"mtRoleUpgrade_filterUsers('deleted',this)\" style=\"font-size:0.72rem;color:#9ca3af\">\n      V\xF4 hi\u1EC7u <span style=\"background:rgba(0,0,0,0.07);padding:1px 6px;border-radius:10px;margin-left:3px\">".concat(stats.deleted, "</span>\n    </button>") : '', "\n  </div>\n  <button class=\"btn btn-ghost btn-sm\" onclick=\"mtLoadUsers()\" title=\"L\xE0m m\u1EDBi\">\n    <i class=\"fas fa-sync-alt\"></i>\n  </button>\n</div>\n\n<!-- Table -->\n<div style=\"overflow-x:auto;-webkit-overflow-scrolling:touch\">\n<table class=\"doc-table\" id=\"mtUpgradeUserTable\" style=\"width:100%;min-width:560px\">\n  <thead><tr>\n    <th style=\"min-width:140px\">Ng\u01B0\u1EDDi d\xF9ng</th>\n    <th>Vai tr\xF2</th>\n    <th>C\u01A1 s\u1EDF \u0110o\xE0n</th>\n    <th>Tr\u1EA1ng th\xE1i</th>\n    <th>L\u1EA7n cu\u1ED1i</th>\n    <th style=\"text-align:right;min-width:110px\">Thao t\xE1c</th>\n  </tr></thead>\n  <tbody>\n    ").concat(allUsers.map(function (u) {
          var _MT_ROLES$u$role, _MT_ROLES$u$role2;
          return "\n    <tr data-status=\"".concat(u.status, "\" class=\"mt-user-row\">\n      <td>\n        <div style=\"display:flex;align-items:center;gap:8px\">\n          <div style=\"width:32px;height:32px;border-radius:50%;flex-shrink:0;\n                      background:linear-gradient(135deg,").concat(u.role === 'admin' ? '#c0392b,#e74c3c' : u.role === 'manager' ? '#1a2340,#2c3e6e' : '#6b7280,#9ca3af', ");\n                      display:flex;align-items:center;justify-content:center;\n                      color:#fff;font-size:0.78rem;font-weight:800\">\n            ").concat((u.displayName || u.username)[0].toUpperCase(), "\n          </div>\n          <div>\n            <div style=\"font-weight:700;color:var(--navy);font-size:0.85rem\">").concat(u.displayName || u.username, "</div>\n            <div style=\"font-size:0.68rem;color:var(--gray)\">@").concat(u.username, "</div>\n          </div>\n        </div>\n      </td>\n      <td>\n        <span style=\"display:inline-flex;align-items:center;gap:4px;padding:3px 10px;border-radius:20px;\n              background:").concat(u.role === 'admin' ? 'rgba(192,57,43,0.1)' : u.role === 'manager' ? 'rgba(26,35,64,0.1)' : 'rgba(107,114,128,0.1)', ";\n              font-size:0.72rem;font-weight:700;\n              color:").concat(u.role === 'admin' ? '#c0392b' : u.role === 'manager' ? '#1a2340' : '#6b7280', "\">\n          <i class=\"fas ").concat(((_MT_ROLES$u$role = MT_ROLES[u.role]) === null || _MT_ROLES$u$role === void 0 ? void 0 : _MT_ROLES$u$role.icon) || 'fa-user', "\"></i>\n          ").concat(((_MT_ROLES$u$role2 = MT_ROLES[u.role]) === null || _MT_ROLES$u$role2 === void 0 ? void 0 : _MT_ROLES$u$role2.label) || u.role, "\n        </span>\n      </td>\n      <td style=\"font-size:0.78rem;color:var(--text-soft)\">").concat(u.orgName || u.orgId || '—', "</td>\n      <td>\n        <span style=\"display:inline-flex;align-items:center;gap:4px;font-size:0.72rem;font-weight:600;\n              color:").concat(u.status === 'active' ? '#16a34a' : u.status === 'pending' ? '#d97706' : '#9ca3af', "\">\n          <i class=\"fas ").concat(u.status === 'active' ? 'fa-check-circle' : u.status === 'pending' ? 'fa-clock' : 'fa-ban', "\"></i>\n          ").concat(u.status === 'active' ? 'Hoạt động' : u.status === 'pending' ? 'Chờ kích hoạt' : 'Vô hiệu', "\n        </span>\n      </td>\n      <td style=\"font-size:0.72rem;color:var(--gray)\">\n        ").concat(u.lastLogin ? new Date(u.lastLogin).toLocaleDateString('vi-VN') : '—', "\n      </td>\n      <td style=\"text-align:right\">\n        <div style=\"display:flex;gap:4px;justify-content:flex-end;flex-wrap:nowrap\">\n          <!-- \u0110\u1ED5i role -->\n          <button class=\"btn btn-ghost btn-sm\"\n            onclick=\"mtChangeRole('").concat(u.username, "','").concat(u.role, "','").concat(u.orgId || 'all', "','").concat((u.orgName || '').replace(/'/g, '&apos;'), "')\"\n            title=\"\u0110\u1ED5i vai tr\xF2\" style=\"color:var(--navy)\">\n            <i class=\"fas fa-user-edit\"></i>\n          </button>\n          <!-- Reset PIN -->\n          <button class=\"btn btn-ghost btn-sm\"\n            onclick=\"mtRoleUpgrade_resetPIN('").concat(u.username, "')\"\n            title=\"\u0110\u1EB7t l\u1EA1i PIN v\u1EC1 123456\" style=\"color:#d97706\">\n            <i class=\"fas fa-key\"></i>\n          </button>\n          ").concat(u.status === 'deleted' ? "<!-- Kh\xF4i ph\u1EE5c -->\n               <button class=\"btn btn-ghost btn-sm\"\n                 onclick=\"mtRoleUpgrade_restoreUser('".concat(u.username, "')\"\n                 title=\"Kh\xF4i ph\u1EE5c t\xE0i kho\u1EA3n\" style=\"color:#16a34a\">\n                 <i class=\"fas fa-user-check\"></i>\n               </button>") : u.status === 'pending' ? "<!-- G\u1EEDi l\u1EA1i m\xE3 m\u1EDDi -->\n                 <button class=\"btn btn-ghost btn-sm\"\n                   onclick=\"mtRoleUpgrade_resendInvite('".concat(u.username, "','").concat(u.role, "','").concat(u.orgId || 'all', "','").concat((u.orgName || '').replace(/'/g, '&apos;'), "')\"\n                   title=\"T\u1EA1o l\u1EA1i m\xE3 m\u1EDDi\" style=\"color:#0284c7\">\n                   <i class=\"fas fa-paper-plane\"></i>\n                 </button>") : '', "\n          <!-- V\xF4 hi\u1EC7u h\xF3a / X\xF3a -->\n          ").concat(u.status !== 'deleted' ? "\n          <button class=\"btn btn-ghost btn-sm\"\n            onclick=\"mtRemoveUser('".concat(u.username, "')\"\n            title=\"V\xF4 hi\u1EC7u h\xF3a t\xE0i kho\u1EA3n\" style=\"color:var(--red)\">\n            <i class=\"fas fa-user-times\"></i>\n          </button>") : '', "\n        </div>\n      </td>\n    </tr>");
        }).join(''), "\n  </tbody>\n</table>\n</div>\n\n<style>\n  .mt-ufilter-btn { background:var(--cream);border:1.5px solid var(--gray-light); }\n  .mt-ufilter-btn.active { background:var(--navy);color:#fff;border-color:var(--navy); }\n  .mt-ufilter-btn:hover:not(.active) { border-color:var(--navy); }\n  .mt-user-row:hover td { background:rgba(26,35,64,0.02); }\n</style>");
        _context3.n = 6;
        break;
      case 5:
        _context3.p = 5;
        _t3 = _context3.v;
        el.innerHTML = "\n      <div style=\"color:#dc2626;padding:16px;background:rgba(220,38,38,0.05);border-radius:8px;border:1px solid rgba(220,38,38,0.15)\">\n        <div style=\"font-weight:700;margin-bottom:4px\"><i class=\"fas fa-exclamation-triangle\"></i> L\u1ED7i t\u1EA3i d\u1EEF li\u1EC7u</div>\n        <div style=\"font-size:0.8rem;margin-bottom:10px\">".concat(_t3.message, "</div>\n        <button class=\"btn btn-outline btn-sm\" onclick=\"mtLoadUsers()\">\n          <i class=\"fas fa-sync-alt\"></i> Th\u1EED l\u1EA1i\n        </button>\n      </div>");
      case 6:
        return _context3.a(2);
    }
  }, _callee3, null, [[2, 5]]);
}));

/** Filter bảng người dùng theo status */
window.mtRoleUpgrade_filterUsers = function (filter, btn) {
  // Cập nhật nút active
  document.querySelectorAll('.mt-ufilter-btn').forEach(function (b) {
    return b.classList.remove('active');
  });
  if (btn) btn.classList.add('active');

  // Hiện/ẩn hàng
  document.querySelectorAll('.mt-user-row').forEach(function (row) {
    var status = row.dataset.status;
    row.style.display = filter === 'all' || status === filter ? '' : 'none';
  });
};

// ═══════════════════════════════════════════════════════════════════════
//  PHẦN 3: ACTION NGƯỜI DÙNG — Reset PIN, Khôi phục, Gửi lại mã mời
// ═══════════════════════════════════════════════════════════════════════

/** Admin đặt lại PIN về 123456 */
window.mtRoleUpgrade_resetPIN = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(username) {
    var cfg, rows, users, idx, defaultHash, _t4;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.p = _context4.n) {
        case 0:
          if (confirm("\u0110\u1EB7t l\u1EA1i PIN c\u1EE7a @".concat(username, " v\u1EC1 \"123456\"?\nNg\u01B0\u1EDDi d\xF9ng c\u1EA7n \u0111\u1ED5i PIN ngay sau khi \u0111\u0103ng nh\u1EADp."))) {
            _context4.n = 1;
            break;
          }
          return _context4.a(2);
        case 1:
          _context4.p = 1;
          cfg = MTConfig.get();
          if (!(!(cfg !== null && cfg !== void 0 && cfg.spreadsheetId) || cfg.role !== 'admin')) {
            _context4.n = 2;
            break;
          }
          throw new Error('Chỉ Admin mới có thể reset PIN');
        case 2:
          _context4.n = 3;
          return SheetsAPI.read(cfg.spreadsheetId, "".concat(SH.USERS, "!A:K"));
        case 3:
          rows = _context4.v;
          users = SheetsAPI.parseSheet(rows);
          idx = users.findIndex(function (u) {
            return u.username === username;
          });
          if (!(idx < 0)) {
            _context4.n = 4;
            break;
          }
          throw new Error('Không tìm thấy người dùng');
        case 4:
          // Hash PIN 123456
          defaultHash = function () {
            var h = 5381;
            var _iterator = _createForOfIteratorHelper('123456'),
              _step;
            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var c = _step.value;
                h = (h << 5) + h ^ c.charCodeAt(0);
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }
            return (h >>> 0).toString(16).padStart(8, '0');
          }();
          _context4.n = 5;
          return SheetsAPI.write(cfg.spreadsheetId, "".concat(SH.USERS, "!C").concat(idx + 2), [[defaultHash]]);
        case 5:
          if (typeof toast === 'function') toast("\uD83D\uDD11 \u0110\xE3 reset PIN c\u1EE7a @".concat(username, " v\u1EC1 <strong>123456</strong>"), 'success');
          _context4.n = 7;
          break;
        case 6:
          _context4.p = 6;
          _t4 = _context4.v;
          if (typeof toast === 'function') toast('Lỗi: ' + _t4.message, 'error');
        case 7:
          return _context4.a(2);
      }
    }, _callee4, null, [[1, 6]]);
  }));
  return function (_x6) {
    return _ref4.apply(this, arguments);
  };
}();

/** Khôi phục tài khoản bị vô hiệu hóa */
window.mtRoleUpgrade_restoreUser = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(username) {
    var cfg, rows, users, idx, _t5;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.p = _context5.n) {
        case 0:
          if (confirm("Kh\xF4i ph\u1EE5c t\xE0i kho\u1EA3n @".concat(username, "?"))) {
            _context5.n = 1;
            break;
          }
          return _context5.a(2);
        case 1:
          _context5.p = 1;
          cfg = MTConfig.get();
          if (!(!(cfg !== null && cfg !== void 0 && cfg.spreadsheetId) || cfg.role !== 'admin')) {
            _context5.n = 2;
            break;
          }
          throw new Error('Chỉ Admin mới có thể khôi phục');
        case 2:
          _context5.n = 3;
          return SheetsAPI.read(cfg.spreadsheetId, "".concat(SH.USERS, "!A:K"));
        case 3:
          rows = _context5.v;
          users = SheetsAPI.parseSheet(rows);
          idx = users.findIndex(function (u) {
            return u.username === username;
          });
          if (!(idx < 0)) {
            _context5.n = 4;
            break;
          }
          throw new Error('Không tìm thấy người dùng');
        case 4:
          _context5.n = 5;
          return SheetsAPI.write(cfg.spreadsheetId, "".concat(SH.USERS, "!J").concat(idx + 2), [['active']]);
        case 5:
          if (typeof toast === 'function') toast("\u2705 \u0110\xE3 kh\xF4i ph\u1EE5c t\xE0i kho\u1EA3n @".concat(username), 'success');
          mtLoadUsers();
          _context5.n = 7;
          break;
        case 6:
          _context5.p = 6;
          _t5 = _context5.v;
          if (typeof toast === 'function') toast('Lỗi: ' + _t5.message, 'error');
        case 7:
          return _context5.a(2);
      }
    }, _callee5, null, [[1, 6]]);
  }));
  return function (_x7) {
    return _ref5.apply(this, arguments);
  };
}();

/** Tạo lại mã mời cho tài khoản pending */
window.mtRoleUpgrade_resendInvite = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(username, role, orgId, orgName) {
    var _code$match, _document$getElementB3, _yield$MTAdmin$genera, code, formatted, m, _t6;
    return _regenerator().w(function (_context6) {
      while (1) switch (_context6.p = _context6.n) {
        case 0:
          _context6.p = 0;
          _context6.n = 1;
          return MTAdmin.generateInviteCode(username, role, orgId, orgName);
        case 1:
          _yield$MTAdmin$genera = _context6.v;
          code = _yield$MTAdmin$genera.code;
          formatted = ((_code$match = code.match(/.{1,4}/g)) === null || _code$match === void 0 ? void 0 : _code$match.join(' ')) || code; // Hiện modal mini với code và QR
          (_document$getElementB3 = document.getElementById('mtResendInviteModal')) === null || _document$getElementB3 === void 0 || _document$getElementB3.remove();
          m = document.createElement('div');
          m.id = 'mtResendInviteModal';
          m.className = 'modal-overlay';
          m.innerHTML = "\n<div class=\"modal\" style=\"max-width:380px\">\n  <div class=\"modal-header\">\n    <h2><i class=\"fas fa-paper-plane\" style=\"color:var(--red);margin-right:8px\"></i> M\xE3 m\u1EDDi m\u1EDBi</h2>\n    <button class=\"btn btn-ghost\" onclick=\"document.getElementById('mtResendInviteModal').remove()\"><i class=\"fas fa-times\"></i></button>\n  </div>\n  <div class=\"modal-body\" style=\"padding:20px;text-align:center\">\n    <div style=\"font-size:0.78rem;color:var(--gray);margin-bottom:10px\">\n      M\xE3 m\u1EDDi cho <strong>@".concat(username, "</strong> \u2014 h\u1EBFt h\u1EA1n sau 7 ng\xE0y\n    </div>\n    <div onclick=\"navigator.clipboard?.writeText('").concat(code, "');if(typeof toast==='function')toast('\u0110\xE3 sao ch\xE9p!','success')\"\n      style=\"font-family:monospace;font-size:2rem;font-weight:900;letter-spacing:8px;\n             color:var(--navy);padding:16px;background:var(--cream);border-radius:12px;\n             border:2px dashed var(--gray-light);cursor:pointer;user-select:all;margin-bottom:12px\">\n      ").concat(formatted, "\n    </div>\n    <img src=\"https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=").concat(encodeURIComponent('DOANVAN:' + code), "\"\n      style=\"width:150px;height:150px;border-radius:10px;border:2px solid var(--gray-light);padding:4px;background:#fff\"\n      alt=\"QR ").concat(formatted, "\">\n    <div style=\"font-size:0.68rem;color:var(--gray);margin-top:6px\">Nh\u1EA5n code \u0111\u1EC3 sao ch\xE9p</div>\n  </div>\n  <div class=\"modal-footer\">\n    <button class=\"btn btn-outline\" onclick=\"navigator.clipboard?.writeText('").concat(code, "');if(typeof toast==='function')toast('\u0110\xE3 sao ch\xE9p!','success')\">\n      <i class=\"fas fa-copy\"></i> Sao ch\xE9p\n    </button>\n    <button class=\"btn btn-primary\" onclick=\"document.getElementById('mtResendInviteModal').remove()\">\u0110\xF3ng</button>\n  </div>\n</div>");
          document.body.appendChild(m);
          m.addEventListener('click', function (e) {
            if (e.target === m) m.remove();
          });
          setTimeout(function () {
            return m.classList.add('open');
          }, 10);
          if (typeof toast === 'function') toast("\u2705 \u0110\xE3 t\u1EA1o m\xE3 m\u1EDDi m\u1EDBi cho @".concat(username), 'success');
          _context6.n = 3;
          break;
        case 2:
          _context6.p = 2;
          _t6 = _context6.v;
          if (typeof toast === 'function') toast('Lỗi: ' + _t6.message, 'error');
        case 3:
          return _context6.a(2);
      }
    }, _callee6, null, [[0, 2]]);
  }));
  return function (_x8, _x9, _x0, _x1) {
    return _ref6.apply(this, arguments);
  };
}();

// ═══════════════════════════════════════════════════════════════════════
//  PHẦN 4: NÂNG CẤP QUẢN LÝ CƠ SỞ ĐOÀN — Chỉnh sửa + Xóa
// ═══════════════════════════════════════════════════════════════════════

/** Ghi đè mtLoadOrgs — thêm nút Sửa + Xóa */
window.mtLoadOrgs = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
  var el, orgs, _t7;
  return _regenerator().w(function (_context7) {
    while (1) switch (_context7.p = _context7.n) {
      case 0:
        el = document.getElementById('mtOrgList');
        if (el) {
          _context7.n = 1;
          break;
        }
        return _context7.a(2);
      case 1:
        el.innerHTML = '<div style="text-align:center;padding:20px;color:var(--gray)"><i class="fas fa-spinner fa-spin"></i></div>';
        _context7.p = 2;
        _context7.n = 3;
        return MTUserMgr.listOrgs();
      case 3:
        orgs = _context7.v;
        if (orgs.length) {
          _context7.n = 4;
          break;
        }
        el.innerHTML = '<div style="color:var(--gray);text-align:center;padding:16px">Chưa có cơ sở Đoàn. Thêm mới bên trên.</div>';
        return _context7.a(2);
      case 4:
        el.innerHTML = orgs.map(function (o, i) {
          return "\n<div style=\"display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:10px;\n            border:1.5px solid var(--gray-light);margin-bottom:8px;transition:all 0.2s;background:#fff\"\n     onmouseover=\"this.style.borderColor='var(--navy)'\"\n     onmouseout=\"this.style.borderColor='var(--gray-light)'\">\n  <div style=\"width:40px;height:40px;border-radius:50%;flex-shrink:0;\n              background:linear-gradient(135deg,var(--red),var(--gold));\n              display:flex;align-items:center;justify-content:center;color:#fff;font-size:1.1rem\">\n    <i class=\"fas fa-school\"></i>\n  </div>\n  <div style=\"flex:1;min-width:0\">\n    <div style=\"font-weight:700;color:var(--navy);font-size:0.88rem;\n                white-space:nowrap;overflow:hidden;text-overflow:ellipsis\">".concat(o.name, "</div>\n    <div style=\"font-size:0.7rem;color:var(--gray);margin-top:1px\">\n      ").concat(o.secretary ? "<span><i class=\"fas fa-user-tie\" style=\"margin-right:3px\"></i>".concat(o.secretary, "</span>") : '', "\n      ").concat(o.phone ? "<span style=\"margin-left:8px\"><i class=\"fas fa-phone\" style=\"margin-right:3px\"></i>".concat(o.phone, "</span>") : '', "\n      ").concat(o.address ? "<span style=\"margin-left:8px\"><i class=\"fas fa-map-marker-alt\" style=\"margin-right:3px\"></i>".concat(o.address, "</span>") : '', "\n    </div>\n    <code style=\"font-size:0.65rem;color:var(--gray);background:var(--cream);\n                 padding:1px 6px;border-radius:4px\">").concat(o.id, "</code>\n  </div>\n  <div style=\"display:flex;gap:4px;flex-shrink:0\">\n    <button class=\"btn btn-ghost btn-sm\"\n      onclick=\"mtRoleUpgrade_editOrg('").concat(o.id, "','").concat(o.name.replace(/'/g, '&apos;'), "','").concat((o.address || '').replace(/'/g, '&apos;'), "','").concat((o.secretary || '').replace(/'/g, '&apos;'), "','").concat((o.phone || '').replace(/'/g, '&apos;'), "')\"\n      title=\"Ch\u1EC9nh s\u1EEDa\" style=\"color:var(--navy)\">\n      <i class=\"fas fa-pencil-alt\"></i>\n    </button>\n    <button class=\"btn btn-ghost btn-sm\"\n      onclick=\"mtRoleUpgrade_deleteOrg('").concat(o.id, "','").concat(o.name.replace(/'/g, '&apos;'), "')\"\n      title=\"X\xF3a c\u01A1 s\u1EDF \u0110o\xE0n\" style=\"color:var(--red)\">\n      <i class=\"fas fa-trash-alt\"></i>\n    </button>\n  </div>\n</div>");
        }).join('');
        _context7.n = 6;
        break;
      case 5:
        _context7.p = 5;
        _t7 = _context7.v;
        el.innerHTML = "\n      <div style=\"color:#dc2626;padding:14px;background:rgba(220,38,38,0.05);border-radius:8px;border:1px solid rgba(220,38,38,0.15)\">\n        <div style=\"font-weight:700;margin-bottom:4px\"><i class=\"fas fa-exclamation-triangle\"></i> L\u1ED7i t\u1EA3i d\u1EEF li\u1EC7u</div>\n        <div style=\"font-size:0.8rem;margin-bottom:10px\">".concat(_t7.message, "</div>\n        <button class=\"btn btn-outline btn-sm\" onclick=\"mtLoadOrgs()\">\n          <i class=\"fas fa-sync-alt\"></i> Th\u1EED l\u1EA1i\n        </button>\n      </div>");
      case 6:
        return _context7.a(2);
    }
  }, _callee7, null, [[2, 5]]);
}));

/** Modal chỉnh sửa cơ sở Đoàn */
window.mtRoleUpgrade_editOrg = function (orgId, name, address, secretary, phone) {
  var _document$getElementB4;
  (_document$getElementB4 = document.getElementById('mtEditOrgModal')) === null || _document$getElementB4 === void 0 || _document$getElementB4.remove();
  var modal = document.createElement('div');
  modal.id = 'mtEditOrgModal';
  modal.className = 'modal-overlay';
  modal.innerHTML = "\n<div class=\"modal\" style=\"max-width:440px\">\n  <div class=\"modal-header\">\n    <h2 style=\"display:flex;align-items:center;gap:10px\">\n      <span style=\"width:34px;height:34px;border-radius:50%;\n            background:linear-gradient(135deg,var(--red),var(--gold));\n            display:flex;align-items:center;justify-content:center;flex-shrink:0\">\n        <i class=\"fas fa-school\" style=\"color:#fff;font-size:0.85rem\"></i>\n      </span>\n      Ch\u1EC9nh s\u1EEDa c\u01A1 s\u1EDF \u0110o\xE0n\n    </h2>\n    <button class=\"btn btn-ghost\" onclick=\"document.getElementById('mtEditOrgModal').remove()\">\n      <i class=\"fas fa-times\"></i>\n    </button>\n  </div>\n  <div class=\"modal-body\" style=\"padding:20px\">\n\n    <div style=\"font-size:0.72rem;color:var(--gray);background:var(--cream);\n                border-radius:8px;padding:8px 12px;margin-bottom:16px\">\n      <i class=\"fas fa-info-circle\"></i> ID c\u01A1 s\u1EDF \u0110o\xE0n:\n      <code style=\"font-weight:700\">".concat(orgId, "</code>\n      (kh\xF4ng th\u1EC3 thay \u0111\u1ED5i)\n    </div>\n\n    <div class=\"form-group\">\n      <label class=\"form-label\">T\xEAn c\u01A1 s\u1EDF \u0110o\xE0n <span style=\"color:red\">*</span></label>\n      <input class=\"form-control\" id=\"mtEditOrgName\" value=\"").concat(name, "\"\n        placeholder=\"VD: Chi \u0111o\xE0n c\u01A1 s\u1EDF B\u1EC7nh vi\u1EC7n...\" style=\"font-size:16px\">\n    </div>\n\n    <div class=\"form-group\">\n      <label class=\"form-label\">B\xED th\u01B0</label>\n      <input class=\"form-control\" id=\"mtEditOrgSecretary\" value=\"").concat(secretary, "\"\n        placeholder=\"H\u1ECD v\xE0 t\xEAn B\xED th\u01B0\" style=\"font-size:16px\">\n    </div>\n\n    <div class=\"form-row\" style=\"grid-template-columns:1fr 1fr\">\n      <div class=\"form-group\">\n        <label class=\"form-label\">S\u1ED1 \u0111i\u1EC7n tho\u1EA1i</label>\n        <input class=\"form-control\" id=\"mtEditOrgPhone\" value=\"").concat(phone, "\"\n          placeholder=\"0901234567\" inputmode=\"tel\" style=\"font-size:16px\">\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-label\">\u0110\u1ECBa ch\u1EC9</label>\n        <input class=\"form-control\" id=\"mtEditOrgAddress\" value=\"").concat(address, "\"\n          placeholder=\"\u0110\u1ECBa ch\u1EC9...\" style=\"font-size:16px\">\n      </div>\n    </div>\n\n    <div id=\"mtEditOrgStatus\" style=\"font-size:0.78rem;min-height:16px\"></div>\n  </div>\n  <div class=\"modal-footer\">\n    <button class=\"btn btn-ghost\" onclick=\"document.getElementById('mtEditOrgModal').remove()\">H\u1EE7y</button>\n    <button class=\"btn btn-primary\" onclick=\"mtRoleUpgrade_saveOrg('").concat(orgId, "')\">\n      <i class=\"fas fa-save\"></i> L\u01B0u thay \u0111\u1ED5i\n    </button>\n  </div>\n</div>");
  document.body.appendChild(modal);
  modal.addEventListener('click', function (e) {
    if (e.target === modal) modal.remove();
  });
  setTimeout(function () {
    return modal.classList.add('open');
  }, 10);
};

/** Lưu thay đổi cơ sở Đoàn vào GSheet */
window.mtRoleUpgrade_saveOrg = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(orgId) {
    var _document$getElementB5, _document$getElementB6, _document$getElementB7, _document$getElementB8;
    var newName, newSecretary, newPhone, newAddress, statusEl, cfg, rows, headers, dataRows, idx, rowNum, _t8;
    return _regenerator().w(function (_context8) {
      while (1) switch (_context8.p = _context8.n) {
        case 0:
          newName = (_document$getElementB5 = document.getElementById('mtEditOrgName')) === null || _document$getElementB5 === void 0 ? void 0 : _document$getElementB5.value.trim();
          newSecretary = (_document$getElementB6 = document.getElementById('mtEditOrgSecretary')) === null || _document$getElementB6 === void 0 ? void 0 : _document$getElementB6.value.trim();
          newPhone = (_document$getElementB7 = document.getElementById('mtEditOrgPhone')) === null || _document$getElementB7 === void 0 ? void 0 : _document$getElementB7.value.trim();
          newAddress = (_document$getElementB8 = document.getElementById('mtEditOrgAddress')) === null || _document$getElementB8 === void 0 ? void 0 : _document$getElementB8.value.trim();
          statusEl = document.getElementById('mtEditOrgStatus');
          if (newName) {
            _context8.n = 1;
            break;
          }
          if (statusEl) statusEl.innerHTML = '<span style="color:red">Vui lòng nhập tên cơ sở Đoàn</span>';
          return _context8.a(2);
        case 1:
          if (statusEl) statusEl.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang lưu...';
          _context8.p = 2;
          cfg = MTConfig.get();
          if (cfg !== null && cfg !== void 0 && cfg.spreadsheetId) {
            _context8.n = 3;
            break;
          }
          throw new Error('Chưa cấu hình hệ thống');
        case 3:
          if (!(cfg.role !== 'admin')) {
            _context8.n = 4;
            break;
          }
          throw new Error('Chỉ Admin mới có thể chỉnh sửa');
        case 4:
          _context8.n = 5;
          return SheetsAPI.read(cfg.spreadsheetId, "".concat(SH.ORGS, "!A:F"));
        case 5:
          rows = _context8.v;
          if (!(!rows || rows.length < 2)) {
            _context8.n = 6;
            break;
          }
          throw new Error('Không đọc được danh sách cơ sở Đoàn');
        case 6:
          headers = rows[0]; // ['id','name','address','secretary','phone','createdAt']
          dataRows = rows.slice(1);
          idx = dataRows.findIndex(function (r) {
            return r[0] === orgId;
          });
          if (!(idx < 0)) {
            _context8.n = 7;
            break;
          }
          throw new Error('Không tìm thấy cơ sở Đoàn với ID: ' + orgId);
        case 7:
          rowNum = idx + 2; // +1 header +1 index-start-1
          // Cột theo header: A=id, B=name, C=address, D=secretary, E=phone, F=createdAt
          _context8.n = 8;
          return SheetsAPI.write(cfg.spreadsheetId, "".concat(SH.ORGS, "!B").concat(rowNum, ":E").concat(rowNum), [[newName, newAddress, newSecretary, newPhone]]);
        case 8:
          if (statusEl) statusEl.innerHTML = '<span style="color:#16a34a"><i class="fas fa-check-circle"></i> Đã lưu!</span>';
          if (typeof toast === 'function') toast("\u2705 \u0110\xE3 c\u1EADp nh\u1EADt: <strong>".concat(newName, "</strong>"), 'success');
          setTimeout(function () {
            var _document$getElementB9;
            (_document$getElementB9 = document.getElementById('mtEditOrgModal')) === null || _document$getElementB9 === void 0 || _document$getElementB9.remove();
            mtLoadOrgs();
            // Cập nhật dropdown org nếu đang mở
            if (typeof mtLoadOrgsForSelect === 'function') mtLoadOrgsForSelect();
          }, 700);
          _context8.n = 10;
          break;
        case 9:
          _context8.p = 9;
          _t8 = _context8.v;
          if (statusEl) statusEl.innerHTML = "<span style=\"color:red\"><i class=\"fas fa-times-circle\"></i> L\u1ED7i: ".concat(_t8.message, "</span>");
          if (typeof toast === 'function') toast('Lỗi: ' + _t8.message, 'error');
        case 10:
          return _context8.a(2);
      }
    }, _callee8, null, [[2, 9]]);
  }));
  return function (_x10) {
    return _ref8.apply(this, arguments);
  };
}();

/** Xóa cơ sở Đoàn */
window.mtRoleUpgrade_deleteOrg = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(orgId, orgName) {
    var cfg, rows, dataRows, idx, rowNum, _t9;
    return _regenerator().w(function (_context9) {
      while (1) switch (_context9.p = _context9.n) {
        case 0:
          if (confirm("X\xF3a c\u01A1 s\u1EDF \u0110o\xE0n \"".concat(orgName, "\"?\n\nL\u01B0u \xFD: Ng\u01B0\u1EDDi d\xF9ng thu\u1ED9c c\u01A1 s\u1EDF n\xE0y s\u1EBD kh\xF4ng b\u1ECB x\xF3a, nh\u01B0ng c\u1EA7n \u0111\u01B0\u1EE3c c\u1EADp nh\u1EADt l\u1EA1i c\u01A1 s\u1EDF \u0110o\xE0n."))) {
            _context9.n = 1;
            break;
          }
          return _context9.a(2);
        case 1:
          _context9.p = 1;
          cfg = MTConfig.get();
          if (!(!(cfg !== null && cfg !== void 0 && cfg.spreadsheetId) || cfg.role !== 'admin')) {
            _context9.n = 2;
            break;
          }
          throw new Error('Chỉ Admin mới có thể xóa');
        case 2:
          _context9.n = 3;
          return SheetsAPI.read(cfg.spreadsheetId, "".concat(SH.ORGS, "!A:F"));
        case 3:
          rows = _context9.v;
          if (!(!rows || rows.length < 2)) {
            _context9.n = 4;
            break;
          }
          throw new Error('Không đọc được danh sách');
        case 4:
          dataRows = rows.slice(1);
          idx = dataRows.findIndex(function (r) {
            return r[0] === orgId;
          });
          if (!(idx < 0)) {
            _context9.n = 5;
            break;
          }
          throw new Error('Không tìm thấy cơ sở Đoàn');
        case 5:
          rowNum = idx + 2; // Đánh dấu xóa: ghi [DELETED] vào tên
          _context9.n = 6;
          return SheetsAPI.write(cfg.spreadsheetId, "".concat(SH.ORGS, "!B").concat(rowNum), [["[DELETED] ".concat(orgName)]]);
        case 6:
          if (typeof toast === 'function') toast("\uD83D\uDDD1\uFE0F \u0110\xE3 x\xF3a c\u01A1 s\u1EDF \u0110o\xE0n: ".concat(orgName), 'success');
          mtLoadOrgs();
          if (typeof mtLoadOrgsForSelect === 'function') mtLoadOrgsForSelect();
          _context9.n = 8;
          break;
        case 7:
          _context9.p = 7;
          _t9 = _context9.v;
          if (typeof toast === 'function') toast('Lỗi: ' + _t9.message, 'error');
        case 8:
          return _context9.a(2);
      }
    }, _callee9, null, [[1, 7]]);
  }));
  return function (_x11, _x12) {
    return _ref9.apply(this, arguments);
  };
}();

// ═══════════════════════════════════════════════════════════════════════
//  PHẦN 5: NÂNG CẤP FORM THÊM CƠ SỞ ĐOÀN — thêm trường địa chỉ, bí thư
// ═══════════════════════════════════════════════════════════════════════

/** Ghi đè mtAddOrg để thu thập thêm thông tin */
window.mtAddOrg = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0() {
  var _document$getElementB0;
  var name, _document$getElementB1, _document$getElementB10, cfg, secretary, phone, id, _t0;
  return _regenerator().w(function (_context0) {
    while (1) switch (_context0.p = _context0.n) {
      case 0:
        name = (_document$getElementB0 = document.getElementById('mtNewOrgName')) === null || _document$getElementB0 === void 0 ? void 0 : _document$getElementB0.value.trim();
        if (name) {
          _context0.n = 1;
          break;
        }
        if (typeof toast === 'function') toast('Vui lòng nhập tên cơ sở Đoàn', 'warning');
        return _context0.a(2);
      case 1:
        _context0.p = 1;
        cfg = MTConfig.get();
        secretary = ((_document$getElementB1 = document.getElementById('mtNewOrgSecretary')) === null || _document$getElementB1 === void 0 ? void 0 : _document$getElementB1.value.trim()) || '';
        phone = ((_document$getElementB10 = document.getElementById('mtNewOrgPhone')) === null || _document$getElementB10 === void 0 ? void 0 : _document$getElementB10.value.trim()) || ''; // Gọi trực tiếp SheetsAPI để truyền thêm trường
        id = 'org_' + Date.now();
        _context0.n = 2;
        return SheetsAPI.append(cfg.spreadsheetId, "".concat(SH.ORGS, "!A:F"), [[id, name, '', secretary, phone, new Date().toISOString()]]);
      case 2:
        // Reset form
        ['mtNewOrgName', 'mtNewOrgSecretary', 'mtNewOrgPhone'].forEach(function (id) {
          var el = document.getElementById(id);
          if (el) el.value = '';
        });
        if (typeof toast === 'function') toast('✅ Đã thêm cơ sở Đoàn: ' + name, 'success');
        mtLoadOrgs();
        if (typeof mtLoadOrgsForSelect === 'function') mtLoadOrgsForSelect();
        _context0.n = 4;
        break;
      case 3:
        _context0.p = 3;
        _t0 = _context0.v;
        if (typeof toast === 'function') toast('Lỗi: ' + _t0.message, 'error');
      case 4:
        return _context0.a(2);
    }
  }, _callee0, null, [[1, 3]]);
}));

/** Nâng cấp giao diện form thêm cơ sở Đoàn — inject trường bổ sung */
function mtRoleUpgrade_upgradeAddOrgForm() {
  var nameInput = document.getElementById('mtNewOrgName');
  if (!nameInput || nameInput.dataset.upgraded) return;
  nameInput.dataset.upgraded = '1';
  nameInput.placeholder = 'Tên cơ sở Đoàn *';

  // Thêm 2 trường phụ sau ô tên
  var extraFields = document.createElement('div');
  extraFields.style.cssText = 'display:flex;gap:8px;margin-top:8px';
  extraFields.innerHTML = "\n    <input class=\"form-control\" id=\"mtNewOrgSecretary\" placeholder=\"B\xED th\u01B0 (t\xF9y ch\u1ECDn)\" style=\"flex:1;font-size:15px\">\n    <input class=\"form-control\" id=\"mtNewOrgPhone\" placeholder=\"S\u0110T (t\xF9y ch\u1ECDn)\" style=\"width:140px;font-size:15px\" inputmode=\"tel\">\n  ";
  var parentRow = nameInput.closest('div');
  if (parentRow) parentRow.after(extraFields);
}

// ═══════════════════════════════════════════════════════════════════════
//  KHỞI TẠO
// ═══════════════════════════════════════════════════════════════════════

(function init() {
  // Export tất cả hàm ra window (sửa lỗi gốc)
  window.mtChangeRole = window.mtChangeRole;
  window.mtRoleUpgrade_onRoleChange = window.mtRoleUpgrade_onRoleChange;
  window.mtRoleUpgrade_doChangeRole = window.mtRoleUpgrade_doChangeRole;
  window.mtRoleUpgrade_filterUsers = window.mtRoleUpgrade_filterUsers;
  window.mtRoleUpgrade_resetPIN = window.mtRoleUpgrade_resetPIN;
  window.mtRoleUpgrade_restoreUser = window.mtRoleUpgrade_restoreUser;
  window.mtRoleUpgrade_resendInvite = window.mtRoleUpgrade_resendInvite;
  window.mtRoleUpgrade_editOrg = window.mtRoleUpgrade_editOrg;
  window.mtRoleUpgrade_saveOrg = window.mtRoleUpgrade_saveOrg;
  window.mtRoleUpgrade_deleteOrg = window.mtRoleUpgrade_deleteOrg;

  // Upgrade form thêm org khi modal mở
  var origShowInviteManager = window.mtShowInviteManager;
  window.mtShowInviteManager = function () {
    origShowInviteManager === null || origShowInviteManager === void 0 || origShowInviteManager();
    setTimeout(mtRoleUpgrade_upgradeAddOrgForm, 300);
  };
  console.log('[ĐoànVăn Role+Org Upgrade v1.0] Loaded — mtChangeRole ✅ EditOrg ✅ FilterUsers ✅ ResetPIN ✅');
})();
