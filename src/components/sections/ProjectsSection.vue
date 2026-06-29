<script setup lang="ts">
import SectionHeading from '../ui/SectionHeading.vue'
import TagBadge from '../ui/TagBadge.vue'
import AppIcon from '../ui/AppIcon.vue'
import { usePortfolio } from '@/composables/usePortfolio'

const { projects } = usePortfolio()
const pad = (n: number) => String(n).padStart(2, '0')
</script>

<template>
  <section id="work" data-testid="work" class="mx-auto max-w-6xl px-4 py-24 sm:px-8">
    <SectionHeading
      eyebrow="04 / Selected Work"
      title="Projects & case studies"
      subtitle="Highlights from work at Mekari and beyond — architecture, design systems, and products."
    />

    <div class="grid gap-4 sm:gap-5 md:grid-cols-2" data-testid="projects-grid">
      <article
        v-for="(project, index) in projects"
        :key="project.id"
        v-reveal="index * 60"
        v-tilt="5"
        :data-testid="`project-${project.id}`"
        data-cursor
        class="group relative flex flex-col rounded-2xl border border-line bg-surface/40 p-6 transition-colors hover:border-accent/50 sm:p-8"
      >
        <div class="flex items-start justify-between gap-3">
          <span class="font-mono text-sm text-accent">({{ pad(index + 1) }})</span>
          <ul class="flex flex-wrap justify-end gap-1.5">
            <li v-for="tag in project.tags" :key="tag">
              <TagBadge accent>{{ tag }}</TagBadge>
            </li>
          </ul>
        </div>

        <p class="mt-5 kicker">{{ project.context }}</p>
        <h3 class="mt-2 text-xl font-semibold text-fg">{{ project.name }}</h3>
        <p class="mt-1 text-sm font-medium text-muted">{{ project.tagline }}</p>
        <p class="mt-3 flex-1 text-sm leading-relaxed text-fg/80">{{ project.description }}</p>

        <ul class="mt-5 flex flex-wrap gap-1.5">
          <li v-for="tech in project.stack" :key="tech">
            <TagBadge>{{ tech }}</TagBadge>
          </li>
        </ul>

        <div v-if="project.links.length" class="mt-5 flex flex-wrap gap-4 border-t border-line pt-4">
          <a
            v-for="link in project.links"
            :key="link.url"
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
            :data-testid="`project-link-${project.id}`"
            data-cursor
            class="inline-flex items-center gap-1.5 font-mono text-sm text-accent transition-opacity hover:opacity-80"
          >
            {{ link.label }}
            <AppIcon name="external" :size="14" />
          </a>
        </div>
      </article>
    </div>
  </section>
</template>
