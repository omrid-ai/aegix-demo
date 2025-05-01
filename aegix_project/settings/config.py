import os
from dotenv import load_dotenv

# Load environment variables from a .env file if exists
load_dotenv()

class Config:
    # General Settings
    PROJECT_NAME = "AEGIX – Autonomous Intelligence – BUILT FOR BUSINESS"
    VERSION = "1.0.0"
    DEBUG = os.getenv("DEBUG", "True") == "True"
    LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")

    # API Settings
    API_KEY = os.getenv("API_KEY", "your_default_api_key")
    API_RATE_LIMIT = int(os.getenv("API_RATE_LIMIT", 1000))  # requests per hour

    # Database Settings
    DB_HOST = os.getenv("DB_HOST", "localhost")
    DB_PORT = int(os.getenv("DB_PORT", 5432))
    DB_NAME = os.getenv("DB_NAME", "aegix_db")
    DB_USER = os.getenv("DB_USER", "postgres")
    DB_PASSWORD = os.getenv("DB_PASSWORD", "password")

    SQLALCHEMY_DATABASE_URI = (
        f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
    )

    # Telegram Bot Settings
    TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "your_bot_token")
    TELEGRAM_MONITOR_INTERVAL = int(os.getenv("TELEGRAM_MONITOR_INTERVAL", 60))  # seconds

    # Geo Settings
    CENTRAL_COORDINATES = {
        "lat": float(os.getenv("CENTRAL_LAT", 32.0853)),  # Tel Aviv default
        "lon": float(os.getenv("CENTRAL_LON", 34.7818))
    }
    MAX_DISTANCE_METERS = int(os.getenv("MAX_DISTANCE_METERS", 2000))

    # File Paths
    MODEL_PATH = os.getenv("MODEL_PATH", "data/random_forest_model.pkl")
    EXPORT_PATH = os.getenv("EXPORT_PATH", "export/reports")

    # Security
    ADMIN_USERNAME = os.getenv("ADMIN_USERNAME", "admin")
    ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "admin123")

    # Feature Toggles
    ENABLE_THREAT_ALERTS = os.getenv("ENABLE_THREAT_ALERTS", "True") == "True"
    ENABLE_GEO_ANALYTICS = os.getenv("ENABLE_GEO_ANALYTICS", "True") == "True"
    ENABLE_EXPORT_FEATURE = os.getenv("ENABLE_EXPORT_FEATURE", "True") == "True"

# Optional singleton instance
config = Config()
