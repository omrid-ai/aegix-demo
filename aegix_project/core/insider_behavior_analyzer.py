def analyze_behavior(logs):
    flagged_users = []
    for log in logs:
        if log['message_count'] > 80 and log['suspicious_terms'] > 2:
            flagged_users.append({
                "username": log['username'],
                "group": log['group'],
                "messages": log['message_count'],
                "risk_score": 95 if log['suspicious_terms'] > 5 else 80,
                "status": "Critical" if log['suspicious_terms'] > 5 else "Flagged"
            })
    return flagged_users