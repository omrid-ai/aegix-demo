import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pie, Line } from "react-chartjs-2";
import "chart.js/auto";
import { Card, CardContent } from "@/components/ui/card";

const NarrativeMonitor = () => {
  const navigate = useNavigate();
  const [narratives, setNarratives] = useState([]);
  const [typeFilter, setTypeFilter] = useState("All");
  const [sourceSearch, setSourceSearch] = useState("");

  useEffect(() => {
    fetch("/data/company_analysis/mock_narratives.json")
      .then(res => res.json())
      .then(data => setNarratives(data));
  }, []);

  const filtered = narratives.filter(n =>
    (typeFilter === "All" || n.type === typeFilter) &&
    n.source.toLowerCase().includes(sourceSearch.toLowerCase())
  );

  const typeCounts = { Critical: 0, Neutral: 0, Positive: 0 };
  filtered.forEach(n => typeCounts[n.type]++);

  const pieData = {
    labels: ["Critical", "Neutral", "Positive"],
    datasets: [{
      data: [typeCounts.Critical, typeCounts.Neutral, typeCounts.Positive],
      backgroundColor: ["#f44336", "#ffeb3b", "#4caf50"],
    }]
  };

  const dates = [...new Set(filtered.map(n => n.date))].sort();
  const countByTypeAndDate = (type, date) =>
    filtered.filter(n => n.type === type && n.date === date).length;

  const timelineData = {
    labels: dates,
    datasets: ["Critical", "Neutral", "Positive"].map((type, i) => ({
      label: type,
      data: dates.map(d => countByTypeAndDate(type, d)),
      borderColor: ["#f44336", "#ffeb3b", "#4caf50"][i],
      backgroundColor: ["#f44336", "#ffeb3b", "#4caf50"][i],
    }))
  };

  return (
    <div className="text-white px-6 py-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">🧠 Narrative Intelligence Monitor</h2>
        <button
          className="bg-slate-700 hover:bg-slate-600 text-white text-sm px-3 py-1 rounded"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">🍑 Narrative Type Breakdown</h3>
        <div style={{ width: "300px", margin: "auto" }}>
          <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: false }} height={200} />
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-md font-semibold mb-2">📉 Timeline Trend</h3>
        <div style={{ height: "240px" }}>
          <Line data={timelineData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-md font-semibold mb-1">🤖 AI Insight</h3>
        <p className="text-sm text-pink-400">🧠 Insight: Most critical narratives originate from Telegram and Reddit.</p>
        <p className="text-sm text-yellow-400">⚠️ Monitor for early signals of disinformation trends.</p>
        <p className="text-sm text-orange-300">📌 These may indicate influence operations or destabilization attempts.</p>
      </div>

      <div className="flex gap-2 mb-4">
        <select className="bg-slate-800 px-2 py-1" value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Critical">Critical</option>
          <option value="Neutral">Neutral</option>
          <option value="Positive">Positive</option>
        </select>
        <input
          className="bg-slate-800 px-2 py-1 w-full"
          placeholder="Search by source"
          value={sourceSearch}
          onChange={e => setSourceSearch(e.target.value)}
        />
      </div>

      {filtered.map((n, i) => (
        <Card key={i} className="mb-2 bg-slate-800">
          <CardContent className="p-2">
            <p className="text-md font-semibold">{n.source}</p>
            <p className="text-sm">{n.text}</p>
            <p className="text-xs text-slate-400">Type: {n.type} | Date: {n.date}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default NarrativeMonitor;
