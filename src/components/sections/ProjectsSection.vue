<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeading from '../ui/SectionHeading.vue'
import TagBadge from '../ui/TagBadge.vue'
import AppIcon from '../ui/AppIcon.vue'
import ParallaxText from '../fx/ParallaxText.vue'
import { usePortfolio } from '@/composables/usePortfolio'

gsap.registerPlugin(ScrollTrigger)

const { projects } = usePortfolio()
const pad = (n: number) => String(n).padStart(2, '0')

const grid = ref<HTMLElement | null>(null)
let mm: ReturnType<typeof gsap.matchMedia> | null = null

onMounted(() => {
  mm = gsap.matchMedia()
  // Deck scale-down only on desktop, non-touch, motion-allowed.
  mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
    const cards = grid.value
      ? Array.from(grid.value.querySelectorAll<HTMLElement>('[data-stack-card]'))
      : []
    cards.forEach((card, i) => {
      if (i === cards.length - 1) return
      const inner = card.querySelector<HTMLElement>('[data-stack-inner]')
      if (!inner) return
      gsap.to(inner, {
        scale: 1 - (cards.length - 1 - i) * 0.05,
        ease: 'none',
        scrollTrigger: {
          trigger: cards[i + 1],
          start: 'top bottom',
          end: 'top top',
          scrub: true,
        },
      })
    })
  })
})

onUnmounted(() => mm?.revert())
</script>

<template>
  <section id="work" data-testid="work" class="relative mx-auto max-w-6xl px-4 py-24 sm:px-8">
    <ParallaxText text="WORK" position="-top-12 right-0" :amount="0.6" />
    <SectionHeading
      eyebrow="04 / Selected Work"
      title="Projects & case studies"
      subtitle="Scroll — each project stacks over the last, like windows opening in a console."
    />

    <div ref="grid" data-testid="projects-grid" class="relative">
      <article
        v-for="(project, index) in projects"
        :key="project.id"
        data-stack-card
        :data-testid="`project-${project.id}`"
        data-cursor
        class="sticky"
        :style="{ top: `${9 + index * 2.5}vh`, zIndex: index + 1 }"
      >
        <div
          data-stack-inner
          class="hud mb-8 flex min-h-[56svh] flex-col rounded-2xl border border-line bg-surface p-6 shadow-[0_-10px_50px_-20px_rgba(0,0,0,0.7)] sm:p-9"
          style="transform-origin: top center; will-change: transform"
        >
          <div class="flex items-start justify-between gap-3">
            <span class="font-mono text-sm text-accent"
              >({{ pad(index + 1) }} / {{ pad(projects.length) }})</span
            >
            <ul class="flex flex-wrap justify-end gap-1.5">
              <li v-for="tag in project.tags" :key="tag">
                <TagBadge accent>{{ tag }}</TagBadge>
              </li>
            </ul>
          </div>

          <p class="mt-6 kicker">{{ project.context }}</p>
          <h3 class="mt-2 text-2xl font-semibold text-fg sm:text-3xl">{{ project.name }}</h3>
          <p class="mt-2 text-base font-medium text-muted">{{ project.tagline }}</p>
          <p class="mt-4 max-w-2xl flex-1 text-sm leading-relaxed text-fg/80 sm:text-base">
            {{ project.description }}
          </p>

          <ul class="mt-6 flex flex-wrap gap-1.5">
            <li v-for="tech in project.stack" :key="tech">
              <TagBadge>{{ tech }}</TagBadge>
            </li>
          </ul>

          <div
            v-if="project.links.length"
            class="mt-6 flex flex-wrap gap-4 border-t border-line pt-4"
          >
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
        </div>
      </article>
    </div>
  </section>
</template>
