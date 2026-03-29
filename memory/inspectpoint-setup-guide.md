# InspectPoint — Setup & Implementation Guide for GFS SafeGuard
*Prepared by Ace | 2026-03-29 | For Danny Martinez + Mark Bryan — Day 1 post-close*

---

## WHAT INSPECTPOINT IS

InspectPoint is the industry-standard software for fire protection inspection, testing, and maintenance (ITM). It's purpose-built for fire protection companies — not a generic field service tool adapted for fire.

**Key facts:**
- Used by 15,000+ fire protection professionals
- 4.5M+ inspections processed
- AI assistant that auto-drafts inspection reports (saves 15–20 min per inspection)
- Customer-facing portal: owners log in and see their compliance status, reports, and upcoming work
- NFPA 25, NFPA 72, NFPA 10 compliant report formats built in
- Mobile app: techs complete inspections on iPhone/Android, no paper
- Integrations: QuickBooks, Stripe (for payments), most major fire panel systems

**Website:** inspectpoint.com
**Demo:** Book at inspectpoint.com/demo (free, 30 minutes)

---

## PRICING TIERS (estimated — confirm with InspectPoint sales)

InspectPoint uses per-inspection or per-user pricing depending on volume. Pricing is not publicly listed — requires a quote. Based on industry knowledge:

| Plan Level | Approximate Cost | Best For |
|---|---|---|
| Starter | ~$200–$300/month | 1–3 techs, under 100 inspections/month |
| Growth | ~$350–$500/month | 3–10 techs, 100–500 inspections/month |
| Professional | ~$500–$800/month | 10+ techs, 500+ inspections/month |
| Enterprise | Custom | Large platforms, multi-location |

**GFS starting point:** Starter or Growth depending on how aggressively you ramp the service division. At 100 SafeGuard accounts with semi-annual inspections = ~200 inspections/year in Year 1. That's comfortably in Starter.

**At $300/month for InspectPoint:**
- 100 accounts generating $35,000/month in subscription revenue
- Software cost = **0.86% of revenue**
- This is a rounding error. Don't negotiate yourself out of the right tool to save $100/month.

---

## SETUP CHECKLIST (Month 1 post-close)

### Week 1 — Account Setup
- [ ] Book InspectPoint demo (inspectpoint.com/demo) — bring Danny + the Service Sales Rep
- [ ] Sign up for the appropriate tier (start with Growth to have room)
- [ ] Set up company profile: GFS DFW Fire Pros branding, logo, address, license numbers
- [ ] Add all technician users (assign roles: Admin = Danny/Mark, Tech = inspection techs, Sales = Service Sales Rep)
- [ ] Connect QuickBooks (if GFS uses QB) — enables automatic invoice creation after inspection completion
- [ ] Set up Stripe or payment processor for online customer payments

### Week 2 — Configure Inspection Templates
- [ ] Enable standard templates: NFPA 25 (sprinkler), NFPA 72 (alarm), NFPA 10 (extinguisher)
- [ ] Customize templates with GFS branding — your logo appears on every report customers receive
- [ ] Set deficiency tracking workflow: when a tech flags a deficiency, system auto-generates a repair quote for Service Sales Rep to send
- [ ] Configure the customer portal: customers get login credentials to see their compliance dashboard

### Week 3 — Load the Database
- [ ] **Import every completed GFS job from the last 7 years into InspectPoint as "properties"**
  - Property name (building name or owner name)
  - Address
  - System types installed (alarm, sprinkler, extinguisher — check install records)
  - Install date (pulls from GFS job history)
  - Current service contract status (yes/no — most will be "no")
- [ ] Flag all properties WITHOUT a current service contract — this is the SafeGuard prospect list
- [ ] Assign each property to the Service Sales Rep for outreach

*Note for Danny: InspectPoint may be able to do a bulk import via CSV. Ask during the demo. This saves weeks of manual entry.*

### Week 4 — Train the Team
- [ ] Techs: 2-hour training session on the mobile app (InspectPoint provides onboarding)
- [ ] Service Sales Rep: train on how to pull prospect list, view property history, and send the customer portal invite after a contract is signed
- [ ] Mark Bryan: review the reporting dashboard — you'll want weekly visibility on contracts added, inspections completed, deficiencies flagged
- [ ] Run one test inspection end-to-end: tech completes on mobile → report auto-generated → customer receives via portal → invoice created in QuickBooks

---

## THE AI REPORT ASSISTANT (KEY FEATURE)

InspectPoint's AI assistant drafts inspection reports automatically based on what the tech enters on the mobile app. This is the biggest time-saver.

**How it works:**
1. Tech arrives at building, opens InspectPoint mobile app
2. Walks through inspection checklist (NFPA 25 or 72 format — pre-built)
3. Marks each item pass/fail, adds photos for any issues
4. AI drafts the full written report (narrative format) from the checklist data
5. Tech reviews and approves — takes 2–3 minutes instead of 20
6. Report is instantly available in customer portal + sent via email

**Time savings at scale:**
- 15 min saved per inspection × 200 inspections/year = 50 hours saved
- At $75/hour loaded tech cost = **$3,750/year in labor recovered from software**
- Plus: faster report delivery → faster invoicing → faster payment → better cash flow

---

## CUSTOMER PORTAL — HOW TO USE IT AS A SALES TOOL

The customer portal is an underused competitive advantage. Most fire protection companies email a PDF report and disappear. InspectPoint gives customers a live compliance dashboard.

**What customers see in the portal:**
- Current compliance status (green/yellow/red)
- All past inspection reports and certificates
- Open deficiencies and repair quotes
- Upcoming inspection dates
- System inventory (what systems they have, when installed)

**How to position this in the SafeGuard sales pitch:**

> *"With your SafeGuard contract, you get access to our compliance portal. Any time your insurance company, AHJ, or property manager asks for your fire inspection records — you log in, download, done. No more digging through email for PDFs."*

This is a meaningful differentiator from competitors who still email PDFs. It also reduces GFS's administrative load — customers self-serve instead of calling the office for records.

---

## DEFICIENCY WORKFLOW — TURNING FAILED INSPECTIONS INTO REPAIR REVENUE

Every failed inspection item is a repair opportunity. InspectPoint automates this:

1. Tech marks a deficiency during inspection (e.g., "sprinkler head corroded, recommend replacement")
2. InspectPoint auto-generates a repair recommendation in the system
3. Service Sales Rep receives alert: "New deficiency at [Building Name]"
4. Rep sends repair proposal within 24 hours (SafeGuard Silver/Gold SLA)
5. Customer approves repair → GFS dispatches tech → invoiced through QuickBooks

**Revenue impact:**
- 100 SafeGuard accounts × 2 deficiencies per building per year = 200 repair events/year
- Average repair ticket: $300–$800
- At 60% close rate: 120 repairs × $550 avg = **$66,000/year in repair revenue**
- This revenue doesn't exist today because there's no system to capture it

---

## INSPECTPOINT vs. SERVICETRADE — THE DECISION

For GFS specifically, here's the call:

| Factor | InspectPoint | ServiceTrade |
|---|---|---|
| Built for fire protection | ✅ Yes — it's all they do | ⚠️ General field service |
| AI report drafting | ✅ Yes — best in class | ❌ No |
| NFPA templates built in | ✅ Yes | ⚠️ Requires customization |
| Construction/install tracking | ❌ No | ✅ Yes |
| Customer portal | ✅ Yes | ✅ Yes |
| Ease of setup | ✅ Faster | ⚠️ More configuration |
| Cost | ~$200–$500/mo | ~$300–$600/mo |
| Best if... | Service division is separate P&L | You want one platform for everything |

**Ace's recommendation:** Start with InspectPoint for the SafeGuard service division. If Danny/Mark decide to unify construction and service tracking in one platform later, revisit ServiceTrade in Year 2. Don't delay the service launch to solve a software integration problem that doesn't exist yet.

---

## NICET CERTIFICATION NOTE

InspectPoint doesn't require technicians to be NICET certified to use the software. However, NICET certification is increasingly required by:
- Some Texas AHJs (Authority Having Jurisdiction) for inspection sign-off
- Large commercial property managers
- Insurance companies (some require certified inspector signature)

**GFS should confirm:**
- Do current GFS techs have NICET certifications? (Ask Danny — this is in HR files)
- What's the AHJ requirement in Dallas and Fort Worth specifically?
- If techs aren't certified: NICET Level I exam takes ~3 months of study. Cost: ~$170/exam.

If GFS's current install techs aren't NICET certified for inspection work, the Service Sales Rep should only be selling contracts that will be serviced by techs who are. This is a Day 1 HR/compliance check.

---

## FIRST CALL SCRIPT (for Danny or Mark)

**To InspectPoint sales (inspectpoint.com → Book a Demo):**

> "We're GFS DFW Fire Pros — a $19M fire protection company in Dallas-Fort Worth. We're launching a subscription inspection program called GFS SafeGuard and we're looking for inspection software to run the operation. We'll be onboarding 100+ commercial accounts in Year 1. We want to see InspectPoint specifically — we've heard it's purpose-built for fire protection and has AI report drafting. Can we book a 30-minute demo this week?"

**Questions to ask on the demo:**
1. What's pricing at 100 accounts/200 inspections per year?
2. Can we do a bulk CSV import of our existing customer database?
3. How does the QuickBooks integration work — is invoicing automatic?
4. What does the customer portal look like — can we white-label it with GFS branding?
5. How long does onboarding take? Do you provide training?
6. What panel/system brands do your NFPA templates cover? (Confirm Notifier, EST, Simplex compatibility with GFS's installed base)
7. Is there an API for custom integrations if we need them later?

---

## TIMELINE SUMMARY

| Week | Action |
|---|---|
| Week 1 post-close | Book demo, sign up, account setup |
| Week 2 | Configure inspection templates, connect QuickBooks |
| Week 3 | Import GFS job history, build prospect list |
| Week 4 | Train team, run first test inspection |
| Month 2 | Service Sales Rep begins outreach using prospect list |
| Month 3 | First 20–30 SafeGuard contracts signed, inspections scheduled |

---

*Prepared from workspace context by Ace — 2026-03-29*
*Source files: `gfs-safeguard-program.md`, `memory/gfs-growth-plan.md`, `memory/monitoring-partner-comparison.md`*
