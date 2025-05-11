import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// פונקציה שמחזירה אייקון קוביה בצבע לפי סוג המשבר
const getColoredIcon = (type) => {
  const color = {
    conflict: "red",
    climate: "orange",
    health: "blue",
    humanitarian: "yellow",
  }[type] || "gray";

  return new L.DivIcon({
    html: `<div style="
      background-color: ${color};
      width: 14px;
      height: 14px;
      border-radius: 3px;
      box-shadow: 0 0 3px #000;
      "></div>`,
    className: "", // מבטל עיצוב leaflet ברירת מחדל
    iconSize: [14, 14],
    iconAnchor: [7, 7],
    popupAnchor: [0, -8],
  });
};

const CrisisMap = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch("/data/crisis_locations.json")
      .then((res) => res.json())
      .then((data) => setLocations(data.locations || []))
      .catch((err) => console.error("Failed to load crisis locations", err));
  }, []);

  return (
    <MapContainer center={[20, 0]} zoom={2} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map((loc, idx) => (
        <Marker
          key={idx}
          position={[loc.lat, loc.lng]}
          icon={getColoredIcon(loc.type)}
        >
          <Popup>
            <strong>{loc.label}</strong><br />
            📆 {loc.date}<br />
            🧭 Type: {loc.type}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default CrisisMap;
