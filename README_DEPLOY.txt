EmailDone4U Portal v1.15 -- BUILT (ready to deploy)
====================================================
This is a compiled build made by patching your live v1.13 bundle, so
everything else (login, checklist, schedule, SOP) is unchanged.

APPLY TO THE GITHUB REPO (emaildone4u-portal), in GitHub Desktop:
1. In the repo folder, DELETE the old files in assets/ named
   index-yZ0ox3ix.js and index-Ck-pPvkY.css  (keep logo-Ds2UhIQx.png).
2. Copy from this zip into the repo, overwriting:
   index.html, assets/ (the two new index-v115-* files), CHANGELOG.md
3. Leave everything else alone (_redirects, icons.svg, SETUP_REQUIRED.txt).
   The old src/ folder is unused; it does not affect the live site.
4. Commit "V1.15 built" and Push. Netlify redeploys in seconds.
5. Test on a throwaway order: Preview invoice -> check amount ->
   Confirm & send -> confirm a real line item in Stripe.
