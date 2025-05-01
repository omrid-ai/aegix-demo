import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const sampleTrend = [
  { time: "10:00", messages: 5 },
  { time: "11:00", messages: 9 },
  { time: "12:00", messages: 12 },
  { time: "13:00", messages: 20 },
  { time: "14:00", messages: 16 },
  { time: "15:00", messages: 8 },
];

const CampaignTrendTimeline = () => {
  return (
    <Card className="mt-6">
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-4">📈 Campaign Trend Timeline</h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={sampleTrend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="messages" stroke="#3b82f6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CampaignTrendTimeline;
