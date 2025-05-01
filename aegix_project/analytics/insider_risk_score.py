def calculate_risk_score(message_count, sensitive_flags):
    base_score = message_count * 0.5 + sensitive_flags * 15
    if base_score > 90:
        return "Critical"
    elif base_score > 70:
        return "High"
    elif base_score > 50:
        return "Medium"
    else:
        return "Low"