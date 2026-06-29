<script setup lang="ts">
import DecodeText from './DecodeText.vue'
defineProps<{ eyebrow: string; title: string; subtitle?: string }>()
</script>

<template>
  <header class="mb-12 max-w-2xl" v-reveal>
    <p class="kicker flex items-center gap-2">
      <span class="inline-block h-px w-8 bg-accent" aria-hidden="true" />
      {{ eyebrow }}
    </p>
    <h2
      class="mt-4 font-semibold tracking-tight text-fg"
      style="font-size: clamp(2rem, 5vw, 3.5rem); line-height: 1.05; letter-spacing: -0.02em"
    >
      <DecodeText :text="title" />
    </h2>
    <p v-if="subtitle" class="mt-4 text-base text-muted">{{ subtitle }}</p>
  </header>
</template>
