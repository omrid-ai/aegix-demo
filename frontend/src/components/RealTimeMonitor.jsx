import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

const mockAlerts = [
  { time: "10:01", user: "CryptoShark77", message: "Posted alert in FraudWatch", type: "High" },
  { time: "10:04", group: "PayNova Complaints", message: "5 new members joined", type: "Medium" },
  { time: "10:06", user: "DarkExchange", message: "Activity spike detected", type: "High" },
];

const RealTimeMonitor = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    setAlerts(mockAlerts); // Simulate fetching alerts
    const interval = setInterval(() => {
      // Live update simulation
      const newAlert = {
        time: new Date().toLocaleTimeString().slice(0, 5),
        user: "AnonZ",
        message: "Mentioned suspicious keywords in CryptoLeaks",
        type: "Low",
      };
      setAlerts((prev) => [newAlert, ...prev.slice(0, 9)]);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="mt-6">
      <CardContent className="p-6 space-y-4">
        <h2 className="text-xl font-bold">🟢 Real-Time Monitor Panel</h2>
        <div className="space-y-3 max-h-[500px] overflow-auto">
          {alerts.map((alert, idx) => (
            <div key={idx} className="border p-3 rounded bg-white shadow-sm">
              <div className="text-sm text-muted-foreground">
                {alert.time} •{" "}
                {alert.user ? `User: ${alert.user}` : `Group: ${alert.group || "N/A"}`}
              </div>
              <div className="font-medium">{alert.message}</div>
              <div
                className={`text-xs inline-block px-2 py-1 rounded mt-1 text-white ${
                  alert.type === "High"
                    ? "bg-red-600"
                    : alert.type === "Medium"
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }`}
              >
                {alert.type} Risk
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RealTimeMonitor;
