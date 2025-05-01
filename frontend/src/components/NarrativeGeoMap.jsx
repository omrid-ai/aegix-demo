import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const NarrativeGeoMap = () => {
  return (
    <Card className="p-6">
      <CardContent>
        <h2 className="text-xl font-bold mb-4">🌍 Narrative Geo Map (Mock)</h2>
        <div className="w-full h-64 bg-gray-100 flex items-center justify-center text-gray-600">
          Map will be rendered here (e.g., using Leaflet or Mapbox)
        </div>
      </CardContent>
    </Card>
  );
};

export default NarrativeGeoMap;