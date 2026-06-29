<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import AppIcon from '../ui/AppIcon.vue'
import ThemeToggle from '../ui/ThemeToggle.vue'
import { usePortfolio } from '@/presentation/composables/usePortfolio'

const { profile } = usePortfolio()
const calendlyUrl = computed(
  () => profile.socials.find((s) => s.kind === 'calendly')?.url ?? '#contact',
)

const links = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Work', href: '#work' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

const menuOpen = ref(false)
const scrolled = ref(false)
const onScroll = () => {
  scrolled.value = window.scrollY > 12
}
onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))

const close = () => {
  menuOpen.value = false
}
</script>

<template>
  <header
    data-testid="app-header"
    class="fixed inset-x-0 top-0 z-50 transition-colors duration-300"
    :class="
      scrolled
        ? 'border-b border-line bg-bg/80 backdrop-blur-md'
        : 'border-b border-transparent'
    "
  >
    <div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
      <a
        href="#top"
        data-testid="brand"
        class="group flex items-center gap-2.5 font-semibold tracking-tight"
        @click="close"
      >
        <span
          class="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-accent to-accent-2 text-sm font-bold text-[#0a0e16]"
          >HF</span
        >
        <span class="hidden text-fg sm:inline">Hendri Faisal</span>
      </a>

      <nav class="hidden items-center gap-1 md:flex" aria-label="Primary">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          :data-testid="`nav-${link.label.toLowerCase()}`"
          class="rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-fg"
          >{{ link.label }}</a
        >
      </nav>

      <div class="flex items-center gap-2">
        <ThemeToggle />
        <a
          :href="calendlyUrl"
          target="_blank"
          rel="noopener noreferrer"
          data-testid="header-cta"
          class="hidden items-center gap-2 rounded-full bg-fg px-4 py-2 text-sm font-semibold text-bg transition-opacity hover:opacity-90 sm:inline-flex"
        >
          <AppIcon name="calendar" :size="16" />
          Book a call
        </a>
        <button
          type="button"
          class="grid size-10 place-items-center rounded-full border border-line bg-surface text-fg md:hidden"
          :aria-expanded="menuOpen"
          aria-label="Toggle menu"
          data-testid="menu-toggle"
          @click="menuOpen = !menuOpen"
        >
          <AppIcon :name="menuOpen ? 'close' : 'menu'" :size="18" />
        </button>
      </div>
    </div>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <nav
        v-if="menuOpen"
        data-testid="mobile-menu"
        class="border-b border-line bg-bg/95 backdrop-blur-md md:hidden"
        aria-label="Mobile"
      >
        <div class="mx-auto flex max-w-6xl flex-col px-4 py-3 sm:px-6">
          <a
            v-for="link in links"
            :key="link.href"
            :href="link.href"
            class="rounded-lg px-3 py-3 text-base font-medium text-muted transition-colors hover:bg-surface hover:text-fg"
            @click="close"
            >{{ link.label }}</a
          >
        </div>
      </nav>
    </Transition>
  </header>
</template>
