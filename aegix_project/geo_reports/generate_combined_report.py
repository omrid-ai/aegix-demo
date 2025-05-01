# generate_combined_report.py

def generate_combined_html_report(report_file, map_file, output_file="geo_combined_report.html"):
    with open(report_file, 'r', encoding='utf-8') as report_f:
        report_html = report_f.read()

    html = f"""
    <html>
        <head>
            <meta charset="UTF-8">
            <title>דו״ח מיקום וניתוח סיכונים</title>
        </head>
        <body>
            <h1>דו״ח ניתוח גיאוגרפי</h1>
            {report_html}
            <hr>
            <h2>🔍 צפייה במפה</h2>
            <p>לצפייה במפה האינטראקטיבית עם טווחים של 500-2000 מטר ולמיקום משתמשים בקרבת אזור מרכזי:</p>
            <a href="{map_file}" target="_blank" style="font-size: 18px; padding: 10px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">
                לחץ כאן לצפייה במפה
            </a>
        </body>
    </html>
    """

    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(html)

    print(f"דוח משולב נוצר: {output_file}")
