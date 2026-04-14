function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/**
 * ╔══════════════════════════════════════════════════════════════════════════╗
 * ║   DOANVAN — AI ENGINE v2.0 (NÂNG CẤP)                                  ║
 * ║                                                                          ║
 * ║   Nâng cấp chính:                                                        ║
 * ║   • Prompt AI Gemini chuyên nghiệp — trích xuất đầy đủ & chính xác      ║
 * ║   • Offline NLP Engine v2 — regex nâng cao cho văn bản HC Việt Nam       ║
 * ║   • Trích xuất số/ký hiệu văn bản (mọi định dạng chuẩn VN)              ║
 * ║   • Trích xuất hạn xử lý / hạn hoàn thành / hạn báo cáo chính xác       ║
 * ║   • Thêm trường: địa danh ký, người ký, chức vụ, đơn vị thực hiện        ║
 * ╚══════════════════════════════════════════════════════════════════════════╝
 */

// ─────────────────────────────────────────────────────────────────────────────
//  PHẦN 1: OFFLINE NLP ENGINE v2 — window.AI.offline
//  Dùng khi không có API Key hoặc phân tích sơ bộ trước khi gọi Gemini
// ─────────────────────────────────────────────────────────────────────────────

(function installOfflineEngine() {
  'use strict';

  // ── Ánh xạ loại văn bản ──────────────────────────────────────────────────
  var TYPE_MAP = [{
    type: 'chi-thi',
    patterns: [/chỉ\s*thị/i, /CHỈ THỊ/]
  }, {
    type: 'nghi-quyet',
    patterns: [/nghị\s*quyết/i, /NGHỊ QUYẾT/]
  }, {
    type: 'ke-hoach',
    patterns: [/kế\s*hoạch/i, /KẾ HOẠCH/]
  }, {
    type: 'bao-cao',
    patterns: [/báo\s*cáo/i, /BÁO CÁO/]
  }, {
    type: 'cong-van',
    patterns: [/công\s*văn/i, /CÔNG VĂN/]
  }, {
    type: 'thong-bao',
    patterns: [/thông\s*báo/i, /THÔNG BÁO/]
  }, {
    type: 'to-trinh',
    patterns: [/tờ\s*trình/i, /TỜ TRÌNH/]
  }, {
    type: 'bien-ban',
    patterns: [/biên\s*bản/i, /BIÊN BẢN/]
  }, {
    type: 'quyet-dinh',
    patterns: [/quyết\s*định/i, /QUYẾT ĐỊNH/]
  }, {
    type: 'huong-dan',
    patterns: [/hướng\s*dẫn/i, /HƯỚNG DẪN/]
  }, {
    type: 'dieu-le',
    patterns: [/điều\s*lệ/i, /ĐIỀU LỆ/]
  }, {
    type: 'chuong-trinh',
    patterns: [/chương\s*trình/i, /CHƯƠNG TRÌNH/]
  }];

  // ── Regex số/ký hiệu văn bản (chuẩn NĐ30/2020/NĐ-CP) ────────────────────
  // Các dạng: 56/KH-ĐTN | 54-CV/ĐTN | 01/2026/QĐ-UBND | 123/TB-BTV | v.v
  var CODE_PATTERNS = [
  // Dạng đầy đủ: SỐ/LOẠI-ĐƠN_VỊ hoặc SỐ-LOẠI/ĐƠN_VỊ
  /(?:[S\u017F]\u1ED1|[s\u017F]\u1ED1|[S\u017F]\u1ED0)[\t-\r :\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*([0-9]{1,4}[\x2D\/][\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*[A-Z\xC0-\xC3\xCA\xD4\u0102\u0110\u017F\u01AF\u1EA0\u1EA2\u1EA4\u1EA6\u1EA8\u1EAA\u1EAC\u1EAE\u1EB0\u1EB2\u1EB4\u1EB6\u1EBE\u1EC0\u1EC2\u1EC4\u1EC6\u1ED0\u1ED2\u1ED4\u1ED6\u1ED8\u1EE8\u1EEA\u1EEC\u1EEE\u1EF0\u212A]{1,10}[\x2D\/][A-Z\xC0-\xC3\xCA\xD4\u0102\u0110\u017F\u01AF\u1EA0\u1EA2\u1EA4\u1EA6\u1EA8\u1EAA\u1EAC\u1EAE\u1EB0\u1EB2\u1EB4\u1EB6\u1EBE\u1EC0\u1EC2\u1EC4\u1EC6\u1ED0\u1ED2\u1ED4\u1ED6\u1ED8\u1EE8\u1EEA\u1EEC\u1EEE\u1EF0\u212A]{1,15})/i,
  // Dạng tiêu đề văn bản: số đứng đầu dòng
  /^([0-9]{1,4}[\x2D\/][A-Z\xC0-\xC3\xCA\xD4\u0102\u0110\u017F\u01AF\u1EA0\u1EA2\u1EA4\u1EA6\u1EA8\u1EAA\u1EAC\u1EAE\u1EB0\u1EB2\u1EB4\u1EB6\u1EBE\u1EC0\u1EC2\u1EC4\u1EC6\u1ED0\u1ED2\u1ED4\u1ED6\u1ED8\u1EE8\u1EEA\u1EEC\u1EEE\u1EF0\u212A]{1,10}[\x2D\/][A-Z\xC0-\xC3\xCA\xD4\u0102\u0110\u017F\u01AF\u1EA0\u1EA2\u1EA4\u1EA6\u1EA8\u1EAA\u1EAC\u1EAE\u1EB0\u1EB2\u1EB4\u1EB6\u1EBE\u1EC0\u1EC2\u1EC4\u1EC6\u1ED0\u1ED2\u1ED4\u1ED6\u1ED8\u1EE8\u1EEA\u1EEC\u1EEE\u1EF0\u212A]{1,15})[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]/im,
  // Sau chữ "V/v" hoặc tiêu đề thường thấy số đứng trước
  /\b([0-9]{1,4}[\x2D\/][A-Z\xC0-\xC3\xCA\xD4\u0102\u0110\u017F\u01AF\u1EA0\u1EA2\u1EA4\u1EA6\u1EA8\u1EAA\u1EAC\u1EAE\u1EB0\u1EB2\u1EB4\u1EB6\u1EBE\u1EC0\u1EC2\u1EC4\u1EC6\u1ED0\u1ED2\u1ED4\u1ED6\u1ED8\u1EE8\u1EEA\u1EEC\u1EEE\u1EF0\u212A]{2,10}[\x2D\/][A-Z\xC0-\xC3\xCA\xD4\u0102\u0110\u017F\u01AF\u1EA0\u1EA2\u1EA4\u1EA6\u1EA8\u1EAA\u1EAC\u1EAE\u1EB0\u1EB2\u1EB4\u1EB6\u1EBE\u1EC0\u1EC2\u1EC4\u1EC6\u1ED0\u1ED2\u1ED4\u1ED6\u1ED8\u1EE8\u1EEA\u1EEC\u1EEE\u1EF0\u212A]{2,15})\b/i,
  // Dạng đơn giản: SỐ/KÝ-HIỆU (ít nhất 2 ký tự sau gạch)
  /(?:[s\u017F]\u1ED1|[S\u017F]\u1ED1)[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*[\.:]?[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*([0-9]{1,4}[\x2D\/][0-9A-Z_a-z\u017F\u212A]{2,20})/i];

  // ── Regex ngày tháng (nhiều dạng viết phổ biến trong VB HC VN) ───────────
  var DATE_PATTERNS = [
  // ngày DD tháng MM năm YYYY
  /ngày\s+(\d{1,2})\s+tháng\s+(\d{1,2})\s+năm\s+(\d{4})/gi,
  // DD/MM/YYYY hoặc DD-MM-YYYY
  /\b(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})\b/g,
  // YYYY-MM-DD (ISO)
  /\b(\d{4})-(\d{2})-(\d{2})\b/g,
  // ngày DD/MM/YYYY
  /ngày\s+(\d{1,2})\/(\d{1,2})\/(\d{4})/gi];

  // ── Regex hạn xử lý / hạn hoàn thành ─────────────────────────────────────
  var DEADLINE_CONTEXT_PATTERNS = [/(?:hạn\s+(?:chót|cuối|hoàn\s+thành|nộp|xử\s+lý|báo\s+cáo|gửi|trả\s+lời|thực\s+hiện|đăng\s+ký))[:\s,]+(?:trước\s+ngày\s+|ngày\s+)?(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4}|\d{1,2}\s+tháng\s+\d{1,2}\s+năm\s+\d{4})/gi, /(?:trước\s+ngày\s+|chậm\s+nhất\s+(?:vào\s+)?ngày\s+|trước\s+ngày\s+|deadline[:\s]+)(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4}|\d{1,2}\s+tháng\s+\d{1,2}\s+năm\s+\d{4})/gi, /(?:hoàn\s+thành|hoàn\s+trả|kết\s+thúc|nộp\s+kết\s+quả)[^.]{0,30}(?:trước\s+ngày\s+|ngày\s+)(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4}|\d{1,2}\s+tháng\s+\d{1,2}\s+năm\s+\d{4})/gi, /(?:thời\s+hạn|hạn\s+nộp)[:\s]+(?:đến\s+ngày\s+)?(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4}|\d{1,2}\s+tháng\s+\d{1,2}\s+năm\s+\d{4})/gi,
  // "báo cáo kết quả về ... trước ngày ..."
  /báo\s+cáo\s+(?:kết\s+quả|về)[^.]{0,60}(?:ngày\s+)(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4}|\d{1,2}\s+tháng\s+\d{1,2}\s+năm\s+\d{4})/gi];

  // ── Tiện ích parse ngày về YYYY-MM-DD ─────────────────────────────────────
  function parseDate(raw) {
    if (!raw) return '';
    raw = raw.trim();

    // Dạng: DD tháng MM năm YYYY
    var m = raw.match(/(\d{1,2})\s+tháng\s+(\d{1,2})\s+năm\s+(\d{4})/i);
    if (m) {
      var _m = m,
        _m2 = _slicedToArray(_m, 4),
        d = _m2[1],
        mo = _m2[2],
        y = _m2[3];
      return "".concat(y, "-").concat(mo.padStart(2, '0'), "-").concat(d.padStart(2, '0'));
    }

    // Dạng: DD/MM/YYYY hoặc DD-MM-YYYY
    m = raw.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
    if (m) {
      var _m3 = m,
        _m4 = _slicedToArray(_m3, 4),
        _d = _m4[1],
        _mo = _m4[2],
        _y = _m4[3];
      return "".concat(_y, "-").concat(_mo.padStart(2, '0'), "-").concat(_d.padStart(2, '0'));
    }

    // Dạng ISO: YYYY-MM-DD
    m = raw.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (m) return raw;
    return '';
  }

  // ── Trích xuất số/ký hiệu văn bản ─────────────────────────────────────────
  function extractCode(text) {
    var _iterator = _createForOfIteratorHelper(CODE_PATTERNS),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var pattern = _step.value;
        var m = text.match(pattern);
        if (m && m[1]) {
          // Làm sạch: bỏ khoảng trắng thừa trong ký hiệu
          return m[1].replace(/\s+/g, '').trim();
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return '';
  }

  // ── Trích xuất ngày ban hành ───────────────────────────────────────────────
  function extractIssueDate(text) {
    // Tìm ngày gần "ban hành", "ký ngày", hoặc ngày ở cuối văn bản (dòng địa danh)
    var issuePats = [/(?:ban\s+hành|ký\s+ngày|ngày\s+ký|lập\s+ngày)[^,.\n]*ngày\s+(\d{1,2}\s+tháng\s+\d{1,2}\s+năm\s+\d{4})/gi, /,\s*ngày\s+(\d{1,2})\s+tháng\s+(\d{1,2})\s+năm\s+(\d{4})/gi];
    for (var _i = 0, _issuePats = issuePats; _i < _issuePats.length; _i++) {
      var pat = _issuePats[_i];
      pat.lastIndex = 0;
      var m = pat.exec(text);
      if (m) {
        if (m[3]) {
          // Nhóm d, mo, y riêng
          return "".concat(m[3], "-").concat(m[2].padStart(2, '0'), "-").concat(m[1].padStart(2, '0'));
        }
        if (m[1]) return parseDate(m[1]);
      }
    }

    // Fallback: tìm ngày đầu tiên trong văn bản
    var allDates = extractAllDates(text);
    return allDates.length ? allDates[0] : '';
  }

  // ── Trích xuất tất cả ngày trong văn bản ──────────────────────────────────
  function extractAllDates(text) {
    var results = [];
    var seen = new Set();

    // Dạng "ngày DD tháng MM năm YYYY"
    var pat1 = /ngày\s+(\d{1,2})\s+tháng\s+(\d{1,2})\s+năm\s+(\d{4})/gi;
    var m;
    while ((m = pat1.exec(text)) !== null) {
      var iso = "".concat(m[3], "-").concat(m[2].padStart(2, '0'), "-").concat(m[1].padStart(2, '0'));
      if (!seen.has(iso)) {
        seen.add(iso);
        results.push(iso);
      }
    }

    // Dạng DD/MM/YYYY
    var pat2 = /\b(\d{1,2})\/(\d{1,2})\/(\d{4})\b/g;
    while ((m = pat2.exec(text)) !== null) {
      var d = m[1],
        mo = m[2],
        y = m[3];
      if (parseInt(mo) <= 12 && parseInt(d) <= 31) {
        var _iso = "".concat(y, "-").concat(mo.padStart(2, '0'), "-").concat(d.padStart(2, '0'));
        if (!seen.has(_iso)) {
          seen.add(_iso);
          results.push(_iso);
        }
      }
    }
    return results.sort();
  }

  // ── Trích xuất hạn hoàn thành / hạn xử lý ────────────────────────────────
  function extractDeadline(text) {
    var _iterator2 = _createForOfIteratorHelper(DEADLINE_CONTEXT_PATTERNS),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var pat = _step2.value;
        pat.lastIndex = 0;
        var _m5 = pat.exec(text);
        if (_m5 && _m5[1]) {
          var d = parseDate(_m5[1]);
          if (d) return d;
        }
      }

      // Fallback nâng cao: tìm ngày đi kèm từ khoá "hạn"
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    var fallback = /(?:hạn|trước ngày|chậm nhất)[^.\n]{0,50}(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4})/gi;
    fallback.lastIndex = 0;
    var m = fallback.exec(text);
    if (m && m[1]) return parseDate(m[1]);
    return '';
  }

  // ── Trích xuất ngày báo cáo kết quả ──────────────────────────────────────
  function extractReportDate(text) {
    var pats = [/(?:báo\s+cáo\s+kết\s+quả|gửi\s+kết\s+quả|nộp\s+báo\s+cáo)[^.\n]{0,60}ngày\s+(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4}|\d{1,2}\s+tháng\s+\d{1,2}\s+năm\s+\d{4})/gi, /(?:báo\s+cáo)[^.\n]{0,40}(?:trước\s+ngày|vào\s+ngày)\s+(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4}|\d{1,2}\s+tháng\s+\d{1,2}\s+năm\s+\d{4})/gi];
    for (var _i2 = 0, _pats = pats; _i2 < _pats.length; _i2++) {
      var p = _pats[_i2];
      p.lastIndex = 0;
      var m = p.exec(text);
      if (m && m[1]) {
        var d = parseDate(m[1]);
        if (d) return d;
      }
    }
    return '';
  }

  // ── Trích xuất cơ quan ban hành ───────────────────────────────────────────
  function extractIssuer(text) {
    // Tìm dòng đầu văn bản hoặc sau tiêu đề cơ quan
    var lines = text.split('\n').map(function (l) {
      return l.trim();
    }).filter(Boolean);
    var issuerPats = [/^((?:ĐOÀN|BAN|UBND|TỈNH|THÀNH PHỐ|HỘI|BCH|BTV|BAN CHẤP HÀNH|UỶ BAN).{3,80})/i, /(?:cơ\s+quan|đơn\s+vị)\s+(?:ban\s+hành|phát\s+hành)[:\s]+(.{5,80})/i];
    var _iterator3 = _createForOfIteratorHelper(lines.slice(0, 15)),
      _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var line = _step3.value;
        var _iterator5 = _createForOfIteratorHelper(issuerPats),
          _step5;
        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            var pat = _step5.value;
            var m = line.match(pat);
            if (m && m[1] && m[1].length > 5) return m[1].trim();
          }
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }
      }

      // Fallback: dòng thứ 2-4 thường là tên cơ quan
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
    var _iterator4 = _createForOfIteratorHelper(lines.slice(1, 5)),
      _step4;
    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var _line = _step4.value;
        if (_line.length > 10 && _line.length < 120 && !_line.match(/^\d/) && !_line.match(/^V\/v/i) && _line === _line.toUpperCase()) {
          return _line;
        }
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }
    return '';
  }

  // ── Trích xuất người ký / chức vụ ─────────────────────────────────────────
  function extractSigner(text) {
    var lines = text.split('\n').map(function (l) {
      return l.trim();
    }).filter(Boolean);
    var reversed = _toConsumableArray(lines).reverse();
    var titlePats = [/^((?:bí\s+thư|phó\s+bí\s+thư|chủ\s+tịch|phó\s+chủ\s+tịch|thủ\s+trưởng|giám\s+đốc|trưởng\s+ban).{0,50})$/i, /^(T\/M\s+.{5,80})$/i];
    var _iterator6 = _createForOfIteratorHelper(reversed.slice(0, 20)),
      _step6;
    try {
      for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
        var line = _step6.value;
        var _iterator7 = _createForOfIteratorHelper(titlePats),
          _step7;
        try {
          for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
            var pat = _step7.value;
            if (pat.test(line)) return line;
          }
        } catch (err) {
          _iterator7.e(err);
        } finally {
          _iterator7.f();
        }
      }
    } catch (err) {
      _iterator6.e(err);
    } finally {
      _iterator6.f();
    }
    return '';
  }

  // ── Trích xuất địa danh ký ────────────────────────────────────────────────
  function extractSignLocation(text) {
    var m = text.match(/^\s*(.{3,40}),\s*ngày\s+\d{1,2}\s+tháng/mi);
    if (m && m[1]) return m[1].trim();
    return '';
  }

  // ── Phân loại mức độ ưu tiên ──────────────────────────────────────────────
  function detectPriority(text) {
    var t = text.toLowerCase();
    if (/khẩn|thượng\s+khẩn|hỏa\s+tốc|urgent|gấp|ngay\s+lập\s+tức/.test(t)) return 'high';
    if (/quan\s+trọng|lưu\s+ý|chú\s+ý|cần\s+thiết|đặc\s+biệt/.test(t)) return 'med';
    return 'low';
  }

  // ── Trích xuất từ khoá chính ──────────────────────────────────────────────
  function extractKeywords(text) {
    var kws = new Set();
    var patterns = [/(?:triển\s+khai|tổ\s+chức|thực\s+hiện|xây\s+dựng|phát\s+động)\s+(.{5,40}?)(?:\.|,|\n)/gi, /(?:cuộc\s+thi|hội\s+thi|phong\s+trào|chương\s+trình|dự\s+án|đề\s+án)\s+(.{5,60}?)(?:\.|,|\n)/gi];
    for (var _i3 = 0, _patterns = patterns; _i3 < _patterns.length; _i3++) {
      var pat = _patterns[_i3];
      pat.lastIndex = 0;
      var m = void 0;
      while ((m = pat.exec(text)) !== null && kws.size < 8) {
        var kw = m[1].trim().replace(/^["']|["']$/g, '');
        if (kw.length > 4 && kw.length < 60) kws.add(kw);
      }
    }
    return _toConsumableArray(kws).slice(0, 6);
  }

  // ── Trích xuất đầu việc / công việc cụ thể ────────────────────────────────
  function extractTasks(text) {
    var tasks = [];
    var lines = text.split('\n').map(function (l) {
      return l.trim();
    }).filter(Boolean);
    var taskPat = /^(?:\d+[.)]\s*|[•\-–]\s*|[a-z][.)]\s*)(.{10,120})$/;
    var _iterator8 = _createForOfIteratorHelper(lines),
      _step8;
    try {
      for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
        var line = _step8.value;
        var m = line.match(taskPat);
        if (m && m[1]) {
          var task = m[1].trim();
          if (!task.match(/^(?:Điều|Khoản|Mục)\s+\d/)) {
            tasks.push(task);
          }
          if (tasks.length >= 8) break;
        }
      }
    } catch (err) {
      _iterator8.e(err);
    } finally {
      _iterator8.f();
    }
    return tasks;
  }

  // ── Trích xuất đơn vị/cá nhân thực hiện ──────────────────────────────────
  function extractRecipients(text) {
    var recipients = [];
    var pats = [/(?:yêu\s+cầu|đề\s+nghị|giao\s+cho|giao)\s+((?:[A-ZĐÀÁẢÃẠĂẮẶẲẴẰÂẤẦẨẪẬÊẾỀỆỂỄÔỐỒỔỖỘƯỨỪỬỮỰĐ][^\n,;.]{3,60})(?:[,;]\s*(?:[A-ZĐÀÁẢÃẠĂẮẶẲẴẰÂẤẦẨẪẬÊẾỀỆỂỄÔỐỒỔỖỘƯỨỪỬỮỰĐ][^\n,;.]{3,60})){0,4})/gi, /(?:kính\s+gửi|gửi)[:\s]+(.{5,200}?)(?:\n\n|\n(?=[A-ZĐÀÁẢÃẠĂẮẶẲẴẰÂẤẦẨẪẬÊẾỀỆỂỄÔỐỒỔỖỘƯỨỪỬỮỰĐ]))/gi];
    for (var _i4 = 0, _pats2 = pats; _i4 < _pats2.length; _i4++) {
      var pat = _pats2[_i4];
      pat.lastIndex = 0;
      var m = pat.exec(text);
      if (m && m[1]) {
        recipients.push.apply(recipients, _toConsumableArray(m[1].split(/[,;]\s*/).map(function (r) {
          return r.trim();
        }).filter(function (r) {
          return r.length > 3;
        })));
        if (recipients.length >= 5) break;
      }
    }
    return _toConsumableArray(new Set(recipients)).slice(0, 5);
  }

  // ── Hàm chính: phân tích văn bản offline ──────────────────────────────────
  function analyzeDocumentOffline(text) {
    var filename = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    if (!text) return {};

    // Chuẩn hóa text: normalize whitespace nhưng giữ newline
    var normalized = text.replace(/\r\n/g, '\n').replace(/\t/g, ' ');

    // 1. Loại văn bản
    var type = 'khac';
    var _iterator9 = _createForOfIteratorHelper(TYPE_MAP),
      _step9;
    try {
      for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
        var _step9$value = _step9.value,
          t = _step9$value.type,
          patterns = _step9$value.patterns;
        if (patterns.some(function (p) {
          return p.test(normalized);
        })) {
          type = t;
          break;
        }
      }

      // 2. Tiêu đề: tìm dòng có từ khóa loại VB
    } catch (err) {
      _iterator9.e(err);
    } finally {
      _iterator9.f();
    }
    var title = '';
    var titlePat = /(?:kế\s+hoạch|chỉ\s+thị|nghị\s+quyết|công\s+văn|thông\s+báo|báo\s+cáo|tờ\s+trình|biên\s+bản|quyết\s+định|hướng\s+dẫn|chương\s+trình)[^\n]{5,200}/i;
    var tm = normalized.match(titlePat);
    if (tm) title = tm[0].trim().replace(/^[:\-–]+\s*/, '');
    if (!title && filename) title = filename.replace(/\.[^.]+$/, '').replace(/[_\-]+/g, ' ');

    // 3. Số/Ký hiệu văn bản
    var code = extractCode(normalized);

    // 4. Cơ quan ban hành
    var issuer = extractIssuer(normalized);

    // 5. Ngày tháng
    var issueDate = extractIssueDate(normalized);
    var deadline = extractDeadline(normalized);
    var reportDate = extractReportDate(normalized);

    // 6. Mức độ ưu tiên
    var priority = detectPriority(normalized);

    // 7. Từ khoá
    var keywords = extractKeywords(normalized);

    // 8. Công việc
    var mainTasks = extractTasks(normalized);

    // 9. Người ký / địa danh
    var signer = extractSigner(normalized);
    var signLocation = extractSignLocation(normalized);

    // 10. Đơn vị thực hiện
    var recipients = extractRecipients(normalized);

    // 11. Tóm tắt sơ bộ (3 câu đầu có ý nghĩa)
    var sentences = normalized.split(/(?<=[.!?])\s+/).map(function (s) {
      return s.trim();
    }).filter(function (s) {
      return s.length > 30 && s.length < 300;
    }).slice(0, 3);
    var summary = sentences.join(' ');

    // 12. Ghi chú nhắc nhở
    var reminderParts = [];
    if (deadline) reminderParts.push("H\u1EA1n ho\xE0n th\xE0nh: ".concat(deadline));
    if (reportDate) reminderParts.push("H\u1EA1n b\xE1o c\xE1o KQ: ".concat(reportDate));
    if (priority === 'high') reminderParts.push('⚠️ VĂN BẢN KHẨN — cần xử lý ngay');
    var reminderNotes = reminderParts.join(' | ');
    return {
      title: title,
      type: type,
      code: code,
      issuer: issuer,
      issueDate: issueDate,
      deadline: deadline,
      reportDate: reportDate,
      summary: summary,
      mainTasks: mainTasks,
      priority: priority,
      keywords: keywords,
      signer: signer,
      signLocation: signLocation,
      recipients: recipients,
      reminderNotes: reminderNotes,
      _source: 'offline-v2'
    };
  }

  // ── Gắn vào window.AI.offline ─────────────────────────────────────────────
  if (!window.AI) window.AI = {};
  window.AI.offline = {
    analyzeDocument: analyzeDocumentOffline,
    extractCode: extractCode,
    extractDeadline: extractDeadline,
    extractIssueDate: extractIssueDate,
    parseDate: parseDate,
    version: '2.0'
  };
  console.log('[ĐoànVăn AI Engine Offline v2.0] ✓ Loaded — NLP nâng cao, hỗ trợ số/ký hiệu + hạn xử lý');
})();

// ─────────────────────────────────────────────────────────────────────────────
//  PHẦN 2: GEMINI PROMPT CHUYÊN NGHIỆP — callAI() / callGemini() nâng cấp
// ─────────────────────────────────────────────────────────────────────────────

(function installGeminiEngine() {
  'use strict';

  // Resolve model name từ alias
  function resolveModel(alias) {
    var MAP = {
      'auto': 'gemini-2.5-flash-lite',
      'fast': 'gemini-2.5-flash-lite',
      'balanced': 'gemini-2.5-flash',
      'powerful': 'gemini-2.0-flash',
      'gemini-flash-lite': 'gemini-2.5-flash-lite',
      'gemini-flash': 'gemini-2.5-flash',
      'gemini-2.0': 'gemini-2.0-flash'
    };
    return MAP[alias] || alias || 'gemini-2.5-flash-lite';
  }

  // Gọi Gemini API
  function callGemini(_x, _x2, _x3) {
    return _callGemini.apply(this, arguments);
  } // callAI: chọn AI hay offline dựa trên cài đặt
  function _callGemini() {
    _callGemini = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(prompt, apiKey, model) {
      var _data$candidates;
      var s, key, mdl, url, body, resp, _e$error, e, data;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            s = typeof DB !== 'undefined' ? DB.getObj('settings') : {};
            key = apiKey || s.apiKey;
            mdl = resolveModel(model || s.aiModel);
            if (key) {
              _context.n = 1;
              break;
            }
            throw new Error('Chưa có API Key — vào Cài đặt để thêm');
          case 1:
            url = "https://generativelanguage.googleapis.com/v1beta/models/".concat(mdl, ":generateContent?key=").concat(key);
            body = {
              contents: [{
                parts: [{
                  text: prompt
                }]
              }],
              generationConfig: {
                temperature: 0.1,
                // Thấp để đảm bảo chính xác
                maxOutputTokens: 8192,
                // Đủ để chứa JSON đầy đủ
                topP: 0.8
              }
            };
            _context.n = 2;
            return fetch(url, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(body)
            });
          case 2:
            resp = _context.v;
            if (resp.ok) {
              _context.n = 4;
              break;
            }
            _context.n = 3;
            return resp.json();
          case 3:
            e = _context.v;
            throw new Error(((_e$error = e.error) === null || _e$error === void 0 ? void 0 : _e$error.message) || 'API error');
          case 4:
            _context.n = 5;
            return resp.json();
          case 5:
            data = _context.v;
            return _context.a(2, ((_data$candidates = data.candidates) === null || _data$candidates === void 0 || (_data$candidates = _data$candidates[0]) === null || _data$candidates === void 0 || (_data$candidates = _data$candidates.content) === null || _data$candidates === void 0 || (_data$candidates = _data$candidates.parts) === null || _data$candidates === void 0 || (_data$candidates = _data$candidates[0]) === null || _data$candidates === void 0 ? void 0 : _data$candidates.text) || '');
        }
      }, _callee);
    }));
    return _callGemini.apply(this, arguments);
  }
  function callAI(_x4) {
    return _callAI.apply(this, arguments);
  }
  function _callAI() {
    _callAI = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(prompt) {
      var s;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            s = typeof DB !== 'undefined' ? DB.getObj('settings') : {};
            if (!s.apiKey) {
              _context2.n = 2;
              break;
            }
            _context2.n = 1;
            return callGemini(prompt, s.apiKey, s.aiModel);
          case 1:
            return _context2.a(2, _context2.v);
          case 2:
            throw new Error('Chưa có API Key — vào Cài đặt để thêm');
          case 3:
            return _context2.a(2);
        }
      }, _callee2);
    }));
    return _callAI.apply(this, arguments);
  }
  window.callGemini = callGemini;
  window.callAI = callAI;
  if (!window.AI) window.AI = {};
  window.AI.resolveModel = resolveModel;
})();

// ─────────────────────────────────────────────────────────────────────────────
//  PHẦN 3: PROMPT CHUYÊN NGHIỆP — analyzeWithAI() NÂNG CẤP
//  Thay thế hàm analyzeWithAI trong index.html
// ─────────────────────────────────────────────────────────────────────────────

/**
 * BUILD PROMPT — tạo prompt Gemini chuyên nghiệp với ngữ cảnh đầy đủ
 *
 * Chiến lược prompt:
 *  1. Role priming: định vị AI là chuyên gia văn thư HC
 *  2. Chain-of-thought hidden: yêu cầu suy luận nội bộ trước khi xuất JSON
 *  3. Few-shot examples cho các trường khó (số/ký hiệu, hạn xử lý)
 *  4. Validation rules tường minh để AI tự kiểm tra
 *  5. Fallback rules: khi không tìm thấy → trả chuỗi rỗng, không đoán mò
 */
function buildAnalysisPrompt(text, filename) {
  // Cắt thông minh: lấy 1500 ký tự đầu + 1500 ký tự cuối để bắt cả phần ký tên
  var head = text.substring(0, 4000);
  var tail = text.length > 5000 ? '\n...\n' + text.substring(text.length - 2000) : '';
  var sample = head + tail;
  return "B\u1EA1n l\xE0 chuy\xEAn gia v\u0103n th\u01B0 h\xE0nh ch\xEDnh cao c\u1EA5p, am hi\u1EC3u s\xE2u v\u1EC1:\n\u2022 Ngh\u1ECB \u0111\u1ECBnh 30/2020/N\u0110-CP v\u1EC1 th\u1EC3 th\u1EE9c v\xE0 k\u1EF9 thu\u1EADt tr\xECnh b\xE0y v\u0103n b\u1EA3n h\xE0nh ch\xEDnh\n\u2022 H\u1EC7 th\u1ED1ng v\u0103n b\u1EA3n c\u1EE7a t\u1ED5 ch\u1EE9c \u0110o\xE0n TNCS H\u1ED3 Ch\xED Minh\n\u2022 C\xE1c quy \u01B0\u1EDBc vi\u1EBFt t\u1EAFt k\xFD hi\u1EC7u v\u0103n b\u1EA3n Vi\u1EC7t Nam (KH, CV, TB, Q\u0110, NQ, CT, BB, v.v.)\n\nNHI\u1EC6M V\u1EE4: Ph\xE2n t\xEDch v\u0103n b\u1EA3n b\xEAn d\u01B0\u1EDBi v\xE0 tr\u1EA3 v\u1EC1 **ch\u1EC9 m\u1ED9t \u0111\u1ED1i t\u01B0\u1EE3ng JSON h\u1EE3p l\u1EC7**, kh\xF4ng c\xF3 markdown, kh\xF4ng c\xF3 gi\u1EA3i th\xEDch.\n\n\u2501\u2501\u2501 V\u0102N B\u1EA2N C\u1EA6N PH\xC2N T\xCDCH \u2501\u2501\u2501\nT\xEAn t\u1EC7p: ".concat(filename, "\n---\n").concat(sample, "\n\u2501\u2501\u2501 H\u1EBET V\u0102N B\u1EA2N \u2501\u2501\u2501\n\n\u2501\u2501\u2501 QUY T\u1EAEC TR\xCDCH XU\u1EA4T B\u1EAET BU\u1ED8C \u2501\u2501\u2501\n\n\u3010S\u1ED0/K\xDD HI\u1EC6U\u3011\n- \u0110\u1ECBnh d\u1EA1ng chu\u1EA9n VN: <s\u1ED1>/<lo\u1EA1i>-<\u0111\u01A1n v\u1ECB> ho\u1EB7c <s\u1ED1>-<lo\u1EA1i>/<\u0111\u01A1n v\u1ECB>\n- V\xED d\u1EE5 \u0111\xFAng: \"56/KH-\u0110TN\", \"54-CV/\u0110TN\", \"12/2026/Q\u0110-UBND\", \"03/TB-BTV\"\n- T\xECm \u1EDF: d\xF2ng \"S\u1ED1:\", ti\xEAu \u0111\u1EC1 v\u0103n b\u1EA3n, \u0111\u1EA7u trang\n- N\u1EBEU KH\xD4NG C\xD3: tr\u1EA3 \"\"\n\n\u3010H\u1EA0N HO\xC0N TH\xC0NH / H\u1EA0N X\u1EEC L\xDD\u3011\n- T\xECm c\xE1c c\u1EE5m: \"h\u1EA1n ch\xF3t\", \"tr\u01B0\u1EDBc ng\xE0y\", \"ch\u1EADm nh\u1EA5t\", \"ho\xE0n th\xE0nh tr\u01B0\u1EDBc\", \"h\u1EA1n n\u1ED9p\", \"deadline\"\n- Chuy\u1EC3n sang \u0111\u1ECBnh d\u1EA1ng YYYY-MM-DD\n- Ph\xE2n bi\u1EC7t: deadline th\u1EF1c hi\u1EC7n (field \"deadline\") \u2260 ng\xE0y b\xE1o c\xE1o k\u1EBFt qu\u1EA3 (field \"reportDate\")\n- N\u1EBEU KH\xD4NG C\xD3: tr\u1EA3 \"\"\n\n\u3010NG\xC0Y BAN H\xC0NH\u3011\n- L\xE0 ng\xE0y v\u0103n b\u1EA3n \u0111\u01B0\u1EE3c k\xFD ban h\xE0nh (th\u01B0\u1EDDng \u1EDF cu\u1ED1i v\u0103n b\u1EA3n, sau \u0111\u1ECBa danh)\n- \u0110\u1ECBnh d\u1EA1ng: YYYY-MM-DD\n- N\u1EBEU KH\xD4NG C\xD3: tr\u1EA3 \"\"\n\n\u3010LO\u1EA0I V\u0102N B\u1EA2N\u3011\n- Ch\u1ECDn \u0110\xDANG M\u1ED8T trong: chi-thi | nghi-quyet | ke-hoach | bao-cao | cong-van | thong-bao | to-trinh | bien-ban | quyet-dinh | huong-dan | chuong-trinh | khac\n\n\u3010\u0110\u1ED8 \u01AFU TI\xCAN\u3011\n- high: c\xF3 t\u1EEB \"kh\u1EA9n\", \"h\u1ECFa t\u1ED1c\", \"th\u01B0\u1EE3ng kh\u1EA9n\", ho\u1EB7c th\u1EDDi h\u1EA1n \u2264 7 ng\xE0y\n- med: quan tr\u1ECDng, c\u1EA7n ch\xFA \xFD, th\u1EDDi h\u1EA1n 8\u201330 ng\xE0y\n- low: th\xF4ng th\u01B0\u1EDDng, th\u1EDDi h\u1EA1n > 30 ng\xE0y ho\u1EB7c kh\xF4ng c\xF3\n\n\u2501\u2501\u2501 C\u1EA4U TR\xDAC JSON TR\u1EA2 V\u1EC0 \u2501\u2501\u2501\n{\n  \"title\": \"ti\xEAu \u0111\u1EC1 \u0111\u1EA7y \u0111\u1EE7 v\xE0 ch\xEDnh x\xE1c c\u1EE7a v\u0103n b\u1EA3n (kh\xF4ng vi\u1EBFt t\u1EAFt)\",\n  \"type\": \"lo\u1EA1i v\u0103n b\u1EA3n theo m\xE3 \u1EDF tr\xEAn\",\n  \"code\": \"s\u1ED1/k\xFD hi\u1EC7u v\u0103n b\u1EA3n, v\xED d\u1EE5: 56/KH-\u0110TN ho\u1EB7c r\u1ED7ng n\u1EBFu kh\xF4ng c\xF3\",\n  \"issuer\": \"t\xEAn \u0111\u1EA7y \u0111\u1EE7 c\u01A1 quan/\u0111\u01A1n v\u1ECB ban h\xE0nh\",\n  \"issueDate\": \"YYYY-MM-DD ho\u1EB7c r\u1ED7ng\",\n  \"deadline\": \"YYYY-MM-DD h\u1EA1n ho\xE0n th\xE0nh/x\u1EED l\xFD, ho\u1EB7c r\u1ED7ng\",\n  \"reportDate\": \"YYYY-MM-DD h\u1EA1n b\xE1o c\xE1o k\u1EBFt qu\u1EA3 v\u1EC1 c\u01A1 quan c\u1EA5p tr\xEAn, ho\u1EB7c r\u1ED7ng\",\n  \"signLocation\": \"\u0111\u1ECBa danh n\u01A1i k\xFD v\u0103n b\u1EA3n (v\xED d\u1EE5: \u0110\u1ED3ng Th\xE1p)\",\n  \"signer\": \"h\u1ECD t\xEAn ng\u01B0\u1EDDi k\xFD v\xE0 ch\u1EE9c v\u1EE5\",\n  \"recipients\": [\"\u0111\u01A1n v\u1ECB/c\xE1 nh\xE2n th\u1EF1c hi\u1EC7n 1\", \"\u0111\u01A1n v\u1ECB/c\xE1 nh\xE2n th\u1EF1c hi\u1EC7n 2\"],\n  \"summary\": \"t\xF3m t\u1EAFt n\u1ED9i dung ch\xEDnh trong 3\u20135 c\xE2u, b\xE1m s\xE1t v\u0103n b\u1EA3n g\u1ED1c\",\n  \"mainTasks\": [\"c\xF4ng vi\u1EC7c c\u1EE5 th\u1EC3 1\", \"c\xF4ng vi\u1EC7c c\u1EE5 th\u1EC3 2\", \"c\xF4ng vi\u1EC7c c\u1EE5 th\u1EC3 3\"],\n  \"priority\": \"high|med|low\",\n  \"keywords\": [\"t\u1EEB kh\xF3a 1\", \"t\u1EEB kh\xF3a 2\", \"t\u1EEB kh\xF3a 3\"],\n  \"reminderNotes\": \"ghi ch\xFA nh\u1EAFc vi\u1EC7c quan tr\u1ECDng nh\u1EA5t (h\u1EA1n, y\xEAu c\u1EA7u \u0111\u1EB7c bi\u1EC7t)\",\n  \"legalBasis\": \"c\u0103n c\u1EE9 ph\xE1p l\xFD ch\xEDnh n\u1EBFu c\xF3\"\n}\n\nTr\u1EA3 v\u1EC1 JSON thu\u1EA7n t\xFAy, kh\xF4ng b\u1ECDc trong markdown code block.");
}

// ── analyzeWithAI nâng cấp ────────────────────────────────────────────────────
// Tích hợp: offline phân tích trước → Gemini bổ sung → merge thông minh
function analyzeWithAI(_x5, _x6) {
  return _analyzeWithAI.apply(this, arguments);
} // Gắn ra global để index.html sử dụng
function _analyzeWithAI() {
  _analyzeWithAI = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(text, filename) {
    var offlineResult, s, prompt, raw, json, clean, jsonMatch, merged, _t2;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.p = _context4.n) {
        case 0:
          // Bước 1: Offline pre-scan — đảm bảo số/ký hiệu và hạn xử lý luôn có kết quả dự phòng
          offlineResult = window.AI && window.AI.offline ? window.AI.offline.analyzeDocument(text, filename) : {};
          s = typeof DB !== 'undefined' ? DB.getObj('settings') : {}; // Bước 2: Nếu có API key → gọi Gemini với prompt nâng cấp
          if (!s.apiKey) {
            _context4.n = 5;
            break;
          }
          _context4.p = 1;
          prompt = buildAnalysisPrompt(text, filename);
          _context4.n = 2;
          return callAI(prompt);
        case 2:
          raw = _context4.v;
          json = null;
          try {
            clean = raw.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim(); // Tìm JSON object trong response
            jsonMatch = clean.match(/\{[\s\S]*\}/);
            if (jsonMatch) json = JSON.parse(jsonMatch[0]);
          } catch (_unused3) {
            json = null;
          }
          if (json) {
            // Bước 3: Merge — ưu tiên Gemini, dùng offline để điền những gì Gemini bỏ sót
            merged = _objectSpread(_objectSpread(_objectSpread({}, offlineResult), json), {}, {
              // Nếu Gemini không trích được code/deadline → dùng offline
              code: json.code || offlineResult.code || '',
              deadline: json.deadline || offlineResult.deadline || '',
              reportDate: json.reportDate || offlineResult.reportDate || '',
              issueDate: json.issueDate || offlineResult.issueDate || '',
              issuer: json.issuer || offlineResult.issuer || '',
              signer: json.signer || offlineResult.signer || '',
              signLocation: json.signLocation || offlineResult.signLocation || '',
              recipients: json.recipients && json.recipients.length ? json.recipients : offlineResult.recipients || [],
              _source: 'gemini+offline-v2'
            });
            showAiReviewModal(merged, text, filename);
          } else {
            if (typeof toast === 'function') toast("AI kh\xF4ng tr\u1EA3 v\u1EC1 JSON h\u1EE3p l\u1EC7 cho ".concat(filename, " \u2014 d\xF9ng k\u1EBFt qu\u1EA3 offline"), 'warning');
            showAiReviewModal(offlineResult, text, filename);
          }
          _context4.n = 4;
          break;
        case 3:
          _context4.p = 3;
          _t2 = _context4.v;
          if (typeof toast === 'function') toast("L\u1ED7i Gemini: ".concat(_t2.message, " \u2014 d\xF9ng k\u1EBFt qu\u1EA3 offline"), 'warning');
          showAiReviewModal(offlineResult, text, filename);
        case 4:
          _context4.n = 6;
          break;
        case 5:
          // Không có API key: dùng offline 100%
          if (Object.keys(offlineResult).length) {
            showAiReviewModal(offlineResult, text, filename);
          } else {
            if (typeof toast === 'function') toast('Chưa có API Key và offline không phân tích được. Vui lòng nhập thủ công.', 'warning');
            if (typeof saveDocFallback === 'function') saveDocFallback(filename, text);
          }
        case 6:
          return _context4.a(2);
      }
    }, _callee4, null, [[1, 3]]);
  }));
  return _analyzeWithAI.apply(this, arguments);
}
window.analyzeWithAI = analyzeWithAI;
window.buildAnalysisPrompt = buildAnalysisPrompt;

// ─────────────────────────────────────────────────────────────────────────────
//  SAFETY SHIM v3.0 — Bổ sung các method còn thiếu nếu doanvan-ai-engine.js
//  chưa được load (standalone mode hoặc load thất bại).
//  Khi engine.js đã load, các method dưới đây KHÔNG override (đã có rồi).
// ─────────────────────────────────────────────────────────────────────────────
(function installAIShims() {
  'use strict';

  if (!window.AI) window.AI = {};

  // ── QuotaGuard shim ──────────────────────────────────────────────────────
  var QUOTA_PREFIX = 'doanvan_aiquota_';
  var MODELS_META = [{
    id: 'gemini-2.5-flash-lite',
    label: 'Gemini 2.5 Flash-Lite',
    rpm: 15,
    rpd: 1000,
    tier: 'primary'
  }, {
    id: 'gemini-2.5-flash',
    label: 'Gemini 2.5 Flash',
    rpm: 10,
    rpd: 250,
    tier: 'secondary'
  }, {
    id: 'gemini-2.0-flash',
    label: 'Gemini 2.0 Flash',
    rpm: 15,
    rpd: 1500,
    tier: 'tertiary'
  }];
  function _today() {
    return new Date().toISOString().split('T')[0];
  }
  function _mkey() {
    var n = new Date();
    return "".concat(n.getHours(), "_").concat(n.getMinutes());
  }
  function _sk(id, t) {
    return "".concat(QUOTA_PREFIX).concat(id, "_").concat(t);
  }
  function _getUsage(id) {
    try {
      var d = JSON.parse(localStorage.getItem(_sk(id, 'day')) || '{}');
      var m = JSON.parse(localStorage.getItem(_sk(id, 'min')) || '{}');
      return {
        today: _today() === d.date ? d.count || 0 : 0,
        thisMinute: _mkey() === m.key ? m.count || 0 : 0
      };
    } catch (_unused) {
      return {
        today: 0,
        thisMinute: 0
      };
    }
  }

  // getQuotaStatus — gọi bởi updateQuotaDisplay() trong index.html
  if (typeof window.AI.getQuotaStatus !== 'function') {
    window.AI.getQuotaStatus = function () {
      return MODELS_META.map(function (m) {
        var u = _getUsage(m.id);
        var pct = Math.round(u.today / m.rpd * 100);
        return {
          model: m.id,
          label: m.label,
          tier: m.tier,
          todayUsed: u.today,
          todayLimit: m.rpd,
          minuteUsed: u.thisMinute,
          minuteLimit: m.rpm,
          available: u.today < m.rpd && u.thisMinute < m.rpm,
          pct: pct
        };
      });
    };
  }

  // testKey — gọi bởi testApiKey() trong index.html
  if (typeof window.AI.testKey !== 'function') {
    window.AI.testKey = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(key, modelId) {
        var mdl, _data$candidates2, url, resp, _e$error2, e, err, data, text, _t;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              mdl = modelId || 'gemini-2.5-flash-lite';
              _context3.p = 1;
              url = "https://generativelanguage.googleapis.com/v1beta/models/".concat(mdl, ":generateContent?key=").concat(key);
              _context3.n = 2;
              return fetch(url, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  contents: [{
                    parts: [{
                      text: 'Trả lời: OK'
                    }]
                  }],
                  generationConfig: {
                    maxOutputTokens: 10,
                    temperature: 0
                  }
                })
              });
            case 2:
              resp = _context3.v;
              if (resp.ok) {
                _context3.n = 4;
                break;
              }
              _context3.n = 3;
              return resp.json().catch(function () {
                return {};
              });
            case 3:
              e = _context3.v;
              err = new Error(((_e$error2 = e.error) === null || _e$error2 === void 0 ? void 0 : _e$error2.message) || "HTTP ".concat(resp.status));
              err.status = resp.status;
              return _context3.a(2, {
                ok: false,
                error: err.message,
                status: resp.status
              });
            case 4:
              _context3.n = 5;
              return resp.json();
            case 5:
              data = _context3.v;
              text = ((_data$candidates2 = data.candidates) === null || _data$candidates2 === void 0 || (_data$candidates2 = _data$candidates2[0]) === null || _data$candidates2 === void 0 || (_data$candidates2 = _data$candidates2.content) === null || _data$candidates2 === void 0 || (_data$candidates2 = _data$candidates2.parts) === null || _data$candidates2 === void 0 || (_data$candidates2 = _data$candidates2[0]) === null || _data$candidates2 === void 0 ? void 0 : _data$candidates2.text) || '';
              return _context3.a(2, {
                ok: true,
                model: mdl,
                label: mdl
              });
            case 6:
              _context3.p = 6;
              _t = _context3.v;
              if (!(_t.status === 429)) {
                _context3.n = 7;
                break;
              }
              return _context3.a(2, {
                ok: false,
                error: 'quota hết (429)',
                status: 429
              });
            case 7:
              return _context3.a(2, {
                ok: false,
                error: _t.message,
                status: _t.status
              });
          }
        }, _callee3, null, [[1, 6]]);
      }));
      return function (_x7, _x8) {
        return _ref.apply(this, arguments);
      };
    }();
  }

  // canGoOnline
  if (typeof window.AI.canGoOnline !== 'function') {
    window.AI.canGoOnline = function () {
      try {
        var s = JSON.parse(localStorage.getItem('doanvan_settings') || '{}');
        return !!(s.apiKey && navigator.onLine);
      } catch (_unused2) {
        return false;
      }
    };
  }

  // getModelList
  if (typeof window.AI.getModelList !== 'function') {
    window.AI.getModelList = function () {
      return MODELS_META;
    };
  }

  // resolveModel shim (nếu chưa có)
  if (typeof window.AI.resolveModel !== 'function') {
    window.AI.resolveModel = function (id) {
      var MAP = {
        'auto': 'gemini-2.5-flash-lite',
        'fast': 'gemini-2.5-flash-lite',
        'gemini-2.5-flash-lite-preview-06-17': 'gemini-2.5-flash-lite',
        'gemini-2.5-flash-lite-preview': 'gemini-2.5-flash-lite',
        'gemini-1.5-flash': 'gemini-2.0-flash',
        'gemini-1.5-pro': 'gemini-2.5-flash'
      };
      return MAP[id] || id || 'gemini-2.5-flash-lite';
    };
  }
  console.log('[ĐoànVăn AI Shim v3.0] ✓ getQuotaStatus · testKey · canGoOnline · getModelList — sẵn sàng');
})();
console.log('[ĐoànVăn AI Engine v2.0] ✓ analyzeWithAI nâng cấp — Prompt chuyên nghiệp + Offline NLP v2');
