// frontend/src/components/GroupLiveActivity.jsx
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

const mockMessages = [
  { user: "NovaAlertBot", text: "🚨 Warning: fake currency detected", time: "14:21", flagged: true },
  { user: "CryptoShark77", text: "Got great rates today 🔥🔥", time: "14:20", flagged: false },
  { user: "AnonExchange", text: "PayNova scammed me again", time: "14:19", flagged: true },
];

const GroupLiveActivity = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Simulate live update
    setTimeout(() => setMessages(mockMessages), 1000);
  }, []);

  return (
    <Card className="mt-6">
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-4">Live Group Feed</h2>
        <ul className="space-y-3">
          {messages.map((m, idx) => (
            <li
              key={idx}
              className={`p-3 rounded-md border ${
                m.flagged ? "border-red-400 bg-red-50" : "border-gray-200"
              }`}
            >
              <div className="flex justify-between">
                <span className="font-medium">{m.user}</span>
                <span className="text-xs text-muted-foreground">{m.time}</span>
              </div>
              <p className="text-sm mt-1">{m.text}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default GroupLiveActivity;
