import React from "react";
import { Button } from "@/components/ui/button";

const ExportInfluencePDFButton = () => {
  const handleExport = async () => {
    try {
      const response = await fetch("/api/export/influence-comparison", {
        method: "GET"
      });

      if (!response.ok) throw new Error("Export failed");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "influence_comparison_report.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Error exporting PDF:", err);
    }
  };

  return (
    <Button onClick={handleExport} className="mt-4">
      📄 Export Influence Report as PDF
    </Button>
  );
};

export default ExportInfluencePDFButton;