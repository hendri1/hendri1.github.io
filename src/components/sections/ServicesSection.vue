<script setup lang="ts">
import SectionHeading from '../ui/SectionHeading.vue'
import AppIcon from '../ui/AppIcon.vue'
import ParallaxText from '../fx/ParallaxText.vue'
import { usePortfolio } from '@/composables/usePortfolio'
import type { IconName } from '../ui/icons'

const { services } = usePortfolio()
const pad = (n: number) => String(n).padStart(2, '0')
</script>

<template>
  <section id="services" data-testid="services" class="relative mx-auto max-w-6xl px-4 py-24 sm:px-8">
    <ParallaxText text="SERVICES" position="-top-12 -left-4" :amount="0.55" />
    <SectionHeading
      eyebrow="01 / What I do"
      title="How I help teams ship"
      subtitle="Four ways I plug into a product team — from the first architecture decision to a team that can keep moving without me."
    />

    <div class="grid gap-4 sm:gap-5 md:grid-cols-2" data-testid="services-grid">
      <article
        v-for="(service, index) in services"
        :key="service.id"
        v-reveal
        :data-testid="`service-${service.id}`"
        data-cursor
        class="service-card group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface/40 p-7 transition-colors hover:border-accent/50 sm:p-8"
      >
        <span
          class="pointer-events-none absolute top-5 right-6 font-mono text-xs text-muted/60 select-none"
          aria-hidden="true"
          >{{ pad(index + 1) }}</span
        >
        <span
          class="grid size-12 place-items-center rounded-xl border border-line text-accent transition-colors group-hover:border-accent/60"
        >
          <AppIcon :name="(service.icon as IconName)" :size="22" />
        </span>

        <h3 class="mt-5 text-xl font-semibold text-fg">{{ service.title }}</h3>
        <p class="mt-2 text-sm leading-relaxed text-muted">{{ service.summary }}</p>

        <ul class="mt-5 space-y-2 border-t border-line pt-4">
          <li
            v-for="capability in service.capabilities"
            :key="capability"
            class="flex items-start gap-2.5 text-sm text-fg/85"
          >
            <AppIcon name="check" :size="15" class="mt-0.5 shrink-0 text-accent" />
            <span>{{ capability }}</span>
          </li>
        </ul>
      </article>
    </div>
  </section>
</template>
