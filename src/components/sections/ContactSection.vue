<script setup lang="ts">
import { computed, ref } from 'vue'
import SectionHeading from '../ui/SectionHeading.vue'
import AppIcon from '../ui/AppIcon.vue'
import ParallaxText from '../fx/ParallaxText.vue'
import { usePortfolio } from '@/composables/usePortfolio'

const { profile } = usePortfolio()

const calendly = computed(() => profile.socials.find((s) => s.kind === 'calendly'))
const email = computed(() => profile.socials.find((s) => s.kind === 'email'))
const otherSocials = computed(() =>
  profile.socials.filter((s) => s.kind === 'linkedin' || s.kind === 'github'),
)

const calendlyEmbedUrl = computed(() => {
  if (!calendly.value) return ''
  // Match the sci-fi palette so the embed doesn't flash a foreign accent.
  const params = new URLSearchParams({
    embed_domain: 'hendri1.github.io',
    embed_type: 'Inline',
    hide_gdpr_banner: '1',
    background_color: '06070d',
    text_color: 'dce6f5',
    primary_color: '2de2e6',
  })
  return `${calendly.value.url}?${params.toString()}`
})

const copied = ref(false)
let copyTimer: ReturnType<typeof setTimeout> | undefined

async function copyEmail() {
  const value = email.value?.handle
  if (!value) return
  try {
    await navigator.clipboard.writeText(value)
  } catch {
    // Clipboard blocked (insecure context / denied) — still flash feedback
    // so the interaction never feels dead; the address is visible anyway.
  }
  copied.value = true
  clearTimeout(copyTimer)
  copyTimer = setTimeout(() => (copied.value = false), 1800)
}
</script>

<template>
  <section id="contact" data-testid="contact" class="relative mx-auto max-w-6xl px-4 py-24 sm:px-8">
    <ParallaxText text="CONTACT" position="-top-12 right-0" :amount="0.6" />
    <SectionHeading
      eyebrow="06 / Contact"
      title="Let's build something"
      subtitle="Book a slot that suits you, or reach out directly — I usually reply within a day."
    />

    <!-- oversized email statement + copy affordance -->
    <div v-if="email" class="flex flex-wrap items-center gap-x-5 gap-y-3">
      <a
        v-magnetic="0.25"
        :href="email.url"
        data-testid="contact-email"
        data-cursor="open mail"
        class="link-underline inline-block font-semibold tracking-tight text-fg"
        style="font-size: clamp(1.6rem, 5vw, 3.25rem); letter-spacing: -0.02em"
      >
        {{ email.handle }}
      </a>
      <button
        type="button"
        data-testid="copy-email"
        data-cursor="copy"
        class="copy-btn group inline-flex items-center gap-2 rounded-full border border-line bg-surface/40 px-4 py-2 font-mono text-xs tracking-widest text-muted uppercase transition-colors hover:border-accent/50 hover:text-accent active:scale-[0.96]"
        :class="{ 'is-copied': copied }"
        :aria-label="copied ? 'Email address copied' : 'Copy email address'"
        @click="copyEmail"
      >
        <AppIcon :name="copied ? 'check' : 'copy'" :size="14" />
        <span data-testid="copy-email-label">{{ copied ? 'Copied' : 'Copy' }}</span>
      </button>
    </div>

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
        <div class="overflow-hidden rounded-2xl border border-line bg-bg">
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
