# Resolved Family — Business Context
*Last updated: 2026-03-23*

## Website
resolvedfamily.com / familycrisisplaybook.com

## The Product: The Resolved Brief
- Personalized family crisis preparedness document
- 59-question guided walkthrough across 6 sections:
  1. Foundation & Legal
  2. Key People
  3. Money & Assets
  4. Insurance
  5. Digital Life
  6. Medical & Final Wishes
- AI generates personalized 12-page PDF with:
  - Narratives and action guides tailored to their gaps
  - Family emergency card
  - Vault page
  - Wallet-sized cut-out cards
- Positioning: "preparedness without the morbidity" — peace of mind, not estate planning
- Emotional hook: Most people know they should do this, almost nobody has, the consequences fall on the people they love most

## Pricing
- $49 one-time via SamCart
- FRIEND50 referral code = $24.50

## The Funnel (built)
1. Free scorecard (13 quick questions) → email capture
2. Free report card showing their gaps → makes gaps tangible
3. Email drip sequence → nurtures toward purchase
4. Long-form sales page
5. SamCart checkout ($49)
6. Walkthrough access unlocked
7. PDF delivered via email after walkthrough complete

## Affiliate Revenue (embedded)
Triggered during scorecard AND walkthrough when gaps are revealed:
- **Trust & Will** — wills
- **Ethos** — life insurance
- **1Password** — password management
- **Google One** — photo backup
*Revenue generated whether or not they buy the Brief*

## Upsell Pipeline (not yet built)
- Annual Brief update subscription (life changes, so should the Brief)
- Couples/family bundle (two Briefs at discount)
- Resolved Vault — digital secure storage for actual documents
- Premium add-ons: legal review, notarization via partner
- Physical printed version shipped to them (wallet cards already in PDF)

## Tech Stack
- FastAPI (backend)
- Supabase (database)
- SamCart (checkout)
- Claude API (AI generation)

## Current Status: PRE-LAUNCH — ONE BLOCKER
**Everything is built EXCEPT:**
The webhook split — SamCart currently triggers PDF generation on purchase.
It needs to:
1. Trigger **walkthrough access** on purchase
2. Trigger **PDF generation** only AFTER walkthrough is complete

This is one engineering session away from launch.

## What's Done ✅
- Frontend walkthrough
- PDF generator
- Sales page
- Scorecard funnel
- SamCart checkout

## What's Blocking ❌
- Webhook split (SamCart → walkthrough access → PDF on completion)

## Revenue Targets
- Goal: $5K/month MRR
- At $49: needs ~102 sales/month
- At blended $40 (accounting for FRIEND50 usage): needs ~125 sales/month

## Growth Levers
- Meta ads (primary paid channel)
- Affiliate revenue from embedded recommendations (passive)
- Referral code system (FRIEND50)
- Upsells once core funnel is converting
