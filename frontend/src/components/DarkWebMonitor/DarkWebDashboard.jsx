import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const DarkWebDashboard = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🕸 Dark Web Dashboard</h2>
      <Card>
        <CardContent>
          <p>This dashboard provides an overview of dark web activity including leaks, sales, and mentions of critical assets.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DarkWebDashboard;
