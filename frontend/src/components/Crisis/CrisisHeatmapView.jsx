// שמור כ־C:\Users\User\my_project\frontend\src\components\Crisis\CrisisHeatmapView.jsx

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Card, CardContent } from "@/components/ui/card";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const CrisisHeatmapView = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch("/data/crisis_locations.json")
      .then((res) => res.json())
      .then((data) => setLocations(data.locations || []))
      .catch((err) => console.error("Failed to load crisis locations:", err));
  }, []);

  const icon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/535/535137.png",
    iconSize: [25, 25],
    iconAnchor: [12, 25],
    popupAnchor: [0, -25],
  });

  return (
    <Card className="bg-[#1e1e1e] text-white">
      <CardContent className="p-4 space-y-4">
        <h2 className="text-2xl font-bold text-[#00ffff]">🌍 Crisis Heatmap</h2>
        <div className="h-[500px] rounded overflow-hidden">
          <MapContainer center={[20, 0]} zoom={2} className="h-full w-full">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
            />
            {locations.map((loc, idx) => (
              <Marker key={idx} position={[loc.lat, loc.lng]} icon={icon}>
                <Popup>
                  <strong>{loc.label}</strong>
                  <br />
                  Type: {loc.type}
                  <br />
                  Date: {loc.date}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CrisisHeatmapView;
