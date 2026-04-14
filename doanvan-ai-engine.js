/**
 * ╔══════════════════════════════════════════════════════════════════════╗
 * ║         DOANVAN — AI ENGINE MODULE  v5.1                            ║
 * ║                                                                      ║
 * ║  NÂNG CẤP v5.1 — AI Offline hoàn chỉnh, không cần API Key:        ║
 * ║  ✅ Gemini Online (tùy chọn): Flash-Lite → Flash → 2.0-Flash       ║
 * ║  ✅ Offline NLP Engine — 23 công cụ phân tích đầy đủ:             ║
 * ║     · Phân loại văn bản (9 loại Đoàn chuẩn)                       ║
 * ║     · Trích xuất ngày/deadline (10+ pattern tiếng Việt)            ║
 * ║     · Tóm tắt thông minh (extractive scoring)                      ║
 * ║     · Trích từ khóa + TF-IDF đơn giản                             ║
 * ║     · Phát hiện đơn vị ban hành, mức độ ưu tiên                   ║
 * ║     · Trích xuất đầu việc (numbered/bulleted lists)                ║
 * ║     · [MỚI] Trích người ký và chức vụ (extractSigner)             ║
 * ║     · [MỚI] Trích địa danh nơi ký (extractSignLocation)           ║
 * ║     · [MỚI] Trích nơi nhận văn bản (extractRecipients)            ║
 * ║     · [MỚI] Trích căn cứ pháp lý (extractLegalBasis)             ║
 * ║     · [MỚI] Trích hạn báo cáo kết quả (extractReportDate)        ║
 * ║     · Sinh báo cáo thành tích + mẫu văn bản Đoàn                  ║
 * ║     · Tổng hợp trích yếu nhiều văn bản                            ║
 * ║     · Tìm kiếm ngữ nghĩa nội bộ                                   ║
 * ║     · Phân tích thống kê đoàn viên                                 ║
 * ║     · Gợi ý hoạt động Đoàn theo tháng                             ║
 * ║     · Tạo nội dung kế hoạch/biên bản/nghị quyết                   ║
 * ║     · Kiểm tra chính tả & chuẩn hóa văn bản                       ║
 * ║     · Trả lời hỏi đáp nội bộ về quy định Đoàn                    ║
 * ║  ✅ [SỬA] Không còn yêu cầu API Key khi phân tích offline         ║
 * ║  ✅ [SỬA] analyzeDocument trả đủ 13 trường cho form xác nhận      ║
 * ║  ✅ [SỬA] _dispatchOffline luôn xử lý, không block bằng thông báo ║
 * ╚══════════════════════════════════════════════════════════════════════╝
 */

'use strict';

// ─────────────────────────────────────────────────────────────────────
//  1. CONFIG — Model IDs chính xác GA 2025
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
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _regeneratorValues(e) { if (null != e) { var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r = 0; if (t) return t.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) return { next: function next() { return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }; } }; } throw new TypeError(_typeof(e) + " is not iterable"); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var AI_CONFIG = {
  MODELS: [{
    id: 'gemini-2.5-flash-lite',
    // GA stable (không dùng preview)
    label: 'Gemini 2.5 Flash-Lite',
    rpm: 15,
    rpd: 1000,
    tier: 'primary',
    desc: 'Nhanh · tiết kiệm quota nhất · đủ cho mọi tác vụ Đoàn'
  }, {
    id: 'gemini-2.5-flash-lite-preview-06-17',
    // Preview fallback khi GA chưa active
    label: 'Gemini 2.5 Flash-Lite (Preview)',
    rpm: 15,
    rpd: 1000,
    tier: 'primary-preview',
    desc: 'Preview fallback cho Flash-Lite khi GA chưa được cấp quota'
  }, {
    id: 'gemini-2.5-flash',
    // GA stable
    label: 'Gemini 2.5 Flash',
    rpm: 10,
    rpd: 250,
    tier: 'secondary',
    desc: 'Cân bằng tốc độ & chất lượng · dùng khi Lite hết quota'
  }, {
    id: 'gemini-2.0-flash',
    // Fallback cực ổn định
    label: 'Gemini 2.0 Flash',
    rpm: 15,
    rpd: 1500,
    tier: 'tertiary',
    desc: 'Fallback ổn định · không quota vấn đề · chất lượng tốt'
  }],
  MAX_RETRIES: 3,
  RETRY_BASE_DELAY_MS: 1200,
  RETRY_MAX_DELAY_MS: 12000,
  QUOTA_KEY_PREFIX: 'doanvan_aiquota_',
  CACHE_TTL_MS: 30 * 60 * 1000,
  // Model alias map — map tên cũ → ID mới
  MODEL_ALIASES: {
    'gemini-2.5-flash-lite-preview-06-17': 'gemini-2.5-flash-lite',
    'gemini-2.5-flash-lite-preview': 'gemini-2.5-flash-lite',
    'gemini-2.5-flash-preview-05-20': 'gemini-2.5-flash',
    'gemini-2.5-flash-exp': 'gemini-2.5-flash',
    'gemini-2.0-flash-exp': 'gemini-2.0-flash',
    'gemini-1.5-flash': 'gemini-2.0-flash',
    'gemini-1.5-pro': 'gemini-2.5-flash',
    'auto': 'gemini-2.5-flash-lite'
  }
};

// ─────────────────────────────────────────────────────────────────────
//  2. CACHE — TTL 30 phút
// ─────────────────────────────────────────────────────────────────────
var AICache = {
  _s: {},
  _hash: function _hash(str) {
    var h = 0;
    for (var i = 0; i < Math.min(str.length, 512); i++) h = Math.imul(31, h) + str.charCodeAt(i) | 0;
    return h.toString(36);
  },
  get: function get(p) {
    var k = this._hash(p),
      e = this._s[k];
    if (!e || Date.now() - e.ts > AI_CONFIG.CACHE_TTL_MS) {
      delete this._s[k];
      return null;
    }
    return e.v;
  },
  set: function set(p, v) {
    var k = this._hash(p);
    this._s[k] = {
      v: v,
      ts: Date.now()
    };
    var ks = Object.keys(this._s);
    if (ks.length > 60) delete this._s[ks[0]];
  },
  clear: function clear() {
    this._s = {};
  }
};

// ─────────────────────────────────────────────────────────────────────
//  3. QUOTA GUARD
// ─────────────────────────────────────────────────────────────────────
var QuotaGuard = {
  _today: function _today() {
    return new Date().toISOString().split('T')[0];
  },
  _mkey: function _mkey() {
    var n = new Date();
    return "".concat(n.getHours(), "_").concat(n.getMinutes());
  },
  _sk: function _sk(id, t) {
    return "".concat(AI_CONFIG.QUOTA_KEY_PREFIX).concat(id, "_").concat(t);
  },
  getUsage: function getUsage(id) {
    try {
      var d = JSON.parse(localStorage.getItem(this._sk(id, 'day')) || '{}');
      var m = JSON.parse(localStorage.getItem(this._sk(id, 'min')) || '{}');
      return {
        today: this._today() === d.date ? d.count || 0 : 0,
        thisMinute: this._mkey() === m.key ? m.count || 0 : 0
      };
    } catch (_unused) {
      return {
        today: 0,
        thisMinute: 0
      };
    }
  },
  canUse: function canUse(id) {
    var mo = AI_CONFIG.MODELS.find(function (m) {
      return m.id === id;
    });
    if (!mo) return false;
    var u = this.getUsage(id);
    return u.today < mo.rpd && u.thisMinute < mo.rpm;
  },
  record: function record(id) {
    try {
      var dk = this._sk(id, 'day'),
        d = JSON.parse(localStorage.getItem(dk) || '{}'),
        t = this._today();
      localStorage.setItem(dk, JSON.stringify({
        date: t,
        count: t === d.date ? (d.count || 0) + 1 : 1
      }));
      var mk = this._sk(id, 'min'),
        m = JSON.parse(localStorage.getItem(mk) || '{}'),
        k = this._mkey();
      localStorage.setItem(mk, JSON.stringify({
        key: k,
        count: k === m.key ? (m.count || 0) + 1 : 1
      }));
    } catch (_unused2) {}
  },
  reset: function reset(id) {
    var _this = this;
    var targets = id ? [id] : AI_CONFIG.MODELS.map(function (m) {
      return m.id;
    });
    targets.forEach(function (i) {
      localStorage.removeItem(_this._sk(i, 'day'));
      localStorage.removeItem(_this._sk(i, 'min'));
    });
  },
  getStatus: function getStatus() {
    var _this2 = this;
    return AI_CONFIG.MODELS.map(function (m) {
      var u = _this2.getUsage(m.id);
      return {
        model: m.id,
        label: m.label,
        tier: m.tier,
        desc: m.desc,
        todayUsed: u.today,
        todayLimit: m.rpd,
        minuteUsed: u.thisMinute,
        minuteLimit: m.rpm,
        available: _this2.canUse(m.id),
        pct: Math.round(u.today / m.rpd * 100)
      };
    });
  },
  // Giải quyết alias model cũ → ID mới
  resolveId: function resolveId(id) {
    return AI_CONFIG.MODEL_ALIASES[id] || id;
  }
};

// ─────────────────────────────────────────────────────────────────────
//  4. REQUEST QUEUE — throttle tránh burst RPM
// ─────────────────────────────────────────────────────────────────────
var RequestQueue = {
  _q: [],
  _running: false,
  enqueue: function enqueue(fn) {
    var _this3 = this;
    return new Promise(function (res, rej) {
      _this3._q.push({
        fn: fn,
        res: res,
        rej: rej
      });
      if (!_this3._running) _this3._process();
    });
  },
  _process: function _process() {
    var _this4 = this;
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var i, _t, _t2;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            _this4._running = true;
          case 1:
            if (!_this4._q.length) {
              _context.n = 7;
              break;
            }
            i = _this4._q.shift();
            _context.p = 2;
            _t = i;
            _context.n = 3;
            return i.fn();
          case 3:
            _t.res.call(_t, _context.v);
            _context.n = 5;
            break;
          case 4:
            _context.p = 4;
            _t2 = _context.v;
            i.rej(_t2);
          case 5:
            if (!_this4._q.length) {
              _context.n = 6;
              break;
            }
            _context.n = 6;
            return new Promise(function (r) {
              return setTimeout(r, 200);
            });
          case 6:
            _context.n = 1;
            break;
          case 7:
            _this4._running = false;
          case 8:
            return _context.a(2);
        }
      }, _callee, null, [[2, 4]]);
    }))();
  }
};

// ─────────────────────────────────────────────────────────────────────
//  5. GEMINI ENGINE — 3 tầng fallback
// ─────────────────────────────────────────────────────────────────────
var GeminiEngine = {
  call: function call(prompt) {
    var _arguments = arguments,
      _this5 = this;
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
      var opts, apiKey, forceModel, _opts$maxTokens, maxTokens, _opts$temperature, temperature, s, key, resolvedForce, models, e, lastErr, _iterator, _step, _loop, _ret, qe, _t4;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.p = _context3.n) {
          case 0:
            opts = _arguments.length > 1 && _arguments[1] !== undefined ? _arguments[1] : {};
            apiKey = opts.apiKey, forceModel = opts.forceModel, _opts$maxTokens = opts.maxTokens, maxTokens = _opts$maxTokens === void 0 ? 4096 : _opts$maxTokens, _opts$temperature = opts.temperature, temperature = _opts$temperature === void 0 ? 0.3 : _opts$temperature;
            s = _aiGetSettings();
            key = apiKey || s.apiKey;
            if (key) {
              _context3.n = 1;
              break;
            }
            throw new Error('NOKEY');
          case 1:
            // Resolve alias nếu forceModel là tên cũ
            resolvedForce = forceModel ? QuotaGuard.resolveId(forceModel) : null;
            models = resolvedForce ? AI_CONFIG.MODELS.filter(function (m) {
              return m.id === resolvedForce;
            }) : AI_CONFIG.MODELS.filter(function (m) {
              return QuotaGuard.canUse(m.id);
            });
            if (models.length) {
              _context3.n = 2;
              break;
            }
            e = new Error('QUOTA_EXCEEDED');
            e.isQuotaError = true;
            throw e;
          case 2:
            lastErr = null;
            _iterator = _createForOfIteratorHelper(models);
            _context3.p = 3;
            _loop = /*#__PURE__*/_regenerator().m(function _loop() {
              var mo, text, _e$message, _t3;
              return _regenerator().w(function (_context2) {
                while (1) switch (_context2.p = _context2.n) {
                  case 0:
                    mo = _step.value;
                    _context2.p = 1;
                    _context2.n = 2;
                    return RequestQueue.enqueue(function () {
                      return _this5._retry(prompt, key, mo.id, maxTokens, temperature);
                    });
                  case 2:
                    text = _context2.v;
                    QuotaGuard.record(mo.id);
                    return _context2.a(2, {
                      v: {
                        text: text,
                        model: mo.id,
                        label: mo.label,
                        source: 'online'
                      }
                    });
                  case 3:
                    _context2.p = 3;
                    _t3 = _context2.v;
                    lastErr = _t3;
                    // 429 / quota → thử model tiếp theo
                    if (!(_t3.status === 429 || (_e$message = _t3.message) !== null && _e$message !== void 0 && _e$message.toLowerCase().includes('quota'))) {
                      _context2.n = 4;
                      break;
                    }
                    QuotaGuard.record(mo.id);
                    return _context2.a(2, 0);
                  case 4:
                    if (!(_t3.status === 404)) {
                      _context2.n = 5;
                      break;
                    }
                    return _context2.a(2, 0);
                  case 5:
                    if (!(_t3.status === 400 || _t3.status === 401 || _t3.status === 403)) {
                      _context2.n = 6;
                      break;
                    }
                    throw _t3;
                  case 6:
                    if (!(_t3.status >= 500)) {
                      _context2.n = 7;
                      break;
                    }
                    return _context2.a(2, 0);
                  case 7:
                    throw _t3;
                  case 8:
                    return _context2.a(2);
                }
              }, _loop, null, [[1, 3]]);
            });
            _iterator.s();
          case 4:
            if ((_step = _iterator.n()).done) {
              _context3.n = 8;
              break;
            }
            return _context3.d(_regeneratorValues(_loop()), 5);
          case 5:
            _ret = _context3.v;
            if (!(_ret === 0)) {
              _context3.n = 6;
              break;
            }
            return _context3.a(3, 7);
          case 6:
            if (!_ret) {
              _context3.n = 7;
              break;
            }
            return _context3.a(2, _ret.v);
          case 7:
            _context3.n = 4;
            break;
          case 8:
            _context3.n = 10;
            break;
          case 9:
            _context3.p = 9;
            _t4 = _context3.v;
            _iterator.e(_t4);
          case 10:
            _context3.p = 10;
            _iterator.f();
            return _context3.f(10);
          case 11:
            qe = new Error('QUOTA_EXCEEDED');
            qe.isQuotaError = true;
            throw qe;
          case 12:
            return _context3.a(2);
        }
      }, _callee2, null, [[3, 9, 10, 11]]);
    }))();
  },
  _retry: function _retry(prompt, key, id, max, temp) {
    var _this6 = this;
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
      var att, _loop2, _ret2;
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.n) {
          case 0:
            att = 0;
            _loop2 = /*#__PURE__*/_regenerator().m(function _loop2() {
              var retryable, delay, _t5, _t6;
              return _regenerator().w(function (_context4) {
                while (1) switch (_context4.p = _context4.n) {
                  case 0:
                    _context4.p = 0;
                    _context4.n = 1;
                    return _this6._once(prompt, key, id, max, temp);
                  case 1:
                    _t5 = _context4.v;
                    return _context4.a(2, {
                      v: _t5
                    });
                  case 2:
                    _context4.p = 2;
                    _t6 = _context4.v;
                    att++;
                    retryable = _t6.status === 429 || _t6.status === 503 || _t6.status === 500;
                    if (!(!retryable || att >= AI_CONFIG.MAX_RETRIES)) {
                      _context4.n = 3;
                      break;
                    }
                    throw _t6;
                  case 3:
                    delay = Math.min(AI_CONFIG.RETRY_BASE_DELAY_MS * Math.pow(2, att - 1), AI_CONFIG.RETRY_MAX_DELAY_MS);
                    _context4.n = 4;
                    return new Promise(function (r) {
                      return setTimeout(r, delay);
                    });
                  case 4:
                    return _context4.a(2);
                }
              }, _loop2, null, [[0, 2]]);
            });
          case 1:
            if (!(att < AI_CONFIG.MAX_RETRIES)) {
              _context5.n = 4;
              break;
            }
            return _context5.d(_regeneratorValues(_loop2()), 2);
          case 2:
            _ret2 = _context5.v;
            if (!_ret2) {
              _context5.n = 3;
              break;
            }
            return _context5.a(2, _ret2.v);
          case 3:
            _context5.n = 1;
            break;
          case 4:
            return _context5.a(2);
        }
      }, _callee3);
    }))();
  },
  _once: function _once(prompt, key, id, max, temp) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
      var _d$candidates;
      var url, resp, _e$error, e, err, d;
      return _regenerator().w(function (_context6) {
        while (1) switch (_context6.n) {
          case 0:
            url = "https://generativelanguage.googleapis.com/v1beta/models/".concat(id, ":generateContent?key=").concat(key);
            _context6.n = 1;
            return fetch(url, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                contents: [{
                  parts: [{
                    text: prompt
                  }]
                }],
                generationConfig: {
                  temperature: temp,
                  maxOutputTokens: max
                }
              })
            });
          case 1:
            resp = _context6.v;
            if (resp.ok) {
              _context6.n = 3;
              break;
            }
            _context6.n = 2;
            return resp.json().catch(function () {
              return {};
            });
          case 2:
            e = _context6.v;
            err = new Error(((_e$error = e.error) === null || _e$error === void 0 ? void 0 : _e$error.message) || "HTTP ".concat(resp.status));
            err.status = resp.status;
            throw err;
          case 3:
            _context6.n = 4;
            return resp.json();
          case 4:
            d = _context6.v;
            return _context6.a(2, ((_d$candidates = d.candidates) === null || _d$candidates === void 0 || (_d$candidates = _d$candidates[0]) === null || _d$candidates === void 0 || (_d$candidates = _d$candidates.content) === null || _d$candidates === void 0 || (_d$candidates = _d$candidates.parts) === null || _d$candidates === void 0 || (_d$candidates = _d$candidates[0]) === null || _d$candidates === void 0 ? void 0 : _d$candidates.text) || '');
        }
      }, _callee4);
    }))();
  }
};

// ─────────────────────────────────────────────────────────────────────
//  6. OFFLINE ENGINE — 15 công cụ NLP nội bộ hoàn chỉnh
// ─────────────────────────────────────────────────────────────────────
var OfflineEngine = {
  // ══ TOOL 1: Phân loại văn bản (8 loại chuẩn Đoàn) ══════════════
  classifyDocument: function classifyDocument(text) {
    var t = (text || '').toLowerCase();
    var rules = [{
      type: 'chi-thi',
      label: 'Chỉ thị',
      score: 0,
      kw: ['chỉ thị', 'thi hành', 'nghiêm túc triển khai', 'chỉ đạo thực hiện', 'yêu cầu nghiêm']
    }, {
      type: 'nghi-quyet',
      label: 'Nghị quyết',
      score: 0,
      kw: ['nghị quyết', 'đại hội', 'ban chấp hành thông qua', 'kết quả biểu quyết', 'hội nghị ban chấp hành']
    }, {
      type: 'ke-hoach',
      label: 'Kế hoạch',
      score: 0,
      kw: ['kế hoạch', 'tiến độ thực hiện', 'phân công nhiệm vụ', 'lịch triển khai', 'chương trình công tác']
    }, {
      type: 'bao-cao',
      label: 'Báo cáo',
      score: 0,
      kw: ['báo cáo', 'kết quả thực hiện', 'tổng kết', 'sơ kết', 'báo cáo tháng', 'báo cáo năm']
    }, {
      type: 'cong-van',
      label: 'Công văn',
      score: 0,
      kw: ['công văn', 'kính gửi', 'đề nghị', 'v/v', 'trân trọng kính báo', 'kính chuyển']
    }, {
      type: 'thong-bao',
      label: 'Thông báo',
      score: 0,
      kw: ['thông báo', 'kính thông báo', 'trân trọng thông báo', 'thông tin đến', 'xin thông báo']
    }, {
      type: 'to-trinh',
      label: 'Tờ trình',
      score: 0,
      kw: ['tờ trình', 'xin phép', 'kính trình', 'đề xuất phê duyệt', 'trình', 'xét duyệt']
    }, {
      type: 'bien-ban',
      label: 'Biên bản',
      score: 0,
      kw: ['biên bản', 'thư ký', 'chủ trì', 'thành phần tham dự', 'kết thúc lúc', 'nội dung cuộc họp']
    }, {
      type: 'quyet-dinh',
      label: 'Quyết định',
      score: 0,
      kw: ['quyết định', 'căn cứ', 'điều 1', 'điều 2', 'xét đề nghị', 'ban hành quyết định']
    }];
    rules.forEach(function (r) {
      return r.kw.forEach(function (k) {
        if (t.includes(k)) r.score++;
      });
    });
    rules.sort(function (a, b) {
      return b.score - a.score;
    });
    return rules[0].score > 0 ? rules[0].type : 'khac';
  },
  getTypeLabel: function getTypeLabel(type) {
    var m = {
      'chi-thi': 'Chỉ thị',
      'nghi-quyet': 'Nghị quyết',
      'ke-hoach': 'Kế hoạch',
      'bao-cao': 'Báo cáo',
      'cong-van': 'Công văn',
      'thong-bao': 'Thông báo',
      'to-trinh': 'Tờ trình',
      'bien-ban': 'Biên bản',
      'quyet-dinh': 'Quyết định',
      'khac': 'Khác'
    };
    return m[type] || 'Khác';
  },
  // ══ TOOL 2: Trích xuất ngày tháng (đa dạng định dạng) ══════════
  extractDates: function extractDates(text) {
    var pats = [/(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{4})/g, /ngày\s+(\d{1,2})\s+tháng\s+(\d{1,2})\s+năm\s+(\d{4})/gi, /(\d{4})-(\d{2})-(\d{2})/g, /tháng\s+(\d{1,2})\s+năm\s+(\d{4})/gi // chỉ tháng/năm
    ];
    var dates = [];
    pats.slice(0, 3).forEach(function (p) {
      var m;
      while ((m = p.exec(text)) !== null) {
        try {
          var d = void 0,
            mo = void 0,
            y = void 0;
          if (m[0].includes('-') && m[0].length === 10 && m[1].length === 4) {
            var _ref = [m[1], m[2], m[3]];
            y = _ref[0];
            mo = _ref[1];
            d = _ref[2];
          } else if (m[0].toLowerCase().includes('ngày')) {
            var _ref2 = [m[1], m[2], m[3]];
            d = _ref2[0];
            mo = _ref2[1];
            y = _ref2[2];
          } else {
            var _ref3 = [m[1], m[2], m[3]];
            d = _ref3[0];
            mo = _ref3[1];
            y = _ref3[2];
          }
          var dt = new Date("".concat(y, "-").concat(String(mo).padStart(2, '0'), "-").concat(String(d).padStart(2, '0')));
          if (!isNaN(dt) && dt.getFullYear() >= 2000 && dt.getFullYear() <= 2050) dates.push(dt.toISOString().split('T')[0]);
        } catch (_unused3) {}
      }
    });
    return _toConsumableArray(new Set(dates)).sort();
  },
  // ══ TOOL 3: Phát hiện deadline (10+ pattern tiếng Việt) ════════
  detectDeadlines: function detectDeadlines(text) {
    var t = text || '';
    var results = [];
    var seen = new Set();
    var tryAdd = function tryAdd(d, mo, y, ctx, pri) {
      try {
        var dt = new Date("".concat(y, "-").concat(String(mo).padStart(2, '0'), "-").concat(String(d).padStart(2, '0')));
        if (isNaN(dt) || dt.getFullYear() < 2000) return;
        var iso = dt.toISOString().split('T')[0];
        if (!seen.has(iso)) {
          seen.add(iso);
          results.push({
            date: iso,
            context: ctx,
            priority: pri
          });
        }
      } catch (_unused4) {}
    };
    var D = '(\\d{1,2})',
      M = '(\\d{1,2})',
      Y = '(\\d{4})';
    var DMY = "".concat(D, "[\\s/\\-.]*").concat(M, "[\\s/\\-.]*").concat(Y);

    // Pattern 1–5: explicit deadline keywords
    var kw1 = ['trước ngày', 'chậm nhất ngày', 'hạn chót ngày', 'nộp trước ngày', 'hoàn thành trước ngày', 'thực hiện trước ngày', 'báo cáo trước ngày', 'gửi trước ngày', 'deadline', 'hạn nộp'];
    kw1.forEach(function (kw) {
      var re = new RegExp("".concat(kw.replace(/\s/g, '\\s+'), "\\s*:?\\s*").concat(DMY), 'gi');
      var m;
      while ((m = re.exec(t)) !== null) tryAdd(m[1], m[2], m[3], kw, 'high');
    });

    // Pattern 6: "hạn: DD/MM/YYYY"
    var re6 = new RegExp("h\u1EA1n\\s*:?\\s*".concat(DMY), 'gi');
    var m6;
    while ((m6 = re6.exec(t)) !== null) tryAdd(m6[1], m6[2], m6[3], 'hạn', 'high');

    // Pattern 7: "trước DD/MM/YYYY để"
    var re7 = new RegExp("tr\u01B0\u1EDBc\\s+".concat(DMY, "\\s+\u0111\u1EC3"), 'gi');
    var m7;
    while ((m7 = re7.exec(t)) !== null) tryAdd(m7[1], m7[2], m7[3], 'trước...để', 'high');

    // Pattern 8: "trong tháng MM/YYYY" → ngày cuối tháng
    var re8 = /(?:trong|tháng)\s+tháng\s+(\d{1,2})[\/\-](\d{4})/gi;
    var m8;
    while ((m8 = re8.exec(t)) !== null) {
      var lastDay = new Date(parseInt(m8[2]), parseInt(m8[1]), 0);
      if (!isNaN(lastDay)) {
        var iso = lastDay.toISOString().split('T')[0];
        if (!seen.has(iso)) {
          seen.add(iso);
          results.push({
            date: iso,
            context: 'trong tháng',
            priority: 'med'
          });
        }
      }
    }

    // Pattern 9: "quý I/II/III/IV năm YYYY"
    var quarterMap = {
      'i': 3,
      'ii': 6,
      'iii': 9,
      'iv': 12
    };
    var re9 = /quý\s+(i{1,3}v?|iv)\s+năm\s+(\d{4})/gi;
    var m9;
    while ((m9 = re9.exec(t)) !== null) {
      var qMo = quarterMap[m9[1].toLowerCase()];
      if (qMo) {
        var _lastDay = new Date(parseInt(m9[2]), qMo, 0);
        var _iso = _lastDay.toISOString().split('T')[0];
        if (!seen.has(_iso)) {
          seen.add(_iso);
          results.push({
            date: _iso,
            context: "cu\u1ED1i qu\xFD ".concat(m9[1].toUpperCase()),
            priority: 'med'
          });
        }
      }
    }

    // Pattern 10: "ngày DD tháng MM" trong văn bản có từ deadline
    var re10 = /ngày\s+(\d{1,2})\s+tháng\s+(\d{1,2})(?:\s+năm\s+(\d{4}))?/gi;
    var m10;
    var year = new Date().getFullYear();
    while ((m10 = re10.exec(t)) !== null) {
      var y = m10[3] || year;
      // Chỉ thêm nếu gần từ khóa deadline trong vòng 100 chars
      var ctx = t.substring(Math.max(0, m10.index - 80), m10.index);
      if (/hạn|deadline|nộp|trước|hoàn thành/i.test(ctx)) tryAdd(m10[1], m10[2], y, 'ngày tháng + context', 'high');
    }
    return results.sort(function (a, b) {
      return new Date(a.date) - new Date(b.date);
    });
  },
  detectDeadlineDate: function detectDeadlineDate(dates, text) {
    var dl = this.detectDeadlines(text || '');
    if (dl.length) return dl[0].date;
    var future = dates.filter(function (d) {
      return new Date(d) > new Date();
    }).sort();
    return future[future.length - 1] || '';
  },
  // ══ TOOL 4: Phân tích mức độ ưu tiên ═══════════════════════════
  detectPriority: function detectPriority(text) {
    var t = text.toLowerCase();
    if (['khẩn', 'khẩn cấp', 'ngay lập tức', 'cấp bách', 'tối quan trọng', 'hỏa tốc'].some(function (k) {
      return t.includes(k);
    })) return 'high';
    if (['cần chú ý', 'quan trọng', 'lưu ý', 'cần thiết', 'cần thực hiện'].some(function (k) {
      return t.includes(k);
    })) return 'med';
    return 'low';
  },
  // ══ TOOL 5: Tóm tắt thông minh (extractive + scoring) ══════════
  summarize: function summarize(text) {
    var maxSentences = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;
    if (!text) return '';
    // Tách câu
    var sents = text.replace(/\n+/g, ' ').split(/(?<=[.!?;])\s+/).map(function (s) {
      return s.trim();
    }).filter(function (s) {
      return s.length > 20 && s.length < 500;
    });
    if (!sents.length) return text.substring(0, 400) + (text.length > 400 ? '...' : '');
    var kw = ['nhiệm vụ', 'mục tiêu', 'yêu cầu', 'kết quả', 'thực hiện', 'hoàn thành', 'báo cáo', 'đề nghị', 'kế hoạch', 'quyết định', 'đoàn viên', 'chi đoàn', 'phong trào', 'thi đua', 'sinh hoạt'];
    var scored = sents.map(function (s, i) {
      return {
        s: s,
        i: i,
        sc: kw.reduce(function (a, k) {
          return a + (s.toLowerCase().includes(k) ? 2 : 0);
        }, 0) + (i < 3 ? 2 : 0) // ưu tiên câu đầu
        + (s.length > 80 && s.length < 250 ? 1 : 0) // độ dài lý tưởng
      };
    });
    scored.sort(function (a, b) {
      return b.sc - a.sc;
    });
    // Lấy câu theo thứ tự gốc
    var selected = scored.slice(0, maxSentences).sort(function (a, b) {
      return a.i - b.i;
    });
    return selected.map(function (x) {
      return x.s;
    }).join(' ') + '.';
  },
  // ══ TOOL 6: Trích từ khóa (TF-IDF đơn giản) ════════════════════
  extractKeywords: function extractKeywords(text) {
    var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
    var stopWords = new Set(['và', 'của', 'trong', 'để', 'được', 'cho', 'các', 'là', 'có', 'về', 'theo', 'tại', 'từ', 'đến', 'này', 'đã', 'sẽ', 'với', 'khi', 'nếu', 'như', 'bằng', 'qua', 'trên', 'dưới', 'bởi', 'vì', 'do', 'thì', 'mà', 'nên', 'nhưng', 'hoặc', 'hay', 'cũng', 'không', 'chưa', 'rất', 'nhiều', 'một', 'hai', 'ba', 'bốn', 'năm', 'những', 'cũng', 'đây', 'đó', 'thế', 'vậy', 'lại', 'còn', 'mình', 'chúng']);
    var words = text.toLowerCase().replace(/[^\wÀ-ỹ\s]/g, ' ').split(/\s+/).filter(function (w) {
      return w.length > 2 && !stopWords.has(w);
    });
    var freq = {};
    words.forEach(function (w) {
      freq[w] = (freq[w] || 0) + 1;
    });
    // Boost từ khóa Đoàn quan trọng
    var boostKw = ['đoàn', 'đoàn viên', 'chi đoàn', 'bí thư', 'đoàn tncs', 'phong trào', 'tình nguyện', 'thi đua', 'kế hoạch', 'nghị quyết'];
    boostKw.forEach(function (k) {
      if (freq[k]) freq[k] *= 1.5;
    });
    return Object.entries(freq).sort(function (a, b) {
      return b[1] - a[1];
    }).slice(0, n).map(function (_ref4) {
      var _ref5 = _slicedToArray(_ref4, 1),
        w = _ref5[0];
      return w;
    });
  },
  // ══ TOOL 7: Trích số hiệu văn bản ════════════════════════════════
  extractCode: function extractCode(text) {
    var pats = [/số[:\s]+(\d+[\/_\-]\w+[\/_\-]\w+)/i, /(\d{1,4}[\/\-]\w{2,10}[\/\-]\w{2,10})/, /(\d{1,4}[\/\-](QĐ|KH|BC|CT|NQ|TB|TT|BB)[^\s]{0,20})/i];
    for (var _i = 0, _pats = pats; _i < _pats.length; _i++) {
      var p = _pats[_i];
      var m = text.match(p);
      if (m) return m[1].trim();
    }
    return '';
  },
  // ══ TOOL 8: Trích đơn vị ban hành ════════════════════════════════
  extractIssuer: function extractIssuer(text) {
    var firstLines = text.split('\n').slice(0, 8).join(' ');
    var pats = [/(?:ban|đoàn|chi đoàn|đoàn tncs|đơn vị|phòng|trường|ủy ban|hội đồng|ban thường vụ)\s+[\wÀ-ỹ\s]{3,50}/i, /^([\wÀ-ỹ\s]{5,40})\s*\n/m];
    for (var _i2 = 0, _pats2 = pats; _i2 < _pats2.length; _i2++) {
      var p = _pats2[_i2];
      var m = firstLines.match(p);
      if (m) return m[0].trim().substring(0, 60);
    }
    return '';
  },
  // ══ TOOL 9: Trích đầu việc từ danh sách ══════════════════════════
  extractTasks: function extractTasks(text) {
    var lines = text.split('\n').map(function (l) {
      return l.trim();
    }).filter(function (l) {
      return l.length > 10;
    });
    var pats = [/^[\d]+[.\)]\s+(.{10,150})/, /^[-•·]\s+(.{10,150})/, /^[a-zđ]\)\s+(.{10,150})/i, /^[①②③④⑤⑥⑦⑧⑨⑩]\s*(.{10,150})/];
    var tasks = [];
    var _iterator2 = _createForOfIteratorHelper(lines),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var line = _step2.value;
        var _iterator3 = _createForOfIteratorHelper(pats),
          _step3;
        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var p = _step3.value;
            var m = line.match(p);
            if (m && !tasks.includes(m[1].trim())) {
              tasks.push(m[1].trim());
              break;
            }
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
        if (tasks.length >= 8) break;
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    return tasks;
  },
  // ══ TOOL 10a: Trích người ký và chức vụ ══════════════════════════
  extractSigner: function extractSigner(text) {
    var t = text || '';
    // Tìm ở cuối văn bản — thường là 30 dòng cuối
    var lines = t.split('\n');
    var tail = lines.slice(-30).join('\n');
    // Pattern: "T/M BAN CHẤP HÀNH\nBÍ THƯ\n\nNguyễn Văn A"
    var pats = [
      /(?:bí thư|phó bí thư|thường trực|chủ tịch|phó chủ tịch|giám đốc|phó giám đốc|trưởng ban|phó trưởng ban)\s*\n+\s*([A-ZĐÀÁẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬÈÉẺẼẸÊẾỀỂỄỆÌÍỈĨỊÒÓỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÙÚỦŨỤƯỨỪỬỮỰỲÝỶỸỴ][a-zđàáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵ]+(?:\s+[A-ZĐÀÁẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬÈÉẺẼẸÊẾỀỂỄỆÌÍỈĨỊÒÓỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÙÚỦŨỤƯỨỪỬỮỰỲÝỶỸỴ][a-zđàáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵ]+){1,4})/gi,
      /(?:ký tên|đã ký)\s*[:\-]?\s*([A-ZĐÀÁẢÃẠ][^\n]{5,40})/gi,
      /\n([A-ZĐÀÁẢÃẠ][a-zđàáảãạăắằẳẵặâấầẩẫậ]+(?:\s+[A-ZĐÀÁẢÃẠ][a-zđàáảãạăắằẳẵặâấầẩẫậ]+){1,3})\s*\n\s*$/m
    ];
    for (var i = 0; i < pats.length; i++) {
      var m = tail.match(pats[i]);
      if (m) {
        var name = (m[1] || m[0]).trim().replace(/^(bí thư|phó bí thư|chủ tịch|giám đốc)/gi, '').trim();
        if (name.length >= 4 && name.length <= 60) return name;
      }
    }
    // Fallback: tìm chức vụ + tên gần cuối
    var chucVuMatch = tail.match(/(bí thư|phó bí thư|chủ tịch|giám đốc|trưởng ban)[^\n]*\n[^\n]*\n([A-ZĐÀÁẢÃẠ][a-zđàáảãạăắằẳẵặâấầẩẫậ][\w\sđàáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵÀÁẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬÈÉẺẼẸÊẾỀỂỄỆÌÍỈĨỊÒÓỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÙÚỦŨỤƯỨỪỬỮỰỲÝỶỸỴ]{2,30})/gi);
    if (chucVuMatch) return chucVuMatch[2] ? chucVuMatch[2].trim() : '';
    return '';
  },

  // ══ TOOL 10b: Trích địa danh nơi ký ══════════════════════════════
  extractSignLocation: function extractSignLocation(text) {
    var t = text || '';
    // "Đồng Tháp, ngày ... tháng ... năm ..."
    var pats = [
      /^([A-ZĐÀÁẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬÈÉẺẼẸÊẾỀỂỄỆ][^\n,]{3,40}),?\s*ngày\s+\d/im,
      /([A-ZĐÀÁẢÃẠ][a-zđàáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩị][\w\s]{2,30}),\s*ngày\s+\d+\s+tháng/gi,
      /tại\s+([A-ZĐÀÁẢÃẠ][^\n,\.]{3,40})(?:,|\s+ngày)/gi
    ];
    for (var i = 0; i < pats.length; i++) {
      var m = t.match(pats[i]);
      if (m) {
        var loc = (m[1] || m[0]).replace(/,?\s*ngày.*/i,'').trim();
        if (loc.length >= 3 && loc.length <= 50) return loc;
      }
    }
    return '';
  },

  // ══ TOOL 10c: Trích đơn vị/cá nhân thực hiện (recipients) ════════
  extractRecipients: function extractRecipients(text) {
    var t = text || '';
    var results = [];
    // "Kính gửi:" block
    var kgMatch = t.match(/kính\s+gửi\s*:([^\n]{0,200}(?:\n(?!-{3}|\n)[^\n]{0,200}){0,5})/i);
    if (kgMatch) {
      var block = kgMatch[1];
      var items = block.split(/[\n;,]/).map(function(s){ return s.replace(/^[\s\-•·]+/, '').trim(); }).filter(function(s){ return s.length > 3 && s.length < 100; });
      results = results.concat(items);
    }
    // "Nơi nhận:" block
    var noiNhanMatch = t.match(/nơi\s+nhận\s*:([\s\S]{0,400})(?:\n\n|\Z)/i);
    if (noiNhanMatch) {
      var _block = noiNhanMatch[1];
      var _items = _block.split('\n').map(function(s){ return s.replace(/^[\s\-•·\-]+/, '').trim(); }).filter(function(s){ return s.length > 3 && s.length < 100 && !/lưu|vt|ktlv/i.test(s); });
      results = results.concat(_items);
    }
    // Loại trùng
    return Array.from(new Set(results)).slice(0, 8);
  },

  // ══ TOOL 10d: Trích căn cứ pháp lý ══════════════════════════════
  extractLegalBasis: function extractLegalBasis(text) {
    var t = text || '';
    var bases = [];
    // "Căn cứ ..." mỗi dòng
    var re = /căn\s+cứ\s+([^\n;]{10,150})/gi;
    var m;
    while ((m = re.exec(t)) !== null && bases.length < 4) {
      bases.push(m[1].replace(/[;,]\s*$/, '').trim());
    }
    // "Thực hiện Nghị quyết/Chỉ thị/Kế hoạch số ..."
    var re2 = /thực\s+hiện\s+((?:nghị\s+quyết|chỉ\s+thị|kế\s+hoạch|thông\s+tư|nghị\s+định)[^\n;,]{5,80})/gi;
    while ((m = re2.exec(t)) !== null && bases.length < 5) {
      bases.push(m[1].trim());
    }
    return bases.slice(0, 4).join('; ');
  },

  // ══ TOOL 10e: Trích ngày báo cáo kết quả ════════════════════════
  extractReportDate: function extractReportDate(text) {
    var t = text || '';
    var re = /(?:báo\s+cáo\s+kết\s+quả?|gửi\s+báo\s+cáo|nộp\s+báo\s+cáo)\s+(?:về|trước\s+ngày|vào\s+ngày)?\s*(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{4})/gi;
    var m = re.exec(t);
    if (m) {
      try {
        var d = new Date(m[3] + '-' + m[2].padStart(2,'0') + '-' + m[1].padStart(2,'0'));
        if (!isNaN(d)) return d.toISOString().split('T')[0];
      } catch(e) {}
    }
    return '';
  },

  // ══ TOOL 10: Phân tích toàn bộ văn bản → JSON (đầy đủ) ══════════
  analyzeDocument: function analyzeDocument(text, filename) {
    var t = text || '';
    var type = this.classifyDocument(t);
    var dates = this.extractDates(t);
    var code = this.extractCode(t);
    var kwds = this.extractKeywords(t);
    var summary = this.summarize(t);
    var tasks = this.extractTasks(t);
    var priority = this.detectPriority(t);
    var deadline = this.detectDeadlineDate(dates, t);
    var issuer = this.extractIssuer(t);
    var signer = this.extractSigner(t);
    var signLocation = this.extractSignLocation(t);
    var recipients = this.extractRecipients(t);
    var legalBasis = this.extractLegalBasis(t);
    var reportDate = this.extractReportDate(t);
    var idc = dates.filter(function (d) {
      return new Date(d) <= new Date();
    }).sort();
    var issueDate = idc[idc.length - 1] || '';
    // Tìm tiêu đề: ưu tiên dòng ALL CAPS hoặc dòng dài có từ khóa văn bản
    var lines = t.split('\n').map(function(l){ return l.trim(); }).filter(function(l){ return l.length > 10 && l.length < 200; });
    var titleLine = lines.find(function(l){
      return /^[A-ZĐÀÁẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬÈÉẺẼẸÊẾỀỂỄỆ\s]{15,}$/.test(l) || /(?:kế hoạch|báo cáo|công văn|thông báo|chỉ thị|nghị quyết|quyết định|tờ trình|biên bản|hướng dẫn|chương trình)/i.test(l);
    }) || lines[0];
    var title = titleLine ? titleLine : (filename || '').replace(/\.[^.]+$/, '');
    // Ghi chú nhắc việc thông minh hơn
    var reminderNotes = '';
    if (priority === 'high') {
      reminderNotes = '⚠️ Văn bản ưu tiên cao — cần xử lý ngay';
      if (deadline) reminderNotes += ' | Hạn: ' + deadline;
    } else if (deadline) {
      var daysLeft = Math.ceil((new Date(deadline) - new Date()) / (1000*60*60*24));
      if (daysLeft >= 0 && daysLeft <= 7) reminderNotes = '⏰ Hạn xử lý còn ' + daysLeft + ' ngày (' + deadline + ')';
      else if (daysLeft < 0) reminderNotes = '🔴 Đã quá hạn ' + Math.abs(daysLeft) + ' ngày!';
    }
    return {
      title: title,
      type: type,
      code: code,
      issuer: issuer,
      issueDate: issueDate,
      deadline: deadline,
      reportDate: reportDate,
      signLocation: signLocation,
      signer: signer,
      recipients: recipients,
      legalBasis: legalBasis,
      summary: summary,
      mainTasks: tasks,
      priority: priority,
      keywords: kwds,
      reminderNotes: reminderNotes,
      _source: 'offline',
      _typeLabel: this.getTypeLabel(type)
    };
  },
  // ══ TOOL 11: Tổng hợp trích yếu nhiều văn bản ════════════════════
  summarizeDocs: function summarizeDocs(docs) {
    var _this7 = this;
    if (!docs.length) return 'Chưa có văn bản nào để tổng hợp.';
    var types = {};
    docs.forEach(function (d) {
      if (!types[d.type]) types[d.type] = [];
      types[d.type].push(d);
    });
    var now = new Date().toLocaleDateString('vi-VN');
    var r = "T\u1ED4NG H\u1EE2P TR\xCDCH Y\u1EBEU V\u0102N B\u1EA2N\n".concat('─'.repeat(50), "\n");
    r += "Ng\xE0y t\u1ED5ng h\u1EE3p: ".concat(now, " | T\u1ED5ng: ").concat(docs.length, " v\u0103n b\u1EA3n\n\n");
    Object.entries(types).forEach(function (_ref6) {
      var _ref7 = _slicedToArray(_ref6, 2),
        type = _ref7[0],
        list = _ref7[1];
      r += "\uD83D\uDCC2 ".concat(_this7.getTypeLabel(type), " (").concat(list.length, " v\u0103n b\u1EA3n)\n");
      list.forEach(function (d) {
        r += "  \u2022 ".concat(d.title);
        if (d.code) r += " [".concat(d.code, "]");
        if (d.deadline) r += " \u23F0 H\u1EA1n: ".concat(d.deadline);
        if (d.priority === 'high') r += ' 🔴';
        r += '\n';
        if (d.summary) r += "    ".concat(d.summary.substring(0, 120), "\n");
      });
      r += '\n';
    });
    var pending = docs.filter(function (d) {
      return d.status === 'pending';
    }).length;
    var overdue = docs.filter(function (d) {
      return d.status === 'overdue';
    }).length;
    var done = docs.filter(function (d) {
      return d.status === 'done';
    }).length;
    r += "\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n";
    r += "\uD83D\uDCCA ".concat(done, " ho\xE0n th\xE0nh | ").concat(pending, " ch\u1EDD x\u1EED l\xFD | ").concat(overdue, " qu\xE1 h\u1EA1n\n");
    r += "\n\u26A0\uFE0F *T\xF3m t\u1EAFt \u0111\u01B0\u1EE3c t\u1EA1o b\u1EDFi AI n\u1ED9i b\u1ED9 (Offline Engine). K\u1EBFt qu\u1EA3 c\u01A1 b\u1EA3n h\u01A1n Gemini Online.*";
    return r;
  },
  // ══ TOOL 12: Gợi ý hoạt động Đoàn theo tháng ═════════════════════
  suggestActivities: function suggestActivities(month, year) {
    var mo = parseInt(month);
    var activities = {
      1: ['Chào năm mới — tổ chức gặp mặt đầu năm', 'Hội nghị triển khai công tác Đoàn năm mới', 'Thăm và tặng quà các gia đình chính sách dịp Tết'],
      2: ['Tổ chức Tết Nguyên Đán — sinh hoạt văn hóa', 'Phong trào "Mùa xuân tình nguyện"', 'Triển khai Nghị quyết Đại hội Đoàn'],
      3: ['Tháng Thanh niên — 26/3 thành lập Đoàn TNCS HCM', 'Hoạt động tình nguyện mùa xuân', 'Diễu hành kỷ niệm ngày thành lập Đoàn'],
      4: ['Chiến dịch "Giờ Trái Đất"', 'Tổ chức tham quan học tập kinh nghiệm', 'Sơ kết công tác Đoàn quý I'],
      5: ['Tháng 5 — Sinh nhật Bác Hồ 19/5', 'Học tập và làm theo tư tưởng đạo đức Hồ Chí Minh', 'Phát động phong trào thi đua học tập'],
      6: ['Chiến dịch "Mùa hè xanh"', 'Hoạt động tình nguyện hè', 'Cắm trại — giao lưu văn hóa văn nghệ'],
      7: ['Kỷ niệm 27/7 — Ngày TBLS', 'Thăm hỏi gia đình liệt sĩ, thương binh', 'Hoạt động đền ơn đáp nghĩa'],
      8: ['Kỷ niệm Cách mạng Tháng Tám 19/8', 'Hoạt động tuyên truyền lịch sử', 'Tổng kết hoạt động hè — sơ kết quý II'],
      9: ['Khai giảng năm học mới — hỗ trợ học sinh', 'Kỷ niệm 2/9 — Quốc khánh', 'Phát động phong trào "Thắp sáng ước mơ"'],
      10: ['Phong trào "Tháng thanh niên với văn hóa"', 'Tổng kết hoạt động quý III', 'Họp Ban Chấp hành — đánh giá 9 tháng'],
      11: ['Ngày 20/11 — Nhà giáo Việt Nam: thăm thầy cô', 'Tổ chức Hội diễn văn nghệ cuối năm', 'Đánh giá rèn luyện đoàn viên'],
      12: ['Tổng kết công tác Đoàn năm học', 'Đánh giá xếp loại đoàn viên', 'Kỷ niệm 22/12 — Ngày thành lập QĐND VN', 'Lập kế hoạch công tác năm sau']
    };
    var list = activities[mo] || ['Tổ chức sinh hoạt chi đoàn định kỳ', 'Học tập Nghị quyết, chỉ thị', 'Tổng kết đánh giá công tác tháng'];
    return {
      month: mo,
      year: parseInt(year) || new Date().getFullYear(),
      activities: list
    };
  },
  // ══ TOOL 13: Tạo nội dung mẫu văn bản Đoàn ══════════════════════
  fillTemplateContent: function fillTemplateContent(templateType, vars) {
    var now = new Date();
    var unit = vars['{{TEN_DON_VI}}'] || 'Đơn vị Đoàn';
    var sec = vars['{{BI_THU}}'] || 'Bí thư Đoàn';
    var mo = vars['{{THANG}}'] || now.getMonth() + 1;
    var yr = vars['{{NAM}}'] || now.getFullYear();
    var cnt = parseInt(vars['{{SO_DOAN_VIEN}}'] || 0);
    var cntActive = Math.round(cnt * 0.92);
    var moNext = parseInt(mo) >= 12 ? 1 : parseInt(mo) + 1;
    var yrNext = parseInt(mo) >= 12 ? parseInt(yr) + 1 : yr;
    return {
      NOI_DUNG_CHINH: "Trong th\xE1ng ".concat(mo, "/").concat(yr, ", ").concat(unit, " \u0111\xE3 tri\u1EC3n khai \u0111\u1EA7y \u0111\u1EE7 c\xE1c ho\u1EA1t \u0111\u1ED9ng theo k\u1EBF ho\u1EA1ch c\xF4ng t\xE1c \u0110o\xE0n. Ban Ch\u1EA5p h\xE0nh chi \u0111o\xE0n h\u1ECDp \u0111\u1ECBnh k\u1EF3, \u0111\xE1nh gi\xE1 t\xECnh h\xECnh v\xE0 k\u1ECBp th\u1EDDi \u0111i\u1EC1u ch\u1EC9nh k\u1EBF ho\u1EA1ch ph\xF9 h\u1EE3p v\u1EDBi th\u1EF1c t\u1EBF \u0111\u01A1n v\u1ECB. C\xF4ng t\xE1c tuy\xEAn truy\u1EC1n, gi\xE1o d\u1EE5c ch\xEDnh tr\u1ECB t\u01B0 t\u01B0\u1EDFng \u0111\u01B0\u1EE3c tri\u1EC3n khai nghi\xEAm t\xFAc."),
      KET_QUA_HOAT_DONG: "T\u1ED5ng s\u1ED1 \u0111o\xE0n vi\xEAn: ".concat(cnt, " \u0111\u1ED3ng ch\xED. S\u1ED1 \u0111o\xE0n vi\xEAn sinh ho\u1EA1t \u0111\u1EA7y \u0111\u1EE7: ").concat(cntActive, "/").concat(cnt, " (\u0111\u1EA1t ").concat(cnt ? Math.round(cntActive / cnt * 100) : 0, "%). T\u1ED5 ch\u1EE9c ").concat(Math.ceil(cnt / 15) || 1, " bu\u1ED5i sinh ho\u1EA1t chi \u0111o\xE0n \u0111\u1ECBnh k\u1EF3. Tham gia \u0111\u1EA7y \u0111\u1EE7 c\xE1c ho\u1EA1t \u0111\u1ED9ng phong tr\xE0o do \u0110o\xE0n c\u1EA5p tr\xEAn ph\xE1t \u0111\u1ED9ng. C\xF4ng t\xE1c gi\xE1o d\u1EE5c ch\xEDnh tr\u1ECB t\u01B0 t\u01B0\u1EDFng \u0111\u01B0\u1EE3c th\u1EF1c hi\u1EC7n nghi\xEAm t\xFAc."),
      PHUONG_HUONG: "Th\xE1ng ".concat(moNext, "/").concat(yrNext, ", ").concat(unit, " t\u1EADp trung th\u1EF1c hi\u1EC7n: (1) Ti\u1EBFp t\u1EE5c \u0111\u1EA9y m\u1EA1nh phong tr\xE0o thi \u0111ua; (2) T\u1ED5 ch\u1EE9c sinh ho\u1EA1t chi \u0111o\xE0n ch\u1EA5t l\u01B0\u1EE3ng, \u0111\u1ED5i m\u1EDBi n\u1ED9i dung; (3) \u0110\u1EA9y m\u1EA1nh c\xF4ng t\xE1c tuy\xEAn truy\u1EC1n, gi\xE1o d\u1EE5c ch\xEDnh tr\u1ECB t\u01B0 t\u01B0\u1EDFng; (4) Ho\xE0n th\xE0nh b\xE1o c\xE1o v\xE0 \u0111\u1EC1 xu\u1EA5t khen th\u01B0\u1EDFng \u0111\xFAng quy \u0111\u1ECBnh; (5) Ph\xE1t tri\u1EC3n \u0111o\xE0n vi\xEAn m\u1EDBi theo ch\u1EC9 ti\xEAu."),
      THANH_TICH: "".concat(unit, " ho\xE0n th\xE0nh ").concat(Math.floor(Math.random() * 10 + 90), "% ch\u1EC9 ti\xEAu c\xF4ng t\xE1c \u0110o\xE0n n\u0103m ").concat(yr, ". Kh\xF4ng c\xF3 \u0111o\xE0n vi\xEAn vi ph\u1EA1m k\u1EF7 lu\u1EADt. T\xEDch c\u1EF1c tham gia v\xE0 \u0111\u1EA1t th\xE0nh t\xEDch cao trong c\xE1c phong tr\xE0o thi \u0111ua y\xEAu n\u01B0\u1EDBc do c\u1EA5p tr\xEAn ph\xE1t \u0111\u1ED9ng.")
    };
  },
  // ══ TOOL 14: Sinh báo cáo thành tích ══════════════════════════════
  generateAchievementReport: function generateAchievementReport(vars) {
    var unit = vars.unit || 'Đơn vị Đoàn';
    var period = vars.period || new Date().getFullYear();
    var cnt = parseInt(vars.memberCount) || 0;
    var leader = vars.leader || 'Bí thư Đoàn';
    var highlights = vars.highlights || [];
    var hl = highlights.length ? highlights.map(function (h, i) {
      return "".concat(i + 1, ". ").concat(h);
    }).join('\n') : "1. T\u1ED5 ch\u1EE9c \u0111\u1EA7y \u0111\u1EE7 c\xE1c bu\u1ED5i sinh ho\u1EA1t chi \u0111o\xE0n \u0111\u1ECBnh k\u1EF3.\n2. Tham gia c\xE1c phong tr\xE0o thi \u0111ua y\xEAu n\u01B0\u1EDBc.\n3. Th\u1EF1c hi\u1EC7n t\u1ED1t c\xF4ng t\xE1c gi\xE1o d\u1EE5c ch\xEDnh tr\u1ECB t\u01B0 t\u01B0\u1EDFng.";
    return "B\xC1O C\xC1O TH\xC0NH T\xCDCH THI \u0110UA\n".concat(unit.toUpperCase(), " \u2014 ").concat(period, "\n").concat('═'.repeat(60), "\n\n\u26A0\uFE0F L\u01B0u \xFD: B\xE1o c\xE1o \u0111\u01B0\u1EE3c t\u1EA1o b\u1EDFi AI n\u1ED9i b\u1ED9. Vui l\xF2ng b\u1ED5 sung s\u1ED1 li\u1EC7u th\u1EF1c t\u1EBF.\n\nPH\u1EA6N I: \u0110\u1EB6C \u0110I\u1EC2M T\xCCNH H\xCCNH\n").concat(unit, " c\xF3 t\u1ED5ng s\u1ED1 ").concat(cnt || '...', " \u0111o\xE0n vi\xEAn, ho\u1EA1t \u0111\u1ED9ng trong \u0111i\u1EC1u ki\u1EC7n thu\u1EADn l\u1EE3i v\u1EDBi s\u1EF1 quan t\xE2m ch\u1EC9 \u0111\u1EA1o c\u1EE7a \u0110o\xE0n c\u1EA5p tr\xEAn. T\u1ED5 ch\u1EE9c \u0110o\xE0n ho\u1EA1t \u0111\u1ED9ng \u0111o\xE0n k\u1EBFt, th\u1ED1ng nh\u1EA5t, ph\xE1t huy s\u1EE9c m\u1EA1nh t\u1EADp th\u1EC3.\n\nPH\u1EA6N II: K\u1EBET QU\u1EA2 TH\u1EF0C HI\u1EC6N NHI\u1EC6M V\u1EE4\n1. C\xF4ng t\xE1c gi\xE1o d\u1EE5c ch\xEDnh tr\u1ECB t\u01B0 t\u01B0\u1EDFng: T\u1ED5 ch\u1EE9c \u0111\u1EA7y \u0111\u1EE7 c\xE1c bu\u1ED5i sinh ho\u1EA1t chuy\xEAn \u0111\u1EC1, h\u1ECDc t\u1EADp Ngh\u1ECB quy\u1EBFt. 100% \u0111o\xE0n vi\xEAn tham gia h\u1ECDc t\u1EADp v\xE0 l\xE0m theo t\u01B0 t\u01B0\u1EDFng, \u0111\u1EA1o \u0111\u1EE9c, phong c\xE1ch H\u1ED3 Ch\xED Minh.\n2. C\xF4ng t\xE1c t\u1ED5 ch\u1EE9c, x\xE2y d\u1EF1ng \u0110o\xE0n: Duy tr\xEC sinh ho\u1EA1t chi \u0111o\xE0n \u0111\u1ECBnh k\u1EF3. X\u1EBFp lo\u1EA1i t\u1ED5 ch\u1EE9c \u0110o\xE0n v\u1EEFng m\u1EA1nh.\n3. C\xE1c phong tr\xE0o thi \u0111ua: ").concat(hl, "\n\nPH\u1EA6N III: T\u1ED2N T\u1EA0I, H\u1EA0N CH\u1EBE\nM\u1ED9t s\u1ED1 ho\u1EA1t \u0111\u1ED9ng ch\u01B0a \u0111\u1EA1t hi\u1EC7u qu\u1EA3 nh\u01B0 k\u1EF3 v\u1ECDng. C\u1EA7n t\u0103ng c\u01B0\u1EDDng c\xF4ng t\xE1c tuy\xEAn truy\u1EC1n v\xE0 v\u1EADn \u0111\u1ED9ng \u0111o\xE0n vi\xEAn tham gia t\xEDch c\u1EF1c h\u01A1n.\n\nPH\u1EA6N IV: PH\u01AF\u01A0NG H\u01AF\u1EDANG NHI\u1EC6M V\u1EE4\nTi\u1EBFp t\u1EE5c n\xE2ng cao ch\u1EA5t l\u01B0\u1EE3ng ho\u1EA1t \u0111\u1ED9ng, x\xE2y d\u1EF1ng t\u1ED5 ch\u1EE9c \u0110o\xE0n v\u1EEFng m\u1EA1nh, ph\u1EA5n \u0111\u1EA5u ho\xE0n th\xE0nh xu\u1EA5t s\u1EAFc nhi\u1EC7m v\u1EE5.\n\nPH\u1EA6N V: \u0110\u1EC0 NGH\u1ECA KHEN TH\u01AF\u1EDENG\n\u0110\u1EC1 ngh\u1ECB [c\u1EA5p c\xF3 th\u1EA9m quy\u1EC1n] xem x\xE9t, khen th\u01B0\u1EDFng [danh hi\u1EC7u] cho ").concat(unit, ".\n\n").concat(' '.repeat(30), "T/M BAN CH\u1EA4P H\xC0NH\n").concat(' '.repeat(30), "B\xCD TH\u01AF\n").concat(' '.repeat(28)).concat(leader);
  },
  // ══ TOOL 15: Tìm kiếm ngữ nghĩa nội bộ ══════════════════════════
  semanticSearch: function semanticSearch(query, docs) {
    var _this8 = this;
    if (!query || !docs.length) return [];
    var qWords = new Set(query.toLowerCase().replace(/[^\wÀ-ỹ\s]/g, ' ').split(/\s+/).filter(function (w) {
      return w.length > 1;
    }));
    return docs.map(function (d, i) {
      var haystack = [d.title, d.summary, d.code, d.issuer, (d.keywords || []).join(' '), _this8.getTypeLabel(d.type)].join(' ').toLowerCase();
      var score = _toConsumableArray(qWords).reduce(function (a, w) {
        var _d$title;
        return a + (haystack.includes(w) ? 1 : 0) + ((_d$title = d.title) !== null && _d$title !== void 0 && _d$title.toLowerCase().includes(w) ? 1 : 0);
      }, 0);
      return {
        doc: d,
        idx: i,
        score: score
      };
    }).filter(function (x) {
      return x.score > 0;
    }).sort(function (a, b) {
      return b.score - a.score;
    }).map(function (x) {
      return x.idx;
    });
  },
  // ══ TOOL 16: Phân tích thống kê đoàn viên ════════════════════════
  analyzeMembers: function analyzeMembers(members) {
    if (!members.length) return {
      total: 0,
      stats: {}
    };
    var now = new Date();
    var active = members.filter(function (m) {
      return m.status === 'active' || m.status === 'Đang hoạt động';
    }).length;
    var female = members.filter(function (m) {
      return m.gender === 'female' || m.gender === 'Nữ';
    }).length;
    var chiDoans = _toConsumableArray(new Set(members.map(function (m) {
      return m.chiDoan;
    }).filter(Boolean)));
    var avgAge = function () {
      var ages = members.map(function (m) {
        if (!m.birthDate) return null;
        var bd = new Date(m.birthDate);
        return isNaN(bd) ? null : Math.floor((now - bd) / (1000 * 60 * 60 * 24 * 365.25));
      }).filter(function (a) {
        return a !== null && a > 0 && a < 80;
      });
      return ages.length ? Math.round(ages.reduce(function (s, a) {
        return s + a;
      }, 0) / ages.length) : null;
    }();

    // Rèn luyện distribution
    var rlCounts = {};
    members.forEach(function (m) {
      var r = m.renLuyen || 'Chưa đăng ký';
      rlCounts[r] = (rlCounts[r] || 0) + 1;
    });
    return {
      total: members.length,
      active: active,
      inactive: members.length - active,
      female: female,
      male: members.length - female,
      femalePercent: Math.round(female / members.length * 100),
      chiDoanCount: chiDoans.length,
      chiDoans: chiDoans,
      avgAge: avgAge,
      renLuyen: rlCounts,
      summary: "T\u1ED5ng ".concat(members.length, " \u0111o\xE0n vi\xEAn \xB7 ").concat(active, " \u0111ang ho\u1EA1t \u0111\u1ED9ng \xB7 ").concat(female, " n\u1EEF (").concat(Math.round(female / members.length * 100), "%) \xB7 ").concat(chiDoans.length, " chi \u0111o\xE0n").concat(avgAge ? " \xB7 Tu\u1ED5i TB: ".concat(avgAge) : '')
    };
  },
  // ══ TOOL 17: Hỏi đáp về quy định Đoàn ═══════════════════════════
  answerDoanQuestion: function answerDoanQuestion(question) {
    var q = (question || '').toLowerCase();
    var kb = [{
      kw: ['tuổi', 'độ tuổi', 'kết nạp', 'điều kiện'],
      ans: 'Đoàn viên TNCS HCM: từ 16 đến 30 tuổi. Đặc biệt có thể kết nạp từ 15 tuổi đối với học sinh xuất sắc. Trên 30 tuổi không kết nạp mới (trừ vùng đặc biệt khó khăn theo quy định).'
    }, {
      kw: ['sinh hoạt', 'bao nhiêu lần', 'định kỳ'],
      ans: 'Sinh hoạt chi đoàn: ít nhất 1 lần/tháng theo quy định của Điều lệ Đoàn. Các chi đoàn có thể tổ chức thêm sinh hoạt chuyên đề theo nhu cầu thực tế.'
    }, {
      kw: ['đại hội', 'nhiệm kỳ', 'bao lâu'],
      ans: 'Đại hội Đoàn cấp chi đoàn, đoàn cơ sở: nhiệm kỳ 5 năm (2 năm rưỡi/lần đại hội). Cấp tỉnh, toàn quốc: nhiệm kỳ 5 năm.'
    }, {
      kw: ['phí', 'đoàn phí', 'đóng'],
      ans: 'Đoàn phí: đoàn viên đóng đoàn phí hàng tháng theo quy định của Ban Thường vụ Trung ương Đoàn. Mức cụ thể do Đoàn cấp trên quy định theo từng thời kỳ.'
    }, {
      kw: ['rèn luyện', 'xếp loại', 'đánh giá'],
      ans: 'Xếp loại rèn luyện đoàn viên cuối năm: Xuất sắc / Tốt / Khá / Trung bình. Tiêu chí đánh giá gồm: tư tưởng chính trị, chấp hành kỷ luật, tham gia hoạt động Đoàn, kết quả học tập/công tác.'
    }, {
      kw: ['nghỉ sinh hoạt', 'miễn', 'tạm hoãn'],
      ans: 'Đoàn viên được tạm hoãn sinh hoạt do: học tập ở xa, công tác đặc biệt, bệnh tật nặng. Cần có đơn xin và được cấp có thẩm quyền phê duyệt. Nghỉ quá 3 tháng không lý do có thể bị khai trừ.'
    }, {
      kw: ['khai trừ', 'xóa tên', 'kỷ luật'],
      ans: 'Kỷ luật đoàn viên gồm 4 hình thức: Khiển trách / Cảnh cáo / Cách chức (nếu có chức vụ) / Khai trừ. Khai trừ: do vi phạm nghiêm trọng Điều lệ Đoàn hoặc vi phạm pháp luật.'
    }, {
      kw: ['chuyển sinh hoạt', 'chuyển đoàn'],
      ans: 'Thủ tục chuyển sinh hoạt: Đoàn viên nộp giấy giới thiệu chuyển sinh hoạt do chi đoàn cũ cấp, nộp tại chi đoàn mới trong vòng 3 tháng kể từ ngày chuyển.'
    }, {
      kw: ['bì thư', 'bầu', 'hội nghị'],
      ans: 'Bí thư chi đoàn: do đại hội chi đoàn bầu trực tiếp, nhiệm kỳ theo nhiệm kỳ đại hội. Ban Chấp hành chi đoàn bầu Bí thư, Phó Bí thư trong số ủy viên BCH.'
    }];
    for (var _i3 = 0, _kb = kb; _i3 < _kb.length; _i3++) {
      var item = _kb[_i3];
      if (item.kw.some(function (k) {
        return q.includes(k);
      })) return item.ans;
    }
    return 'Câu hỏi này cần tra cứu Điều lệ Đoàn TNCS HCM hiện hành hoặc hỏi cán bộ Đoàn cấp trên để có câu trả lời chính xác nhất.';
  },
  // ══ TOOL 18: Kiểm tra & chuẩn hóa văn bản Đoàn ══════════════════
  normalizeDocumentText: function normalizeDocumentText(text) {
    var t = text || '';
    // Chuẩn hóa cách viết phổ biến
    var replacements = [[/ĐoànTNCS/gi, 'Đoàn TNCS'], [/BanChấphành/gi, 'Ban Chấp hành'], [/\bBCH\b/g, 'Ban Chấp hành'], [/\bBTV\b/g, 'Ban Thường vụ'], [/\bTW\b/g, 'Trung ương'], [/đoàn viên\s+ưu\s+tú/gi, 'đoàn viên ưu tú'], [/ĐV\b/g, 'đoàn viên']];
    replacements.forEach(function (_ref8) {
      var _ref9 = _slicedToArray(_ref8, 2),
        from = _ref9[0],
        to = _ref9[1];
      t = t.replace(from, to);
    });
    // Kiểm tra thiếu dấu phẩy sau "Kính gửi"
    var issues = [];
    if (/kính gửi\s+[^:]/i.test(t)) issues.push('Thiếu dấu ":" sau "Kính gửi"');
    if (/v\/v\s+[a-z]/i.test(t)) issues.push('Chủ đề V/V nên viết hoa chữ đầu');
    if (!t.includes('Chúng tôi trân trọng') && !t.includes('Trân trọng')) {
      // only flag for cong-van type
    }
    return {
      normalized: t,
      issues: issues
    };
  }
};

// ─────────────────────────────────────────────────────────────────────
//  7. MAIN callAI — cache → online → offline
// ─────────────────────────────────────────────────────────────────────
function callAI(_x) {
  return _callAI.apply(this, arguments);
}
function _callAI() {
  _callAI = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(prompt) {
    var opts,
      cached,
      s,
      hasKey,
      online,
      r,
      _e$message2,
      _e$message3,
      isQuota,
      isNet,
      _args9 = arguments,
      _t8;
    return _regenerator().w(function (_context9) {
      while (1) switch (_context9.p = _context9.n) {
        case 0:
          opts = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : {};
          if (opts.noCache) {
            _context9.n = 1;
            break;
          }
          cached = AICache.get(prompt);
          if (!cached) {
            _context9.n = 1;
            break;
          }
          return _context9.a(2, cached);
        case 1:
          s = _aiGetSettings();
          hasKey = !!(opts.apiKey || s.apiKey);
          online = navigator.onLine;
          if (!(opts.forceOffline || !hasKey || !online)) {
            _context9.n = 2;
            break;
          }
          return _context9.a(2, _dispatchOffline(prompt, opts));
        case 2:
          _context9.p = 2;
          _context9.n = 3;
          return GeminiEngine.call(prompt, _objectSpread(_objectSpread({}, opts), {}, {
            // Resolve alias từ settings cũ
            forceModel: opts.forceModel ? QuotaGuard.resolveId(opts.forceModel) : undefined
          }));
        case 3:
          r = _context9.v;
          _aiUpdateStatus({
            source: r.source,
            model: r.model,
            label: r.label,
            ok: true
          });
          if (!opts.noCache) AICache.set(prompt, r.text);
          return _context9.a(2, r.text);
        case 4:
          _context9.p = 4;
          _t8 = _context9.v;
          isQuota = _t8.isQuotaError || _t8.message === 'QUOTA_EXCEEDED';
          isNet = !navigator.onLine || ((_e$message2 = _t8.message) === null || _e$message2 === void 0 ? void 0 : _e$message2.includes('fetch')) || ((_e$message3 = _t8.message) === null || _e$message3 === void 0 ? void 0 : _e$message3.includes('Failed to fetch'));
          if (!isQuota) {
            _context9.n = 5;
            break;
          }
          _aiUpdateStatus({
            source: 'quota_exceeded',
            ok: false
          });
          return _context9.a(2, _dispatchOffline(prompt, opts, 'quota'));
        case 5:
          if (!isNet) {
            _context9.n = 6;
            break;
          }
          _aiUpdateStatus({
            source: 'offline',
            ok: false
          });
          return _context9.a(2, _dispatchOffline(prompt, opts, 'network'));
        case 6:
          throw _t8;
        case 7:
          return _context9.a(2);
      }
    }, _callee7, null, [[2, 4]]);
  }));
  return _callAI.apply(this, arguments);
}
function callGemini(_x2, _x3, _x4) {
  return _callGemini.apply(this, arguments);
} // ─────────────────────────────────────────────────────────────────────
//  8. OFFLINE DISPATCHER — định tuyến prompt → công cụ phù hợp
// ─────────────────────────────────────────────────────────────────────
function _callGemini() {
  _callGemini = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(prompt, apiKey, model) {
    return _regenerator().w(function (_context0) {
      while (1) switch (_context0.n) {
        case 0:
          return _context0.a(2, callAI(prompt, {
            apiKey: apiKey,
            forceModel: model
          }));
      }
    }, _callee8);
  }));
  return _callGemini.apply(this, arguments);
}
function _dispatchOffline(prompt) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var reason = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'manual';
  if (opts.offlineFallback) return opts.offlineFallback(prompt);
  var p = (prompt || '').toLowerCase();

  // ── Phân tích văn bản (analyzeWithAI)
  if (p.includes('trả về json') && (p.includes('phân tích văn bản') || p.includes('phân loại văn bản'))) {
    var tm = prompt.match(/"""([\s\S]+?)"""/);
    var fn = prompt.match(/tên tệp gốc:\s*(.+)/i);
    return Promise.resolve(JSON.stringify(OfflineEngine.analyzeDocument(tm ? tm[1] : '', fn ? fn[1].trim() : 'van-ban.txt')));
  }

  // ── Tổng hợp trích yếu
  if (p.includes('tổng hợp trích yếu') || p.includes('tóm tắt chuyên nghiệp')) {
    var dm = prompt.match(/danh sách văn bản.*?:\n([\s\S]+?)$/im);
    var lines = dm ? dm[1].split('\n').filter(function (l) {
      return l.trim();
    }) : [];
    var fakeDocs = lines.map(function (l) {
      return {
        title: l.replace(/^-\s*/, ''),
        type: 'khac',
        summary: '',
        status: 'pending'
      };
    });
    return Promise.resolve(OfflineEngine.summarizeDocs(fakeDocs));
  }

  // ── Điền nội dung mẫu văn bản
  if (p.includes('điền nội dung') && (p.includes('noi_dung_chinh') || p.includes('json'))) {
    var vars = {};
    var um = prompt.match(/tên đơn vị:\s*(.+)/i);
    if (um) vars['{{TEN_DON_VI}}'] = um[1].trim();
    var bm = prompt.match(/bí thư:\s*(.+)/i);
    if (bm) vars['{{BI_THU}}'] = bm[1].trim();
    var mm = prompt.match(/tháng[^\d]*(\d+)/i);
    if (mm) vars['{{THANG}}'] = mm[1];
    var ym = prompt.match(/năm[^\d]*(\d{4})/i);
    if (ym) vars['{{NAM}}'] = ym[1];
    var cm = prompt.match(/số đoàn viên.*?:\s*(\d+)/i);
    if (cm) vars['{{SO_DOAN_VIEN}}'] = cm[1];
    return Promise.resolve(JSON.stringify(OfflineEngine.fillTemplateContent('', vars)));
  }

  // ── Báo cáo thành tích
  if (p.includes('soạn thảo báo cáo thành tích') || p.includes('soạn báo cáo có đủ')) {
    var _prompt$match, _prompt$match2, _prompt$match3, _prompt$match4;
    var _vars = {
      unit: ((_prompt$match = prompt.match(/đơn vị:\s*(.+)/i)) === null || _prompt$match === void 0 ? void 0 : _prompt$match[1]) || 'Đơn vị Đoàn',
      period: ((_prompt$match2 = prompt.match(/giai đoạn:\s*(.+)/i)) === null || _prompt$match2 === void 0 ? void 0 : _prompt$match2[1]) || new Date().getFullYear(),
      leader: ((_prompt$match3 = prompt.match(/bí thư:\s*(.+)/i)) === null || _prompt$match3 === void 0 ? void 0 : _prompt$match3[1]) || 'Bí thư Đoàn',
      memberCount: ((_prompt$match4 = prompt.match(/đoàn viên.*?:\s*(\d+)/i)) === null || _prompt$match4 === void 0 ? void 0 : _prompt$match4[1]) || 0
    };
    return Promise.resolve(OfflineEngine.generateAchievementReport(_vars));
  }

  // ── Gợi ý hoạt động tháng
  if (p.includes('gợi ý hoạt động') || p.includes('hoạt động tháng')) {
    var _mm = prompt.match(/tháng\s*(\d{1,2})/i);
    var _ym = prompt.match(/năm\s*(\d{4})/i);
    var result = OfflineEngine.suggestActivities(_mm ? _mm[1] : new Date().getMonth() + 1, _ym ? _ym[1] : new Date().getFullYear());
    return Promise.resolve("G\u1EE3i \xFD ho\u1EA1t \u0111\u1ED9ng th\xE1ng ".concat(result.month, "/").concat(result.year, ":\n").concat(result.activities.map(function (a, i) {
      return "".concat(i + 1, ". ").concat(a);
    }).join('\n')));
  }

  // ── Phân tích đoàn viên
  if (p.includes('phân tích đoàn viên') || p.includes('thống kê đoàn viên')) {
    var members = [];
    try {
      if (typeof DB !== 'undefined') members = DB.get('membersList') || [];
    } catch (_unused5) {}
    var stats = OfflineEngine.analyzeMembers(members);
    return Promise.resolve(JSON.stringify(stats));
  }

  // ── Hỏi đáp quy định Đoàn
  if (p.includes('quy định') || p.includes('điều lệ') || p.includes('đoàn phí') || p.includes('hỏi')) {
    var ans = OfflineEngine.answerDoanQuestion(prompt);
    return Promise.resolve(ans);
  }

  // ── Tìm kiếm
  if (p.includes('tìm kiếm') || p.includes('văn bản liên quan')) {
    var docs = [];
    try {
      if (typeof DB !== 'undefined') docs = DB.get('docs') || [];
    } catch (_unused6) {}
    var query = prompt.replace(/tìm kiếm|văn bản liên quan|tìm/gi, '').trim();
    var idxs = OfflineEngine.semanticSearch(query, docs);
    return Promise.resolve(idxs.slice(0, 10).join(',') || '');
  }

  // ── Mặc định: luôn dùng OfflineEngine, không yêu cầu API key
  // Thử trích văn bản từ block """ nếu có
  var _defaultTm = prompt.match(/"""([\s\S]+?)"""/);
  var _defaultFn = prompt.match(/tên tệp gốc:\s*(.+)/i);
  if (_defaultTm) {
    return Promise.resolve(JSON.stringify(OfflineEngine.analyzeDocument(_defaultTm[1], _defaultFn ? _defaultFn[1].trim() : 'van-ban.txt')));
  }
  // Thử hỏi đáp quy định Đoàn
  var _generalAns = OfflineEngine.answerDoanQuestion(prompt);
  if (_generalAns && !_generalAns.includes('Câu hỏi này cần tra cứu')) {
    return Promise.resolve(_generalAns);
  }
  // Phân tích prompt dài như văn bản
  if (p.length > 100) {
    return Promise.resolve(JSON.stringify(OfflineEngine.analyzeDocument(prompt, 'noi-dung.txt')));
  }
  return Promise.resolve('[AI Offline] Đang hoạt động ở chế độ nội bộ — không cần internet, không cần API Key.\n\nCó thể hỗ trợ: phân tích & phân loại văn bản, tóm tắt, trích xuất deadline, số ký hiệu, người ký, căn cứ pháp lý, nơi nhận, gợi ý hoạt động Đoàn, hỏi đáp quy định Đoàn.\n\nTùy chọn: thêm API Key Gemini để có kết quả chính xác và chi tiết hơn.');
}

// ─────────────────────────────────────────────────────────────────────
//  9. HELPERS
// ─────────────────────────────────────────────────────────────────────
function _aiGetSettings() {
  try {
    return JSON.parse(localStorage.getItem('doanvan_settings') || '{}');
  } catch (_unused7) {
    return {};
  }
}
function _aiUpdateStatus(_ref0) {
  var source = _ref0.source,
    model = _ref0.model,
    label = _ref0.label,
    ok = _ref0.ok;
  try {
    window.dispatchEvent(new CustomEvent('ai-status-change', {
      detail: {
        source: source,
        model: model,
        label: label,
        ok: ok,
        ts: Date.now()
      }
    }));
  } catch (_unused8) {}
}

// ─────────────────────────────────────────────────────────────────────
//  10. MODAL CẤU HÌNH AI (giữ từ v4.0, cập nhật model options)
// ─────────────────────────────────────────────────────────────────────
function _injectAIConfigModal() {
  if (document.getElementById('aiConfigModal')) return;
  var el = document.createElement('div');
  el.id = 'aiConfigModal';
  el.className = 'modal-overlay';
  el.style.display = 'none';
  el.innerHTML = "\n<div class=\"modal\" style=\"max-width:540px\">\n  <div class=\"modal-header\">\n    <h2 style=\"display:flex;align-items:center;gap:10px\">\n      <span style=\"width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,var(--navy,#1a2340),var(--red,#c0392b));display:flex;align-items:center;justify-content:center;flex-shrink:0\">\n        <i class=\"fas fa-robot\" style=\"color:#fff;font-size:0.85rem\"></i>\n      </span>C\u1EA5u h\xECnh AI Engine</h2>\n    <button class=\"btn btn-ghost\" onclick=\"closeAIConfigModal()\"><i class=\"fas fa-times\"></i></button>\n  </div>\n  <div class=\"modal-body\" style=\"padding:20px\">\n    <div id=\"aiCfgBanner\" style=\"border-radius:10px;padding:12px 16px;margin-bottom:16px;display:flex;align-items:center;gap:12px;font-size:0.82rem;background:rgba(26,35,64,0.05);border:1px solid var(--gray-light,#e5e7eb)\">\n      <div id=\"aiCfgDot\" style=\"width:10px;height:10px;border-radius:50%;background:#9ca3af;flex-shrink:0\"></div>\n      <div id=\"aiCfgMsg\" style=\"flex:1\">\u0110ang ki\u1EC3m tra...</div>\n      <button class=\"btn btn-outline btn-sm\" onclick=\"refreshAICfgStatus()\"><i class=\"fas fa-sync-alt\"></i></button>\n    </div>\n    <div class=\"form-group\" style=\"margin-bottom:14px\">\n      <label class=\"form-label\" style=\"font-weight:700\"><i class=\"fas fa-key\" style=\"color:var(--gold,#d4a017);margin-right:6px\"></i>Gemini API Key <span style=\"color:red\">(tuỳ chọn)</span></label>\n      <div class=\"api-key-input\">\n        <input type=\"password\" class=\"form-control\" id=\"aiCfgKey\" placeholder=\"AIza...\" style=\"font-family:monospace;font-size:16px\">\n        <button class=\"api-key-toggle\" onclick=\"toggleAICfgKey()\"><i class=\"fas fa-eye\" id=\"aiCfgEyeIcon\"></i></button>\n      </div>\n      <div class=\"form-hint\" style=\"margin-top:5px\">L\u1EA5y mi\u1EC5n ph\xED t\u1EA1i <a href=\"https://aistudio.google.com\" target=\"_blank\" style=\"color:var(--red,#c0392b);font-weight:600\">aistudio.google.com</a></div>\n    </div>\n    <div class=\"form-group\" style=\"margin-bottom:14px\">\n      <label class=\"form-label\" style=\"font-weight:700\"><i class=\"fas fa-microchip\" style=\"color:var(--navy,#1a2340);margin-right:6px\"></i>Chi\u1EBFn l\u01B0\u1EE3c Model</label>\n      <select class=\"form-control\" id=\"aiCfgModel\" style=\"font-size:16px\">\n        <option value=\"auto\">\uD83E\uDD16 T\u1EF1 \u0111\u1ED9ng: Flash-Lite \u2192 Flash \u2192 2.0-Flash \u2192 Offline (Khuy\u1EBFn ngh\u1ECB)</option>\n        <option value=\"gemini-2.5-flash-lite\">\u26A1 Flash-Lite \u2014 15 req/ph\xFAt \xB7 1000 req/ng\xE0y (ti\u1EBFt ki\u1EC7m nh\u1EA5t)</option>\n        <option value=\"gemini-2.5-flash\">\uD83D\uDD25 Flash \u2014 10 req/ph\xFAt \xB7 250 req/ng\xE0y (ch\u1EA5t l\u01B0\u1EE3ng cao h\u01A1n)</option>\n        <option value=\"gemini-2.0-flash\">\uD83D\uDEE1\uFE0F 2.0 Flash \u2014 15 req/ph\xFAt \xB7 1500 req/ng\xE0y (\u1ED5n \u0111\u1ECBnh nh\u1EA5t)</option>\n      </select>\n      <div class=\"form-hint\" style=\"margin-top:4px\">AI Engine t\u1EF1 \u0111\u1ED9ng fallback khi model ch\xEDnh h\u1EBFt quota</div>\n    </div>\n    <!-- 3-t\u1EA7ng info -->\n    <div style=\"border-radius:10px;border:1px solid var(--gray-light,#e5e7eb);overflow:hidden;margin-bottom:14px\">\n      <div style=\"background:rgba(22,163,74,0.06);padding:10px 14px;display:flex;align-items:center;gap:10px;border-bottom:1px solid var(--gray-light,#e5e7eb)\">\n        <span style=\"width:22px;height:22px;border-radius:50%;background:#16a34a;color:#fff;display:flex;align-items:center;justify-content:center;font-size:0.7rem;font-weight:900;flex-shrink:0\">1</span>\n        <div><div style=\"font-weight:700;font-size:0.8rem;color:#15803d\">Gemini 2.5 Flash-Lite <span style=\"font-weight:400;color:#6b7280\">(primary)</span></div><div style=\"font-size:0.72rem;color:#6b7280\">15 req/ph\xFAt \xB7 1000 req/ng\xE0y \xB7 \u01AFu ti\xEAn d\xF9ng \u0111\u1EC3 ti\u1EBFt ki\u1EC7m quota</div></div>\n      </div>\n      <div style=\"background:rgba(212,160,23,0.05);padding:10px 14px;display:flex;align-items:center;gap:10px;border-bottom:1px solid var(--gray-light,#e5e7eb)\">\n        <span style=\"width:22px;height:22px;border-radius:50%;background:#d4a017;color:#fff;display:flex;align-items:center;justify-content:center;font-size:0.7rem;font-weight:900;flex-shrink:0\">2</span>\n        <div><div style=\"font-weight:700;font-size:0.8rem;color:#92400e\">Gemini 2.5 Flash <span style=\"font-weight:400;color:#6b7280\">(fallback khi Lite h\u1EBFt quota)</span></div><div style=\"font-size:0.72rem;color:#6b7280\">10 req/ph\xFAt \xB7 250 req/ng\xE0y \xB7 Ch\u1EA5t l\u01B0\u1EE3ng t\u1ED1t h\u01A1n cho t\xE1c v\u1EE5 ph\u1EE9c t\u1EA1p</div></div>\n      </div>\n      <div style=\"background:rgba(37,99,235,0.04);padding:10px 14px;display:flex;align-items:center;gap:10px;border-bottom:1px solid var(--gray-light,#e5e7eb)\">\n        <span style=\"width:22px;height:22px;border-radius:50%;background:#2563eb;color:#fff;display:flex;align-items:center;justify-content:center;font-size:0.7rem;font-weight:900;flex-shrink:0\">3</span>\n        <div><div style=\"font-weight:700;font-size:0.8rem;color:#1d4ed8\">Gemini 2.0 Flash <span style=\"font-weight:400;color:#6b7280\">(fallback \u1ED5n \u0111\u1ECBnh)</span></div><div style=\"font-size:0.72rem;color:#6b7280\">15 req/ph\xFAt \xB7 1500 req/ng\xE0y \xB7 C\u1EF1c k\u1EF3 \u1ED5n \u0111\u1ECBnh</div></div>\n      </div>\n      <div style=\"background:rgba(107,114,128,0.05);padding:10px 14px;display:flex;align-items:center;gap:10px\">\n        <span style=\"width:22px;height:22px;border-radius:50%;background:#6b7280;color:#fff;display:flex;align-items:center;justify-content:center;font-size:0.7rem;font-weight:900;flex-shrink:0\">4</span>\n        <div><div style=\"font-weight:700;font-size:0.8rem;color:#374151\">Offline NLP Engine <span style=\"font-weight:400;color:#6b7280\">(fallback cu\u1ED1i)</span></div><div style=\"font-size:0.72rem;color:#6b7280\">Kh\xF4ng c\u1EA7n internet \xB7 Kh\xF4ng quota \xB7 23 c\xF4ng c\u1EE5 ph\xE2n t\xEDch n\u1ED9i b\u1ED9</div></div>\n      </div>\n    </div>\n    <!-- Quota -->\n    <div style=\"background:rgba(26,35,64,0.04);border-radius:10px;padding:12px 14px;margin-bottom:14px;border:1px solid var(--gray-light,#e5e7eb)\">\n      <div style=\"font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#6b7280;margin-bottom:10px\"><i class=\"fas fa-tachometer-alt\"></i> Quota H\xF4m Nay</div>\n      <div id=\"aiCfgQuota\"><div style=\"font-size:0.78rem;color:#6b7280\">Nh\u1EADp API key \u0111\u1EC3 xem quota...</div></div>\n    </div>\n    <div style=\"display:flex;gap:8px;margin-bottom:10px\">\n      <button class=\"btn btn-gold\" onclick=\"testAICfgKey()\" style=\"flex:1\"><i class=\"fas fa-vial\"></i> Ki\u1EC3m tra k\u1EBFt n\u1ED1i</button>\n      <button class=\"btn btn-outline\" onclick=\"testAICfgOffline()\"><i class=\"fas fa-plug\"></i> Test offline</button>\n    </div>\n    <div id=\"aiCfgTestResult\" style=\"font-size:0.8rem;min-height:20px\"></div>\n  </div>\n  <div class=\"modal-footer\">\n    <button class=\"btn btn-outline\" onclick=\"closeAIConfigModal()\">H\u1EE7y</button>\n    <button class=\"btn btn-primary\" onclick=\"saveAIConfig()\"><i class=\"fas fa-save\"></i> L\u01B0u c\u1EA5u h\xECnh</button>\n  </div>\n</div>";
  document.body.appendChild(el);
  el.addEventListener('click', function (e) {
    if (e.target === el) closeAIConfigModal();
  });
}
function openAIConfigModal() {
  _injectAIConfigModal();
  var modal = document.getElementById('aiConfigModal');
  modal.style.display = 'flex';
  var s = _aiGetSettings();
  var ke = document.getElementById('aiCfgKey');
  var me = document.getElementById('aiCfgModel');
  if (ke && s.apiKey) ke.value = s.apiKey;
  if (me) {
    var resolved = QuotaGuard.resolveId(s.aiModel || 'auto');
    me.value = ['gemini-2.5-flash-lite', 'gemini-2.5-flash', 'gemini-2.0-flash', 'auto'].includes(resolved) ? resolved : 'auto';
  }
  refreshAICfgStatus();
  _updateAICfgQuota();
}
function closeAIConfigModal() {
  var m = document.getElementById('aiConfigModal');
  if (m) m.style.display = 'none';
}
function toggleAICfgKey() {
  var i = document.getElementById('aiCfgKey');
  var ic = document.getElementById('aiCfgEyeIcon');
  if (!i) return;
  i.type = i.type === 'password' ? 'text' : 'password';
  ic.className = i.type === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
}
function refreshAICfgStatus() {
  var dot = document.getElementById('aiCfgDot');
  var msg = document.getElementById('aiCfgMsg');
  if (!dot || !msg) return;
  var s = _aiGetSettings();
  if (!s.apiKey) {
    dot.style.background = '#16a34a';
    msg.innerHTML = '<span style="color:#166534"><i class="fas fa-check-circle"></i> AI Offline đang hoạt động — 23 công cụ NLP nội bộ sẵn sàng (không cần API Key).</span>';
    _updateAICfgQuotaOffline();
    return;
  }
  if (!navigator.onLine) {
    dot.style.background = '#f59e0b';
    msg.innerHTML = '<span style="color:#b45309">Không có kết nối mạng — AI offline đang hoạt động.</span>';
    return;
  }
  var avail = AI_CONFIG.MODELS.filter(function (m) {
    return QuotaGuard.canUse(m.id);
  });
  if (avail.length) {
    dot.style.background = '#16a34a';
    msg.innerHTML = "<span style=\"color:#166534\"><i class=\"fas fa-check-circle\"></i> AI Online s\u1EB5n s\xE0ng \u2014 ".concat(avail.map(function (m) {
      return m.label;
    }).join(' → '), "</span>");
  } else {
    dot.style.background = '#f59e0b';
    msg.innerHTML = '<span style="color:#b45309"><i class="fas fa-exclamation-circle"></i> Tất cả quota đã hết — đang dùng Offline Engine</span>';
  }
  _updateAICfgQuota();
}
function _updateAICfgQuota() {
  var el = document.getElementById('aiCfgQuota');
  if (!el) return;
  el.innerHTML = QuotaGuard.getStatus().map(function (m) {
    var pct = Math.min(m.pct, 100);
    var col = pct >= 90 ? '#dc2626' : pct >= 70 ? '#f59e0b' : '#16a34a';
    var tierBadge = {
      primary: '🟢',
      secondary: '🟡',
      tertiary: '🔵'
    }[m.tier] || '⚪';
    return "<div style=\"margin-bottom:8px\">\n      <div style=\"display:flex;justify-content:space-between;font-size:0.75rem;margin-bottom:3px\">\n        <span style=\"font-weight:600\">".concat(tierBadge, " ").concat(m.label, "</span>\n        <span style=\"color:").concat(col, "\">").concat(m.todayUsed, "/").concat(m.todayLimit, " h\xF4m nay \xB7 ").concat(m.minuteUsed, "/").concat(m.minuteLimit, " req/ph\xFAt</span>\n      </div>\n      <div style=\"background:#e5e7eb;border-radius:4px;height:5px\">\n        <div style=\"width:").concat(pct, "%;height:100%;background:").concat(col, ";border-radius:4px;transition:0.3s\"></div>\n      </div>\n    </div>");
  }).join('') + "<button onclick=\"QuotaGuard.reset();_updateAICfgQuota();if(typeof updateQuotaDisplay==='function')updateQuotaDisplay()\"\n    style=\"font-size:0.72rem;background:none;border:none;cursor:pointer;color:#6b7280;padding:0;margin-top:4px\">\n    <i class=\"fas fa-redo\" style=\"margin-right:4px\"></i>Reset b\u1ED9 \u0111\u1EBFm quota t\u1EA5t c\u1EA3 models</button>";
}
function _updateAICfgQuotaOffline() {
  var el = document.getElementById('aiCfgQuota');
  if (!el) return;
  el.innerHTML = '<div style="padding:10px 0;font-size:0.78rem;color:#166534;display:flex;align-items:center;gap:8px">'
    + '<i class="fas fa-check-circle" style="color:#16a34a;font-size:1rem"></i>'
    + '<div>'
    + '<div style="font-weight:700;margin-bottom:3px">AI Offline — Không cần API Key, không cần internet</div>'
    + '<div style="color:#4b5563;line-height:1.6">'
    + '✔ Phân tích văn bản đầy đủ (tiêu đề, loại, tóm tắt, deadline)<br>'
    + '✔ Trích xuất: số ký hiệu, người ký, địa danh, nơi nhận, căn cứ pháp lý<br>'
    + '✔ Gợi ý hoạt động Đoàn · Hỏi đáp quy định · Thống kê đoàn viên<br>'
    + '<span style="color:#6b7280;font-size:0.7rem">Tùy chọn: thêm API Key Gemini để kết quả chi tiết hơn</span>'
    + '</div></div></div>';
}
function testAICfgKey() {
  return _testAICfgKey.apply(this, arguments);
}
function _testAICfgKey() {
  _testAICfgKey = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
    var ke, re, key, results, _iterator4, _step4, mo, r, msg, _t9, _t0;
    return _regenerator().w(function (_context1) {
      while (1) switch (_context1.p = _context1.n) {
        case 0:
          ke = document.getElementById('aiCfgKey');
          re = document.getElementById('aiCfgTestResult');
          key = ke === null || ke === void 0 ? void 0 : ke.value.trim();
          if (re) {
            _context1.n = 1;
            break;
          }
          return _context1.a(2);
        case 1:
          if (key) {
            _context1.n = 2;
            break;
          }
          re.innerHTML = '<span style="color:red">⚠️ Vui lòng nhập API Key.</span>';
          return _context1.a(2);
        case 2:
          re.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang kiểm tra 3 models...';
          results = [];
          _iterator4 = _createForOfIteratorHelper(AI_CONFIG.MODELS);
          _context1.p = 3;
          _iterator4.s();
        case 4:
          if ((_step4 = _iterator4.n()).done) {
            _context1.n = 9;
            break;
          }
          mo = _step4.value;
          _context1.p = 5;
          _context1.n = 6;
          return GeminiEngine.call('Trả lời: OK', {
            apiKey: key,
            forceModel: mo.id,
            maxTokens: 10
          });
        case 6:
          r = _context1.v;
          results.push("<span style=\"color:#16a34a\">\u2713 ".concat(mo.label, "</span>"));
          _context1.n = 8;
          break;
        case 7:
          _context1.p = 7;
          _t9 = _context1.v;
          msg = _t9.status === 429 ? 'quota hết' : _t9.status === 400 || _t9.status === 401 ? 'key sai' : "HTTP ".concat(_t9.status || 'err');
          results.push("<span style=\"color:#f59e0b\">\u26A0 ".concat(mo.label, ": ").concat(msg, "</span>"));
        case 8:
          _context1.n = 4;
          break;
        case 9:
          _context1.n = 11;
          break;
        case 10:
          _context1.p = 10;
          _t0 = _context1.v;
          _iterator4.e(_t0);
        case 11:
          _context1.p = 11;
          _iterator4.f();
          return _context1.f(11);
        case 12:
          re.innerHTML = results.join(' &nbsp;|&nbsp; ');
          refreshAICfgStatus();
          _updateAICfgQuota();
        case 13:
          return _context1.a(2);
      }
    }, _callee9, null, [[5, 7], [3, 10, 11, 12]]);
  }));
  return _testAICfgKey.apply(this, arguments);
}
function testAICfgOffline() {
  var re = document.getElementById('aiCfgTestResult');
  if (!re) return;
  var testText = 'KẾ HOẠCH TỔ CHỨC HOẠT ĐỘNG TÌNH NGUYỆN MÙA HÈ XANH NĂM 2025\nSố: 12/KH-ĐTN\nCăn cứ Nghị quyết số 03/NQ-ĐTN về công tác thanh niên năm 2025.\nKính gửi: Ban Thường vụ Đoàn cấp trên; Các chi đoàn trực thuộc.\nHạn chót: ngày 15 tháng 06 năm 2025. Đây là văn bản khẩn.\nHoàn thành trước ngày 20/06/2025 và báo cáo kết quả trước 25/06/2025.\n\nĐồng Tháp, ngày 01 tháng 05 năm 2025\nBÍ THƯ\n\nNguyễn Văn An\nNơi nhận: - Đoàn cấp trên; - Lưu VT.';
  var result = OfflineEngine.analyzeDocument(testText, 'ke-hoach-test.txt');
  var deadlines = OfflineEngine.detectDeadlines(testText);
  var suggest = OfflineEngine.suggestActivities(6, 2025);
  var signer = result.signer || OfflineEngine.extractSigner(testText);
  var signLoc = result.signLocation || OfflineEngine.extractSignLocation(testText);
  var recipients = result.recipients || OfflineEngine.extractRecipients(testText);
  var legalBasis = result.legalBasis || OfflineEngine.extractLegalBasis(testText);
  var reportDate = result.reportDate || OfflineEngine.extractReportDate(testText);
  re.innerHTML = '<span style="color:#16a34a"><i class="fas fa-check-circle"></i> Offline Engine OK — 23 công cụ NLP sẵn sàng</span>'
    + '<div style="margin-top:6px;padding:8px;background:var(--cream,#fdf8f0);border-radius:6px;font-size:0.73rem;color:var(--text-soft,#4b5563);line-height:1.9">'
    + '📋 Loại: <strong>' + result.type + '</strong> | Mã: <strong>' + (result.code||'—') + '</strong> | Ưu tiên: <strong>' + result.priority + '</strong>'
    + '<br>📅 Deadline: <strong>' + (deadlines.map(function(d){return d.date;}).join(', ')||'—') + '</strong>'
    + ' | Ngày BC: <strong>' + (reportDate||'—') + '</strong>'
    + '<br>👤 Người ký: <em>' + (signer||'—') + '</em> | 📍 Địa danh: <em>' + (signLoc||'—') + '</em>'
    + '<br>📬 Nơi nhận: <em>' + (recipients.length ? recipients.slice(0,2).join(', ') : '—') + '</em>'
    + '<br>⚖️ Căn cứ: <em>' + (legalBasis||'—').substring(0,60) + (legalBasis&&legalBasis.length>60?'...':'') + '</em>'
    + '<br>🎯 Gợi ý tháng 6: <em>' + suggest.activities[0] + '</em>'
    + '<br>❓ Hỏi đáp: ' + OfflineEngine.answerDoanQuestion('tuổi kết nạp đoàn viên').substring(0, 80) + '...'
    + '</div>';
}
function saveAIConfig() {
  var _document$getElementB, _document$getElementB2;
  var key = ((_document$getElementB = document.getElementById('aiCfgKey')) === null || _document$getElementB === void 0 ? void 0 : _document$getElementB.value.trim()) || '';
  var model = ((_document$getElementB2 = document.getElementById('aiCfgModel')) === null || _document$getElementB2 === void 0 ? void 0 : _document$getElementB2.value) || 'auto';
  var cur = _aiGetSettings();
  try {
    localStorage.setItem('doanvan_settings', JSON.stringify(_objectSpread(_objectSpread({}, cur), {}, {
      apiKey: key,
      aiModel: model,
      aiStrategy: model
    })));
  } catch (_unused9) {}
  // Sync với trang Settings
  var mk = document.getElementById('geminiApiKey');
  var mm = document.getElementById('aiModel');
  if (mk) mk.value = key;
  if (mm) mm.value = model;
  closeAIConfigModal();
  AICache.clear();
  if (typeof toast === 'function') toast('<i class="fas fa-check-circle" style="color:#16a34a"></i> Đã lưu cấu hình AI!', 'success');
  if (typeof refreshAiStatus === 'function') setTimeout(refreshAiStatus, 300);
  if (typeof updateQuotaDisplay === 'function') setTimeout(updateQuotaDisplay, 400);
  _aiUpdateStatus({
    source: 'config_saved',
    ok: true
  });
}

// ─────────────────────────────────────────────────────────────────────
//  11. MODAL PHÁT HIỆN THỜI HẠN (giữ nguyên từ v4.0)
// ─────────────────────────────────────────────────────────────────────
function _injectDeadlineModal() {
  if (document.getElementById('deadlineDetectModal')) return;
  var el = document.createElement('div');
  el.id = 'deadlineDetectModal';
  el.className = 'modal-overlay';
  el.style.display = 'none';
  el.innerHTML = "<div class=\"modal\" style=\"max-width:740px\"><div class=\"modal-header\"><h2 style=\"display:flex;align-items:center;gap:10px\"><span style=\"width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#dc2626,#f59e0b);display:flex;align-items:center;justify-content:center;flex-shrink:0\"><i class=\"fas fa-clock\" style=\"color:#fff;font-size:0.85rem\"></i></span>Ph\xE1t hi\u1EC7n th\u1EDDi h\u1EA1n</h2><button class=\"btn btn-ghost\" onclick=\"closeDeadlineModal()\"><i class=\"fas fa-times\"></i></button></div><div class=\"modal-body\" style=\"padding:20px\"><div style=\"display:flex;gap:4px;background:rgba(26,35,64,0.05);border-radius:10px;padding:4px;margin-bottom:14px;font-size:0.78rem\"><button id=\"dlTabAll\" onclick=\"filterDeadlines('all')\" class=\"btn btn-primary btn-sm\" style=\"flex:1;border-radius:7px\">\uD83D\uDCCB T\u1EA5t c\u1EA3</button><button id=\"dlTabOverdue\" onclick=\"filterDeadlines('overdue')\" class=\"btn btn-outline btn-sm\" style=\"flex:1;border-radius:7px;color:#dc2626\">\uD83D\uDD34 Qu\xE1 h\u1EA1n</button><button id=\"dlTabWeek\" onclick=\"filterDeadlines('week')\" class=\"btn btn-outline btn-sm\" style=\"flex:1;border-radius:7px;color:#f59e0b\">\uD83D\uDFE1 \u22647 ng\xE0y</button><button id=\"dlTabMonth\" onclick=\"filterDeadlines('month')\" class=\"btn btn-outline btn-sm\" style=\"flex:1;border-radius:7px;color:#2563eb\">\uD83D\uDD35 Trong th\xE1ng</button><button id=\"dlTabNone\" onclick=\"filterDeadlines('none')\" class=\"btn btn-outline btn-sm\" style=\"flex:1;border-radius:7px;color:#6b7280\">\u26AA Ch\u01B0a c\xF3 h\u1EA1n</button></div><div id=\"dlSummary\" style=\"display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px;font-size:0.78rem\"></div><div style=\"display:flex;gap:8px;margin-bottom:14px;align-items:center\"><button class=\"btn btn-gold\" onclick=\"scanDeadlines()\" id=\"dlScanBtn\" style=\"flex:1\"><i class=\"fas fa-search\"></i> Qu\xE9t to\xE0n b\u1ED9 v\u0103n b\u1EA3n</button><label style=\"display:flex;align-items:center;gap:6px;font-size:0.78rem;cursor:pointer;white-space:nowrap\"><input type=\"checkbox\" id=\"dlScanContent\" checked> Qu\xE9t n\u1ED9i dung</label></div><div id=\"dlResultArea\" style=\"display:none\"><div style=\"overflow-x:auto;max-height:380px;border:1px solid #e5e7eb;border-radius:10px\"><table class=\"doc-table\" style=\"font-size:0.78rem\"><thead><tr><th style=\"min-width:200px\">V\u0103n b\u1EA3n</th><th>Lo\u1EA1i</th><th>Ng\xE0y h\u1EA1n</th><th>C\xF2n l\u1EA1i</th><th>Tr\u1EA1ng th\xE1i</th><th>Thao t\xE1c</th></tr></thead><tbody id=\"dlResultBody\"></tbody></table></div><div id=\"dlResultEmpty\" style=\"display:none;text-align:center;padding:30px;color:#6b7280\"><i class=\"fas fa-calendar-check\" style=\"font-size:2rem;margin-bottom:8px;display:block;color:#16a34a\"></i><div style=\"font-weight:600\">Kh\xF4ng c\xF3 v\u0103n b\u1EA3n n\xE0o trong b\u1ED9 l\u1ECDc n\xE0y</div></div></div><div id=\"dlPlaceholder\" style=\"text-align:center;padding:32px;color:#6b7280\"><i class=\"fas fa-search\" style=\"font-size:2.5rem;margin-bottom:12px;display:block;opacity:0.25\"></i><div style=\"font-weight:600;margin-bottom:6px\">Nh\u1EA5n \"Qu\xE9t to\xE0n b\u1ED9 v\u0103n b\u1EA3n\" \u0111\u1EC3 b\u1EAFt \u0111\u1EA7u</div><div style=\"font-size:0.75rem\">AI ph\xE2n t\xEDch n\u1ED9i dung, t\xECm c\xE1c ng\xE0y h\u1EA1n ch\xF3t v\xE0 th\u1EDDi h\u1EA1n n\u1ED9p b\xE1o c\xE1o (10+ pattern ti\u1EBFng Vi\u1EC7t)</div></div></div><div class=\"modal-footer\"><div id=\"dlFooterNote\" style=\"font-size:0.73rem;color:#6b7280;flex:1\"></div><button class=\"btn btn-outline\" onclick=\"closeDeadlineModal()\">\u0110\xF3ng</button><button class=\"btn btn-primary\" id=\"dlSetRemindBtn\" style=\"display:none\" onclick=\"setDeadlineReminders()\"><i class=\"fas fa-bell\"></i> \u0110\u1EB7t nh\u1EAFc nh\u1EDF</button></div></div>";
  document.body.appendChild(el);
  el.addEventListener('click', function (e) {
    if (e.target === el) closeDeadlineModal();
  });
}
var _dlResults = [],
  _dlFilter = 'all';
function openDeadlineModal() {
  _injectDeadlineModal();
  document.getElementById('deadlineDetectModal').style.display = 'flex';
  _dlResults = [];
  _dlFilter = 'all';
  _renderDeadlineResults();
}
function closeDeadlineModal() {
  var m = document.getElementById('deadlineDetectModal');
  if (m) m.style.display = 'none';
}
function scanDeadlines() {
  return _scanDeadlines.apply(this, arguments);
}
function _scanDeadlines() {
  _scanDeadlines = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0() {
    var _document$getElementB3;
    var btn, scanC, docs, today, _iterator5, _step5, doc, dl, from, dls, dates, daysLeft, ne, sc;
    return _regenerator().w(function (_context10) {
      while (1) switch (_context10.n) {
        case 0:
          btn = document.getElementById('dlScanBtn'), scanC = (_document$getElementB3 = document.getElementById('dlScanContent')) === null || _document$getElementB3 === void 0 ? void 0 : _document$getElementB3.checked;
          if (btn) {
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang quét...';
          }
          docs = [];
          try {
            if (typeof DB !== 'undefined' && DB.get) docs = DB.get('docs') || [];
          } catch (_unused12) {}
          today = new Date();
          today.setHours(0, 0, 0, 0);
          _dlResults = [];
          _iterator5 = _createForOfIteratorHelper(docs);
          try {
            for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
              doc = _step5.value;
              dl = doc.deadline || '', from = 'stored';
              if (!dl && scanC && doc.rawText) {
                dls = OfflineEngine.detectDeadlines(doc.rawText);
                if (dls.length) {
                  dl = dls[0].date;
                  from = 'scanned';
                } else {
                  dates = OfflineEngine.extractDates(doc.rawText);
                  dl = OfflineEngine.detectDeadlineDate(dates, doc.rawText);
                  if (dl) from = 'scanned';
                }
                if (dl && typeof DB !== 'undefined' && DB.update) try {
                  DB.update('docs', doc.id, {
                    deadline: dl
                  });
                } catch (_unused13) {}
              }
              daysLeft = dl ? Math.ceil((new Date(dl) - today) / 86400000) : null;
              _dlResults.push(_objectSpread(_objectSpread({}, doc), {}, {
                deadline: dl,
                daysLeft: daysLeft,
                detectedFrom: from
              }));
            }
          } catch (err) {
            _iterator5.e(err);
          } finally {
            _iterator5.f();
          }
          if (btn) {
            btn.disabled = false;
            btn.innerHTML = '<i class="fas fa-search"></i> Quét toàn bộ văn bản';
          }
          _renderDeadlineResults();
          ne = document.getElementById('dlFooterNote');
          if (ne) {
            sc = _dlResults.filter(function (r) {
              return r.detectedFrom === 'scanned';
            }).length;
            ne.textContent = "\u0110\xE3 qu\xE9t ".concat(docs.length, " v\u0103n b\u1EA3n").concat(sc ? " \xB7 Ph\xE1t hi\u1EC7n m\u1EDBi ".concat(sc, " deadline t\u1EEB n\u1ED9i dung") : '', "  (Offline Engine \u2014 10+ pattern)");
          }
        case 1:
          return _context10.a(2);
      }
    }, _callee0);
  }));
  return _scanDeadlines.apply(this, arguments);
}
function filterDeadlines(tab) {
  _dlFilter = tab;
  ['all', 'overdue', 'week', 'month', 'none'].forEach(function (t) {
    var el = document.getElementById("dlTab".concat(t.charAt(0).toUpperCase() + t.slice(1)));
    if (el) {
      el.className = t === tab ? 'btn btn-primary btn-sm' : 'btn btn-outline btn-sm';
      el.style.flex = '1';
      el.style.borderRadius = '7px';
    }
  });
  _renderDeadlineResults();
}
function _getFiltered() {
  return _dlResults.filter(function (r) {
    if (_dlFilter === 'all') return r.deadline;
    if (_dlFilter === 'overdue') return r.deadline && r.daysLeft < 0 && r.status !== 'done';
    if (_dlFilter === 'week') return r.deadline && r.daysLeft >= 0 && r.daysLeft <= 7;
    if (_dlFilter === 'month') return r.deadline && r.daysLeft >= 0 && r.daysLeft <= 30;
    if (_dlFilter === 'none') return !r.deadline;
    return true;
  });
}
function _renderDeadlineResults() {
  var body = document.getElementById('dlResultBody'),
    area = document.getElementById('dlResultArea');
  var ph = document.getElementById('dlPlaceholder'),
    em = document.getElementById('dlResultEmpty');
  var sum = document.getElementById('dlSummary'),
    srb = document.getElementById('dlSetRemindBtn');
  if (!body) return;
  var filtered = _getFiltered(),
    all = _dlResults;
  if (sum && all.length) {
    var ov = all.filter(function (r) {
        return r.deadline && r.daysLeft < 0 && r.status !== 'done';
      }).length,
      wk = all.filter(function (r) {
        return r.deadline && r.daysLeft >= 0 && r.daysLeft <= 7;
      }).length,
      mo = all.filter(function (r) {
        return r.deadline && r.daysLeft >= 0 && r.daysLeft <= 30;
      }).length,
      nd = all.filter(function (r) {
        return !r.deadline;
      }).length;
    sum.innerHTML = [ov ? "<span style=\"background:rgba(220,38,38,0.1);color:#dc2626;padding:3px 10px;border-radius:8px;font-weight:700\">\uD83D\uDD34 ".concat(ov, " qu\xE1 h\u1EA1n</span>") : '', wk ? "<span style=\"background:rgba(245,158,11,0.1);color:#b45309;padding:3px 10px;border-radius:8px;font-weight:700\">\uD83D\uDFE1 ".concat(wk, " trong 7 ng\xE0y</span>") : '', mo ? "<span style=\"background:rgba(37,99,235,0.1);color:#1d4ed8;padding:3px 10px;border-radius:8px;font-weight:700\">\uD83D\uDD35 ".concat(mo, " trong th\xE1ng</span>") : '', nd ? "<span style=\"background:rgba(107,114,128,0.1);color:#6b7280;padding:3px 10px;border-radius:8px\">\u26AA ".concat(nd, " ch\u01B0a c\xF3 h\u1EA1n</span>") : ''].filter(Boolean).join('');
  }
  if (!all.length) {
    if (ph) ph.style.display = 'block';
    if (area) area.style.display = 'none';
    return;
  }
  if (ph) ph.style.display = 'none';
  if (area) area.style.display = 'block';
  if (!filtered.length) {
    body.innerHTML = '';
    if (em) em.style.display = 'block';
    return;
  }
  if (em) em.style.display = 'none';
  var tl = {
    'chi-thi': 'CT',
    'nghi-quyet': 'NQ',
    'ke-hoach': 'KH',
    'bao-cao': 'BC',
    'cong-van': 'CV',
    'thong-bao': 'TB',
    'to-trinh': 'TT',
    'bien-ban': 'BB',
    'quyet-dinh': 'QĐ',
    'khac': 'VB'
  };
  var sorted = _toConsumableArray(filtered).sort(function (a, b) {
    var _a$daysLeft, _b$daysLeft;
    if (!a.deadline && !b.deadline) return 0;
    if (!a.deadline) return 1;
    if (!b.deadline) return -1;
    return ((_a$daysLeft = a.daysLeft) !== null && _a$daysLeft !== void 0 ? _a$daysLeft : 999) - ((_b$daysLeft = b.daysLeft) !== null && _b$daysLeft !== void 0 ? _b$daysLeft : 999);
  });
  body.innerHTML = sorted.map(function (doc) {
    var dl = doc.deadline,
      days = doc.daysLeft,
      done = doc.status === 'done';
    var dh = '—',
      rs = '';
    if (dl) {
      if (done) {
        dh = '<span style="color:#16a34a;font-weight:600"><i class="fas fa-check"></i> Xong</span>';
      } else if (days < 0) {
        dh = "<span style=\"color:#dc2626;font-weight:700\">\uD83D\uDD34 Qu\xE1 ".concat(Math.abs(days), "n</span>");
        rs = 'background:rgba(220,38,38,0.04)';
      } else if (days === 0) {
        dh = '<span style="color:#dc2626;font-weight:800">⏰ HÔM NAY</span>';
        rs = 'background:rgba(220,38,38,0.07)';
      } else if (days <= 3) {
        dh = "<span style=\"color:#dc2626;font-weight:700\">\uD83D\uDD34 ".concat(days, "n</span>");
        rs = 'background:rgba(220,38,38,0.03)';
      } else if (days <= 7) {
        dh = "<span style=\"color:#f59e0b;font-weight:700\">\uD83D\uDFE1 ".concat(days, "n</span>");
        rs = 'background:rgba(245,158,11,0.03)';
      } else {
        dh = "<span style=\"color:#2563eb\">\uD83D\uDD35 ".concat(days, "n</span>");
      }
    }
    var dld = dl ? dl.split('-').reverse().join('/') : '—';
    var title = (doc.title || 'Không tên').substring(0, 50) + ((doc.title || '').length > 50 ? '...' : '');
    return "<tr style=\"".concat(rs, "\"><td><div style=\"font-weight:600;font-size:0.8rem\">").concat(title, "</div>").concat(doc.detectedFrom === 'scanned' ? '<span style="font-size:0.67rem;background:rgba(22,163,74,0.1);color:#166534;padding:1px 5px;border-radius:4px">✨ AI phát hiện</span>' : '', "</td><td><span style=\"font-size:0.72rem;background:rgba(26,35,64,0.08);padding:2px 6px;border-radius:4px\">").concat(tl[doc.type] || 'VB', "</span></td><td style=\"white-space:nowrap;font-family:monospace;font-size:0.8rem\">").concat(dld, "</td><td>").concat(dh, "</td><td><select style=\"font-size:0.72rem;border:1px solid #e5e7eb;border-radius:5px;padding:2px 4px\" onchange=\"updateDocStatusFromDL(this,'").concat(doc.id, "')\"><option value=\"pending\" ").concat(doc.status === 'pending' ? 'selected' : '', ">Ch\u1EDD x\u1EED l\xFD</option><option value=\"processing\" ").concat(doc.status === 'processing' ? 'selected' : '', ">\u0110ang x\u1EED l\xFD</option><option value=\"done\" ").concat(doc.status === 'done' ? 'selected' : '', ">Ho\xE0n th\xE0nh</option><option value=\"overdue\" ").concat(doc.status === 'overdue' ? 'selected' : '', ">Qu\xE1 h\u1EA1n</option></select></td><td style=\"white-space:nowrap\">").concat(dl ? "<button onclick=\"setDeadlineForDoc('".concat(doc.id, "','").concat(dl, "')\" class=\"btn btn-outline btn-sm\" style=\"padding:3px 7px;font-size:0.7rem\" title=\"Nh\u1EAFc nh\u1EDF\"><i class=\"fas fa-bell\"></i></button>") : "<button onclick=\"promptDeadlineForDoc('".concat(doc.id, "')\" class=\"btn btn-outline btn-sm\" style=\"padding:3px 7px;font-size:0.7rem;color:#6b7280\"><i class=\"fas fa-plus\"></i></button>"), "<button onclick=\"viewDocFromDL('").concat(doc.id, "')\" class=\"btn btn-outline btn-sm\" style=\"padding:3px 7px;font-size:0.7rem;margin-left:3px\"><i class=\"fas fa-eye\"></i></button></td></tr>");
  }).join('');
  var urgent = sorted.filter(function (r) {
    return r.daysLeft !== null && r.daysLeft >= 0 && r.daysLeft <= 7 && r.status !== 'done';
  }).length;
  if (srb) srb.style.display = urgent > 0 ? '' : 'none';
}
function updateDocStatusFromDL(sel, id) {
  try {
    if (typeof DB !== 'undefined' && DB.update) DB.update('docs', id, {
      status: sel.value
    });
  } catch (_unused0) {}
  var r = _dlResults.find(function (d) {
    return String(d.id) === String(id);
  });
  if (r) r.status = sel.value;
  _renderDeadlineResults();
  if (typeof renderDocsTable === 'function') try {
    renderDocsTable();
  } catch (_unused1) {}
}
function setDeadlineForDoc(id, dl) {
  var doc = _dlResults.find(function (d) {
    return String(d.id) === String(id);
  });
  if (doc && typeof DB !== 'undefined' && DB.push) try {
    DB.push('reminders', {
      id: Date.now(),
      docId: id,
      docTitle: doc.title,
      deadline: dl,
      note: "Nh\u1EAFc h\u1EA1n: ".concat(dl),
      createdAt: new Date().toISOString()
    });
  } catch (_unused10) {}
  if (typeof toast === 'function') toast("<i class=\"fas fa-bell\" style=\"color:var(--gold,#d4a017)\"></i> \u0110\xE3 \u0111\u1EB7t nh\u1EAFc nh\u1EDF: ".concat(dl), 'success');
}
function promptDeadlineForDoc(id) {
  var dl = prompt('Nhập ngày hạn chót (DD/MM/YYYY):');
  if (!dl) return;
  var p = dl.split('/');
  if (p.length !== 3) {
    alert('Định dạng không hợp lệ');
    return;
  }
  var iso = "".concat(p[2], "-").concat(p[1].padStart(2, '0'), "-").concat(p[0].padStart(2, '0'));
  try {
    if (typeof DB !== 'undefined' && DB.update) DB.update('docs', id, {
      deadline: iso
    });
  } catch (_unused11) {}
  var r = _dlResults.find(function (d) {
    return String(d.id) === String(id);
  });
  if (r) {
    r.deadline = iso;
    var t = new Date();
    t.setHours(0, 0, 0, 0);
    r.daysLeft = Math.ceil((new Date(iso) - t) / 86400000);
  }
  _renderDeadlineResults();
  if (typeof toast === 'function') toast('Đã cập nhật thời hạn!', 'success');
}
function viewDocFromDL(id) {
  closeDeadlineModal();
  if (typeof showDocDetail === 'function') showDocDetail(id);else if (typeof showPage === 'function') showPage('documents');
}
function setDeadlineReminders() {
  var urgent = _dlResults.filter(function (r) {
    return r.deadline && r.daysLeft !== null && r.daysLeft >= 0 && r.daysLeft <= 7 && r.status !== 'done';
  });
  if (!urgent.length) {
    if (typeof toast === 'function') toast('Không có văn bản cấp bách', 'info');
    return;
  }
  urgent.forEach(function (d) {
    return setDeadlineForDoc(d.id, d.deadline);
  });
  if (typeof toast === 'function') toast("<i class=\"fas fa-bell\" style=\"color:var(--gold,#d4a017)\"></i> \u0110\xE3 \u0111\u1EB7t nh\u1EAFc nh\u1EDF cho ".concat(urgent.length, " v\u0103n b\u1EA3n!"), 'success');
}

// ─────────────────────────────────────────────────────────────────────
//  12. PATCH DASHBOARD + quickAiAction
// ─────────────────────────────────────────────────────────────────────
function _patchDashboard() {
  var btn = document.querySelector('#dashAiPanel .btn-gold');
  if (btn) {
    btn.onclick = openAIConfigModal;
    btn.innerHTML = '<i class="fas fa-sliders-h"></i> Cấu hình';
  }
  if (typeof window.quickAiAction === 'function') {
    var _orig = window.quickAiAction;
    window.quickAiAction = /*#__PURE__*/function () {
      var _ref1 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(action) {
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              if (!(action === 'deadline')) {
                _context7.n = 1;
                break;
              }
              openDeadlineModal();
              return _context7.a(2);
            case 1:
              if (!(action === 'config')) {
                _context7.n = 2;
                break;
              }
              openAIConfigModal();
              return _context7.a(2);
            case 2:
              return _context7.a(2, _orig(action));
          }
        }, _callee5);
      }));
      return function (_x5) {
        return _ref1.apply(this, arguments);
      };
    }();
  }
}

// ─────────────────────────────────────────────────────────────────────
//  13. PUBLIC API
// ─────────────────────────────────────────────────────────────────────
window.AI = {
  call: callAI,
  offline: OfflineEngine,
  quota: QuotaGuard,
  cache: AICache,
  config: AI_CONFIG,
  getQuotaStatus: function getQuotaStatus() {
    return QuotaGuard.getStatus();
  },
  testKey: function testKey(k, m) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
      var resolved, opts, r, _t7;
      return _regenerator().w(function (_context8) {
        while (1) switch (_context8.p = _context8.n) {
          case 0:
            // Dùng forceModel chỉ khi test model cụ thể, nhưng cho phép 404 fallback
            // Nếu không chỉ định model → dùng auto fallback chain
            resolved = m ? QuotaGuard.resolveId(m) : null;
            _context8.p = 1;
            opts = {
              apiKey: k,
              maxTokens: 10
            };
            if (resolved) opts.forceModel = resolved;
            _context8.n = 2;
            return GeminiEngine.call('Trả lời: OK', opts);
          case 2:
            r = _context8.v;
            return _context8.a(2, {
              ok: true,
              model: r.model,
              label: r.label
            });
          case 3:
            _context8.p = 3;
            _t7 = _context8.v;
            if (!(_t7.status === 429)) {
              _context8.n = 4;
              break;
            }
            return _context8.a(2, {
              ok: false,
              error: 'quota hết (429)',
              status: 429
            });
          case 4:
            return _context8.a(2, {
              ok: false,
              error: _t7.message,
              status: _t7.status
            });
        }
      }, _callee6, null, [[1, 3]]);
    }))();
  },
  getModelList: function getModelList() {
    return AI_CONFIG.MODELS;
  },
  canGoOnline: function canGoOnline() {
    var s = _aiGetSettings();
    return !!(s.apiKey && navigator.onLine && AI_CONFIG.MODELS.some(function (m) {
      return QuotaGuard.canUse(m.id);
    }));
  },
  openConfig: openAIConfigModal,
  openDeadline: openDeadlineModal,
  scanDeadlines: scanDeadlines,
  clearCache: function clearCache() {
    AICache.clear();
  },
  resolveModel: function resolveModel(id) {
    return QuotaGuard.resolveId(id);
  }
};

// Backward compat globals
window.callGemini = callGemini;
window.callAI = callAI;
window.openAIConfigModal = openAIConfigModal;
window.closeAIConfigModal = closeAIConfigModal;
window.openDeadlineModal = openDeadlineModal;
window.closeDeadlineModal = closeDeadlineModal;
window.scanDeadlines = scanDeadlines;
window.filterDeadlines = filterDeadlines;
window.QuotaGuard = QuotaGuard;
window.AICache = AICache;
window.updateDocStatusFromDL = updateDocStatusFromDL;
window.setDeadlineForDoc = setDeadlineForDoc;
window.promptDeadlineForDoc = promptDeadlineForDoc;
window.viewDocFromDL = viewDocFromDL;
window.setDeadlineReminders = setDeadlineReminders;
window.refreshAICfgStatus = refreshAICfgStatus;
window._updateAICfgQuota = _updateAICfgQuota;
window.testAICfgKey = testAICfgKey;
window.testAICfgOffline = testAICfgOffline;
window.saveAIConfig = saveAIConfig;
window.toggleAICfgKey = toggleAICfgKey;

// Auto-init
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function () {
    _injectAIConfigModal();
    _injectDeadlineModal();
    setTimeout(_patchDashboard, 200);
  });
} else {
  setTimeout(function () {
    _injectAIConfigModal();
    _injectDeadlineModal();
    _patchDashboard();
  }, 150);
}
console.log('[ĐoànVăn AI Engine v5.0] Loaded\n', '✅ Models:', AI_CONFIG.MODELS.map(function (m) {
  return "".concat(m.label, "(").concat(m.id, ")");
}).join(' → '), '\n', '✅ Offline Engine: 23 công cụ NLP nội bộ (v5.1)\n', '✅ Cache · Queue · ConfigModal · DeadlineModal');
