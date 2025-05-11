import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";

const EmployeeRiskScanner = () => {
  const [employees, setEmployees] = useState([]);
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  useEffect(() => {
    axios.get("/data/company_analysis/mock_company.json").then((res) => {
      setEmployees(res.data.employees || []);
    });
  }, []);

  const filteredEmployees = employees.filter((emp) => {
    const deptMatch = departmentFilter ? emp.department === departmentFilter : true;
    const locMatch = locationFilter ? emp.location === locationFilter : true;
    return deptMatch && locMatch;
  });

  const groupedByRisk = {
    High: filteredEmployees.filter((e) => e.risk === "High"),
    Medium: filteredEmployees.filter((e) => e.risk === "Medium"),
    Low: filteredEmployees.filter((e) => e.risk === "Low"),
  };

  return (
    <div className="p-6 bg-black text-white min-h-screen space-y-6">
      <h1 className="text-3xl font-bold mb-2">🛡️ Employee Risk Scanner</h1>

      <div className="flex flex-wrap gap-4 items-center">
        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          className="bg-gray-800 text-white px-3 py-2 rounded"
        >
          <option value="">Filter by Department</option>
          <option value="Technology">Technology</option>
          <option value="Product">Product</option>
          <option value="Legal">Legal</option>
          <option value="Management">Management</option>
          <option value="R&D">R&D</option>
          <option value="Infrastructure">Infrastructure</option>
        </select>

        <select
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="bg-gray-800 text-white px-3 py-2 rounded"
        >
          <option value="">Filter by Location</option>
          <option value="San Francisco, USA">San Francisco, USA</option>
          <option value="Tel Aviv, Israel">Tel Aviv, Israel</option>
          <option value="London, UK">London, UK</option>
          <option value="Berlin, Germany">Berlin, Germany</option>
          <option value="Paris, France">Paris, France</option>
          <option value="New York, USA">New York, USA</option>
        </select>

        <Button onClick={() => {
          setDepartmentFilter("");
          setLocationFilter("");
        }}>
          Reset
        </Button>
      </div>

      {["High", "Medium", "Low"].map((level) => (
        <Card key={level} className="bg-gray-900 mt-6">
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-4">
              {level === "High" && "🔥"}
              {level === "Medium" && "⚠️"}
              {level === "Low" && "✅"}{" "}
              {level} Risk
            </h2>
            {groupedByRisk[level].length === 0 ? (
              <p className="text-gray-400">No employees in this category.</p>
            ) : (
              <ul className="space-y-4">
                {groupedByRisk[level].map((emp, i) => (
                  <li key={i} className="flex items-start gap-4 border-b border-gray-700 pb-3">
                    <img
                      src={emp.image}
                      alt={emp.name}
                      className="w-8 h-8 border border-gray-500 rounded"
                    />
                    <div>
                      <p className="text-lg font-bold">{emp.name}</p>
                      <p className="text-sm">{emp.role} | {emp.department}</p>
                      <p className="text-sm text-gray-400">{emp.location}</p>
                      <p className="mt-1 text-yellow-400">⚠️ {emp.risk_reason}</p>
                      <Button
                        size="sm"
                        className="mt-2"
                        onClick={() =>
                          window.location.href = `/employee/${emp.id}`
                        }
                      >
                        View Profile →
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      ))}

      <div className="flex gap-3 pt-6 flex-wrap">
        <Button variant="outline" onClick={() => window.location.href = "/company-profile"}>
          ← חזור לחברה
        </Button>
        <Button variant="default" onClick={() => window.location.href = "/company-risk-overview"}>
          🔗 המשך למסך הבא
        </Button>
        <Button variant="secondary" onClick={() => window.location.href = "/dashboard"}>
          🏠 חזור לדשבורד הראשי
        </Button>
      </div>
    </div>
  );
};

export default EmployeeRiskScanner;
