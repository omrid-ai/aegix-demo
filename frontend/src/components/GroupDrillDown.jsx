import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const GroupDrillDown = () => {
  const messages = [
    { user: "CryptoHunter99", content: "Selling foreign bills cheap. DM me.", date: "2025-04-08" },
    { user: "AnonZ", content: "Where can I find NovaPay fakes?", date: "2025-04-08" },
    { user: "IsraelBlackMarket", content: "New drop in Hod Hasharon 💰", date: "2025-04-07" },
  ];

  return (
    <Card className="mt-6">
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-4">Group Drill-Down: Crypto Leak IL</h2>
        <ul className="space-y-3">
          {messages.map((msg, i) => (
            <li key={i} className="bg-muted p-3 rounded-xl shadow-sm border border-gray-200">
              <div className="text-sm font-medium text-primary">{msg.user}</div>
              <div className="text-sm">{msg.content}</div>
              <div className="text-xs text-muted-foreground mt-1">{msg.date}</div>
            </li>
          ))}
        </ul>
        <Button className="mt-4">Export Group Data</Button>
      </CardContent>
    </Card>
  );
};

export default GroupDrillDown;
