<script setup lang="ts">
import { usePortfolio } from '@/composables/usePortfolio'

const { clients } = usePortfolio()
</script>

<template>
  <section
    data-testid="trusted-by"
    aria-label="Companies I've worked with"
    class="border-y border-line bg-surface/30"
  >
    <div class="mx-auto max-w-6xl px-4 py-10 sm:px-8" v-reveal>
      <p class="kicker text-center sm:text-left">Trusted by teams at</p>
      <ul
        class="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:justify-start sm:gap-x-12"
        data-testid="client-list"
      >
        <li v-for="client in clients" :key="client.name">
          <component
            :is="client.url ? 'a' : 'span'"
            v-bind="
              client.url
                ? { href: client.url, target: '_blank', rel: 'noopener noreferrer' }
                : {}
            "
            :data-cursor="client.url ? '' : undefined"
            class="text-lg font-semibold tracking-tight text-muted/70 transition-colors hover:text-fg sm:text-xl"
          >
            {{ client.name }}
          </component>
        </li>
      </ul>
    </div>
  </section>
</template>
