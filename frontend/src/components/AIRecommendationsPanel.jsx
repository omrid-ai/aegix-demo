// 📁 components/AIRecommendationsPanel.jsx

import React, { useEffect, useState } from "react";

const dummyRecommendations = [
  { id: 1, text: "🚨 Investigate 'Crypto Leak IL' – high anomaly score", priority: "High" },
  { id: 2, text: "🔍 Review transaction pattern: anonymous wallet activity", priority: "Medium" },
  { id: 3, text: "🛡️ Consider new rule: flag group with >20 high-risk users", priority: "Low" },
];

const AIRecommendationsPanel = () => {
  const [recs, setRecs] = useState([]);

  useEffect(() => {
    // Simulate fetch or AI logic
    setTimeout(() => {
      setRecs(dummyRecommendations);
    }, 500);
  }, []);

  return (
    <div className="bg-white shadow p-4 rounded-xl">
      <h2 className="text-lg font-bold mb-3">🧠 Recommended Actions</h2>
      <ul className="space-y-2">
        {recs.map((rec) => (
          <li
            key={rec.id}
            className="border-b pb-2 text-sm text-gray-800 last:border-none"
          >
            <div>{rec.text}</div>
            <div className="text-xs text-gray-500">Priority: {rec.priority}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AIRecommendationsPanel;