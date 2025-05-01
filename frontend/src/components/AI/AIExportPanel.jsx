import React from "react";

const AIExportPanel = () => {
  const handleExport = () => {
    alert("Export initiated...");
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-md flex justify-between items-center">
      <h2 className="text-xl font-semibold">📤 Export Report</h2>
      <button onClick={handleExport} className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded">
        Download PDF
      </button>
    </div>
  );
};

export default AIExportPanel;