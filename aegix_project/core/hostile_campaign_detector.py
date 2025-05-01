import json
from collections import defaultdict
from datetime import datetime
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans

class HostileCampaignDetector:
    def __init__(self, data_file="data/hostile_campaign_samples.json", n_clusters=3):
        self.data_file = data_file
        self.n_clusters = n_clusters
        self.raw_data = []
        self.clustered = {}
        self.vectorizer = TfidfVectorizer(stop_words='english')

    def load_data(self):
        with open(self.data_file, "r", encoding="utf-8") as f:
            self.raw_data = json.load(f)
        print(f"✅ Loaded {len(self.raw_data)} messages for analysis")

    def preprocess_texts(self):
        return [msg["text"] for msg in self.raw_data]

    def cluster_messages(self):
        texts = self.preprocess_texts()
        X = self.vectorizer.fit_transform(texts)
        model = KMeans(n_clusters=self.n_clusters, random_state=42)
        self.cluster_labels = model.fit_predict(X)

    def assign_clusters(self):
        clustered = defaultdict(list)
        for i, msg in enumerate(self.raw_data):
            cluster_id = self.cluster_labels[i]
            clustered[cluster_id].append(msg)
        self.clustered = clustered
        print(f"✅ Assigned messages to {len(clustered)} clusters")

    def generate_summary(self):
        summary = []
        for cluster_id, messages in self.clustered.items():
            example_texts = [m["text"][:100] for m in messages[:3]]
            summary.append({
                "cluster_id": cluster_id,
                "messages_count": len(messages),
                "sample_messages": example_texts,
                "top_group": messages[0]["group"],
                "start_time": messages[0]["timestamp"]
            })
        return summary

    def run(self):
        self.load_data()
        self.cluster_messages()
        self.assign_clusters()
        return self.generate_summary()
