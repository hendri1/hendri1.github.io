<script setup lang="ts">
import SectionHeading from '../ui/SectionHeading.vue'
import ParallaxText from '../fx/ParallaxText.vue'
import { usePortfolio } from '@/composables/usePortfolio'

const { skillGroups, education } = usePortfolio()
</script>

<template>
  <section id="skills" data-testid="skills" class="relative mx-auto max-w-6xl px-4 py-24 sm:px-8">
    <ParallaxText text="STACK" position="-top-10 -left-4" :amount="0.55" />
    <SectionHeading
      eyebrow="06 / Capabilities"
      title="Tools of the trade"
      subtitle="Frontend-deep, full-stack-aware. Years reflect hands-on experience."
    />

    <!-- spec sheet: one row per category -->
    <div
      class="overflow-hidden rounded-2xl border border-line"
      data-testid="skill-groups"
    >
      <div
        v-for="group in skillGroups"
        :key="group.id"
        v-reveal
        :data-testid="`skill-group-${group.id}`"
        class="grid gap-3 border-b border-line p-5 last:border-0 sm:grid-cols-[180px_1fr] sm:gap-6 sm:p-6"
      >
        <p class="kicker pt-1">{{ group.name }}</p>
        <ul class="flex flex-wrap gap-x-5 gap-y-2">
          <li
            v-for="skill in group.skills"
            :key="skill.name"
            class="group inline-flex items-baseline gap-1.5 text-fg/90 transition-colors hover:text-accent"
          >
            <span>{{ skill.name }}</span>
            <span v-if="skill.years" class="font-mono text-[0.7rem] text-muted">{{ skill.years }}y</span>
          </li>
        </ul>
      </div>
    </div>

    <p class="kicker mt-12 mb-4">Education</p>
    <div class="grid gap-4 sm:gap-5 md:grid-cols-2" data-testid="education-list">
      <div
        v-for="item in education"
        :key="item.id"
        v-reveal
        :data-testid="`education-${item.id}`"
        class="rounded-2xl border border-line bg-surface/40 p-6"
      >
        <div class="flex items-baseline justify-between gap-3">
          <h4 class="font-semibold text-fg">{{ item.institution }}</h4>
          <span class="font-mono text-xs text-muted">{{ item.periodLabel }}</span>
        </div>
        <p class="mt-1 text-sm text-fg/80">{{ item.credential }} · {{ item.field }}</p>
        <p v-if="item.note" class="mt-1 font-mono text-xs text-accent">{{ item.note }}</p>
      </div>
    </div>
  </section>
</template>
