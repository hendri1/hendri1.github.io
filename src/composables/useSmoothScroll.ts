import { ref } from 'vue'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Don't let the mobile address-bar show/hide trigger pin/parallax recalcs.
ScrollTrigger.config({ ignoreMobileResize: true })

/** Scroll velocity (px/frame-ish), consumed by the marquee for skew/speed. */
export const scrollVelocity = ref(0)

let lenis: Lenis | null = null
let tickerFn: ((time: number) => void) | null = null

/** Initialise Lenis smooth scrolling and wire it into GSAP's ticker + ScrollTrigger. */
export function initSmoothScroll(): void {
  if (lenis || typeof window === 'undefined') return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  // autoRaf:false — we drive Lenis from GSAP's single ticker so ScrollTrigger
  // never reads a stale scroll value (avoids 1–2 frame parallax/pin lag).
  lenis = new Lenis({ duration: 1.1, smoothWheel: true, autoRaf: false })
  lenis.on('scroll', (e: { velocity: number }) => {
    ScrollTrigger.update()
    scrollVelocity.value = e.velocity
  })

  tickerFn = (time: number) => lenis?.raf(time * 1000)
  gsap.ticker.add(tickerFn)
  gsap.ticker.lagSmoothing(0)
  ScrollTrigger.refresh()
}

export function destroySmoothScroll(): void {
  if (tickerFn) gsap.ticker.remove(tickerFn)
  tickerFn = null
  lenis?.destroy()
  lenis = null
}
