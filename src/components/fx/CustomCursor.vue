<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'

const dot = ref<HTMLElement | null>(null)
const ring = ref<HTMLElement | null>(null)
const hover = ref(false)
let cleanup: (() => void) | null = null

onMounted(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const coarse = window.matchMedia('(pointer: coarse)').matches
  if (reduce || coarse || !dot.value || !ring.value) return

  const dotX = gsap.quickTo(dot.value, 'x', { duration: 0.12, ease: 'power3.out' })
  const dotY = gsap.quickTo(dot.value, 'y', { duration: 0.12, ease: 'power3.out' })
  const ringX = gsap.quickTo(ring.value, 'x', { duration: 0.4, ease: 'power3.out' })
  const ringY = gsap.quickTo(ring.value, 'y', { duration: 0.4, ease: 'power3.out' })

  const onMove = (e: MouseEvent) => {
    dotX(e.clientX)
    dotY(e.clientY)
    ringX(e.clientX)
    ringY(e.clientY)
    const el = e.target as HTMLElement | null
    hover.value = !!el?.closest('a, button, [data-cursor]')
  }

  window.addEventListener('mousemove', onMove, { passive: true })
  document.documentElement.classList.add('has-custom-cursor')
  cleanup = () => {
    window.removeEventListener('mousemove', onMove)
    document.documentElement.classList.remove('has-custom-cursor')
  }
})

onUnmounted(() => cleanup?.())
</script>

<template>
  <div ref="dot" class="cursor-dot" aria-hidden="true" />
  <div ref="ring" class="cursor-ring" :class="{ 'is-hover': hover }" aria-hidden="true" />
</template>
