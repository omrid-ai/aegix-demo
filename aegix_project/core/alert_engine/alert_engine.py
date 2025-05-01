# ✅ קובץ backend חדש ל-API התראות: alert_engine.py

from flask import Blueprint, jsonify
from datetime import datetime

alert_api = Blueprint("alert_api", __name__)

# דוגמאות סטטיות (בעתיד יוחלפו בחיבור למסד נתונים או cron)
ALERTS_LOG = [
    {
        "sector": "Finance",
        "category": "Fraud Detection",
        "type": "Anomaly Detected",
        "description": "Suspicious transaction pattern from multiple wallets.",
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    },
    {
        "sector": "Narrative Warfare",
        "category": "Disinformation",
        "type": "Narrative Surge",
        "description": "High engagement on false claims across multiple Telegram groups.",
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    },
    {
        "sector": "Threat Actors",
        "category": "Network Activity",
        "type": "Actor Resurfaced",
        "description": "Known threat actor returned to activity after 45 days.",
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }
]

@alert_api.route("/api/alerts/logs", methods=["GET"])
def get_alert_logs():
    return jsonify(ALERTS_LOG)
