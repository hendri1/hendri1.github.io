<script setup lang="ts">
import SectionHeading from '../ui/SectionHeading.vue'
import TagBadge from '../ui/TagBadge.vue'
import { usePortfolio } from '@/presentation/composables/usePortfolio'

const { profile } = usePortfolio()
</script>

<template>
  <section id="about" data-testid="about" class="mx-auto max-w-6xl px-4 py-24 sm:px-8">
    <SectionHeading eyebrow="02 / About" title="Engineer, architect, mentor" />

    <div class="grid gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-3">
      <div class="bg-bg p-7 lg:col-span-2 lg:p-9">
        <p class="text-lg leading-relaxed text-fg/90">{{ profile.summary }}</p>

        <div class="mt-8">
          <p class="kicker mb-3">Strengths</p>
          <ul class="flex flex-wrap gap-2" data-testid="soft-skills">
            <li v-for="skill in profile.softSkills" :key="skill">
              <TagBadge>{{ skill }}</TagBadge>
            </li>
          </ul>
        </div>
      </div>

      <div class="bg-bg p-7 lg:p-9">
        <p class="kicker mb-4">Languages</p>
        <ul class="space-y-3" data-testid="languages">
          <li
            v-for="lang in profile.languages"
            :key="lang.name"
            class="flex items-center justify-between border-b border-line pb-3 last:border-0"
          >
            <span class="font-medium text-fg">{{ lang.name }}</span>
            <span class="font-mono text-xs tracking-wide text-muted uppercase">{{ lang.level }}</span>
          </li>
        </ul>

        <div class="mt-7 border-l-2 border-accent pl-4">
          <p class="text-sm text-muted">
            Currently exploring how to combine my Industrial Engineering background with software to
            drive <span class="font-medium text-fg">ERP &amp; industrial digitalization</span>.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
