# UPCYCLE Brews & Bites — Web Menu

A React + TypeScript + Vite website for UPCYCLE Brews & Bites, a rotating-vendor food truck
residing at Speakeasy Motors. Recreates the design handoff prototype (`design_handoff_upcycle_kitchen/`)
as a real, buildable web app: browsable/filterable menu with dietary tags and drink pairings, a
Sips & Cans menu, a Casual Catering quote calculator (food packages + bar service + add-ons), a
Guest Chef spotlight with carousel, and a vendor/events calendar with recurrence rules and RSVP links.

## Getting started

```bash
npm install
npm run dev       # start the dev server
npm run build     # type-check + production build
npm run preview   # preview the production build
```

## Project structure

- `src/data.ts` — all static content and pricing/business-logic constants (menu items, sips,
  catering packages, bar tiers, add-ons, guest chefs, banner slides, holidays, recurring events,
  booking-fee formula).
- `src/quote.ts` — pure functions computing the live catering quote (booking fees, per-guest costs,
  bar service, tip jar, grand total, and the pre-filled `mailto:` quote request).
- `src/calendar.ts` — pure functions building the month calendar grid, applying the recurrence rules
  (Nth-Thursday guest chefs, weekly recurring events, Mon/Tue closures, Wednesday retail-only day,
  holiday badges, and the manual override table).
- `src/components/` — one component per page section (Header, Hero, PromoBanner, MenuSection,
  SipsSection, CateringSection, ChefSection, Footer).

## Notes for production

- All photos are placeholder drop-zones (`ImagePlaceholder`) — no real photography was supplied.
- The catering quote's "Request This Quote" button is a `mailto:` link with the full breakdown
  pre-filled. Replace with a real form submission + email service (e.g. a serverless function using
  Resend/SendGrid) for production.
- Calendar/RSVP currently link out to Eventbrite; a real backend for booking/RSVP management is out
  of scope here.
- Menu items, prices, chef bios, and calendar rules live in `src/data.ts` as static config — move
  this into a CMS or database so the client can edit content without a code deploy.
