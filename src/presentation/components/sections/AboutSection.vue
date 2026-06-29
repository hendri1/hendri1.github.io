<script setup lang="ts">
import SectionHeading from '../ui/SectionHeading.vue'
import TagBadge from '../ui/TagBadge.vue'
import { usePortfolio } from '@/presentation/composables/usePortfolio'

const { profile } = usePortfolio()
</script>

<template>
  <section id="about" data-testid="about" class="mx-auto max-w-6xl px-4 py-20 sm:px-6">
    <SectionHeading eyebrow="About" title="Engineer, architect, mentor" />

    <div class="grid gap-6 lg:grid-cols-3">
      <div v-reveal class="rounded-2xl border border-line bg-card/60 p-7 lg:col-span-2">
        <p class="text-lg leading-relaxed text-fg/90">{{ profile.summary }}</p>

        <div class="mt-7">
          <h3 class="mb-3 text-sm font-semibold tracking-wide text-muted uppercase">Strengths</h3>
          <ul class="flex flex-wrap gap-2" data-testid="soft-skills">
            <li v-for="skill in profile.softSkills" :key="skill">
              <TagBadge>{{ skill }}</TagBadge>
            </li>
          </ul>
        </div>
      </div>

      <div v-reveal="100" class="rounded-2xl border border-line bg-card/60 p-7">
        <h3 class="mb-4 text-sm font-semibold tracking-wide text-muted uppercase">Languages</h3>
        <ul class="space-y-4" data-testid="languages">
          <li v-for="lang in profile.languages" :key="lang.name">
            <div class="flex items-center justify-between">
              <span class="font-medium text-fg">{{ lang.name }}</span>
              <span class="text-sm text-muted">{{ lang.level }}</span>
            </div>
          </li>
        </ul>

        <div class="mt-7 rounded-xl border border-accent/20 bg-accent/5 p-4">
          <p class="text-sm text-muted">
            Currently exploring how to combine my Industrial Engineering background with software to
            drive
            <span class="font-medium text-fg">ERP & industrial digitalization</span>.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
