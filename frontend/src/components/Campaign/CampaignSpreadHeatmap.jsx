import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const CampaignSpreadHeatmap = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch("/data/campaign_spread_data.json")
      .then((res) => res.json())
      .then((data) => setLocations(data))
      .catch((err) => console.error("Failed to load heatmap data", err));
  }, []);

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">🌍 Campaign Spread Heatmap</h2>
      <MapContainer
        center={[31.7683, 35.2137]}
        zoom={2}
        style={{ height: "400px", width: "100%" }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((loc, idx) => (
          <CircleMarker
            key={idx}
            center={[loc.lat, loc.lng]}
            radius={10 * loc.intensity}
            pathOptions={{ color: "red", fillColor: "orange", fillOpacity: 0.5 }}
          >
            <Tooltip direction="top" offset={[0, -5]} opacity={1}>
              <span>
                <strong>{loc.region}</strong><br />
                Intensity: {Math.round(loc.intensity * 100)}%
              </span>
            </Tooltip>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
};

export default CampaignSpreadHeatmap;
