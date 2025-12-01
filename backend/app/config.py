import os
from dataclasses import dataclass
from pathlib import Path
from dotenv import load_dotenv


# Load env only from backend/.env to avoid picking up a bad root .env
_BACKEND_DIR = Path(__file__).resolve().parents[1]
_ENV_PATH = _BACKEND_DIR / ".env"
try:
    load_dotenv(dotenv_path=_ENV_PATH, override=False, encoding="utf-8")
except UnicodeDecodeError:
    # Ignore invalid encodings; rely on OS env vars instead
    pass


@dataclass
class Settings:
    gemini_api_key: str = os.getenv("GEMINI_API_KEY", "")
    gemini_model: str = os.getenv("GEMINI_MODEL", "gemini-1.5-flash")
    google_client_id: str = os.getenv("GOOGLE_CLIENT_ID", "")
    google_client_secret: str = os.getenv("GOOGLE_CLIENT_SECRET", "")
    gmail_scopes: str = os.getenv(
        "GMAIL_SCOPES", "https://www.googleapis.com/auth/gmail.readonly"
    )
    token_file: str = os.getenv("TOKEN_FILE", "token.json")
    credentials_file: str = os.getenv("CREDENTIALS_FILE", "credentials.json")


settings = Settings()


