def analyze_patterns(transactions):
    return {'peaks': [tx for tx in transactions if tx['volume'] > 100]}
