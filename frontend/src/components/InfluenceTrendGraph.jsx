import React, { useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { Card, CardContent } from "@/components/ui/Card";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/Select";

const allUsers = {
  "CryptoShark77": [
    { time: "Mon", influence: 60 },
    { time: "Tue", influence: 68 },
    { time: "Wed", influence: 74 },
    { time: "Thu", influence: 83 },
    { time: "Fri", influence: 92 }
  ],
  "AnonDealz": [
    { time: "Mon", influence: 52 },
    { time: "Tue", influence: 55 },
    { time: "Wed", influence: 60 },
    { time: "Thu", influence: 63 },
    { time: "Fri", influence: 67 }
  ],
  "MoneyTalks911": [
    { time: "Mon", influence: 40 },
    { time: "Tue", influence: 45 },
    { time: "Wed", influence: 49 },
    { time: "Thu", influence: 52 },
    { time: "Fri", influence: 55 }
  ]
};

const InfluenceTrendGraph = () => {
  const [selected, setSelected] = useState("CryptoShark77");

  return (
    <Card className="mt-6">
      <CardContent className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">📊 Influence Over Time</h2>
          <Select defaultValue="CryptoShark77" onValueChange={setSelected}>
            <SelectTrigger>{selected}</SelectTrigger>
            <SelectContent>
              {Object.keys(allUsers).map((u) => (
                <SelectItem key={u} value={u}>
                  {u}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={allUsers[selected]}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="time" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="influence"
              stroke="#1e40af"
              strokeWidth={3}
              name="Influence Score"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default InfluenceTrendGraph;