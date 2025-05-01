import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const influencers = [
  { username: "CryptoShark77", score: 91, groups: 5, influenceZone: "Israel, Global" },
  { username: "AnonZ", score: 84, groups: 3, influenceZone: "USA, Europe" },
  { username: "FraudWatchdog", score: 78, groups: 4, influenceZone: "Germany, Austria" }
];

const InfluencerDetectionReport = () => {
  const [showReport, setShowReport] = useState(false);

  return (
    <Card className="p-6 space-y-4">
      <CardContent>
        <h2 className="text-xl font-bold mb-4">🌐 Telegram Influencer Detection</h2>
        <p className="text-gray-600 mb-4">
          This module identifies top influencing users based on their mentions, group activity, and regional impact.
        </p>
        <Button onClick={() => setShowReport(true)}>Generate Influencer Report</Button>

        {showReport && (
          <div className="mt-6">
            <table className="table-auto w-full text-left border-collapse border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border">Username</th>
                  <th className="p-2 border">Influence Score</th>
                  <th className="p-2 border"># Groups Active</th>
                  <th className="p-2 border">Influence Zone</th>
                </tr>
              </thead>
              <tbody>
                {influencers.map((user, i) => (
                  <tr key={i} className="border-t">
                    <td className="p-2 border">{user.username}</td>
                    <td className="p-2 border">{user.score}</td>
                    <td className="p-2 border">{user.groups}</td>
                    <td className="p-2 border">{user.influenceZone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InfluencerDetectionReport;