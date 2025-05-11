import React from "react";

const AIOverviewRecommendationsBox = () => {
  const recommendations = [
    "🧠 Identify emerging hostile campaigns across regions",
    "📊 Detect narrative manipulation trends targeting institutions",
    "🛰️ Prioritize crisis zones based on real-time risk signals",
    "🔗 Correlate actors across Telegram, X, and forums",
    "📌 Suggest proactive actions to mitigate strategic threats"
  ];

  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-white mb-4">🧠 AI RECOMMENDATIONS</h3>
      <ul className="list-disc pl-6 space-y-2 text-sm text-gray-300">
        {recommendations.map((rec, idx) => (
          <li key={idx}>{rec}</li>
        ))}
      </ul>
    </div>
  );
};

export default AIOverviewRecommendationsBox;
