from fpdf import FPDF
from datetime import datetime

def generate_influence_report(data, output_path="influence_daily_report.pdf"):
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", "B", 16)
    pdf.cell(0, 10, "AEGIX - Influence Tracker Daily Report", ln=True, align="C")
    pdf.set_font("Arial", "", 12)
    pdf.cell(0, 10, f"Date: {datetime.now().strftime('%Y-%m-%d %H:%M')}", ln=True)

    pdf.ln(10)
    pdf.set_font("Arial", "B", 14)
    pdf.cell(0, 10, "Top Influencers Detected", ln=True)
    pdf.set_font("Arial", "", 12)

    for idx, user in enumerate(data.get("users", []), 1):
        pdf.cell(0, 10, f"{idx}. {user['name']} ({user['id']})", ln=True)
        pdf.cell(0, 10, f"   Activity Level: {user['activity']} | Region: {user['region']} | Language: {user['language']}", ln=True)

    pdf.ln(10)
    pdf.set_font("Arial", "B", 14)
    pdf.cell(0, 10, "Key Active Groups", ln=True)
    pdf.set_font("Arial", "", 12)

    for group in data.get("groups", []):
        pdf.cell(0, 10, f"- {group['name']} ({group['id']}) – Region: {group['region']}, Posts Today: {group['posts_today']}", ln=True)

    pdf.ln(10)
    pdf.set_font("Arial", "B", 14)
    pdf.cell(0, 10, "Trend Observations", ln=True)
    pdf.set_font("Arial", "", 12)
    for line in data.get("observations", []):
        pdf.multi_cell(0, 10, f"• {line}")

    pdf.output(output_path)
    print(f"[✓] Report saved to: {output_path}")

# Example data (can be replaced dynamically)
example_data = {
    "users": [
        {"name": "CryptoShark77", "id": "user001", "activity": "High", "region": "Israel", "language": "Hebrew"},
        {"name": "AnonDealz", "id": "user002", "activity": "Medium", "region": "Germany", "language": "German"},
    ],
    "groups": [
        {"name": "PayNova Complaints", "id": "grp123", "region": "Israel", "posts_today": 24},
        {"name": "Crypto Leaks & Fraud Watch", "id": "grp999", "region": "Global", "posts_today": 53},
    ],
    "observations": [
        "Spike in mentions of PayNova in Israeli groups.",
        "AnonDealz engaged in 3 new controversial threads.",
        "PayNova group activity tripled in past 24h."
    ]
}

# Uncomment to test:
# generate_influence_report(example_data)