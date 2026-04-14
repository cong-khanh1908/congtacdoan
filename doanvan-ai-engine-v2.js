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
  const TYPE_MAP = [
    { type: 'chi-thi',    patterns: [/chỉ\s*thị/i, /CHỈ THỊ/] },
    { type: 'nghi-quyet', patterns: [/nghị\s*quyết/i, /NGHỊ QUYẾT/] },
    { type: 'ke-hoach',   patterns: [/kế\s*hoạch/i, /KẾ HOẠCH/] },
    { type: 'bao-cao',    patterns: [/báo\s*cáo/i, /BÁO CÁO/] },
    { type: 'cong-van',   patterns: [/công\s*văn/i, /CÔNG VĂN/] },
    { type: 'thong-bao',  patterns: [/thông\s*báo/i, /THÔNG BÁO/] },
    { type: 'to-trinh',   patterns: [/tờ\s*trình/i, /TỜ TRÌNH/] },
    { type: 'bien-ban',   patterns: [/biên\s*bản/i, /BIÊN BẢN/] },
    { type: 'quyet-dinh', patterns: [/quyết\s*định/i, /QUYẾT ĐỊNH/] },
    { type: 'huong-dan',  patterns: [/hướng\s*dẫn/i, /HƯỚNG DẪN/] },
    { type: 'dieu-le',    patterns: [/điều\s*lệ/i, /ĐIỀU LỆ/] },
    { type: 'chuong-trinh', patterns: [/chương\s*trình/i, /CHƯƠNG TRÌNH/] },
  ];

  // ── Regex số/ký hiệu văn bản (chuẩn NĐ30/2020/NĐ-CP) ────────────────────
  // Các dạng: 56/KH-ĐTN | 54-CV/ĐTN | 01/2026/QĐ-UBND | 123/TB-BTV | v.v
  const CODE_PATTERNS = [
    // Dạng đầy đủ: SỐ/LOẠI-ĐƠN_VỊ hoặc SỐ-LOẠI/ĐƠN_VỊ
    /(?:Số|số|SỐ)[:\s]*(\d{1,4}[-\/]\s*[A-ZĐÀÁẢÃẠĂẮẶẲẴẰÂẤẦẨẪẬÊẾỀỆỂỄÔỐỒỔỖỘƯỨỪỬỮỰĐ]{1,10}[-\/][A-ZĐÀÁẢÃẠĂẮẶẲẴẰÂẤẦẨẪẬÊẾỀỆỂỄÔỐỒỔỖỘƯỨỪỬỮỰĐ]{1,15})/iu,
    // Dạng tiêu đề văn bản: số đứng đầu dòng
    /^(\d{1,4}[-\/][A-ZĐÀÁẢÃẠĂẮẶẲẴẰÂẤẦẨẪẬÊẾỀỆỂỄÔỐỒỔỖỘƯỨỪỬỮỰĐ]{1,10}[-\/][A-ZĐÀÁẢÃẠĂẮẶẲẴẰÂẤẦẨẪẬÊẾỀỆỂỄÔỐỒỔỖỘƯỨỪỬỮỰĐ]{1,15})\s/imu,
    // Sau chữ "V/v" hoặc tiêu đề thường thấy số đứng trước
    /\b(\d{1,4}[-\/][A-ZĐÀÁẢÃẠĂẮẶẲẴẰÂẤẦẨẪẬÊẾỀỆỂỄÔỐỒỔỖỘƯỨỪỬỮỰĐ]{2,10}[-\/][A-ZĐÀÁẢÃẠĂẮẶẲẴẰÂẤẦẨẪẬÊẾỀỆỂỄÔỐỒỔỖỘƯỨỪỬỮỰĐ]{2,15})\b/iu,
    // Dạng đơn giản: SỐ/KÝ-HIỆU (ít nhất 2 ký tự sau gạch)
    /(?:số|Số)\s*[:.]?\s*(\d{1,4}[\/\-]\w{2,20})/iu,
  ];

  // ── Regex ngày tháng (nhiều dạng viết phổ biến trong VB HC VN) ───────────
  const DATE_PATTERNS = [
    // ngày DD tháng MM năm YYYY
    /ngày\s+(\d{1,2})\s+tháng\s+(\d{1,2})\s+năm\s+(\d{4})/gi,
    // DD/MM/YYYY hoặc DD-MM-YYYY
    /\b(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})\b/g,
    // YYYY-MM-DD (ISO)
    /\b(\d{4})-(\d{2})-(\d{2})\b/g,
    // ngày DD/MM/YYYY
    /ngày\s+(\d{1,2})\/(\d{1,2})\/(\d{4})/gi,
  ];

  // ── Regex hạn xử lý / hạn hoàn thành ─────────────────────────────────────
  const DEADLINE_CONTEXT_PATTERNS = [
    /(?:hạn\s+(?:chót|cuối|hoàn\s+thành|nộp|xử\s+lý|báo\s+cáo|gửi|trả\s+lời|thực\s+hiện|đăng\s+ký))[:\s,]+(?:trước\s+ngày\s+|ngày\s+)?(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4}|\d{1,2}\s+tháng\s+\d{1,2}\s+năm\s+\d{4})/gi,
    /(?:trước\s+ngày\s+|chậm\s+nhất\s+(?:vào\s+)?ngày\s+|trước\s+ngày\s+|deadline[:\s]+)(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4}|\d{1,2}\s+tháng\s+\d{1,2}\s+năm\s+\d{4})/gi,
    /(?:hoàn\s+thành|hoàn\s+trả|kết\s+thúc|nộp\s+kết\s+quả)[^.]{0,30}(?:trước\s+ngày\s+|ngày\s+)(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4}|\d{1,2}\s+tháng\s+\d{1,2}\s+năm\s+\d{4})/gi,
    /(?:thời\s+hạn|hạn\s+nộp)[:\s]+(?:đến\s+ngày\s+)?(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4}|\d{1,2}\s+tháng\s+\d{1,2}\s+năm\s+\d{4})/gi,
    // "báo cáo kết quả về ... trước ngày ..."
    /báo\s+cáo\s+(?:kết\s+quả|về)[^.]{0,60}(?:ngày\s+)(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4}|\d{1,2}\s+tháng\s+\d{1,2}\s+năm\s+\d{4})/gi,
  ];

  // ── Tiện ích parse ngày về YYYY-MM-DD ─────────────────────────────────────
  function parseDate(raw) {
    if (!raw) return '';
    raw = raw.trim();

    // Dạng: DD tháng MM năm YYYY
    let m = raw.match(/(\d{1,2})\s+tháng\s+(\d{1,2})\s+năm\s+(\d{4})/i);
    if (m) {
      const [, d, mo, y] = m;
      return `${y}-${mo.padStart(2,'0')}-${d.padStart(2,'0')}`;
    }

    // Dạng: DD/MM/YYYY hoặc DD-MM-YYYY
    m = raw.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
    if (m) {
      const [, d, mo, y] = m;
      return `${y}-${mo.padStart(2,'0')}-${d.padStart(2,'0')}`;
    }

    // Dạng ISO: YYYY-MM-DD
    m = raw.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (m) return raw;

    return '';
  }

  // ── Trích xuất số/ký hiệu văn bản ─────────────────────────────────────────
  function extractCode(text) {
    for (const pattern of CODE_PATTERNS) {
      const m = text.match(pattern);
      if (m && m[1]) {
        // Làm sạch: bỏ khoảng trắng thừa trong ký hiệu
        return m[1].replace(/\s+/g, '').trim();
      }
    }
    return '';
  }

  // ── Trích xuất ngày ban hành ───────────────────────────────────────────────
  function extractIssueDate(text) {
    // Tìm ngày gần "ban hành", "ký ngày", hoặc ngày ở cuối văn bản (dòng địa danh)
    const issuePats = [
      /(?:ban\s+hành|ký\s+ngày|ngày\s+ký|lập\s+ngày)[^,.\n]*ngày\s+(\d{1,2}\s+tháng\s+\d{1,2}\s+năm\s+\d{4})/gi,
      /,\s*ngày\s+(\d{1,2})\s+tháng\s+(\d{1,2})\s+năm\s+(\d{4})/gi,
    ];

    for (const pat of issuePats) {
      pat.lastIndex = 0;
      const m = pat.exec(text);
      if (m) {
        if (m[3]) {
          // Nhóm d, mo, y riêng
          return `${m[3]}-${m[2].padStart(2,'0')}-${m[1].padStart(2,'0')}`;
        }
        if (m[1]) return parseDate(m[1]);
      }
    }

    // Fallback: tìm ngày đầu tiên trong văn bản
    const allDates = extractAllDates(text);
    return allDates.length ? allDates[0] : '';
  }

  // ── Trích xuất tất cả ngày trong văn bản ──────────────────────────────────
  function extractAllDates(text) {
    const results = [];
    const seen = new Set();

    // Dạng "ngày DD tháng MM năm YYYY"
    const pat1 = /ngày\s+(\d{1,2})\s+tháng\s+(\d{1,2})\s+năm\s+(\d{4})/gi;
    let m;
    while ((m = pat1.exec(text)) !== null) {
      const iso = `${m[3]}-${m[2].padStart(2,'0')}-${m[1].padStart(2,'0')}`;
      if (!seen.has(iso)) { seen.add(iso); results.push(iso); }
    }

    // Dạng DD/MM/YYYY
    const pat2 = /\b(\d{1,2})\/(\d{1,2})\/(\d{4})\b/g;
    while ((m = pat2.exec(text)) !== null) {
      const d = m[1], mo = m[2], y = m[3];
      if (parseInt(mo) <= 12 && parseInt(d) <= 31) {
        const iso = `${y}-${mo.padStart(2,'0')}-${d.padStart(2,'0')}`;
        if (!seen.has(iso)) { seen.add(iso); results.push(iso); }
      }
    }

    return results.sort();
  }

  // ── Trích xuất hạn hoàn thành / hạn xử lý ────────────────────────────────
  function extractDeadline(text) {
    for (const pat of DEADLINE_CONTEXT_PATTERNS) {
      pat.lastIndex = 0;
      const m = pat.exec(text);
      if (m && m[1]) {
        const d = parseDate(m[1]);
        if (d) return d;
      }
    }

    // Fallback nâng cao: tìm ngày đi kèm từ khoá "hạn"
    const fallback = /(?:hạn|trước ngày|chậm nhất)[^.\n]{0,50}(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4})/gi;
    fallback.lastIndex = 0;
    const m = fallback.exec(text);
    if (m && m[1]) return parseDate(m[1]);

    return '';
  }

  // ── Trích xuất ngày báo cáo kết quả ──────────────────────────────────────
  function extractReportDate(text) {
    const pats = [
      /(?:báo\s+cáo\s+kết\s+quả|gửi\s+kết\s+quả|nộp\s+báo\s+cáo)[^.\n]{0,60}ngày\s+(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4}|\d{1,2}\s+tháng\s+\d{1,2}\s+năm\s+\d{4})/gi,
      /(?:báo\s+cáo)[^.\n]{0,40}(?:trước\s+ngày|vào\s+ngày)\s+(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4}|\d{1,2}\s+tháng\s+\d{1,2}\s+năm\s+\d{4})/gi,
    ];
    for (const p of pats) {
      p.lastIndex = 0;
      const m = p.exec(text);
      if (m && m[1]) {
        const d = parseDate(m[1]);
        if (d) return d;
      }
    }
    return '';
  }

  // ── Trích xuất cơ quan ban hành ───────────────────────────────────────────
  function extractIssuer(text) {
    // Tìm dòng đầu văn bản hoặc sau tiêu đề cơ quan
    const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
    const issuerPats = [
      /^((?:ĐOÀN|BAN|UBND|TỈNH|THÀNH PHỐ|HỘI|BCH|BTV|BAN CHẤP HÀNH|UỶ BAN).{3,80})/i,
      /(?:cơ\s+quan|đơn\s+vị)\s+(?:ban\s+hành|phát\s+hành)[:\s]+(.{5,80})/i,
    ];

    for (const line of lines.slice(0, 15)) {
      for (const pat of issuerPats) {
        const m = line.match(pat);
        if (m && m[1] && m[1].length > 5) return m[1].trim();
      }
    }

    // Fallback: dòng thứ 2-4 thường là tên cơ quan
    for (const line of lines.slice(1, 5)) {
      if (line.length > 10 && line.length < 120 &&
          !line.match(/^\d/) && !line.match(/^V\/v/i) &&
          line === line.toUpperCase()) {
        return line;
      }
    }

    return '';
  }

  // ── Trích xuất người ký / chức vụ ─────────────────────────────────────────
  function extractSigner(text) {
    const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
    const reversed = [...lines].reverse();

    const titlePats = [
      /^((?:bí\s+thư|phó\s+bí\s+thư|chủ\s+tịch|phó\s+chủ\s+tịch|thủ\s+trưởng|giám\s+đốc|trưởng\s+ban).{0,50})$/i,
      /^(T\/M\s+.{5,80})$/i,
    ];

    for (const line of reversed.slice(0, 20)) {
      for (const pat of titlePats) {
        if (pat.test(line)) return line;
      }
    }
    return '';
  }

  // ── Trích xuất địa danh ký ────────────────────────────────────────────────
  function extractSignLocation(text) {
    const m = text.match(/^\s*(.{3,40}),\s*ngày\s+\d{1,2}\s+tháng/mi);
    if (m && m[1]) return m[1].trim();
    return '';
  }

  // ── Phân loại mức độ ưu tiên ──────────────────────────────────────────────
  function detectPriority(text) {
    const t = text.toLowerCase();
    if (/khẩn|thượng\s+khẩn|hỏa\s+tốc|urgent|gấp|ngay\s+lập\s+tức/.test(t)) return 'high';
    if (/quan\s+trọng|lưu\s+ý|chú\s+ý|cần\s+thiết|đặc\s+biệt/.test(t)) return 'med';
    return 'low';
  }

  // ── Trích xuất từ khoá chính ──────────────────────────────────────────────
  function extractKeywords(text) {
    const kws = new Set();
    const patterns = [
      /(?:triển\s+khai|tổ\s+chức|thực\s+hiện|xây\s+dựng|phát\s+động)\s+(.{5,40}?)(?:\.|,|\n)/gi,
      /(?:cuộc\s+thi|hội\s+thi|phong\s+trào|chương\s+trình|dự\s+án|đề\s+án)\s+(.{5,60}?)(?:\.|,|\n)/gi,
    ];
    for (const pat of patterns) {
      pat.lastIndex = 0;
      let m;
      while ((m = pat.exec(text)) !== null && kws.size < 8) {
        const kw = m[1].trim().replace(/^["']|["']$/g, '');
        if (kw.length > 4 && kw.length < 60) kws.add(kw);
      }
    }
    return [...kws].slice(0, 6);
  }

  // ── Trích xuất đầu việc / công việc cụ thể ────────────────────────────────
  function extractTasks(text) {
    const tasks = [];
    const lines = text.split('\n').map(l => l.trim()).filter(Boolean);

    const taskPat = /^(?:\d+[.)]\s*|[•\-–]\s*|[a-z][.)]\s*)(.{10,120})$/;
    for (const line of lines) {
      const m = line.match(taskPat);
      if (m && m[1]) {
        const task = m[1].trim();
        if (!task.match(/^(?:Điều|Khoản|Mục)\s+\d/)) {
          tasks.push(task);
        }
        if (tasks.length >= 8) break;
      }
    }

    return tasks;
  }

  // ── Trích xuất đơn vị/cá nhân thực hiện ──────────────────────────────────
  function extractRecipients(text) {
    const recipients = [];
    const pats = [
      /(?:yêu\s+cầu|đề\s+nghị|giao\s+cho|giao)\s+((?:[A-ZĐÀÁẢÃẠĂẮẶẲẴẰÂẤẦẨẪẬÊẾỀỆỂỄÔỐỒỔỖỘƯỨỪỬỮỰĐ][^\n,;.]{3,60})(?:[,;]\s*(?:[A-ZĐÀÁẢÃẠĂẮẶẲẴẰÂẤẦẨẪẬÊẾỀỆỂỄÔỐỒỔỖỘƯỨỪỬỮỰĐ][^\n,;.]{3,60})){0,4})/gi,
      /(?:kính\s+gửi|gửi)[:\s]+(.{5,200}?)(?:\n\n|\n(?=[A-ZĐÀÁẢÃẠĂẮẶẲẴẰÂẤẦẨẪẬÊẾỀỆỂỄÔỐỒỔỖỘƯỨỪỬỮỰĐ]))/gi,
    ];
    for (const pat of pats) {
      pat.lastIndex = 0;
      const m = pat.exec(text);
      if (m && m[1]) {
        recipients.push(...m[1].split(/[,;]\s*/).map(r => r.trim()).filter(r => r.length > 3));
        if (recipients.length >= 5) break;
      }
    }
    return [...new Set(recipients)].slice(0, 5);
  }

  // ── Hàm chính: phân tích văn bản offline ──────────────────────────────────
  function analyzeDocumentOffline(text, filename = '') {
    if (!text) return {};

    // Chuẩn hóa text: normalize whitespace nhưng giữ newline
    const normalized = text.replace(/\r\n/g, '\n').replace(/\t/g, ' ');

    // 1. Loại văn bản
    let type = 'khac';
    for (const { type: t, patterns } of TYPE_MAP) {
      if (patterns.some(p => p.test(normalized))) { type = t; break; }
    }

    // 2. Tiêu đề: tìm dòng có từ khóa loại VB
    let title = '';
    const titlePat = /(?:kế\s+hoạch|chỉ\s+thị|nghị\s+quyết|công\s+văn|thông\s+báo|báo\s+cáo|tờ\s+trình|biên\s+bản|quyết\s+định|hướng\s+dẫn|chương\s+trình)[^\n]{5,200}/i;
    const tm = normalized.match(titlePat);
    if (tm) title = tm[0].trim().replace(/^[:\-–]+\s*/, '');
    if (!title && filename) title = filename.replace(/\.[^.]+$/, '').replace(/[_\-]+/g, ' ');

    // 3. Số/Ký hiệu văn bản
    const code = extractCode(normalized);

    // 4. Cơ quan ban hành
    const issuer = extractIssuer(normalized);

    // 5. Ngày tháng
    const issueDate   = extractIssueDate(normalized);
    const deadline    = extractDeadline(normalized);
    const reportDate  = extractReportDate(normalized);

    // 6. Mức độ ưu tiên
    const priority = detectPriority(normalized);

    // 7. Từ khoá
    const keywords = extractKeywords(normalized);

    // 8. Công việc
    const mainTasks = extractTasks(normalized);

    // 9. Người ký / địa danh
    const signer       = extractSigner(normalized);
    const signLocation = extractSignLocation(normalized);

    // 10. Đơn vị thực hiện
    const recipients = extractRecipients(normalized);

    // 11. Tóm tắt sơ bộ (3 câu đầu có ý nghĩa)
    const sentences = normalized
      .split(/(?<=[.!?])\s+/)
      .map(s => s.trim())
      .filter(s => s.length > 30 && s.length < 300)
      .slice(0, 3);
    const summary = sentences.join(' ');

    // 12. Ghi chú nhắc nhở
    const reminderParts = [];
    if (deadline)   reminderParts.push(`Hạn hoàn thành: ${deadline}`);
    if (reportDate) reminderParts.push(`Hạn báo cáo KQ: ${reportDate}`);
    if (priority === 'high') reminderParts.push('⚠️ VĂN BẢN KHẨN — cần xử lý ngay');
    const reminderNotes = reminderParts.join(' | ');

    return {
      title,
      type,
      code,
      issuer,
      issueDate,
      deadline,
      reportDate,
      summary,
      mainTasks,
      priority,
      keywords,
      signer,
      signLocation,
      recipients,
      reminderNotes,
      _source: 'offline-v2',
    };
  }

  // ── Gắn vào window.AI.offline ─────────────────────────────────────────────
  if (!window.AI) window.AI = {};
  window.AI.offline = {
    analyzeDocument: analyzeDocumentOffline,
    extractCode,
    extractDeadline,
    extractIssueDate,
    parseDate,
    version: '2.0',
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
    const MAP = {
      'auto':              'gemini-2.5-flash-lite',
      'fast':              'gemini-2.5-flash-lite',
      'balanced':          'gemini-2.5-flash',
      'powerful':          'gemini-2.0-flash',
      'gemini-flash-lite': 'gemini-2.5-flash-lite',
      'gemini-flash':      'gemini-2.5-flash',
      'gemini-2.0':        'gemini-2.0-flash',
    };
    return MAP[alias] || alias || 'gemini-2.5-flash-lite';
  }

  // Gọi Gemini API
  async function callGemini(prompt, apiKey, model) {
    const s = (typeof DB !== 'undefined') ? DB.getObj('settings') : {};
    const key = apiKey || s.apiKey;
    const mdl = resolveModel(model || s.aiModel);
    if (!key) throw new Error('Chưa có API Key — vào Cài đặt để thêm');

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${mdl}:generateContent?key=${key}`;
    const body = {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.1,        // Thấp để đảm bảo chính xác
        maxOutputTokens: 8192,   // Đủ để chứa JSON đầy đủ
        topP: 0.8,
      },
    };

    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!resp.ok) {
      const e = await resp.json();
      throw new Error(e.error?.message || 'API error');
    }
    const data = await resp.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  }

  // callAI: chọn AI hay offline dựa trên cài đặt
  async function callAI(prompt) {
    const s = (typeof DB !== 'undefined') ? DB.getObj('settings') : {};
    if (s.apiKey) {
      return await callGemini(prompt, s.apiKey, s.aiModel);
    }
    throw new Error('Chưa có API Key — vào Cài đặt để thêm');
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
  const head = text.substring(0, 4000);
  const tail = text.length > 5000 ? '\n...\n' + text.substring(text.length - 2000) : '';
  const sample = head + tail;

  return `Bạn là chuyên gia văn thư hành chính cao cấp, am hiểu sâu về:
• Nghị định 30/2020/NĐ-CP về thể thức và kỹ thuật trình bày văn bản hành chính
• Hệ thống văn bản của tổ chức Đoàn TNCS Hồ Chí Minh
• Các quy ước viết tắt ký hiệu văn bản Việt Nam (KH, CV, TB, QĐ, NQ, CT, BB, v.v.)

NHIỆM VỤ: Phân tích văn bản bên dưới và trả về **chỉ một đối tượng JSON hợp lệ**, không có markdown, không có giải thích.

━━━ VĂN BẢN CẦN PHÂN TÍCH ━━━
Tên tệp: ${filename}
---
${sample}
━━━ HẾT VĂN BẢN ━━━

━━━ QUY TẮC TRÍCH XUẤT BẮT BUỘC ━━━

【SỐ/KÝ HIỆU】
- Định dạng chuẩn VN: <số>/<loại>-<đơn vị> hoặc <số>-<loại>/<đơn vị>
- Ví dụ đúng: "56/KH-ĐTN", "54-CV/ĐTN", "12/2026/QĐ-UBND", "03/TB-BTV"
- Tìm ở: dòng "Số:", tiêu đề văn bản, đầu trang
- NẾU KHÔNG CÓ: trả ""

【HẠN HOÀN THÀNH / HẠN XỬ LÝ】
- Tìm các cụm: "hạn chót", "trước ngày", "chậm nhất", "hoàn thành trước", "hạn nộp", "deadline"
- Chuyển sang định dạng YYYY-MM-DD
- Phân biệt: deadline thực hiện (field "deadline") ≠ ngày báo cáo kết quả (field "reportDate")
- NẾU KHÔNG CÓ: trả ""

【NGÀY BAN HÀNH】
- Là ngày văn bản được ký ban hành (thường ở cuối văn bản, sau địa danh)
- Định dạng: YYYY-MM-DD
- NẾU KHÔNG CÓ: trả ""

【LOẠI VĂN BẢN】
- Chọn ĐÚNG MỘT trong: chi-thi | nghi-quyet | ke-hoach | bao-cao | cong-van | thong-bao | to-trinh | bien-ban | quyet-dinh | huong-dan | chuong-trinh | khac

【ĐỘ ƯU TIÊN】
- high: có từ "khẩn", "hỏa tốc", "thượng khẩn", hoặc thời hạn ≤ 7 ngày
- med: quan trọng, cần chú ý, thời hạn 8–30 ngày
- low: thông thường, thời hạn > 30 ngày hoặc không có

━━━ CẤU TRÚC JSON TRẢ VỀ ━━━
{
  "title": "tiêu đề đầy đủ và chính xác của văn bản (không viết tắt)",
  "type": "loại văn bản theo mã ở trên",
  "code": "số/ký hiệu văn bản, ví dụ: 56/KH-ĐTN hoặc rỗng nếu không có",
  "issuer": "tên đầy đủ cơ quan/đơn vị ban hành",
  "issueDate": "YYYY-MM-DD hoặc rỗng",
  "deadline": "YYYY-MM-DD hạn hoàn thành/xử lý, hoặc rỗng",
  "reportDate": "YYYY-MM-DD hạn báo cáo kết quả về cơ quan cấp trên, hoặc rỗng",
  "signLocation": "địa danh nơi ký văn bản (ví dụ: Đồng Tháp)",
  "signer": "họ tên người ký và chức vụ",
  "recipients": ["đơn vị/cá nhân thực hiện 1", "đơn vị/cá nhân thực hiện 2"],
  "summary": "tóm tắt nội dung chính trong 3–5 câu, bám sát văn bản gốc",
  "mainTasks": ["công việc cụ thể 1", "công việc cụ thể 2", "công việc cụ thể 3"],
  "priority": "high|med|low",
  "keywords": ["từ khóa 1", "từ khóa 2", "từ khóa 3"],
  "reminderNotes": "ghi chú nhắc việc quan trọng nhất (hạn, yêu cầu đặc biệt)",
  "legalBasis": "căn cứ pháp lý chính nếu có"
}

Trả về JSON thuần túy, không bọc trong markdown code block.`;
}

// ── analyzeWithAI nâng cấp ────────────────────────────────────────────────────
// Tích hợp: offline phân tích trước → Gemini bổ sung → merge thông minh
async function analyzeWithAI(text, filename) {
  // Bước 1: Offline pre-scan — đảm bảo số/ký hiệu và hạn xử lý luôn có kết quả dự phòng
  const offlineResult = (window.AI && window.AI.offline)
    ? window.AI.offline.analyzeDocument(text, filename)
    : {};

  const s = (typeof DB !== 'undefined') ? DB.getObj('settings') : {};

  // Bước 2: Nếu có API key → gọi Gemini với prompt nâng cấp
  if (s.apiKey) {
    try {
      const prompt = buildAnalysisPrompt(text, filename);
      const raw = await callAI(prompt);
      let json = null;

      try {
        const clean = raw.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();
        // Tìm JSON object trong response
        const jsonMatch = clean.match(/\{[\s\S]*\}/);
        if (jsonMatch) json = JSON.parse(jsonMatch[0]);
      } catch { json = null; }

      if (json) {
        // Bước 3: Merge — ưu tiên Gemini, dùng offline để điền những gì Gemini bỏ sót
        const merged = {
          ...offlineResult,
          ...json,
          // Nếu Gemini không trích được code/deadline → dùng offline
          code:       json.code       || offlineResult.code       || '',
          deadline:   json.deadline   || offlineResult.deadline   || '',
          reportDate: json.reportDate || offlineResult.reportDate || '',
          issueDate:  json.issueDate  || offlineResult.issueDate  || '',
          issuer:     json.issuer     || offlineResult.issuer     || '',
          signer:     json.signer     || offlineResult.signer     || '',
          signLocation: json.signLocation || offlineResult.signLocation || '',
          recipients: (json.recipients && json.recipients.length) ? json.recipients : (offlineResult.recipients || []),
          _source: 'gemini+offline-v2',
        };
        showAiReviewModal(merged, text, filename);
      } else {
        if (typeof toast === 'function') toast(`AI không trả về JSON hợp lệ cho ${filename} — dùng kết quả offline`, 'warning');
        showAiReviewModal(offlineResult, text, filename);
      }
    } catch (e) {
      if (typeof toast === 'function') toast(`Lỗi Gemini: ${e.message} — dùng kết quả offline`, 'warning');
      showAiReviewModal(offlineResult, text, filename);
    }
  } else {
    // Không có API key: dùng offline 100%
    if (Object.keys(offlineResult).length) {
      showAiReviewModal(offlineResult, text, filename);
    } else {
      if (typeof toast === 'function') toast('Chưa có API Key và offline không phân tích được. Vui lòng nhập thủ công.', 'warning');
      if (typeof saveDocFallback === 'function') saveDocFallback(filename, text);
    }
  }
}

// Gắn ra global để index.html sử dụng
window.analyzeWithAI   = analyzeWithAI;
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
  const QUOTA_PREFIX = 'doanvan_aiquota_';
  const MODELS_META = [
    { id:'gemini-2.5-flash-lite', label:'Gemini 2.5 Flash-Lite', rpm:15, rpd:1000, tier:'primary' },
    { id:'gemini-2.5-flash',      label:'Gemini 2.5 Flash',      rpm:10, rpd:250,  tier:'secondary' },
    { id:'gemini-2.0-flash',      label:'Gemini 2.0 Flash',      rpm:15, rpd:1500, tier:'tertiary' },
  ];

  function _today() { return new Date().toISOString().split('T')[0]; }
  function _mkey()  { const n=new Date(); return `${n.getHours()}_${n.getMinutes()}`; }
  function _sk(id,t){ return `${QUOTA_PREFIX}${id}_${t}`; }

  function _getUsage(id) {
    try {
      const d = JSON.parse(localStorage.getItem(_sk(id,'day'))||'{}');
      const m = JSON.parse(localStorage.getItem(_sk(id,'min'))||'{}');
      return {
        today:       _today()===d.date ? (d.count||0) : 0,
        thisMinute:  _mkey()===m.key  ? (m.count||0) : 0,
      };
    } catch { return {today:0, thisMinute:0}; }
  }

  // getQuotaStatus — gọi bởi updateQuotaDisplay() trong index.html
  if (typeof window.AI.getQuotaStatus !== 'function') {
    window.AI.getQuotaStatus = function() {
      return MODELS_META.map(m => {
        const u   = _getUsage(m.id);
        const pct = Math.round((u.today / m.rpd) * 100);
        return {
          model:       m.id,
          label:       m.label,
          tier:        m.tier,
          todayUsed:   u.today,
          todayLimit:  m.rpd,
          minuteUsed:  u.thisMinute,
          minuteLimit: m.rpm,
          available:   u.today < m.rpd && u.thisMinute < m.rpm,
          pct,
        };
      });
    };
  }

  // testKey — gọi bởi testApiKey() trong index.html
  if (typeof window.AI.testKey !== 'function') {
    window.AI.testKey = async function(key, modelId) {
      const mdl = modelId || 'gemini-2.5-flash-lite';
      try {
        const url  = `https://generativelanguage.googleapis.com/v1beta/models/${mdl}:generateContent?key=${key}`;
        const resp = await fetch(url, {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({
            contents: [{parts:[{text:'Trả lời: OK'}]}],
            generationConfig: {maxOutputTokens:10, temperature:0}
          })
        });
        if (!resp.ok) {
          const e = await resp.json().catch(()=>({}));
          const err = new Error(e.error?.message || `HTTP ${resp.status}`);
          err.status = resp.status;
          return { ok:false, error:err.message, status:resp.status };
        }
        const data = await resp.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
        return { ok:true, model:mdl, label:mdl };
      } catch(e) {
        if (e.status === 429) return { ok:false, error:'quota hết (429)', status:429 };
        return { ok:false, error:e.message, status:e.status };
      }
    };
  }

  // canGoOnline
  if (typeof window.AI.canGoOnline !== 'function') {
    window.AI.canGoOnline = function() {
      try {
        const s = JSON.parse(localStorage.getItem('doanvan_settings')||'{}');
        return !!(s.apiKey && navigator.onLine);
      } catch { return false; }
    };
  }

  // getModelList
  if (typeof window.AI.getModelList !== 'function') {
    window.AI.getModelList = function() { return MODELS_META; };
  }

  // resolveModel shim (nếu chưa có)
  if (typeof window.AI.resolveModel !== 'function') {
    window.AI.resolveModel = function(id) {
      const MAP = {
        'auto':'gemini-2.5-flash-lite', 'fast':'gemini-2.5-flash-lite',
        'gemini-2.5-flash-lite-preview-06-17':'gemini-2.5-flash-lite',
        'gemini-2.5-flash-lite-preview':'gemini-2.5-flash-lite',
        'gemini-1.5-flash':'gemini-2.0-flash',
        'gemini-1.5-pro':'gemini-2.5-flash',
      };
      return MAP[id] || id || 'gemini-2.5-flash-lite';
    };
  }

  console.log('[ĐoànVăn AI Shim v3.0] ✓ getQuotaStatus · testKey · canGoOnline · getModelList — sẵn sàng');
})();

console.log('[ĐoànVăn AI Engine v2.0] ✓ analyzeWithAI nâng cấp — Prompt chuyên nghiệp + Offline NLP v2');
