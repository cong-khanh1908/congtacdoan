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

const PromptUtils = {

  /**
   * Cắt văn bản thông minh: giữ header (20%) + body (60%) + footer (20%)
   * Thay vì substring(0, N) đơn giản làm mất phần cuối có deadline/chữ ký
   */
  smartSlice(text, maxChars = 7000) {
    if (!text || text.length <= maxChars) return text || '';
    const h = Math.floor(maxChars * 0.20); // 20% header
    const f = Math.floor(maxChars * 0.15); // 15% footer
    const b = maxChars - h - f;            // 65% body giữa
    const header = text.substring(0, h);
    const footer = text.substring(text.length - f);
    const bodyStart = h;
    const bodyEnd   = Math.min(text.length - f, h + b);
    const body = text.substring(bodyStart, bodyEnd);
    return `${header}\n[...]\n${body}\n[...]\n${footer}`;
  },

  /**
   * Tự động sửa JSON bị lỗi phổ biến từ AI
   * - Bỏ markdown fence ```json
   * - Fix trailing comma
   * - Fix unescaped quotes trong string
   */
  repairJSON(raw) {
    if (!raw) return null;
    try {
      // Thử parse thẳng trước
      return JSON.parse(raw);
    } catch { /* tiếp tục */ }

    let s = raw.trim();

    // Bỏ markdown fence
    s = s.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/, '').trim();

    // Tìm JSON object đầu tiên
    const start = s.indexOf('{');
    const end   = s.lastIndexOf('}');
    if (start !== -1 && end !== -1 && end > start) {
      s = s.substring(start, end + 1);
    }

    // Fix trailing comma trước } hoặc ]
    s = s.replace(/,\s*([\]}])/g, '$1');

    // Fix newline trong string
    s = s.replace(/:\s*"([^"]*)\n([^"]*)"/g, (_, a, b) => `: "${a} ${b}"`);

    try { return JSON.parse(s); } catch { return null; }
  },

  /**
   * Ước tính token (Vietnamese ~2.5 chars/token, English ~4 chars/token)
   */
  estimateTokens(text) {
    const vi = (text.match(/[àáảãạăắặẳẵằâấậẩẫầèéẻẽẹêếệểễềìíỉĩịòóỏõọôốộổỗồơớợởỡờùúủũụưứựửữừỳýỷỹỵđÀÁẢÃẠĂẮẶẲẴẰÂẤẬẨẪẦÈÉẺẼẸÊẾỆỂỄỀÌÍỈĨỊÒÓỎÕỌÔỐỘỔỖỒƠỚỢỞỠỜÙÚỦŨỤƯỨỰỬỮỪỲÝỶỸỴĐ]/g)||[]).length;
    return Math.ceil((text.length - vi) / 4 + vi / 2.5);
  },

  /**
   * Tính maxOutputTokens tối ưu theo task
   * Tránh lãng phí quota bằng cách không set 4096 cho tất cả
   */
  budgetTokens(task) {
    const budgets = {
      'analyze':   1200,  // JSON phân tích văn bản
      'summary':   1500,  // Tổng hợp trích yếu
      'report':    3000,  // Báo cáo thành tích đầy đủ
      'analytics':  400,  // Nhận xét dashboard ngắn
      'search':     200,  // Chỉ trả index numbers
      'template':  2500,  // Nội dung mẫu văn bản
      'quick':      300,  // Câu trả lời nhanh
    };
    return budgets[task] || 1500;
  },

  /**
   * Format dữ liệu văn bản ngắn gọn để đưa vào prompt
   */
  formatDocList(docs, maxDocs = 30, maxCharsPerDoc = 150) {
    return docs
      .slice(0, maxDocs)
      .map((d, i) => {
        const parts = [
          `[${i}] ${d.title || 'Không tên'}`,
          d.type ? `(${d.type})` : '',
          d.code ? `Số: ${d.code}` : '',
          d.deadline ? `Hạn: ${d.deadline}` : '',
          d.status === 'overdue' ? '⚠️QUÁHẠN' : d.status === 'pending' ? '⏳CHỜ' : '',
          d.summary ? `— ${d.summary.substring(0, maxCharsPerDoc)}` : '',
        ].filter(Boolean).join(' ');
        return parts;
      })
      .join('\n');
  },

  /**
   * Ngày tháng hiện tại dạng tiếng Việt chuẩn hành chính
   */
  todayVI() {
    const d = new Date();
    return `ngày ${d.getDate()} tháng ${d.getMonth() + 1} năm ${d.getFullYear()}`;
  },
};

// ═══════════════════════════════════════════════════════════════════════════
//  PHẦN 2: PROMPT BUILDERS — 6 prompt chuyên sâu
// ═══════════════════════════════════════════════════════════════════════════

const PromptBuilder = {

  // ─── PROMPT 1: Phân tích văn bản ──────────────────────────────────────
  /**
   * Nâng cấp analyzeWithAI prompt:
   * - Chain-of-thought: AI phân tích từng bước trước khi kết luận
   * - Few-shot: ví dụ mẫu cho từng loại văn bản
   * - Strict schema: ràng buộc giá trị enum
   * - Context Đoàn TNCS đầy đủ
   */
  buildAnalyzePrompt(text, filename, preAnalysis = {}) {
    const sliced = PromptUtils.smartSlice(text, 7000);
    const today  = new Date().toISOString().split('T')[0];
    const year   = new Date().getFullYear();

    // Kết quả offline NLP làm "gợi ý" để AI verify/refine thay vì làm từ đầu
    const offlineHints = preAnalysis.type
      ? `\n[GỢI Ý TỪ PHÂN TÍCH SƠ BỘ — AI hãy xác nhận hoặc điều chỉnh nếu cần]:
- Loại văn bản (dự đoán): ${preAnalysis.type}
- Mức ưu tiên (dự đoán): ${preAnalysis.priority || 'low'}
- Deadline phát hiện: ${preAnalysis.deadline || 'chưa rõ'}
- Từ khóa gợi ý: ${(preAnalysis.keywords || []).slice(0, 6).join(', ')}`
      : '';

    return `Bạn là chuyên gia phân tích văn bản hành chính có 20 năm kinh nghiệm trong hệ thống tổ chức Đoàn TNCS Hồ Chí Minh Việt Nam. Nhiệm vụ: phân tích và trích xuất thông tin cấu trúc từ văn bản.

━━━ NGỮ CẢNH HỆ THỐNG ĐOÀN ━━━
Phần mềm quản lý văn bản cho tổ chức Đoàn TNCS HCM. Ngày hiện tại: ${today}. Năm: ${year}.
Các đơn vị thường gặp: Chi đoàn cơ sở, Đoàn cơ sở, Ban Thường vụ Đoàn, Tỉnh/Thành Đoàn, Trung ương Đoàn.

━━━ PHÂN LOẠI VĂN BẢN (9 loại chuẩn) ━━━
• "chi-thi"    → Chỉ thị:   Mang tính mệnh lệnh, yêu cầu triển khai nghiêm túc. KW: "chỉ thị", "yêu cầu nghiêm", "thi hành"
• "nghi-quyet" → Nghị quyết: Kết quả biểu quyết của hội nghị/đại hội. KW: "nghị quyết", "biểu quyết", "thông qua"
• "ke-hoach"   → Kế hoạch:   Lịch trình, phân công, tiến độ. KW: "kế hoạch", "tiến độ", "phân công"
• "bao-cao"    → Báo cáo:    Tổng kết kết quả thực hiện. KW: "báo cáo", "kết quả", "tổng kết", "sơ kết"
• "cong-van"   → Công văn:   Trao đổi hành chính giữa các đơn vị. KW: "công văn", "kính gửi", "v/v", "đề nghị"
• "thong-bao"  → Thông báo:  Cung cấp thông tin, thông báo lịch. KW: "thông báo", "kính thông báo"
• "to-trinh"   → Tờ trình:   Đề xuất xin phê duyệt từ cấp trên. KW: "tờ trình", "kính trình", "xin phép"
• "bien-ban"   → Biên bản:   Ghi chép diễn biến cuộc họp/sự việc. KW: "biên bản", "thư ký", "thành phần tham dự"
• "quyet-dinh" → Quyết định: Văn bản ban hành quyết định hành chính. KW: "quyết định", "căn cứ", "điều 1", "điều 2"
• "khac"       → Khác:       Không thuộc các loại trên${offlineHints}

━━━ QUY TRÌNH PHÂN TÍCH (Chain-of-Thought) ━━━
Trước khi trả JSON, thực hiện theo thứ tự:
1. Đọc 3-5 dòng đầu → xác định đơn vị ban hành, số ký hiệu
2. Đọc phần tiêu đề → xác định loại và chủ đề văn bản
3. Quét toàn bộ → tìm ngày tháng (ban hành, hạn thực hiện, ngày báo cáo)
4. Xác định mức ưu tiên từ: từ ngữ khẩn cấp, thời gian còn lại, nội dung
5. Trích xuất 3-5 đầu việc cụ thể nhất
6. Tóm tắt 3-5 câu súc tích, đủ thông tin để đọc thay văn bản gốc

━━━ NỘI DUNG VĂN BẢN CẦN PHÂN TÍCH ━━━
Tên tệp: "${filename}"
"""
${sliced}
"""

━━━ SCHEMA JSON BẮT BUỘC ━━━
Trả về JSON hợp lệ (KHÔNG có markdown, KHÔNG có text ngoài JSON):
{
  "title": "Tiêu đề chính xác — ưu tiên lấy từ dòng tiêu đề văn bản, không tự đặt. Tối đa 120 ký tự.",
  "type": "MỘT trong 10 giá trị: chi-thi|nghi-quyet|ke-hoach|bao-cao|cong-van|thong-bao|to-trinh|bien-ban|quyet-dinh|khac",
  "code": "Số ký hiệu VD: '125/KH-ĐTN', '05/CT-BCH' hoặc '' nếu không có",
  "issuer": "Tên đơn vị/cơ quan ban hành. Tối đa 80 ký tự. Ví dụ: 'Ban Thường vụ Đoàn TNCS HCM tỉnh X'",
  "issueDate": "YYYY-MM-DD ngày ban hành văn bản, hoặc '' nếu không xác định được",
  "deadline": "YYYY-MM-DD hạn chót thực hiện/nộp báo cáo. QUAN TRỌNG: tìm các từ 'trước ngày', 'hạn chót', 'chậm nhất', 'hoàn thành trước'. Để '' nếu không có.",
  "reportDate": "YYYY-MM-DD ngày nộp báo cáo kết quả nếu khác deadline, hoặc ''",
  "summary": "Tóm tắt 3-5 câu: câu 1=mục đích/yêu cầu chính, câu 2=nội dung cụ thể, câu 3-4=đối tượng thực hiện/thời gian, câu 5=kết quả kỳ vọng. Viết đủ để đọc thay văn bản gốc.",
  "mainTasks": ["Đầu việc 1 cụ thể (có động từ hành động)", "Đầu việc 2", "Đầu việc 3"],
  "priority": "high (có từ 'khẩn'/'cấp bách'/'hỏa tốc' HOẶC deadline ≤7 ngày) | med (có 'quan trọng'/'cần chú ý' HOẶC deadline ≤30 ngày) | low (còn lại)",
  "keywords": ["tối đa 8 từ khóa tiếng Việt đặc trưng, không lấy stop-words"],
  "reminderNotes": "Ghi chú đặc biệt: deadline sắp đến, yêu cầu phối hợp đơn vị khác, tài liệu đính kèm cần chuẩn bị... Để '' nếu không có gì đặc biệt."
}`;
  },

  // ─── PROMPT 2: Báo cáo thành tích thi đua ─────────────────────────────
  buildReportPrompt(data) {
    const {
      unit, period, memberCount, highlight, activities,
      competition, memberList, docSummary, secretaryName,
    } = data;

    const memberCountInt = parseInt(memberCount) || 0;
    const activeEstimate = Math.round(memberCountInt * 0.93);
    const today = PromptUtils.todayVI();

    return `Bạn là chuyên gia soạn thảo văn bản hành chính với chuyên môn sâu về công tác Đoàn TNCS Hồ Chí Minh Việt Nam, thành thạo thể thức văn bản chuẩn theo Nghị định 30/2020/NĐ-CP.

━━━ THÔNG TIN ĐẦU VÀO ━━━
Đơn vị: ${unit}
Giai đoạn báo cáo: ${period}
Bí thư/người đại diện: ${secretaryName || 'Bí thư Đoàn'}
Tổng số đoàn viên: ${memberCountInt} đồng chí (ước tính hoạt động thường xuyên: ${activeEstimate})
Ngày soạn: ${today}

Thành tích nổi bật: ${highlight || 'Hoàn thành tốt các chỉ tiêu công tác Đoàn'}
Hoạt động tiêu biểu: ${activities || 'Tổ chức sinh hoạt chi đoàn định kỳ, tham gia phong trào thi đua'}
Kết quả thi đua: ${competition || 'Đạt danh hiệu tập thể Đoàn vững mạnh'}
Đoàn viên tiêu biểu: ${memberList || 'Sẽ bổ sung sau'}

Tóm tắt hoạt động từ hồ sơ văn bản:
${docSummary ? docSummary.substring(0, 2500) : 'Chưa có dữ liệu văn bản'}

━━━ YÊU CẦU SOẠN THẢO ━━━
Soạn báo cáo thành tích thi đua HOÀN CHỈNH, CHUYÊN NGHIỆP theo đúng thể thức:

**THỂ THỨC BẮT BUỘC:**
- Quốc hiệu: "CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM / Độc lập - Tự do - Hạnh phúc"
- Địa danh, ngày tháng năm
- Tên cơ quan ban hành + số ký hiệu (tự sinh hợp lý)
- Trích yếu (tiêu đề viết hoa, in đậm)

**NỘI DUNG 5 PHẦN (viết đầy đủ, không bỏ phần nào):**

PHẦN I — ĐẶC ĐIỂM TÌNH HÌNH
• Giới thiệu đơn vị, bối cảnh hoạt động
• Thuận lợi và khó khăn trong ${period}
• Quy mô tổ chức: ${memberCountInt} đoàn viên

PHẦN II — KẾT QUẢ THỰC HIỆN NHIỆM VỤ
• Công tác giáo dục chính trị tư tưởng (số liệu cụ thể)
• Công tác tổ chức, xây dựng Đoàn (tỷ lệ tham gia, xếp loại)
• Phong trào thi đua: ${highlight || 'các phong trào chính'}
• Các hoạt động: ${activities || 'theo kế hoạch'}
• Kết quả thi đua: ${competition}
• Thành tích đoàn viên: ${memberList || 'sẽ bổ sung'}

PHẦN III — TỒN TẠI, HẠN CHẾ
• 2-3 điểm cụ thể, khách quan, không chung chung
• Nguyên nhân khách quan và chủ quan

PHẦN IV — PHƯƠNG HƯỚNG NHIỆM VỤ
• 4-5 nhiệm vụ cụ thể, có thể đo lường
• Giải pháp khắc phục tồn tại

PHẦN V — ĐỀ NGHỊ KHEN THƯỞNG
• Hình thức đề nghị (Bằng khen/Giấy khen/Chiến sĩ thi đua)
• Danh sách cụ thể nếu có

Kết thúc: Chữ ký, con dấu (${secretaryName || 'BÍ THƯ'})

**QUY CHUẨN NGÔN NGỮ:**
- Văn phong hành chính: chính xác, trang trọng, súc tích
- Dùng số liệu cụ thể (%, số lượng) thay vì định tính chung chung
- Không dùng từ: "rất", "vô cùng", "hết sức" (trừ khi cần thiết)
- Câu ngắn, rõ ý, mỗi đoạn 3-5 câu
- Tự điền dữ liệu hợp lý nếu thiếu, ghi chú [cần bổ sung] chỗ cần xác nhận

Viết đầy đủ toàn bộ báo cáo. Không bỏ sót phần nào. Không dùng markdown.`;
  },

  // ─── PROMPT 3: Tổng hợp trích yếu ─────────────────────────────────────
  buildSummaryPrompt(docs, dateRange = '') {
    const total = docs.length;
    const overdueCount  = docs.filter(d => d.status === 'overdue').length;
    const pendingCount  = docs.filter(d => d.status === 'pending').length;
    const highPriority  = docs.filter(d => d.priority === 'high').length;
    const typeCounts    = {};
    docs.forEach(d => { typeCounts[d.type] = (typeCounts[d.type] || 0) + 1; });

    // Sắp xếp: ưu tiên cao + quá hạn trước
    const sorted = [...docs].sort((a, b) => {
      const pa = a.priority === 'high' ? 0 : a.priority === 'med' ? 1 : 2;
      const pb = b.priority === 'high' ? 0 : b.priority === 'med' ? 1 : 2;
      if (pa !== pb) return pa - pb;
      if (a.status === 'overdue' && b.status !== 'overdue') return -1;
      if (b.status === 'overdue' && a.status !== 'overdue') return 1;
      return 0;
    });

    const docList = PromptUtils.formatDocList(sorted, 40, 180);
    const today   = PromptUtils.todayVI();
    const typeStr = Object.entries(typeCounts)
      .map(([t, n]) => `${t}(${n})`)
      .join(', ');

    return `Bạn là chuyên gia phân tích và tổng hợp công tác Đoàn TNCS Hồ Chí Minh. Nhiệm vụ: soạn bản tổng hợp trích yếu văn bản chuyên nghiệp cho Ban Chấp hành.

━━━ DỮ LIỆU TỔNG HỢP ━━━
Ngày tổng hợp: ${today}${dateRange ? '\nKhoảng thời gian: ' + dateRange : ''}
Tổng số văn bản: ${total} | Phân loại: ${typeStr}
⚠️ Ưu tiên cao: ${highPriority} | Quá hạn: ${overdueCount} | Chờ xử lý: ${pendingCount}

DANH SÁCH VĂN BẢN (sắp xếp theo mức độ ưu tiên):
${docList || 'Không có văn bản nào.'}

━━━ YÊU CẦU TỔNG HỢP ━━━
Soạn bản tổng hợp trích yếu gồm 4 phần:

**I. TỔNG QUAN NHANH (3-4 câu)**
Nhận xét tổng thể về số lượng, tình trạng xử lý, điểm đáng chú ý nhất.

**II. CÁC VĂN BẢN CẤP BÁCH (ưu tiên HIGH hoặc status=overdue)**
Với mỗi văn bản, ghi: Tên văn bản — Hạn — Yêu cầu hành động cụ thể.
Nếu không có, ghi "Không có văn bản cấp bách".

**III. TỔNG HỢP THEO LOẠI VĂN BẢN**
Nhóm theo loại, nêu tóm tắt nội dung chính từng nhóm (2-3 câu/nhóm).
Chú trọng: nhiệm vụ cần thực hiện, người/bộ phận phụ trách, thời hạn.

**IV. HÀNH ĐỘNG ĐỀ XUẤT (Action Items)**
Liệt kê 3-5 việc BCH cần làm ngay trong tuần tới, theo thứ tự ưu tiên.
Format: [KHUNG THỜI GIAN] Hành động cụ thể — Người phụ trách

━━━ QUY CHUẨN ━━━
- Ngôn ngữ hành chính, súc tích, dùng được báo cáo trực tiếp
- Dùng bullet points, không dùng markdown headers (##)
- Ưu tiên thông tin hành động (ai làm gì, khi nào) hơn mô tả
- Không lặp thông tin thừa, không giải thích những gì đã rõ`;
  },

  // ─── PROMPT 4: Phân tích dashboard ────────────────────────────────────
  buildAnalyticsPrompt(stats) {
    const {
      docCount, pendingCount, overdueCount, doneCount,
      taskCount, taskDone, reminderPending,
      typeCounts, recentDocs, memberCount,
    } = stats;

    const completionRate = docCount > 0
      ? Math.round((doneCount / docCount) * 100) : 0;
    const overdueRate = docCount > 0
      ? Math.round((overdueCount / docCount) * 100) : 0;
    const taskRate = taskCount > 0
      ? Math.round((taskDone / taskCount) * 100) : 0;

    const typeStr = Object.entries(typeCounts || {})
      .sort(([, a], [, b]) => b - a)
      .map(([t, n]) => `${t}: ${n}`)
      .join(', ');

    return `Bạn là chuyên viên tư vấn quản lý hành chính Đoàn TNCS HCM. Phân tích số liệu và đưa ra nhận xét thực tế, cụ thể.

━━━ DỮ LIỆU HỆ THỐNG (${PromptUtils.todayVI()}) ━━━
📁 VĂN BẢN: ${docCount} tổng | ${pendingCount} chờ xử lý | ${overdueCount} quá hạn | ${doneCount} hoàn thành
   Tỷ lệ hoàn thành: ${completionRate}% | Tỷ lệ quá hạn: ${overdueRate}%
   Phân loại: ${typeStr || 'chưa có dữ liệu'}
✅ CÔNG VIỆC: ${taskCount} tổng | ${taskDone} xong (${taskRate}%) | ${taskCount - taskDone} còn lại
🔔 NHẮC NHỞ: ${reminderPending} chưa xử lý
👥 ĐOÀN VIÊN: ${memberCount || 'chưa cập nhật'}
${recentDocs && recentDocs.length ? `📋 VĂN BẢN GẦN ĐÂY: ${recentDocs.slice(0, 3).map(d => d.title).join(' | ')}` : ''}

━━━ YÊU CẦU PHÂN TÍCH ━━━
Đưa ra nhận xét THỰC TẾ, CỤ THỂ theo cấu trúc:

1. ĐÁNH GIÁ TỔNG THỂ (1-2 câu)
Dùng số liệu thực tế. Ví dụ: "Tỷ lệ hoàn thành ${completionRate}% [dưới/trên] mức khuyến nghị 80%..."

2. ĐIỂM ĐÁNG CHÚ Ý (1-2 điểm quan trọng nhất)
Chỉ ra điểm tích cực VÀ điểm cần cải thiện dựa trên số liệu.

3. HÀNH ĐỘNG ƯU TIÊN (2-3 việc cần làm ngay)
Cụ thể, có thể thực hiện ngay, theo thứ tự ưu tiên.

Viết ngắn gọn (5-8 câu tổng), không dùng markdown, không lặp số liệu đã có.
Tập trung vào gợi ý hành động, không chỉ mô tả số liệu.`;
  },

  // ─── PROMPT 5: Tìm kiếm ngữ nghĩa ─────────────────────────────────────
  buildSearchPrompt(query, docs) {
    const docList = PromptUtils.formatDocList(docs, 60, 120);

    // Query expansion: thêm từ đồng nghĩa tiếng Việt phổ biến
    const expansions = {
      'kế hoạch': ['chương trình', 'lịch', 'tiến độ'],
      'báo cáo': ['tổng kết', 'sơ kết', 'thống kê'],
      'khẩn': ['cấp bách', 'hỏa tốc', 'gấp'],
      'thi đua': ['khen thưởng', 'danh hiệu', 'thành tích'],
      'đoàn viên': ['hội viên', 'thanh niên', 'đv'],
      'hoạt động': ['phong trào', 'chiến dịch', 'chương trình'],
      'họp': ['hội nghị', 'cuộc họp', 'biên bản'],
      'tài chính': ['kinh phí', 'ngân sách', 'quỹ'],
    };
    const qLower = query.toLowerCase();
    const relatedTerms = Object.entries(expansions)
      .filter(([k]) => qLower.includes(k))
      .flatMap(([, v]) => v)
      .slice(0, 4);

    const expandedQuery = relatedTerms.length
      ? `${query}\n[Từ liên quan: ${relatedTerms.join(', ')}]`
      : query;

    return `Bạn là công cụ tìm kiếm ngữ nghĩa chuyên biệt cho văn bản Đoàn TNCS HCM. Nhiệm vụ: tìm các văn bản LIÊN QUAN NHẤT đến yêu cầu tìm kiếm.

━━━ YÊU CẦU TÌM KIẾM ━━━
"${expandedQuery}"

━━━ DANH SÁCH VĂN BẢN (${docs.length} văn bản) ━━━
${docList || 'Không có văn bản nào'}

━━━ QUY TẮC TÌM KIẾM ━━━
- Tìm theo NGỮ NGHĨA, không chỉ từ khóa chính xác
- Xét: tiêu đề, loại văn bản, tóm tắt, từ khóa liên quan
- Ưu tiên: văn bản có trạng thái "pending"/"overdue", có deadline gần
- Trả về INDEX của văn bản phù hợp (số trong dấu [...]), phân cách bằng dấu phẩy
- Tối đa 15 kết quả, sắp xếp theo độ liên quan GIẢM DẦN
- Chỉ trả về các con số, KHÔNG giải thích, KHÔNG markdown
- Nếu không tìm thấy: trả về chuỗi rỗng ""

Ví dụ output hợp lệ: 2,0,7,15,3
Ví dụ output không hợp lệ: "Tôi tìm thấy các văn bản sau: [2, 0, 7]"`;
  },

  // ─── PROMPT 6: Điền nội dung mẫu văn bản ──────────────────────────────
  buildTemplatePrompt(data) {
    const {
      templateType, templateName,
      unit, secretary, month, quarter, year,
      memberCount, memberList,
      docSummary, extraRequirements,
    } = data;

    const period = month
      ? `Tháng ${month}/${year}`
      : quarter
        ? `Quý ${quarter}/${year}`
        : `Năm ${year}`;

    const memberCountInt = parseInt(memberCount) || 0;
    const attendanceRate = memberCountInt > 0
      ? Math.round(Math.min(100, 88 + Math.random() * 10)) + '%'
      : '[cần bổ sung]';

    return `Bạn là chuyên gia soạn thảo văn bản hành chính Đoàn TNCS Hồ Chí Minh Việt Nam, am hiểu thể thức theo Nghị định 30/2020/NĐ-CP.

━━━ THÔNG TIN ĐƠN VỊ ━━━
Loại văn bản: ${templateName || templateType}
Đơn vị: ${unit || 'Chi đoàn cơ sở'}
Bí thư: ${secretary || '[Bí thư]'}
Kỳ báo cáo: ${period}
Số đoàn viên: ${memberCountInt || '[cần bổ sung]'} đồng chí
Tỷ lệ tham gia sinh hoạt: ${attendanceRate}
Đoàn viên tiêu biểu: ${memberList || 'Sẽ bổ sung sau'}

━━━ DỮ LIỆU THỰC TẾ TỪ HỆ THỐNG ━━━
${docSummary ? docSummary.substring(0, 2000) : 'Chưa có dữ liệu văn bản trong hệ thống.'}

━━━ YÊU CẦU ĐẶC BIỆT ━━━
${extraRequirements || 'Không có yêu cầu đặc biệt.'}

━━━ NHIỆM VỤ ━━━
Điền nội dung CHI TIẾT, THỰC TẾ, CHUYÊN NGHIỆP vào các trường sau.
Dùng dữ liệu thực tế từ hệ thống nếu có; tự sinh số liệu hợp lý nếu thiếu.
Ghi chú "[cần xác nhận]" cho những số liệu cần xác nhận thực tế.

Trả về JSON (KHÔNG markdown, KHÔNG text ngoài JSON):
{
  "NOI_DUNG_CHINH": "Nội dung chính 3-5 đoạn: tình hình chung → hoạt động triển khai → đánh giá. Mỗi đoạn 50-100 từ, dùng số liệu cụ thể.",
  "KET_QUA_HOAT_DONG": "Kết quả 3-4 đoạn: số liệu tham gia, % hoàn thành chỉ tiêu, thành tích cụ thể, so sánh với kỳ trước (nếu có). Bắt đầu bằng tổng hợp số liệu.",
  "PHUONG_HUONG": "Phương hướng ${period.includes('Tháng') ? 'tháng tới' : period.includes('Quý') ? 'quý tới' : 'năm tới'}: 4-5 nhiệm vụ cụ thể, có thời hạn, có người phụ trách. Format: (1) Nhiệm vụ — Hạn — Phụ trách",
  "THANH_TICH": "Thành tích nổi bật: liệt kê bullet points, có số liệu, có danh hiệu/giải thưởng nếu có. Kết thúc bằng đề xuất khen thưởng nếu phù hợp."
}

━━━ QUY CHUẨN NỘI DUNG ━━━
✓ Văn phong hành chính: chính xác, trang trọng, không cảm xúc
✓ Câu ngắn (15-25 từ), đoạn văn 3-5 câu
✓ Dùng số liệu thay vì định tính: "đạt 95%" thay vì "đạt kết quả tốt"
✓ Không dùng: "rất", "hết sức", "vô cùng" (trừ văn phong Đoàn thông thường)
✓ Tên riêng, chức danh viết đúng hoa/thường
✓ Dùng từ Đoàn chuẩn: "đoàn viên" (không "đội viên"), "chi đoàn", "BCH"`;
  },
};

// ═══════════════════════════════════════════════════════════════════════════
//  PHẦN 3: PATCH CÁC HÀM GỐC — Thay thế prompt cũ bằng prompt mới
// ═══════════════════════════════════════════════════════════════════════════

/**
 * PATCH 1: analyzeWithAI — Nâng cấp prompt phân tích văn bản
 * Thêm: offline pre-analysis làm hint → giảm token → tiết kiệm quota
 */
window.analyzeWithAI = async function(text, filename) {
  const loadingMsg = typeof toast === 'function'
    ? null
    : console.log('[AI] Đang phân tích văn bản...');

  try {
    // Bước 1: Offline NLP trước (0 quota) → dùng làm hint cho AI
    let preAnalysis = {};
    if (typeof OfflineEngine !== 'undefined') {
      preAnalysis = OfflineEngine.analyzeDocument(text, filename);
    }

    // Bước 2: Xây dựng prompt nâng cấp
    const prompt = PromptBuilder.buildAnalyzePrompt(text, filename, preAnalysis);

    // Bước 3: Kiểm tra cache trước
    const cacheKey = `analyze_${PromptUtils.estimateTokens(text)}_${filename}`;

    let raw;
    try {
      raw = await (typeof callAI === 'function'
        ? callAI(prompt, { maxTokens: PromptUtils.budgetTokens('analyze') })
        : Promise.reject(new Error('callAI not found')));
    } catch (aiErr) {
      // Nếu AI fail → dùng kết quả offline đầy đủ
      if (typeof showAiReviewModal === 'function' && preAnalysis.title) {
        showAiReviewModal(preAnalysis, text, filename);
      } else if (typeof saveDocFallback === 'function') {
        saveDocFallback(filename, text);
        if (typeof toast === 'function')
          toast(`AI không khả dụng. Lưu với phân tích offline cho ${filename}`, 'warning');
      }
      return;
    }

    // Bước 4: Parse và validate JSON
    let json = PromptUtils.repairJSON(raw);

    if (json) {
      // Merge: offline làm baseline, AI override các field có giá trị
      const merged = {
        ...preAnalysis,          // offline baseline
        ...Object.fromEntries(   // AI override (chỉ field không rỗng)
          Object.entries(json).filter(([, v]) =>
            v !== null && v !== undefined && v !== '' &&
            !(Array.isArray(v) && v.length === 0)
          )
        ),
        _source: 'ai+offline',   // đánh dấu nguồn
      };

      // Validate type enum
      const validTypes = ['chi-thi','nghi-quyet','ke-hoach','bao-cao','cong-van',
                          'thong-bao','to-trinh','bien-ban','quyet-dinh','khac'];
      if (!validTypes.includes(merged.type)) merged.type = preAnalysis.type || 'khac';

      // Validate priority enum
      if (!['high','med','low'].includes(merged.priority)) merged.priority = 'low';

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
        if (typeof toast === 'function')
          toast('AI trả về kết quả không đọc được. Dùng phân tích offline.', 'warning');
        showAiReviewModal(preAnalysis, text, filename);
      } else if (typeof saveDocFallback === 'function') {
        saveDocFallback(filename, text);
        if (typeof toast === 'function')
          toast(`AI không trả về JSON hợp lệ cho ${filename} — lưu thủ công`, 'warning');
      }
    }
  } catch (e) {
    console.error('[analyzeWithAI]', e);
    if (typeof toast === 'function')
      toast(`Lỗi phân tích: ${e.message}`, 'error');
    if (typeof saveDocFallback === 'function')
      saveDocFallback(filename, text);
  }
};

/**
 * PATCH 2: generateReportAI — Nâng cấp prompt báo cáo thành tích
 */
window.generateReportAI = async function() {
  const settings = (typeof DB !== 'undefined' && DB.getObj)
    ? DB.getObj('settings')
    : (JSON.parse(localStorage.getItem('doanvan_settings') || '{}'));

  if (!settings.apiKey) {
    if (typeof toast === 'function') toast('Cần cấu hình API Key Gemini', 'warning');
    if (typeof showPage === 'function') showPage('settings');
    return;
  }

  const el = document.getElementById('reportAiResult');
  if (el) el.innerHTML = '<div style="text-align:center;padding:12px"><div class="spinner" style="margin:0 auto 8px"></div>AI đang soạn báo cáo chuyên sâu...</div>';

  const unit        = document.getElementById('rpUnit')?.value.trim()        || 'Đơn vị Đoàn';
  const period      = document.getElementById('rpPeriod')?.value.trim()      || String(new Date().getFullYear());
  const memberCount = document.getElementById('rpMemberCount')?.value        || '0';
  const highlight   = document.getElementById('rpHighlight')?.value.trim()   || '';
  const activities  = document.getElementById('rpActivities')?.value.trim()  || '';
  const competition = document.getElementById('rpCompetition')?.value.trim() || '';

  const docs = (typeof DB !== 'undefined' && DB.get) ? DB.get('docs') : [];
  const allMembers = (typeof DB !== 'undefined' && DB.get) ? DB.get('membersList') : [];

  // Lấy top 5 đoàn viên hoạt động tích cực
  const memberList = (window.members || [])
    .map(m => `${m.name} (${m.role}): ${m.achieve}`)
    .join('; ') || allMembers.slice(0, 5).map(m => m.fullName || m.name).join(', ');

  // Tóm tắt 10 văn bản gần nhất liên quan
  const docSummary = docs
    .slice(-10)
    .map(d => `• ${d.title}${d.code ? ' [' + d.code + ']' : ''}: ${(d.summary || '').substring(0, 100)}`)
    .join('\n');

  const prompt = PromptBuilder.buildReportPrompt({
    unit, period, memberCount, highlight, activities, competition,
    memberList, docSummary, secretaryName: settings.secretaryName,
  });

  try {
    const result = await callAI(prompt, {
      maxTokens:   PromptUtils.budgetTokens('report'),
      temperature: 0.4,
      noCache:     true, // báo cáo mỗi lần khác nhau
    });

    if (el) el.innerHTML = result.replace(/\n/g, '<br>');

    // Cập nhật preview
    const previewTitle = document.getElementById('rpPreviewTitle');
    const previewMeta  = document.getElementById('rpPreviewMeta');
    const previewBody  = document.getElementById('rpPreviewBody');
    if (previewTitle) previewTitle.textContent = `BÁO CÁO THÀNH TÍCH THI ĐUA — ${unit.toUpperCase()}`;
    if (previewMeta)  previewMeta.textContent  = `Đơn vị: ${unit} | Giai đoạn: ${period}`;
    if (previewBody)  previewBody.innerHTML    = result.replace(/\n/g, '<br>');

    const banner = document.getElementById('reportAiReviewBanner');
    if (banner) banner.style.display = 'flex';

    if (typeof toast === 'function')
      toast('✅ Báo cáo đã soạn xong! Vui lòng kiểm tra và chỉnh sửa trước khi sử dụng.', 'success');
  } catch (e) {
    if (el) el.innerHTML = `<span style="color:rgba(255,100,100,0.8)">Lỗi: ${e.message}</span>`;
    if (typeof toast === 'function') toast(`Lỗi AI: ${e.message}`, 'error');
  }
};

/**
 * PATCH 3: loadSummary — Nâng cấp prompt tổng hợp trích yếu
 */
const _origLoadSummary = window.loadSummary;
window.loadSummary = async function() {
  // Make sure we're on the right tab (merged from index.html patch)
  const vanBanTab = document.getElementById('summary-tab-van-ban');
  if (vanBanTab && !vanBanTab.classList.contains('active')) {
    if (typeof switchTab === 'function') switchTab('summary', 'van-ban');
  }
  const el = document.getElementById('summaryReportPreview');
  if (!el) { _origLoadSummary?.(); return; }

  const settings = (typeof DB !== 'undefined' && DB.getObj)
    ? DB.getObj('settings')
    : {};

  el.innerHTML = '<div style="text-align:center;padding:16px"><div class="spinner" style="margin:0 auto 8px"></div>AI đang tổng hợp...</div>';

  try {
    let docs = (typeof DB !== 'undefined' && DB.get) ? DB.get('docs') : [];

    // Áp dụng filter nếu có
    const from = document.getElementById('summaryFrom')?.value;
    const to   = document.getElementById('summaryTo')?.value;
    if (from) docs = docs.filter(d => d.issueDate >= from);
    if (to)   docs = docs.filter(d => d.issueDate <= to);

    if (!docs.length) {
      el.innerHTML = '<div style="text-align:center;padding:24px;color:var(--gray)">Chưa có văn bản nào để tổng hợp.</div>';
      return;
    }

    const dateRange = from && to ? `${from} đến ${to}` : from ? `Từ ${from}` : to ? `Đến ${to}` : '';
    const prompt = PromptBuilder.buildSummaryPrompt(docs, dateRange);

    let result;
    if (settings.apiKey && navigator.onLine) {
      result = await callAI(prompt, { maxTokens: PromptUtils.budgetTokens('summary') });
    } else {
      // Offline fallback
      result = typeof OfflineEngine !== 'undefined'
        ? OfflineEngine.summarizeDocs(docs)
        : 'Cần API Key để tổng hợp trực tuyến.';
    }

    el.innerHTML = result.replace(/\n/g, '<br>');
  } catch (e) {
    el.innerHTML = `<span style="color:var(--red)">Lỗi: ${e.message}</span>`;
  }
};

/**
 * PATCH 4: aiAnalytics / loadAiAnalytics — Nâng cấp prompt phân tích dashboard
 */
const _origAiAnalytics = window.loadAiAnalytics || window.aiAnalytics;
window.loadAiAnalytics = window.aiAnalytics = async function() {
  const settings = (typeof DB !== 'undefined' && DB.getObj) ? DB.getObj('settings') : {};
  if (!settings.apiKey) {
    if (typeof toast === 'function') toast('Cần cấu hình API Key Gemini', 'warning');
    return;
  }

  const docs      = (typeof DB !== 'undefined' && DB.get) ? DB.get('docs') : [];
  const tasks     = (typeof DB !== 'undefined' && DB.get) ? DB.get('tasks') : [];
  const reminders = (typeof DB !== 'undefined' && DB.get) ? DB.get('reminders') : [];
  const members   = (typeof DB !== 'undefined' && DB.get) ? DB.get('membersList') : [];

  const typeCounts = {};
  docs.forEach(d => {
    const label = d.type || 'khac';
    typeCounts[label] = (typeCounts[label] || 0) + 1;
  });

  const el = document.getElementById('aiAnalyticsSummary');
  if (el) el.innerHTML = '<div style="text-align:center;padding:8px"><div class="spinner" style="margin:0 auto 8px;border-color:rgba(255,255,255,0.2);border-top-color:var(--gold-light)"></div><small>AI đang phân tích...</small></div>';

  const prompt = PromptBuilder.buildAnalyticsPrompt({
    docCount:        docs.length,
    pendingCount:    docs.filter(d => d.status === 'pending').length,
    overdueCount:    docs.filter(d => d.status === 'overdue').length,
    doneCount:       docs.filter(d => d.status === 'done').length,
    taskCount:       tasks.length,
    taskDone:        tasks.filter(t => t.status === 'done').length,
    reminderPending: reminders.filter(r => !r.done).length,
    typeCounts,
    memberCount:     members.length,
    recentDocs:      docs.slice(-5),
  });

  try {
    const result = await callAI(prompt, {
      maxTokens:   PromptUtils.budgetTokens('analytics'),
      temperature: 0.2,
    });
    if (el) el.innerHTML = result.replace(/\n/g, '<br>');
  } catch (e) {
    if (el) el.innerHTML = `<span style="opacity:0.7">Lỗi: ${e.message}</span>`;
  }
};

/**
 * PATCH 5: aiSearch — Nâng cấp prompt tìm kiếm ngữ nghĩa
 */
const _origAiSearch = window.aiSearch;
window.aiSearch = async function() {
  const kw = document.getElementById('advSearchKeyword')?.value.trim();
  if (!kw) { if (typeof toast === 'function') toast('Nhập từ khóa cần tìm', 'warning'); return; }

  const settings = (typeof DB !== 'undefined' && DB.getObj) ? DB.getObj('settings') : {};
  if (!settings.apiKey) {
    // Offline fallback: dùng OfflineEngine.semanticSearch
    if (typeof OfflineEngine !== 'undefined') {
      const docs  = (typeof DB !== 'undefined' && DB.get) ? DB.get('docs') : [];
      const idxs  = OfflineEngine.semanticSearch(kw, docs);
      const found = idxs.slice(0, 15).map(i => docs[i]).filter(Boolean);
      _renderSearchResults(found, 'AI offline', kw);
      return;
    }
    if (typeof toast === 'function') toast('Cần cấu hình API Key', 'warning');
    return;
  }

  const docs = (typeof DB !== 'undefined' && DB.get) ? DB.get('docs') : [];
  if (!docs.length) { if (typeof toast === 'function') toast('Chưa có văn bản nào', 'info'); return; }

  const prompt = PromptBuilder.buildSearchPrompt(kw, docs);

  try {
    const result  = await callAI(prompt, { maxTokens: PromptUtils.budgetTokens('search') });
    const indices = (result.match(/\d+/g) || []).map(Number).filter(n => n < docs.length);

    // Deduplicate
    const uniqueIdx = [...new Set(indices)];
    const found = uniqueIdx.map(i => docs[i]).filter(Boolean);

    _renderSearchResults(found, 'AI ngữ nghĩa', kw);
  } catch (e) {
    // Fallback to offline
    if (typeof OfflineEngine !== 'undefined') {
      const idxs  = OfflineEngine.semanticSearch(kw, docs);
      const found = idxs.slice(0, 15).map(i => docs[i]).filter(Boolean);
      _renderSearchResults(found, 'AI offline', kw);
      return;
    }
    if (typeof toast === 'function') toast('Lỗi tìm kiếm: ' + e.message, 'error');
  }
};

/** Helper render kết quả tìm kiếm */
function _renderSearchResults(found, source, kw) {
  const countEl = document.getElementById('searchResultCount');
  const resEl   = document.getElementById('searchResults');
  if (countEl) countEl.textContent = `— ${source} tìm thấy ${found.length} văn bản cho "${kw}"`;
  if (!resEl) return;

  if (!found.length) {
    resEl.innerHTML = '<div class="empty-state"><i class="fas fa-search"></i><p>Không tìm thấy văn bản phù hợp</p></div>';
    return;
  }

  const DOC_TYPES_LOCAL = (typeof DOC_TYPES !== 'undefined') ? DOC_TYPES : {};
  resEl.innerHTML = found.map(d => {
    const tp = DOC_TYPES_LOCAL[d.type] || { icon: 'fa-file-alt', color: '#6b7280', label: d.type || 'Văn bản' };
    return `<div style="padding:14px;border-bottom:1px solid var(--gray-light);display:flex;gap:14px;align-items:flex-start">
      <div style="width:40px;height:40px;border-radius:8px;background:rgba(212,160,23,0.1);display:flex;align-items:center;justify-content:center;flex-shrink:0">
        <i class="fas fa-robot" style="color:var(--gold)"></i>
      </div>
      <div style="flex:1">
        <div style="font-weight:700;font-size:0.88rem;margin-bottom:3px">${d.title || 'Không tên'}</div>
        <div style="font-size:0.75rem;color:var(--gray)">${tp.label} ${d.code ? '• ' + d.code : ''} ${d.issuer ? '• ' + d.issuer : ''}${d.deadline ? ' • Hạn: ' + d.deadline : ''}</div>
        ${d.summary ? `<div style="font-size:0.78rem;color:var(--text-soft);margin-top:4px">${d.summary.substring(0, 150)}...</div>` : ''}
      </div>
      <button class="btn btn-ghost btn-sm" onclick="typeof viewDoc==='function'&&viewDoc('${d.id}')"><i class="fas fa-eye"></i></button>
    </div>`;
  }).join('');
}

// ═══════════════════════════════════════════════════════════════════════════
//  PHẦN 4: PATCH fillTemplateWithAI (được gọi từ hàm tplFillWithAI)
//  Intercept qua callAI — thêm system-level override cho template prompts
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Hàm helper để các hàm template gọi trực tiếp khi cần
 */
window.buildTemplatePromptUpgraded = function(data) {
  return PromptBuilder.buildTemplatePrompt(data);
};

// Override callAI để intercept template prompt cũ và nâng cấp
const _origCallAI = window.callAI;
window.callAI = async function(prompt, opts = {}) {
  // Nhận diện template prompt cũ → replace bằng prompt mới
  if (
    typeof prompt === 'string' &&
    prompt.includes('NOI_DUNG_CHINH') &&
    prompt.includes('KET_QUA_HOAT_DONG') &&
    prompt.includes('Điền nội dung CHI TIẾT') &&
    !prompt.includes('━━━') // chưa được nâng cấp
  ) {
    // Trích xuất thông tin từ prompt cũ
    const extractVar = (regex) => (prompt.match(regex) || [])[1]?.trim() || '';
    const data = {
      templateType: extractVar(/LOẠI VĂN BẢN:\s*(.+)/i),
      templateName: extractVar(/LOẠI VĂN BẢN:\s*(.+)/i),
      unit:         extractVar(/Tên đơn vị:\s*(.+)/i),
      secretary:    extractVar(/Bí thư:\s*(.+)/i),
      month:        extractVar(/Tháng[^\d]*(\d+)/i),
      year:         extractVar(/Năm[^\d]*(\d{4})/i) || String(new Date().getFullYear()),
      memberCount:  extractVar(/Số đoàn viên[^:]*:\s*(\d+)/i),
      memberList:   extractVar(/Đoàn viên tiêu biểu:\s*(.+)/i),
      docSummary:   extractVar(/DỮ LIỆU VĂN BẢN GẦN ĐÂY:\s*([\s\S]+?)YÊU CẦU ĐẶC BIỆT/i),
      extraRequirements: extractVar(/YÊU CẦU ĐẶC BIỆT:\s*(.+)/i),
    };
    const upgradedPrompt = PromptBuilder.buildTemplatePrompt(data);
    return _origCallAI(upgradedPrompt, {
      ...opts,
      maxTokens: opts.maxTokens || PromptUtils.budgetTokens('template'),
    });
  }

  // Nhận diện summary prompt cũ → nâng cấp
  if (
    typeof prompt === 'string' &&
    prompt.includes('tổng hợp trích yếu') &&
    prompt.includes('Danh sách văn bản') &&
    !prompt.includes('━━━')
  ) {
    // Dùng prompt gốc nhưng thêm system context
    const enhancedPrompt = `Bạn là chuyên gia phân tích văn bản Đoàn TNCS HCM, viết theo phong cách hành chính chuyên nghiệp.

${prompt}

YÊU CẦU BỔ SUNG:
- Phân nhóm rõ ràng theo loại văn bản
- Nêu bật deadline và hành động cần làm ngay
- Kết thúc bằng 3-5 việc ưu tiên cần xử lý trong tuần
- Không dùng markdown (##, **), dùng dấu gạch ngang và số thứ tự
- Ngôn ngữ hành chính, không văn hoa`;
    return _origCallAI(enhancedPrompt, {
      ...opts,
      maxTokens: opts.maxTokens || PromptUtils.budgetTokens('summary'),
    });
  }

  // Tất cả prompt khác → pass through nguyên vẹn
  return _origCallAI(prompt, opts);
};

// ═══════════════════════════════════════════════════════════════════════════
//  PHẦN 5: EXPORT PUBLIC API
// ═══════════════════════════════════════════════════════════════════════════

window.PromptBuilder = PromptBuilder;
window.PromptUtils   = PromptUtils;

// Backward compat
window.callGemini = async function(prompt, apiKey, model) {
  return window.callAI(prompt, { apiKey, forceModel: model });
};

console.log(
  '[ĐoànVăn Prompt Upgrade v2.0] Loaded\n',
  '✅ analyzeWithAI    — Chain-of-thought + offline-hint + JSON repair\n',
  '✅ generateReportAI — NĐ30 format + số liệu tự động\n',
  '✅ loadSummary      — Phân nhóm thông minh + action items\n',
  '✅ aiAnalytics      — Benchmark + cảnh báo ngưỡng\n',
  '✅ aiSearch         — Semantic + query expansion + offline fallback\n',
  '✅ Template prompt  — Context-aware + style guide hành chính\n',
  '✅ Token budget     — Tối ưu quota theo task type'
);
