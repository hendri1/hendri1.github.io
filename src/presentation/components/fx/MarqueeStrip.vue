<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { scrollVelocity } from '@/presentation/composables/useSmoothScroll'

const items = [
  'Micro-Frontends',
  'Design Systems',
  'Vue 3',
  'Nuxt',
  'Module Federation',
  'TypeScript',
  'Vitest',
  'Storybook',
  'Performance',
  'Developer Experience',
]

const track = ref<HTMLElement | null>(null)
let raf = 0
let offset = 0
let cleanup: (() => void) | null = null

onMounted(() => {
  const el = track.value
  if (!el) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const step = () => {
    raf = requestAnimationFrame(step)
    const v = scrollVelocity.value
    offset -= 0.6 + Math.min(Math.abs(v) * 0.6, 14)
    const half = el.scrollWidth / 2
    if (half > 0 && -offset >= half) offset += half
    const skew = Math.max(-8, Math.min(8, v * 0.4))
    el.style.transform = `translate3d(${offset}px,0,0) skewX(${skew}deg)`
  }
  raf = requestAnimationFrame(step)
  cleanup = () => cancelAnimationFrame(raf)
})
onUnmounted(() => cleanup?.())
</script>

<template>
  <div
    class="relative flex overflow-hidden border-y border-line bg-surface/40 py-4 select-none"
    aria-hidden="true"
  >
    <div ref="track" class="flex shrink-0 items-center whitespace-nowrap will-change-transform">
      <template v-for="n in 2" :key="n">
        <span
          v-for="item in items"
          :key="`${n}-${item}`"
          class="flex items-center font-mono text-sm tracking-wide text-muted uppercase"
        >
          <span class="px-6">{{ item }}</span>
          <span class="text-accent">/</span>
        </span>
      </template>
    </div>
  </div>
</template>
