def detect_narrative_change(topic, old_text, new_text):
    from difflib import SequenceMatcher
    score = SequenceMatcher(None, old_text, new_text).ratio()
    changed = score < 0.85
    return {
        "topic": topic,
        "old": old_text,
        "new": new_text,
        "similarity_score": score,
        "significant_change": changed
    }