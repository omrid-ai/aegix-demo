import json
from pyvis.network import Network
from pathlib import Path

with open("frontend/public/data/company_analysis/mock_company.json", encoding="utf-8") as f:
    data = json.load(f)

employees = data["employees"]
output_dir = Path("frontend/public/data/graphs")
output_dir.mkdir(parents=True, exist_ok=True)

for emp in employees:
    net = Network(height="400px", width="100%", bgcolor="#000000", font_color="white", notebook=False)
    net.barnes_hut()
    net.set_options("""
    var options = {
      "nodes": {
        "borderWidth": 1,
        "shadow": true,
        "color": {
          "border": "#ffffff",
          "background": "#2B7CE9"
        },
        "font": {
          "color": "white"
        }
      },
      "edges": {
        "color": {
          "color": "gray"
        },
        "smooth": false
      }
    }
    """)

    net.add_node(emp["id"], label=emp["name"], shape="circularImage", image=emp["image"], title=f"{emp['role']} | {emp['department']}")

    # Placeholder parents and children
    net.add_node(f"{emp['id']}_parent1", label="Parent 1", color="#ff6666")
    net.add_node(f"{emp['id']}_parent2", label="Parent 2", color="#ff6666")
    net.add_node(f"{emp['id']}_child1", label="Child", color="#66ccff")

    net.add_edge(f"{emp['id']}_parent1", emp["id"])
    net.add_edge(f"{emp['id']}_parent2", emp["id"])
    net.add_edge(emp["id"], f"{emp['id']}_child1")

    output_path = output_dir / f"family_tree_{emp['id'].replace('-', '_')}.html"
    net.write_html(str(output_path))
    print(f"✅ Created: {output_path}")
