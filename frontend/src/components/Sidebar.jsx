import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  BarChart3,
  Search,
  Users,
  AlertCircle,
  Flame,
  Globe,
  Brain,
  Newspaper,
  Briefcase,
  ShieldCheck,
  FileSearch,
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const links = [
    { label: "Main Dashboard", to: "/dashboard", icon: <Home className="w-4 h-4" /> },
    { label: "Overview Dashboard", to: "/overview-dashboard", icon: <BarChart3 className="w-4 h-4" /> },
    { label: "Narrative Dashboard", to: "/narrative-dashboard" },
    { label: "Finance Dashboard", to: "/finance-dashboard" },
    { label: "Crisis Dashboard", to: "/crisis-dashboard" },
    { label: "Threat Actors", to: "/actor-dashboard" },
    { label: "Actor Profile", to: "/actor-profile" },
    { label: "Actor Correlation", to: "/actor-correlation-dashboard" },
    { label: "Dark Web Monitor", to: "/darkweb-monitor", icon: <Globe className="w-4 h-4" /> },
    { label: "Disinfo Monitor", to: "/disinfo-monitor", icon: <AlertCircle className="w-4 h-4" /> },
    { label: "Group Profile", to: "/group-profile" },
    { label: "Influence Overview", to: "/influence-dashboard" },
    { label: "Campaign Dashboard", to: "/campaign-dashboard" },
    { label: "Campaign Overview", to: "/campaign-overview" },
    { label: "AI Recommendation", to: "/ai-recommendation-dashboard", icon: <Brain className="w-4 h-4" /> },
    { label: "Regulatory Risk", to: "/regulatory-risk-dashboard" },
    { label: "Regulatory Overview", to: "/regulatory-dashboard" },
    { label: "Search", to: "/search", icon: <Search className="w-4 h-4" /> },
    { label: "Smart Search", to: "/smart-search" },
    { label: "Search Results", to: "/search-results" },
    { label: "Manage Users", to: "/admin/users", icon: <Users className="w-4 h-4" /> },
    { label: "Content Removal", to: "/content-removal" },

    // ✅ Blockchain
    { label: "Wallet Heatmap", to: "/wallet-heatmap", icon: <Globe className="w-4 h-4" /> },
    { label: "Wallet Profile", to: "/wallet-profile/wallet_1" },
    { label: "Wallet Intel Dashboard", to: "/wallet-intel/0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae", icon: <BarChart3 className="w-4 h-4" /> },
    { label: "Wallet Scanner", to: "/wallet-scanner" },
    { label: "Crypto Market", to: "/crypto-market" },
    { label: "FATF Regulatory Intel", to: "/regulatory-intel" },
    { label: "Legal Exposure", to: "/legal-exposure" },

    // ✅ Company Analysis
    { label: "Company Profile", to: "/company-profile" },
    { label: "Competitors Map", to: "/competitor-map" },
    { label: "Employee Risk", to: "/employee-risk" },
    { label: "Legal Exposure", to: "/legal-risk", icon: <ShieldCheck className="w-4 h-4" /> },
    { label: "Narratives Monitor", to: "/narrative-monitor" },
    { label: "Product Sentiment", to: "/product-sentiment" },
    { label: "Export Report", to: "/export-report" },
    { label: "Company Risk Overview", to: "/company-risk-overview" },
    { label: "Global Network", to: "/global-network" },
    { label: "Geo Risk Heatmap", to: "/geo-risk" },
    { label: "AI Risk Insights", to: "/ai-employee-insights" },
    { label: "Narrative Monitor (Employee)", to: "/narrative-monitor-employee" },

    // ✅ Investigation
    { label: "🕵️ Investigation Center", to: "/investigation-center", icon: <FileSearch className="w-4 h-4" /> },

    // ✅ Avatar Suite
    { label: "🎭 Avatar Admin Panel", to: "/admin/avatar-suite" },
    { label: "👤 Avatar Manager", to: "/admin/avatar-suite/manager" },
    { label: "📝 Profile Editor", to: "/admin/avatar-suite/profile-editor" },
    { label: "📊 Risk Dashboard", to: "/admin/avatar-suite/risk-dashboard" },
    { label: "⏱️ Scheduler", to: "/admin/avatar-suite/scheduler" },
    { label: "📅 Post Timeline", to: "/admin/avatar-suite/post-timeline" },
    { label: "🗃️ Post Archive", to: "/admin/avatar-suite/archive" },

    // ✅ News
    { label: "📰 News Insights", to: "/news-insights", icon: <Newspaper className="w-4 h-4" /> },
    { label: "📈 Company News", to: "/company-news", icon: <Briefcase className="w-4 h-4" /> },
  ];

  return (
    <aside className="bg-gray-900 text-white min-h-screen w-56 p-4 border-r border-gray-800">
      <div className="font-bold text-lg mb-4">AEGIX Navigation</div>
      <ul className="space-y-1 text-sm">
        {links.map(({ label, to, icon }) => (
          <li key={to}>
            <Link
              to={to}
              className={`flex items-center gap-2 px-2 py-1 rounded transition ${
                location.pathname === to ? "bg-gray-700" : "hover:bg-gray-800"
              }`}
            >
              {icon && icon}
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
