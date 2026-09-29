EmailDone4U — Netlify Deployment Package
=========================================
Built: September 2026 — Package v1.17
Domain: emaildone4u.com

WHAT CHANGED THIS PASS (v1.17, all three HTML files)
--------------------------------------------------
1. Fixed copy on index.html that unintentionally implied we buy/register
   domains for clients (contradicts the no-domain-purchase policy):
   - "Security First" section, step 1: no longer says "we handle it on
     our end" for a new domain -- now says the client registers it
     themselves first, pointing to the domain FAQ.
   - "Done in four steps" section, step 2: same fix.
   - "Done in four steps" step 3: "Domain, Google Workspace, SPF..."
     changed to "DNS records, Google Workspace, SPF..." -- was implying
     we take ownership of/handle the domain itself, when we only
     configure DNS records on a domain the client already owns.
2. Made clear (as requested) that our access is TEMPORARY:
   - Security section subhead and step 1 heading now say "temporary"
     explicitly.
   - Checklist bullet: "Delegated access" -> "Temporary delegated access".
3. Domain FAQ answer now recommends three registrars with links
   (Namecheap as primary recommendation, GoDaddy, Squarespace Domains)
   instead of just naming Namecheap in passing.
4. Added a real favicon across all three pages (previously none existed
   -- browser tabs were showing the generic blank-page icon). Built from
   the envelope+checkmark mark cropped out of images/logo.png:
   /favicon.ico, /favicon.svg, /images/favicon-16x16.png,
   /images/favicon-32x32.png, /images/apple-touch-icon.png, plus
   192px/512px PNGs for Android home-screen icons. All three pages'
   <head> now link to these.

WHAT CHANGED LAST PASS (v1.16)
--------------------------------------------------
Added Google Analytics 4 tracking (the "Google tag" / gtag.js) to all
three pages -- index.html, intake_form.html, partners.html -- right
after <head>, exactly as Google's own installation instructions
specify. Measurement ID: G-7N3S64QL16 (property: Email Done 4 U,
account: Grey Matter Fusion).

Once deployed, traffic should start appearing in GA4 within a few
minutes to hours. Use GA4's own "Test installation" button (visible
on the same admin screen the tag came from) to confirm it's firing
correctly on the live site after deploy.

ONE THING NOT FIXED (flagging, not touched)
--------------------------------------------------
partners.html's <title> tag still reads "Referral Partner Program |
[YOUR BUSINESS NAME]" -- a leftover placeholder that was never filled
in with "EmailDone4U". Didn't want to guess and change it without you
confirming that's what should go there -- say the word and I'll fix it
next pass.

DEPLOYING TO NETLIFY
--------------------
1. Go to app.netlify.com
2. Drag this entire folder onto the Netlify drop zone
   OR connect your GitHub repo and set publish directory to "."
3. Site Settings -> Domain Management -> Add custom domain -> emaildone4u.com
4. HTTPS is automatic -- Netlify provisions SSL within minutes

FORM CAPTURE
------------
One active form: "email-setup-intake" on intake_form.html.
Wired to auto-create orders in the technician portal via a Supabase
Edge Function -- see the portal's SETUP_REQUIRED.txt if not connected yet.

VERSIONING
----------
All HTML files in this package share one version number (shown in
each page's footer), relabeled together on every release.

PAGES ARE INTENTIONALLY SEPARATE
---------------------------------
index.html and partners.html have NO links between them.
