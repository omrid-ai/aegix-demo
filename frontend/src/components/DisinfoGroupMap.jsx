import React, { useEffect, useRef } from "react";
import ForceGraph2D from "react-force-graph-2d";
import { Card, CardContent } from "@/components/ui/card";

const mockData = {
  nodes: [
    { id: "Truth Revolution", group: "disinfo" },
    { id: "Global Politics Watch", group: "disinfo" },
    { id: "Money Truth Channel", group: "disinfo" },
    { id: "Crypto Fraud Watch", group: "monitoring" },
    { id: "General News", group: "neutral" },
  ],
  links: [
    { source: "Truth Revolution", target: "Global Politics Watch" },
    { source: "Truth Revolution", target: "Money Truth Channel" },
    { source: "Money Truth Channel", target: "Crypto Fraud Watch" },
    { source: "General News", target: "Crypto Fraud Watch" },
  ],
};

const DisinfoGroupMap = () => {
  const fgRef = useRef();

  useEffect(() => {
    if (fgRef.current) {
      fgRef.current.zoomToFit(500);
    }
  }, []);

  return (
    <Card className="p-6">
      <CardContent>
        <h2 className="text-2xl font-bold mb-4">🕸️ Disinfo Group Network Map</h2>
        <p className="text-sm text-gray-600 mb-4">
          Visualization of relationships between monitored groups, with emphasis on disinformation clusters.
        </p>
        <div className="h-[600px] border rounded">
          <ForceGraph2D
            ref={fgRef}
            graphData={mockData}
            nodeAutoColorBy="group"
            nodeLabel={(node) => node.id}
            nodeCanvasObjectMode={() => "after"}
            nodeCanvasObject={(node, ctx, globalScale) => {
              const label = node.id;
              const fontSize = 12 / globalScale;
              ctx.font = `${fontSize}px Sans-Serif`;
              ctx.fillStyle = "#000";
              ctx.fillText(label, node.x + 6, node.y + 6);
            }}
            linkDirectionalArrowLength={4}
            linkDirectionalArrowRelPos={1}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default DisinfoGroupMap;