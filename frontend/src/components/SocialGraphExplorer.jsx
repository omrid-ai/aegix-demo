import React, { useRef, useEffect } from "react";
import ForceGraph2D from "react-force-graph-2d";
import { Card, CardContent } from "@/components/ui/Card";

const data = {
  nodes: [
    { id: "CryptoShark77", risk: "high" },
    { id: "AnonDealz", risk: "medium" },
    { id: "MoneyTalks911", risk: "low" },
    { id: "FakeShekelBoss", risk: "high" },
    { id: "CryptoLeads", risk: "medium" },
    { id: "Group: FraudWatch" },
    { id: "Group: CryptoIsrael" },
    { id: "Group: Deals Underground" }
  ],
  links: [
    { source: "CryptoShark77", target: "AnonDealz", type: "reply" },
    { source: "CryptoShark77", target: "Group: FraudWatch" },
    { source: "AnonDealz", target: "Group: FraudWatch" },
    { source: "AnonDealz", target: "Group: CryptoIsrael" },
    { source: "MoneyTalks911", target: "Group: Deals Underground" },
    { source: "FakeShekelBoss", target: "MoneyTalks911", type: "mention" },
    { source: "CryptoLeads", target: "Group: CryptoIsrael" }
  ]
};

const getNodeColor = (risk) => {
  if (!risk) return "#ccc";
  if (risk === "high") return "#ef4444";
  if (risk === "medium") return "#facc15";
  if (risk === "low") return "#4ade80";
  return "#ccc";
};

const SocialGraphExplorer = () => {
  const fgRef = useRef();

  useEffect(() => {
    if (fgRef.current) {
      fgRef.current.zoomToFit(500);
    }
  }, []);

  return (
    <Card className="mt-6">
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-4">🔗 Social Graph Explorer</h2>
        <div style={{ height: "600px" }}>
          <ForceGraph2D
            ref={fgRef}
            graphData={data}
            nodeAutoColorBy="risk"
            nodeCanvasObject={(node, ctx, globalScale) => {
              const label = node.id;
              const fontSize = 12 / globalScale;
              ctx.font = `${fontSize}px Sans-Serif`;
              ctx.fillStyle = getNodeColor(node.risk);
              ctx.beginPath();
              ctx.arc(node.x, node.y, 6, 0, 2 * Math.PI, false);
              ctx.fill();
              ctx.fillStyle = "black";
              ctx.fillText(label, node.x + 8, node.y + 4);
            }}
            linkDirectionalArrowLength={4}
            linkDirectionalArrowRelPos={1}
            linkColor={() => "#aaa"}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialGraphExplorer;