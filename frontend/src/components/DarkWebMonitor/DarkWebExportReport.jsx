import React from "react";
import { Button } from "@/components/ui/button";

const DarkWebExportReport = () => {
  const handleExport = () => {
    alert("Exporting dark web report...");
  };

  return (
    <div className="text-right">
      <Button onClick={handleExport}>📤 Export Dark Web Report</Button>
    </div>
  );
};

export default DarkWebExportReport;
