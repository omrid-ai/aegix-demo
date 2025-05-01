import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const AnomalyDetailsPanel = ({ user = "Wallet123", amount = 50000, location = "Tel Aviv", time = "2024-04-12 09:30" }) => {
  return (
    <Card className="my-4">
      <CardContent className="p-4">
        <h3 className="text-lg font-bold mb-2">🔍 Anomaly Details</h3>
        <p><strong>User:</strong> {user}</p>
        <p><strong>Amount:</strong> ${amount}</p>
        <p><strong>Location:</strong> {location}</p>
        <p><strong>Time:</strong> {time}</p>
      </CardContent>
    </Card>
  );
};

export default AnomalyDetailsPanel;
