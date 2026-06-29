<script setup lang="ts">
withDefaults(defineProps<{ accent?: boolean }>(), { accent: false })
</script>

<template>
  <span
    class="inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium transition-colors"
    :class="
      accent
        ? 'border-accent/30 bg-accent/10 text-accent'
        : 'border-line bg-surface text-muted hover:text-fg'
    "
  >
    <slot />
  </span>
</template>
