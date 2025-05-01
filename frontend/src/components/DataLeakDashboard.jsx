import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const DataLeakDashboard = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🔐 Data Leak Dashboard</h2>
      <Card>
        <CardContent className="p-4">
          <p>Summary of recent data leaks and exposed credentials across platforms.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataLeakDashboard;