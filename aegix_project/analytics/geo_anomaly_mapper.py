# geo_anomaly_mapper.py
def map_to_geo(anomalies):
    return [{"lat": a["lat"], "lon": a["lon"], "user": a["user"], "risk": a["risk"]} for a in anomalies if "lat" in a]
