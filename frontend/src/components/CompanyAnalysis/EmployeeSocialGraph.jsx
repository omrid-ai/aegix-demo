import React, { useEffect, useRef } from "react";
import { DataSet, Network } from "vis-network/standalone/esm/vis-network";

const EmployeeSocialGraph = ({ employee }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!employee) return;

    const nodes = new DataSet([
      { id: 0, label: employee.name, shape: "circle", color: "#0ea5e9", font: { color: "#fff" } },
      ...(employee.social_links || []).map((link, i) => ({
        id: i + 1,
        label: link.platform,
        shape: "box",
        color:
          link.platform === "Telegram" ? "#26A5E4" :
          link.platform === "Facebook" ? "#1877F2" :
          link.platform === "LinkedIn" ? "#0A66C2" :
          link.platform === "X" ? "#000000" : "#777",
        font: { color: "#fff" }
      }))
    ]);

    const edges = new DataSet(
      (employee.social_links || []).map((_, i) => ({
        from: 0,
        to: i + 1
      }))
    );

    const data = { nodes, edges };
    const options = {
      nodes: {
        borderWidth: 1,
        size: 30,
        font: { size: 14 },
        shadow: true
      },
      edges: {
        color: "#aaa",
        arrows: { to: false },
        smooth: true
      },
      layout: {
        improvedLayout: true
      },
      physics: {
        stabilization: true
      }
    };

    new Network(containerRef.current, data, options);
  }, [employee]);

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-700 p-4">
      <h2 className="text-xl font-bold mb-2">🧬 Social Network Graph</h2>
      <div ref={containerRef} style={{ height: "300px" }} />
    </div>
  );
};

export default EmployeeSocialGraph;
