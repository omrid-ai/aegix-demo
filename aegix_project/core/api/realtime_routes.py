# 📁 core/api/realtime_routes.py

from flask import Blueprint, jsonify
from core.realtime_feed_engine import fetch_live_feeds, detect_realtime_trends

realtime_api = Blueprint("realtime_api", __name__)

@realtime_api.route("/api/realtime/trends", methods=["GET"])
def get_realtime_trends():
    raw_feed = fetch_live_feeds()
    trends = detect_realtime_trends(raw_feed)
    return jsonify(trends)
