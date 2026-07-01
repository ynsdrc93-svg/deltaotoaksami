---
name: Delta Oto header nav breakpoint
description: Why the main nav + CTA buttons in the Delta Oto header show at 2xl (1536px) instead of xl (1280px)
---

The header has ~8 nav links plus 2 CTA buttons (B2B Giriş / İş Ortağı Olun) alongside a wide logo. At the `xl` breakpoint (1280px) this combination overflowed and visually overlapped in the browser (confirmed via screenshot at 1280x720 viewport — nav text overlapped the CTA buttons).

**Why:** Tailwind's `xl:flex`/`xl:hidden` toggle for nav/CTAs fires right at 1280px, but the full nav + logo + 2 buttons need more horizontal room than that to avoid collision.

**How to apply:** Full desktop nav + CTA buttons are gated on `2xl:flex` (1536px+); the hamburger + slide-down mobile panel is gated on `2xl:hidden` and covers everything below that, including the 1280px "laptop" range. When adding/removing nav items or CTAs in this header, re-screenshot at 1280x720 to confirm no overlap before assuming `xl` is safe.
