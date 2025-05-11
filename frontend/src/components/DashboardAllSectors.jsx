import React from "react";
import { Line } from "react-chartjs-2";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import LiveNewsFeed from "./LiveNewsFeed";

const DashboardAllSectors = () => {
  const aiRiskData = {
    labels: ["2024", "2025", "2026", "2027", "2028", "2029", "2030"],
    datasets: [
      {
        label: "AI Risk Trend",
        data: [2, 3.5, 4, 5, 5.2, 7, 10],
        borderColor: "#ff9933",
        backgroundColor: "#ff9933",
        fill: false,
        tension: 0.4,
      },
    ],
  };

  const aiRiskOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#ffffff",
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#cccccc" },
        grid: { color: "#333333" },
      },
      y: {
        ticks: { color: "#cccccc" },
        grid: { color: "#333333" },
      },
    },
  };

  const mapIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
    iconSize: [30, 45],
    iconAnchor: [15, 45],
    popupAnchor: [0, -40],
  });

  const crisisLocations = [
    { lat: 32.0853, lng: 34.7818, label: "Tel Aviv Crisis" },
    { lat: 40.7128, lng: -74.006, label: "New York Crisis" },
    { lat: 51.5074, lng: -0.1278, label: "London Crisis" },
  ];

  return (
    <div className="p-6 bg-[#0c1c2c] min-h-screen text-white font-sans space-y-8">
      <h1 className="text-3xl font-bold text-center tracking-wide">
        AEGIX Open-Source Intelligence Overview
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#132a3b] p-4 rounded-lg shadow-md border border-gray-700">
          <h2 className="text-sm font-semibold">AI Recommendations</h2>
          <p className="text-3xl font-bold my-2">4</p>
          <p className="text-xs text-gray-300">Awaiting review</p>
        </div>
        <div className="bg-[#132a3b] p-4 rounded-lg shadow-md border border-gray-700">
          <h2 className="text-sm font-semibold">Influence</h2>
          <p className="text-3xl font-bold my-2">589</p>
          <p className="text-xs text-gray-300">Relevant posts</p>
        </div>
        <div className="bg-[#132a3b] p-4 rounded-lg shadow-md border border-gray-700">
          <h2 className="text-sm font-semibold">Hostile Campaigns</h2>
          <p className="text-3xl font-bold my-2">16</p>
          <p className="text-xs text-gray-300">Campaigns detected</p>
        </div>
        <div className="bg-[#132a3b] p-4 rounded-lg shadow-md border border-gray-700">
          <h2 className="text-sm font-semibold">Threat Actors</h2>
          <p className="text-3xl font-bold my-2">5</p>
          <p className="text-xs text-gray-300">Active actors</p>
        </div>
      </div>

      {/* Risk Timeline */}
      <div className="bg-[#132a3b] p-4 rounded-lg shadow-md border border-gray-700">
        <h2 className="text-lg font-semibold mb-2 text-orange-400">📉 AI Risk Trend Timeline</h2>
        <p className="text-xs text-gray-300 mb-2">Overview of detected risk scores over recent months</p>
        <Line data={aiRiskData} options={aiRiskOptions} />
      </div>

      {/* Narrative Analysis Table */}
      <div className="bg-[#132a3b] p-4 rounded-lg shadow-md border border-gray-700">
        <h2 className="text-lg font-semibold mb-2">🧾 Narrative Analysis Dashboard</h2>
        <table className="w-full text-sm text-left text-gray-300">
          <thead className="text-xs text-gray-400 uppercase border-b border-gray-600">
            <tr>
              <th className="py-2 px-3">Topic</th>
              <th className="py-2 px-3">Mentions</th>
              <th className="py-2 px-3">Impact</th>
              <th className="py-2 px-3">Campaigns</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-3">Polarizing</td>
              <td className="py-2 px-3">169</td>
              <td className="py-2 px-3">High</td>
              <td className="py-2 px-3">Low</td>
            </tr>
            <tr>
              <td className="py-2 px-3">Dark Web</td>
              <td className="py-2 px-3">569</td>
              <td className="py-2 px-3">High</td>
              <td className="py-2 px-3">Medium</td>
            </tr>
            <tr>
              <td className="py-2 px-3">Desert Falcon</td>
              <td className="py-2 px-3">16</td>
              <td className="py-2 px-3">Medium</td>
              <td className="py-2 px-3">Low</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Crisis Map */}
      <div className="bg-[#132a3b] p-4 rounded-lg shadow-md border border-gray-700">
        <h2 className="text-lg font-semibold mb-2">🌍 Crisis Response Map</h2>
        <p className="text-xs text-gray-300 mb-2">Interactive impact on ongoing crises</p>
        <MapContainer center={[32.0853, 34.7818]} zoom={2} style={{ height: "300px", width: "100%" }}>
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {crisisLocations.map((loc, idx) => (
            <Marker key={idx} position={[loc.lat, loc.lng]} icon={mapIcon}>
              <Popup>{loc.label}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* AI Recommendations */}
      <div className="bg-[#132a3b] p-4 rounded-lg shadow-md border border-gray-700">
        <h2 className="text-lg font-semibold text-pink-300 mb-2">🌸 AI RECOMMENDATIONS</h2>
        <ul className="list-disc list-inside text-sm text-gray-200 space-y-1">
          <li>Identify emerging hostile campaigns across regions</li>
          <li>Detect narrative manipulation targeting institutions</li>
          <li>Prioritize crisis zones based on real-time signals</li>
          <li>Correlate actors across Telegram, X, and forums</li>
          <li>Suggest proactive actions to mitigate threats</li>
        </ul>
      </div>

      {/* Live News Feed */}
      <div className="bg-[#132a3b] p-4 rounded-lg shadow-md border border-gray-700">
        <h2 className="text-lg font-semibold text-yellow-300 mb-2">📰 Live News Feed</h2>
        <LiveNewsFeed />
      </div>
    </div>
  );
};

export default DashboardAllSectors;
