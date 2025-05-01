import sqlite3
import time
import logging
import requests
from datetime import datetime
from collections import Counter

# הגדרות בסיסיות
TELEGRAM_BOT_TOKEN = "YOUR_BOT_TOKEN"
TELEGRAM_API_URL = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/getUpdates"
DB_FILE = "telegram_user_activity.db"
SUSPICIOUS_ACTIVITY_THRESHOLD = 5  # מספר ההודעות במינימום זמן שמחשיב חריג
LOG_FILE = "user_activity_analysis.log"
EXPORT_DIR = "user_activity_reports"

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
    user_id INTEGER PRIMARY KEY,
    username TEXT,
    last_activity_time TEXT,
    total_messages INTEGER
)
""")
conn.commit()

def get_groups():
    """שולף קבוצות מטלגרם ומעדכן את מסד הנתונים"""
    logging.info("שולף עדכונים מטלגרם...")
    response = requests.get(TELEGRAM_API_URL).json()
    users_activity = []
    
    for update in response.get("result", []):
        if "message" in update and "from" in update["message"]:
            user = update["message"]["from"]
            user_id = user.get("id")
            username = user.get("username", "לא ידוע")
            timestamp = datetime.utcfromtimestamp(update["message"]["date"]).strftime("%Y-%m-%d %H:%M:%S")
            
            # עדכון פעילות המשתמש במסד הנתונים
            cursor.execute("""
            INSERT OR REPLACE INTO users (user_id, username, last_activity_time, total_messages)
            VALUES (?, ?, ?, ?)
            """, (user_id, username, timestamp, 1))
            conn.commit()
            users_activity.append({
                "user_id": user_id,
                "username": username,
                "timestamp": timestamp
            })
    
    logging.info(f"סך הכל {len(users_activity)} משתמשים פעילים.")
    return users_activity

def analyze_user_activity():
    """מנתח פעילות משתמשים בקבוצות"""
    logging.info("מנתח פעילות משתמשים בקבוצות...")
    
    cursor.execute("SELECT * FROM users")
    users = cursor.fetchall()
    
    suspicious_users = []
    for user in users:
        user_id, username, last_activity_time, total_messages = user
        last_activity = datetime.strptime(last_activity_time, "%Y-%m-%d %H:%M:%S")
        time_since_last_activity = (datetime.utcnow() - last_activity).total_seconds()
        
        # אם המשתמש שלח יותר מידי הודעות בפרק זמן קצר
        if total_messages > SUSPICIOUS_ACTIVITY_THRESHOLD and time_since_last_activity < 3600:
            suspicious_users.append({
                "user_id": user_id,
                "username": username,
                "total_messages": total_messages,
                "last_activity_time": last_activity_time
            })
    
    logging.info(f"{len(suspicious_users)} משתמשים חשודים זוהו.")
    return suspicious_users

def send_alert(suspicious_users):
    """שולח התראות על פעילות חשודה"""
    for user in suspicious_users:
        alert_message = f"⚠️ פעילות חשודה של משתמש {user['username']} ({user['user_id']}): {user['total_messages']} הודעות בזמן קצר."
        logging.info(f"🔔 התראה: {alert_message}")
        # כאן אפשר להוסיף שליחה עם Telegram API

def export_activity_report(suspicious_users, filename="suspicious_users_report.pdf"):
    """מייצא את פעילות המשתמשים החשודים לדו"ח PDF"""
    from fpdf import FPDF
    
    pdf = FPDF()
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.add_page()
    pdf.set_font("Arial", size=12)
    
    pdf.cell(200, 10, txt="דו"ח פעילות משתמשים חשודים", ln=True, align="C")
    pdf.ln(10)
    
    for user in suspicious_users:
        pdf.cell(200, 10, txt=f"{user['last_activity_time']} - {user['username']} ({user['user_id']}): {user['total_messages']} הודעות", ln=True)
    
    pdf.output(os.path.join(EXPORT_DIR, filename))
    logging.info(f"📄 קובץ PDF נשמר: {filename}")

def log_activity(user_id, username, total_messages):
    """שומר היסטוריית פעילות של משתמשים"""
    log_time = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")
    cursor.execute("""
    INSERT INTO activity_log (user_id, username, activity_time, total_messages)
    VALUES (?, ?, ?, ?)
    """, (user_id, username, log_time, total_messages))
    conn.commit()
    logging.info(f"📊 היסטוריית פעילות של {username} ({user_id}) נשמרה.")

# הרצת האלגוריתם על פעילות משתמשים
users_activity = get_groups()

# ניתוח פעילות משתמשים והפקת דו"ח
suspicious_users = analyze_user_activity()

if suspicious_users:
    export_activity_report(suspicious_users)
    send_alert(suspicious_users)
    for user in suspicious_users:
        log_activity(user["user_id"], user["username"], user["total_messages"])
else:
    logging.info("✔️ לא נמצאו משתמשים עם פעילות חשודה.")
