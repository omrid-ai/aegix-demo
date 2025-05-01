import React from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Progress } from "@/components/ui/Progress";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/Select";

const mockInfluencers = [
  {
    username: "CryptoShark77",
    influence: 92,
    groups: 12,
    mentions: 57,
    riskLevel: "High",
    region: "Tel Aviv",
  },
  {
    username: "AnonDealz",
    influence: 87,
    groups: 9,
    mentions: 42,
    riskLevel: "Medium",
    region: "Haifa",
  },
  {
    username: "FakeShekelBoss",
    influence: 81,
    groups: 11,
    mentions: 36,
    riskLevel: "High",
    region: "Jerusalem",
  },
  {
    username: "MoneyTalks911",
    influence: 74,
    groups: 8,
    mentions: 21,
    riskLevel: "Low",
    region: "Beersheba",
  },
];

const SocialInfluencePanel = () => {
  return (
    <Card className="mt-6">
      <CardContent className="space-y-6 p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">📡 Social Influence Panel</h2>
          <Select defaultValue="All">
            <SelectTrigger>Filter by Region</SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Tel Aviv">Tel Aviv</SelectItem>
              <SelectItem value="Haifa">Haifa</SelectItem>
              <SelectItem value="Jerusalem">Jerusalem</SelectItem>
              <SelectItem value="Beersheba">Beersheba</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left">
              <th className="py-2">User</th>
              <th>Groups</th>
              <th>Mentions</th>
              <th>Risk</th>
              <th>Influence</th>
            </tr>
          </thead>
          <tbody>
            {mockInfluencers.map((user, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="py-2 font-medium">{user.username}</td>
                <td>{user.groups}</td>
                <td>{user.mentions}</td>
                <td>
                  <span
                    className={\`text-xs font-bold px-2 py-1 rounded \${user.riskLevel === "High"
                      ? "bg-red-100 text-red-700"
                      : user.riskLevel === "Medium"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"}\`}
                  >
                    {user.riskLevel}
                  </span>
                </td>
                <td>
                  <Progress value={user.influence} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
};

export default SocialInfluencePanel;