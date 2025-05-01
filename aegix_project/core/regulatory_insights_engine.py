
import datetime

def get_regulatory_risks():
    # Mock data - replace with real data or scraper logic
    return [
        {
            "date": str(datetime.date.today()),
            "source": "SEC",
            "jurisdiction": "USA",
            "topic": "New crypto compliance requirements",
            "severity": "High"
        },
        {
            "date": str(datetime.date.today()),
            "source": "ESMA",
            "jurisdiction": "EU",
            "topic": "Tighter rules on digital finance",
            "severity": "Medium"
        },
        {
            "date": str(datetime.date.today()),
            "source": "FCA",
            "jurisdiction": "UK",
            "topic": "Risk alert on unlicensed trading platforms",
            "severity": "High"
        }
    ]
