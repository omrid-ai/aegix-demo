
import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet.heat";

const DisinfoGeoSpreadMap = () => {
  useEffect(() => {
    const map = L.map("disinfo-heatmap").setView([20, 0], 2);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    fetch("/data/disinfo_geo_spread.json")
      .then((res) => res.json())
      .then((data) => {
        const heatData = data.map(item => [
          item.lat,
          item.lng,
          item.intensity
        ]);

        L.heatLayer(heatData, { radius: 25, blur: 15 }).addTo(map);
      })
      .catch((err) => console.error("Failed to load disinfo geo data:", err));
  }, []);

  return (
    <div className="my-6">
      <h2 className="text-xl font-semibold mb-2 text-white">🌍 Disinfo Spread Map</h2>
      <div id="disinfo-heatmap" style={{ height: "400px", borderRadius: "12px", overflow: "hidden" }}></div>
    </div>
  );
};

export default DisinfoGeoSpreadMap;
