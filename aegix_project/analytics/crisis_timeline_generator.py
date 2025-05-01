from collections import defaultdict

def generate_crisis_timeline(events):
    timeline = defaultdict(list)
    for event in events:
        date = event["timestamp"].split("T")[0]
        timeline[date].append(event)
    return dict(timeline)
