import React from "react";

const LeakAlertsPanel = ({ leaks, campaigns }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Leaks</h3>
      {leaks.map(leak => (
        <div key={leak.id} className="p-3 border border-gray-700 bg-gray-900 rounded">
          <div className="text-sm text-red-400">{leak.file_name} – Risk: {leak.risk_level}</div>
          <div className="text-xs text-gray-400">Detected on: {leak.discovered_on} by {leak.detected_by}</div>
        </div>
      ))}

      <h3 className="text-lg font-semibold text-white mt-6">Hostile Campaigns</h3>
      {campaigns.map(c => (
        <div key={c.id} className="p-3 border border-yellow-600 bg-gray-800 rounded">
          <div className="text-sm text-yellow-400">{c.title}</div>
          <div className="text-xs text-gray-400">Launched: {c.launch_date} via {c.platform}</div>
        </div>
      ))}
    </div>
  );
};

export default LeakAlertsPanel;
