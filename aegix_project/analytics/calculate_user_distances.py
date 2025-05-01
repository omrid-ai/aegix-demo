
from geopy.distance import geodesic

def calculate_user_distances(users, center_location):
    distances = []
    for user in users:
        user_location = user.get("location")
        if user_location:
            distance_km = geodesic(center_location, user_location).kilometers
            distances.append({
                "user1": user["id"],
                "user2": "Tel Aviv",
                "distance": round(distance_km, 2)
            })
    return distances
