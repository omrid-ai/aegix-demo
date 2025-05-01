import requests
import logging
import json
from datetime import datetime
import pandas as pd
from sklearn.cluster import DBSCAN
from collections import defaultdict
import smtplib
from email.mime.text import MIMEText
import os

# הגדרת משתנים בסיסיים
THREAT_DETECTION_API_URL = "https://api.threatintelligence.com/v1/detect"
ALERT_EMAIL = "security@yourcompany.com"
ALERT_THRESHOLD = 0.5  # סף הסיכון לאירוע חשוד
LOG_FILE = "threat_detection.log"
EXPORT_DIR = "threat_reports"

# יצירת תיקיית יצוא אם לא קיימת
if not os.path.exists(EXPORT_DIR):
    os.makedirs(EXPORT_DIR)

# הגדרת יומן רישום
logging.basicConfig(filename=LOG_FILE, level=logging.INFO, format="%(asctime)s - %(message)s")

# יצירת בסיס נתונים לאירועים חשודים
suspected_events = []

def fetch_threat_data():
    """שולף נתונים ממערכת זיהוי איומים (API חיצוני)"""
    logging.info("שולף נתוני איומים ממערכת חיצונית...")
    response = requests.get(THREAT_DETECTION_API_URL)
    if response.status_code == 200:
        return response.json()
    else:
        logging.error("שגיאה בשאילתת נתונים ממערכת זיהוי האיומים.")
        return []

def process_threat_data(threat_data):
    """מעבד את נתוני האיומים ומחשב את ציון הסיכון"""
    logging.info("מעבד את נתוני האיומים...")
    processed_data = []
    
    for event in threat_data:
        event_time = datetime.utcfromtimestamp(event['timestamp']).strftime("%Y-%m-%d %H:%M:%S")
        event_message = event.get('message', "")
        risk_score = calculate_risk_score(event_message)
        
        processed_data.append({
            'timestamp': event_time,
            'message': event_message,
            'risk_score': risk_score
        })
        
    return processed_data

def calculate_risk_score(message):
    """חישוב סיכון על פי הודעת האיום"""
    score = 0.0
    # חיפוש מילים או פעילויות חשודות
    if "attack" in message.lower():
        score += 0.3
    if "breach" in message.lower():
        score += 0.4
    if "exploit" in message.lower():
        score += 0.5
    return score

def detect_clusters(events):
    """זיהוי קבוצות של איומים דומים באמצעות אלגוריתם DBSCAN"""
    logging.info("מבצע זיהוי קבוצות של איומים...")
    
    # המרת נתוני הסיכון לנקודות בגרף
    event_scores = [event['risk_score'] for event in events]
    event_scores = [[score] for score in event_scores]  # DBSCAN דורש מערך דו-ממדי
    
    # אלגוריתם DBSCAN
    dbscan = DBSCAN(eps=0.1, min_samples=2)
    clusters = dbscan.fit_predict(event_scores)
    
    # הוספת מזהה קבוצה לכל אירוע
    for i, event in enumerate(events):
        event['cluster'] = clusters[i]
        
    return events

def filter_high_risk_events(events):
    """מסנן את האירועים החשודים ביותר עם סיכון גבוה"""
    high_risk_events = [event for event in events if event['risk_score'] > ALERT_THRESHOLD]
    return high_risk_events

def send_alert(email_subject, email_body):
    """שליחת התראה על איום באמצעות דוא"ל"""
    try:
        msg = MIMEText(email_body)
        msg['Subject'] = email_subject
        msg['From'] = "alert@yourcompany.com"
        msg['To'] = ALERT_EMAIL

        server = smtplib.SMTP('smtp.yourserver.com')
        server.sendmail("alert@yourcompany.com", ALERT_EMAIL, msg.as_string())
        server.quit()
        logging.info(f"שליחת התראה לדוא\"ל בוצעה בהצלחה.")
    except Exception as e:
        logging.error(f"לא ניתן לשלוח את ההתראה בדוא\"ל: {e}")

def generate_report(high_risk_events, filename="high_risk_report.pdf"):
    """הפקת דוח על האירועים החשודים ביותר"""
    from fpdf import FPDF
    
    pdf = FPDF()
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.add_page()
    pdf.set_font("Arial", size=12)
    
    pdf.cell(200, 10, txt="דו"ח איומים - סיכון גבוה", ln=True, align="C")
    pdf.ln(10)
    
    for event in high_risk_events:
        pdf.cell(200, 10, txt=f"זמן: {event['timestamp']} - הודעה: {event['message']} - סיכון: {event['risk_score']} - קבוצה: {event['cluster']}", ln=True)
    
    pdf.output(os.path.join(EXPORT_DIR, filename))
    logging.info(f"📄 דוח נשמר: {filename}")

def main():
    """הפונקציה הראשית לזיהוי איומים ותגובה"""
    threat_data = fetch_threat_data()
    
    if threat_data:
        processed_data = process_threat_data(threat_data)
        clustered_events = detect_clusters(processed_data)
        high_risk_events = filter_high_risk_events(clustered_events)
        
        if high_risk_events:
            generate_report(high_risk_events)
            send_alert("התראה על איום עם סיכון גבוה", json.dumps(high_risk_events, indent=2))
        else:
            logging.info("✔️ לא נמצאו אירועים עם סיכון גבוה.")
    else:
        logging.error("לא היו נתוני איומים לניתוח.")

# הרצת הכלים
main()
