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
  const style = document.createElement('style');
  style.id = 'dv-export-style';
  style.textContent = `
    /* ── Modal xuất ── */
    #dvExportModal{position:fixed;inset:0;z-index:9000;display:none;align-items:center;justify-content:center}
    #dvExportModal.open{display:flex}
    #dvExportModal .dv-overlay{position:absolute;inset:0;background:rgba(0,0,0,0.55);backdrop-filter:blur(4px)}
    #dvExportModal .dv-box{position:relative;background:#fff;border-radius:20px;padding:32px 28px 24px;width:540px;max-width:96vw;max-height:92vh;overflow-y:auto;box-shadow:0 20px 60px rgba(0,0,0,0.25);animation:dvPop .25s ease}
    @keyframes dvPop{from{opacity:0;transform:scale(.94)}to{opacity:1;transform:scale(1)}}
    #dvExportModal .dv-title{font-family:'Playfair Display',serif;font-size:1.25rem;font-weight:700;color:#1a2340;margin-bottom:6px;display:flex;align-items:center;gap:10px}
    #dvExportModal .dv-sub{font-size:0.78rem;color:#6b7280;margin-bottom:22px}
    #dvExportModal .dv-formats{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-bottom:20px}
    #dvExportModal .dv-fmt-btn{border:2px solid #e5e7eb;border-radius:14px;padding:16px 14px;cursor:pointer;transition:.2s;background:#fafafa;display:flex;align-items:center;gap:12px;text-align:left}
    #dvExportModal .dv-fmt-btn:hover{border-color:#c0392b;background:#fff5f5;transform:translateY(-2px);box-shadow:0 4px 16px rgba(192,57,43,.15)}
    #dvExportModal .dv-fmt-btn.selected{border-color:#c0392b;background:#fff5f5;box-shadow:0 0 0 3px rgba(192,57,43,.12)}
    #dvExportModal .dv-fmt-icon{width:44px;height:44px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:1.4rem;flex-shrink:0}
    #dvExportModal .dv-fmt-name{font-weight:700;font-size:0.88rem;color:#1f2937}
    #dvExportModal .dv-fmt-desc{font-size:0.72rem;color:#6b7280;margin-top:2px}
    #dvExportModal .dv-opts{background:#f9fafb;border-radius:12px;padding:16px;margin-bottom:18px;border:1px solid #e5e7eb}
    #dvExportModal .dv-opts-title{font-size:0.76rem;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#9ca3af;margin-bottom:12px}
    #dvExportModal .dv-row{display:flex;gap:10px;margin-bottom:10px;flex-wrap:wrap}
    #dvExportModal .dv-field{flex:1;min-width:160px}
    #dvExportModal .dv-label{font-size:0.74rem;font-weight:600;color:#374151;margin-bottom:4px}
    #dvExportModal .dv-input{width:100%;padding:7px 10px;border:1.5px solid #d1d5db;border-radius:8px;font-size:0.82rem;font-family:'Be Vietnam Pro',sans-serif;color:#1f2937;background:#fff}
    #dvExportModal .dv-input:focus{outline:none;border-color:#c0392b;box-shadow:0 0 0 3px rgba(192,57,43,.1)}
    #dvExportModal .dv-actions{display:flex;gap:10px;justify-content:flex-end;padding-top:8px;border-top:1px solid #f3f4f6}
    #dvExportModal .dv-btn{display:inline-flex;align-items:center;gap:8px;padding:10px 22px;border-radius:9px;font-weight:600;font-size:0.84rem;cursor:pointer;border:none;font-family:'Be Vietnam Pro',sans-serif;transition:.2s}
    #dvExportModal .dv-btn-primary{background:#c0392b;color:#fff}
    #dvExportModal .dv-btn-primary:hover{background:#96281b;transform:translateY(-1px);box-shadow:0 4px 12px rgba(192,57,43,.35)}
    #dvExportModal .dv-btn-outline{background:transparent;border:1.5px solid #e5e7eb;color:#6b7280}
    #dvExportModal .dv-btn-outline:hover{border-color:#c0392b;color:#c0392b}
    #dvExportModal .dv-progress{display:none;align-items:center;gap:10px;padding:12px 0;font-size:0.82rem;color:#6b7280}
    #dvExportModal .dv-progress.show{display:flex}
    #dvExportModal .dv-spinner{width:20px;height:20px;border:3px solid #e5e7eb;border-top-color:#c0392b;border-radius:50%;animation:dvSpin .7s linear infinite;flex-shrink:0}
    @keyframes dvSpin{to{transform:rotate(360deg)}}
    /* ── Thẻ thông tin thể thức NĐ30 ── */
    #dvExportModal .dv-nd30-badge{display:flex;align-items:center;gap:8px;padding:8px 12px;background:linear-gradient(135deg,#fff7ed,#fef3c7);border:1px solid #fcd34d;border-radius:8px;margin-bottom:16px;font-size:0.74rem;color:#92400e}
    #dvExportModal .dv-nd30-badge i{color:#d97706}
  `;
  document.head.appendChild(style);
})();

// ─────────────────────────────────────────────────────────────────────
//  1. TIỆN ÍCH & THỂ THỨC NĐ30
// ─────────────────────────────────────────────────────────────────────

const ND30 = {
  // Khổ giấy A4 theo NĐ30: lề trên 20-25mm, dưới 20-25mm, trái 30-35mm, phải 15-20mm
  PAGE_STYLE: `
    @page { size: A4 portrait; margin: 25mm 20mm 25mm 30mm; }
    body {
      font-family: 'Times New Roman', Times, serif;
      font-size: 14pt;
      line-height: 1.5;
      color: #000;
    }
  `,

  // Ngày tháng theo NĐ30: "…, ngày … tháng … năm …"
  formatDate(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    if (isNaN(d)) return dateStr;
    return `ngày ${d.getDate()} tháng ${d.getMonth() + 1} năm ${d.getFullYear()}`;
  },

  // Tên file theo NĐ30: viết không dấu, dấu gạch ngang
  sanitizeFilename(name) {
    return name
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g,'d').replace(/Đ/g,'D')
      .replace(/[^a-zA-Z0-9_\-]/g, '_')
      .replace(/_+/g, '_').replace(/^_|_$/g, '')
      .substring(0, 80);
  },

  // Tạo CSS hoàn chỉnh cho văn bản NĐ30
  getDocCSS(extra = '') {
    return `
      @page { size: A4; margin: 25mm 20mm 25mm 30mm; }
      * { box-sizing: border-box; }
      body {
        font-family: 'Times New Roman', Times, serif;
        font-size: 13pt;
        line-height: 1.8;
        color: #000;
        margin: 0; padding: 20px 0;
      }
      /* Quốc hiệu - Tiêu ngữ */
      .quoc-hieu {
        text-align: center; font-weight: bold;
        text-transform: uppercase; font-size: 13pt;
        line-height: 1.4; margin-bottom: 4pt;
      }
      .tieu-ngu {
        text-align: center; font-size: 13pt;
        text-decoration: underline; margin-bottom: 16pt;
      }
      /* Tiêu đề */
      .doc-title {
        text-align: center; font-weight: bold;
        text-transform: uppercase; font-size: 14pt;
        margin: 14pt 0 6pt;
      }
      .doc-subtitle {
        text-align: center; font-style: italic;
        font-size: 13pt; margin-bottom: 14pt;
      }
      /* Cơ quan ban hành */
      .co-quan { font-weight: bold; text-transform: uppercase; font-size: 12pt; }
      .co-quan-con { font-size: 11pt; text-transform: uppercase; font-weight: bold; }
      /* Số ký hiệu */
      .so-ky-hieu { font-size: 12pt; }
      /* Ngày tháng, địa danh */
      .dia-danh-ngay { font-style: italic; }
      /* Nội dung */
      p { margin: 0 0 8pt; text-align: justify; }
      p.indent { text-indent: 1cm; }
      /* Bảng */
      table { border-collapse: collapse; width: 100%; margin: 8pt 0; }
      th, td { border: 1px solid #333; padding: 5pt 8pt; font-size: 11pt; }
      th { background: #f0f0f0; text-align: center; font-weight: bold; }
      .table-no-border { border: none !important; }
      .table-no-border td, .table-no-border th { border: none !important; }
      /* Chữ ký */
      .chu-ky { width: 100%; margin-top: 16pt; }
      .chu-ky td { border: none; vertical-align: top; }
      .chu-ky .sign-block { text-align: center; }
      .chu-ky .sign-title { font-weight: bold; text-transform: uppercase; }
      .chu-ky .sign-name { font-weight: bold; margin-top: 40pt; }
      /* In */
      @media print {
        body { padding: 0; }
        .no-print { display: none !important; }
        a { text-decoration: none; color: inherit; }
      }
      ${extra}
    `;
  },

  // Phần đầu văn bản theo NĐ30 (hai cột: cơ quan ban hành + Quốc hiệu/Tiêu ngữ)
  buildHeader(opts = {}) {
    const {
      coQuan = '', coQuanCon = '', soHieu = '', tenLoai = '',
      diaDanh = '', ngay = '', showQuocHieu = true
    } = opts;

    const ngayFormatted = ngay
      ? `${diaDanh ? diaDanh + ', ' : ''}${this.formatDate(ngay)}`
      : (diaDanh ? diaDanh + ', ngày …….. tháng …….. năm ………' : '');

    return `
      <table class="table-no-border" style="width:100%;margin-bottom:4pt">
        <tr>
          <td style="width:50%;vertical-align:top">
            ${coQuan ? `<div class="co-quan">${coQuan}</div>` : ''}
            ${coQuanCon ? `<div class="co-quan-con">${coQuanCon}</div>` : ''}
            <div style="font-size:12pt">───────────</div>
            ${soHieu ? `<div class="so-ky-hieu">Số: ${soHieu}</div>` : ''}
          </td>
          <td style="width:50%;text-align:center;vertical-align:top">
            ${showQuocHieu ? `
              <div class="quoc-hieu">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
              <div class="tieu-ngu">Độc lập – Tự do – Hạnh phúc</div>
            ` : `<div class="quoc-hieu">ĐOÀN TNCS HỒ CHÍ MINH</div>`}
            <div class="dia-danh-ngay" style="margin-top:6pt">${ngayFormatted}</div>
          </td>
        </tr>
      </table>
    `;
  },

  // Phần chữ ký
  buildSignature(opts = {}) {
    const {
      chucVu = 'T/M BAN CHẤP HÀNH<br>BÍ THƯ',
      hoTen = '',
      diaDanh = '',
      ngay = ''
    } = opts;
    return `
      <table class="chu-ky">
        <tr>
          <td style="width:50%"></td>
          <td style="width:50%;text-align:center">
            ${diaDanh || ngay ? `<div class="dia-danh-ngay" style="margin-bottom:8pt">${diaDanh ? diaDanh + ', ' : ''}${ngay ? this.formatDate(ngay) : ''}</div>` : ''}
            <div class="sign-title">${chucVu}</div>
            <div style="height:50pt"></div>
            ${hoTen ? `<div class="sign-name">${hoTen}</div>` : '<div class="sign-name">………………………………</div>'}
          </td>
        </tr>
      </table>
    `;
  }
};

// ─────────────────────────────────────────────────────────────────────
//  2. GENERATORS — Tạo nội dung HTML theo thể thức NĐ30
// ─────────────────────────────────────────────────────────────────────

const DocGenerators = {

  // 2a. Văn bản từ mẫu (template)
  template(raw, name, settings = {}) {
    const s = settings;
    const today = new Date().toISOString().split('T')[0];
    const headerHtml = ND30.buildHeader({
      coQuan: s.doanCapTren || 'ĐOÀN TNCS HỒ CHÍ MINH',
      coQuanCon: s.unitName || 'BCH CHI ĐOÀN',
      diaDanh: s.diaDanh || '',
      ngay: today,
      showQuocHieu: false
    });
    const content = raw.replace(/\n/g, '</p><p class="indent">');
    return `
      ${headerHtml}
      <div class="doc-title" style="margin-top:12pt">${name.toUpperCase()}</div>
      <div style="height:8pt"></div>
      <div style="text-align:justify;text-indent:1cm">${content}</div>
      ${ND30.buildSignature({ chucVu: 'T/M BAN CHẤP HÀNH<br>BÍ THƯ', hoTen: s.biThu || '' })}
    `;
  },

  // 2b. Báo cáo tổng kết / kết quả
  report(content, title, settings = {}) {
    const s = settings;
    const today = new Date().toISOString().split('T')[0];
    const headerHtml = ND30.buildHeader({
      coQuan: s.doanCapTren || 'ĐOÀN TNCS HỒ CHÍ MINH',
      coQuanCon: s.unitName || 'BCH CHI ĐOÀN',
      diaDanh: s.diaDanh || '',
      ngay: today,
      showQuocHieu: false
    });
    return `
      ${headerHtml}
      <div class="doc-title">${(title || 'BÁO CÁO').toUpperCase()}</div>
      <div style="height:6pt"></div>
      <div style="text-align:justify">${content.replace(/\n\n/g,'</p><p class="indent">').replace(/\n/g,'<br>')}</div>
      ${ND30.buildSignature({ chucVu: 'T/M BAN CHẤP HÀNH<br>BÍ THƯ', hoTen: s.biThu || '' })}
    `;
  },

  // 2c. Danh sách đoàn viên
  members(list, filters = {}, settings = {}) {
    const s = settings;
    const partyLabelMap = { utu: 'Đoàn viên ưu tú', dubia: 'Đảng viên dự bị', chinh_thuc: 'Đảng viên chính thức', '': 'Đoàn viên' };
    const today = new Date().toISOString().split('T')[0];
    const headerHtml = ND30.buildHeader({
      coQuan: s.doanCapTren || 'ĐOÀN TNCS HỒ CHÍ MINH',
      coQuanCon: s.unitName || 'BCH CHI ĐOÀN',
      diaDanh: s.diaDanh || '',
      ngay: today,
      showQuocHieu: false
    });
    return `
      ${headerHtml}
      <div class="doc-title">DANH SÁCH ${(filters.partyLabel || 'ĐOÀN VIÊN').toUpperCase()}</div>
      <div class="doc-subtitle">
        Đơn vị: ${filters.chiDoan || 'Tất cả chi đoàn'} &nbsp;|&nbsp;
        Trạng thái: ${filters.statusLabel || 'Tất cả'} &nbsp;|&nbsp;
        Lập ngày: ${new Date().toLocaleDateString('vi-VN')}
      </div>
      <table>
        <thead>
          <tr>
            <th style="width:30px">STT</th>
            <th>Họ và tên</th>
            <th style="width:36px">GT</th>
            <th>Chi đoàn</th>
            <th>Chức vụ</th>
            <th>Ngày sinh</th>
            <th>Ngày vào ĐTN</th>
            <th>Danh hiệu</th>
            <th>Điện thoại</th>
            <th>Ghi chú</th>
          </tr>
        </thead>
        <tbody>
          ${list.map((m, i) => `
            <tr>
              <td style="text-align:center">${i + 1}</td>
              <td><strong>${m.fullName || ''}</strong></td>
              <td style="text-align:center">${m.gender === 'female' ? 'Nữ' : 'Nam'}</td>
              <td>${m.chiDoan || '—'}</td>
              <td>${m.role || 'Đoàn viên'}</td>
              <td style="text-align:center;white-space:nowrap">${m.birthDate ? new Date(m.birthDate).toLocaleDateString('vi-VN') : '—'}</td>
              <td style="text-align:center;white-space:nowrap">${m.joinDate ? new Date(m.joinDate).toLocaleDateString('vi-VN') : '—'}</td>
              <td>${partyLabelMap[m.partyStatus || '']}</td>
              <td>${m.phone || '—'}</td>
              <td>${m.partyCard || m.note || ''}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <p style="margin-top:8pt">Tổng cộng: <strong>${list.length}</strong> người.</p>
      ${ND30.buildSignature({ chucVu: 'T/M BAN CHẤP HÀNH<br>BÍ THƯ', hoTen: s.biThu || '' })}
    `;
  },

  // 2d. Nghị quyết giới thiệu Mẫu 4-KNĐ (Điều lệ Đảng)
  nghiquyet(fields = {}, settings = {}) {
    const s = settings;
    const ngay = new Date(fields.ngayKy || Date.now());
    const d = ngay.getDate(), mo = ngay.getMonth() + 1, y = ngay.getFullYear();
    return `
      <div style="text-align:right;font-size:11pt;margin-bottom:4pt">Mẫu 4-KNĐ</div>
      <table class="table-no-border" style="width:100%;margin-bottom:6pt">
        <tr>
          <td style="width:50%;vertical-align:top">
            <div class="co-quan" style="font-size:11pt">${fields.doanCapTren || s.doanCapTren || ''}</div>
            <div class="co-quan-con" style="font-size:11pt">${fields.bchCDCS || s.bchCDCS || ''}</div>
            <div style="font-size:11pt">───────────</div>
            <div style="font-size:11pt">Số: ${fields.soNghiQuyet || '……-NQ/CĐCS'}</div>
          </td>
          <td style="width:50%;text-align:center;vertical-align:top">
            <div style="font-weight:bold;text-decoration:underline;font-size:12pt">ĐOÀN TNCS HỒ CHÍ MINH</div>
            <div style="font-style:italic;font-size:12pt">${fields.diaDanh || s.diaDanh || ''}, ngày ${d} tháng ${mo} năm ${y}</div>
          </td>
        </tr>
      </table>
      <div class="doc-title">NGHỊ QUYẾT</div>
      <div class="doc-subtitle" style="font-size:13pt">
        Về việc giới thiệu đoàn viên <strong>${fields.hoTen || '…………………'}</strong>, sinh năm <strong>${fields.namSinh || '………'}</strong><br>
        vào Đảng Cộng sản Việt Nam
      </div>
      <p class="indent"><strong>BAN CHẤP HÀNH ${(fields.bchCDCS || s.bchCDCS || 'CHI ĐOÀN CƠ SỞ').toUpperCase()}</strong></p>
      <p class="indent">Căn cứ Điều lệ Đoàn TNCS Hồ Chí Minh;</p>
      <p class="indent">Căn cứ Điều lệ Đảng Cộng sản Việt Nam;</p>
      <p class="indent">Xét đề nghị của đoàn viên ${fields.hoTen || '…………………'} và ý kiến của các đoàn viên trong chi đoàn;</p>
      <p class="indent"><strong>QUYẾT NGHỊ:</strong></p>
      <p class="indent">Điều 1. Nhất trí giới thiệu đồng chí <strong>${fields.hoTen || '……………………………'}</strong>, sinh ngày …… tháng …… năm <strong>${fields.namSinh || '……'}</strong>; là đoàn viên của ${fields.bchCDCS || 'Chi đoàn cơ sở ………'}, để ${fields.chiUy || 'Chi ủy'} xem xét, giới thiệu vào Đảng Cộng sản Việt Nam.</p>
      <p class="indent">Điều 2. <strong>Những ưu điểm chính:</strong></p>
      <p class="indent"><em>a) Về phẩm chất chính trị, đạo đức, lối sống:</em></p>
      <p>${(fields.uuDiemCT || '').replace(/\n/g, '<br>')}</p>
      <p class="indent"><em>b) Về năng lực công tác, chuyên môn:</em></p>
      <p>${(fields.uuDiemCM || '').replace(/\n/g, '<br>')}</p>
      <p class="indent"><em>c) Về ý thức tổ chức kỷ luật Đoàn:</em></p>
      <p>${(fields.uuDiemDoan || '').replace(/\n/g, '<br>')}</p>
      ${fields.khuyetDiem ? `<p class="indent"><strong>Khuyết điểm:</strong></p><p>${fields.khuyetDiem.replace(/\n/g,'<br>')}</p>` : ''}
      <p class="indent">Điều 3. Kết quả biểu quyết: <strong>${fields.tanThanh || '……/……'}</strong> đồng chí tán thành (đạt ${fields.tanThanh ? Math.round((parseInt(fields.tanThanh.split('/')[0] || 0) / Math.max(1, parseInt(fields.tanThanh.split('/')[1] || 1))) * 100) : '…'}%); ${fields.khongTanThanh || '0'} đồng chí không tán thành./.</p>
      <table class="table-no-border" style="width:100%;margin-top:16pt">
        <tr>
          <td style="width:50%">
            <div><em>Nơi nhận:</em></div>
            <div style="font-size:11pt">- ${fields.doanCapTren || 'Đoàn cấp trên'} (b/c);</div>
            <div style="font-size:11pt">- ${fields.chiUy || 'Chi ủy'} (thực hiện);</div>
            <div style="font-size:11pt">- Lưu Chi đoàn.</div>
          </td>
          <td style="width:50%;text-align:center">
            <div style="font-weight:bold;text-transform:uppercase">T/M BAN CHẤP HÀNH<br>BÍ THƯ</div>
            <div style="height:48pt"></div>
            <div style="font-weight:bold">${fields.biThu || s.biThu || '……………………………'}</div>
          </td>
        </tr>
      </table>
    `;
  },

  // 2e. Nhận xét chuyển Đảng chính thức (Mẫu BCH Đoàn)
  nhanxet(fields = {}, settings = {}) {
    const s = settings;
    const ngay = new Date(fields.ngayKy || Date.now());
    const d = ngay.getDate(), mo = ngay.getMonth() + 1, y = ngay.getFullYear();
    const tanThanh = fields.tanThanh || '';
    const khongTanThanh = fields.khongTanThanh || '0';
    const pct = tanThanh
      ? Math.round((parseInt(tanThanh.split('/')[0] || 0) / Math.max(1, parseInt(tanThanh.split('/')[1] || 1))) * 100)
      : '…';
    return `
      <table class="table-no-border" style="width:100%;margin-bottom:6pt">
        <tr>
          <td style="width:50%;vertical-align:top">
            <div class="co-quan" style="font-size:11pt">${fields.doanCapTren || s.doanCapTren || ''}</div>
            <div class="co-quan-con" style="font-size:11pt">${fields.bchCDCS || s.bchCDCS || ''}</div>
            <div style="font-size:11pt">───────────</div>
          </td>
          <td style="width:50%;text-align:center;vertical-align:top">
            <div style="font-weight:bold;text-decoration:underline;font-size:12pt">ĐOÀN TNCS HỒ CHÍ MINH</div>
            <div style="font-style:italic;font-size:12pt">${fields.diaDanh || s.diaDanh || ''}, ngày ${d} tháng ${mo} năm ${y}</div>
          </td>
        </tr>
      </table>
      <div class="doc-title">Ý KIẾN NHẬN XÉT</div>
      <div class="doc-subtitle">của BCH Đoàn TNCS HCM đối với đảng viên dự bị</div>
      <p class="indent">Căn cứ đề nghị của ${fields.chiBo || 'Chi bộ ………………'}, Ban chấp hành ${fields.bchCDCS || 'Chi Đoàn cơ sở ………………'}, có ý kiến nhận xét đối với đảng viên dự bị: <strong>${fields.hoTen || '……………………………'}</strong>, sinh ngày ${fields.ngaySinh ? new Date(fields.ngaySinh).toLocaleDateString('vi-VN') : '…/…/……'}, là đoàn viên ${fields.bchCDCS || 'Chi Đoàn cơ sở'}, như sau:</p>
      <p><strong>Những ưu, khuyết điểm chính:</strong></p>
      <p class="indent">- <em>Về phẩm chất chính trị:</em><br>${(fields.nxCT || '').replace(/\n/g,'<br>')}</p>
      <p class="indent">- <em>Về đạo đức, lối sống:</em><br>${(fields.nxDD || '').replace(/\n/g,'<br>')}</p>
      <p class="indent">- <em>Về năng lực công tác:</em><br>${(fields.nxNL || '').replace(/\n/g,'<br>')}</p>
      <p class="indent">- <em>Về quan hệ quần chúng:</em><br>${(fields.nxQC || '').replace(/\n/g,'<br>')}</p>
      <p class="indent">- <em>Về thực hiện nhiệm vụ đảng viên:</em><br>${(fields.nxNV || '').replace(/\n/g,'<br>')}</p>
      <p class="indent">Số các đồng chí trong Ban Chấp hành Chi đoàn tán thành đề nghị chuyển đảng chính thức đảng viên ${fields.hoTen || '……………'} là <strong>${tanThanh || '…/…'}</strong> (đạt ${pct}%) so với tổng số ủy viên Ban Chấp hành Chi đoàn. Số không tán thành là <strong>${khongTanThanh}</strong> đồng chí./.</p>
      <table class="table-no-border" style="width:100%;margin-top:16pt">
        <tr>
          <td style="width:50%">
            <div><em>Nơi nhận:</em></div>
            <div style="font-size:11pt">- ${fields.dangUy || 'Đảng ủy'} (b/c);</div>
            <div style="font-size:11pt">- ${fields.chiBo || 'Chi bộ'} (thực hiện);</div>
            <div style="font-size:11pt">- Lưu.</div>
          </td>
          <td style="width:50%;text-align:center">
            <div style="font-weight:bold;text-transform:uppercase">T/M BAN CHẤP HÀNH<br>BÍ THƯ</div>
            <div style="height:48pt"></div>
            <div style="font-weight:bold">${fields.biThu || s.biThu || '……………………………'}</div>
          </td>
        </tr>
      </table>
    `;
  },

  // 2f. Báo cáo hoạt động đoàn viên
  hoatdong(member, activities, settings = {}) {
    const s = settings;
    const today = new Date().toISOString().split('T')[0];
    const headerHtml = ND30.buildHeader({
      coQuan: s.doanCapTren || 'ĐOÀN TNCS HỒ CHÍ MINH',
      coQuanCon: s.unitName || 'BCH CHI ĐOÀN',
      diaDanh: s.diaDanh || '',
      ngay: today,
      showQuocHieu: false
    });
    const totalHours = activities.reduce((acc, a) => acc + (parseFloat(a.hours) || 0), 0);
    const typeMap = { hoihop: 'Hội họp', tinhthuong: 'Tình thương', vanhoa: 'Văn hóa', theducthethao: 'TDTT', daochinh: 'Dao chinh tri', khac: 'Khác' };
    const sorted = [...activities].sort((a, b) => new Date(a.time) - new Date(b.time));
    return `
      ${headerHtml}
      <div class="doc-title">BÁO CÁO HOẠT ĐỘNG</div>
      <div class="doc-subtitle">Đoàn viên: <strong>${member?.fullName || '……………………'}</strong> — Chi đoàn: ${member?.chiDoan || '……………'}</div>
      <table>
        <thead>
          <tr>
            <th style="width:30px">STT</th>
            <th>Tên hoạt động</th>
            <th style="width:100px">Thời gian</th>
            <th>Địa điểm</th>
            <th>Loại</th>
            <th>Kết quả</th>
            <th style="width:80px">Báo cáo</th>
          </tr>
        </thead>
        <tbody>
          ${sorted.map((a, i) => `
            <tr>
              <td style="text-align:center">${i + 1}</td>
              <td>${a.name || ''}${a.docRef ? `<br><small style="color:#666">${a.docRef}</small>` : ''}</td>
              <td style="text-align:center;white-space:nowrap;font-size:11pt">${a.time ? new Date(a.time).toLocaleDateString('vi-VN') : '—'}</td>
              <td style="font-size:11pt">${a.location || '—'}</td>
              <td style="font-size:11pt">${typeMap[a.type] || a.type || '—'}</td>
              <td style="font-size:11pt">${a.result || '—'}</td>
              <td style="text-align:center;font-size:11pt">${a.reportTarget || '—'}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <p style="margin-top:8pt">Tổng cộng: <strong>${activities.length}</strong> hoạt động${totalHours > 0 ? ` — <strong>${totalHours}</strong> giờ` : ''}.</p>
      ${ND30.buildSignature({ chucVu: 'T/M BAN CHẤP HÀNH<br>BÍ THƯ', hoTen: s.biThu || '' })}
    `;
  },

  // 2g. Tổng hợp trích yếu / báo cáo tổng hợp văn bản
  tomtat(docs, settings = {}) {
    const s = settings;
    const today = new Date().toISOString().split('T')[0];
    const headerHtml = ND30.buildHeader({
      coQuan: s.doanCapTren || 'ĐOÀN TNCS HỒ CHÍ MINH',
      coQuanCon: s.unitName || 'BCH CHI ĐOÀN',
      diaDanh: s.diaDanh || '',
      ngay: today,
      showQuocHieu: false
    });
    const typeMap = {
      'chi-thi': 'Chỉ thị', 'nghi-quyet': 'Nghị quyết', 'thong-bao': 'Thông báo',
      'ke-hoach': 'Kế hoạch', 'bao-cao': 'Báo cáo', 'bao-cao-dot-xuat': 'Báo cáo đột xuất', 'khac': 'Khác'
    };
    const prioMap = { high: 'Cao', medium: 'Trung bình', low: 'Thấp' };
    return `
      ${headerHtml}
      <div class="doc-title">TỔNG HỢP TRÍCH YẾU VĂN BẢN</div>
      <div class="doc-subtitle">Kỳ: …………………… | Số lượng: <strong>${docs.length}</strong> văn bản | Lập ngày: ${new Date().toLocaleDateString('vi-VN')}</div>
      <table>
        <thead>
          <tr>
            <th style="width:30px">STT</th>
            <th style="width:100px">Số/Ký hiệu</th>
            <th>Trích yếu nội dung</th>
            <th style="width:80px">Loại</th>
            <th style="width:80px">Ngày ban hành</th>
            <th style="width:80px">Hạn xử lý</th>
            <th style="width:60px">Ưu tiên</th>
            <th style="width:70px">Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          ${docs.map((doc, i) => `
            <tr>
              <td style="text-align:center">${i + 1}</td>
              <td style="font-size:11pt">${doc.code || '—'}</td>
              <td><strong style="font-size:12pt">${doc.title || ''}</strong>${doc.summary ? `<br><span style="font-size:10pt;color:#444">${(doc.summary || '').substring(0, 120)}${doc.summary.length > 120 ? '...' : ''}</span>` : ''}</td>
              <td style="text-align:center;font-size:11pt">${typeMap[doc.type] || doc.type || '—'}</td>
              <td style="text-align:center;white-space:nowrap;font-size:11pt">${doc.issueDate ? new Date(doc.issueDate).toLocaleDateString('vi-VN') : '—'}</td>
              <td style="text-align:center;white-space:nowrap;font-size:11pt;${doc.deadline && new Date(doc.deadline) < new Date() ? 'color:#c0392b;font-weight:bold' : ''}">${doc.deadline ? new Date(doc.deadline).toLocaleDateString('vi-VN') : '—'}</td>
              <td style="text-align:center;font-size:11pt">${prioMap[doc.priority] || '—'}</td>
              <td style="text-align:center;font-size:11pt">${doc.status === 'done' ? '✓ Xong' : doc.status === 'pending' ? 'Chờ' : '—'}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <p style="margin-top:8pt">Tổng cộng: <strong>${docs.length}</strong> văn bản.</p>
      ${ND30.buildSignature({ chucVu: 'T/M BAN CHẤP HÀNH<br>BÍ THƯ', hoTen: s.biThu || '' })}
    `;
  },

  // 2h. Báo cáo công tác tháng (monthly report)
  monthly(content, title, settings = {}) {
    return this.report(content, title || 'BÁO CÁO CÔNG TÁC THÁNG', settings);
  }
};

// ─────────────────────────────────────────────────────────────────────
//  3. EXPORTERS — Thực hiện xuất theo từng định dạng
// ─────────────────────────────────────────────────────────────────────

const Exporters = {

  // 3a. In / Lưu PDF (mở cửa sổ print)
  printPDF(bodyHtml, title, opts = {}) {
    const fullHtml = `<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<title>${title}</title>
<link href="https://fonts.googleapis.com/css2?family=Times+New+Roman:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
<style>
  ${ND30.getDocCSS(opts.extraCss || '')}
  .print-watermark { display:none; }
  @media print { .print-watermark { display:block; position:fixed; bottom:8mm; right:10mm; font-size:7pt; color:#bbb; } }
</style>
</head>
<body>
  <div style="max-width:170mm;margin:0 auto">
    ${bodyHtml}
  </div>
  <div class="print-watermark">ĐoànVăn • In lúc ${new Date().toLocaleString('vi-VN')}</div>
  <script>
    window.onload = function() {
      setTimeout(function() { window.print(); }, 300);
    };
  <\/script>
</body>
</html>`;
    const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const w = window.open(url, '_blank');
    if (!w) {
      // Fallback: tải về HTML
      const a = document.createElement('a');
      a.href = url; a.download = ND30.sanitizeFilename(title) + '.html'; a.click();
      if (typeof toast === 'function') toast('Đã tải xuống HTML để in (trình duyệt chặn popup)', 'info');
    }
    return true;
  },

  // 3b. Xuất DOCX (dùng thư viện docx.js)
  async exportDOCX(bodyHtml, title, opts = {}) {
    // Phương án 1: Dùng thư viện docx nếu có
    // Phương án 2 (luôn có): Tạo HTML/DOCX hybrid (Word mở được)
    const wordHtml = `<html xmlns:o='urn:schemas-microsoft-com:office:office'
  xmlns:w='urn:schemas-microsoft-com:office:word'
  xmlns='http://www.w3.org/TR/REC-html40'>
<head>
  <meta charset="utf-8">
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <!--[if gte mso 9]><xml><w:WordDocument>
    <w:View>Print</w:View>
    <w:Zoom>90</w:Zoom>
    <w:DoNotOptimizeForBrowser/>
  </w:WordDocument></xml><![endif]-->
  <style>
    @page WordSection1 {
      size: 21cm 29.7cm;
      margin: 2.5cm 2.0cm 2.5cm 3.0cm;
      mso-header-margin: .5cm;
      mso-footer-margin: .5cm;
      mso-paper-source: 0;
    }
    div.WordSection1 { page: WordSection1; }
    body {
      font-family: 'Times New Roman', serif;
      font-size: 14pt;
      line-height: 1.8;
    }
    ${ND30.getDocCSS()}
    /* Sửa cho Word */
    table { mso-table-layout-alt: fixed; }
    td { mso-table-overlap: never; }
  </style>
</head>
<body>
<div class="WordSection1">
  ${bodyHtml}
</div>
</body>
</html>`;
    const blob = new Blob(['\ufeff' + wordHtml], {
      type: 'application/msword;charset=utf-8'
    });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = ND30.sanitizeFilename(title) + '.doc';
    a.click();
    if (typeof toast === 'function') toast(`✅ Đã tải xuống "${title}.doc" — Mở bằng Microsoft Word hoặc LibreOffice`, 'success');
    return true;
  },

  // 3c. Xuất Excel / CSV
  exportExcel(data, headers, sheetName, filename) {
    if (!data || !data.length) {
      if (typeof toast === 'function') toast('Không có dữ liệu để xuất', 'warning');
      return false;
    }

    // Dùng SheetJS nếu có (đã tải động trong app)
    if (typeof XLSX !== 'undefined') {
      const wsData = [headers, ...data];
      const ws = XLSX.utils.aoa_to_sheet(wsData);
      // Định dạng cột đầu (header)
      const range = XLSX.utils.decode_range(ws['!ref']);
      for (let c = range.s.c; c <= range.e.c; c++) {
        const cellRef = XLSX.utils.encode_cell({ r: 0, c });
        if (!ws[cellRef]) continue;
        ws[cellRef].s = {
          font: { bold: true },
          fill: { fgColor: { rgb: 'E8E8E8' } },
          alignment: { horizontal: 'center', wrapText: true }
        };
      }
      ws['!cols'] = headers.map(() => ({ wch: 20 }));
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, sheetName || 'Sheet1');
      XLSX.writeFile(wb, filename + '.xlsx');
      if (typeof toast === 'function') toast(`✅ Đã xuất ${data.length} dòng ra Excel (XLSX)!`, 'success');
      return true;
    }

    // Fallback: CSV với BOM UTF-8
    const csvRows = [headers, ...data].map(row =>
      row.map(cell => {
        const s = String(cell == null ? '' : cell);
        return /[,"\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
      }).join(',')
    );
    const csv = '\uFEFF' + csvRows.join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename + '.csv';
    a.click();
    if (typeof toast === 'function') toast(`✅ Đã xuất ${data.length} dòng ra CSV (mở bằng Excel)!`, 'success');
    return true;
  },

  // 3d. Xuất Excel danh sách đoàn viên (có cả sheet thống kê)
  exportMembersExcel(list, title, settings = {}) {
    const s = settings;
    const partyMap = { utu: 'Đoàn viên ưu tú', dubia: 'Đảng viên dự bị', chinh_thuc: 'Đảng viên chính thức', '': 'Đoàn viên' };
    const statusMap = { active: 'Đang hoạt động', inactive: 'Tạm ngừng', graduated: 'Tốt nghiệp/Chuyển đi' };

    const headers = ['STT', 'Họ và tên', 'Giới tính', 'Chi đoàn', 'Chức vụ',
      'Ngày sinh', 'Ngày vào Đoàn', 'Danh hiệu Đảng/Đoàn', 'Ngày kết nạp/CN',
      'Số thẻ/QĐ', 'Điện thoại', 'Email', 'Trạng thái', 'Thành tích', 'Ghi chú'];

    const data = list.map((m, i) => [
      i + 1, m.fullName || '', m.gender === 'female' ? 'Nữ' : 'Nam',
      m.chiDoan || '', m.role || 'Đoàn viên',
      m.birthDate ? new Date(m.birthDate).toLocaleDateString('vi-VN') : '',
      m.joinDate ? new Date(m.joinDate).toLocaleDateString('vi-VN') : '',
      partyMap[m.partyStatus || ''],
      m.partyDate ? new Date(m.partyDate).toLocaleDateString('vi-VN') : '',
      m.partyCard || '', m.phone || '', m.email || '',
      statusMap[m.status] || m.status || '',
      m.achieve || '', m.note || ''
    ]);

    this.exportExcel(data, headers, 'Danh sách ĐV', ND30.sanitizeFilename(title));
  }
};

// ─────────────────────────────────────────────────────────────────────
//  4. DIALOG — Modal chọn định dạng
// ─────────────────────────────────────────────────────────────────────

// Tạo modal DOM nếu chưa có
function _ensureExportModal() {
  if (document.getElementById('dvExportModal')) return;
  const el = document.createElement('div');
  el.id = 'dvExportModal';
  el.innerHTML = `
    <div class="dv-overlay" onclick="DoanVanExport.closeDialog()"></div>
    <div class="dv-box">
      <div class="dv-title"><i class="fas fa-file-export" style="color:#c0392b"></i> Xuất văn bản</div>
      <div class="dv-sub" id="dvExportSub">Chọn định dạng phù hợp</div>
      <div class="dv-nd30-badge">
        <i class="fas fa-certificate"></i>
        <span>Thể thức văn bản theo <strong>Nghị định 30/2020/NĐ-CP</strong> và quy định của <strong>Điều lệ Đoàn, Điều lệ Đảng</strong></span>
      </div>
      <div class="dv-formats" id="dvFormatGrid"></div>
      <div class="dv-opts" id="dvExportOpts" style="display:none">
        <div class="dv-opts-title">Tùy chọn bổ sung</div>
        <div id="dvExportOptsContent"></div>
      </div>
      <div class="dv-progress" id="dvExportProgress">
        <div class="dv-spinner"></div>
        <span id="dvExportProgressMsg">Đang tạo văn bản…</span>
      </div>
      <div class="dv-actions">
        <button class="dv-btn dv-btn-outline" onclick="DoanVanExport.closeDialog()"><i class="fas fa-times"></i> Đóng</button>
        <button class="dv-btn dv-btn-primary" id="dvExportDoBtn" onclick="DoanVanExport._doExport()">
          <i class="fas fa-download"></i> <span id="dvExportBtnLabel">Xuất</span>
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(el);
}

const FORMAT_DEFS = [
  {
    id: 'print',
    name: 'In / PDF',
    icon: '<i class="fas fa-print" style="color:#fff"></i>',
    color: '#c0392b',
    desc: 'Mở cửa sổ in, lưu PDF qua máy in ảo'
  },
  {
    id: 'word',
    name: 'Word (.doc)',
    icon: '<i class="fas fa-file-word" style="color:#fff"></i>',
    color: '#2b579a',
    desc: 'Định dạng Word, chỉnh sửa dễ dàng'
  },
  {
    id: 'excel',
    name: 'Excel (.xlsx)',
    icon: '<i class="fas fa-file-excel" style="color:#fff"></i>',
    color: '#217346',
    desc: 'Bảng tính Excel (chỉ dành cho danh sách)'
  },
  {
    id: 'csv',
    name: 'CSV / Text',
    icon: '<i class="fas fa-file-csv" style="color:#fff"></i>',
    color: '#6b7280',
    desc: 'Văn bản thuần, tương thích mọi phần mềm'
  }
];

// State
const _state = {
  type: null,
  data: null,
  format: 'print',
  bodyHtml: null,
  title: null
};

const DoanVanExport = {
  // ── Mở dialog
  showDialog(type, data = {}) {
    _ensureExportModal();
    _state.type = type;
    _state.data = data;
    _state.format = 'print';
    _state.bodyHtml = null;
    _state.title = data.title || 'Van ban';

    // Tiêu đề mô tả
    const subtitles = {
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
    const showExcel = ['members', 'hoatdong', 'tomtat'].includes(type);
    const showCsv = ['members', 'tomtat'].includes(type);
    const fmts = FORMAT_DEFS.filter(f => {
      if (f.id === 'excel' && !showExcel) return false;
      if (f.id === 'csv' && !showCsv) return false;
      return true;
    });

    document.getElementById('dvFormatGrid').innerHTML = fmts.map(f => `
      <div class="dv-fmt-btn ${f.id === _state.format ? 'selected' : ''}"
           onclick="DoanVanExport.selectFormat('${f.id}')">
        <div class="dv-fmt-icon" style="background:${f.color}">${f.icon}</div>
        <div>
          <div class="dv-fmt-name">${f.name}</div>
          <div class="dv-fmt-desc">${f.desc}</div>
        </div>
      </div>
    `).join('');

    // Tùy chọn bổ sung
    this._renderOpts(type, data);

    // Reset progress
    document.getElementById('dvExportProgress').classList.remove('show');
    document.getElementById('dvExportDoBtn').disabled = false;

    document.getElementById('dvExportModal').classList.add('open');
  },

  selectFormat(id) {
    _state.format = id;
    // Cập nhật UI
    document.querySelectorAll('#dvExportModal .dv-fmt-btn').forEach(btn => {
      btn.classList.toggle('selected', btn.getAttribute('onclick').includes(`'${id}'`));
    });
    const labelMap = { print: 'In / Lưu PDF', word: 'Tải xuống Word', excel: 'Tải xuống Excel', csv: 'Tải xuống CSV' };
    document.getElementById('dvExportBtnLabel').textContent = labelMap[id] || 'Xuất';
  },

  _renderOpts(type, data) {
    const optsEl = document.getElementById('dvExportOpts');
    const contentEl = document.getElementById('dvExportOptsContent');
    const s = (typeof DB !== 'undefined') ? DB.getObj('settings') : {};

    let optsHtml = '';
    if (type === 'members') {
      optsHtml = `
        <div class="dv-row">
          <div class="dv-field">
            <div class="dv-label">Hiển thị điện thoại</div>
            <select class="dv-input" id="dvOptPhone">
              <option value="1">Có</option>
              <option value="0">Ẩn (bảo mật)</option>
            </select>
          </div>
          <div class="dv-field">
            <div class="dv-label">Hiển thị email</div>
            <select class="dv-input" id="dvOptEmail">
              <option value="0">Ẩn</option>
              <option value="1">Có</option>
            </select>
          </div>
        </div>
      `;
    }
    if (['nghiquyet', 'nhanxet', 'report', 'template', 'monthly'].includes(type)) {
      optsHtml = `
        <div class="dv-row">
          <div class="dv-field">
            <div class="dv-label">Cỡ chữ</div>
            <select class="dv-input" id="dvOptFontSize">
              <option value="13pt">13pt (mặc định)</option>
              <option value="14pt">14pt (chuẩn NĐ30)</option>
              <option value="12pt">12pt (nhỏ hơn)</option>
            </select>
          </div>
          <div class="dv-field">
            <div class="dv-label">Giãn dòng</div>
            <select class="dv-input" id="dvOptLineHeight">
              <option value="1.8">1.8 (chuẩn NĐ30)</option>
              <option value="1.5">1.5 (cô đọng)</option>
              <option value="2.0">2.0 (rộng rãi)</option>
            </select>
          </div>
        </div>
      `;
    }
    if (optsHtml) {
      contentEl.innerHTML = optsHtml;
      optsEl.style.display = '';
    } else {
      optsEl.style.display = 'none';
    }
  },

  async _doExport() {
    const type = _state.type;
    const data = _state.data;
    const fmt = _state.format;
    const s = (typeof DB !== 'undefined') ? DB.getObj('settings') : {};

    // Show progress
    const progEl = document.getElementById('dvExportProgress');
    const progMsg = document.getElementById('dvExportProgressMsg');
    const btn = document.getElementById('dvExportDoBtn');
    progEl.classList.add('show');
    progMsg.textContent = 'Đang chuẩn bị nội dung…';
    btn.disabled = true;

    try {
      // Lấy tùy chọn
      const getOpt = (id, def) => {
        const el = document.getElementById(id);
        return el ? el.value : def;
      };
      const fontSize = getOpt('dvOptFontSize', '13pt');
      const lineHeight = getOpt('dvOptLineHeight', '1.8');
      const showPhone = getOpt('dvOptPhone', '1') === '1';
      const extraCss = `body { font-size: ${fontSize}; line-height: ${lineHeight}; }`;

      // Tạo HTML nội dung văn bản
      let bodyHtml = '';
      let title = data.title || 'Van ban';

      progMsg.textContent = 'Đang tạo thể thức văn bản…';
      await new Promise(r => setTimeout(r, 50));

      switch (type) {
        case 'template':
          bodyHtml = DocGenerators.template(data.raw, data.name, s);
          title = data.name || 'Mau van ban';
          break;
        case 'report':
        case 'monthly':
          // Nếu đã có bodyHtml được dựng sẵn thì dùng luôn
          if (data._prebuiltHtml) {
            const hdr = ND30.buildHeader({
              coQuan: s.doanCapTren || 'ĐOÀN TNCS HỒ CHÍ MINH',
              coQuanCon: s.unitName || 'BCH CHI ĐOÀN',
              diaDanh: s.diaDanh || '',
              ngay: new Date().toISOString().split('T')[0],
              showQuocHieu: false
            });
            bodyHtml = hdr + data.content + ND30.buildSignature({ chucVu: 'T/M BAN CHẤP HÀNH<br>BÍ THƯ', hoTen: s.biThu || '' });
          } else if (type === 'monthly') {
            bodyHtml = DocGenerators.monthly(data.content, data.name, s);
          } else {
            bodyHtml = DocGenerators.report(data.content, data.name, s);
          }
          title = data.name || (type === 'monthly' ? 'Bao cao cong tac thang' : 'Bao cao');
          break;
        case 'members':
          bodyHtml = DocGenerators.members(data.list, data.filters || {}, s);
          title = `Danh sach ${(data.filters?.partyLabel || 'doan vien').replace(/\s+/g, '_')}`;
          break;
        case 'nghiquyet':
          bodyHtml = DocGenerators.nghiquyet(data.fields, s);
          title = `NghiQuyet_${(data.fields?.hoTen || '').replace(/\s+/g,'_')}`;
          break;
        case 'nhanxet':
          bodyHtml = DocGenerators.nhanxet(data.fields, s);
          title = `NhanXet_${(data.fields?.hoTen || '').replace(/\s+/g,'_')}`;
          break;
        case 'hoatdong':
          bodyHtml = DocGenerators.hoatdong(data.member, data.activities || [], s);
          title = `HoatDong_${(data.member?.fullName || '').replace(/\s+/g,'_')}`;
          break;
        case 'tomtat':
          bodyHtml = DocGenerators.tomtat(data.docs || [], s);
          title = `TongHopTrichYeu_${new Date().toISOString().split('T')[0]}`;
          break;
        default:
          bodyHtml = `<p>${data.content || data.raw || '(không có nội dung)'}</p>`;
      }

      progMsg.textContent = 'Đang xuất…';
      await new Promise(r => setTimeout(r, 80));

      // Thực hiện xuất
      if (fmt === 'print') {
        Exporters.printPDF(bodyHtml, title, { extraCss });
      } else if (fmt === 'word') {
        await Exporters.exportDOCX(bodyHtml, title);
      } else if (fmt === 'excel') {
        if (type === 'members') {
          Exporters.exportMembersExcel(data.list, title, s);
        } else if (type === 'hoatdong') {
          const typeMap = { hoihop: 'Hội họp', tinhthuong: 'Tình thương', vanhoa: 'Văn hóa', theducthethao: 'TDTT', khac: 'Khác' };
          const headers = ['STT', 'Tên hoạt động', 'Thời gian', 'Địa điểm', 'Loại', 'Kết quả', 'Báo cáo'];
          const rows = (data.activities || []).map((a, i) => [
            i + 1, a.name || '', a.time ? new Date(a.time).toLocaleDateString('vi-VN') : '',
            a.location || '', typeMap[a.type] || a.type || '', a.result || '', a.reportTarget || ''
          ]);
          Exporters.exportExcel(rows, headers, 'Hoạt động', title);
        } else {
          const headers = ['STT', 'Số/Ký hiệu', 'Tiêu đề', 'Loại', 'Ngày ban hành', 'Hạn xử lý', 'Ưu tiên', 'Trạng thái', 'Tóm tắt'];
          const rows = (data.docs || []).map((doc, i) => [
            i + 1, doc.code || '', doc.title || '', doc.type || '',
            doc.issueDate ? new Date(doc.issueDate).toLocaleDateString('vi-VN') : '',
            doc.deadline ? new Date(doc.deadline).toLocaleDateString('vi-VN') : '',
            doc.priority || '', doc.status || '',
            (doc.summary || '').substring(0, 200)
          ]);
          Exporters.exportExcel(rows, headers, 'Văn bản', title);
        }
      } else if (fmt === 'csv') {
        if (type === 'members') {
          Exporters.exportMembersExcel(data.list, title, s); // sẽ fallback CSV nếu XLSX chưa tải
        } else {
          const blob = new Blob(['\uFEFF' + bodyHtml.replace(/<[^>]+>/g, '')], { type: 'text/plain;charset=utf-8' });
          const a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = ND30.sanitizeFilename(title) + '.txt';
          a.click();
          if (typeof toast === 'function') toast('✅ Đã tải xuống file văn bản thuần (TXT)', 'success');
        }
      }

      this.closeDialog();
    } catch (err) {
      console.error('[DoanVanExport]', err);
      progMsg.textContent = 'Lỗi: ' + err.message;
      btn.disabled = false;
    } finally {
      progEl.classList.remove('show');
      btn.disabled = false;
    }
  },

  closeDialog() {
    const el = document.getElementById('dvExportModal');
    if (el) el.classList.remove('open');
  }
};

// ─────────────────────────────────────────────────────────────────────
//  5. PATCHES — Ghi đè hàm cũ, gọi dialog mới
// ─────────────────────────────────────────────────────────────────────

// Patch: printTemplate()
window.printTemplate = function() {
  const raw = window._currentTplRaw || '';
  const name = window._currentTplName || 'Văn bản';
  if (!raw) { if (typeof toast === 'function') toast('Chưa có nội dung để xuất', 'warning'); return; }
  DoanVanExport.showDialog('template', { raw, name, title: name });
};

// Patch: printReport()
window.printReport = function() {
  const content = document.getElementById('rpResult')?.value
    || document.getElementById('reportContent')?.value
    || document.getElementById('aiResult')?.value || '';
  const titleEl = document.getElementById('rpTitle') || document.getElementById('reportTitle');
  const name = titleEl?.value || 'Báo cáo';
  if (!content) { if (typeof toast === 'function') toast('Chưa có nội dung để in', 'warning'); return; }
  DoanVanExport.showDialog('report', { content, name, title: name });
};

// Patch: printMonthlyReport()
window.printMonthlyReport = function() {
  // Thu thập nội dung từ các field báo cáo tháng
  const sections = ['Tình hình chung', 'Kết quả thực hiện', 'Tồn tại hạn chế', 'Phương hướng tháng tới'];
  let content = '';
  const fieldIds = ['rpMonthSummary', 'rpMonthResult', 'rpMonthIssue', 'rpMonthPlan'];
  fieldIds.forEach((id, i) => {
    const el = document.getElementById(id);
    if (el && el.value.trim()) {
      content += `\n${i + 1}. ${sections[i].toUpperCase()}\n${el.value.trim()}\n`;
    }
  });
  // Fallback: lấy tất cả textarea gần khu vực báo cáo tháng
  if (!content) {
    const page = document.getElementById('page-reports') || document.getElementById('page-report');
    if (page) {
      page.querySelectorAll('textarea').forEach(ta => {
        if (ta.value.trim()) content += ta.value.trim() + '\n\n';
      });
    }
  }
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  const name = `Báo cáo công tác Đoàn tháng ${month} năm ${year}`;
  DoanVanExport.showDialog('monthly', { content: content || '(Chưa có nội dung)', name });
};

// Patch: printActivitySummary()
window.printActivitySummary = function() {
  const content = document.getElementById('activitySummary')?.textContent
    || document.getElementById('actSummaryResult')?.value
    || document.getElementById('aiResult')?.value || '';
  DoanVanExport.showDialog('report', {
    content: content || '(Chưa có nội dung tổng kết hoạt động)',
    name: 'Tổng kết hoạt động Đoàn'
  });
};

// Patch: exportSummary()
window.exportSummary = function() {
  const docs = (typeof DB !== 'undefined') ? DB.get('docs') : [];
  if (!docs.length) {
    if (typeof toast === 'function') toast('Chưa có văn bản để xuất', 'warning');
    return;
  }
  DoanVanExport.showDialog('tomtat', { docs, title: 'Tổng hợp trích yếu văn bản' });
};

// Patch: exportActivityReport()
window.exportActivityReport = function() {
  const id = document.getElementById('actionMemberId')?.value
    || (typeof DB !== 'undefined' ? DB.get('membersList')[0]?.id : null);
  if (!id) return;
  const member = (typeof DB !== 'undefined') ? DB.get('membersList').find(x => String(x.id) === String(id)) : null;
  const activities = (typeof DB !== 'undefined') ? DB.get('memberActivities').filter(a => String(a.memberId) === String(id)) : [];
  if (!activities.length) {
    if (typeof toast === 'function') toast('Chưa có hoạt động nào để xuất', 'warning');
    return;
  }
  DoanVanExport.showDialog('hoatdong', {
    member,
    activities,
    title: `Hoạt động_${member?.fullName || ''}`
  });
};

// Patch: doExportMembers()
window.doExportMembers = function() {
  let list = (typeof DB !== 'undefined') ? DB.get('membersList') : [];
  const partyF = document.getElementById('exportPartyFilter')?.value || '';
  const statusF = document.getElementById('exportStatusFilter')?.value || '';
  const chiDoanF = document.getElementById('exportChiDoanFilter')?.value || '';
  const fmt = document.getElementById('exportFormat')?.value || 'print';

  if (partyF === 'dang_vien') list = list.filter(m => m.partyStatus === 'dubia' || m.partyStatus === 'chinh_thuc');
  else if (partyF) list = list.filter(m => m.partyStatus === partyF);
  if (statusF) list = list.filter(m => m.status === statusF);
  if (chiDoanF) list = list.filter(m => m.chiDoan === chiDoanF);

  if (!list.length) {
    if (typeof toast === 'function') toast('Không có đoàn viên phù hợp điều kiện', 'warning');
    return;
  }

  const partyFilterLabel = { all:'Tất cả', utu:'Đoàn viên ưu tú', dubia:'Đảng viên dự bị', chinh_thuc:'Đảng viên chính thức', dang_vien:'Đảng viên (tất cả)' }[partyF] || 'Tất cả';
  const statusLabel = { active:'Đang hoạt động', inactive:'Tạm ngừng', graduated:'Đã tốt nghiệp', '':'Tất cả' }[statusF] || 'Tất cả';

  // Nếu chọn CSV trong modal cũ → gọi Exporters.exportMembersExcel (CSV fallback)
  if (fmt === 'csv') {
    Exporters.exportMembersExcel(list, `DanhSach_${partyFilterLabel.replace(/\s/g,'_')}`,
      (typeof DB !== 'undefined') ? DB.getObj('settings') : {});
    if (typeof closeModal === 'function') closeModal('exportMembersModal');
    return;
  }

  if (typeof closeModal === 'function') closeModal('exportMembersModal');

  DoanVanExport.showDialog('members', {
    list,
    filters: { partyLabel: partyFilterLabel, chiDoan: chiDoanF, statusLabel },
    title: `Danh sach ${partyFilterLabel.replace(/\s+/g,'_')}`
  });
};

// Patch: generateNghiQuyet() / previewNghiQuyet()
window._dvPatchNghiQuyet = function() {
  const exportBtn = document.getElementById('docPreviewExportBtn');
  if (!exportBtn) return;
  // Kiểm tra nếu đang hiển thị nghị quyết
  const title = document.getElementById('docPreviewTitle')?.textContent || '';
  if (title.toLowerCase().includes('nghị quyết') || title.toLowerCase().includes('nghi quyet')) {
    exportBtn.innerHTML = '<i class="fas fa-file-export"></i> Xuất văn bản';
    exportBtn.onclick = function() {
      const fields = {
        hoTen: document.getElementById('nqHoTen')?.value,
        namSinh: document.getElementById('nqNamSinh')?.value,
        ngayKy: document.getElementById('nqNgayKy')?.value,
        doanCapTren: document.getElementById('nqDoanCapTren')?.value,
        bchCDCS: document.getElementById('nqBCHCDCS')?.value,
        diaDanh: document.getElementById('nqDiaDanh')?.value,
        biThu: document.getElementById('nqBiThu')?.value,
        soNghiQuyet: document.getElementById('nqSoNghiQuyet')?.value,
        chiUy: document.getElementById('nqChiUy')?.value,
        dangUy: document.getElementById('nqDangUy')?.value,
        uuDiemCT: document.getElementById('nqUuDiemCT')?.value,
        uuDiemCM: document.getElementById('nqUuDiemCM')?.value,
        uuDiemDoan: document.getElementById('nqUuDiemDoan')?.value,
        khuyetDiem: document.getElementById('nqKhuyetDiem')?.value,
        tanThanh: document.getElementById('nqTanThanh')?.value,
        khongTanThanh: document.getElementById('nqKhongTanThanh')?.value,
      };
      DoanVanExport.showDialog('nghiquyet', { fields });
    };
  } else if (title.toLowerCase().includes('nhận xét') || title.toLowerCase().includes('nhan xet')) {
    exportBtn.innerHTML = '<i class="fas fa-file-export"></i> Xuất văn bản';
    exportBtn.onclick = function() {
      const fields = {
        hoTen: document.getElementById('nxHoTen')?.value,
        ngaySinh: document.getElementById('nxNgaySinh')?.value,
        ngayKy: document.getElementById('nxNgayKy')?.value,
        doanCapTren: document.getElementById('nxDoanCapTren')?.value,
        bchCDCS: document.getElementById('nxBCHCDCS')?.value,
        chiBo: document.getElementById('nxChiBo')?.value,
        diaDanh: document.getElementById('nxDiaDanh')?.value,
        biThu: document.getElementById('nxBiThu')?.value,
        dangUy: document.getElementById('nxDangUy')?.value,
        nxCT: document.getElementById('nxCT')?.value,
        nxDD: document.getElementById('nxDD')?.value,
        nxNL: document.getElementById('nxNL')?.value,
        nxQC: document.getElementById('nxQC')?.value,
        nxNV: document.getElementById('nxNV')?.value,
        tanThanh: document.getElementById('nxTanThanh')?.value,
        khongTanThanh: document.getElementById('nxKhongTanThanh')?.value,
      };
      DoanVanExport.showDialog('nhanxet', { fields });
    };
  }
};

// Hook vào openModal để patch docPreviewExportBtn
const _origOpenModal = window.openModal;
window.openModal = function(id) {
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
  document.querySelectorAll('[onclick="printReport()"]').forEach(btn => {
    btn.innerHTML = '<i class="fas fa-file-export"></i> Xuất báo cáo';
    btn.title = 'Xuất ra Word, PDF, in…';
  });
  // Nút In báo cáo tháng
  document.querySelectorAll('[onclick="printMonthlyReport()"]').forEach(btn => {
    btn.innerHTML = '<i class="fas fa-file-export"></i> Xuất';
    btn.title = 'Xuất ra Word, PDF, in…';
  });
  // Nút In tổng kết hoạt động
  document.querySelectorAll('[onclick="printActivitySummary()"]').forEach(btn => {
    btn.innerHTML = '<i class="fas fa-file-export"></i> Xuất';
  });
  // Nút In / Tải xuống template
  document.querySelectorAll('[onclick="printTemplate()"]').forEach(btn => {
    btn.innerHTML = '<i class="fas fa-file-export"></i> Xuất văn bản';
    btn.title = 'Xuất ra Word, PDF, in theo chuẩn NĐ30…';
  });
  // Nút Xuất báo cáo tổng hợp
  document.querySelectorAll('[onclick="exportSummary()"]').forEach(btn => {
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
