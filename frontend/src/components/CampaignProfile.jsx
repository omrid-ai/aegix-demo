import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const CampaignProfile = ({ campaign }) => {
  if (!campaign) {
    return <p className="text-muted-foreground">No campaign selected.</p>;
  }

  return (
    <Card className="mb-6">
      <CardContent className="p-4 space-y-2">
        <h2 className="text-xl font-bold">🧾 Campaign Profile</h2>
        <p><strong>Cluster ID:</strong> {campaign.cluster_id}</p>
        <p><strong>Top Group:</strong> {campaign.top_group}</p>
        <p><strong>Start Time:</strong> {new Date(campaign.start_time).toLocaleString()}</p>
        <p><strong>Messages Count:</strong> {campaign.messages_count}</p>
        <div>
          <strong>Sample Messages:</strong>
          <ul className="list-disc ml-6 mt-1 text-sm text-muted-foreground">
            {campaign.sample_messages.map((msg, idx) => (
              <li key={idx}>{msg}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default CampaignProfile;
