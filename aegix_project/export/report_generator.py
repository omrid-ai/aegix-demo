import json
from jinja2 import Environment, FileSystemLoader
from datetime import datetime
import os

def generate_geogram_report(data, output_path, map_url, lat, lon):
    # טוען את טמפלייט HTML
    env = Environment(loader=FileSystemLoader('templates'))
    template = env.get_template('geogram_report_template.html')

    # מכין את ההקשר לדוח
    context = {
        'map_url': map_url,
        'latitude': lat,
        'longitude': lon,
        'users': data
    }

    # מרנדר את ה־HTML
    html_out = template.render(context)

    # כותב לקובץ
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(html_out)

    print(f"Report saved to {output_path}")
