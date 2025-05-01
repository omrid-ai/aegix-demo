def analyze_narrative_trends(messages):
    from collections import Counter
    trend_counter = Counter()
    for m in messages:
        trend_counter[m['topic']] += 1
    return trend_counter