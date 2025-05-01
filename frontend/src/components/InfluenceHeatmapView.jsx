import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet.heat";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";

const heatmapData = {
  Israel: {
    Hebrew: [
      [32.0853, 34.7818, 0.8],
      [31.7683, 35.2137, 0.6]
    ],
    Arabic: [
      [32.0833, 34.7667, 0.5]
    ]
  },
  Germany: {
    German: [
      [52.5200, 13.4050, 0.7],
      [48.1351, 11.5820, 0.5]
    ]
  },
  USA: {
    English: [
      [40.7128, -74.0060, 0.9],
      [34.0522, -118.2437, 0.6]
    ]
  }
};

const centerMap = {
  Israel: [32.0853, 34.7818],
  Germany: [51.1657, 10.4515],
  USA: [39.8283, -98.5795]
};

const InfluenceHeatmapView = () => {
  const mapRef = useRef(null);
  const [region, setRegion] = useState("Israel");
  const [language, setLanguage] = useState("Hebrew");

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.remove();
    }

    const map = L.map("heatmap-container").setView(centerMap[region], 6);
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);

    const heat = L.heatLayer(heatmapData[region]?.[language] || [], { radius: 25 }).addTo(map);

    return () => map.remove();
  }, [region, language]);

  return (
    <Card className="p-6 space-y-4">
      <CardContent className="space-y-4">
        <h2 className="text-xl font-bold">🔥 Influence Heatmap – Region & Language</h2>

        <div className="grid grid-cols-2 gap-6 w-full max-w-xl">
          <div>
            <label className="text-sm font-medium text-gray-600 mb-2 block">Region</label>
            <Select defaultValue={region} onValueChange={(val) => {
              setRegion(val);
              const langs = Object.keys(heatmapData[val]);
              setLanguage(langs[0]);
            }}>
              <SelectTrigger>{region}</SelectTrigger>
              <SelectContent>
                {Object.keys(heatmapData).map((r) => (
                  <SelectItem key={r} value={r}>{r}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600 mb-2 block">Language</label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger>{language}</SelectTrigger>
              <SelectContent>
                {Object.keys(heatmapData[region]).map((lang) => (
                  <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div id="heatmap-container" style={{ height: "500px", width: "100%" }}></div>
      </CardContent>
    </Card>
  );
};

export default InfluenceHeatmapView;