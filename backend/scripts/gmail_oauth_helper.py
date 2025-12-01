import os
from pathlib import Path
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials


SCOPES = [os.getenv("GMAIL_SCOPES", "https://www.googleapis.com/auth/gmail.readonly")]

# Resolve defaults relative to backend directory so this script can be run from repo root
BACKEND_DIR = Path(__file__).resolve().parents[1]
DEFAULT_TOKEN = BACKEND_DIR / "token.json"
DEFAULT_CREDS = BACKEND_DIR / "credentials.json"

TOKEN_FILE = os.getenv("TOKEN_FILE", str(DEFAULT_TOKEN))
CREDENTIALS_FILE = os.getenv("CREDENTIALS_FILE", str(DEFAULT_CREDS))


def main():
    creds = None
    if os.path.exists(TOKEN_FILE):
        try:
            creds = Credentials.from_authorized_user_file(TOKEN_FILE, SCOPES)
        except Exception:
            creds = None

    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(CREDENTIALS_FILE, SCOPES)
            creds = flow.run_local_server(port=8080)
        with open(TOKEN_FILE, "w") as token:
            token.write(creds.to_json())

    print(f"Saved token to {TOKEN_FILE}")


if __name__ == "__main__":
    main()


