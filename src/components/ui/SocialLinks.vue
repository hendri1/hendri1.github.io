<script setup lang="ts">
import AppIcon from './AppIcon.vue'
import type { IconName } from './icons'
import type { SocialLink, SocialKind } from '@/types/portfolio'

defineProps<{ socials: readonly SocialLink[] }>()

const ICON_BY_KIND: Record<SocialKind, IconName> = {
  email: 'email',
  linkedin: 'linkedin',
  github: 'github',
  calendly: 'calendar',
  website: 'globe',
}
</script>

<template>
  <ul class="flex items-center gap-2" data-testid="social-links">
    <li v-for="social in socials" :key="social.kind">
      <a
        :href="social.url"
        :data-testid="`social-${social.kind}`"
        :aria-label="social.label"
        :title="`${social.label} · ${social.handle}`"
        target="_blank"
        rel="noopener noreferrer"
        class="grid size-10 place-items-center rounded-full border border-line bg-surface text-muted transition-colors hover:border-accent/40 hover:text-accent"
      >
        <AppIcon :name="ICON_BY_KIND[social.kind]" :size="18" />
      </a>
    </li>
  </ul>
</template>
