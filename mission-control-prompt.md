# Mission Control — Claude Code Build Prompt
## Paste this ENTIRE prompt into Claude Code

---

Build me a Mission Control dashboard as a Next.js app that I will deploy to Netlify.

## Tech Stack
- Next.js 14 (App Router)
- Tailwind CSS
- No database needed — reads from static JSON files I'll update manually
- Deploy target: Netlify

## Design
Clean, dark theme. Linear-inspired. Sidebar navigation on the left with icons. Main content area on the right. Professional, not flashy.

Color scheme:
- Background: #0F172A (dark navy)
- Sidebar: #1E293B
- Cards: #1E293B with #334155 borders
- Accent: #C9A84C (gold)
- Text: #F1F5F9
- Green: #10B981
- Red: #EF4444
- Orange: #F59E0B

## Sidebar Navigation (in order)
1. 🎯 Dashboard (home/overview)
2. ✅ Task Board
3. 📅 Calendar
4. 🏢 Projects
5. 🧠 Memory
6. 📄 Docs
7. 👥 Team
8. 🏬 Office

---

## SCREEN 1: Dashboard (Home)
Overview of everything at a glance.

Shows:
- Mission Statement (big, top of page): "Build a \$100M portfolio of businesses through smart acquisitions, recurring revenue models, and an autonomous AI team that works 24/7."
- Priority Actions (3 red items at top)
- Scorecard grid (FICO, GFS Deal Stage, Resolved MRR, Banker Status)
- Today's date and a "Good morning, JB" greeting

Data source: `/data/dashboard.json`

---

## SCREEN 2: Task Board
Kanban board with 4 columns: Backlog | In Progress | Review | Done

Each task card shows:
- Task title
- Assigned to (JB or Ace) — show avatar/icon
- Priority (red/orange/green dot)
- Project tag
- Due date (optional)

Left side: Live Activity Feed — a scrollable log of recent actions Ace took

Features:
- Click task to expand details
- Filter by assignee (JB / Ace)
- Add new task button (adds to Backlog)

Data source: `/data/tasks.json`

---

## SCREEN 3: Calendar
Shows scheduled cron jobs and upcoming tasks in a monthly calendar view.

Each event shows:
- Name of the task/cron job
- Time
- Recurring or one-time
- Color coded by type (cron = blue, task = gold, deadline = red)

Also shows a list view on the right of upcoming events this week.

Data source: `/data/calendar.json`

---

## SCREEN 4: Projects
Project cards in a grid. Each card shows:
- Project name + icon
- Status (Active / On Hold / Complete)
- Progress bar (0-100%)
- Last updated date
- Next action item
- Click to expand: full project details, linked tasks, linked docs

Projects to pre-populate:
1. GFS Fire Pros Acquisition — 25% — Active
2. Resolved Family Launch — 60% — Active  
3. The Scam Hotline / Fooled Book — 20% — Active
4. GFS SafeGuard Program — 10% — Active
5. Credit Score Recovery — 70% — Active

Data source: `/data/projects.json`

---

## SCREEN 5: Memory
Memory viewer organized by date.

Left panel: Calendar/date picker to select a day
Right panel: Memory entry for that day, formatted nicely like a journal

Also has a "Long-Term Memory" tab that shows MEMORY.md contents in a readable format.

Search bar at top to search across all memories.

Data source: `/data/memory/` folder — one JSON file per day (YYYY-MM-DD.json)

Pre-populate with today: 2026-03-23 — include the full session summary from today.

---

## SCREEN 6: Docs
Document library. Searchable grid of cards.

Each doc card shows:
- Title
- Category (GFS / Resolved / Scam Hotline / Finance / Strategy)
- Date created
- Format tag (PDF-ready / Reference / Playbook / Template)
- Preview of first 2 lines

Click to open full doc in a modal with formatted text.

Search bar filters by title or category.

Documents to pre-populate:
1. GFS Banker Teaser One-Pager (GFS / Playbook)
2. Woody One-Pager — Cash Offer Rebuttal (GFS / Playbook)
3. GFS SafeGuard Program (GFS / Strategy)
4. GFS 6mo/2yr/5yr Game Plan (GFS / Strategy)
5. Banker Call Prep + Script (GFS / Playbook)
6. Woody Growth Pitch (GFS / Playbook)
7. GFS Acquisition Targets — 11 DFW Companies (GFS / Reference)
8. JB Credit Payoff Plan (Finance / Reference)
9. Resolved Webhook Fix Instructions (Resolved / Technical)

Data source: `/data/docs.json`

---

## SCREEN 7: Team
Shows the org structure of JB's AI team.

Top: Mission Statement banner

Then org chart / cards:

**CEO / Chief of Staff**
- Ace 🎯
- Role: Runs operations, manages all sub-agents, morning briefs, daily logs
- Model: Claude Sonnet
- Status: Always On

**R&D Team** (5 cards)
- 🔴 Maverick — Growth & Revenue
- 🔵 Atlas — Strategy & Competitive Intel
- 🟢 Forge — Product & Technology
- 🟡 Ledger — Finance & Risk
- 🟣 Compass — Operations & Execution

**Specialist Agents** (spawned on demand)
- 🔧 Code Agent — Technical builds (Claude Code)
- 📊 Research Agent — Deep research tasks
- 📝 Content Agent — Writing, copywriting

Each card shows: Name, role, model/tool, last used, specialty

Data source: `/data/team.json`

---

## SCREEN 8: Office
2D pixel art office visualization.

Shows a top-down view of an office with:
- Ace's desk (center, always lit up when active)
- 5 R&D team desks (Maverick, Atlas, Forge, Ledger, Compass)
- A whiteboard on the wall showing current priorities
- A water cooler / meeting area
- Windows showing Dallas skyline

When agents are "working" they show a subtle animation (typing animation, glow).

Bottom of screen: Activity ticker showing latest actions in real time.

Keep it fun but professional. Pixel art style, 16-bit inspired.

Static visualization is fine — just needs to look good.

---

## Data Files to Create

Create a `/data/` folder with these JSON files pre-populated with real data:

### dashboard.json
```json
{
  "mission": "Build a \$100M portfolio of businesses through smart acquisitions, recurring revenue models, and an autonomous AI team that works 24/7.",
  "priorities": [
    {"id": 1, "text": "Call Live Oak Bank — John Randall: 317-775-0344", "urgency": "critical"},
    {"id": 2, "text": "Pay Chase card to \$1,450 (48% → 10% utilization)", "urgency": "high"},
    {"id": 3, "text": "Pay USAA before April 14 — 0% promo expires", "urgency": "high", "deadline": "2026-04-14"}
  ],
  "scorecard": [
    {"label": "FICO Score", "current": "698", "target": "750", "status": "warning"},
    {"label": "GFS Deal Stage", "current": "Pre-Banker", "target": "Closed", "status": "red"},
    {"label": "Resolved MRR", "current": "\$0", "target": "\$5,000/mo", "status": "red"},
    {"label": "Banker Pre-Qual", "current": "Not Started", "target": "This Week", "status": "red"}
  ]
}
```

### tasks.json
Pre-populate with 10-15 tasks across all projects, mix of JB and Ace assignments, across all 4 columns.

### calendar.json
Pre-populate with:
- Nightly Ace autonomous work (2am CST daily, recurring)
- R&D Team memo (nightly, recurring)
- USAA payment deadline (April 14)
- Banker call (this week, TBD)
- Resolved beta launch (this week)

### team.json, projects.json, docs.json
Pre-populate with the data described in each screen above.

---

## File Structure
```
mission-control/
├── app/
│   ├── layout.tsx
│   ├── page.tsx (Dashboard)
│   ├── tasks/page.tsx
│   ├── calendar/page.tsx
│   ├── projects/page.tsx
│   ├── memory/page.tsx
│   ├── docs/page.tsx
│   ├── team/page.tsx
│   └── office/page.tsx
├── components/
│   ├── Sidebar.tsx
│   ├── TaskCard.tsx
│   ├── ProjectCard.tsx
│   └── DocCard.tsx
├── data/
│   ├── dashboard.json
│   ├── tasks.json
│   ├── calendar.json
│   ├── projects.json
│   ├── docs.json
│   └── team.json
├── public/
├── package.json
└── netlify.toml
```

## Netlify Config
Include a `netlify.toml` with:
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

## Final Instructions
1. Build the complete app
2. Make sure `npm run dev` works locally
3. Make sure `npm run build` succeeds
4. All 8 screens should be navigable from the sidebar
5. Pre-populate all data files with the real JB/Ace data described above
6. The app should look professional and polished — this is JB's command center

When done, tell me:
- How to run it locally
- How to deploy to Netlify
- What files I need to upload to GitHub
