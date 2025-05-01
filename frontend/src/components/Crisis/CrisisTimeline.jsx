// C:\Users\User\my_project\frontend\src\components\Crisis\CrisisTimeline.jsx

import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const CrisisTimeline = () => {
  return (
    <Card className="bg-[#1e1e1e] mt-6">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold text-[#00ffff] mb-4">📈 Crisis Timeline</h2>
        <p className="text-gray-400">
          Visualization of crisis events over time will appear here (mock placeholder).
        </p>
      </CardContent>
    </Card>
  );
};

export default CrisisTimeline;
