import { ref } from 'vue'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/** Scroll velocity (px/frame-ish), consumed by the marquee for skew/speed. */
export const scrollVelocity = ref(0)

let lenis: Lenis | null = null
let tickerFn: ((time: number) => void) | null = null

/** Initialise Lenis smooth scrolling and wire it into GSAP's ticker + ScrollTrigger. */
export function initSmoothScroll(): void {
  if (lenis || typeof window === 'undefined') return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  lenis = new Lenis({ duration: 1.1, smoothWheel: true })
  lenis.on('scroll', (e: { velocity: number }) => {
    ScrollTrigger.update()
    scrollVelocity.value = e.velocity
  })

  tickerFn = (time: number) => lenis?.raf(time * 1000)
  gsap.ticker.add(tickerFn)
  gsap.ticker.lagSmoothing(0)
}

export function destroySmoothScroll(): void {
  if (tickerFn) gsap.ticker.remove(tickerFn)
  tickerFn = null
  lenis?.destroy()
  lenis = null
}
