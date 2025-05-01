import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const CampaignExportReport = () => {
  const sampleData = [
    ["Campaign Name", "Start Date", "End Date", "Impact Score"],
    ["Operation Tumult", "2025-04-01", "2025-04-10", "87"],
    ["Project Eclipse", "2025-04-03", "2025-04-11", "72"],
    ["Shadow Echo", "2025-04-05", "2025-04-12", "65"],
  ];

  const handlePDFDownload = () => {
    const doc = new jsPDF();
    doc.text("Campaign Summary Report", 14, 16);
    doc.autoTable({
      startY: 22,
      head: [sampleData[0]],
      body: sampleData.slice(1),
    });
    doc.save("Campaign_Report.pdf");
  };

  const handleCSVDownload = () => {
    const csv = sampleData.map(row => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Campaign_Report.csv";
    link.click();
  };

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-md text-white space-y-4">
      <h2 className="text-2xl font-bold">📤 Export Campaign Report</h2>
      <p className="text-gray-300">Download a full summary of recent hostile campaigns.</p>
      <div className="flex gap-4">
        <button onClick={handlePDFDownload} className="bg-cyan-700 hover:bg-cyan-800 px-4 py-2 rounded">
          Export as PDF
        </button>
        <button onClick={handleCSVDownload} className="bg-purple-700 hover:bg-purple-800 px-4 py-2 rounded">
          Export as CSV
        </button>
      </div>
    </div>
  );
};

export default CampaignExportReport;