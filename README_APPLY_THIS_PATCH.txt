EmailDone4U Portal — v1.14 mobile layout patch
================================================

WHAT THIS IS
------------
Your dev environment's copy of the portal's source tree wasn't available
when I built this, only the compiled production bundle (what's actually
live at portal.emaildone4u.com). I pulled the current sidebar/CSS logic
directly out of that live bundle so this patch matches what's really
deployed (v1.13), not an old backup — but it means I'm only shipping the
3 files that needed to change, not a full project zip, since I don't have
a verified copy of every other file (Checklist.jsx, AdminOrderDetail.jsx,
etc.) to safely re-bundle alongside them.

FILES IN THIS PATCH
--------------------
src/components/Layout.jsx   — replace your existing file with this one
src/styles.css               — replace your existing file with this one
src/lib/version.js           — replace your existing file with this one
CHANGELOG.md                 — new v1.14 entry (merge into your existing file)

WHAT CHANGED
------------
Layout.jsx: the sidebar's brand/logo + a new hamburger button now sit in
a "sidebar-topbar" row, with the nav links + account footer wrapped in a
"sidebar-body" block that toggles open/closed via a bit of local state.
Desktop behavior and markup structure are otherwise the same as before.

styles.css: your current sidebar/app-shell rules, reproduced as-is, plus
new .sidebar-topbar / .sidebar-toggle / .sidebar-body rules, plus one
new @media (max-width: 768px) block at the bottom that:
  - stacks the sidebar above the content instead of beside it
  - turns the sidebar into a compact top bar with a hamburger toggle
  - makes the nav+footer drop down full-width when opened, and auto-close
    on link tap
  - gives the main content panel full width and tighter padding
  - lets the schedule/availability grids scroll horizontally instead of
    being cut off
  - stacks any 2-column form grids into 1 column

ONE THING TO DOUBLE-CHECK
--------------------------
Layout.jsx imports the logo as:
    import logo from '../assets/logo.png'
That matches the standard Vite pattern and the fact that the logo lives in
src/assets in your project — but if your actual file/import is named
differently (e.g. a different extension), just adjust that one import
line to match; nothing else in the file depends on it.

APPLYING
--------
1. Copy the 3 files into your project at the paths above, overwriting the
   existing ones.
2. Merge the CHANGELOG.md v1.14 entry above your existing v1.13 entry.
3. npm run build, then redeploy as usual.
4. Test on an actual phone width (or your browser's device toolbar) —
   tap the hamburger in the top bar, confirm the nav drops down and a
   tapped link both navigates and closes the menu.

A NOTE FOR NEXT TIME
---------------------
Since I only have the compiled bundle to fall back on when local files go
missing, it'd save trouble to have the real portal source (not just the
deploy output) pushed to its own GitHub repo going forward — separate
from whatever repo/branch Netlify deploys from. That way a full,
byte-for-byte accurate copy of the whole project is always one clone away
instead of needing to be reverse-engineered from minified JS.
