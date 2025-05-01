# anomaly_trend_analysis.py
def build_trend(anomalies):
    from collections import Counter
    from datetime import datetime
    trend = Counter()
    for a in anomalies:
        date = datetime.strptime(a["time"], "%Y-%m-%d %H:%M:%S").date()
        trend[date] += 1
    return sorted(trend.items())
