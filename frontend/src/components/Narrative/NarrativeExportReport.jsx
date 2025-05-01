import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const NarrativeExportReport = () => {
  return (
    <Card className="p-6">
      <CardContent className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">📤 Export Narrative Report</h2>
          <p className="text-muted-foreground text-sm">Generate PDF or CSV report with analysis results</p>
        </div>
        <Button onClick={() => alert("Report export initiated!")}>Export Report</Button>
      </CardContent>
    </Card>
  );
};

export default NarrativeExportReport;