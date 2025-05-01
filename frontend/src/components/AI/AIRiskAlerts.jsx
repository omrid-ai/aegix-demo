import React, { useEffect, useState } from "react";

const AIRiskAlerts = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetch("/data/ai_risk_alerts.json")
      .then((res) => res.json())
      .then((data) => setAlerts(data))
      .catch((err) => console.error("Failed to load AI risk alerts:", err));
  }, []);

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">🚨 AI Risk Alerts</h2>
      <ul className="space-y-2 max-h-64 overflow-y-auto">
        {alerts.map((alert, idx) => (
          <li key={idx} className="bg-gray-800 p-4 rounded">
            <div className="text-red-400 font-bold">{alert.type}</div>
            <div className="text-sm text-gray-300">{alert.message}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AIRiskAlerts;