import React from "react";
import { Button } from "@/components/ui/button";

const FinancialExportReport = () => {
  const handleExport = () => {
    alert("📁 Exporting PDF/CSV for Financial Anomalies...");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📁 Financial Anomaly Export</h2>
      <Button onClick={handleExport}>Export Report</Button>
    </div>
  );
};

export default FinancialExportReport;
