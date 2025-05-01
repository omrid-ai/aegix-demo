# category_query_map.py

category_query_map = {
    "Finance": {
        "Fraud Detection": {
            "keywords": ["fraud", "money laundering", "suspicious transaction"],
            "sources": ["Telegram", "Dark Web", "Financial APIs"],
            "time_range": "30d"
        },
        "Anomaly Detection": {
            "keywords": ["anomaly", "irregular", "high risk"],
            "sources": ["Bank Records", "Transaction Logs"],
            "time_range": "7d"
        }
    },
    "Law Enforcement": {
        "Threat Monitoring": {
            "keywords": ["attack", "weapon", "bomb", "terror"],
            "sources": ["Telegram", "Social Media", "Deep Web"],
            "time_range": "14d"
        }
    }
}

def get_default_query(sector, category):
    return category_query_map.get(sector, {}).get(category, {
        "keywords": [],
        "sources": [],
        "time_range": "30d"
    })
