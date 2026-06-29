<script setup lang="ts">
withDefaults(defineProps<{ text: string; amount?: number; position?: string }>(), {
  amount: 0.5,
  position: 'top-0 -right-6',
})
</script>

<template>
  <span
    v-parallax="amount"
    aria-hidden="true"
    class="pointer-events-none absolute z-0 font-mono font-bold tracking-tighter uppercase select-none"
    :class="position"
    style="
      font-size: clamp(5rem, 16vw, 15rem);
      line-height: 0.85;
      color: transparent;
      -webkit-text-stroke: 1px color-mix(in oklab, var(--color-accent) 22%, transparent);
    "
    >{{ text }}</span
  >
</template>
