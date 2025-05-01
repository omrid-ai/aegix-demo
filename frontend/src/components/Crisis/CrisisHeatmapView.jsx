// שמור כאן:
// C:\Users\User\my_project\frontend\src\components\Crisis\CrisisHeatmapView.jsx

import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const CrisisHeatmapView = () => {
  return (
    <Card className="bg-[#1e1e1e]">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold text-[#00ffff] mb-4">🌎 Crisis Heatmap</h2>
        <p className="text-gray-400">
          View geospatial distribution of incidents in near real-time (mock placeholder).
        </p>
      </CardContent>
    </Card>
  );
};

export default CrisisHeatmapView;
