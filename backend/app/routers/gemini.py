import json
import requests
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.config import settings


router = APIRouter(prefix="/gemini", tags=["gemini"])


class ClassifyRequest(BaseModel):
    subject: str = ""
    body: str = ""


class ClassifyResponse(BaseModel):
    category: str
    status: str
    confidence: float


GEMINI_URL = (
    "https://generativelanguage.googleapis.com/v1beta/models/"
    f"{settings.gemini_model}:generateContent"
)


@router.post("/classify", response_model=ClassifyResponse)
def classify_email(payload: ClassifyRequest):
    if not settings.gemini_api_key:
        raise HTTPException(status_code=500, detail="GEMINI_API_KEY not configured")

    headers = {
        "Content-Type": "application/json",
        "x-goog-api-key": settings.gemini_api_key,
    }

    prompt = f"""
    Classify this email into one of these categories:
    - Internships
    - Job Offers
    - Scholarships
    - Events
    - Exams & Results
    - Fee & Payment
    - Spam
    - Inbox

    Also determine status (accepted, rejected, pending, spam, paid, unpaid, upcoming, cancelled).
    Return JSON only: {{ "category": "...", "status": "...", "confidence": 0.95 }}

    Subject: {payload.subject}
    Body: {payload.body}
    """

    body = {"contents": [{"parts": [{"text": prompt}]}]}

    # Call Gemini; if it fails, fall back to keyword rules
    try:
        r = requests.post(GEMINI_URL, headers=headers, json=body, timeout=20)
        if r.status_code == 200:
            try:
                res = r.json()
                text = res["candidates"][0]["content"]["parts"][0]["text"]
                parsed = json.loads(text)
                return parsed
            except Exception:
                pass
    except Exception:
        pass

    # Keyword-based fallback classification
    text = f"{payload.subject} {payload.body}".lower()
    rules = [
        ("internships", ["internship", "intern", "summer intern", "winter intern"]),
        ("job offers", ["job offer", "offer letter", "position", "hiring", "opportunity"]),
        ("scholarships", ["scholarship", "fellowship", "grant", "tuition waiver"]),
        ("events", ["event", "webinar", "workshop", "seminar", "conference"]),
        ("exams & results", ["exam", "result", "marks", "grade", "assessment"]),
        ("fee & payment", ["fee", "payment", "invoice", "bill", "tuition"]),
        ("spam", ["unsubscribe", "winner", "lottery", "prize", "click here"]),
    ]
    for category, keywords in rules:
        if any(k in text for k in keywords):
            return {"category": category.title(), "status": "pending", "confidence": 0.8}

    return {"category": "Inbox", "status": "pending", "confidence": 0.6}


