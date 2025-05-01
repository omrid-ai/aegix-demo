import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const LocationHistoryMap = ({ locations }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-xl mt-10">
      <h2 className="text-2xl font-bold mb-4">🗺️ Location History</h2>
      <MapContainer
        center={[31.7683, 35.2137]}
        zoom={7}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((loc, idx) => (
          <Marker key={idx} position={[loc.lat, loc.lng]}>
            <Popup>
              <div className="text-black">
                <p><strong>Address:</strong> {loc.address}</p>
                <p><strong>Date:</strong> {loc.date}</p>
                <p><strong>Time:</strong> {loc.time}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default LocationHistoryMap;
