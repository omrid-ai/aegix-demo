import React from "react";

const HostileCampaignsBox = () => {
  const campaigns = [
    {
      title: "📢 Coordinated Anti-Government Campaign",
      region: "Eastern Europe",
      impact: "High Influence Spread",
      vectors: ["Telegram", "Twitter", "YouTube"]
    },
    {
      title: "🧨 Disinformation Targeting Health Sector",
      region: "South America",
      impact: "Moderate Sentiment Shift",
      vectors: ["Facebook", "WhatsApp"]
    },
    {
      title: "🕵️‍♂️ False Flag Operation Around Elections",
      region: "North Africa",
      impact: "Critical Risk to Public Trust",
      vectors: ["Local Forums", "Instagram"]
    }
  ];

  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-md space-y-3">
      <h3 className="text-xl font-bold mb-3">🚨 Hostile Campaigns Detected</h3>
      {campaigns.map((c, idx) => (
        <div key={idx} className="bg-gray-800 p-3 rounded border border-gray-700">
          <p className="font-semibold text-pink-400">{c.title}</p>
          <p className="text-sm text-gray-300">🌍 Region: {c.region}</p>
          <p className="text-sm text-gray-300">📈 Impact: {c.impact}</p>
          <p className="text-sm text-gray-300">📡 Channels: {c.vectors.join(", ")}</p>
        </div>
      ))}
    </div>
  );
};

export default HostileCampaignsBox;
