import requests
import folium
from geopy.distance import geodesic
import pandas as pd
from datetime import datetime
import sqlite3

# הגדרות בסיסיות
TELEGRAM_BOT_TOKEN = "YOUR_BOT_TOKEN"
TELEGRAM_API_URL = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/getUpdates"
DB_FILE = "telegram_users.db"

# יצירת מסד נתונים
conn = sqlite3.connect(DB_FILE)
cursor = conn.cursor()
cursor.execute("""
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    username TEXT,
    last_seen TEXT,
    lat REAL,
    lon REAL
)
""")
conn.commit()

def get_nearby_users(lat, lon, radius_km=2, last_seen_minutes=30):
    """שולף מידע על משתמשים קרובים בטווח נתון ובודק זמן אחרון שנראו"""
    response = requests.get(TELEGRAM_API_URL).json()
    users = []
    current_time = datetime.utcnow()
    
    for update in response.get("result", []):
        if "message" in update and "location" in update["message"]:
            user_data = update["message"]["from"]
            user_lat = update["message"]["location"]["latitude"]
            user_lon = update["message"]["location"]["longitude"]
            timestamp = update["message"].get("date", 0)
            last_seen = datetime.utcfromtimestamp(timestamp)
            
            # חישוב זמן אחרון שנראה
            minutes_since_seen = (current_time - last_seen).total_seconds() / 60
            if minutes_since_seen > last_seen_minutes:
                continue
            
            distance = geodesic((lat, lon), (user_lat, user_lon)).km
            if distance <= radius_km:
                users.append({
                    "id": user_data["id"],
                    "username": user_data.get("username", "לא ידוע"),
                    "last_seen": last_seen.strftime("%Y-%m-%d %H:%M:%S"),
                    "distance_km": round(distance, 2),
                    "lat": user_lat,
                    "lon": user_lon
                })
                
                # שמירה במסד הנתונים
                cursor.execute("""
                INSERT OR REPLACE INTO users (id, username, last_seen, lat, lon)
                VALUES (?, ?, ?, ?, ?)
                """, (user_data["id"], user_data.get("username", "לא ידוע"), last_seen, user_lat, user_lon))
    
    conn.commit()
    return users

def generate_map(lat, lon, users):
    """יוצר מפה עם מיקומי המשתמשים"""
    map_ = folium.Map(location=[lat, lon], zoom_start=14)
    folium.Marker([lat, lon], tooltip="נקודת חיפוש", icon=folium.Icon(color="red")).add_to(map_)
    
    for user in users:
        folium.Marker(
            [user["lat"], user["lon"]],
            tooltip=f"{user['username']} - {user['distance_km']} ק"מ, נראה לאחרונה: {user['last_seen']}",
            icon=folium.Icon(color="blue")
        ).add_to(map_)
    
    return map_

def export_to_csv(users, filename="telegram_users.csv"):
    """מייצא את הנתונים לקובץ CSV"""
    df = pd.DataFrame(users)
    df.to_csv(filename, index=False, encoding="utf-8-sig")
    print(f"📁 קובץ CSV נשמר: {filename}")

def export_to_pdf(users, filename="telegram_users.pdf"):
    """מייצא את הנתונים לקובץ PDF"""
    from fpdf import FPDF
    pdf = FPDF()
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.add_page()
    pdf.set_font("Arial", size=12)
    
    pdf.cell(200, 10, txt="דו"ח משתמשים בטלגרם", ln=True, align="C")
    pdf.ln(10)
    
    for user in users:
        pdf.cell(200, 10, txt=f"{user['username']} - {user['distance_km']} ק"מ, נראה לאחרונה: {user['last_seen']}", ln=True)
    
    pdf.output(filename)
    print(f"📄 קובץ PDF נשמר: {filename}")

# הרצת האלגוריתם עם נ.צ לדוגמה
latitude, longitude = 32.0853, 34.7818  # תל אביב
users_nearby = get_nearby_users(latitude, longitude)

if users_nearby:
    map_result = generate_map(latitude, longitude, users_nearby)
    map_result.save("telegram_users_map.html")
    export_to_csv(users_nearby)
    export_to_pdf(users_nearby)
    print("🔍 מפה ודו"חות נוצרו בהצלחה!")
else:
    print("❌ לא נמצאו משתמשים בטווח הנתון.")
