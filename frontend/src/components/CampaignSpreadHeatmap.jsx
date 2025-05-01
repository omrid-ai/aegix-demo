import React from "react";
import { MapContainer, TileLayer, Circle, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const heatmapData = [
  { lat: 32.08, lon: 34.78, cluster_id: 0, messages_count: 42 },
  { lat: 31.76, lon: 35.21, cluster_id: 1, messages_count: 29 },
  { lat: 51.51, lon: -0.13, cluster_id: 2, messages_count: 15 },
];

const CampaignSpreadHeatmap = () => {
  return (
    <div className="h-[500px] rounded overflow-hidden shadow border">
      <MapContainer center={[32.08, 34.78]} zoom={5} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {heatmapData.map((point, idx) => (
          <Circle
            key={idx}
            center={[point.lat, point.lon]}
            radius={point.messages_count * 2000}
            pathOptions={{ color: "red", fillOpacity: 0.5 }}
          >
            <Popup>
              Cluster {point.cluster_id}<br />
              Messages: {point.messages_count}
            </Popup>
          </Circle>
        ))}
      </MapContainer>
    </div>
  );
};

export default CampaignSpreadHeatmap;
