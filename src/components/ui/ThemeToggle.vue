<script setup lang="ts">
import { computed } from 'vue'
import AppIcon from './AppIcon.vue'
import { useTheme } from '@/composables/useTheme'

const { theme, toggle } = useTheme()
const label = computed(() => (theme.value === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'))
</script>

<template>
  <button
    type="button"
    data-testid="theme-toggle"
    :aria-label="label"
    :title="label"
    class="grid size-10 place-items-center rounded-full border border-line bg-surface text-muted transition-colors hover:text-fg"
    @click="toggle"
  >
    <AppIcon :name="theme === 'dark' ? 'sun' : 'moon'" :size="18" />
  </button>
</template>
