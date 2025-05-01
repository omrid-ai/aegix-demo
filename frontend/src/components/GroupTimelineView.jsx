// frontend/src/components/GroupTimelineView.jsx
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const timeline = [
  { date: "2025-04-01", event: "User CryptoShark77 joined group" },
  { date: "2025-04-02", event: "Username changed to NovaScanner" },
  { date: "2025-04-03", event: "Spike in messages – +250%" },
  { date: "2025-04-06", event: "Keyword 'counterfeit' appeared 12 times" },
];

const GroupTimelineView = () => {
  return (
    <Card className="mt-6">
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-4">Group Timeline</h2>
        <ul className="border-l-2 border-gray-300 pl-4 space-y-4">
          {timeline.map((item, idx) => (
            <li key={idx}>
              <span className="font-medium text-sm text-gray-700">{item.date}</span>
              <div className="text-sm">{item.event}</div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default GroupTimelineView;
