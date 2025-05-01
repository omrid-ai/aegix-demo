import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table } from "@/components/ui/table";

const mockMatches = [
  { alias: "CryptoWarrior", telegram: "@cw123", twitter: "@cw_reborn", match_score: 92 },
  { alias: "RedLion", telegram: "@lionx", twitter: "@theliontruth", match_score: 88 },
];

const ActorIdentityMatches = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">🔗 Identity Matches</h2>
    <Card>
      <CardContent className="p-4">
        <Table>
          <thead>
            <tr>
              <th>Alias</th>
              <th>Telegram</th>
              <th>X (Twitter)</th>
              <th>Match Score</th>
            </tr>
          </thead>
          <tbody>
            {mockMatches.map((m, i) => (
              <tr key={i}>
                <td>{m.alias}</td>
                <td>{m.telegram}</td>
                <td>{m.twitter}</td>
                <td>{m.match_score}%</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </CardContent>
    </Card>
  </div>
);

export default ActorIdentityMatches;
