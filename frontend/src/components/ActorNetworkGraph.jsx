import React, { useEffect, useRef } from "react";
import ForceGraph2D from "react-force-graph-2d";

const ActorNetworkGraph = ({ nodes, links }) => {
  const fgRef = useRef();

  useEffect(() => {
    if (fgRef.current) {
      fgRef.current.d3Force("charge").strength(-150);
    }
  }, []);

  return (
    <div className="bg-gray-900 p-4 rounded">
      <ForceGraph2D
        ref={fgRef}
        graphData={{ nodes, links }}
        nodeLabel={(node) => node.label}
        nodeAutoColorBy="id"
        linkDirectionalArrowLength={4}
        linkDirectionalArrowRelPos={1}
        linkColor={() => "red"}
        backgroundColor="#111827"
        nodeCanvasObject={(node, ctx, globalScale) => {
          const label = node.label;
          const fontSize = 12 / globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          ctx.fillStyle = "white";
          ctx.fillText(label, node.x + 6, node.y + 3);
        }}
      />
    </div>
  );
};

export default ActorNetworkGraph;
