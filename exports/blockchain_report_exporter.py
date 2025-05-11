import pandas as pd

def export_to_csv(data, path="blockchain_outliers_export.csv"):
    df = pd.DataFrame(data)
    df.to_csv(path, index=False)
