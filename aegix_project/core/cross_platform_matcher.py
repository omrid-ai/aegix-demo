def match_users_across_platforms(profiles):
    matches = []
    for user in profiles:
        if user["telegram"] and user["twitter"]:
            if user["telegram"].lower()[:4] == user["twitter"].lower()[:4]:
                matches.append({
                    "alias": user.get("alias", ""),
                    "telegram": user["telegram"],
                    "twitter": user["twitter"],
                    "match_score": 90
                })
    return matches
