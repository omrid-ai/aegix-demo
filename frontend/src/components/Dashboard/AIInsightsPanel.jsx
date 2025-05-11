// 📁 frontend/src/components/Search/AIInsightsPanel.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";

const AIInsightsPanel = ({ results }) => {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInsights = async () => {
      if (!results || results.length === 0) return;
      setLoading(true);
      try {
        const response = await axios.post("/api/ai/insights", { results });
        setInsights(response.data);
      } catch (error) {
        console.error("Failed to fetch AI insights", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, [results]);

  return (
    <div className="bg-white shadow p-4 rounded-xl mt-6">
      <h2 className="text-lg font-bold mb-4">🧠 AI Insights</h2>
      {loading && <p>Analyzing trends and patterns...</p>}
      {insights && (
        <div className="space-y-3">
          {insights.trends && (
            <div>
              <h3 className="font-semibold">Trending Topics:</h3>
              <ul className="list-disc list-inside">
                {insights.trends.map((trend, idx) => (
                  <li key={idx}>{trend}</li>
                ))}
              </ul>
            </div>
          )}
          {insights.anomalies && (
            <div>
              <h3 className="font-semibold">Detected Anomalies:</h3>
              <ul className="list-disc list-inside">
                {insights.anomalies.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          {insights.recommendations && (
            <div>
              <h3 className="font-semibold">Recommended Actions:</h3>
              <ul className="list-disc list-inside">
                {insights.recommendations.map((rec, idx) => (
                  <li key={idx}>{rec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AIInsightsPanel;
