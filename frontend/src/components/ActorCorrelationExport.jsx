import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const ActorCorrelationExport = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">📁 Export Correlation Report</h2>
    <Card>
      <CardContent className="p-4 flex justify-between items-center">
        <p>Generate detailed report of identity matches and activities.</p>
        <Button>Export PDF</Button>
      </CardContent>
    </Card>
  </div>
);

export default ActorCorrelationExport;
