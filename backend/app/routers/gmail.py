from typing import List, Dict
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from googleapiclient.discovery import build
import os

from app.config import settings


router = APIRouter(prefix="/gmail", tags=["gmail"])


class Email(BaseModel):
    subject: str
    sender: str
    snippet: str


def _load_credentials() -> Credentials:
    creds = None
    if os.path.exists(settings.token_file):
        try:
            creds = Credentials.from_authorized_user_file(
                settings.token_file, [settings.gmail_scopes]
            )
        except Exception:
            creds = None

    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            if not os.path.exists(settings.credentials_file):
                raise HTTPException(
                    status_code=500,
                    detail="credentials.json not found. Run OAuth helper to generate token.json.",
                )
            flow = InstalledAppFlow.from_client_secrets_file(
                settings.credentials_file, [settings.gmail_scopes]
            )
            creds = flow.run_local_server(port=8080)

        with open(settings.token_file, "w") as token:
            token.write(creds.to_json())

    return creds


@router.get("/emails", response_model=List[Email])
def list_emails(max_results: int = 10):
    creds = _load_credentials()
    service = build("gmail", "v1", credentials=creds)

    try:
        results = (
            service.users().messages().list(userId="me", maxResults=max_results).execute()
        )
        messages = results.get("messages", [])
        emails = []

        for msg in messages:
            msg_data = service.users().messages().get(userId="me", id=msg["id"]).execute()
            headers = msg_data["payload"].get("headers", [])

            subject = next((h["value"] for h in headers if h["name"] == "Subject"), "")
            sender = next((h["value"] for h in headers if h["name"] == "From"), "")
            snippet = msg_data.get("snippet", "")

            emails.append({"subject": subject, "sender": sender, "snippet": snippet})

        return emails
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))


