import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const CompanyProfileView = () => {
  const [company, setCompany] = useState(null);
  const [employeeFilter, setEmployeeFilter] = useState("all");
  const [productSearch, setProductSearch] = useState("");

  useEffect(() => {
    const fetchCompany = async () => {
      const res = await axios.get("/data/mock_company.json");
      setCompany(res.data);
    };
    fetchCompany();
  }, []);

  if (!company) return <p className="p-6 text-white">Loading company profile...</p>;

  const employees = company.employees || [];
  const products = company.products || [];
  const legalIssues = company.legal_issues || [];

  // הדפסות לבדיקה
  console.log("Selected filter:", employeeFilter);
  console.log("Employee risk values:", employees.map(e => e.risk));

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

      <div className="flex items-center space-x-4 pt-6">
        <label className="text-white">Filter Employees by Risk:</label>
        <select
          value={employeeFilter}
          onChange={(e) => setEmployeeFilter(e.target.value)}
          className="bg-gray-800 border border-gray-600 text-white px-3 py-2 rounded"
        >
          <option value="all">All</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <Card className="bg-gray-900 border border-gray-700 mt-4">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold">Employees</h2>
              <ul className="list-disc ml-5">
                {filteredEmployees.map((emp, index) => (
                  <li key={index}>
                    {emp.name} – {emp.role} (
                    <span className={
                      emp.risk === "High"
                        ? "text-red-500"
                        : emp.risk === "Medium"
                        ? "text-yellow-400"
                        : "text-green-400"
                    }>
                      {emp.risk}
                    </span>)
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Risk Distribution</h2>
              <div style={{ width: "100%", height: "300px", position: "relative" }}>
                <Pie
                  data={pieData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        labels: {
                          color: "#ffffff"
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center space-x-4 pt-6">
        <label className="text-white">Search Product:</label>
        <Input
          className="w-64"
          value={productSearch}
          onChange={(e) => setProductSearch(e.target.value)}
          placeholder="Enter product name"
        />
      </div>

      <Card className="bg-gray-900 border border-gray-700">
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold">Products</h2>
          <ul className="list-disc ml-5">
            {filteredProducts.map((prod, index) => (
              <li key={index}>{prod.name} ({prod.type}): {prod.issues?.join(", ")}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Button variant="secondary" onClick={() => window.location.href = "/employee-risk"}>Employee Risk</Button>
        <Button variant="secondary" onClick={() => window.location.href = "/product-sentiment"}>Product Sentiment</Button>
        <Button variant="secondary" onClick={() => window.location.href = "/legal-risk"}>Legal Issues</Button>
        <Button variant="secondary" onClick={() => window.location.href = "/competitor-map"}>Competitor Map</Button>
        <Button variant="secondary" onClick={() => window.location.href = "/narrative-monitor"}>Narrative Monitor</Button>
        <Button variant="default" onClick={() => window.location.href = "/export-report"}>Export M&A Report</Button>
      </div>
    </div>
  );
};

export default CompanyProfileView;
