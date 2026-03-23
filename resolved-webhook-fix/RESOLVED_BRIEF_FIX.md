# Resolved Brief — Webhook Fix
**Status:** Ready to paste into Claude Code  
**Problem:** SamCart webhook fires → PDF generated immediately, before walkthrough answers exist  
**Fix:** Webhook creates session only → user does walkthrough → button calls `/generate-brief` → PDF generated with real answers, emailed

---

## What Exists (Don't Break These)

From the live API (`/openapi.json`), the app already has:
- `POST /api/session/start` — creates a session (email, first_name)
- `POST /api/session/{id}/answer` — saves answers
- `POST /api/session/{id}/complete` — marks walkthrough done
- `POST /api/session/{id}/generate-brief` — exists but wired as "testing only"
- `POST /api/webhook/samcart` — **currently generates PDF here (the bug)**

---

## Step 1 — Supabase Migration

Run this SQL in your **Supabase SQL Editor**:

```sql
-- Add paid session tracking columns to your sessions table
-- (adjust table name if yours is different — common names: sessions, walkthrough_sessions, user_sessions)

ALTER TABLE sessions
  ADD COLUMN IF NOT EXISTS is_paid BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS walkthrough_complete BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS brief_generated BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS samcart_order_id TEXT,
  ADD COLUMN IF NOT EXISTS brief_generated_at TIMESTAMPTZ;

-- Index for looking up sessions by email (useful for webhook dedup)
CREATE INDEX IF NOT EXISTS idx_sessions_email ON sessions(email);
CREATE INDEX IF NOT EXISTS idx_sessions_samcart_order ON sessions(samcart_order_id);
```

> **Note:** If your sessions table is named differently (e.g., `walkthrough_sessions`), update accordingly.

---

## Step 2 — Code Changes

Paste these into Claude Code. Each section is labeled with the file it belongs in.

### 2a. Pydantic Models (add to your models file or top of main.py)

```python
# ─── MODELS ──────────────────────────────────────────────────────────────────

from pydantic import BaseModel
from typing import Optional

class SamCartWebhookPayload(BaseModel):
    """
    SamCart sends a POST with JSON on purchase.
    These are the fields we care about — SamCart includes many more.
    Field names may vary slightly by SamCart plan/version; log the raw payload
    on first test and adjust if needed.
    """
    # Customer info — SamCart nests these under 'customer' in some versions
    # We handle both flat and nested below in the endpoint
    customer: Optional[dict] = None      # nested: customer.email, customer.first_name
    order: Optional[dict] = None         # nested: order.id
    
    # Flat versions (older SamCart webhooks send flat)
    customer_email: Optional[str] = None
    customer_first_name: Optional[str] = None
    order_id: Optional[str] = None

    class Config:
        extra = "allow"  # Accept any extra fields SamCart sends — don't error on unknown keys
```

### 2b. Modified SamCart Webhook (REPLACE the existing `/api/webhook/samcart` handler)

```python
# ─── SAMCART WEBHOOK ─────────────────────────────────────────────────────────

import uuid
import logging
from fastapi import APIRouter, Request, HTTPException
from fastapi.responses import JSONResponse

logger = logging.getLogger(__name__)
router = APIRouter()  # If you already have a router, add to it — don't create a new one


@router.post("/api/webhook/samcart")
async def samcart_webhook(request: Request):
    """
    Receives SamCart purchase webhook.
    
    FIXED BEHAVIOR:
    - Creates a paid session in Supabase
    - Returns the walkthrough URL with session_id
    - Does NOT generate a PDF (that happens after walkthrough, via /generate-brief)
    
    SamCart must be configured to POST to:
    https://family-crisis-playbook-production.up.railway.app/api/webhook/samcart
    """
    # Parse raw body — SamCart payload structure can vary, so we grab everything
    try:
        payload = await request.json()
    except Exception:
        # SamCart sometimes sends form-encoded data
        form = await request.form()
        payload = dict(form)

    logger.info(f"SamCart webhook received: {payload}")  # Log full payload for debugging

    # ── Extract email and name (handle both nested and flat formats) ──────────
    email = (
        payload.get("customer", {}).get("email")           # nested format
        or payload.get("customer_email")                    # flat format
        or payload.get("email")                             # fallback
    )
    first_name = (
        payload.get("customer", {}).get("first_name")
        or payload.get("customer_first_name")
        or payload.get("first_name")
        or "Friend"  # fallback so PDF doesn't say "None"
    )
    order_id = (
        payload.get("order", {}).get("id")
        or payload.get("order_id")
        or payload.get("id")
        or str(uuid.uuid4())  # generate one if missing
    )

    if not email:
        logger.error(f"No email in SamCart payload: {payload}")
        # Return 200 to SamCart (they retry on non-200) but log the error
        return JSONResponse({"status": "error", "message": "No email in payload"}, status_code=200)

    # ── Deduplicate: check if this order already has a session ────────────────
    existing = (
        supabase
        .table("sessions")
        .select("id")
        .eq("samcart_order_id", str(order_id))
        .execute()
    )
    if existing.data:
        session_id = existing.data[0]["id"]
        logger.info(f"Duplicate SamCart webhook for order {order_id}, returning existing session {session_id}")
        return JSONResponse({
            "status": "ok",
            "session_id": session_id,
            "walkthrough_url": f"https://family-crisis-playbook-production.up.railway.app/walkthrough?session={session_id}",
            "message": "Existing session returned (duplicate webhook)"
        })

    # ── Create a new paid session in Supabase ─────────────────────────────────
    session_id = str(uuid.uuid4())
    session_data = {
        "id": session_id,
        "email": email,
        "first_name": first_name,
        "is_paid": True,                    # This is a paid customer
        "walkthrough_complete": False,       # Not done yet
        "brief_generated": False,            # PDF not generated yet
        "samcart_order_id": str(order_id),
        "created_at": "now()",              # Supabase handles this if you have default
    }

    try:
        result = supabase.table("sessions").insert(session_data).execute()
        if not result.data:
            raise Exception("Supabase insert returned no data")
    except Exception as e:
        logger.error(f"Failed to create session for {email}: {e}")
        return JSONResponse({"status": "error", "message": str(e)}, status_code=200)

    walkthrough_url = f"https://family-crisis-playbook-production.up.railway.app/walkthrough?session={session_id}"
    
    logger.info(f"Created paid session {session_id} for {email}, order {order_id}")

    # ── Return the walkthrough URL ────────────────────────────────────────────
    # SamCart can use this URL to redirect the customer post-purchase
    # Configure SamCart's "Success URL" to use this endpoint's response,
    # OR set SamCart's success page URL directly to /walkthrough?session={id}
    # if you pre-create sessions a different way.
    return JSONResponse({
        "status": "ok",
        "session_id": session_id,
        "walkthrough_url": walkthrough_url,
        "email": email,
        "message": "Session created. Customer should be directed to walkthrough URL."
    })
```

### 2c. Generate Brief Endpoint (REPLACE the existing `/generate-brief` handler)

```python
# ─── GENERATE BRIEF ──────────────────────────────────────────────────────────

@router.post("/api/session/{session_id}/generate-brief")
async def generate_brief(session_id: str):
    """
    Called when user clicks "GET MY RESOLVED BRIEF" after completing the walkthrough.
    
    1. Verifies session exists and is paid
    2. Loads all walkthrough answers from Supabase
    3. Generates PDF using Claude API (same logic as before)
    4. Emails PDF to customer via Resend
    5. Marks session as brief_generated = true, walkthrough_complete = true
    
    Frontend should call: POST /api/session/{session_id}/generate-brief
    No request body needed — everything comes from Supabase.
    """

    # ── 1. Load session from Supabase ─────────────────────────────────────────
    session_result = (
        supabase
        .table("sessions")
        .select("*")
        .eq("id", session_id)
        .single()
        .execute()
    )

    if not session_result.data:
        raise HTTPException(status_code=404, detail="Session not found")

    session = session_result.data

    # ── 2. Guard: must be a paid session ─────────────────────────────────────
    if not session.get("is_paid"):
        raise HTTPException(
            status_code=403,
            detail="This session is not associated with a purchase. Please complete checkout first."
        )

    # ── 3. Guard: don't generate twice ───────────────────────────────────────
    if session.get("brief_generated"):
        logger.info(f"Brief already generated for session {session_id}, returning success")
        return {"status": "already_generated", "message": "Your brief has already been sent!"}

    email = session.get("email")
    first_name = session.get("first_name", "Friend")

    if not email:
        raise HTTPException(status_code=400, detail="No email on file for this session")

    # ── 4. Load walkthrough answers ───────────────────────────────────────────
    # Adjust this query to match how your app stores answers
    # Option A: answers are stored as a JSONB column on the session row itself
    answers = session.get("answers", {})
    
    # Option B: answers are in a separate 'answers' table — uncomment if needed:
    # answers_result = (
    #     supabase
    #     .table("answers")
    #     .select("*")
    #     .eq("session_id", session_id)
    #     .execute()
    # )
    # answers = {row["question_id"]: row["answer"] for row in (answers_result.data or [])}

    if not answers:
        raise HTTPException(
            status_code=400,
            detail="No walkthrough answers found. Please complete the walkthrough first."
        )

    # ── 5. Generate PDF ───────────────────────────────────────────────────────
    # This calls your existing PDF generation logic — don't change the PDF code itself
    # Just move the call here instead of in the webhook
    try:
        pdf_bytes = await generate_resolved_brief_pdf(
            session_id=session_id,
            email=email,
            first_name=first_name,
            answers=answers
        )
    except Exception as e:
        logger.error(f"PDF generation failed for session {session_id}: {e}")
        raise HTTPException(status_code=500, detail=f"PDF generation failed: {str(e)}")

    # ── 6. Email PDF to customer ──────────────────────────────────────────────
    try:
        await send_brief_email(
            to_email=email,
            first_name=first_name,
            pdf_bytes=pdf_bytes
        )
    except Exception as e:
        logger.error(f"Email send failed for session {session_id}: {e}")
        raise HTTPException(status_code=500, detail=f"Email delivery failed: {str(e)}")

    # ── 7. Mark session complete in Supabase ──────────────────────────────────
    from datetime import datetime, timezone
    supabase.table("sessions").update({
        "walkthrough_complete": True,
        "brief_generated": True,
        "brief_generated_at": datetime.now(timezone.utc).isoformat()
    }).eq("id", session_id).execute()

    logger.info(f"Brief generated and emailed for session {session_id} → {email}")

    return {
        "status": "ok",
        "message": f"Your Resolved Brief has been sent to {email}!",
        "email": email
    }
```

### 2d. Helper: `send_brief_email` (update your existing email function)

```python
async def send_brief_email(to_email: str, first_name: str, pdf_bytes: bytes):
    """
    Sends the Resolved Brief PDF to the customer via Resend.
    Update RESEND_FROM_EMAIL in your Railway env vars.
    """
    import resend  # pip install resend
    import base64

    resend.api_key = os.environ["RESEND_API_KEY"]

    # Encode PDF as base64 attachment
    pdf_b64 = base64.b64encode(pdf_bytes).decode("utf-8")

    params = {
        "from": os.environ.get("RESEND_FROM_EMAIL", "Resolved Family <brief@resolvedfamily.com>"),
        "to": [to_email],
        "subject": f"{first_name}, your Resolved Brief is ready!",
        "html": f"""
            <h2>Hi {first_name},</h2>
            <p>Your personalized <strong>Resolved Brief</strong> is attached to this email.</p>
            <p>This is your family's custom crisis playbook — built from your answers in the walkthrough.</p>
            <p>Keep it somewhere safe, and share it with your household.</p>
            <br>
            <p>— The Resolved Family Team</p>
        """,
        "attachments": [
            {
                "filename": "Resolved-Brief.pdf",
                "content": pdf_b64,
                "type": "application/pdf"
            }
        ]
    }

    resend.Emails.send(params)
```

---

## Step 3 — Frontend Change (Critical)

The "GET MY RESOLVED BRIEF" button needs to call the generate-brief endpoint.

**Find the button in your HTML/JS and update it to:**

```javascript
// When user clicks "GET MY RESOLVED BRIEF"
async function generateBrief(sessionId) {
    const btn = document.getElementById('generate-brief-btn');
    btn.disabled = true;
    btn.textContent = 'Generating your brief...';

    try {
        const response = await fetch(`/api/session/${sessionId}/generate-brief`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });

        const data = await response.json();

        if (response.ok) {
            btn.textContent = '✅ Brief sent to your email!';
            // Optionally show success message
            document.getElementById('success-message').textContent = data.message;
        } else {
            btn.disabled = false;
            btn.textContent = 'GET MY RESOLVED BRIEF';
            alert('Something went wrong: ' + (data.detail || 'Please try again.'));
        }
    } catch (err) {
        btn.disabled = false;
        btn.textContent = 'GET MY RESOLVED BRIEF';
        alert('Network error. Please try again.');
    }
}

// Make sure session_id is in the URL or stored when page loads
// e.g., /walkthrough?session=abc-123
const sessionId = new URLSearchParams(window.location.search).get('session');
```

---

## Step 4 — SamCart Configuration

In your **SamCart dashboard**:

1. Go to your product → **Integrations** → **Webhooks**
2. Set webhook URL to:  
   `https://family-crisis-playbook-production.up.railway.app/api/webhook/samcart`
3. Set **Success Page / Thank You URL** to:  
   `https://family-crisis-playbook-production.up.railway.app/walkthrough?session={session_id}`
   
   ⚠️ **Challenge here:** SamCart fires the webhook server-side, but the customer redirect needs the session_id. Two options:
   
   **Option A (Recommended):** Set SamCart's success page URL to a landing page that takes the customer's email and looks up their session:
   - Create `GET /start?email={email}` endpoint that looks up the most recent paid session for that email and redirects to `/walkthrough?session={id}`
   - SamCart success URL: `https://family-crisis-playbook-production.up.railway.app/start?email={customer_email}`
   
   **Option B:** Use SamCart's "Order Confirmation" page with a custom redirect that embeds the email, then have your landing page do the lookup.

### Option A — Email Lookup Redirect (Add this endpoint)

```python
@router.get("/start")
async def start_by_email(email: str):
    """
    SamCart redirects customer here after purchase.
    Looks up their paid session by email and redirects to walkthrough.
    URL: /start?email=customer@example.com
    """
    from fastapi.responses import RedirectResponse, HTMLResponse

    if not email:
        return HTMLResponse("<h2>Missing email. Please contact support.</h2>", status_code=400)

    # Find most recent paid session for this email
    result = (
        supabase
        .table("sessions")
        .select("id")
        .eq("email", email)
        .eq("is_paid", True)
        .order("created_at", desc=True)
        .limit(1)
        .execute()
    )

    if not result.data:
        # Session not found — webhook may not have fired yet, wait and retry
        # Simple retry page
        return HTMLResponse(f"""
            <html><body>
            <h2>Setting up your walkthrough...</h2>
            <p>Just a moment while we prepare your Resolved Brief experience.</p>
            <script>
                setTimeout(() => {{ window.location.reload(); }}, 3000);
            </script>
            </body></html>
        """)

    session_id = result.data[0]["id"]
    return RedirectResponse(f"/walkthrough?session={session_id}", status_code=302)
```

---

## Step 5 — Railway Deploy

```bash
# 1. Make your code changes locally (using Claude Code)

# 2. Commit
git add -A
git commit -m "fix: webhook creates session only, generate-brief endpoint does PDF+email"

# 3. Push to main (Railway auto-deploys from main)
git push origin main

# 4. Watch the deploy in Railway dashboard
# Dashboard → Your Project → Deployments → Latest

# 5. Verify with Railway logs
# Dashboard → Your Project → Logs
# Look for: "SamCart webhook received" and no PDF generation on webhook
```

### Railway Env Vars to Verify

Make sure these are set in Railway → Your Service → Variables:

| Variable | Purpose |
|---|---|
| `SUPABASE_URL` | Your Supabase project URL |
| `SUPABASE_KEY` | Supabase service role key (not anon key) |
| `RESEND_API_KEY` | For sending emails |
| `RESEND_FROM_EMAIL` | e.g. `brief@resolvedfamily.com` |
| `ANTHROPIC_API_KEY` | For Claude PDF generation |

---

## Step 6 — Test Checklist

1. **Webhook test:**  
   ```bash
   curl -X POST https://family-crisis-playbook-production.up.railway.app/api/webhook/samcart \
     -H "Content-Type: application/json" \
     -d '{"customer": {"email": "test@example.com", "first_name": "Test"}, "order": {"id": "test-order-123"}}'
   ```
   Expected: `{"status": "ok", "session_id": "...", "walkthrough_url": "..."}`  
   **No email should arrive yet.**

2. **Verify session in Supabase:**  
   Check `sessions` table — should see a row with `is_paid=true`, `brief_generated=false`

3. **Generate brief test:**  
   ```bash
   curl -X POST https://family-crisis-playbook-production.up.railway.app/api/session/{SESSION_ID}/generate-brief
   ```
   Expected: PDF emailed, `brief_generated=true` in Supabase

4. **Full flow test:** Do a real SamCart test purchase → check redirect → complete walkthrough → click button → verify email arrives

---

## Summary of Changes

| What | Before | After |
|---|---|---|
| Webhook | Creates session + generates PDF | Creates session only, returns walkthrough URL |
| `/complete` endpoint | May generate PDF | Just marks complete (no PDF) |
| `/generate-brief` | Test-only stub | Production: generates PDF from answers, emails customer |
| Supabase schema | Missing paid/complete tracking | `is_paid`, `walkthrough_complete`, `brief_generated`, `brief_generated_at` |
| SamCart success URL | Direct to thank-you page | `/start?email={email}` → looks up session → `/walkthrough?session={id}` |
