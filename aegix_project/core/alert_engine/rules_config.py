# core/alert_engine/rules_config.py

# רשימת חוקי התראה: כל חוק כולל תנאי זיהוי וטקסט התראה
alert_rules = [
    {
        "id": 1,
        "name": "High Risk Mention",
        "condition": lambda item: item.get("risk_level") == "High",
        "message": lambda item: f"⚠️ High risk detected in {item.get('source', 'Unknown')}: {item.get('title')}"
    },
    {
        "id": 2,
        "name": "Keyword Match - Fraud",
        "condition": lambda item: "fraud" in item.get("title", "").lower(),
        "message": lambda item: f"💸 Fraud-related topic detected: {item.get('title')}"
    },
    {
        "id": 3,
        "name": "Suspicious Source - Dark Web",
        "condition": lambda item: item.get("source", "").lower() == "dark web",
        "message": lambda item: f"🕸️ Dark Web mention: {item.get('title')}"
    }
]
