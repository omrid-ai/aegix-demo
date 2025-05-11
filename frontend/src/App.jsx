
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
import ContentRemovalDashboard from "./components/ContentRemoval/ContentRemovalDashboard";
import ContentRemovalForm from "./components/ContentRemoval/ContentRemovalForm";
import DashboardOverview from "@/components/DashboardOverview";
import NewsAnalyticsDashboard from "@/components/News/NewsAnalyticsDashboard";

// Avatar Suite
import AvatarAdminPanel from "./components/Admin/AvatarAdminPanel";
import AvatarManager from "./components/AvatarSuite/AvatarManager";
import PersonaProfileEditor from "./components/AvatarSuite/PersonaProfileEditor";
import AvatarRiskDashboard from "./components/AvatarSuite/AvatarRiskDashboard";
import AvatarSchedulerDashboard from "./components/AvatarSuite/AvatarSchedulerDashboard";
import PostTimeline from "./components/AvatarSuite/PostTimeline";
import PostArchive from "./components/AvatarSuite/PostArchive";

// Company Analysis
import CompanyProfileView from "./components/CompanyAnalysis/CompanyProfileView";
import CompetitorMapPanel from "./components/CompanyAnalysis/CompetitorMapPanel";
import EmployeeRiskScanner from "./components/CompanyAnalysis/EmployeeRiskScanner";
import ExportReport from "./components/CompanyAnalysis/ExportReport";
import LegalExposurePanel from "./components/CompanyAnalysis/LegalExposurePanel";
import NarrativeMonitor from "./components/CompanyAnalysis/NarrativeMonitor";
import ProductSentimentDashboard from "./components/CompanyAnalysis/ProductSentimentDashboard";
import EmployeeProfileView from "@/components/CompanyAnalysis/EmployeeProfileView";
import CompanyRiskOverview from "@/components/CompanyAnalysis/CompanyRiskOverview";
import GlobalEmployeeNetwork from "@/components/CompanyAnalysis/GlobalEmployeeNetwork";
import GeoRiskHeatmap from "@/components/CompanyAnalysis/GeoRiskHeatmap";
import AIEmployeeInsights from "@/components/CompanyAnalysis/AIEmployeeInsights";
import EmployeeNarrativeMonitor from "@/components/CompanyAnalysis/EmployeeNarrativeMonitor";
import BlockchainAnomalyDashboard from "./components/Blockchain/BlockchainAnomalyDashboard";
import WalletHeatmap from "./components/Blockchain/WalletHeatmap";
import WalletProfile from "./components/Blockchain/WalletProfile";
import WalletExportReport from "./components/Blockchain/WalletExportReport";
import LiveWalletScanner from "./components/Blockchain/LiveWalletScanner";
import WalletConnectionsGraph from "./components/Blockchain/WalletConnectionsGraph";
import WalletIntelDashboard from "@/components/Blockchain/WalletIntelDashboard";
import CompanyNewsView from "@/components/Intelligence/CompanyNewsView";
import CompanyNewsDashboard from "./components/CompanyAnalysis/CompanyNewsDashboard";
import CryptoMarketDashboard from "./components/Blockchain/CryptoMarketDashboard";
import CryptoMarket from "./components/CryptoMarket";
import InvestigationCenter from "./components/CompanyAnalysis/InvestigationCenter";
import RegulatoryIntelDashboard from "@/components/Regulatory/RegulatoryIntelDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><MainLayout><Dashboard /></MainLayout></ProtectedRoute>} />
        <Route path="/overview-dashboard" element={<ProtectedRoute><DashboardOverview /></ProtectedRoute>} />
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
        <Route path="/content-removal" element={<ProtectedRoute><MainLayout><ContentRemovalDashboard /></MainLayout></ProtectedRoute>} />
        <Route path="/content-removal/new" element={<ProtectedRoute><MainLayout><ContentRemovalForm /></MainLayout></ProtectedRoute>} />
        <Route path="/news-insights" element={<ProtectedRoute><NewsAnalyticsDashboard /></ProtectedRoute>} />
        <Route path="/admin/avatar-suite" element={<ProtectedRoute><MainLayout><AvatarAdminPanel /></MainLayout></ProtectedRoute>} />
        <Route path="/admin/avatar-suite/manager" element={<ProtectedRoute><MainLayout><AvatarManager /></MainLayout></ProtectedRoute>} />
        <Route path="/admin/avatar-suite/profile-editor" element={<ProtectedRoute><MainLayout><PersonaProfileEditor /></MainLayout></ProtectedRoute>} />
        <Route path="/admin/avatar-suite/risk-dashboard" element={<ProtectedRoute><MainLayout><AvatarRiskDashboard /></MainLayout></ProtectedRoute>} />
        <Route path="/admin/avatar-suite/scheduler" element={<ProtectedRoute><MainLayout><AvatarSchedulerDashboard /></MainLayout></ProtectedRoute>} />
        <Route path="/admin/avatar-suite/timeline" element={<ProtectedRoute><MainLayout><PostTimeline /></MainLayout></ProtectedRoute>} />
        <Route path="/admin/avatar-suite/archive" element={<ProtectedRoute><MainLayout><PostArchive /></MainLayout></ProtectedRoute>} />
        <Route path="/company-profile" element={<ProtectedRoute><MainLayout><CompanyProfileView /></MainLayout></ProtectedRoute>} />
        <Route path="/competitor-map" element={<ProtectedRoute><MainLayout><CompetitorMapPanel /></MainLayout></ProtectedRoute>} />
        <Route path="/employee-risk" element={<ProtectedRoute><MainLayout><EmployeeRiskScanner /></MainLayout></ProtectedRoute>} />
        <Route path="/export-report" element={<ProtectedRoute><MainLayout><ExportReport /></MainLayout></ProtectedRoute>} />
        <Route path="/legal-risk" element={<ProtectedRoute><MainLayout><LegalExposurePanel /></MainLayout></ProtectedRoute>} />
        <Route path="/narrative-monitor" element={<ProtectedRoute><MainLayout><NarrativeMonitor /></MainLayout></ProtectedRoute>} />
        <Route path="/product-sentiment" element={<ProtectedRoute><MainLayout><ProductSentimentDashboard /></MainLayout></ProtectedRoute>} />
        <Route path="/employee/:id" element={<EmployeeProfileView />} />
        <Route path="/company-risk-overview" element={<ProtectedRoute><CompanyRiskOverview /></ProtectedRoute>} />
        <Route path="/global-network" element={<ProtectedRoute><GlobalEmployeeNetwork /></ProtectedRoute>} />
        <Route path="/geo-risk" element={<ProtectedRoute><GeoRiskHeatmap /></ProtectedRoute>} />
        <Route path="/ai-employee-insights" element={<ProtectedRoute><AIEmployeeInsights /></ProtectedRoute>} />
        <Route path="/narrative-monitor-employee" element={<ProtectedRoute><EmployeeNarrativeMonitor /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/blockchain-dashboard" element={<BlockchainAnomalyDashboard />} />
        <Route path="/wallet-heatmap" element={<WalletHeatmap />} />
        <Route path="/wallet-profile/:walletId" element={<WalletProfile />} />
        <Route path="/export-report/:walletId" element={<WalletExportReport />} />
        <Route path="/wallet-scanner" element={<LiveWalletScanner />} />
        <Route path="/wallet-intel/:walletAddress" element={<WalletIntelDashboard />} />
        <Route path="/wallet-intel" element={<WalletIntelDashboard walletAddress="0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae" />} />
        <Route path="/company-news" element={<ProtectedRoute><MainLayout><CompanyNewsView /></MainLayout></ProtectedRoute>} />
        <Route path="/company-news" element={<ProtectedRoute><MainLayout><CompanyNewsDashboard /></MainLayout></ProtectedRoute>} />
        <Route path="/crypto-market" element={<CryptoMarketDashboard />} />
        <Route path="/crypto-market" element={<CryptoMarket />} />
        <Route path="/investigation" element={<ProtectedRoute><MainLayout><InvestigationCenter /></MainLayout></ProtectedRoute>} />
        <Route path="/investigation-center" element={<InvestigationCenter />} />
        <Route path="/regulatory-intel" element={<ProtectedRoute><MainLayout><RegulatoryIntelDashboard /></MainLayout></ProtectedRoute>} />
        <Route path="/legal-exposure" element={<ProtectedRoute><MainLayout><LegalExposurePanel /></MainLayout></ProtectedRoute>} />

      </Routes>
    </Router>
  );
}

export default App;
