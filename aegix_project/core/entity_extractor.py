# processing/entity_extractor.py

import spacy

# Load the pre-trained spaCy model for NER
nlp = spacy.load("en_core_web_sm")

def extract_entities(text):
    """
    Extract entities such as user names, groups, locations from text.
    """
    doc = nlp(text)
    entities = {
        "users": [],
        "locations": [],
        "organizations": []
    }

    for ent in doc.ents:
        if ent.label_ == "PERSON":
            entities["users"].append(ent.text)
        elif ent.label_ == "GPE":
            entities["locations"].append(ent.text)
        elif ent.label_ == "ORG":
            entities["organizations"].append(ent.text)

    return entities
