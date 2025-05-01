def map_crisis_to_geo(events):
    mapped = []
    for e in events:
        mapped.append({
            "lat": e["location"][1],
            "lon": e["location"][2],
            "category": e["category"],
            "confidence": e["confidence"]
        })
    return mapped
