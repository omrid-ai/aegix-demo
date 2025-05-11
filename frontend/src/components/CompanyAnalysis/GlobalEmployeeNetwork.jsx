import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Graph } from "react-d3-graph";

const GlobalEmployeeNetwork = () => {
  const [employees, setEmployees] = useState([]);
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/data/mock_company.json")
      .then((res) => res.json())
      .then((data) => {
        const emps = data.employees || [];
        setEmployees(emps);
        const graph = buildNetwork(emps);
        setGraphData(graph);
      });
  }, []);

  const buildNetwork = (emps) => {
    const nodes = emps.map(emp => ({
      id: emp.name,
      color: emp.risk === "High" ? "red" : emp.risk === "Medium" ? "orange" : "green",
      fontColor: "white"
    }));

    const links = [];
    const added = new Set();

    emps.forEach(emp => {
      emp.social_links?.forEach(link => {
        emps.forEach(other => {
          if (
            emp.name !== other.name &&
            other.social_links?.some(l => l.platform === link.platform)
          ) {
            const key = [emp.name, other.name].sort().join("-");
            if (!added.has(key)) {
              links.push({ source: emp.name, target: other.name });
              added.add(key);
            }
          }
        });
      });
    });

    return { nodes, links };
  };

  const onClickNode = (nodeId) => {
    const emp = employees.find((e) => e.name === nodeId);
    if (emp?.id) navigate(`/employee/${emp.id}`);
  };

  const onMouseOverNode = (nodeId) => {
    const emp = employees.find(e => e.name === nodeId);
    if (emp) {
      console.log(`Hovered over: ${emp.name} | ${emp.role} | Risk: ${emp.risk}`);
    }
  };

  const config = {
    nodeHighlightBehavior: true,
    node: {
      size: 400,
      fontSize: 12,
      labelProperty: "id",
      highlightStrokeColor: "blue",
      renderLabel: true,
      fontColor: "white"
    },
    link: {
      highlightColor: "lightblue",
      color: "white"
    },
    backgroundColor: "black",
    width: 1000,
    height: 600,
    d3: {
      gravity: -200
    }
  };

  return (
    <div className="p-6 text-white bg-black min-h-screen space-y-6">
      <h1 className="text-3xl font-bold">🌐 Global Employee Network</h1>
      <p className="text-gray-400 mb-2">
        Each connection shows a shared social platform.
      </p>
      <div className="text-sm mb-4">
        <span className="text-red-400 font-semibold">● High</span>{" "}
        <span className="text-yellow-300 font-semibold">● Medium</span>{" "}
        <span className="text-green-300 font-semibold">● Low</span>
      </div>
      <Graph
        id="employee-network"
        data={graphData}
        config={config}
        onClickNode={onClickNode}
        onMouseOverNode={onMouseOverNode}
      />
    </div>
  );
};

export default GlobalEmployeeNetwork;