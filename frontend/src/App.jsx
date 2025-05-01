import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";
import MainLayout from "@/components/MainLayout";

import Welcome from "./components/Welcome";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import NarrativeDashboard from "./components/NarrativeDashboard";
import FinanceDashboard from "./components/FinanceDashboard";
import CrisisDashboard from "./components/CrisisDashboard";
import ThreatActorDashboard from "./components/ThreatActorDashboard";
import ActorProfile from "./components/ActorProfile";
import ActorCorrelationDashboard from "./components/ActorCorrelationDashboard";
import DisinfoMonitor from "./components/DisinfoMonitor";
import DarkWebMonitor from "./components/DarkWebMonitor";
import GroupNetworkGraph from "./components/GroupNetworkGraph";
import GroupProfile from "./components/GroupProfile";
import UserProfile from "./components/UserProfile";
import InfluenceDashboard from "./components/InfluenceDashboard";
import CampaignDashboard from "./components/Campaign/CampaignDashboard";
import CampaignOverview from "./components/Campaign/CampaignOverview";
import AIRecommendationDashboard from "./components/AI/AIRecommendationDashboard";
import RegulatoryRiskDashboard from "./components/Regulatory/RegulatoryRiskDashboard";
import RegulatoryDashboard from "./components/Regulatory/RegulatoryDashboard";
import Search from "./components/Search";
import ManageUsers from "./components/Admin/ManageUsers";
import SmartSearch from "./components/Search/SmartSearch";
import SearchResultsScreen from "./components/Search/SearchResultsScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><MainLayout><Dashboard /></MainLayout></ProtectedRoute>} />
        <Route path="/narrative-dashboard" element={<ProtectedRoute><MainLayout><NarrativeDashboard /></MainLayout></ProtectedRoute>} />
        <Route path="/finance-dashboard" element={<ProtectedRoute><MainLayout><FinanceDashboard /></MainLayout></ProtectedRoute>} />
        <Route path="/crisis-dashboard" element={<ProtectedRoute><MainLayout><CrisisDashboard /></MainLayout></ProtectedRoute>} />
        <Route path="/actor-dashboard" element={<ProtectedRoute><MainLayout><ThreatActorDashboard /></MainLayout></ProtectedRoute>} />
        <Route path="/actor-profile" element={<ProtectedRoute><MainLayout><ActorProfile /></MainLayout></ProtectedRoute>} />
        <Route path="/actor-correlation-dashboard" element={<ProtectedRoute><MainLayout><ActorCorrelationDashboard /></MainLayout></ProtectedRoute>} />
        <Route path="/disinfo-monitor" element={<ProtectedRoute><MainLayout><DisinfoMonitor /></MainLayout></ProtectedRoute>} />
        <Route path="/darkweb-monitor" element={<ProtectedRoute><MainLayout><DarkWebMonitor /></MainLayout></ProtectedRoute>} />
        <Route path="/group-network" element={<ProtectedRoute><MainLayout><GroupNetworkGraph /></MainLayout></ProtectedRoute>} />
        <Route path="/group-profile" element={<ProtectedRoute><MainLayout><GroupProfile /></MainLayout></ProtectedRoute>} />
        <Route path="/user-profile" element={<ProtectedRoute><MainLayout><UserProfile /></MainLayout></ProtectedRoute>} />
        <Route path="/influence-dashboard" element={<ProtectedRoute><MainLayout><InfluenceDashboard /></MainLayout></ProtectedRoute>} />
        <Route path="/campaign-dashboard" element={<ProtectedRoute><MainLayout><CampaignDashboard /></MainLayout></ProtectedRoute>} />
        <Route path="/campaign-overview" element={<ProtectedRoute><MainLayout><CampaignOverview /></MainLayout></ProtectedRoute>} />
        <Route path="/ai-recommendation-dashboard" element={<ProtectedRoute><MainLayout><AIRecommendationDashboard /></MainLayout></ProtectedRoute>} />
        <Route path="/regulatory-risk-dashboard" element={<ProtectedRoute><MainLayout><RegulatoryRiskDashboard /></MainLayout></ProtectedRoute>} />
        <Route path="/regulatory-dashboard" element={<ProtectedRoute><MainLayout><RegulatoryDashboard /></MainLayout></ProtectedRoute>} />
        <Route path="/search" element={<ProtectedRoute><MainLayout><Search /></MainLayout></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute><MainLayout><ManageUsers /></MainLayout></ProtectedRoute>} />
        <Route path="/smart-search" element={<ProtectedRoute><SmartSearch /></ProtectedRoute>} />
        <Route path="/search-results" element={<ProtectedRoute><SearchResultsScreen /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
