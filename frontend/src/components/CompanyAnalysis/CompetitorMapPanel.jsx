
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import AdvantagePieChart from "./AdvantagePieChart";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const CompetitorMapPanel = () => {
  const [competitors, setCompetitors] = useState([]);
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get("/data/competition/market_competitors.json")
      .then(res => setCompetitors(res.data))
      .catch(err => console.error("Failed to load competitor data", err));
  }, []);

  const filtered = Array.isArray(competitors) ? competitors.filter(c => {
    const share = c.market_share ?? 0;
    const shareCheck =
      filter === "All" ||
      (filter === "Above 20%" && share > 20) ||
      (filter === "20% or less" && share <= 20);
    const searchCheck = c.advantage?.toLowerCase().includes(searchTerm.toLowerCase());
    return shareCheck && searchCheck;
  }) : [];

  const chartData = {
    labels: filtered.map(c => c.name),
    datasets: [
      {
        label: "Market Share %",
        data: filtered.map(c => c.market_share),
        backgroundColor: [
          "#4dc9f6", "#f67019", "#00a950", "#f53794", "#537bc4", "#acc236",
          "#166a8f", "#58595b", "#8549ba", "#e6a8d7", "#c1f1a5", "#d99873"
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { labels: { color: "#ffffff" } },
    },
    scales: {
      x: { ticks: { color: "#ccc" } },
      y: { ticks: { color: "#ccc" } },
    },
  };

  const aiInsights = () => {
    if (!filtered.length) return "No competitors match the selected filters.";
    const max = filtered.reduce((a, b) => ((a.market_share ?? 0) > (b.market_share ?? 0) ? a : b));
    return `🧠 ${max.name} holds the highest market share at ${max.market_share}%. Their edge: ${max.advantage}`;
  };

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-3">
        <h1 className="text-2xl font-bold">📊 Competitive Landscape Map</h1>
        <div className="flex gap-2">
          <button
            onClick={() => window.location.href = "/company-profile"}
            className="bg-gray-800 hover:bg-gray-700 text-sm px-3 py-1 rounded"
          >
            ← Back to Company Profile
          </button>
          <button
            onClick={() => window.print()}
            className="bg-blue-600 hover:bg-blue-500 text-sm px-3 py-1 rounded"
          >
            Export Competitor Report
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 items-center mb-4">
        <label className="font-medium">Market share:</label>
        <select
          className="bg-gray-900 text-white px-3 py-1 rounded"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option>All</option>
          <option>Above 20%</option>
          <option>20% or less</option>
        </select>

        <input
          type="text"
          placeholder="Search by keyword (e.g., analytics)"
          className="bg-gray-900 text-white px-3 py-1 rounded w-64"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filtered.length > 0 ? (
        <>
          <div className="bg-gray-800 p-4 rounded-lg mb-6">
            <Bar data={chartData} options={chartOptions} height={100} />
          </div>

          <div className="bg-gray-800 p-4 rounded-lg mb-6">
            <h2 className="text-xl font-semibold mb-2">🤖 AI Competitor Insight</h2>
            <p className="text-gray-300">{aiInsights()}</p>
          </div>
        </>
      ) : (
        <div className="bg-gray-800 text-gray-300 p-4 rounded mb-6">
          <p>No data found for the selected filter or search.</p>
        </div>
      )}

      <AdvantagePieChart />

      <div className="grid gap-4">
        {filtered.map((c, i) => (
          <div key={i} className="border border-gray-700 rounded p-4">
            <h3 className="text-lg font-bold text-cyan-400">{c.name}</h3>
            <p className="text-gray-300">Market Share: {c.market_share ?? "N/A"}%</p>
            <p className="text-yellow-300">Advantage: {c.advantage}</p>
            {c.url && (
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline text-sm"
              >
                Visit Website ↗
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompetitorMapPanel;
