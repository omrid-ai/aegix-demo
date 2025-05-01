def analyze_leak_trends(leak_data):
    trend = {}
    for leak in leak_data:
        date = leak["date"]
        trend[date] = trend.get(date, 0) + 1
    return trend