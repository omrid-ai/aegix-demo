import json
from pyvis.network import Network

with open("frontend/public/data/company_analysis/mock_company.json", "r", encoding="utf-8") as f:
    data = json.load(f)

target = "Frank Black"
target_employee = next((e for e in data["employees"] if e["name"] == target), None)
if not target_employee:
    print("Employee not found")
    exit()

net = Network(height="500px", width="100%", bgcolor="#111111", font_color="white")
net.barnes_hut()
net.set_options("""
const options = {
  "nodes": {
    "borderWidth": 2,
    "size": 25,
    "color": {
      "border": "#ffffff",
      "background": "#ff4d4d"
    },
    "font": {
      "color": "#ffffff"
    },
    "shape": "circularImage"
  },
  "edges": {
    "color": {
      "color": "#888888"
    },
    "smooth": false
  },
  "physics": {
    "forceAtlas2Based": {
      "gravitationalConstant": -26,
      "centralGravity": 0.005,
      "springLength": 230,
      "springConstant": 0.18
    },
    "minVelocity": 0.75,
    "solver": "forceAtlas2Based"
  }
}
""")

net.add_node(target_employee["id"], label=target_employee["name"], title=target_employee["role"], shape="circularImage", image=target_employee["image"])

for e in data["employees"]:
    if e["id"] != target_employee["id"]:
        net.add_node(e["id"], label=e["name"], title=e["role"], shape="circularImage", image=e["image"])
        net.add_edge(target_employee["id"], e["id"])

net.write_html("frontend/public/data/graphs/social_graph_frank_black.html")

