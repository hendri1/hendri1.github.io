import type { Directive } from 'vue'

/**
 * v-tilt — subtle 3D tilt toward the cursor on hover. Binding value sets the
 * max angle in degrees (default 6). Disabled for coarse pointers / reduced motion.
 */
const cleanups = new WeakMap<HTMLElement, () => void>()

export const vTilt: Directive<HTMLElement, number | undefined> = {
  mounted(el, binding) {
    if (typeof window === 'undefined') return
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      window.matchMedia('(pointer: coarse)').matches
    )
      return

    const max = binding.value ?? 6
    el.style.transformStyle = 'preserve-3d'
    el.style.transition = 'transform 0.2s ease-out'

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width - 0.5
      const py = (e.clientY - r.top) / r.height - 0.5
      el.style.transform = `perspective(900px) rotateY(${px * max}deg) rotateX(${-py * max}deg)`
    }
    const onLeave = () => {
      el.style.transform = 'perspective(900px) rotateY(0) rotateX(0)'
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
