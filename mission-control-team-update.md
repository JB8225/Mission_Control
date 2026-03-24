# Mission Control — Team Screen Update
## Add Bruce and Clara to team.json

Find your team.json file in the /data/ folder of your Mission Control project.

Replace the entire contents with this updated version (keeps existing agents, adds Bruce and Clara):

```json
{
  "mission": "Build a $100M portfolio through smart acquisitions, recurring revenue, and an autonomous AI team that works 24/7.",
  "agents": [
    {
      "id": "ace",
      "name": "Ace",
      "letter": "A",
      "role": "CEO / Chief of Staff",
      "specialty": "Operations, strategy, coordination, morning briefs, daily logs",
      "model": "Claude Sonnet 4",
      "status": "Always On",
      "color": "#C9A84C",
      "emoji": "🎯",
      "tier": "executive"
    },
    {
      "id": "bruce",
      "name": "Bruce",
      "letter": "B",
      "role": "CFO / Chief Financial Officer",
      "specialty": "Accounting, cash flow, tax deadlines, large purchase review, monthly P&L across all entities",
      "model": "Claude Sonnet 4",
      "status": "Active",
      "color": "#10B981",
      "emoji": "💰",
      "tier": "executive",
      "responsibilities": [
        "Monthly P&L review — all business units",
        "Personal cash flow tracking — $25K/month goal",
        "Credit card monitoring — flags anything above 20% utilization",
        "Tax deadline calendar — POCO back-filing, 2025 returns",
        "Large purchase review — any expense over $1,000 requires sign-off",
        "BV Capital distribution tracking",
        "Real estate P&L (Poco Court, Buffalo Bend, Town Bluff)",
        "WeLoveLucy LLC distributions and K-1 tracking",
        "SBA loan debt service monitoring post-GFS close"
      ],
      "trigger": "1st and 15th of every month — JB uploads bank statements"
    },
    {
      "id": "clara",
      "name": "Clara",
      "letter": "C",
      "role": "CMO / Chief Marketing Officer",
      "specialty": "Latino market specialist, Meta ads, Resolved funnel, Scam Hotline content, film marketing",
      "model": "Claude Sonnet 4",
      "status": "Active",
      "color": "#8B5CF6",
      "emoji": "🎯",
      "tier": "executive",
      "responsibilities": [
        "Resolved Family — full funnel ownership (Meta ads, email drip, conversion)",
        "Scorecard lead generation — CPL tracking, email capture",
        "The Scam Hotline — content strategy, social growth, Fooled book launch",
        "Latino market strategy — Spanish-language content, bilingual ads",
        "Against the Order — film marketing, social buzz, content creator outreach",
        "Meta ad account — budget recommendations, creative direction, performance alerts",
        "Monthly marketing report — CPL, conversion rate, MRR growth"
      ],
      "primaryFocus": "Resolved Family launch — first 50 paying customers"
    },
    {
      "id": "maverick",
      "name": "Maverick",
      "letter": "R&D",
      "role": "Growth & Revenue Analyst",
      "specialty": "Pricing, funnels, conversion, upsell, new revenue streams",
      "model": "Claude Sonnet 4",
      "status": "Nightly",
      "color": "#EF4444",
      "emoji": "🔴",
      "tier": "rnd"
    },
    {
      "id": "atlas",
      "name": "Atlas",
      "letter": "R&D",
      "role": "Strategy & Competitive Intelligence",
      "specialty": "Market position, competitive threats, M&A, industry trends",
      "model": "Claude Sonnet 4",
      "status": "Nightly",
      "color": "#3B82F6",
      "emoji": "🔵",
      "tier": "rnd"
    },
    {
      "id": "forge",
      "name": "Forge",
      "letter": "R&D",
      "role": "Product & Technology",
      "specialty": "Tech stack, product features, automation, AI integration",
      "model": "Claude Sonnet 4",
      "status": "Nightly",
      "color": "#10B981",
      "emoji": "🟢",
      "tier": "rnd"
    },
    {
      "id": "ledger",
      "name": "Ledger",
      "letter": "R&D",
      "role": "Finance & Risk",
      "specialty": "Unit economics, margins, cash flow, debt structure, risk",
      "model": "Claude Sonnet 4",
      "status": "Nightly",
      "color": "#F59E0B",
      "emoji": "🟡",
      "tier": "rnd"
    },
    {
      "id": "compass",
      "name": "Compass",
      "letter": "R&D",
      "role": "Operations & Execution",
      "specialty": "Hiring, systems, processes, bottlenecks, 30/60/90 sequencing",
      "model": "Claude Sonnet 4",
      "status": "Nightly",
      "color": "#8B5CF6",
      "emoji": "🟣",
      "tier": "rnd"
    }
  ],
  "comingSoon": [
    {
      "letter": "D",
      "name": "TBD",
      "role": "Fire Protection Industry Specialist",
      "focus": "GFS acquisition, SafeGuard program, M&A targets"
    },
    {
      "letter": "E",
      "name": "TBD",
      "role": "Real Estate Portfolio Manager",
      "focus": "Poco Court, Buffalo Bend, Starbucks 1031, POCO LLC"
    },
    {
      "letter": "F",
      "name": "TBD",
      "role": "Film Executive Agent",
      "focus": "Against the Order development, producer outreach, Hollywood strategy"
    },
    {
      "letter": "G",
      "name": "TBD",
      "role": "Personal & Travel Agent",
      "focus": "Travel planning, personal scheduling, family coordination"
    }
  ]
}
```

## Instructions for Claude Code:

Tell Claude Code:
"Update my Mission Control team.json file with this new data. Keep the existing display logic but add Bruce and Clara as executive agents alongside Ace. Also add a 'Coming Soon' section showing D through G as placeholder agents being built. Bruce should display in green, Clara in purple."
