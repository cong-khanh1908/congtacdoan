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
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var MT_STORE = 'doanvan_mt_config'; // localStorage key lưu cấu hình tenant
var MT_SESSION = 'doanvan_mt_session'; // sessionStorage key phiên đăng nhập
var MT_VERSION = '1.0.0';
var MT_ROLES = {
  admin: {
    label: 'Quản trị viên',
    icon: 'fa-shield-alt',
    color: '#c0392b'
  },
  manager: {
    label: 'Quản lý',
    icon: 'fa-user-tie',
    color: '#1a2340'
  },
  member: {
    label: 'Đoàn viên',
    icon: 'fa-user',
    color: '#6b7280'
  }
};
var SHEETS_API = 'https://sheets.googleapis.com/v4/spreadsheets';
var TOKEN_EP = 'https://oauth2.googleapis.com/token';
var SCOPE = 'https://www.googleapis.com/auth/spreadsheets';

// Sheet names trong GSheet trung tâm
var SH = {
  USERS: 'system_users',
  ORGS: 'organizations',
  META: 'system_meta',
  DOCS: 'docs',
  MEMBERS: 'members',
  REMIND: 'reminders',
  TASKS: 'tasks'
};

// ─────────────────────────────────────────────────────────────────────
//  A. CONFIG STORE — Quản lý cấu hình local
// ─────────────────────────────────────────────────────────────────────
var MTConfig = {
  get: function get() {
    try {
      return JSON.parse(localStorage.getItem(MT_STORE) || 'null');
    } catch (_unused) {
      return null;
    }
  },
  save: function save(cfg) {
    localStorage.setItem(MT_STORE, JSON.stringify(_objectSpread(_objectSpread({}, cfg), {}, {
      _v: MT_VERSION,
      _ts: Date.now()
    })));
  },
  clear: function clear() {
    localStorage.removeItem(MT_STORE);
  },
  isAdmin: function isAdmin() {
    var _this$get;
    return ((_this$get = this.get()) === null || _this$get === void 0 ? void 0 : _this$get.role) === 'admin';
  },
  isManager: function isManager() {
    var _this$get2;
    var r = (_this$get2 = this.get()) === null || _this$get2 === void 0 ? void 0 : _this$get2.role;
    return r === 'admin' || r === 'manager';
  },
  getOrgId: function getOrgId() {
    var _this$get3;
    return ((_this$get3 = this.get()) === null || _this$get3 === void 0 ? void 0 : _this$get3.orgId) || null;
  },
  getRole: function getRole() {
    var _this$get4;
    return ((_this$get4 = this.get()) === null || _this$get4 === void 0 ? void 0 : _this$get4.role) || 'member';
  },
  getUser: function getUser() {
    var _this$get5;
    return ((_this$get5 = this.get()) === null || _this$get5 === void 0 ? void 0 : _this$get5.user) || null;
  },
  isConfigured: function isConfigured() {
    var _this$get6;
    return !!((_this$get6 = this.get()) !== null && _this$get6 !== void 0 && _this$get6.spreadsheetId);
  }
};

// ─────────────────────────────────────────────────────────────────────
//  B. TOKEN MANAGER — Google Service Account JWT
// ─────────────────────────────────────────────────────────────────────
var MTToken = {
  _cache: null,
  _expiry: 0,
  get: function get(serviceAccountJson) {
    var _arguments = arguments,
      _this = this;
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var force, sa, now, hdr, pay, b64, unsigned, pemBody, keyBuf, cryptoKey, sig, jwt, resp, data, _t, _t2, _t3;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            force = _arguments.length > 1 && _arguments[1] !== undefined ? _arguments[1] : false;
            if (!(!force && _this._cache && Date.now() < _this._expiry)) {
              _context.n = 1;
              break;
            }
            return _context.a(2, _this._cache);
          case 1:
            sa = typeof serviceAccountJson === 'string' ? JSON.parse(serviceAccountJson) : serviceAccountJson;
            now = Math.floor(Date.now() / 1000);
            hdr = {
              alg: 'RS256',
              typ: 'JWT'
            };
            pay = {
              iss: sa.client_email,
              scope: SCOPE,
              aud: TOKEN_EP,
              exp: now + 3600,
              iat: now
            };
            b64 = function b64(o) {
              return btoa(JSON.stringify(o)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
            };
            unsigned = "".concat(b64(hdr), ".").concat(b64(pay));
            pemBody = sa.private_key.replace(/-----[^-]+-----/g, '').replace(/\s/g, '');
            keyBuf = Uint8Array.from(atob(pemBody), function (c) {
              return c.charCodeAt(0);
            });
            _context.n = 2;
            return crypto.subtle.importKey('pkcs8', keyBuf, {
              name: 'RSASSA-PKCS1-v1_5',
              hash: 'SHA-256'
            }, false, ['sign']);
          case 2:
            cryptoKey = _context.v;
            _context.n = 3;
            return crypto.subtle.sign('RSASSA-PKCS1-v1_5', cryptoKey, new TextEncoder().encode(unsigned));
          case 3:
            sig = _context.v;
            jwt = "".concat(unsigned, ".").concat(btoa(String.fromCharCode.apply(String, _toConsumableArray(new Uint8Array(sig)))).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_'));
            _context.n = 4;
            return fetch(TOKEN_EP, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              body: "grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=".concat(jwt)
            });
          case 4:
            resp = _context.v;
            if (resp.ok) {
              _context.n = 6;
              break;
            }
            _t = Error;
            _context.n = 5;
            return resp.text();
          case 5:
            _t2 = _context.v;
            _t3 = 'Lỗi lấy token: ' + _t2;
            throw new _t(_t3);
          case 6:
            _context.n = 7;
            return resp.json();
          case 7:
            data = _context.v;
            _this._cache = data.access_token;
            _this._expiry = Date.now() + (data.expires_in - 60) * 1000;
            return _context.a(2, _this._cache);
        }
      }, _callee);
    }))();
  },
  invalidate: function invalidate() {
    this._cache = null;
    this._expiry = 0;
  }
};

// ─────────────────────────────────────────────────────────────────────
//  C. SHEETS HELPER — CRUD đơn giản
// ─────────────────────────────────────────────────────────────────────
var SheetsAPI = {
  _token: function _token() {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
      var cfg;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            cfg = MTConfig.get();
            if (cfg !== null && cfg !== void 0 && cfg.serviceAccountJson) {
              _context2.n = 1;
              break;
            }
            throw new Error('Chưa có Service Account JSON');
          case 1:
            return _context2.a(2, MTToken.get(cfg.serviceAccountJson));
        }
      }, _callee2);
    }))();
  },
  read: function read(sid, range) {
    var _this2 = this;
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
      var token, resp, d;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.n) {
          case 0:
            _context3.n = 1;
            return _this2._token();
          case 1:
            token = _context3.v;
            _context3.n = 2;
            return fetch("".concat(SHEETS_API, "/").concat(sid, "/values/").concat(encodeURIComponent(range)), {
              headers: {
                Authorization: "Bearer ".concat(token)
              }
            });
          case 2:
            resp = _context3.v;
            if (!(resp.status === 400)) {
              _context3.n = 3;
              break;
            }
            return _context3.a(2, []);
          case 3:
            if (resp.ok) {
              _context3.n = 4;
              break;
            }
            throw new Error("\u0110\u1ECDc sheet l\u1ED7i (".concat(resp.status, ")"));
          case 4:
            _context3.n = 5;
            return resp.json();
          case 5:
            d = _context3.v;
            return _context3.a(2, d.values || []);
        }
      }, _callee3);
    }))();
  },
  batchRead: function batchRead(sid, ranges) {
    var _this3 = this;
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
      var token, qs, resp, d;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.n) {
          case 0:
            _context4.n = 1;
            return _this3._token();
          case 1:
            token = _context4.v;
            qs = ranges.map(function (r) {
              return "ranges=".concat(encodeURIComponent(r));
            }).join('&');
            _context4.n = 2;
            return fetch("".concat(SHEETS_API, "/").concat(sid, "/values:batchGet?").concat(qs), {
              headers: {
                Authorization: "Bearer ".concat(token)
              }
            });
          case 2:
            resp = _context4.v;
            if (!(resp.status === 400)) {
              _context4.n = 3;
              break;
            }
            return _context4.a(2, ranges.map(function () {
              return [];
            }));
          case 3:
            if (resp.ok) {
              _context4.n = 4;
              break;
            }
            throw new Error("Batch read l\u1ED7i (".concat(resp.status, ")"));
          case 4:
            _context4.n = 5;
            return resp.json();
          case 5:
            d = _context4.v;
            return _context4.a(2, (d.valueRanges || []).map(function (vr) {
              return vr.values || [];
            }));
        }
      }, _callee4);
    }))();
  },
  write: function write(sid, range, values) {
    var _this4 = this;
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
      var token, safeValues, resp, errText;
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.n) {
          case 0:
            _context5.n = 1;
            return _this4._token();
          case 1:
            token = _context5.v;
            // values must be 2D array; if caller passes [['']] to clear, ensure it's valid
            safeValues = values && values.length && Array.isArray(values[0]) ? values : [values];
            _context5.n = 2;
            return fetch("".concat(SHEETS_API, "/").concat(sid, "/values/").concat(encodeURIComponent(range), "?valueInputOption=RAW"), {
              method: 'PUT',
              headers: {
                Authorization: "Bearer ".concat(token),
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                range: range,
                values: safeValues
              })
            });
          case 2:
            resp = _context5.v;
            if (resp.ok) {
              _context5.n = 4;
              break;
            }
            _context5.n = 3;
            return resp.text();
          case 3:
            errText = _context5.v;
            throw new Error("Ghi sheet l\u1ED7i (".concat(resp.status, "): ").concat(errText));
          case 4:
            return _context5.a(2, resp.json());
        }
      }, _callee5);
    }))();
  },
  append: function append(sid, range, values) {
    var _this5 = this;
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
      var token, resp;
      return _regenerator().w(function (_context6) {
        while (1) switch (_context6.n) {
          case 0:
            _context6.n = 1;
            return _this5._token();
          case 1:
            token = _context6.v;
            _context6.n = 2;
            return fetch("".concat(SHEETS_API, "/").concat(sid, "/values/").concat(encodeURIComponent(range), ":append?valueInputOption=RAW&insertDataOption=INSERT_ROWS"), {
              method: 'POST',
              headers: {
                Authorization: "Bearer ".concat(token),
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                values: values
              })
            });
          case 2:
            resp = _context6.v;
            if (resp.ok) {
              _context6.n = 3;
              break;
            }
            throw new Error("Append sheet l\u1ED7i (".concat(resp.status, ")"));
          case 3:
            return _context6.a(2, resp.json());
        }
      }, _callee6);
    }))();
  },
  batchUpdate: function batchUpdate(sid, data) {
    var _this6 = this;
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
      var token, resp;
      return _regenerator().w(function (_context7) {
        while (1) switch (_context7.n) {
          case 0:
            _context7.n = 1;
            return _this6._token();
          case 1:
            token = _context7.v;
            _context7.n = 2;
            return fetch("".concat(SHEETS_API, "/").concat(sid, "/values:batchUpdate"), {
              method: 'POST',
              headers: {
                Authorization: "Bearer ".concat(token),
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                valueInputOption: 'RAW',
                data: data
              })
            });
          case 2:
            resp = _context7.v;
            if (resp.ok) {
              _context7.n = 3;
              break;
            }
            throw new Error("Batch update l\u1ED7i (".concat(resp.status, ")"));
          case 3:
            return _context7.a(2, resp.json());
        }
      }, _callee7);
    }))();
  },
  batchClear: function batchClear(sid, ranges) {
    var _this7 = this;
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
      var token, resp;
      return _regenerator().w(function (_context8) {
        while (1) switch (_context8.n) {
          case 0:
            _context8.n = 1;
            return _this7._token();
          case 1:
            token = _context8.v;
            _context8.n = 2;
            return fetch("".concat(SHEETS_API, "/").concat(sid, "/values:batchClear"), {
              method: 'POST',
              headers: {
                Authorization: "Bearer ".concat(token),
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                ranges: ranges
              })
            });
          case 2:
            resp = _context8.v;
            if (resp.ok) {
              _context8.n = 3;
              break;
            }
            throw new Error("Batch clear l\u1ED7i (".concat(resp.status, ")"));
          case 3:
            return _context8.a(2);
        }
      }, _callee8);
    }))();
  },
  // Parse rows → array of objects
  parseSheet: function parseSheet(rows) {
    if (!rows || rows.length < 2) return [];
    var headers = rows[0];
    return rows.slice(1).map(function (row) {
      var obj = {};
      headers.forEach(function (h, i) {
        var _row$i;
        obj[h] = (_row$i = row[i]) !== null && _row$i !== void 0 ? _row$i : '';
      });
      return obj;
    }).filter(function (r) {
      return r.id || r.username;
    }); // bỏ hàng trống
  },
  // Convert object → row theo headers
  objToRow: function objToRow(headers, obj) {
    return headers.map(function (h) {
      var v = obj[h];
      if (Array.isArray(v)) return v.join(', ');
      if (v === null || v === undefined) return '';
      return String(v).substring(0, 500);
    });
  }
};

// ─────────────────────────────────────────────────────────────────────
//  D. ADMIN SETUP — Khởi tạo GSheet trung tâm
// ─────────────────────────────────────────────────────────────────────
var MTAdmin = {
  // Tạo spreadsheet mới với đầy đủ sheets
  initSpreadsheet: function initSpreadsheet(saJson, spreadsheetId, adminInfo, onProgress) {
    var _this8 = this;
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
      var sid;
      return _regenerator().w(function (_context9) {
        while (1) switch (_context9.n) {
          case 0:
            onProgress === null || onProgress === void 0 || onProgress('Đang xác thực Service Account...', 10);
            // Lưu tạm để dùng token
            MTConfig.save({
              serviceAccountJson: saJson,
              spreadsheetId: spreadsheetId || null,
              role: 'admin',
              user: adminInfo
            });
            sid = spreadsheetId;
            if (sid) {
              _context9.n = 1;
              break;
            }
            throw new Error('Vui lòng nhập Spreadsheet ID ở Bước 2. Tạo Google Sheet → share cho Service Account → dán ID vào đây.');
          case 1:
            // Kiểm tra và tạo các sheet còn thiếu trong spreadsheet có sẵn
            onProgress === null || onProgress === void 0 || onProgress('Đang kiểm tra cấu trúc Google Sheet...', 25);
            _context9.n = 2;
            return _this8._ensureSheets(saJson, sid);
          case 2:
            // Ghi headers + admin account
            onProgress === null || onProgress === void 0 || onProgress('Đang khởi tạo cấu trúc dữ liệu...', 50);
            _context9.n = 3;
            return _this8._initHeaders(sid);
          case 3:
            onProgress === null || onProgress === void 0 || onProgress('Đang tạo tài khoản Admin...', 75);
            _context9.n = 4;
            return _this8._createAdminAccount(sid, adminInfo);
          case 4:
            // Lưu config hoàn chỉnh
            MTConfig.save({
              serviceAccountJson: saJson,
              spreadsheetId: sid,
              role: 'admin',
              user: adminInfo,
              orgId: 'all',
              setupAt: new Date().toISOString()
            });
            onProgress === null || onProgress === void 0 || onProgress('Hoàn tất!', 100);
            return _context9.a(2, sid);
        }
      }, _callee9);
    }))();
  },
  // Kiểm tra và tạo các sheet còn thiếu trong spreadsheet đã có
  _ensureSheets: function _ensureSheets(saJson, sid) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0() {
      var REQUIRED, token, resp, data, existing, missing, requests, addResp, _t4, _t5, _t6;
      return _regenerator().w(function (_context0) {
        while (1) switch (_context0.n) {
          case 0:
            REQUIRED = Object.values(SH); // ['system_users','organizations','system_meta','docs','members','reminders','tasks']
            _context0.n = 1;
            return MTToken.get(saJson);
          case 1:
            token = _context0.v;
            _context0.n = 2;
            return fetch("".concat(SHEETS_API, "/").concat(sid, "?fields=sheets.properties.title"), {
              headers: {
                Authorization: "Bearer ".concat(token)
              }
            });
          case 2:
            resp = _context0.v;
            if (resp.ok) {
              _context0.n = 3;
              break;
            }
            throw new Error("Kh\xF4ng \u0111\u1ECDc \u0111\u01B0\u1EE3c spreadsheet (".concat(resp.status, "). Ki\u1EC3m tra l\u1EA1i Spreadsheet ID v\xE0 quy\u1EC1n share cho Service Account."));
          case 3:
            _context0.n = 4;
            return resp.json();
          case 4:
            data = _context0.v;
            existing = (data.sheets || []).map(function (s) {
              return s.properties.title;
            });
            missing = REQUIRED.filter(function (name) {
              return !existing.includes(name);
            });
            if (missing.length) {
              _context0.n = 5;
              break;
            }
            return _context0.a(2);
          case 5:
            // Đã đủ sheet
            // Tạo các sheet còn thiếu
            requests = missing.map(function (title) {
              return {
                addSheet: {
                  properties: {
                    title: title
                  }
                }
              };
            });
            _context0.n = 6;
            return fetch("".concat(SHEETS_API, "/").concat(sid, ":batchUpdate"), {
              method: 'POST',
              headers: {
                Authorization: "Bearer ".concat(token),
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                requests: requests
              })
            });
          case 6:
            addResp = _context0.v;
            if (addResp.ok) {
              _context0.n = 8;
              break;
            }
            _t4 = Error;
            _t5 = "Kh\xF4ng t\u1EA1o \u0111\u01B0\u1EE3c sheet: ";
            _context0.n = 7;
            return addResp.text();
          case 7:
            _t6 = _t5.concat.call(_t5, _context0.v);
            throw new _t4(_t6);
          case 8:
            return _context0.a(2);
        }
      }, _callee0);
    }))();
  },
  _initHeaders: function _initHeaders(sid) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1() {
      var data;
      return _regenerator().w(function (_context1) {
        while (1) switch (_context1.n) {
          case 0:
            data = [{
              range: "".concat(SH.USERS, "!A1:K1"),
              values: [['username', 'displayName', 'pinHash', 'role', 'orgId', 'orgName', 'deviceId', 'createdAt', 'lastLogin', 'status', 'inviteCode']]
            }, {
              range: "".concat(SH.ORGS, "!A1:F1"),
              values: [['id', 'name', 'address', 'secretary', 'phone', 'createdAt']]
            }, {
              range: "".concat(SH.DOCS, "!A1:O1"),
              values: [['id', 'org_id', 'title', 'type', 'code', 'issuer', 'issueDate', 'deadline', 'status', 'priority', 'summary', 'keywords', 'rawText', 'createdAt', 'updatedBy']]
            }, {
              range: "".concat(SH.MEMBERS, "!A1:O1"),
              values: [['id', 'org_id', 'fullName', 'gender', 'chiDoan', 'role', 'birthDate', 'joinDate', 'phone', 'email', 'status', 'achieve', 'note', 'createdAt', 'updatedBy']]
            }, {
              range: "".concat(SH.REMIND, "!A1:I1"),
              values: [['id', 'org_id', 'title', 'date', 'tag', 'note', 'done', 'docId', 'createdAt']]
            }, {
              range: "".concat(SH.TASKS, "!A1:J1"),
              values: [['id', 'org_id', 'title', 'deadline', 'status', 'priority', 'note', 'assignee', 'createdAt', 'updatedBy']]
            }, {
              range: "".concat(SH.META, "!A1:B1"),
              values: [['key', 'value']]
            }];
            _context1.n = 1;
            return SheetsAPI.batchUpdate(sid, data);
          case 1:
            _context1.n = 2;
            return SheetsAPI.append(sid, "".concat(SH.META, "!A:B"), [['version', MT_VERSION], ['initAt', new Date().toISOString()], ['type', 'doanvan_central']]);
          case 2:
            return _context1.a(2);
        }
      }, _callee1);
    }))();
  },
  _createAdminAccount: function _createAdminAccount(sid, adminInfo) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10() {
      var pinHash;
      return _regenerator().w(function (_context10) {
        while (1) switch (_context10.n) {
          case 0:
            if (adminInfo.pin) {
              _context10.n = 1;
              break;
            }
            throw new Error('[AuthSecure] Admin PIN là bắt buộc');
          case 1:
            pinHash = _mtHashPIN(adminInfo.pin);
            _context10.n = 2;
            return SheetsAPI.append(sid, "".concat(SH.USERS, "!A:K"), [[adminInfo.username, adminInfo.displayName, pinHash, 'admin', 'all', 'Toàn hệ thống', _mtDeviceId(), new Date().toISOString(), new Date().toISOString(), 'active', '']]);
          case 2:
            return _context10.a(2);
        }
      }, _callee10);
    }))();
  },
  // Tạo Invite Code cho người dùng mới — ghi vào GSheet để mobile quét được
  generateInviteCode: function generateInviteCode(targetUsername, role, orgId, orgName) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11() {
      var cfg, code, payload, rows, users, existing, rowIdx, payloadStr, _t7;
      return _regenerator().w(function (_context11) {
        while (1) switch (_context11.p = _context11.n) {
          case 0:
            cfg = MTConfig.get();
            if (!(!(cfg !== null && cfg !== void 0 && cfg.spreadsheetId) || cfg.role !== 'admin')) {
              _context11.n = 1;
              break;
            }
            throw new Error('Chỉ admin mới tạo được Invite Code');
          case 1:
            code = _mtRandomCode(10);
            payload = {
              spreadsheetId: cfg.spreadsheetId,
              serviceAccountJson: cfg.serviceAccountJson,
              // chia sẻ key SA
              role: role,
              orgId: orgId,
              orgName: orgName,
              username: targetUsername,
              code: code,
              expiry: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 ngày
            }; // Ghi invite code vào GSheet (cột inviteCode trong users)
            // Tìm hàng user nếu đã tồn tại, hoặc tạo mới placeholder
            _context11.n = 2;
            return SheetsAPI.read(cfg.spreadsheetId, "".concat(SH.USERS, "!A:K"));
          case 2:
            rows = _context11.v;
            users = SheetsAPI.parseSheet(rows);
            existing = users.find(function (u) {
              return u.username === targetUsername;
            });
            if (existing) {
              _context11.n = 4;
              break;
            }
            _context11.n = 3;
            return SheetsAPI.append(cfg.spreadsheetId, "".concat(SH.USERS, "!A:K"), [[targetUsername, targetUsername, '', role, orgId, orgName, '', new Date().toISOString(), '', 'pending', code]]);
          case 3:
            _context11.n = 5;
            break;
          case 4:
            // Cập nhật invite code
            rowIdx = users.indexOf(existing) + 2; // +2 vì header + 1-indexed
            _context11.n = 5;
            return SheetsAPI.write(cfg.spreadsheetId, "".concat(SH.USERS, "!K").concat(rowIdx), [[code]]);
          case 5:
            _context11.p = 5;
            payloadStr = JSON.stringify(payload); // Lưu compressed: key=invite_CODE, value=JSON payload (cắt bớt saJson nếu quá dài)
            // saJson thường rất dài, lưu nguyên để mobile có thể dùng
            _context11.n = 6;
            return SheetsAPI.append(cfg.spreadsheetId, "".concat(SH.META, "!A:B"), [['invite_' + code, payloadStr]]);
          case 6:
            _context11.n = 8;
            break;
          case 7:
            _context11.p = 7;
            _t7 = _context11.v;
            console.warn('Không ghi được invite lên GSheet:', _t7.message);
          case 8:
            // Cũng lưu localStorage cho cùng thiết bị dùng ngay
            localStorage.setItem('mt_invite_' + code, JSON.stringify(payload));
            return _context11.a(2, {
              code: code,
              payload: payload
            });
        }
      }, _callee11, null, [[5, 7]]);
    }))();
  }
};

// ─────────────────────────────────────────────────────────────────────
//  E. USER AUTH — Đăng ký / Đăng nhập qua Invite Code
// ─────────────────────────────────────────────────────────────────────
var MTAuth = {
  // Đăng nhập bằng Invite Code (lần đầu trên thiết bị mới)
  joinWithCode: function joinWithCode(code, username, displayName, pin) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12() {
      var payload, local, rows, users, row, pinHash, rowIdx, deviceId, finalCfg;
      return _regenerator().w(function (_context12) {
        while (1) switch (_context12.n) {
          case 0:
            code = code.toUpperCase().replace(/\s/g, '');

            // 1) Thử tìm trong localStorage trước (cùng máy với admin)
            payload = null;
            local = localStorage.getItem('mt_invite_' + code);
            if (local) {
              try {
                payload = JSON.parse(local);
              } catch (_unused2) {/**/}
            }

            // 2) Nếu không có local → tìm "Deep Code" localStorage (cùng máy)
            if (!payload) {
              payload = _mtDecodeDeepCode(code);
            }

            // 3) Nếu vẫn không có → đọc từ GSheet qua bootstrap spreadsheetId
            //    Mobile cần biết spreadsheetId trước — lấy từ config hiện tại nếu có
            if (payload) {
              _context12.n = 2;
              break;
            }
            _context12.n = 1;
            return _mtFetchInviteFromSheet(code);
          case 1:
            payload = _context12.v;
          case 2:
            if (payload) {
              _context12.n = 3;
              break;
            }
            throw new Error('Mã mời không hợp lệ hoặc đã hết hạn. Hãy đảm bảo bạn đã nhập đúng mã từ PC.');
          case 3:
            if (!(payload.expiry && Date.now() > payload.expiry)) {
              _context12.n = 4;
              break;
            }
            throw new Error('Mã mời đã hết hạn (>7 ngày)');
          case 4:
            // 3) Xác thực với GSheet: tìm user trong system_users
            MTConfig.save({
              serviceAccountJson: payload.serviceAccountJson,
              spreadsheetId: payload.spreadsheetId,
              role: payload.role,
              orgId: payload.orgId,
              orgName: payload.orgName,
              user: {
                username: username || payload.username,
                displayName: displayName,
                pin: pin
              }
            });
            _context12.n = 5;
            return SheetsAPI.read(payload.spreadsheetId, "".concat(SH.USERS, "!A:K"));
          case 5:
            rows = _context12.v;
            users = SheetsAPI.parseSheet(rows);
            row = users.find(function (u) {
              return u.inviteCode === code || u.username === (username || payload.username);
            });
            if (row) {
              _context12.n = 6;
              break;
            }
            throw new Error('Không tìm thấy tài khoản trong hệ thống');
          case 6:
            pinHash = _mtHashPIN(pin);
            rowIdx = users.indexOf(row) + 2;
            deviceId = _mtDeviceId(); // Cập nhật thông tin user
            _context12.n = 7;
            return SheetsAPI.write(payload.spreadsheetId, "".concat(SH.USERS, "!A").concat(rowIdx, ":K").concat(rowIdx), [[username || row.username, displayName || row.displayName, pinHash, row.role || payload.role, row.orgId || payload.orgId, row.orgName || payload.orgName, deviceId, row.createdAt || new Date().toISOString(), new Date().toISOString(), 'active', '' // xoá invite code sau khi dùng
            ]]);
          case 7:
            // Lưu config hoàn chỉnh
            finalCfg = {
              serviceAccountJson: payload.serviceAccountJson,
              spreadsheetId: payload.spreadsheetId,
              role: row.role || payload.role,
              orgId: row.orgId || payload.orgId,
              orgName: row.orgName || payload.orgName,
              user: {
                username: username || row.username,
                displayName: displayName || row.displayName,
                pinHash: pinHash
              },
              deviceId: deviceId,
              joinedAt: new Date().toISOString()
            };
            MTConfig.save(finalCfg);
            _mtStartSession(finalCfg);
            return _context12.a(2, finalCfg);
        }
      }, _callee12);
    }))();
  },
  // Đăng nhập bằng PIN (đã có config trước)
  loginWithPIN: function loginWithPIN(pin) {
    var _this9 = this;
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13() {
      var cfg, pinHash;
      return _regenerator().w(function (_context13) {
        while (1) switch (_context13.n) {
          case 0:
            cfg = MTConfig.get();
            if (cfg !== null && cfg !== void 0 && cfg.user) {
              _context13.n = 1;
              break;
            }
            throw new Error('Chưa có tài khoản. Vui lòng dùng Mã mời.');
          case 1:
            pinHash = _mtHashPIN(pin);
            if (!(cfg.user.pinHash !== pinHash)) {
              _context13.n = 2;
              break;
            }
            throw new Error('Mã PIN không đúng');
          case 2:
            // Cập nhật lastLogin trên GSheet (bất đồng bộ, không chặn)
            _this9._updateLastLogin(cfg).catch(function () {});
            _mtStartSession(cfg);
            return _context13.a(2, cfg);
        }
      }, _callee13);
    }))();
  },
  _updateLastLogin: function _updateLastLogin(cfg) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14() {
      var rows, users, row, idx;
      return _regenerator().w(function (_context14) {
        while (1) switch (_context14.n) {
          case 0:
            if (cfg.spreadsheetId) {
              _context14.n = 1;
              break;
            }
            return _context14.a(2);
          case 1:
            _context14.n = 2;
            return SheetsAPI.read(cfg.spreadsheetId, "".concat(SH.USERS, "!A:K"));
          case 2:
            rows = _context14.v;
            users = SheetsAPI.parseSheet(rows);
            row = users.find(function (u) {
              return u.username === cfg.user.username;
            });
            if (row) {
              _context14.n = 3;
              break;
            }
            return _context14.a(2);
          case 3:
            idx = users.indexOf(row) + 2;
            _context14.n = 4;
            return SheetsAPI.write(cfg.spreadsheetId, "".concat(SH.USERS, "!I").concat(idx), [[new Date().toISOString()]]);
          case 4:
            return _context14.a(2);
        }
      }, _callee14);
    }))();
  },
  isLoggedIn: function isLoggedIn() {
    try {
      var s = JSON.parse(sessionStorage.getItem(MT_SESSION) || 'null');
      return s && Date.now() - s.ts < 8 * 60 * 60 * 1000;
    } catch (_unused3) {
      return false;
    }
  },
  logout: function logout() {
    sessionStorage.removeItem(MT_SESSION);
  }
};

// ─────────────────────────────────────────────────────────────────────
//  F. DATA SYNC — Push/Pull dữ liệu với phân quyền org_id
// ─────────────────────────────────────────────────────────────────────
var MTSync = {
  // Pull dữ liệu từ GSheet về localStorage (dùng lại bởi DB.get)
  pullAll: function pullAll(onProgress) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15() {
      var cfg, _yield$SheetsAPI$batc, _yield$SheetsAPI$batc2, docsRows, membersRows, remindsRows, tasksRows, filterOrg, docs, members, reminds, tasks, profile;
      return _regenerator().w(function (_context15) {
        while (1) switch (_context15.n) {
          case 0:
            cfg = MTConfig.get();
            if (cfg !== null && cfg !== void 0 && cfg.spreadsheetId) {
              _context15.n = 1;
              break;
            }
            throw new Error('Chưa cấu hình hệ thống');
          case 1:
            onProgress === null || onProgress === void 0 || onProgress('Đang tải dữ liệu...', 10);
            _context15.n = 2;
            return SheetsAPI.batchRead(cfg.spreadsheetId, ["".concat(SH.DOCS, "!A:O"), "".concat(SH.MEMBERS, "!A:O"), "".concat(SH.REMIND, "!A:I"), "".concat(SH.TASKS, "!A:J")]);
          case 2:
            _yield$SheetsAPI$batc = _context15.v;
            _yield$SheetsAPI$batc2 = _slicedToArray(_yield$SheetsAPI$batc, 4);
            docsRows = _yield$SheetsAPI$batc2[0];
            membersRows = _yield$SheetsAPI$batc2[1];
            remindsRows = _yield$SheetsAPI$batc2[2];
            tasksRows = _yield$SheetsAPI$batc2[3];
            onProgress === null || onProgress === void 0 || onProgress('Xử lý dữ liệu...', 60);
            filterOrg = function filterOrg(rows) {
              var all = SheetsAPI.parseSheet(rows);
              if (cfg.role === 'admin') return all; // admin thấy tất cả
              return all.filter(function (r) {
                return !r.org_id || r.org_id === cfg.orgId || r.org_id === '';
              });
            };
            docs = filterOrg(docsRows);
            members = filterOrg(membersRows);
            reminds = filterOrg(remindsRows);
            tasks = filterOrg(tasksRows);
            if (docs.length) DB.set('docs', docs);
            if (members.length) DB.set('membersList', members);
            if (reminds.length) DB.set('reminders', reminds);
            if (tasks.length) DB.set('tasks', tasks);

            // Cập nhật timestamp
            profile = MTConfig.get();
            if (profile) {
              profile.lastSync = new Date().toISOString();
              MTConfig.save(profile);
            }
            onProgress === null || onProgress === void 0 || onProgress('Hoàn tất!', 100);
            _mtUpdateSyncBadge('synced', "\u0110\xE3 t\u1EA3i ".concat(new Date().toLocaleTimeString('vi-VN')));
            if (typeof updateBadges === 'function') updateBadges();
            if (typeof refreshDashboard === 'function') refreshDashboard();
            return _context15.a(2, {
              docs: docs.length,
              members: members.length
            });
        }
      }, _callee15);
    }))();
  },
  // Push toàn bộ dữ liệu lên GSheet
  pushAll: function pushAll(onProgress) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16() {
      var _cfg$user;
      var cfg, orgId, username, now, localDocs, localMembers, localReminds, localTasks, tagOrg, _yield$SheetsAPI$batc3, _yield$SheetsAPI$batc4, docsRows, membersRows, remindsRows, tasksRows, merge, mergedDocs, mergedMembers, mergedReminds, mergedTasks, docHdr, memHdr, remHdr, tskHdr, toRows, sheetDefs, _i, _sheetDefs, _sheetDefs$_i, name, rows, hdr, lastCol, clearRange, writeRange, profile;
      return _regenerator().w(function (_context16) {
        while (1) switch (_context16.n) {
          case 0:
            cfg = MTConfig.get();
            if (cfg !== null && cfg !== void 0 && cfg.spreadsheetId) {
              _context16.n = 1;
              break;
            }
            throw new Error('Chưa cấu hình hệ thống');
          case 1:
            onProgress === null || onProgress === void 0 || onProgress('Chuẩn bị dữ liệu...', 10);
            orgId = cfg.orgId || 'unknown';
            username = ((_cfg$user = cfg.user) === null || _cfg$user === void 0 ? void 0 : _cfg$user.username) || 'unknown';
            now = new Date().toISOString(); // Đọc dữ liệu local
            localDocs = (typeof DB !== 'undefined' ? DB.get('docs') : []) || [];
            localMembers = (typeof DB !== 'undefined' ? DB.get('membersList') : []) || [];
            localReminds = (typeof DB !== 'undefined' ? DB.get('reminders') : []) || [];
            localTasks = (typeof DB !== 'undefined' ? DB.get('tasks') : []) || []; // Gắn org_id và updatedBy nếu chưa có
            tagOrg = function tagOrg(arr) {
              return arr.map(function (r) {
                return _objectSpread(_objectSpread({
                  org_id: orgId
                }, r), {}, {
                  updatedBy: username,
                  _ts: now
                });
              });
            };
            onProgress === null || onProgress === void 0 || onProgress('Đọc dữ liệu hiện tại từ Sheet...', 25);

            // Pull dữ liệu hiện tại từ sheet
            _context16.n = 2;
            return SheetsAPI.batchRead(cfg.spreadsheetId, ["".concat(SH.DOCS, "!A:O"), "".concat(SH.MEMBERS, "!A:O"), "".concat(SH.REMIND, "!A:I"), "".concat(SH.TASKS, "!A:J")]);
          case 2:
            _yield$SheetsAPI$batc3 = _context16.v;
            _yield$SheetsAPI$batc4 = _slicedToArray(_yield$SheetsAPI$batc3, 4);
            docsRows = _yield$SheetsAPI$batc4[0];
            membersRows = _yield$SheetsAPI$batc4[1];
            remindsRows = _yield$SheetsAPI$batc4[2];
            tasksRows = _yield$SheetsAPI$batc4[3];
            onProgress === null || onProgress === void 0 || onProgress('Gộp dữ liệu...', 50);

            // Merge: giữ dữ liệu org khác, thay dữ liệu org mình
            merge = function merge(sheetRows, localArr) {
              var idKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'id';
              var sheetAll = SheetsAPI.parseSheet(sheetRows);
              // Xoá dữ liệu cũ của org mình
              var others = cfg.role === 'admin' ? [] : sheetAll.filter(function (r) {
                return r.org_id && r.org_id !== orgId;
              });
              // Gộp với dữ liệu mới của mình
              var myNew = tagOrg(localArr);
              return [].concat(_toConsumableArray(others), _toConsumableArray(myNew));
            };
            mergedDocs = merge(docsRows, localDocs);
            mergedMembers = merge(membersRows, localMembers);
            mergedReminds = merge(remindsRows, localReminds);
            mergedTasks = merge(tasksRows, localTasks);
            onProgress === null || onProgress === void 0 || onProgress('Ghi lên Google Sheet...', 70);

            // Headers
            docHdr = ['id', 'org_id', 'title', 'type', 'code', 'issuer', 'issueDate', 'deadline', 'status', 'priority', 'summary', 'keywords', 'rawText', 'createdAt', 'updatedBy'];
            memHdr = ['id', 'org_id', 'fullName', 'gender', 'chiDoan', 'role', 'birthDate', 'joinDate', 'phone', 'email', 'status', 'achieve', 'note', 'createdAt', 'updatedBy'];
            remHdr = ['id', 'org_id', 'title', 'date', 'tag', 'note', 'done', 'docId', 'createdAt'];
            tskHdr = ['id', 'org_id', 'title', 'deadline', 'status', 'priority', 'note', 'assignee', 'createdAt', 'updatedBy'];
            toRows = function toRows(arr, hdrs) {
              return arr.map(function (r) {
                return SheetsAPI.objToRow(hdrs, r);
              });
            }; // Clear + rewrite per sheet using individual PUT (avoids batchClear 400 on fresh sheets)
            sheetDefs = [{
              name: SH.DOCS,
              rows: mergedDocs,
              hdr: docHdr
            }, {
              name: SH.MEMBERS,
              rows: mergedMembers,
              hdr: memHdr
            }, {
              name: SH.REMIND,
              rows: mergedReminds,
              hdr: remHdr
            }, {
              name: SH.TASKS,
              rows: mergedTasks,
              hdr: tskHdr
            }];
            _i = 0, _sheetDefs = sheetDefs;
          case 3:
            if (!(_i < _sheetDefs.length)) {
              _context16.n = 6;
              break;
            }
            _sheetDefs$_i = _sheetDefs[_i], name = _sheetDefs$_i.name, rows = _sheetDefs$_i.rows, hdr = _sheetDefs$_i.hdr;
            lastCol = String.fromCharCode(64 + hdr.length);
            clearRange = "".concat(name, "!A2:").concat(lastCol, "1000"); // Clear first
            _context16.n = 4;
            return SheetsAPI.write(cfg.spreadsheetId, clearRange, [['']]).catch(function () {});
          case 4:
            if (!rows.length) {
              _context16.n = 5;
              break;
            }
            writeRange = "".concat(name, "!A2:").concat(lastCol).concat(rows.length + 1);
            _context16.n = 5;
            return SheetsAPI.write(cfg.spreadsheetId, writeRange, toRows(rows, hdr));
          case 5:
            _i++;
            _context16.n = 3;
            break;
          case 6:
            onProgress === null || onProgress === void 0 || onProgress('Cập nhật meta...', 90);

            // Cập nhật meta
            _context16.n = 7;
            return SheetsAPI.append(cfg.spreadsheetId, "".concat(SH.META, "!A:B"), [["lastSync_".concat(orgId), now], ["lastDevice_".concat(orgId), cfg.deviceId || 'unknown']]);
          case 7:
            profile = MTConfig.get();
            if (profile) {
              profile.lastSync = now;
              MTConfig.save(profile);
            }
            onProgress === null || onProgress === void 0 || onProgress('Hoàn tất!', 100);
            _mtUpdateSyncBadge('synced', "\u0110\xE3 \u0111\u1ED3ng b\u1ED9 ".concat(new Date().toLocaleTimeString('vi-VN')));
            return _context16.a(2, {
              docs: localDocs.length,
              members: localMembers.length
            });
        }
      }, _callee16);
    }))();
  },
  // Auto-sync khi có thay đổi
  scheduleAutoSync: function scheduleAutoSync() {
    var _this0 = this;
    var cfg = MTConfig.get();
    if (!(cfg !== null && cfg !== void 0 && cfg.spreadsheetId)) return;
    if (this._autoTimer) clearTimeout(this._autoTimer);
    this._autoTimer = setTimeout(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17() {
      var _t8;
      return _regenerator().w(function (_context17) {
        while (1) switch (_context17.p = _context17.n) {
          case 0:
            _context17.p = 0;
            _mtUpdateSyncBadge('syncing', 'Đang đồng bộ...');
            _context17.n = 1;
            return _this0.pushAll(function () {});
          case 1:
            if (typeof toast === 'function') toast('✅ Đồng bộ tự động thành công', 'success');
            _context17.n = 3;
            break;
          case 2:
            _context17.p = 2;
            _t8 = _context17.v;
            _mtUpdateSyncBadge('error', 'Lỗi đồng bộ');
          case 3:
            return _context17.a(2);
        }
      }, _callee17, null, [[0, 2]]);
    })), 3000); // debounce 3 giây
  }
};

// ─────────────────────────────────────────────────────────────────────
//  G. USER MANAGEMENT (Admin only)
// ─────────────────────────────────────────────────────────────────────
var MTUserMgr = {
  listUsers: function listUsers() {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18() {
      var cfg, rows;
      return _regenerator().w(function (_context18) {
        while (1) switch (_context18.n) {
          case 0:
            cfg = MTConfig.get();
            if (cfg !== null && cfg !== void 0 && cfg.spreadsheetId) {
              _context18.n = 1;
              break;
            }
            return _context18.a(2, []);
          case 1:
            _context18.n = 2;
            return SheetsAPI.read(cfg.spreadsheetId, "".concat(SH.USERS, "!A:K"));
          case 2:
            rows = _context18.v;
            return _context18.a(2, SheetsAPI.parseSheet(rows));
        }
      }, _callee18);
    }))();
  },
  listOrgs: function listOrgs() {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee19() {
      var cfg, rows;
      return _regenerator().w(function (_context19) {
        while (1) switch (_context19.n) {
          case 0:
            cfg = MTConfig.get();
            if (cfg !== null && cfg !== void 0 && cfg.spreadsheetId) {
              _context19.n = 1;
              break;
            }
            return _context19.a(2, []);
          case 1:
            _context19.n = 2;
            return SheetsAPI.read(cfg.spreadsheetId, "".concat(SH.ORGS, "!A:F"));
          case 2:
            rows = _context19.v;
            return _context19.a(2, SheetsAPI.parseSheet(rows));
        }
      }, _callee19);
    }))();
  },
  addOrg: function addOrg(org) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee20() {
      var cfg, id;
      return _regenerator().w(function (_context20) {
        while (1) switch (_context20.n) {
          case 0:
            cfg = MTConfig.get();
            if (!(!(cfg !== null && cfg !== void 0 && cfg.spreadsheetId) || cfg.role !== 'admin')) {
              _context20.n = 1;
              break;
            }
            throw new Error('Không có quyền');
          case 1:
            id = 'org_' + Date.now();
            _context20.n = 2;
            return SheetsAPI.append(cfg.spreadsheetId, "".concat(SH.ORGS, "!A:F"), [[id, org.name, org.address || '', org.secretary || '', org.phone || '', new Date().toISOString()]]);
          case 2:
            return _context20.a(2, id);
        }
      }, _callee20);
    }))();
  },
  removeUser: function removeUser(username) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee21() {
      var cfg, rows, users, idx;
      return _regenerator().w(function (_context21) {
        while (1) switch (_context21.n) {
          case 0:
            cfg = MTConfig.get();
            if (!(!(cfg !== null && cfg !== void 0 && cfg.spreadsheetId) || cfg.role !== 'admin')) {
              _context21.n = 1;
              break;
            }
            throw new Error('Không có quyền');
          case 1:
            _context21.n = 2;
            return SheetsAPI.read(cfg.spreadsheetId, "".concat(SH.USERS, "!A:K"));
          case 2:
            rows = _context21.v;
            users = SheetsAPI.parseSheet(rows);
            idx = users.findIndex(function (u) {
              return u.username === username;
            });
            if (!(idx < 0)) {
              _context21.n = 3;
              break;
            }
            throw new Error('Không tìm thấy người dùng');
          case 3:
            _context21.n = 4;
            return SheetsAPI.write(cfg.spreadsheetId, "".concat(SH.USERS, "!J").concat(idx + 2), [['deleted']]);
          case 4:
            return _context21.a(2);
        }
      }, _callee21);
    }))();
  },
  changeRole: function changeRole(username, newRole) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee22() {
      var cfg, rows, users, idx;
      return _regenerator().w(function (_context22) {
        while (1) switch (_context22.n) {
          case 0:
            cfg = MTConfig.get();
            if (!(!(cfg !== null && cfg !== void 0 && cfg.spreadsheetId) || cfg.role !== 'admin')) {
              _context22.n = 1;
              break;
            }
            throw new Error('Không có quyền');
          case 1:
            _context22.n = 2;
            return SheetsAPI.read(cfg.spreadsheetId, "".concat(SH.USERS, "!A:K"));
          case 2:
            rows = _context22.v;
            users = SheetsAPI.parseSheet(rows);
            idx = users.findIndex(function (u) {
              return u.username === username;
            });
            if (!(idx < 0)) {
              _context22.n = 3;
              break;
            }
            throw new Error('Không tìm thấy người dùng');
          case 3:
            _context22.n = 4;
            return SheetsAPI.write(cfg.spreadsheetId, "".concat(SH.USERS, "!D").concat(idx + 2), [[newRole]]);
          case 4:
            return _context22.a(2);
        }
      }, _callee22);
    }))();
  }
};

// ─────────────────────────────────────────────────────────────────────
//  H. DEEP INVITE CODE — Encode/decode thông tin kết nối trong code
//     Giải quyết vấn đề mobile cần biết spreadsheetId + saJson
//     mà không cần gõ tay (dài)
// ─────────────────────────────────────────────────────────────────────
function _mtEncodeDeepCode(cfg, role, orgId, orgName, username) {
  var payload = {
    sid: cfg.spreadsheetId,
    sa: cfg.serviceAccountJson,
    r: role,
    o: orgId,
    on: orgName,
    u: username,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000
  };
  // Nén thành base64url, lưu vào GSheet dưới một key ngắn
  var code = _mtRandomCode(12);
  localStorage.setItem('mt_deep_' + code, JSON.stringify(payload));
  return code;
}
function _mtDecodeDeepCode(code) {
  try {
    var raw = localStorage.getItem('mt_deep_' + code);
    if (!raw) return null;
    var p = JSON.parse(raw);
    if (Date.now() > p.exp) return null;
    return {
      spreadsheetId: p.sid,
      serviceAccountJson: p.sa,
      role: p.r,
      orgId: p.o,
      orgName: p.on,
      username: p.u,
      expiry: p.exp
    };
  } catch (_unused4) {
    return null;
  }
}

// ─────────────────────────────────────────────────────────────────────
//  I. UTILITIES
// ─────────────────────────────────────────────────────────────────────

// Đọc invite payload từ GSheet — dùng khi mobile không có localStorage
// Cần spreadsheetId: lấy từ MTConfig hiện tại, hoặc từ payload đã biết trước
function _mtFetchInviteFromSheet(_x) {
  return _mtFetchInviteFromSheet2.apply(this, arguments);
}
function _mtFetchInviteFromSheet2() {
  _mtFetchInviteFromSheet2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee23(code) {
    var _cfg, rows, targetKey, found, payload, _t9;
    return _regenerator().w(function (_context23) {
      while (1) switch (_context23.p = _context23.n) {
        case 0:
          _context23.p = 0;
          // Lấy spreadsheetId + saJson từ config hiện tại (nếu mobile đã từng login)
          _cfg = MTConfig.get();
          if (!(!(_cfg !== null && _cfg !== void 0 && _cfg.spreadsheetId) || !(_cfg !== null && _cfg !== void 0 && _cfg.serviceAccountJson))) {
            _context23.n = 1;
            break;
          }
          return _context23.a(2, null);
        case 1:
          _context23.n = 2;
          return SheetsAPI.read(_cfg.spreadsheetId, "".concat(SH.META, "!A:B"));
        case 2:
          rows = _context23.v;
          if (!(!rows || rows.length < 2)) {
            _context23.n = 3;
            break;
          }
          return _context23.a(2, null);
        case 3:
          // Tìm hàng có key = "invite_CODE"
          targetKey = 'invite_' + code;
          found = rows.slice(1).find(function (r) {
            return r[0] === targetKey;
          });
          if (!(!found || !found[1])) {
            _context23.n = 4;
            break;
          }
          return _context23.a(2, null);
        case 4:
          payload = JSON.parse(found[1]);
          if (!(payload.expiry && Date.now() > payload.expiry)) {
            _context23.n = 5;
            break;
          }
          return _context23.a(2, null);
        case 5:
          return _context23.a(2, payload);
        case 6:
          _context23.p = 6;
          _t9 = _context23.v;
          console.warn('_mtFetchInviteFromSheet:', _t9.message);
          return _context23.a(2, null);
      }
    }, _callee23, null, [[0, 6]]);
  }));
  return _mtFetchInviteFromSheet2.apply(this, arguments);
}
function _mtHashPIN(pin) {
  var h = 5381;
  for (var i = 0; i < pin.length; i++) h = (h << 5) + h ^ pin.charCodeAt(i);
  return (h >>> 0).toString(16).padStart(8, '0');
}
function _mtRandomCode() {
  var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
  var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return Array.from({
    length: len
  }, function () {
    return chars[Math.floor(Math.random() * chars.length)];
  }).join('');
}
function _mtDeviceId() {
  var id = localStorage.getItem('mt_device_id');
  if (!id) {
    id = _mtRandomCode(16);
    localStorage.setItem('mt_device_id', id);
  }
  return id;
}
function _mtStartSession(cfg) {
  sessionStorage.setItem(MT_SESSION, JSON.stringify({
    ts: Date.now(),
    role: cfg.role,
    orgId: cfg.orgId
  }));
}
function _mtUpdateSyncBadge(state, label) {
  // Dùng lại hàm từ doanvan-mobile-sync.js nếu có
  if (typeof _dvUpdateSyncBadge === 'function') {
    _dvUpdateSyncBadge(state, label);
  } else {
    var badge = document.getElementById('dvSyncBadge');
    var lbl = document.getElementById('dvSyncLabel');
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
  var modal = document.createElement('div');
  modal.id = 'mtAdminSetupModal';
  modal.className = 'modal-overlay';
  modal.innerHTML = "\n<div class=\"modal\" style=\"max-width:640px\">\n  <div class=\"modal-header\">\n    <h2 style=\"display:flex;align-items:center;gap:10px\">\n      <span style=\"width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,var(--red),var(--gold));display:flex;align-items:center;justify-content:center;flex-shrink:0\">\n        <i class=\"fas fa-shield-alt\" style=\"color:#fff;font-size:0.9rem\"></i>\n      </span>\n      Thi\u1EBFt l\u1EADp Admin \u2014 H\u1EC7 th\u1ED1ng trung t\xE2m\n    </h2>\n    <button class=\"btn btn-ghost\" onclick=\"document.getElementById('mtAdminSetupModal').remove()\"><i class=\"fas fa-times\"></i></button>\n  </div>\n\n  <div class=\"modal-body\" style=\"padding:24px\">\n    <!-- STEPPER -->\n    <div style=\"display:flex;gap:0;margin-bottom:24px;background:var(--cream);border-radius:12px;padding:4px\">\n      <button class=\"btn btn-primary mt-step-btn active\" id=\"mtStep1Btn\" onclick=\"mtGoStep(1)\" style=\"flex:1;border-radius:8px\">\n        <i class=\"fas fa-key\"></i> 1. Service Account\n      </button>\n      <button class=\"btn btn-ghost mt-step-btn\" id=\"mtStep2Btn\" onclick=\"mtGoStep(2)\" style=\"flex:1;border-radius:8px\" disabled>\n        <i class=\"fas fa-table\"></i> 2. Google Sheet\n      </button>\n      <button class=\"btn btn-ghost mt-step-btn\" id=\"mtStep3Btn\" onclick=\"mtGoStep(3)\" style=\"flex:1;border-radius:8px\" disabled>\n        <i class=\"fas fa-user-shield\"></i> 3. T\xE0i kho\u1EA3n Admin\n      </button>\n    </div>\n\n    <!-- STEP 1 -->\n    <div id=\"mtStepPanel1\">\n      <div style=\"background:rgba(26,35,64,0.04);border-radius:12px;padding:16px;margin-bottom:16px;font-size:0.82rem;line-height:1.7\">\n        <div style=\"font-weight:700;color:var(--navy);margin-bottom:6px\"><i class=\"fas fa-info-circle\" style=\"color:var(--gold)\"></i> H\u01B0\u1EDBng d\u1EABn t\u1EA1o Service Account</div>\n        <ol style=\"margin:0;padding-left:18px;color:var(--text-soft)\">\n          <li>V\xE0o <a href=\"https://console.cloud.google.com\" target=\"_blank\" style=\"color:var(--red);font-weight:600\">Google Cloud Console</a> \u2192 T\u1EA1o project m\u1EDBi</li>\n          <li>B\u1EADt API: <strong>Google Sheets API</strong> v\xE0 <strong>Google Drive API</strong></li>\n          <li>IAM & Admin \u2192 Service Accounts \u2192 T\u1EA1o service account</li>\n          <li>Th\xEAm key \u2192 JSON \u2192 T\u1EA3i file v\u1EC1</li>\n          <li>M\u1EDF file JSON \u2192 Sao ch\xE9p to\xE0n b\u1ED9 n\u1ED9i dung \u2192 D\xE1n v\xE0o \xF4 b\xEAn d\u01B0\u1EDBi</li>\n        </ol>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-label\">Service Account JSON Key <span class=\"required\">*</span></label>\n        <textarea class=\"form-control\" id=\"mtSAInput\" rows=\"6\"\n          placeholder='{\"type\":\"service_account\",\"project_id\":\"...\",\"private_key\":\"-----BEGIN PRIVATE KEY-----\\n...\\n-----END PRIVATE KEY-----\\n\",\"client_email\":\"...@....iam.gserviceaccount.com\",...}'\n          style=\"font-family:monospace;font-size:0.72rem\"></textarea>\n        <div id=\"mtSAStatus\" style=\"font-size:0.78rem;margin-top:6px;min-height:18px\"></div>\n      </div>\n      <div style=\"display:flex;gap:8px\">\n        <button class=\"btn btn-gold\" onclick=\"mtTestSA()\" style=\"flex:1\">\n          <i class=\"fas fa-vial\"></i> Ki\u1EC3m tra k\u1EBFt n\u1ED1i\n        </button>\n        <button class=\"btn btn-primary\" onclick=\"mtGoStep(2)\" style=\"flex:1\">\n          Ti\u1EBFp theo <i class=\"fas fa-arrow-right\"></i>\n        </button>\n      </div>\n    </div>\n\n    <!-- STEP 2 -->\n    <div id=\"mtStepPanel2\" style=\"display:none\">\n\n      <!-- H\u01B0\u1EDBng d\u1EABn 3 b\u01B0\u1EDBc -->\n      <div style=\"background:rgba(2,132,199,0.05);border-radius:12px;padding:14px;margin-bottom:14px;font-size:0.82rem;border:1px solid rgba(2,132,199,0.2)\">\n        <div style=\"font-weight:700;color:#0369a1;margin-bottom:8px\"><i class=\"fas fa-info-circle\"></i> H\u01B0\u1EDBng d\u1EABn thi\u1EBFt l\u1EADp Google Sheet</div>\n        <div style=\"display:flex;flex-direction:column;gap:6px;color:var(--text-soft)\">\n          <div><span style=\"display:inline-flex;width:20px;height:20px;border-radius:50%;background:#0284c7;color:#fff;font-size:0.65rem;font-weight:700;align-items:center;justify-content:center;margin-right:6px\">1</span>\n            V\xE0o <a href=\"https://sheets.google.com\" target=\"_blank\" style=\"color:#0284c7;font-weight:600\">sheets.google.com</a> \u2192 T\u1EA1o spreadsheet m\u1EDBi (tr\u1ED1ng)\n          </div>\n          <div><span style=\"display:inline-flex;width:20px;height:20px;border-radius:50%;background:#0284c7;color:#fff;font-size:0.65rem;font-weight:700;align-items:center;justify-content:center;margin-right:6px\">2</span>\n            Nh\u1EA5n <b>Chia s\u1EBB</b> \u2192 th\xEAm <b id=\"mtSAEmailHint\" style=\"color:#dc2626;font-family:monospace;font-size:0.8rem\">email-service-account</b> v\u1EDBi quy\u1EC1n <b>Ng\u01B0\u1EDDi ch\u1EC9nh s\u1EEDa</b>\n          </div>\n          <div><span style=\"display:inline-flex;width:20px;height:20px;border-radius:50%;background:#0284c7;color:#fff;font-size:0.65rem;font-weight:700;align-items:center;justify-content:center;margin-right:6px\">3</span>\n            Copy ID t\u1EEB URL v\xE0 d\xE1n v\xE0o \xF4 b\xEAn d\u01B0\u1EDBi: <br>\n            <span style=\"font-family:monospace;font-size:0.75rem;background:#f1f5f9;padding:2px 6px;border-radius:4px;margin-top:3px;display:inline-block\">\n              docs.google.com/spreadsheets/d/<b style=\"color:#dc2626\">ID_C\u1EA6N_COPY</b>/edit\n            </span>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"form-group\">\n        <label class=\"form-label\">\n          Spreadsheet ID <span style=\"color:#dc2626;font-size:0.8rem\">* b\u1EAFt bu\u1ED9c</span>\n        </label>\n        <input class=\"form-control\" id=\"mtSheetIdInput\" placeholder=\"D\xE1n Spreadsheet ID v\xE0o \u0111\xE2y...\"\n          style=\"font-family:monospace;font-size:0.82rem;border-color:#f59e0b\"\n          oninput=\"this.style.borderColor=this.value?'var(--green)':'#f59e0b'\">\n        <div class=\"form-hint\" style=\"color:#f59e0b\">\n          <i class=\"fas fa-exclamation-triangle\"></i>\n          B\u1EAFt bu\u1ED9c \u2014 h\u1EC7 th\u1ED1ng s\u1EBD t\u1EF1 t\u1EA1o c\xE1c sheet c\u1EA7n thi\u1EBFt trong spreadsheet n\xE0y.\n        </div>\n      </div>\n\n      <div id=\"mtStep2Status\" style=\"font-size:0.8rem;min-height:16px;margin-bottom:10px\"></div>\n\n      <div style=\"display:flex;gap:8px\">\n        <button class=\"btn btn-outline\" onclick=\"mtGoStep(1)\"><i class=\"fas fa-arrow-left\"></i> Quay l\u1EA1i</button>\n        <button class=\"btn btn-primary\" onclick=\"mtValidateStep2()\" style=\"flex:1\">\n          Ti\u1EBFp theo <i class=\"fas fa-arrow-right\"></i>\n        </button>\n      </div>\n    </div>\n\n    <!-- STEP 3 -->\n    <div id=\"mtStepPanel3\" style=\"display:none\">\n      <div style=\"background:rgba(192,57,43,0.04);border-radius:12px;padding:14px;margin-bottom:16px;font-size:0.82rem;border:1px solid rgba(192,57,43,0.15)\">\n        <div style=\"font-weight:700;color:var(--red);margin-bottom:4px\"><i class=\"fas fa-shield-alt\"></i> T\xE0i kho\u1EA3n Admin</div>\n        <div style=\"color:var(--text-soft)\">\u0110\xE2y l\xE0 t\xE0i kho\u1EA3n qu\u1EA3n tr\u1ECB h\u1EC7 th\u1ED1ng. Admin c\xF3 th\u1EC3 t\u1EA1o m\xE3 m\u1EDDi cho ng\u01B0\u1EDDi d\xF9ng kh\xE1c v\xE0 qu\u1EA3n l\xFD to\xE0n b\u1ED9 d\u1EEF li\u1EC7u.</div>\n      </div>\n      <div class=\"form-row\">\n        <div class=\"form-group\">\n          <label class=\"form-label\">T\xEAn \u0111\u0103ng nh\u1EADp <span class=\"required\">*</span></label>\n          <input class=\"form-control\" id=\"mtAdminUsername\" placeholder=\"VD: admin_truong_le_quy_don\" style=\"font-size:16px\">\n        </div>\n        <div class=\"form-group\">\n          <label class=\"form-label\">T\xEAn hi\u1EC3n th\u1ECB <span class=\"required\">*</span></label>\n          <input class=\"form-control\" id=\"mtAdminDisplayName\" placeholder=\"VD: B\xED th\u01B0 \u0110o\xE0n tr\u01B0\u1EDDng\" style=\"font-size:16px\">\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-label\">M\xE3 PIN (6 s\u1ED1) <span class=\"required\">*</span></label>\n        <div style=\"display:flex;gap:8px\">\n          <input type=\"password\" class=\"form-control\" id=\"mtAdminPIN\" placeholder=\"6 ch\u1EEF s\u1ED1\" maxlength=\"6\"\n            pattern=\"[0-9]{6}\" inputmode=\"numeric\" style=\"font-size:1.2rem;letter-spacing:8px;flex:1\">\n          <input type=\"password\" class=\"form-control\" id=\"mtAdminPIN2\" placeholder=\"X\xE1c nh\u1EADn PIN\" maxlength=\"6\"\n            pattern=\"[0-9]{6}\" inputmode=\"numeric\" style=\"font-size:1.2rem;letter-spacing:8px;flex:1\">\n        </div>\n        <div class=\"form-hint\" style=\"color:#dc2626\"><i class=\"fas fa-shield-alt\"></i> B\u1EAFt bu\u1ED9c nh\u1EADp PIN \u2014 kh\xF4ng c\xF3 PIN m\u1EB7c \u0111\u1ECBnh v\xEC l\xFD do b\u1EA3o m\u1EADt</div>\n      </div>\n      <div id=\"mtSetupStatus\" style=\"font-size:0.82rem;margin-bottom:12px;min-height:18px\"></div>\n      <div style=\"display:flex;gap:8px\">\n        <button class=\"btn btn-outline\" onclick=\"mtGoStep(2)\"><i class=\"fas fa-arrow-left\"></i> Quay l\u1EA1i</button>\n        <button class=\"btn btn-primary\" onclick=\"mtDoAdminSetup()\" style=\"flex:1\">\n          <i class=\"fas fa-check-circle\"></i> Ho\xE0n t\u1EA5t thi\u1EBFt l\u1EADp\n        </button>\n      </div>\n    </div>\n  </div>\n</div>";
  document.body.appendChild(modal);
  setTimeout(function () {
    return modal.classList.add('open');
  }, 10);
}
function mtGoStep(step) {
  [1, 2, 3].forEach(function (i) {
    document.getElementById("mtStepPanel".concat(i)).style.display = i === step ? 'block' : 'none';
    var btn = document.getElementById("mtStep".concat(i, "Btn"));
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
      var _document$getElementB;
      var saRaw = (_document$getElementB = document.getElementById('mtSAInput')) === null || _document$getElementB === void 0 ? void 0 : _document$getElementB.value.trim();
      if (saRaw) {
        var sa = JSON.parse(saRaw);
        var hint = document.getElementById('mtSAEmailHint');
        if (hint && sa.client_email) hint.textContent = sa.client_email;
      }
    } catch (_unused5) {}
  }
}

// Validate bước 2 trước khi sang bước 3
function mtValidateStep2() {
  var _document$getElementB2;
  var sheetId = (_document$getElementB2 = document.getElementById('mtSheetIdInput')) === null || _document$getElementB2 === void 0 ? void 0 : _document$getElementB2.value.trim();
  var status = document.getElementById('mtStep2Status');
  if (!sheetId) {
    var _document$getElementB3;
    if (status) status.innerHTML = '<span style="color:#dc2626"><i class="fas fa-exclamation-triangle"></i> Vui lòng nhập Spreadsheet ID trước khi tiếp tục.</span>';
    (_document$getElementB3 = document.getElementById('mtSheetIdInput')) === null || _document$getElementB3 === void 0 || _document$getElementB3.focus();
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
function mtTestSA() {
  return _mtTestSA.apply(this, arguments);
}
function _mtTestSA() {
  _mtTestSA = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee24() {
    var _document$getElementB4;
    var saInput, status, _t0;
    return _regenerator().w(function (_context24) {
      while (1) switch (_context24.p = _context24.n) {
        case 0:
          saInput = (_document$getElementB4 = document.getElementById('mtSAInput')) === null || _document$getElementB4 === void 0 ? void 0 : _document$getElementB4.value.trim();
          status = document.getElementById('mtSAStatus');
          if (status) {
            _context24.n = 1;
            break;
          }
          return _context24.a(2);
        case 1:
          if (saInput) {
            _context24.n = 2;
            break;
          }
          status.innerHTML = '<span style="color:orange">Vui lòng dán JSON key</span>';
          return _context24.a(2);
        case 2:
          status.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang kiểm tra...';
          _context24.p = 3;
          JSON.parse(saInput); // validate JSON
          _context24.n = 4;
          return MTToken.get(saInput, true);
        case 4:
          MTToken.invalidate();
          status.innerHTML = '<span style="color:#16a34a"><i class="fas fa-check-circle"></i> Kết nối thành công! Service Account hợp lệ.</span>';
          _context24.n = 6;
          break;
        case 5:
          _context24.p = 5;
          _t0 = _context24.v;
          status.innerHTML = "<span style=\"color:red\"><i class=\"fas fa-times-circle\"></i> L\u1ED7i: ".concat(_t0.message, "</span>");
        case 6:
          return _context24.a(2);
      }
    }, _callee24, null, [[3, 5]]);
  }));
  return _mtTestSA.apply(this, arguments);
}
function mtDoAdminSetup() {
  return _mtDoAdminSetup.apply(this, arguments);
} // ─────────────────────────────────────────────────────────────────────
//  K. UI — INVITE CODE MANAGER (Admin)
// ─────────────────────────────────────────────────────────────────────
function _mtDoAdminSetup() {
  _mtDoAdminSetup = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee25() {
    var _document$getElementB5, _document$getElementB6, _document$getElementB7, _document$getElementB8, _document$getElementB9, _document$getElementB0;
    var saJson, sheetId, username, dispName, pin, pin2, status, _document$getElementB1, _document$getElementB10, btn, onProgress, sid, hint, _t1;
    return _regenerator().w(function (_context25) {
      while (1) switch (_context25.p = _context25.n) {
        case 0:
          saJson = (_document$getElementB5 = document.getElementById('mtSAInput')) === null || _document$getElementB5 === void 0 ? void 0 : _document$getElementB5.value.trim();
          sheetId = (_document$getElementB6 = document.getElementById('mtSheetIdInput')) === null || _document$getElementB6 === void 0 ? void 0 : _document$getElementB6.value.trim();
          username = (_document$getElementB7 = document.getElementById('mtAdminUsername')) === null || _document$getElementB7 === void 0 ? void 0 : _document$getElementB7.value.trim();
          dispName = (_document$getElementB8 = document.getElementById('mtAdminDisplayName')) === null || _document$getElementB8 === void 0 ? void 0 : _document$getElementB8.value.trim();
          pin = (_document$getElementB9 = document.getElementById('mtAdminPIN')) === null || _document$getElementB9 === void 0 ? void 0 : _document$getElementB9.value.trim();
          pin2 = (_document$getElementB0 = document.getElementById('mtAdminPIN2')) === null || _document$getElementB0 === void 0 ? void 0 : _document$getElementB0.value.trim();
          status = document.getElementById('mtSetupStatus');
          if (saJson) {
            _context25.n = 1;
            break;
          }
          status.innerHTML = '<span style="color:red">Vui lòng cung cấp Service Account JSON</span>';
          return _context25.a(2);
        case 1:
          if (username) {
            _context25.n = 2;
            break;
          }
          status.innerHTML = '<span style="color:red">Vui lòng nhập tên đăng nhập</span>';
          return _context25.a(2);
        case 2:
          if (dispName) {
            _context25.n = 3;
            break;
          }
          status.innerHTML = '<span style="color:red">Vui lòng nhập tên hiển thị</span>';
          return _context25.a(2);
        case 3:
          if (!(!pin || pin.length < 6)) {
            _context25.n = 4;
            break;
          }
          status.innerHTML = '<span style="color:red"><i class="fas fa-shield-alt"></i> Bắt buộc nhập PIN tối thiểu 6 số để bảo mật tài khoản Admin</span>';
          return _context25.a(2);
        case 4:
          if (/^\d{6,8}$/.test(pin)) {
            _context25.n = 5;
            break;
          }
          status.innerHTML = '<span style="color:red">PIN phải là 6-8 chữ số</span>';
          return _context25.a(2);
        case 5:
          if (!(pin !== pin2)) {
            _context25.n = 6;
            break;
          }
          status.innerHTML = '<span style="color:red">Mã PIN xác nhận không khớp</span>';
          return _context25.a(2);
        case 6:
          if (sheetId) {
            _context25.n = 7;
            break;
          }
          status.innerHTML = '<span style="color:#dc2626"><i class="fas fa-exclamation-triangle"></i> ' + 'Vui lòng quay lại Bước 2 và nhập Spreadsheet ID. ' + 'Tạo Google Sheet → Share cho Service Account → Dán ID vào ô.</span>';
          (_document$getElementB1 = document.getElementById('mtStep2Btn')) === null || _document$getElementB1 === void 0 || (_document$getElementB10 = _document$getElementB1.click) === null || _document$getElementB10 === void 0 || _document$getElementB10.call(_document$getElementB1);
          mtGoStep(2);
          return _context25.a(2);
        case 7:
          btn = document.querySelector('#mtStepPanel3 .btn-primary');
          if (btn) {
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang xử lý...';
          }
          onProgress = function onProgress(msg, pct) {
            status.innerHTML = "\n      <div style=\"margin-bottom:6px;color:var(--navy);font-size:0.8rem\">\n        <i class=\"fas fa-spinner fa-spin\" style=\"color:var(--red)\"></i> ".concat(msg, "\n      </div>\n      <div style=\"background:#e5e7eb;border-radius:999px;height:6px;overflow:hidden\">\n        <div style=\"height:100%;border-radius:999px;background:linear-gradient(90deg,var(--red),#f59e0b);width:").concat(pct, "%;transition:width 0.4s ease\"></div>\n      </div>");
          };
          _context25.p = 8;
          _context25.n = 9;
          return MTAdmin.initSpreadsheet(saJson, sheetId, {
            username: username,
            displayName: dispName,
            pin: pin
          }, onProgress);
        case 9:
          sid = _context25.v;
          status.innerHTML = "\n      <div style=\"color:#16a34a;font-weight:600;margin-bottom:6px\">\n        <i class=\"fas fa-check-circle\"></i> Thi\u1EBFt l\u1EADp th\xE0nh c\xF4ng!\n      </div>\n      <div style=\"font-size:0.76rem;color:var(--gray)\">\n        Sheet ID: <code style=\"background:#f3f4f6;padding:1px 5px;border-radius:4px\">".concat(sid, "</code>\n        &nbsp;<a href=\"https://docs.google.com/spreadsheets/d/").concat(sid, "\" target=\"_blank\" style=\"color:#0284c7\">\n          <i class=\"fas fa-external-link-alt\"></i> M\u1EDF\n        </a>\n      </div>");
          _mtStartSession(MTConfig.get());
          if (typeof toast === 'function') toast('🎉 Hệ thống trung tâm đã sẵn sàng! Bạn đang đăng nhập với quyền Admin.', 'success');
          setTimeout(function () {
            var _document$getElementB11;
            (_document$getElementB11 = document.getElementById('mtAdminSetupModal')) === null || _document$getElementB11 === void 0 || _document$getElementB11.remove();
            mtUpdateUIAfterLogin();
            if (typeof dvInitSync === 'function') dvInitSync();
          }, 1800);
          _context25.n = 11;
          break;
        case 10:
          _context25.p = 10;
          _t1 = _context25.v;
          if (btn) {
            btn.disabled = false;
            btn.innerHTML = '<i class="fas fa-check-circle"></i> Hoàn tất thiết lập';
          }
          // Gợi ý hành động dựa theo loại lỗi
          hint = '';
          if (_t1.message.includes('403') || _t1.message.includes('Forbidden')) {
            hint = ' → Kiểm tra lại email Service Account đã được <b>share quyền Chỉnh sửa</b> vào spreadsheet chưa.';
          } else if (_t1.message.includes('404') || _t1.message.includes('spreadsheet')) {
            hint = ' → Spreadsheet ID không tồn tại hoặc chưa được share. Kiểm tra lại Bước 2.';
          } else if (_t1.message.includes('400')) {
            hint = ' → Sheet không hợp lệ. Thử tạo Google Sheet mới và share lại.';
          }
          status.innerHTML = "<span style=\"color:#dc2626\"><i class=\"fas fa-times-circle\"></i> <b>L\u1ED7i:</b> ".concat(_t1.message).concat(hint, "</span>");
        case 11:
          return _context25.a(2);
      }
    }, _callee25, null, [[8, 10]]);
  }));
  return _mtDoAdminSetup.apply(this, arguments);
}
function mtShowInviteManager() {
  if (!MTConfig.isAdmin()) {
    if (typeof toast === 'function') toast('Chỉ Admin mới có quyền tạo mã mời', 'warning');
    return;
  }
  var existing = document.getElementById('mtInviteModal');
  if (existing) {
    existing.classList.add('open');
    mtEnsureSheetsAndLoad();
    return;
  }
  var modal = document.createElement('div');
  modal.id = 'mtInviteModal';
  modal.className = 'modal-overlay';
  modal.innerHTML = "\n<div class=\"modal\" style=\"max-width:700px\">\n  <div class=\"modal-header\">\n    <h2><i class=\"fas fa-user-plus\" style=\"color:var(--red);margin-right:8px\"></i> Qu\u1EA3n l\xFD ng\u01B0\u1EDDi d\xF9ng & M\xE3 m\u1EDDi</h2>\n    <button class=\"btn btn-ghost\" onclick=\"document.getElementById('mtInviteModal').classList.remove('open')\"><i class=\"fas fa-times\"></i></button>\n  </div>\n  <div class=\"modal-body\" style=\"padding:24px\">\n\n    <!-- Banner kh\u1EDFi t\u1EA1o h\u1EC7 th\u1ED1ng (\u1EA9n sau khi init xong) -->\n    <div id=\"mtInitBanner\" style=\"display:none;background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.3);border-radius:10px;padding:12px 14px;margin-bottom:14px;font-size:0.82rem\">\n      <div style=\"display:flex;align-items:center;gap:10px\">\n        <i class=\"fas fa-tools\" style=\"color:#d97706;font-size:1.1rem\"></i>\n        <div style=\"flex:1\">\n          <div style=\"font-weight:700;color:#92400e;margin-bottom:2px\">Ch\u01B0a kh\u1EDFi t\u1EA1o sheet h\u1EC7 th\u1ED1ng</div>\n          <div style=\"color:#78350f\">Sheet <code>system_users</code> v\xE0 <code>organizations</code> ch\u01B0a t\u1ED3n t\u1EA1i trong Google Sheet. Nh\u1EA5n n\xFAt b\xEAn ph\u1EA3i \u0111\u1EC3 t\u1EA1o t\u1EF1 \u0111\u1ED9ng.</div>\n        </div>\n        <button class=\"btn btn-sm\" style=\"background:#d97706;color:#fff;white-space:nowrap;flex-shrink:0\" onclick=\"mtInitSystemSheets(this)\">\n          <i class=\"fas fa-magic\"></i> Kh\u1EDFi t\u1EA1o ngay\n        </button>\n      </div>\n    </div>\n\n    <!-- Tabs -->\n    <div class=\"tabs\" style=\"margin-bottom:16px\">\n      <button class=\"tab-btn active\" onclick=\"mtInviteTab(this,'users')\">\uD83D\uDC65 Ng\u01B0\u1EDDi d\xF9ng</button>\n      <button class=\"tab-btn\" onclick=\"mtInviteTab(this,'orgs')\">\uD83C\uDFE2 C\u01A1 s\u1EDF \u0110o\xE0n</button>\n      <button class=\"tab-btn\" onclick=\"mtInviteTab(this,'create')\">\u2795 T\u1EA1o m\xE3 m\u1EDDi</button>\n    </div>\n\n    <!-- TAB: USERS -->\n    <div id=\"mtInviteTabUsers\" class=\"tab-content active\">\n      <div id=\"mtUserList\" style=\"font-size:0.82rem\">\n        <div style=\"text-align:center;padding:20px;color:var(--gray)\"><i class=\"fas fa-spinner fa-spin\"></i> \u0110ang t\u1EA3i...</div>\n      </div>\n    </div>\n\n    <!-- TAB: ORGS -->\n    <div id=\"mtInviteTabOrgs\" class=\"tab-content\">\n      <div style=\"margin-bottom:12px;display:flex;gap:8px\">\n        <input class=\"form-control\" id=\"mtNewOrgName\" placeholder=\"T\xEAn c\u01A1 s\u1EDF \u0110o\xE0n (VD: \u0110o\xE0n tr\u01B0\u1EDDng THPT A)\" style=\"flex:1\">\n        <button class=\"btn btn-primary\" onclick=\"mtAddOrg()\"><i class=\"fas fa-plus\"></i> Th\xEAm</button>\n      </div>\n      <div id=\"mtOrgList\" style=\"font-size:0.82rem\">\n        <div style=\"text-align:center;padding:20px;color:var(--gray)\"><i class=\"fas fa-spinner fa-spin\"></i> \u0110ang t\u1EA3i...</div>\n      </div>\n    </div>\n\n    <!-- TAB: CREATE INVITE -->\n    <div id=\"mtInviteTabCreate\" class=\"tab-content\">\n      <div class=\"form-row\">\n        <div class=\"form-group\">\n          <label class=\"form-label\">T\xEAn \u0111\u0103ng nh\u1EADp</label>\n          <input class=\"form-control\" id=\"mtInviteUsername\" placeholder=\"VD: bithubidoanchinh\" style=\"font-size:16px\">\n        </div>\n        <div class=\"form-group\">\n          <label class=\"form-label\">Vai tr\xF2</label>\n          <select class=\"form-control\" id=\"mtInviteRole\" style=\"font-size:16px\">\n            <option value=\"manager\">Qu\u1EA3n l\xFD</option>\n            <option value=\"member\">\u0110o\xE0n vi\xEAn</option>\n            <option value=\"admin\">Admin</option>\n          </select>\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-label\">C\u01A1 s\u1EDF \u0110o\xE0n</label>\n        <select class=\"form-control\" id=\"mtInviteOrg\" style=\"font-size:16px\">\n          <option value=\"\">\u0110ang t\u1EA3i...</option>\n        </select>\n      </div>\n      <button class=\"btn btn-primary\" onclick=\"mtCreateInvite()\" style=\"width:100%;margin-bottom:16px\">\n        <i class=\"fas fa-qrcode\"></i> T\u1EA1o M\xE3 M\u1EDDi\n      </button>\n\n      <!-- Result -->\n      <div id=\"mtInviteResult\" style=\"display:none\">\n        <div style=\"background:var(--cream);border-radius:12px;padding:20px;text-align:center;border:2px dashed var(--gray-light)\">\n          <div style=\"font-size:0.72rem;color:var(--gray);margin-bottom:8px;text-transform:uppercase;letter-spacing:1px\">M\xE3 m\u1EDDi (chia s\u1EBB cho ng\u01B0\u1EDDi d\xF9ng)</div>\n          <div id=\"mtInviteCodeDisplay\" style=\"font-family:monospace;font-size:1.8rem;font-weight:900;letter-spacing:6px;color:var(--navy);cursor:pointer;user-select:all\" onclick=\"mtCopyInviteCode(this)\">\n            ----\n          </div>\n          <div style=\"font-size:0.72rem;color:var(--gray);margin-top:6px\">Nh\u1EA5n \u0111\u1EC3 sao ch\xE9p \xB7 H\u1EBFt h\u1EA1n sau 7 ng\xE0y</div>\n          <div style=\"margin-top:12px;display:flex;gap:8px;justify-content:center\">\n            <button class=\"btn btn-outline btn-sm\" onclick=\"mtCopyInviteCode(document.getElementById('mtInviteCodeDisplay'))\">\n              <i class=\"fas fa-copy\"></i> Sao ch\xE9p\n            </button>\n            <button class=\"btn btn-outline btn-sm\" onclick=\"mtShareInviteCode()\">\n              <i class=\"fas fa-share-alt\"></i> Chia s\u1EBB\n            </button>\n          </div>\n        </div>\n        <div id=\"mtInviteCodePayload\" style=\"display:none\"></div>\n      </div>\n    </div>\n\n  </div>\n</div>";
  document.body.appendChild(modal);
  modal.addEventListener('click', function (e) {
    if (e.target === modal) modal.classList.remove('open');
  });
  setTimeout(function () {
    modal.classList.add('open');
    mtEnsureSheetsAndLoad();
  }, 10);
}
function mtInviteTab(btn, tab) {
  document.querySelectorAll('#mtInviteModal .tab-btn').forEach(function (b) {
    return b.classList.remove('active');
  });
  document.querySelectorAll('#mtInviteModal .tab-content').forEach(function (c) {
    return c.classList.remove('active');
  });
  btn.classList.add('active');
  var panel = document.getElementById("mtInviteTab".concat(tab.charAt(0).toUpperCase() + tab.slice(1)));
  if (panel) panel.classList.add('active');
  if (tab === 'users') mtEnsureSheetsAndLoad();
  if (tab === 'orgs') mtEnsureAndLoadOrgs();
}

// Khởi tạo sheet hệ thống từ nút trong banner
function mtInitSystemSheets(_x2) {
  return _mtInitSystemSheets.apply(this, arguments);
} // Đảm bảo sheet tồn tại rồi mới load data — tránh lỗi 400
function _mtInitSystemSheets() {
  _mtInitSystemSheets = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee26(btn) {
    var cfg, _document$getElementB12, _t10;
    return _regenerator().w(function (_context26) {
      while (1) switch (_context26.p = _context26.n) {
        case 0:
          cfg = MTConfig.get();
          if (!(!(cfg !== null && cfg !== void 0 && cfg.spreadsheetId) || !(cfg !== null && cfg !== void 0 && cfg.serviceAccountJson))) {
            _context26.n = 1;
            break;
          }
          return _context26.a(2);
        case 1:
          if (btn) {
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang tạo...';
          }
          _context26.p = 2;
          _context26.n = 3;
          return MTAdmin._ensureSheets(cfg.serviceAccountJson, cfg.spreadsheetId);
        case 3:
          _context26.n = 4;
          return MTAdmin._initHeaders(cfg.spreadsheetId);
        case 4:
          ((_document$getElementB12 = document.getElementById('mtInitBanner')) === null || _document$getElementB12 === void 0 ? void 0 : _document$getElementB12.style) && (document.getElementById('mtInitBanner').style.display = 'none');
          if (typeof toast === 'function') toast('<i class="fas fa-check-circle" style="color:#16a34a"></i> Đã khởi tạo sheet hệ thống!', 'success');
          mtLoadUsers();
          mtLoadOrgsForSelect();
          _context26.n = 6;
          break;
        case 5:
          _context26.p = 5;
          _t10 = _context26.v;
          if (btn) {
            btn.disabled = false;
            btn.innerHTML = '<i class="fas fa-magic"></i> Khởi tạo ngay';
          }
          if (typeof toast === 'function') toast('Lỗi khởi tạo: ' + _t10.message, 'error');
        case 6:
          return _context26.a(2);
      }
    }, _callee26, null, [[2, 5]]);
  }));
  return _mtInitSystemSheets.apply(this, arguments);
}
function mtEnsureSheetsAndLoad() {
  return _mtEnsureSheetsAndLoad.apply(this, arguments);
} // Đảm bảo sheet tồn tại rồi mới load tab Cơ sở Đoàn
function _mtEnsureSheetsAndLoad() {
  _mtEnsureSheetsAndLoad = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee27() {
    var cfg, userList, token, metaResp, needsInit, metaData, existing, allRequired, missing, _document$getElementB13, banner, _t11;
    return _regenerator().w(function (_context27) {
      while (1) switch (_context27.p = _context27.n) {
        case 0:
          cfg = MTConfig.get();
          if (!(!(cfg !== null && cfg !== void 0 && cfg.spreadsheetId) || !(cfg !== null && cfg !== void 0 && cfg.serviceAccountJson))) {
            _context27.n = 1;
            break;
          }
          mtLoadUsers();
          mtLoadOrgsForSelect();
          return _context27.a(2);
        case 1:
          userList = document.getElementById('mtUserList');
          if (userList) userList.innerHTML = '<div style="text-align:center;padding:20px;color:var(--gray)"><i class="fas fa-spinner fa-spin"></i> Đang kiểm tra cấu trúc hệ thống...</div>';
          _context27.p = 2;
          _context27.n = 3;
          return MTToken.get(cfg.serviceAccountJson);
        case 3:
          token = _context27.v;
          _context27.n = 4;
          return fetch("".concat(SHEETS_API, "/").concat(cfg.spreadsheetId, "?fields=sheets.properties.title"), {
            headers: {
              Authorization: "Bearer ".concat(token)
            }
          });
        case 4:
          metaResp = _context27.v;
          needsInit = false;
          if (!metaResp.ok) {
            _context27.n = 8;
            break;
          }
          _context27.n = 5;
          return metaResp.json();
        case 5:
          metaData = _context27.v;
          existing = (metaData.sheets || []).map(function (s) {
            return s.properties.title;
          });
          allRequired = Object.values(SH);
          missing = allRequired.filter(function (n) {
            return !existing.includes(n);
          });
          if (!(missing.length > 0)) {
            _context27.n = 8;
            break;
          }
          // Hiện banner cảnh báo
          banner = document.getElementById('mtInitBanner');
          if (banner) banner.style.display = 'block';
          needsInit = true;
          // Auto-init
          if (userList) userList.innerHTML = '<div style="text-align:center;padding:20px;color:#d97706"><i class="fas fa-tools"></i> Đang tạo sheet còn thiếu: ' + missing.join(', ') + '...</div>';
          _context27.n = 6;
          return MTAdmin._ensureSheets(cfg.serviceAccountJson, cfg.spreadsheetId);
        case 6:
          _context27.n = 7;
          return MTAdmin._initHeaders(cfg.spreadsheetId);
        case 7:
          ((_document$getElementB13 = document.getElementById('mtInitBanner')) === null || _document$getElementB13 === void 0 ? void 0 : _document$getElementB13.style) && (document.getElementById('mtInitBanner').style.display = 'none');
        case 8:
          _context27.n = 10;
          break;
        case 9:
          _context27.p = 9;
          _t11 = _context27.v;
          console.warn('mtEnsureSheetsAndLoad init:', _t11.message);
        case 10:
          mtLoadUsers();
          mtLoadOrgsForSelect();
        case 11:
          return _context27.a(2);
      }
    }, _callee27, null, [[2, 9]]);
  }));
  return _mtEnsureSheetsAndLoad.apply(this, arguments);
}
function mtEnsureAndLoadOrgs() {
  return _mtEnsureAndLoadOrgs.apply(this, arguments);
}
function _mtEnsureAndLoadOrgs() {
  _mtEnsureAndLoadOrgs = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee28() {
    var cfg, el, metaRows, _t12;
    return _regenerator().w(function (_context28) {
      while (1) switch (_context28.p = _context28.n) {
        case 0:
          cfg = MTConfig.get();
          el = document.getElementById('mtOrgList');
          if (!(!(cfg !== null && cfg !== void 0 && cfg.spreadsheetId) || !(cfg !== null && cfg !== void 0 && cfg.serviceAccountJson))) {
            _context28.n = 1;
            break;
          }
          mtLoadOrgs();
          return _context28.a(2);
        case 1:
          if (el) el.innerHTML = '<div style="text-align:center;padding:16px;color:var(--gray)"><i class="fas fa-spinner fa-spin"></i> Đang kiểm tra...</div>';
          _context28.p = 2;
          _context28.n = 3;
          return MTAdmin._ensureSheets(cfg.serviceAccountJson, cfg.spreadsheetId);
        case 3:
          _context28.n = 4;
          return SheetsAPI.read(cfg.spreadsheetId, "".concat(SH.META, "!A:B"));
        case 4:
          metaRows = _context28.v;
          if (!(!metaRows || metaRows.length < 2)) {
            _context28.n = 5;
            break;
          }
          _context28.n = 5;
          return MTAdmin._initHeaders(cfg.spreadsheetId);
        case 5:
          _context28.n = 7;
          break;
        case 6:
          _context28.p = 6;
          _t12 = _context28.v;
          console.warn('mtEnsureAndLoadOrgs:', _t12.message);
        case 7:
          mtLoadOrgs();
          mtLoadOrgsForSelect();
        case 8:
          return _context28.a(2);
      }
    }, _callee28, null, [[2, 6]]);
  }));
  return _mtEnsureAndLoadOrgs.apply(this, arguments);
}
function mtLoadUsers() {
  return _mtLoadUsers.apply(this, arguments);
}
function _mtLoadUsers() {
  _mtLoadUsers = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee29() {
    var el, users, _t13;
    return _regenerator().w(function (_context29) {
      while (1) switch (_context29.p = _context29.n) {
        case 0:
          el = document.getElementById('mtUserList');
          if (el) {
            _context29.n = 1;
            break;
          }
          return _context29.a(2);
        case 1:
          el.innerHTML = '<div style="text-align:center;padding:20px;color:var(--gray)"><i class="fas fa-spinner fa-spin"></i> Đang tải...</div>';
          _context29.p = 2;
          _context29.n = 3;
          return MTUserMgr.listUsers();
        case 3:
          users = _context29.v;
          if (users.length) {
            _context29.n = 4;
            break;
          }
          el.innerHTML = "\n        <div style=\"text-align:center;padding:24px;color:var(--gray)\">\n          <i class=\"fas fa-users\" style=\"font-size:2rem;opacity:0.3;display:block;margin-bottom:8px\"></i>\n          <div style=\"font-weight:600;margin-bottom:4px\">Ch\u01B0a c\xF3 ng\u01B0\u1EDDi d\xF9ng n\xE0o</div>\n          <div style=\"font-size:0.78rem;margin-bottom:12px\">Sheet <code>system_users</code> tr\u1ED1ng ho\u1EB7c ch\u01B0a \u0111\u01B0\u1EE3c kh\u1EDFi t\u1EA1o.</div>\n          <button class=\"btn btn-outline btn-sm\" onclick=\"mtEnsureSheetsAndLoad()\">\n            <i class=\"fas fa-sync-alt\"></i> Kh\u1EDFi t\u1EA1o l\u1EA1i &amp; T\u1EA3i\n          </button>\n        </div>";
          return _context29.a(2);
        case 4:
          el.innerHTML = "\n<table class=\"doc-table\" style=\"width:100%\">\n  <thead><tr>\n    <th>Ng\u01B0\u1EDDi d\xF9ng</th><th>Vai tr\xF2</th><th>C\u01A1 s\u1EDF \u0110o\xE0n</th><th>Tr\u1EA1ng th\xE1i</th><th>L\u1EA7n cu\u1ED1i</th><th></th>\n  </tr></thead>\n  <tbody>\n    ".concat(users.map(function (u, i) {
            var _MT_ROLES$u$role, _MT_ROLES$u$role2, _MT_ROLES$u$role3;
            return "\n    <tr>\n      <td><div style=\"font-weight:700\">".concat(u.displayName || u.username, "</div><div style=\"font-size:0.72rem;color:var(--gray)\">@").concat(u.username, "</div></td>\n      <td><span style=\"display:inline-flex;align-items:center;gap:5px;padding:3px 10px;border-radius:20px;background:rgba(26,35,64,0.08);font-size:0.72rem;font-weight:700;color:").concat(((_MT_ROLES$u$role = MT_ROLES[u.role]) === null || _MT_ROLES$u$role === void 0 ? void 0 : _MT_ROLES$u$role.color) || 'var(--gray)', "\">\n        <i class=\"fas ").concat(((_MT_ROLES$u$role2 = MT_ROLES[u.role]) === null || _MT_ROLES$u$role2 === void 0 ? void 0 : _MT_ROLES$u$role2.icon) || 'fa-user', "\"></i> ").concat(((_MT_ROLES$u$role3 = MT_ROLES[u.role]) === null || _MT_ROLES$u$role3 === void 0 ? void 0 : _MT_ROLES$u$role3.label) || u.role, "\n      </span></td>\n      <td style=\"font-size:0.8rem\">").concat(u.orgName || u.orgId || '—', "</td>\n      <td><span style=\"font-size:0.72rem;color:").concat(u.status === 'active' ? '#16a34a' : u.status === 'pending' ? '#d97706' : '#9ca3af', "\">").concat(u.status === 'active' ? 'Hoạt động' : u.status === 'pending' ? 'Chờ kích hoạt' : 'Vô hiệu', "</span></td>\n      <td style=\"font-size:0.72rem;color:var(--gray)\">").concat(u.lastLogin ? new Date(u.lastLogin).toLocaleDateString('vi-VN') : '—', "</td>\n      <td>\n        <button class=\"btn btn-ghost btn-sm\" onclick=\"mtChangeRole('@").concat(u.username, "','admin')\" title=\"\u0110\u1ED5i role\"><i class=\"fas fa-user-edit\"></i></button>\n        <button class=\"btn btn-ghost btn-sm\" style=\"color:var(--red)\" onclick=\"mtRemoveUser('").concat(u.username, "')\" title=\"Xo\xE1\"><i class=\"fas fa-user-times\"></i></button>\n      </td>\n    </tr>");
          }).join(''), "\n  </tbody>\n</table>");
          _context29.n = 6;
          break;
        case 5:
          _context29.p = 5;
          _t13 = _context29.v;
          el.innerHTML = "\n      <div style=\"color:#dc2626;padding:16px;background:rgba(220,38,38,0.05);border-radius:8px;border:1px solid rgba(220,38,38,0.15)\">\n        <div style=\"font-weight:700;margin-bottom:4px\"><i class=\"fas fa-exclamation-triangle\"></i> L\u1ED7i t\u1EA3i d\u1EEF li\u1EC7u</div>\n        <div style=\"font-size:0.8rem;margin-bottom:10px\">".concat(_t13.message, "</div>\n        <button class=\"btn btn-outline btn-sm\" onclick=\"mtEnsureSheetsAndLoad()\">\n          <i class=\"fas fa-sync-alt\"></i> Th\u1EED l\u1EA1i\n        </button>\n      </div>");
        case 6:
          return _context29.a(2);
      }
    }, _callee29, null, [[2, 5]]);
  }));
  return _mtLoadUsers.apply(this, arguments);
}
function mtLoadOrgs() {
  return _mtLoadOrgs.apply(this, arguments);
}
function _mtLoadOrgs() {
  _mtLoadOrgs = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee30() {
    var el, orgs, _t14;
    return _regenerator().w(function (_context30) {
      while (1) switch (_context30.p = _context30.n) {
        case 0:
          el = document.getElementById('mtOrgList');
          if (el) {
            _context30.n = 1;
            break;
          }
          return _context30.a(2);
        case 1:
          el.innerHTML = '<div style="text-align:center;padding:20px;color:var(--gray)"><i class="fas fa-spinner fa-spin"></i></div>';
          _context30.p = 2;
          _context30.n = 3;
          return MTUserMgr.listOrgs();
        case 3:
          orgs = _context30.v;
          if (orgs.length) {
            _context30.n = 4;
            break;
          }
          el.innerHTML = '<div style="color:var(--gray);text-align:center;padding:16px">Chưa có cơ sở Đoàn. Thêm mới bên trên.</div>';
          return _context30.a(2);
        case 4:
          el.innerHTML = orgs.map(function (o) {
            return "\n<div style=\"display:flex;align-items:center;gap:12px;padding:10px;border-radius:8px;border:1px solid var(--gray-light);margin-bottom:8px\">\n  <div style=\"width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,var(--red),var(--gold));display:flex;align-items:center;justify-content:center;color:#fff;font-size:1rem;flex-shrink:0\">\n    <i class=\"fas fa-school\"></i>\n  </div>\n  <div style=\"flex:1\">\n    <div style=\"font-weight:700;color:var(--navy)\">".concat(o.name, "</div>\n    <div style=\"font-size:0.72rem;color:var(--gray)\">ID: ").concat(o.id, " ").concat(o.secretary ? '· Bí thư: ' + o.secretary : '', "</div>\n  </div>\n  <code style=\"font-size:0.7rem;color:var(--gray);background:var(--cream);padding:3px 8px;border-radius:6px\">").concat(o.id, "</code>\n</div>");
          }).join('');
          _context30.n = 6;
          break;
        case 5:
          _context30.p = 5;
          _t14 = _context30.v;
          el.innerHTML = "\n      <div style=\"color:#dc2626;padding:14px;background:rgba(220,38,38,0.05);border-radius:8px;border:1px solid rgba(220,38,38,0.15)\">\n        <div style=\"font-weight:700;margin-bottom:4px\"><i class=\"fas fa-exclamation-triangle\"></i> L\u1ED7i t\u1EA3i d\u1EEF li\u1EC7u</div>\n        <div style=\"font-size:0.8rem;margin-bottom:10px\">".concat(_t14.message, "</div>\n        <button class=\"btn btn-outline btn-sm\" onclick=\"mtEnsureAndLoadOrgs()\">\n          <i class=\"fas fa-sync-alt\"></i> Th\u1EED l\u1EA1i\n        </button>\n      </div>");
        case 6:
          return _context30.a(2);
      }
    }, _callee30, null, [[2, 5]]);
  }));
  return _mtLoadOrgs.apply(this, arguments);
}
function mtLoadOrgsForSelect() {
  return _mtLoadOrgsForSelect.apply(this, arguments);
}
function _mtLoadOrgsForSelect() {
  _mtLoadOrgsForSelect = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee31() {
    var sel, orgs, _t15;
    return _regenerator().w(function (_context31) {
      while (1) switch (_context31.p = _context31.n) {
        case 0:
          sel = document.getElementById('mtInviteOrg');
          if (sel) {
            _context31.n = 1;
            break;
          }
          return _context31.a(2);
        case 1:
          _context31.p = 1;
          _context31.n = 2;
          return MTUserMgr.listOrgs();
        case 2:
          orgs = _context31.v;
          sel.innerHTML = "<option value=\"all\">To\xE0n h\u1EC7 th\u1ED1ng (Admin)</option>" + orgs.map(function (o) {
            return "<option value=\"".concat(o.id, "\">").concat(o.name, "</option>");
          }).join('');
          _context31.n = 4;
          break;
        case 3:
          _context31.p = 3;
          _t15 = _context31.v;
          sel.innerHTML = '<option value="">Lỗi tải cơ sở đoàn</option>';
        case 4:
          return _context31.a(2);
      }
    }, _callee31, null, [[1, 3]]);
  }));
  return _mtLoadOrgsForSelect.apply(this, arguments);
}
function mtAddOrg() {
  return _mtAddOrg.apply(this, arguments);
}
function _mtAddOrg() {
  _mtAddOrg = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee32() {
    var _document$getElementB14;
    var name, _t16;
    return _regenerator().w(function (_context32) {
      while (1) switch (_context32.p = _context32.n) {
        case 0:
          name = (_document$getElementB14 = document.getElementById('mtNewOrgName')) === null || _document$getElementB14 === void 0 ? void 0 : _document$getElementB14.value.trim();
          if (name) {
            _context32.n = 1;
            break;
          }
          if (typeof toast === 'function') toast('Vui lòng nhập tên cơ sở Đoàn', 'warning');
          return _context32.a(2);
        case 1:
          _context32.p = 1;
          _context32.n = 2;
          return MTUserMgr.addOrg({
            name: name
          });
        case 2:
          document.getElementById('mtNewOrgName').value = '';
          if (typeof toast === 'function') toast('Đã thêm cơ sở Đoàn: ' + name, 'success');
          mtLoadOrgs();
          mtLoadOrgsForSelect();
          _context32.n = 4;
          break;
        case 3:
          _context32.p = 3;
          _t16 = _context32.v;
          if (typeof toast === 'function') toast('Lỗi: ' + _t16.message, 'error');
        case 4:
          return _context32.a(2);
      }
    }, _callee32, null, [[1, 3]]);
  }));
  return _mtAddOrg.apply(this, arguments);
}
function mtCreateInvite() {
  return _mtCreateInvite.apply(this, arguments);
}
function _mtCreateInvite() {
  _mtCreateInvite = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee33() {
    var _document$getElementB15, _document$getElementB16, _orgSel$options$orgSe;
    var username, role, orgSel, orgId, orgName, _code$match, _yield$MTAdmin$genera, code, resEl, codeEl, _t17;
    return _regenerator().w(function (_context33) {
      while (1) switch (_context33.p = _context33.n) {
        case 0:
          username = (_document$getElementB15 = document.getElementById('mtInviteUsername')) === null || _document$getElementB15 === void 0 ? void 0 : _document$getElementB15.value.trim();
          role = ((_document$getElementB16 = document.getElementById('mtInviteRole')) === null || _document$getElementB16 === void 0 ? void 0 : _document$getElementB16.value) || 'member';
          orgSel = document.getElementById('mtInviteOrg');
          orgId = (orgSel === null || orgSel === void 0 ? void 0 : orgSel.value) || 'all';
          orgName = (orgSel === null || orgSel === void 0 || (_orgSel$options$orgSe = orgSel.options[orgSel.selectedIndex]) === null || _orgSel$options$orgSe === void 0 ? void 0 : _orgSel$options$orgSe.text) || '';
          if (username) {
            _context33.n = 1;
            break;
          }
          if (typeof toast === 'function') toast('Vui lòng nhập tên đăng nhập', 'warning');
          return _context33.a(2);
        case 1:
          _context33.p = 1;
          _context33.n = 2;
          return MTAdmin.generateInviteCode(username, role, orgId, orgName);
        case 2:
          _yield$MTAdmin$genera = _context33.v;
          code = _yield$MTAdmin$genera.code;
          resEl = document.getElementById('mtInviteResult');
          codeEl = document.getElementById('mtInviteCodeDisplay');
          if (resEl) resEl.style.display = 'block';
          if (codeEl) codeEl.textContent = ((_code$match = code.match(/.{1,4}/g)) === null || _code$match === void 0 ? void 0 : _code$match.join(' ')) || code;
          if (typeof toast === 'function') toast('✅ Đã tạo mã mời thành công!', 'success');
          _context33.n = 4;
          break;
        case 3:
          _context33.p = 3;
          _t17 = _context33.v;
          if (typeof toast === 'function') toast('Lỗi: ' + _t17.message, 'error');
        case 4:
          return _context33.a(2);
      }
    }, _callee33, null, [[1, 3]]);
  }));
  return _mtCreateInvite.apply(this, arguments);
}
function mtCopyInviteCode(el) {
  var _el$textContent, _navigator$clipboard;
  var code = el === null || el === void 0 || (_el$textContent = el.textContent) === null || _el$textContent === void 0 ? void 0 : _el$textContent.replace(/\s/g, '');
  if (!code) return;
  (_navigator$clipboard = navigator.clipboard) === null || _navigator$clipboard === void 0 || _navigator$clipboard.writeText(code);
  if (typeof toast === 'function') toast('Đã sao chép mã mời!', 'success');
}
function mtShareInviteCode() {
  var _codeEl$textContent;
  var codeEl = document.getElementById('mtInviteCodeDisplay');
  var code = (codeEl === null || codeEl === void 0 || (_codeEl$textContent = codeEl.textContent) === null || _codeEl$textContent === void 0 ? void 0 : _codeEl$textContent.replace(/\s/g, '')) || '';
  var text = "M\xE3 m\u1EDDi \u0110o\xE0nV\u0103n: ".concat(code, "\nD\xF9ng \u0111\u1EC3 \u0111\u0103ng nh\u1EADp h\u1EC7 th\u1ED1ng qu\u1EA3n l\xFD \u0110o\xE0n TNCS HCM");
  if (navigator.share) {
    navigator.share({
      title: 'Mã mời ĐoànVăn',
      text: text
    });
  } else {
    var _navigator$clipboard2;
    (_navigator$clipboard2 = navigator.clipboard) === null || _navigator$clipboard2 === void 0 || _navigator$clipboard2.writeText(text);
    if (typeof toast === 'function') toast('Đã sao chép nội dung chia sẻ!', 'success');
  }
}
function mtRemoveUser(_x3) {
  return _mtRemoveUser.apply(this, arguments);
} // ─────────────────────────────────────────────────────────────────────
//  L. UI — USER JOIN MODAL (dùng Invite Code)
// ─────────────────────────────────────────────────────────────────────
function _mtRemoveUser() {
  _mtRemoveUser = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee34(username) {
    var _t18;
    return _regenerator().w(function (_context34) {
      while (1) switch (_context34.p = _context34.n) {
        case 0:
          if (confirm("V\xF4 hi\u1EC7u h\xF3a t\xE0i kho\u1EA3n \"".concat(username, "\"?"))) {
            _context34.n = 1;
            break;
          }
          return _context34.a(2);
        case 1:
          _context34.p = 1;
          _context34.n = 2;
          return MTUserMgr.removeUser(username);
        case 2:
          if (typeof toast === 'function') toast('Đã vô hiệu hóa tài khoản', 'success');
          mtLoadUsers();
          _context34.n = 4;
          break;
        case 3:
          _context34.p = 3;
          _t18 = _context34.v;
          if (typeof toast === 'function') toast('Lỗi: ' + _t18.message, 'error');
        case 4:
          return _context34.a(2);
      }
    }, _callee34, null, [[1, 3]]);
  }));
  return _mtRemoveUser.apply(this, arguments);
}
function mtShowJoinModal() {
  if (document.getElementById('mtJoinModal')) return;
  var modal = document.createElement('div');
  modal.id = 'mtJoinModal';
  modal.className = 'modal-overlay';
  modal.innerHTML = "\n<div class=\"modal\" style=\"max-width:480px\">\n  <div class=\"modal-header\">\n    <h2><i class=\"fas fa-link\" style=\"color:var(--red);margin-right:8px\"></i> Tham gia b\u1EB1ng M\xE3 m\u1EDDi</h2>\n    <button class=\"btn btn-ghost\" onclick=\"document.getElementById('mtJoinModal').remove()\"><i class=\"fas fa-times\"></i></button>\n  </div>\n  <div class=\"modal-body\" style=\"padding:24px\">\n    <div style=\"background:rgba(26,35,64,0.04);border-radius:12px;padding:14px;margin-bottom:16px;font-size:0.82rem;color:var(--text-soft)\">\n      Nh\u1EADp m\xE3 m\u1EDDi \u0111\u01B0\u1EE3c c\u1EA5p b\u1EDFi Admin \u0111\u1EC3 k\u1EBFt n\u1ED1i v\u1EDBi h\u1EC7 th\u1ED1ng Google Sheet chung c\u1EE7a t\u1ED5 ch\u1EE9c.\n    </div>\n    <div class=\"form-group\">\n      <label class=\"form-label\">M\xE3 m\u1EDDi <span class=\"required\">*</span></label>\n      <input class=\"form-control\" id=\"mtJoinCode\" placeholder=\"VD: AB12 CD34 EF56\"\n        style=\"letter-spacing:4px;font-family:monospace;font-size:1.2rem;text-align:center;text-transform:uppercase\"\n        maxlength=\"14\" oninput=\"this.value=this.value.toUpperCase()\">\n    </div>\n    <div class=\"form-row\">\n      <div class=\"form-group\">\n        <label class=\"form-label\">T\xEAn \u0111\u0103ng nh\u1EADp</label>\n        <input class=\"form-control\" id=\"mtJoinUsername\" placeholder=\"T\xEAn \u0111\u0103ng nh\u1EADp\" style=\"font-size:16px\">\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-label\">T\xEAn hi\u1EC3n th\u1ECB</label>\n        <input class=\"form-control\" id=\"mtJoinDisplay\" placeholder=\"H\u1ECD v\xE0 t\xEAn\" style=\"font-size:16px\">\n      </div>\n    </div>\n    <div class=\"form-group\">\n      <label class=\"form-label\">T\u1EA1o m\xE3 PIN (4-8 s\u1ED1)</label>\n      <input type=\"password\" class=\"form-control\" id=\"mtJoinPIN\" placeholder=\"T\u1EA1o m\xE3 PIN c\u1EE7a b\u1EA1n\"\n        maxlength=\"8\" inputmode=\"numeric\" style=\"font-size:1.2rem;letter-spacing:8px\">\n    </div>\n    <div id=\"mtJoinStatus\" style=\"font-size:0.82rem;margin-bottom:12px;min-height:18px\"></div>\n    <button class=\"btn btn-primary\" onclick=\"mtDoJoin()\" style=\"width:100%\">\n      <i class=\"fas fa-link\"></i> K\u1EBFt n\u1ED1i & T\u1EA3i d\u1EEF li\u1EC7u\n    </button>\n  </div>\n</div>";
  document.body.appendChild(modal);
  modal.addEventListener('click', function (e) {
    if (e.target === modal) modal.remove();
  });
  setTimeout(function () {
    return modal.classList.add('open');
  }, 10);
}
function mtDoJoin() {
  return _mtDoJoin.apply(this, arguments);
} // ─────────────────────────────────────────────────────────────────────
//  M. SETTINGS PAGE INJECTION — Thêm section Hệ thống vào trang Cài đặt
// ─────────────────────────────────────────────────────────────────────
function _mtDoJoin() {
  _mtDoJoin = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee36() {
    var _document$getElementB17, _document$getElementB18, _document$getElementB19, _document$getElementB20;
    var code, username, display, pin, status, _MT_ROLES$_cfg2$role, _cfg2, _t20;
    return _regenerator().w(function (_context36) {
      while (1) switch (_context36.p = _context36.n) {
        case 0:
          code = (_document$getElementB17 = document.getElementById('mtJoinCode')) === null || _document$getElementB17 === void 0 ? void 0 : _document$getElementB17.value.trim().replace(/\s/g, '').toUpperCase();
          username = (_document$getElementB18 = document.getElementById('mtJoinUsername')) === null || _document$getElementB18 === void 0 ? void 0 : _document$getElementB18.value.trim();
          display = (_document$getElementB19 = document.getElementById('mtJoinDisplay')) === null || _document$getElementB19 === void 0 ? void 0 : _document$getElementB19.value.trim();
          pin = (_document$getElementB20 = document.getElementById('mtJoinPIN')) === null || _document$getElementB20 === void 0 ? void 0 : _document$getElementB20.value.trim();
          status = document.getElementById('mtJoinStatus');
          if (!(!code || code.length < 8)) {
            _context36.n = 1;
            break;
          }
          status.innerHTML = '<span style="color:red">Vui lòng nhập mã mời hợp lệ</span>';
          return _context36.a(2);
        case 1:
          if (username) {
            _context36.n = 2;
            break;
          }
          status.innerHTML = '<span style="color:red">Vui lòng nhập tên đăng nhập</span>';
          return _context36.a(2);
        case 2:
          status.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang xác thực...';
          _context36.p = 3;
          _context36.n = 4;
          return MTAuth.joinWithCode(code, username, display, pin);
        case 4:
          _cfg2 = _context36.v;
          status.innerHTML = "<span style=\"color:#16a34a\"><i class=\"fas fa-check-circle\"></i> K\u1EBFt n\u1ED1i th\xE0nh c\xF4ng! Vai tr\xF2: ".concat((_MT_ROLES$_cfg2$role = MT_ROLES[_cfg2.role]) === null || _MT_ROLES$_cfg2$role === void 0 ? void 0 : _MT_ROLES$_cfg2$role.label, "</span>");
          if (typeof toast === 'function') toast("\uD83C\uDF89 Ch\xE0o m\u1EEBng ".concat(display || username, "! \u0110ang t\u1EA3i d\u1EEF li\u1EC7u..."), 'success');
          setTimeout(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee35() {
            var _document$getElementB21;
            var _t19;
            return _regenerator().w(function (_context35) {
              while (1) switch (_context35.p = _context35.n) {
                case 0:
                  (_document$getElementB21 = document.getElementById('mtJoinModal')) === null || _document$getElementB21 === void 0 || _document$getElementB21.remove();
                  mtUpdateUIAfterLogin();
                  // Pull dữ liệu về
                  _context35.p = 1;
                  _context35.n = 2;
                  return MTSync.pullAll(function () {});
                case 2:
                  if (typeof toast === 'function') toast('✅ Đã tải dữ liệu từ hệ thống!', 'success');
                  _context35.n = 4;
                  break;
                case 3:
                  _context35.p = 3;
                  _t19 = _context35.v;
                case 4:
                  return _context35.a(2);
              }
            }, _callee35, null, [[1, 3]]);
          })), 1200);
          _context36.n = 6;
          break;
        case 5:
          _context36.p = 5;
          _t20 = _context36.v;
          status.innerHTML = "<span style=\"color:red\"><i class=\"fas fa-times-circle\"></i> L\u1ED7i: ".concat(_t20.message, "</span>");
        case 6:
          return _context36.a(2);
      }
    }, _callee36, null, [[3, 5]]);
  }));
  return _mtDoJoin.apply(this, arguments);
}
function mtInjectSettingsSection() {
  // Tìm card Quản lý dữ liệu và thêm section trước nó
  var cards = document.querySelectorAll('#page-settings .card');
  if (!cards.length) return;
  var targetCard = cards[cards.length - 2] || cards[0]; // card gần cuối

  if (document.getElementById('mtSettingsSection')) return;
  var section = document.createElement('div');
  section.id = 'mtSettingsSection';
  section.className = 'card';
  section.style.marginBottom = '16px';
  section.innerHTML = "\n<div class=\"settings-section\">\n  <h3>\n    <i class=\"fas fa-network-wired\" style=\"color:var(--red);margin-right:8px\"></i>\n    H\u1EC7 th\u1ED1ng \u0111a ng\u01B0\u1EDDi d\xF9ng\n    <span id=\"mtRoleBadge\" style=\"margin-left:8px;font-size:0.65rem;padding:3px 10px;border-radius:20px;background:rgba(192,57,43,0.1);color:var(--red);font-weight:700;vertical-align:middle\"></span>\n  </h3>\n\n  <div id=\"mtSystemStatus\" style=\"background:var(--cream);border-radius:10px;padding:12px;margin-bottom:14px;font-size:0.8rem\">\n    <div style=\"text-align:center;color:var(--gray)\"><i class=\"fas fa-spinner fa-spin\"></i> \u0110ang ki\u1EC3m tra...</div>\n  </div>\n\n  <div style=\"display:flex;flex-direction:column;gap:8px\">\n    <div id=\"mtAdminBtns\" style=\"display:none;flex-direction:column;gap:8px\">\n      <button class=\"btn btn-primary\" onclick=\"mtShowAdminSetup()\">\n        <i class=\"fas fa-cog\"></i> C\u1EA5u h\xECnh l\u1EA1i h\u1EC7 th\u1ED1ng Admin\n      </button>\n      <button class=\"btn btn-gold\" onclick=\"mtShowInviteManager()\">\n        <i class=\"fas fa-user-plus\"></i> Qu\u1EA3n l\xFD ng\u01B0\u1EDDi d\xF9ng & M\xE3 m\u1EDDi\n      </button>\n    </div>\n    <button class=\"btn btn-outline\" onclick=\"mtShowJoinModal()\">\n      <i class=\"fas fa-link\"></i> Tham gia b\u1EB1ng M\xE3 m\u1EDDi\n    </button>\n    <button class=\"btn btn-outline\" onclick=\"mtManualSync('pull')\">\n      <i class=\"fas fa-cloud-download-alt\"></i> T\u1EA3i d\u1EEF li\u1EC7u t\u1EEB h\u1EC7 th\u1ED1ng\n    </button>\n    <button class=\"btn btn-outline\" onclick=\"mtManualSync('push')\">\n      <i class=\"fas fa-cloud-upload-alt\"></i> \u0110\u1EA9y d\u1EEF li\u1EC7u l\xEAn h\u1EC7 th\u1ED1ng\n    </button>\n    <button class=\"btn btn-outline\" style=\"color:var(--gray)\" onclick=\"mtSetupFirst()\">\n      <i class=\"fas fa-shield-alt\"></i> Thi\u1EBFt l\u1EADp Admin (l\u1EA7n \u0111\u1EA7u)\n    </button>\n  </div>\n</div>";
  targetCard.parentNode.insertBefore(section, targetCard);
  mtRefreshSystemStatus();
}
function mtRefreshSystemStatus() {
  var _cfg$user2, _cfg$user3;
  var cfg = MTConfig.get();
  var el = document.getElementById('mtSystemStatus');
  var badge = document.getElementById('mtRoleBadge');
  var adminBtns = document.getElementById('mtAdminBtns');
  if (!el) return;
  if (!(cfg !== null && cfg !== void 0 && cfg.spreadsheetId)) {
    el.innerHTML = "<div style=\"color:var(--gray);text-align:center\">\n      <i class=\"fas fa-unlink\" style=\"font-size:1.4rem;margin-bottom:6px;display:block\"></i>\n      Ch\u01B0a k\u1EBFt n\u1ED1i h\u1EC7 th\u1ED1ng. Nh\u1EADp <strong>M\xE3 m\u1EDDi</strong> ho\u1EB7c <strong>Thi\u1EBFt l\u1EADp Admin</strong>.\n    </div>";
    if (badge) badge.textContent = 'Chưa kết nối';
    if (adminBtns) adminBtns.style.display = 'none';
    return;
  }
  var role = cfg.role || 'member';
  var roleInfo = MT_ROLES[role] || MT_ROLES.member;
  var lastSync = cfg.lastSync ? new Date(cfg.lastSync).toLocaleString('vi-VN') : 'Chưa đồng bộ';
  el.innerHTML = "\n<div style=\"display:flex;flex-direction:column;gap:6px\">\n  <div style=\"display:flex;justify-content:space-between;align-items:center;padding:6px 0;border-bottom:1px solid var(--gray-light)\">\n    <span>Tr\u1EA1ng th\xE1i</span>\n    <span style=\"color:#16a34a;font-weight:700\"><i class=\"fas fa-check-circle\"></i> \u0110\xE3 k\u1EBFt n\u1ED1i</span>\n  </div>\n  <div style=\"display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid var(--gray-light)\">\n    <span>Ng\u01B0\u1EDDi d\xF9ng</span><span style=\"font-weight:700\">".concat(((_cfg$user2 = cfg.user) === null || _cfg$user2 === void 0 ? void 0 : _cfg$user2.displayName) || ((_cfg$user3 = cfg.user) === null || _cfg$user3 === void 0 ? void 0 : _cfg$user3.username) || '—', "</span>\n  </div>\n  <div style=\"display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid var(--gray-light)\">\n    <span>Vai tr\xF2</span>\n    <span style=\"color:").concat(roleInfo.color, ";font-weight:700\"><i class=\"fas ").concat(roleInfo.icon, "\"></i> ").concat(roleInfo.label, "</span>\n  </div>\n  <div style=\"display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid var(--gray-light)\">\n    <span>C\u01A1 s\u1EDF \u0110o\xE0n</span><span style=\"font-weight:700\">").concat(cfg.orgName || cfg.orgId || '—', "</span>\n  </div>\n  <div style=\"display:flex;justify-content:space-between;padding:6px 0\">\n    <span>L\u1EA7n cu\u1ED1i \u0111\u1ED3ng b\u1ED9</span><span style=\"font-size:0.75rem\">").concat(lastSync, "</span>\n  </div>\n</div>");
  if (badge) {
    badge.textContent = roleInfo.label;
    badge.style.color = roleInfo.color;
  }
  if (adminBtns) adminBtns.style.display = cfg.role === 'admin' ? 'flex' : 'none';
}
function mtManualSync() {
  return _mtManualSync.apply(this, arguments);
}
function _mtManualSync() {
  _mtManualSync = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee37() {
    var direction,
      res,
      _args37 = arguments,
      _t21;
    return _regenerator().w(function (_context37) {
      while (1) switch (_context37.p = _context37.n) {
        case 0:
          direction = _args37.length > 0 && _args37[0] !== undefined ? _args37[0] : 'pull';
          _mtUpdateSyncBadge('syncing', 'Đang đồng bộ...');
          _context37.p = 1;
          if (!(direction === 'pull')) {
            _context37.n = 3;
            break;
          }
          _context37.n = 2;
          return MTSync.pullAll(function (msg, pct) {});
        case 2:
          if (typeof toast === 'function') toast('✅ Đã tải dữ liệu mới nhất từ hệ thống!', 'success');
          _context37.n = 5;
          break;
        case 3:
          _context37.n = 4;
          return MTSync.pushAll(function (msg, pct) {});
        case 4:
          res = _context37.v;
          if (typeof toast === 'function') toast("\u2705 \u0110\xE3 \u0111\u1EA9y l\xEAn: ".concat(res.docs, " v\u0103n b\u1EA3n, ").concat(res.members, " \u0111o\xE0n vi\xEAn"), 'success');
        case 5:
          mtRefreshSystemStatus();
          _context37.n = 7;
          break;
        case 6:
          _context37.p = 6;
          _t21 = _context37.v;
          _mtUpdateSyncBadge('error', 'Lỗi đồng bộ');
          if (typeof toast === 'function') toast('Lỗi: ' + _t21.message, 'error');
        case 7:
          return _context37.a(2);
      }
    }, _callee37, null, [[1, 6]]);
  }));
  return _mtManualSync.apply(this, arguments);
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
  var _cfg$user4, _cfg$user5, _cfg$user6, _cfg$user7;
  var cfg = MTConfig.get();
  if (!cfg) return;

  // Cập nhật user chip (từ doanvan-mobile-sync.js)
  var avatar = document.getElementById('dvUserAvatar');
  var name = document.getElementById('dvUserName');
  if (avatar) avatar.textContent = (((_cfg$user4 = cfg.user) === null || _cfg$user4 === void 0 ? void 0 : _cfg$user4.displayName) || ((_cfg$user5 = cfg.user) === null || _cfg$user5 === void 0 ? void 0 : _cfg$user5.username) || 'U')[0].toUpperCase();
  if (name) name.textContent = ((_cfg$user6 = cfg.user) === null || _cfg$user6 === void 0 ? void 0 : _cfg$user6.displayName) || ((_cfg$user7 = cfg.user) === null || _cfg$user7 === void 0 ? void 0 : _cfg$user7.username) || 'Người dùng';

  // Badge vai trò
  var roleInfo = MT_ROLES[cfg.role] || MT_ROLES.member;
  _mtUpdateSyncBadge('synced', roleInfo.label);

  // Ẩn/hiện menu admin trong sidebar
  var adminNavSection = document.getElementById('mtAdminNav');
  if (adminNavSection) adminNavSection.style.display = cfg.role === 'admin' ? 'block' : 'none';
  mtRefreshSystemStatus();
}
function mtInit() {
  // Chờ DOM sẵn sàng
  var _tryInit = function tryInit() {
    var pageSettings = document.getElementById('page-settings');
    if (!pageSettings) {
      setTimeout(_tryInit, 500);
      return;
    }

    // Inject section cài đặt
    mtInjectSettingsSection();

    // Kiểm tra nếu đã login → update UI
    var cfg = MTConfig.get();
    if (cfg !== null && cfg !== void 0 && cfg.spreadsheetId) {
      if (!MTAuth.isLoggedIn()) {
        // Chưa có session → PIN login (nếu doanvan-mobile-sync.js đang dùng)
        // Tích hợp với auth flow hiện có
        var origLogin = window.dvShowAuthModal;
        if (typeof origLogin === 'function') {
          // auth đã có PIN-based, chỉ cần patch submit
          window._mtAfterLogin = mtUpdateUIAfterLogin;
        }
      } else {
        mtUpdateUIAfterLogin();
        // Auto pull nếu có config
        if (cfg.spreadsheetId) {
          setTimeout(function () {
            MTSync.pullAll(function () {}).catch(function () {});
          }, 3000);
        }
      }
    }

    // Patch DB để auto-sync sau mỗi thay đổi
    if (typeof DB !== 'undefined') {
      var origSet = DB.set.bind(DB);
      var origPush = DB.push.bind(DB);
      var origUpd = DB.update.bind(DB);
      var origRem = DB.remove.bind(DB);
      var scheduleIfNeeded = function scheduleIfNeeded() {
        var c = MTConfig.get();
        if (c !== null && c !== void 0 && c.spreadsheetId && c !== null && c !== void 0 && c.serviceAccountJson) MTSync.scheduleAutoSync();
      };
      DB.set = function (k, v) {
        var r = origSet(k, v);
        scheduleIfNeeded();
        return r;
      };
      DB.push = function (k, v) {
        var r = origPush(k, v);
        scheduleIfNeeded();
        return r;
      };
      DB.update = function (k, id, p) {
        origUpd(k, id, p);
        scheduleIfNeeded();
      };
      DB.remove = function (k, id) {
        origRem(k, id);
        scheduleIfNeeded();
      };
    }

    // Thêm nút Admin vào user menu (nếu là admin)
    var origOpenUserMenu = window.dvOpenUserMenu;
    if (typeof origOpenUserMenu === 'function') {
      window.dvOpenUserMenu = function () {
        origOpenUserMenu();
        // Chèn thêm mục Admin vào menu sau khi render
        setTimeout(function () {
          var menu = document.getElementById('dvUserMenuDrop');
          var cfg = MTConfig.get();
          if (!menu || !cfg) return;
          if (cfg.role === 'admin') {
            var adminBtn = document.createElement('div');
            adminBtn.innerHTML = "<button onclick=\"mtShowInviteManager();document.getElementById('dvUserMenuDrop')?.remove()\"\n              style=\"display:flex;align-items:center;gap:10px;width:100%;padding:10px 12px;border:none;background:none;cursor:pointer;border-radius:8px;font-family:'Be Vietnam Pro',sans-serif;font-size:0.82rem;font-weight:600;color:var(--red)\"\n              onmouseover=\"this.style.background='rgba(192,57,43,0.06)'\" onmouseout=\"this.style.background='none'\">\n              <i class=\"fas fa-user-plus\" style=\"width:16px;text-align:center\"></i>Qu\u1EA3n l\xFD ng\u01B0\u1EDDi d\xF9ng</button>";
            menu.insertBefore(adminBtn.firstChild, menu.firstChild);
          }
        }, 50);
      };
    }
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', _tryInit);
  } else {
    _tryInit();
  }
}

// Khởi chạy
mtInit();

// Export global
window.MTConfig = MTConfig;
window.MTAuth = MTAuth;
window.MTSync = MTSync;
window.MTAdmin = MTAdmin;
window.MTUserMgr = MTUserMgr;
window.mtShowAdminSetup = mtShowAdminSetup;
window.mtShowInviteManager = mtShowInviteManager;
window.mtShowJoinModal = mtShowJoinModal;
window.mtManualSync = mtManualSync;
window.mtSetupFirst = mtSetupFirst;
window.mtDoAdminSetup = mtDoAdminSetup;
window.mtTestSA = mtTestSA;
window.mtGoStep = mtGoStep;
window.mtCreateInvite = mtCreateInvite;
window.mtDoJoin = mtDoJoin;
window.mtLoadUsers = mtLoadUsers;
window.mtLoadOrgs = mtLoadOrgs;
window.mtAddOrg = mtAddOrg;
window.mtRemoveUser = mtRemoveUser;
window.mtInviteTab = mtInviteTab;
window.mtCopyInviteCode = mtCopyInviteCode;
window.mtShareInviteCode = mtShareInviteCode;
