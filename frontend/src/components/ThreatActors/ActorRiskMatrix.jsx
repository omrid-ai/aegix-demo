import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const matrix = [
  { name: "RedWolf", risk: "High", activity: 8 },
  { name: "Ghost42", risk: "Medium", activity: 5 },
  { name: "DarkNetOne", risk: "Critical", activity: 10 },
];

const ActorRiskMatrix = () => {
  return (
    <Card>
      <CardContent>
        <h3 className="text-lg font-semibold mb-2">Risk Matrix</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th>Actor</th>
              <th>Risk</th>
              <th>Activity</th>
            </tr>
          </thead>
          <tbody>
            {matrix.map((actor, index) => (
              <tr key={index} className="border-b">
                <td>{actor.name}</td>
                <td>{actor.risk}</td>
                <td>{actor.activity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
};

export default ActorRiskMatrix;