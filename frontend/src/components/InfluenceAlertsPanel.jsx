import React from "react";
import { Card, CardContent } from "@/components/ui/Card";

const alerts = [
  {
    user: "CryptoShark77",
    message: "Joined 3 suspicious groups",
    time: "15 min ago",
    severity: "High"
  },
  {
    user: "AnonDealz",
    message: "Influence score dropped by 20%",
    time: "30 min ago",
    severity: "Medium"
  },
  {
    user: "MoneyTalks911",
    message: "Spammed 10 posts in a high-risk channel",
    time: "1 hour ago",
    severity: "Critical"
  }
];

const severityColor = {
  High: "text-yellow-600",
  Medium: "text-blue-600",
  Critical: "text-red-600"
};

const InfluenceAlertsPanel = () => {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">🚨 Influence Alerts Panel</h1>

      <Card>
        <CardContent className="p-4 space-y-4">
          {alerts.map((alert, idx) => (
            <div key={idx} className="border-b pb-3">
              <p>
                <strong className="text-black">{alert.user}</strong>: {alert.message}
              </p>
              <p className="text-sm text-muted-foreground">{alert.time}</p>
              <p className={`text-sm font-semibold ${severityColor[alert.severity]}`}>
                Severity: {alert.severity}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default InfluenceAlertsPanel;