# Mission Control — One Buck Capital

Your command center dashboard for managing GFS Fire Pros acquisition, Resolved Family, The Scam Hotline, and everything in between.

---

## How to Run Locally

### 1. Install Node.js (one time)
Go to https://nodejs.org and download the **LTS** version. Install it like any other app.

### 2. Open Terminal
- Press `Cmd + Space`, type "Terminal", hit Enter

### 3. Navigate to the project
```bash
cd ~/Desktop/Resolved/Branding\ Info/mission-control
```

### 4. Install dependencies (first time only)
```bash
npm install
```

### 5. Start the dev server
```bash
npm run dev
```

### 6. Open in browser
Go to http://localhost:3000

---

## How to Deploy to Netlify

### Option A: Deploy via GitHub (Recommended)

1. **Create a GitHub account** at https://github.com if you don't have one
2. **Create a new repository** — click the green "New" button, name it `mission-control`
3. **Upload your files:**
   - Go to your new repo page
   - Click "uploading an existing file" link
   - Drag the entire contents of the `mission-control` folder (NOT the folder itself — the files inside it)
   - Click "Commit changes"
4. **Connect to Netlify:**
   - Go to https://app.netlify.com
   - Sign up / log in with your GitHub account
   - Click "Add new site" → "Import an existing project"
   - Select GitHub → select `mission-control` repo
   - Build settings should auto-fill from `netlify.toml`:
     - Build command: `npm run build`
     - Publish directory: `out`
   - Click "Deploy site"
5. **Done!** Netlify gives you a URL like `https://your-site-name.netlify.app`

### Option B: Drag & Drop Deploy

1. Run `npm run build` locally (requires Node.js installed)
2. Go to https://app.netlify.com/drop
3. Drag the `out` folder onto the page
4. Done!

---

## How to Update Data

All the dashboard data lives in the `/data` folder as JSON files. You can edit them directly:

- `command.json` — Home screen priorities and scorecard
- `tasks.json` — Kanban board tasks and activity feed
- `deals.json` — Deal pipeline, checklist, stats, contacts
- `credit.json` — Credit card balances and FICO data
- `sprint.json` — 30/60/90 day milestones
- `journal.json` — Journal entries and long-term memory
- `docs.json` — Document library entries
- `team.json` — Team member data
- `memos.json` — R&D team memos

After editing, push to GitHub and Netlify will auto-rebuild.

---

## Tech Stack
- Next.js 14 (App Router)
- Tailwind CSS
- Static export (no server required)
- All data in JSON files
