const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export type Email = {
  subject: string;
  sender: string;
  snippet: string;
};

export type Classification = {
  category: string;
  status: string;
  confidence: number;
};

export async function fetchEmails(maxResults = 10): Promise<Email[]> {
  const res = await fetch(`${BASE_URL}/gmail/emails?max_results=${maxResults}`);
  if (!res.ok) throw new Error(`Failed to fetch emails: ${res.status}`);
  return res.json();
}

export async function classifyEmail(subject: string, body: string): Promise<Classification> {
  const res = await fetch(`${BASE_URL}/gemini/classify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ subject, body }),
  });
  if (!res.ok) throw new Error(`Failed to classify: ${res.status}`);
  return res.json();
}

export async function connectGmail(): Promise<void> {
  // Hitting the emails endpoint will trigger OAuth on first run
  await fetch(`${BASE_URL}/gmail/emails?max_results=1`).catch(() => {});
}


