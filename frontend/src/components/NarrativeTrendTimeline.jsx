import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent } from "@/components/ui/card";

const data = [
  { date: "2025-04-01", mentions: 10 },
  { date: "2025-04-02", mentions: 40 },
  { date: "2025-04-03", mentions: 70 },
  { date: "2025-04-04", mentions: 50 },
];

const NarrativeTrendTimeline = () => (
  <Card className="p-6">
    <CardContent>
      <h2 className="text-xl font-bold mb-4">📈 Narrative Trend Timeline</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="mentions" stroke="#3b82f6" />
        </LineChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

export default NarrativeTrendTimeline;