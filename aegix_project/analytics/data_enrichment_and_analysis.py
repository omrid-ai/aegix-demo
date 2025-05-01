import json
import logging
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans
import networkx as nx
from datetime import datetime
import matplotlib.pyplot as plt
import os

# 🛠 משתנים בסיסיים
LOG_FILE = "data_enrichment.log"
EXPORT_DIR = "enriched_data_reports"

# 🎯 יצירת תיקיית דוחות
if not os.path.exists(EXPORT_DIR):
    os.makedirs(EXPORT_DIR)

# 🪵 לוגים
logging.basicConfig(filename=LOG_FILE, level=logging.INFO, format="%(asctime)s - %(message)s")

# 📥 שליפת נתונים לקלט
def fetch_data_for_enrichment():
    """טוען נתונים מקובץ enriched_sample_data.json במקום מ-API"""
    logging.info("📁 טוען נתונים מתוך enriched_sample_data.json...")
    try:
        with open("enriched_sample_data.json", "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        logging.error(f"שגיאה בקריאת enriched_sample_data.json: {e}")
        return []

# 📡 סימולציה של enrichment (אין קריאה חיצונית)
def enrich_data(data):
    """מחזיר את הנתונים כפי שהם, ללא העשרה חיצונית"""
    logging.info("🔄 אין צורך בהעשרה – טוען נתונים כמות שהם.")
    return data

# 📊 ניתוח קלאסטרים וגרף קשרים
def perform_analysis_on_enriched_data(enriched_data):
    """ניתוח הקשרים ו-clusters"""
    logging.info("📊 מבצע ניתוחים מתקדמים על הנתונים...")

    df = pd.DataFrame(enriched_data)

    if 'feature' in df.columns:
        features = df[['feature']].values
        scaler = StandardScaler()
        scaled = scaler.fit_transform(features)
        kmeans = KMeans(n_clusters=3, n_init="auto")
        df['cluster'] = kmeans.fit_predict(scaled)
    else:
        df['cluster'] = -1  # fallback if no features

    G = nx.Graph()
    for _, row in df.iterrows():
        G.add_edge(row['entity_id'], row['related_entity_id'])

    return df, G

# 📈 ציור גרף קשרים
def visualize_network(G):
    logging.info("📍 מציג רשת קשרים...")
    plt.figure(figsize=(10, 8))
    nx.draw(G, with_labels=True, node_size=700, node_color="lightblue", font_size=10)
    plt.title("Network Graph of Entities")
    path = os.path.join(EXPORT_DIR, "network_graph.png")
    plt.savefig(path)
    plt.close()
    logging.info(f"🖼 גרף נשמר: {path}")

# 📄 יצירת דוח PDF
def generate_report(df, filename="enriched_data_report.pdf"):
    from fpdf import FPDF
    pdf = FPDF()
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.add_page()
    pdf.set_font("Arial", size=12)
    pdf.cell(200, 10, txt='דו"ח נתונים מעובדים', ln=True, align="C")
    pdf.ln(10)

    for _, row in df.iterrows():
        pdf.multi_cell(0, 10, txt=f"Entity ID: {row['entity_id']} | Related To: {row['related_entity_id']} | Cluster: {row['cluster']}")

    output_path = os.path.join(EXPORT_DIR, filename)
    pdf.output(output_path)
    logging.info(f"📄 דוח PDF נשמר: {output_path}")

# 🧠 פונקציית עיבוד ראשית
def analyze_search_results():
    data = fetch_data_for_enrichment()
    if data:
        enriched = enrich_data(data)
        df, graph = perform_analysis_on_enriched_data(enriched)
        generate_report(df)
        visualize_network(graph)
        logging.info("✅ עיבוד הסתיים בהצלחה.")
    else:
        logging.warning("⚠️ אין נתונים לעיבוד.")

# 📌 במידה ואתה מריץ עצמאית את הקובץ
if __name__ == "__main__":
    analyze_search_results()
