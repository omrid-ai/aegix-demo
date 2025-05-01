# organize_project.ps1 - Setup folders and move files
$projectRoot = Get-Location

$folders = @(
  "frontend/src/components",
  "frontend/src/components/Admin",
  "frontend/src/components/StrategicAsset",
  "frontend/src/components/ChatIntelligence",
  "frontend/src/components/Search",
  "frontend/src/components/Regulatory",
  "frontend/src/components/Broadcast",
  "frontend/src/components/ThreatActors",
  "frontend/src/components/HostileCampaign",
  "frontend/src/components/NarrativeT",
  "frontend/src/components/Financial",
  "frontend/src/components/InsiderRisk",
  "frontend/src/components/ActorCorrelationDashboard",
  "frontend/src/components/ui",
  "frontend/public/data",
  "aegix_project/export",
  "aegix_project/analytics",
  "aegix_project/core/api",
  "aegix_project/core/alert_engine",
  "aegix_project/core/config"
)

foreach ($folder in $folders) {
  $fullPath = Join-Path $projectRoot $folder
  if (-not (Test-Path $fullPath)) {
