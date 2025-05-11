import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import ActorNetworkGraph from "./ActorNetworkGraph";
import ActorRiskMatrix from "./ActorRiskMatrix";
import ActorIdentityMatches from "./ActorIdentityMatches";

const ActorCorrelationDashboard = () => {
  const [correlationData, setCorrelationData] = useState(null);

  useEffect(() => {
    fetch("/data/actors/correlation.json")
      .then((res) => res.json())
      .then(setCorrelationData);
  }, []);

  if (!correlationData) return <div className="text-white p-6">Loading actor correlation data...</div>;

  return (
    <div className="min-h-screen bg-black text-white p-6 space-y-6">
      <h1 className="text-3xl font-bold">🧩 Actor Correlation Dashboard</h1>

      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">🌐 Network of Connected Actors</h2>
          <ActorNetworkGraph nodes={correlationData.nodes} links={correlationData.links} />
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">📊 Risk Matrix by Cluster</h2>
          <ActorRiskMatrix risks={correlationData.risk_matrix} />
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">🆔 Identity Overlaps</h2>
          <ActorIdentityMatches matches={correlationData.identity_matches} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ActorCorrelationDashboard;
