import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const EmployeeRiskDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    axios.get("/data/mock_company.json").then(res => {
      setEmployees(res.data.employees || []);
    });
  }, []);

  const filteredEmployees = employees.filter(emp =>
    filter === "all" ? true : emp.risk === filter
  );

  const riskCounts = {
    Low: employees.filter(e => e.risk === "Low").length,
    Medium: employees.filter(e => e.risk === "Medium").length,
    High: employees.filter(e => e.risk === "High").length
  };

  const pieData = {
    labels: ["Low", "Medium", "High"],
    datasets: [
      {
        data: [riskCounts.Low, riskCounts.Medium, riskCounts.High],
        backgroundColor: ["#00cc66", "#ffcc00", "#ff3333"],
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="p-6 text-white bg-black min-h-screen space-y-6">
      <h1 className="text-3xl font-bold">🧑‍💼 Employee Risk Dashboard</h1>

      <Card className="bg-gray-900 border border-gray-700">
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <h2 className="text-xl font-semibold">Risk Distribution</h2>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-gray-800 text-white border border-gray-600 rounded px-3 py-2 mt-4 md:mt-0"
            >
              <option value="all">All</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="w-full max-w-xs mx-auto mt-6">
            <Pie
              data={pieData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    labels: { color: "#ffffff" }
                  }
                }
              }}
              height={250}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-900 border border-gray-700">
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">Employees List</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-400">
                <th className="pb-2">Name</th>
                <th className="pb-2">Role</th>
                <th className="pb-2">Risk</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((emp, i) => (
                <tr key={i} className="border-t border-gray-700">
                  <td className="py-2">{emp.name}</td>
                  <td className="py-2">{emp.role}</td>
                  <td className="py-2">
                    <span className={
                      emp.risk === "High" ? "text-red-500" :
                      emp.risk === "Medium" ? "text-yellow-400" : "text-green-400"
                    }>
                      {emp.risk}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button
          variant="default"
          onClick={() => window.print()}
        >
          📥 Export PDF
        </Button>
      </div>
    </div>
  );
};

export default EmployeeRiskDashboard;
