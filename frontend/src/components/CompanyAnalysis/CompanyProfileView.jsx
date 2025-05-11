
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const CompanyProfileView = () => {
  const [company, setCompany] = useState(null);
  const [employeeFilter, setEmployeeFilter] = useState("all");
  const [productSearch, setProductSearch] = useState("");

  useEffect(() => {
    axios.get("/data/company_analysis/mock_company.json").then((res) => {
      setCompany(res.data);
    });
  }, []);

  if (!company) return <p className="text-white p-6">Loading company profile...</p>;

  const employees = company.employees || [];
  const products = company.products || [];
  const legalIssues = company.legal_issues || [];

  const filteredEmployees = employees.filter(emp => {
    if (employeeFilter === "all") return true;
    return emp.risk === employeeFilter;
  });

  const filteredProducts = products.filter(prod =>
    prod.name.toLowerCase().includes(productSearch.toLowerCase())
  );

  const riskCounts = {
    Low: employees.filter(e => e.risk === "Low").length,
    Medium: employees.filter(e => e.risk === "Medium").length,
    High: employees.filter(e => e.risk === "High").length
  };

  const barData = {
    labels: ["Low", "Medium", "High"],
    datasets: [
      {
        label: "Risk Distribution",
        data: [riskCounts.Low, riskCounts.Medium, riskCounts.High],
        backgroundColor: ["#00cc66", "#ffcc00", "#ff3333"]
      }
    ]
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#ffffff"
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: "#ffffff"
        }
      },
      y: {
        ticks: {
          color: "#ffffff"
        }
      }
    }
  };

  return (
    <div className="p-6 space-y-6 text-white bg-black min-h-screen">
      <h1 className="text-3xl font-bold">{company.company_name}</h1>
      <p className="text-gray-300">{company.industry}</p>
      <p className="text-gray-400">{company.description}</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card><CardContent>Total Employees: {employees.length}</CardContent></Card>
        <Card><CardContent>Average Risk: {company.overall_risk_score}</CardContent></Card>
        <Card><CardContent>Open Legal Cases: {legalIssues.length}</CardContent></Card>
        <Card><CardContent>Products: {products.length}</CardContent></Card>
      </div>

      <div className="pt-6">
        <label className="mr-4">Filter Employees by Risk:</label>
        <select
          className="bg-gray-800 text-white px-2 py-1 rounded"
          onChange={(e) => setEmployeeFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <Card className="bg-gray-900 border border-gray-700">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold">Employees</h2>
              <ul className="list-disc ml-5">
                {filteredEmployees.map((emp, index) => (
                  <li key={index}>
                    {emp.name} – {emp.role} (
                      <span className={
                        emp.risk === "High" ? "text-red-500" :
                        emp.risk === "Medium" ? "text-yellow-400" : "text-green-400"
                      }>
                        {emp.risk}
                      </span>)
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Risk Distribution</h2>
              {(riskCounts.Low + riskCounts.Medium + riskCounts.High > 0) ? (
                <div className="max-w-xs mx-auto" style={{ maxHeight: "300px", marginBottom: "1rem" }}>
                  <Bar data={barData} options={barOptions} />
                </div>
              ) : (
                <p className="text-gray-500">No employee risk data available.</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="pt-6">
        <label className="mr-4">Search Product Name:</label>
        <div className="flex items-center gap-2 pt-2">
          <Input
            className="w-64"
            value={productSearch}
            onChange={(e) => setProductSearch(e.target.value)}
            placeholder="Type product name..."
          />
          <Button variant="outline" disabled>🔍</Button>
        </div>
      </div>

      <Card className="bg-gray-900 border border-gray-700">
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-2">Products</h2>
          <ul className="list-disc ml-5">
            {filteredProducts.map((prod, index) => (
              <li key={index}>
                {prod.name} ({prod.type}) – Issues: {prod.issues?.join(", ")}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="flex gap-4 flex-wrap">
        <Button onClick={() => window.location.href = "/employee-risk"}>Employee Risk</Button>
        <Button onClick={() => window.location.href = "/product-sentiment"}>Product Sentiment</Button>
        <Button onClick={() => window.location.href = "/legal-risk"}>Legal Issues</Button>
        <Button onClick={() => window.location.href = "/competitor-map"}>Competitive Map</Button>
        <Button onClick={() => window.location.href = "/narrative-monitor"}>Narrative Monitor</Button>
        <Button onClick={() => window.location.href = "/export-report"}>Export Report</Button>
      </div>

      <Button variant="secondary" onClick={() => window.history.back()}>
        ← חזור אחורה
      </Button>
    </div>
  );
};

export default CompanyProfileView;
