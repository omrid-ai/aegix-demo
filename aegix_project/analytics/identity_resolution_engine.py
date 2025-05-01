def calculate_match_score(user1, user2):
    score = 0
    if user1["username"][:4] == user2["username"][:4]:
        score += 50
    if user1["bio"] == user2["bio"]:
        score += 30
    if user1["location"] == user2["location"]:
        score += 20
    return score
