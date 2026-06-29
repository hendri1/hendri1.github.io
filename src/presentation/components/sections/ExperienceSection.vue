<script setup lang="ts">
import SectionHeading from '../ui/SectionHeading.vue'
import TagBadge from '../ui/TagBadge.vue'
import AppIcon from '../ui/AppIcon.vue'
import { usePortfolio } from '@/presentation/composables/usePortfolio'

const { experiences } = usePortfolio()
</script>

<template>
  <section id="experience" data-testid="experience" class="mx-auto max-w-6xl px-4 py-24 sm:px-8">
    <SectionHeading
      eyebrow="03 / Experience"
      title="A decade of shipping frontend"
      subtitle="From hospital systems and analytics dashboards to micro-frontends and design systems at scale."
    />

    <ol class="space-y-4" data-testid="experience-list">
      <li
        v-for="company in experiences"
        :key="company.id"
        v-reveal
        :data-testid="`experience-${company.id}`"
        class="rounded-2xl border border-line bg-surface/40 p-6 sm:p-8"
      >
        <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 class="flex items-center gap-3 text-xl font-semibold text-fg">
            <a
              v-if="company.companyUrl"
              :href="company.companyUrl"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor
              class="transition-colors hover:text-accent"
            >
              {{ company.company }}
            </a>
            <span v-else>{{ company.company }}</span>
            <span
              v-if="company.isCurrent"
              class="rounded-full border border-accent/40 px-2 py-0.5 font-mono text-[0.65rem] tracking-wide text-accent uppercase"
              >Current</span
            >
          </h3>
          <span class="font-mono text-xs tracking-wide text-muted uppercase">{{
            company.tenureLabel
          }}</span>
        </div>

        <div class="mt-6 space-y-7">
          <article
            v-for="(role, index) in company.roles"
            :key="role.title + role.periodLabel"
            class="relative border-l border-line pl-5"
          >
            <span
              class="absolute top-1.5 -left-[4.5px] size-2 rounded-full"
              :class="index === 0 && company.isCurrent ? 'bg-accent' : 'bg-line'"
              aria-hidden="true"
            />
            <div class="flex flex-wrap items-baseline justify-between gap-x-3">
              <h4 class="font-medium text-fg">{{ role.title }}</h4>
              <span class="font-mono text-[0.7rem] tracking-wide text-muted uppercase">{{
                role.employmentType
              }}</span>
            </div>
            <p class="mt-1 font-mono text-xs text-muted">
              {{ role.periodLabel }} · {{ role.durationLabel }}
            </p>

            <ul class="mt-3 space-y-2">
              <li
                v-for="highlight in role.highlights"
                :key="highlight"
                class="flex gap-2.5 text-sm text-fg/80"
              >
                <AppIcon name="sparkles" :size="14" class="mt-1 shrink-0 text-accent" />
                <span>{{ highlight }}</span>
              </li>
            </ul>

            <ul v-if="role.stack.length" class="mt-3 flex flex-wrap gap-1.5">
              <li v-for="tech in role.stack" :key="tech">
                <TagBadge>{{ tech }}</TagBadge>
              </li>
            </ul>
          </article>
        </div>
      </li>
    </ol>
  </section>
</template>
