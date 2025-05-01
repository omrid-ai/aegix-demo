import smtplib
from email.mime.text import MIMEText
from datetime import datetime
import logging

# פונקציה לשליחת התרעות
def send_alert(subject, message, recipients):
    # הגדרת פרטי שליחת המייל
    from_email = "noreply@yourdomain.com"
    msg = MIMEText(message)
    msg["Subject"] = subject
    msg["From"] = from_email
    msg["To"] = ", ".join(recipients)

    try:
        # הגדרת שרת SMTP
        server = smtplib.SMTP("smtp.yourdomain.com")
        server.starttls()
        server.login(from_email, "yourpassword")
        server.sendmail(from_email, recipients, msg.as_string())
        server.quit()
        logging.info(f"Alert sent: {subject}")
    except Exception as e:
        logging.error(f"Failed to send alert: {str(e)}")

# דוגמת התרעה על פעילות חשודה
def alert_on_suspicious_activity(user_profile, risk_level):
    if risk_level > 7:  # סף סיכון גבוה
        subject = f"Alert: Suspicious Activity Detected for User {user_profile['username']}"
        message = f"User {user_profile['username']} has been flagged with a high risk level ({risk_level}). Immediate action required."
        recipients = ["admin@yourdomain.com"]
        send_alert(subject, message, recipients)

# הדוגמה פועלת עם פרופיל משתמש וסיכון שהוערך
user_profile = {"username": "john_doe", "location": "Tel Aviv", "activity": "spamming groups"}
risk_level = 8
alert_on_suspicious_activity(user_profile, risk_level)
