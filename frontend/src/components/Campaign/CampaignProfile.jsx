import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const CampaignProfile = ({ campaign }) => {
  if (!campaign) {
    return <p className="text-muted-foreground">No campaign selected</p>;
  }

  return (
    <Card className="p-6 space-y-4">
      <CardContent>
        <h2 className="text-2xl font-bold">📌 Campaign Profile</h2>

        <div className="grid grid-cols-2 gap-4 text-sm mt-4">
          <div>
            <strong>Cluster ID:</strong> {campaign.cluster_id}
          </div>
          <div>
            <strong>Top Group:</strong> {campaign.top_group}
          </div>
          <div>
            <strong>Messages Count:</strong> {campaign.messages_count}
          </div>
          <div>
            <strong>Start Time:</strong>{" "}
            {new Date(campaign.start_time).toLocaleString()}
          </div>
        </div>

        <div className="mt-4">
          <strong>Sample Messages:</strong>
          <ul className="list-disc ml-6 text-gray-700 mt-2">
            {campaign.sample_messages.map((msg, i) => (
              <li key={i}>{msg}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default CampaignProfile;
