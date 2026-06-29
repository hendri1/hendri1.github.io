import type { Directive } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * v-parallax — scrubbed vertical parallax tied to scroll. Binding value is the
 * travel as a fraction of the element height (default 0.2; negative = opposite
 * direction). Disabled under prefers-reduced-motion.
 */
const tweens = new WeakMap<HTMLElement, gsap.core.Tween>()

export const vParallax: Directive<HTMLElement, number | undefined> = {
  mounted(el, binding) {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const amount = binding.value ?? 0.2
    const tween = gsap.to(el, {
      yPercent: -amount * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })
    tweens.set(el, tween)
  },
  unmounted(el) {
    const tween = tweens.get(el)
    tween?.scrollTrigger?.kill()
    tween?.kill()
    tweens.delete(el)
  },
}
