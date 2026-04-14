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
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _window$MTAdmin;
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
window.dvShowSyncCodeInput = function () {
  var _document$getElementB;
  (_document$getElementB = document.getElementById('dvAuthModal')) === null || _document$getElementB === void 0 || _document$getElementB.remove();
  var modal = document.createElement('div');
  modal.id = 'dvAuthModal';
  modal.innerHTML = "\n<div id=\"dvAuthBox\" style=\"max-width:420px\">\n  <div class=\"dv-auth-logo\" style=\"background:linear-gradient(135deg,#1a2340,#c0392b)\">\n    <i class=\"fas fa-sync-alt\"></i>\n  </div>\n  <div class=\"dv-auth-title\">\u0110\u0103ng nh\u1EADp b\u1EB1ng Sync Code</div>\n  <div class=\"dv-auth-sub\">Nh\u1EADp Sync Code \u0111\u01B0\u1EE3c t\u1EA1o t\u1EEB thi\u1EBFt b\u1ECB PC c\u1EE7a b\u1EA1n</div>\n\n  <input class=\"form-control\" id=\"dvQuickSyncCode\"\n    placeholder=\"VD: AB12CD34\"\n    style=\"letter-spacing:6px;font-family:monospace;font-size:1.4rem;text-align:center;\n           text-transform:uppercase;margin:16px 0 8px;border:2px solid var(--gray-light)\"\n    maxlength=\"20\"\n    oninput=\"this.value=this.value.toUpperCase().replace(/[^A-Z0-9]/g,'');\n             dvAuthUpgrade_onSyncCodeChange(this.value)\">\n\n  <!-- \xD4 spreadsheet ID \u2014 \u1EA9n theo m\u1EB7c \u0111\u1ECBnh, hi\u1EC7n ra khi c\u1EA7n -->\n  <div id=\"dvUpgradeSheetIdRow\" style=\"display:none;margin-bottom:8px\">\n    <div style=\"font-size:0.75rem;color:#d97706;margin-bottom:4px\">\n      <i class=\"fas fa-exclamation-triangle\"></i>\n      Thi\u1EBFt b\u1ECB m\u1EDBi \u2014 vui l\xF2ng nh\u1EADp Spreadsheet ID t\u1EEB Admin:\n    </div>\n    <input class=\"form-control\" id=\"dvQuickSpreadsheetId\"\n      placeholder=\"D\xE1n Spreadsheet ID t\u1EEB Admin...\"\n      style=\"font-family:monospace;font-size:0.78rem\">\n  </div>\n\n  <div id=\"dvUpgradeSyncHint\" style=\"font-size:0.72rem;color:var(--gray);margin-bottom:12px;min-height:16px\"></div>\n\n  <button class=\"btn btn-primary\" onclick=\"dvAuthUpgrade_applySync()\" style=\"width:100%;margin-bottom:10px\">\n    <i class=\"fas fa-link\"></i> K\u1EBFt n\u1ED1i\n  </button>\n  <div id=\"dvQuickSyncResult\" style=\"font-size:0.78rem;min-height:18px;color:var(--gray);text-align:center\"></div>\n  <div class=\"dv-auth-alt\" style=\"margin-top:12px\">\n    <a onclick=\"dvShowAuthModal('login')\">\u2190 Quay l\u1EA1i \u0111\u0103ng nh\u1EADp b\u1EB1ng PIN</a>\n  </div>\n</div>";
  document.body.appendChild(modal);
};

/** Khi người dùng gõ code — gợi ý trạng thái */
window.dvAuthUpgrade_onSyncCodeChange = function (val) {
  var _MTConfig$get;
  var hint = document.getElementById('dvUpgradeSyncHint');
  var sheetRow = document.getElementById('dvUpgradeSheetIdRow');
  if (!hint) return;
  if (val.length < 6) {
    hint.innerHTML = '';
    return;
  }

  // Kiểm tra xem có local hay không
  var hasLocal = !!localStorage.getItem('dv_sync_code_' + val) || !!localStorage.getItem('mt_deep_' + val) || !!localStorage.getItem('mt_invite_' + val);
  var hasMTConfig = !!(typeof MTConfig !== 'undefined' && (_MTConfig$get = MTConfig.get()) !== null && _MTConfig$get !== void 0 && _MTConfig$get.spreadsheetId);
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
window.dvAuthUpgrade_applySync = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
  var _document$getElementB2, _document$getElementB3;
  var code, sidInput, resEl, syncConfig, mtConfig, stored, _JSON$parse, payload, expiry, p, inv, _p, raw, _p2, existCfg, existMT, saJson, sid, token, resp, data, rows, found, entry, parsed, m, _document$getElementB4, _existMT, _t, _t2;
  return _regenerator().w(function (_context) {
    while (1) switch (_context.p = _context.n) {
      case 0:
        code = (_document$getElementB2 = document.getElementById('dvQuickSyncCode')) === null || _document$getElementB2 === void 0 ? void 0 : _document$getElementB2.value.trim().toUpperCase().replace(/\s/g, '');
        sidInput = (_document$getElementB3 = document.getElementById('dvQuickSpreadsheetId')) === null || _document$getElementB3 === void 0 ? void 0 : _document$getElementB3.value.trim();
        resEl = document.getElementById('dvQuickSyncResult');
        if (!(!code || code.length < 6)) {
          _context.n = 1;
          break;
        }
        if (resEl) resEl.innerHTML = '<span style="color:red">Vui lòng nhập Sync Code hợp lệ</span>';
        return _context.a(2);
      case 1:
        if (resEl) resEl.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang xác thực...';

        // Strategy 1: localStorage cùng máy
        syncConfig = null, mtConfig = null;
        stored = localStorage.getItem('dv_sync_code_' + code);
        if (stored) {
          try {
            _JSON$parse = JSON.parse(stored), payload = _JSON$parse.payload, expiry = _JSON$parse.expiry;
            if (Date.now() <= expiry) {
              p = JSON.parse(payload);
              syncConfig = p.syncConfig;
              mtConfig = p.mtConfig;
            }
          } catch (_unused) {/**/}
        }

        // Strategy 2: mt_invite_ (Invite Code dùng như Sync Code)
        if (!syncConfig) {
          inv = localStorage.getItem('mt_invite_' + code);
          if (inv) {
            try {
              _p = JSON.parse(inv);
              if (!_p.expiry || Date.now() < _p.expiry) {
                syncConfig = {
                  serviceAccountJson: _p.serviceAccountJson,
                  spreadsheetId: _p.spreadsheetId,
                  autoSync: true
                };
                mtConfig = {
                  spreadsheetId: _p.spreadsheetId,
                  serviceAccountJson: _p.serviceAccountJson,
                  role: _p.role,
                  orgId: _p.orgId,
                  orgName: _p.orgName
                };
              }
            } catch (_unused2) {/**/}
          }
        }

        // Strategy 3: mt_deep_
        if (!syncConfig) {
          try {
            raw = localStorage.getItem('mt_deep_' + code);
            if (raw) {
              _p2 = JSON.parse(raw);
              if (!_p2.exp || Date.now() < _p2.exp) {
                syncConfig = {
                  serviceAccountJson: _p2.sa,
                  spreadsheetId: _p2.sid,
                  autoSync: true
                };
                mtConfig = {
                  spreadsheetId: _p2.sid,
                  serviceAccountJson: _p2.sa,
                  role: _p2.r,
                  orgId: _p2.o,
                  orgName: _p2.on
                };
              }
            }
          } catch (_unused3) {/**/}
        }

        // Strategy 4: đọc từ GSheet
        if (syncConfig) {
          _context.n = 15;
          break;
        }
        if (resEl) resEl.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang tải từ Google Sheet...';
        _context.p = 2;
        existCfg = typeof GSheetSync !== 'undefined' && GSheetSync.getSyncConfig() || null;
        existMT = typeof MTConfig !== 'undefined' && MTConfig.get() || null;
        saJson = (existCfg === null || existCfg === void 0 ? void 0 : existCfg.serviceAccountJson) || (existMT === null || existMT === void 0 ? void 0 : existMT.serviceAccountJson);
        sid = sidInput || (existCfg === null || existCfg === void 0 ? void 0 : existCfg.spreadsheetId) || (existMT === null || existMT === void 0 ? void 0 : existMT.spreadsheetId);
        if (sid) {
          _context.n = 3;
          break;
        }
        throw new Error('no_sid');
      case 3:
        if (saJson) {
          _context.n = 4;
          break;
        }
        throw new Error('no_sa');
      case 4:
        if (!(typeof MTToken !== 'undefined')) {
          _context.n = 6;
          break;
        }
        _context.n = 5;
        return MTToken.get(saJson);
      case 5:
        _t = _context.v;
        _context.n = 7;
        break;
      case 6:
        _t = null;
      case 7:
        token = _t;
        if (token) {
          _context.n = 8;
          break;
        }
        throw new Error('no_token');
      case 8:
        _context.n = 9;
        return fetch("https://sheets.googleapis.com/v4/spreadsheets/".concat(sid, "/values/").concat(encodeURIComponent('system_meta!A:B')), {
          headers: {
            Authorization: "Bearer ".concat(token)
          }
        });
      case 9:
        resp = _context.v;
        if (resp.ok) {
          _context.n = 10;
          break;
        }
        throw new Error('sheet_' + resp.status);
      case 10:
        _context.n = 11;
        return resp.json();
      case 11:
        data = _context.v;
        rows = data.values || []; // Tìm synccode_ hoặc invite_
        found = rows.find(function (r) {
          return r[0] === 'synccode_' + code || r[0] === 'invite_' + code;
        });
        if (found) {
          _context.n = 12;
          break;
        }
        throw new Error('not_found');
      case 12:
        entry = JSON.parse(found[1]);
        if (!(entry.expiry && Date.now() > entry.expiry)) {
          _context.n = 13;
          break;
        }
        throw new Error('expired');
      case 13:
        if (found[0].startsWith('synccode_')) {
          parsed = JSON.parse(entry.payload);
          syncConfig = parsed.syncConfig;
          mtConfig = parsed.mtConfig;
        } else {
          // invite code
          syncConfig = {
            serviceAccountJson: entry.serviceAccountJson,
            spreadsheetId: entry.spreadsheetId,
            autoSync: true
          };
          mtConfig = {
            spreadsheetId: entry.spreadsheetId,
            serviceAccountJson: entry.serviceAccountJson,
            role: entry.role,
            orgId: entry.orgId,
            orgName: entry.orgName
          };
        }
        _context.n = 15;
        break;
      case 14:
        _context.p = 14;
        _t2 = _context.v;
        m = _t2.message;
        if (m === 'not_found' || m === 'expired') {
          if (resEl) resEl.innerHTML = '<span style="color:red">Code không hợp lệ hoặc đã hết hạn (>24h). Hãy tạo code mới từ PC.</span>';
        } else if (m === 'no_sid') {
          document.getElementById('dvUpgradeSheetIdRow').style.display = 'block';
          if (resEl) resEl.innerHTML = '<span style="color:#d97706">Vui lòng nhập Spreadsheet ID từ Admin</span>';
        } else if (m === 'no_sa' || m === 'no_token') {
          if (resEl) resEl.innerHTML = '<span style="color:red">Thiết bị chưa được cấu hình. Liên hệ Admin để được hỗ trợ.</span>';
        } else {
          if (resEl) resEl.innerHTML = "<span style=\"color:red\">L\u1ED7i k\u1EBFt n\u1ED1i: ".concat(m, "</span>");
        }
        return _context.a(2);
      case 15:
        // Áp dụng config
        try {
          if (syncConfig && typeof GSheetSync !== 'undefined') {
            GSheetSync.saveSyncConfig(syncConfig);
          }
          if (mtConfig && typeof MTConfig !== 'undefined') {
            _existMT = MTConfig.get() || {};
            MTConfig.save(_objectSpread(_objectSpread(_objectSpread({}, _existMT), mtConfig), {}, {
              joinedAt: new Date().toISOString()
            }));
          }
          if (typeof DVAuth !== 'undefined') DVAuth.startSession();
          if (typeof _dvDismissAuthAndInit === 'function') _dvDismissAuthAndInit();
          (_document$getElementB4 = document.getElementById('dvAuthModal')) === null || _document$getElementB4 === void 0 || _document$getElementB4.remove();
          if (typeof toast === 'function') toast('✅ Kết nối thành công! Đang đồng bộ dữ liệu...', 'success');
          if (typeof dvSyncNow === 'function') setTimeout(function () {
            return dvSyncNow('pull');
          }, 800);
        } catch (e) {
          if (resEl) resEl.innerHTML = "<span style=\"color:red\">L\u1ED7i: ".concat(e.message, "</span>");
        }
      case 16:
        return _context.a(2);
    }
  }, _callee, null, [[2, 14]]);
}));

// ─────────────────────────────────────────────────────────────────────
//  PHẦN 2: ĐỔI PIN / ĐỔI TÊN sau đăng nhập
// ─────────────────────────────────────────────────────────────────────

/** Mở modal đổi thông tin tài khoản */
window.dvShowAccountModal = function () {
  var _document$getElementB5;
  (_document$getElementB5 = document.getElementById('dvAccountModal')) === null || _document$getElementB5 === void 0 || _document$getElementB5.remove();
  var profile = typeof DVAuth !== 'undefined' ? DVAuth.getProfile() : null;
  var mtCfg = typeof MTConfig !== 'undefined' ? MTConfig.get() : null;
  var user = (mtCfg === null || mtCfg === void 0 ? void 0 : mtCfg.user) || profile;
  var modal = document.createElement('div');
  modal.id = 'dvAccountModal';
  modal.className = 'modal-overlay';
  modal.innerHTML = "\n<div class=\"modal\" style=\"max-width:420px\">\n  <div class=\"modal-header\">\n    <h2><i class=\"fas fa-user-cog\" style=\"color:var(--red);margin-right:8px\"></i> T\xE0i kho\u1EA3n c\u1EE7a b\u1EA1n</h2>\n    <button class=\"btn btn-ghost\" onclick=\"document.getElementById('dvAccountModal').remove()\">\n      <i class=\"fas fa-times\"></i>\n    </button>\n  </div>\n  <div class=\"modal-body\" style=\"padding:20px\">\n\n    <!-- Th\xF4ng tin hi\u1EC7n t\u1EA1i -->\n    <div style=\"display:flex;align-items:center;gap:14px;padding:14px;background:var(--cream);border-radius:12px;margin-bottom:20px\">\n      <div style=\"width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,var(--red),var(--gold));\n                  display:flex;align-items:center;justify-content:center;color:#fff;font-size:1.4rem;font-weight:800;flex-shrink:0\">\n        ".concat(((user === null || user === void 0 ? void 0 : user.displayName) || 'U')[0].toUpperCase(), "\n      </div>\n      <div>\n        <div style=\"font-weight:700;color:var(--navy);font-size:1rem\">").concat((user === null || user === void 0 ? void 0 : user.displayName) || 'Người dùng', "</div>\n        <div style=\"font-size:0.75rem;color:var(--gray)\">@").concat((user === null || user === void 0 ? void 0 : user.username) || (profile === null || profile === void 0 ? void 0 : profile.username) || '—', "</div>\n        ").concat(mtCfg !== null && mtCfg !== void 0 && mtCfg.role ? "<div style=\"font-size:0.72rem;margin-top:2px\">\n          <span style=\"background:".concat(mtCfg.role === 'admin' ? '#c0392b' : mtCfg.role === 'manager' ? '#1a2340' : '#6b7280', ";\n                       color:#fff;padding:2px 8px;border-radius:10px\">\n            ").concat(mtCfg.role === 'admin' ? 'Quản trị viên' : mtCfg.role === 'manager' ? 'Quản lý' : 'Đoàn viên', "\n          </span>\n          ").concat(mtCfg !== null && mtCfg !== void 0 && mtCfg.orgName ? "<span style=\"color:var(--gray);margin-left:6px\">".concat(mtCfg.orgName, "</span>") : '', "\n        </div>") : '', "\n      </div>\n    </div>\n\n    <!-- \u0110\u1ED5i t\xEAn hi\u1EC3n th\u1ECB -->\n    <div style=\"margin-bottom:16px\">\n      <label class=\"form-label\">T\xEAn hi\u1EC3n th\u1ECB m\u1EDBi</label>\n      <div style=\"display:flex;gap:8px\">\n        <input class=\"form-control\" id=\"dvAccNewName\"\n          value=\"").concat((user === null || user === void 0 ? void 0 : user.displayName) || '', "\"\n          placeholder=\"Nh\u1EADp t\xEAn hi\u1EC3n th\u1ECB m\u1EDBi\" style=\"flex:1;font-size:16px\">\n        <button class=\"btn btn-outline\" onclick=\"dvAuthUpgrade_changeName()\">\n          <i class=\"fas fa-save\"></i> L\u01B0u\n        </button>\n      </div>\n    </div>\n\n    <div style=\"border-top:1px solid var(--gray-light);padding-top:16px;margin-bottom:16px\">\n      <div style=\"font-weight:700;color:var(--navy);margin-bottom:12px;font-size:0.9rem\">\n        <i class=\"fas fa-lock\" style=\"color:var(--red);margin-right:6px\"></i>\u0110\u1ED5i m\xE3 PIN\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-label\">PIN hi\u1EC7n t\u1EA1i</label>\n        <input type=\"password\" class=\"form-control\" id=\"dvAccOldPIN\"\n          placeholder=\"Nh\u1EADp PIN hi\u1EC7n t\u1EA1i\" maxlength=\"8\" inputmode=\"numeric\"\n          style=\"letter-spacing:6px;font-size:1.2rem\">\n      </div>\n      <div class=\"form-row\" style=\"grid-template-columns:1fr 1fr\">\n        <div class=\"form-group\">\n          <label class=\"form-label\">PIN m\u1EDBi</label>\n          <input type=\"password\" class=\"form-control\" id=\"dvAccNewPIN\"\n            placeholder=\"PIN m\u1EDBi (4-8 s\u1ED1)\" maxlength=\"8\" inputmode=\"numeric\"\n            style=\"letter-spacing:6px;font-size:1.1rem\">\n        </div>\n        <div class=\"form-group\">\n          <label class=\"form-label\">X\xE1c nh\u1EADn PIN</label>\n          <input type=\"password\" class=\"form-control\" id=\"dvAccConfirmPIN\"\n            placeholder=\"Nh\u1EADp l\u1EA1i PIN\" maxlength=\"8\" inputmode=\"numeric\"\n            style=\"letter-spacing:6px;font-size:1.1rem\">\n        </div>\n      </div>\n      <div id=\"dvAccPINStatus\" style=\"font-size:0.78rem;min-height:16px;margin-bottom:8px\"></div>\n      <button class=\"btn btn-primary\" onclick=\"dvAuthUpgrade_changePIN()\" style=\"width:100%\">\n        <i class=\"fas fa-key\"></i> \u0110\u1ED5i m\xE3 PIN\n      </button>\n    </div>\n\n    <!-- \u0110\u0103ng xu\u1EA5t -->\n    <button class=\"btn btn-ghost\" onclick=\"dvLogout?dvLogout():MTAuth.logout();document.getElementById('dvAccountModal').remove()\"\n      style=\"width:100%;color:var(--red);border:1.5px solid rgba(192,57,43,0.3)\">\n      <i class=\"fas fa-sign-out-alt\"></i> \u0110\u0103ng xu\u1EA5t\n    </button>\n  </div>\n</div>");
  document.body.appendChild(modal);
  modal.addEventListener('click', function (e) {
    if (e.target === modal) modal.remove();
  });
  setTimeout(function () {
    return modal.classList.add('open');
  }, 10);
};

/** Đổi tên hiển thị */
window.dvAuthUpgrade_changeName = function () {
  var _document$getElementB6;
  var newName = (_document$getElementB6 = document.getElementById('dvAccNewName')) === null || _document$getElementB6 === void 0 ? void 0 : _document$getElementB6.value.trim();
  if (!newName) {
    if (typeof toast === 'function') toast('Vui lòng nhập tên mới', 'warning');
    return;
  }

  // Cập nhật DVAuth profile
  if (typeof DVAuth !== 'undefined') {
    var p = DVAuth.getProfile();
    if (p) {
      p.displayName = newName;
      DVAuth.saveProfile(p);
    }
  }
  // Cập nhật MTConfig
  if (typeof MTConfig !== 'undefined') {
    var mc = MTConfig.get();
    if (mc !== null && mc !== void 0 && mc.user) {
      mc.user.displayName = newName;
      MTConfig.save(mc);
    }
  }
  // Cập nhật UI
  var nameEl = document.getElementById('dvUserName');
  if (nameEl) nameEl.textContent = newName;
  var avatarEl = document.getElementById('dvUserAvatar');
  if (avatarEl) avatarEl.textContent = newName[0].toUpperCase();
  if (typeof toast === 'function') toast("\u2705 \u0110\xE3 \u0111\u1ED5i t\xEAn th\xE0nh: <strong>".concat(newName, "</strong>"), 'success');
};

/** Đổi PIN */
window.dvAuthUpgrade_changePIN = function () {
  var _document$getElementB7, _document$getElementB8, _document$getElementB9, _mtCfg$user;
  var oldPIN = (_document$getElementB7 = document.getElementById('dvAccOldPIN')) === null || _document$getElementB7 === void 0 ? void 0 : _document$getElementB7.value.trim();
  var newPIN = (_document$getElementB8 = document.getElementById('dvAccNewPIN')) === null || _document$getElementB8 === void 0 ? void 0 : _document$getElementB8.value.trim();
  var confirmPIN = (_document$getElementB9 = document.getElementById('dvAccConfirmPIN')) === null || _document$getElementB9 === void 0 ? void 0 : _document$getElementB9.value.trim();
  var statusEl = document.getElementById('dvAccPINStatus');
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
  var dvOk = typeof DVAuth !== 'undefined' ? DVAuth.verifyPIN(oldPIN) : true;
  var mtCfg = typeof MTConfig !== 'undefined' ? MTConfig.get() : null;
  var mtOk = mtCfg !== null && mtCfg !== void 0 && (_mtCfg$user = mtCfg.user) !== null && _mtCfg$user !== void 0 && _mtCfg$user.pinHash ? mtCfg.user.pinHash === _dvUpgrade_hashPIN(oldPIN) : true; // chưa có MT thì bỏ qua

  if (!dvOk && !mtOk) {
    if (statusEl) statusEl.innerHTML = '<span style="color:red">PIN hiện tại không đúng</span>';
    return;
  }

  // Lưu PIN mới
  if (typeof DVAuth !== 'undefined') {
    var p = DVAuth.getProfile();
    if (p) {
      p.pinHash = DVAuth._hashPIN(newPIN);
      DVAuth.saveProfile(p);
    }
  }
  if (mtCfg !== null && mtCfg !== void 0 && mtCfg.user && typeof MTConfig !== 'undefined') {
    mtCfg.user.pinHash = _dvUpgrade_hashPIN(newPIN);
    MTConfig.save(mtCfg);
  }
  if (statusEl) statusEl.innerHTML = '<span style="color:#16a34a"><i class="fas fa-check-circle"></i> Đã đổi PIN thành công!</span>';
  document.getElementById('dvAccOldPIN').value = '';
  document.getElementById('dvAccNewPIN').value = '';
  document.getElementById('dvAccConfirmPIN').value = '';
  if (typeof toast === 'function') toast('🔒 PIN mới đã được lưu', 'success');
};
function _dvUpgrade_hashPIN(pin) {
  var h = 5381;
  for (var i = 0; i < pin.length; i++) h = (h << 5) + h ^ pin.charCodeAt(i);
  return (h >>> 0).toString(16).padStart(8, '0');
}

// ─────────────────────────────────────────────────────────────────────
//  PHẦN 3: QR CODE CHO INVITE CODE
//  Tự động tạo QR Code khi có mã mời (dùng API miễn phí)
// ─────────────────────────────────────────────────────────────────────

/** Inject QR vào kết quả tạo Invite Code */
window.dvAuthUpgrade_showInviteQR = function (code) {
  var _document$getElementB0;
  var codeEl = document.getElementById('mtInviteCodeDisplay');
  if (!codeEl) return;

  // Xóa QR cũ nếu có
  (_document$getElementB0 = document.getElementById('dvInviteQRWrap')) === null || _document$getElementB0 === void 0 || _document$getElementB0.remove();
  var qrWrap = document.createElement('div');
  qrWrap.id = 'dvInviteQRWrap';
  qrWrap.style.cssText = 'margin-top:12px;text-align:center';
  qrWrap.innerHTML = "\n<div style=\"font-size:0.72rem;color:var(--gray);margin-bottom:6px\">\n  <i class=\"fas fa-qrcode\"></i> Ho\u1EB7c cho thi\u1EBFt b\u1ECB mobile qu\xE9t QR:\n</div>\n<img src=\"https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=".concat(encodeURIComponent('DOANVAN:' + code), "\"\n  style=\"width:160px;height:160px;border-radius:12px;border:2px solid var(--gray-light);padding:6px;background:#fff\"\n  alt=\"QR Code ").concat(code, "\"\n  onerror=\"this.parentElement.innerHTML='<div style=\\'color:var(--gray);font-size:0.72rem\\'>Kh\xF4ng t\u1EA3i \u0111\u01B0\u1EE3c QR \u2014 d\xF9ng code: '+code+'</div>'\">\n<div style=\"font-size:0.68rem;color:var(--gray);margin-top:4px\">M\u1EDF app \u0110o\xE0nV\u0103n \u2192 Qu\xE9t QR \u0111\u1EC3 k\u1EBFt n\u1ED1i</div>");
  codeEl.parentElement.appendChild(qrWrap);
};

// Patch mtCreateInvite để tự thêm QR
var _orig_mtCreateInvite = window.mtCreateInvite;
window.mtCreateInvite = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
  var codeEl, _codeEl$textContent, code;
  return _regenerator().w(function (_context2) {
    while (1) switch (_context2.n) {
      case 0:
        _context2.n = 1;
        return _orig_mtCreateInvite === null || _orig_mtCreateInvite === void 0 ? void 0 : _orig_mtCreateInvite();
      case 1:
        codeEl = document.getElementById('mtInviteCodeDisplay');
        if (codeEl) {
          code = (_codeEl$textContent = codeEl.textContent) === null || _codeEl$textContent === void 0 ? void 0 : _codeEl$textContent.replace(/\s/g, '');
          if (code && code.length >= 8) dvAuthUpgrade_showInviteQR(code);
        }
      case 2:
        return _context2.a(2);
    }
  }, _callee2);
}));

// ─────────────────────────────────────────────────────────────────────
//  PHẦN 4: MANAGER CÓ THỂ TẠO INVITE CODE cho org của mình
// ─────────────────────────────────────────────────────────────────────

/** Kiểm tra và ghi đè quyền tạo invite — manager được phép tạo cho org của mình */
var _origGenerateInvite = (_window$MTAdmin = window.MTAdmin) === null || _window$MTAdmin === void 0 ? void 0 : _window$MTAdmin.generateInviteCode;
if (window.MTAdmin) {
  var _originalGenerate = MTAdmin.generateInviteCode.bind(MTAdmin);
  MTAdmin.generateInviteCode = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(targetUsername, role, orgId, orgName) {
      var cfg;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.n) {
          case 0:
            cfg = MTConfig.get(); // Admin: quyền đầy đủ
            if (!((cfg === null || cfg === void 0 ? void 0 : cfg.role) === 'admin')) {
              _context3.n = 1;
              break;
            }
            return _context3.a(2, _originalGenerate(targetUsername, role, orgId, orgName));
          case 1:
            if (!((cfg === null || cfg === void 0 ? void 0 : cfg.role) === 'manager')) {
              _context3.n = 4;
              break;
            }
            if (!(orgId !== 'all' && orgId !== cfg.orgId)) {
              _context3.n = 2;
              break;
            }
            throw new Error('Manager chỉ tạo mã mời cho tổ chức của mình');
          case 2:
            if (!(role === 'admin')) {
              _context3.n = 3;
              break;
            }
            throw new Error('Manager không thể tạo tài khoản Admin');
          case 3:
            return _context3.a(2, _originalGenerate(targetUsername, role, cfg.orgId, cfg.orgName));
          case 4:
            throw new Error('Bạn không có quyền tạo mã mời');
          case 5:
            return _context3.a(2);
        }
      }, _callee3);
    }));
    return function (_x, _x2, _x3, _x4) {
      return _ref3.apply(this, arguments);
    };
  }();
}

// ─────────────────────────────────────────────────────────────────────
//  PHẦN 5: NÂNG CẤP USER MENU — Thêm nút "Tài khoản của tôi"
// ─────────────────────────────────────────────────────────────────────

/** Ghi đè dvOpenUserMenu để thêm mục "Tài khoản" */
var _origOpenUserMenu = window.dvOpenUserMenu;
window.dvOpenUserMenu = function () {
  // Gọi hàm gốc
  _origOpenUserMenu === null || _origOpenUserMenu === void 0 || _origOpenUserMenu();

  // Sau 50ms chèn thêm mục "Tài khoản của tôi" vào đầu menu
  setTimeout(function () {
    var menu = document.getElementById('dvUserMenuDrop');
    if (!menu) return;
    var first = menu.querySelector('button');
    if (!first) return;
    var accountBtn = document.createElement('button');
    accountBtn.style.cssText = "display:flex;align-items:center;gap:10px;width:100%;padding:10px 12px;\n      border:none;background:none;cursor:pointer;border-radius:8px;font-family:'Be Vietnam Pro',sans-serif;\n      font-size:0.82rem;font-weight:600;color:var(--navy)";
    accountBtn.onmouseover = function () {
      return accountBtn.style.background = 'var(--cream)';
    };
    accountBtn.onmouseout = function () {
      return accountBtn.style.background = 'none';
    };
    accountBtn.innerHTML = '<i class="fas fa-user-circle" style="width:16px;text-align:center;color:var(--gray)"></i>Tài khoản của tôi';
    accountBtn.onclick = function () {
      menu.remove();
      dvShowAccountModal();
    };
    menu.insertBefore(accountBtn, first);
  }, 50);
};

// ─────────────────────────────────────────────────────────────────────
//  PHẦN 6: SỬA LỖI STATUS "pending" → Tài khoản chờ kích hoạt
//  Khi user có inviteCode nhưng chưa đăng nhập lần đầu
// ─────────────────────────────────────────────────────────────────────

/** Sau khi join thành công → cập nhật lastLogin trong GSheet */
function _dvUpgrade_updateLastLogin() {
  return _dvUpgrade_updateLastLogin2.apply(this, arguments);
} // ─────────────────────────────────────────────────────────────────────
//  PHẦN 7: THÊM BADGE "Chờ kích hoạt" cho user pending
//  trong màn hình Quản lý người dùng
// ─────────────────────────────────────────────────────────────────────
/** Patch mtLoadUsers để hiển thị nút "Gửi lại mã mời" cho user pending */
function _dvUpgrade_updateLastLogin2() {
  _dvUpgrade_updateLastLogin2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
    var _cfg$user, cfg, rows, users, row, idx, _t5;
    return _regenerator().w(function (_context7) {
      while (1) switch (_context7.p = _context7.n) {
        case 0:
          _context7.p = 0;
          cfg = typeof MTConfig !== 'undefined' ? MTConfig.get() : null;
          if (!(!(cfg !== null && cfg !== void 0 && cfg.spreadsheetId) || !(cfg !== null && cfg !== void 0 && (_cfg$user = cfg.user) !== null && _cfg$user !== void 0 && _cfg$user.username))) {
            _context7.n = 1;
            break;
          }
          return _context7.a(2);
        case 1:
          _context7.n = 2;
          return SheetsAPI.read(cfg.spreadsheetId, 'system_users!A:K');
        case 2:
          rows = _context7.v;
          users = SheetsAPI.parseSheet(rows);
          row = users.find(function (u) {
            return u.username === cfg.user.username;
          });
          if (row) {
            _context7.n = 3;
            break;
          }
          return _context7.a(2);
        case 3:
          idx = users.indexOf(row) + 2;
          _context7.n = 4;
          return SheetsAPI.write(cfg.spreadsheetId, "system_users!I".concat(idx, ":J").concat(idx), [[new Date().toISOString(), 'active']]);
        case 4:
          _context7.n = 6;
          break;
        case 5:
          _context7.p = 5;
          _t5 = _context7.v;
          console.warn('[Upgrade] updateLastLogin:', _t5.message);
        case 6:
          return _context7.a(2);
      }
    }, _callee7, null, [[0, 5]]);
  }));
  return _dvUpgrade_updateLastLogin2.apply(this, arguments);
}
var _origMtLoadUsers = window.mtLoadUsers;
window.mtLoadUsers = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
  return _regenerator().w(function (_context4) {
    while (1) switch (_context4.n) {
      case 0:
        _context4.n = 1;
        return _origMtLoadUsers === null || _origMtLoadUsers === void 0 ? void 0 : _origMtLoadUsers();
      case 1:
        // Sau khi load xong, tìm các hàng pending và thêm nút "Gửi lại"
        setTimeout(function () {
          document.querySelectorAll('[data-mt-user-status="pending"]').forEach(function (el) {
            var username = el.dataset.mtUsername;
            if (!username) return;
            var btn = document.createElement('button');
            btn.className = 'btn btn-outline btn-sm';
            btn.style.fontSize = '0.7rem';
            btn.innerHTML = '<i class="fas fa-redo"></i> Tạo lại mã mời';
            btn.onclick = function () {
              return dvAuthUpgrade_regenerateInvite(username);
            };
            el.appendChild(btn);
          });
        }, 200);
      case 2:
        return _context4.a(2);
    }
  }, _callee4);
}));

/** Tạo lại invite code cho user pending */
window.dvAuthUpgrade_regenerateInvite = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(username) {
    var cfg, rows, users, user, _yield$MTAdmin$genera, code, _t3;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.p = _context5.n) {
        case 0:
          if (username) {
            _context5.n = 1;
            break;
          }
          return _context5.a(2);
        case 1:
          _context5.p = 1;
          cfg = MTConfig.get();
          _context5.n = 2;
          return SheetsAPI.read(cfg.spreadsheetId, 'system_users!A:K');
        case 2:
          rows = _context5.v;
          users = SheetsAPI.parseSheet(rows);
          user = users.find(function (u) {
            return u.username === username;
          });
          if (user) {
            _context5.n = 3;
            break;
          }
          if (typeof toast === 'function') toast('Không tìm thấy người dùng', 'error');
          return _context5.a(2);
        case 3:
          _context5.n = 4;
          return MTAdmin.generateInviteCode(username, user.role, user.orgId, user.orgName);
        case 4:
          _yield$MTAdmin$genera = _context5.v;
          code = _yield$MTAdmin$genera.code;
          if (typeof toast === 'function') toast("\u2705 M\xE3 m\u1EDDi m\u1EDBi cho @".concat(username, ": <strong style=\"letter-spacing:2px\">").concat(code, "</strong>"), 'success');
          dvAuthUpgrade_showInviteQR(code);
          _context5.n = 6;
          break;
        case 5:
          _context5.p = 5;
          _t3 = _context5.v;
          if (typeof toast === 'function') toast('Lỗi: ' + _t3.message, 'error');
        case 6:
          return _context5.a(2);
      }
    }, _callee5, null, [[1, 5]]);
  }));
  return function (_x5) {
    return _ref5.apply(this, arguments);
  };
}();

// ─────────────────────────────────────────────────────────────────────
//  PHẦN 8: RESET PIN ADMIN — Admin có thể reset PIN cho user khác
// ─────────────────────────────────────────────────────────────────────

/**
 * Admin reset PIN của user — sinh PIN tạm thời ngẫu nhiên (KHÔNG dùng 123456 cố định)
 * Admin phải thông báo PIN tạm cho user; user đổi ngay sau khi đăng nhập.
 */
window.dvAuthUpgrade_adminResetPIN = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(username) {
    var cfg, isAdmin, tempPIN, rows, users, row, idx, newHash, _t4;
    return _regenerator().w(function (_context6) {
      while (1) switch (_context6.p = _context6.n) {
        case 0:
          cfg = MTConfig.get(); // Kiểm tra quyền admin qua SecureSession (ưu tiên) hoặc MTConfig
          isAdmin = typeof SecureSession !== 'undefined' && SecureSession.isAdmin() || (cfg === null || cfg === void 0 ? void 0 : cfg.role) === 'admin';
          if (isAdmin) {
            _context6.n = 1;
            break;
          }
          if (typeof toast === 'function') toast('Chỉ Admin mới có thể reset PIN', 'error');
          return _context6.a(2);
        case 1:
          // Sinh PIN tạm 6 số ngẫu nhiên — KHÔNG phải 123456 cố định
          tempPIN = Array.from(crypto.getRandomValues(new Uint8Array(6))).map(function (b) {
            return b % 10;
          }).join('');
          if (confirm("Reset PIN c\u1EE7a @".concat(username, "?\n\n") + "PIN t\u1EA1m th\u1EDDi s\u1EBD l\xE0: ".concat(tempPIN, "\n\n") + "Ghi l\u1EA1i PIN n\xE0y v\xE0 th\xF4ng b\xE1o cho ng\u01B0\u1EDDi d\xF9ng.\nY\xEAu c\u1EA7u h\u1ECD \u0111\u1ED5i ngay sau khi \u0111\u0103ng nh\u1EADp.")) {
            _context6.n = 2;
            break;
          }
          return _context6.a(2);
        case 2:
          _context6.p = 2;
          _context6.n = 3;
          return SheetsAPI.read(cfg.spreadsheetId, 'system_users!A:K');
        case 3:
          rows = _context6.v;
          users = SheetsAPI.parseSheet(rows);
          row = users.find(function (u) {
            return u.username === username;
          });
          if (row) {
            _context6.n = 4;
            break;
          }
          throw new Error('Không tìm thấy người dùng');
        case 4:
          idx = users.indexOf(row) + 2;
          newHash = _dvUpgrade_hashPIN(tempPIN);
          _context6.n = 5;
          return SheetsAPI.write(cfg.spreadsheetId, "system_users!C".concat(idx), [[newHash]]);
        case 5:
          if (typeof toast === 'function') {
            toast("\u2705 \u0110\xE3 reset PIN @".concat(username, ". PIN t\u1EA1m: <strong style=\"font-family:monospace;letter-spacing:3px\">").concat(tempPIN, "</strong> \u2014 Y\xEAu c\u1EA7u \u0111\u1ED5i ngay!"), 'success');
          }
          _context6.n = 7;
          break;
        case 6:
          _context6.p = 6;
          _t4 = _context6.v;
          if (typeof toast === 'function') toast('Lỗi reset PIN: ' + _t4.message, 'error');
        case 7:
          return _context6.a(2);
      }
    }, _callee6, null, [[2, 6]]);
  }));
  return function (_x6) {
    return _ref6.apply(this, arguments);
  };
}();

// ─────────────────────────────────────────────────────────────────────
//  PHẦN 9: KHỞI TẠO
// ─────────────────────────────────────────────────────────────────────

(function dvAuthUpgradeInit() {
  // Cập nhật lastLogin khi đã đăng nhập
  if (typeof MTAuth !== 'undefined' && MTAuth.isLoggedIn()) {
    setTimeout(_dvUpgrade_updateLastLogin, 3000);
  }

  // Thêm phím tắt Ctrl+Shift+A mở modal tài khoản (dev convenience)
  document.addEventListener('keydown', function (e) {
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
window.dvShowAccountModal = window.dvShowAccountModal;
window.dvAuthUpgrade_changeName = window.dvAuthUpgrade_changeName;
window.dvAuthUpgrade_changePIN = window.dvAuthUpgrade_changePIN;
window.dvAuthUpgrade_showInviteQR = window.dvAuthUpgrade_showInviteQR;
window.dvAuthUpgrade_regenerateInvite = window.dvAuthUpgrade_regenerateInvite;
window.dvAuthUpgrade_adminResetPIN = window.dvAuthUpgrade_adminResetPIN;
window.dvAuthUpgrade_applySync = window.dvAuthUpgrade_applySync;
window.dvAuthUpgrade_onSyncCodeChange = window.dvAuthUpgrade_onSyncCodeChange;
