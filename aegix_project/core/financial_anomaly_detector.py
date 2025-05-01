def detect_anomalies(transactions):
    anomalies = []
    for t in transactions:
        if t["amount"] > 10000:
            if t["amount"] > 60000:
                t["risk"] = "Critical"
            elif t["amount"] > 40000:
                t["risk"] = "High"
            else:
                t["risk"] = "Medium"
            anomalies.append(t)
    return anomalies
