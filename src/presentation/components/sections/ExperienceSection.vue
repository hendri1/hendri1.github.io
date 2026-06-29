<script setup lang="ts">
import SectionHeading from '../ui/SectionHeading.vue'
import TagBadge from '../ui/TagBadge.vue'
import AppIcon from '../ui/AppIcon.vue'
import { usePortfolio } from '@/presentation/composables/usePortfolio'

const { experiences } = usePortfolio()
</script>

<template>
  <section id="experience" data-testid="experience" class="mx-auto max-w-6xl px-4 py-20 sm:px-6">
    <SectionHeading
      eyebrow="Experience"
      title="A decade of shipping frontend"
      subtitle="From hospital systems and analytics dashboards to micro-frontends and design systems at scale."
    />

    <ol class="space-y-5" data-testid="experience-list">
      <li
        v-for="company in experiences"
        :key="company.id"
        v-reveal
        :data-testid="`experience-${company.id}`"
        class="rounded-2xl border border-line bg-card/60 p-6 sm:p-7"
      >
        <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 class="flex items-center gap-2 text-xl font-semibold text-fg">
            <a
              v-if="company.companyUrl"
              :href="company.companyUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="transition-colors hover:text-accent"
            >
              {{ company.company }}
            </a>
            <span v-else>{{ company.company }}</span>
            <span
              v-if="company.isCurrent"
              class="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-500"
              >Current</span
            >
          </h3>
          <span class="text-sm text-muted">{{ company.tenureLabel }}</span>
        </div>

        <div class="mt-5 space-y-6">
          <article
            v-for="(role, index) in company.roles"
            :key="role.title + role.periodLabel"
            class="relative border-l border-line pl-5"
          >
            <span
              class="absolute top-1.5 -left-[5px] size-2.5 rounded-full"
              :class="index === 0 && company.isCurrent ? 'bg-accent' : 'bg-line'"
              aria-hidden="true"
            />
            <div class="flex flex-wrap items-baseline justify-between gap-x-3">
              <h4 class="font-medium text-fg">{{ role.title }}</h4>
              <span class="text-xs text-muted">{{ role.employmentType }}</span>
            </div>
            <p class="mt-0.5 text-sm text-muted">
              {{ role.periodLabel }} · {{ role.durationLabel }}
            </p>

            <ul class="mt-3 space-y-2">
              <li
                v-for="highlight in role.highlights"
                :key="highlight"
                class="flex gap-2.5 text-sm text-fg/80"
              >
                <AppIcon name="sparkles" :size="15" class="mt-0.5 shrink-0 text-accent/70" />
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
