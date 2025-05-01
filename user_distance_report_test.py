from fpdf import FPDF
import os
from datetime import datetime

sample_distances = [{'user1': 'user_001', 'user2': 'Tel Aviv', 'distance': 2.5}, {'user1': 'user_002', 'user2': 'Tel Aviv', 'distance': 4.1}, {'user1': 'user_004', 'user2': 'Tel Aviv', 'distance': 3.7}, {'user1': 'user_005', 'user2': 'Tel Aviv', 'distance': 6.2}, {'user1': 'user_006', 'user2': 'Tel Aviv', 'distance': 1.9}]

EXPORT_DIR = "."
os.makedirs(EXPORT_DIR, exist_ok=True)
timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
filename = os.path.join(EXPORT_DIR, f"user_distance_report_{timestamp}.pdf")

pdf = FPDF()
pdf.add_page()
pdf.set_font("Arial", size=12)
pdf.cell(200, 10, txt="AEGIX Report - User Distance Metrics", ln=True, align="C")
pdf.ln(10)

for record in sample_distances:
    line = f"{record['user1']} <-> {record['user2']} - Distance: {record['distance']} km"
    pdf.multi_cell(w=180, h=10, txt=line, align="L")

pdf.output(filename)
print(f"📄 Report saved to: {filename}")
