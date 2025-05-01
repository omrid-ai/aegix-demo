import datetime
import random

def detect_crisis_events(data_stream):
    keywords = ["explosion", "earthquake", "shooting", "flood", "protest"]
    detected = []
    for item in data_stream:
        if any(keyword in item["text"].lower() for keyword in keywords):
            event = {
                "timestamp": item["timestamp"],
                "location": item["location"],
                "text": item["text"],
                "confidence": random.uniform(0.7, 0.99),
                "category": next((k for k in keywords if k in item["text"].lower()), "unknown")
            }
            detected.append(event)
    return detected
