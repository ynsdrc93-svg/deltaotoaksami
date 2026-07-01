---
name: Delta Oto header nav breakpoint
description: Correct breakpoint depends on nav item + CTA count; verify with a screenshot whenever either changes
---

The Delta Oto header's nav+CTA visibility breakpoint is sensitive to how many nav links and CTA buttons are shown, not a fixed value.

- With 8 nav links + 2 CTA buttons (B2B Giriş / İş Ortağı Olun), `xl` (1280px) overflowed and nav text overlapped the CTAs — had to move to `2xl:flex` / `2xl:hidden`.
- With 7 nav links + 1 CTA button (current: single "B2B Giriş"), `xl` (1280px) fits cleanly with no overlap (confirmed via 1280x720 screenshot).

**Why:** The toggle breakpoint has no safety margin baked in — it's purely a function of total width (logo + nav items + CTA buttons) vs. viewport, so it must be re-derived whenever the nav/CTA count changes.

**How to apply:** Whenever nav items or CTA buttons are added/removed in this header, re-screenshot at 1280x720 before assuming any specific breakpoint (`xl` or `2xl`) is safe. Don't reuse a breakpoint decision from a previous nav/CTA count.
