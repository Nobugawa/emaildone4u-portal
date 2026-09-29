# EmailDone4U Technician Portal — Changelog

## v1.15
- **Fixed the $0 Stripe invoice bug.** Stripe's API, on current versions,
  does NOT automatically attach a freshly-created line item to the next
  invoice you create for that customer unless you explicitly say so. The
  code was creating the line item, then immediately creating an empty
  invoice right after it -- so the invoice that reached the client had no
  line item and totaled $0. Fixed on the backend (already deployed to
  Supabase, no action needed there).
- **Stripe invoice now previews before sending.** Clicking used to create
  the Stripe customer, the line item, and send the invoice to the client
  in one irreversible click. Now: first click shows the exact amount,
  description, and client email in a confirm box, right there on the
  order page -- nothing is created in Stripe and nothing is emailed until
  you click "Confirm & send." "Cancel" backs out with nothing sent.
- **Tech-assignment emails now have a real reply-to** (already deployed):
  replies go to techs@emaildone4u.com instead of the unmonitored sending
  address, and both the subject and body now include an Order # so a
  reply is identifiable — paired with the reply's own From address
  (the tech's known email), that tells you which tech and which order
  without opening the portal.

## v1.14
- Mobile layout fixed: sidebar becomes a top bar with a hamburger menu on
  screens ≤768px; working panel is full width below it.
- Client-email Reply-To fixed: replies now go to philos@greymatterfusion.com
  instead of dead-ending at the sending-only notifications@ address.
- Fixed the CORS bug that silently broke "Email to client," "Stripe
  invoice," and tech-assignment notification emails since they shipped —
  the browser's preflight succeeded but the real request was blocked
  client-side and never reached Supabase at all.

(Earlier history unchanged — see your existing CHANGELOG.md.)
