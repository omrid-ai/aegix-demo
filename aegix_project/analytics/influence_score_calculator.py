def calculate_influence_score(user):
    # Weighted formula: Messages (0.3) + Groups (0.3) + Mentions (0.4)
    messages_weight = 0.3
    groups_weight = 0.3
    mentions_weight = 0.4

    messages = user.get("messages_sent", 0)
    groups = len(user.get("groups", []))
    mentions = user.get("mentions", 0)

    score = (messages * messages_weight) + (groups * groups_weight) + (mentions * mentions_weight)
    return round(score, 2)
