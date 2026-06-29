import type { Directive } from 'vue'

/**
 * v-reveal — adds `reveal` immediately and `is-visible` once the element
 * scrolls into view, producing a one-shot fade/slide-in. Respects
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
            observer.unobserve(el)
            observers.delete(el)
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    observer.observe(el)
    observers.set(el, observer)
  },
  unmounted(el) {
    observers.get(el)?.disconnect()
    observers.delete(el)
  },
}
