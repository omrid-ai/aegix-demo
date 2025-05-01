import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table } from "@/components/ui/table";

const HostileCampaignDashboard = () => {
  const [campaigns, setCampaigns] = useState([]);

  // Simulated API call
  useEffect(() => {
    const mock = [
      {
        cluster_id: 0,
        messages_count: 42,
        top_group: "Freedom Now",
        start_time: "2024-05-01T10:00:00",
        sample_messages: [
          "Fake pandemic created to control us",
          "Wake up. They're lying to you.",
          "Global elites want us silent."
        ]
      },
      {
        cluster_id: 1,
        messages_count: 29,
        top_group: "RedPill Nation",
        start_time: "2024-05-01T11:10:00",
        sample_messages: [
          "They control the media",
          "The truth is being suppressed",
          "Everything is rigged"
        ]
      }
    ];

    setCampaigns(mock);
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">📡 Hostile Campaign Intelligence</h2>

      <Card>
        <CardContent className="p-4 overflow-x-auto">
          <Table className="min-w-full text-sm border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Cluster ID</th>
                <th className="p-2 border">Top Group</th>
                <th className="p-2 border"># of Messages</th>
                <th className="p-2 border">Start Time</th>
                <th className="p-2 border">Sample Messages</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="p-2 border font-semibold">{c.cluster_id}</td>
                  <td className="p-2 border">{c.top_group}</td>
                  <td className="p-2 border">{c.messages_count}</td>
                  <td className="p-2 border">
                    {new Date(c.start_time).toLocaleString()}
                  </td>
                  <td className="p-2 border text-xs text-muted-foreground">
                    <ul className="list-disc ml-4">
                      {c.sample_messages.map((m, i) => (
                        <li key={i}>{m}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardContent>
      </Card>

      <Button onClick={() => alert("📁 Export to PDF/CSV coming soon!")}>
        Export Campaign Report
      </Button>
    </div>
  );
};

export default HostileCampaignDashboard;