import React, { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import ForceGraph2D from "react-force-graph-2d";

const mockData = {
  nodes: [
    { id: "CryptoShark77", group: "User" },
    { id: "PayNova Complaints", group: "Group" },
    { id: "AnonDealz", group: "User" },
    { id: "Crypto Leaks & Fraud Watch", group: "Group" },
    { id: "MoneyTalks911", group: "User" }
  ],
  links: [
    { source: "CryptoShark77", target: "PayNova Complaints" },
    { source: "AnonDealz", target: "Crypto Leaks & Fraud Watch" },
    { source: "MoneyTalks911", target: "PayNova Complaints" },
    { source: "CryptoShark77", target: "Crypto Leaks & Fraud Watch" }
  ]
};

const InfluenceGraphRelations = () => {
  const graphRef = useRef();

  useEffect(() => {
    if (graphRef.current) {
      graphRef.current.d3Force("charge").strength(-100);
    }
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">🔗 Influence Graph Relations</h1>
      <Card>
        <CardContent className="p-4">
          <ForceGraph2D
            ref={graphRef}
            graphData={mockData}
            nodeAutoColorBy="group"
            nodeLabel="id"
            linkDirectionalArrowLength={6}
            linkDirectionalArrowRelPos={1}
            width={800}
            height={500}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default InfluenceGraphRelations;