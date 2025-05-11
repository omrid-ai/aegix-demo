import pandas as pd
from sklearn.ensemble import IsolationForest

def detect_outliers(df):
    model = IsolationForest(contamination=0.2)
    df['outlier'] = model.fit_predict(df[['transaction_amount', 'transaction_frequency']])
    return df
