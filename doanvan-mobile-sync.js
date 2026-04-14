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
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
(function injectMobileCSS() {
  var style = document.createElement('style');
  style.id = 'dv-mobile-css';
  style.textContent = "\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 MOBILE HAMBURGER BUTTON \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n#dvHamburger {\n  display: none;\n  position: fixed; top: 14px; left: 14px; z-index: 300;\n  width: 40px; height: 40px; border-radius: 10px;\n  background: var(--navy); color: #fff;\n  border: none; cursor: pointer; font-size: 1rem;\n  align-items: center; justify-content: center;\n  box-shadow: 0 4px 14px rgba(0,0,0,0.25);\n  transition: var(--transition);\n}\n#dvHamburger:hover { background: var(--red); }\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 SIDEBAR OVERLAY (mobile) \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n#dvSidebarOverlay {\n  display: none; position: fixed; inset: 0;\n  background: rgba(0,0,0,0.5); z-index: 149;\n  backdrop-filter: blur(2px);\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 SYNC STATUS INDICATOR (topbar) \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n#dvSyncBadge {\n  display: inline-flex; align-items: center; gap: 5px;\n  font-size: 0.7rem; font-weight: 700; padding: 4px 10px;\n  border-radius: 20px; cursor: pointer;\n  border: 1.5px solid var(--gray-light);\n  color: var(--gray); background: var(--white);\n  transition: var(--transition); white-space: nowrap;\n}\n#dvSyncBadge.syncing { color: #0284c7; border-color: #bae6fd; background: #f0f9ff; animation: dvPulse 1s infinite; }\n#dvSyncBadge.synced  { color: #16a34a; border-color: #bbf7d0; background: #f0fdf4; }\n#dvSyncBadge.error   { color: var(--red); border-color: rgba(192,57,43,0.3); background: rgba(192,57,43,0.04); }\n@keyframes dvPulse { 0%,100%{opacity:1} 50%{opacity:0.6} }\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 USER AVATAR (topbar) \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n#dvUserChip {\n  display: inline-flex; align-items: center; gap: 7px;\n  padding: 5px 12px 5px 5px; border-radius: 20px;\n  background: var(--cream); border: 1.5px solid var(--gray-light);\n  cursor: pointer; font-size: 0.78rem; font-weight: 600;\n  color: var(--navy); transition: var(--transition);\n}\n#dvUserChip:hover { border-color: var(--red); background: rgba(192,57,43,0.04); }\n#dvUserAvatar {\n  width: 28px; height: 28px; border-radius: 50%;\n  background: linear-gradient(135deg, var(--red), var(--gold));\n  display: flex; align-items: center; justify-content: center;\n  color: #fff; font-size: 0.72rem; font-weight: 800; flex-shrink: 0;\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 BOTTOM NAV BAR (mobile only) \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n#dvBottomNav {\n  display: none; position: fixed; bottom: 0; left: 0; right: 0; z-index: 120;\n  background: var(--white); border-top: 2px solid var(--gray-light);\n  box-shadow: 0 -4px 20px rgba(0,0,0,0.10);\n  padding: 6px 0 max(6px, env(safe-area-inset-bottom));\n  grid-template-columns: repeat(5, 1fr);\n}\n.dv-bnav-item {\n  display: flex; flex-direction: column; align-items: center;\n  gap: 3px; padding: 6px 4px; cursor: pointer;\n  font-size: 0.6rem; font-weight: 600; color: var(--gray);\n  transition: var(--transition); border: none; background: none;\n  font-family: 'Be Vietnam Pro', sans-serif;\n}\n.dv-bnav-item i { font-size: 1.1rem; transition: var(--transition); }\n.dv-bnav-item.active { color: var(--red); }\n.dv-bnav-item.active i { transform: translateY(-2px); }\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 PULL-TO-REFRESH INDICATOR \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n#dvPullIndicator {\n  display: none; position: fixed; top: 0; left: 50%; transform: translateX(-50%);\n  z-index: 500; background: var(--navy); color: #fff;\n  border-radius: 0 0 12px 12px; padding: 6px 20px;\n  font-size: 0.75rem; font-weight: 700; align-items: center; gap: 8px;\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 RESPONSIVE GRID OVERRIDES \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n@media (max-width: 1100px) {\n  .stats-grid { grid-template-columns: repeat(2,1fr) !important; }\n  .cat-grid   { grid-template-columns: repeat(2,1fr) !important; }\n  .main-side  { grid-template-columns: 1fr !important; }\n  .two-col    { grid-template-columns: 1fr !important; }\n  .three-col  { grid-template-columns: 1fr 1fr !important; }\n}\n\n@media (max-width: 768px) {\n  /* Sidebar: slide-in drawer */\n  #sidebar {\n    transform: translateX(-100%);\n    width: 280px !important;\n    z-index: 150 !important;\n    transition: transform 0.3s cubic-bezier(0.4,0,0.2,1) !important;\n  }\n  #sidebar.dv-open { transform: translateX(0); }\n  #sidebar .sidebar-logo h1,\n  #sidebar .sidebar-logo p,\n  #sidebar .nav-item span,\n  #sidebar .nav-section-title,\n  #sidebar .sidebar-footer { display: block !important; }\n  #sidebar .nav-item { justify-content: flex-start !important; padding: 12px 20px !important; }\n  #dvHamburger { display: flex !important; }\n  #dvSidebarOverlay { display: block; opacity: 0; pointer-events: none; transition: opacity 0.3s; }\n  #dvSidebarOverlay.dv-open { opacity: 1; pointer-events: all; }\n  #main { margin-left: 0 !important; }\n\n  /* Topbar */\n  #topbar { padding: 0 12px 0 60px !important; gap: 8px !important; }\n  .topbar-title { font-size: 0.9rem !important; }\n  #topbar .btn span, #topbar .btn-text { display: none !important; }\n  #topbar .btn { padding: 8px 10px !important; }\n\n  /* Content */\n  #content { padding: 14px 12px !important; }\n  #content.dv-has-bottomnav { padding-bottom: 74px !important; }\n\n  /* Stats */\n  .stats-grid { grid-template-columns: repeat(2,1fr) !important; gap: 10px !important; }\n  .stat-card { padding: 14px !important; }\n  .stat-value { font-size: 1.6rem !important; }\n\n  /* Grids */\n  .cat-grid, .two-col, .three-col { grid-template-columns: 1fr !important; }\n  .main-side { grid-template-columns: 1fr !important; }\n  .form-row   { grid-template-columns: 1fr !important; }\n\n  /* Cards */\n  .card { padding: 16px !important; }\n\n  /* Tables \u2192 horizontal scroll */\n  .doc-table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; }\n  .doc-table { min-width: 640px; }\n  .doc-row-actions { opacity: 1 !important; }\n\n  /* Modals: full bottom sheet */\n  .modal-overlay { align-items: flex-end !important; padding: 0 !important; }\n  .modal {\n    max-width: 100% !important; width: 100% !important;\n    border-radius: 20px 20px 0 0 !important;\n    max-height: 92vh !important;\n    padding-bottom: env(safe-area-inset-bottom);\n  }\n  .modal::before {\n    content:'';display:block;width:36px;height:4px;background:var(--gray-light);\n    border-radius:2px;margin:10px auto 0;\n  }\n\n  /* Upload zone */\n  .upload-zone { padding: 28px 16px !important; }\n\n  /* AI panel chips: wrap */\n  .ai-panel .ai-chip { font-size: 0.68rem !important; padding: 4px 10px !important; }\n\n  /* Bottom nav */\n  #dvBottomNav { display: grid !important; }\n\n  /* AI chips bar hide on small */\n  #dashAiPanel .ai-panel-header { flex-wrap: wrap; }\n\n  /* Toast */\n  .toast-container { top: auto !important; bottom: 80px !important; right: 10px !important; left: 10px !important; }\n  .toast { min-width: unset !important; width: 100% !important; }\n\n  /* Section header */\n  .section-header { flex-direction: column; align-items: flex-start; gap: 10px; }\n  .section-header .btn-group, .section-header > .btn { width: 100%; justify-content: center; }\n}\n\n@media (max-width: 400px) {\n  .stats-grid { grid-template-columns: 1fr 1fr !important; gap: 8px !important; }\n  .stat-value { font-size: 1.4rem !important; }\n  #content { padding: 10px 8px !important; }\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 TOUCH IMPROVEMENTS \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n@media (hover: none) and (pointer: coarse) {\n  .btn { min-height: 44px; }\n  .nav-item { min-height: 48px; }\n  .doc-table td { padding: 14px 12px !important; }\n  .form-control { font-size: 16px !important; } /* prevent iOS zoom */\n  select.form-control { font-size: 16px !important; }\n  input.form-control { font-size: 16px !important; }\n  textarea.form-control { font-size: 16px !important; }\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 SAFE AREA (notch/home bar) \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n#topbar { padding-left: max(28px, env(safe-area-inset-left)); }\n@media (max-width: 768px) {\n  #topbar { padding-left: max(60px, calc(60px + env(safe-area-inset-left))); padding-right: max(12px, env(safe-area-inset-right)); }\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 AUTH MODAL \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n#dvAuthModal {\n  position: fixed; inset: 0; z-index: 9999;\n  background: linear-gradient(135deg, var(--navy) 0%, var(--navy-mid) 60%, var(--red-deep) 100%);\n  display: flex; align-items: center; justify-content: center;\n  padding: 20px;\n}\n#dvAuthBox {\n  background: var(--white); border-radius: 24px;\n  padding: 36px 32px; width: 100%; max-width: 400px;\n  box-shadow: 0 32px 80px rgba(0,0,0,0.35);\n  text-align: center;\n}\n.dv-auth-logo {\n  width: 72px; height: 72px; border-radius: 50%;\n  background: linear-gradient(135deg, var(--red), var(--gold));\n  display: flex; align-items: center; justify-content: center;\n  font-size: 1.8rem; color: #fff; margin: 0 auto 16px;\n  box-shadow: 0 0 0 8px rgba(192,57,43,0.12);\n}\n.dv-auth-title { font-family:'Playfair Display',serif; font-size:1.4rem; color:var(--navy); font-weight:900; }\n.dv-auth-sub { font-size:0.78rem; color:var(--gray); margin-top:4px; margin-bottom:28px; }\n.dv-pin-row { display:flex; gap:10px; justify-content:center; margin:16px 0; }\n.dv-pin-dot {\n  width:48px; height:56px; border-radius:12px;\n  border: 2px solid var(--gray-light);\n  display:flex; align-items:center; justify-content:center;\n  font-size:1.5rem; font-weight:900; color:var(--navy);\n  background:var(--cream); transition:var(--transition);\n}\n.dv-pin-dot.filled { border-color:var(--red); background:#fff; color:var(--red); }\n.dv-pin-dot.active { border-color:var(--navy); box-shadow:0 0 0 3px rgba(26,35,64,0.15); }\n.dv-keypad {\n  display:grid; grid-template-columns:repeat(3,1fr); gap:10px;\n  margin-top:16px;\n}\n.dv-key {\n  height:56px; border-radius:12px; border:1.5px solid var(--gray-light);\n  background:var(--cream); font-family:'Be Vietnam Pro',sans-serif;\n  font-size:1.2rem; font-weight:700; color:var(--navy);\n  cursor:pointer; transition:var(--transition);\n  display:flex; align-items:center; justify-content:center;\n}\n.dv-key:hover, .dv-key:active { background:var(--navy); color:#fff; border-color:var(--navy); transform:scale(0.96); }\n.dv-key.del { font-size:0.9rem; }\n.dv-key.empty { visibility:hidden; }\n.dv-auth-alt { margin-top:16px; font-size:0.75rem; color:var(--gray); }\n.dv-auth-alt a { color:var(--red); font-weight:700; cursor:pointer; }\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 SYNC MODAL \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n#dvSyncModal .modal { max-width:560px; }\n.dv-sync-step {\n  display:flex; gap:14px; padding:14px; border-radius:12px;\n  border:1.5px solid var(--gray-light); margin-bottom:10px;\n  cursor:default; transition:var(--transition);\n}\n.dv-sync-step:hover { border-color:var(--navy); }\n.dv-sync-step-num {\n  width:32px; height:32px; border-radius:50%;\n  background:var(--navy); color:#fff;\n  display:flex; align-items:center; justify-content:center;\n  font-weight:800; font-size:0.85rem; flex-shrink:0;\n}\n.dv-sync-code-box {\n  font-family:monospace; font-size:1.4rem; font-weight:700;\n  letter-spacing:6px; text-align:center; padding:16px;\n  background:var(--cream); border-radius:12px; color:var(--navy);\n  border:2px solid var(--gray-light); user-select:all;\n  cursor:pointer;\n}\n.dv-sync-code-box:hover { border-color:var(--red); }\n.dv-sheet-preview {\n  font-size:0.75rem; background:var(--cream); border-radius:8px;\n  padding:10px 12px; border:1px solid var(--gray-light);\n  font-family:monospace; max-height:120px; overflow-y:auto;\n  white-space:pre-wrap;\n}\n.dv-status-row {\n  display:flex; align-items:center; justify-content:space-between;\n  padding:8px 0; border-bottom:1px solid var(--gray-light); font-size:0.8rem;\n}\n.dv-status-row:last-child { border-bottom:none; }\n  ";
  document.head.appendChild(style);
})();

// ─────────────────────────────────────────────────────────────────────
//  B. MOBILE UI COMPONENTS
// ─────────────────────────────────────────────────────────────────────

function _dvInjectMobileUI() {
  // 1) Hamburger button
  if (!document.getElementById('dvHamburger')) {
    var ham = document.createElement('button');
    ham.id = 'dvHamburger';
    ham.innerHTML = '<i class="fas fa-bars"></i>';
    ham.onclick = dvToggleSidebar;
    document.body.appendChild(ham);
  }

  // 2) Sidebar overlay
  if (!document.getElementById('dvSidebarOverlay')) {
    var ov = document.createElement('div');
    ov.id = 'dvSidebarOverlay';
    ov.onclick = dvCloseSidebar;
    document.body.appendChild(ov);
  }

  // 3) Bottom nav
  if (!document.getElementById('dvBottomNav')) {
    var nav = document.createElement('nav');
    nav.id = 'dvBottomNav';
    nav.innerHTML = "\n      <button class=\"dv-bnav-item active\" onclick=\"dvNavTo('dashboard')\">\n        <i class=\"fas fa-home\"></i><span>Trang ch\u1EE7</span>\n      </button>\n      <button class=\"dv-bnav-item\" onclick=\"dvNavTo('documents')\">\n        <i class=\"fas fa-folder-open\"></i><span>Kho VB</span>\n      </button>\n      <button class=\"dv-bnav-item\" onclick=\"dvNavTo('upload')\" style=\"color:var(--red)\">\n        <i class=\"fas fa-plus-circle\" style=\"font-size:1.6rem\"></i><span>Nh\u1EADp m\u1EDBi</span>\n      </button>\n      <button class=\"dv-bnav-item\" onclick=\"dvNavTo('members')\">\n        <i class=\"fas fa-users\"></i><span>\u0110o\xE0n vi\xEAn</span>\n      </button>\n      <button class=\"dv-bnav-item\" onclick=\"dvNavTo('settings')\">\n        <i class=\"fas fa-cog\"></i><span>C\xE0i \u0111\u1EB7t</span>\n      </button>";
    document.body.appendChild(nav);
  }

  // 4) Add bottom nav padding to content
  var content = document.getElementById('content');
  if (content) content.classList.add('dv-has-bottomnav');

  // 5) Inject sync badge + user chip into topbar
  _dvInjectTopbarWidgets();

  // 6) Wrap all tables in scroll container
  document.querySelectorAll('.doc-table').forEach(function (t) {
    if (!t.closest('.doc-table-wrap')) {
      var wrap = document.createElement('div');
      wrap.className = 'doc-table-wrap';
      t.parentNode.insertBefore(wrap, t);
      wrap.appendChild(t);
    }
  });
}
function _dvInjectTopbarWidgets() {
  var actions = document.querySelector('.topbar-actions');
  if (!actions || document.getElementById('dvSyncBadge')) return;
  var syncBadge = document.createElement('button');
  syncBadge.id = 'dvSyncBadge';
  syncBadge.onclick = dvOpenSyncModal;
  syncBadge.innerHTML = '<i class="fas fa-cloud"></i><span id="dvSyncLabel">Chưa đồng bộ</span>';
  var userChip = document.createElement('div');
  userChip.id = 'dvUserChip';
  userChip.onclick = dvOpenUserMenu;
  userChip.innerHTML = "<div id=\"dvUserAvatar\">?</div><span id=\"dvUserName\">Kh\xE1ch</span>";
  actions.insertBefore(syncBadge, actions.firstChild);
  actions.insertBefore(userChip, actions.firstChild);
}
function dvToggleSidebar() {
  var sb = document.getElementById('sidebar');
  var ov = document.getElementById('dvSidebarOverlay');
  if (!sb) return;
  var isOpen = sb.classList.contains('dv-open');
  if (isOpen) dvCloseSidebar();else {
    sb.classList.add('dv-open');
    if (ov) ov.classList.add('dv-open');
  }
}
function dvCloseSidebar() {
  var _document$getElementB, _document$getElementB2;
  (_document$getElementB = document.getElementById('sidebar')) === null || _document$getElementB === void 0 || _document$getElementB.classList.remove('dv-open');
  (_document$getElementB2 = document.getElementById('dvSidebarOverlay')) === null || _document$getElementB2 === void 0 || _document$getElementB2.classList.remove('dv-open');
}
function dvNavTo(page) {
  dvCloseSidebar();
  if (typeof showPage === 'function') showPage(page);
  // Update bottom nav active state
  document.querySelectorAll('.dv-bnav-item').forEach(function (el, i) {
    var pages = ['dashboard', 'documents', 'upload', 'members', 'settings'];
    el.classList.toggle('active', pages[i] === page);
  });
}

// Close sidebar when any nav-item is clicked on mobile
document.addEventListener('click', function (e) {
  var navItem = e.target.closest('.nav-item');
  if (navItem && window.innerWidth <= 768) dvCloseSidebar();
});

// ─────────────────────────────────────────────────────────────────────
//  C. AUTH SYSTEM
//     - Tạo tài khoản PIN 6 chữ số + username
//     - Lưu hash PIN trong localStorage
//     - Multi-device: sync code 8 ký tự chứa config
// ─────────────────────────────────────────────────────────────────────

var DVAuth = {
  STORE_KEY: 'doanvan_auth',
  SESSION_KEY: 'doanvan_session',
  SESSION_TTL: 8 * 60 * 60 * 1000,
  // 8 giờ
  getProfile: function getProfile() {
    try {
      return JSON.parse(localStorage.getItem(this.STORE_KEY) || 'null');
    } catch (_unused) {
      return null;
    }
  },
  saveProfile: function saveProfile(profile) {
    localStorage.setItem(this.STORE_KEY, JSON.stringify(profile));
  },
  _hashPIN: function _hashPIN(pin) {
    // Simple deterministic hash (không dùng crypto API để tránh lỗi môi trường)
    var h = 5381;
    for (var i = 0; i < pin.length; i++) h = (h << 5) + h ^ pin.charCodeAt(i);
    return (h >>> 0).toString(16).padStart(8, '0');
  },
  verifyPIN: function verifyPIN(pin) {
    var p = this.getProfile();
    if (!p) return false;
    return p.pinHash === this._hashPIN(pin);
  },
  createAccount: function createAccount(username, pin) {
    var profile = {
      username: username,
      displayName: username,
      pinHash: this._hashPIN(pin),
      createdAt: new Date().toISOString(),
      syncConfig: null,
      lastSync: null,
      deviceId: this._generateId()
    };
    this.saveProfile(profile);
    return profile;
  },
  isLoggedIn: function isLoggedIn() {
    try {
      var sess = JSON.parse(sessionStorage.getItem(this.SESSION_KEY) || 'null');
      return sess && Date.now() - sess.ts < this.SESSION_TTL;
    } catch (_unused2) {
      return false;
    }
  },
  startSession: function startSession() {
    sessionStorage.setItem(this.SESSION_KEY, JSON.stringify({
      ts: Date.now()
    }));
  },
  endSession: function endSession() {
    sessionStorage.removeItem(this.SESSION_KEY);
  },
  _generateId: function _generateId() {
    var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 8;
    var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    return Array.from({
      length: len
    }, function () {
      return chars[Math.floor(Math.random() * chars.length)];
    }).join('');
  },
  // Tạo Sync Code: encode config thành base64 rút gọn
  generateSyncCode: function generateSyncCode(syncConfig) {
    var p = this.getProfile();
    if (!p) return null;
    var payload = {
      u: p.username,
      ph: p.pinHash,
      sc: syncConfig,
      t: Date.now()
    };
    var code = btoa(JSON.stringify(payload)).replace(/[=+/]/g, function (c) {
      return {
        '=': '',
        '+': '-',
        '/': '_'
      }[c];
    });
    return code.substring(0, 16).toUpperCase(); // 16-char short code (stored in GSheet)
  },
  // Decode sync code (khi mobile nhập)
  decodeSyncCode: function decodeSyncCode(code) {
    try {
      // Code 16 chars → look up in Google Sheet by key
      // Trả về payload gốc nếu hợp lệ
      return null; // Xử lý thực tế trong GSheetSync.lookupCode()
    } catch (_unused3) {
      return null;
    }
  }
};

// ─────────────────────────────────────────────────────────────────────
//  D. AUTH MODAL — PIN keypad
// ─────────────────────────────────────────────────────────────────────

var _dvPinEntry = '';
var _dvAuthMode = 'login'; // 'login' | 'setup'
var _dvSetupUsername = '';
function dvShowAuthModal() {
  var mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'login';
  _dvAuthMode = mode;
  _dvPinEntry = '';
  if (document.getElementById('dvAuthModal')) {
    document.getElementById('dvAuthModal').remove();
  }
  var modal = document.createElement('div');
  modal.id = 'dvAuthModal';
  var profile = DVAuth.getProfile();
  var isSetup = mode === 'setup' || !profile;
  modal.innerHTML = "\n<div id=\"dvAuthBox\">\n  <div class=\"dv-auth-logo\"><i class=\"fas fa-star\"></i></div>\n  <div class=\"dv-auth-title\">\u0110o\xE0nV\u0103n</div>\n  <div class=\"dv-auth-sub\" id=\"dvAuthSubtitle\">".concat(isSetup ? 'Tạo tài khoản mới' : "Xin ch\xE0o, <strong>".concat((profile === null || profile === void 0 ? void 0 : profile.displayName) || 'người dùng', "</strong>"), "</div>\n\n  ").concat(isSetup ? "\n  <div style=\"margin-bottom:14px\">\n    <input class=\"form-control\" id=\"dvSetupUsername\" placeholder=\"T\xEAn hi\u1EC3n th\u1ECB (VD: B\xED th\u01B0 Chi \u0111o\xE0n)\" style=\"text-align:center;font-size:16px\">\n  </div>\n  <div style=\"font-size:0.78rem;color:var(--gray);margin-bottom:8px\">T\u1EA1o m\xE3 PIN 6 s\u1ED1 c\u1EE7a b\u1EA1n</div>" : "\n  <div style=\"font-size:0.78rem;color:var(--gray);margin-bottom:8px\">Nh\u1EADp m\xE3 PIN 6 s\u1ED1</div>", "\n\n  <div class=\"dv-pin-row\" id=\"dvPinDots\">\n    ").concat(Array(6).fill(0).map(function (_, i) {
    return "<div class=\"dv-pin-dot\" id=\"dvDot".concat(i, "\">\u2022</div>");
  }).join(''), "\n  </div>\n  <div id=\"dvPinError\" style=\"font-size:0.75rem;color:var(--red);min-height:18px;margin-bottom:4px\"></div>\n\n  <div class=\"dv-keypad\">\n    ").concat([1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, 'del'].map(function (k) {
    return "\n      <button class=\"dv-key".concat(k === '' ? ' empty' : '').concat(k === 'del' ? ' del' : '', "\" onclick=\"dvKeyPress('").concat(k, "')\" ").concat(k === '' ? 'disabled' : '', ">\n        ").concat(k === 'del' ? '<i class="fas fa-backspace"></i>' : k, "\n      </button>");
  }).join(''), "\n  </div>\n\n  <div class=\"dv-auth-alt\">\n    ").concat(isSetup ? "\u0110\xE3 c\xF3 t\xE0i kho\u1EA3n? <a onclick=\"dvShowAuthModal('login')\">\u0110\u0103ng nh\u1EADp</a>" : "<a onclick=\"dvShowAuthModal('setup')\">T\u1EA1o t\xE0i kho\u1EA3n m\u1EDBi</a> &nbsp;|&nbsp; <a onclick=\"dvShowSyncCodeInput()\">\u0110\u0103ng nh\u1EADp qua Sync Code</a><br><span style=\"color:#94a3b8;font-size:0.73rem\"><i class=\"fas fa-shield-alt\"></i> Qu\xEAn PIN? Li\xEAn h\u1EC7 Admin \u0111\u1EC3 \u0111\u01B0\u1EE3c h\u1ED7 tr\u1EE3 reset.</span>", "\n  </div>\n</div>");
  document.body.appendChild(modal);
}
function dvKeyPress(key) {
  if (key === 'del') {
    _dvPinEntry = _dvPinEntry.slice(0, -1);
  } else if (key === '') {
    return;
  } else {
    if (_dvPinEntry.length >= 6) return;
    _dvPinEntry += String(key);
  }

  // Update dots UI
  for (var i = 0; i < 6; i++) {
    var dot = document.getElementById("dvDot".concat(i));
    if (!dot) continue;
    if (i < _dvPinEntry.length) {
      dot.textContent = '●';
      dot.classList.add('filled');
    } else {
      dot.textContent = '•';
      dot.classList.remove('filled', 'active');
    }
    if (i === _dvPinEntry.length) dot.classList.add('active');else dot.classList.remove('active');
  }
  if (_dvPinEntry.length === 6) {
    setTimeout(function () {
      return dvSubmitPIN();
    }, 200);
  }
}
function dvSubmitPIN() {
  var errEl = document.getElementById('dvPinError');
  if (_dvAuthMode === 'setup') {
    var _document$getElementB3;
    var username = ((_document$getElementB3 = document.getElementById('dvSetupUsername')) === null || _document$getElementB3 === void 0 ? void 0 : _document$getElementB3.value.trim()) || 'Người dùng';
    DVAuth.createAccount(username, _dvPinEntry);
    DVAuth.startSession();
    _dvDismissAuthAndInit();
    if (typeof toast === 'function') toast("<i class=\"fas fa-user-check\" style=\"color:#16a34a\"></i> T\u1EA1o t\xE0i kho\u1EA3n th\xE0nh c\xF4ng! Xin ch\xE0o, <strong>".concat(username, "</strong>"), 'success');
  } else {
    if (DVAuth.verifyPIN(_dvPinEntry)) {
      DVAuth.startSession();
      _dvDismissAuthAndInit();
    } else {
      var _document$getElementB4;
      _dvPinEntry = '';
      for (var i = 0; i < 6; i++) {
        var d = document.getElementById("dvDot".concat(i));
        if (d) {
          d.textContent = '•';
          d.classList.remove('filled', 'active');
        }
      }
      if (errEl) errEl.textContent = 'Mã PIN không đúng. Thử lại!';
      // Shake animation
      (_document$getElementB4 = document.getElementById('dvAuthBox')) === null || _document$getElementB4 === void 0 || _document$getElementB4.animate([{
        transform: 'translateX(0)'
      }, {
        transform: 'translateX(-8px)'
      }, {
        transform: 'translateX(8px)'
      }, {
        transform: 'translateX(0)'
      }], {
        duration: 300
      });
      setTimeout(function () {
        if (errEl) errEl.textContent = '';
      }, 2000);
    }
  }
}
function _dvDismissAuthAndInit() {
  var _document$getElementB5;
  (_document$getElementB5 = document.getElementById('dvAuthModal')) === null || _document$getElementB5 === void 0 || _document$getElementB5.remove();
  _dvUpdateUserChip();
  if (typeof dvInitSync === 'function') dvInitSync();
}
function _dvUpdateUserChip() {
  var profile = DVAuth.getProfile();
  if (!profile) return;
  var avatar = document.getElementById('dvUserAvatar');
  var name = document.getElementById('dvUserName');
  if (avatar) avatar.textContent = (profile.displayName || 'U')[0].toUpperCase();
  if (name) name.textContent = profile.displayName || 'Người dùng';
}
function dvOpenUserMenu() {
  var profile = DVAuth.getProfile();
  var loggedIn = DVAuth.isLoggedIn();

  // Build dropdown
  var existing = document.getElementById('dvUserMenuDrop');
  if (existing) {
    existing.remove();
    return;
  }
  var menu = document.createElement('div');
  menu.id = 'dvUserMenuDrop';
  menu.style.cssText = "position:fixed;top:58px;right:12px;z-index:400;background:#fff;border-radius:14px;\n    box-shadow:0 8px 32px rgba(0,0,0,0.18);padding:8px;min-width:220px;border:1px solid var(--gray-light)";
  var chip = document.getElementById('dvUserChip');
  if (chip) {
    var rect = chip.getBoundingClientRect();
    menu.style.top = rect.bottom + 6 + 'px';
    menu.style.right = window.innerWidth - rect.right + 'px';
  }
  var syncConfig = profile === null || profile === void 0 ? void 0 : profile.syncConfig;
  var lastSync = profile !== null && profile !== void 0 && profile.lastSync ? new Date(profile.lastSync).toLocaleString('vi-VN') : 'Chưa đồng bộ';
  menu.innerHTML = "\n<div style=\"padding:10px 12px;border-bottom:1px solid var(--gray-light);margin-bottom:6px\">\n  <div style=\"font-weight:700;color:var(--navy)\">".concat((profile === null || profile === void 0 ? void 0 : profile.displayName) || 'Người dùng', "</div>\n  <div style=\"font-size:0.72rem;color:var(--gray)\">L\u1EA7n cu\u1ED1i \u0111\u1ED3ng b\u1ED9: ").concat(lastSync, "</div>\n</div>\n").concat(_dvMenuItem('fas fa-sync-alt', 'Đồng bộ ngay', 'dvManualSync()'), "\n").concat(_dvMenuItem('fas fa-cloud', 'Cấu hình đồng bộ', 'dvOpenSyncModal()'), "\n").concat(_dvMenuItem('fas fa-cog', 'Cài đặt', 'showPage(\'settings\')'), "\n").concat(_dvMenuItem('fas fa-sign-out-alt', 'Đăng xuất', 'dvLogout()', 'color:var(--red)'));
  document.body.appendChild(menu);
  // Close on outside click
  setTimeout(function () {
    return document.addEventListener('click', function h(e) {
      if (!menu.contains(e.target) && e.target.id !== 'dvUserChip') {
        menu.remove();
        document.removeEventListener('click', h);
      }
    });
  }, 100);
}
function _dvMenuItem(icon, label, onclick) {
  var style = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  return "<button onclick=\"".concat(onclick, ";document.getElementById('dvUserMenuDrop')?.remove()\" style=\"display:flex;align-items:center;gap:10px;width:100%;padding:10px 12px;border:none;background:none;cursor:pointer;border-radius:8px;font-family:'Be Vietnam Pro',sans-serif;font-size:0.82rem;font-weight:600;").concat(style, "\" onmouseover=\"this.style.background='var(--cream)'\" onmouseout=\"this.style.background='none'\">\n  <i class=\"").concat(icon, "\" style=\"width:16px;text-align:center;color:var(--gray)\"></i>").concat(label, "</button>");
}
function dvLogout() {
  DVAuth.endSession();
  if (typeof toast === 'function') toast('Đã đăng xuất', 'info');
  setTimeout(function () {
    dvShowAuthModal('login');
    _dvUpdateUserChip();
  }, 400);
}

// ─────────────────────────────────────────────────────────────────────
//  E. GOOGLE SYNC MODULE
//     Dùng Google Sheets API v4 (REST) với Service Account JWT
//     Không cần OAuth browser redirect
// ─────────────────────────────────────────────────────────────────────

var GSheetSync = {
  SCOPE: 'https://www.googleapis.com/auth/spreadsheets',
  DRIVE_SCOPE: 'https://www.googleapis.com/auth/drive.file',
  TOKEN_ENDPOINT: 'https://oauth2.googleapis.com/token',
  SHEETS_API: 'https://sheets.googleapis.com/v4/spreadsheets',
  DRIVE_API: 'https://www.googleapis.com/upload/drive/v3/files',
  _tokenCache: null,
  _tokenExpiry: 0,
  getSyncConfig: function getSyncConfig() {
    var p = DVAuth.getProfile();
    return (p === null || p === void 0 ? void 0 : p.syncConfig) || null;
  },
  saveSyncConfig: function saveSyncConfig(cfg) {
    var p = DVAuth.getProfile();
    if (!p) return;
    p.syncConfig = cfg;
    DVAuth.saveProfile(p);
  },
  // Sign JWT with RS256 — dùng Web Crypto API
  _signJWT: function _signJWT(serviceAccountJson) {
    var _this = this;
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var sa, now, header, payload, b64, unsignedToken, pemBody, keyBuf, cryptoKey, sig, sigB64;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            sa = typeof serviceAccountJson === 'string' ? JSON.parse(serviceAccountJson) : serviceAccountJson;
            now = Math.floor(Date.now() / 1000);
            header = {
              alg: 'RS256',
              typ: 'JWT'
            };
            payload = {
              iss: sa.client_email,
              scope: "".concat(_this.SCOPE, " ").concat(_this.DRIVE_SCOPE),
              aud: _this.TOKEN_ENDPOINT,
              exp: now + 3600,
              iat: now
            };
            b64 = function b64(obj) {
              return btoa(JSON.stringify(obj)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
            };
            unsignedToken = "".concat(b64(header), ".").concat(b64(payload)); // Import private key
            pemBody = sa.private_key.replace(/-----[^-]+-----/g, '').replace(/\s/g, '');
            keyBuf = Uint8Array.from(atob(pemBody), function (c) {
              return c.charCodeAt(0);
            });
            _context.n = 1;
            return crypto.subtle.importKey('pkcs8', keyBuf, {
              name: 'RSASSA-PKCS1-v1_5',
              hash: 'SHA-256'
            }, false, ['sign']);
          case 1:
            cryptoKey = _context.v;
            _context.n = 2;
            return crypto.subtle.sign('RSASSA-PKCS1-v1_5', cryptoKey, new TextEncoder().encode(unsignedToken));
          case 2:
            sig = _context.v;
            sigB64 = btoa(String.fromCharCode.apply(String, _toConsumableArray(new Uint8Array(sig)))).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
            return _context.a(2, "".concat(unsignedToken, ".").concat(sigB64));
        }
      }, _callee);
    }))();
  },
  _getAccessToken: function _getAccessToken() {
    var _arguments = arguments,
      _this2 = this;
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
      var force, cfg, jwt, resp, data, _t, _t2, _t3;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            force = _arguments.length > 0 && _arguments[0] !== undefined ? _arguments[0] : false;
            if (!(!force && _this2._tokenCache && Date.now() < _this2._tokenExpiry)) {
              _context2.n = 1;
              break;
            }
            return _context2.a(2, _this2._tokenCache);
          case 1:
            cfg = _this2.getSyncConfig();
            if (cfg !== null && cfg !== void 0 && cfg.serviceAccountJson) {
              _context2.n = 2;
              break;
            }
            throw new Error('NO_SA_KEY');
          case 2:
            _context2.n = 3;
            return _this2._signJWT(cfg.serviceAccountJson);
          case 3:
            jwt = _context2.v;
            _context2.n = 4;
            return fetch(_this2.TOKEN_ENDPOINT, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              body: "grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=".concat(jwt)
            });
          case 4:
            resp = _context2.v;
            if (resp.ok) {
              _context2.n = 6;
              break;
            }
            _t = Error;
            _context2.n = 5;
            return resp.text();
          case 5:
            _t2 = _context2.v;
            _t3 = 'TOKEN_FAILED: ' + _t2;
            throw new _t(_t3);
          case 6:
            _context2.n = 7;
            return resp.json();
          case 7:
            data = _context2.v;
            _this2._tokenCache = data.access_token;
            _this2._tokenExpiry = Date.now() + (data.expires_in - 60) * 1000;
            return _context2.a(2, _this2._tokenCache);
        }
      }, _callee2);
    }))();
  },
  // Lấy Spreadsheet ID — bắt buộc người dùng nhập thủ công
  _ensureSpreadsheet: function _ensureSpreadsheet(token) {
    var _this3 = this;
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
      var cfg;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.n) {
          case 0:
            cfg = _this3.getSyncConfig();
            if (!(cfg !== null && cfg !== void 0 && cfg.spreadsheetId)) {
              _context3.n = 1;
              break;
            }
            return _context3.a(2, cfg.spreadsheetId);
          case 1:
            throw new Error('NO_SPREADSHEET_ID');
          case 2:
            return _context3.a(2);
        }
      }, _callee3);
    }))();
  },
  _initHeaders: function _initHeaders(token, sid) {
    var _this4 = this;
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
      var headerMap, data;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.n) {
          case 0:
            headerMap = {
              docs: ['id', 'title', 'type', 'code', 'issuer', 'issueDate', 'deadline', 'status', 'priority', 'summary', 'keywords', 'rawText_ref', 'createdAt'],
              members: ['id', 'fullName', 'gender', 'chiDoan', 'role', 'birthDate', 'joinDate', 'phone', 'email', 'status', 'achieve', 'note', 'createdAt'],
              reminders: ['id', 'title', 'date', 'tag', 'note', 'done', 'docId', 'createdAt'],
              tasks: ['id', 'title', 'deadline', 'status', 'priority', 'note', 'assignee', 'createdAt'],
              meta: ['key', 'value']
            };
            data = Object.entries(headerMap).map(function (_ref) {
              var _ref2 = _slicedToArray(_ref, 2),
                sheet = _ref2[0],
                headers = _ref2[1];
              return {
                range: "".concat(sheet, "!A1:").concat(String.fromCharCode(64 + headers.length), "1"),
                values: [headers]
              };
            });
            _context4.n = 1;
            return fetch("".concat(_this4.SHEETS_API, "/").concat(sid, "/values:batchUpdate"), {
              method: 'POST',
              headers: {
                'Authorization': "Bearer ".concat(token),
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                valueInputOption: 'RAW',
                data: data
              })
            });
          case 1:
            return _context4.a(2);
        }
      }, _callee4);
    }))();
  },
  // Kiểm tra và tạo các sheet còn thiếu trong spreadsheet đã có sẵn
  _ensureSheets: function _ensureSheets(token, sid) {
    var _this5 = this;
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
      var REQUIRED_SHEETS, resp, data, existing, missing, requests, headerMap, headerData;
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.n) {
          case 0:
            REQUIRED_SHEETS = ['docs', 'members', 'reminders', 'tasks', 'meta']; // Lấy danh sách sheet hiện có
            _context5.n = 1;
            return fetch("".concat(_this5.SHEETS_API, "/").concat(sid, "?fields=sheets.properties.title"), {
              headers: {
                'Authorization': "Bearer ".concat(token)
              }
            });
          case 1:
            resp = _context5.v;
            if (resp.ok) {
              _context5.n = 2;
              break;
            }
            return _context5.a(2);
          case 2:
            _context5.n = 3;
            return resp.json();
          case 3:
            data = _context5.v;
            existing = (data.sheets || []).map(function (s) {
              return s.properties.title;
            });
            missing = REQUIRED_SHEETS.filter(function (name) {
              return !existing.includes(name);
            });
            if (missing.length) {
              _context5.n = 4;
              break;
            }
            return _context5.a(2);
          case 4:
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
            _context5.n = 5;
            return fetch("".concat(_this5.SHEETS_API, "/").concat(sid, ":batchUpdate"), {
              method: 'POST',
              headers: {
                'Authorization': "Bearer ".concat(token),
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                requests: requests
              })
            });
          case 5:
            // Khởi tạo header cho các sheet mới
            headerMap = {
              docs: ['id', 'title', 'type', 'code', 'issuer', 'issueDate', 'deadline', 'status', 'priority', 'summary', 'keywords', 'rawText_ref', 'createdAt'],
              members: ['id', 'fullName', 'gender', 'chiDoan', 'role', 'birthDate', 'joinDate', 'phone', 'email', 'status', 'achieve', 'note', 'createdAt'],
              reminders: ['id', 'title', 'date', 'tag', 'note', 'done', 'docId', 'createdAt'],
              tasks: ['id', 'title', 'deadline', 'status', 'priority', 'note', 'assignee', 'createdAt'],
              meta: ['key', 'value']
            };
            headerData = missing.map(function (sheet) {
              return {
                range: "".concat(sheet, "!A1:").concat(String.fromCharCode(64 + headerMap[sheet].length), "1"),
                values: [headerMap[sheet]]
              };
            });
            _context5.n = 6;
            return fetch("".concat(_this5.SHEETS_API, "/").concat(sid, "/values:batchUpdate"), {
              method: 'POST',
              headers: {
                'Authorization': "Bearer ".concat(token),
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                valueInputOption: 'RAW',
                data: headerData
              })
            });
          case 6:
            return _context5.a(2);
        }
      }, _callee5);
    }))();
  },
  // Push toàn bộ dữ liệu lên Sheets
  pushAll: function pushAll(onProgress) {
    var _this6 = this;
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
      var token, sid, allData, colMap, serialize, putSheet, pct, sheets, _i, _sheets, _sheets$_i, sheet, rows, profile, metaRange, metaValues;
      return _regenerator().w(function (_context7) {
        while (1) switch (_context7.n) {
          case 0:
            _context7.n = 1;
            return _this6._getAccessToken();
          case 1:
            token = _context7.v;
            _context7.n = 2;
            return _this6._ensureSpreadsheet(token);
          case 2:
            sid = _context7.v;
            onProgress === null || onProgress === void 0 || onProgress('Đang kiểm tra cấu trúc sheet...', 5);
            _context7.n = 3;
            return _this6._ensureSheets(token, sid);
          case 3:
            onProgress === null || onProgress === void 0 || onProgress('Đang đẩy dữ liệu...', 10);
            allData = {
              docs: (typeof DB !== 'undefined' ? DB.get('docs') : []) || [],
              members: (typeof DB !== 'undefined' ? DB.get('membersList') : []) || [],
              reminders: (typeof DB !== 'undefined' ? DB.get('reminders') : []) || [],
              tasks: (typeof DB !== 'undefined' ? DB.get('tasks') : []) || []
            };
            colMap = {
              docs: ['id', 'title', 'type', 'code', 'issuer', 'issueDate', 'deadline', 'status', 'priority', 'summary', 'keywords', 'rawText', 'createdAt'],
              members: ['id', 'fullName', 'gender', 'chiDoan', 'role', 'birthDate', 'joinDate', 'phone', 'email', 'status', 'achieve', 'note', 'createdAt'],
              reminders: ['id', 'title', 'date', 'tag', 'note', 'done', 'docId', 'createdAt'],
              tasks: ['id', 'title', 'deadline', 'status', 'priority', 'note', 'assignee', 'createdAt']
            }; // Serialize một row theo danh sách cột
            serialize = function serialize(row, cols) {
              return cols.map(function (c) {
                var v = row[c];
                if (Array.isArray(v)) return v.join(', ');
                if (v === null || v === undefined) return '';
                return String(v).substring(0, 500);
              });
            }; // PUT từng sheet riêng lẻ — tránh lỗi 400 của batchClear/batchUpdate
            // khi range thiếu số hàng hoặc data array rỗng
            putSheet = /*#__PURE__*/function () {
              var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(sheetName, rows, cols) {
                var lastCol, auth, clearRange, values, writeRange, resp, txt;
                return _regenerator().w(function (_context6) {
                  while (1) switch (_context6.n) {
                    case 0:
                      lastCol = String.fromCharCode(64 + cols.length); // 'M', 'N', ...
                      auth = {
                        'Authorization': "Bearer ".concat(token),
                        'Content-Type': 'application/json'
                      }; // Bước 1: Xoá dữ liệu cũ bằng API clear (đúng endpoint, không cần truyền values)
                      clearRange = "".concat(sheetName, "!A2:").concat(lastCol, "1001");
                      _context6.n = 1;
                      return fetch("".concat(_this6.SHEETS_API, "/").concat(sid, "/values/").concat(encodeURIComponent(clearRange), ":clear"), {
                        method: 'POST',
                        headers: auth,
                        body: JSON.stringify({})
                      }).catch(function () {});
                    case 1:
                      if (rows.length) {
                        _context6.n = 2;
                        break;
                      }
                      return _context6.a(2);
                    case 2:
                      values = rows.map(function (r) {
                        return serialize(r, cols);
                      });
                      writeRange = "".concat(sheetName, "!A2:").concat(lastCol).concat(values.length + 1);
                      _context6.n = 3;
                      return fetch("".concat(_this6.SHEETS_API, "/").concat(sid, "/values/").concat(encodeURIComponent(writeRange), "?valueInputOption=RAW"), {
                        method: 'PUT',
                        headers: auth,
                        body: JSON.stringify({
                          range: writeRange,
                          values: values
                        })
                      });
                    case 3:
                      resp = _context6.v;
                      if (resp.ok) {
                        _context6.n = 5;
                        break;
                      }
                      _context6.n = 4;
                      return resp.text();
                    case 4:
                      txt = _context6.v;
                      throw new Error("Ghi sheet \"".concat(sheetName, "\" th\u1EA5t b\u1EA1i (").concat(resp.status, "): ").concat(txt));
                    case 5:
                      return _context6.a(2);
                  }
                }, _callee6);
              }));
              return function putSheet(_x, _x2, _x3) {
                return _ref3.apply(this, arguments);
              };
            }();
            pct = 20;
            sheets = Object.entries(allData);
            _i = 0, _sheets = sheets;
          case 4:
            if (!(_i < _sheets.length)) {
              _context7.n = 7;
              break;
            }
            _sheets$_i = _slicedToArray(_sheets[_i], 2), sheet = _sheets$_i[0], rows = _sheets$_i[1];
            onProgress === null || onProgress === void 0 || onProgress("\u0110ang \u0111\u1EA9y \"".concat(sheet, "\" (").concat(rows.length, " b\u1EA3n ghi)..."), pct);
            _context7.n = 5;
            return putSheet(sheet, rows, colMap[sheet]);
          case 5:
            pct += 16;
          case 6:
            _i++;
            _context7.n = 4;
            break;
          case 7:
            // Ghi meta
            onProgress === null || onProgress === void 0 || onProgress('Ghi meta...', 88);
            profile = DVAuth.getProfile();
            metaRange = 'meta!A2:B7';
            metaValues = [['lastSync', new Date().toISOString()], ['device', (profile === null || profile === void 0 ? void 0 : profile.deviceId) || 'unknown'], ['user', (profile === null || profile === void 0 ? void 0 : profile.displayName) || ''], ['version', '4.0'], ['docCount', String(allData.docs.length)], ['memberCount', String(allData.members.length)]];
            _context7.n = 8;
            return fetch("".concat(_this6.SHEETS_API, "/").concat(sid, "/values/").concat(encodeURIComponent(metaRange), "?valueInputOption=RAW"), {
              method: 'PUT',
              headers: {
                'Authorization': "Bearer ".concat(token),
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                range: metaRange,
                values: metaValues
              })
            }).catch(function () {});
          case 8:
            onProgress === null || onProgress === void 0 || onProgress('Hoàn tất!', 100);
            if (profile) {
              profile.lastSync = new Date().toISOString();
              DVAuth.saveProfile(profile);
            }
            _dvUpdateSyncBadge('synced', "\u0110\xE3 \u0111\u1ED3ng b\u1ED9 ".concat(new Date().toLocaleTimeString('vi-VN')));
            return _context7.a(2, {
              docCount: allData.docs.length,
              memberCount: allData.members.length
            });
        }
      }, _callee7);
    }))();
  },
  // Pull dữ liệu từ Sheets về
  pullAll: function pullAll(onProgress) {
    var _this7 = this;
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
      var token, cfg, pullRanges, qs, resp, errText, data, parseSheet, _data$valueRanges, docsVR, membersVR, remindersVR, tasksVR, docs, members, reminders, tasks, profile;
      return _regenerator().w(function (_context8) {
        while (1) switch (_context8.n) {
          case 0:
            _context8.n = 1;
            return _this7._getAccessToken();
          case 1:
            token = _context8.v;
            cfg = _this7.getSyncConfig();
            if (cfg !== null && cfg !== void 0 && cfg.spreadsheetId) {
              _context8.n = 2;
              break;
            }
            throw new Error('NO_SPREADSHEET');
          case 2:
            onProgress === null || onProgress === void 0 || onProgress('Đang tải dữ liệu...', 20);

            // URL-encode từng range, giới hạn số cột cụ thể thay vì dùng :Z
            pullRanges = ['docs!A1:N',
            // 14 cols
            'members!A1:N',
            // 14 cols
            'reminders!A1:H',
            // 8 cols
            'tasks!A1:H',
            // 8 cols
            'meta!A1:B'];
            qs = pullRanges.map(function (r) {
              return 'ranges=' + encodeURIComponent(r);
            }).join('&');
            _context8.n = 3;
            return fetch("".concat(_this7.SHEETS_API, "/").concat(cfg.spreadsheetId, "/values:batchGet?").concat(qs), {
              headers: {
                'Authorization': "Bearer ".concat(token)
              }
            });
          case 3:
            resp = _context8.v;
            if (resp.ok) {
              _context8.n = 5;
              break;
            }
            _context8.n = 4;
            return resp.text();
          case 4:
            errText = _context8.v;
            throw new Error("\u0110\u1ECDc Sheet th\u1EA5t b\u1EA1i (".concat(resp.status, "): ").concat(errText));
          case 5:
            _context8.n = 6;
            return resp.json();
          case 6:
            data = _context8.v;
            onProgress === null || onProgress === void 0 || onProgress('Xử lý dữ liệu...', 60);
            parseSheet = function parseSheet(vr) {
              if (!(vr !== null && vr !== void 0 && vr.values) || vr.values.length < 2) return [];
              var headers = vr.values[0];
              return vr.values.slice(1).map(function (row) {
                var obj = {};
                headers.forEach(function (h, i) {
                  obj[h] = row[i] || '';
                });
                return obj;
              }).filter(function (r) {
                return r.id;
              });
            };
            _data$valueRanges = _slicedToArray(data.valueRanges, 4), docsVR = _data$valueRanges[0], membersVR = _data$valueRanges[1], remindersVR = _data$valueRanges[2], tasksVR = _data$valueRanges[3];
            if (typeof DB !== 'undefined') {
              docs = parseSheet(docsVR);
              members = parseSheet(membersVR);
              reminders = parseSheet(remindersVR);
              tasks = parseSheet(tasksVR);
              if (docs.length) DB.set('docs', docs);
              if (members.length) DB.set('membersList', members);
              if (reminders.length) DB.set('reminders', reminders);
              if (tasks.length) DB.set('tasks', tasks);
            }
            onProgress === null || onProgress === void 0 || onProgress('Hoàn tất!', 100);
            profile = DVAuth.getProfile();
            if (profile) {
              profile.lastSync = new Date().toISOString();
              DVAuth.saveProfile(profile);
            }
            _dvUpdateSyncBadge('synced', "\u0110\xE3 t\u1EA3i v\u1EC1 ".concat(new Date().toLocaleTimeString('vi-VN')));
            if (typeof updateBadges === 'function') updateBadges();
            if (typeof refreshDashboard === 'function') refreshDashboard();
          case 7:
            return _context8.a(2);
        }
      }, _callee8);
    }))();
  },
  // Kiểm tra kết nối (test token)
  testConnection: function testConnection(serviceAccountJson) {
    var _this8 = this;
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
      var tmpCfg, origCfg, _t4;
      return _regenerator().w(function (_context9) {
        while (1) switch (_context9.p = _context9.n) {
          case 0:
            _context9.p = 0;
            tmpCfg = _this8.getSyncConfig() || {};
            origCfg = _objectSpread({}, tmpCfg);
            _this8.saveSyncConfig(_objectSpread(_objectSpread({}, tmpCfg), {}, {
              serviceAccountJson: serviceAccountJson
            }));
            _this8._tokenCache = null;
            _context9.n = 1;
            return _this8._getAccessToken(true);
          case 1:
            _this8.saveSyncConfig(origCfg); // restore
            _this8._tokenCache = null;
            return _context9.a(2, {
              ok: true
            });
          case 2:
            _context9.p = 2;
            _t4 = _context9.v;
            return _context9.a(2, {
              ok: false,
              error: _t4.message
            });
        }
      }, _callee9, null, [[0, 2]]);
    }))();
  }
};
function _dvUpdateSyncBadge(state, label) {
  var badge = document.getElementById('dvSyncBadge');
  var lbl = document.getElementById('dvSyncLabel');
  if (!badge) return;
  badge.className = '';
  badge.id = 'dvSyncBadge';
  if (state) badge.classList.add(state);
  var icons = {
    syncing: 'fa-spinner fa-spin',
    synced: 'fa-check-circle',
    error: 'fa-exclamation-circle',
    '': 'fa-cloud'
  };
  var icon = icons[state] || 'fa-cloud';
  badge.innerHTML = "<i class=\"fas ".concat(icon, "\"></i><span id=\"dvSyncLabel\">").concat(label, "</span>");
}
function dvManualSync() {
  return _dvManualSync.apply(this, arguments);
}
function _dvManualSync() {
  _dvManualSync = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0() {
    var cfg, msg, _t5;
    return _regenerator().w(function (_context0) {
      while (1) switch (_context0.p = _context0.n) {
        case 0:
          cfg = GSheetSync.getSyncConfig();
          if (cfg !== null && cfg !== void 0 && cfg.serviceAccountJson) {
            _context0.n = 1;
            break;
          }
          dvOpenSyncModal();
          return _context0.a(2);
        case 1:
          if (cfg !== null && cfg !== void 0 && cfg.spreadsheetId) {
            _context0.n = 2;
            break;
          }
          _dvUpdateSyncBadge('error', 'Thiếu Spreadsheet ID');
          if (typeof toast === 'function') toast('<i class="fas fa-exclamation-triangle" style="color:#f59e0b"></i> ' + 'Chưa nhập Spreadsheet ID. Vào <b>Cấu hình đồng bộ</b>, tạo Google Sheet, ' + 'share cho Service Account rồi dán ID vào ô "Spreadsheet ID".', 'warning');
          dvOpenSyncModal();
          return _context0.a(2);
        case 2:
          _dvUpdateSyncBadge('syncing', 'Đang đồng bộ...');
          _context0.p = 3;
          _context0.n = 4;
          return GSheetSync.pushAll(function (_msg, _pct) {});
        case 4:
          if (typeof toast === 'function') toast('<i class="fas fa-check-circle" style="color:#16a34a"></i> Đồng bộ thành công!', 'success');
          _context0.n = 6;
          break;
        case 5:
          _context0.p = 5;
          _t5 = _context0.v;
          _dvUpdateSyncBadge('error', 'Lỗi đồng bộ');
          msg = _t5.message === 'NO_SPREADSHEET_ID' ? 'Chưa nhập Spreadsheet ID. Vào Cấu hình đồng bộ để thêm.' : _t5.message;
          if (typeof toast === 'function') toast('Lỗi đồng bộ: ' + msg, 'error');
        case 6:
          return _context0.a(2);
      }
    }, _callee0, null, [[3, 5]]);
  }));
  return _dvManualSync.apply(this, arguments);
}
function dvInitSync() {
  var cfg = GSheetSync.getSyncConfig();
  if (!(cfg !== null && cfg !== void 0 && cfg.serviceAccountJson)) {
    _dvUpdateSyncBadge('', 'Chưa cấu hình');
  } else {
    _dvUpdateSyncBadge('synced', 'Đã kết nối');
    // Auto-sync khi khởi động (pull dữ liệu mới nhất)
    if (cfg.autoSync !== false) {
      setTimeout(function () {
        return dvManualSync();
      }, 2000);
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
  var modal = document.createElement('div');
  modal.id = 'dvSyncModal';
  modal.className = 'modal-overlay';
  var cfg = GSheetSync.getSyncConfig() || {};
  var profile = DVAuth.getProfile();
  var hasKey = !!cfg.serviceAccountJson;
  var hasSid = !!cfg.spreadsheetId;
  modal.innerHTML = "\n<div class=\"modal\" style=\"max-width:580px\">\n  <div class=\"modal-header\">\n    <h2 style=\"display:flex;align-items:center;gap:10px\">\n      <span style=\"width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#0284c7,#16a34a);display:flex;align-items:center;justify-content:center;flex-shrink:0\">\n        <i class=\"fas fa-sync-alt\" style=\"color:#fff;font-size:0.85rem\"></i>\n      </span>C\u1EA5u h\xECnh \u0111\u1ED3ng b\u1ED9 \u0111\xE1m m\xE2y</h2>\n    <button class=\"btn btn-ghost\" onclick=\"document.getElementById('dvSyncModal').classList.remove('open')\"><i class=\"fas fa-times\"></i></button>\n  </div>\n  <div class=\"modal-body\" style=\"padding:20px\">\n\n    <!-- TABS -->\n    <div class=\"tabs\" style=\"margin-bottom:16px\">\n      <button class=\"tab-btn active\" onclick=\"dvSyncTab(this,'pc')\">\uD83D\uDCBB C\u1EA5u h\xECnh tr\xEAn PC</button>\n      <button class=\"tab-btn\" onclick=\"dvSyncTab(this,'mobile')\">\uD83D\uDCF1 \u0110\u0103ng nh\u1EADp Mobile</button>\n      <button class=\"tab-btn\" onclick=\"dvSyncTab(this,'status')\">\uD83D\uDCCA Tr\u1EA1ng th\xE1i</button>\n    </div>\n\n    <!-- TAB: PC SETUP -->\n    <div id=\"dvSyncTabPC\" class=\"tab-content active\">\n      <div class=\"dv-sync-step\">\n        <div class=\"dv-sync-step-num\">1</div>\n        <div style=\"flex:1\">\n          <div style=\"font-weight:700;color:var(--navy);margin-bottom:4px\">Service Account Key (JSON)</div>\n          <div style=\"font-size:0.76rem;color:var(--gray);margin-bottom:10px\">\n            V\xE0o <a href=\"https://console.cloud.google.com/iam-admin/serviceaccounts\" target=\"_blank\" style=\"color:var(--red);font-weight:600\">Google Cloud Console</a>\n            \u2192 T\u1EA1o Service Account \u2192 T\u1EA1o key JSON \u2192 Chia s\u1EBB email service account quy\u1EC1n <strong>Editor</strong> v\xE0o Google Sheet c\u1EE7a b\u1EA1n.\n          </div>\n\n          <!-- Upload drop zone -->\n          <div id=\"dvSADropZone\"\n            ondragover=\"dvSADragOver(event)\" ondragleave=\"dvSADragLeave(event)\" ondrop=\"dvSADrop(event)\"\n            onclick=\"document.getElementById('dvSAFileInput').click()\"\n            style=\"border:2px dashed var(--gray-light);border-radius:10px;padding:18px 14px;text-align:center;cursor:pointer;transition:all 0.2s;background:rgba(26,35,64,0.02);margin-bottom:10px;position:relative\">\n            <input type=\"file\" id=\"dvSAFileInput\" accept=\".json,application/json\" style=\"display:none\" onchange=\"dvSAFileSelected(this)\">\n            <div id=\"dvSADropContent\">\n              ".concat(hasKey ? '<div style="color:#16a34a;font-size:0.88rem;font-weight:700"><i class="fas fa-check-circle"></i> Key đã lưu</div><div style="font-size:0.75rem;color:var(--gray);margin-top:4px">Kéo thả hoặc bấm để thay thế file mới</div>' : '<i class="fas fa-file-upload" style="font-size:1.8rem;color:var(--gray-light);margin-bottom:8px;display:block"></i><div style="font-weight:600;color:var(--navy);font-size:0.85rem">Kéo thả file JSON vào đây</div><div style="font-size:0.75rem;color:var(--gray);margin-top:4px">hoặc <span style="color:var(--red);font-weight:600">bấm để chọn file</span></div>', "\n            </div>\n          </div>\n\n          <!-- Paste fallback (collapsible) -->\n          <details id=\"dvSAPasteDetails\" style=\"margin-bottom:8px\">\n            <summary style=\"font-size:0.75rem;color:var(--gray);cursor:pointer;user-select:none;padding:4px 0\">\n              <i class=\"fas fa-keyboard\" style=\"margin-right:4px\"></i>Ho\u1EB7c d\xE1n JSON th\u1EE7 c\xF4ng\n            </summary>\n            <textarea class=\"form-control\" id=\"dvSAKeyInput\" rows=\"4\"\n              placeholder='{\"type\":\"service_account\",\"project_id\":\"...\",\"private_key\":\"-----BEGIN...\",\"client_email\":\"...@....iam.gserviceaccount.com\",...}'\n              style=\"font-family:monospace;font-size:0.7rem;margin-top:8px;resize:vertical\"\n              oninput=\"dvSAInputChanged(this.value)\">").concat(hasKey ? '*** (đã lưu — dán mới để cập nhật) ***' : '', "</textarea>\n          </details>\n\n          <!-- Extracted info preview -->\n          <div id=\"dvSAPreview\" style=\"display:none;background:rgba(22,163,74,0.06);border:1px solid rgba(22,163,74,0.2);border-radius:8px;padding:10px 12px;font-size:0.78rem;margin-bottom:8px\">\n            <div style=\"font-weight:700;color:#15803d;margin-bottom:6px\"><i class=\"fas fa-id-card\"></i> Th\xF4ng tin Service Account</div>\n            <div style=\"display:grid;gap:4px\">\n              <div><span style=\"color:var(--gray)\">Email:</span> <strong id=\"dvSAEmail\" style=\"color:var(--navy)\"></strong></div>\n              <div><span style=\"color:var(--gray)\">Project:</span> <strong id=\"dvSAProject\" style=\"color:var(--navy)\"></strong></div>\n              <div><span style=\"color:var(--gray)\">Key ID:</span> <code id=\"dvSAKeyId\" style=\"font-size:0.72rem\"></code></div>\n            </div>\n          </div>\n\n          <div style=\"display:flex;gap:8px;align-items:center\">\n            <button class=\"btn btn-outline btn-sm\" onclick=\"dvTestSAKey()\">\n              <i class=\"fas fa-vial\"></i> Ki\u1EC3m tra k\u1EBFt n\u1ED1i\n            </button>\n            <button class=\"btn btn-ghost btn-sm\" id=\"dvSAClearBtn\" onclick=\"dvSAClear()\" style=\"display:none;color:var(--gray)\">\n              <i class=\"fas fa-times\"></i> Xo\xE1\n            </button>\n          </div>\n          <div id=\"dvSATestResult\" style=\"font-size:0.78rem;min-height:18px;margin-top:6px\"></div>\n        </div>\n      </div>\n\n      <div class=\"dv-sync-step\">\n        <div class=\"dv-sync-step-num\">2</div>\n        <div style=\"flex:1\">\n          <div style=\"font-weight:700;color:var(--navy);margin-bottom:4px\">\n            ID Google Sheet <span style=\"color:#dc2626;font-size:0.8rem\">*b\u1EAFt bu\u1ED9c</span>\n          </div>\n          <div style=\"font-size:0.76rem;color:var(--gray);margin-bottom:6px\">\n            T\u1EA1o Google Sheet m\u1EDBi \u2192 Share cho <b>email Service Account</b> \u1EDF tr\xEAn quy\u1EC1n <b>Ng\u01B0\u1EDDi ch\u1EC9nh s\u1EEDa</b> \u2192 Sao ch\xE9p ID t\u1EEB URL v\xE0 d\xE1n v\xE0o \u0111\xE2y.\n          </div>\n          <div style=\"font-size:0.72rem;color:#0284c7;background:rgba(2,132,199,0.07);border-radius:6px;padding:5px 8px;margin-bottom:8px\">\n            <i class=\"fas fa-info-circle\"></i>\n            URL: docs.google.com/spreadsheets/d/<b style=\"color:#dc2626\">ID_c\u1EA7n_sao_ch\xE9p</b>/edit\n          </div>\n          <input class=\"form-control\" id=\"dvSheetIdInput\" placeholder=\"B\u1EAFt bu\u1ED9c \u2014 d\xE1n Spreadsheet ID v\xE0o \u0111\xE2y\"\n            value=\"").concat(cfg.spreadsheetId || '', "\" style=\"font-family:monospace;font-size:0.78rem;").concat(!hasSid ? 'border-color:#f59e0b' : '', "\">\n          ").concat(hasSid ? "<div style=\"font-size:0.72rem;margin-top:4px;color:#16a34a\"><i class=\"fas fa-external-link-alt\"></i> <a href=\"https://docs.google.com/spreadsheets/d/".concat(cfg.spreadsheetId, "\" target=\"_blank\" style=\"color:#16a34a\">M\u1EDF Google Sheet</a></div>") : '<div style="font-size:0.72rem;margin-top:4px;color:#f59e0b"><i class="fas fa-exclamation-triangle"></i> Chưa có ID — đồng bộ sẽ không hoạt động nếu để trống</div>', "\n        </div>\n      </div>\n\n      <div class=\"dv-sync-step\">\n        <div class=\"dv-sync-step-num\">3</div>\n        <div style=\"flex:1\">\n          <div style=\"font-weight:700;color:var(--navy);margin-bottom:4px\">C\xE0i \u0111\u1EB7t \u0111\u1ED3ng b\u1ED9</div>\n          <label style=\"display:flex;align-items:center;gap:8px;font-size:0.82rem;cursor:pointer;margin-bottom:8px\">\n            <input type=\"checkbox\" id=\"dvAutoSync\" ").concat(cfg.autoSync !== false ? 'checked' : '', "> T\u1EF1 \u0111\u1ED9ng \u0111\u1ED3ng b\u1ED9 khi kh\u1EDFi \u0111\u1ED9ng\n          </label>\n          <label style=\"display:flex;align-items:center;gap:8px;font-size:0.82rem;cursor:pointer\">\n            <input type=\"checkbox\" id=\"dvAutoSyncEdit\" ").concat(cfg.autoSyncOnEdit ? 'checked' : '', "> T\u1EF1 \u0111\u1ED9ng push sau m\u1ED7i thay \u0111\u1ED5i\n          </label>\n        </div>\n      </div>\n\n      <div style=\"display:flex;gap:8px;margin-top:14px\">\n        <button class=\"btn btn-primary\" onclick=\"dvSaveSyncConfig()\" style=\"flex:1\">\n          <i class=\"fas fa-save\"></i> L\u01B0u & K\u1EBFt n\u1ED1i\n        </button>\n        <button class=\"btn btn-gold\" onclick=\"dvSyncNow('push')\" ").concat(!hasKey ? 'disabled' : '', ">\n          <i class=\"fas fa-cloud-upload-alt\"></i> \u0110\u1EA9y l\xEAn ngay\n        </button>\n        <button class=\"btn btn-outline\" onclick=\"dvSyncNow('pull')\" ").concat(!hasKey ? 'disabled' : '', ">\n          <i class=\"fas fa-cloud-download-alt\"></i> T\u1EA3i v\u1EC1\n        </button>\n      </div>\n    </div>\n\n    <!-- TAB: MOBILE LOGIN -->\n    <div id=\"dvSyncTabMobile\" class=\"tab-content\">\n      <div style=\"background:rgba(26,35,64,0.05);border-radius:12px;padding:16px;margin-bottom:16px;text-align:center\">\n        <div style=\"font-size:0.78rem;color:var(--gray);margin-bottom:8px\">Tr\xEAn PC, t\u1EA1o Sync Code r\u1ED3i nh\u1EADp v\xE0o mobile:</div>\n        <div style=\"display:flex;gap:8px;justify-content:center;margin-bottom:10px\">\n          <button class=\"btn btn-gold\" onclick=\"dvGenerateSyncCode()\">\n            <i class=\"fas fa-qrcode\"></i> T\u1EA1o Sync Code (PC)\n          </button>\n        </div>\n        <div id=\"dvSyncCodeDisplay\" style=\"display:none\">\n          <div class=\"dv-sync-code-box\" id=\"dvSyncCodeVal\" onclick=\"dvCopySyncCode()\">---</div>\n          <div style=\"font-size:0.72rem;color:var(--gray);margin-top:6px\">Nh\u1EA5n \u0111\u1EC3 sao ch\xE9p \xB7 Code h\u1EBFt h\u1EA1n sau 24 gi\u1EDD</div>\n        </div>\n      </div>\n\n      <div style=\"border-top:1px solid var(--gray-light);padding-top:14px\">\n        <div style=\"font-weight:700;color:var(--navy);margin-bottom:8px;font-size:0.85rem\">\uD83D\uDCF1 Nh\u1EADp Sync Code tr\xEAn thi\u1EBFt b\u1ECB n\xE0y</div>\n        <input class=\"form-control\" id=\"dvSyncCodeInput\" placeholder=\"Nh\u1EADp Sync Code t\u1EEB PC...\"\n          style=\"letter-spacing:4px;font-family:monospace;font-size:1.1rem;text-align:center;text-transform:uppercase\"\n          maxlength=\"16\" oninput=\"this.value=this.value.toUpperCase()\">\n        <button class=\"btn btn-primary\" onclick=\"dvApplySyncCode()\" style=\"width:100%;margin-top:10px\">\n          <i class=\"fas fa-link\"></i> K\u1EBFt n\u1ED1i & T\u1EA3i d\u1EEF li\u1EC7u\n        </button>\n        <div id=\"dvSyncCodeResult\" style=\"font-size:0.78rem;min-height:18px;margin-top:8px;text-align:center\"></div>\n      </div>\n    </div>\n\n    <!-- TAB: STATUS -->\n    <div id=\"dvSyncTabStatus\" class=\"tab-content\">\n      <div id=\"dvSyncStatusContent\">\n        <div style=\"font-size:0.78rem;color:var(--gray);text-align:center;padding:20px\">\n          <i class=\"fas fa-spinner fa-spin\"></i> \u0110ang t\u1EA3i...\n        </div>\n      </div>\n    </div>\n\n  </div>\n  <div class=\"modal-footer\">\n    <div style=\"font-size:0.72rem;color:var(--gray);flex:1\">D\u1EEF li\u1EC7u \u0111\u01B0\u1EE3c m\xE3 ho\xE1 v\xE0 l\u01B0u tr\xEAn Google Sheet c\xE1 nh\xE2n c\u1EE7a b\u1EA1n</div>\n    <button class=\"btn btn-outline\" onclick=\"document.getElementById('dvSyncModal').classList.remove('open')\">\u0110\xF3ng</button>\n  </div>\n</div>");
  document.body.appendChild(modal);
  modal.addEventListener('click', function (e) {
    if (e.target === modal) modal.classList.remove('open');
  });
  setTimeout(function () {
    return modal.classList.add('open');
  }, 10);
}
function dvSyncTab(btn, tab) {
  var _document$getElementB6;
  document.querySelectorAll('#dvSyncModal .tab-btn').forEach(function (b) {
    return b.classList.remove('active');
  });
  document.querySelectorAll('#dvSyncModal .tab-content').forEach(function (c) {
    return c.classList.remove('active');
  });
  btn.classList.add('active');
  (_document$getElementB6 = document.getElementById("dvSyncTab".concat(tab.charAt(0).toUpperCase() + tab.slice(1)))) === null || _document$getElementB6 === void 0 || _document$getElementB6.classList.add('active');
  if (tab === 'status') dvRenderSyncStatus();
}
function dvRenderSyncStatus() {
  var cfg = GSheetSync.getSyncConfig() || {};
  var profile = DVAuth.getProfile();
  var el = document.getElementById('dvSyncStatusContent');
  if (!el) return;
  var docsCount = typeof DB !== 'undefined' ? (DB.get('docs') || []).length : 0;
  var membCount = typeof DB !== 'undefined' ? (DB.get('membersList') || []).length : 0;
  var taskCount = typeof DB !== 'undefined' ? (DB.get('tasks') || []).length : 0;
  var lastSync = profile !== null && profile !== void 0 && profile.lastSync ? new Date(profile.lastSync).toLocaleString('vi-VN') : 'Chưa đồng bộ';
  el.innerHTML = "\n<div class=\"dv-status-row\"><span>Tr\u1EA1ng th\xE1i k\u1EBFt n\u1ED1i</span><span style=\"font-weight:700;color:".concat(cfg.serviceAccountJson ? '#16a34a' : 'var(--gray)', "\">\n  ").concat(cfg.serviceAccountJson ? '<i class="fas fa-check-circle"></i> Đã kết nối' : 'Chưa cấu hình', "\n</span></div>\n<div class=\"dv-status-row\"><span>Google Sheet</span>\n  <span style=\"font-size:0.75rem\">").concat(cfg.spreadsheetId ? "<a href=\"https://docs.google.com/spreadsheets/d/".concat(cfg.spreadsheetId, "\" target=\"_blank\" style=\"color:#0284c7\">M\u1EDF Sheet</a>") : 'Chưa có', "</span>\n</div>\n<div class=\"dv-status-row\"><span>T\xE0i kho\u1EA3n</span><span style=\"font-weight:700\">").concat((profile === null || profile === void 0 ? void 0 : profile.displayName) || 'Chưa đăng nhập', "</span></div>\n<div class=\"dv-status-row\"><span>L\u1EA7n cu\u1ED1i \u0111\u1ED3ng b\u1ED9</span><span style=\"font-size:0.78rem\">").concat(lastSync, "</span></div>\n<div class=\"dv-status-row\"><span>V\u0103n b\u1EA3n c\u1EE5c b\u1ED9</span><span style=\"font-weight:700;color:var(--navy)\">").concat(docsCount, "</span></div>\n<div class=\"dv-status-row\"><span>\u0110o\xE0n vi\xEAn</span><span style=\"font-weight:700;color:var(--navy)\">").concat(membCount, "</span></div>\n<div class=\"dv-status-row\"><span>C\xF4ng vi\u1EC7c</span><span style=\"font-weight:700;color:var(--navy)\">").concat(taskCount, "</span></div>\n<div style=\"margin-top:14px\">\n  <div id=\"dvSyncProgressBar\" style=\"display:none;margin-bottom:10px\">\n    <div class=\"progress-bar\"><div class=\"progress-fill\" id=\"dvSyncProgressFill\" style=\"width:0%\"></div></div>\n    <div style=\"font-size:0.72rem;color:var(--gray);margin-top:4px\" id=\"dvSyncProgressMsg\"></div>\n  </div>\n  <div style=\"display:flex;gap:8px\">\n    <button class=\"btn btn-gold\" onclick=\"dvSyncNow('push')\" ").concat(!cfg.serviceAccountJson ? 'disabled' : '', " style=\"flex:1\">\n      <i class=\"fas fa-cloud-upload-alt\"></i> \u0110\u1EA9y l\xEAn Google Sheet\n    </button>\n    <button class=\"btn btn-outline\" onclick=\"dvSyncNow('pull')\" ").concat(!cfg.serviceAccountJson ? 'disabled' : '', " style=\"flex:1\">\n      <i class=\"fas fa-cloud-download-alt\"></i> T\u1EA3i v\u1EC1 t\u1EEB Sheet\n    </button>\n  </div>\n</div>");
}

// ── SA Key file upload & parsing functions ─────────────────────────────────

// Shared: parse and validate JSON string, populate preview
function dvSAParseAndPreview(jsonStr) {
  try {
    var sa = JSON.parse(jsonStr);
    // Validate required fields
    if (sa.type !== 'service_account') throw new Error('Không phải Service Account key (type != service_account)');
    if (!sa.private_key) throw new Error('Thiếu trường private_key');
    if (!sa.client_email) throw new Error('Thiếu trường client_email');
    if (!sa.project_id) throw new Error('Thiếu trường project_id');

    // Show preview card
    var preview = document.getElementById('dvSAPreview');
    var emailEl = document.getElementById('dvSAEmail');
    var projectEl = document.getElementById('dvSAProject');
    var keyIdEl = document.getElementById('dvSAKeyId');
    if (preview) preview.style.display = 'block';
    if (emailEl) emailEl.textContent = sa.client_email;
    if (projectEl) projectEl.textContent = sa.project_id;
    if (keyIdEl) keyIdEl.textContent = (sa.private_key_id || '').substring(0, 16) + '...';

    // Show clear button
    var clearBtn = document.getElementById('dvSAClearBtn');
    if (clearBtn) clearBtn.style.display = 'inline-flex';

    // Store parsed JSON in textarea (hidden in details)
    var ta = document.getElementById('dvSAKeyInput');
    if (ta) ta.value = jsonStr;

    // Reset test result
    var resEl = document.getElementById('dvSATestResult');
    if (resEl) resEl.innerHTML = '';
    return {
      ok: true,
      sa: sa
    };
  } catch (e) {
    return {
      ok: false,
      error: e.message
    };
  }
}

// Drag-and-drop handlers
function dvSADragOver(e) {
  e.preventDefault();
  var zone = document.getElementById('dvSADropZone');
  if (zone) {
    zone.style.borderColor = 'var(--red)';
    zone.style.background = 'rgba(192,57,43,0.04)';
    zone.style.transform = 'scale(1.01)';
  }
}
function dvSADragLeave(e) {
  var zone = document.getElementById('dvSADropZone');
  if (zone) {
    zone.style.borderColor = 'var(--gray-light)';
    zone.style.background = 'rgba(26,35,64,0.02)';
    zone.style.transform = '';
  }
}
function dvSADrop(e) {
  var _e$dataTransfer;
  e.preventDefault();
  dvSADragLeave(e);
  var file = (_e$dataTransfer = e.dataTransfer) === null || _e$dataTransfer === void 0 || (_e$dataTransfer = _e$dataTransfer.files) === null || _e$dataTransfer === void 0 ? void 0 : _e$dataTransfer[0];
  if (file) dvSAReadFile(file);
}

// File input change
function dvSAFileSelected(input) {
  var _input$files;
  var file = (_input$files = input.files) === null || _input$files === void 0 ? void 0 : _input$files[0];
  if (file) dvSAReadFile(file);
  input.value = ''; // reset so same file can be re-selected
}

// Core: read File → parse → preview
function dvSAReadFile(file) {
  if (!file) return;

  // Validate file type
  if (!file.name.endsWith('.json') && file.type !== 'application/json' && file.type !== 'text/plain') {
    if (typeof toast === 'function') toast('Vui lòng chọn file .json', 'error');
    return;
  }
  if (file.size > 10 * 1024) {
    // 10KB max — SA key files are tiny
    if (typeof toast === 'function') toast('File quá lớn (tối đa 10KB). Vui lòng chọn đúng file Service Account JSON.', 'error');
    return;
  }
  var reader = new FileReader();
  reader.onload = function (ev) {
    var text = ev.target.result;
    var result = dvSAParseAndPreview(text);
    var dropContent = document.getElementById('dvSADropContent');
    var zone = document.getElementById('dvSADropZone');
    if (result.ok) {
      // Update drop zone to success state
      if (dropContent) {
        var sa = result.sa;
        dropContent.innerHTML = "\n          <i class=\"fas fa-check-circle\" style=\"color:#16a34a;font-size:1.4rem;margin-bottom:6px;display:block\"></i>\n          <div style=\"font-weight:700;color:#15803d;font-size:0.85rem\">".concat(file.name, "</div>\n          <div style=\"font-size:0.72rem;color:var(--gray);margin-top:3px\">").concat((file.size / 1024).toFixed(1), " KB \xB7 ").concat(sa.client_email.split('@')[0], "</div>\n        ");
      }
      if (zone) {
        zone.style.borderColor = 'rgba(22,163,74,0.4)';
        zone.style.background = 'rgba(22,163,74,0.04)';
      }
      if (typeof toast === 'function') toast('<i class="fas fa-check-circle" style="color:#16a34a"></i> Đọc file thành công! Kiểm tra thông tin bên dưới.', 'success');
    } else {
      if (typeof toast === 'function') toast('<i class="fas fa-times-circle" style="color:red"></i> ' + result.error, 'error');
      if (zone) {
        zone.style.borderColor = 'rgba(192,57,43,0.4)';
        zone.style.background = 'rgba(192,57,43,0.04)';
      }
    }
  };
  reader.onerror = function () {
    if (typeof toast === 'function') toast('Không đọc được file', 'error');
  };
  reader.readAsText(file, 'utf-8');
}

// Textarea manual paste handler
function dvSAInputChanged(val) {
  if (!val || val.startsWith('***')) return;
  var trimmed = val.trim();
  if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
    var result = dvSAParseAndPreview(trimmed);
    if (!result.ok) {
      var resEl = document.getElementById('dvSATestResult');
      if (resEl) resEl.innerHTML = "<span style=\"color:orange\"><i class=\"fas fa-exclamation-triangle\"></i> ".concat(result.error, "</span>");
    }
  }
}

// Clear SA key
function dvSAClear() {
  var ta = document.getElementById('dvSAKeyInput');
  if (ta) ta.value = '';
  var preview = document.getElementById('dvSAPreview');
  if (preview) preview.style.display = 'none';
  var clearBtn = document.getElementById('dvSAClearBtn');
  if (clearBtn) clearBtn.style.display = 'none';
  var zone = document.getElementById('dvSADropZone');
  if (zone) {
    zone.style.borderColor = 'var(--gray-light)';
    zone.style.background = 'rgba(26,35,64,0.02)';
  }
  var dropContent = document.getElementById('dvSADropContent');
  if (dropContent) dropContent.innerHTML = "\n    <i class=\"fas fa-file-upload\" style=\"font-size:1.8rem;color:var(--gray-light);margin-bottom:8px;display:block\"></i>\n    <div style=\"font-weight:600;color:var(--navy);font-size:0.85rem\">K\xE9o th\u1EA3 file JSON v\xE0o \u0111\xE2y</div>\n    <div style=\"font-size:0.75rem;color:var(--gray);margin-top:4px\">ho\u1EB7c <span style=\"color:var(--red);font-weight:600\">b\u1EA5m \u0111\u1EC3 ch\u1ECDn file</span></div>\n  ";
  var resEl = document.getElementById('dvSATestResult');
  if (resEl) resEl.innerHTML = '';
  if (typeof toast === 'function') toast('Đã xoá Service Account Key', 'info');
}
function dvSaveSyncConfig() {
  return _dvSaveSyncConfig.apply(this, arguments);
}
function _dvSaveSyncConfig() {
  _dvSaveSyncConfig = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1() {
    var _document$getElementB9, _document$getElementB0, _document$getElementB1, _document$getElementB10, _document$getElementB11, _document$getElementB12, _document$getElementB13;
    var keyInput, sheetId, autoSync, autoSyncEdit, existing, newCfg, finalSheetId, input, _t6;
    return _regenerator().w(function (_context1) {
      while (1) switch (_context1.p = _context1.n) {
        case 0:
          keyInput = (_document$getElementB9 = document.getElementById('dvSAKeyInput')) === null || _document$getElementB9 === void 0 ? void 0 : _document$getElementB9.value.trim();
          sheetId = (_document$getElementB0 = document.getElementById('dvSheetIdInput')) === null || _document$getElementB0 === void 0 ? void 0 : _document$getElementB0.value.trim();
          autoSync = (_document$getElementB1 = (_document$getElementB10 = document.getElementById('dvAutoSync')) === null || _document$getElementB10 === void 0 ? void 0 : _document$getElementB10.checked) !== null && _document$getElementB1 !== void 0 ? _document$getElementB1 : true;
          autoSyncEdit = (_document$getElementB11 = (_document$getElementB12 = document.getElementById('dvAutoSyncEdit')) === null || _document$getElementB12 === void 0 ? void 0 : _document$getElementB12.checked) !== null && _document$getElementB11 !== void 0 ? _document$getElementB11 : false;
          existing = GSheetSync.getSyncConfig() || {};
          newCfg = _objectSpread(_objectSpread({}, existing), {}, {
            autoSync: autoSync,
            autoSyncEdit: autoSyncEdit
          }); // Validate: phải có Spreadsheet ID (mới nhập hoặc đã lưu trước)
          finalSheetId = sheetId || existing.spreadsheetId;
          if (finalSheetId) {
            _context1.n = 1;
            break;
          }
          input = document.getElementById('dvSheetIdInput');
          if (input) {
            input.style.borderColor = '#dc2626';
            input.focus();
          }
          if (typeof toast === 'function') toast('<i class="fas fa-exclamation-triangle" style="color:#dc2626"></i> ' + 'Vui lòng nhập Spreadsheet ID trước khi lưu!', 'error');
          return _context1.a(2);
        case 1:
          newCfg.spreadsheetId = finalSheetId;
          if (!(keyInput && !keyInput.startsWith('***'))) {
            _context1.n = 4;
            break;
          }
          _context1.p = 2;
          JSON.parse(keyInput);
          newCfg.serviceAccountJson = keyInput;
          _context1.n = 4;
          break;
        case 3:
          _context1.p = 3;
          _t6 = _context1.v;
          if (typeof toast === 'function') toast('JSON không hợp lệ!', 'error');
          return _context1.a(2);
        case 4:
          GSheetSync.saveSyncConfig(newCfg);
          (_document$getElementB13 = document.getElementById('dvSyncModal')) === null || _document$getElementB13 === void 0 || _document$getElementB13.classList.remove('open');
          _dvUpdateSyncBadge('synced', 'Đã kết nối');
          if (typeof toast === 'function') toast('<i class="fas fa-check-circle" style="color:#16a34a"></i> Đã lưu cấu hình đồng bộ!', 'success');
          dvInitSync();
        case 5:
          return _context1.a(2);
      }
    }, _callee1, null, [[2, 3]]);
  }));
  return _dvSaveSyncConfig.apply(this, arguments);
}
function dvTestSAKey() {
  return _dvTestSAKey.apply(this, arguments);
}
function _dvTestSAKey() {
  _dvTestSAKey = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10() {
    var _document$getElementB14;
    var keyInput, resEl, parsed, r, _t7, _t8;
    return _regenerator().w(function (_context10) {
      while (1) switch (_context10.p = _context10.n) {
        case 0:
          keyInput = (_document$getElementB14 = document.getElementById('dvSAKeyInput')) === null || _document$getElementB14 === void 0 ? void 0 : _document$getElementB14.value.trim();
          resEl = document.getElementById('dvSATestResult');
          if (resEl) {
            _context10.n = 1;
            break;
          }
          return _context10.a(2);
        case 1:
          if (!(!keyInput || keyInput.startsWith('***'))) {
            _context10.n = 2;
            break;
          }
          resEl.innerHTML = '<span style="color:orange"><i class="fas fa-exclamation-triangle"></i> Vui lòng upload hoặc dán JSON key trước</span>';
          return _context10.a(2);
        case 2:
          _context10.p = 2;
          parsed = JSON.parse(keyInput);
          _context10.n = 4;
          break;
        case 3:
          _context10.p = 3;
          _t7 = _context10.v;
          resEl.innerHTML = '<span style="color:red"><i class="fas fa-times-circle"></i> JSON không hợp lệ</span>';
          return _context10.a(2);
        case 4:
          if (!(parsed.type !== 'service_account')) {
            _context10.n = 5;
            break;
          }
          resEl.innerHTML = '<span style="color:red"><i class="fas fa-times-circle"></i> Không phải Service Account key</span>';
          return _context10.a(2);
        case 5:
          resEl.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang kết nối Google API...';
          _context10.p = 6;
          _context10.n = 7;
          return GSheetSync.testConnection(keyInput);
        case 7:
          r = _context10.v;
          if (r.ok) {
            resEl.innerHTML = '<span style="color:#16a34a"><i class="fas fa-check-circle"></i> Kết nối thành công! Sẵn sàng đồng bộ.</span>';
            // Auto-show preview if not already shown
            dvSAParseAndPreview(keyInput);
          } else {
            resEl.innerHTML = "<span style=\"color:red\"><i class=\"fas fa-times-circle\"></i> L\u1ED7i: ".concat(r.error, "</span>");
          }
          _context10.n = 9;
          break;
        case 8:
          _context10.p = 8;
          _t8 = _context10.v;
          resEl.innerHTML = "<span style=\"color:red\"><i class=\"fas fa-times-circle\"></i> L\u1ED7i: ".concat(_t8.message, "</span>");
        case 9:
          return _context10.a(2);
      }
    }, _callee10, null, [[6, 8], [2, 3]]);
  }));
  return _dvTestSAKey.apply(this, arguments);
}
function dvSyncNow(_x4) {
  return _dvSyncNow.apply(this, arguments);
}
function _dvSyncNow() {
  _dvSyncNow = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(direction) {
    var progBar, progFill, progMsg, onProgress, res, _t9;
    return _regenerator().w(function (_context11) {
      while (1) switch (_context11.p = _context11.n) {
        case 0:
          progBar = document.getElementById('dvSyncProgressBar');
          progFill = document.getElementById('dvSyncProgressFill');
          progMsg = document.getElementById('dvSyncProgressMsg');
          if (progBar) progBar.style.display = 'block';
          _dvUpdateSyncBadge('syncing', 'Đang đồng bộ...');
          onProgress = function onProgress(msg, pct) {
            if (progFill) progFill.style.width = pct + '%';
            if (progMsg) progMsg.textContent = msg;
          };
          _context11.p = 1;
          if (!(direction === 'push')) {
            _context11.n = 3;
            break;
          }
          _context11.n = 2;
          return GSheetSync.pushAll(onProgress);
        case 2:
          res = _context11.v;
          if (typeof toast === 'function') toast("\u2705 \u0110\xE3 \u0111\u1EA9y l\xEAn: ".concat(res.docCount, " v\u0103n b\u1EA3n, ").concat(res.memberCount, " \u0111o\xE0n vi\xEAn"), 'success');
          _context11.n = 5;
          break;
        case 3:
          _context11.n = 4;
          return GSheetSync.pullAll(onProgress);
        case 4:
          if (typeof toast === 'function') toast('✅ Đã tải dữ liệu mới nhất từ Google Sheet!', 'success');
        case 5:
          dvRenderSyncStatus();
          _context11.n = 7;
          break;
        case 6:
          _context11.p = 6;
          _t9 = _context11.v;
          _dvUpdateSyncBadge('error', 'Lỗi!');
          if (typeof toast === 'function') toast('Lỗi đồng bộ: ' + _t9.message, 'error');
        case 7:
          _context11.p = 7;
          if (progBar) setTimeout(function () {
            progBar.style.display = 'none';
            if (progFill) progFill.style.width = '0%';
          }, 2000);
          return _context11.f(7);
        case 8:
          return _context11.a(2);
      }
    }, _callee11, null, [[1, 6, 7, 8]]);
  }));
  return _dvSyncNow.apply(this, arguments);
}
function dvGenerateSyncCode() {
  return _dvGenerateSyncCode.apply(this, arguments);
}
function _dvGenerateSyncCode() {
  _dvGenerateSyncCode = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12() {
    var cfg, code, mtCfg, payload, codeExpiry, _mtCfg$user, token, SHEETS_MT, metaKey, metaVal, el, valEl, _t0, _t1;
    return _regenerator().w(function (_context12) {
      while (1) switch (_context12.p = _context12.n) {
        case 0:
          cfg = GSheetSync.getSyncConfig();
          if (cfg !== null && cfg !== void 0 && cfg.serviceAccountJson) {
            _context12.n = 1;
            break;
          }
          if (typeof toast === 'function') toast('Cần cấu hình Service Account JSON trước!', 'warning');
          return _context12.a(2);
        case 1:
          code = Math.random().toString(36).substring(2, 10).toUpperCase(); // Include MT config if available
          mtCfg = typeof MTConfig !== 'undefined' ? MTConfig.get() : null;
          payload = JSON.stringify({
            syncConfig: cfg,
            mtConfig: mtCfg ? {
              spreadsheetId: mtCfg.spreadsheetId,
              serviceAccountJson: mtCfg.serviceAccountJson,
              role: mtCfg.role,
              orgId: mtCfg.orgId,
              orgName: mtCfg.orgName
            } : null,
            generatedAt: Date.now()
          });
          codeExpiry = Date.now() + 86400000; // 24h
          localStorage.setItem('dv_sync_code_' + code, JSON.stringify({
            payload: payload,
            expiry: codeExpiry
          }));

          // Ghi lên GSheet để mobile từ xa dùng được
          if (!(mtCfg !== null && mtCfg !== void 0 && mtCfg.spreadsheetId && mtCfg !== null && mtCfg !== void 0 && mtCfg.serviceAccountJson)) {
            _context12.n = 9;
            break;
          }
          _context12.p = 2;
          if (!(typeof MTToken !== 'undefined')) {
            _context12.n = 4;
            break;
          }
          _context12.n = 3;
          return MTToken.get(mtCfg.serviceAccountJson);
        case 3:
          _t0 = _context12.v;
          _context12.n = 5;
          break;
        case 4:
          _t0 = null;
        case 5:
          token = _t0;
          if (!token) {
            _context12.n = 6;
            break;
          }
          SHEETS_MT = 'https://sheets.googleapis.com/v4/spreadsheets';
          metaKey = 'synccode_' + code;
          metaVal = JSON.stringify({
            payload: payload,
            expiry: codeExpiry
          });
          _context12.n = 6;
          return fetch("".concat(SHEETS_MT, "/").concat(mtCfg.spreadsheetId, "/values/system_meta!A:B:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS"), {
            method: 'POST',
            headers: {
              Authorization: "Bearer ".concat(token),
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              values: [[metaKey, metaVal]]
            })
          });
        case 6:
          _context12.n = 8;
          break;
        case 7:
          _context12.p = 7;
          _t1 = _context12.v;
          console.warn('Không lưu sync code lên GSheet:', _t1.message);
        case 8:
          localStorage.setItem('mt_deep_' + code, JSON.stringify({
            sid: mtCfg.spreadsheetId,
            sa: mtCfg.serviceAccountJson,
            r: mtCfg.role || 'member',
            o: mtCfg.orgId || '',
            on: mtCfg.orgName || '',
            u: ((_mtCfg$user = mtCfg.user) === null || _mtCfg$user === void 0 ? void 0 : _mtCfg$user.username) || '',
            exp: codeExpiry
          }));
        case 9:
          el = document.getElementById('dvSyncCodeDisplay');
          valEl = document.getElementById('dvSyncCodeVal');
          if (el) el.style.display = 'block';
          if (valEl) valEl.textContent = code.match(/.{1,4}/g).join(' ');
        case 10:
          return _context12.a(2);
      }
    }, _callee12, null, [[2, 7]]);
  }));
  return _dvGenerateSyncCode.apply(this, arguments);
}
function dvCopySyncCode() {
  var _document$getElementB7, _navigator$clipboard;
  var val = (_document$getElementB7 = document.getElementById('dvSyncCodeVal')) === null || _document$getElementB7 === void 0 ? void 0 : _document$getElementB7.textContent.replace(/\s/g, '');
  if (!val) return;
  (_navigator$clipboard = navigator.clipboard) === null || _navigator$clipboard === void 0 || _navigator$clipboard.writeText(val);
  if (typeof toast === 'function') toast('Đã sao chép Sync Code!', 'success');
}
function dvApplySyncCode() {
  var _document$getElementB8;
  var code = (_document$getElementB8 = document.getElementById('dvSyncCodeInput')) === null || _document$getElementB8 === void 0 ? void 0 : _document$getElementB8.value.trim().replace(/\s/g, '').toUpperCase();
  var resEl = document.getElementById('dvSyncCodeResult');
  if (!code || code.length < 6) {
    if (resEl) resEl.innerHTML = '<span style="color:red">Vui lòng nhập Sync Code hợp lệ</span>';
    return;
  }
  if (resEl) resEl.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang xác thực...';
  var stored = localStorage.getItem('dv_sync_code_' + code);
  if (!stored) {
    if (resEl) resEl.innerHTML = '<span style="color:red">Code không tồn tại hoặc đã hết hạn</span>';
    return;
  }
  try {
    var _JSON$parse = JSON.parse(stored),
      payload = _JSON$parse.payload,
      expiry = _JSON$parse.expiry;
    if (Date.now() > expiry) {
      if (resEl) resEl.innerHTML = '<span style="color:red">Code đã hết hạn (>24h)</span>';
      return;
    }
    var parsed = JSON.parse(payload);
    var syncConfig = parsed.syncConfig;
    GSheetSync.saveSyncConfig(syncConfig);
    // Restore MT config if available in payload
    if (parsed.mtConfig && typeof MTConfig !== 'undefined') {
      var existMT = MTConfig.get() || {};
      MTConfig.save(_objectSpread(_objectSpread(_objectSpread({}, existMT), parsed.mtConfig), {}, {
        joinedAt: new Date().toISOString()
      }));
    }
    _dvUpdateSyncBadge('synced', 'Đã kết nối');
    if (typeof _mtRefreshStatusBanner === 'function') setTimeout(_mtRefreshStatusBanner, 600);
    if (resEl) resEl.innerHTML = '<span style="color:#16a34a"><i class="fas fa-check-circle"></i> Kết nối thành công! Đang tải dữ liệu...</span>';
    // Auto pull
    setTimeout(function () {
      return dvSyncNow('pull');
    }, 500);
  } catch (e) {
    if (resEl) resEl.innerHTML = '<span style="color:red">Lỗi: ' + e.message + '</span>';
  }
}
function dvShowSyncCodeInput() {
  if (document.getElementById('dvAuthModal')) {
    document.getElementById('dvAuthModal').remove();
  }
  // Show a minimal input screen
  var modal = document.createElement('div');
  modal.id = 'dvAuthModal';
  modal.innerHTML = "\n<div id=\"dvAuthBox\">\n  <div class=\"dv-auth-logo\"><i class=\"fas fa-sync-alt\"></i></div>\n  <div class=\"dv-auth-title\">\u0110\u0103ng nh\u1EADp b\u1EB1ng Sync Code</div>\n  <div class=\"dv-auth-sub\">Nh\u1EADp Sync Code \u0111\u01B0\u1EE3c t\u1EA1o t\u1EEB thi\u1EBFt b\u1ECB PC c\u1EE7a b\u1EA1n</div>\n  <input class=\"form-control\" id=\"dvQuickSyncCode\" placeholder=\"Nh\u1EADp Sync Code t\u1EEB PC...\"\n    style=\"letter-spacing:4px;font-family:monospace;font-size:1.2rem;text-align:center;text-transform:uppercase;margin:12px 0\"\n    maxlength=\"20\" oninput=\"this.value=this.value.toUpperCase().replace(/[^A-Z0-9]/g,'')\">\n  <div style=\"font-size:0.75rem;color:var(--gray);margin-bottom:8px;text-align:left\">\n    <b>Spreadsheet ID</b> (l\u1EA5y t\u1EEB URL Google Sheet c\u1EE7a Admin):\n  </div>\n  <input class=\"form-control\" id=\"dvQuickSpreadsheetId\" placeholder=\"D\xE1n Spreadsheet ID v\xE0o \u0111\xE2y...\"\n    style=\"font-family:monospace;font-size:0.8rem;margin-bottom:12px\">\n  <button class=\"btn btn-primary\" onclick=\"dvQuickApplySync()\" style=\"width:100%;margin-bottom:10px\">\n    <i class=\"fas fa-link\"></i> K\u1EBFt n\u1ED1i\n  </button>\n  <div id=\"dvQuickSyncResult\" style=\"font-size:0.78rem;min-height:18px;color:var(--gray);text-align:center\"></div>\n  <div class=\"dv-auth-alt\" style=\"margin-top:12px\">\n    <a onclick=\"dvShowAuthModal('login')\">\u2190 Quay l\u1EA1i \u0111\u0103ng nh\u1EADp b\u1EB1ng PIN</a>\n  </div>\n</div>";
  document.body.appendChild(modal);
}
function dvQuickApplySync() {
  return _dvQuickApplySync.apply(this, arguments);
} // ─────────────────────────────────────────────────────────────────────
//  G. DB PATCH — auto-sync sau mỗi write nếu cấu hình bật
// ─────────────────────────────────────────────────────────────────────
function _dvQuickApplySync() {
  _dvQuickApplySync = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13() {
    var _document$getElementB15, _document$getElementB16;
    var code, sid, resEl, syncConfig, mtConfig, stored, _JSON$parse2, payload, expiry, parsed, existCfg, existMT, saJson, token, SHEETS_MT, resp, data, rows, found, entry, _parsed, msg, _document$getElementB17, _existMT, _t10, _t11;
    return _regenerator().w(function (_context13) {
      while (1) switch (_context13.p = _context13.n) {
        case 0:
          code = (_document$getElementB15 = document.getElementById('dvQuickSyncCode')) === null || _document$getElementB15 === void 0 ? void 0 : _document$getElementB15.value.trim().replace(/\s/g, '').toUpperCase();
          sid = (_document$getElementB16 = document.getElementById('dvQuickSpreadsheetId')) === null || _document$getElementB16 === void 0 ? void 0 : _document$getElementB16.value.trim();
          resEl = document.getElementById('dvQuickSyncResult');
          if (code) {
            _context13.n = 1;
            break;
          }
          if (resEl) resEl.innerHTML = '<span style="color:red">Vui lòng nhập Sync Code</span>';
          return _context13.a(2);
        case 1:
          if (sid) {
            _context13.n = 2;
            break;
          }
          if (resEl) resEl.innerHTML = '<span style="color:red">Vui lòng nhập Spreadsheet ID</span>';
          return _context13.a(2);
        case 2:
          if (resEl) resEl.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang xác thực...';

          // Bước 1: Thử localStorage trước (cùng máy)
          syncConfig = null;
          mtConfig = null;
          stored = localStorage.getItem('dv_sync_code_' + code);
          if (stored) {
            try {
              _JSON$parse2 = JSON.parse(stored), payload = _JSON$parse2.payload, expiry = _JSON$parse2.expiry;
              if (Date.now() <= expiry) {
                parsed = JSON.parse(payload);
                syncConfig = parsed.syncConfig;
                mtConfig = parsed.mtConfig;
              }
            } catch (_unused6) {}
          }

          // Bước 2: Không có local → đọc từ GSheet dùng saJson từ config hiện tại
          if (syncConfig) {
            _context13.n = 15;
            break;
          }
          _context13.p = 3;
          if (resEl) resEl.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang tải từ Google Sheet...';
          // Lấy saJson: ưu tiên từ GSheetSync config hiện tại, hoặc MTConfig
          existCfg = GSheetSync.getSyncConfig();
          existMT = typeof MTConfig !== 'undefined' ? MTConfig.get() : null;
          saJson = (existCfg === null || existCfg === void 0 ? void 0 : existCfg.serviceAccountJson) || (existMT === null || existMT === void 0 ? void 0 : existMT.serviceAccountJson);
          if (saJson) {
            _context13.n = 4;
            break;
          }
          throw new Error('no_sa');
        case 4:
          if (!(typeof MTToken !== 'undefined')) {
            _context13.n = 6;
            break;
          }
          _context13.n = 5;
          return MTToken.get(saJson);
        case 5:
          _t10 = _context13.v;
          _context13.n = 7;
          break;
        case 6:
          _t10 = null;
        case 7:
          token = _t10;
          if (token) {
            _context13.n = 8;
            break;
          }
          throw new Error('no_token');
        case 8:
          SHEETS_MT = 'https://sheets.googleapis.com/v4/spreadsheets';
          _context13.n = 9;
          return fetch("".concat(SHEETS_MT, "/").concat(sid, "/values/").concat(encodeURIComponent('system_meta!A:B')), {
            headers: {
              Authorization: "Bearer ".concat(token)
            }
          });
        case 9:
          resp = _context13.v;
          if (resp.ok) {
            _context13.n = 10;
            break;
          }
          throw new Error('sheet_read_' + resp.status);
        case 10:
          _context13.n = 11;
          return resp.json();
        case 11:
          data = _context13.v;
          rows = data.values || [];
          found = rows.find(function (r) {
            return r[0] === 'synccode_' + code;
          });
          if (found) {
            _context13.n = 12;
            break;
          }
          throw new Error('not_found');
        case 12:
          entry = JSON.parse(found[1]);
          if (!(Date.now() > entry.expiry)) {
            _context13.n = 13;
            break;
          }
          throw new Error('expired');
        case 13:
          _parsed = JSON.parse(entry.payload);
          syncConfig = _parsed.syncConfig;
          mtConfig = _parsed.mtConfig;
          _context13.n = 15;
          break;
        case 14:
          _context13.p = 14;
          _t11 = _context13.v;
          msg = _t11.message;
          if (msg === 'not_found' || msg === 'expired') {
            if (resEl) resEl.innerHTML = '<span style="color:red">Code không hợp lệ hoặc đã hết hạn (>24h). Hãy tạo code mới.</span>';
          } else if (msg === 'no_sa') {
            if (resEl) resEl.innerHTML = "\n          <div style=\"color:#d97706;font-size:0.78rem;padding:10px;background:rgba(245,158,11,0.08);border-radius:8px;border:1px solid rgba(245,158,11,0.3)\">\n            <b>\u0110\xE2y l\xE0 thi\u1EBFt b\u1ECB m\u1EDBi ch\u01B0a c\xF3 c\u1EA5u h\xECnh.</b><br><br>\n            B\u1EA1n c\u1EA7n nh\u1EDD Admin c\u1EA5p <b>M\xE3 m\u1EDDi</b> thay v\xEC Sync Code, ho\u1EB7c li\xEAn h\u1EC7 Admin \u0111\u1EC3 \u0111\u01B0\u1EE3c h\u1ED7 tr\u1EE3 c\xE0i \u0111\u1EB7t l\u1EA7n \u0111\u1EA7u.\n          </div>";
          } else {
            if (resEl) resEl.innerHTML = '<span style="color:red">Lỗi kết nối: ' + msg + '</span>';
          }
          return _context13.a(2);
        case 15:
          try {
            GSheetSync.saveSyncConfig(syncConfig);
            if (mtConfig && typeof MTConfig !== 'undefined') {
              _existMT = MTConfig.get() || {};
              MTConfig.save(_objectSpread(_objectSpread(_objectSpread({}, _existMT), mtConfig), {}, {
                joinedAt: new Date().toISOString()
              }));
            }
            DVAuth.startSession();
            _dvDismissAuthAndInit === null || _dvDismissAuthAndInit === void 0 || _dvDismissAuthAndInit();
            (_document$getElementB17 = document.getElementById('dvAuthModal')) === null || _document$getElementB17 === void 0 || _document$getElementB17.remove();
            if (typeof toast === 'function') toast('✅ Đã kết nối thành công! Đang đồng bộ dữ liệu...', 'success');
            setTimeout(function () {
              return dvSyncNow('pull');
            }, 800);
          } catch (e) {
            if (resEl) resEl.innerHTML = '<span style="color:red">Lỗi: ' + e.message + '</span>';
          }
        case 16:
          return _context13.a(2);
      }
    }, _callee13, null, [[3, 14]]);
  }));
  return _dvQuickApplySync.apply(this, arguments);
}
(function patchDBForAutoSync() {
  if (typeof DB === 'undefined') return;
  var origSet = DB.set.bind(DB);
  DB.set = function (k, v) {
    origSet(k, v);
    var cfg = GSheetSync.getSyncConfig();
    if (cfg !== null && cfg !== void 0 && cfg.autoSyncOnEdit && cfg !== null && cfg !== void 0 && cfg.serviceAccountJson && DVAuth.isLoggedIn()) {
      clearTimeout(DB._syncTimer);
      DB._syncTimer = setTimeout(function () {
        return dvManualSync();
      }, 3000); // debounce 3s
    }
  };
})();

// ─────────────────────────────────────────────────────────────────────
//  H. INIT
// ─────────────────────────────────────────────────────────────────────
// [ĐÃ VÔ HIỆU HOÁ - Bảo mật v3.0]
// dvSeedDefaultAccount: KHÔNG tạo tài khoản PIN 123456 mặc định nữa.
// Lý do: đây là lỗ hổng cho phép bất kỳ ai đăng nhập với quyền cao nhất.
// Quản lý tài khoản nay do doanvan-auth-secure.js đảm nhiệm.
function dvSeedDefaultAccount() {
  // NOP — bị vô hiệu hoá bởi Auth Secure v3.0
  // Tài khoản chỉ được tạo qua: Admin Setup hoặc Invite Code
}

// [ĐÃ VÔ HIỆU HOÁ - Bảo mật v3.0]
// dvResetToDefault: KHÔNG cho phép reset PIN về 123456 công khai.
// Lý do: bất kỳ ai cũng có thể click "Quên PIN?" để bypass authentication.
// Thay thế: Admin dùng chức năng Reset PIN trong trang Quản lý người dùng.
function dvResetToDefault() {
  if (typeof toast === 'function') {
    toast('<i class="fas fa-shield-alt" style="color:#dc2626"></i> ' + 'Tính năng "Đặt lại mặc định" đã bị vô hiệu hoá vì lý do bảo mật. ' + 'Liên hệ Admin để được reset PIN.', 'error');
  }
}
function dvInit() {
  _dvInjectMobileUI();

  // KHÔNG gọi dvSeedDefaultAccount() nữa (đã vô hiệu hoá)
  // Luồng auth được điều phối hoàn toàn bởi doanvan-auth-secure.js
  // Script này chỉ inject mobile UI, còn lại auth-secure xử lý
  var profile = DVAuth.getProfile();
  var loggedIn = DVAuth.isLoggedIn();

  // Nếu auth-secure chưa load (fallback an toàn): chỉ update chip, không tự login
  if (loggedIn && profile) {
    _dvUpdateUserChip();
    dvInitSync();
  }
  // Trường hợp chưa login: auth-secure.js sẽ hiển thị màn hình đăng nhập
}

// Auto-init sau khi DOM và scripts khác sẵn sàng
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function () {
    return setTimeout(dvInit, 300);
  });
} else {
  setTimeout(dvInit, 300);
}

// Export globals
window.dvToggleSidebar = dvToggleSidebar;
window.dvCloseSidebar = dvCloseSidebar;
window.dvNavTo = dvNavTo;
window.dvShowAuthModal = dvShowAuthModal;
window.dvKeyPress = dvKeyPress;
window.dvResetToDefault = dvResetToDefault;
window.dvLogout = dvLogout;
window.dvOpenUserMenu = dvOpenUserMenu;
window.dvOpenSyncModal = dvOpenSyncModal;
window.dvSyncTab = dvSyncTab;
window.dvSaveSyncConfig = dvSaveSyncConfig;
window.dvTestSAKey = dvTestSAKey;
window.dvSADragOver = dvSADragOver;
window.dvSADragLeave = dvSADragLeave;
window.dvSADrop = dvSADrop;
window.dvSAFileSelected = dvSAFileSelected;
window.dvSAInputChanged = dvSAInputChanged;
window.dvSAClear = dvSAClear;
window.dvSyncNow = dvSyncNow;
window.dvManualSync = dvManualSync;
window.dvGenerateSyncCode = dvGenerateSyncCode;
window.dvCopySyncCode = dvCopySyncCode;
window.dvApplySyncCode = dvApplySyncCode;
window.dvShowSyncCodeInput = dvShowSyncCodeInput;
window.dvQuickApplySync = dvQuickApplySync;
window.dvRenderSyncStatus = dvRenderSyncStatus;
window.DVAuth = DVAuth;
window.GSheetSync = GSheetSync;
console.log('[ĐoànVăn Mobile+Sync v1.0] Loaded — Auth ✅ Mobile ✅ GoogleSheets ✅');
