def assess_risks(clean_data):
    """
    מעריך את רמת הסיכון עבור כל הודעה לפי מילות מפתח חשודות.
    """
    suspicious_keywords = ["הונאה", "פישינג", "מתקפה", "סוס טרויאני", "וירוס", "ריגול"]

    for item in clean_data:
        text = item.get("message_text", "").lower()
        score = 0.0
        for keyword in suspicious_keywords:
            if keyword in text:
                score += 0.3
        item["risk_score"] = min(score, 1.0)  # מקסימום 1.0
    return clean_data
