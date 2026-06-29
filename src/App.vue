<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import ExperienceSection from '@/components/sections/ExperienceSection.vue'
import ProjectsSection from '@/components/sections/ProjectsSection.vue'
import SkillsSection from '@/components/sections/SkillsSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'
import MarqueeStrip from '@/components/fx/MarqueeStrip.vue'
import CustomCursor from '@/components/fx/CustomCursor.vue'
import ScrollProgress from '@/components/fx/ScrollProgress.vue'
import { initSmoothScroll, destroySmoothScroll } from '@/composables/useSmoothScroll'

onMounted(() => initSmoothScroll())
onUnmounted(() => destroySmoothScroll())
</script>

<template>
  <div class="fx-grid" aria-hidden="true" />
  <div class="fx-scanlines" aria-hidden="true" />
  <div class="fx-grain" aria-hidden="true" />
  <ScrollProgress />
  <CustomCursor />

  <a
    href="#top"
    class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:font-semibold focus:text-[#0c0a08]"
  >
    Skip to content
  </a>

  <AppHeader />

  <main data-testid="app-main" class="relative z-10">
    <HeroSection />
    <MarqueeStrip />
    <AboutSection />
    <ExperienceSection />
    <ProjectsSection />
    <SkillsSection />
    <ContactSection />
  </main>

  <AppFooter />
</template>
