import React from "react";
import { Button } from "@/components/ui/button";

const AnomalyExportReport = () => {
  const handleExport = () => alert("📁 Export Financial Report");

  return (
    <div className="text-right">
      <Button onClick={handleExport}>Export PDF/CSV</Button>
    </div>
  );
};

export default AnomalyExportReport;
