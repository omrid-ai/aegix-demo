
import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const WalletIntelPDFReport = ({ walletAddress, stats, transactions }) => {
  const handleExport = async () => {
    const content = document.getElementById("wallet-report-export");
    if (!content) return alert("Content not found.");

    const canvas = await html2canvas(content, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgProps = pdf.getImageProperties(imgData);

    const pdfHeight = (imgProps.height * pageWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pdfHeight);
    pdf.save(`wallet_${walletAddress}_report.pdf`);
  };

  return (
    <button
      onClick={handleExport}
      className="bg-purple-700 text-white px-4 py-2 rounded mt-4 hover:bg-purple-600 transition"
    >
      🧾 Download AI PDF Report
    </button>
  );
};

export default WalletIntelPDFReport;
