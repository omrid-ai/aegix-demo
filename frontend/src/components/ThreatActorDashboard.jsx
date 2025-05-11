import React, { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "./MainLayout";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ThreatActorDashboard = () => {
  const [actors, setActors] = useState([]);

  useEffect(() => {
    const fetchActors = async () => {
      try {
        const res = await axios.get("/data/mock_threat_actors.json");
        setActors(res.data);
      } catch (err) {
        console.error("Failed to fetch threat actors", err);
      }
    };
    fetchActors();
  }, []);

  const riskCount = actors.reduce((acc, actor) => {
    acc[actor.risk_level] = (acc[actor.risk_level] || 0) + 1;
    return acc;
  }, {});

  const riskData = {
    labels: Object.keys(riskCount),
    datasets: [
      {
        label: "Threat Level Count",
        data: Object.values(riskCount),
        backgroundColor: ["#dc2626", "#facc15", "#22c55e"],
        borderRadius: 6,
      },
    ],
  };

  return (
    <MainLayout>
      <div className="p-8 bg-black text-white min-h-screen max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">🕵️ Threat Actors Dashboard</h1>

        {/* Chart */}
        <div className="bg-gray-900 p-6 rounded-lg shadow max-w-4xl mx-auto mb-10">
          <h2 className="text-xl font-semibold mb-4">Threat Level Distribution</h2>
          <div style={{ maxWidth: "300px", margin: "0 auto" }}><Bar data={riskData} options={{ responsive: true, plugins: { legend: { labels: { color: "white" } } }, scales: { x: { ticks: { color: "white" } }, y: { ticks: { color: "white" } } } }} /></div>
        </div>

        {/* Table */}
        <div className="bg-gray-900 p-6 rounded-lg shadow max-w-4xl mx-auto mb-10">
          <h2 className="text-xl font-semibold mb-4">Active Threat Actors</h2>
          <table className="w-full text-sm">
            <thead className="text-left text-gray-400">
              <tr>
                <th className="pb-2">Name</th>
                <th className="pb-2">Group</th>
                <th className="pb-2">Activity Score</th>
                <th className="pb-2">Risk Level</th>
                <th className="pb-2">Last Seen</th>
              </tr>
            </thead>
            <tbody>
              {actors.map((actor, idx) => (
                <tr key={idx} className="border-t border-gray-700">
                  <td className="py-2">{actor.name}</td>
                  <td className="py-2">{actor.group}</td>
                  <td className="py-2">{actor.activity_score}</td>
                  <td className="py-2">{actor.risk_level}</td>
                  <td className="py-2">{actor.last_seen}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  );
};

export default ThreatActorDashboard;