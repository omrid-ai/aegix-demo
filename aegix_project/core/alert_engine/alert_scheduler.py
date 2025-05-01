# core/alert_engine/alert_scheduler.py

import time
from aegix_project.core.alert_engine.rules_config import alert_rules
from aegix_project.core.alert_engine.alert_storage import store_alert

# סימולציה של תוצאות מאנליזה
mock_data_batch = [
    {"title": "Fraudulent scheme on Twitter", "source": "Twitter", "risk_level": "Medium"},
    {"title": "High risk activity detected in crypto", "source": "Telegram", "risk_level": "High"},
    {"title": "Suspicious wallet on Dark Web", "source": "Dark Web", "risk_level": "Medium"},
]

def run_alert_engine():
    for item in mock_data_batch:
        for rule in alert_rules:
            if rule["condition"](item):
                alert = {
                    "rule_id": rule["id"],
                    "message": rule["message"](item),
                    "source": item["source"],
                    "title": item["title"],
                }
                store_alert(alert)

if __name__ == "__main__":
    print("⏱️ Alert Engine Started. Running every 10 seconds.\n")
    while True:
        run_alert_engine()
        time.sleep(10)
