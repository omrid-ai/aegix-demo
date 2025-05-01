import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaCalendarAlt, FaChartLine, FaExclamationTriangle, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaStar } from "react-icons/fa";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Title } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Title);

const mockUserProfile = {
  username: "david.cohen",
  fullName: "David Cohen",
  email: "david.cohen@example.com",
  phone: "+972-50-1234567",
  address: "Tel Aviv, Israel",
  joinDate: "2023-06-15",
  posts: 134,
  riskLevel: "Medium",
  weeklyActivity: [2, 5, 8, 6, 9, 4, 7],
  score: 82
};

const UserProfile = () => {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  const riskColor = mockUserProfile.riskLevel === "High" ? "text-red-400" : mockUserProfile.riskLevel === "Medium" ? "text-yellow-400" : "text-green-400";
  const scoreColor = mockUserProfile.score > 80 ? "text-green-400" : mockUserProfile.score > 50 ? "text-yellow-400" : "text-red-400";

  const lineChartData = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "Posts per Day",
        data: mockUserProfile.weeklyActivity,
        borderColor: "#06b6d4",
        backgroundColor: "rgba(6, 182, 212, 0.3)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: { labels: { color: "white" } },
    },
    scales: {
      y: { ticks: { color: "white" }, grid: { color: "gray" } },
      x: { ticks: { color: "white" }, grid: { color: "gray" } },
    },
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  if (!loaded) {
    return <div className="flex justify-center items-center min-h-screen bg-black text-white text-2xl">Loading Profile...</div>;
  }

  return (
    <div className="p-8 min-h-screen bg-black text-white space-y-10">
      <h1 className="text-4xl font-bold mb-4">👤 User Profile</h1>
      <p className="mb-8 text-gray-400">Full intelligence profile including risk evaluation, engagement score, and weekly trends.</p>

      {/* User Basic Info */}
      <div className="bg-gray-900 p-8 rounded-2xl flex flex-col md:flex-row gap-10">
        <div className="flex flex-col items-center text-center">
          <FaUserCircle size={120} className="text-cyan-400" />
          <h2 className="text-2xl font-bold mt-4">{mockUserProfile.fullName}</h2>
          <p className="text-cyan-300">@{mockUserProfile.username}</p>
          <p className="text-sm text-gray-400 mt-2"><FaCalendarAlt className="inline mr-2" /> Joined: {mockUserProfile.joinDate}</p>
        </div>

        <div className="flex flex-col justify-center gap-4 text-left text-lg">
          <p><FaEnvelope className="inline mr-2" /> {mockUserProfile.email}</p>
          <p><FaPhoneAlt className="inline mr-2" /> {mockUserProfile.phone}</p>
          <p><FaMapMarkerAlt className="inline mr-2" /> {mockUserProfile.address}</p>
          <p><FaChartLine className="inline mr-2" /> Posts: <span className="text-cyan-300 font-semibold">{mockUserProfile.posts}</span></p>
          <p><FaExclamationTriangle className="inline mr-2" /> Risk Level: <span className={`${riskColor} font-bold`}>{mockUserProfile.riskLevel}</span></p>
        </div>
      </div>

      {/* Score Section */}
      <div className="bg-gray-900 p-8 rounded-2xl flex flex-col items-center justify-center">
        <FaStar size={70} className={`${scoreColor}`} />
        <h2 className="text-3xl font-bold mt-4">Engagement Score: {mockUserProfile.score}/100</h2>
        <p className="text-gray-400 mt-2">Score calculated based on posts, activity rate, and risk behavior.</p>
      </div>

      {/* Activity Chart */}
      <div className="bg-gray-900 p-8 rounded-2xl">
        <h2 className="text-2xl font-bold mb-4">📈 Weekly Activity Chart</h2>
        <Line data={lineChartData} options={lineChartOptions} />
      </div>

      {/* Navigation */}
      <div className="flex gap-4 justify-end mt-8">
        <button
          onClick={() => navigate("/group-network")}
          className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded"
        >
          🔙 Back to Group Network
        </button>
        <button
          onClick={() => navigate("/actor-profile")}
          className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded"
        >
          🔙 Back to Actor Profile
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
