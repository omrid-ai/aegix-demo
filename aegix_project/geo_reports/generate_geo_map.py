# generate_geo_map.py
import folium
from geo_distance_calculator import haversine_distance

def generate_geo_map(center_lat, center_lon, users, min_range_m=500, max_range_m=2000, output_file='geo_map.html'):
    # יצירת מפה עם מיקום מרכזי
    fmap = folium.Map(location=[center_lat, center_lon], zoom_start=13)

    # עיגולים של טווחים
    for r in [500, 1000, 2000]:
        folium.Circle(
            radius=r,
            location=(center_lat, center_lon),
            color='blue',
            fill=False,
            weight=1,
            popup=f"{r} מטר"
        ).add_to(fmap)

    # סימון המיקום המרכזי
    folium.Marker(
        [center_lat, center_lon],
        tooltip='מיקום מרכזי',
        icon=folium.Icon(color='red')
    ).add_to(fmap)

    # סימון משתמשים בטווח
    for user in users:
        distance = haversine_distance(center_lat, center_lon, user['lat'], user['lon'])
        if min_range_m <= distance <= max_range_m:
            folium.Marker(
                [user['lat'], user['lon']],
                tooltip=f"{user['username']} ({int(distance)} מ')",
                icon=folium.Icon(color='green')
            ).add_to(fmap)

    fmap.save(output_file)
    print(f"מפה נשמרה ל: {output_file}")
