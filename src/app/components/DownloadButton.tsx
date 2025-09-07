'use client';

import { Download } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface DownloadButtonProps {
  reportId: string;
  fileName: string;
}

export default function DownloadButton({ reportId, fileName }: DownloadButtonProps) {
  const handleDownload = () => {
    const reportElement = document.getElementById(reportId);
    if (!reportElement) {
      console.error('Report element not found!');
      return;
    }

    html2canvas(reportElement, {
      scale: 2,
      backgroundColor: '#0B0F1A',
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height],
      });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`${fileName}.pdf`);
    });
  };

  return (
    <button
      onClick={handleDownload}
      className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 bg-gradient-to-r from-accent-start to-accent-end text-white font-bold py-3 px-4 sm:py-4 sm:px-5 rounded-full shadow-lg hover:opacity-90 active:scale-95 transition-all duration-200 z-50"
      aria-label="Download report as PDF"
    >
      <Download className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
    </button>
  );
}


