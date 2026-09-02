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
 * viewport — used for the Operasyon "Siparişten Teslimata" step sequence, so
 * the process visibly advances as the user scrolls through it rather than
 * just fading in once (görev talimatı §24: "the user should FEEL the
 * process advancing"). Same rAF-throttled window-scroll pattern as
 * useScrollProgress/useParallax above — no new library, no per-frame
 * IntersectionObserver churn. Under prefers-reduced-motion, progress locks
 * to 1 (final/complete state) immediately, matching how useCounter/
 * useParallax already degrade — the sequence must read as fully resolved
 * without motion, never as "stuck mid-way". */
export function useSectionProgress<T extends HTMLElement>() {
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
        // 0 when the section's top just enters the viewport bottom, 1 when
        // its bottom exits the viewport top — i.e. progress tracks the
        // section's own transit, not the whole page's.
        const total = rect.height + vh
        const passed = vh - rect.top
        setProgress(Math.min(Math.max(passed / total, 0), 1))
      }
      raf = 0
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf) }
  }, [])
  return [ref, progress] as const
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
