
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-60 h-screen bg-gray-900 text-white p-4 space-y-4">
      <h2 className="text-xl font-bold">🧠 AEGIX</h2>
      <nav className="space-y-2">
        <Link to="/dashboard" className="block hover:text-blue-400">📊 Dashboard</Link>
        <Link to="/narrative-dashboard" className="block hover:text-blue-400">🧠 Narrative</Link>
        <Link to="/actor-dashboard" className="block hover:text-blue-400">🕵️ Threat Actors</Link>
        <Link to="/actor-profile" className="block hover:text-blue-400">👤 Actor Profile</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
