import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const LeakSourcesMap = () => {
  const leakLocations = [
    { name: "Forum X", lat: 40.7128, lon: -74.006 },
    { name: "Telegram Dump", lat: 34.0522, lon: -118.2437 },
  ];

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">🌍 Leak Sources Map</h2>
      <MapContainer center={[20, 0]} zoom={2} style={{ height: "400px", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {leakLocations.map((loc, i) => (
          <Marker key={i} position={[loc.lat, loc.lon]}>
            <Popup>{loc.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default LeakSourcesMap;