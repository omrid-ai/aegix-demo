
from fpdf import FPDF
import os
from datetime import datetime

EXPORT_DIR = "./exports"
os.makedirs(EXPORT_DIR, exist_ok=True)

def export_report(alerts, output_dir=EXPORT_DIR, format="pdf"):
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = os.path.join(output_dir, f"alerts_report_{timestamp}.pdf")

    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)
    pdf.cell(200, 10, txt="AEGIX Alerts Report", new_x=10, new_y=20, align="C")
    pdf.ln(10)

    for alert in alerts:
        line = f"{alert['time']} - {alert['message']}"
        pdf.multi_cell(w=180, h=10, text=line, align="L")

    pdf.output(filename)
    print(f"📄 Alerts report saved to: {filename}")

def export_user_distance_report(user_distances, output_dir=EXPORT_DIR):
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = os.path.join(output_dir, f"user_distance_report_{timestamp}.pdf")

    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)
    pdf.cell(200, 10, txt="AEGIX User Distance Report", new_x=10, new_y=20, align="C")
    pdf.ln(10)

    for record in user_distances:
        line = f"{record['user1']} ↔ {record['user2']} - Distance: {record['distance']} km"
        pdf.multi_cell(w=180, h=10, text=line, align="L")

    pdf.output(filename)
    print(f"📄 User distance report saved to: {filename}")
