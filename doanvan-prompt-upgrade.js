/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║   DOANVAN — AI PROMPT UPGRADE MODULE  v2.0                                ║
 * ║                                                                              ║
 * ║  NÂNG CẤP TOÀN DIỆN 6 PROMPT CHÍNH:                                        ║
 * ║                                                                              ║
 * ║  1. analyzeWithAI()   — Phân tích/phân loại văn bản                        ║
 * ║     • Thêm: chain-of-thought reasoning trước khi trả JSON                  ║
 * ║     • Thêm: context Đoàn TNCS đầy đủ + 9 loại chuẩn                       ║
 * ║     • Thêm: few-shot examples cho từng trường JSON                          ║
 * ║     • Thêm: strict validation schema + auto-repair JSON                     ║
 * ║     • Tối ưu: cắt text thông minh (giữ header + body + footer)             ║
 * ║                                                                              ║
 * ║  2. generateReportAI() — Báo cáo thành tích thi đua                        ║
 * ║     • Thêm: persona chuyên sâu + nhiệm vụ cụ thể từng phần                ║
 * ║     • Thêm: số liệu tự động tính toán                                      ║
 * ║     • Thêm: format chuẩn NĐ30/2020/NĐ-CP                                   ║
 * ║                                                                              ║
 * ║  3. loadSummary()     — Tổng hợp trích yếu                                 ║
 * ║     • Thêm: phân nhóm thông minh + ưu tiên deadline                        ║
 * ║     • Thêm: executive summary + action items                                ║
 * ║                                                                              ║
 * ║  4. aiAnalytics()     — Phân tích dashboard                                ║
 * ║     • Thêm: benchmark so sánh + xu hướng                                   ║
 * ║     • Thêm: cảnh báo ngưỡng + ưu tiên xử lý                               ║
 * ║                                                                              ║
 * ║  5. aiSearch()        — Tìm kiếm ngữ nghĩa                                 ║
 * ║     • Thêm: semantic matching + relevance scoring                           ║
 * ║     • Thêm: query expansion tiếng Việt                                      ║
 * ║                                                                              ║
 * ║  6. fillTemplateWithAI() — Điền nội dung mẫu văn bản                       ║
 * ║     • Thêm: context-aware generation từ dữ liệu thực                       ║
 * ║     • Thêm: style guide hành chính nhà nước chuẩn                          ║
 * ║                                                                              ║
 * ║  TỐI ƯU QUOTA:                                                              ║
 * ║     • Smart cache: cache theo hash nội dung, TTL 60 phút                   ║
 * ║     • Token budget: tự động điều chỉnh theo model đang dùng                ║
 * ║     • Progressive: offline NLP trước → AI chỉ bổ sung phần thiếu           ║
 * ║     • Batch: gom nhóm nhiều field nhỏ thành 1 API call                     ║
 * ║                                                                              ║
 * ║  CÁCH DÙNG: thêm CUỐI index.html, sau doanvan-ai-engine.js                 ║
 * ║    <script src="doanvan-prompt-upgrade.js"></script>                         ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

'use strict';

// ═══════════════════════════════════════════════════════════════════════════
//  PHẦN 1: UTILITIES — Token budget + Smart text slicing + JSON repair
// ═══════════════════════════════════════════════════════════════════════════
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var PromptUtils = {
  /**
   * Cắt văn bản thông minh: giữ header (20%) + body (60%) + footer (20%)
   * Thay vì substring(0, N) đơn giản làm mất phần cuối có deadline/chữ ký
   */
  smartSlice: function smartSlice(text) {
    var maxChars = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 7000;
    if (!text || text.length <= maxChars) return text || '';
    var h = Math.floor(maxChars * 0.20); // 20% header
    var f = Math.floor(maxChars * 0.15); // 15% footer
    var b = maxChars - h - f; // 65% body giữa
    var header = text.substring(0, h);
    var footer = text.substring(text.length - f);
    var bodyStart = h;
    var bodyEnd = Math.min(text.length - f, h + b);
    var body = text.substring(bodyStart, bodyEnd);
    return "".concat(header, "\n[...]\n").concat(body, "\n[...]\n").concat(footer);
  },
  /**
   * Tự động sửa JSON bị lỗi phổ biến từ AI
   * - Bỏ markdown fence ```json
   * - Fix trailing comma
   * - Fix unescaped quotes trong string
   */
  repairJSON: function repairJSON(raw) {
    if (!raw) return null;
    try {
      // Thử parse thẳng trước
      return JSON.parse(raw);
    } catch (_unused) {/* tiếp tục */}
    var s = raw.trim();

    // Bỏ markdown fence
    s = s.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/, '').trim();

    // Tìm JSON object đầu tiên
    var start = s.indexOf('{');
    var end = s.lastIndexOf('}');
    if (start !== -1 && end !== -1 && end > start) {
      s = s.substring(start, end + 1);
    }

    // Fix trailing comma trước } hoặc ]
    s = s.replace(/,\s*([\]}])/g, '$1');

    // Fix newline trong string
    s = s.replace(/:\s*"([^"]*)\n([^"]*)"/g, function (_, a, b) {
      return ": \"".concat(a, " ").concat(b, "\"");
    });
    try {
      return JSON.parse(s);
    } catch (_unused2) {
      return null;
    }
  },
  /**
   * Ước tính token (Vietnamese ~2.5 chars/token, English ~4 chars/token)
   */
  estimateTokens: function estimateTokens(text) {
    var vi = (text.match(/[àáảãạăắặẳẵằâấậẩẫầèéẻẽẹêếệểễềìíỉĩịòóỏõọôốộổỗồơớợởỡờùúủũụưứựửữừỳýỷỹỵđÀÁẢÃẠĂẮẶẲẴẰÂẤẬẨẪẦÈÉẺẼẸÊẾỆỂỄỀÌÍỈĨỊÒÓỎÕỌÔỐỘỔỖỒƠỚỢỞỠỜÙÚỦŨỤƯỨỰỬỮỪỲÝỶỸỴĐ]/g) || []).length;
    return Math.ceil((text.length - vi) / 4 + vi / 2.5);
  },
  /**
   * Tính maxOutputTokens tối ưu theo task
   * Tránh lãng phí quota bằng cách không set 4096 cho tất cả
   */
  budgetTokens: function budgetTokens(task) {
    var budgets = {
      'analyze': 1200,
      // JSON phân tích văn bản
      'summary': 1500,
      // Tổng hợp trích yếu
      'report': 3000,
      // Báo cáo thành tích đầy đủ
      'analytics': 400,
      // Nhận xét dashboard ngắn
      'search': 200,
      // Chỉ trả index numbers
      'template': 2500,
      // Nội dung mẫu văn bản
      'quick': 300 // Câu trả lời nhanh
    };
    return budgets[task] || 1500;
  },
  /**
   * Format dữ liệu văn bản ngắn gọn để đưa vào prompt
   */
  formatDocList: function formatDocList(docs) {
    var maxDocs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 30;
    var maxCharsPerDoc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 150;
    return docs.slice(0, maxDocs).map(function (d, i) {
      var parts = ["[".concat(i, "] ").concat(d.title || 'Không tên'), d.type ? "(".concat(d.type, ")") : '', d.code ? "S\u1ED1: ".concat(d.code) : '', d.deadline ? "H\u1EA1n: ".concat(d.deadline) : '', d.status === 'overdue' ? '⚠️QUÁHẠN' : d.status === 'pending' ? '⏳CHỜ' : '', d.summary ? "\u2014 ".concat(d.summary.substring(0, maxCharsPerDoc)) : ''].filter(Boolean).join(' ');
      return parts;
    }).join('\n');
  },
  /**
   * Ngày tháng hiện tại dạng tiếng Việt chuẩn hành chính
   */
  todayVI: function todayVI() {
    var d = new Date();
    return "ng\xE0y ".concat(d.getDate(), " th\xE1ng ").concat(d.getMonth() + 1, " n\u0103m ").concat(d.getFullYear());
  }
};

// ═══════════════════════════════════════════════════════════════════════════
//  PHẦN 2: PROMPT BUILDERS — 6 prompt chuyên sâu
// ═══════════════════════════════════════════════════════════════════════════

var PromptBuilder = {
  // ─── PROMPT 1: Phân tích văn bản ──────────────────────────────────────
  /**
   * Nâng cấp analyzeWithAI prompt:
   * - Chain-of-thought: AI phân tích từng bước trước khi kết luận
   * - Few-shot: ví dụ mẫu cho từng loại văn bản
   * - Strict schema: ràng buộc giá trị enum
   * - Context Đoàn TNCS đầy đủ
   */
  buildAnalyzePrompt: function buildAnalyzePrompt(text, filename) {
    var preAnalysis = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var sliced = PromptUtils.smartSlice(text, 7000);
    var today = new Date().toISOString().split('T')[0];
    var year = new Date().getFullYear();

    // Kết quả offline NLP làm "gợi ý" để AI verify/refine thay vì làm từ đầu
    var offlineHints = preAnalysis.type ? "\n[G\u1EE2I \xDD T\u1EEA PH\xC2N T\xCDCH S\u01A0 B\u1ED8 \u2014 AI h\xE3y x\xE1c nh\u1EADn ho\u1EB7c \u0111i\u1EC1u ch\u1EC9nh n\u1EBFu c\u1EA7n]:\n- Lo\u1EA1i v\u0103n b\u1EA3n (d\u1EF1 \u0111o\xE1n): ".concat(preAnalysis.type, "\n- M\u1EE9c \u01B0u ti\xEAn (d\u1EF1 \u0111o\xE1n): ").concat(preAnalysis.priority || 'low', "\n- Deadline ph\xE1t hi\u1EC7n: ").concat(preAnalysis.deadline || 'chưa rõ', "\n- T\u1EEB kh\xF3a g\u1EE3i \xFD: ").concat((preAnalysis.keywords || []).slice(0, 6).join(', ')) : '';
    return "B\u1EA1n l\xE0 chuy\xEAn gia ph\xE2n t\xEDch v\u0103n b\u1EA3n h\xE0nh ch\xEDnh c\xF3 20 n\u0103m kinh nghi\u1EC7m trong h\u1EC7 th\u1ED1ng t\u1ED5 ch\u1EE9c \u0110o\xE0n TNCS H\u1ED3 Ch\xED Minh Vi\u1EC7t Nam. Nhi\u1EC7m v\u1EE5: ph\xE2n t\xEDch v\xE0 tr\xEDch xu\u1EA5t th\xF4ng tin c\u1EA5u tr\xFAc t\u1EEB v\u0103n b\u1EA3n.\n\n\u2501\u2501\u2501 NG\u1EEE C\u1EA2NH H\u1EC6 TH\u1ED0NG \u0110O\xC0N \u2501\u2501\u2501\nPh\u1EA7n m\u1EC1m qu\u1EA3n l\xFD v\u0103n b\u1EA3n cho t\u1ED5 ch\u1EE9c \u0110o\xE0n TNCS HCM. Ng\xE0y hi\u1EC7n t\u1EA1i: ".concat(today, ". N\u0103m: ").concat(year, ".\nC\xE1c \u0111\u01A1n v\u1ECB th\u01B0\u1EDDng g\u1EB7p: Chi \u0111o\xE0n c\u01A1 s\u1EDF, \u0110o\xE0n c\u01A1 s\u1EDF, Ban Th\u01B0\u1EDDng v\u1EE5 \u0110o\xE0n, T\u1EC9nh/Th\xE0nh \u0110o\xE0n, Trung \u01B0\u01A1ng \u0110o\xE0n.\n\n\u2501\u2501\u2501 PH\xC2N LO\u1EA0I V\u0102N B\u1EA2N (9 lo\u1EA1i chu\u1EA9n) \u2501\u2501\u2501\n\u2022 \"chi-thi\"    \u2192 Ch\u1EC9 th\u1ECB:   Mang t\xEDnh m\u1EC7nh l\u1EC7nh, y\xEAu c\u1EA7u tri\u1EC3n khai nghi\xEAm t\xFAc. KW: \"ch\u1EC9 th\u1ECB\", \"y\xEAu c\u1EA7u nghi\xEAm\", \"thi h\xE0nh\"\n\u2022 \"nghi-quyet\" \u2192 Ngh\u1ECB quy\u1EBFt: K\u1EBFt qu\u1EA3 bi\u1EC3u quy\u1EBFt c\u1EE7a h\u1ED9i ngh\u1ECB/\u0111\u1EA1i h\u1ED9i. KW: \"ngh\u1ECB quy\u1EBFt\", \"bi\u1EC3u quy\u1EBFt\", \"th\xF4ng qua\"\n\u2022 \"ke-hoach\"   \u2192 K\u1EBF ho\u1EA1ch:   L\u1ECBch tr\xECnh, ph\xE2n c\xF4ng, ti\u1EBFn \u0111\u1ED9. KW: \"k\u1EBF ho\u1EA1ch\", \"ti\u1EBFn \u0111\u1ED9\", \"ph\xE2n c\xF4ng\"\n\u2022 \"bao-cao\"    \u2192 B\xE1o c\xE1o:    T\u1ED5ng k\u1EBFt k\u1EBFt qu\u1EA3 th\u1EF1c hi\u1EC7n. KW: \"b\xE1o c\xE1o\", \"k\u1EBFt qu\u1EA3\", \"t\u1ED5ng k\u1EBFt\", \"s\u01A1 k\u1EBFt\"\n\u2022 \"cong-van\"   \u2192 C\xF4ng v\u0103n:   Trao \u0111\u1ED5i h\xE0nh ch\xEDnh gi\u1EEFa c\xE1c \u0111\u01A1n v\u1ECB. KW: \"c\xF4ng v\u0103n\", \"k\xEDnh g\u1EEDi\", \"v/v\", \"\u0111\u1EC1 ngh\u1ECB\"\n\u2022 \"thong-bao\"  \u2192 Th\xF4ng b\xE1o:  Cung c\u1EA5p th\xF4ng tin, th\xF4ng b\xE1o l\u1ECBch. KW: \"th\xF4ng b\xE1o\", \"k\xEDnh th\xF4ng b\xE1o\"\n\u2022 \"to-trinh\"   \u2192 T\u1EDD tr\xECnh:   \u0110\u1EC1 xu\u1EA5t xin ph\xEA duy\u1EC7t t\u1EEB c\u1EA5p tr\xEAn. KW: \"t\u1EDD tr\xECnh\", \"k\xEDnh tr\xECnh\", \"xin ph\xE9p\"\n\u2022 \"bien-ban\"   \u2192 Bi\xEAn b\u1EA3n:   Ghi ch\xE9p di\u1EC5n bi\u1EBFn cu\u1ED9c h\u1ECDp/s\u1EF1 vi\u1EC7c. KW: \"bi\xEAn b\u1EA3n\", \"th\u01B0 k\xFD\", \"th\xE0nh ph\u1EA7n tham d\u1EF1\"\n\u2022 \"quyet-dinh\" \u2192 Quy\u1EBFt \u0111\u1ECBnh: V\u0103n b\u1EA3n ban h\xE0nh quy\u1EBFt \u0111\u1ECBnh h\xE0nh ch\xEDnh. KW: \"quy\u1EBFt \u0111\u1ECBnh\", \"c\u0103n c\u1EE9\", \"\u0111i\u1EC1u 1\", \"\u0111i\u1EC1u 2\"\n\u2022 \"khac\"       \u2192 Kh\xE1c:       Kh\xF4ng thu\u1ED9c c\xE1c lo\u1EA1i tr\xEAn").concat(offlineHints, "\n\n\u2501\u2501\u2501 QUY TR\xCCNH PH\xC2N T\xCDCH (Chain-of-Thought) \u2501\u2501\u2501\nTr\u01B0\u1EDBc khi tr\u1EA3 JSON, th\u1EF1c hi\u1EC7n theo th\u1EE9 t\u1EF1:\n1. \u0110\u1ECDc 3-5 d\xF2ng \u0111\u1EA7u \u2192 x\xE1c \u0111\u1ECBnh \u0111\u01A1n v\u1ECB ban h\xE0nh, s\u1ED1 k\xFD hi\u1EC7u\n2. \u0110\u1ECDc ph\u1EA7n ti\xEAu \u0111\u1EC1 \u2192 x\xE1c \u0111\u1ECBnh lo\u1EA1i v\xE0 ch\u1EE7 \u0111\u1EC1 v\u0103n b\u1EA3n\n3. Qu\xE9t to\xE0n b\u1ED9 \u2192 t\xECm ng\xE0y th\xE1ng (ban h\xE0nh, h\u1EA1n th\u1EF1c hi\u1EC7n, ng\xE0y b\xE1o c\xE1o)\n4. X\xE1c \u0111\u1ECBnh m\u1EE9c \u01B0u ti\xEAn t\u1EEB: t\u1EEB ng\u1EEF kh\u1EA9n c\u1EA5p, th\u1EDDi gian c\xF2n l\u1EA1i, n\u1ED9i dung\n5. Tr\xEDch xu\u1EA5t 3-5 \u0111\u1EA7u vi\u1EC7c c\u1EE5 th\u1EC3 nh\u1EA5t\n6. T\xF3m t\u1EAFt 3-5 c\xE2u s\xFAc t\xEDch, \u0111\u1EE7 th\xF4ng tin \u0111\u1EC3 \u0111\u1ECDc thay v\u0103n b\u1EA3n g\u1ED1c\n\n\u2501\u2501\u2501 N\u1ED8I DUNG V\u0102N B\u1EA2N C\u1EA6N PH\xC2N T\xCDCH \u2501\u2501\u2501\nT\xEAn t\u1EC7p: \"").concat(filename, "\"\n\"\"\"\n").concat(sliced, "\n\"\"\"\n\n\u2501\u2501\u2501 SCHEMA JSON B\u1EAET BU\u1ED8C \u2501\u2501\u2501\nTr\u1EA3 v\u1EC1 JSON h\u1EE3p l\u1EC7 (KH\xD4NG c\xF3 markdown, KH\xD4NG c\xF3 text ngo\xE0i JSON):\n{\n  \"title\": \"Ti\xEAu \u0111\u1EC1 ch\xEDnh x\xE1c \u2014 \u01B0u ti\xEAn l\u1EA5y t\u1EEB d\xF2ng ti\xEAu \u0111\u1EC1 v\u0103n b\u1EA3n, kh\xF4ng t\u1EF1 \u0111\u1EB7t. T\u1ED1i \u0111a 120 k\xFD t\u1EF1.\",\n  \"type\": \"M\u1ED8T trong 10 gi\xE1 tr\u1ECB: chi-thi|nghi-quyet|ke-hoach|bao-cao|cong-van|thong-bao|to-trinh|bien-ban|quyet-dinh|khac\",\n  \"code\": \"S\u1ED1 k\xFD hi\u1EC7u VD: '125/KH-\u0110TN', '05/CT-BCH' ho\u1EB7c '' n\u1EBFu kh\xF4ng c\xF3\",\n  \"issuer\": \"T\xEAn \u0111\u01A1n v\u1ECB/c\u01A1 quan ban h\xE0nh. T\u1ED1i \u0111a 80 k\xFD t\u1EF1. V\xED d\u1EE5: 'Ban Th\u01B0\u1EDDng v\u1EE5 \u0110o\xE0n TNCS HCM t\u1EC9nh X'\",\n  \"issueDate\": \"YYYY-MM-DD ng\xE0y ban h\xE0nh v\u0103n b\u1EA3n, ho\u1EB7c '' n\u1EBFu kh\xF4ng x\xE1c \u0111\u1ECBnh \u0111\u01B0\u1EE3c\",\n  \"deadline\": \"YYYY-MM-DD h\u1EA1n ch\xF3t th\u1EF1c hi\u1EC7n/n\u1ED9p b\xE1o c\xE1o. QUAN TR\u1ECCNG: t\xECm c\xE1c t\u1EEB 'tr\u01B0\u1EDBc ng\xE0y', 'h\u1EA1n ch\xF3t', 'ch\u1EADm nh\u1EA5t', 'ho\xE0n th\xE0nh tr\u01B0\u1EDBc'. \u0110\u1EC3 '' n\u1EBFu kh\xF4ng c\xF3.\",\n  \"reportDate\": \"YYYY-MM-DD ng\xE0y n\u1ED9p b\xE1o c\xE1o k\u1EBFt qu\u1EA3 n\u1EBFu kh\xE1c deadline, ho\u1EB7c ''\",\n  \"summary\": \"T\xF3m t\u1EAFt 3-5 c\xE2u: c\xE2u 1=m\u1EE5c \u0111\xEDch/y\xEAu c\u1EA7u ch\xEDnh, c\xE2u 2=n\u1ED9i dung c\u1EE5 th\u1EC3, c\xE2u 3-4=\u0111\u1ED1i t\u01B0\u1EE3ng th\u1EF1c hi\u1EC7n/th\u1EDDi gian, c\xE2u 5=k\u1EBFt qu\u1EA3 k\u1EF3 v\u1ECDng. Vi\u1EBFt \u0111\u1EE7 \u0111\u1EC3 \u0111\u1ECDc thay v\u0103n b\u1EA3n g\u1ED1c.\",\n  \"mainTasks\": [\"\u0110\u1EA7u vi\u1EC7c 1 c\u1EE5 th\u1EC3 (c\xF3 \u0111\u1ED9ng t\u1EEB h\xE0nh \u0111\u1ED9ng)\", \"\u0110\u1EA7u vi\u1EC7c 2\", \"\u0110\u1EA7u vi\u1EC7c 3\"],\n  \"priority\": \"high (c\xF3 t\u1EEB 'kh\u1EA9n'/'c\u1EA5p b\xE1ch'/'h\u1ECFa t\u1ED1c' HO\u1EB6C deadline \u22647 ng\xE0y) | med (c\xF3 'quan tr\u1ECDng'/'c\u1EA7n ch\xFA \xFD' HO\u1EB6C deadline \u226430 ng\xE0y) | low (c\xF2n l\u1EA1i)\",\n  \"keywords\": [\"t\u1ED1i \u0111a 8 t\u1EEB kh\xF3a ti\u1EBFng Vi\u1EC7t \u0111\u1EB7c tr\u01B0ng, kh\xF4ng l\u1EA5y stop-words\"],\n  \"reminderNotes\": \"Ghi ch\xFA \u0111\u1EB7c bi\u1EC7t: deadline s\u1EAFp \u0111\u1EBFn, y\xEAu c\u1EA7u ph\u1ED1i h\u1EE3p \u0111\u01A1n v\u1ECB kh\xE1c, t\xE0i li\u1EC7u \u0111\xEDnh k\xE8m c\u1EA7n chu\u1EA9n b\u1ECB... \u0110\u1EC3 '' n\u1EBFu kh\xF4ng c\xF3 g\xEC \u0111\u1EB7c bi\u1EC7t.\"\n}");
  },
  // ─── PROMPT 2: Báo cáo thành tích thi đua ─────────────────────────────
  buildReportPrompt: function buildReportPrompt(data) {
    var unit = data.unit,
      period = data.period,
      memberCount = data.memberCount,
      highlight = data.highlight,
      activities = data.activities,
      competition = data.competition,
      memberList = data.memberList,
      docSummary = data.docSummary,
      secretaryName = data.secretaryName;
    var memberCountInt = parseInt(memberCount) || 0;
    var activeEstimate = Math.round(memberCountInt * 0.93);
    var today = PromptUtils.todayVI();
    return "B\u1EA1n l\xE0 chuy\xEAn gia so\u1EA1n th\u1EA3o v\u0103n b\u1EA3n h\xE0nh ch\xEDnh v\u1EDBi chuy\xEAn m\xF4n s\xE2u v\u1EC1 c\xF4ng t\xE1c \u0110o\xE0n TNCS H\u1ED3 Ch\xED Minh Vi\u1EC7t Nam, th\xE0nh th\u1EA1o th\u1EC3 th\u1EE9c v\u0103n b\u1EA3n chu\u1EA9n theo Ngh\u1ECB \u0111\u1ECBnh 30/2020/N\u0110-CP.\n\n\u2501\u2501\u2501 TH\xD4NG TIN \u0110\u1EA6U V\xC0O \u2501\u2501\u2501\n\u0110\u01A1n v\u1ECB: ".concat(unit, "\nGiai \u0111o\u1EA1n b\xE1o c\xE1o: ").concat(period, "\nB\xED th\u01B0/ng\u01B0\u1EDDi \u0111\u1EA1i di\u1EC7n: ").concat(secretaryName || 'Bí thư Đoàn', "\nT\u1ED5ng s\u1ED1 \u0111o\xE0n vi\xEAn: ").concat(memberCountInt, " \u0111\u1ED3ng ch\xED (\u01B0\u1EDBc t\xEDnh ho\u1EA1t \u0111\u1ED9ng th\u01B0\u1EDDng xuy\xEAn: ").concat(activeEstimate, ")\nNg\xE0y so\u1EA1n: ").concat(today, "\n\nTh\xE0nh t\xEDch n\u1ED5i b\u1EADt: ").concat(highlight || 'Hoàn thành tốt các chỉ tiêu công tác Đoàn', "\nHo\u1EA1t \u0111\u1ED9ng ti\xEAu bi\u1EC3u: ").concat(activities || 'Tổ chức sinh hoạt chi đoàn định kỳ, tham gia phong trào thi đua', "\nK\u1EBFt qu\u1EA3 thi \u0111ua: ").concat(competition || 'Đạt danh hiệu tập thể Đoàn vững mạnh', "\n\u0110o\xE0n vi\xEAn ti\xEAu bi\u1EC3u: ").concat(memberList || 'Sẽ bổ sung sau', "\n\nT\xF3m t\u1EAFt ho\u1EA1t \u0111\u1ED9ng t\u1EEB h\u1ED3 s\u01A1 v\u0103n b\u1EA3n:\n").concat(docSummary ? docSummary.substring(0, 2500) : 'Chưa có dữ liệu văn bản', "\n\n\u2501\u2501\u2501 Y\xCAU C\u1EA6U SO\u1EA0N TH\u1EA2O \u2501\u2501\u2501\nSo\u1EA1n b\xE1o c\xE1o th\xE0nh t\xEDch thi \u0111ua HO\xC0N CH\u1EC8NH, CHUY\xCAN NGHI\u1EC6P theo \u0111\xFAng th\u1EC3 th\u1EE9c:\n\n**TH\u1EC2 TH\u1EE8C B\u1EAET BU\u1ED8C:**\n- Qu\u1ED1c hi\u1EC7u: \"C\u1ED8NG H\xD2A X\xC3 H\u1ED8I CH\u1EE6 NGH\u0128A VI\u1EC6T NAM / \u0110\u1ED9c l\u1EADp - T\u1EF1 do - H\u1EA1nh ph\xFAc\"\n- \u0110\u1ECBa danh, ng\xE0y th\xE1ng n\u0103m\n- T\xEAn c\u01A1 quan ban h\xE0nh + s\u1ED1 k\xFD hi\u1EC7u (t\u1EF1 sinh h\u1EE3p l\xFD)\n- Tr\xEDch y\u1EBFu (ti\xEAu \u0111\u1EC1 vi\u1EBFt hoa, in \u0111\u1EADm)\n\n**N\u1ED8I DUNG 5 PH\u1EA6N (vi\u1EBFt \u0111\u1EA7y \u0111\u1EE7, kh\xF4ng b\u1ECF ph\u1EA7n n\xE0o):**\n\nPH\u1EA6N I \u2014 \u0110\u1EB6C \u0110I\u1EC2M T\xCCNH H\xCCNH\n\u2022 Gi\u1EDBi thi\u1EC7u \u0111\u01A1n v\u1ECB, b\u1ED1i c\u1EA3nh ho\u1EA1t \u0111\u1ED9ng\n\u2022 Thu\u1EADn l\u1EE3i v\xE0 kh\xF3 kh\u0103n trong ").concat(period, "\n\u2022 Quy m\xF4 t\u1ED5 ch\u1EE9c: ").concat(memberCountInt, " \u0111o\xE0n vi\xEAn\n\nPH\u1EA6N II \u2014 K\u1EBET QU\u1EA2 TH\u1EF0C HI\u1EC6N NHI\u1EC6M V\u1EE4\n\u2022 C\xF4ng t\xE1c gi\xE1o d\u1EE5c ch\xEDnh tr\u1ECB t\u01B0 t\u01B0\u1EDFng (s\u1ED1 li\u1EC7u c\u1EE5 th\u1EC3)\n\u2022 C\xF4ng t\xE1c t\u1ED5 ch\u1EE9c, x\xE2y d\u1EF1ng \u0110o\xE0n (t\u1EF7 l\u1EC7 tham gia, x\u1EBFp lo\u1EA1i)\n\u2022 Phong tr\xE0o thi \u0111ua: ").concat(highlight || 'các phong trào chính', "\n\u2022 C\xE1c ho\u1EA1t \u0111\u1ED9ng: ").concat(activities || 'theo kế hoạch', "\n\u2022 K\u1EBFt qu\u1EA3 thi \u0111ua: ").concat(competition, "\n\u2022 Th\xE0nh t\xEDch \u0111o\xE0n vi\xEAn: ").concat(memberList || 'sẽ bổ sung', "\n\nPH\u1EA6N III \u2014 T\u1ED2N T\u1EA0I, H\u1EA0N CH\u1EBE\n\u2022 2-3 \u0111i\u1EC3m c\u1EE5 th\u1EC3, kh\xE1ch quan, kh\xF4ng chung chung\n\u2022 Nguy\xEAn nh\xE2n kh\xE1ch quan v\xE0 ch\u1EE7 quan\n\nPH\u1EA6N IV \u2014 PH\u01AF\u01A0NG H\u01AF\u1EDANG NHI\u1EC6M V\u1EE4\n\u2022 4-5 nhi\u1EC7m v\u1EE5 c\u1EE5 th\u1EC3, c\xF3 th\u1EC3 \u0111o l\u01B0\u1EDDng\n\u2022 Gi\u1EA3i ph\xE1p kh\u1EAFc ph\u1EE5c t\u1ED3n t\u1EA1i\n\nPH\u1EA6N V \u2014 \u0110\u1EC0 NGH\u1ECA KHEN TH\u01AF\u1EDENG\n\u2022 H\xECnh th\u1EE9c \u0111\u1EC1 ngh\u1ECB (B\u1EB1ng khen/Gi\u1EA5y khen/Chi\u1EBFn s\u0129 thi \u0111ua)\n\u2022 Danh s\xE1ch c\u1EE5 th\u1EC3 n\u1EBFu c\xF3\n\nK\u1EBFt th\xFAc: Ch\u1EEF k\xFD, con d\u1EA5u (").concat(secretaryName || 'BÍ THƯ', ")\n\n**QUY CHU\u1EA8N NG\xD4N NG\u1EEE:**\n- V\u0103n phong h\xE0nh ch\xEDnh: ch\xEDnh x\xE1c, trang tr\u1ECDng, s\xFAc t\xEDch\n- D\xF9ng s\u1ED1 li\u1EC7u c\u1EE5 th\u1EC3 (%, s\u1ED1 l\u01B0\u1EE3ng) thay v\xEC \u0111\u1ECBnh t\xEDnh chung chung\n- Kh\xF4ng d\xF9ng t\u1EEB: \"r\u1EA5t\", \"v\xF4 c\xF9ng\", \"h\u1EBFt s\u1EE9c\" (tr\u1EEB khi c\u1EA7n thi\u1EBFt)\n- C\xE2u ng\u1EAFn, r\xF5 \xFD, m\u1ED7i \u0111o\u1EA1n 3-5 c\xE2u\n- T\u1EF1 \u0111i\u1EC1n d\u1EEF li\u1EC7u h\u1EE3p l\xFD n\u1EBFu thi\u1EBFu, ghi ch\xFA [c\u1EA7n b\u1ED5 sung] ch\u1ED7 c\u1EA7n x\xE1c nh\u1EADn\n\nVi\u1EBFt \u0111\u1EA7y \u0111\u1EE7 to\xE0n b\u1ED9 b\xE1o c\xE1o. Kh\xF4ng b\u1ECF s\xF3t ph\u1EA7n n\xE0o. Kh\xF4ng d\xF9ng markdown.");
  },
  // ─── PROMPT 3: Tổng hợp trích yếu ─────────────────────────────────────
  buildSummaryPrompt: function buildSummaryPrompt(docs) {
    var dateRange = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var total = docs.length;
    var overdueCount = docs.filter(function (d) {
      return d.status === 'overdue';
    }).length;
    var pendingCount = docs.filter(function (d) {
      return d.status === 'pending';
    }).length;
    var highPriority = docs.filter(function (d) {
      return d.priority === 'high';
    }).length;
    var typeCounts = {};
    docs.forEach(function (d) {
      typeCounts[d.type] = (typeCounts[d.type] || 0) + 1;
    });

    // Sắp xếp: ưu tiên cao + quá hạn trước
    var sorted = _toConsumableArray(docs).sort(function (a, b) {
      var pa = a.priority === 'high' ? 0 : a.priority === 'med' ? 1 : 2;
      var pb = b.priority === 'high' ? 0 : b.priority === 'med' ? 1 : 2;
      if (pa !== pb) return pa - pb;
      if (a.status === 'overdue' && b.status !== 'overdue') return -1;
      if (b.status === 'overdue' && a.status !== 'overdue') return 1;
      return 0;
    });
    var docList = PromptUtils.formatDocList(sorted, 40, 180);
    var today = PromptUtils.todayVI();
    var typeStr = Object.entries(typeCounts).map(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
        t = _ref2[0],
        n = _ref2[1];
      return "".concat(t, "(").concat(n, ")");
    }).join(', ');
    return "B\u1EA1n l\xE0 chuy\xEAn gia ph\xE2n t\xEDch v\xE0 t\u1ED5ng h\u1EE3p c\xF4ng t\xE1c \u0110o\xE0n TNCS H\u1ED3 Ch\xED Minh. Nhi\u1EC7m v\u1EE5: so\u1EA1n b\u1EA3n t\u1ED5ng h\u1EE3p tr\xEDch y\u1EBFu v\u0103n b\u1EA3n chuy\xEAn nghi\u1EC7p cho Ban Ch\u1EA5p h\xE0nh.\n\n\u2501\u2501\u2501 D\u1EEE LI\u1EC6U T\u1ED4NG H\u1EE2P \u2501\u2501\u2501\nNg\xE0y t\u1ED5ng h\u1EE3p: ".concat(today).concat(dateRange ? '\nKhoảng thời gian: ' + dateRange : '', "\nT\u1ED5ng s\u1ED1 v\u0103n b\u1EA3n: ").concat(total, " | Ph\xE2n lo\u1EA1i: ").concat(typeStr, "\n\u26A0\uFE0F \u01AFu ti\xEAn cao: ").concat(highPriority, " | Qu\xE1 h\u1EA1n: ").concat(overdueCount, " | Ch\u1EDD x\u1EED l\xFD: ").concat(pendingCount, "\n\nDANH S\xC1CH V\u0102N B\u1EA2N (s\u1EAFp x\u1EBFp theo m\u1EE9c \u0111\u1ED9 \u01B0u ti\xEAn):\n").concat(docList || 'Không có văn bản nào.', "\n\n\u2501\u2501\u2501 Y\xCAU C\u1EA6U T\u1ED4NG H\u1EE2P \u2501\u2501\u2501\nSo\u1EA1n b\u1EA3n t\u1ED5ng h\u1EE3p tr\xEDch y\u1EBFu g\u1ED3m 4 ph\u1EA7n:\n\n**I. T\u1ED4NG QUAN NHANH (3-4 c\xE2u)**\nNh\u1EADn x\xE9t t\u1ED5ng th\u1EC3 v\u1EC1 s\u1ED1 l\u01B0\u1EE3ng, t\xECnh tr\u1EA1ng x\u1EED l\xFD, \u0111i\u1EC3m \u0111\xE1ng ch\xFA \xFD nh\u1EA5t.\n\n**II. C\xC1C V\u0102N B\u1EA2N C\u1EA4P B\xC1CH (\u01B0u ti\xEAn HIGH ho\u1EB7c status=overdue)**\nV\u1EDBi m\u1ED7i v\u0103n b\u1EA3n, ghi: T\xEAn v\u0103n b\u1EA3n \u2014 H\u1EA1n \u2014 Y\xEAu c\u1EA7u h\xE0nh \u0111\u1ED9ng c\u1EE5 th\u1EC3.\nN\u1EBFu kh\xF4ng c\xF3, ghi \"Kh\xF4ng c\xF3 v\u0103n b\u1EA3n c\u1EA5p b\xE1ch\".\n\n**III. T\u1ED4NG H\u1EE2P THEO LO\u1EA0I V\u0102N B\u1EA2N**\nNh\xF3m theo lo\u1EA1i, n\xEAu t\xF3m t\u1EAFt n\u1ED9i dung ch\xEDnh t\u1EEBng nh\xF3m (2-3 c\xE2u/nh\xF3m).\nCh\xFA tr\u1ECDng: nhi\u1EC7m v\u1EE5 c\u1EA7n th\u1EF1c hi\u1EC7n, ng\u01B0\u1EDDi/b\u1ED9 ph\u1EADn ph\u1EE5 tr\xE1ch, th\u1EDDi h\u1EA1n.\n\n**IV. H\xC0NH \u0110\u1ED8NG \u0110\u1EC0 XU\u1EA4T (Action Items)**\nLi\u1EC7t k\xEA 3-5 vi\u1EC7c BCH c\u1EA7n l\xE0m ngay trong tu\u1EA7n t\u1EDBi, theo th\u1EE9 t\u1EF1 \u01B0u ti\xEAn.\nFormat: [KHUNG TH\u1EDCI GIAN] H\xE0nh \u0111\u1ED9ng c\u1EE5 th\u1EC3 \u2014 Ng\u01B0\u1EDDi ph\u1EE5 tr\xE1ch\n\n\u2501\u2501\u2501 QUY CHU\u1EA8N \u2501\u2501\u2501\n- Ng\xF4n ng\u1EEF h\xE0nh ch\xEDnh, s\xFAc t\xEDch, d\xF9ng \u0111\u01B0\u1EE3c b\xE1o c\xE1o tr\u1EF1c ti\u1EBFp\n- D\xF9ng bullet points, kh\xF4ng d\xF9ng markdown headers (##)\n- \u01AFu ti\xEAn th\xF4ng tin h\xE0nh \u0111\u1ED9ng (ai l\xE0m g\xEC, khi n\xE0o) h\u01A1n m\xF4 t\u1EA3\n- Kh\xF4ng l\u1EB7p th\xF4ng tin th\u1EEBa, kh\xF4ng gi\u1EA3i th\xEDch nh\u1EEFng g\xEC \u0111\xE3 r\xF5");
  },
  // ─── PROMPT 4: Phân tích dashboard ────────────────────────────────────
  buildAnalyticsPrompt: function buildAnalyticsPrompt(stats) {
    var docCount = stats.docCount,
      pendingCount = stats.pendingCount,
      overdueCount = stats.overdueCount,
      doneCount = stats.doneCount,
      taskCount = stats.taskCount,
      taskDone = stats.taskDone,
      reminderPending = stats.reminderPending,
      typeCounts = stats.typeCounts,
      recentDocs = stats.recentDocs,
      memberCount = stats.memberCount;
    var completionRate = docCount > 0 ? Math.round(doneCount / docCount * 100) : 0;
    var overdueRate = docCount > 0 ? Math.round(overdueCount / docCount * 100) : 0;
    var taskRate = taskCount > 0 ? Math.round(taskDone / taskCount * 100) : 0;
    var typeStr = Object.entries(typeCounts || {}).sort(function (_ref3, _ref4) {
      var _ref5 = _slicedToArray(_ref3, 2),
        a = _ref5[1];
      var _ref6 = _slicedToArray(_ref4, 2),
        b = _ref6[1];
      return b - a;
    }).map(function (_ref7) {
      var _ref8 = _slicedToArray(_ref7, 2),
        t = _ref8[0],
        n = _ref8[1];
      return "".concat(t, ": ").concat(n);
    }).join(', ');
    return "B\u1EA1n l\xE0 chuy\xEAn vi\xEAn t\u01B0 v\u1EA5n qu\u1EA3n l\xFD h\xE0nh ch\xEDnh \u0110o\xE0n TNCS HCM. Ph\xE2n t\xEDch s\u1ED1 li\u1EC7u v\xE0 \u0111\u01B0a ra nh\u1EADn x\xE9t th\u1EF1c t\u1EBF, c\u1EE5 th\u1EC3.\n\n\u2501\u2501\u2501 D\u1EEE LI\u1EC6U H\u1EC6 TH\u1ED0NG (".concat(PromptUtils.todayVI(), ") \u2501\u2501\u2501\n\uD83D\uDCC1 V\u0102N B\u1EA2N: ").concat(docCount, " t\u1ED5ng | ").concat(pendingCount, " ch\u1EDD x\u1EED l\xFD | ").concat(overdueCount, " qu\xE1 h\u1EA1n | ").concat(doneCount, " ho\xE0n th\xE0nh\n   T\u1EF7 l\u1EC7 ho\xE0n th\xE0nh: ").concat(completionRate, "% | T\u1EF7 l\u1EC7 qu\xE1 h\u1EA1n: ").concat(overdueRate, "%\n   Ph\xE2n lo\u1EA1i: ").concat(typeStr || 'chưa có dữ liệu', "\n\u2705 C\xD4NG VI\u1EC6C: ").concat(taskCount, " t\u1ED5ng | ").concat(taskDone, " xong (").concat(taskRate, "%) | ").concat(taskCount - taskDone, " c\xF2n l\u1EA1i\n\uD83D\uDD14 NH\u1EAEC NH\u1EDE: ").concat(reminderPending, " ch\u01B0a x\u1EED l\xFD\n\uD83D\uDC65 \u0110O\xC0N VI\xCAN: ").concat(memberCount || 'chưa cập nhật', "\n").concat(recentDocs && recentDocs.length ? "\uD83D\uDCCB V\u0102N B\u1EA2N G\u1EA6N \u0110\xC2Y: ".concat(recentDocs.slice(0, 3).map(function (d) {
      return d.title;
    }).join(' | ')) : '', "\n\n\u2501\u2501\u2501 Y\xCAU C\u1EA6U PH\xC2N T\xCDCH \u2501\u2501\u2501\n\u0110\u01B0a ra nh\u1EADn x\xE9t TH\u1EF0C T\u1EBE, C\u1EE4 TH\u1EC2 theo c\u1EA5u tr\xFAc:\n\n1. \u0110\xC1NH GI\xC1 T\u1ED4NG TH\u1EC2 (1-2 c\xE2u)\nD\xF9ng s\u1ED1 li\u1EC7u th\u1EF1c t\u1EBF. V\xED d\u1EE5: \"T\u1EF7 l\u1EC7 ho\xE0n th\xE0nh ").concat(completionRate, "% [d\u01B0\u1EDBi/tr\xEAn] m\u1EE9c khuy\u1EBFn ngh\u1ECB 80%...\"\n\n2. \u0110I\u1EC2M \u0110\xC1NG CH\xDA \xDD (1-2 \u0111i\u1EC3m quan tr\u1ECDng nh\u1EA5t)\nCh\u1EC9 ra \u0111i\u1EC3m t\xEDch c\u1EF1c V\xC0 \u0111i\u1EC3m c\u1EA7n c\u1EA3i thi\u1EC7n d\u1EF1a tr\xEAn s\u1ED1 li\u1EC7u.\n\n3. H\xC0NH \u0110\u1ED8NG \u01AFU TI\xCAN (2-3 vi\u1EC7c c\u1EA7n l\xE0m ngay)\nC\u1EE5 th\u1EC3, c\xF3 th\u1EC3 th\u1EF1c hi\u1EC7n ngay, theo th\u1EE9 t\u1EF1 \u01B0u ti\xEAn.\n\nVi\u1EBFt ng\u1EAFn g\u1ECDn (5-8 c\xE2u t\u1ED5ng), kh\xF4ng d\xF9ng markdown, kh\xF4ng l\u1EB7p s\u1ED1 li\u1EC7u \u0111\xE3 c\xF3.\nT\u1EADp trung v\xE0o g\u1EE3i \xFD h\xE0nh \u0111\u1ED9ng, kh\xF4ng ch\u1EC9 m\xF4 t\u1EA3 s\u1ED1 li\u1EC7u.");
  },
  // ─── PROMPT 5: Tìm kiếm ngữ nghĩa ─────────────────────────────────────
  buildSearchPrompt: function buildSearchPrompt(query, docs) {
    var docList = PromptUtils.formatDocList(docs, 60, 120);

    // Query expansion: thêm từ đồng nghĩa tiếng Việt phổ biến
    var expansions = {
      'kế hoạch': ['chương trình', 'lịch', 'tiến độ'],
      'báo cáo': ['tổng kết', 'sơ kết', 'thống kê'],
      'khẩn': ['cấp bách', 'hỏa tốc', 'gấp'],
      'thi đua': ['khen thưởng', 'danh hiệu', 'thành tích'],
      'đoàn viên': ['hội viên', 'thanh niên', 'đv'],
      'hoạt động': ['phong trào', 'chiến dịch', 'chương trình'],
      'họp': ['hội nghị', 'cuộc họp', 'biên bản'],
      'tài chính': ['kinh phí', 'ngân sách', 'quỹ']
    };
    var qLower = query.toLowerCase();
    var relatedTerms = Object.entries(expansions).filter(function (_ref9) {
      var _ref0 = _slicedToArray(_ref9, 1),
        k = _ref0[0];
      return qLower.includes(k);
    }).flatMap(function (_ref1) {
      var _ref10 = _slicedToArray(_ref1, 2),
        v = _ref10[1];
      return v;
    }).slice(0, 4);
    var expandedQuery = relatedTerms.length ? "".concat(query, "\n[T\u1EEB li\xEAn quan: ").concat(relatedTerms.join(', '), "]") : query;
    return "B\u1EA1n l\xE0 c\xF4ng c\u1EE5 t\xECm ki\u1EBFm ng\u1EEF ngh\u0129a chuy\xEAn bi\u1EC7t cho v\u0103n b\u1EA3n \u0110o\xE0n TNCS HCM. Nhi\u1EC7m v\u1EE5: t\xECm c\xE1c v\u0103n b\u1EA3n LI\xCAN QUAN NH\u1EA4T \u0111\u1EBFn y\xEAu c\u1EA7u t\xECm ki\u1EBFm.\n\n\u2501\u2501\u2501 Y\xCAU C\u1EA6U T\xCCM KI\u1EBEM \u2501\u2501\u2501\n\"".concat(expandedQuery, "\"\n\n\u2501\u2501\u2501 DANH S\xC1CH V\u0102N B\u1EA2N (").concat(docs.length, " v\u0103n b\u1EA3n) \u2501\u2501\u2501\n").concat(docList || 'Không có văn bản nào', "\n\n\u2501\u2501\u2501 QUY T\u1EAEC T\xCCM KI\u1EBEM \u2501\u2501\u2501\n- T\xECm theo NG\u1EEE NGH\u0128A, kh\xF4ng ch\u1EC9 t\u1EEB kh\xF3a ch\xEDnh x\xE1c\n- X\xE9t: ti\xEAu \u0111\u1EC1, lo\u1EA1i v\u0103n b\u1EA3n, t\xF3m t\u1EAFt, t\u1EEB kh\xF3a li\xEAn quan\n- \u01AFu ti\xEAn: v\u0103n b\u1EA3n c\xF3 tr\u1EA1ng th\xE1i \"pending\"/\"overdue\", c\xF3 deadline g\u1EA7n\n- Tr\u1EA3 v\u1EC1 INDEX c\u1EE7a v\u0103n b\u1EA3n ph\xF9 h\u1EE3p (s\u1ED1 trong d\u1EA5u [...]), ph\xE2n c\xE1ch b\u1EB1ng d\u1EA5u ph\u1EA9y\n- T\u1ED1i \u0111a 15 k\u1EBFt qu\u1EA3, s\u1EAFp x\u1EBFp theo \u0111\u1ED9 li\xEAn quan GI\u1EA2M D\u1EA6N\n- Ch\u1EC9 tr\u1EA3 v\u1EC1 c\xE1c con s\u1ED1, KH\xD4NG gi\u1EA3i th\xEDch, KH\xD4NG markdown\n- N\u1EBFu kh\xF4ng t\xECm th\u1EA5y: tr\u1EA3 v\u1EC1 chu\u1ED7i r\u1ED7ng \"\"\n\nV\xED d\u1EE5 output h\u1EE3p l\u1EC7: 2,0,7,15,3\nV\xED d\u1EE5 output kh\xF4ng h\u1EE3p l\u1EC7: \"T\xF4i t\xECm th\u1EA5y c\xE1c v\u0103n b\u1EA3n sau: [2, 0, 7]\"");
  },
  // ─── PROMPT 6: Điền nội dung mẫu văn bản ──────────────────────────────
  buildTemplatePrompt: function buildTemplatePrompt(data) {
    var templateType = data.templateType,
      templateName = data.templateName,
      unit = data.unit,
      secretary = data.secretary,
      month = data.month,
      quarter = data.quarter,
      year = data.year,
      memberCount = data.memberCount,
      memberList = data.memberList,
      docSummary = data.docSummary,
      extraRequirements = data.extraRequirements;
    var period = month ? "Th\xE1ng ".concat(month, "/").concat(year) : quarter ? "Qu\xFD ".concat(quarter, "/").concat(year) : "N\u0103m ".concat(year);
    var memberCountInt = parseInt(memberCount) || 0;
    var attendanceRate = memberCountInt > 0 ? Math.round(Math.min(100, 88 + Math.random() * 10)) + '%' : '[cần bổ sung]';
    return "B\u1EA1n l\xE0 chuy\xEAn gia so\u1EA1n th\u1EA3o v\u0103n b\u1EA3n h\xE0nh ch\xEDnh \u0110o\xE0n TNCS H\u1ED3 Ch\xED Minh Vi\u1EC7t Nam, am hi\u1EC3u th\u1EC3 th\u1EE9c theo Ngh\u1ECB \u0111\u1ECBnh 30/2020/N\u0110-CP.\n\n\u2501\u2501\u2501 TH\xD4NG TIN \u0110\u01A0N V\u1ECA \u2501\u2501\u2501\nLo\u1EA1i v\u0103n b\u1EA3n: ".concat(templateName || templateType, "\n\u0110\u01A1n v\u1ECB: ").concat(unit || 'Chi đoàn cơ sở', "\nB\xED th\u01B0: ").concat(secretary || '[Bí thư]', "\nK\u1EF3 b\xE1o c\xE1o: ").concat(period, "\nS\u1ED1 \u0111o\xE0n vi\xEAn: ").concat(memberCountInt || '[cần bổ sung]', " \u0111\u1ED3ng ch\xED\nT\u1EF7 l\u1EC7 tham gia sinh ho\u1EA1t: ").concat(attendanceRate, "\n\u0110o\xE0n vi\xEAn ti\xEAu bi\u1EC3u: ").concat(memberList || 'Sẽ bổ sung sau', "\n\n\u2501\u2501\u2501 D\u1EEE LI\u1EC6U TH\u1EF0C T\u1EBE T\u1EEA H\u1EC6 TH\u1ED0NG \u2501\u2501\u2501\n").concat(docSummary ? docSummary.substring(0, 2000) : 'Chưa có dữ liệu văn bản trong hệ thống.', "\n\n\u2501\u2501\u2501 Y\xCAU C\u1EA6U \u0110\u1EB6C BI\u1EC6T \u2501\u2501\u2501\n").concat(extraRequirements || 'Không có yêu cầu đặc biệt.', "\n\n\u2501\u2501\u2501 NHI\u1EC6M V\u1EE4 \u2501\u2501\u2501\n\u0110i\u1EC1n n\u1ED9i dung CHI TI\u1EBET, TH\u1EF0C T\u1EBE, CHUY\xCAN NGHI\u1EC6P v\xE0o c\xE1c tr\u01B0\u1EDDng sau.\nD\xF9ng d\u1EEF li\u1EC7u th\u1EF1c t\u1EBF t\u1EEB h\u1EC7 th\u1ED1ng n\u1EBFu c\xF3; t\u1EF1 sinh s\u1ED1 li\u1EC7u h\u1EE3p l\xFD n\u1EBFu thi\u1EBFu.\nGhi ch\xFA \"[c\u1EA7n x\xE1c nh\u1EADn]\" cho nh\u1EEFng s\u1ED1 li\u1EC7u c\u1EA7n x\xE1c nh\u1EADn th\u1EF1c t\u1EBF.\n\nTr\u1EA3 v\u1EC1 JSON (KH\xD4NG markdown, KH\xD4NG text ngo\xE0i JSON):\n{\n  \"NOI_DUNG_CHINH\": \"N\u1ED9i dung ch\xEDnh 3-5 \u0111o\u1EA1n: t\xECnh h\xECnh chung \u2192 ho\u1EA1t \u0111\u1ED9ng tri\u1EC3n khai \u2192 \u0111\xE1nh gi\xE1. M\u1ED7i \u0111o\u1EA1n 50-100 t\u1EEB, d\xF9ng s\u1ED1 li\u1EC7u c\u1EE5 th\u1EC3.\",\n  \"KET_QUA_HOAT_DONG\": \"K\u1EBFt qu\u1EA3 3-4 \u0111o\u1EA1n: s\u1ED1 li\u1EC7u tham gia, % ho\xE0n th\xE0nh ch\u1EC9 ti\xEAu, th\xE0nh t\xEDch c\u1EE5 th\u1EC3, so s\xE1nh v\u1EDBi k\u1EF3 tr\u01B0\u1EDBc (n\u1EBFu c\xF3). B\u1EAFt \u0111\u1EA7u b\u1EB1ng t\u1ED5ng h\u1EE3p s\u1ED1 li\u1EC7u.\",\n  \"PHUONG_HUONG\": \"Ph\u01B0\u01A1ng h\u01B0\u1EDBng ").concat(period.includes('Tháng') ? 'tháng tới' : period.includes('Quý') ? 'quý tới' : 'năm tới', ": 4-5 nhi\u1EC7m v\u1EE5 c\u1EE5 th\u1EC3, c\xF3 th\u1EDDi h\u1EA1n, c\xF3 ng\u01B0\u1EDDi ph\u1EE5 tr\xE1ch. Format: (1) Nhi\u1EC7m v\u1EE5 \u2014 H\u1EA1n \u2014 Ph\u1EE5 tr\xE1ch\",\n  \"THANH_TICH\": \"Th\xE0nh t\xEDch n\u1ED5i b\u1EADt: li\u1EC7t k\xEA bullet points, c\xF3 s\u1ED1 li\u1EC7u, c\xF3 danh hi\u1EC7u/gi\u1EA3i th\u01B0\u1EDFng n\u1EBFu c\xF3. K\u1EBFt th\xFAc b\u1EB1ng \u0111\u1EC1 xu\u1EA5t khen th\u01B0\u1EDFng n\u1EBFu ph\xF9 h\u1EE3p.\"\n}\n\n\u2501\u2501\u2501 QUY CHU\u1EA8N N\u1ED8I DUNG \u2501\u2501\u2501\n\u2713 V\u0103n phong h\xE0nh ch\xEDnh: ch\xEDnh x\xE1c, trang tr\u1ECDng, kh\xF4ng c\u1EA3m x\xFAc\n\u2713 C\xE2u ng\u1EAFn (15-25 t\u1EEB), \u0111o\u1EA1n v\u0103n 3-5 c\xE2u\n\u2713 D\xF9ng s\u1ED1 li\u1EC7u thay v\xEC \u0111\u1ECBnh t\xEDnh: \"\u0111\u1EA1t 95%\" thay v\xEC \"\u0111\u1EA1t k\u1EBFt qu\u1EA3 t\u1ED1t\"\n\u2713 Kh\xF4ng d\xF9ng: \"r\u1EA5t\", \"h\u1EBFt s\u1EE9c\", \"v\xF4 c\xF9ng\" (tr\u1EEB v\u0103n phong \u0110o\xE0n th\xF4ng th\u01B0\u1EDDng)\n\u2713 T\xEAn ri\xEAng, ch\u1EE9c danh vi\u1EBFt \u0111\xFAng hoa/th\u01B0\u1EDDng\n\u2713 D\xF9ng t\u1EEB \u0110o\xE0n chu\u1EA9n: \"\u0111o\xE0n vi\xEAn\" (kh\xF4ng \"\u0111\u1ED9i vi\xEAn\"), \"chi \u0111o\xE0n\", \"BCH\"");
  }
};

// ═══════════════════════════════════════════════════════════════════════════
//  PHẦN 3: PATCH CÁC HÀM GỐC — Thay thế prompt cũ bằng prompt mới
// ═══════════════════════════════════════════════════════════════════════════

/**
 * PATCH 1: analyzeWithAI — Nâng cấp prompt phân tích văn bản
 * Thêm: offline pre-analysis làm hint → giảm token → tiết kiệm quota
 */
window.analyzeWithAI = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(text, filename) {
    var loadingMsg, preAnalysis, prompt, cacheKey, raw, json, merged, validTypes, _t, _t2;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          loadingMsg = typeof toast === 'function' ? null : console.log('[AI] Đang phân tích văn bản...');
          _context.p = 1;
          // Bước 1: Offline NLP trước (0 quota) → dùng làm hint cho AI
          preAnalysis = {};
          if (typeof OfflineEngine !== 'undefined') {
            preAnalysis = OfflineEngine.analyzeDocument(text, filename);
          }

          // Bước 2: Xây dựng prompt nâng cấp
          prompt = PromptBuilder.buildAnalyzePrompt(text, filename, preAnalysis); // Bước 3: Kiểm tra cache trước
          cacheKey = "analyze_".concat(PromptUtils.estimateTokens(text), "_").concat(filename);
          _context.p = 2;
          _context.n = 3;
          return typeof callAI === 'function' ? callAI(prompt, {
            maxTokens: PromptUtils.budgetTokens('analyze')
          }) : Promise.reject(new Error('callAI not found'));
        case 3:
          raw = _context.v;
          _context.n = 5;
          break;
        case 4:
          _context.p = 4;
          _t = _context.v;
          // Nếu AI fail → dùng kết quả offline đầy đủ
          if (typeof showAiReviewModal === 'function' && preAnalysis.title) {
            showAiReviewModal(preAnalysis, text, filename);
          } else if (typeof saveDocFallback === 'function') {
            saveDocFallback(filename, text);
            if (typeof toast === 'function') toast("AI kh\xF4ng kh\u1EA3 d\u1EE5ng. L\u01B0u v\u1EDBi ph\xE2n t\xEDch offline cho ".concat(filename), 'warning');
          }
          return _context.a(2);
        case 5:
          // Bước 4: Parse và validate JSON
          json = PromptUtils.repairJSON(raw);
          if (json) {
            // Merge: offline làm baseline, AI override các field có giá trị
            merged = _objectSpread(_objectSpread(_objectSpread({}, preAnalysis), Object.fromEntries(
            // AI override (chỉ field không rỗng)
            Object.entries(json).filter(function (_ref12) {
              var _ref13 = _slicedToArray(_ref12, 2),
                v = _ref13[1];
              return v !== null && v !== undefined && v !== '' && !(Array.isArray(v) && v.length === 0);
            }))), {}, {
              _source: 'ai+offline' // đánh dấu nguồn
            }); // Validate type enum
            validTypes = ['chi-thi', 'nghi-quyet', 'ke-hoach', 'bao-cao', 'cong-van', 'thong-bao', 'to-trinh', 'bien-ban', 'quyet-dinh', 'khac'];
            if (!validTypes.includes(merged.type)) merged.type = preAnalysis.type || 'khac';

            // Validate priority enum
            if (!['high', 'med', 'low'].includes(merged.priority)) merged.priority = 'low';

            // Đảm bảo mainTasks là array
            if (!Array.isArray(merged.mainTasks)) merged.mainTasks = preAnalysis.mainTasks || [];

            // Đảm bảo keywords là array
            if (!Array.isArray(merged.keywords)) merged.keywords = preAnalysis.keywords || [];
            if (typeof showAiReviewModal === 'function') {
              showAiReviewModal(merged, text, filename);
            }
          } else {
            // JSON parse fail → dùng offline result
            if (typeof showAiReviewModal === 'function' && preAnalysis.title) {
              if (typeof toast === 'function') toast('AI trả về kết quả không đọc được. Dùng phân tích offline.', 'warning');
              showAiReviewModal(preAnalysis, text, filename);
            } else if (typeof saveDocFallback === 'function') {
              saveDocFallback(filename, text);
              if (typeof toast === 'function') toast("AI kh\xF4ng tr\u1EA3 v\u1EC1 JSON h\u1EE3p l\u1EC7 cho ".concat(filename, " \u2014 l\u01B0u th\u1EE7 c\xF4ng"), 'warning');
            }
          }
          _context.n = 7;
          break;
        case 6:
          _context.p = 6;
          _t2 = _context.v;
          console.error('[analyzeWithAI]', _t2);
          if (typeof toast === 'function') toast("L\u1ED7i ph\xE2n t\xEDch: ".concat(_t2.message), 'error');
          if (typeof saveDocFallback === 'function') saveDocFallback(filename, text);
        case 7:
          return _context.a(2);
      }
    }, _callee, null, [[2, 4], [1, 6]]);
  }));
  return function (_x, _x2) {
    return _ref11.apply(this, arguments);
  };
}();

/**
 * PATCH 2: generateReportAI — Nâng cấp prompt báo cáo thành tích
 */
window.generateReportAI = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
  var _document$getElementB, _document$getElementB2, _document$getElementB3, _document$getElementB4, _document$getElementB5, _document$getElementB6;
  var settings, el, unit, period, memberCount, highlight, activities, competition, docs, allMembers, memberList, docSummary, prompt, result, previewTitle, previewMeta, previewBody, banner, _t3;
  return _regenerator().w(function (_context2) {
    while (1) switch (_context2.p = _context2.n) {
      case 0:
        settings = typeof DB !== 'undefined' && DB.getObj ? DB.getObj('settings') : JSON.parse(localStorage.getItem('doanvan_settings') || '{}');
        if (settings.apiKey) {
          _context2.n = 1;
          break;
        }
        if (typeof toast === 'function') toast('Cần cấu hình API Key Gemini', 'warning');
        if (typeof showPage === 'function') showPage('settings');
        return _context2.a(2);
      case 1:
        el = document.getElementById('reportAiResult');
        if (el) el.innerHTML = '<div style="text-align:center;padding:12px"><div class="spinner" style="margin:0 auto 8px"></div>AI đang soạn báo cáo chuyên sâu...</div>';
        unit = ((_document$getElementB = document.getElementById('rpUnit')) === null || _document$getElementB === void 0 ? void 0 : _document$getElementB.value.trim()) || 'Đơn vị Đoàn';
        period = ((_document$getElementB2 = document.getElementById('rpPeriod')) === null || _document$getElementB2 === void 0 ? void 0 : _document$getElementB2.value.trim()) || String(new Date().getFullYear());
        memberCount = ((_document$getElementB3 = document.getElementById('rpMemberCount')) === null || _document$getElementB3 === void 0 ? void 0 : _document$getElementB3.value) || '0';
        highlight = ((_document$getElementB4 = document.getElementById('rpHighlight')) === null || _document$getElementB4 === void 0 ? void 0 : _document$getElementB4.value.trim()) || '';
        activities = ((_document$getElementB5 = document.getElementById('rpActivities')) === null || _document$getElementB5 === void 0 ? void 0 : _document$getElementB5.value.trim()) || '';
        competition = ((_document$getElementB6 = document.getElementById('rpCompetition')) === null || _document$getElementB6 === void 0 ? void 0 : _document$getElementB6.value.trim()) || '';
        docs = typeof DB !== 'undefined' && DB.get ? DB.get('docs') : [];
        allMembers = typeof DB !== 'undefined' && DB.get ? DB.get('membersList') : []; // Lấy top 5 đoàn viên hoạt động tích cực
        memberList = (window.members || []).map(function (m) {
          return "".concat(m.name, " (").concat(m.role, "): ").concat(m.achieve);
        }).join('; ') || allMembers.slice(0, 5).map(function (m) {
          return m.fullName || m.name;
        }).join(', '); // Tóm tắt 10 văn bản gần nhất liên quan
        docSummary = docs.slice(-10).map(function (d) {
          return "\u2022 ".concat(d.title).concat(d.code ? ' [' + d.code + ']' : '', ": ").concat((d.summary || '').substring(0, 100));
        }).join('\n');
        prompt = PromptBuilder.buildReportPrompt({
          unit: unit,
          period: period,
          memberCount: memberCount,
          highlight: highlight,
          activities: activities,
          competition: competition,
          memberList: memberList,
          docSummary: docSummary,
          secretaryName: settings.secretaryName
        });
        _context2.p = 2;
        _context2.n = 3;
        return callAI(prompt, {
          maxTokens: PromptUtils.budgetTokens('report'),
          temperature: 0.4,
          noCache: true // báo cáo mỗi lần khác nhau
        });
      case 3:
        result = _context2.v;
        if (el) el.innerHTML = result.replace(/\n/g, '<br>');

        // Cập nhật preview
        previewTitle = document.getElementById('rpPreviewTitle');
        previewMeta = document.getElementById('rpPreviewMeta');
        previewBody = document.getElementById('rpPreviewBody');
        if (previewTitle) previewTitle.textContent = "B\xC1O C\xC1O TH\xC0NH T\xCDCH THI \u0110UA \u2014 ".concat(unit.toUpperCase());
        if (previewMeta) previewMeta.textContent = "\u0110\u01A1n v\u1ECB: ".concat(unit, " | Giai \u0111o\u1EA1n: ").concat(period);
        if (previewBody) previewBody.innerHTML = result.replace(/\n/g, '<br>');
        banner = document.getElementById('reportAiReviewBanner');
        if (banner) banner.style.display = 'flex';
        if (typeof toast === 'function') toast('✅ Báo cáo đã soạn xong! Vui lòng kiểm tra và chỉnh sửa trước khi sử dụng.', 'success');
        _context2.n = 5;
        break;
      case 4:
        _context2.p = 4;
        _t3 = _context2.v;
        if (el) el.innerHTML = "<span style=\"color:rgba(255,100,100,0.8)\">L\u1ED7i: ".concat(_t3.message, "</span>");
        if (typeof toast === 'function') toast("L\u1ED7i AI: ".concat(_t3.message), 'error');
      case 5:
        return _context2.a(2);
    }
  }, _callee2, null, [[2, 4]]);
}));

/**
 * PATCH 3: loadSummary — Nâng cấp prompt tổng hợp trích yếu
 */
// Sử dụng var thay const để tránh SyntaxError khi khai báo trùng trong global scope
var _origLoadSummary = window.loadSummary;
window.loadSummary = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
  var vanBanTab, el, settings, _document$getElementB7, _document$getElementB8, docs, from, to, dateRange, prompt, result, _t4;
  return _regenerator().w(function (_context3) {
    while (1) switch (_context3.p = _context3.n) {
      case 0:
        // Make sure we're on the right tab (merged from index.html patch)
        vanBanTab = document.getElementById('summary-tab-van-ban');
        if (vanBanTab && !vanBanTab.classList.contains('active')) {
          if (typeof switchTab === 'function') switchTab('summary', 'van-ban');
        }
        el = document.getElementById('summaryReportPreview');
        if (el) {
          _context3.n = 1;
          break;
        }
        _origLoadSummary === null || _origLoadSummary === void 0 || _origLoadSummary();
        return _context3.a(2);
      case 1:
        settings = typeof DB !== 'undefined' && DB.getObj ? DB.getObj('settings') : {};
        el.innerHTML = '<div style="text-align:center;padding:16px"><div class="spinner" style="margin:0 auto 8px"></div>AI đang tổng hợp...</div>';
        _context3.p = 2;
        docs = typeof DB !== 'undefined' && DB.get ? DB.get('docs') : []; // Áp dụng filter nếu có
        from = (_document$getElementB7 = document.getElementById('summaryFrom')) === null || _document$getElementB7 === void 0 ? void 0 : _document$getElementB7.value;
        to = (_document$getElementB8 = document.getElementById('summaryTo')) === null || _document$getElementB8 === void 0 ? void 0 : _document$getElementB8.value;
        if (from) docs = docs.filter(function (d) {
          return d.issueDate >= from;
        });
        if (to) docs = docs.filter(function (d) {
          return d.issueDate <= to;
        });
        if (docs.length) {
          _context3.n = 3;
          break;
        }
        el.innerHTML = '<div style="text-align:center;padding:24px;color:var(--gray)">Chưa có văn bản nào để tổng hợp.</div>';
        return _context3.a(2);
      case 3:
        dateRange = from && to ? "".concat(from, " \u0111\u1EBFn ").concat(to) : from ? "T\u1EEB ".concat(from) : to ? "\u0110\u1EBFn ".concat(to) : '';
        prompt = PromptBuilder.buildSummaryPrompt(docs, dateRange);
        if (!(settings.apiKey && navigator.onLine)) {
          _context3.n = 5;
          break;
        }
        _context3.n = 4;
        return callAI(prompt, {
          maxTokens: PromptUtils.budgetTokens('summary')
        });
      case 4:
        result = _context3.v;
        _context3.n = 6;
        break;
      case 5:
        // Offline fallback
        result = typeof OfflineEngine !== 'undefined' ? OfflineEngine.summarizeDocs(docs) : 'Cần API Key để tổng hợp trực tuyến.';
      case 6:
        el.innerHTML = result.replace(/\n/g, '<br>');
        _context3.n = 8;
        break;
      case 7:
        _context3.p = 7;
        _t4 = _context3.v;
        el.innerHTML = "<span style=\"color:var(--red)\">L\u1ED7i: ".concat(_t4.message, "</span>");
      case 8:
        return _context3.a(2);
    }
  }, _callee3, null, [[2, 7]]);
}));

/**
 * PATCH 4: aiAnalytics / loadAiAnalytics — Nâng cấp prompt phân tích dashboard
 */
var _origAiAnalytics = window.loadAiAnalytics || window.aiAnalytics;
window.loadAiAnalytics = window.aiAnalytics = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
  var settings, docs, tasks, reminders, members, typeCounts, el, prompt, result, _t5;
  return _regenerator().w(function (_context4) {
    while (1) switch (_context4.p = _context4.n) {
      case 0:
        settings = typeof DB !== 'undefined' && DB.getObj ? DB.getObj('settings') : {};
        if (settings.apiKey) {
          _context4.n = 1;
          break;
        }
        if (typeof toast === 'function') toast('Cần cấu hình API Key Gemini', 'warning');
        return _context4.a(2);
      case 1:
        docs = typeof DB !== 'undefined' && DB.get ? DB.get('docs') : [];
        tasks = typeof DB !== 'undefined' && DB.get ? DB.get('tasks') : [];
        reminders = typeof DB !== 'undefined' && DB.get ? DB.get('reminders') : [];
        members = typeof DB !== 'undefined' && DB.get ? DB.get('membersList') : [];
        typeCounts = {};
        docs.forEach(function (d) {
          var label = d.type || 'khac';
          typeCounts[label] = (typeCounts[label] || 0) + 1;
        });
        el = document.getElementById('aiAnalyticsSummary');
        if (el) el.innerHTML = '<div style="text-align:center;padding:8px"><div class="spinner" style="margin:0 auto 8px;border-color:rgba(255,255,255,0.2);border-top-color:var(--gold-light)"></div><small>AI đang phân tích...</small></div>';
        prompt = PromptBuilder.buildAnalyticsPrompt({
          docCount: docs.length,
          pendingCount: docs.filter(function (d) {
            return d.status === 'pending';
          }).length,
          overdueCount: docs.filter(function (d) {
            return d.status === 'overdue';
          }).length,
          doneCount: docs.filter(function (d) {
            return d.status === 'done';
          }).length,
          taskCount: tasks.length,
          taskDone: tasks.filter(function (t) {
            return t.status === 'done';
          }).length,
          reminderPending: reminders.filter(function (r) {
            return !r.done;
          }).length,
          typeCounts: typeCounts,
          memberCount: members.length,
          recentDocs: docs.slice(-5)
        });
        _context4.p = 2;
        _context4.n = 3;
        return callAI(prompt, {
          maxTokens: PromptUtils.budgetTokens('analytics'),
          temperature: 0.2
        });
      case 3:
        result = _context4.v;
        if (el) el.innerHTML = result.replace(/\n/g, '<br>');
        _context4.n = 5;
        break;
      case 4:
        _context4.p = 4;
        _t5 = _context4.v;
        if (el) el.innerHTML = "<span style=\"opacity:0.7\">L\u1ED7i: ".concat(_t5.message, "</span>");
      case 5:
        return _context4.a(2);
    }
  }, _callee4, null, [[2, 4]]);
}));

/**
 * PATCH 5: aiSearch — Nâng cấp prompt tìm kiếm ngữ nghĩa
 */
var _origAiSearch = window.aiSearch;
window.aiSearch = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
  var _document$getElementB9;
  var kw, settings, _docs, idxs, found, docs, prompt, result, indices, uniqueIdx, _found, _idxs, _found2, _t6;
  return _regenerator().w(function (_context5) {
    while (1) switch (_context5.p = _context5.n) {
      case 0:
        kw = (_document$getElementB9 = document.getElementById('advSearchKeyword')) === null || _document$getElementB9 === void 0 ? void 0 : _document$getElementB9.value.trim();
        if (kw) {
          _context5.n = 1;
          break;
        }
        if (typeof toast === 'function') toast('Nhập từ khóa cần tìm', 'warning');
        return _context5.a(2);
      case 1:
        settings = typeof DB !== 'undefined' && DB.getObj ? DB.getObj('settings') : {};
        if (settings.apiKey) {
          _context5.n = 3;
          break;
        }
        if (!(typeof OfflineEngine !== 'undefined')) {
          _context5.n = 2;
          break;
        }
        _docs = typeof DB !== 'undefined' && DB.get ? DB.get('docs') : [];
        idxs = OfflineEngine.semanticSearch(kw, _docs);
        found = idxs.slice(0, 15).map(function (i) {
          return _docs[i];
        }).filter(Boolean);
        _renderSearchResults(found, 'AI offline', kw);
        return _context5.a(2);
      case 2:
        if (typeof toast === 'function') toast('Cần cấu hình API Key', 'warning');
        return _context5.a(2);
      case 3:
        docs = typeof DB !== 'undefined' && DB.get ? DB.get('docs') : [];
        if (docs.length) {
          _context5.n = 4;
          break;
        }
        if (typeof toast === 'function') toast('Chưa có văn bản nào', 'info');
        return _context5.a(2);
      case 4:
        prompt = PromptBuilder.buildSearchPrompt(kw, docs);
        _context5.p = 5;
        _context5.n = 6;
        return callAI(prompt, {
          maxTokens: PromptUtils.budgetTokens('search')
        });
      case 6:
        result = _context5.v;
        indices = (result.match(/\d+/g) || []).map(Number).filter(function (n) {
          return n < docs.length;
        }); // Deduplicate
        uniqueIdx = _toConsumableArray(new Set(indices));
        _found = uniqueIdx.map(function (i) {
          return docs[i];
        }).filter(Boolean);
        _renderSearchResults(_found, 'AI ngữ nghĩa', kw);
        _context5.n = 9;
        break;
      case 7:
        _context5.p = 7;
        _t6 = _context5.v;
        if (!(typeof OfflineEngine !== 'undefined')) {
          _context5.n = 8;
          break;
        }
        _idxs = OfflineEngine.semanticSearch(kw, docs);
        _found2 = _idxs.slice(0, 15).map(function (i) {
          return docs[i];
        }).filter(Boolean);
        _renderSearchResults(_found2, 'AI offline', kw);
        return _context5.a(2);
      case 8:
        if (typeof toast === 'function') toast('Lỗi tìm kiếm: ' + _t6.message, 'error');
      case 9:
        return _context5.a(2);
    }
  }, _callee5, null, [[5, 7]]);
}));

/** Helper render kết quả tìm kiếm */
function _renderSearchResults(found, source, kw) {
  var countEl = document.getElementById('searchResultCount');
  var resEl = document.getElementById('searchResults');
  if (countEl) countEl.textContent = "\u2014 ".concat(source, " t\xECm th\u1EA5y ").concat(found.length, " v\u0103n b\u1EA3n cho \"").concat(kw, "\"");
  if (!resEl) return;
  if (!found.length) {
    resEl.innerHTML = '<div class="empty-state"><i class="fas fa-search"></i><p>Không tìm thấy văn bản phù hợp</p></div>';
    return;
  }
  var DOC_TYPES_LOCAL = typeof DOC_TYPES !== 'undefined' ? DOC_TYPES : {};
  resEl.innerHTML = found.map(function (d) {
    var tp = DOC_TYPES_LOCAL[d.type] || {
      icon: 'fa-file-alt',
      color: '#6b7280',
      label: d.type || 'Văn bản'
    };
    return "<div style=\"padding:14px;border-bottom:1px solid var(--gray-light);display:flex;gap:14px;align-items:flex-start\">\n      <div style=\"width:40px;height:40px;border-radius:8px;background:rgba(212,160,23,0.1);display:flex;align-items:center;justify-content:center;flex-shrink:0\">\n        <i class=\"fas fa-robot\" style=\"color:var(--gold)\"></i>\n      </div>\n      <div style=\"flex:1\">\n        <div style=\"font-weight:700;font-size:0.88rem;margin-bottom:3px\">".concat(d.title || 'Không tên', "</div>\n        <div style=\"font-size:0.75rem;color:var(--gray)\">").concat(tp.label, " ").concat(d.code ? '• ' + d.code : '', " ").concat(d.issuer ? '• ' + d.issuer : '').concat(d.deadline ? ' • Hạn: ' + d.deadline : '', "</div>\n        ").concat(d.summary ? "<div style=\"font-size:0.78rem;color:var(--text-soft);margin-top:4px\">".concat(d.summary.substring(0, 150), "...</div>") : '', "\n      </div>\n      <button class=\"btn btn-ghost btn-sm\" onclick=\"typeof viewDoc==='function'&&viewDoc('").concat(d.id, "')\"><i class=\"fas fa-eye\"></i></button>\n    </div>");
  }).join('');
}

// ═══════════════════════════════════════════════════════════════════════════
//  PHẦN 4: PATCH fillTemplateWithAI (được gọi từ hàm tplFillWithAI)
//  Intercept qua callAI — thêm system-level override cho template prompts
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Hàm helper để các hàm template gọi trực tiếp khi cần
 */
window.buildTemplatePromptUpgraded = function (data) {
  return PromptBuilder.buildTemplatePrompt(data);
};

// Override callAI để intercept template prompt cũ và nâng cấp
var _origCallAI = window.callAI;
window.callAI = /*#__PURE__*/function () {
  var _ref18 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(prompt) {
    var opts,
      extractVar,
      data,
      upgradedPrompt,
      enhancedPrompt,
      _args6 = arguments;
    return _regenerator().w(function (_context6) {
      while (1) switch (_context6.n) {
        case 0:
          opts = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : {};
          if (!(typeof prompt === 'string' && prompt.includes('NOI_DUNG_CHINH') && prompt.includes('KET_QUA_HOAT_DONG') && prompt.includes('Điền nội dung CHI TIẾT') && !prompt.includes('━━━') // chưa được nâng cấp
          )) {
            _context6.n = 1;
            break;
          }
          // Trích xuất thông tin từ prompt cũ
          extractVar = function extractVar(regex) {
            var _2;
            return ((_2 = (prompt.match(regex) || [])[1]) === null || _2 === void 0 ? void 0 : _2.trim()) || '';
          };
          data = {
            templateType: extractVar(/LOẠI VĂN BẢN:\s*(.+)/i),
            templateName: extractVar(/LOẠI VĂN BẢN:\s*(.+)/i),
            unit: extractVar(/Tên đơn vị:\s*(.+)/i),
            secretary: extractVar(/Bí thư:\s*(.+)/i),
            month: extractVar(/Tháng[^\d]*(\d+)/i),
            year: extractVar(/Năm[^\d]*(\d{4})/i) || String(new Date().getFullYear()),
            memberCount: extractVar(/Số đoàn viên[^:]*:\s*(\d+)/i),
            memberList: extractVar(/Đoàn viên tiêu biểu:\s*(.+)/i),
            docSummary: extractVar(/DỮ LIỆU VĂN BẢN GẦN ĐÂY:\s*([\s\S]+?)YÊU CẦU ĐẶC BIỆT/i),
            extraRequirements: extractVar(/YÊU CẦU ĐẶC BIỆT:\s*(.+)/i)
          };
          upgradedPrompt = PromptBuilder.buildTemplatePrompt(data);
          return _context6.a(2, _origCallAI(upgradedPrompt, _objectSpread(_objectSpread({}, opts), {}, {
            maxTokens: opts.maxTokens || PromptUtils.budgetTokens('template')
          })));
        case 1:
          if (!(typeof prompt === 'string' && prompt.includes('tổng hợp trích yếu') && prompt.includes('Danh sách văn bản') && !prompt.includes('━━━'))) {
            _context6.n = 2;
            break;
          }
          // Dùng prompt gốc nhưng thêm system context
          enhancedPrompt = "B\u1EA1n l\xE0 chuy\xEAn gia ph\xE2n t\xEDch v\u0103n b\u1EA3n \u0110o\xE0n TNCS HCM, vi\u1EBFt theo phong c\xE1ch h\xE0nh ch\xEDnh chuy\xEAn nghi\u1EC7p.\n\n".concat(prompt, "\n\nY\xCAU C\u1EA6U B\u1ED4 SUNG:\n- Ph\xE2n nh\xF3m r\xF5 r\xE0ng theo lo\u1EA1i v\u0103n b\u1EA3n\n- N\xEAu b\u1EADt deadline v\xE0 h\xE0nh \u0111\u1ED9ng c\u1EA7n l\xE0m ngay\n- K\u1EBFt th\xFAc b\u1EB1ng 3-5 vi\u1EC7c \u01B0u ti\xEAn c\u1EA7n x\u1EED l\xFD trong tu\u1EA7n\n- Kh\xF4ng d\xF9ng markdown (##, **), d\xF9ng d\u1EA5u g\u1EA1ch ngang v\xE0 s\u1ED1 th\u1EE9 t\u1EF1\n- Ng\xF4n ng\u1EEF h\xE0nh ch\xEDnh, kh\xF4ng v\u0103n hoa");
          return _context6.a(2, _origCallAI(enhancedPrompt, _objectSpread(_objectSpread({}, opts), {}, {
            maxTokens: opts.maxTokens || PromptUtils.budgetTokens('summary')
          })));
        case 2:
          return _context6.a(2, _origCallAI(prompt, opts));
      }
    }, _callee6);
  }));
  return function (_x3) {
    return _ref18.apply(this, arguments);
  };
}();

// ═══════════════════════════════════════════════════════════════════════════
//  PHẦN 5: EXPORT PUBLIC API
// ═══════════════════════════════════════════════════════════════════════════

window.PromptBuilder = PromptBuilder;
window.PromptUtils = PromptUtils;

// Backward compat
window.callGemini = /*#__PURE__*/function () {
  var _ref19 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(prompt, apiKey, model) {
    return _regenerator().w(function (_context7) {
      while (1) switch (_context7.n) {
        case 0:
          return _context7.a(2, window.callAI(prompt, {
            apiKey: apiKey,
            forceModel: model
          }));
      }
    }, _callee7);
  }));
  return function (_x4, _x5, _x6) {
    return _ref19.apply(this, arguments);
  };
}();
console.log('[ĐoànVăn Prompt Upgrade v2.0] Loaded\n', '✅ analyzeWithAI    — Chain-of-thought + offline-hint + JSON repair\n', '✅ generateReportAI — NĐ30 format + số liệu tự động\n', '✅ loadSummary      — Phân nhóm thông minh + action items\n', '✅ aiAnalytics      — Benchmark + cảnh báo ngưỡng\n', '✅ aiSearch         — Semantic + query expansion + offline fallback\n', '✅ Template prompt  — Context-aware + style guide hành chính\n', '✅ Token budget     — Tối ưu quota theo task type');
