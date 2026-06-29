<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const progress = ref(0)
let cleanup: (() => void) | null = null

const update = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight
  progress.value = max > 0 ? Math.min(1, window.scrollY / max) : 0
}

onMounted(() => {
  update()
  window.addEventListener('scroll', update, { passive: true })
  window.addEventListener('resize', update)
  cleanup = () => {
    window.removeEventListener('scroll', update)
    window.removeEventListener('resize', update)
  }
})
onUnmounted(() => cleanup?.())
</script>

<template>
  <div class="fixed inset-x-0 top-0 z-[80] h-0.5 bg-transparent" aria-hidden="true">
    <div
      class="h-full origin-left bg-accent transition-[width] duration-75 ease-linear"
      :style="{ width: `${progress * 100}%` }"
    />
  </div>
</template>
