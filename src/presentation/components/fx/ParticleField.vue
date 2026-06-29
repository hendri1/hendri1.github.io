<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const canvas = ref<HTMLCanvasElement | null>(null)
let raf = 0
let cleanup: (() => void) | null = null

interface Star {
  x: number
  y: number
  z: number // depth 0..1 (parallax + size)
  r: number
  tw: number // twinkle phase
  c: number // colour index
}

// ice, cyan, magenta
const COLORS = [
  [210, 224, 245],
  [45, 226, 230],
  [255, 46, 151],
]

onMounted(() => {
  const el = canvas.value
  if (!el) return
  const ctx = el.getContext('2d', { alpha: true })
  if (!ctx) return

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  let w = 0
  let h = 0
  let stars: Star[] = []
  const pointer = { x: 0, y: 0, active: false }
  let visible = true

  const resize = () => {
    const rect = el.parentElement?.getBoundingClientRect()
    w = rect?.width ?? window.innerWidth
    h = rect?.height ?? window.innerHeight
    el.width = w * dpr
    el.height = h * dpr
    el.style.width = `${w}px`
    el.style.height = `${h}px`
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    const count = Math.round(Math.min(180, Math.max(70, (w * h) / 11000)))
    stars = Array.from({ length: count }, () => {
      const z = Math.random()
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        z,
        r: 0.4 + z * 1.7,
        tw: Math.random() * Math.PI * 2,
        c: Math.random() > 0.9 ? (Math.random() > 0.5 ? 2 : 1) : 0,
      }
    })
  }

  let t = 0
  const draw = (animate: boolean) => {
    ctx.clearRect(0, 0, w, h)
    ctx.globalCompositeOperation = 'lighter'
    const ox = pointer.active ? (pointer.x - w / 2) : 0
    const oy = pointer.active ? (pointer.y - h / 2) : 0
    for (const s of stars) {
      if (animate) {
        s.y += 0.04 + s.z * 0.12 // slow drift
        if (s.y > h + 4) {
          s.y = -4
          s.x = Math.random() * w
        }
        s.tw += 0.02 + s.z * 0.03
      }
      const twinkle = animate ? 0.55 + 0.45 * Math.sin(s.tw) : 0.8
      // parallax: deeper stars shift less
      const px = s.x + (ox * s.z * 0.02)
      const py = s.y + (oy * s.z * 0.02)
      const [r, g, b] = COLORS[s.c]
      ctx.fillStyle = `rgba(${r},${g},${b},${(0.25 + s.z * 0.5) * twinkle})`
      ctx.beginPath()
      ctx.arc(px, py, s.r, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.globalCompositeOperation = 'source-over'
  }

  t = 0
  const tick = () => {
    raf = requestAnimationFrame(tick)
    if (!visible) return
    t += 1
    draw(true)
  }

  const onMove = (e: MouseEvent) => {
    const rect = el.getBoundingClientRect()
    pointer.x = e.clientX - rect.left
    pointer.y = e.clientY - rect.top
    pointer.active = true
  }
  const onVisibility = () => {
    visible = !document.hidden
  }
  const io = new IntersectionObserver(
    (entries) => {
      visible = entries[0]?.isIntersecting ?? true
    },
    { threshold: 0 },
  )

  resize()
  window.addEventListener('resize', resize)
  window.addEventListener('mousemove', onMove, { passive: true })
  document.addEventListener('visibilitychange', onVisibility)
  io.observe(el)

  if (reduce) draw(false)
  else raf = requestAnimationFrame(tick)

  cleanup = () => {
    cancelAnimationFrame(raf)
    window.removeEventListener('resize', resize)
    window.removeEventListener('mousemove', onMove)
    document.removeEventListener('visibilitychange', onVisibility)
    io.disconnect()
  }
})

onUnmounted(() => cleanup?.())
</script>

<template>
  <canvas ref="canvas" class="absolute inset-0 h-full w-full" aria-hidden="true" />
</template>
