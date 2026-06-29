<script setup lang="ts">
import SectionHeading from '../ui/SectionHeading.vue'
import TagBadge from '../ui/TagBadge.vue'
import AppIcon from '../ui/AppIcon.vue'
import { usePortfolio } from '@/presentation/composables/usePortfolio'

const { projects } = usePortfolio()
</script>

<template>
  <section id="work" data-testid="work" class="mx-auto max-w-6xl px-4 py-20 sm:px-6">
    <SectionHeading
      eyebrow="Featured Work"
      title="Selected projects & case studies"
      subtitle="Highlights from work at Mekari and beyond — architecture, design systems, and products."
    />

    <div class="grid gap-4 sm:gap-5 md:grid-cols-2" data-testid="projects-grid">
      <article
        v-for="(project, index) in projects"
        :key="project.id"
        v-reveal="index * 60"
        :data-testid="`project-${project.id}`"
        class="group flex flex-col rounded-2xl border border-line bg-card/60 p-6 transition-colors hover:border-accent/40 sm:p-7"
      >
        <div class="flex items-center justify-between gap-3">
          <p class="text-xs font-medium tracking-wide text-accent uppercase">
            {{ project.context }}
          </p>
          <ul class="flex gap-1.5">
            <li v-for="tag in project.tags" :key="tag">
              <TagBadge accent>{{ tag }}</TagBadge>
            </li>
          </ul>
        </div>

        <h3 class="mt-4 text-lg font-semibold text-fg">{{ project.name }}</h3>
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
            class="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-opacity hover:opacity-80"
          >
            {{ link.label }}
            <AppIcon name="external" :size="14" />
          </a>
        </div>
      </article>
    </div>
  </section>
</template>
