<script setup lang="ts">
defineProps<{ eyebrow: string; title: string; subtitle?: string }>()
</script>

<template>
  <header class="mb-10 max-w-2xl" v-reveal>
    <p class="mb-3 flex items-center gap-2 text-sm font-semibold tracking-wide text-accent uppercase">
      <span class="h-px w-6 bg-accent/60" aria-hidden="true" />
      {{ eyebrow }}
    </p>
    <h2 class="text-3xl font-bold tracking-tight text-fg sm:text-4xl">{{ title }}</h2>
    <p v-if="subtitle" class="mt-3 text-base text-muted">{{ subtitle }}</p>
  </header>
</template>
