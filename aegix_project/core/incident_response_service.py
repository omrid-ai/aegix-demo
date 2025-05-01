import time
from datetime import datetime
from risk_assessor import assess_risk

# פעולות אוטומטיות במענה לאירועים חשודים
def handle_incident(user_profile, risk_level):
    # החלטה על פעולות בעקבות רמת הסיכון
    if risk_level > 7:
        # חסימת המשתמש באופן זמני (אופציה לביצוע אוטומטי)
        block_user(user_profile)
        log_incident(user_profile, "User blocked due to high risk")
        
        # שליחת התרעה למנהלים
        alert_on_suspicious_activity(user_profile, risk_level)
        
        # אוטומטית – התמודדות עם איומים בזמן אמת
        initiate_response_protocol(user_profile)

# חסימת משתמש
def block_user(user_profile):
    # קוד חסימה
    print(f"Blocking user: {user_profile['username']}")

# רישום האירוע ביומן
def log_incident(user_profile, message):
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    print(f"{timestamp} - Incident: {message} for {user_profile['username']}")

# הפעלת פרוטוקול תגובה (כמו יצירת דיווחים, חקירה נוספת)
def initiate_response_protocol(user_profile):
    print(f"Initiating response protocol for user: {user_profile['username']}")

# דוגמת פעולת שירות התגובה
user_profile = {"username": "john_doe", "location": "Tel Aviv", "activity": "spamming groups"}
risk_level = assess_risk(user_profile)  # נניח שהערכת הסיכון יצאה גבוהה
handle_incident(user_profile, risk_level)
