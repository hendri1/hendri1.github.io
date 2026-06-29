<script setup lang="ts">
import SectionHeading from '../ui/SectionHeading.vue'
import ParallaxText from '../fx/ParallaxText.vue'
import { usePortfolio } from '@/composables/usePortfolio'

const { process } = usePortfolio()
const pad = (n: number) => String(n).padStart(2, '0')
</script>

<template>
  <section id="process" data-testid="process" class="relative mx-auto max-w-6xl px-4 py-24 sm:px-8">
    <ParallaxText text="PROCESS" position="-top-12 right-0" :amount="0.6" />
    <SectionHeading
      eyebrow="03 / How I work"
      title="A clear path, written down"
      subtitle="No mystery, no lock-in. Every engagement follows the same simple arc so the team always knows where things stand."
    />

    <ol class="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-4" data-testid="process-list">
      <li
        v-for="(step, index) in process"
        :key="step.id"
        v-reveal
        :data-testid="`process-${step.id}`"
        class="relative flex flex-col rounded-2xl border border-line bg-surface/40 p-6"
      >
        <div class="flex items-center gap-3">
          <span class="font-mono text-2xl font-semibold text-accent">{{ pad(index + 1) }}</span>
          <span
            v-if="index < process.length - 1"
            class="h-px flex-1 bg-line"
            aria-hidden="true"
          />
        </div>
        <h3 class="mt-4 text-lg font-semibold text-fg">{{ step.title }}</h3>
        <p class="mt-2 text-sm leading-relaxed text-muted">{{ step.description }}</p>
      </li>
    </ol>
  </section>
</template>
