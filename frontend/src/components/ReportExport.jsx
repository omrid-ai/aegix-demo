// 📁 components/ReportExport.jsx

import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const ReportExport = () => {
  const reportRef = useRef(null);

  const handleExportPDF = () => {
    const element = reportRef.current;
    import("html2pdf.js").then((html2pdf) => {
      html2pdf.default()
        .set({
          margin: 0.5,
          filename: "AEGIX_Intel_Report.pdf",
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: "in", format: "a4", orientation: "portrait" }
        })
        .from(element)
        .save();
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div ref={reportRef} className="bg-white shadow-lg rounded-lg p-6" id="report-content">
        <img src={logo} alt="AEGIX Logo" className="h-16 mb-4" /> 

        <h1 className="text-2xl font-bold mb-2">AEGIX Intelligence Report</h1>
        <p className="text-gray-600 mb-4">
          This report summarizes the key findings from OSINT search conducted via the AEGIX system.
        </p>

        <h2 className="text-lg font-semibold mb-2">AI Insight</h2>
        <p className="mb-4">
          Detected rise in underground activity across crypto-related forums and Telegram groups.
        </p>

        <h2 className="text-lg font-semibold mb-2">Search Results</h2>
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Source</th>
              <th className="p-2 border">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border">1</td>
              <td className="p-2 border">Detected Fraud in Investment Forum</td>
              <td className="p-2 border">Telegram</td>
              <td className="p-2 border">2025-04-12</td>
            </tr>
            <tr>
              <td className="p-2 border">2</td>
              <td className="p-2 border">Suspicious Crypto Wallet Activity</td>
              <td className="p-2 border">Dark Web</td>
              <td className="p-2 border">2025-04-11</td>
            </tr>
            <tr>
              <td className="p-2 border">3</td>
              <td className="p-2 border">Narrative Push Detected: Government Scam</td>
              <td className="p-2 border">Twitter</td>
              <td className="p-2 border">2025-04-10</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <Button onClick={handleExportPDF}>Export to PDF</Button>
      </div>
    </div>
  );
};

export default ReportExport;