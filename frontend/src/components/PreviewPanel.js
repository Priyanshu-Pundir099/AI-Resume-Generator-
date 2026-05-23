import React, { useRef } from 'react';
import toast from 'react-hot-toast';

const PreviewPanel = ({ resume, onBack }) => {
  const printRef = useRef();

  const handleDownloadPDF = () => {
    const element = printRef.current;
    if (!element) return;

    const loadScript = (src) =>
      new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });

    toast.loading('Preparing PDF...');
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js')
      .then(() => {
        toast.dismiss();
        const options = {
          margin: [10, 10, 10, 10],
          filename: `resume-${resume.jobRole.replace(/\s+/g, '-').toLowerCase()}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        };
        window.html2pdf().set(options).from(element).save();
        toast.success('PDF downloaded!');
      })
      .catch(() => {
        toast.dismiss();
        toast.error('PDF generation failed. Try printing instead.');
      });
  };

  const handlePrint = () => {
    window.print();
  };

  const formatContent = (content) => {
    if (!content) return '';
    const lines = content.split('\n');
    return lines.map((line, i) => {
      if (line.startsWith('===') || line.startsWith('---')) {
        return `<hr key=${i} style="border: 1px solid #e2e8f0; margin: 12px 0;" />`;
      }
      if (line.match(/^[A-Z\s]{3,}:?$/) && line.trim().length > 2) {
        return `<h2 key=${i} style="font-size:14px;font-weight:700;color:#0f172a;text-transform:uppercase;letter-spacing:1px;margin:16px 0 6px;padding-bottom:4px;border-bottom:2px solid #0ea5e9;">${line}</h2>`;
      }
      if (line.startsWith('•') || line.startsWith('-')) {
        return `<li key=${i} style="margin-left:16px;margin-bottom:3px;">${line.substring(1).trim()}</li>`;
      }
      if (line.trim() === '') return `<br key=${i} />`;
      return `<p key=${i} style="margin-bottom:4px;">${line}</p>`;
    }).join('');
  };

  return (
    <div className="flex flex-col h-full animate-fade-in">
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-4 no-print">
        <div>
          <h2 className="font-display font-bold text-white text-lg">Resume Preview</h2>
          <p className="text-slate-400 text-sm mt-0.5">
            {resume.jobRole} · {new Date(resume.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {onBack && (
            <button onClick={onBack} className="btn-secondary text-sm py-2 px-4">
              ← Back
            </button>
          )}
          <button onClick={handlePrint} className="btn-secondary text-sm py-2 px-4 flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print
          </button>
          <button onClick={handleDownloadPDF} className="btn-primary text-sm py-2 px-4 flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download PDF
          </button>
        </div>
      </div>

      {/* Resume Paper */}
      <div className="flex-1 overflow-auto rounded-2xl bg-surface-800 border border-surface-700 p-4">
        <div
          ref={printRef}
          id="resume-print-area"
          style={{
            background: 'white',
            color: '#0f172a',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '12px',
            lineHeight: '1.6',
            padding: '32px',
            minHeight: '297mm',
            width: '210mm',
            margin: '0 auto',
            boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
          }}
          dangerouslySetInnerHTML={{ __html: formatContent(resume.content) }}
        />
      </div>
    </div>
  );
};

export default PreviewPanel;
