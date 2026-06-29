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
    background_color: '0c0a08',
    text_color: 'f2ebdd',
    primary_color: 'ff5b23',
  })
  return `${calendly.value.url}?${params.toString()}`
})
</script>

<template>
  <section id="contact" data-testid="contact" class="mx-auto max-w-6xl px-4 py-24 sm:px-8">
    <SectionHeading
      eyebrow="06 / Contact"
      title="Let's build something"
      subtitle="Book a slot that suits you, or reach out directly — I usually reply within a day."
    />

    <!-- oversized email statement -->
    <a
      v-if="email"
      v-magnetic="0.25"
      :href="email.url"
      data-testid="contact-email"
      data-cursor
      class="link-underline inline-block font-semibold tracking-tight text-fg"
      style="font-size: clamp(1.6rem, 5vw, 3.25rem); letter-spacing: -0.02em"
    >
      {{ email.handle }}
    </a>

    <div class="mt-12 grid gap-5 lg:grid-cols-5">
      <div class="flex flex-col gap-3 lg:col-span-2">
        <a
          v-for="social in otherSocials"
          :key="social.kind"
          :href="social.url"
          target="_blank"
          rel="noopener noreferrer"
          :data-testid="`contact-${social.kind}`"
          data-cursor
          class="group flex items-center gap-4 rounded-2xl border border-line bg-surface/40 p-5 transition-colors hover:border-accent/50"
        >
          <span class="grid size-11 place-items-center rounded-xl border border-line text-accent">
            <AppIcon :name="social.kind === 'linkedin' ? 'linkedin' : 'github'" :size="20" />
          </span>
          <span class="min-w-0">
            <span class="block kicker">{{ social.label }}</span>
            <span class="block truncate font-medium text-fg">{{ social.handle }}</span>
          </span>
          <AppIcon
            name="external"
            :size="16"
            class="ml-auto text-muted transition-colors group-hover:text-accent"
          />
        </a>
      </div>

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
        <p v-if="calendly" class="font-mono text-xs text-muted">
          Scheduler not loading?
          <a
            :href="calendly.url"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="contact-calendly-fallback"
            data-cursor
            class="text-accent hover:underline"
            >Open Calendly ↗</a
          >
        </p>
      </div>
    </div>
  </section>
</template>
