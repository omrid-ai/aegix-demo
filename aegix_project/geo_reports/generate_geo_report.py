import datetime
from geo_distance_calculator import haversine_distance

def generate_geo_report(center_lat, center_lon, users_data, min_distance=500, max_distance=2000):
    # חישוב מרחקים וסינון
    filtered_users = []
    for user in users_data:
        dist = haversine_distance(center_lat, center_lon, user["lat"], user["lon"])
        if min_distance <= dist <= max_distance:
            user["distance"] = f"{int(dist)}m"
            filtered_users.append(user)

    # יצירת HTML
    html = f"""
    <html>
    <head><meta charset="utf-8"><title>Geogramint Report</title></head>
    <body>
        <h2>Geogramint Report</h2>
        <p>{datetime.datetime.now().strftime('%d/%m/%Y %H:%M:%S')}</p>
        <p><strong>Center Coordinates:</strong> {center_lat}, {center_lon}</p>
        <table border="1" cellpadding="5" cellspacing="0">
            <tr>
                <th>Profile Picture</th>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
                <th>Phone</th>
                <th>Distance</th>
            </tr>
    """

    for user in filtered_users:
        html += f"""
            <tr>
                <td><img src="{user.get('profile_pic', '')}" width="50" height="50"/></td>
                <td>{user.get('id', '')}</td>
                <td>{user.get('first_name', '')}</td>
                <td>{user.get('last_name', '')}</td>
                <td>{user.get('username', '')}</td>
                <td>{user.get('phone', '')}</td>
                <td>{user.get('distance', '')}</td>
            </tr>
        """

    html += "</table></body></html>"
    return html
