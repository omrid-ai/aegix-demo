import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Graph } from "react-d3-graph";

const CompanyRiskOverview = () => {
  const [employees, setEmployees] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/data/mock_company.json")
      .then((res) => res.json())
      .then((data) => {
        const emps = data.employees || [];
        setEmployees(emps);
        setAlerts(generateAlerts(emps));
      });
  }, []);

  const generateAlerts = (empList) => {
    const platformMap = {};
    const alerts = [];
    empList.forEach((emp) => {
      if (emp.risk === "High") {
        emp.social_links?.forEach((link) => {
          const key = link.platform.toLowerCase();
          platformMap[key] = platformMap[key] || [];
          platformMap[key].push(emp.name);
        });
      }
    });

    for (const [platform, names] of Object.entries(platformMap)) {
      const uniqueNames = [...new Set(names)];
      if (uniqueNames.length > 1) {
        alerts.push(`🚨 ${uniqueNames.join(" and ")} share a ${platform} connection and are HIGH risk.`);
      }
    }
    return alerts;
  };

  const graphData = {
    nodes: employees.map((e) => ({
      id: e.name,
      color: e.risk === "High" ? "red" : e.risk === "Medium" ? "yellow" : "green"
    })),
    links: []
  };

  const addedLinks = new Set();

  employees.forEach((emp) => {
    emp.social_links?.forEach((link) => {
      employees.forEach((other) => {
        if (
          other.name !== emp.name &&
          other.social_links?.some((l) => l.platform === link.platform)
        ) {
          const key = [emp.name, other.name].sort().join("-");
          if (!addedLinks.has(key)) {
            graphData.links.push({ source: emp.name, target: other.name });
            addedLinks.add(key);
          }
        }
      });
    });
  });

  const graphConfig = {
    nodeHighlightBehavior: true,
    node: {
      color: "lightgray",
      size: 300,
      highlightStrokeColor: "blue",
      labelProperty: "id",
      fontColor: "white" // ✅ טקסט לבן
    },
    link: {
      highlightColor: "aqua",
      color: "white"
    },
    backgroundColor: "black",
    height: 500,
    width: 900
  };

  return (
    <div className="p-6 text-white bg-black min-h-screen space-y-6">
      <h1 className="text-3xl font-bold mb-4">🧩 Company Risk Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card><CardContent>Total Employees: {employees.length}</CardContent></Card>
        <Card><CardContent>High Risk: {employees.filter(e => e.risk === "High").length}</CardContent></Card>
        <Card><CardContent>Shared Platforms: Telegram, LinkedIn, X</CardContent></Card>
        <Card><CardContent>Alerts: {alerts.length}</CardContent></Card>
      </div>

      {alerts.length > 0 && (
        <Card className="bg-red-900 border border-red-500">
          <CardContent>
            <h2 className="text-xl font-bold mb-2 text-red-300">🚨 Risk Alerts</h2>
            <ul className="list-disc ml-5 space-y-1">
              {alerts.map((alert, i) => (
                <li key={i}>{alert}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      <Card className="bg-gray-900 border border-gray-700">
        <CardContent>
          <h2 className="text-xl font-bold mb-2">🔗 Social Risk Graph</h2>
          <Graph id="risk-network" data={graphData} config={graphConfig} />
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyRiskOverview;
