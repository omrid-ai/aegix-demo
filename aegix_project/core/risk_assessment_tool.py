import sqlite3
import logging
import requests
import pandas as pd
from datetime import datetime
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# הגדרת משתנים בסיסיים
TELEGRAM_BOT_TOKEN = "YOUR_BOT_TOKEN"
TELEGRAM_API_URL = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/getUpdates"
DB_FILE = "telegram_risk_assessment.db"
RISK_THRESHOLD = 0.75  # סף סיכון לקבלת התראה
LOG_FILE = "risk_assessment.log"
EXPORT_DIR = "risk_reports"

# יצירת תיקיית יצוא אם לא קיימת
if not os.path.exists(EXPORT_DIR):
    os.makedirs(EXPORT_DIR)

# הגדרת יומן רישום
logging.basicConfig(filename=LOG_FILE, level=logging.INFO, format="%(asctime)s - %(message)s")

# יצירת מסד נתונים
conn = sqlite3.connect(DB_FILE)
cursor = conn.cursor()
cursor.execute("""
CREATE TABLE IF NOT EXISTS user_activity (
    user_id INTEGER PRIMARY KEY,
    username TEXT,
    activity_score REAL,
    last_activity_time TEXT
)
""")
conn.commit()

def get_groups():
    """שולף את עדכוני הקבוצות מטלגרם ומעדכן את מסד הנתונים"""
    logging.info("שולף עדכונים מטלגרם...")
    response = requests.get(TELEGRAM_API_URL).json()
    users_activity = []
    
    for update in response.get("result", []):
        if "message" in update and "from" in update["message"]:
            user = update["message"]["from"]
            user_id = user.get("id")
            username = user.get("username", "לא ידוע")
            timestamp = datetime.utcfromtimestamp(update["message"]["date"]).strftime("%Y-%m-%d %H:%M:%S")
            
            # חישוב נקודת פעילות (activity score) על בסיס נתוני המשתמש
            activity_score = calculate_activity_score(user_id, timestamp)
            
            # עדכון מסד נתונים
            cursor.execute("""
            INSERT OR REPLACE INTO user_activity (user_id, username, activity_score, last_activity_time)
            VALUES (?, ?, ?, ?)
            """, (user_id, username, activity_score, timestamp))
            conn.commit()
            users_activity.append({
                "user_id": user_id,
                "username": username,
                "activity_score": activity_score,
                "timestamp": timestamp
            })
    
    logging.info(f"סך הכל {len(users_activity)} משתמשים מעודכנים.")
    return users_activity

def calculate_activity_score(user_id, timestamp):
    """חישוב נקודת סיכון על בסיס זמן פעילות המשתמש"""
    # כאן ניתן להוסיף חישוב מתקדם יותר לנקודת הסיכון של המשתמש
    current_time = datetime.utcnow()
    last_activity = datetime.strptime(timestamp, "%Y-%m-%d %H:%M:%S")
    time_diff = (current_time - last_activity).total_seconds()
    
    # חישוב נקודת פעילות (ההסבר תלוי במודלים)
    score = 1 / (time_diff / 3600)  # משקל להודעות במרווחי זמן
    return score

def assess_risk(users_activity):
    """הערכת סיכון על בסיס נתוני המשתמשים"""
    logging.info("הערכת סיכון...")
    
    # יצירת DataFrame לניתוח
    df = pd.DataFrame(users_activity)
    
    # יצירת טרגט סיכון (בעצם לדוגמה כאן רק בדיקה אם הפעילות גבוהה מדי)
    df["high_risk"] = df["activity_score"].apply(lambda x: 1 if x > RISK_THRESHOLD else 0)
    
    # פילוח למודל למידת מכונה
    X = df[["activity_score"]]
    y = df["high_risk"]
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)
    
    # יצירת מודל לוגיסטי פשוט להערכת סיכון
    model = LogisticRegression()
    model.fit(X_train, y_train)
    
    # הערכת המודל
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    
    logging.info(f"הדיוק של המודל: {accuracy * 100:.2f}%")
    
    # חישוב סיכון עבור כל משתמש
    df["predicted_risk"] = model.predict(X)
    
    # משתמשים עם סיכון גבוה
    high_risk_users = df[df["predicted_risk"] == 1]
    
    return high_risk_users

def send_alert(high_risk_users):
    """שולח התראות על סיכון גבוה"""
    for user in high_risk_users.itertuples():
        alert_message = f"⚠️ פעילות חשודה של משתמש {user.username} ({user.user_id}): סיכון גבוה לפעילות לא חוקית."
        logging.info(f"🔔 התראה: {alert_message}")
        # כאן אפשר לשלוח התראה דרך Telegram או מערכות אחרות

def export_risk_report(high_risk_users, filename="risk_assessment_report.pdf"):
    """מייצא את דו"ח הסיכון לדו"ח PDF"""
    from fpdf import FPDF
    
    pdf = FPDF()
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.add_page()
    pdf.set_font("Arial", size=12)
    
    pdf.cell(200, 10, txt="דו"ח הערכת סיכון", ln=True, align="C")
    pdf.ln(10)
    
    for user in high_risk_users.itertuples():
        pdf.cell(200, 10, txt=f"{user.username} ({user.user_id}): סיכון גבוה - נקודת סיכון {user.activity_score}", ln=True)
    
    pdf.output(os.path.join(EXPORT_DIR, filename))
    logging.info(f"📄 קובץ PDF נשמר: {filename}")

# הרצת הכלים
users_activity = get_groups()

# הערכת סיכון
high_risk_users = assess_risk(users_activity)

if not high_risk_users.empty:
    export_risk_report(high_risk_users)
    send_alert(high_risk_users)
else:
    logging.info("✔️ לא נמצאו משתמשים עם סיכון גבוה.")
