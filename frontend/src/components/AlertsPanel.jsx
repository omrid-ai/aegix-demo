import React from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Alert } from "@/components/ui/Alert";

const mockAlerts = [
  {
    id: 1,
    type: "High Risk User",
    level: "danger",
    message: "User @CryptoKing triggered a high-risk alert in group 'Fake Bills Trade'",
    timestamp: "2025-04-11 14:23",
  },
  {
    id: 2,
    type: "New Suspicious Group",
    level: "warning",
    message: "New group 'Shekel Dealers Underground' detected near Tel Aviv",
    timestamp: "2025-04-11 13:50",
  },
  {
    id: 3,
    type: "Spike in Activity",
    level: "info",
    message: "Spike in mentions of keyword 'counterfeit' across 5 groups",
    timestamp: "2025-04-11 13:30",
  },
  {
    id: 4,
    type: "Geo Alert",
    level: "danger",
    message: "User AnonDealer22 moved within 500m from central location",
    timestamp: "2025-04-11 13:10",
  },
];

const AlertsPanel = () => {
  return (
    <Card className="mt-6">
      <CardContent className="space-y-4 p-6">
        <h2 className="text-xl font-bold">🚨 Alerts Panel</h2>

        {mockAlerts.map((alert) => (
          <Alert key={alert.id} type={alert.level}>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{alert.type}</p>
                <p>{alert.message}</p>
              </div>
              <span className="text-sm text-gray-500">{alert.timestamp}</span>
            </div>
          </Alert>
        ))}
      </CardContent>
    </Card>
  );
};

export default AlertsPanel;