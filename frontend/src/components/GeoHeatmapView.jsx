import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet.heat";
import { Card, CardContent } from "@/components/ui/card";

const GeoHeatmapView = () => {
  const mapRef = useRef(null);

  const heatData = [
    [32.0853, 34.7818, 0.9],  // תל אביב – HIGH risk
    [31.7683, 35.2137, 0.7],  // ירושלים
    [32.7940, 34.9896, 0.5],  // חיפה
    [30.6074, 34.8013, 0.3],  // באר שבע
    [32.1093, 34.8555, 0.6],  // הרצליה
    [29.5581, 34.9482, 0.2],  // אילת
  ];

  useEffect(() => {
    if (!mapRef.current) {
      const map = L.map("heatmap").setView([32.0853, 34.7818], 7);
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);

      const heat = L.heatLayer(heatData, { radius: 35, blur: 25, maxZoom: 10 });
      heat.addTo(map);
    }
  }, []);

  return (
    <Card className="mt-6">
      <CardContent className="p-6 space-y-4">
        <h2 className="text-xl font-bold">🌍 Geo Risk Heatmap</h2>
        <div id="heatmap" className="h-[500px] w-full rounded border" />
      </CardContent>
    </Card>
  );
};

export default GeoHeatmapView;
