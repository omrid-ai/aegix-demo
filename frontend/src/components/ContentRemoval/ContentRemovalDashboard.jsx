import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Bar, Doughnut, getElementAtEvent } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const ContentRemovalDashboard = () => {
  const [cases, setCases] = useState([]);
  const [platformData, setPlatformData] = useState({});
  const [statusData, setStatusData] = useState({});
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const navigate = useNavigate();
  const barRef = useRef();
  const statusRef = useRef();

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/content-removal/cases");
        setCases(res.data);

        const platformCounts = {};
        const statusCounts = {};

        res.data.forEach((c) => {
          platformCounts[c.platform] = (platformCounts[c.platform] || 0) + 1;
          statusCounts[c.status] = (statusCounts[c.status] || 0) + 1;
        });

        setPlatformData({
          labels: Object.keys(platformCounts),
          datasets: [
            {
              label: "Requests by Platform",
              data: Object.values(platformCounts),
              backgroundColor: "rgba(59, 130, 246, 0.6)",
            },
          ],
        });

        setStatusData({
          labels: Object.keys(statusCounts),
          datasets: [
            {
              label: "Request Status",
              data: Object.values(statusCounts),
              backgroundColor: [
                "rgba(34,197,94,0.7)",
                "rgba(234,179,8,0.7)",
                "rgba(239,68,68,0.7)",
              ],
            },
          ],
        });
      } catch (err) {
        console.error("Error fetching content removal cases:", err);
      }
    };

    fetchCases();
  }, []);

  const handleBarClick = (event) => {
    const elements = getElementAtEvent(barRef.current, event);
    if (elements.length > 0) {
      const index = elements[0].index;
      const clickedLabel = platformData.labels[index];
      setSelectedPlatform(clickedLabel);
    }
  };

  const handleStatusClick = (event) => {
    const elements = getElementAtEvent(statusRef.current, event);
    if (elements.length > 0) {
      const index = elements[0].index;
      const clickedLabel = statusData.labels[index];
      setSelectedStatus(clickedLabel);
    }
  };

  const filteredCases = cases.filter(
    (c) =>
      (!selectedPlatform || c.platform === selectedPlatform) &&
      (!selectedStatus || c.status === selectedStatus)
  );

  return (
    <div className="p-8 bg-black text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Content Removal Dashboard</h1>

      {/* KPI Section */}
      <div className="grid grid-cols-3 gap-6 mb-10">
        <div className="bg-gray-900 p-6 rounded-lg shadow">
          <h2 className="text-lg">Flagged Content</h2>
          <p className="text-3xl font-bold">24</p>
        </div>
        <div className="bg-gray-900 p-6 rounded-lg shadow">
          <h2 className="text-lg">Requests Submitted</h2>
          <p className="text-3xl font-bold">18</p>
        </div>
        <div className="bg-gray-900 p-6 rounded-lg shadow">
          <h2 className="text-lg">Success Rate</h2>
          <p className="text-3xl font-bold">75%</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6 mb-10">
        <div className="bg-gray-900 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Requests by Platform</h2>
          {platformData.labels ? (
            <Bar
              ref={barRef}
              data={platformData}
              onClick={handleBarClick}
              options={{ responsive: true, plugins: { legend: { display: false } } }}
            />
          ) : (
            <p>Loading chart...</p>
          )}
        </div>
        <div className="bg-gray-900 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Requests by Status</h2>
          {statusData.labels ? (
            <Doughnut
              ref={statusRef}
              data={statusData}
              onClick={handleStatusClick}
              options={{ responsive: true }}
            />
          ) : (
            <p>Loading chart...</p>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-gray-900 rounded-lg overflow-hidden p-4 max-w-4xl mx-auto mb-8">
        {(selectedPlatform || selectedStatus) && (
          <div className="flex justify-between mb-2 text-sm">
            <div>
              {selectedPlatform && <span>Platform: {selectedPlatform}</span>}
              {selectedPlatform && selectedStatus && <span> • </span>}
              {selectedStatus && <span>Status: {selectedStatus}</span>}
            </div>
            <button
              onClick={() => {
                setSelectedPlatform(null);
                setSelectedStatus(null);
              }}
              className="text-blue-400 underline"
            >
              Clear Filter
            </button>
          </div>
        )}
        <table className="w-full text-sm">
          <thead className="bg-gray-800">
            <tr>
              <th className="text-left p-2">Date</th>
              <th className="text-left p-2">Platform</th>
              <th className="text-left p-2">Description</th>
              <th className="text-left p-2">Priority</th>
              <th className="text-left p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredCases.map((c, index) => (
              <tr key={index} className="border-t border-gray-700">
                <td className="p-2">{c.date}</td>
                <td className="p-2">{c.platform}</td>
                <td className="p-2">{c.description}</td>
                <td className="p-2">{c.priority}</td>
                <td className="p-2">{c.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between pt-4 max-w-4xl mx-auto">
        <Button
          variant="outline"
          className="bg-blue-600 text-white hover:bg-blue-700"
          onClick={() => alert("Exporting...")}
        >
          Export PDF/CSV
        </Button>
        <Button
          variant="outline"
          className="bg-green-600 text-white hover:bg-green-700"
          onClick={() => navigate("/content-removal/new")}
        >
          New Removal Request
        </Button>
      </div>
    </div>
  );
};

export default ContentRemovalDashboard;
