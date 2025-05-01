# 📁 core/realtime_feed_engine.py

import datetime

# Mock function for real-time OSINT sources (replace later with true integration)
def fetch_live_feeds():
def detect_realtime_trends(feed_data):
    return [
        {"source": "Telegram", "title": "Surge in scam bot activity", "timestamp": datetime.datetime.now()},
        {"source": "Dark Web", "title": "New crypto exchange leak posted", "timestamp": datetime.datetime.now()},
        {"source": "News", "title": "SEC warns on stablecoin usage", "timestamp": datetime.datetime.now()},
    ]

# Function to detect anomalies or trends from raw feeds
def detect_realtime_trends(feed_data):
    trends = []
    for entry in feed_data:
        if "scam" in entry["title"].lower():
            trends.append({
                "title": entry["title"],
                "category": "Fraud Risk",
                "source": entry["source"],
                "timestamp": entry["timestamp"].strftime("%Y-%m-%d %H:%M")
            })
        elif "leak" in entry["title"].lower():
            trends.append({
                "title": entry["title"],
                "category": "Data Exposure",
                "source": entry["source"],
                "timestamp": entry["timestamp"].strftime("%Y-%m-%d %H:%M")
            })
        elif "warns" in entry["title"].lower():
            trends.append({
                "title": entry["title"],
                "category": "Regulatory Alert",
                "source": entry["source"],
                "timestamp": entry["timestamp"].strftime("%Y-%m-%d %H:%M")
            })
    return trends
