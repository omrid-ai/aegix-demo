import requests
import folium
from geopy.distance import geodesic
import pandas as pd
from datetime import datetime
import sqlite3
from fpdf import FPDF
import time
import logging
import json
import os

# הגדרות בסיסיות
TELEGRAM_BOT_TOKEN = "YOUR_BOT_TOKEN"
TELEGRAM_API_URL = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/getUpdates"
DB_FILE = "telegram_users.db"
RADIUS_KM = 2
LAST_SEEN_MINUTES = 30
LOG_FILE = "telegram_user_tracking.log"
EXPORT_DIR = "exports"

# יצירת תיקיית יצוא אם לא קיימת
if not os.path.exists(EXPORT_DIR):
    os.makedirs(EXPORT_DIR)

# הגדרת יומן רישום
logging.basicConfig(filename=LOG_FILE, level=logging.INFO, format="%(asctime)s - %(message)s")

# יצירת מסד נתונים
conn = sqlite3.connect(DB_FILE)
cursor = conn.cursor()
cursor.execute("""
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    username TEXT,
    last_seen TEXT,
    lat REAL,
    lon REAL,
    distance_km REAL
)
""")
cursor.execute("""
CREATE TABLE IF NOT EXISTS search_history (
    search_time TEXT,
    search_lat REAL,
    search_lon REAL,
    user_count INTEGER
)
""")
conn.commit()

def get_nearby_users(lat, lon, radius_km=RADIUS_KM, last_seen_minutes=LAST_SEEN_MINUTES):
    """שולף מידע על משתמשים קרובים בטווח נתון ובודק זמן אחרון שנראו"""
    logging.info("שולף עדכונים מטלגרם...")
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
                INSERT OR REPLACE INTO users (id, username, last_seen, lat, lon, distance_km)
                VALUES (?, ?, ?, ?, ?, ?)
                """, (user_data["id"], user_data.get("username", "לא ידוע"), last_seen, user_lat, user_lon, distance))
    
    conn.commit()
    logging.info(f"סך הכל {len(users)} משתמשים נמצאו בטווח {radius_km} ק"מ.")
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
    df.to_csv(os.path.join(EXPORT_DIR, filename), index=False, encoding="utf-8-sig")
    logging.info(f"📁 קובץ CSV נשמר: {filename}")

def export_to_pdf(users, filename="telegram_users.pdf"):
    """מייצא את הנתונים לקובץ PDF"""
    pdf = FPDF()
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.add_page()
    pdf.set_font("Arial", size=12)
    
    pdf.cell(200, 10, txt="דו"ח משתמשים בטלגרם", ln=True, align="C")
    pdf.ln(10)
    
    for user in users:
        pdf.cell(200, 10, txt=f"{user['username']} - {user['distance_km']} ק"מ, נראה לאחרונה: {user['last_seen']}", ln=True)
    
    pdf.output(os.path.join(EXPORT_DIR, filename))
    logging.info(f"📄 קובץ PDF נשמר: {filename}")

def send_notification(user, radius_km):
    """שליחת התראה על משתמש שנמצא ברדיוס"""
    message = f"הוזהה משתמש חדש: {user['username']} ב-{radius_km} ק"מ מהנקודה שלך"
    # ניתן להוסיף כאן את קוד שליחת ההודעה עם Telegram Bot API
    logging.info(f"🔔 התראה: {message}")

def log_search(lat, lon, users_count):
    """שומר היסטוריית חיפוש במסד הנתונים"""
    search_time = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")
    cursor.execute("""
    INSERT INTO search_history (search_time, search_lat, search_lon, user_count)
    VALUES (?, ?, ?, ?)
    """, (search_time, lat, lon, users_count))
    conn.commit()
    logging.info(f"🔍 היסטוריית חיפוש נשמרה ב-{search_time}, {users_count} משתמשים נמצאו.")

# הרצת האלגוריתם עם נ.צ לדוגמה
latitude, longitude = 32.0853, 34.7818  # תל אביב
users_nearby = get_nearby_users(latitude, longitude)

if users_nearby:
    map_result = generate_map(latitude, longitude, users_nearby)
    map_result.save(os.path.join(EXPORT_DIR, "telegram_users_map.html"))
    export_to_csv(users_nearby)
    export_to_pdf(users_ne_
