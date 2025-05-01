import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import CampaignProfile from "./CampaignProfile";
import CampaignSpreadHeatmap from "./CampaignSpreadHeatmap";
import CampaignTrendTimeline from "./CampaignTrendTimeline";
import CampaignEntitiesGraph from "./CampaignEntitiesGraph";
import CampaignTimelineGraph from "./CampaignTimelineGraph";

const CampaignOverview = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">📡 Hostile Campaign Overview</h1>

      <Card>
        <CardContent className="p-6">
          <CampaignProfile />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <CampaignSpreadHeatmap />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <CampaignTrendTimeline />
        </CardContent>
      </Card>
      
      <Card>
       <CardContent className="p-6">
         <CampaignTimelineGraph />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <CampaignEntitiesGraph />
        </CardContent>
      </Card>
    </div>
  );
};

export default CampaignOverview;