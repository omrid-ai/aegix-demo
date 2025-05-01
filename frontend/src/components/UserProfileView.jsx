import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const user = {
  username: "CryptoShark77",
  lastSeen: "2025-04-08 14:20",
  groups: ["CryptoLeaks IL", "FakeMoney Traders", "PayNova Reports"],
  connections: ["AnonZ", "DarkExchange"],
  activityTimeline: [
    { date: "2025-04-01", action: "Joined group 'CryptoLeaks IL'" },
    { date: "2025-04-02", action: "Posted suspicious message about currency sales" },
    { date: "2025-04-06", action: "Changed username to CryptoShark77" },
    { date: "2025-04-07", action: "Mentioned 'NovaPay' in scam context" },
  ],
};

const UserProfileView = () => {
  return (
    <Card className="mt-6">
      <CardContent className="p-4 space-y-4">
        <h2 className="text-lg font-semibold">User Profile: {user.username}</h2>
        <p className="text-sm text-muted-foreground">Last seen: {user.lastSeen}</p>

        <div>
          <h3 className="font-semibold">Groups:</h3>
          <ul className="list-disc ml-6">
            {user.groups.map((g, idx) => (
              <li key={idx}>{g}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold">Connections:</h3>
          <ul className="list-disc ml-6">
            {user.connections.map((c, idx) => (
              <li key={idx}>{c}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold">Activity Timeline:</h3>
          <ul className="border-l-2 pl-4 mt-2 space-y-2">
            {user.activityTimeline.map((item, idx) => (
              <li key={idx}>
                <span className="text-sm font-medium">{item.date}</span> –{" "}
                <span className="text-sm">{item.action}</span>
              </li>
            ))}
          </ul>
        </div>

        <Button className="mt-4">Generate User Report</Button>
      </CardContent>
    </Card>
  );
};

export default UserProfileView;
