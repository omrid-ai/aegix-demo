import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

const AIEmployeeInsights = () => {
  const [employees, setEmployees] = useState([]);
  const [highRisk, setHighRisk] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    fetch("/data/mock_company.json")
      .then(res => res.json())
      .then(data => {
        const emps = data.employees || [];
        setEmployees(emps);
        const high = emps.filter(emp => emp.risk === "High");
        setHighRisk(high);
        setRecommendations(generateRecommendations(high));
      });
  }, []);

  const generateRecommendations = (highRiskEmps) => {
    return highRiskEmps.map((emp) => ({
      name: emp.name,
      suggestion: `📌 Recommend conducting background audit for ${emp.role} (${emp.department}) due to: ${emp.risk_reason}`
    }));
  };

  return (
    <div className="p-6 text-white bg-black min-h-screen space-y-6">
      <h1 className="text-3xl font-bold">🧠 AI Risk Insights Panel</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gray-900 border border-gray-700">
          <CardContent>
            <h2 className="text-xl font-semibold mb-2">📍 High-Risk Employees</h2>
            <ul className="list-disc ml-4 text-sm">
              {highRisk.map((emp, i) => (
                <li key={i}>{emp.name} – {emp.role}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border border-gray-700 col-span-2">
          <CardContent>
            <h2 className="text-xl font-semibold mb-2">✅ Recommended Actions</h2>
            <ul className="list-disc ml-4 text-sm space-y-2">
              {recommendations.map((rec, i) => (
                <li key={i}>{rec.suggestion}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIEmployeeInsights;
