import requests
import json
import sqlite3
import time
import logging
from datetime import datetime
from fpdf import FPDF
import os

# הגדרות בסיסיות
TELEGRAM_BOT_TOKEN = "YOUR_BOT_TOKEN"
TELEGRAM_API_URL = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/getUpdates"
DB_FILE = "telegram_groups.db"
SUSPICIOUS_KEYWORDS = ["קישור", "הונאה", "פישינג", "התקפה"]
LAST_SEEN_MINUTES = 30
LOG_FILE = "telegram_group_monitoring.log"
EXPORT_DIR = "exports"

if not os.path.exists(EXPORT_DIR):
    os.makedirs(EXPORT_DIR)

logging.basicConfig(filename=LOG_FILE, level=logging.INFO, format="%(asctime)s - %(message)s")

conn = sqlite3.connect(DB_FILE)
cursor = conn.cursor()
cursor.execute("""
CREATE TABLE IF NOT EXISTS groups (
    id INTEGER PRIMARY KEY,
    group_name TEXT,
    group_id INTEGER,
    last_checked TEXT
)
""")
cursor.execute("""
CREATE TABLE IF NOT EXISTS group_messages (
    message_id INTEGER PRIMARY KEY,
    group_id INTEGER,
    user_id INTEGER,
    username TEXT,
    message_text TEXT,
    timestamp TEXT,
    is_suspicious BOOLEAN
)
""")
cursor.execute("""
CREATE TABLE IF NOT EXISTS group_activity (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    group_id INTEGER,
    activity_time TEXT,
    suspicious_message_count INTEGER
)
""")
conn.commit()

def get_groups():
    logging.info("שולף עדכונים מטלגרם...")
    response = requests.get(TELEGRAM_API_URL).json()
    groups = []
    
    for update in response.get("result", []):
        if "message" in update and "chat" in update["message"]:
            chat = update["message"]["chat"]
            group_name = chat.get("title", "לא ידוע")
            group_id = chat.get("id")
            last_checked = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")
            
            cursor.execute("""
            INSERT OR REPLACE INTO groups (group_name, group_id, last_checked)
            VALUES (?, ?, ?)
            """, (group_name, group_id, last_checked))
            conn.commit()
            groups.append({
                "group_name": group_name,
                "group_id": group_id,
                "last_checked": last_checked
            })
    
    logging.info(f"סך הכל {len(groups)} קבוצות נמצאו.")
    print(f"✅ {len(groups)} קבוצות אותרו מה-API")
    return groups

def monitor_group_messages(group_id):
    logging.info(f"מנטר הודעות בקבוצה {group_id}...")
    response = {"result": []}
    suspicious_messages = []
    
    for message in response.get("result", []):
        user_id = message["from"]["id"]
        username = message["from"].get("username", "לא ידוע")
        message_text = message.get("text", "")
        timestamp = datetime.utcfromtimestamp(message["date"]).strftime("%Y-%m-%d %H:%M:%S")
        
        is_suspicious = any(keyword in message_text for keyword in SUSPICIOUS_KEYWORDS)
        if is_suspicious:
            suspicious_messages.append({
                "message_id": message["message_id"],
                "user_id": user_id,
                "username": username,
                "message_text": message_text,
                "timestamp": timestamp,
                "is_suspicious": is_suspicious
            })
            
            cursor.execute("""
            INSERT INTO group_messages (group_id, user_id, username, message_text, timestamp, is_suspicious)
            VALUES (?, ?, ?, ?, ?, ?)
            """, (group_id, user_id, username, message_text, timestamp, is_suspicious))
            conn.commit()
    
    print(f"📡 נמצאו {len(suspicious_messages)} הודעות חשודות בקבוצה {group_id}")
    logging.info(f"{len(suspicious_messages)} הודעות חשודות נמצאו.")
    return suspicious_messages

def send_suspicious_notification(suspicious_messages):
    for message in suspicious_messages:
        message_text = (
            f"הודעה חשודה בקבוצה {message['group_id']}: {message['message_text']}"
            f"שלח על ידי {message['username']} ({message['user_id']})"
        )
        logging.info(f"🔔 התראה: {message_text}")

def export_to_pdf(messages, filename="suspicious_messages_report.pdf"):
    pdf = FPDF()
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.add_page()
    pdf.set_font("Arial", size=12)
    
    pdf.cell(200, 10, txt='דו"ח הודעות חשודות', ln=True, align="C")
    pdf.ln(10)
    
    for message in messages:
        txt = f"{message['timestamp']} - {message['username']} ({message['user_id']}): {message['message_text']}"
        pdf.multi_cell(0, 10, txt)
    
    pdf.output(os.path.join(EXPORT_DIR, filename))
    logging.info(f"📄 קובץ PDF נשמר: {filename}")

def log_group_activity(group_id, suspicious_count):
    log_time = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")
    cursor.execute("""
    INSERT INTO group_activity (group_id, activity_time, suspicious_message_count)
    VALUES (?, ?, ?)
    """, (group_id, log_time, suspicious_count))
    conn.commit()
    logging.info(f"📊 היסטוריית פעילות בקבוצה {group_id} נשמרה: {suspicious_count} הודעות חשודות")

def collect_telegram_data():
    groups = get_groups()
    collected_alerts = []
    for group in groups:
        suspicious_messages = monitor_group_messages(group["group_id"])
        if suspicious_messages:
            export_to_pdf(suspicious_messages)
            send_suspicious_notification(suspicious_messages)
            log_group_activity(group["group_id"], len(suspicious_messages))
            collected_alerts.extend(suspicious_messages)
        else:
            logging.info(f"✔️ לא נמצאו הודעות חשודות בקבוצה {group['group_name']}.")
            print(f"✔️ קבוצה '{group['group_name']}' ללא התראות.")
    return collected_alerts
