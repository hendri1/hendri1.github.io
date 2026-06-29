<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import AppIcon from '../ui/AppIcon.vue'
import SocialLinks from '../ui/SocialLinks.vue'
import ParticleField from '../fx/ParticleField.vue'
import { usePortfolio } from '@/presentation/composables/usePortfolio'

const { profile } = usePortfolio()
const calendlyUrl = computed(
  () => profile.socials.find((s) => s.kind === 'calendly')?.url ?? '#contact',
)

// Live local time in Bandung / Jakarta.
const clock = ref('')
let timer: ReturnType<typeof setInterval> | undefined
const fmt = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
  timeZone: 'Asia/Jakarta',
})
const updateClock = () => {
  clock.value = fmt.format(new Date())
}
onMounted(() => {
  updateClock()
  timer = setInterval(updateClock, 1000)
})
onUnmounted(() => clearInterval(timer))
</script>

<template>
  <section
    id="top"
    data-testid="hero"
    class="relative flex min-h-screen flex-col justify-center overflow-hidden px-4 pt-24 pb-16 sm:px-8"
  >
    <ParticleField />
    <!-- vignette so the type stays legible over the field -->
    <div
      class="pointer-events-none absolute inset-0 -z-0"
      aria-hidden="true"
      style="
        background:
          radial-gradient(120% 80% at 50% 40%, transparent 40%, var(--color-bg) 92%),
          linear-gradient(to bottom, transparent 60%, var(--color-bg));
      "
    />

    <div class="relative z-10 mx-auto w-full max-w-6xl">
      <div class="flex items-start justify-between gap-4">
        <p class="kicker flex items-center gap-2">
          <span class="inline-block h-px w-8 bg-accent" aria-hidden="true" />
          01 / Senior Frontend Engineer · Mekari
        </p>
        <div class="hidden text-right sm:block">
          <p class="font-mono text-xs text-muted">BANDUNG, ID</p>
          <p class="font-mono text-xs text-accent" data-testid="local-clock">{{ clock }} WIB</p>
        </div>
      </div>

      <h1
        data-testid="hero-name"
        class="mt-8 font-semibold tracking-tight uppercase"
        style="font-size: clamp(3rem, 11vw, 9rem); line-height: 0.9; letter-spacing: -0.03em"
      >
        {{ profile.name }}
      </h1>

      <p
        v-if="profile.availableForWork"
        data-testid="availability-badge"
        class="mt-6 inline-flex items-center gap-2 font-mono text-xs tracking-wide text-muted uppercase"
      >
        <span class="relative flex size-2">
          <span class="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-70" />
          <span class="relative inline-flex size-2 rounded-full bg-accent" />
        </span>
        Open to senior frontend roles
      </p>

      <p data-testid="hero-tagline" class="mt-5 max-w-xl text-lg text-muted sm:text-xl">
        {{ profile.tagline }}
      </p>

      <div class="mt-8 flex flex-wrap items-center gap-3">
        <a
          v-magnetic="0.4"
          :href="calendlyUrl"
          target="_blank"
          rel="noopener noreferrer"
          data-testid="hero-cta-call"
          data-cursor
          class="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-[#0c0a08] transition-colors hover:bg-accent-soft"
        >
          <AppIcon name="calendar" :size="18" />
          Book a call
        </a>
        <a
          v-magnetic="0.3"
          href="#work"
          data-testid="hero-cta-work"
          data-cursor
          class="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-semibold text-fg transition-colors hover:border-accent"
        >
          View work
          <AppIcon name="arrow-down" :size="16" />
        </a>
        <SocialLinks class="ml-1" :socials="profile.socials" />
      </div>

      <!-- stats as a mono datasheet row -->
      <dl
        data-testid="hero-stats"
        class="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line lg:grid-cols-4"
      >
        <div v-for="stat in profile.highlights" :key="stat.label" class="bg-bg p-5">
          <dt class="text-2xl font-semibold text-fg sm:text-3xl">{{ stat.value }}</dt>
          <dd class="mt-1 font-mono text-xs tracking-wide text-muted uppercase">{{ stat.label }}</dd>
        </div>
      </dl>
    </div>

    <a
      href="#about"
      class="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 font-mono text-[0.65rem] tracking-[0.3em] text-muted uppercase"
      aria-label="Scroll down"
    >
      ↓ scroll
    </a>
  </section>
</template>
