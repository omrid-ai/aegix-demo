
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const logs = [
  { id: 1, action: "Login", user: "Alice", timestamp: "2025-04-13 12:01" },
  { id: 2, action: "Edited role", user: "Admin", timestamp: "2025-04-13 12:03" },
];

const SystemLogsDashboard = () => {
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">System Logs</h2>
      <Card>
        <CardContent>
          <ul className="text-sm space-y-2">
            {logs.map((log) => (
              <li key={log.id}>
                [{log.timestamp}] {log.user} - {log.action}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemLogsDashboard;
