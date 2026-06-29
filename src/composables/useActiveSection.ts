import { onMounted, onUnmounted, ref } from 'vue'

/**
 * Tracks which section is currently "active" (closest to the top of the
 * viewport) so navigation can reflect scroll position with aria-current.
 * Uses a single IntersectionObserver keyed on each section id.
 */
export function useActiveSection(ids: string[]) {
  // Empty until a section actually enters the active band — so nothing is
  // highlighted while the visitor is still on the hero.
  const activeId = ref<string>('')
  let observer: IntersectionObserver | null = null
  // Visibility ratio per section — we pick the most-visible one each tick.
  const ratios = new Map<string, number>()

  onMounted(() => {
    if (typeof IntersectionObserver === 'undefined') return

    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el != null)

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0)
        }
        let best = activeId.value
        let bestRatio = -1
        for (const [id, ratio] of ratios) {
          if (ratio > bestRatio) {
            bestRatio = ratio
            best = id
          }
        }
        if (bestRatio > 0) activeId.value = best
      },
      {
        // Bias toward the upper portion of the viewport so a section counts
        // as active a little before it reaches dead-center.
        rootMargin: '-45% 0px -45% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    )

    for (const el of sections) observer.observe(el)
  })

  onUnmounted(() => {
    observer?.disconnect()
    observer = null
  })

  return { activeId }
}
