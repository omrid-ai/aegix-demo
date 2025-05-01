import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";

const mockData = {
  "CryptoShark77": [
    { date: "2024-03-01", mentions: 10 },
    { date: "2024-03-02", mentions: 18 },
    { date: "2024-03-03", mentions: 24 },
    { date: "2024-03-04", mentions: 30 },
    { date: "2024-03-05", mentions: 26 },
    { date: "2024-03-06", mentions: 33 },
  ],
  "AnonZ": [
    { date: "2024-03-01", mentions: 4 },
    { date: "2024-03-02", mentions: 8 },
    { date: "2024-03-03", mentions: 12 },
    { date: "2024-03-04", mentions: 10 },
    { date: "2024-03-05", mentions: 14 },
    { date: "2024-03-06", mentions: 16 },
  ]
};

const InfluenceTrendChart = () => {
  const [selectedUser, setSelectedUser] = useState("CryptoShark77");

  return (
    <Card className="p-6 space-y-6">
      <CardContent>
        <h2 className="text-xl font-bold mb-4">📈 Influence Trend Chart</h2>

        <div className="mb-4">
          <label className="block text-sm mb-1 text-gray-600">Select User:</label>
          <Select defaultValue="CryptoShark77" onValueChange={setSelectedUser}>
            <SelectTrigger>{selectedUser}</SelectTrigger>
            <SelectContent>
              <SelectItem value="CryptoShark77">CryptoShark77</SelectItem>
              <SelectItem value="AnonZ">AnonZ</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={mockData[selectedUser]}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="mentions" stroke="#8884d8" name="Mentions" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default InfluenceTrendChart;