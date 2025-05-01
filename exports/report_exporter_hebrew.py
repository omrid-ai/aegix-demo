
from fpdf import FPDF
import os
from datetime import datetime

FONT_PATH = os.path.join(os.path.dirname(__file__), "../fonts/NotoSansHebrew-Regular.ttf")

def export_hebrew_pdf(data, filename="hebrew_report.pdf", output_dir="exports"):
    os.makedirs(output_dir, exist_ok=True)
    pdf = FPDF()
    pdf.add_page()
    pdf.add_font("Hebrew", "", FONT_PATH, uni=True)
    pdf.set_font("Hebrew", "", 14)
    pdf.set_auto_page_break(auto=True, margin=15)

    pdf.cell(200, 10, txt="דו"ח בעברית - הודעות חשודות", ln=True, align="R")
    pdf.ln(10)

    for item in data:
        line = f"{item['timestamp']} - {item['username']} ({item['user_id']}): {item['message_text']}"
        pdf.cell(0, 10, txt=line, ln=True, align="R")

    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    full_path = os.path.join(output_dir, f"{timestamp}_{filename}")
    pdf.output(full_path)
    print(f"✅ Hebrew PDF exported: {full_path}")
