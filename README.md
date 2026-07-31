# UPCYCLE Brews & Bites — Web Menu

A React + TypeScript + Vite website for UPCYCLE Brews & Bites, a rotating-location food truck.
Recreates the design handoff prototype (`design_handoff_upcycle_kitchen/`) as a real, buildable
web app: browsable/filterable menu with dietary tags and drink pairings, a Sips & Cans menu, a
Casual Catering quote calculator (food packages + bar service + add-ons), and an events schedule
with recurrence rules, per-event locations, and RSVP links.

## Getting started

```bash
npm install
npm run dev       # start the dev server
npm run build     # type-check + production build
npm run preview   # preview the production build
```

## Project structure

- `src/data.ts` — all static content and pricing/business-logic constants (menu items, sips,
  catering packages, bar tiers, add-ons, banner slides, holidays, recurring events, booking-fee
  formula).
- `src/quote.ts` — pure functions computing the live catering quote (booking fees, per-guest costs,
  bar service, tip jar, grand total), plus `submitQuotePdf` which POSTs the breakdown to the Google
  Apps Script backend (see below) so the business gets a PDF quote by email automatically.
- `src/calendar.ts` — pure functions building the month calendar grid, applying the recurrence rules
  (weekly recurring events, Mon/Tue closures, Wednesday retail-only day, holiday badges, and the
  manual override table).
- `src/components/` — one component per page section (Header, Hero, PromoBanner, MenuSection,
  SipsSection, CateringSection, ChefSection, Footer).
- `google-apps-script/` — the email backend for "Request This Quote": a Google Apps Script Web App
  that renders the quote as a PDF and emails it to the business via Gmail. See
  `google-apps-script/README.md` for deploy steps.

## Notes for production

- All photos are placeholder drop-zones (`ImagePlaceholder`) — no real photography was supplied.
- The "Request This Quote" button POSTs to the Apps Script backend in `google-apps-script/`, which
  emails a PDF of the breakdown to the business — no manual step for the customer. Until
  `QUOTE_ENDPOINT_URL` in `src/data.ts` is filled in with a deployed Web App URL, it falls back to a
  `mailto:` link with the breakdown pre-filled (today's default; nothing breaks either way).
- Calendar/RSVP currently link out to Eventbrite; a real backend for booking/RSVP management is out
  of scope here.
- Menu items, prices, chef bios, and calendar rules live in `src/data.ts` as static config — move
  this into a CMS or database so the client can edit content without a code deploy.
