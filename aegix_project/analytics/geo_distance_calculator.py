from geopy.distance import geodesic

def calculate_user_distances(users, center_location):
    """
    מחשב מרחק בין כל משתמש למיקום מרכזי (כמו תל אביב).
    """
    enriched_users = []
    for user in users:
        user_location = user.get("location")
        if not user_location:
            continue
        distance_km = geodesic(center_location, user_location).km
        enriched_users.append({
            "id": user.get("id"),
            "location": user_location,
            "distance_km": distance_km
        })
    return enriched_users
