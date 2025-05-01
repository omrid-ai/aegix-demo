import React from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const mockGroup = {
  id: "crypto-leaks",
  name: "Crypto Leaks & Fraud Watch",
  description: "Group tracking fraud, fake exchanges, and crypto scams globally.",
  members: 1784,
  location: "Tel Aviv",
  alerts: 12,
};

const GroupDetails = () => {
  const { id } = useParams();

  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-1">{mockGroup.name}</h2>
          <p className="text-sm text-muted-foreground">Group ID: {id}</p>
        </div>

        <p className="text-base text-gray-700">{mockGroup.description}</p>

        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <strong>Members:</strong> {mockGroup.members}
          </div>
          <div>
            <strong>Location:</strong> {mockGroup.location}
          </div>
          <div>
            <strong>Risk Alerts:</strong>{" "}
            <span className="text-red-500 font-semibold">{mockGroup.alerts}</span>
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <Button asChild>
            <Link to={`/group/${id}/live`}>🔴 Live Activity</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to={`/group/${id}/timeline`}>📊 Timeline</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link to={`/group/${id}/members`}>👥 View Members</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GroupDetails;
