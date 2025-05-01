import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { ResponsiveContainer, Tooltip, Cell, Pie, PieChart } from "recharts";

const languageData = [
  { name: "English", value: 45 },
  { name: "Hebrew", value: 30 },
  { name: "Russian", value: 15 },
  { name: "Arabic", value: 10 },
];

const dayActivity = [
  { day: "Sunday", posts: 40 },
  { day: "Monday", posts: 60 },
  { day: "Tuesday", posts: 35 },
  { day: "Wednesday", posts: 50 },
  { day: "Thursday", posts: 70 },
  { day: "Friday", posts: 30 },
  { day: "Saturday", posts: 20 },
];

const InfluenceHeatmapDailyLang = () => {
  const [view, setView] = useState("language");

  return (
    <Card className="p-6">
      <CardContent>
        <h2 className="text-xl font-bold mb-4">🔥 Influence Heatmap View</h2>

        <div className="mb-4">
          <label className="text-sm text-gray-600">Choose View:</label>
          <Select defaultValue="language" onValueChange={setView}>
            <SelectTrigger>{view}</SelectTrigger>
            <SelectContent>
              <SelectItem value="language">By Language</SelectItem>
              <SelectItem value="day">By Day of Week</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          {view === "language" ? (
            <PieChart>
              <Tooltip />
              <Pie
                data={languageData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                {languageData.map((entry, index) => (
                  <Cell key={index} fill={["#8884d8", "#82ca9d", "#ffc658", "#ff6f61"][index % 4]} />
                ))}
              </Pie>
            </PieChart>
          ) : (
            <PieChart>
              <Tooltip />
              <Pie
                data={dayActivity}
                dataKey="posts"
                nameKey="day"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                {dayActivity.map((entry, index) => (
                  <Cell key={index} fill={["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#b66dff", "#ff5c8a", "#6666ff"][index % 7]} />
                ))}
              </Pie>
            </PieChart>
          )}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default InfluenceHeatmapDailyLang;