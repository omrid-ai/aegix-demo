import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import groupProfile from "@/data/group_profile_mock_data.json";
import { FaUsers, FaCalendarAlt, FaEdit, FaPlus, FaBrain, FaTimes, FaSearch, FaDownload, FaExclamationTriangle } from "react-icons/fa";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Title } from "chart.js";
import { Bar } from "react-chartjs-2";
import jsPDF from "jspdf";
import "jspdf-autotable";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Title);

const GroupProfile = () => {
  const navigate = useNavigate();

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filterDate, setFilterDate] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Group Profile – Disinformation Busters", 10, 10);
    doc.autoTable({
      head: [['Field', 'Value']],
      body: [
        ['Platform', groupProfile.platform],
        ['Members', groupProfile.members],
        ['Last Active', groupProfile.lastActive]
      ],
    });
    doc.save("Group_Profile_Report.pdf");
  };

  const activityData = groupProfile.activity.filter((event) =>
    filterDate ? event.date.startsWith(filterDate) : true
  );

  const sortedUsers = [...groupProfile.topUsers].sort((a, b) =>
    sortAsc ? a.posts - b.posts : b.posts - a.posts
  );

  const heatmapData = {
    labels: groupProfile.weekActivity.map((d) => d.day),
    datasets: [
      {
        label: "Weekly Activity",
        data: groupProfile.weekActivity.map((d) => d.activity),
        backgroundColor: (ctx) => {
          const value = ctx.raw;
          return value > 6 ? "#EF4444" : value > 3 ? "#F59E0B" : "#10B981";
        },
      },
    ],
  };

  const heatmapOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: { ticks: { color: "white" }, grid: { color: "gray" } },
      x: { ticks: { color: "white" }, grid: { color: "gray" } },
    },
    animation: {
      duration: 1000,
      easing: 'easeOutBounce'
    }
  };

  const getActivityBadge = (posts) => {
    if (posts > 50) return "bg-green-500";
    if (posts > 30) return "bg-yellow-400";
    return "bg-red-400";
  };

  const formatDate = (fullDate) => {
    const dateObj = new Date(fullDate);
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return dateObj.toLocaleDateString("en-US", options);
  };

  return (
    <div className="p-6 min-h-screen bg-black text-white space-y-8 animate-fade-in">
      <button
        onClick={() => navigate("/dashboard")}
        className="mb-6 bg-gray-800 hover:bg-cyan-700 text-white py-2 px-4 rounded transition"
      >
        ← Back to Dashboard
      </button>

      <h1 className="text-3xl font-bold mb-4">📂 Group Profile</h1>
      <p className="mb-8 text-gray-400">Intelligence overview of group dynamics, risks, and member activities.</p>

      {/* Profile Section */}
      <div className="bg-gray-900 p-6 rounded-xl space-y-4">
        <h2 className="text-2xl font-bold">{groupProfile.name}</h2>
        <p><FaUsers className="inline mr-2" /> {groupProfile.members} Members</p>
        <p><FaCalendarAlt className="inline mr-2" /> Last Active: {groupProfile.lastActive}</p>
        <p><FaSearch className="inline mr-2" /> Platform: {groupProfile.platform}</p>
        <div className="flex gap-4 mt-4">
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded flex items-center" onClick={handleExportPDF}>
            <FaDownload className="mr-2" /> Export PDF
          </button>
        </div>
      </div>

      {/* Risk Matrix */}
      <div className="bg-gray-900 p-6 rounded-xl space-y-4">
        <h2 className="text-2xl font-bold mb-4">🛡️ Risk Matrix</h2>
        {[{ icon: <FaExclamationTriangle />, label: "Activity Level", level: "High", color: "text-red-400" },
          { icon: <FaUsers />, label: "Members Volume", level: "Medium", color: "text-yellow-400" },
          { icon: <FaBrain />, label: "Recent Alerts", level: "High", color: "text-red-400" },
          { icon: <FaSearch />, label: "External Exposure", level: "Low", color: "text-green-400" }].map((item, idx) => (
          <div key={idx} className="flex justify-between bg-gray-800 p-4 rounded animate-fade-in">
            <div className="flex gap-3 items-center">
              <span className="text-xl">{item.icon}</span>
              <span className="font-semibold">{item.label}</span>
            </div>
            <span className={`${item.color} font-bold`}>{item.level}</span>
          </div>
        ))}
      </div>

      {/* Weekly Activity Heatmap */}
      <div className="bg-gray-900 p-6 rounded-xl space-y-4 animate-fade-in">
        <h2 className="text-2xl font-bold mb-4">🌡️ Weekly Activity Heatmap</h2>
        <Bar data={heatmapData} options={heatmapOptions} />
      </div>
    </div>
  );
};

export default GroupProfile;