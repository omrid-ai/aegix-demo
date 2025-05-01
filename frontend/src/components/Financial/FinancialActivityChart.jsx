import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent } from "@/components/ui/card";

const data = [
  { date: "2025-04-01", transactions: 120 },
  { date: "2025-04-02", transactions: 160 },
  { date: "2025-04-03", transactions: 210 },
  { date: "2025-04-04", transactions: 90 },
];

const FinancialActivityChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="date" stroke="#00ffff" />
        <YAxis stroke="#00ffff" />
        <Tooltip />
        <Line type="monotone" dataKey="transactions" stroke="#00ffff" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default FinancialActivityChart;
