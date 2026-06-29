<script setup lang="ts">
import SocialLinks from '../ui/SocialLinks.vue'
import { usePortfolio } from '@/presentation/composables/usePortfolio'

const { profile } = usePortfolio()
const year = new Date().getFullYear()
</script>

<template>
  <footer data-testid="app-footer" class="border-t border-line">
    <div
      class="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-10 sm:flex-row sm:justify-between sm:px-6"
    >
      <div class="text-center sm:text-left">
        <p class="font-semibold text-fg">{{ profile.name }}</p>
        <p class="text-sm text-muted">© {{ year }} · Built with Vue, Vite &amp; Bun</p>
      </div>
      <SocialLinks :socials="profile.socials" />
    </div>
  </footer>
</template>
