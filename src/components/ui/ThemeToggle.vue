<script setup lang="ts">
import { computed } from 'vue'
import AppIcon from './AppIcon.vue'
import { useTheme } from '@/composables/useTheme'

const { theme, toggle } = useTheme()
const label = computed(() =>
  theme.value === 'dark' ? 'Switch to light theme' : 'Switch to dark theme',
)

type VTDocument = Document & {
  startViewTransition?: (cb: () => void) => { ready: Promise<void> }
}

function onToggle(event: MouseEvent) {
  const doc = document as VTDocument
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // No View Transition support, or motion suppressed → plain instant swap.
  if (!doc.startViewTransition || reduce) {
    toggle()
    return
  }

  // Expand a circular reveal from the toggle button's centre.
  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  )

  const transition = doc.startViewTransition(() => toggle())
  transition.ready.then(() => {
    document.documentElement.animate(
      {
        clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`],
      },
      {
        duration: 520,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
        pseudoElement: '::view-transition-new(root)',
      },
    )
  })
}
</script>

<template>
  <button
    type="button"
    data-testid="theme-toggle"
    :aria-label="label"
    :title="label"
    data-cursor
    class="grid size-10 place-items-center rounded-full border border-line bg-surface text-muted transition-colors hover:text-fg active:scale-90"
    @click="onToggle"
  >
    <AppIcon :name="theme === 'dark' ? 'sun' : 'moon'" :size="18" />
  </button>
</template>
