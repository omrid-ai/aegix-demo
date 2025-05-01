def calculate_score(tx):
    return 1.0 if tx['volume'] > 200 else 0.5
