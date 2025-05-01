# run_geo_map.py
from generate_geo_map import generate_geo_map

# מיקום מרכזי לדוגמה
center_lat, center_lon = 32.0853, 34.7818  # תל אביב

# משתמשים לדוגמה
users = [
    {"username": "UserA", "lat": 32.0860, "lon": 34.7800},
    {"username": "UserB", "lat": 32.0900, "lon": 34.7750},
    {"username": "UserC", "lat": 32.0650, "lon": 34.7900},
    {"username": "UserD", "lat": 32.1500, "lon": 34.8500},
]

# יצירת מפה
generate_geo_map(center_lat, center_lon, users)
