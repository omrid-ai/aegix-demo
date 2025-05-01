import time
import json
import requests
import logging
import os
import pandas as pd
from datetime import datetime
from fpdf import FPDF
from sklearn.ensemble import IsolationForest

# משתנים בסיסיים
INCIDENT_LOG_FILE = "incident_log.json"
THREAT_API = "https://api.threatintel.com/check"
LOG_FILE = "incident_response.log"
EXPORT_DIR = "incident_reports"
EMAIL_ALERT = "security@yourcompany.com"
ANOMALY_THRESHOLD = 0.7  # סף גילוי אירועים חריגים

# יצירת תיקייה אם לא קיימת
if not os.path.exists(EXPORT_DIR):
    os.makedirs(EXPORT_DIR)

# הגדרת יומן רישום
logging.basicConfig(filename=LOG_FILE, level=logging.INFO, format="%(asctime)s - %(message)s")

# פונקציה לשליפת נתונים ממערכת ניטור
def fetch_security_events():
    """שולף נתוני אירועים ממערכת הניטור"""
    logging.info("שולף נתונים ממערכת הניטור...")
    try:
        response = requests.get("https://api.example.com/security_events")
        if response.status_code == 200:
            return response.json()
        else:
            logging.error("שגיאה בקבלת נתונים ממערכת הניטור.")
            return []
    except Exception as e:
        logging.error(f"שגיאה בחיבור למערכת הניטור: {e}")
        return []

# פונקציה לזיהוי אנומליות באמצעות Isolation Forest
def detect_anomalies(data):
    """מזהה פעילות חריגה באמצעות Isolation Forest"""
    logging.info("מבצע ניתוח לאיתור חריגות...")
    
    if len(data) == 0:
        logging.warning("אין נתונים לבדיקה.")
        return []
    
    df = pd.DataFrame(data)
    
    if 'severity' in df.columns:
        features = df[['severity']].values
        model = IsolationForest(contamination=0.1)
        df['anomaly_score'] = model.fit_predict(features)
        anomalies = df[df['anomaly_score'] == -1]  # מזהה חריגות
        return anomalies.to_dict(orient='records')
    
    return []

# פונקציה לבדיקה מול מאגר איומים חיצוני
def check_threat_intelligence(event):
    """בודקת האם מקור האירוע נמצא במאגר איומים חיצוני"""
    logging.info(f"בודק את האירוע {event['event_id']} מול מאגר איומים...")
    try:
        response = requests.get(f"{THREAT_API}?ip={event['source_ip']}")
        if response.status_code == 200:
            threat_data = response.json()
            return threat_data.get("threat_level", "unknown")
    except Exception as e:
        logging.error(f"שגיאה בבדיקת האיום: {e}")
    return "unknown"

# פונקציה לשמירת אירועי אבטחה
def save_incident(event):
    """שומר אירועי אבטחה לקובץ JSON"""
    logging.info(f"שומר את האירוע {event['event_id']}...")
    
    incident_log = []
    if os.path.exists(INCIDENT_LOG_FILE):
        with open(INCIDENT_LOG_FILE, 'r') as file:
            incident_log = json.load(file)
    
    incident_log.append(event)
    
    with open(INCIDENT_LOG_FILE, 'w') as file:
        json.dump(incident_log, file, indent=4)

# פונקציה לשליחת התראה באימייל
def send_alert(event):
    """שולח התראה במייל על אירוע חמור"""
    logging.info(f"שולח התראה על האירוע {event['event_id']}...")
    
    subject = f"🔴 התראת אבטחה: {event['event_type']}"
    message = f"""
    📢 זוהה אירוע אבטחה חמור!
    🕒 תאריך: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
    📍 כתובת IP חשודה: {event['source_ip']}
    🚨 רמת סיכון: {event['severity']}
    🔎 פרטים נוספים: {event.get('description', 'לא ידוע')}
    """
    
    email_msg = f"Subject: {subject}\n\n{message}"
    
    try:
        # הדמיית שליחת מייל (במציאות יש צורך בחיבור ל-SMTP)
        logging.info(f"נשלח אימייל ל-{EMAIL_ALERT}")
    except Exception as e:
        logging.error(f"שגיאה בשליחת התראה במייל: {e}")

# פונקציה ליצירת דוח PDF
def generate_report(events):
    """יוצר דוח PDF עם פירוט של כל האירועים"""
    logging.info("יוצר דוח אירועים...")
    
    pdf = FPDF()
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.add_page()
    pdf.set_font("Arial", size=12)
    
    pdf.cell(200, 10, txt="דו\"ח תגובה לאירועים", ln=True, align="C")
    pdf.ln(10)
    
    for event in events:
        pdf.cell(200, 10, txt=f"🔹 אירוע: {event['event_type']} | רמת סיכון: {event['severity']}", ln=True)
        pdf.ln(5)
    
    filename = os.path.join(EXPORT_DIR, f"incident_report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.pdf")
    pdf.output(filename)
    logging.info(f"📄 דוח נשמר: {filename}")

# פונקציה ראשית לניהול התהליך
def main():
    """הפונקציה הראשית לניהול תגובה לאירועים"""
    events = fetch_security_events()
    
    if not events:
        logging.warning("לא נמצאו אירועים חדשים.")
        return
    
    anomalies = detect_anomalies(events)
    
    for event in anomalies:
        threat_level = check_threat_intelligence(event)
        event['threat_level'] = threat_level
        
        if event['severity'] > ANOMALY_THRESHOLD or threat_level == "high":
            send_alert(event)
        
        save_incident(event)
    
    generate_report(anomalies)

# הפעלת המערכת
main()
