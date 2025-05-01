# ✅ קובץ חדש: core/api/alerts_api.py

from flask import Blueprint, jsonify
from core.alert_engine.alert_storage import get_all_alerts

alerts_api = Blueprint("alerts_api", __name__)

@alerts_api.route("/api/alerts", methods=["GET"])
def get_alerts():
    alerts = get_all_alerts()
    return jsonify(alerts)
