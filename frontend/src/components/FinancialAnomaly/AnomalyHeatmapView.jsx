import React from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const anomalyPoints = [
  { user: "Wallet123", lat: 32.0853, lon: 34.7818, risk: "High" },
  { user: "AnonUser42", lat: 52.52, lon: 13.405, risk: "Critical" },
];

const AnomalyHeatmapView = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">🗺️ Financial Heatmap</h2>
    <MapContainer center={[32.0853, 34.7818]} zoom={2} style={{ height: "400px", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {anomalyPoints.map((point, idx) => (
        <CircleMarker key={idx} center={[point.lat, point.lon]} radius={10} color="red">
          <Tooltip>{point.user} - {point.risk}</Tooltip>
        </CircleMarker>
      ))}
    </MapContainer>
  </div>
);

export default AnomalyHeatmapView;
