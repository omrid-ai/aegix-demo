import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const ActorNetworkGraph = () => {
  return (
    <Card>
      <CardContent>
        <h3 className="text-lg font-semibold mb-2">Network Graph</h3>
        <p className="text-sm">Graph of correlated threat actors will appear here.</p>
      </CardContent>
    </Card>
  );
};

export default ActorNetworkGraph;