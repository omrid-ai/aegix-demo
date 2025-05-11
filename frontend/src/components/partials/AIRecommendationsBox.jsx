import React from "react";

const AIRecommendationsBox = () => {
  const items = [
    "Monitor emerging threats to pattern/analyze",
    "Strengthen key assets e.g. firewalls, threat stations",
    "Detect financial anomalies for Financial domains"
  ];

  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4">🧠 AR AI RECOMMENDATIONS</h3>
      <ul className="list-disc pl-6 space-y-2 text-sm text-gray-300">
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default AIRecommendationsBox;