import requests
import logging
import sqlite3
from datetime import datetime
import pandas as pd
import json
import os
from fpdf import FPDF

# ==== CONFIGURATION ====
TELEGRAM_BOT_TOKEN = "YOUR_BOT_TOKEN"
TELEGRAM_API_URL = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/getUpdates"
DB_FILE = "intelligence_gathering.db"
LOG_FILE = "intelligence_gathering.log"
EXPORT_DIR = "intelligence_reports"
JSON_FALLBACK = "telegram_groups.json"
KEYWORDS = ['terror', 'attack', 'illegal', 'hack', 'fraud']

# ==== INIT ====
os.makedirs(EXPORT_DIR, exist_ok=True)
logging.basicConfig(filename=LOG_FILE, level=logging.INFO, format="%(asctime)s - %(message)s")

conn = sqlite3.connect(DB_FILE)
cursor = conn.cursor()
cursor.execute("""
CREATE TABLE IF NOT EXISTS intelligence_data (
    group_id INTEGER,
    message_id INTEGER PRIMARY KEY,
    username TEXT,
    message_text TEXT,
    timestamp TEXT,
    risk_score REAL
)
""")
conn.commit()

# ==== FUNCTIONS ====
def calculate_risk_score(text):
    score = 0.0
    for keyword in KEYWORDS:
        if keyword in text.lower():
            score += 0.1
    return round(score, 2)

def fetch_from_api():
    try:
        res = requests.get(TELEGRAM_API_URL, timeout=10)
        data = res.json().get("result", [])
        messages = []
        for update in data:
            if "message" in update:
                msg = update["message"]
                message = {
                    "group_id": msg.get("chat", {}).get("id"),
                    "message_id": msg.get("message_id"),
                    "username": msg.get("from", {}).get("username", "Unknown"),
                    "message_text": msg.get("text", ""),
                    "timestamp": datetime.utcfromtimestamp(msg.get("date")).strftime("%Y-%m-%d %H:%M:%S")
                }
                message["risk_score"] = calculate_risk_score(message["message_text"])
                messages.append(message)
        return messages
    except Exception as e:
        logging.error(f"API fetch failed: {e}")
        return []

def fetch_from_file():
    try:
        with open(JSON_FALLBACK, 'r', encoding='utf-8') as f:
            messages = json.load(f)
        for msg in messages:
            msg['risk_score'] = msg.get('risk_score', calculate_risk_score(msg.get('message_text', '')))
        return messages
    except Exception as e:
        logging.error(f"Failed to read fallback JSON: {e}")
        return []

def get_telegram_data():
    logging.info("🔍 Fetching data from API...")
    messages = fetch_from_api()
    if not messages:
        logging.warning("⚠ No messages from API. Falling back to JSON.")
        messages = fetch_from_file()
    for m in messages:
        cursor.execute("""
        INSERT OR REPLACE INTO intelligence_data (group_id, message_id, username, message_text, timestamp, risk_score)
        VALUES (?, ?, ?, ?, ?, ?)
        """, (m["group_id"], m["message_id"], m["username"], m["message_text"], m["timestamp"], m["risk_score"]))
        conn.commit()
    return messages

def analyze_intelligence(messages):
    df = pd.DataFrame(messages)
    if "risk_score" not in df.columns:
        raise KeyError("Column 'risk_score' not found in messages")
    return df[df["risk_score"] > 0.3]

def export_intelligence_report(df, filename="intelligence_report.pdf"):
    pdf = FPDF()
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.add_page()
    pdf.set_font("Arial", size=12)
    pdf.cell(200, 10, txt="Intelligence Report - High Risk", ln=True, align="C")
    pdf.ln(10)
    for row in df.itertuples():
        line = f"User: {row.username} | Score: {row.risk_score} | Message: {row.message_text}"
        pdf.multi_cell(0, 10, line)
    path = os.path.join(EXPORT_DIR, filename)
    pdf.output(path)
    logging.info(f"✅ Report saved: {path}")

def run_pipeline():
    messages = get_telegram_data()
    risky = analyze_intelligence(messages)
    if not risky.empty:
        export_intelligence_report(risky)
        logging.info("🚨 Alerts sent")
    else:
        logging.info("✔️ No high-risk messages found")

# === MAIN ENTRY (optional) ===
if __name__ == "__main__":
    run_pipeline()
