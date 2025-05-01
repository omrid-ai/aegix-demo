import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const NarrativeTopicClusters = () => {
  const clusters = [
    { cluster: "Control", topics: ["CBDC", "Surveillance", "Freedom"] },
    { cluster: "Environment", topics: ["Carbon Tax", "Agenda 2030", "Regulation"] },
  ];

  return (
    <Card className="p-6">
      <CardContent>
        <h2 className="text-xl font-bold mb-4">🧠 Narrative Topic Clusters</h2>
        <ul className="space-y-3">
          {clusters.map((c, i) => (
            <li key={i}>
              <strong>{c.cluster}:</strong> {c.topics.join(", ")}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default NarrativeTopicClusters;