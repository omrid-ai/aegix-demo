import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const CrisisReportExport = () => {
  const handleExport = () => {
    alert("📁 Crisis Report export (PDF/CSV) coming soon!");
  };

  return (
    <Card>
      <CardContent className="p-4 flex justify-between items-center">
        <h3 className="text-lg font-semibold">🧾 Export Crisis Report</h3>
        <Button onClick={handleExport}>Export</Button>
      </CardContent>
    </Card>
  );
};

export default CrisisReportExport;