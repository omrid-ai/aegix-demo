import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent } from "@/components/ui/card";

const mockTrendData = [
  { date: "2024-05-01", mentions: 12 },
  { date: "2024-05-02", mentions: 25 },
  { date: "2024-05-03", mentions: 37 },
  { date: "2024-05-04", mentions: 31 },
  { date: "2024-05-05", mentions: 19 },
];

const CampaignTrendTimeline = () => {
  return (
    <Card className="p-4">
      <CardContent>
        <h2 className="text-xl font-bold mb-4">📈 Campaign Trend Timeline</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={mockTrendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="mentions" stroke="#3b82f6" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CampaignTrendTimeline;
