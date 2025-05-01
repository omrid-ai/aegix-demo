import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const links = [
    { label: "Main Dashboard", to: "/dashboard" },
    { label: "Narrative Dashboard", to: "/narrative-dashboard" },
    { label: "Finance Dashboard", to: "/finance-dashboard" },
    { label: "Crisis Dashboard", to: "/crisis-dashboard" },
    { label: "Threat Actors", to: "/actor-dashboard" },
    { label: "Actor Profile", to: "/actor-profile" },
    { label: "Actor Correlation", to: "/actor-correlation-dashboard" },
    { label: "Dark Web Monitor", to: "/darkweb-monitor" },
    { label: "Disinfo Monitor", to: "/disinfo-monitor" },
    { label: "Group Profile", to: "/group-profile" },
    { label: "Influence Overview", to: "/influence-dashboard" },
    { label: "Overview Dashboard", to: "/overview-dashboard" },
    { label: "Campaign Dashboard", to: "/campaign-dashboard" },
    { label: "Campaign Overview", to: "/campaign-overview" },
    { label: "AI Recommendation", to: "/ai-recommendation-dashboard" },
    { label: "Regulatory Risk", to: "/regulatory-risk-dashboard" },
    { label: "Regulatory Overview", to: "/regulatory-dashboard" },
    { label: "Search", to: "/search" },
    { label: "Smart Search", to: "/smart-search" },
    { label: "Search Results", to: "/search-results" },
    { label: "Manage Users", to: "/admin/users" },
  ];

  return (
    <aside className="bg-gray-900 text-white min-h-screen w-56 p-4 border-r border-gray-800">
      <div className="font-bold text-lg mb-4">AEGIX Navigation</div>
      <ul className="space-y-1 text-sm">
        {links.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              className="block px-2 py-1 rounded hover:bg-gray-700 transition"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
