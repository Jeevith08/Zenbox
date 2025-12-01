# ZenBox Backend (FastAPI)

## Setup

Create and activate a Python 3.10+ virtual environment, then install:

```bash
pip install -r backend/requirements.txt
```

Create a `.env` in `backend/` with:

```bash
GEMINI_API_KEY=your_key
GMAIL_SCOPES=https://www.googleapis.com/auth/gmail.readonly
TOKEN_FILE=token.json
CREDENTIALS_FILE=credentials.json
```

Place your Google OAuth `credentials.json` in `backend/` and run the OAuth helper to generate `token.json` or hit `/gmail/emails` once to trigger login.

## Run

```bash
uvicorn app.main:app --reload --app-dir backend
```

## Endpoints

- GET /health
- POST /gemini/classify { subject, body }
- GET /gmail/emails?max_results=10


