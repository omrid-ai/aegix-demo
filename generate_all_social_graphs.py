import json
from pyvis.network import Network
import os

# טען את הנתונים
with open("frontend/public/data/company_analysis/mock_company.json", "r", encoding="utf-8") as f:
    data = json.load(f)

employees = data["employees"]
output_dir = "frontend/public/data/trees"
os.makedirs(output_dir, exist_ok=True)

# צור עץ משפחתי עבור כל עובד
for emp in employees:
    net = Network(height="500px", width="100%", bgcolor="#000000", font_color="white", directed=True)
    net.barnes_hut()

    # הוספת העובד המרכזי
    net.add_node(emp["id"], label=emp["name"], title=emp["role"], shape="circularImage", image=emp["image"])

    # הוספת קרובי משפחה
    if "family_tree" in emp and emp["family_tree"]:
        for rel in emp["family_tree"]:
            rel_id = f'{emp["id"]}-{rel["name"].lower().replace(" ", "-")}'
            net.add_node(rel_id, label=rel["name"], title=rel["relation"], color="#6EE7B7")
            net.add_edge(rel_id, emp["id"], label=rel["relation"])

    filename = f"{output_dir}/family_tree_{emp['id'].replace('-', '_')}.html"
    net.show(filename)
    print(f"✅ Created: {filename}")
