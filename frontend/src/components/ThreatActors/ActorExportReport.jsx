import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const ActorExportReport = () => {
  return (
    <Card>
      <CardContent>
        <h3 className="text-lg font-semibold mb-2">Export Intelligence Report</h3>
        <button className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800">Download PDF</button>
      </CardContent>
    </Card>
  );
};

export default ActorExportReport;