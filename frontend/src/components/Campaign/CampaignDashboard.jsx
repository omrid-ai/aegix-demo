
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const CampaignDashboard = () => {
  const campaigns = [
    { name: "Operation Tumult", threat: "Disinformation", start: "2024-02-10", peak: "2024-02-20", status: "Active", color: "red" },
    { name: "Project Eclipse", threat: "Hacking", start: "2024-03-20", peak: "2024-04-29", status: "Mitigated", color: "blue" },
    { name: "Effigy Surge", threat: "Protests", start: "2024-04-29", peak: "2024-04-29", status: "Low", color: "orange" },
    { name: "Oblivion Intent", threat: "Defacement", start: "2024-04-29", peak: "2024-04-29", status: "Active", color: "purple" },
    { name: "Storm Strife", threat: "Hacking", start: "2024-03-27", peak: "2024-03-29", status: "Mitigated", color: "blue" },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-6">🚨 Campaign Overview Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">📋 Hostile Campaigns</h2>
            <table className="w-full text-sm">
              <thead className="text-left text-gray-400">
                <tr>
                  <th>Campaign</th>
                  <th>Threat</th>
                  <th>Start Date</th>
                  <th>Peak</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((c, i) => (
                  <tr key={i} className="border-t border-gray-700">
                    <td className="py-2">{c.name}</td>
                    <td className="py-2 text-cyan-300">{c.threat}</td>
                    <td className="py-2">{c.start}</td>
                    <td className="py-2">{c.peak}</td>
                    <td className={`py-2 text-${c.color}-400`}>{c.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">📈 Campaign Timeline</h2>
            <img src="/images/campaign_timeline_graph.png" alt="Campaign Timeline" className="w-full rounded shadow" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">🗺️ Campaign Spread</h2>
            <img src="/images/campaign_spread_map.png" alt="Campaign Spread Map" className="w-full rounded shadow" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">🧠 Campaign Entities</h2>
            <img src="/images/campaign_entities_graph.png" alt="Campaign Entity Graph" className="w-full rounded shadow" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CampaignDashboard;
