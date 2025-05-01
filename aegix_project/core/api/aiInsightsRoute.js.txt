// ✅ aiInsightsRoute.js
const express = require("express");
const router = express.Router();

// 📍 Fake AI logic - replace later with real NLP/trend engine
router.post("/insights", (req, res) => {
  const { results } = req.body;

  const trends = [];
  const anomalies = [];
  const recommendations = [];

  results.forEach((item) => {
    if (item.title.toLowerCase().includes("fraud")) {
      trends.push("Rising mentions of fraud in financial forums");
      recommendations.push("Monitor new group members for fraud schemes");
    }

    if (item.source === "Dark Web") {
      anomalies.push("Unusual activity detected in Dark Web sources");
      recommendations.push("Flag suspicious wallets for further investigation");
    }

    if (item.title.toLowerCase().includes("narrative")) {
      trends.push("Narrative manipulation campaign identified");
    }
  });

  res.json({ trends, anomalies, recommendations });
});

module.exports = router;
