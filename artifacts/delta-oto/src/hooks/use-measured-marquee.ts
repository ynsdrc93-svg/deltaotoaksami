import React from "react"

/**
 * Yan Haklar Tek Bant Turu: bu hook YALNIZCA Kariyer'in yeni tek-bantlı
 * fayda rayı için — sitenin onaylı marka duvarı marquee'sine
 * (.do-brand-ticker / -reverse, index.css) DOKUNULMADI, o CSS keyframe
 * animasyonu hâlâ aynı şekilde çalışıyor. Bu modülün kendi geometri/
 * zamanlama ihtiyacı farklı olduğundan ayrı bir mekanizma kuruldu.
 *
 * CSS keyframe (`translateX(0) → translateX(-50%)`) neden yetmedi: -50%
 * yalnızca iki kopya PİKSEL PİKSEL eşitse doğru döngü mesafesi verir.
 * Kullanıcı canlı incelemede bandın bazı anlarda bittiğini/boşluk
 * oluştuğunu bildirdi — kök neden, döngü mesafesinin varsayılmış (-50%)
 * olması, ÖLÇÜLMEMİŞ olmasıydı. Bu hook onun yerine iki kopyanın
 * SEKANS BAŞLANGIÇLARI arasındaki gerçek mesafeyi (getBoundingClientRect
 * ile) ölçüyor — yazı tipi/görsel geç yüklenip genişlik değiştirse bile
 * ResizeObserver yeniden ölçüyor, hiçbir zaman -50% gibi bir varsayıma
 * güvenmiyor.
 *
 * Hız sabit piksel/saniye (rAF + delta-time) — CSS `animation-duration`
 * gibi sabit SÜRE değil, böylece her ekran genişliğinde "aynı saniyede
 * biter" hissi yerine gerçekten sakin/sabit bir hız hissi korunuyor.
 *
 * Duraklama bir REF üzerinden (pausedRef) okunuyor, React state/effect
 * yeniden kurulumu DEĞİL — hover/focus/manuel duraklatma sırasında x
 * konumu SIFIRLANMIYOR, yalnızca ilerlemesi donduruluyor; devam ederken
 * durduğu konumdan sürüyor (§ kullanıcı talebi: "sıfırdan başlamaz").
 */
export function useMeasuredMarquee(count: number, speed = 42) {
  const cropRef = React.useRef<HTMLDivElement | null>(null)
  const trackRef = React.useRef<HTMLDivElement | null>(null)
  const itemRefs = React.useRef<(HTMLElement | null)[]>([])
  const seqBStartRef = React.useRef<HTMLElement | null>(null)

  const setItemRef = React.useMemo(
    () => Array.from({ length: count }, (_, i) => (el: HTMLElement | null) => { itemRefs.current[i] = el }),
    [count]
  )
  const setSeqBStart = React.useCallback((el: HTMLElement | null) => { seqBStartRef.current = el }, [])

  const loopDistance = React.useRef(0)
  const x = React.useRef(0)
  const pausedRef = React.useRef(false)

  const applyTransform = React.useCallback(() => {
    if (trackRef.current) trackRef.current.style.transform = `translate3d(${x.current}px,0,0)`
  }, [])

  // Sekans başlangıçları arası gerçek mesafe — bkz. üstteki not. Bu, "-50%
  // varsayımı" yerine kullanıcının istediği "ölçülmüş sekans başlangıcı
  // farkı" yöntemi.
  const measure = React.useCallback(() => {
    const a = itemRefs.current[0]
    const b = seqBStartRef.current
    if (a && b) {
      const d = b.getBoundingClientRect().left - a.getBoundingClientRect().left
      if (d > 0) loopDistance.current = d
    }
  }, [])

  React.useEffect(() => {
    measure()
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(() => measure()) : null
    if (ro && trackRef.current) ro.observe(trackRef.current)
    window.addEventListener("resize", measure)
    return () => { ro?.disconnect(); window.removeEventListener("resize", measure) }
  }, [measure, count])

  React.useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return
    }
    let raf = 0
    let last = 0
    const tick = (now: number) => {
      if (!last) last = now
      const dt = Math.min(now - last, 50) / 1000
      last = now
      if (!pausedRef.current && loopDistance.current > 0) {
        x.current -= speed * dt
        if (x.current <= -loopDistance.current) x.current += loopDistance.current
        applyTransform()
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [speed, applyTransform])

  const setPaused = React.useCallback((p: boolean) => { pausedRef.current = p }, [])

  // Klavye odağı bandı durdurur (bkz. setPaused) ama transform-tabanlı bir
  // bant native scrollIntoView'e cevap vermez — odaklanan kart o an görünür
  // kırpma penceresinin dışındaysa, x'i tam görünür olacak kadar (kenarlarda
  // küçük bir pay ile) kaydırıyoruz. Konumdan devam eder, sıfırlamaz.
  const focusItemIntoView = React.useCallback((i: number) => {
    const el = itemRefs.current[i]
    const container = cropRef.current
    if (!el || !container) return
    const elRect = el.getBoundingClientRect()
    const contRect = container.getBoundingClientRect()
    const pad = 24
    let delta = 0
    if (elRect.left < contRect.left + pad) delta = (contRect.left + pad) - elRect.left
    else if (elRect.right > contRect.right - pad) delta = (contRect.right - pad) - elRect.right
    if (delta !== 0) {
      x.current += delta
      applyTransform()
    }
  }, [applyTransform])

  return { cropRef, trackRef, setItemRef, setSeqBStart, setPaused, focusItemIntoView }
}
