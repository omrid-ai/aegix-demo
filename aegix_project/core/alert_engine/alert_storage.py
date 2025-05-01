# core/alert_engine/alert_storage.py

# אחסון פשוט בזיכרון בלבד
alert_store = []

def store_alert(alert):
    alert_store.append(alert)
    print(f"[ALERT STORED] {alert['message']}")

def get_all_alerts():
    return alert_store
