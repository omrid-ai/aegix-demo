# processing/cleaning_pipeline.py

import re
import nltk

nltk.download('stopwords')
from nltk.corpus import stopwords

stop_words = set(stopwords.words('english'))

def clean_text(text):
    """
    Clean text by removing stop words, punctuation, and extra spaces.
    """
    # Remove punctuation
    text = re.sub(r'[^\w\s]', '', text)

    # Convert to lowercase
    text = text.lower()

    # Remove stopwords
    text = " ".join([word for word in text.split() if word not in stop_words])

    return text

def clean_data(data):
    """
    Clean a list of raw data items.
    """
    return [clean_text(item) for item in data]
