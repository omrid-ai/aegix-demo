import React from "react";
import { Button } from "@/components/ui/button";

const AssetReportExport = () => {
  const handleExport = () => {
    alert("Exporting asset report...");
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">📁 Export Asset Report</h1>
      <Button onClick={handleExport}>Download PDF</Button>
    </div>
  );
};

export default AssetReportExport;