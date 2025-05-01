import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const CrisisHeatmapView = () => {
  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-2">🌍 Crisis Geo Heatmap</h3>
        <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
          [Crisis heatmap will render here...]
        </div>
      </CardContent>
    </Card>
  );
};

export default CrisisHeatmapView;