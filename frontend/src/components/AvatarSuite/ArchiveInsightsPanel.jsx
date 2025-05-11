
import React from "react";

const ArchiveInsightsPanel = ({ stats }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-xl text-white space-y-2">
      <h2 className="text-xl font-bold">📊 Archive Insights</h2>
      <p>Total Posts: {stats.total}</p>
      <p>Top Platform: {stats.topPlatform}</p>
      <p>Most Discussed Topic: {stats.topTopic}</p>
    </div>
  );
};

export default ArchiveInsightsPanel;
