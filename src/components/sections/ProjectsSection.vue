<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeading from '../ui/SectionHeading.vue'
import TagBadge from '../ui/TagBadge.vue'
import AppIcon from '../ui/AppIcon.vue'
import { usePortfolio } from '@/composables/usePortfolio'

gsap.registerPlugin(ScrollTrigger)

const { projects } = usePortfolio()
const pad = (n: number) => String(n).padStart(2, '0')

const root = ref<HTMLElement | null>(null)
const pinWrap = ref<HTMLElement | null>(null)
const track = ref<HTMLElement | null>(null)
let mm: ReturnType<typeof gsap.matchMedia> | null = null

onMounted(() => {
  mm = gsap.matchMedia()
  // Horizontal pinned scroll only on desktop with motion allowed.
  mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
    const sectionEl = root.value
    const pin = pinWrap.value
    const tr = track.value
    if (!sectionEl || !pin || !tr) return

    sectionEl.classList.add('is-horizontal')
    const distance = () => Math.max(0, tr.scrollWidth - window.innerWidth)

    const tween = gsap.to(tr, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: pin,
        start: 'top top',
        end: () => `+=${distance()}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })

    ScrollTrigger.refresh()

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
      sectionEl.classList.remove('is-horizontal')
      gsap.set(tr, { clearProps: 'transform' })
    }
  })
})

onUnmounted(() => mm?.revert())
</script>

<template>
  <section id="work" ref="root" data-testid="work" class="relative py-24">
    <div class="mx-auto max-w-6xl px-4 sm:px-8">
      <SectionHeading
        eyebrow="04 / Selected Work"
        title="Projects & case studies"
        subtitle="Scroll — the deck slides sideways through each project."
      />
    </div>

    <div ref="pinWrap" class="work-pin">
      <div ref="track" data-testid="projects-grid" class="work-track">
        <article
          v-for="(project, index) in projects"
          :key="project.id"
          :data-testid="`project-${project.id}`"
          data-cursor
          class="work-panel hud flex flex-col overflow-y-auto rounded-2xl border border-line bg-surface p-6 sm:p-9"
        >
          <div class="flex items-start justify-between gap-3">
            <span class="font-mono text-lg text-accent">{{ pad(index + 1) }}<span class="text-muted">/{{ pad(projects.length) }}</span></span>
            <ul class="flex flex-wrap justify-end gap-1.5">
              <li v-for="tag in project.tags" :key="tag">
                <TagBadge accent>{{ tag }}</TagBadge>
              </li>
            </ul>
          </div>

          <p class="mt-6 kicker">{{ project.context }}</p>
          <h3 class="mt-2 text-2xl font-semibold text-fg sm:text-3xl">{{ project.name }}</h3>
          <p class="mt-2 text-base font-medium text-muted">{{ project.tagline }}</p>
          <p class="mt-4 max-w-xl flex-1 text-sm leading-relaxed text-fg/80 sm:text-base">
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
        </article>
      </div>
    </div>

    <p
      class="mx-auto mt-8 hidden max-w-6xl px-4 font-mono text-xs tracking-widest text-muted uppercase sm:px-8 md:block"
    >
      ◢ scroll to traverse →
    </p>
  </section>
</template>

<style scoped>
/* Default (mobile / reduced-motion / no-JS): clean vertical stack. */
.work-track {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-inline: auto;
  max-width: 72rem;
  padding-inline: 1rem;
}
.work-panel {
  width: 100%;
}

/* Desktop horizontal mode, enabled via JS class once pinned. */
.is-horizontal .work-pin {
  height: 100svh;
  display: flex;
  align-items: center;
  overflow: hidden;
}
.is-horizontal .work-track {
  flex-direction: row;
  gap: 1.75rem;
  max-width: none;
  height: 74vh;
  padding-inline: max(1rem, calc((100vw - 72rem) / 2));
}
.is-horizontal .work-panel {
  flex: 0 0 auto;
  width: min(72vw, 52rem);
  height: 100%;
}

@media (min-width: 640px) {
  .work-track {
    padding-inline: 2rem;
  }
}
</style>
