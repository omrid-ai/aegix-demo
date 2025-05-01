# report_exporter_hebrew.py — Hebrew PDF export with RTL support using fpdf2

from fpdf import FPDF
import os
from datetime import datetime

EXPORT_DIR = "exports"
FONT_FILE = "fonts/NotoSansHebrew-Regular.ttf"

class RTLHebrewPDF(FPDF):
    def __init__(self):
        super().__init__()
        self.add_page()
        self.add_font("Noto", "", FONT_FILE, uni=True)
        self.set_font("Noto", size=12)
        self.set_auto_page_break(auto=True, margin=15)

    def rtl_cell(self, text):
        # Reverse text for basic RTL simulation
        reversed_text = text[::-1]
        self.multi_cell(0, 10, reversed_text, align="R")

def export_report(alerts, output_dir=EXPORT_DIR, format="pdf"):
    os.makedirs(output_dir, exist_ok=True)
    os.makedirs("fonts", exist_ok=True)  # Ensure font dir exists
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"{output_dir}/aegix_hebrew_report_{timestamp}.{format}"

    if format == "pdf":
        pdf = RTLHebrewPDF()
        pdf.rtl_cell("דו"ח התראות חשודות - AEGIX")
        pdf.ln(5)
        for alert in alerts:
            time = alert.get("time", "לא ידוע")
            message = alert.get("message", "")
            full = f"[{time}] {message}"
            pdf.rtl_cell(full)
        pdf.output(filename)
        print(f"✅ Hebrew report saved to {filename}")
    else:
        raise NotImplementedError("Only PDF format is supported")
