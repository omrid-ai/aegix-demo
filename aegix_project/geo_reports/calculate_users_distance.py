from geo_distance_calculator import haversine_distance

def add_distances_to_users(users, center_lat, center_lon):
    for user in users:
        user_lat = user.get("lat")
        user_lon = user.get("lon")
        if user_lat is not None and user_lon is not None:
            distance = haversine_distance(center_lat, center_lon, user_lat, user_lon)
            user["distance"] = round(distance)
    return users
