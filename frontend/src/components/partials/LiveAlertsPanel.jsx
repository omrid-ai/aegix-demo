import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

const LiveAlertsPanel = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetch("/data/alerts.json")
      .then(res => res.json())
      .then(data => setAlerts(data.alerts || []))
      .catch(err => console.error("Failed to load alerts:", err));
  }, []);

  if (!alerts.length) return null;

  return (
    <Card>
      <CardContent>
        <h3 className="text-xl font-bold mb-2">🚨 Live Alerts</h3>
        <ul className="list-disc ml-5 space-y-1">
          {alerts.map((alert, i) => (
            <li key={i}>{alert.message}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default LiveAlertsPanel;