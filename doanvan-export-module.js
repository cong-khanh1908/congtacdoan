function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
/**
 * ╔══════════════════════════════════════════════════════════════════════╗
 * ║   DOANVAN — MODULE XUẤT VĂN BẢN v2.0                               ║
 * ║                                                                      ║
 * ║   Chuẩn thể thức văn bản theo:                                      ║
 * ║   • Nghị định 30/2020/NĐ-CP (thể thức, kỹ thuật trình bày)         ║
 * ║   • Thông tư 01/2011/TT-BNV (hướng dẫn thể thức văn bản HC)        ║
 * ║   • Điều lệ Đoàn TNCS Hồ Chí Minh (khoá XII)                       ║
 * ║   • Điều lệ Đảng Cộng sản Việt Nam                                  ║
 * ║                                                                      ║
 * ║   Định dạng xuất: Word (DOCX) · Excel (XLSX) · PDF · In trực tiếp  ║
 * ╚══════════════════════════════════════════════════════════════════════╝
 *
 * CÁCH DÙNG:
 *   DoanVanExport.showDialog(type, data)
 *   type: 'template' | 'report' | 'members' | 'nghiquyet' | 'nhanxet' |
 *         'hoatdong' | 'tomtat' | 'monthly'
 */

// ─────────────────────────────────────────────────────────────────────
//  0. CSS — Modal chọn định dạng xuất
// ─────────────────────────────────────────────────────────────────────
(function injectExportCSS() {
  if (document.getElementById('dv-export-style')) return;
  var style = document.createElement('style');
  style.id = 'dv-export-style';
  style.textContent = "\n    /* \u2500\u2500 Modal xu\u1EA5t \u2500\u2500 */\n    #dvExportModal{position:fixed;inset:0;z-index:9000;display:none;align-items:center;justify-content:center}\n    #dvExportModal.open{display:flex}\n    #dvExportModal .dv-overlay{position:absolute;inset:0;background:rgba(0,0,0,0.55);backdrop-filter:blur(4px)}\n    #dvExportModal .dv-box{position:relative;background:#fff;border-radius:20px;padding:32px 28px 24px;width:540px;max-width:96vw;max-height:92vh;overflow-y:auto;box-shadow:0 20px 60px rgba(0,0,0,0.25);animation:dvPop .25s ease}\n    @keyframes dvPop{from{opacity:0;transform:scale(.94)}to{opacity:1;transform:scale(1)}}\n    #dvExportModal .dv-title{font-family:'Playfair Display',serif;font-size:1.25rem;font-weight:700;color:#1a2340;margin-bottom:6px;display:flex;align-items:center;gap:10px}\n    #dvExportModal .dv-sub{font-size:0.78rem;color:#6b7280;margin-bottom:22px}\n    #dvExportModal .dv-formats{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-bottom:20px}\n    #dvExportModal .dv-fmt-btn{border:2px solid #e5e7eb;border-radius:14px;padding:16px 14px;cursor:pointer;transition:.2s;background:#fafafa;display:flex;align-items:center;gap:12px;text-align:left}\n    #dvExportModal .dv-fmt-btn:hover{border-color:#c0392b;background:#fff5f5;transform:translateY(-2px);box-shadow:0 4px 16px rgba(192,57,43,.15)}\n    #dvExportModal .dv-fmt-btn.selected{border-color:#c0392b;background:#fff5f5;box-shadow:0 0 0 3px rgba(192,57,43,.12)}\n    #dvExportModal .dv-fmt-icon{width:44px;height:44px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:1.4rem;flex-shrink:0}\n    #dvExportModal .dv-fmt-name{font-weight:700;font-size:0.88rem;color:#1f2937}\n    #dvExportModal .dv-fmt-desc{font-size:0.72rem;color:#6b7280;margin-top:2px}\n    #dvExportModal .dv-opts{background:#f9fafb;border-radius:12px;padding:16px;margin-bottom:18px;border:1px solid #e5e7eb}\n    #dvExportModal .dv-opts-title{font-size:0.76rem;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#9ca3af;margin-bottom:12px}\n    #dvExportModal .dv-row{display:flex;gap:10px;margin-bottom:10px;flex-wrap:wrap}\n    #dvExportModal .dv-field{flex:1;min-width:160px}\n    #dvExportModal .dv-label{font-size:0.74rem;font-weight:600;color:#374151;margin-bottom:4px}\n    #dvExportModal .dv-input{width:100%;padding:7px 10px;border:1.5px solid #d1d5db;border-radius:8px;font-size:0.82rem;font-family:'Be Vietnam Pro',sans-serif;color:#1f2937;background:#fff}\n    #dvExportModal .dv-input:focus{outline:none;border-color:#c0392b;box-shadow:0 0 0 3px rgba(192,57,43,.1)}\n    #dvExportModal .dv-actions{display:flex;gap:10px;justify-content:flex-end;padding-top:8px;border-top:1px solid #f3f4f6}\n    #dvExportModal .dv-btn{display:inline-flex;align-items:center;gap:8px;padding:10px 22px;border-radius:9px;font-weight:600;font-size:0.84rem;cursor:pointer;border:none;font-family:'Be Vietnam Pro',sans-serif;transition:.2s}\n    #dvExportModal .dv-btn-primary{background:#c0392b;color:#fff}\n    #dvExportModal .dv-btn-primary:hover{background:#96281b;transform:translateY(-1px);box-shadow:0 4px 12px rgba(192,57,43,.35)}\n    #dvExportModal .dv-btn-outline{background:transparent;border:1.5px solid #e5e7eb;color:#6b7280}\n    #dvExportModal .dv-btn-outline:hover{border-color:#c0392b;color:#c0392b}\n    #dvExportModal .dv-progress{display:none;align-items:center;gap:10px;padding:12px 0;font-size:0.82rem;color:#6b7280}\n    #dvExportModal .dv-progress.show{display:flex}\n    #dvExportModal .dv-spinner{width:20px;height:20px;border:3px solid #e5e7eb;border-top-color:#c0392b;border-radius:50%;animation:dvSpin .7s linear infinite;flex-shrink:0}\n    @keyframes dvSpin{to{transform:rotate(360deg)}}\n    /* \u2500\u2500 Th\u1EBB th\xF4ng tin th\u1EC3 th\u1EE9c N\u011030 \u2500\u2500 */\n    #dvExportModal .dv-nd30-badge{display:flex;align-items:center;gap:8px;padding:8px 12px;background:linear-gradient(135deg,#fff7ed,#fef3c7);border:1px solid #fcd34d;border-radius:8px;margin-bottom:16px;font-size:0.74rem;color:#92400e}\n    #dvExportModal .dv-nd30-badge i{color:#d97706}\n  ";
  document.head.appendChild(style);
})();

// ─────────────────────────────────────────────────────────────────────
//  1. TIỆN ÍCH & THỂ THỨC NĐ30
// ─────────────────────────────────────────────────────────────────────

var ND30 = {
  // Khổ giấy A4 theo NĐ30: lề trên 20-25mm, dưới 20-25mm, trái 30-35mm, phải 15-20mm
  PAGE_STYLE: "\n    @page { size: A4 portrait; margin: 25mm 20mm 25mm 30mm; }\n    body {\n      font-family: 'Times New Roman', Times, serif;\n      font-size: 14pt;\n      line-height: 1.5;\n      color: #000;\n    }\n  ",
  // Ngày tháng theo NĐ30: "…, ngày … tháng … năm …"
  formatDate: function formatDate(dateStr) {
    if (!dateStr) return '';
    var d = new Date(dateStr);
    if (isNaN(d)) return dateStr;
    return "ng\xE0y ".concat(d.getDate(), " th\xE1ng ").concat(d.getMonth() + 1, " n\u0103m ").concat(d.getFullYear());
  },
  // Tên file theo NĐ30: viết không dấu, dấu gạch ngang
  sanitizeFilename: function sanitizeFilename(name) {
    return name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').replace(/[^a-zA-Z0-9_\-]/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '').substring(0, 80);
  },
  // Tạo CSS hoàn chỉnh cho văn bản NĐ30
  getDocCSS: function getDocCSS() {
    var extra = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return "\n      @page { size: A4; margin: 25mm 20mm 25mm 30mm; }\n      * { box-sizing: border-box; }\n      body {\n        font-family: 'Times New Roman', Times, serif;\n        font-size: 13pt;\n        line-height: 1.8;\n        color: #000;\n        margin: 0; padding: 20px 0;\n      }\n      /* Qu\u1ED1c hi\u1EC7u - Ti\xEAu ng\u1EEF */\n      .quoc-hieu {\n        text-align: center; font-weight: bold;\n        text-transform: uppercase; font-size: 13pt;\n        line-height: 1.4; margin-bottom: 4pt;\n      }\n      .tieu-ngu {\n        text-align: center; font-size: 13pt;\n        text-decoration: underline; margin-bottom: 16pt;\n      }\n      /* Ti\xEAu \u0111\u1EC1 */\n      .doc-title {\n        text-align: center; font-weight: bold;\n        text-transform: uppercase; font-size: 14pt;\n        margin: 14pt 0 6pt;\n      }\n      .doc-subtitle {\n        text-align: center; font-style: italic;\n        font-size: 13pt; margin-bottom: 14pt;\n      }\n      /* C\u01A1 quan ban h\xE0nh */\n      .co-quan { font-weight: bold; text-transform: uppercase; font-size: 12pt; }\n      .co-quan-con { font-size: 11pt; text-transform: uppercase; font-weight: bold; }\n      /* S\u1ED1 k\xFD hi\u1EC7u */\n      .so-ky-hieu { font-size: 12pt; }\n      /* Ng\xE0y th\xE1ng, \u0111\u1ECBa danh */\n      .dia-danh-ngay { font-style: italic; }\n      /* N\u1ED9i dung */\n      p { margin: 0 0 8pt; text-align: justify; }\n      p.indent { text-indent: 1cm; }\n      /* B\u1EA3ng */\n      table { border-collapse: collapse; width: 100%; margin: 8pt 0; }\n      th, td { border: 1px solid #333; padding: 5pt 8pt; font-size: 11pt; }\n      th { background: #f0f0f0; text-align: center; font-weight: bold; }\n      .table-no-border { border: none !important; }\n      .table-no-border td, .table-no-border th { border: none !important; }\n      /* Ch\u1EEF k\xFD */\n      .chu-ky { width: 100%; margin-top: 16pt; }\n      .chu-ky td { border: none; vertical-align: top; }\n      .chu-ky .sign-block { text-align: center; }\n      .chu-ky .sign-title { font-weight: bold; text-transform: uppercase; }\n      .chu-ky .sign-name { font-weight: bold; margin-top: 40pt; }\n      /* In */\n      @media print {\n        body { padding: 0; }\n        .no-print { display: none !important; }\n        a { text-decoration: none; color: inherit; }\n      }\n      ".concat(extra, "\n    ");
  },
  // Phần đầu văn bản theo NĐ30 (hai cột: cơ quan ban hành + Quốc hiệu/Tiêu ngữ)
  buildHeader: function buildHeader() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _opts$coQuan = opts.coQuan,
      coQuan = _opts$coQuan === void 0 ? '' : _opts$coQuan,
      _opts$coQuanCon = opts.coQuanCon,
      coQuanCon = _opts$coQuanCon === void 0 ? '' : _opts$coQuanCon,
      _opts$soHieu = opts.soHieu,
      soHieu = _opts$soHieu === void 0 ? '' : _opts$soHieu,
      _opts$tenLoai = opts.tenLoai,
      tenLoai = _opts$tenLoai === void 0 ? '' : _opts$tenLoai,
      _opts$diaDanh = opts.diaDanh,
      diaDanh = _opts$diaDanh === void 0 ? '' : _opts$diaDanh,
      _opts$ngay = opts.ngay,
      ngay = _opts$ngay === void 0 ? '' : _opts$ngay,
      _opts$showQuocHieu = opts.showQuocHieu,
      showQuocHieu = _opts$showQuocHieu === void 0 ? true : _opts$showQuocHieu;
    var ngayFormatted = ngay ? "".concat(diaDanh ? diaDanh + ', ' : '').concat(this.formatDate(ngay)) : diaDanh ? diaDanh + ', ngày …….. tháng …….. năm ………' : '';
    return "\n      <table class=\"table-no-border\" style=\"width:100%;margin-bottom:4pt\">\n        <tr>\n          <td style=\"width:50%;vertical-align:top\">\n            ".concat(coQuan ? "<div class=\"co-quan\">".concat(coQuan, "</div>") : '', "\n            ").concat(coQuanCon ? "<div class=\"co-quan-con\">".concat(coQuanCon, "</div>") : '', "\n            <div style=\"font-size:12pt\">\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500</div>\n            ").concat(soHieu ? "<div class=\"so-ky-hieu\">S\u1ED1: ".concat(soHieu, "</div>") : '', "\n          </td>\n          <td style=\"width:50%;text-align:center;vertical-align:top\">\n            ").concat(showQuocHieu ? "\n              <div class=\"quoc-hieu\">C\u1ED8NG H\xD2A X\xC3 H\u1ED8I CH\u1EE6 NGH\u0128A VI\u1EC6T NAM</div>\n              <div class=\"tieu-ngu\">\u0110\u1ED9c l\u1EADp \u2013 T\u1EF1 do \u2013 H\u1EA1nh ph\xFAc</div>\n            " : "<div class=\"quoc-hieu\">\u0110O\xC0N TNCS H\u1ED2 CH\xCD MINH</div>", "\n            <div class=\"dia-danh-ngay\" style=\"margin-top:6pt\">").concat(ngayFormatted, "</div>\n          </td>\n        </tr>\n      </table>\n    ");
  },
  // Phần chữ ký
  buildSignature: function buildSignature() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _opts$chucVu = opts.chucVu,
      chucVu = _opts$chucVu === void 0 ? 'T/M BAN CHẤP HÀNH<br>BÍ THƯ' : _opts$chucVu,
      _opts$hoTen = opts.hoTen,
      hoTen = _opts$hoTen === void 0 ? '' : _opts$hoTen,
      _opts$diaDanh2 = opts.diaDanh,
      diaDanh = _opts$diaDanh2 === void 0 ? '' : _opts$diaDanh2,
      _opts$ngay2 = opts.ngay,
      ngay = _opts$ngay2 === void 0 ? '' : _opts$ngay2;
    return "\n      <table class=\"chu-ky\">\n        <tr>\n          <td style=\"width:50%\"></td>\n          <td style=\"width:50%;text-align:center\">\n            ".concat(diaDanh || ngay ? "<div class=\"dia-danh-ngay\" style=\"margin-bottom:8pt\">".concat(diaDanh ? diaDanh + ', ' : '').concat(ngay ? this.formatDate(ngay) : '', "</div>") : '', "\n            <div class=\"sign-title\">").concat(chucVu, "</div>\n            <div style=\"height:50pt\"></div>\n            ").concat(hoTen ? "<div class=\"sign-name\">".concat(hoTen, "</div>") : '<div class="sign-name">………………………………</div>', "\n          </td>\n        </tr>\n      </table>\n    ");
  }
};

// ─────────────────────────────────────────────────────────────────────
//  2. GENERATORS — Tạo nội dung HTML theo thể thức NĐ30
// ─────────────────────────────────────────────────────────────────────

var DocGenerators = {
  // 2a. Văn bản từ mẫu (template)
  template: function template(raw, name) {
    var settings = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var s = settings;
    var today = new Date().toISOString().split('T')[0];
    var headerHtml = ND30.buildHeader({
      coQuan: s.doanCapTren || 'ĐOÀN TNCS HỒ CHÍ MINH',
      coQuanCon: s.unitName || 'BCH CHI ĐOÀN',
      diaDanh: s.diaDanh || '',
      ngay: today,
      showQuocHieu: false
    });
    var content = raw.replace(/\n/g, '</p><p class="indent">');
    return "\n      ".concat(headerHtml, "\n      <div class=\"doc-title\" style=\"margin-top:12pt\">").concat(name.toUpperCase(), "</div>\n      <div style=\"height:8pt\"></div>\n      <div style=\"text-align:justify;text-indent:1cm\">").concat(content, "</div>\n      ").concat(ND30.buildSignature({
      chucVu: 'T/M BAN CHẤP HÀNH<br>BÍ THƯ',
      hoTen: s.biThu || ''
    }), "\n    ");
  },
  // 2b. Báo cáo tổng kết / kết quả
  report: function report(content, title) {
    var settings = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var s = settings;
    var today = new Date().toISOString().split('T')[0];
    var headerHtml = ND30.buildHeader({
      coQuan: s.doanCapTren || 'ĐOÀN TNCS HỒ CHÍ MINH',
      coQuanCon: s.unitName || 'BCH CHI ĐOÀN',
      diaDanh: s.diaDanh || '',
      ngay: today,
      showQuocHieu: false
    });
    return "\n      ".concat(headerHtml, "\n      <div class=\"doc-title\">").concat((title || 'BÁO CÁO').toUpperCase(), "</div>\n      <div style=\"height:6pt\"></div>\n      <div style=\"text-align:justify\">").concat(content.replace(/\n\n/g, '</p><p class="indent">').replace(/\n/g, '<br>'), "</div>\n      ").concat(ND30.buildSignature({
      chucVu: 'T/M BAN CHẤP HÀNH<br>BÍ THƯ',
      hoTen: s.biThu || ''
    }), "\n    ");
  },
  // 2c. Danh sách đoàn viên
  members: function members(list) {
    var filters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var settings = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var s = settings;
    var partyLabelMap = {
      utu: 'Đoàn viên ưu tú',
      dubia: 'Đảng viên dự bị',
      chinh_thuc: 'Đảng viên chính thức',
      '': 'Đoàn viên'
    };
    var today = new Date().toISOString().split('T')[0];
    var headerHtml = ND30.buildHeader({
      coQuan: s.doanCapTren || 'ĐOÀN TNCS HỒ CHÍ MINH',
      coQuanCon: s.unitName || 'BCH CHI ĐOÀN',
      diaDanh: s.diaDanh || '',
      ngay: today,
      showQuocHieu: false
    });
    return "\n      ".concat(headerHtml, "\n      <div class=\"doc-title\">DANH S\xC1CH ").concat((filters.partyLabel || 'ĐOÀN VIÊN').toUpperCase(), "</div>\n      <div class=\"doc-subtitle\">\n        \u0110\u01A1n v\u1ECB: ").concat(filters.chiDoan || 'Tất cả chi đoàn', " &nbsp;|&nbsp;\n        Tr\u1EA1ng th\xE1i: ").concat(filters.statusLabel || 'Tất cả', " &nbsp;|&nbsp;\n        L\u1EADp ng\xE0y: ").concat(new Date().toLocaleDateString('vi-VN'), "\n      </div>\n      <table>\n        <thead>\n          <tr>\n            <th style=\"width:30px\">STT</th>\n            <th>H\u1ECD v\xE0 t\xEAn</th>\n            <th style=\"width:36px\">GT</th>\n            <th>Chi \u0111o\xE0n</th>\n            <th>Ch\u1EE9c v\u1EE5</th>\n            <th>Ng\xE0y sinh</th>\n            <th>Ng\xE0y v\xE0o \u0110TN</th>\n            <th>Danh hi\u1EC7u</th>\n            <th>\u0110i\u1EC7n tho\u1EA1i</th>\n            <th>Ghi ch\xFA</th>\n          </tr>\n        </thead>\n        <tbody>\n          ").concat(list.map(function (m, i) {
      return "\n            <tr>\n              <td style=\"text-align:center\">".concat(i + 1, "</td>\n              <td><strong>").concat(m.fullName || '', "</strong></td>\n              <td style=\"text-align:center\">").concat(m.gender === 'female' ? 'Nữ' : 'Nam', "</td>\n              <td>").concat(m.chiDoan || '—', "</td>\n              <td>").concat(m.role || 'Đoàn viên', "</td>\n              <td style=\"text-align:center;white-space:nowrap\">").concat(m.birthDate ? new Date(m.birthDate).toLocaleDateString('vi-VN') : '—', "</td>\n              <td style=\"text-align:center;white-space:nowrap\">").concat(m.joinDate ? new Date(m.joinDate).toLocaleDateString('vi-VN') : '—', "</td>\n              <td>").concat(partyLabelMap[m.partyStatus || ''], "</td>\n              <td>").concat(m.phone || '—', "</td>\n              <td>").concat(m.partyCard || m.note || '', "</td>\n            </tr>\n          ");
    }).join(''), "\n        </tbody>\n      </table>\n      <p style=\"margin-top:8pt\">T\u1ED5ng c\u1ED9ng: <strong>").concat(list.length, "</strong> ng\u01B0\u1EDDi.</p>\n      ").concat(ND30.buildSignature({
      chucVu: 'T/M BAN CHẤP HÀNH<br>BÍ THƯ',
      hoTen: s.biThu || ''
    }), "\n    ");
  },
  // 2d. Nghị quyết giới thiệu Mẫu 4-KNĐ (Điều lệ Đảng)
  nghiquyet: function nghiquyet() {
    var fields = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var s = settings;
    var ngay = new Date(fields.ngayKy || Date.now());
    var d = ngay.getDate(),
      mo = ngay.getMonth() + 1,
      y = ngay.getFullYear();
    return "\n      <div style=\"text-align:right;font-size:11pt;margin-bottom:4pt\">M\u1EABu 4-KN\u0110</div>\n      <table class=\"table-no-border\" style=\"width:100%;margin-bottom:6pt\">\n        <tr>\n          <td style=\"width:50%;vertical-align:top\">\n            <div class=\"co-quan\" style=\"font-size:11pt\">".concat(fields.doanCapTren || s.doanCapTren || '', "</div>\n            <div class=\"co-quan-con\" style=\"font-size:11pt\">").concat(fields.bchCDCS || s.bchCDCS || '', "</div>\n            <div style=\"font-size:11pt\">\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500</div>\n            <div style=\"font-size:11pt\">S\u1ED1: ").concat(fields.soNghiQuyet || '……-NQ/CĐCS', "</div>\n          </td>\n          <td style=\"width:50%;text-align:center;vertical-align:top\">\n            <div style=\"font-weight:bold;text-decoration:underline;font-size:12pt\">\u0110O\xC0N TNCS H\u1ED2 CH\xCD MINH</div>\n            <div style=\"font-style:italic;font-size:12pt\">").concat(fields.diaDanh || s.diaDanh || '', ", ng\xE0y ").concat(d, " th\xE1ng ").concat(mo, " n\u0103m ").concat(y, "</div>\n          </td>\n        </tr>\n      </table>\n      <div class=\"doc-title\">NGH\u1ECA QUY\u1EBET</div>\n      <div class=\"doc-subtitle\" style=\"font-size:13pt\">\n        V\u1EC1 vi\u1EC7c gi\u1EDBi thi\u1EC7u \u0111o\xE0n vi\xEAn <strong>").concat(fields.hoTen || '…………………', "</strong>, sinh n\u0103m <strong>").concat(fields.namSinh || '………', "</strong><br>\n        v\xE0o \u0110\u1EA3ng C\u1ED9ng s\u1EA3n Vi\u1EC7t Nam\n      </div>\n      <p class=\"indent\"><strong>BAN CH\u1EA4P H\xC0NH ").concat((fields.bchCDCS || s.bchCDCS || 'CHI ĐOÀN CƠ SỞ').toUpperCase(), "</strong></p>\n      <p class=\"indent\">C\u0103n c\u1EE9 \u0110i\u1EC1u l\u1EC7 \u0110o\xE0n TNCS H\u1ED3 Ch\xED Minh;</p>\n      <p class=\"indent\">C\u0103n c\u1EE9 \u0110i\u1EC1u l\u1EC7 \u0110\u1EA3ng C\u1ED9ng s\u1EA3n Vi\u1EC7t Nam;</p>\n      <p class=\"indent\">X\xE9t \u0111\u1EC1 ngh\u1ECB c\u1EE7a \u0111o\xE0n vi\xEAn ").concat(fields.hoTen || '…………………', " v\xE0 \xFD ki\u1EBFn c\u1EE7a c\xE1c \u0111o\xE0n vi\xEAn trong chi \u0111o\xE0n;</p>\n      <p class=\"indent\"><strong>QUY\u1EBET NGH\u1ECA:</strong></p>\n      <p class=\"indent\">\u0110i\u1EC1u 1. Nh\u1EA5t tr\xED gi\u1EDBi thi\u1EC7u \u0111\u1ED3ng ch\xED <strong>").concat(fields.hoTen || '……………………………', "</strong>, sinh ng\xE0y \u2026\u2026 th\xE1ng \u2026\u2026 n\u0103m <strong>").concat(fields.namSinh || '……', "</strong>; l\xE0 \u0111o\xE0n vi\xEAn c\u1EE7a ").concat(fields.bchCDCS || 'Chi đoàn cơ sở ………', ", \u0111\u1EC3 ").concat(fields.chiUy || 'Chi ủy', " xem x\xE9t, gi\u1EDBi thi\u1EC7u v\xE0o \u0110\u1EA3ng C\u1ED9ng s\u1EA3n Vi\u1EC7t Nam.</p>\n      <p class=\"indent\">\u0110i\u1EC1u 2. <strong>Nh\u1EEFng \u01B0u \u0111i\u1EC3m ch\xEDnh:</strong></p>\n      <p class=\"indent\"><em>a) V\u1EC1 ph\u1EA9m ch\u1EA5t ch\xEDnh tr\u1ECB, \u0111\u1EA1o \u0111\u1EE9c, l\u1ED1i s\u1ED1ng:</em></p>\n      <p>").concat((fields.uuDiemCT || '').replace(/\n/g, '<br>'), "</p>\n      <p class=\"indent\"><em>b) V\u1EC1 n\u0103ng l\u1EF1c c\xF4ng t\xE1c, chuy\xEAn m\xF4n:</em></p>\n      <p>").concat((fields.uuDiemCM || '').replace(/\n/g, '<br>'), "</p>\n      <p class=\"indent\"><em>c) V\u1EC1 \xFD th\u1EE9c t\u1ED5 ch\u1EE9c k\u1EF7 lu\u1EADt \u0110o\xE0n:</em></p>\n      <p>").concat((fields.uuDiemDoan || '').replace(/\n/g, '<br>'), "</p>\n      ").concat(fields.khuyetDiem ? "<p class=\"indent\"><strong>Khuy\u1EBFt \u0111i\u1EC3m:</strong></p><p>".concat(fields.khuyetDiem.replace(/\n/g, '<br>'), "</p>") : '', "\n      <p class=\"indent\">\u0110i\u1EC1u 3. K\u1EBFt qu\u1EA3 bi\u1EC3u quy\u1EBFt: <strong>").concat(fields.tanThanh || '……/……', "</strong> \u0111\u1ED3ng ch\xED t\xE1n th\xE0nh (\u0111\u1EA1t ").concat(fields.tanThanh ? Math.round(parseInt(fields.tanThanh.split('/')[0] || 0) / Math.max(1, parseInt(fields.tanThanh.split('/')[1] || 1)) * 100) : '…', "%); ").concat(fields.khongTanThanh || '0', " \u0111\u1ED3ng ch\xED kh\xF4ng t\xE1n th\xE0nh./.</p>\n      <table class=\"table-no-border\" style=\"width:100%;margin-top:16pt\">\n        <tr>\n          <td style=\"width:50%\">\n            <div><em>N\u01A1i nh\u1EADn:</em></div>\n            <div style=\"font-size:11pt\">- ").concat(fields.doanCapTren || 'Đoàn cấp trên', " (b/c);</div>\n            <div style=\"font-size:11pt\">- ").concat(fields.chiUy || 'Chi ủy', " (th\u1EF1c hi\u1EC7n);</div>\n            <div style=\"font-size:11pt\">- L\u01B0u Chi \u0111o\xE0n.</div>\n          </td>\n          <td style=\"width:50%;text-align:center\">\n            <div style=\"font-weight:bold;text-transform:uppercase\">T/M BAN CH\u1EA4P H\xC0NH<br>B\xCD TH\u01AF</div>\n            <div style=\"height:48pt\"></div>\n            <div style=\"font-weight:bold\">").concat(fields.biThu || s.biThu || '……………………………', "</div>\n          </td>\n        </tr>\n      </table>\n    ");
  },
  // 2e. Nhận xét chuyển Đảng chính thức (Mẫu BCH Đoàn)
  nhanxet: function nhanxet() {
    var fields = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var s = settings;
    var ngay = new Date(fields.ngayKy || Date.now());
    var d = ngay.getDate(),
      mo = ngay.getMonth() + 1,
      y = ngay.getFullYear();
    var tanThanh = fields.tanThanh || '';
    var khongTanThanh = fields.khongTanThanh || '0';
    var pct = tanThanh ? Math.round(parseInt(tanThanh.split('/')[0] || 0) / Math.max(1, parseInt(tanThanh.split('/')[1] || 1)) * 100) : '…';
    return "\n      <table class=\"table-no-border\" style=\"width:100%;margin-bottom:6pt\">\n        <tr>\n          <td style=\"width:50%;vertical-align:top\">\n            <div class=\"co-quan\" style=\"font-size:11pt\">".concat(fields.doanCapTren || s.doanCapTren || '', "</div>\n            <div class=\"co-quan-con\" style=\"font-size:11pt\">").concat(fields.bchCDCS || s.bchCDCS || '', "</div>\n            <div style=\"font-size:11pt\">\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500</div>\n          </td>\n          <td style=\"width:50%;text-align:center;vertical-align:top\">\n            <div style=\"font-weight:bold;text-decoration:underline;font-size:12pt\">\u0110O\xC0N TNCS H\u1ED2 CH\xCD MINH</div>\n            <div style=\"font-style:italic;font-size:12pt\">").concat(fields.diaDanh || s.diaDanh || '', ", ng\xE0y ").concat(d, " th\xE1ng ").concat(mo, " n\u0103m ").concat(y, "</div>\n          </td>\n        </tr>\n      </table>\n      <div class=\"doc-title\">\xDD KI\u1EBEN NH\u1EACN X\xC9T</div>\n      <div class=\"doc-subtitle\">c\u1EE7a BCH \u0110o\xE0n TNCS HCM \u0111\u1ED1i v\u1EDBi \u0111\u1EA3ng vi\xEAn d\u1EF1 b\u1ECB</div>\n      <p class=\"indent\">C\u0103n c\u1EE9 \u0111\u1EC1 ngh\u1ECB c\u1EE7a ").concat(fields.chiBo || 'Chi bộ ………………', ", Ban ch\u1EA5p h\xE0nh ").concat(fields.bchCDCS || 'Chi Đoàn cơ sở ………………', ", c\xF3 \xFD ki\u1EBFn nh\u1EADn x\xE9t \u0111\u1ED1i v\u1EDBi \u0111\u1EA3ng vi\xEAn d\u1EF1 b\u1ECB: <strong>").concat(fields.hoTen || '……………………………', "</strong>, sinh ng\xE0y ").concat(fields.ngaySinh ? new Date(fields.ngaySinh).toLocaleDateString('vi-VN') : '…/…/……', ", l\xE0 \u0111o\xE0n vi\xEAn ").concat(fields.bchCDCS || 'Chi Đoàn cơ sở', ", nh\u01B0 sau:</p>\n      <p><strong>Nh\u1EEFng \u01B0u, khuy\u1EBFt \u0111i\u1EC3m ch\xEDnh:</strong></p>\n      <p class=\"indent\">- <em>V\u1EC1 ph\u1EA9m ch\u1EA5t ch\xEDnh tr\u1ECB:</em><br>").concat((fields.nxCT || '').replace(/\n/g, '<br>'), "</p>\n      <p class=\"indent\">- <em>V\u1EC1 \u0111\u1EA1o \u0111\u1EE9c, l\u1ED1i s\u1ED1ng:</em><br>").concat((fields.nxDD || '').replace(/\n/g, '<br>'), "</p>\n      <p class=\"indent\">- <em>V\u1EC1 n\u0103ng l\u1EF1c c\xF4ng t\xE1c:</em><br>").concat((fields.nxNL || '').replace(/\n/g, '<br>'), "</p>\n      <p class=\"indent\">- <em>V\u1EC1 quan h\u1EC7 qu\u1EA7n ch\xFAng:</em><br>").concat((fields.nxQC || '').replace(/\n/g, '<br>'), "</p>\n      <p class=\"indent\">- <em>V\u1EC1 th\u1EF1c hi\u1EC7n nhi\u1EC7m v\u1EE5 \u0111\u1EA3ng vi\xEAn:</em><br>").concat((fields.nxNV || '').replace(/\n/g, '<br>'), "</p>\n      <p class=\"indent\">S\u1ED1 c\xE1c \u0111\u1ED3ng ch\xED trong Ban Ch\u1EA5p h\xE0nh Chi \u0111o\xE0n t\xE1n th\xE0nh \u0111\u1EC1 ngh\u1ECB chuy\u1EC3n \u0111\u1EA3ng ch\xEDnh th\u1EE9c \u0111\u1EA3ng vi\xEAn ").concat(fields.hoTen || '……………', " l\xE0 <strong>").concat(tanThanh || '…/…', "</strong> (\u0111\u1EA1t ").concat(pct, "%) so v\u1EDBi t\u1ED5ng s\u1ED1 \u1EE7y vi\xEAn Ban Ch\u1EA5p h\xE0nh Chi \u0111o\xE0n. S\u1ED1 kh\xF4ng t\xE1n th\xE0nh l\xE0 <strong>").concat(khongTanThanh, "</strong> \u0111\u1ED3ng ch\xED./.</p>\n      <table class=\"table-no-border\" style=\"width:100%;margin-top:16pt\">\n        <tr>\n          <td style=\"width:50%\">\n            <div><em>N\u01A1i nh\u1EADn:</em></div>\n            <div style=\"font-size:11pt\">- ").concat(fields.dangUy || 'Đảng ủy', " (b/c);</div>\n            <div style=\"font-size:11pt\">- ").concat(fields.chiBo || 'Chi bộ', " (th\u1EF1c hi\u1EC7n);</div>\n            <div style=\"font-size:11pt\">- L\u01B0u.</div>\n          </td>\n          <td style=\"width:50%;text-align:center\">\n            <div style=\"font-weight:bold;text-transform:uppercase\">T/M BAN CH\u1EA4P H\xC0NH<br>B\xCD TH\u01AF</div>\n            <div style=\"height:48pt\"></div>\n            <div style=\"font-weight:bold\">").concat(fields.biThu || s.biThu || '……………………………', "</div>\n          </td>\n        </tr>\n      </table>\n    ");
  },
  // 2f. Báo cáo hoạt động đoàn viên
  hoatdong: function hoatdong(member, activities) {
    var settings = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var s = settings;
    var today = new Date().toISOString().split('T')[0];
    var headerHtml = ND30.buildHeader({
      coQuan: s.doanCapTren || 'ĐOÀN TNCS HỒ CHÍ MINH',
      coQuanCon: s.unitName || 'BCH CHI ĐOÀN',
      diaDanh: s.diaDanh || '',
      ngay: today,
      showQuocHieu: false
    });
    var totalHours = activities.reduce(function (acc, a) {
      return acc + (parseFloat(a.hours) || 0);
    }, 0);
    var typeMap = {
      hoihop: 'Hội họp',
      tinhthuong: 'Tình thương',
      vanhoa: 'Văn hóa',
      theducthethao: 'TDTT',
      daochinh: 'Dao chinh tri',
      khac: 'Khác'
    };
    var sorted = _toConsumableArray(activities).sort(function (a, b) {
      return new Date(a.time) - new Date(b.time);
    });
    return "\n      ".concat(headerHtml, "\n      <div class=\"doc-title\">B\xC1O C\xC1O HO\u1EA0T \u0110\u1ED8NG</div>\n      <div class=\"doc-subtitle\">\u0110o\xE0n vi\xEAn: <strong>").concat((member === null || member === void 0 ? void 0 : member.fullName) || '……………………', "</strong> \u2014 Chi \u0111o\xE0n: ").concat((member === null || member === void 0 ? void 0 : member.chiDoan) || '……………', "</div>\n      <table>\n        <thead>\n          <tr>\n            <th style=\"width:30px\">STT</th>\n            <th>T\xEAn ho\u1EA1t \u0111\u1ED9ng</th>\n            <th style=\"width:100px\">Th\u1EDDi gian</th>\n            <th>\u0110\u1ECBa \u0111i\u1EC3m</th>\n            <th>Lo\u1EA1i</th>\n            <th>K\u1EBFt qu\u1EA3</th>\n            <th style=\"width:80px\">B\xE1o c\xE1o</th>\n          </tr>\n        </thead>\n        <tbody>\n          ").concat(sorted.map(function (a, i) {
      return "\n            <tr>\n              <td style=\"text-align:center\">".concat(i + 1, "</td>\n              <td>").concat(a.name || '').concat(a.docRef ? "<br><small style=\"color:#666\">".concat(a.docRef, "</small>") : '', "</td>\n              <td style=\"text-align:center;white-space:nowrap;font-size:11pt\">").concat(a.time ? new Date(a.time).toLocaleDateString('vi-VN') : '—', "</td>\n              <td style=\"font-size:11pt\">").concat(a.location || '—', "</td>\n              <td style=\"font-size:11pt\">").concat(typeMap[a.type] || a.type || '—', "</td>\n              <td style=\"font-size:11pt\">").concat(a.result || '—', "</td>\n              <td style=\"text-align:center;font-size:11pt\">").concat(a.reportTarget || '—', "</td>\n            </tr>\n          ");
    }).join(''), "\n        </tbody>\n      </table>\n      <p style=\"margin-top:8pt\">T\u1ED5ng c\u1ED9ng: <strong>").concat(activities.length, "</strong> ho\u1EA1t \u0111\u1ED9ng").concat(totalHours > 0 ? " \u2014 <strong>".concat(totalHours, "</strong> gi\u1EDD") : '', ".</p>\n      ").concat(ND30.buildSignature({
      chucVu: 'T/M BAN CHẤP HÀNH<br>BÍ THƯ',
      hoTen: s.biThu || ''
    }), "\n    ");
  },
  // 2g. Tổng hợp trích yếu / báo cáo tổng hợp văn bản
  tomtat: function tomtat(docs) {
    var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var s = settings;
    var today = new Date().toISOString().split('T')[0];
    var headerHtml = ND30.buildHeader({
      coQuan: s.doanCapTren || 'ĐOÀN TNCS HỒ CHÍ MINH',
      coQuanCon: s.unitName || 'BCH CHI ĐOÀN',
      diaDanh: s.diaDanh || '',
      ngay: today,
      showQuocHieu: false
    });
    var typeMap = {
      'chi-thi': 'Chỉ thị',
      'nghi-quyet': 'Nghị quyết',
      'thong-bao': 'Thông báo',
      'ke-hoach': 'Kế hoạch',
      'bao-cao': 'Báo cáo',
      'bao-cao-dot-xuat': 'Báo cáo đột xuất',
      'khac': 'Khác'
    };
    var prioMap = {
      high: 'Cao',
      medium: 'Trung bình',
      low: 'Thấp'
    };
    return "\n      ".concat(headerHtml, "\n      <div class=\"doc-title\">T\u1ED4NG H\u1EE2P TR\xCDCH Y\u1EBEU V\u0102N B\u1EA2N</div>\n      <div class=\"doc-subtitle\">K\u1EF3: \u2026\u2026\u2026\u2026\u2026\u2026\u2026\u2026 | S\u1ED1 l\u01B0\u1EE3ng: <strong>").concat(docs.length, "</strong> v\u0103n b\u1EA3n | L\u1EADp ng\xE0y: ").concat(new Date().toLocaleDateString('vi-VN'), "</div>\n      <table>\n        <thead>\n          <tr>\n            <th style=\"width:30px\">STT</th>\n            <th style=\"width:100px\">S\u1ED1/K\xFD hi\u1EC7u</th>\n            <th>Tr\xEDch y\u1EBFu n\u1ED9i dung</th>\n            <th style=\"width:80px\">Lo\u1EA1i</th>\n            <th style=\"width:80px\">Ng\xE0y ban h\xE0nh</th>\n            <th style=\"width:80px\">H\u1EA1n x\u1EED l\xFD</th>\n            <th style=\"width:60px\">\u01AFu ti\xEAn</th>\n            <th style=\"width:70px\">Tr\u1EA1ng th\xE1i</th>\n          </tr>\n        </thead>\n        <tbody>\n          ").concat(docs.map(function (doc, i) {
      return "\n            <tr>\n              <td style=\"text-align:center\">".concat(i + 1, "</td>\n              <td style=\"font-size:11pt\">").concat(doc.code || '—', "</td>\n              <td><strong style=\"font-size:12pt\">").concat(doc.title || '', "</strong>").concat(doc.summary ? "<br><span style=\"font-size:10pt;color:#444\">".concat((doc.summary || '').substring(0, 120)).concat(doc.summary.length > 120 ? '...' : '', "</span>") : '', "</td>\n              <td style=\"text-align:center;font-size:11pt\">").concat(typeMap[doc.type] || doc.type || '—', "</td>\n              <td style=\"text-align:center;white-space:nowrap;font-size:11pt\">").concat(doc.issueDate ? new Date(doc.issueDate).toLocaleDateString('vi-VN') : '—', "</td>\n              <td style=\"text-align:center;white-space:nowrap;font-size:11pt;").concat(doc.deadline && new Date(doc.deadline) < new Date() ? 'color:#c0392b;font-weight:bold' : '', "\">").concat(doc.deadline ? new Date(doc.deadline).toLocaleDateString('vi-VN') : '—', "</td>\n              <td style=\"text-align:center;font-size:11pt\">").concat(prioMap[doc.priority] || '—', "</td>\n              <td style=\"text-align:center;font-size:11pt\">").concat(doc.status === 'done' ? '✓ Xong' : doc.status === 'pending' ? 'Chờ' : '—', "</td>\n            </tr>\n          ");
    }).join(''), "\n        </tbody>\n      </table>\n      <p style=\"margin-top:8pt\">T\u1ED5ng c\u1ED9ng: <strong>").concat(docs.length, "</strong> v\u0103n b\u1EA3n.</p>\n      ").concat(ND30.buildSignature({
      chucVu: 'T/M BAN CHẤP HÀNH<br>BÍ THƯ',
      hoTen: s.biThu || ''
    }), "\n    ");
  },
  // 2h. Báo cáo công tác tháng (monthly report)
  monthly: function monthly(content, title) {
    var settings = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return this.report(content, title || 'BÁO CÁO CÔNG TÁC THÁNG', settings);
  }
};

// ─────────────────────────────────────────────────────────────────────
//  3. EXPORTERS — Thực hiện xuất theo từng định dạng
// ─────────────────────────────────────────────────────────────────────

var Exporters = {
  // 3a. In / Lưu PDF (mở cửa sổ print)
  printPDF: function printPDF(bodyHtml, title) {
    var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var fullHtml = "<!DOCTYPE html>\n<html lang=\"vi\">\n<head>\n<meta charset=\"UTF-8\">\n<title>".concat(title, "</title>\n<link href=\"https://fonts.googleapis.com/css2?family=Times+New+Roman:ital,wght@0,400;0,700;1,400&display=swap\" rel=\"stylesheet\">\n<style>\n  ").concat(ND30.getDocCSS(opts.extraCss || ''), "\n  .print-watermark { display:none; }\n  @media print { .print-watermark { display:block; position:fixed; bottom:8mm; right:10mm; font-size:7pt; color:#bbb; } }\n</style>\n</head>\n<body>\n  <div style=\"max-width:170mm;margin:0 auto\">\n    ").concat(bodyHtml, "\n  </div>\n  <div class=\"print-watermark\">\u0110o\xE0nV\u0103n \u2022 In l\xFAc ").concat(new Date().toLocaleString('vi-VN'), "</div>\n  <script>\n    window.onload = function() {\n      setTimeout(function() { window.print(); }, 300);\n    };\n  </script>\n</body>\n</html>");
    var blob = new Blob([fullHtml], {
      type: 'text/html;charset=utf-8'
    });
    var url = URL.createObjectURL(blob);
    var w = window.open(url, '_blank');
    if (!w) {
      // Fallback: tải về HTML
      var a = document.createElement('a');
      a.href = url;
      a.download = ND30.sanitizeFilename(title) + '.html';
      a.click();
      if (typeof toast === 'function') toast('Đã tải xuống HTML để in (trình duyệt chặn popup)', 'info');
    }
    return true;
  },
  // 3b. Xuất DOCX (dùng thư viện docx.js)
  exportDOCX: function exportDOCX(bodyHtml, title) {
    var _arguments = arguments;
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var opts, wordHtml, blob, a;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            opts = _arguments.length > 2 && _arguments[2] !== undefined ? _arguments[2] : {};
            // Phương án 1: Dùng thư viện docx nếu có
            // Phương án 2 (luôn có): Tạo HTML/DOCX hybrid (Word mở được)
            wordHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office'\n  xmlns:w='urn:schemas-microsoft-com:office:word'\n  xmlns='http://www.w3.org/TR/REC-html40'>\n<head>\n  <meta charset=\"utf-8\">\n  <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n  <!--[if gte mso 9]><xml><w:WordDocument>\n    <w:View>Print</w:View>\n    <w:Zoom>90</w:Zoom>\n    <w:DoNotOptimizeForBrowser/>\n  </w:WordDocument></xml><![endif]-->\n  <style>\n    @page WordSection1 {\n      size: 21cm 29.7cm;\n      margin: 2.5cm 2.0cm 2.5cm 3.0cm;\n      mso-header-margin: .5cm;\n      mso-footer-margin: .5cm;\n      mso-paper-source: 0;\n    }\n    div.WordSection1 { page: WordSection1; }\n    body {\n      font-family: 'Times New Roman', serif;\n      font-size: 14pt;\n      line-height: 1.8;\n    }\n    ".concat(ND30.getDocCSS(), "\n    /* S\u1EEDa cho Word */\n    table { mso-table-layout-alt: fixed; }\n    td { mso-table-overlap: never; }\n  </style>\n</head>\n<body>\n<div class=\"WordSection1\">\n  ").concat(bodyHtml, "\n</div>\n</body>\n</html>");
            blob = new Blob(["\uFEFF" + wordHtml], {
              type: 'application/msword;charset=utf-8'
            });
            a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = ND30.sanitizeFilename(title) + '.doc';
            a.click();
            if (typeof toast === 'function') toast("\u2705 \u0110\xE3 t\u1EA3i xu\u1ED1ng \"".concat(title, ".doc\" \u2014 M\u1EDF b\u1EB1ng Microsoft Word ho\u1EB7c LibreOffice"), 'success');
            return _context.a(2, true);
        }
      }, _callee);
    }))();
  },
  // 3c. Xuất Excel / CSV
  exportExcel: function exportExcel(data, headers, sheetName, filename) {
    if (!data || !data.length) {
      if (typeof toast === 'function') toast('Không có dữ liệu để xuất', 'warning');
      return false;
    }

    // Dùng SheetJS nếu có (đã tải động trong app)
    if (typeof XLSX !== 'undefined') {
      var wsData = [headers].concat(_toConsumableArray(data));
      var ws = XLSX.utils.aoa_to_sheet(wsData);
      // Định dạng cột đầu (header)
      var range = XLSX.utils.decode_range(ws['!ref']);
      for (var c = range.s.c; c <= range.e.c; c++) {
        var cellRef = XLSX.utils.encode_cell({
          r: 0,
          c: c
        });
        if (!ws[cellRef]) continue;
        ws[cellRef].s = {
          font: {
            bold: true
          },
          fill: {
            fgColor: {
              rgb: 'E8E8E8'
            }
          },
          alignment: {
            horizontal: 'center',
            wrapText: true
          }
        };
      }
      ws['!cols'] = headers.map(function () {
        return {
          wch: 20
        };
      });
      var wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, sheetName || 'Sheet1');
      XLSX.writeFile(wb, filename + '.xlsx');
      if (typeof toast === 'function') toast("\u2705 \u0110\xE3 xu\u1EA5t ".concat(data.length, " d\xF2ng ra Excel (XLSX)!"), 'success');
      return true;
    }

    // Fallback: CSV với BOM UTF-8
    var csvRows = [headers].concat(_toConsumableArray(data)).map(function (row) {
      return row.map(function (cell) {
        var s = String(cell == null ? '' : cell);
        return /[,"\n\r]/.test(s) ? "\"".concat(s.replace(/"/g, '""'), "\"") : s;
      }).join(',');
    });
    var csv = "\uFEFF" + csvRows.join('\n');
    var blob = new Blob([csv], {
      type: 'text/csv;charset=utf-8'
    });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename + '.csv';
    a.click();
    if (typeof toast === 'function') toast("\u2705 \u0110\xE3 xu\u1EA5t ".concat(data.length, " d\xF2ng ra CSV (m\u1EDF b\u1EB1ng Excel)!"), 'success');
    return true;
  },
  // 3d. Xuất Excel danh sách đoàn viên (có cả sheet thống kê)
  exportMembersExcel: function exportMembersExcel(list, title) {
    var settings = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var s = settings;
    var partyMap = {
      utu: 'Đoàn viên ưu tú',
      dubia: 'Đảng viên dự bị',
      chinh_thuc: 'Đảng viên chính thức',
      '': 'Đoàn viên'
    };
    var statusMap = {
      active: 'Đang hoạt động',
      inactive: 'Tạm ngừng',
      graduated: 'Tốt nghiệp/Chuyển đi'
    };
    var headers = ['STT', 'Họ và tên', 'Giới tính', 'Chi đoàn', 'Chức vụ', 'Ngày sinh', 'Ngày vào Đoàn', 'Danh hiệu Đảng/Đoàn', 'Ngày kết nạp/CN', 'Số thẻ/QĐ', 'Điện thoại', 'Email', 'Trạng thái', 'Thành tích', 'Ghi chú'];
    var data = list.map(function (m, i) {
      return [i + 1, m.fullName || '', m.gender === 'female' ? 'Nữ' : 'Nam', m.chiDoan || '', m.role || 'Đoàn viên', m.birthDate ? new Date(m.birthDate).toLocaleDateString('vi-VN') : '', m.joinDate ? new Date(m.joinDate).toLocaleDateString('vi-VN') : '', partyMap[m.partyStatus || ''], m.partyDate ? new Date(m.partyDate).toLocaleDateString('vi-VN') : '', m.partyCard || '', m.phone || '', m.email || '', statusMap[m.status] || m.status || '', m.achieve || '', m.note || ''];
    });
    this.exportExcel(data, headers, 'Danh sách ĐV', ND30.sanitizeFilename(title));
  }
};

// ─────────────────────────────────────────────────────────────────────
//  4. DIALOG — Modal chọn định dạng
// ─────────────────────────────────────────────────────────────────────

// Tạo modal DOM nếu chưa có
function _ensureExportModal() {
  if (document.getElementById('dvExportModal')) return;
  var el = document.createElement('div');
  el.id = 'dvExportModal';
  el.innerHTML = "\n    <div class=\"dv-overlay\" onclick=\"DoanVanExport.closeDialog()\"></div>\n    <div class=\"dv-box\">\n      <div class=\"dv-title\"><i class=\"fas fa-file-export\" style=\"color:#c0392b\"></i> Xu\u1EA5t v\u0103n b\u1EA3n</div>\n      <div class=\"dv-sub\" id=\"dvExportSub\">Ch\u1ECDn \u0111\u1ECBnh d\u1EA1ng ph\xF9 h\u1EE3p</div>\n      <div class=\"dv-nd30-badge\">\n        <i class=\"fas fa-certificate\"></i>\n        <span>Th\u1EC3 th\u1EE9c v\u0103n b\u1EA3n theo <strong>Ngh\u1ECB \u0111\u1ECBnh 30/2020/N\u0110-CP</strong> v\xE0 quy \u0111\u1ECBnh c\u1EE7a <strong>\u0110i\u1EC1u l\u1EC7 \u0110o\xE0n, \u0110i\u1EC1u l\u1EC7 \u0110\u1EA3ng</strong></span>\n      </div>\n      <div class=\"dv-formats\" id=\"dvFormatGrid\"></div>\n      <div class=\"dv-opts\" id=\"dvExportOpts\" style=\"display:none\">\n        <div class=\"dv-opts-title\">T\xF9y ch\u1ECDn b\u1ED5 sung</div>\n        <div id=\"dvExportOptsContent\"></div>\n      </div>\n      <div class=\"dv-progress\" id=\"dvExportProgress\">\n        <div class=\"dv-spinner\"></div>\n        <span id=\"dvExportProgressMsg\">\u0110ang t\u1EA1o v\u0103n b\u1EA3n\u2026</span>\n      </div>\n      <div class=\"dv-actions\">\n        <button class=\"dv-btn dv-btn-outline\" onclick=\"DoanVanExport.closeDialog()\"><i class=\"fas fa-times\"></i> \u0110\xF3ng</button>\n        <button class=\"dv-btn dv-btn-primary\" id=\"dvExportDoBtn\" onclick=\"DoanVanExport._doExport()\">\n          <i class=\"fas fa-download\"></i> <span id=\"dvExportBtnLabel\">Xu\u1EA5t</span>\n        </button>\n      </div>\n    </div>\n  ";
  document.body.appendChild(el);
}
var FORMAT_DEFS = [{
  id: 'print',
  name: 'In / PDF',
  icon: '<i class="fas fa-print" style="color:#fff"></i>',
  color: '#c0392b',
  desc: 'Mở cửa sổ in, lưu PDF qua máy in ảo'
}, {
  id: 'word',
  name: 'Word (.doc)',
  icon: '<i class="fas fa-file-word" style="color:#fff"></i>',
  color: '#2b579a',
  desc: 'Định dạng Word, chỉnh sửa dễ dàng'
}, {
  id: 'excel',
  name: 'Excel (.xlsx)',
  icon: '<i class="fas fa-file-excel" style="color:#fff"></i>',
  color: '#217346',
  desc: 'Bảng tính Excel (chỉ dành cho danh sách)'
}, {
  id: 'csv',
  name: 'CSV / Text',
  icon: '<i class="fas fa-file-csv" style="color:#fff"></i>',
  color: '#6b7280',
  desc: 'Văn bản thuần, tương thích mọi phần mềm'
}];

// State
var _state = {
  type: null,
  data: null,
  format: 'print',
  bodyHtml: null,
  title: null
};
var DoanVanExport = {
  // ── Mở dialog
  showDialog: function showDialog(type) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _ensureExportModal();
    _state.type = type;
    _state.data = data;
    _state.format = 'print';
    _state.bodyHtml = null;
    _state.title = data.title || 'Van ban';

    // Tiêu đề mô tả
    var subtitles = {
      template: 'Xuất văn bản từ mẫu',
      report: 'Xuất báo cáo',
      members: 'Xuất danh sách đoàn viên',
      nghiquyet: 'Xuất Nghị quyết giới thiệu (Mẫu 4-KNĐ)',
      nhanxet: 'Xuất Nhận xét chuyển Đảng chính thức',
      hoatdong: 'Xuất báo cáo hoạt động đoàn viên',
      tomtat: 'Xuất tổng hợp trích yếu văn bản',
      monthly: 'Xuất báo cáo công tác tháng'
    };
    document.getElementById('dvExportSub').textContent = subtitles[type] || 'Chọn định dạng phù hợp';

    // Render format buttons — ẩn Excel nếu không phải danh sách
    var showExcel = ['members', 'hoatdong', 'tomtat'].includes(type);
    var showCsv = ['members', 'tomtat'].includes(type);
    var fmts = FORMAT_DEFS.filter(function (f) {
      if (f.id === 'excel' && !showExcel) return false;
      if (f.id === 'csv' && !showCsv) return false;
      return true;
    });
    document.getElementById('dvFormatGrid').innerHTML = fmts.map(function (f) {
      return "\n      <div class=\"dv-fmt-btn ".concat(f.id === _state.format ? 'selected' : '', "\"\n           onclick=\"DoanVanExport.selectFormat('").concat(f.id, "')\">\n        <div class=\"dv-fmt-icon\" style=\"background:").concat(f.color, "\">").concat(f.icon, "</div>\n        <div>\n          <div class=\"dv-fmt-name\">").concat(f.name, "</div>\n          <div class=\"dv-fmt-desc\">").concat(f.desc, "</div>\n        </div>\n      </div>\n    ");
    }).join('');

    // Tùy chọn bổ sung
    this._renderOpts(type, data);

    // Reset progress
    document.getElementById('dvExportProgress').classList.remove('show');
    document.getElementById('dvExportDoBtn').disabled = false;
    document.getElementById('dvExportModal').classList.add('open');
  },
  selectFormat: function selectFormat(id) {
    _state.format = id;
    // Cập nhật UI
    document.querySelectorAll('#dvExportModal .dv-fmt-btn').forEach(function (btn) {
      btn.classList.toggle('selected', btn.getAttribute('onclick').includes("'".concat(id, "'")));
    });
    var labelMap = {
      print: 'In / Lưu PDF',
      word: 'Tải xuống Word',
      excel: 'Tải xuống Excel',
      csv: 'Tải xuống CSV'
    };
    document.getElementById('dvExportBtnLabel').textContent = labelMap[id] || 'Xuất';
  },
  _renderOpts: function _renderOpts(type, data) {
    var optsEl = document.getElementById('dvExportOpts');
    var contentEl = document.getElementById('dvExportOptsContent');
    var s = typeof DB !== 'undefined' ? DB.getObj('settings') : {};
    var optsHtml = '';
    if (type === 'members') {
      optsHtml = "\n        <div class=\"dv-row\">\n          <div class=\"dv-field\">\n            <div class=\"dv-label\">Hi\u1EC3n th\u1ECB \u0111i\u1EC7n tho\u1EA1i</div>\n            <select class=\"dv-input\" id=\"dvOptPhone\">\n              <option value=\"1\">C\xF3</option>\n              <option value=\"0\">\u1EA8n (b\u1EA3o m\u1EADt)</option>\n            </select>\n          </div>\n          <div class=\"dv-field\">\n            <div class=\"dv-label\">Hi\u1EC3n th\u1ECB email</div>\n            <select class=\"dv-input\" id=\"dvOptEmail\">\n              <option value=\"0\">\u1EA8n</option>\n              <option value=\"1\">C\xF3</option>\n            </select>\n          </div>\n        </div>\n      ";
    }
    if (['nghiquyet', 'nhanxet', 'report', 'template', 'monthly'].includes(type)) {
      optsHtml = "\n        <div class=\"dv-row\">\n          <div class=\"dv-field\">\n            <div class=\"dv-label\">C\u1EE1 ch\u1EEF</div>\n            <select class=\"dv-input\" id=\"dvOptFontSize\">\n              <option value=\"13pt\">13pt (m\u1EB7c \u0111\u1ECBnh)</option>\n              <option value=\"14pt\">14pt (chu\u1EA9n N\u011030)</option>\n              <option value=\"12pt\">12pt (nh\u1ECF h\u01A1n)</option>\n            </select>\n          </div>\n          <div class=\"dv-field\">\n            <div class=\"dv-label\">Gi\xE3n d\xF2ng</div>\n            <select class=\"dv-input\" id=\"dvOptLineHeight\">\n              <option value=\"1.8\">1.8 (chu\u1EA9n N\u011030)</option>\n              <option value=\"1.5\">1.5 (c\xF4 \u0111\u1ECDng)</option>\n              <option value=\"2.0\">2.0 (r\u1ED9ng r\xE3i)</option>\n            </select>\n          </div>\n        </div>\n      ";
    }
    if (optsHtml) {
      contentEl.innerHTML = optsHtml;
      optsEl.style.display = '';
    } else {
      optsEl.style.display = 'none';
    }
  },
  _doExport: function _doExport() {
    var _this = this;
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
      var _data$filters, _data$fields, _data$fields2, _data$member;
      var type, data, fmt, s, progEl, progMsg, btn, getOpt, fontSize, lineHeight, showPhone, extraCss, bodyHtml, title, hdr, typeMap, headers, rows, _headers, _rows, blob, a, _t, _t2;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            type = _state.type;
            data = _state.data;
            fmt = _state.format;
            s = typeof DB !== 'undefined' ? DB.getObj('settings') : {}; // Show progress
            progEl = document.getElementById('dvExportProgress');
            progMsg = document.getElementById('dvExportProgressMsg');
            btn = document.getElementById('dvExportDoBtn');
            progEl.classList.add('show');
            progMsg.textContent = 'Đang chuẩn bị nội dung…';
            btn.disabled = true;
            _context2.p = 1;
            // Lấy tùy chọn
            getOpt = function getOpt(id, def) {
              var el = document.getElementById(id);
              return el ? el.value : def;
            };
            fontSize = getOpt('dvOptFontSize', '13pt');
            lineHeight = getOpt('dvOptLineHeight', '1.8');
            showPhone = getOpt('dvOptPhone', '1') === '1';
            extraCss = "body { font-size: ".concat(fontSize, "; line-height: ").concat(lineHeight, "; }"); // Tạo HTML nội dung văn bản
            bodyHtml = '';
            title = data.title || 'Van ban';
            progMsg.textContent = 'Đang tạo thể thức văn bản…';
            _context2.n = 2;
            return new Promise(function (r) {
              return setTimeout(r, 50);
            });
          case 2:
            _t = type;
            _context2.n = _t === 'template' ? 3 : _t === 'report' ? 4 : _t === 'monthly' ? 4 : _t === 'members' ? 5 : _t === 'nghiquyet' ? 6 : _t === 'nhanxet' ? 7 : _t === 'hoatdong' ? 8 : _t === 'tomtat' ? 9 : 10;
            break;
          case 3:
            bodyHtml = DocGenerators.template(data.raw, data.name, s);
            title = data.name || 'Mau van ban';
            return _context2.a(3, 11);
          case 4:
            // Nếu đã có bodyHtml được dựng sẵn thì dùng luôn
            if (data._prebuiltHtml) {
              hdr = ND30.buildHeader({
                coQuan: s.doanCapTren || 'ĐOÀN TNCS HỒ CHÍ MINH',
                coQuanCon: s.unitName || 'BCH CHI ĐOÀN',
                diaDanh: s.diaDanh || '',
                ngay: new Date().toISOString().split('T')[0],
                showQuocHieu: false
              });
              bodyHtml = hdr + data.content + ND30.buildSignature({
                chucVu: 'T/M BAN CHẤP HÀNH<br>BÍ THƯ',
                hoTen: s.biThu || ''
              });
            } else if (type === 'monthly') {
              bodyHtml = DocGenerators.monthly(data.content, data.name, s);
            } else {
              bodyHtml = DocGenerators.report(data.content, data.name, s);
            }
            title = data.name || (type === 'monthly' ? 'Bao cao cong tac thang' : 'Bao cao');
            return _context2.a(3, 11);
          case 5:
            bodyHtml = DocGenerators.members(data.list, data.filters || {}, s);
            title = "Danh sach ".concat((((_data$filters = data.filters) === null || _data$filters === void 0 ? void 0 : _data$filters.partyLabel) || 'doan vien').replace(/\s+/g, '_'));
            return _context2.a(3, 11);
          case 6:
            bodyHtml = DocGenerators.nghiquyet(data.fields, s);
            title = "NghiQuyet_".concat((((_data$fields = data.fields) === null || _data$fields === void 0 ? void 0 : _data$fields.hoTen) || '').replace(/\s+/g, '_'));
            return _context2.a(3, 11);
          case 7:
            bodyHtml = DocGenerators.nhanxet(data.fields, s);
            title = "NhanXet_".concat((((_data$fields2 = data.fields) === null || _data$fields2 === void 0 ? void 0 : _data$fields2.hoTen) || '').replace(/\s+/g, '_'));
            return _context2.a(3, 11);
          case 8:
            bodyHtml = DocGenerators.hoatdong(data.member, data.activities || [], s);
            title = "HoatDong_".concat((((_data$member = data.member) === null || _data$member === void 0 ? void 0 : _data$member.fullName) || '').replace(/\s+/g, '_'));
            return _context2.a(3, 11);
          case 9:
            bodyHtml = DocGenerators.tomtat(data.docs || [], s);
            title = "TongHopTrichYeu_".concat(new Date().toISOString().split('T')[0]);
            return _context2.a(3, 11);
          case 10:
            bodyHtml = "<p>".concat(data.content || data.raw || '(không có nội dung)', "</p>");
          case 11:
            progMsg.textContent = 'Đang xuất…';
            _context2.n = 12;
            return new Promise(function (r) {
              return setTimeout(r, 80);
            });
          case 12:
            if (!(fmt === 'print')) {
              _context2.n = 13;
              break;
            }
            Exporters.printPDF(bodyHtml, title, {
              extraCss: extraCss
            });
            _context2.n = 16;
            break;
          case 13:
            if (!(fmt === 'word')) {
              _context2.n = 15;
              break;
            }
            _context2.n = 14;
            return Exporters.exportDOCX(bodyHtml, title);
          case 14:
            _context2.n = 16;
            break;
          case 15:
            if (fmt === 'excel') {
              if (type === 'members') {
                Exporters.exportMembersExcel(data.list, title, s);
              } else if (type === 'hoatdong') {
                typeMap = {
                  hoihop: 'Hội họp',
                  tinhthuong: 'Tình thương',
                  vanhoa: 'Văn hóa',
                  theducthethao: 'TDTT',
                  khac: 'Khác'
                };
                headers = ['STT', 'Tên hoạt động', 'Thời gian', 'Địa điểm', 'Loại', 'Kết quả', 'Báo cáo'];
                rows = (data.activities || []).map(function (a, i) {
                  return [i + 1, a.name || '', a.time ? new Date(a.time).toLocaleDateString('vi-VN') : '', a.location || '', typeMap[a.type] || a.type || '', a.result || '', a.reportTarget || ''];
                });
                Exporters.exportExcel(rows, headers, 'Hoạt động', title);
              } else {
                _headers = ['STT', 'Số/Ký hiệu', 'Tiêu đề', 'Loại', 'Ngày ban hành', 'Hạn xử lý', 'Ưu tiên', 'Trạng thái', 'Tóm tắt'];
                _rows = (data.docs || []).map(function (doc, i) {
                  return [i + 1, doc.code || '', doc.title || '', doc.type || '', doc.issueDate ? new Date(doc.issueDate).toLocaleDateString('vi-VN') : '', doc.deadline ? new Date(doc.deadline).toLocaleDateString('vi-VN') : '', doc.priority || '', doc.status || '', (doc.summary || '').substring(0, 200)];
                });
                Exporters.exportExcel(_rows, _headers, 'Văn bản', title);
              }
            } else if (fmt === 'csv') {
              if (type === 'members') {
                Exporters.exportMembersExcel(data.list, title, s); // sẽ fallback CSV nếu XLSX chưa tải
              } else {
                blob = new Blob(["\uFEFF" + bodyHtml.replace(/<[^>]+>/g, '')], {
                  type: 'text/plain;charset=utf-8'
                });
                a = document.createElement('a');
                a.href = URL.createObjectURL(blob);
                a.download = ND30.sanitizeFilename(title) + '.txt';
                a.click();
                if (typeof toast === 'function') toast('✅ Đã tải xuống file văn bản thuần (TXT)', 'success');
              }
            }
          case 16:
            _this.closeDialog();
            _context2.n = 18;
            break;
          case 17:
            _context2.p = 17;
            _t2 = _context2.v;
            console.error('[DoanVanExport]', _t2);
            progMsg.textContent = 'Lỗi: ' + _t2.message;
            btn.disabled = false;
          case 18:
            _context2.p = 18;
            progEl.classList.remove('show');
            btn.disabled = false;
            return _context2.f(18);
          case 19:
            return _context2.a(2);
        }
      }, _callee2, null, [[1, 17, 18, 19]]);
    }))();
  },
  closeDialog: function closeDialog() {
    var el = document.getElementById('dvExportModal');
    if (el) el.classList.remove('open');
  }
};

// ─────────────────────────────────────────────────────────────────────
//  5. PATCHES — Ghi đè hàm cũ, gọi dialog mới
// ─────────────────────────────────────────────────────────────────────

// Patch: printTemplate()
window.printTemplate = function () {
  var raw = window._currentTplRaw || '';
  var name = window._currentTplName || 'Văn bản';
  if (!raw) {
    if (typeof toast === 'function') toast('Chưa có nội dung để xuất', 'warning');
    return;
  }
  DoanVanExport.showDialog('template', {
    raw: raw,
    name: name,
    title: name
  });
};

// Patch: printReport()
window.printReport = function () {
  var _document$getElementB, _document$getElementB2, _document$getElementB3;
  var content = ((_document$getElementB = document.getElementById('rpResult')) === null || _document$getElementB === void 0 ? void 0 : _document$getElementB.value) || ((_document$getElementB2 = document.getElementById('reportContent')) === null || _document$getElementB2 === void 0 ? void 0 : _document$getElementB2.value) || ((_document$getElementB3 = document.getElementById('aiResult')) === null || _document$getElementB3 === void 0 ? void 0 : _document$getElementB3.value) || '';
  var titleEl = document.getElementById('rpTitle') || document.getElementById('reportTitle');
  var name = (titleEl === null || titleEl === void 0 ? void 0 : titleEl.value) || 'Báo cáo';
  if (!content) {
    if (typeof toast === 'function') toast('Chưa có nội dung để in', 'warning');
    return;
  }
  DoanVanExport.showDialog('report', {
    content: content,
    name: name,
    title: name
  });
};

// Patch: printMonthlyReport()
window.printMonthlyReport = function () {
  // Thu thập nội dung từ các field báo cáo tháng
  var sections = ['Tình hình chung', 'Kết quả thực hiện', 'Tồn tại hạn chế', 'Phương hướng tháng tới'];
  var content = '';
  var fieldIds = ['rpMonthSummary', 'rpMonthResult', 'rpMonthIssue', 'rpMonthPlan'];
  fieldIds.forEach(function (id, i) {
    var el = document.getElementById(id);
    if (el && el.value.trim()) {
      content += "\n".concat(i + 1, ". ").concat(sections[i].toUpperCase(), "\n").concat(el.value.trim(), "\n");
    }
  });
  // Fallback: lấy tất cả textarea gần khu vực báo cáo tháng
  if (!content) {
    var page = document.getElementById('page-reports') || document.getElementById('page-report');
    if (page) {
      page.querySelectorAll('textarea').forEach(function (ta) {
        if (ta.value.trim()) content += ta.value.trim() + '\n\n';
      });
    }
  }
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();
  var name = "B\xE1o c\xE1o c\xF4ng t\xE1c \u0110o\xE0n th\xE1ng ".concat(month, " n\u0103m ").concat(year);
  DoanVanExport.showDialog('monthly', {
    content: content || '(Chưa có nội dung)',
    name: name
  });
};

// Patch: printActivitySummary()
window.printActivitySummary = function () {
  var _document$getElementB4, _document$getElementB5, _document$getElementB6;
  var content = ((_document$getElementB4 = document.getElementById('activitySummary')) === null || _document$getElementB4 === void 0 ? void 0 : _document$getElementB4.textContent) || ((_document$getElementB5 = document.getElementById('actSummaryResult')) === null || _document$getElementB5 === void 0 ? void 0 : _document$getElementB5.value) || ((_document$getElementB6 = document.getElementById('aiResult')) === null || _document$getElementB6 === void 0 ? void 0 : _document$getElementB6.value) || '';
  DoanVanExport.showDialog('report', {
    content: content || '(Chưa có nội dung tổng kết hoạt động)',
    name: 'Tổng kết hoạt động Đoàn'
  });
};

// Patch: exportSummary()
window.exportSummary = function () {
  var docs = typeof DB !== 'undefined' ? DB.get('docs') : [];
  if (!docs.length) {
    if (typeof toast === 'function') toast('Chưa có văn bản để xuất', 'warning');
    return;
  }
  DoanVanExport.showDialog('tomtat', {
    docs: docs,
    title: 'Tổng hợp trích yếu văn bản'
  });
};

// Patch: exportActivityReport()
window.exportActivityReport = function () {
  var _document$getElementB7, _DB$get$;
  var id = ((_document$getElementB7 = document.getElementById('actionMemberId')) === null || _document$getElementB7 === void 0 ? void 0 : _document$getElementB7.value) || (typeof DB !== 'undefined' ? (_DB$get$ = DB.get('membersList')[0]) === null || _DB$get$ === void 0 ? void 0 : _DB$get$.id : null);
  if (!id) return;
  var member = typeof DB !== 'undefined' ? DB.get('membersList').find(function (x) {
    return String(x.id) === String(id);
  }) : null;
  var activities = typeof DB !== 'undefined' ? DB.get('memberActivities').filter(function (a) {
    return String(a.memberId) === String(id);
  }) : [];
  if (!activities.length) {
    if (typeof toast === 'function') toast('Chưa có hoạt động nào để xuất', 'warning');
    return;
  }
  DoanVanExport.showDialog('hoatdong', {
    member: member,
    activities: activities,
    title: "Ho\u1EA1t \u0111\u1ED9ng_".concat((member === null || member === void 0 ? void 0 : member.fullName) || '')
  });
};

// Patch: doExportMembers()
window.doExportMembers = function () {
  var _document$getElementB8, _document$getElementB9, _document$getElementB0, _document$getElementB1;
  var list = typeof DB !== 'undefined' ? DB.get('membersList') : [];
  var partyF = ((_document$getElementB8 = document.getElementById('exportPartyFilter')) === null || _document$getElementB8 === void 0 ? void 0 : _document$getElementB8.value) || '';
  var statusF = ((_document$getElementB9 = document.getElementById('exportStatusFilter')) === null || _document$getElementB9 === void 0 ? void 0 : _document$getElementB9.value) || '';
  var chiDoanF = ((_document$getElementB0 = document.getElementById('exportChiDoanFilter')) === null || _document$getElementB0 === void 0 ? void 0 : _document$getElementB0.value) || '';
  var fmt = ((_document$getElementB1 = document.getElementById('exportFormat')) === null || _document$getElementB1 === void 0 ? void 0 : _document$getElementB1.value) || 'print';
  if (partyF === 'dang_vien') list = list.filter(function (m) {
    return m.partyStatus === 'dubia' || m.partyStatus === 'chinh_thuc';
  });else if (partyF) list = list.filter(function (m) {
    return m.partyStatus === partyF;
  });
  if (statusF) list = list.filter(function (m) {
    return m.status === statusF;
  });
  if (chiDoanF) list = list.filter(function (m) {
    return m.chiDoan === chiDoanF;
  });
  if (!list.length) {
    if (typeof toast === 'function') toast('Không có đoàn viên phù hợp điều kiện', 'warning');
    return;
  }
  var partyFilterLabel = {
    all: 'Tất cả',
    utu: 'Đoàn viên ưu tú',
    dubia: 'Đảng viên dự bị',
    chinh_thuc: 'Đảng viên chính thức',
    dang_vien: 'Đảng viên (tất cả)'
  }[partyF] || 'Tất cả';
  var statusLabel = {
    active: 'Đang hoạt động',
    inactive: 'Tạm ngừng',
    graduated: 'Đã tốt nghiệp',
    '': 'Tất cả'
  }[statusF] || 'Tất cả';

  // Nếu chọn CSV trong modal cũ → gọi Exporters.exportMembersExcel (CSV fallback)
  if (fmt === 'csv') {
    Exporters.exportMembersExcel(list, "DanhSach_".concat(partyFilterLabel.replace(/\s/g, '_')), typeof DB !== 'undefined' ? DB.getObj('settings') : {});
    if (typeof closeModal === 'function') closeModal('exportMembersModal');
    return;
  }
  if (typeof closeModal === 'function') closeModal('exportMembersModal');
  DoanVanExport.showDialog('members', {
    list: list,
    filters: {
      partyLabel: partyFilterLabel,
      chiDoan: chiDoanF,
      statusLabel: statusLabel
    },
    title: "Danh sach ".concat(partyFilterLabel.replace(/\s+/g, '_'))
  });
};

// Patch: generateNghiQuyet() / previewNghiQuyet()
window._dvPatchNghiQuyet = function () {
  var _document$getElementB10;
  var exportBtn = document.getElementById('docPreviewExportBtn');
  if (!exportBtn) return;
  // Kiểm tra nếu đang hiển thị nghị quyết
  var title = ((_document$getElementB10 = document.getElementById('docPreviewTitle')) === null || _document$getElementB10 === void 0 ? void 0 : _document$getElementB10.textContent) || '';
  if (title.toLowerCase().includes('nghị quyết') || title.toLowerCase().includes('nghi quyet')) {
    exportBtn.innerHTML = '<i class="fas fa-file-export"></i> Xuất văn bản';
    exportBtn.onclick = function () {
      var _document$getElementB11, _document$getElementB12, _document$getElementB13, _document$getElementB14, _document$getElementB15, _document$getElementB16, _document$getElementB17, _document$getElementB18, _document$getElementB19, _document$getElementB20, _document$getElementB21, _document$getElementB22, _document$getElementB23, _document$getElementB24, _document$getElementB25, _document$getElementB26;
      var fields = {
        hoTen: (_document$getElementB11 = document.getElementById('nqHoTen')) === null || _document$getElementB11 === void 0 ? void 0 : _document$getElementB11.value,
        namSinh: (_document$getElementB12 = document.getElementById('nqNamSinh')) === null || _document$getElementB12 === void 0 ? void 0 : _document$getElementB12.value,
        ngayKy: (_document$getElementB13 = document.getElementById('nqNgayKy')) === null || _document$getElementB13 === void 0 ? void 0 : _document$getElementB13.value,
        doanCapTren: (_document$getElementB14 = document.getElementById('nqDoanCapTren')) === null || _document$getElementB14 === void 0 ? void 0 : _document$getElementB14.value,
        bchCDCS: (_document$getElementB15 = document.getElementById('nqBCHCDCS')) === null || _document$getElementB15 === void 0 ? void 0 : _document$getElementB15.value,
        diaDanh: (_document$getElementB16 = document.getElementById('nqDiaDanh')) === null || _document$getElementB16 === void 0 ? void 0 : _document$getElementB16.value,
        biThu: (_document$getElementB17 = document.getElementById('nqBiThu')) === null || _document$getElementB17 === void 0 ? void 0 : _document$getElementB17.value,
        soNghiQuyet: (_document$getElementB18 = document.getElementById('nqSoNghiQuyet')) === null || _document$getElementB18 === void 0 ? void 0 : _document$getElementB18.value,
        chiUy: (_document$getElementB19 = document.getElementById('nqChiUy')) === null || _document$getElementB19 === void 0 ? void 0 : _document$getElementB19.value,
        dangUy: (_document$getElementB20 = document.getElementById('nqDangUy')) === null || _document$getElementB20 === void 0 ? void 0 : _document$getElementB20.value,
        uuDiemCT: (_document$getElementB21 = document.getElementById('nqUuDiemCT')) === null || _document$getElementB21 === void 0 ? void 0 : _document$getElementB21.value,
        uuDiemCM: (_document$getElementB22 = document.getElementById('nqUuDiemCM')) === null || _document$getElementB22 === void 0 ? void 0 : _document$getElementB22.value,
        uuDiemDoan: (_document$getElementB23 = document.getElementById('nqUuDiemDoan')) === null || _document$getElementB23 === void 0 ? void 0 : _document$getElementB23.value,
        khuyetDiem: (_document$getElementB24 = document.getElementById('nqKhuyetDiem')) === null || _document$getElementB24 === void 0 ? void 0 : _document$getElementB24.value,
        tanThanh: (_document$getElementB25 = document.getElementById('nqTanThanh')) === null || _document$getElementB25 === void 0 ? void 0 : _document$getElementB25.value,
        khongTanThanh: (_document$getElementB26 = document.getElementById('nqKhongTanThanh')) === null || _document$getElementB26 === void 0 ? void 0 : _document$getElementB26.value
      };
      DoanVanExport.showDialog('nghiquyet', {
        fields: fields
      });
    };
  } else if (title.toLowerCase().includes('nhận xét') || title.toLowerCase().includes('nhan xet')) {
    exportBtn.innerHTML = '<i class="fas fa-file-export"></i> Xuất văn bản';
    exportBtn.onclick = function () {
      var _document$getElementB27, _document$getElementB28, _document$getElementB29, _document$getElementB30, _document$getElementB31, _document$getElementB32, _document$getElementB33, _document$getElementB34, _document$getElementB35, _document$getElementB36, _document$getElementB37, _document$getElementB38, _document$getElementB39, _document$getElementB40, _document$getElementB41, _document$getElementB42;
      var fields = {
        hoTen: (_document$getElementB27 = document.getElementById('nxHoTen')) === null || _document$getElementB27 === void 0 ? void 0 : _document$getElementB27.value,
        ngaySinh: (_document$getElementB28 = document.getElementById('nxNgaySinh')) === null || _document$getElementB28 === void 0 ? void 0 : _document$getElementB28.value,
        ngayKy: (_document$getElementB29 = document.getElementById('nxNgayKy')) === null || _document$getElementB29 === void 0 ? void 0 : _document$getElementB29.value,
        doanCapTren: (_document$getElementB30 = document.getElementById('nxDoanCapTren')) === null || _document$getElementB30 === void 0 ? void 0 : _document$getElementB30.value,
        bchCDCS: (_document$getElementB31 = document.getElementById('nxBCHCDCS')) === null || _document$getElementB31 === void 0 ? void 0 : _document$getElementB31.value,
        chiBo: (_document$getElementB32 = document.getElementById('nxChiBo')) === null || _document$getElementB32 === void 0 ? void 0 : _document$getElementB32.value,
        diaDanh: (_document$getElementB33 = document.getElementById('nxDiaDanh')) === null || _document$getElementB33 === void 0 ? void 0 : _document$getElementB33.value,
        biThu: (_document$getElementB34 = document.getElementById('nxBiThu')) === null || _document$getElementB34 === void 0 ? void 0 : _document$getElementB34.value,
        dangUy: (_document$getElementB35 = document.getElementById('nxDangUy')) === null || _document$getElementB35 === void 0 ? void 0 : _document$getElementB35.value,
        nxCT: (_document$getElementB36 = document.getElementById('nxCT')) === null || _document$getElementB36 === void 0 ? void 0 : _document$getElementB36.value,
        nxDD: (_document$getElementB37 = document.getElementById('nxDD')) === null || _document$getElementB37 === void 0 ? void 0 : _document$getElementB37.value,
        nxNL: (_document$getElementB38 = document.getElementById('nxNL')) === null || _document$getElementB38 === void 0 ? void 0 : _document$getElementB38.value,
        nxQC: (_document$getElementB39 = document.getElementById('nxQC')) === null || _document$getElementB39 === void 0 ? void 0 : _document$getElementB39.value,
        nxNV: (_document$getElementB40 = document.getElementById('nxNV')) === null || _document$getElementB40 === void 0 ? void 0 : _document$getElementB40.value,
        tanThanh: (_document$getElementB41 = document.getElementById('nxTanThanh')) === null || _document$getElementB41 === void 0 ? void 0 : _document$getElementB41.value,
        khongTanThanh: (_document$getElementB42 = document.getElementById('nxKhongTanThanh')) === null || _document$getElementB42 === void 0 ? void 0 : _document$getElementB42.value
      };
      DoanVanExport.showDialog('nhanxet', {
        fields: fields
      });
    };
  }
};

// Hook vào openModal để patch docPreviewExportBtn
var _origOpenModal = window.openModal;
window.openModal = function (id) {
  if (typeof _origOpenModal === 'function') _origOpenModal(id);
  if (id === 'docPreviewModal') {
    setTimeout(window._dvPatchNghiQuyet, 50);
  }
};

// ─────────────────────────────────────────────────────────────────────
//  6. Thêm nút "Xuất văn bản" vào các nơi chỉ có nút In đơn giản
//     (nâng cấp UX: hiển thị dropdown format)
// ─────────────────────────────────────────────────────────────────────

function _patchPrintButtons() {
  // Nút In báo cáo (topbar của trang báo cáo)
  document.querySelectorAll('[onclick="printReport()"]').forEach(function (btn) {
    btn.innerHTML = '<i class="fas fa-file-export"></i> Xuất báo cáo';
    btn.title = 'Xuất ra Word, PDF, in…';
  });
  // Nút In báo cáo tháng
  document.querySelectorAll('[onclick="printMonthlyReport()"]').forEach(function (btn) {
    btn.innerHTML = '<i class="fas fa-file-export"></i> Xuất';
    btn.title = 'Xuất ra Word, PDF, in…';
  });
  // Nút In tổng kết hoạt động
  document.querySelectorAll('[onclick="printActivitySummary()"]').forEach(function (btn) {
    btn.innerHTML = '<i class="fas fa-file-export"></i> Xuất';
  });
  // Nút In / Tải xuống template
  document.querySelectorAll('[onclick="printTemplate()"]').forEach(function (btn) {
    btn.innerHTML = '<i class="fas fa-file-export"></i> Xuất văn bản';
    btn.title = 'Xuất ra Word, PDF, in theo chuẩn NĐ30…';
  });
  // Nút Xuất báo cáo tổng hợp
  document.querySelectorAll('[onclick="exportSummary()"]').forEach(function (btn) {
    btn.innerHTML = '<i class="fas fa-file-export"></i> Xuất tổng hợp';
  });
}

// Chạy patch sau khi DOM sẵn sàng
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', _patchPrintButtons);
} else {
  setTimeout(_patchPrintButtons, 300);
}

// Public API
window.DoanVanExport = DoanVanExport;
window.ND30 = ND30;
window.DocGenerators = DocGenerators;
window.Exporters = Exporters;
console.log('[ĐoànVăn Export Module v2.0] Loaded — Hỗ trợ: Print/PDF · Word · Excel · CSV — Chuẩn NĐ30/2020/NĐ-CP');
