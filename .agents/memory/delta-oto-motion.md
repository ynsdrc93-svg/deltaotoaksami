---
name: Delta Oto motion & accessibility
description: Quality bar for animations on the Delta Oto landing page
---

# Delta Oto landing page — motion conventions

The landing page (`artifacts/delta-oto/src/components/LandingPage.tsx`) is animation-heavy: scroll-progress bar, image parallax, light beams (sweep + card hover), reveal-on-scroll, count-up counters, marquee ticker.

## Rule: every animation must be guarded for reduced motion
Any new animation/transition/parallax/counter MUST be neutralized under `@media (prefers-reduced-motion: reduce)` (or via a JS `matchMedia` check for RAF-driven JS like counters/parallax).

**Why:** A code review pass failed the task because only the beam was guarded while ticker, reveals, count-up, hover lifts, and `animate-pulse` still animated — an accessibility regression.

**How to apply:** CSS animations/transitions get disabled in the existing reduced-motion media block at the top CSS string; JS-driven motion (`useCounter`, `useParallax`) checks `window.matchMedia("(prefers-reduced-motion: reduce)").matches` and renders the final/static state immediately.
