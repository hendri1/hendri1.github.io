<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import AppIcon from '../ui/AppIcon.vue'
import SocialLinks from '../ui/SocialLinks.vue'
import DecodeText from '../ui/DecodeText.vue'
import CountUp from '../ui/CountUp.vue'
import ParticleField from '../fx/ParticleField.vue'
import { usePortfolio } from '@/composables/usePortfolio'

const { profile } = usePortfolio()
const calendlyUrl = computed(
  () => profile.socials.find((s) => s.kind === 'calendly')?.url ?? '#contact',
)

const clock = ref('')
let timer: ReturnType<typeof setInterval> | undefined
const fmt = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
  timeZone: 'Asia/Jakarta',
})
const updateClock = () => (clock.value = fmt.format(new Date()))

// Boot/online choreography on first paint.
const root = ref<HTMLElement | null>(null)
const booted = ref(false)
const status = ref('BOOT')
let ctx: ReturnType<typeof gsap.context> | null = null

onMounted(() => {
  updateClock()
  timer = setInterval(updateClock, 1000)

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce || !root.value) {
    booted.value = true
    status.value = 'ONLINE'
    return
  }

  ctx = gsap.context(() => {
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: () => {
        booted.value = true
        status.value = 'ONLINE'
      },
    })
    tl.from('[data-boot-hud]', { autoAlpha: 0, y: -8, duration: 0.5, stagger: 0.1 })
      .call(() => (status.value = 'LINK'), undefined, 0.15)
      .call(() => (status.value = 'SYNC'), undefined, 0.45)
      .from('[data-boot="kicker"]', { autoAlpha: 0, y: 10, duration: 0.5 }, '-=0.25')
      .from('[data-boot="name"]', { autoAlpha: 0, y: 26, duration: 0.75 }, '-=0.1')
      .from('[data-boot="badge"]', { autoAlpha: 0, y: 10, duration: 0.4 }, '-=0.4')
      .from('[data-boot="tagline"]', { autoAlpha: 0, y: 10, duration: 0.5 }, '-=0.25')
      .from('[data-boot="cta"] > *', { autoAlpha: 0, y: 14, duration: 0.45, stagger: 0.09 }, '-=0.2')
      .from('[data-boot="stats"] > *', { autoAlpha: 0, y: 18, duration: 0.5, stagger: 0.07 }, '-=0.1')
  }, root.value)
})

onUnmounted(() => {
  clearInterval(timer)
  ctx?.revert()
})
</script>

<template>
  <section
    id="top"
    ref="root"
    data-testid="hero"
    class="relative flex min-h-screen flex-col justify-center overflow-hidden px-4 pt-24 pb-16 sm:px-8"
  >
    <!-- depth layers (back → front) -->
    <div class="pointer-events-none absolute inset-0 z-0 flex items-center justify-center" aria-hidden="true">
      <span
        v-parallax="-0.25"
        class="font-mono font-bold tracking-tighter text-accent/5 select-none"
        style="font-size: clamp(12rem, 34vw, 34rem); line-height: 1"
        >HFH</span
      >
    </div>
    <div class="absolute inset-0 z-[1]" aria-hidden="true">
      <ParticleField />
    </div>
    <div
      class="pointer-events-none absolute inset-0 z-[2]"
      aria-hidden="true"
      style="
        background:
          radial-gradient(120% 80% at 50% 30%, transparent 35%, var(--color-bg) 92%),
          linear-gradient(to bottom, transparent 55%, var(--color-bg));
      "
    />
    <!-- sweeping scan line -->
    <div class="scan pointer-events-none absolute inset-x-0 top-0 z-[2]" aria-hidden="true" />

    <!-- HUD telemetry corners -->
    <div
      class="pointer-events-none absolute inset-x-4 top-20 flex justify-between font-mono text-[0.65rem] tracking-widest text-muted uppercase sm:inset-x-8"
      aria-hidden="true"
    >
      <span data-boot-hud>FRONTEND ENGINEERING · CONSULTING</span>
      <span
        data-boot-hud
        data-testid="hero-status"
        class="text-accent"
        :class="{ 'animate-pulse': !booted }"
        >◢ {{ status }}</span
      >
    </div>

    <div class="relative z-10 mx-auto w-full max-w-6xl">
      <div class="flex items-start justify-between gap-4">
        <p data-boot="kicker" class="kicker flex items-center gap-2">
          <span class="inline-block h-px w-8 bg-accent" aria-hidden="true" />
          <DecodeText text="Senior Frontend Engineer · 10+ years" />
        </p>
        <div class="hidden text-right sm:block">
          <p class="font-mono text-xs text-muted">BANDUNG, ID</p>
          <p class="font-mono text-xs text-accent" data-testid="local-clock">{{ clock }} WIB</p>
        </div>
      </div>

      <!-- Value proposition leads — this is a business profile, not a résumé. -->
      <h1
        data-boot="name"
        data-testid="hero-valueprop"
        class="glow mt-8 max-w-4xl font-semibold tracking-tight text-fg"
        style="font-size: clamp(2.5rem, 7vw, 5.5rem); line-height: 1.03; letter-spacing: -0.03em"
      >
        {{ profile.valueProp }}
      </h1>

      <!-- Name credit + availability (one boot group). -->
      <p
        data-boot="badge"
        class="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-sm"
      >
        <span class="font-medium text-fg" data-testid="hero-name">{{ profile.name }}</span>
        <span class="text-accent" aria-hidden="true">/</span>
        <span class="text-muted">{{ profile.title }}</span>
        <span
          v-if="profile.availableForWork"
          data-testid="availability-badge"
          class="inline-flex items-center gap-2 rounded-full border border-accent3/40 px-3 py-1 text-xs tracking-wide text-fg/90 uppercase"
        >
          <span class="relative flex size-2">
            <span class="absolute inline-flex size-full animate-ping rounded-full bg-accent3 opacity-70" />
            <span class="relative inline-flex size-2 rounded-full bg-accent3" />
          </span>
          Available for work
        </span>
      </p>

      <p data-boot="tagline" data-testid="hero-tagline" class="mt-6 max-w-xl text-lg text-muted sm:text-xl">
        {{ profile.valuePropSub }}
      </p>

      <div data-boot="cta" class="mt-8 flex flex-wrap items-center gap-3">
        <a
          v-magnetic="0.4"
          :href="calendlyUrl"
          target="_blank"
          rel="noopener noreferrer"
          data-testid="hero-cta-call"
          data-cursor="book a call"
          class="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-semibold text-[#06070d] transition-colors hover:bg-accent-soft"
        >
          <AppIcon name="calendar" :size="18" />
          Book a call
        </a>
        <a
          v-magnetic="0.3"
          href="#services"
          data-testid="hero-cta-services"
          data-cursor
          class="inline-flex items-center gap-2 rounded-md border border-line px-6 py-3 text-sm font-semibold text-fg transition-colors hover:border-accent"
        >
          See what I do
          <AppIcon name="arrow-right" :size="16" />
        </a>
        <a
          href="#work"
          data-testid="hero-cta-work"
          data-cursor
          class="inline-flex items-center gap-2 px-2 py-3 text-sm font-medium text-muted transition-colors hover:text-accent"
        >
          View work
          <AppIcon name="arrow-down" :size="16" />
        </a>
        <SocialLinks class="ml-1" :socials="profile.socials" />
      </div>

      <dl
        data-boot="stats"
        data-testid="hero-stats"
        class="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-line bg-line lg:grid-cols-4"
      >
        <div v-for="stat in profile.highlights" :key="stat.label" class="hud bg-bg p-5">
          <dt class="text-2xl font-semibold text-fg sm:text-3xl">
            <CountUp :value="stat.value" />
          </dt>
          <dd class="mt-1 font-mono text-xs tracking-wide text-muted uppercase">{{ stat.label }}</dd>
        </div>
      </dl>
    </div>

    <a
      href="#about"
      class="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 font-mono text-[0.65rem] tracking-[0.3em] text-muted uppercase"
      aria-label="Scroll down"
      >↓ scroll</a
    >
  </section>
</template>

<style scoped>
.scan {
  top: 0;
  height: 2px;
  background: linear-gradient(
    to right,
    transparent,
    color-mix(in oklab, var(--color-accent) 70%, transparent),
    transparent
  );
  animation: scan 7s linear infinite;
}
@keyframes scan {
  0% {
    transform: translateY(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(100vh);
    opacity: 0;
  }
}
@media (prefers-reduced-motion: reduce) {
  .scan {
    animation: none;
    display: none;
  }
}
</style>
