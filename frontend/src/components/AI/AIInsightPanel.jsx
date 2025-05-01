import React, { useEffect, useState } from "react";

const AIInsightPanel = () => {
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    fetch("/data/ai_insights.json")
      .then((res) => res.json())
      .then((data) => setInsights(data))
      .catch((err) => console.error("Failed to load AI insights:", err));
  }, []);

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">🔍 AI Insights</h2>
      <ul className="space-y-2">
        {insights.map((item, index) => (
          <li key={index} className="p-3 bg-gray-800 rounded">
            <p className="text-cyan-400 font-bold">{item.title}</p>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AIInsightPanel;