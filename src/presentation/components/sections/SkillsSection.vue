<script setup lang="ts">
import SectionHeading from '../ui/SectionHeading.vue'
import { usePortfolio } from '@/presentation/composables/usePortfolio'

const { skillGroups, education } = usePortfolio()
</script>

<template>
  <section id="skills" data-testid="skills" class="mx-auto max-w-6xl px-4 py-20 sm:px-6">
    <SectionHeading
      eyebrow="Skills"
      title="Tools of the trade"
      subtitle="Frontend-deep, full-stack-aware. Years reflect hands-on experience."
    />

    <div class="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3" data-testid="skill-groups">
      <div
        v-for="group in skillGroups"
        :key="group.id"
        v-reveal
        :data-testid="`skill-group-${group.id}`"
        class="rounded-2xl border border-line bg-card/60 p-6"
      >
        <h3 class="mb-4 text-sm font-semibold tracking-wide text-muted uppercase">
          {{ group.name }}
        </h3>
        <ul class="space-y-2.5">
          <li
            v-for="skill in group.skills"
            :key="skill.name"
            class="flex items-center justify-between gap-3"
          >
            <span class="text-fg/90">{{ skill.name }}</span>
            <span v-if="skill.years" class="shrink-0 text-xs text-muted">
              {{ skill.years }}+ yrs
            </span>
          </li>
        </ul>
      </div>
    </div>

    <h3 class="mt-12 mb-4 text-sm font-semibold tracking-wide text-muted uppercase">Education</h3>
    <div class="grid gap-4 sm:gap-5 md:grid-cols-2" data-testid="education-list">
      <div
        v-for="item in education"
        :key="item.id"
        v-reveal
        :data-testid="`education-${item.id}`"
        class="rounded-2xl border border-line bg-card/60 p-6"
      >
        <div class="flex items-baseline justify-between gap-3">
          <h4 class="font-semibold text-fg">{{ item.institution }}</h4>
          <span class="shrink-0 text-xs text-muted">{{ item.periodLabel }}</span>
        </div>
        <p class="mt-1 text-sm text-fg/80">{{ item.credential }} · {{ item.field }}</p>
        <p v-if="item.note" class="mt-1 text-sm text-accent">{{ item.note }}</p>
      </div>
    </div>
  </section>
</template>
