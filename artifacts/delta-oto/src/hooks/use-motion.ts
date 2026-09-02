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
 * Two modes, because "how far through" means different things for a short
 * single-screen module vs. a long scroll-driven list:
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
 *   the viewport top. For a section intentionally taller than the viewport
 *   and meant to be scrolled THROUGH as a sequence (e.g. Kariyer's culture
 *   list, where each scroll position should map to a different "active"
 *   entry across the section's full length) — 'settle' would degenerate
 *   here, since a section far taller than the viewport can never be
 *   "fully visible at once".
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
