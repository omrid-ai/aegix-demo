import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

const RegulatoryAlertsPanel = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetch("/data/regulatory_alerts.json")
      .then((res) => res.json())
      .then((data) => setAlerts(data))
      .catch((err) => console.error("Failed to load alerts:", err));
  }, []);

  return (
    <div className="p-4 space-y-4 bg-gray-900 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-white mb-2">📜 Regulatory Alerts</h2>
      {alerts.length === 0 ? (
        <p className="text-gray-400">No alerts found.</p>
      ) : (
        alerts.map((alert, idx) => (
          <Card key={idx} className="bg-gray-800 text-white">
            <CardContent className="p-4">
              <p className="font-semibold text-lg">{alert.title}</p>
              <p className="text-sm text-gray-300">{alert.description}</p>
              <p className="text-xs text-gray-400 mt-2">Source: {alert.source}</p>
              <p className="text-xs text-gray-500">Date: {alert.date}</p>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default RegulatoryAlertsPanel;