import React from "react";
import { Button } from "@/components/ui/button";

const LeakExportReport = () => {
  const handleExport = () => {
    alert("Exporting leak report...");
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">📁 Export Leak Report</h2>
      <Button onClick={handleExport}>Export CSV/PDF</Button>
    </div>
  );
};

export default LeakExportReport;