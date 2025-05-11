
import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const AutoWalletPDFExport = ({ targetId, filename = "wallet_report.pdf" }) => {
  const handleAutoExport = async () => {
    const element = document.getElementById(targetId);
    if (!element) return alert("Export target not found.");

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#fff"
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pageWidth;
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(filename);
  };

  return (
    <button
      onClick={handleAutoExport}
      className="bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded font-medium"
    >
      📥 One-Click PDF Export
    </button>
  );
};

export default AutoWalletPDFExport;
