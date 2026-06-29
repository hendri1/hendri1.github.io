<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'

const dot = ref<HTMLElement | null>(null)
const ring = ref<HTMLElement | null>(null)
const hover = ref(false)
const pressed = ref(false)
const label = ref('')
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
    const el = (e.target as HTMLElement | null)?.closest<HTMLElement>('a, button, [data-cursor]')
    hover.value = !!el
    // A non-empty data-cursor value becomes a verb label ("copy", "open mail").
    const verb = el?.getAttribute('data-cursor')
    label.value = verb && verb.trim().length ? verb.trim() : ''
  }

  const onDown = () => (pressed.value = true)
  const onUp = () => (pressed.value = false)

  window.addEventListener('mousemove', onMove, { passive: true })
  window.addEventListener('mousedown', onDown, { passive: true })
  window.addEventListener('mouseup', onUp, { passive: true })
  // Reset press state if the pointer leaves the window mid-click.
  window.addEventListener('blur', onUp)
  document.documentElement.classList.add('has-custom-cursor')
  cleanup = () => {
    window.removeEventListener('mousemove', onMove)
    window.removeEventListener('mousedown', onDown)
    window.removeEventListener('mouseup', onUp)
    window.removeEventListener('blur', onUp)
    document.documentElement.classList.remove('has-custom-cursor')
  }
})

onUnmounted(() => cleanup?.())
</script>

<template>
  <div ref="dot" class="cursor-dot" :class="{ 'is-pressed': pressed }" aria-hidden="true" />
  <div
    ref="ring"
    class="cursor-ring"
    :class="{ 'is-hover': hover, 'is-pressed': pressed, 'has-label': label }"
    aria-hidden="true"
  >
    <span v-if="label" class="cursor-label">{{ label }}</span>
  </div>
</template>
