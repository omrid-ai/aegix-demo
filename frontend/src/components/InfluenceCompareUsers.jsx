import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const mockData = {
  CryptoShark77: { score: 85, mentions: 130, reach: 4200 },
  AnonZ: { score: 72, mentions: 92, reach: 2800 },
};

const InfluenceCompareUsers = () => {
  const [user1, setUser1] = useState("CryptoShark77");
  const [user2, setUser2] = useState("AnonZ");
  const [comparison, setComparison] = useState(null);

  const handleCompare = () => {
    const data1 = mockData[user1];
    const data2 = mockData[user2];
    if (data1 && data2) {
      setComparison({ user1, user2, data1, data2 });
    }
  };

  return (
    <Card className="p-6 space-y-6">
      <CardContent>
        <h2 className="text-xl font-bold mb-4">🆚 Influence Comparison Tool</h2>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">First User:</label>
            <Input value={user1} onChange={(e) => setUser1(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Second User:</label>
            <Input value={user2} onChange={(e) => setUser2(e.target.value)} />
          </div>
        </div>

        <Button onClick={handleCompare}>Compare</Button>

        {comparison && (
          <div className="mt-6 border rounded p-4 bg-white">
            <h3 className="text-lg font-semibold mb-2">Comparison Results</h3>
            <table className="w-full text-sm border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border">Metric</th>
                  <th className="p-2 border">{comparison.user1}</th>
                  <th className="p-2 border">{comparison.user2}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border">Influence Score</td>
                  <td className="p-2 border">{comparison.data1.score}</td>
                  <td className="p-2 border">{comparison.data2.score}</td>
                </tr>
                <tr>
                  <td className="p-2 border">Mentions</td>
                  <td className="p-2 border">{comparison.data1.mentions}</td>
                  <td className="p-2 border">{comparison.data2.mentions}</td>
                </tr>
                <tr>
                  <td className="p-2 border">Reach</td>
                  <td className="p-2 border">{comparison.data1.reach}</td>
                  <td className="p-2 border">{comparison.data2.reach}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InfluenceCompareUsers;