from sklearn.cluster import KMeans

def cluster_transactions(data):
    model = KMeans(n_clusters=3, random_state=0)
    model.fit(data[['transaction_amount', 'transaction_frequency']])
    data['cluster'] = model.labels_
    return data
