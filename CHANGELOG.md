# EmailDone4U Technician Portal — Changelog

## v1.9
- Wired in the real EmailDone4U logo (previously just placeholder text) —
  now shown in the sidebar and on the login screen.

## v1.8
- Aesthetic overhaul to match emc2digital.com's color language: sidebar
  flipped from a filled dark-navy panel to white with navy as an accent
  color (matching EMC2's exact brand navy, #061a40), not a background fill.
- Login screen background lightened from solid dark navy to the same
  light paper background as the rest of the app.
- Brand wordmark in the sidebar enlarged significantly (15px → 22px).
- Sidebar widened slightly and given more breathing room to accommodate
  the larger brand text without feeling cramped.

## v1.7
- Checklist now branches for "client already owns a domain" — new first
  step in Phase 2 asks, and skips straight to DNS access if so instead of
  implying a domain purchase is always needed.
- Fixed two checklist steps that had static "write here: ____" blanks
  left over from the paper version — impossible to fill in digitally.
  Both are now auto-tracked: access-removal timestamp (already recorded
  by the checkbox itself) and 30-day support expiry (now a real
  database field, calculated automatically 30 days from completion).
- Order detail (both admin and tech views) now shows the calculated
  "Support expires" date directly on the order.

## v1.6
- **Fixed a real bug, not a UI glitch:** the `profiles` table had no DELETE
  policy at all, so every technician-delete attempt was silently blocked
  by the database from day one. Added the missing policy.
- Handled the edge case that fix exposes: deleting a profile doesn't (and
  safely can't, from client-side code) delete the underlying Supabase
  login. That account would previously hang on an infinite loading
  spinner; now shows a clear "no account found" screen instead.
- You (admin) can now also be assigned to orders as a technician, see
  "My orders" and "My availability" as an admin, and appear in the
  Schedule view alongside hired techs.
- Schedule page rebuilt as a real visual hour-by-day grid (hours down
  the left side) instead of a plain start–end text table.
- All times now display consistently in 12hr format (was a mix of 12hr
  input fields and 24hr table/schedule display).

## v1.5
- Softened the "access not approved" screen copy — no longer reads as a
  definitive rejection; now acknowledges it could be pending review or a
  technical issue, and points the person to their admin either way.

## v1.4
- Fixed: registration didn't trim whitespace from name/email, which could
  make the type-to-confirm delete safeguard impossible to satisfy (an
  invisible trailing space in a stored name meant no typed input could
  ever match it). Names/emails are now trimmed on signup, and the
  confirm-delete check itself is now whitespace-tolerant as a second
  layer of defense.

## v1.3
- Checklist now shows who completed each step and when (was already being
  recorded in the database, just never displayed).
- `due_date` widened to a real date+time (`due_at`), so 24hr/48hr turnaround
  tiers can actually be set precisely, not just to a bare day.
- New order form and order detail: due date field is now a date+time
  picker, with +24h / +48h quick-set buttons.
- Live countdown badge on every order (list and detail views): shows time
  remaining, color-escalates from neutral → amber (<24h) → red (<4h) →
  solid red pulsing "Overdue" once past due.

## v1.2
- Login page restructured: two top-level tabs ("Sign in" / "New technician")
  instead of three equal tabs, with password vs. magic link as a secondary
  toggle under Sign in.
- Password field show/hide toggle on both login and registration.
- First-time-tech note explaining the approval flow, shown on registration.
- Technician revoke now requires confirmation and is reversible (Restore access).
- Added a true, permanent Delete for technicians — requires typing their
  full name to confirm. Orders/checklist history they touched is preserved;
  only the reference to their profile clears.
- Version footer added to the sidebar.

## v1.1
- Fixed Phase 7 checklist template (2 missing steps) and replaced
  reconstructed Phase 8-10 wording with the exact original doc text.
- Fixed privilege-escalation trigger blocking direct database edits
  (e.g. promoting the first admin via Supabase's Table Editor).

## v1.0
- Initial build: Supabase-backed auth (self-register + admin approval +
  magic link), orders, the 10-phase job checklist auto-seeded per order,
  tech availability, SOP notes, admin and tech portals with role-based
  routing and row-level security.

## v1.10
- New "Check DNS" button on every order (admin and tech views): looks
  up the domain's actual nameservers via a free public DNS API (no new
  backend needed) and guesses the provider (Namecheap, GoDaddy,
  Netlify, Cloudflare, Wix, Squarespace, Shopify, Vercel, and others)
  from known nameserver patterns. Unrecognized patterns show the raw
  nameservers rather than guessing wrong. Result is saved on the order
  (provider guess, raw nameserver list, last-checked time) so it's
  visible to anyone who opens that order later, not just whoever ran
  the check.

## v1.11
- Order acceptance: assigning a tech no longer implies they've seen or
  acknowledged the job. A visible light now tracks it separately --
  amber "Pending" until the assigned tech clicks "Accept this order,"
  then green "Accepted by [name] · [date/time]," same timestamped
  pattern as checklist items. Reassigning an order to a different
  tech resets acceptance, since the new tech hasn't acknowledged it.
  Visible on order detail (both admin and tech views) and as a
  compact column on the admin orders list.

## v1.12
- Lead-to-portal automation is live: a Supabase Edge Function
  ("intake-webhook") receives every intake-form submission from
  emaildone4u.com and creates the matching order automatically --
  client info, domain, registrar, tier (with due date auto-set from
  it), plus the newer fields (email username, extra addresses,
  already-owns-domain, hosting platform, wants-separate-mailbox) as
  real structured fields, not buried in notes. Requires one manual
  step in Netlify -- see SETUP_REQUIRED.txt.
- Tech email notifications: assigning a tech to an order (at creation
  or by reassigning later) now emails them via a second Edge Function
  ("notify-tech-assignment"), sent through Resend. Requires a Resend
  account + API key -- also in SETUP_REQUIRED.txt. Until that's set
  up, assignment still works normally; the notification silently
  doesn't send rather than breaking anything.
- New order fields shown on order detail (admin and tech): email
  username, extra addresses, already-owns-domain, hosting platform,
  wants-separate-mailbox -- previously captured by the intake form
  but not displayed anywhere in the portal.
