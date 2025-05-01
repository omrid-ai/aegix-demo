# run_combined_report.py

from generate_geo_report import generate_geo_report
from generate_geo_map import generate_geo_map
from generate_combined_report import generate_combined_html_report

# נתוני מיקום לדוגמה
center_lat, center_lon = 32.0853, 34.7818  # תל אביב

# משתמשים לדוגמה
users = [
    {"username": "UserA", "lat": 32.0860, "lon": 34.7800},
    {"username": "UserB", "lat": 32.0900, "lon": 34.7750},
    {"username": "UserC", "lat": 32.0650, "lon": 34.7900},
    {"username": "UserD", "lat": 32.1500, "lon": 34.8500},
]

# שלב 1 – יצירת הדוח
generate_geo_report(center_lat, center_lon, users, output_file="geo_report.html")

# שלב 2 – יצירת המפה
generate_geo_map(center_lat, center_lon, users, output_file="geo_map.html")

# שלב 3 – יצירת דוח משולב עם קישור למפה
generate_combined_html_report("geo_report.html", "geo_map.html", output_file="geo_combined_report.html")
