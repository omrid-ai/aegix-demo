import json
from collections import Counter
from analytics.influence_score_calculator import calculate_influence_score

class SocialInfluenceAnalyzer:
    def __init__(self, user_activity_data):
        self.user_activity_data = user_activity_data

    def analyze(self):
        influence_results = []
        for user in self.user_activity_data:
            score = calculate_influence_score(user)
            influence_results.append({
                "username": user.get("username"),
                "messages_sent": user.get("messages_sent"),
                "groups_count": len(user.get("groups", [])),
                "mentions": user.get("mentions", 0),
                "influence_score": score
            })
        return sorted(influence_results, key=lambda x: x["influence_score"], reverse=True)
