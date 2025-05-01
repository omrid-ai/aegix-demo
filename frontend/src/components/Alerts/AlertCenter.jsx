// 📁 components/Alerts/AlertCenter.jsx

import React from "react";

const mockAlerts = [
  { id: 1, type: "Financial", message: "Suspicious transaction detected", time: "2 minutes ago" },
  { id: 2, type: "Narrative", message: "Spike in 'corruption' mentions", time: "10 minutes ago" },
  { id: 3, type: "Threat Actor", message: "Known actor reactivated", time: "30 minutes ago" }
];

const AlertCenter = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">🚨 Alert Center</h2>
      <ul className="space-y-2">
        {mockAlerts.map((alert) => (
          <li key={alert.id} className="border bg-white shadow-sm p-4 rounded-lg">
            <div className="text-sm text-gray-500">{alert.type}</div>
            <div className="text-md font-medium">{alert.message}</div>
            <div className="text-xs text-gray-400">{alert.time}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlertCenter;