// C:\Users\User\my_project\frontend\src\components\Crisis\CrisisExportReport.jsx

import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const CrisisExportReport = () => {
  return (
    <Card className="bg-[#1e1e1e] mt-6">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold text-[#00ffff] mb-4">📄 Crisis Export Report</h2>
        <p className="text-gray-400">
          Export crisis event data into a detailed report (mock placeholder).
        </p>
        <button className="mt-4 bg-[#00ffff] hover:bg-cyan-400 text-black font-bold py-2 px-4 rounded">
          Export PDF
        </button>
      </CardContent>
    </Card>
  );
};

export default CrisisExportReport;
