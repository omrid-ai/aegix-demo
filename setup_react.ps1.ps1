# יצירת תיקיית הפרויקט
if (!(Test-Path "./frontend")) {
    npx create-react-app frontend
} else {
    Write-Host "⚠️ Folder 'frontend' already exists. Skipping create-react-app..." -ForegroundColor Yellow
}

# מחיקת תיקיות מיותרות
$toDelete = @("frontend/public", "frontend/src", "frontend/package-lock.json")
foreach ($item in $toDelete) {
    if (Test-Path $item) {
        Remove-Item -Recurse -Force $item
        Write-Host "🗑️ Deleted $item"
    }
}

# יצירת מבנה תיקיות חדש
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
    "frontend/public/data"
)

foreach ($folder in $folders) {
    if (!(Test-Path $folder)) {
        New-Item -ItemType Directory -Path $folder | Out-Null
        Write-Host "✅ Created: $folder"
    } else {
        Write-Host "✅ Already exists: $folder"
    }
}

Write-Host "✅ Setup complete! Run 'cd frontend && npm start'" -ForegroundColor Green
