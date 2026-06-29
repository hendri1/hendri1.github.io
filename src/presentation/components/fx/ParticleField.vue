<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const canvas = ref<HTMLCanvasElement | null>(null)
let raf = 0
let cleanup: (() => void) | null = null

interface P {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  a: number
  warm: boolean
}

onMounted(() => {
  const el = canvas.value
  if (!el) return
  const ctx = el.getContext('2d', { alpha: true })
  if (!ctx) return

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  let w = 0
  let h = 0
  let particles: P[] = []
  const pointer = { x: -9999, y: -9999, active: false }
  let visible = true

  const ACCENT = [255, 91, 35] // #FF5B23
  const SOFT = [232, 176, 75] // #E8B04B

  const resize = () => {
    const rect = el.parentElement?.getBoundingClientRect()
    w = rect?.width ?? window.innerWidth
    h = rect?.height ?? window.innerHeight
    el.width = w * dpr
    el.height = h * dpr
    el.style.width = `${w}px`
    el.style.height = `${h}px`
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    const count = Math.round(Math.min(140, Math.max(50, (w * h) / 14000)))
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -0.15 - Math.random() * 0.4,
      r: 0.6 + Math.random() * 1.8,
      a: 0.15 + Math.random() * 0.5,
      warm: Math.random() > 0.7,
    }))
  }

  const drawStatic = () => {
    ctx.clearRect(0, 0, w, h)
    ctx.globalCompositeOperation = 'lighter'
    for (const p of particles) {
      const [r, g, b] = p.warm ? SOFT : ACCENT
      ctx.fillStyle = `rgba(${r},${g},${b},${p.a})`
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.globalCompositeOperation = 'source-over'
  }

  let t = 0
  const tick = () => {
    raf = requestAnimationFrame(tick)
    if (!visible) return
    t += 0.004
    ctx.clearRect(0, 0, w, h)
    ctx.globalCompositeOperation = 'lighter'

    for (const p of particles) {
      // gentle flow field
      p.x += p.vx + Math.sin(p.y * 0.01 + t) * 0.18
      p.y += p.vy

      // cursor attraction (local light source)
      if (pointer.active) {
        const dx = pointer.x - p.x
        const dy = pointer.y - p.y
        const d2 = dx * dx + dy * dy
        if (d2 < 26000) {
          const f = (1 - d2 / 26000) * 0.04
          p.x += dx * f
          p.y += dy * f
        }
      }

      // wrap
      if (p.y < -10) {
        p.y = h + 10
        p.x = Math.random() * w
      }
      if (p.x < -10) p.x = w + 10
      if (p.x > w + 10) p.x = -10

      const near = pointer.active
        ? Math.max(0, 1 - ((pointer.x - p.x) ** 2 + (pointer.y - p.y) ** 2) / 40000)
        : 0
      const [r, g, b] = p.warm ? SOFT : ACCENT
      ctx.fillStyle = `rgba(${r},${g},${b},${Math.min(1, p.a + near * 0.5)})`
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r + near * 1.5, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.globalCompositeOperation = 'source-over'
  }

  const onMove = (e: MouseEvent) => {
    const rect = el.getBoundingClientRect()
    pointer.x = e.clientX - rect.left
    pointer.y = e.clientY - rect.top
    pointer.active = true
  }
  const onLeave = () => {
    pointer.active = false
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
  window.addEventListener('mouseout', onLeave)
  document.addEventListener('visibilitychange', onVisibility)
  io.observe(el)

  if (reduce) {
    drawStatic()
  } else {
    raf = requestAnimationFrame(tick)
  }

  cleanup = () => {
    cancelAnimationFrame(raf)
    window.removeEventListener('resize', resize)
    window.removeEventListener('mousemove', onMove)
    window.removeEventListener('mouseout', onLeave)
    document.removeEventListener('visibilitychange', onVisibility)
    io.disconnect()
  }
})

onUnmounted(() => cleanup?.())
</script>

<template>
  <canvas ref="canvas" class="absolute inset-0 h-full w-full" aria-hidden="true" />
</template>
