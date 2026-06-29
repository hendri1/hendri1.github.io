<script setup lang="ts">
import AppHeader from '@/presentation/components/layout/AppHeader.vue'
import AppFooter from '@/presentation/components/layout/AppFooter.vue'
import HeroSection from '@/presentation/components/sections/HeroSection.vue'
import AboutSection from '@/presentation/components/sections/AboutSection.vue'
import ExperienceSection from '@/presentation/components/sections/ExperienceSection.vue'
import ProjectsSection from '@/presentation/components/sections/ProjectsSection.vue'
import SkillsSection from '@/presentation/components/sections/SkillsSection.vue'
import ContactSection from '@/presentation/components/sections/ContactSection.vue'
</script>

<template>
  <a
    href="#top"
    class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-fg focus:px-4 focus:py-2 focus:text-bg"
  >
    Skip to content
  </a>

  <AppHeader />

  <main data-testid="app-main">
    <HeroSection />
    <AboutSection />
    <ExperienceSection />
    <ProjectsSection />
    <SkillsSection />
    <ContactSection />
  </main>

  <AppFooter />
</template>
