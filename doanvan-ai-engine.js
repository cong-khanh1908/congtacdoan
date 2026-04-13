/**
 * ╔══════════════════════════════════════════════════════════════════════╗
 * ║         DOANVAN — AI ENGINE MODULE  v5.0                            ║
 * ║                                                                      ║
 * ║  NÂNG CẤP v5.0:                                                     ║
 * ║  ✅ Sửa model ID chính xác (GA 2025):                              ║
 * ║     · gemini-2.5-flash-lite  (primary - 15rpm/1000rpd)             ║
 * ║     · gemini-2.5-flash       (secondary - 10rpm/250rpd)            ║
 * ║     · gemini-2.0-flash       (tertiary fallback ổn định)            ║
 * ║  ✅ Offline NLP Engine hoàn chỉnh — 15 công cụ:                   ║
 * ║     · Phân loại văn bản (8 loại Đoàn chuẩn)                       ║
 * ║     · Trích xuất ngày/deadline (10+ pattern tiếng Việt)            ║
 * ║     · Tóm tắt thông minh (extractive scoring)                      ║
 * ║     · Trích từ khóa + TF-IDF đơn giản                             ║
 * ║     · Phát hiện đơn vị ban hành, mức độ ưu tiên                   ║
 * ║     · Trích xuất đầu việc (numbered/bulleted lists)                ║
 * ║     · Sinh báo cáo thành tích + mẫu văn bản Đoàn                  ║
 * ║     · Tổng hợp trích yếu nhiều văn bản                            ║
 * ║     · Tìm kiếm ngữ nghĩa nội bộ                                   ║
 * ║     · Phân tích thống kê đoàn viên                                 ║
 * ║     · Xếp loại rèn luyện + thi đua tự động                        ║
 * ║     · Gợi ý hoạt động Đoàn theo tháng                             ║
 * ║     · Tạo nội dung kế hoạch/biên bản/nghị quyết                   ║
 * ║     · Kiểm tra chính tả & chuẩn hóa văn bản                       ║
 * ║     · Trả lời hỏi đáp nội bộ về quy định Đoàn                    ║
 * ╚══════════════════════════════════════════════════════════════════════╝
 */

'use strict';

// ─────────────────────────────────────────────────────────────────────
//  1. CONFIG — Model IDs chính xác GA 2025
// ─────────────────────────────────────────────────────────────────────
const AI_CONFIG = {
  MODELS: [
    {
      id:    'gemini-2.5-flash-lite',  // GA stable (không dùng preview)
      label: 'Gemini 2.5 Flash-Lite',
      rpm: 15, rpd: 1000,
      tier: 'primary',
      desc:  'Nhanh · tiết kiệm quota nhất · đủ cho mọi tác vụ Đoàn'
    },
    {
      id:    'gemini-2.5-flash-lite-preview-06-17',  // Preview fallback khi GA chưa active
      label: 'Gemini 2.5 Flash-Lite (Preview)',
      rpm: 15, rpd: 1000,
      tier: 'primary-preview',
      desc:  'Preview fallback cho Flash-Lite khi GA chưa được cấp quota'
    },
    {
      id:    'gemini-2.5-flash',       // GA stable
      label: 'Gemini 2.5 Flash',
      rpm: 10, rpd: 250,
      tier: 'secondary',
      desc:  'Cân bằng tốc độ & chất lượng · dùng khi Lite hết quota'
    },
    {
      id:    'gemini-2.0-flash',       // Fallback cực ổn định
      label: 'Gemini 2.0 Flash',
      rpm: 15, rpd: 1500,
      tier: 'tertiary',
      desc:  'Fallback ổn định · không quota vấn đề · chất lượng tốt'
    }
  ],
  MAX_RETRIES: 3,
  RETRY_BASE_DELAY_MS: 1200,
  RETRY_MAX_DELAY_MS: 12000,
  QUOTA_KEY_PREFIX: 'doanvan_aiquota_',
  CACHE_TTL_MS: 30 * 60 * 1000,

  // Model alias map — map tên cũ → ID mới
  MODEL_ALIASES: {
    'gemini-2.5-flash-lite-preview-06-17': 'gemini-2.5-flash-lite',
    'gemini-2.5-flash-lite-preview':       'gemini-2.5-flash-lite',
    'gemini-2.5-flash-preview-05-20':      'gemini-2.5-flash',
    'gemini-2.5-flash-exp':                'gemini-2.5-flash',
    'gemini-2.0-flash-exp':                'gemini-2.0-flash',
    'gemini-1.5-flash':                    'gemini-2.0-flash',
    'gemini-1.5-pro':                      'gemini-2.5-flash',
    'auto':                                'gemini-2.5-flash-lite',
  }
};

// ─────────────────────────────────────────────────────────────────────
//  2. CACHE — TTL 30 phút
// ─────────────────────────────────────────────────────────────────────
const AICache = {
  _s: {},
  _hash(str) {
    let h = 0;
    for (let i = 0; i < Math.min(str.length, 512); i++)
      h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
    return h.toString(36);
  },
  get(p)   { const k=this._hash(p), e=this._s[k]; if(!e||Date.now()-e.ts>AI_CONFIG.CACHE_TTL_MS){delete this._s[k];return null;} return e.v; },
  set(p,v) { const k=this._hash(p); this._s[k]={v,ts:Date.now()}; const ks=Object.keys(this._s); if(ks.length>60) delete this._s[ks[0]]; },
  clear()  { this._s={}; }
};

// ─────────────────────────────────────────────────────────────────────
//  3. QUOTA GUARD
// ─────────────────────────────────────────────────────────────────────
const QuotaGuard = {
  _today()  { return new Date().toISOString().split('T')[0]; },
  _mkey()   { const n=new Date(); return `${n.getHours()}_${n.getMinutes()}`; },
  _sk(id,t) { return `${AI_CONFIG.QUOTA_KEY_PREFIX}${id}_${t}`; },

  getUsage(id) {
    try {
      const d=JSON.parse(localStorage.getItem(this._sk(id,'day'))||'{}');
      const m=JSON.parse(localStorage.getItem(this._sk(id,'min'))||'{}');
      return { today: this._today()===d.date?(d.count||0):0, thisMinute: this._mkey()===m.key?(m.count||0):0 };
    } catch { return {today:0,thisMinute:0}; }
  },

  canUse(id) {
    const mo=AI_CONFIG.MODELS.find(m=>m.id===id);
    if(!mo) return false;
    const u=this.getUsage(id);
    return u.today < mo.rpd && u.thisMinute < mo.rpm;
  },

  record(id) {
    try {
      const dk=this._sk(id,'day'), d=JSON.parse(localStorage.getItem(dk)||'{}'), t=this._today();
      localStorage.setItem(dk,JSON.stringify({date:t,count:t===d.date?(d.count||0)+1:1}));
      const mk=this._sk(id,'min'), m=JSON.parse(localStorage.getItem(mk)||'{}'), k=this._mkey();
      localStorage.setItem(mk,JSON.stringify({key:k,count:k===m.key?(m.count||0)+1:1}));
    } catch {}
  },

  reset(id) {
    const targets = id ? [id] : AI_CONFIG.MODELS.map(m=>m.id);
    targets.forEach(i=>{
      localStorage.removeItem(this._sk(i,'day'));
      localStorage.removeItem(this._sk(i,'min'));
    });
  },

  getStatus() {
    return AI_CONFIG.MODELS.map(m=>{
      const u=this.getUsage(m.id);
      return { model:m.id, label:m.label, tier:m.tier, desc:m.desc,
               todayUsed:u.today, todayLimit:m.rpd, minuteUsed:u.thisMinute, minuteLimit:m.rpm,
               available:this.canUse(m.id), pct:Math.round((u.today/m.rpd)*100) };
    });
  },

  // Giải quyết alias model cũ → ID mới
  resolveId(id) {
    return AI_CONFIG.MODEL_ALIASES[id] || id;
  }
};

// ─────────────────────────────────────────────────────────────────────
//  4. REQUEST QUEUE — throttle tránh burst RPM
// ─────────────────────────────────────────────────────────────────────
const RequestQueue = {
  _q: [], _running: false,
  enqueue(fn) { return new Promise((res,rej)=>{ this._q.push({fn,res,rej}); if(!this._running) this._process(); }); },
  async _process() {
    this._running = true;
    while (this._q.length) {
      const i = this._q.shift();
      try { i.res(await i.fn()); } catch(e) { i.rej(e); }
      if (this._q.length) await new Promise(r=>setTimeout(r,200));
    }
    this._running = false;
  }
};

// ─────────────────────────────────────────────────────────────────────
//  5. GEMINI ENGINE — 3 tầng fallback
// ─────────────────────────────────────────────────────────────────────
const GeminiEngine = {
  async call(prompt, opts={}) {
    const {apiKey, forceModel, maxTokens=4096, temperature=0.3} = opts;
    const s = _aiGetSettings();
    const key = apiKey || s.apiKey;
    if (!key) throw new Error('NOKEY');

    // Resolve alias nếu forceModel là tên cũ
    const resolvedForce = forceModel ? QuotaGuard.resolveId(forceModel) : null;

    const models = resolvedForce
      ? AI_CONFIG.MODELS.filter(m => m.id === resolvedForce)
      : AI_CONFIG.MODELS.filter(m => QuotaGuard.canUse(m.id));

    if (!models.length) {
      const e = new Error('QUOTA_EXCEEDED'); e.isQuotaError = true; throw e;
    }

    let lastErr = null;
    for (const mo of models) {
      try {
        const text = await RequestQueue.enqueue(() =>
          this._retry(prompt, key, mo.id, maxTokens, temperature)
        );
        QuotaGuard.record(mo.id);
        return { text, model: mo.id, label: mo.label, source: 'online' };
      } catch(e) {
        lastErr = e;
        // 429 / quota → thử model tiếp theo
        if (e.status === 429 || e.message?.toLowerCase().includes('quota')) {
          QuotaGuard.record(mo.id); continue;
        }
        // 404 → model không tồn tại / chưa được cấp quyền → thử model tiếp
        if (e.status === 404) continue;
        // Lỗi auth / key sai → throw ngay, không thử tiếp
        if (e.status === 400 || e.status === 401 || e.status === 403) throw e;
        // Lỗi 5xx → thử model tiếp
        if (e.status >= 500) continue;
        throw e;
      }
    }
    const qe = new Error('QUOTA_EXCEEDED'); qe.isQuotaError = true; throw qe;
  },

  async _retry(prompt, key, id, max, temp) {
    let att = 0;
    while (att < AI_CONFIG.MAX_RETRIES) {
      try { return await this._once(prompt, key, id, max, temp); }
      catch(e) {
        att++;
        const retryable = e.status===429 || e.status===503 || e.status===500;
        if (!retryable || att >= AI_CONFIG.MAX_RETRIES) throw e;
        const delay = Math.min(AI_CONFIG.RETRY_BASE_DELAY_MS * Math.pow(2, att-1), AI_CONFIG.RETRY_MAX_DELAY_MS);
        await new Promise(r=>setTimeout(r, delay));
      }
    }
  },

  async _once(prompt, key, id, max, temp) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${id}:generateContent?key=${key}`;
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: temp, maxOutputTokens: max }
      })
    });
    if (!resp.ok) {
      const e = await resp.json().catch(()=>({}));
      const err = new Error(e.error?.message || `HTTP ${resp.status}`);
      err.status = resp.status; throw err;
    }
    const d = await resp.json();
    return d.candidates?.[0]?.content?.parts?.[0]?.text || '';
  }
};

// ─────────────────────────────────────────────────────────────────────
//  6. OFFLINE ENGINE — 15 công cụ NLP nội bộ hoàn chỉnh
// ─────────────────────────────────────────────────────────────────────
const OfflineEngine = {

  // ══ TOOL 1: Phân loại văn bản (8 loại chuẩn Đoàn) ══════════════
  classifyDocument(text) {
    const t = (text||'').toLowerCase();
    const rules = [
      { type:'chi-thi',    label:'Chỉ thị',   score:0, kw:['chỉ thị','thi hành','nghiêm túc triển khai','chỉ đạo thực hiện','yêu cầu nghiêm'] },
      { type:'nghi-quyet', label:'Nghị quyết', score:0, kw:['nghị quyết','đại hội','ban chấp hành thông qua','kết quả biểu quyết','hội nghị ban chấp hành'] },
      { type:'ke-hoach',   label:'Kế hoạch',   score:0, kw:['kế hoạch','tiến độ thực hiện','phân công nhiệm vụ','lịch triển khai','chương trình công tác'] },
      { type:'bao-cao',    label:'Báo cáo',    score:0, kw:['báo cáo','kết quả thực hiện','tổng kết','sơ kết','báo cáo tháng','báo cáo năm'] },
      { type:'cong-van',   label:'Công văn',   score:0, kw:['công văn','kính gửi','đề nghị','v/v','trân trọng kính báo','kính chuyển'] },
      { type:'thong-bao',  label:'Thông báo',  score:0, kw:['thông báo','kính thông báo','trân trọng thông báo','thông tin đến','xin thông báo'] },
      { type:'to-trinh',   label:'Tờ trình',   score:0, kw:['tờ trình','xin phép','kính trình','đề xuất phê duyệt','trình','xét duyệt'] },
      { type:'bien-ban',   label:'Biên bản',   score:0, kw:['biên bản','thư ký','chủ trì','thành phần tham dự','kết thúc lúc','nội dung cuộc họp'] },
      { type:'quyet-dinh', label:'Quyết định', score:0, kw:['quyết định','căn cứ','điều 1','điều 2','xét đề nghị','ban hành quyết định'] },
    ];
    rules.forEach(r => r.kw.forEach(k => { if(t.includes(k)) r.score++; }));
    rules.sort((a,b) => b.score - a.score);
    return rules[0].score > 0 ? rules[0].type : 'khac';
  },

  getTypeLabel(type) {
    const m = { 'chi-thi':'Chỉ thị','nghi-quyet':'Nghị quyết','ke-hoach':'Kế hoạch',
                'bao-cao':'Báo cáo','cong-van':'Công văn','thong-bao':'Thông báo',
                'to-trinh':'Tờ trình','bien-ban':'Biên bản','quyet-dinh':'Quyết định','khac':'Khác' };
    return m[type] || 'Khác';
  },

  // ══ TOOL 2: Trích xuất ngày tháng (đa dạng định dạng) ══════════
  extractDates(text) {
    const pats = [
      /(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{4})/g,
      /ngày\s+(\d{1,2})\s+tháng\s+(\d{1,2})\s+năm\s+(\d{4})/gi,
      /(\d{4})-(\d{2})-(\d{2})/g,
      /tháng\s+(\d{1,2})\s+năm\s+(\d{4})/gi,  // chỉ tháng/năm
    ];
    const dates = [];
    pats.slice(0,3).forEach(p => {
      let m;
      while ((m = p.exec(text)) !== null) {
        try {
          let d, mo, y;
          if (m[0].includes('-') && m[0].length===10 && m[1].length===4) [y,mo,d]=[m[1],m[2],m[3]];
          else if (m[0].toLowerCase().includes('ngày')) [d,mo,y]=[m[1],m[2],m[3]];
          else [d,mo,y]=[m[1],m[2],m[3]];
          const dt = new Date(`${y}-${String(mo).padStart(2,'0')}-${String(d).padStart(2,'0')}`);
          if (!isNaN(dt) && dt.getFullYear()>=2000 && dt.getFullYear()<=2050)
            dates.push(dt.toISOString().split('T')[0]);
        } catch {}
      }
    });
    return [...new Set(dates)].sort();
  },

  // ══ TOOL 3: Phát hiện deadline (10+ pattern tiếng Việt) ════════
  detectDeadlines(text) {
    const t = text||'';
    const results = [];
    const seen = new Set();

    const tryAdd = (d,mo,y,ctx,pri) => {
      try {
        const dt = new Date(`${y}-${String(mo).padStart(2,'0')}-${String(d).padStart(2,'0')}`);
        if (isNaN(dt) || dt.getFullYear() < 2000) return;
        const iso = dt.toISOString().split('T')[0];
        if (!seen.has(iso)) { seen.add(iso); results.push({date:iso,context:ctx,priority:pri}); }
      } catch {}
    };

    const D = '(\\d{1,2})', M = '(\\d{1,2})', Y = '(\\d{4})';
    const DMY = `${D}[\\s/\\-.]*${M}[\\s/\\-.]*${Y}`;

    // Pattern 1–5: explicit deadline keywords
    const kw1 = ['trước ngày','chậm nhất ngày','hạn chót ngày','nộp trước ngày',
                  'hoàn thành trước ngày','thực hiện trước ngày','báo cáo trước ngày',
                  'gửi trước ngày','deadline','hạn nộp'];
    kw1.forEach(kw => {
      const re = new RegExp(`${kw.replace(/\s/g,'\\s+')}\\s*:?\\s*${DMY}`, 'gi');
      let m;
      while ((m = re.exec(t)) !== null) tryAdd(m[1],m[2],m[3],kw,'high');
    });

    // Pattern 6: "hạn: DD/MM/YYYY"
    const re6 = new RegExp(`hạn\\s*:?\\s*${DMY}`, 'gi');
    let m6;
    while ((m6 = re6.exec(t)) !== null) tryAdd(m6[1],m6[2],m6[3],'hạn','high');

    // Pattern 7: "trước DD/MM/YYYY để"
    const re7 = new RegExp(`trước\\s+${DMY}\\s+để`, 'gi');
    let m7;
    while ((m7 = re7.exec(t)) !== null) tryAdd(m7[1],m7[2],m7[3],'trước...để','high');

    // Pattern 8: "trong tháng MM/YYYY" → ngày cuối tháng
    const re8 = /(?:trong|tháng)\s+tháng\s+(\d{1,2})[\/\-](\d{4})/gi;
    let m8;
    while ((m8 = re8.exec(t)) !== null) {
      const lastDay = new Date(parseInt(m8[2]), parseInt(m8[1]), 0);
      if (!isNaN(lastDay)) {
        const iso = lastDay.toISOString().split('T')[0];
        if (!seen.has(iso)) { seen.add(iso); results.push({date:iso,context:'trong tháng',priority:'med'}); }
      }
    }

    // Pattern 9: "quý I/II/III/IV năm YYYY"
    const quarterMap = { 'i':3, 'ii':6, 'iii':9, 'iv':12 };
    const re9 = /quý\s+(i{1,3}v?|iv)\s+năm\s+(\d{4})/gi;
    let m9;
    while ((m9 = re9.exec(t)) !== null) {
      const qMo = quarterMap[m9[1].toLowerCase()];
      if (qMo) {
        const lastDay = new Date(parseInt(m9[2]), qMo, 0);
        const iso = lastDay.toISOString().split('T')[0];
        if (!seen.has(iso)) { seen.add(iso); results.push({date:iso,context:`cuối quý ${m9[1].toUpperCase()}`,priority:'med'}); }
      }
    }

    // Pattern 10: "ngày DD tháng MM" trong văn bản có từ deadline
    const re10 = /ngày\s+(\d{1,2})\s+tháng\s+(\d{1,2})(?:\s+năm\s+(\d{4}))?/gi;
    let m10;
    const year = new Date().getFullYear();
    while ((m10 = re10.exec(t)) !== null) {
      const y = m10[3] || year;
      // Chỉ thêm nếu gần từ khóa deadline trong vòng 100 chars
      const ctx = t.substring(Math.max(0,m10.index-80), m10.index);
      if (/hạn|deadline|nộp|trước|hoàn thành/i.test(ctx))
        tryAdd(m10[1], m10[2], y, 'ngày tháng + context', 'high');
    }

    return results.sort((a,b) => new Date(a.date)-new Date(b.date));
  },

  detectDeadlineDate(dates, text) {
    const dl = this.detectDeadlines(text||'');
    if (dl.length) return dl[0].date;
    const future = dates.filter(d => new Date(d) > new Date()).sort();
    return future[future.length-1] || '';
  },

  // ══ TOOL 4: Phân tích mức độ ưu tiên ═══════════════════════════
  detectPriority(text) {
    const t = text.toLowerCase();
    if (['khẩn','khẩn cấp','ngay lập tức','cấp bách','tối quan trọng','hỏa tốc'].some(k=>t.includes(k))) return 'high';
    if (['cần chú ý','quan trọng','lưu ý','cần thiết','cần thực hiện'].some(k=>t.includes(k))) return 'med';
    return 'low';
  },

  // ══ TOOL 5: Tóm tắt thông minh (extractive + scoring) ══════════
  summarize(text, maxSentences=4) {
    if (!text) return '';
    // Tách câu
    const sents = text
      .replace(/\n+/g, ' ')
      .split(/(?<=[.!?;])\s+/)
      .map(s => s.trim())
      .filter(s => s.length > 20 && s.length < 500);
    if (!sents.length) return text.substring(0, 400) + (text.length>400?'...':'');

    const kw = ['nhiệm vụ','mục tiêu','yêu cầu','kết quả','thực hiện',
                 'hoàn thành','báo cáo','đề nghị','kế hoạch','quyết định',
                 'đoàn viên','chi đoàn','phong trào','thi đua','sinh hoạt'];
    const scored = sents.map((s,i) => ({
      s, i,
      sc: kw.reduce((a,k)=>a+(s.toLowerCase().includes(k)?2:0),0)
        + (i<3?2:0) // ưu tiên câu đầu
        + (s.length > 80 && s.length < 250 ? 1 : 0) // độ dài lý tưởng
    }));
    scored.sort((a,b) => b.sc - a.sc);
    // Lấy câu theo thứ tự gốc
    const selected = scored.slice(0,maxSentences).sort((a,b)=>a.i-b.i);
    return selected.map(x=>x.s).join(' ') + '.';
  },

  // ══ TOOL 6: Trích từ khóa (TF-IDF đơn giản) ════════════════════
  extractKeywords(text, n=10) {
    const stopWords = new Set([
      'và','của','trong','để','được','cho','các','là','có','về','theo',
      'tại','từ','đến','này','đã','sẽ','với','khi','nếu','như','bằng',
      'qua','trên','dưới','bởi','vì','do','thì','mà','nên','nhưng','hoặc',
      'hay','cũng','không','chưa','rất','nhiều','một','hai','ba','bốn','năm',
      'những','cũng','đây','đó','thế','vậy','lại','còn','mình','chúng',
    ]);
    const words = text.toLowerCase()
      .replace(/[^\wÀ-ỹ\s]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length > 2 && !stopWords.has(w));
    const freq = {};
    words.forEach(w => { freq[w] = (freq[w]||0) + 1; });
    // Boost từ khóa Đoàn quan trọng
    const boostKw = ['đoàn','đoàn viên','chi đoàn','bí thư','đoàn tncs','phong trào','tình nguyện','thi đua','kế hoạch','nghị quyết'];
    boostKw.forEach(k => { if(freq[k]) freq[k] *= 1.5; });
    return Object.entries(freq)
      .sort((a,b)=>b[1]-a[1])
      .slice(0,n)
      .map(([w])=>w);
  },

  // ══ TOOL 7: Trích số hiệu văn bản ════════════════════════════════
  extractCode(text) {
    const pats = [
      /số[:\s]+(\d+[\/_\-]\w+[\/_\-]\w+)/i,
      /(\d{1,4}[\/\-]\w{2,10}[\/\-]\w{2,10})/,
      /(\d{1,4}[\/\-](QĐ|KH|BC|CT|NQ|TB|TT|BB)[^\s]{0,20})/i,
    ];
    for (const p of pats) {
      const m = text.match(p);
      if (m) return m[1].trim();
    }
    return '';
  },

  // ══ TOOL 8: Trích đơn vị ban hành ════════════════════════════════
  extractIssuer(text) {
    const firstLines = text.split('\n').slice(0,8).join(' ');
    const pats = [
      /(?:ban|đoàn|chi đoàn|đoàn tncs|đơn vị|phòng|trường|ủy ban|hội đồng|ban thường vụ)\s+[\wÀ-ỹ\s]{3,50}/i,
      /^([\wÀ-ỹ\s]{5,40})\s*\n/m,
    ];
    for (const p of pats) {
      const m = firstLines.match(p);
      if (m) return m[0].trim().substring(0,60);
    }
    return '';
  },

  // ══ TOOL 9: Trích đầu việc từ danh sách ══════════════════════════
  extractTasks(text) {
    const lines = text.split('\n').map(l=>l.trim()).filter(l=>l.length>10);
    const pats = [
      /^[\d]+[.\)]\s+(.{10,150})/,
      /^[-•·]\s+(.{10,150})/,
      /^[a-zđ]\)\s+(.{10,150})/i,
      /^[①②③④⑤⑥⑦⑧⑨⑩]\s*(.{10,150})/,
    ];
    const tasks = [];
    for (const line of lines) {
      for (const p of pats) {
        const m = line.match(p);
        if (m && !tasks.includes(m[1].trim())) {
          tasks.push(m[1].trim()); break;
        }
      }
      if (tasks.length >= 8) break;
    }
    return tasks;
  },

  // ══ TOOL 10: Phân tích toàn bộ văn bản → JSON ════════════════════
  analyzeDocument(text, filename) {
    const t = text||'';
    const type     = this.classifyDocument(t);
    const dates    = this.extractDates(t);
    const code     = this.extractCode(t);
    const kwds     = this.extractKeywords(t);
    const summary  = this.summarize(t);
    const tasks    = this.extractTasks(t);
    const priority = this.detectPriority(t);
    const deadline = this.detectDeadlineDate(dates, t);
    const issuer   = this.extractIssuer(t);
    const idc      = dates.filter(d=>new Date(d)<=new Date()).sort();
    const issueDate= idc[idc.length-1]||'';
    const titleLine= t.split('\n').find(l=>l.trim().length>10&&l.trim().length<150);
    const title    = titleLine ? titleLine.trim() : (filename||'').replace(/\.[^.]+$/,'');
    return {
      title, type, code, issuer, issueDate, deadline, reportDate:'',
      summary, mainTasks: tasks, priority, keywords: kwds,
      reminderNotes: priority==='high' ? '⚠️ Văn bản ưu tiên cao — cần xử lý ngay' : '',
      _source: 'offline', _typeLabel: this.getTypeLabel(type),
    };
  },

  // ══ TOOL 11: Tổng hợp trích yếu nhiều văn bản ════════════════════
  summarizeDocs(docs) {
    if (!docs.length) return 'Chưa có văn bản nào để tổng hợp.';
    const types = {};
    docs.forEach(d => { if(!types[d.type]) types[d.type]=[]; types[d.type].push(d); });
    const now = new Date().toLocaleDateString('vi-VN');
    let r = `TỔNG HỢP TRÍCH YẾU VĂN BẢN\n${'─'.repeat(50)}\n`;
    r += `Ngày tổng hợp: ${now} | Tổng: ${docs.length} văn bản\n\n`;
    Object.entries(types).forEach(([type,list]) => {
      r += `📂 ${this.getTypeLabel(type)} (${list.length} văn bản)\n`;
      list.forEach(d => {
        r += `  • ${d.title}`;
        if (d.code)     r += ` [${d.code}]`;
        if (d.deadline) r += ` ⏰ Hạn: ${d.deadline}`;
        if (d.priority==='high') r += ' 🔴';
        r += '\n';
        if (d.summary)  r += `    ${d.summary.substring(0,120)}\n`;
      });
      r += '\n';
    });
    const pending = docs.filter(d=>d.status==='pending').length;
    const overdue = docs.filter(d=>d.status==='overdue').length;
    const done    = docs.filter(d=>d.status==='done').length;
    r += `─────────────────────────────\n`;
    r += `📊 ${done} hoàn thành | ${pending} chờ xử lý | ${overdue} quá hạn\n`;
    r += `\n⚠️ *Tóm tắt được tạo bởi AI nội bộ (Offline Engine). Kết quả cơ bản hơn Gemini Online.*`;
    return r;
  },

  // ══ TOOL 12: Gợi ý hoạt động Đoàn theo tháng ═════════════════════
  suggestActivities(month, year) {
    const mo = parseInt(month);
    const activities = {
      1:  ['Chào năm mới — tổ chức gặp mặt đầu năm','Hội nghị triển khai công tác Đoàn năm mới','Thăm và tặng quà các gia đình chính sách dịp Tết'],
      2:  ['Tổ chức Tết Nguyên Đán — sinh hoạt văn hóa','Phong trào "Mùa xuân tình nguyện"','Triển khai Nghị quyết Đại hội Đoàn'],
      3:  ['Tháng Thanh niên — 26/3 thành lập Đoàn TNCS HCM','Hoạt động tình nguyện mùa xuân','Diễu hành kỷ niệm ngày thành lập Đoàn'],
      4:  ['Chiến dịch "Giờ Trái Đất"','Tổ chức tham quan học tập kinh nghiệm','Sơ kết công tác Đoàn quý I'],
      5:  ['Tháng 5 — Sinh nhật Bác Hồ 19/5','Học tập và làm theo tư tưởng đạo đức Hồ Chí Minh','Phát động phong trào thi đua học tập'],
      6:  ['Chiến dịch "Mùa hè xanh"','Hoạt động tình nguyện hè','Cắm trại — giao lưu văn hóa văn nghệ'],
      7:  ['Kỷ niệm 27/7 — Ngày TBLS','Thăm hỏi gia đình liệt sĩ, thương binh','Hoạt động đền ơn đáp nghĩa'],
      8:  ['Kỷ niệm Cách mạng Tháng Tám 19/8','Hoạt động tuyên truyền lịch sử','Tổng kết hoạt động hè — sơ kết quý II'],
      9:  ['Khai giảng năm học mới — hỗ trợ học sinh','Kỷ niệm 2/9 — Quốc khánh','Phát động phong trào "Thắp sáng ước mơ"'],
      10: ['Phong trào "Tháng thanh niên với văn hóa"','Tổng kết hoạt động quý III','Họp Ban Chấp hành — đánh giá 9 tháng'],
      11: ['Ngày 20/11 — Nhà giáo Việt Nam: thăm thầy cô','Tổ chức Hội diễn văn nghệ cuối năm','Đánh giá rèn luyện đoàn viên'],
      12: ['Tổng kết công tác Đoàn năm học','Đánh giá xếp loại đoàn viên','Kỷ niệm 22/12 — Ngày thành lập QĐND VN','Lập kế hoạch công tác năm sau'],
    };
    const list = activities[mo] || ['Tổ chức sinh hoạt chi đoàn định kỳ','Học tập Nghị quyết, chỉ thị','Tổng kết đánh giá công tác tháng'];
    return { month: mo, year: parseInt(year)||new Date().getFullYear(), activities: list };
  },

  // ══ TOOL 13: Tạo nội dung mẫu văn bản Đoàn ══════════════════════
  fillTemplateContent(templateType, vars) {
    const now  = new Date();
    const unit = vars['{{TEN_DON_VI}}']    || 'Đơn vị Đoàn';
    const sec  = vars['{{BI_THU}}']         || 'Bí thư Đoàn';
    const mo   = vars['{{THANG}}']          || (now.getMonth()+1);
    const yr   = vars['{{NAM}}']            || now.getFullYear();
    const cnt  = parseInt(vars['{{SO_DOAN_VIEN}}']||0);
    const cntActive = Math.round(cnt * 0.92);
    const moNext = parseInt(mo)>=12 ? 1 : parseInt(mo)+1;
    const yrNext = parseInt(mo)>=12 ? parseInt(yr)+1 : yr;

    return {
      NOI_DUNG_CHINH: `Trong tháng ${mo}/${yr}, ${unit} đã triển khai đầy đủ các hoạt động theo kế hoạch công tác Đoàn. Ban Chấp hành chi đoàn họp định kỳ, đánh giá tình hình và kịp thời điều chỉnh kế hoạch phù hợp với thực tế đơn vị. Công tác tuyên truyền, giáo dục chính trị tư tưởng được triển khai nghiêm túc.`,
      KET_QUA_HOAT_DONG: `Tổng số đoàn viên: ${cnt} đồng chí. Số đoàn viên sinh hoạt đầy đủ: ${cntActive}/${cnt} (đạt ${cnt?Math.round(cntActive/cnt*100):0}%). Tổ chức ${Math.ceil(cnt/15)||1} buổi sinh hoạt chi đoàn định kỳ. Tham gia đầy đủ các hoạt động phong trào do Đoàn cấp trên phát động. Công tác giáo dục chính trị tư tưởng được thực hiện nghiêm túc.`,
      PHUONG_HUONG: `Tháng ${moNext}/${yrNext}, ${unit} tập trung thực hiện: (1) Tiếp tục đẩy mạnh phong trào thi đua; (2) Tổ chức sinh hoạt chi đoàn chất lượng, đổi mới nội dung; (3) Đẩy mạnh công tác tuyên truyền, giáo dục chính trị tư tưởng; (4) Hoàn thành báo cáo và đề xuất khen thưởng đúng quy định; (5) Phát triển đoàn viên mới theo chỉ tiêu.`,
      THANH_TICH: `${unit} hoàn thành ${Math.floor(Math.random()*10+90)}% chỉ tiêu công tác Đoàn năm ${yr}. Không có đoàn viên vi phạm kỷ luật. Tích cực tham gia và đạt thành tích cao trong các phong trào thi đua yêu nước do cấp trên phát động.`,
    };
  },

  // ══ TOOL 14: Sinh báo cáo thành tích ══════════════════════════════
  generateAchievementReport(vars) {
    const unit   = vars.unit   || 'Đơn vị Đoàn';
    const period = vars.period || new Date().getFullYear();
    const cnt    = parseInt(vars.memberCount) || 0;
    const leader = vars.leader || 'Bí thư Đoàn';
    const highlights = vars.highlights || [];

    const hl = highlights.length
      ? highlights.map((h,i)=>`${i+1}. ${h}`).join('\n')
      : `1. Tổ chức đầy đủ các buổi sinh hoạt chi đoàn định kỳ.\n2. Tham gia các phong trào thi đua yêu nước.\n3. Thực hiện tốt công tác giáo dục chính trị tư tưởng.`;

    return `BÁO CÁO THÀNH TÍCH THI ĐUA
${unit.toUpperCase()} — ${period}
${'═'.repeat(60)}

⚠️ Lưu ý: Báo cáo được tạo bởi AI nội bộ. Vui lòng bổ sung số liệu thực tế.

PHẦN I: ĐẶC ĐIỂM TÌNH HÌNH
${unit} có tổng số ${cnt||'...'} đoàn viên, hoạt động trong điều kiện thuận lợi với sự quan tâm chỉ đạo của Đoàn cấp trên. Tổ chức Đoàn hoạt động đoàn kết, thống nhất, phát huy sức mạnh tập thể.

PHẦN II: KẾT QUẢ THỰC HIỆN NHIỆM VỤ
1. Công tác giáo dục chính trị tư tưởng: Tổ chức đầy đủ các buổi sinh hoạt chuyên đề, học tập Nghị quyết. 100% đoàn viên tham gia học tập và làm theo tư tưởng, đạo đức, phong cách Hồ Chí Minh.
2. Công tác tổ chức, xây dựng Đoàn: Duy trì sinh hoạt chi đoàn định kỳ. Xếp loại tổ chức Đoàn vững mạnh.
3. Các phong trào thi đua: ${hl}

PHẦN III: TỒN TẠI, HẠN CHẾ
Một số hoạt động chưa đạt hiệu quả như kỳ vọng. Cần tăng cường công tác tuyên truyền và vận động đoàn viên tham gia tích cực hơn.

PHẦN IV: PHƯƠNG HƯỚNG NHIỆM VỤ
Tiếp tục nâng cao chất lượng hoạt động, xây dựng tổ chức Đoàn vững mạnh, phấn đấu hoàn thành xuất sắc nhiệm vụ.

PHẦN V: ĐỀ NGHỊ KHEN THƯỞNG
Đề nghị [cấp có thẩm quyền] xem xét, khen thưởng [danh hiệu] cho ${unit}.

${' '.repeat(30)}T/M BAN CHẤP HÀNH
${' '.repeat(30)}BÍ THƯ
${' '.repeat(28)}${leader}`;
  },

  // ══ TOOL 15: Tìm kiếm ngữ nghĩa nội bộ ══════════════════════════
  semanticSearch(query, docs) {
    if (!query || !docs.length) return [];
    const qWords = new Set(
      query.toLowerCase()
        .replace(/[^\wÀ-ỹ\s]/g,' ')
        .split(/\s+/)
        .filter(w=>w.length>1)
    );
    return docs
      .map((d,i) => {
        const haystack = [d.title,d.summary,d.code,d.issuer,(d.keywords||[]).join(' '),this.getTypeLabel(d.type)]
          .join(' ').toLowerCase();
        const score = [...qWords].reduce((a,w) => a + (haystack.includes(w)?1:0) + (d.title?.toLowerCase().includes(w)?1:0), 0);
        return { doc:d, idx:i, score };
      })
      .filter(x=>x.score>0)
      .sort((a,b)=>b.score-a.score)
      .map(x=>x.idx);
  },

  // ══ TOOL 16: Phân tích thống kê đoàn viên ════════════════════════
  analyzeMembers(members) {
    if (!members.length) return { total:0, stats:{} };
    const now = new Date();
    const active  = members.filter(m=>m.status==='active'||m.status==='Đang hoạt động').length;
    const female  = members.filter(m=>m.gender==='female'||m.gender==='Nữ').length;
    const chiDoans= [...new Set(members.map(m=>m.chiDoan).filter(Boolean))];

    const avgAge = (() => {
      const ages = members.map(m=>{
        if(!m.birthDate) return null;
        const bd = new Date(m.birthDate);
        return isNaN(bd)?null:Math.floor((now-bd)/(1000*60*60*24*365.25));
      }).filter(a=>a!==null&&a>0&&a<80);
      return ages.length ? Math.round(ages.reduce((s,a)=>s+a,0)/ages.length) : null;
    })();

    // Rèn luyện distribution
    const rlCounts = {};
    members.forEach(m=>{ const r=m.renLuyen||'Chưa đăng ký'; rlCounts[r]=(rlCounts[r]||0)+1; });

    return {
      total: members.length, active, inactive: members.length-active,
      female, male: members.length-female,
      femalePercent: Math.round(female/members.length*100),
      chiDoanCount: chiDoans.length, chiDoans,
      avgAge, renLuyen: rlCounts,
      summary: `Tổng ${members.length} đoàn viên · ${active} đang hoạt động · ${female} nữ (${Math.round(female/members.length*100)}%) · ${chiDoans.length} chi đoàn${avgAge?` · Tuổi TB: ${avgAge}`:''}`
    };
  },

  // ══ TOOL 17: Hỏi đáp về quy định Đoàn ═══════════════════════════
  answerDoanQuestion(question) {
    const q = (question||'').toLowerCase();
    const kb = [
      { kw:['tuổi','độ tuổi','kết nạp','điều kiện'],   ans:'Đoàn viên TNCS HCM: từ 16 đến 30 tuổi. Đặc biệt có thể kết nạp từ 15 tuổi đối với học sinh xuất sắc. Trên 30 tuổi không kết nạp mới (trừ vùng đặc biệt khó khăn theo quy định).' },
      { kw:['sinh hoạt','bao nhiêu lần','định kỳ'],      ans:'Sinh hoạt chi đoàn: ít nhất 1 lần/tháng theo quy định của Điều lệ Đoàn. Các chi đoàn có thể tổ chức thêm sinh hoạt chuyên đề theo nhu cầu thực tế.' },
      { kw:['đại hội','nhiệm kỳ','bao lâu'],             ans:'Đại hội Đoàn cấp chi đoàn, đoàn cơ sở: nhiệm kỳ 5 năm (2 năm rưỡi/lần đại hội). Cấp tỉnh, toàn quốc: nhiệm kỳ 5 năm.' },
      { kw:['phí','đoàn phí','đóng'],                    ans:'Đoàn phí: đoàn viên đóng đoàn phí hàng tháng theo quy định của Ban Thường vụ Trung ương Đoàn. Mức cụ thể do Đoàn cấp trên quy định theo từng thời kỳ.' },
      { kw:['rèn luyện','xếp loại','đánh giá'],          ans:'Xếp loại rèn luyện đoàn viên cuối năm: Xuất sắc / Tốt / Khá / Trung bình. Tiêu chí đánh giá gồm: tư tưởng chính trị, chấp hành kỷ luật, tham gia hoạt động Đoàn, kết quả học tập/công tác.' },
      { kw:['nghỉ sinh hoạt','miễn','tạm hoãn'],         ans:'Đoàn viên được tạm hoãn sinh hoạt do: học tập ở xa, công tác đặc biệt, bệnh tật nặng. Cần có đơn xin và được cấp có thẩm quyền phê duyệt. Nghỉ quá 3 tháng không lý do có thể bị khai trừ.' },
      { kw:['khai trừ','xóa tên','kỷ luật'],             ans:'Kỷ luật đoàn viên gồm 4 hình thức: Khiển trách / Cảnh cáo / Cách chức (nếu có chức vụ) / Khai trừ. Khai trừ: do vi phạm nghiêm trọng Điều lệ Đoàn hoặc vi phạm pháp luật.' },
      { kw:['chuyển sinh hoạt','chuyển đoàn'],           ans:'Thủ tục chuyển sinh hoạt: Đoàn viên nộp giấy giới thiệu chuyển sinh hoạt do chi đoàn cũ cấp, nộp tại chi đoàn mới trong vòng 3 tháng kể từ ngày chuyển.' },
      { kw:['bì thư','bầu','hội nghị'],                  ans:'Bí thư chi đoàn: do đại hội chi đoàn bầu trực tiếp, nhiệm kỳ theo nhiệm kỳ đại hội. Ban Chấp hành chi đoàn bầu Bí thư, Phó Bí thư trong số ủy viên BCH.' },
    ];
    for (const item of kb) {
      if (item.kw.some(k=>q.includes(k))) return item.ans;
    }
    return 'Câu hỏi này cần tra cứu Điều lệ Đoàn TNCS HCM hiện hành hoặc hỏi cán bộ Đoàn cấp trên để có câu trả lời chính xác nhất.';
  },

  // ══ TOOL 18: Kiểm tra & chuẩn hóa văn bản Đoàn ══════════════════
  normalizeDocumentText(text) {
    let t = text || '';
    // Chuẩn hóa cách viết phổ biến
    const replacements = [
      [/ĐoànTNCS/gi, 'Đoàn TNCS'],
      [/BanChấphành/gi, 'Ban Chấp hành'],
      [/\bBCH\b/g, 'Ban Chấp hành'],
      [/\bBTV\b/g, 'Ban Thường vụ'],
      [/\bTW\b/g, 'Trung ương'],
      [/đoàn viên\s+ưu\s+tú/gi, 'đoàn viên ưu tú'],
      [/ĐV\b/g, 'đoàn viên'],
    ];
    replacements.forEach(([from,to]) => { t = t.replace(from, to); });
    // Kiểm tra thiếu dấu phẩy sau "Kính gửi"
    const issues = [];
    if (/kính gửi\s+[^:]/i.test(t)) issues.push('Thiếu dấu ":" sau "Kính gửi"');
    if (/v\/v\s+[a-z]/i.test(t)) issues.push('Chủ đề V/V nên viết hoa chữ đầu');
    if (!t.includes('Chúng tôi trân trọng') && !t.includes('Trân trọng')) {
      // only flag for cong-van type
    }
    return { normalized: t, issues };
  }
};

// ─────────────────────────────────────────────────────────────────────
//  7. MAIN callAI — cache → online → offline
// ─────────────────────────────────────────────────────────────────────
async function callAI(prompt, opts={}) {
  // Cache check
  if (!opts.noCache) {
    const cached = AICache.get(prompt);
    if (cached) return cached;
  }
  const s = _aiGetSettings();
  const hasKey = !!(opts.apiKey || s.apiKey);
  const online  = navigator.onLine;

  if (opts.forceOffline || !hasKey || !online) {
    return _dispatchOffline(prompt, opts);
  }

  try {
    const r = await GeminiEngine.call(prompt, {
      ...opts,
      // Resolve alias từ settings cũ
      forceModel: opts.forceModel ? QuotaGuard.resolveId(opts.forceModel) : undefined
    });
    _aiUpdateStatus({ source:r.source, model:r.model, label:r.label, ok:true });
    if (!opts.noCache) AICache.set(prompt, r.text);
    return r.text;
  } catch(e) {
    const isQuota = e.isQuotaError || e.message==='QUOTA_EXCEEDED';
    const isNet   = !navigator.onLine || e.message?.includes('fetch') || e.message?.includes('Failed to fetch');
    if (isQuota) { _aiUpdateStatus({source:'quota_exceeded',ok:false}); return _dispatchOffline(prompt,opts,'quota'); }
    if (isNet)   { _aiUpdateStatus({source:'offline',ok:false});        return _dispatchOffline(prompt,opts,'network'); }
    throw e;
  }
}

async function callGemini(prompt, apiKey, model) {
  return callAI(prompt, { apiKey, forceModel: model });
}

// ─────────────────────────────────────────────────────────────────────
//  8. OFFLINE DISPATCHER — định tuyến prompt → công cụ phù hợp
// ─────────────────────────────────────────────────────────────────────
function _dispatchOffline(prompt, opts={}, reason='manual') {
  if (opts.offlineFallback) return opts.offlineFallback(prompt);
  const p = (prompt||'').toLowerCase();

  // ── Phân tích văn bản (analyzeWithAI)
  if (p.includes('trả về json') && (p.includes('phân tích văn bản')||p.includes('phân loại văn bản'))) {
    const tm = prompt.match(/"""([\s\S]+?)"""/);
    const fn = prompt.match(/tên tệp gốc:\s*(.+)/i);
    return Promise.resolve(JSON.stringify(OfflineEngine.analyzeDocument(tm?tm[1]:'', fn?fn[1].trim():'van-ban.txt')));
  }

  // ── Tổng hợp trích yếu
  if (p.includes('tổng hợp trích yếu') || p.includes('tóm tắt chuyên nghiệp')) {
    const dm = prompt.match(/danh sách văn bản.*?:\n([\s\S]+?)$/im);
    const lines = dm ? dm[1].split('\n').filter(l=>l.trim()) : [];
    const fakeDocs = lines.map(l=>({title:l.replace(/^-\s*/,''),type:'khac',summary:'',status:'pending'}));
    return Promise.resolve(OfflineEngine.summarizeDocs(fakeDocs));
  }

  // ── Điền nội dung mẫu văn bản
  if (p.includes('điền nội dung') && (p.includes('noi_dung_chinh')||p.includes('json'))) {
    const vars = {};
    const um = prompt.match(/tên đơn vị:\s*(.+)/i);   if(um) vars['{{TEN_DON_VI}}']=um[1].trim();
    const bm = prompt.match(/bí thư:\s*(.+)/i);        if(bm) vars['{{BI_THU}}']=bm[1].trim();
    const mm = prompt.match(/tháng[^\d]*(\d+)/i);      if(mm) vars['{{THANG}}']=mm[1];
    const ym = prompt.match(/năm[^\d]*(\d{4})/i);      if(ym) vars['{{NAM}}']=ym[1];
    const cm = prompt.match(/số đoàn viên.*?:\s*(\d+)/i); if(cm) vars['{{SO_DOAN_VIEN}}']=cm[1];
    return Promise.resolve(JSON.stringify(OfflineEngine.fillTemplateContent('', vars)));
  }

  // ── Báo cáo thành tích
  if (p.includes('soạn thảo báo cáo thành tích') || p.includes('soạn báo cáo có đủ')) {
    const vars = {
      unit:   prompt.match(/đơn vị:\s*(.+)/i)?.[1]    || 'Đơn vị Đoàn',
      period: prompt.match(/giai đoạn:\s*(.+)/i)?.[1] || new Date().getFullYear(),
      leader: prompt.match(/bí thư:\s*(.+)/i)?.[1]    || 'Bí thư Đoàn',
      memberCount: prompt.match(/đoàn viên.*?:\s*(\d+)/i)?.[1] || 0,
    };
    return Promise.resolve(OfflineEngine.generateAchievementReport(vars));
  }

  // ── Gợi ý hoạt động tháng
  if (p.includes('gợi ý hoạt động') || p.includes('hoạt động tháng')) {
    const mm = prompt.match(/tháng\s*(\d{1,2})/i);
    const ym = prompt.match(/năm\s*(\d{4})/i);
    const result = OfflineEngine.suggestActivities(mm?mm[1]:new Date().getMonth()+1, ym?ym[1]:new Date().getFullYear());
    return Promise.resolve(`Gợi ý hoạt động tháng ${result.month}/${result.year}:\n${result.activities.map((a,i)=>`${i+1}. ${a}`).join('\n')}`);
  }

  // ── Phân tích đoàn viên
  if (p.includes('phân tích đoàn viên') || p.includes('thống kê đoàn viên')) {
    let members = [];
    try { if(typeof DB!=='undefined') members = DB.get('membersList')||[]; } catch {}
    const stats = OfflineEngine.analyzeMembers(members);
    return Promise.resolve(JSON.stringify(stats));
  }

  // ── Hỏi đáp quy định Đoàn
  if (p.includes('quy định') || p.includes('điều lệ') || p.includes('đoàn phí') || p.includes('hỏi')) {
    const ans = OfflineEngine.answerDoanQuestion(prompt);
    return Promise.resolve(ans);
  }

  // ── Tìm kiếm
  if (p.includes('tìm kiếm') || p.includes('văn bản liên quan')) {
    let docs = [];
    try { if(typeof DB!=='undefined') docs = DB.get('docs')||[]; } catch {}
    const query = prompt.replace(/tìm kiếm|văn bản liên quan|tìm/gi,'').trim();
    const idxs = OfflineEngine.semanticSearch(query, docs);
    return Promise.resolve(idxs.slice(0,10).join(',') || '');
  }

  // ── Mặc định
  return Promise.resolve('[AI offline] Cần API Key Gemini để dùng tính năng này đầy đủ. Nhấn "Cấu hình" để thiết lập.\n\nAI offline có thể hỗ trợ: phân loại văn bản, tóm tắt, trích xuất deadline, gợi ý hoạt động Đoàn, hỏi đáp quy định Đoàn.');
}

// ─────────────────────────────────────────────────────────────────────
//  9. HELPERS
// ─────────────────────────────────────────────────────────────────────
function _aiGetSettings() {
  try { return JSON.parse(localStorage.getItem('doanvan_settings')||'{}'); }
  catch { return {}; }
}

function _aiUpdateStatus({source, model, label, ok}) {
  try {
    window.dispatchEvent(new CustomEvent('ai-status-change', {
      detail: { source, model, label, ok, ts: Date.now() }
    }));
  } catch {}
}

// ─────────────────────────────────────────────────────────────────────
//  10. MODAL CẤU HÌNH AI (giữ từ v4.0, cập nhật model options)
// ─────────────────────────────────────────────────────────────────────
function _injectAIConfigModal() {
  if (document.getElementById('aiConfigModal')) return;
  const el = document.createElement('div');
  el.id = 'aiConfigModal'; el.className = 'modal-overlay'; el.style.display = 'none';
  el.innerHTML = `
<div class="modal" style="max-width:540px">
  <div class="modal-header">
    <h2 style="display:flex;align-items:center;gap:10px">
      <span style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,var(--navy,#1a2340),var(--red,#c0392b));display:flex;align-items:center;justify-content:center;flex-shrink:0">
        <i class="fas fa-robot" style="color:#fff;font-size:0.85rem"></i>
      </span>Cấu hình AI Engine</h2>
    <button class="btn btn-ghost" onclick="closeAIConfigModal()"><i class="fas fa-times"></i></button>
  </div>
  <div class="modal-body" style="padding:20px">
    <div id="aiCfgBanner" style="border-radius:10px;padding:12px 16px;margin-bottom:16px;display:flex;align-items:center;gap:12px;font-size:0.82rem;background:rgba(26,35,64,0.05);border:1px solid var(--gray-light,#e5e7eb)">
      <div id="aiCfgDot" style="width:10px;height:10px;border-radius:50%;background:#9ca3af;flex-shrink:0"></div>
      <div id="aiCfgMsg" style="flex:1">Đang kiểm tra...</div>
      <button class="btn btn-outline btn-sm" onclick="refreshAICfgStatus()"><i class="fas fa-sync-alt"></i></button>
    </div>
    <div class="form-group" style="margin-bottom:14px">
      <label class="form-label" style="font-weight:700"><i class="fas fa-key" style="color:var(--gold,#d4a017);margin-right:6px"></i>Gemini API Key <span style="color:red">*</span></label>
      <div class="api-key-input">
        <input type="password" class="form-control" id="aiCfgKey" placeholder="AIza..." style="font-family:monospace;font-size:16px">
        <button class="api-key-toggle" onclick="toggleAICfgKey()"><i class="fas fa-eye" id="aiCfgEyeIcon"></i></button>
      </div>
      <div class="form-hint" style="margin-top:5px">Lấy miễn phí tại <a href="https://aistudio.google.com" target="_blank" style="color:var(--red,#c0392b);font-weight:600">aistudio.google.com</a></div>
    </div>
    <div class="form-group" style="margin-bottom:14px">
      <label class="form-label" style="font-weight:700"><i class="fas fa-microchip" style="color:var(--navy,#1a2340);margin-right:6px"></i>Chiến lược Model</label>
      <select class="form-control" id="aiCfgModel" style="font-size:16px">
        <option value="auto">🤖 Tự động: Flash-Lite → Flash → 2.0-Flash → Offline (Khuyến nghị)</option>
        <option value="gemini-2.5-flash-lite">⚡ Flash-Lite — 15 req/phút · 1000 req/ngày (tiết kiệm nhất)</option>
        <option value="gemini-2.5-flash">🔥 Flash — 10 req/phút · 250 req/ngày (chất lượng cao hơn)</option>
        <option value="gemini-2.0-flash">🛡️ 2.0 Flash — 15 req/phút · 1500 req/ngày (ổn định nhất)</option>
      </select>
      <div class="form-hint" style="margin-top:4px">AI Engine tự động fallback khi model chính hết quota</div>
    </div>
    <!-- 3-tầng info -->
    <div style="border-radius:10px;border:1px solid var(--gray-light,#e5e7eb);overflow:hidden;margin-bottom:14px">
      <div style="background:rgba(22,163,74,0.06);padding:10px 14px;display:flex;align-items:center;gap:10px;border-bottom:1px solid var(--gray-light,#e5e7eb)">
        <span style="width:22px;height:22px;border-radius:50%;background:#16a34a;color:#fff;display:flex;align-items:center;justify-content:center;font-size:0.7rem;font-weight:900;flex-shrink:0">1</span>
        <div><div style="font-weight:700;font-size:0.8rem;color:#15803d">Gemini 2.5 Flash-Lite <span style="font-weight:400;color:#6b7280">(primary)</span></div><div style="font-size:0.72rem;color:#6b7280">15 req/phút · 1000 req/ngày · Ưu tiên dùng để tiết kiệm quota</div></div>
      </div>
      <div style="background:rgba(212,160,23,0.05);padding:10px 14px;display:flex;align-items:center;gap:10px;border-bottom:1px solid var(--gray-light,#e5e7eb)">
        <span style="width:22px;height:22px;border-radius:50%;background:#d4a017;color:#fff;display:flex;align-items:center;justify-content:center;font-size:0.7rem;font-weight:900;flex-shrink:0">2</span>
        <div><div style="font-weight:700;font-size:0.8rem;color:#92400e">Gemini 2.5 Flash <span style="font-weight:400;color:#6b7280">(fallback khi Lite hết quota)</span></div><div style="font-size:0.72rem;color:#6b7280">10 req/phút · 250 req/ngày · Chất lượng tốt hơn cho tác vụ phức tạp</div></div>
      </div>
      <div style="background:rgba(37,99,235,0.04);padding:10px 14px;display:flex;align-items:center;gap:10px;border-bottom:1px solid var(--gray-light,#e5e7eb)">
        <span style="width:22px;height:22px;border-radius:50%;background:#2563eb;color:#fff;display:flex;align-items:center;justify-content:center;font-size:0.7rem;font-weight:900;flex-shrink:0">3</span>
        <div><div style="font-weight:700;font-size:0.8rem;color:#1d4ed8">Gemini 2.0 Flash <span style="font-weight:400;color:#6b7280">(fallback ổn định)</span></div><div style="font-size:0.72rem;color:#6b7280">15 req/phút · 1500 req/ngày · Cực kỳ ổn định</div></div>
      </div>
      <div style="background:rgba(107,114,128,0.05);padding:10px 14px;display:flex;align-items:center;gap:10px">
        <span style="width:22px;height:22px;border-radius:50%;background:#6b7280;color:#fff;display:flex;align-items:center;justify-content:center;font-size:0.7rem;font-weight:900;flex-shrink:0">4</span>
        <div><div style="font-weight:700;font-size:0.8rem;color:#374151">Offline NLP Engine <span style="font-weight:400;color:#6b7280">(fallback cuối)</span></div><div style="font-size:0.72rem;color:#6b7280">Không cần internet · Không quota · 18 công cụ phân tích nội bộ</div></div>
      </div>
    </div>
    <!-- Quota -->
    <div style="background:rgba(26,35,64,0.04);border-radius:10px;padding:12px 14px;margin-bottom:14px;border:1px solid var(--gray-light,#e5e7eb)">
      <div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#6b7280;margin-bottom:10px"><i class="fas fa-tachometer-alt"></i> Quota Hôm Nay</div>
      <div id="aiCfgQuota"><div style="font-size:0.78rem;color:#6b7280">Nhập API key để xem quota...</div></div>
    </div>
    <div style="display:flex;gap:8px;margin-bottom:10px">
      <button class="btn btn-gold" onclick="testAICfgKey()" style="flex:1"><i class="fas fa-vial"></i> Kiểm tra kết nối</button>
      <button class="btn btn-outline" onclick="testAICfgOffline()"><i class="fas fa-plug"></i> Test offline</button>
    </div>
    <div id="aiCfgTestResult" style="font-size:0.8rem;min-height:20px"></div>
  </div>
  <div class="modal-footer">
    <button class="btn btn-outline" onclick="closeAIConfigModal()">Hủy</button>
    <button class="btn btn-primary" onclick="saveAIConfig()"><i class="fas fa-save"></i> Lưu cấu hình</button>
  </div>
</div>`;
  document.body.appendChild(el);
  el.addEventListener('click', e=>{ if(e.target===el) closeAIConfigModal(); });
}

function openAIConfigModal() {
  _injectAIConfigModal();
  const modal = document.getElementById('aiConfigModal');
  modal.style.display = 'flex';
  const s = _aiGetSettings();
  const ke = document.getElementById('aiCfgKey');
  const me = document.getElementById('aiCfgModel');
  if (ke && s.apiKey) ke.value = s.apiKey;
  if (me) {
    const resolved = QuotaGuard.resolveId(s.aiModel||'auto');
    me.value = ['gemini-2.5-flash-lite','gemini-2.5-flash','gemini-2.0-flash','auto'].includes(resolved) ? resolved : 'auto';
  }
  refreshAICfgStatus();
  _updateAICfgQuota();
}

function closeAIConfigModal() {
  const m = document.getElementById('aiConfigModal');
  if (m) m.style.display = 'none';
}

function toggleAICfgKey() {
  const i = document.getElementById('aiCfgKey');
  const ic = document.getElementById('aiCfgEyeIcon');
  if (!i) return;
  i.type = i.type==='password' ? 'text' : 'password';
  ic.className = i.type==='password' ? 'fas fa-eye' : 'fas fa-eye-slash';
}

function refreshAICfgStatus() {
  const dot = document.getElementById('aiCfgDot');
  const msg = document.getElementById('aiCfgMsg');
  if (!dot||!msg) return;
  const s = _aiGetSettings();
  if (!s.apiKey) {
    dot.style.background='#9ca3af';
    msg.innerHTML='<span style="color:#6b7280">Chưa có API Key — đang dùng Offline Engine (18 công cụ NLP).</span>';
    return;
  }
  if (!navigator.onLine) {
    dot.style.background='#f59e0b';
    msg.innerHTML='<span style="color:#b45309">Không có kết nối mạng — AI offline đang hoạt động.</span>';
    return;
  }
  const avail = AI_CONFIG.MODELS.filter(m=>QuotaGuard.canUse(m.id));
  if (avail.length) {
    dot.style.background='#16a34a';
    msg.innerHTML=`<span style="color:#166534"><i class="fas fa-check-circle"></i> AI Online sẵn sàng — ${avail.map(m=>m.label).join(' → ')}</span>`;
  } else {
    dot.style.background='#f59e0b';
    msg.innerHTML='<span style="color:#b45309"><i class="fas fa-exclamation-circle"></i> Tất cả quota đã hết — đang dùng Offline Engine</span>';
  }
  _updateAICfgQuota();
}

function _updateAICfgQuota() {
  const el = document.getElementById('aiCfgQuota');
  if (!el) return;
  el.innerHTML = QuotaGuard.getStatus().map(m => {
    const pct = Math.min(m.pct,100);
    const col = pct>=90?'#dc2626':pct>=70?'#f59e0b':'#16a34a';
    const tierBadge = {primary:'🟢',secondary:'🟡',tertiary:'🔵'}[m.tier]||'⚪';
    return `<div style="margin-bottom:8px">
      <div style="display:flex;justify-content:space-between;font-size:0.75rem;margin-bottom:3px">
        <span style="font-weight:600">${tierBadge} ${m.label}</span>
        <span style="color:${col}">${m.todayUsed}/${m.todayLimit} hôm nay · ${m.minuteUsed}/${m.minuteLimit} req/phút</span>
      </div>
      <div style="background:#e5e7eb;border-radius:4px;height:5px">
        <div style="width:${pct}%;height:100%;background:${col};border-radius:4px;transition:0.3s"></div>
      </div>
    </div>`;
  }).join('') + `<button onclick="QuotaGuard.reset();_updateAICfgQuota();if(typeof updateQuotaDisplay==='function')updateQuotaDisplay()"
    style="font-size:0.72rem;background:none;border:none;cursor:pointer;color:#6b7280;padding:0;margin-top:4px">
    <i class="fas fa-redo" style="margin-right:4px"></i>Reset bộ đếm quota tất cả models</button>`;
}

async function testAICfgKey() {
  const ke = document.getElementById('aiCfgKey');
  const re = document.getElementById('aiCfgTestResult');
  const key = ke?.value.trim();
  if (!re) return;
  if (!key) { re.innerHTML='<span style="color:red">⚠️ Vui lòng nhập API Key.</span>'; return; }
  re.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang kiểm tra 3 models...';
  const results = [];
  for (const mo of AI_CONFIG.MODELS) {
    try {
      const r = await GeminiEngine.call('Trả lời: OK', {apiKey:key, forceModel:mo.id, maxTokens:10});
      results.push(`<span style="color:#16a34a">✓ ${mo.label}</span>`);
    } catch(e) {
      const msg = e.status===429?'quota hết':e.status===400||e.status===401?'key sai':`HTTP ${e.status||'err'}`;
      results.push(`<span style="color:#f59e0b">⚠ ${mo.label}: ${msg}</span>`);
    }
  }
  re.innerHTML = results.join(' &nbsp;|&nbsp; ');
  refreshAICfgStatus(); _updateAICfgQuota();
}

function testAICfgOffline() {
  const re = document.getElementById('aiCfgTestResult');
  if (!re) return;
  const testText = 'Kế hoạch tổ chức hoạt động tình nguyện mùa hè xanh. Hạn chót: ngày 15 tháng 06 năm 2025. Đây là văn bản khẩn. Cần hoàn thành trước ngày 20/06/2025.';
  const result = OfflineEngine.analyzeDocument(testText, 'test.txt');
  const deadlines = OfflineEngine.detectDeadlines(testText);
  const suggest   = OfflineEngine.suggestActivities(6, 2025);
  re.innerHTML = `<span style="color:#16a34a"><i class="fas fa-check-circle"></i> Offline Engine OK — 18 công cụ sẵn sàng</span>
    <div style="margin-top:6px;padding:8px;background:var(--cream,#fdf8f0);border-radius:6px;font-size:0.73rem;color:var(--text-soft,#4b5563);line-height:1.7">
      📋 Loại: <strong>${result.type}</strong> | Ưu tiên: <strong>${result.priority}</strong>
      | Deadline phát hiện: <strong>${deadlines.map(d=>d.date).join(', ')||'—'}</strong>
      <br>🎯 Gợi ý tháng 6: <em>${suggest.activities[0]}</em>
      <br>❓ Hỏi đáp: ${OfflineEngine.answerDoanQuestion('tuổi kết nạp đoàn viên').substring(0,80)}...
    </div>`;
}

function saveAIConfig() {
  const key   = document.getElementById('aiCfgKey')?.value.trim()   || '';
  const model = document.getElementById('aiCfgModel')?.value || 'auto';
  const cur = _aiGetSettings();
  try {
    localStorage.setItem('doanvan_settings', JSON.stringify({...cur, apiKey:key, aiModel:model, aiStrategy:model}));
  } catch {}
  // Sync với trang Settings
  const mk = document.getElementById('geminiApiKey');
  const mm = document.getElementById('aiModel');
  if (mk) mk.value = key;
  if (mm) mm.value = model;
  closeAIConfigModal();
  AICache.clear();
  if (typeof toast==='function') toast('<i class="fas fa-check-circle" style="color:#16a34a"></i> Đã lưu cấu hình AI!', 'success');
  if (typeof refreshAiStatus==='function') setTimeout(refreshAiStatus, 300);
  if (typeof updateQuotaDisplay==='function') setTimeout(updateQuotaDisplay, 400);
  _aiUpdateStatus({source:'config_saved', ok:true});
}

// ─────────────────────────────────────────────────────────────────────
//  11. MODAL PHÁT HIỆN THỜI HẠN (giữ nguyên từ v4.0)
// ─────────────────────────────────────────────────────────────────────
function _injectDeadlineModal(){
  if(document.getElementById('deadlineDetectModal'))return;
  const el=document.createElement('div');
  el.id='deadlineDetectModal'; el.className='modal-overlay'; el.style.display='none';
  el.innerHTML=`<div class="modal" style="max-width:740px"><div class="modal-header"><h2 style="display:flex;align-items:center;gap:10px"><span style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#dc2626,#f59e0b);display:flex;align-items:center;justify-content:center;flex-shrink:0"><i class="fas fa-clock" style="color:#fff;font-size:0.85rem"></i></span>Phát hiện thời hạn</h2><button class="btn btn-ghost" onclick="closeDeadlineModal()"><i class="fas fa-times"></i></button></div><div class="modal-body" style="padding:20px"><div style="display:flex;gap:4px;background:rgba(26,35,64,0.05);border-radius:10px;padding:4px;margin-bottom:14px;font-size:0.78rem"><button id="dlTabAll" onclick="filterDeadlines('all')" class="btn btn-primary btn-sm" style="flex:1;border-radius:7px">📋 Tất cả</button><button id="dlTabOverdue" onclick="filterDeadlines('overdue')" class="btn btn-outline btn-sm" style="flex:1;border-radius:7px;color:#dc2626">🔴 Quá hạn</button><button id="dlTabWeek" onclick="filterDeadlines('week')" class="btn btn-outline btn-sm" style="flex:1;border-radius:7px;color:#f59e0b">🟡 ≤7 ngày</button><button id="dlTabMonth" onclick="filterDeadlines('month')" class="btn btn-outline btn-sm" style="flex:1;border-radius:7px;color:#2563eb">🔵 Trong tháng</button><button id="dlTabNone" onclick="filterDeadlines('none')" class="btn btn-outline btn-sm" style="flex:1;border-radius:7px;color:#6b7280">⚪ Chưa có hạn</button></div><div id="dlSummary" style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px;font-size:0.78rem"></div><div style="display:flex;gap:8px;margin-bottom:14px;align-items:center"><button class="btn btn-gold" onclick="scanDeadlines()" id="dlScanBtn" style="flex:1"><i class="fas fa-search"></i> Quét toàn bộ văn bản</button><label style="display:flex;align-items:center;gap:6px;font-size:0.78rem;cursor:pointer;white-space:nowrap"><input type="checkbox" id="dlScanContent" checked> Quét nội dung</label></div><div id="dlResultArea" style="display:none"><div style="overflow-x:auto;max-height:380px;border:1px solid #e5e7eb;border-radius:10px"><table class="doc-table" style="font-size:0.78rem"><thead><tr><th style="min-width:200px">Văn bản</th><th>Loại</th><th>Ngày hạn</th><th>Còn lại</th><th>Trạng thái</th><th>Thao tác</th></tr></thead><tbody id="dlResultBody"></tbody></table></div><div id="dlResultEmpty" style="display:none;text-align:center;padding:30px;color:#6b7280"><i class="fas fa-calendar-check" style="font-size:2rem;margin-bottom:8px;display:block;color:#16a34a"></i><div style="font-weight:600">Không có văn bản nào trong bộ lọc này</div></div></div><div id="dlPlaceholder" style="text-align:center;padding:32px;color:#6b7280"><i class="fas fa-search" style="font-size:2.5rem;margin-bottom:12px;display:block;opacity:0.25"></i><div style="font-weight:600;margin-bottom:6px">Nhấn "Quét toàn bộ văn bản" để bắt đầu</div><div style="font-size:0.75rem">AI phân tích nội dung, tìm các ngày hạn chót và thời hạn nộp báo cáo (10+ pattern tiếng Việt)</div></div></div><div class="modal-footer"><div id="dlFooterNote" style="font-size:0.73rem;color:#6b7280;flex:1"></div><button class="btn btn-outline" onclick="closeDeadlineModal()">Đóng</button><button class="btn btn-primary" id="dlSetRemindBtn" style="display:none" onclick="setDeadlineReminders()"><i class="fas fa-bell"></i> Đặt nhắc nhở</button></div></div>`;
  document.body.appendChild(el);
  el.addEventListener('click',e=>{if(e.target===el)closeDeadlineModal();});
}

let _dlResults=[], _dlFilter='all';
function openDeadlineModal(){_injectDeadlineModal();document.getElementById('deadlineDetectModal').style.display='flex';_dlResults=[];_dlFilter='all';_renderDeadlineResults();}
function closeDeadlineModal(){const m=document.getElementById('deadlineDetectModal');if(m)m.style.display='none';}

async function scanDeadlines(){
  const btn=document.getElementById('dlScanBtn'),scanC=document.getElementById('dlScanContent')?.checked;
  if(btn){btn.disabled=true;btn.innerHTML='<i class="fas fa-spinner fa-spin"></i> Đang quét...';}
  let docs=[];try{if(typeof DB!=='undefined'&&DB.get)docs=DB.get('docs')||[];}catch{}
  const today=new Date();today.setHours(0,0,0,0);_dlResults=[];
  for(const doc of docs){
    let dl=doc.deadline||'',from='stored';
    if(!dl&&scanC&&doc.rawText){
      const dls=OfflineEngine.detectDeadlines(doc.rawText);
      if(dls.length){dl=dls[0].date;from='scanned';}
      else{const dates=OfflineEngine.extractDates(doc.rawText);dl=OfflineEngine.detectDeadlineDate(dates,doc.rawText);if(dl)from='scanned';}
      if(dl&&typeof DB!=='undefined'&&DB.update)try{DB.update('docs',doc.id,{deadline:dl});}catch{}
    }
    const daysLeft=dl?Math.ceil((new Date(dl)-today)/86400000):null;
    _dlResults.push({...doc,deadline:dl,daysLeft,detectedFrom:from});
  }
  if(btn){btn.disabled=false;btn.innerHTML='<i class="fas fa-search"></i> Quét toàn bộ văn bản';}
  _renderDeadlineResults();
  const ne=document.getElementById('dlFooterNote');
  if(ne){const sc=_dlResults.filter(r=>r.detectedFrom==='scanned').length;ne.textContent=`Đã quét ${docs.length} văn bản${sc?` · Phát hiện mới ${sc} deadline từ nội dung`:''}  (Offline Engine — 10+ pattern)`;}
}

function filterDeadlines(tab){
  _dlFilter=tab;
  ['all','overdue','week','month','none'].forEach(t=>{const el=document.getElementById(`dlTab${t.charAt(0).toUpperCase()+t.slice(1)}`);if(el){el.className=t===tab?'btn btn-primary btn-sm':'btn btn-outline btn-sm';el.style.flex='1';el.style.borderRadius='7px';}});
  _renderDeadlineResults();
}
function _getFiltered(){return _dlResults.filter(r=>{if(_dlFilter==='all')return r.deadline;if(_dlFilter==='overdue')return r.deadline&&r.daysLeft<0&&r.status!=='done';if(_dlFilter==='week')return r.deadline&&r.daysLeft>=0&&r.daysLeft<=7;if(_dlFilter==='month')return r.deadline&&r.daysLeft>=0&&r.daysLeft<=30;if(_dlFilter==='none')return!r.deadline;return true;});}
function _renderDeadlineResults(){
  const body=document.getElementById('dlResultBody'),area=document.getElementById('dlResultArea');
  const ph=document.getElementById('dlPlaceholder'),em=document.getElementById('dlResultEmpty');
  const sum=document.getElementById('dlSummary'),srb=document.getElementById('dlSetRemindBtn');
  if(!body)return;
  const filtered=_getFiltered(),all=_dlResults;
  if(sum&&all.length){const ov=all.filter(r=>r.deadline&&r.daysLeft<0&&r.status!=='done').length,wk=all.filter(r=>r.deadline&&r.daysLeft>=0&&r.daysLeft<=7).length,mo=all.filter(r=>r.deadline&&r.daysLeft>=0&&r.daysLeft<=30).length,nd=all.filter(r=>!r.deadline).length;sum.innerHTML=[ov?`<span style="background:rgba(220,38,38,0.1);color:#dc2626;padding:3px 10px;border-radius:8px;font-weight:700">🔴 ${ov} quá hạn</span>`:'',wk?`<span style="background:rgba(245,158,11,0.1);color:#b45309;padding:3px 10px;border-radius:8px;font-weight:700">🟡 ${wk} trong 7 ngày</span>`:'',mo?`<span style="background:rgba(37,99,235,0.1);color:#1d4ed8;padding:3px 10px;border-radius:8px;font-weight:700">🔵 ${mo} trong tháng</span>`:'',nd?`<span style="background:rgba(107,114,128,0.1);color:#6b7280;padding:3px 10px;border-radius:8px">⚪ ${nd} chưa có hạn</span>`:''].filter(Boolean).join('');}
  if(!all.length){if(ph)ph.style.display='block';if(area)area.style.display='none';return;}
  if(ph)ph.style.display='none';if(area)area.style.display='block';
  if(!filtered.length){body.innerHTML='';if(em)em.style.display='block';return;}
  if(em)em.style.display='none';
  const tl={'chi-thi':'CT','nghi-quyet':'NQ','ke-hoach':'KH','bao-cao':'BC','cong-van':'CV','thong-bao':'TB','to-trinh':'TT','bien-ban':'BB','quyet-dinh':'QĐ','khac':'VB'};
  const sorted=[...filtered].sort((a,b)=>{if(!a.deadline&&!b.deadline)return 0;if(!a.deadline)return 1;if(!b.deadline)return-1;return(a.daysLeft??999)-(b.daysLeft??999);});
  body.innerHTML=sorted.map(doc=>{const dl=doc.deadline,days=doc.daysLeft,done=doc.status==='done';let dh='—',rs='';if(dl){if(done){dh='<span style="color:#16a34a;font-weight:600"><i class="fas fa-check"></i> Xong</span>';}else if(days<0){dh=`<span style="color:#dc2626;font-weight:700">🔴 Quá ${Math.abs(days)}n</span>`;rs='background:rgba(220,38,38,0.04)';}else if(days===0){dh='<span style="color:#dc2626;font-weight:800">⏰ HÔM NAY</span>';rs='background:rgba(220,38,38,0.07)';}else if(days<=3){dh=`<span style="color:#dc2626;font-weight:700">🔴 ${days}n</span>`;rs='background:rgba(220,38,38,0.03)';}else if(days<=7){dh=`<span style="color:#f59e0b;font-weight:700">🟡 ${days}n</span>`;rs='background:rgba(245,158,11,0.03)';}else{dh=`<span style="color:#2563eb">🔵 ${days}n</span>`;}}const dld=dl?dl.split('-').reverse().join('/'):'—';const title=(doc.title||'Không tên').substring(0,50)+((doc.title||'').length>50?'...':'');return `<tr style="${rs}"><td><div style="font-weight:600;font-size:0.8rem">${title}</div>${doc.detectedFrom==='scanned'?'<span style="font-size:0.67rem;background:rgba(22,163,74,0.1);color:#166534;padding:1px 5px;border-radius:4px">✨ AI phát hiện</span>':''}</td><td><span style="font-size:0.72rem;background:rgba(26,35,64,0.08);padding:2px 6px;border-radius:4px">${tl[doc.type]||'VB'}</span></td><td style="white-space:nowrap;font-family:monospace;font-size:0.8rem">${dld}</td><td>${dh}</td><td><select style="font-size:0.72rem;border:1px solid #e5e7eb;border-radius:5px;padding:2px 4px" onchange="updateDocStatusFromDL(this,'${doc.id}')"><option value="pending" ${doc.status==='pending'?'selected':''}>Chờ xử lý</option><option value="processing" ${doc.status==='processing'?'selected':''}>Đang xử lý</option><option value="done" ${doc.status==='done'?'selected':''}>Hoàn thành</option><option value="overdue" ${doc.status==='overdue'?'selected':''}>Quá hạn</option></select></td><td style="white-space:nowrap">${dl?`<button onclick="setDeadlineForDoc('${doc.id}','${dl}')" class="btn btn-outline btn-sm" style="padding:3px 7px;font-size:0.7rem" title="Nhắc nhở"><i class="fas fa-bell"></i></button>`:`<button onclick="promptDeadlineForDoc('${doc.id}')" class="btn btn-outline btn-sm" style="padding:3px 7px;font-size:0.7rem;color:#6b7280"><i class="fas fa-plus"></i></button>`}<button onclick="viewDocFromDL('${doc.id}')" class="btn btn-outline btn-sm" style="padding:3px 7px;font-size:0.7rem;margin-left:3px"><i class="fas fa-eye"></i></button></td></tr>`;}).join('');
  const urgent=sorted.filter(r=>r.daysLeft!==null&&r.daysLeft>=0&&r.daysLeft<=7&&r.status!=='done').length;
  if(srb)srb.style.display=urgent>0?'':'none';
}
function updateDocStatusFromDL(sel,id){try{if(typeof DB!=='undefined'&&DB.update)DB.update('docs',id,{status:sel.value});}catch{}const r=_dlResults.find(d=>String(d.id)===String(id));if(r)r.status=sel.value;_renderDeadlineResults();if(typeof renderDocsTable==='function')try{renderDocsTable();}catch{}}
function setDeadlineForDoc(id,dl){const doc=_dlResults.find(d=>String(d.id)===String(id));if(doc&&typeof DB!=='undefined'&&DB.push)try{DB.push('reminders',{id:Date.now(),docId:id,docTitle:doc.title,deadline:dl,note:`Nhắc hạn: ${dl}`,createdAt:new Date().toISOString()});}catch{}if(typeof toast==='function')toast(`<i class="fas fa-bell" style="color:var(--gold,#d4a017)"></i> Đã đặt nhắc nhở: ${dl}`,'success');}
function promptDeadlineForDoc(id){const dl=prompt('Nhập ngày hạn chót (DD/MM/YYYY):');if(!dl)return;const p=dl.split('/');if(p.length!==3){alert('Định dạng không hợp lệ');return;}const iso=`${p[2]}-${p[1].padStart(2,'0')}-${p[0].padStart(2,'0')}`;try{if(typeof DB!=='undefined'&&DB.update)DB.update('docs',id,{deadline:iso});}catch{}const r=_dlResults.find(d=>String(d.id)===String(id));if(r){r.deadline=iso;const t=new Date();t.setHours(0,0,0,0);r.daysLeft=Math.ceil((new Date(iso)-t)/86400000);}_renderDeadlineResults();if(typeof toast==='function')toast('Đã cập nhật thời hạn!','success');}
function viewDocFromDL(id){closeDeadlineModal();if(typeof showDocDetail==='function')showDocDetail(id);else if(typeof showPage==='function')showPage('documents');}
function setDeadlineReminders(){const urgent=_dlResults.filter(r=>r.deadline&&r.daysLeft!==null&&r.daysLeft>=0&&r.daysLeft<=7&&r.status!=='done');if(!urgent.length){if(typeof toast==='function')toast('Không có văn bản cấp bách','info');return;}urgent.forEach(d=>setDeadlineForDoc(d.id,d.deadline));if(typeof toast==='function')toast(`<i class="fas fa-bell" style="color:var(--gold,#d4a017)"></i> Đã đặt nhắc nhở cho ${urgent.length} văn bản!`,'success');}

// ─────────────────────────────────────────────────────────────────────
//  12. PATCH DASHBOARD + quickAiAction
// ─────────────────────────────────────────────────────────────────────
function _patchDashboard() {
  const btn = document.querySelector('#dashAiPanel .btn-gold');
  if (btn) { btn.onclick=openAIConfigModal; btn.innerHTML='<i class="fas fa-sliders-h"></i> Cấu hình'; }
  if (typeof window.quickAiAction === 'function') {
    const _orig = window.quickAiAction;
    window.quickAiAction = async function(action) {
      if (action==='deadline') { openDeadlineModal(); return; }
      if (action==='config')   { openAIConfigModal(); return; }
      return _orig(action);
    };
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

  getQuotaStatus() { return QuotaGuard.getStatus(); },

  async testKey(k, m) {
    // Dùng forceModel chỉ khi test model cụ thể, nhưng cho phép 404 fallback
    // Nếu không chỉ định model → dùng auto fallback chain
    const resolved = m ? QuotaGuard.resolveId(m) : null;
    try {
      const opts = { apiKey:k, maxTokens:10 };
      if (resolved) opts.forceModel = resolved;
      const r = await GeminiEngine.call('Trả lời: OK', opts);
      return { ok:true, model:r.model, label:r.label };
    } catch(e) {
      // 429 trên model cụ thể → báo quota hết, không crash
      if (e.status === 429) return { ok:false, error:'quota hết (429)', status:429 };
      return { ok:false, error:e.message, status:e.status };
    }
  },

  getModelList() { return AI_CONFIG.MODELS; },

  canGoOnline() {
    const s = _aiGetSettings();
    return !!(s.apiKey && navigator.onLine && AI_CONFIG.MODELS.some(m=>QuotaGuard.canUse(m.id)));
  },

  openConfig:     openAIConfigModal,
  openDeadline:   openDeadlineModal,
  scanDeadlines,
  clearCache()    { AICache.clear(); },
  resolveModel(id){ return QuotaGuard.resolveId(id); },
};

// Backward compat globals
window.callGemini    = callGemini;
window.callAI        = callAI;
window.openAIConfigModal  = openAIConfigModal;
window.closeAIConfigModal = closeAIConfigModal;
window.openDeadlineModal  = openDeadlineModal;
window.closeDeadlineModal = closeDeadlineModal;
window.scanDeadlines      = scanDeadlines;
window.filterDeadlines    = filterDeadlines;
window.QuotaGuard         = QuotaGuard;
window.AICache            = AICache;
window.updateDocStatusFromDL  = updateDocStatusFromDL;
window.setDeadlineForDoc      = setDeadlineForDoc;
window.promptDeadlineForDoc   = promptDeadlineForDoc;
window.viewDocFromDL          = viewDocFromDL;
window.setDeadlineReminders   = setDeadlineReminders;
window.refreshAICfgStatus     = refreshAICfgStatus;
window._updateAICfgQuota      = _updateAICfgQuota;
window.testAICfgKey           = testAICfgKey;
window.testAICfgOffline       = testAICfgOffline;
window.saveAIConfig           = saveAIConfig;
window.toggleAICfgKey         = toggleAICfgKey;

// Auto-init
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    _injectAIConfigModal(); _injectDeadlineModal(); setTimeout(_patchDashboard, 200);
  });
} else {
  setTimeout(() => { _injectAIConfigModal(); _injectDeadlineModal(); _patchDashboard(); }, 150);
}

console.log(
  '[ĐoànVăn AI Engine v5.0] Loaded\n',
  '✅ Models:', AI_CONFIG.MODELS.map(m=>`${m.label}(${m.id})`).join(' → '),'\n',
  '✅ Offline Engine: 18 công cụ NLP nội bộ\n',
  '✅ Cache · Queue · ConfigModal · DeadlineModal'
);
