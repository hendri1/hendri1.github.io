import type { Directive } from 'vue'

/**
 * v-reveal — adds `reveal` immediately and toggles `is-visible` as the element
 * enters the viewport, producing a fade/slide-in. The element is *re-armed*
 * (class removed) once it scrolls fully out of view, so scrolling back replays
 * the entrance rather than leaving a frozen, motion-dead page. Respects
 * prefers-reduced-motion (handled in CSS) and degrades gracefully without
 * IntersectionObserver.
 */
const observers = new WeakMap<Element, IntersectionObserver>()

export const vReveal: Directive<HTMLElement, number | undefined> = {
  mounted(el, binding) {
    el.classList.add('reveal')

    const delay = binding.value
    if (typeof delay === 'number') el.style.transitionDelay = `${delay}ms`

    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-visible')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add('is-visible')
          } else if (entry.intersectionRatio === 0) {
            // Fully off-screen — re-arm so the entrance plays again on return.
            el.classList.remove('is-visible')
          }
        }
      },
      { threshold: [0, 0.12], rootMargin: '0px 0px -8% 0px' },
    )
    observer.observe(el)
    observers.set(el, observer)
  },
  unmounted(el) {
    observers.get(el)?.disconnect()
    observers.delete(el)
  },
}
