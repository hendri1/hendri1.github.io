<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'

/**
 * Animates the numeric portion of a label from 0 → target the first time it
 * scrolls into view ("~10 yrs", "80%+", "6 yrs"). Non-numeric values
 * ("Micro-FE") and reduced-motion users see the final string immediately.
 */
const props = defineProps<{ value: string }>()

// Split into leading non-digits (prefix), the number, then the rest (suffix).
const match = props.value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/)
const prefix = match?.[1] ?? ''
const target = match ? Number(match[2]) : NaN
const suffix = match?.[3] ?? ''
const decimals = match?.[2]?.includes('.') ? (match[2].split('.')[1]?.length ?? 0) : 0

const display = ref(props.value)
const el = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null
let tween: gsap.core.Tween | null = null

const format = (n: number) => `${prefix}${n.toFixed(decimals)}${suffix}`

onMounted(() => {
  // Nothing to animate — leave the original string untouched.
  if (!match || Number.isNaN(target)) return

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce || typeof IntersectionObserver === 'undefined') {
    display.value = format(target)
    return
  }

  display.value = format(0)
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        observer?.disconnect()
        observer = null
        const counter = { n: 0 }
        tween = gsap.to(counter, {
          n: target,
          duration: 1.4,
          ease: 'power2.out',
          onUpdate: () => (display.value = format(counter.n)),
        })
      }
    },
    { threshold: 0.4 },
  )
  observer.observe(el.value as Element)
})

onUnmounted(() => {
  observer?.disconnect()
  tween?.kill()
})
</script>

<template>
  <span ref="el">{{ display }}</span>
</template>
