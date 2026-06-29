<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const props = withDefaults(defineProps<{ text: string; duration?: number }>(), {
  duration: 900,
})

const GLYPHS = '!<>-_\\/[]{}—=+*^?#01010'
const display = ref(props.text)
const root = ref<HTMLElement | null>(null)
let raf = 0
let io: IntersectionObserver | null = null

function scramble() {
  const final = props.text
  const start = performance.now ? performance.now() : 0
  const tick = (now: number) => {
    const elapsed = (now || 0) - start
    const progress = Math.min(1, elapsed / props.duration)
    const revealed = Math.floor(progress * final.length)
    let out = ''
    for (let i = 0; i < final.length; i++) {
      if (i < revealed || final[i] === ' ') out += final[i]
      else out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
    }
    display.value = out
    if (progress < 1) raf = requestAnimationFrame(tick)
    else display.value = final
  }
  raf = requestAnimationFrame(tick)
}

onMounted(() => {
  if (typeof window === 'undefined') return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    display.value = props.text
    return
  }
  io = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting) {
        scramble()
        io?.disconnect()
      }
    },
    { threshold: 0.4 },
  )
  if (root.value) io.observe(root.value)
})

onUnmounted(() => {
  cancelAnimationFrame(raf)
  io?.disconnect()
})
</script>

<template>
  <span ref="root" :aria-label="text"><span aria-hidden="true">{{ display }}</span></span>
</template>
