# Resolved Brief — Webhook Fix
## The exact code changes needed

---

## WHAT'S ALREADY BUILT (don't touch)
- `/api/session/{session_id}/generate-brief` ✅ already exists and works
- `generate_resolved_brief()` function ✅ already works
- Supabase `purchase_status` field ✅ already exists
- Supabase `walkthrough_completed` field ✅ already exists

## THE ONLY CHANGE NEEDED IN main.py

### Find this block in your samcart_webhook function (near the bottom):

```python
        result = await generate_resolved_brief(session_id, email, name)

        return JSONResponse(
            status_code=200,
            content={
                "status": "success" if result else "error",
                "session_id": session_id,
                "email": email,
                "pdf_status": result or "failed",
            }
        )
```

### Replace it with this:

```python
        # Mark session as paid — DO NOT generate PDF yet
        # PDF generates only after walkthrough is complete
        try:
            supabase.table("sessions").update({
                "purchase_status": "paid",
                "email": email,
                "last_activity_at": now_iso(),
            }).eq("session_id", session_id).execute()
            print(f"Session {session_id} marked as paid for {email}")
        except Exception as _ue:
            print(f"Session update error: {_ue}")

        # Send a "you're paid, now complete your walkthrough" email
        await send_access_granted_email(email, name, session_id)

        return JSONResponse(
            status_code=200,
            content={
                "status": "success",
                "session_id": session_id,
                "email": email,
                "pdf_status": "pending_walkthrough",
            }
        )
```

---

## ADD THIS FUNCTION (paste above the samcart_webhook function)

```python
async def send_access_granted_email(to_email: str, name: str, session_id: str) -> bool:
    """Send the 'your access is ready' email after purchase — before walkthrough."""
    if not RESEND_API_KEY:
        print(f"No RESEND_API_KEY — skipping access email to {to_email}")
        return False

    first = name.split()[0] if name else "there"
    walkthrough_url = f"https://family-crisis-playbook-production.up.railway.app/walkthrough?session={session_id}"

    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(
                "https://api.resend.com/emails",
                headers={
                    "Authorization": f"Bearer {RESEND_API_KEY}",
                    "Content-Type": "application/json",
                },
                json={
                    "from": FROM_EMAIL,
                    "to": [to_email],
                    "subject": f"{first}, your Resolved Brief session is ready",
                    "html": f"""
                    <div style="font-family: Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1B2A3D;">
                        <div style="background: #1B2A3D; padding: 32px; text-align: center;">
                            <h1 style="color: #C9A84C; font-family: Georgia, serif; margin: 0;">THE RESOLVED BRIEF</h1>
                        </div>
                        <div style="padding: 32px; background: #F5F0E8;">
                            <p>Hi {first},</p>
                            <p>Your session is ready. Click below to start your 20-minute walkthrough.</p>
                            <p>When you finish, hit the <strong>"Get My Resolved Brief"</strong> button and your personalized PDF will be generated and emailed to you immediately.</p>
                            <div style="text-align: center; margin: 32px 0;">
                                <a href="{walkthrough_url}" style="display: inline-block; padding: 16px 32px; background: #C9A84C; color: #1B2A3D; font-weight: 700; font-size: 17px; border-radius: 8px; text-decoration: none;">Start My Resolved Brief →</a>
                            </div>
                            <p style="font-size: 13px; color: #8A8578;">If the button doesn't work, copy this link: {walkthrough_url}</p>
                        </div>
                    </div>
                    """,
                },
            )
            return response.status_code in (200, 201)
    except Exception as e:
        print(f"Access email error: {e}")
        return False
```

---

## WALKTHROUGH HTML CHANGE

In your walkthrough.html, find the "GET MY RESOLVED BRIEF" button.

**Change the button behavior so it:**
1. Calls `/api/session/{session_id}/complete` to mark walkthrough done
2. Then calls `/api/session/{session_id}/generate-brief` to trigger PDF + email
3. Shows a "Your Brief is being generated..." confirmation message

**The button's onClick should do this (JavaScript):**

```javascript
async function generateBrief() {
    const btn = document.getElementById('generate-brief-btn');
    btn.disabled = true;
    btn.textContent = 'Generating your Brief...';

    try {
        // Step 1: Mark walkthrough complete
        await fetch(`/api/session/${sessionId}/complete`, { method: 'POST' });

        // Step 2: Trigger PDF generation
        const response = await fetch(`/api/session/${sessionId}/generate-brief`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: userEmail, name: userName })
        });

        const result = await response.json();

        if (result.status === 'success') {
            btn.textContent = '✅ Your Brief is on its way!';
            document.getElementById('brief-success-message').style.display = 'block';
        } else {
            btn.textContent = 'Something went wrong — please email us';
            btn.disabled = false;
        }
    } catch (err) {
        btn.textContent = 'Error — please try again';
        btn.disabled = false;
    }
}
```

**Success message to show (add to your HTML):**
```html
<div id="brief-success-message" style="display:none; padding: 24px; background: #f0fdf4; border: 1px solid #86efac; border-radius: 8px; text-align: center; margin-top: 24px;">
    <p style="font-size: 20px; font-weight: 700; color: #15803d;">Your Resolved Brief is on its way. ✅</p>
    <p style="color: #166534;">Check your inbox in the next 2-3 minutes. Check your spam folder if it doesn't arrive.</p>
    <p style="color: #166534; margin-top: 8px; font-style: italic;">"There's an envelope in my desk."</p>
</div>
```

---

## GATE: Only show "GET MY RESOLVED BRIEF" button if paid

Add this check when the walkthrough loads:

```javascript
// On walkthrough load, check if session is paid
async function checkPurchaseStatus() {
    if (!sessionId) return;
    const response = await fetch(`/api/session/${sessionId}`);
    const session = await response.json();

    if (session.purchase_status === 'paid') {
        document.getElementById('generate-brief-btn').style.display = 'block';
    } else {
        // Show "purchase required" message or redirect to SamCart
        document.getElementById('purchase-required').style.display = 'block';
    }
}
```

---

## SUPABASE — No schema changes needed
The fields you need already exist:
- `purchase_status` (text) — set to "paid" by webhook
- `walkthrough_completed` (boolean) — set to true by /complete endpoint
- `pdf_generated` (boolean) — set to true by generate-brief endpoint

---

## DEPLOY ON RAILWAY
1. Make the changes above in main.py and walkthrough.html
2. Git commit and push
3. Railway auto-deploys on push
4. Test with a real $49 purchase (or use SamCart test mode)
5. Verify: purchase → access email → walkthrough → PDF email

---

## TEST CHECKLIST
- [ ] SamCart test purchase fires webhook
- [ ] Session `purchase_status` = "paid" in Supabase
- [ ] Access email arrives with walkthrough link
- [ ] Walkthrough loads and shows "Get My Brief" button (only because paid)
- [ ] Complete walkthrough → click button → PDF generates
- [ ] PDF arrives in email within 2-3 minutes
- [ ] Session `pdf_generated` = true in Supabase
