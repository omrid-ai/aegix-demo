import React from "react";
import ForceGraph2D from "react-force-graph-2d";
import groupData from "@/data/group_mock_data.json";
import { FaGlobe } from "react-icons/fa";

const platformColors = {
  "Telegram": "#00BFFF",
  "Dark Web": "#d60f73",
  "X": "#FF8C00",
  "Facebook": "#3b5998"
};

const platformDescriptions = {
  "Anti-Fraud Analysts": "קבוצה לאיתור הונאות ברשת החברתית",
  "Dark Web Market Watchers": "קבוצה למעקב אחרי שווקים חשאיים",
  "Political Trends Monitors": "קבוצה שמנטרת תנועות פוליטיות",
  "Financial Crime Hunters": "קבוצה לאיתור פעילות פיננסית חשודה",
  "Disinformation Busters": "קבוצה למאבק בפייק ניוז"
};

const GroupNetworkGraph = () => {
  return (
    <div className="p-6 min-h-screen bg-black text-white space-y-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <FaGlobe className="mr-2" /> Group Network Graph
      </h1>
      <ForceGraph2D
        graphData={groupData}
        nodeLabel={node => `${node.id}\n${platformDescriptions[node.id]}`}
        nodeAutoColorBy="platform"
        nodeCanvasObject={(node, ctx, globalScale) => {
          const label = node.id;
          const fontSize = 12 / globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          ctx.fillStyle = platformColors[node.platform] || "white";
          ctx.beginPath();
          ctx.arc(node.x, node.y, 10, 0, 2 * Math.PI, false);
          ctx.fill();
          ctx.textAlign = "center";
          ctx.textBaseline = "top";
          ctx.fillStyle = "white";
          ctx.fillText(label, node.x, node.y + 12);
        }}
        backgroundColor="#000000"
      />
    </div>
  );
};

export default GroupNetworkGraph;
