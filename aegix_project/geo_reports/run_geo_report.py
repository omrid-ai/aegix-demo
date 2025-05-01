if __name__ == "__main__":
    center_lat, center_lon = 31.248849150838332, 34.25968898011567

    users_data = [
        {
            "id": "5755585923",
            "first_name": "עלי",
            "last_name": "ابراهيم",
            "username": "",
            "phone": "",
            "lat": 31.2490,
            "lon": 34.2597,
            "profile_pic": "https://example.com/image1.jpg"
        },
        {
            "id": "5600711896",
            "first_name": "Hassan",
            "last_name": "Heiba",
            "username": "",
            "phone": "",
            "lat": 31.2450,
            "lon": 34.2600,
            "profile_pic": "https://example.com/image2.jpg"
        },
    ]

    html = generate_geo_report(center_lat, center_lon, users_data)

    with open("geo_report.html", "w", encoding="utf-8") as f:
        f.write(html)
    print("📄 Geo report generated successfully!")
