import * as React from "react"

/** Adds `.do-in` to observed elements once they scroll into view, pairs with `.do-reveal*` CSS. */
export function useReveal() {
  const refs = React.useRef<(Element | null)[]>([])
  React.useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("do-in"); obs.unobserve(e.target) } }),
      { threshold: 0.12 }
    )
    refs.current.forEach(el => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])
  return (el: Element | null) => { if (el && !refs.current.includes(el)) refs.current.push(el) }
}

/** `exit` verilmezse `enter`e eşitlenir — tek eşikli eski çağrılar (ör.
 * useScrolled(600)) davranışını birebir korur. İkisi FARKLI verilirse
 * hysteresis (çift eşik) davranışına geçer: `enter`i geçince true, ancak
 * `exit`in DAHA ALTINA inmeden false'a dönmez — arada bir "ölü bölge" kalır.
 * Yüksekliği değişen (compact-on-scroll) header'lar gibi, geçişin kendisi
 * scroll pozisyonunu hafifçe kaydırabilen (scroll anchoring) durumlarda tek
 * eşik, eşiğin iki yönde art arda tetiklenip salınım/jitter yapmasına yol
 * açar — çift eşikli ölü bölge bunu engeller. */
export function useScrolled(enter = 40, exit = enter) {
  const [scrolled, setScrolled] = React.useState(false)
  React.useEffect(() => {
    const onScroll = () => {
      setScrolled((prev) => {
        const y = window.scrollY
        if (!prev && y > enter) return true
        if (prev && y <= exit) return false
        return prev
      })
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [enter, exit])
  return scrolled
}

/** Counts up to `target` once `start` flips true; snaps straight to `target` under prefers-reduced-motion. */
export function useCounter(target: number, duration = 1600, start = false) {
  const [val, setVal] = React.useState(0)
  React.useEffect(() => {
    if (!start) return
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVal(target)
      return
    }
    let raf: number
    const startTime = performance.now()
    const step = (now: number) => {
      const p = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(Math.round(eased * target))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [start, target, duration])
  return val
}

export function useScrollProgress() {
  const [p, setP] = React.useState(0)
  React.useEffect(() => {
    let raf = 0
    const update = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      setP(h > 0 ? Math.min(window.scrollY / h, 1) : 0)
      raf = 0
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf) }
  }, [])
  return p
}

/** No-ops under prefers-reduced-motion. */
export function useParallax<T extends HTMLElement>(speed = 0.12) {
  const ref = React.useRef<T | null>(null)
  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let raf = 0
    const update = () => {
      const el = ref.current
      if (el) {
        const rect = el.getBoundingClientRect()
        const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * speed
        el.style.transform = `translate3d(0, ${(-offset).toFixed(1)}px, 0) scale(1.16)`
      }
      raf = 0
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf) }
  }, [speed])
  return ref
}

/** Scroll-linked progress (0→1) for how far a section has moved through the
 * viewport. Same rAF-throttled window-scroll pattern as useScrollProgress/
 * useParallax above — no new library, no per-frame IntersectionObserver
 * churn. Under prefers-reduced-motion, progress locks to 1 (final/complete
 * state) immediately, matching how useCounter/useParallax already degrade —
 * a sequence built on this must read as fully resolved without motion,
 * never as "stuck mid-way".
 *
 * Two modes, because "how far through" means different things depending
 * on the shape of the content and what "done" needs to mean:
 *
 * - 'settle' (default): for a section comfortably shorter than the
 *   viewport (e.g. Operasyon's 4-step row). Progress reaches 1 once the
 *   section has scrolled to a position where it's still fully, comfortably
 *   visible — not merely once its bottom has passed the viewport top. Bug
 *   this fixes: the original single formula (now 'transit', below) mapped
 *   progress across the section's ENTIRE top-to-bottom transit through the
 *   viewport, so for a section much shorter than the viewport, progress
 *   only reached 1 once the section had already scrolled mostly or fully
 *   past — steps 3/4 lit up only after the user had effectively left the
 *   module. 'settle' instead targets the earliest point at which the
 *   section is safely, fully on-screen (never demanding more scroll than
 *   that), with a small safety margin and a guaranteed minimum scroll
 *   distance so the change never reads as an instant jump.
 * - 'transit': the original full top-to-bottom sweep — 0 when the
 *   section's top just enters the viewport bottom, 1 when its bottom exits
 *   the viewport top (the section has fully scrolled past). Fine for a
 *   section whose last beat doesn't itself need to stay readable.
 *
 * (A third 'story' mode briefly lived here for Kariyer's culture list —
 * mapping progress across the section's transit so its LAST item stayed
 * on screen at progress=1. It was removed: any single section-wide
 * progress number is the wrong tool for "which item is the user reading" —
 * see useViewportFocusIndex below, which measures each item's own
 * position directly instead of inferring it from where the section as a
 * whole has scrolled to.)
 */
export function useSectionProgress<T extends HTMLElement>(mode: "settle" | "transit" = "settle") {
  const ref = React.useRef<T | null>(null)
  const [progress, setProgress] = React.useState(0)
  React.useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(1)
      return
    }
    let raf = 0
    const update = () => {
      const el = ref.current
      if (el) {
        const rect = el.getBoundingClientRect()
        const vh = window.innerHeight
        const start = vh
        let end: number
        if (mode === "transit") {
          end = -rect.height
        } else {
          const topSafeMargin = 0.12 * vh   // stay clear of a sticky header near the top of the viewport
          const bottomSafeMargin = 24        // small breathing room above the viewport's bottom edge
          const minTravel = 80               // guarantee some real scroll distance maps to 0→1, never an instant jump
          const rawEnd = Math.max(topSafeMargin, vh - bottomSafeMargin - rect.height)
          end = Math.min(rawEnd, start - minTravel)
        }
        setProgress(Math.min(Math.max((start - rect.top) / (start - end), 0), 1))
      }
      raf = 0
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf) }
  }, [mode])
  return [ref, progress] as const
}

/** Drives a "what is the user actually looking at" active index for a list
 * of scroll-sequenced items — each item reports its own position via one
 * of the returned ref callbacks, and on every scroll frame the item whose
 * vertical CENTER sits nearest a fixed focus line (a fraction of viewport
 * height — default 0.5, the visual middle) becomes active. This replaces
 * inferring "which item is being read" from an abstract section-wide
 * scroll percentage (see the removed 'story' mode above, which this
 * replaced for Kariyer's culture list) — that could only ever approximate
 * the real answer, and for a long list it consistently activated items
 * before the reader could actually see them centered. Measuring each
 * item's own real position is the direct, correct signal: "the principle
 * nearest the center of the viewport is active", full stop.
 *
 * A candidate must clear TWO gates, not one:
 *  1. It must actually intersect the viewport (`rect.top < vh && rect.bottom
 *     > 0`) — a hard visibility floor. A distance fraction alone is not a
 *     reliable proxy for "on screen": at a tall viewport, an item can sit
 *     within a generous distance fraction of the focus line while its whole
 *     box is still below `vh`, i.e. not rendered anywhere the reader can see
 *     it — exactly the "already active before it arrives on screen" bug this
 *     hook exists to prevent.
 *  2. Its center must be within `maxDistanceFraction` of a viewport height
 *     from the focus line — so that merely grazing the bottom edge of the
 *     viewport isn't enough either; it has to be reasonably on its way
 *     toward the center, not just technically visible.
 * Both gates apply equally to every item, including the first — there is no
 * special-cased "item 0" logic. With no qualifying candidate, activeIndex
 * simply holds its last value (starts at -1, meaning "nothing has entered
 * focus range yet" — callers should render that as every item "upcoming").
 *
 * Under prefers-reduced-motion the scroll listener never attaches — there
 * is no "current reading position" without scrolling, so activeIndex stays
 * -1 and callers are expected to render every item at its most legible,
 * non-upcoming state (matching how the rest of the site's reduced-motion
 * fallbacks favor full legibility over any one item holding priority). */
export function useViewportFocusIndex(count: number, focusFraction = 0.5, maxDistanceFraction = 0.4) {
  const refs = React.useRef<(HTMLElement | null)[]>([])
  const [activeIndex, setActiveIndex] = React.useState(-1)
  const setRefs = React.useMemo(
    () => Array.from({ length: count }, (_, i) => (el: HTMLElement | null) => { refs.current[i] = el }),
    [count]
  )

  React.useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return
    }
    let raf = 0
    const update = () => {
      const vh = window.innerHeight
      const focusY = vh * focusFraction
      const maxDist = vh * maxDistanceFraction
      let bestIdx = -1
      let bestDist = Infinity
      refs.current.forEach((el, i) => {
        if (!el) return
        const rect = el.getBoundingClientRect()
        const onScreen = rect.top < vh && rect.bottom > 0
        if (!onScreen) return
        const centerY = rect.top + rect.height / 2
        const dist = Math.abs(centerY - focusY)
        if (dist < maxDist && dist < bestDist) { bestDist = dist; bestIdx = i }
      })
      if (bestIdx >= 0) setActiveIndex(bestIdx)
      raf = 0
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf) }
  }, [count, focusFraction, maxDistanceFraction])

  return [setRefs, activeIndex] as const
}

/** One-time (mount-only) prefers-reduced-motion read, matching the inline
 * checks already used by useCounter/useParallax/useSectionProgress — a
 * shared helper for components that need to branch their own render (not
 * just a hook's internal animation) on the same preference, e.g. Kariyer's
 * culture module swapping its scroll-driven emphasis for a static, fully
 * legible layout. */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false)
  React.useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  }, [])
  return reduced
}

/** Escape-to-close for dismissible panels (mobile nav, etc). */
export function useEscapeKey(onEscape: () => void, active: boolean) {
  React.useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onEscape() }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [active, onEscape])
}
