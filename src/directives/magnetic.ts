import type { Directive } from 'vue'
import { gsap } from 'gsap'

/**
 * v-magnetic — the element springs toward the cursor while hovered, then
 * eases back. Disabled for coarse pointers and prefers-reduced-motion.
 * Binding value sets strength (0–1, default 0.4).
 */
const cleanups = new WeakMap<HTMLElement, () => void>()

export const vMagnetic: Directive<HTMLElement, number | undefined> = {
  mounted(el, binding) {
    if (typeof window === 'undefined') return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia('(pointer: coarse)').matches
    if (reduce || coarse) return

    const strength = binding.value ?? 0.4
    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' })

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      xTo((e.clientX - (rect.left + rect.width / 2)) * strength)
      yTo((e.clientY - (rect.top + rect.height / 2)) * strength)
    }
    const onLeave = () => {
      xTo(0)
      yTo(0)
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    cleanups.set(el, () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    })
  },
  unmounted(el) {
    cleanups.get(el)?.()
    cleanups.delete(el)
  },
}
