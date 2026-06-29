<script setup lang="ts">
withDefaults(defineProps<{ accent?: boolean }>(), { accent: false })
</script>

<template>
  <span
    class="inline-flex items-center rounded-md border px-2 py-0.5 font-mono text-xs transition-colors"
    :class="
      accent
        ? 'border-accent/30 bg-accent/10 text-accent'
        : 'border-line bg-surface/60 text-muted hover:text-fg'
    "
  >
    <slot />
  </span>
</template>
