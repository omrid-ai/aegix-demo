import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";

const CampaignAlerts = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // סימולציה של התראות מתוזמנות
    const simulated = [
      {
        id: 1,
        level: "🔴 HIGH",
        message: "Coordinated disinformation surge from 'RedPill Nation'",
        timestamp: "2024-04-12T14:15:00",
      },
      {
        id: 2,
        level: "🟠 MEDIUM",
        message: "Cluster #3 showing anti-regulatory narratives",
        timestamp: "2024-04-12T13:40:00",
      },
      {
        id: 3,
        level: "🟢 LOW",
        message: "Suspicious uptick in 'Freedom Now' keyword mentions",
        timestamp: "2024-04-12T13:00:00",
      },
    ];
    setAlerts(simulated);
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">⚠️ Hostile Campaign Alerts</h2>
      <Card>
        <CardContent className="space-y-4 p-6">
          {alerts.map((a) => (
            <Alert key={a.id} variant="default">
              <div className="font-semibold">{a.level}</div>
              <div>{a.message}</div>
              <div className="text-sm text-muted-foreground">
                {new Date(a.timestamp).toLocaleString()}
              </div>
            </Alert>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default CampaignAlerts;
