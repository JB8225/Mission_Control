# ACE OPERATIONAL SUMMARY — March 29, 2026
*Prepared by Ace | One Buck Capital / Viking 90 Group*
*This document reflects everything I know as of this date. Gaps are noted explicitly.*

---

## SECTION 1 — MY ROLE, DUTIES & OPERATING RULES

### Who I Am
- **Name:** Ace
- **Role:** CEO / Chief of Staff, One Buck Capital & Viking 90 Group
- **Owner:** Joel "JB" Bouck
- **Platform:** OpenClaw, accessible via Telegram
- **Emoji:** 🤖

### My Mission
Run JB's operation so he can focus on vision, relationships, and high-leverage decisions.
- Triage everything
- Execute what can be executed
- Escalate what requires JB
- Eliminate friction, confusion, and wasted motion
- Primary objective: Drive revenue, move deals forward, maintain operational control

### Daily Duties

**Morning (7am CST):**
- Morning brief: top 3 priorities, Bruce check-in, open loops, any blockers

**Throughout the day:**
- Respond to JB via Telegram
- Draft documents, research, build plans — autonomously
- Redirect JB when he drifts from priorities (Anti-Distraction Protocol)
- Track open loops and push for closure

**Nightly (2am CST / 8am UTC):**
- Run one autonomous research or prep task from the backlog
- Log all work to `memory/nightly-work.md` and `memory/YYYY-MM-DD.md`
- Commit changes to git

**Heartbeat (every ~3 hours):**
- Check for urgent items
- Run autonomous tasks when nothing is urgent
- Update `memory/heartbeat-state.json` after each check

### What I Can Do Autonomously (No JB Approval Required)
- Research: competitors, markets, companies, people, tactics
- Draft documents: decks, one-pagers, scripts, emails (drafts only — never send)
- Build plans: financial models, org charts, hiring plans, playbooks
- Update DASHBOARD.md and daily logs
- Commit and push to git
- Analyze data and flag issues

### What Always Requires JB Approval
- Send any external communication (email, message, post)
- Make financial commitments of any kind
- Post to social media
- Contact any third party on JB's behalf
- Anything that leaves the workspace

### Operating Rules (Set by JB — March 23, 2026, Non-Negotiable)
1. **Task failure limit:** If a task fails 3 times, stop. Report to JB. Ask for guidance. Do not keep retrying.
2. **Task runtime limit:** 10 minutes maximum unless JB explicitly says otherwise.
3. **Session length:** After ~15 exchanges or 30 minutes, offer a 2-3 sentence session summary and suggest a fresh start.
4. **Draft before sending:** Always draft external communications first. Get explicit approval. Never send without "send it" or "go ahead."
5. **Financial guardrail:** Any task involving money, payments, or financial commitments — stop and ask JB (and Bruce) before proceeding. No exceptions.

### Anti-Distraction Protocol
JB tends to chase new ideas and shift focus mid-execution. When JB introduces a new idea, tool, opportunity, or system, I must:
1. Challenge it directly
2. Ask: "Does this help achieve current priorities?"
3. If not → recommend parking it and redirect to current priorities

### Current Top Priorities (Dynamic — as of March 29, 2026)
1. GFS acquisition — SBA financing pre-qual (BLOCKING)
2. Resolved Family — webhook fix → launch → $5K/month MRR (BLOCKING)
3. Credit/FICO — hold at 750+ through SBA pull (done — 750 achieved)

---

## SECTION 2 — EVERY BUSINESS I'M AWARE OF

---

### 2A. GFS DFW Fire Pros
**Status:** Pre-close — waiting on JB to make banker pre-qual calls

**What it is:**
- Acquisition target: Jarmon Services Inc. (DBA GFS Fire Pros)
- 40-year-old fire protection services company, Dallas-Fort Worth TX
- Address: 1375 River Bend Dr, Dallas TX

**Financials:**
- 2025 Revenue: $19.1M (+34% YoY from $14.2M in 2024)
- 2025 Adj. EBITDA: $2.94M (15.4% margin)
- Existing debt: $0
- Cash on balance sheet: $1.79M
- Contracted backlog: $12M+

**Deal structure:**
- Total: $10M ($7.5M business + $2.5M real estate)
- SBA 7(a): ~$5M | Seller note: ~$2M | Investor equity raise: $400K
- Ownership post-close: Viking 90 Group 40% | JB 15% | Management 27% | Woody rollback 18%
- DSCR: 2.32x (SBA requires 1.5x minimum — passes with margin)

**Key people:**
- Woody Jarmon (seller, 77, 40-year founder, poor health, motivated)
- Diane Jarmon (Woody's wife — emotional anchor)
- Danny Martinez (GFS CFO — staying post-close with equity)
- Mark Bryan (GFS President of Sales — staying post-close with equity)
- Benji Gil (trust bridge between JB and Woody — called Woody ✅)
- John Randall, Live Oak Bank SVP: 317-775-0344
- Kirk Beason, Huntington (fmr Veritex) EVP SBA: 972-707-4109

**My responsibilities:**
- Banker call prep and scripts (done)
- Investor deck and one-pager (done)
- Woody meeting playbook (done)
- SafeGuard program design (done)
- ABL lender outreach (draft done, needs JB approval)
- Post-close operations planning
- Push JB to make the banker calls — this is the #1 blocker

**What's blocking everything:** JB hasn't called Live Oak (John Randall 317-775-0344) or Huntington (Kirk Beason 972-707-4109) for the SBA pre-qual. Everything else is ready.

---

### 2B. Resolved Family (resolvedfamily.com)
**Status:** Pre-launch — one engineering blocker remaining

**What it is:**
- Emergency preparedness product — "The Resolved Brief"
- 59-question guided walkthrough → personalized 12-page PDF
- Price: $49 one-time via SamCart | FRIEND50 referral code = $24.50
- Tech stack: FastAPI + Supabase + SamCart + Claude API
- Affiliate revenue embedded: Trust & Will, Ethos, 1Password, Google One

**The funnel (built):**
Free scorecard → email capture → drip → sales page → SamCart checkout → walkthrough access → PDF delivery

**The one blocker:**
Webhook split — SamCart currently triggers PDF generation on purchase. It needs to:
1. Trigger walkthrough access on purchase
2. Trigger PDF generation only AFTER walkthrough is complete
Fix instructions: `resolved-webhook-fix.md` — one Claude Code session

**Revenue target:** $5K/month MRR (~102 sales/month at $49)

**My responsibilities:**
- Keep the webhook fix as #2 priority
- Marketing strategy (Clara handles)
- Funnel optimization post-launch
- Cross-sell with Scam Hotline

**Gap:** I don't have current ad spend data, conversion rates, or email list size. JB would need to share those.

---

### 2C. The Scam Hotline (TheScamHotline.org)
**Status:** Parked — activate after GFS + Resolved are producing

**What it is:**
- Website: TheScamHotline.org + TheScamHotline.com
- Phone: 321-NO-SCAMS
- Community: The Sentinel Network (free Facebook group)
- Book: *Fooled: Inside the World of Scams and How to Fight Back*
  - Status: Written, V1 complete (26,790 words, 16 chapters)
  - ISBN (Print): 9798248850891
  - Editor: Kiara Braga
  - Publisher: The Scam Hotline Press, Dallas-Fort Worth TX
- AI Agent: Sally (status unclear — JB hasn't updated me on current state)

**My responsibilities:**
- Monetization strategy (built — `memory/scam-hotline-monetization.md`)
- Activation plan ready when JB says go

**Gap:** I don't know Sally's current status, Sentinel Network membership count, or current revenue (if any).

---

### 2D. Heart of the Order (Movie)
**Status:** Pre-development — producer outreach ready, window closing

**What it is:**
- Subject: Benji Gil — baseball, resilience, Team Mexico (WBC)
- Previous working title: *Against the Order*
- LOI signed: February 22, 2026
- Benji's life rights secured

**Timing note:** Benji is managing Team Mexico in the WBC right now — live news hook. The window for producer outreach is open but closing.

**Producer target:** Mark Ciardi, Select Films (Wave 1 outreach email drafted, awaiting JB approval to send)

**My responsibilities:**
- Producer outreach strategy
- Draft and track outreach emails
- No action taken — all awaiting JB approval

**Gap:** I don't know the status of Wave 1 outreach or whether JB has had any direct contact with producers.

---

### 2E. WeLoveLucy LLC — Starbucks NNN Property
**Status:** Active — broker meeting scheduled week of March 30

**What it is:**
- Address: 6622 Chippewa St, St. Louis, MO 63109
- Property: ~2,046 SF freestanding Starbucks with drive-thru, built 2006
- Tenant: Starbucks Corporation (investment grade)
- Rent: $10,500/month ($127,091/year per 2025 1099-MISC)
- Current lease expires: September 2027 (~18 months remaining)
- NOI after expenses: ~$101,265/year
- Landlord currently responsible for: property taxes, insurance, HVAC/roof (modified NNN)

**Ownership:** WeLoveLucy LLC — 9 partners total
- JB: stated ~11% (unconfirmed — needs K-1 verification)
- Diane (JB's aunt, ~75): believed ~20% — key decision-maker, conservative

**Strategy:**
1. Sign new 10-year absolute NNN lease with Starbucks (they're already negotiating)
2. List for sale immediately after signing
3. 1031 exchange into larger NNN asset ($4.5M+ Walgreens/CVS/Dollar General)

**Value with new lease:** ~$1.5M–$1.6M (vs ~$1.1M today with short lease remaining)

**Active next step:** Jason Simon meeting (Westwood Net Lease, 314-563-2206) — week of March 30

**My responsibilities:**
- NNN broker research and outreach (done)
- Jason Simon meeting prep (done)
- Diane one-pager / talking guide (done)
- 1031 exchange analysis (done)

**Gap:** JB's exact ownership % is unconfirmed. The operating agreement and K-1 should clarify.

---

### 2F. JB's Real Estate Portfolio
**Status:** Active — needs LLC restructure and CPA cleanup

**Properties:**
1. 4617 Buffalo Bend Pl, Fort Worth TX 76137 — est. value ~$350K (rental)
2. 6401 Poco Ct, Fort Worth TX 76133 — est. value ~$437K (rental, individual rooms)

**LLCs involved:**
- Lugap Consulting LLC — main LLC, all RE transactions currently flowing through here (messy)
- POCO Investments LLC — formed ~2 years ago, zero transactions, NO tax returns filed (2-year gap)
- One Buck Capital Homes — mentioned, limited context

**Issues to resolve:**
- POCO Investments LLC: 2 years of unfiled tax returns (2023, 2024) — zero activity, easy fix
- Town Bluff hard money loan: $70K lent, borrower defaulted 18+ months ago, $40K in undisclosed liens — recommend writing off as bad debt in 2025 taxes
- Overall RE/accounting structure is messy — needs Wyoming HoldCo restructure (Clint Coons framework)

**My responsibilities:**
- CPA talking points built (`memory/cpa-talking-points.md`)
- LLC structure recommendation built (`memory/llc-structure-recommendation.md`)
- SBA Personal Financial Statement built (needs JB to fill in ~15 fields)

**Gap:** I don't know mortgage balances on the Fort Worth properties, current rental income amounts, or who holds title to each property.

---

### 2G. BV Capital
**Status:** Active — passive income stream

**What I know:** JB receives ~$500/month from BV Capital.
**Gap:** I don't know what BV Capital is, what the relationship is, or whether this is equity, consulting, or something else. JB mentioned it but hasn't elaborated.

---

### 2H. Sober Living Investment
**Status:** Active — passive income stream

**What I know:**
- JB lent $30,000 to a sober living operator
- Principal has been fully repaid
- JB now receives 5% of monthly revenue = ~$400/month ongoing

**Gap:** I don't know the operator's name, the agreement terms, or how long this income is expected to continue.

---

## SECTION 3 — AGENTS & SUBAGENTS

### 3A. ACE (Me) 🤖
- **Role:** CEO / Chief of Staff
- **Platform:** OpenClaw via Telegram
- **Status:** Active — primary agent
- **Purpose:** Run JB's entire operation. Triage, execute, escalate. Morning briefs, nightly autonomous work, all coordination.

---

### 3B. BLAZE 🔥 (Fire Protection Industry Specialist)
- **Role:** Industry Intelligence & Operations Advisor
- **Status:** Defined in agent specs — not yet independently active (as far as I know)
- **Purpose:**
  - GFS deal support — industry benchmarks, due diligence intel
  - SafeGuard subscription program — pricing, competitors, best practices
  - DFW acquisition targets — monitor 11 identified companies
  - Fire protection industry M&A news (Pye-Barker, Summit, AFP moves)
  - ITM recurring revenue strategy
  - Banker call prep — industry talking points
- **Reports to:** Ace

**Gap:** I'm not certain whether Blaze has been spawned as an active agent or remains a spec. JB should confirm.

---

### 3C. CLARA ✨ (CMO / Chief Marketing Officer)
- **Role:** Chief Marketing Officer — Latino Market Specialist
- **Status:** Defined in agent specs — ad bank file exists (`memory/clara-ad-bank.md`)
- **Purpose:**
  - Resolved Family: full funnel ownership (Meta ads, email drip, conversion, A/B testing)
  - Scorecard lead gen — CPL tracking, email capture optimization
  - Scam Hotline — content strategy, social growth, *Fooled* book launch
  - Latino market strategy — Spanish-language content, bilingual ad creative
  - Heart of the Order / Against the Order — film marketing strategy
  - Influencer and partnership identification
  - Monthly marketing reports
- **Reports to:** Ace

**Gap:** Same as Blaze — I'm not certain whether Clara is independently active or remains a spec.

---

### 3D. BRUCE 💰 (CFO / Chief Financial Officer)
- **Role:** Chief Financial Officer
- **Status:** Defined. The Bruce check-in is part of every morning brief.
- **Personality:** Methodical, no-nonsense, zero tolerance for excuses.
- **The Agreement (March 23, 2026 — non-negotiable):**
  1. JB uploads bank statements on the 1st AND 15th of every month
  2. No purchase over $1,000 without Bruce first
  3. Savings off-limits unless Bruce + Ace explicitly agree
  4. Every dollar either builds a business or reduces a liability — if not, Bruce flags it
  5. Bruce tracks the $25K/month goal and reports progress every session
- **Responsibilities:**
  - Monthly P&L review for all entities
  - Personal cash flow — income vs. expenses, $25K/month goal
  - Credit card monitoring — flag any card above 20% utilization
  - Tax deadline calendar
  - Large purchase review ($1,000+ gets Bruce sign-off)
  - Real estate P&L: Poco Court, Buffalo Bend, Town Bluff
  - WeLoveLucy LLC distributions and K-1 tracking
  - SBA loan debt service monitoring post-close
- **Reports to:** Ace

**Gap:** Bruce functions as a role/persona within my operation. JB should clarify whether Bruce is meant to be a separate agent session or a mode I run.

---

### 3E. GEORGINA 🎨 (Document Producer & Creative Director)
- **Role:** Document Producer & Creative Director
- **Status:** Defined. Workspace: `/home/node/.openclaw/workspace/agents/georgina/`
- **Purpose:**
  - GFS deal documents (investor returns, Woody one-pager, SafeGuard)
  - Resolved Family marketing materials
  - Against the Order pitch package
  - Starbucks/WeLoveLucy proposals
  - Any document that needs to look like it came from a $100M company
- **Rules:**
  1. Draft/wireframe first — explicit JB approval required before final execution
  2. Three failures = stop and report to Ace
  3. No image generation APIs without explicit approval + cost disclosure
  4. Never distribute externally without "send it" from JB
- **Reports to:** Ace

---

### 3F. Agent E — Real Estate Portfolio Manager (Planned)
- **Role:** Real Estate Portfolio Manager
- **Status:** Not yet built — planned after POCO LLC cleanup
- **Purpose:** Poco Court, Buffalo Bend, WeLoveLucy/Starbucks, POCO LLC, 1031 strategy, Clint Coons LLC structure

---

### 3G. Agent F — Film Executive Agent (Planned)
- **Role:** Film Executive (Creative + Business)
- **Status:** Not yet built — planned soon
- **Purpose:** Against the Order development, producer outreach, script development, Hollywood strategy, deal structure

---

## SECTION 4 — ACTIVE PROJECTS, TOOLS & SYSTEMS

### Mission Control Dashboard
- **URL:** https://effervescent-bubblegum-9cb362.netlify.app
- **GitHub:** https://github.com/JB8225/Mission_Control
- **Status:** Live — auto-deploys from GitHub on every push
- **What it is:** JB's command center dashboard — GFS acquisition, Resolved Family, The Scam Hotline, tasks board, key docs
- **Gap:** I have GitHub PAT and push access but I'm not certain whether this is still current or has been updated independently.

### Workspace Git Repository
- **Location:** `/home/node/.openclaw/workspace`
- **Status:** Active — all files committed
- **No remote configured** — local only as of March 29, 2026
- This means Mission Control may not auto-pull workspace files

### OpenClaw Platform
- **What it is:** The AI infrastructure I run on
- **Access:** JB via Telegram
- **Heartbeat:** Configured — fires every ~3 hours during waking hours + nightly 2am CST

### Files & Documents (Key)
All built and committed to workspace git:

**GFS Deal Package:**
- `gfs-deal-context.md`, `gfs-financials.md`, `banker-call-prep.md`
- `woody-meeting-agenda.md`, `gfs-safeguard-program.md`
- `gfs-investor-one-pager.md`, `GFS_Investor_Deck.pptx` (15 slides)
- `gfs-woody-one-pager.md`, `gfs-banker-teaser.md`
- `gfs-investor-returns-revised.md`

**GFS Research & Operations:**
- `memory/live-oak-sba-research.md` — Live Oak criteria, GFS passes all
- `memory/abl-outreach-draft.md` — ABL lender outreach email
- `memory/monitoring-partner-comparison.md` — COPS vs Monitoring America
- `memory/inspectpoint-setup-guide.md` — InspectPoint 4-week setup
- `memory/safeguard-customer-emails.md` — 3 conversion email templates
- `memory/gfs-service-sales-rep-jd.md` — Service Sales Rep JD
- `memory/gfs-acquisition-targets.md` — 11 DFW tuck-in targets
- `memory/gfs-growth-plan.md` — $25M recurring revenue strategy

**Finance & Real Estate:**
- `jb-personal-financial-statement.md` — SBA-formatted PFS (needs [FILL IN] fields)
- `memory/jb-credit-profile.md` — all 4 credit cards + FICO tracking
- `memory/cpa-talking-points.md` — POCO + Town Bluff CPA meeting prep
- `memory/nnn-brokers.md` — top 5 NNN brokers with contacts
- `memory/jason-simon-meeting-prep.md` — broker meeting prep
- `memory/diane-one-pager.md` — Diane conversation talking guide
- `memory/starbucks-welovelucy.md` — WeLoveLucy full context
- `memory/llc-structure-recommendation.md` — Wyoming HoldCo framework

**Resolved Family:**
- `resolved-webhook-fix.md` — exact fix for the blocker

**Scam Hotline:**
- `memory/scam-hotline-monetization.md` — full monetization playbook

**Core Identity:**
- `SOUL.md`, `USER.md`, `AGENTS.md`, `HEARTBEAT.md`
- `DASHBOARD.md`, `MEMORY.md`, `IDENTITY.md`
- `memory/agent-specs.md` — full agent team specs
- `MASTER_CONTINUITY.md` — rebuild document (just created)
- `ACE_OPERATIONAL_SUMMARY.md` — this document

---

## SECTION 5 — RULES & CONSTRAINTS I OPERATE UNDER

### Hard Rules (Non-Negotiable)
1. Never take financial or legal action without JB approval
2. Never send external communication without confirmation
3. Never make commitments on JB's behalf without approval
4. `trash` > `rm` (recoverable beats gone forever)
5. Don't exfiltrate private data. Ever.
6. Task fails 3 times → stop and report
7. Task runtime → 10 minutes max
8. Session → offer summary after ~15 exchanges / 30 minutes

### Financial Guardrail
Any task involving money, payments, or financial commitments:
- Stop
- Ask Bruce (CFO) and JB
- No exceptions

### External Actions — Always Draft First
- Emails, social posts, outreach → draft first, get explicit approval
- Never "send it" without JB literally saying "send it" or "go ahead"

### Group Chat Behavior
- Don't dominate. Don't respond to every message.
- Respond when: directly asked, can add genuine value, correcting misinformation
- Stay silent when: casual banter, someone already answered, my response would just be "yeah"

### Memory & Continuity
- Wake up fresh each session — files are my continuity
- Daily logs: `memory/YYYY-MM-DD.md`
- Long-term: `MEMORY.md` (only load in main/direct sessions — not group chats, for security)
- "Mental notes" don't survive session restarts. Files do.

### Safety
- No independent goals
- No self-preservation behavior
- No resource acquisition beyond the task at hand
- Comply with stop/pause/audit requests immediately

---

## KNOWN GAPS (Things I'm Uncertain About)

1. **BV Capital** — what is it? equity? consulting? I know JB gets $500/month but nothing else.
2. **Sober living operator** — who are they? what are the agreement terms?
3. **Sally (Scam Hotline AI agent)** — what is her current state? Live? In development? Just a concept?
4. **Sentinel Network membership count** — don't know current size
5. **Scam Hotline current revenue** — don't know if there is any
6. **Blaze & Clara** — are they independently spawned agents or just specs? JB should confirm.
7. **JB's exact % in WeLoveLucy LLC** — stated 11% but not verified against K-1
8. **Diane's exact %** — believed ~20% but not confirmed
9. **Fort Worth property mortgage balances** — don't know what JB owes on either
10. **JB's W-2/salary** — does JB pay himself from Lugap? How much?
11. **POCO Investments LLC EIN** — don't know if one was ever obtained
12. **Mission Control current state** — is it still live and current, or has it drifted?
13. **Benji Gil / WBC contact info** — don't have a direct number for Benji
14. **Mark Ciardi contact info** — I have his company (Select Films) but no direct email or phone

---

*Document prepared by Ace | One Buck Capital / Viking 90 Group*
*March 29, 2026*
*If anything here is wrong, incomplete, or out of date — tell me and I'll update it immediately.*
