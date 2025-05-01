from fpdf import FPDF
import os
from datetime import datetime

EXPORT_DIR = "exports"

def export_report(alerts, output_dir=EXPORT_DIR, format="pdf"):
    os.makedirs(output_dir, exist_ok=True)
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"{output_dir}/aegix_report_{timestamp}.{format}"

    if format == "pdf":
        pdf = FPDF()
        pdf.add_page()
        pdf.set_font("Arial", size=12)
        pdf.cell(200, 10, txt="AEGIX Report - Suspicious Alerts", ln=True, align="C")
        pdf.ln(10)
        for alert in alerts:
            alert_text = f"[{alert.get('time', 'N/A')}] {alert.get('message', '')}"
            pdf.multi_cell(0, 10, txt=alert_text)
        pdf.output(filename)
    else:
        raise NotImplementedError(f"Unsupported format: {format}")

    print(f"✅ Report exported to {filename}")

def export_user_distance_report(user_distances, output_dir=EXPORT_DIR, format="pdf"):
    os.makedirs(output_dir, exist_ok=True)
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"{output_dir}/user_distance_report_{timestamp}.{format}"

    if format == "pdf":
        pdf = FPDF()
        pdf.add_page()
        pdf.set_font("Arial", size=12)
        pdf.cell(200, 10, txt="AEGIX Report - User Distance Metrics", ln=True, align="C")
        pdf.ln(10)
        for record in user_distances:
            line = f"User: {record['user_id']} - Distance from center: {record['distance_km']} km"
            pdf.multi_cell(0, 10, txt=line)
        pdf.output(filename)
    else:
        raise NotImplementedError(f"Unsupported format: {format}")

    print(f"✅ User distance report exported to {filename}")
