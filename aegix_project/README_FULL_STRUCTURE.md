
# AEGIX – Autonomous Intelligence – BUILT FOR BUSINESS

AEGIX is a modular OSINT-based platform for monitoring, detecting, and responding to digital threats in real time.
It features powerful AI capabilities tailored to intelligence use cases across business, security, and regulatory environments.
## 🧠 Smart Category Search

AEGIX supports **Smart Search by Sector and Category**, allowing users to:

- Choose a sector (e.g., Finance, Law Enforcement, Journalism)
- Pick a specific sub-category (e.g., Fraud Detection, Election Monitoring)
- Instantly run a tailored OSINT query using predefined keywords and data sources
- Optionally customize keywords before executing

### 📍 Accessing Smart Search

Navigate to:

```
/category-search/<sector>/<category>
```

Examples:

- `/category-search/Financial%20Monitoring/Fraud%20Detection`
- `/category-search/Communication%20and%20Journalism/Fake%20News%20Monitoring`

Also accessible via the sidebar:  
**🧠 Smart Category Search**

### 🧪 API: `GET /api/default-query`

Retrieve default keywords and sources for any sector/category combination.

**Endpoint:**
```
GET /api/default-query?sector=<sector>&category=<category>
```

**Example:**
```
GET /api/default-query?sector=Financial%20Monitoring&category=Fraud%20Detection
```

**Response:**
```json
{
  "keywords": ["fraud", "money laundering", "fake invoice"],
  "sources": ["Telegram", "Dark Web", "Financial APIs"],
  "time_range": "30d"
}
```

## 📁 Project Structure

```
AEGIX_PROJECT/
├── frontend/
│   └── src/
│       ├── App.jsx
│       ├── index.js
│       ├── utils/
│       │   ├── ProtectedRoute.jsx
│       │   ├── hasAccess.js
│       │   └── currentUser.js
│       ├── components/
│       │   ├── Search/
│       │   │   └── CategorySearchScreen.jsx
│       │   ├── Admin/
│       │   │   ├── UserManagementDashboard.jsx
│       │   │   ├── UserRoleEditor.jsx
│       │   │   ├── SystemLogsDashboard.jsx
│       │   │   ├── LogDetailsView.jsx
│       │   │   ├── AlertDashboard.jsx
│       │   │   ├── AlertRulesConfig.jsx
│       │   │   └── ModuleAccessEditor.jsx
│       │   ├── Realtime/
│       │   │   ├── RealtimeTrendsDashboard.jsx
│       │   │   ├── RealtimeThreatFeed.jsx
│       │   │   └── ThreatItemCard.jsx
│       │   ├── StrategicAsset/
│       │   │   ├── AssetRiskDashboard.jsx
│       │   │   ├── AssetMentionTimeline.jsx
│       │   │   ├── AssetRelationshipGraph.jsx
│       │   │   ├── AssetExposureAlerts.jsx
│       │   │   └── AssetReportExport.jsx
│       │   ├── ChatIntelligence/
│       │   │   ├── ChatSummaryDashboard.jsx
│       │   │   ├── ChatSentimentRadar.jsx
│       │   │   ├── MessageClusterView.jsx
│       │   │   ├── KeyHighlightsPanel.jsx
│       │   │   ├── ChatExportReport.jsx
│       │   │   └── NLPTrendTimeline.jsx
│       │   ├── Search/
│       │   │   ├── CategorySearchScreen.jsx
│       │   │   ├── SearchResultsScreen.jsx
│       │   │   └── AIInsightsPanel.jsx
│       │   ├── Regulatory/
│       │   │   ├── RegulatoryRiskDashboard.jsx
│       │   │   ├── RegulationTrendTimeline.jsx
│       │   │   ├── RegulationSourceTable.jsx
│       │   │   ├── RegulationImpactRadar.jsx
│       │   │   ├── RegulationExportReport.jsx
│       │   │   └──RegulatoryRiskInsightsPanel.jsx
│       │   ├── Broadcast/
│       │   │   ├── BroadcastManipulationDashboard.jsx
│       │   │   ├── BroadcastSpreadGraph.jsx
│       │   │   └── BroadcastDetails.jsx
│       │   ├── RiskTrendTimeline.jsx
│       │   ├── NarrativeDashboard.jsx
│       │   ├── FinanceDashboard.jsx
│       │   ├── ThreatActorDashboard.jsx
│       │   ├── CrisisDashboard.jsx
│       │   ├──AIRecommendationsPanel.jsx
│       │   ├── LiveFeedPanel.jsx
│       │   ├── Layout.jsx
│       │   ├── NotFound.jsx
│       │   ├── ReportExport.jsx
│       │   ├── Alerts/
│       │   │   └── AlertCenter.jsx
│       │   ├── context/
│       │   │   └── useUserContext.js	
│       │   ├── GroupSummaryView.jsx
│       │   ├── GeoHeatmapView.jsx
│       │   ├── AIRiskReportBuilder.jsx
│       │   ├── RealTimeMonitor.jsx
│       │   ├── GlobalSearch.jsx
│       │   ├── GroupDetails.jsx
│       │   ├── GroupMembersView.jsx
│       │   ├── GroupTimelineView.jsx
│       │   ├── GroupLiveActivity.jsx
│       │   ├── UserProfileView.jsx
│       │   ├── ReportCenter.jsx
│       │   ├── GeoAnalyticsMap.jsx
│       │   ├── GroupDrillDown.jsx
│       │   ├── UserAnalysis.jsx
│       │   ├── Dashboard.jsx
│       │   ├── Login.jsx
│       │   ├── TopBar.jsx
│       │   ├── AdminSettingsPanel.jsx
│       │   ├── SocialInfluencePanel.jsx
│       │   ├── Sidebar.jsx
│       │   ├── SocialGraphExplorer.jsx
│       │   ├── InfluenceAlerts.jsx
│       │   ├── InfluenceTrendGraph.jsx
│       │   ├── InfluenceOverviewDashboard.jsx
│       │   ├── InfluenceAlertsPanel.jsx
│       │   ├── InfluenceGraphRelations.jsx
│       │   ├── InfluenceDrillView.jsx
│       │   ├── InfluenceHeatmapView.jsx
│       │   ├── InfluenceCompareUsers.jsx
│       │   ├── InfluenceByGroupMap.jsx
│       │   ├── InfluencerDetectionReport.jsx
│       │   ├── ExportInfluencePDFButton.jsx
│       │   ├── InfluenceTrendChart.jsx
│       │   ├── InfluenceHeatmapDailyLang.jsx
│       │   ├── DisinfoMonitorPanel.jsx
│       │   ├── DisinfoTrendTimeline.jsx
│       │   ├── DisinfoReportCenter.jsx
│       │   ├── DisinfoMapReport.jsx
│       │   ├── HeatmapView.jsx
│       │   ├── InfluenceTrendView.jsx
│       │   ├── DataLeakDashboard.jsx
│       │   ├── LeakSourcesMap.jsx
│       │   ├── LeakSamplesTable.jsx
│       │   ├── LeakExportReport.jsx
│       ├── ThreatActors/
│       │   ├── ThreatActorDashboard.jsx
│       │   ├── ThreatActorProfile.jsx
│       │   ├── ActorRiskMatrix.jsx
│       │   ├── ActorNetworkGraph.jsx
│       │   ├── ActorActivityTimeline.jsx
│       │   ├── ActorExportReport.jsx
│       ├── HostileCampaign/
│       │   ├── HostileCampaignDashboard.jsx
│       │   ├── CampaignProfile.jsx
│       │   ├── CampaignSpreadHeatmap.jsx
│       │   ├── CampaignTrendTimeline.jsx
│       │   ├── CampaignOverview.jsx
│       │   ├── CampaignAlerts.jsx
│       │   ├── CampaignExportReport.jsx
│       ├── NarrativeT/
│       │   ├── NarrativeDetectorDashboard.jsx
│       │   ├── NarrativeTrendTimeline.jsx
│       │   ├── NarrativeTopicClusters.jsx
│       │   ├── NarrativeGeoMap.jsx
│       │   └── NarrativeExportReport.jsx
│       ├── CrisisResponseDashboard.jsx
│       ├── CrisisLiveFeed.jsx
│       ├── CrisisHeatmapView.jsx
│       ├── CrisisTimeline.jsx
│       ├── CrisisReportExport.jsx
│       ├── Financial/
│       │  ├── FinancialAnomalyDashboard.jsx
│       │  ├── SuspiciousWalletsTable.jsx
│       │  ├── TransactionPatternGraph.jsx
│       │  ├── AnomalyTimeline.jsx
│       │  └── AnomalyExportReport.jsx
│       ├── InsiderRiskDashboard.jsx
│       ├── InsiderRisk/
│       │   ├── InsiderActivityTimeline.jsx
│       │   ├── InsiderExportReport.jsx
│       │   └── InsiderProfileDetails.jsx
│       ├── ActorCorrelationDashboard.jsx
│       │   ├── ActorIdentityMatches.jsx
│       │   ├── ActorPlatformMap.jsx
│       │   ├── ActorCorrelationTimeline.jsx
│       │   └── ActorCorrelationExport.jsx
│       ├── ui/
│       │   ├── Card.jsx
│       │   ├── Input.jsx
│       │   ├── Button.jsx
│       │   ├── Table.jsx
│       │   ├── Select.jsx
│       │   ├── Textarea.jsx
│       │   ├── Modal.jsx
│       │   ├── Alert.jsx
│       │   └── NotificationPanel.jsx
│       ├── config/
│       │   └── UserRolesPermissions.js
├── fonts/
│   └── NotoSansHebrew-Regular.ttf/
├── public/
│   ├── index.html
│   └── data/
│       ├── disinfo_report.json
├── geo_reports/
│   ├── run_combined_report.py
│   ├── generate_combined_report.py
│   ├── run_geo_map.py
│   ├── generate_geo_map.py
│   ├── run_geo_report.py
│   ├── generate_geo_report.py
│   ├── calculate_users_distance.py
├── tools/
│   └── TelegramGeoLocator.py
├── export/
│   ├── report_generator.py
│   ├── report_exporter.py
│   ├── ExportData.py
│   ├── AdminAccessExport.py
│   ├── influence_report_exporter.py
│   ├── narrative_report_exporter.py
│   └── financial_report_exporter.py
├── analytics/
│   ├── geo_distance_calculator.py
│   ├── cleaning_pipeline.py
│   ├── real_time_threat_detection.py
│   ├── data_enrichment_and_analysis.py
│   ├── influence_score_calculator.py
│   ├── narrative_trend_analysis.py
│   ├── crisis_timeline_generator.py
│   ├── geo_crisis_mapper.py
│   ├── transaction_pattern_analysis.py
│   ├── anomaly_score_calculator.py
│   ├── leak_trend_analysis.py
│   ├── leak_severity_score.py
│   ├── risk_assessor.py
│   └── identity_resolution_engine.py
├── core/
│   ├── config/
│   │   └── category_query_map.py
│   └── api/
│   │   ├── default_query_api.py
│   │   ├── search_query_api.py
│   │   ├── realtime_routes.py
│   │   ├── regulatory_routes.py
│   │   └── broadcast_routes.py
│   └── alert_engine/
│   │   ├── __init__.py
│   │   ├── rules_config.py
│   │   ├── alert_engine.py
│   │   ├── alert_scheduler.py
│   │   └── alert_storage.py
│   ├── realtime_feed_engine.py
│   ├── regulatory_insights_engine.py
│   ├── incident_response_service.py
│   ├── entity_extractor.py
│   ├── incident_response_automation.py
│   ├── risk_assessment_and_management.py
│   ├── threat_detection_and_response.py
│   ├── intelligence_gathering.py
│   ├── risk_assessment_tool.py
│   ├── user_activity_analysis.py
│   ├── telegram_group_monitoring.py
│   ├── telegram_user_tracking.py
│   ├── social_influence_analysis.py
│   ├── hostile_campaign_detector.py
│   ├── narrative_detection_engine.py
│   ├── crisis_event_detector.py
│   ├── crisis_data_streamer.py
│   ├── financial_anomaly_detector.py
│   ├── wallet_activity_monitor.py
│   ├── data_leak_scanner.py
│   ├── credential_linker.py
│   └── cross_platform_matcher.py
├── data/
│   └── random_forest_model.pkl
├── setting/
│   └── config.py
├── requirements.txt
├── .env
└── README.md
```

## ✅ Getting Started

1. **Clone the repo**
```bash
git clone https://github.com/your-org/aegix-intelligence.git
```

2. **Install dependencies**
```bash
pip install -r requirements.txt
```

3. **Set up environment**
Create a `.env` file and configure values such as:
```
DEBUG=True
API_KEY=your_key_here
TELEGRAM_BOT_TOKEN=your_bot_token
DB_USER=postgres
DB_PASSWORD=password
```

4. **Run backend logic**
```bash
python main.py
```

5. **Start frontend**
Navigate to `frontend/` and use your React build tool (e.g., Vite, CRA).

---
## 🧠 Modules by Sector

| Sector                 | Capabilities                                                                 | Module(s)                             |
|------------------------|------------------------------------------------------------------------------|----------------------------------------|
| Finance & AML          | Transaction anomalies, crypto wallet detection                               | FinancialAnomalyDashboard, SuspiciousWalletsTable, TransactionPatternGraph |
| Insider Threats        | Suspicious employee behavior, leak risk detection                            | InsiderRiskDashboard, InsiderActivityTimeline |
| Narrative Warfare      | Topic tracking, cluster detection, geo narratives                            | NarrativeDetectorDashboard             |
| Disinformation         | Telegram group monitoring, geolocated risks                                  | DisinfoReportCenter                    |
| Influence Ops          | Score trends, heatmaps, influencer detection                                 | InfluenceOverviewDashboard, InfluenceTrendChart, InfluenceHeatmapView |
| Threat Actors          | Activity overview, actor correlation, network links                          | ThreatActorDashboard, ActorRiskMatrix  |
| Campaigns              | Hostile cluster overview, timeline, alerts                                   | CampaignOverview, CampaignAlerts       |
| Crisis Response        | Real-time feed, heatmap, timeline                                            | CrisisResponseDashboard, CrisisTimeline |
| Cross-Platform Intel   | Multi-platform user correlations (Telegram, X, forums)                       | ActorCorrelationDashboard, ActorIdentityMatches |
| Data Leak Hunting      | Exposure of credentials, internal documents in open forums/groups            | DataLeakDashboard, LeakSamplesTable    |
| Chat Intelligence      | Summarizes Telegram/forum chats, sentiment, key messages                     | ChatSummaryDashboard, ChatSentimentRadar, MessageClusterView, KeyHighlightsPanel, ChatExportReport |
| System Administration  | User roles, access control, alerts config, system logs                       | UserManagementDashboard, UserRoleEditor, ModuleAccessEditor, AlertDashboard, SystemLogsDashboard |
| Strategic Asset Protection | Monitoring asset-related risks, mentions, exposure alerts            | AssetRiskDashboard, AssetMentionTimeline, AssetRelationshipGraph, AssetExposureAlerts, AssetReportExport |

---

Built with ❤️ by the AEGIX Intelligence team  
omri de garcia







## 🧠 Modules by Sector

| Sector                 | Capabilities                                                                 | Module(s)                             |
|------------------------|------------------------------------------------------------------------------|----------------------------------------|
| Finance & AML          | Transaction anomalies, crypto wallet detection                               | FinancialAnomalyDashboard, SuspiciousWalletsTable, TransactionPatternGraph |
| Insider Threats        | Suspicious employee behavior, leak risk detection                           | InsiderRiskDashboard, InsiderActivityTimeline |
| Narrative Warfare      | Topic tracking, cluster detection, geo narratives                           | NarrativeDetectorDashboard             |
| Disinformation         | Telegram group monitoring, geolocated risks                                 | DisinfoReportCenter                    |
| Influence Ops          | Score trends, heatmaps, influencer detection                                | InfluenceOverviewDashboard, InfluenceTrendChart, InfluenceHeatmapView |
| Threat Actors          | Activity overview, actor correlation, network links                         | ThreatActorDashboard, ActorRiskMatrix  |
| Campaigns              | Hostile cluster overview, timeline, alerts                                  | CampaignOverview, CampaignAlerts       |
| Crisis Response        | Real-time feed, heatmap, timeline                                           | CrisisResponseDashboard, CrisisTimeline |
| Cross-Platform Intel   | Multi-platform user correlations (Telegram, X, forums)                      | ActorCorrelationDashboard, ActorIdentityMatches |
| Data Leak Hunting      | Exposure of credentials, internal documents in open forums/groups           | DataLeakDashboard, LeakSamplesTable    |
| System Administration  | User roles, access control, alerts config, system logs                      | UserManagementDashboard, UserRoleEditor, ModuleAccessEditor, AlertDashboard, AlertRulesConfig, SystemLogsDashboard, LogDetailsView |
| Strategic Asset Protection | Monitoring asset-related risks, mentions, exposure alerts               | AssetRiskDashboard, AssetMentionTimeline, AssetRelationshipGraph, AssetExposureAlerts, AssetReportExport |
| Chat Intelligence      | Summarizes Telegram/forum chats, sentiment, key messages                    | ChatSummaryDashboard, ChatSentimentRadar, MessageClusterView, KeyHighlightsPanel, NLPTrendTimeline, ChatExportReport |
| Alert Engine          | Rule-based event triggering and alert logging                | AlertDashboard, alert_engine/alert_storage.py |
| Alert Engine          | Scheduled detection and custom triggers                      | AlertDashboard (React), alert_engine/*.py (Flask) |
| System Administration  | User roles, access control, alerts config, system logs | UserManagementDashboard, UserRoleEditor,<br/>ModuleAccessEditor, AlertDashboard,<br/>AlertRulesConfig, SystemLogsDashboard, LogDetailsView |
Realtime OSINT	Real-time threat trend detection, heatmapping	RealtimeTrendsDashboard
| Regulation & Legal     | Monitoring policy updates and regulatory impact               | RegulatoryRiskDashboard, RegulationTrendTimeline, RegulationSourceTable |

---

Built with ❤️ by the AEGIX Intelligence team.  
omri de garcia

## 🧠 Modules by Sector

| Sector                 | Capabilities                                                                 | Module(s)                             |
|------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Finance & AML          | Transaction anomalies, crypto wallet detection                               | FinancialAnomalyDashboard, SuspiciousWalletsTableת TransactionPatternGraph                  |
| Insider Threats        | Suspicious employee behavior, leak risk detection                           | InsiderRiskDashboard, InsiderActivityTimeline                                               |
| Narrative Warfare      | Topic tracking, cluster detection, geo narratives                           | NarrativeDetectorDashboard                                                                  |
| Disinformation         | Telegram group monitoring, geolocated risks                                 | DisinfoReportCenter                                                                         |
| Influence Ops          | Score trends, heatmaps, influencer detection                                | InfluenceOverviewDashboard, InfluenceTrendChart, InfluenceHeatmapView                       |
| Threat Actors          | Activity overview, actor correlation, network links                         | ThreatActorDashboard, ActorRiskMatrix                                                       |
| Campaigns              | Hostile cluster overview, timeline, alerts                                  | CampaignOverview, CampaignAlerts                                                            |
| Crisis Response        | Real-time feed, heatmap, timeline                                           | CrisisResponseDashboard, CrisisTimeline                                                     |
| Cross-Platform Intel   | Multi-platform user correlations (Telegram, X, forums)                      | ActorCorrelationDashboard, ActorIdentityMatches                                             |
| Data Leak Hunting      | Exposure of credentials, internal documents in open forums/groups           | DataLeakDashboard, LeakSamplesTable                                                         |
| System Administration  | User roles, access control, alerts config, system logs                      | UserManagementDashboard, UserRoleEditor,<br/>ModuleAccessEditor, AlertDashboard,<br/>AlertRulesConfig, SystemLogsDashboard, LogDetailsView |
| Strategic Asset Protection | Monitoring asset-related risks, mentions, exposure alerts   | AssetRiskDashboard, AssetMentionTimeline, AssetRelationshipGraph, AssetExposureAlerts, AssetReportExport |
| Chat Intelligence     | Summarizes Telegram/forum chats, sentiment, key messages         | ChatSummaryDashboard, ChatSentimentRadar, MessageClusterView, KeyHighlightsPanel, NLPTrendTimeline, ChatExportReport |
Realtime OSINT	        |   Real-time threat trend detection,                                           |heatmapping RealtimeTrendsDashboard
| Regulation & Legal    | Monitoring policy updates and regulatory impact                  | RegulatoryRiskDashboard, RegulationTrendTimeline, RegulationSourceTable |

