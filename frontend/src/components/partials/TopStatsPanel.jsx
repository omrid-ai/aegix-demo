import React from "react";

const stats = [
  { title: "AI Recommendations", value: "4 active recommendations", sub: "Awaiting review" },
  { title: "Influence", value: "589 relevant posts", sub: "Dissecting identified" },
  { title: "Hostile Campaigns", value: "16 campaigns detected", sub: "Tracking in-progress influence ops" },
  { title: "Threat Actors", value: "5 active threat actors", sub: "Flagged for closer analysis" }
];

const TopStatsPanel = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {stats.map((s, i) => (
        <div key={i} className="bg-gray-900 p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold">{s.title}</h2>
          <p className="text-xl font-bold">{s.value}</p>
          <p className="text-sm text-gray-400">{s.sub}</p>
        </div>
      ))}
    </div>
  );
};

export default TopStatsPanel;