# AEGIX – Intelligence OSINT Platform

## 📦 Project Structure

```
├── backend
│   ├── api_server.py
│   ├── collectors
│   │   ├── AlertEngine.py
│   │   ├── CommunityDetector.py
│   │   ├── CommunityHeatAnalyzer.py
│   │   ├── EnrichUserProfiles.py
│   │   ├── IntelligenceReportGenerator.py
│   │   ├── LiveAlertEngine.py
│   │   ├── ReportGenerator.py
│   │   ├── SendIntelReportEmail.py
│   │   ├── SentimentAnnotator.py
│   │   ├── TopInfluencersAnalyzer.py
│   │   ├── UserActivityTracker.py
│   │   ├── UserConnectionsAnalyzer.py
│   │   ├── UserRiskScorer.py
│   │   ├── WeeklyHotKeywords.py
│   │   ├── db.py
├── frontend
│   ├── public
│   │   ├── data
│   │   │   ├── actor_profile.json
│   │   │   ├── search_config.json
│   │   │   ├── search_results_mock.json
│   ├── src
│   │   ├── assets
│   │   │   ├── logo.png
│   │   ├── components
│   │   │   ├── AI
│   │   │   │   ├── AIRecommendationDashboard.jsx
│   │   │   ├── Admin
│   │   │   │   ├── AlertDashboard.jsx
│   │   │   │   ├── AlertRulesConfig.jsx
│   │   │   │   ├── LogDetailsView.jsx
│   │   │   │   ├── ModuleAccessEditor.jsx
│   │   │   │   ├── SystemLogsDashboard.jsx
│   │   │   │   ├── UserManagementDashboard.jsx
│   │   │   │   ├── UserRoleEditor.jsx
│   │   │   ├── App.jsx
│   │   │   ├── Campaign
│   │   │   │   ├── CampaignDashboard.jsx
│   │   │   │   ├── CampaignOverview.jsx
│   │   │   ├── Crisis
│   │   │   │   ├── CrisisDashboard.jsx
│   │   │   ├── DarkWeb
│   │   │   │   ├── DarkWebMonitor.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Disinfo
│   │   │   │   ├── DisinfoMonitor.jsx
│   │   │   ├── Finance
│   │   │   │   ├── FinanceDashboard.jsx
│   │   │   ├── Groups
│   │   │   │   ├── GroupProfile.jsx
│   │   │   ├── Influence
│   │   │   │   ├── InfluenceDashboard.jsx
│   │   │   ├── MainLayout.jsx
│   │   │   ├── Narrative
│   │   │   │   ├── NarrativeDashboard.jsx
│   │   │   ├── Overview
│   │   │   │   ├── OverviewDashboard.jsx
│   │   │   ├── Regulatory
│   │   │   │   ├── RegulatoryDashboard.jsx
│   │   │   │   ├── RegulatoryRiskDashboard.jsx
│   │   │   ├── Search
│   │   │   │   ├── Search.jsx
│   │   │   │   ├── SearchResultsScreen.jsx
│   │   │   │   ├── SmartSearch.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Threat
│   │   │   │   ├── ActorCorrelationDashboard.jsx
│   │   │   │   ├── ActorProfile.jsx
│   │   │   │   ├── ThreatActorDashboard.jsx
│   │   ├── utils
│   │   │   ├── ProtectedRoute.jsx
```

## 🌐 Version

`AEGIX MVP v1.0 – April 2025`

## 📚 Modules

| Module | Path |
|--------|------|
| Dashboard | frontend/src/components/Dashboard.jsx |
| App | frontend/src/components/App.jsx |
| Sidebar | frontend/src/components/Sidebar.jsx |
| MainLayout | frontend/src/components/MainLayout.jsx |
| NarrativeDashboard | frontend/src/components/Narrative/NarrativeDashboard.jsx |
| FinanceDashboard | frontend/src/components/Finance/FinanceDashboard.jsx |
| CrisisDashboard | frontend/src/components/Crisis/CrisisDashboard.jsx |
| ThreatActorDashboard | frontend/src/components/Threat/ThreatActorDashboard.jsx |
| ActorProfile | frontend/src/components/Threat/ActorProfile.jsx |
| ActorCorrelationDashboard | frontend/src/components/Threat/ActorCorrelationDashboard.jsx |
| DarkWebMonitor | frontend/src/components/DarkWeb/DarkWebMonitor.jsx |
| DisinfoMonitor | frontend/src/components/Disinfo/DisinfoMonitor.jsx |
| GroupProfile | frontend/src/components/Groups/GroupProfile.jsx |
| InfluenceDashboard | frontend/src/components/Influence/InfluenceDashboard.jsx |
| OverviewDashboard | frontend/src/components/Overview/OverviewDashboard.jsx |
| CampaignDashboard | frontend/src/components/Campaign/CampaignDashboard.jsx |
| CampaignOverview | frontend/src/components/Campaign/CampaignOverview.jsx |
| AIRecommendationDashboard | frontend/src/components/AI/AIRecommendationDashboard.jsx |
| RegulatoryRiskDashboard | frontend/src/components/Regulatory/RegulatoryRiskDashboard.jsx |
| RegulatoryDashboard | frontend/src/components/Regulatory/RegulatoryDashboard.jsx |
| Search | frontend/src/components/Search/Search.jsx |
| SmartSearch | frontend/src/components/Search/SmartSearch.jsx |
| SearchResultsScreen | frontend/src/components/Search/SearchResultsScreen.jsx |
| UserManagementDashboard | frontend/src/components/Admin/UserManagementDashboard.jsx |
| UserRoleEditor | frontend/src/components/Admin/UserRoleEditor.jsx |
| SystemLogsDashboard | frontend/src/components/Admin/SystemLogsDashboard.jsx |
| LogDetailsView | frontend/src/components/Admin/LogDetailsView.jsx |
| AlertDashboard | frontend/src/components/Admin/AlertDashboard.jsx |
| AlertRulesConfig | frontend/src/components/Admin/AlertRulesConfig.jsx |
| ModuleAccessEditor | frontend/src/components/Admin/ModuleAccessEditor.jsx |
| ProtectedRoute | frontend/src/utils/ProtectedRoute.jsx |
| api_server | backend/api_server.py |
| AlertEngine | backend/collectors/AlertEngine.py |
| CommunityDetector | backend/collectors/CommunityDetector.py |
| CommunityHeatAnalyzer | backend/collectors/CommunityHeatAnalyzer.py |
| EnrichUserProfiles | backend/collectors/EnrichUserProfiles.py |
| IntelligenceReportGenerator | backend/collectors/IntelligenceReportGenerator.py |
| LiveAlertEngine | backend/collectors/LiveAlertEngine.py |
| ReportGenerator | backend/collectors/ReportGenerator.py |
| SendIntelReportEmail | backend/collectors/SendIntelReportEmail.py |
| SentimentAnnotator | backend/collectors/SentimentAnnotator.py |
| TopInfluencersAnalyzer | backend/collectors/TopInfluencersAnalyzer.py |
| UserActivityTracker | backend/collectors/UserActivityTracker.py |
| UserConnectionsAnalyzer | backend/collectors/UserConnectionsAnalyzer.py |
| UserRiskScorer | backend/collectors/UserRiskScorer.py |
| WeeklyHotKeywords | backend/collectors/WeeklyHotKeywords.py |
| db | backend/collectors/db.py |