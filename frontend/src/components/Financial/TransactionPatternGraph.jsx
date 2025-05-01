import React from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

const data = [
  { time: "09:00", tx: 20 },
  { time: "10:00", tx: 75 },
  { time: "11:00", tx: 110 },
  { time: "12:00", tx: 200 },
];

const TransactionPatternGraph = () => (
  <div>
    <h3 className="text-lg font-semibold mb-2">Transaction Pattern Graph</h3>
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="tx" stroke="#3b82f6" />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default TransactionPatternGraph;
