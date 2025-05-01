import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";

const screenGroups = [
  {
    title: "🧠 Intelligence Dashboards",
    items: [
      { label: "Narrative", path: "/narrative-dashboard" },
      { label: "AI Insights", path: "/ai-recommendation-dashboard" },
      { label: "Disinfo Monitor", path: "/disinfo-monitor" },
    ],
  },
  {
    title: "💰 Financial & Regulation",
    items: [
      { label: "Finance", path: "/finance-dashboard" },
      { label: "Regulation", path: "/regulatory-risk-dashboard" },
    ],
  },
  {
    title: "🕵️‍♂️ Threat Actor Intelligence",
    items: [
      { label: "Threat Actors", path: "/actor-dashboard" },
      { label: "Actor Correlation", path: "/actor-correlation-dashboard" },
      { label: "Actor Profile", path: "/actor-profile" },
    ],
  },
  {
    title: "🌐 External Monitoring",
    items: [
      { label: "Dark Web Monitor", path: "/darkweb-monitor" },
      { label: "Campaign Dashboard", path: "/campaign-dashboard" },
      { label: "Influence Overview", path: "/influence-dashboard" },
    ],
  },
  {
    title: "🚨 Crisis & Operations",
    items: [
      { label: "Crisis", path: "/crisis-dashboard" },
      { label: "Group Profile", path: "/group-profile" },
    ],
  },
  {
    title: "🔎 Utilities",
    items: [
      { label: "Overview", path: "/overview-dashboard" },
      { label: "Search", path: "/search" },
      { label: "Manage Users", path: "/admin/users" },
      { label: "Welcome Page", path: "/" },
    ],
  },
];

const Dashboard = () => {
  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">AEGIX – Dashboard</h1>
      <p className="mb-6">Welcome, OMRI</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {screenGroups.map((group, i) => (
          <div key={i}>
            <h2 className="text-lg font-semibold mb-2">{group.title}</h2>
            <div className="space-y-2">
              {group.items.map((screen, idx) => (
                <Card key={idx} className="bg-slate-800 p-4 border border-slate-600 hover:bg-slate-700 transition">
                  <Link to={screen.path} className="text-white block text-center font-medium">
                    {screen.label}
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
