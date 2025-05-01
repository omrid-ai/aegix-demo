// 📁 components/TopBar.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/useUserContext";
import { Bell } from "lucide-react";
import NotificationPanel from "./ui/NotificationPanel";

const TopBar = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => {
    logout();
    localStorage.removeItem("authenticated");
    navigate("/login");
  };

  const roleBadge = {
    admin: "🛡️ Admin Access",
    analyst: "📊 Analyst View",
    viewer: "👁️ Read-Only"
  };

  return (
    <div className="relative flex justify-between items-center mb-4">
      <div>
        <h1 className="text-xl font-bold text-gray-800">AEGIX Intelligence Platform</h1>
        <p className="text-sm text-gray-500">{roleBadge[user?.role] || "🔐 Secure View"}</p>
      </div>

      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative text-gray-700 hover:text-gray-900"
          >
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">3</span>
          </button>
          {showNotifications && <NotificationPanel />}
        </div>

        {/* Language Selector */}
        <select className="text-sm border rounded px-2 py-1">
          <option value="en">🌐 EN</option>
          <option value="he">🇮🇱 HE</option>
        </select>

        {/* User Info + Logout */}
        <span className="text-sm text-gray-700">
          👋 Hello, <strong>{user?.username || "Guest"}</strong>
        </span>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default TopBar;
