
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const AlertRulesConfig = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Alert Rules Config</h2>
      <Card>
        <CardContent>
          <label className="block mb-2">Rule Name:</label>
          <input className="border p-2 w-full mb-4" placeholder="High login attempts" />
          <label className="block mb-2">Condition:</label>
          <input className="border p-2 w-full" placeholder="if login attempts > 5" />
        </CardContent>
      </Card>
    </div>
  );
};

export default AlertRulesConfig;
