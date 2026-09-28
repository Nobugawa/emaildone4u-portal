# EmailDone4U Technician Portal — Changelog

## v1.14
- Mobile layout fixed: the sidebar no longer squeezes next to the content
  panel on small screens (which is what was cutting content off in your
  screenshots). On screens ≤768px wide, the sidebar becomes a top bar with
  the logo and a hamburger button; tapping it drops down the nav menu and
  account/sign-out/version footer as a full-width panel; picking a link
  closes the menu automatically. The working panel below it is now full
  width instead of squeezed. Desktop (>768px) is visually unchanged.

## v1.13
- Fixed stale "Formspree notification received" checklist step --
  leftover from before the move to Netlify. Now reflects reality: the
  order auto-appears via the webhook, plus an email notification.
- DNS check now also shows what the client self-reported for website
  hosting, and flags whether it matches the actually-detected DNS
  provider -- catches the common case where a site is built on one
  platform but DNS still lives somewhere else.
- New: "Email to client" -- compose and send a free-text email
  straight from the order page (admin or the assigned tech), via
  Resend. Needs the same Resend setup as tech-assignment emails --
  see SETUP_REQUIRED.txt.
- New: "Stripe invoice" (admin only) -- one click creates a Stripe
  invoice for the order's tier price and has Stripe email it directly
  to the client with a Pay button. Needs a Stripe account -- see
  SETUP_REQUIRED.txt.

(Earlier history unchanged — see your existing CHANGELOG.md.)
