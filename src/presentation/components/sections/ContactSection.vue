<script setup lang="ts">
import { computed } from 'vue'
import SectionHeading from '../ui/SectionHeading.vue'
import AppIcon from '../ui/AppIcon.vue'
import { usePortfolio } from '@/presentation/composables/usePortfolio'

const { profile } = usePortfolio()

const calendly = computed(() => profile.socials.find((s) => s.kind === 'calendly'))
const email = computed(() => profile.socials.find((s) => s.kind === 'email'))
const otherSocials = computed(() =>
  profile.socials.filter((s) => s.kind === 'linkedin' || s.kind === 'github'),
)

const calendlyEmbedUrl = computed(() => {
  if (!calendly.value) return ''
  const params = new URLSearchParams({
    embed_domain: 'hendri1.github.io',
    embed_type: 'Inline',
    hide_gdpr_banner: '1',
    primary_color: '818cf8',
  })
  return `${calendly.value.url}?${params.toString()}`
})
</script>

<template>
  <section id="contact" data-testid="contact" class="mx-auto max-w-6xl px-4 py-20 sm:px-6">
    <SectionHeading
      eyebrow="Contact"
      title="Let's build something"
      subtitle="Book a slot that suits you, or reach out directly — I usually reply within a day."
    />

    <div class="grid gap-5 lg:grid-cols-5">
      <!-- direct channels -->
      <div class="flex flex-col gap-3 lg:col-span-2">
        <a
          v-if="email"
          :href="email.url"
          data-testid="contact-email"
          class="group flex items-center gap-4 rounded-2xl border border-line bg-card/60 p-5 transition-colors hover:border-accent/40"
        >
          <span class="grid size-11 place-items-center rounded-xl bg-accent/10 text-accent">
            <AppIcon name="email" :size="20" />
          </span>
          <span class="min-w-0">
            <span class="block text-sm text-muted">Email</span>
            <span class="block truncate font-medium text-fg">{{ email.handle }}</span>
          </span>
        </a>

        <a
          v-for="social in otherSocials"
          :key="social.kind"
          :href="social.url"
          target="_blank"
          rel="noopener noreferrer"
          :data-testid="`contact-${social.kind}`"
          class="group flex items-center gap-4 rounded-2xl border border-line bg-card/60 p-5 transition-colors hover:border-accent/40"
        >
          <span class="grid size-11 place-items-center rounded-xl bg-accent/10 text-accent">
            <AppIcon :name="social.kind === 'linkedin' ? 'linkedin' : 'github'" :size="20" />
          </span>
          <span class="min-w-0">
            <span class="block text-sm text-muted">{{ social.label }}</span>
            <span class="block truncate font-medium text-fg">{{ social.handle }}</span>
          </span>
          <AppIcon
            name="external"
            :size="16"
            class="ml-auto text-muted transition-colors group-hover:text-accent"
          />
        </a>
      </div>

      <!-- calendly inline scheduler -->
      <div v-reveal class="flex flex-col gap-3 lg:col-span-3">
        <div class="overflow-hidden rounded-2xl border border-line bg-white">
          <iframe
            v-if="calendlyEmbedUrl"
            :src="calendlyEmbedUrl"
            data-testid="contact-calendly"
            title="Book a call with Hendri via Calendly"
            loading="lazy"
            class="h-[680px] w-full"
          />
        </div>
        <p v-if="calendly" class="text-center text-sm text-muted">
          Scheduler not loading?
          <a
            :href="calendly.url"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="contact-calendly-fallback"
            class="font-medium text-accent hover:underline"
            >Open Calendly ↗</a
          >
        </p>
      </div>
    </div>
  </section>
</template>
