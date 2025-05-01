import datetime
import random

def simulate_data_stream():
    texts = [
        "Explosion reported in downtown area",
        "Peaceful protest is happening now",
        "Heavy flooding near the riverbank",
        "Loud noises heard, possibly gunfire",
        "Earthquake tremors felt in the region"
    ]
    locations = [("New York", 40.71, -74.00), ("London", 51.51, -0.12), ("Tokyo", 35.68, 139.69)]
    stream = []
    now = datetime.datetime.now()
    for i in range(10):
        stream.append({
            "timestamp": now.isoformat(),
            "text": random.choice(texts),
            "location": random.choice(locations)
        })
    return stream
