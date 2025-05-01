def generate_alerts(risk_items):
    """
    יוצר התראות עבור פריטים עם סיכון גבוה מ-0.7
    """
    alerts = []
    for item in risk_items:
        if item.get("risk_score", 0) >= 0.7:
            alert = {
                "message": item.get("message_text", ""),
                "risk_score": item.get("risk_score"),
                "group_id": item.get("group_id", "N/A"),
                "time": item.get("timestamp", "")
            }
            alerts.append(alert)
    return alerts
