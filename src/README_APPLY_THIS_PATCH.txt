EmailDone4U Portal — v1.15 patch
=================================

WHAT'S ALREADY LIVE (no action needed)
---------------------------------------
The backend half of this fix is already deployed directly to your Supabase
project (najzbkjflxtyfdgqdocm) as of this conversation:
  - create-stripe-invoice  (version 5) — fixes the $0 invoice bug, adds a
    preview step (see below)
  - notify-tech-assignment (version 5) — adds Reply-To: techs@emaildone4u.com
    plus an Order # in the subject/body
  - send-client-email      (version 5, from the previous pass) — adds
    Reply-To: philos@greymatterfusion.com

WHAT YOU NEED TO APPLY
------------------------
src/components/StripeInvoice.jsx  — replace your existing file with this one
src/lib/version.js                — replace with this one (bumps to v1.15)

This is a matched pair with the create-stripe-invoice backend change above.
The backend now returns a PREVIEW on the first call and only actually
creates/sends on a second, explicit "confirm" call — your old
StripeInvoice.jsx doesn't know about that two-step handshake and would
misread the preview response as "invoice sent" (it isn't). Don't deploy
the old frontend against the new backend, or the "Sent ..." status will
show even though nothing went out.

WHAT CHANGED IN THE UI
------------------------
The button that used to say "Create & send invoice" and fire immediately
now says "Preview invoice." Clicking it shows a small box right on the
order page with the exact dollar amount, the tier, and the client's email
— nothing has touched Stripe yet. From there: "Confirm & send" actually
creates the Stripe customer/invoice and emails it to the client; "Cancel"
discards the preview with nothing sent.

APPLYING
--------
1. Copy the 2 files into your project at the paths above, overwriting the
   existing ones.
2. Merge the CHANGELOG.md v1.15 entry (included) above your v1.14 entry.
3. npm run build, then redeploy as usual.
4. Test on a throwaway order: Preview invoice → confirm the amount shown
   matches the order's tier → Confirm & send → check Stripe's dashboard
   for a real line item this time (not $0).
