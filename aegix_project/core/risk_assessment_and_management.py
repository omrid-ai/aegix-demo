import pandas as pd
import numpy as np
import smtplib
from email.mime.text import MIMEText
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from datetime import datetime
import logging
import os

# משתנים בסיסיים
RISK_DATA_FILE = "risk_data.csv"
ALERT_EMAIL = "security@yourcompany.com"
ALERT_THRESHOLD = 0.7  # סף הסיכון לשליחת התראה
LOG_FILE = "risk_assessment.log"
EXPORT_DIR = "risk_reports"

# יצירת תיקיית יצוא אם לא קיימת
if not os.path.exists(EXPORT_DIR):
    os.makedirs(EXPORT_DIR)

# הגדרת יומן רישום
logging.basicConfig(filename=LOG_FILE, level=logging.INFO, format="%(asctime)s - %(message)s")

# הגדרת מודל למידת מכונה להערכת סיכון
model = RandomForestClassifier(n_estimators=100, random_state=42)

def fetch_risk_data():
    """שולף נתוני סיכון מקובץ CSV"""
    logging.info("שולף נתוני סיכון...")
    if os.path.exists(RISK_DATA_FILE):
        return pd.read_csv(RISK_DATA_FILE)
    else:
        logging.error(f"לא נמצא קובץ נתוני סיכון בנתיב {RISK_DATA_FILE}")
        return pd.DataFrame()

def process_risk_data(data):
    """מעבד את נתוני הסיכון להכנה למודל"""
    logging.info("מעבד את נתוני הסיכון...")
    
    # בחירת תכונות רלוונטיות למודל
    features = ['threat_level', 'impact_score', 'probability', 'response_time']
    labels = ['risk_assessment']
    
    X = data[features]
    y = data[labels]
    
    # סווג התכונות
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    
    return X_scaled, y

def train_risk_model(X, y):
    """מאמן את מודל הסיכון"""
    logging.info("מאמן את מודל הסיכון...")
    model.fit(X, y)

def evaluate_risk_level(new_data):
    """מעריך את רמת הסיכון של נתון חדש"""
    logging.info("מעריך את רמת הסיכון...")
    
    # הכנת הנתונים החדשים
    X_new = np.array(new_data).reshape(1, -1)
    X_new_scaled = StandardScaler().fit_transform(X_new)
    
    # חיזוי סיכון
    risk_prediction = model.predict(X_new_scaled)
    
    # מחשבים את ההסתברות
    risk_probability = model.predict_proba(X_new_scaled)[0][1]
    
    return risk_prediction[0], risk_probability

def send_alert(email_subject, email_body):
    """שליחת התראה על סיכון גבוה בדוא"ל"""
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

def generate_risk_report(data, filename="risk_assessment_report.pdf"):
    """הפקת דוח סיכון"""
    from fpdf import FPDF
    
    pdf = FPDF()
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.add_page()
    pdf.set_font("Arial", size=12)
    
    pdf.cell(200, 10, txt="דו"ח הערכת סיכון", ln=True, align="C")
    pdf.ln(10)
    
    for index, row in data.iterrows():
        pdf.cell(200, 10, txt=f"סיכון: {row['risk_assessment']} - רמת סיכון: {row['threat_level']} - סיכון פוטנציאלי: {row['impact_score']}", ln=True)
    
    pdf.output(os.path.join(EXPORT_DIR, filename))
    logging.info(f"📄 דוח נשמר: {filename}")

def main():
    """הפונקציה הראשית להערכת סיכון וניהול תגובות"""
    risk_data = fetch_risk_data()
    
    if not risk_data.empty:
        # עיבוד הנתונים
        X, y = process_risk_data(risk_data)
        
        # אימון המודל
        train_risk_model(X, y)
        
        # הערכת סיכון עבור נתון חדש (נתון לדוגמה)
        new_risk_data = [4, 8, 0.85, 2]  # דוגמת נתון חדש
        risk_level, risk_probability = evaluate_risk_level(new_risk_data)
        
        logging.info(f"ציון סיכון חדש: {risk_level}, הסתברות סיכון: {risk_probability}")
        
        if risk_probability > ALERT_THRESHOLD:
            # אם הסיכון גבוה מהמינימום, שולחים התראה
            send_alert(f"סיכון גבוה מזוהה! רמת סיכון: {risk_level}", f"נתון חדש שהוערך כסיכון גבוה: רמת סיכון: {risk_level}, הסתברות: {risk_probability}")
        
        # יצירת דוח סיכון
        generate_risk_report(risk_data)
    else:
        logging.error("לא היו נתוני סיכון לעיבוד.")

# הרצת הכלים
main()
