import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

const CrisisLiveFeed = () => {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newItem = {
        id: Date.now(),
        message: sampleMessages[Math.floor(Math.random() * sampleMessages.length)],
        time: new Date().toLocaleTimeString(),
      };
      setFeed((prev) => [newItem, ...prev.slice(0, 19)]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const sampleMessages = [
    "🚨 Explosion reported in industrial zone – responders en route.",
    "⚠️ Large protest forming near city hall.",
    "📡 Communication loss reported in emergency channel 3.",
    "🚧 Roadblocks set up on Route 443 due to incident.",
    "🧯 Fire brigade deployed after smoke detected near metro station.",
  ];

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">📡 Live Crisis Feed</h2>
      <Card>
        <CardContent className="p-4 max-h-[500px] overflow-auto space-y-3">
          {feed.length === 0 ? (
            <p className="text-muted-foreground">Waiting for real-time events...</p>
          ) : (
            feed.map((item) => (
              <div key={item.id} className="border-b pb-2">
                <div className="text-sm text-muted-foreground">{item.time}</div>
                <div className="text-base">{item.message}</div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CrisisLiveFeed;
