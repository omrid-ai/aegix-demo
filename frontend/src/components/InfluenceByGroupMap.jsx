import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet.heat";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";

const groupHeatData = {
  "Crypto Alerts IL": [
    [32.08, 34.78, 0.9],
    [31.76, 35.21, 0.7]
  ],
  "Black Money Trade EU": [
    [48.85, 2.35, 0.8],
    [52.52, 13.40, 0.6]
  ],
  "Fake Banknotes Hub": [
    [40.71, -74.00, 0.7],
    [34.05, -118.24, 0.5]
  ]
};

const mapCenters = {
  "Crypto Alerts IL": [32.08, 34.78],
  "Black Money Trade EU": [50.11, 8.68],
  "Fake Banknotes Hub": [39.82, -98.57]
};

const InfluenceByGroupMap = () => {
  const mapRef = useRef(null);
  const [group, setGroup] = useState("Crypto Alerts IL");

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.remove();
    }

    const map = L.map("group-map").setView(mapCenters[group], 5);
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);

    const heat = L.heatLayer(groupHeatData[group] || [], { radius: 25 }).addTo(map);

    return () => map.remove();
  }, [group]);

  return (
    <Card className="p-6 space-y-6">
      <CardContent className="space-y-4">
        <h2 className="text-xl font-bold">📡 Influence by Telegram Group</h2>

        <div className="w-72">
          <label className="text-sm font-medium text-gray-600 block mb-2">Select Group</label>
          <Select defaultValue={group} onValueChange={setGroup}>
            <SelectTrigger>{group}</SelectTrigger>
            <SelectContent>
              {Object.keys(groupHeatData).map((g) => (
                <SelectItem key={g} value={g}>{g}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div id="group-map" style={{ height: "500px", width: "100%" }}></div>
      </CardContent>
    </Card>
  );
};

export default InfluenceByGroupMap;