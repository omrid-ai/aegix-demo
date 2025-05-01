import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Brain, DollarSign, ShieldAlert,
  Users, Target, Network, Folder, LogOut
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const linkClasses = (path) =>
    `flex items-center gap-2 p-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
      location.pathname === path
        ? "bg-cyan-700 text-white"
        : "text-gray-400 hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <aside className="bg-gray-900 text-white w-64 min-h-screen flex flex-col p-6 shadow-xl border-r border-gray-800">
      <div className="text-2xl font-bold mb-10 tracking-wide">AEGIX</div>
      <nav className="flex flex-col gap-2">
        <Link to="/dashboard" className={linkClasses("/dashboard")}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </Link>
        <Link to="/narrative-dashboard" className={linkClasses("/narrative-dashboard")}>
          <Brain size={20} />
          <span>Narrative</span>
        </Link>
        <Link to="/finance-dashboard" className={linkClasses("/finance-dashboard")}>
          <DollarSign size={20} />
          <span>Finance</span>
        </Link>
        <Link to="/crisis-dashboard" className={linkClasses("/crisis-dashboard")}>
          <ShieldAlert size={20} />
          <span>Crisis</span>
        </Link>
        <Link to="/actor-dashboard" className={linkClasses("/actor-dashboard")}>
          <Users size={20} />
          <span>Threat Actors</span>
        </Link>
        <Link to="/actor-profile" className={linkClasses("/actor-profile")}>
          <Target size={20} />
          <span>Target Profile</span>
        </Link>
        <Link to="/group-network" className={linkClasses("/group-network")}>
          <Network size={20} />
          <span>Group Network</span>
        </Link>
        <Link to="/group-profile" className={linkClasses("/group-profile")}>
          <Folder size={20} />
          <span>Group Profile</span>
        </Link>

        <div className="border-t border-gray-700 my-4"></div>

        <Link
          to="/login"
          className="flex items-center gap-2 p-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-800 hover:text-white transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
