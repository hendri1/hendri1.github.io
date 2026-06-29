<script setup lang="ts">
import { computed } from 'vue'
import AppIcon from '../ui/AppIcon.vue'
import SocialLinks from '../ui/SocialLinks.vue'
import { usePortfolio } from '@/presentation/composables/usePortfolio'

const { profile } = usePortfolio()
const calendlyUrl = computed(
  () => profile.socials.find((s) => s.kind === 'calendly')?.url ?? '#contact',
)
</script>

<template>
  <section
    id="top"
    data-testid="hero"
    class="relative overflow-hidden px-4 pt-28 pb-16 sm:px-6 sm:pt-36 sm:pb-24"
  >
    <!-- ambient gradient backdrop -->
    <div
      class="pointer-events-none absolute inset-0 -z-10 opacity-70"
      aria-hidden="true"
      style="
        background:
          radial-gradient(40rem 30rem at 75% -10%, color-mix(in oklab, var(--color-accent) 22%, transparent), transparent),
          radial-gradient(36rem 28rem at 10% 10%, color-mix(in oklab, var(--color-accent-2) 16%, transparent), transparent);
      "
    />

    <div class="mx-auto max-w-6xl">
      <div class="max-w-3xl">
        <p
          v-if="profile.availableForWork"
          v-reveal
          data-testid="availability-badge"
          class="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-sm text-muted"
        >
          <span class="relative flex size-2">
            <span
              class="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75"
            />
            <span class="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          Open to senior frontend opportunities
        </p>

        <h1
          v-reveal
          data-testid="hero-name"
          class="text-4xl font-bold tracking-tight text-fg sm:text-6xl"
        >
          {{ profile.name }}
        </h1>

        <p v-reveal="80" class="mt-4 text-xl font-medium sm:text-2xl">
          <span class="text-gradient">{{ profile.title }}</span>
        </p>

        <p v-reveal="140" data-testid="hero-tagline" class="mt-5 max-w-2xl text-lg text-muted">
          {{ profile.tagline }}
        </p>

        <p v-reveal="180" class="mt-3 flex items-center gap-2 text-sm text-muted">
          <AppIcon name="map-pin" :size="16" />
          {{ profile.location }}
        </p>

        <div v-reveal="220" class="mt-8 flex flex-wrap items-center gap-3">
          <a
            :href="calendlyUrl"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="hero-cta-call"
            class="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-2 px-6 py-3 text-sm font-semibold text-[#0a0e16] shadow-lg shadow-accent/20 transition-transform hover:-translate-y-0.5"
          >
            <AppIcon name="calendar" :size="18" />
            Book a call
          </a>
          <a
            href="#work"
            data-testid="hero-cta-work"
            class="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3 text-sm font-semibold text-fg transition-colors hover:border-accent/40"
          >
            View work
            <AppIcon name="arrow-down" :size="16" />
          </a>
          <SocialLinks class="ml-1" :socials="profile.socials" />
        </div>
      </div>

      <!-- highlight stats — bento row -->
      <dl
        v-reveal="280"
        data-testid="hero-stats"
        class="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
      >
        <div
          v-for="stat in profile.highlights"
          :key="stat.label"
          class="rounded-2xl border border-line bg-card/60 p-5 backdrop-blur-sm"
        >
          <dt class="text-2xl font-bold text-fg sm:text-3xl">{{ stat.value }}</dt>
          <dd class="mt-1 text-sm text-muted">{{ stat.label }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>
