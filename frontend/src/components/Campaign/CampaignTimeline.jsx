import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CampaignTimeline = () => {
  const [timelineData, setTimelineData] = useState([]);

  useEffect(() => {
    // נתוני סימולציה – החלף בעתיד בקריאה מ-API
    const mockData = [
      { time: "10:00", mentions: 3, event: "📢 First viral message" },
      { time: "10:30", mentions: 8 },
      { time: "11:00", mentions: 14, event: "🔗 Group RedPill joined" },
      { time: "11:30", mentions: 20 },
      { time: "12:00", mentions: 28, event: "🔥 Message reshared x50" },
      { time: "12:30", mentions: 35 },
      { time: "13:00", mentions: 41 },
    ];
    setTimelineData(mockData);
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">📆 Campaign Timeline</h2>

      <Card>
        <CardContent className="p-6">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="mentions" stroke="#6366f1" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>

          <ul className="mt-4 space-y-2 text-sm text-gray-700">
            {timelineData
              .filter((point) => point.event)
              .map((point, i) => (
                <li key={i}>
                  <strong>{point.time}:</strong> {point.event}
                </li>
              ))}
          </ul>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button onClick={() => window.location.href = "/campaign-heatmap"}>
          View Heatmap
        </Button>
        <Button variant="outline" onClick={() => window.location.href = "/hostile-campaigns"}>
          Back to Campaigns
        </Button>
      </div>
    </div>
  );
};

export default CampaignTimeline;
