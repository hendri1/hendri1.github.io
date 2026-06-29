import { useCases } from '@/composition-root'

/**
 * Presentation-facing facade over the application use cases.
 * Components read finished view models from here and never touch
 * the domain or infrastructure layers directly.
 */
export function usePortfolio() {
  const now = new Date()
  return {
    profile: useCases.getProfileOverview.execute(),
    experiences: useCases.getExperienceTimeline.execute(now),
    projects: useCases.getFeaturedProjects.execute(),
    skillGroups: useCases.getSkillMatrix.execute(),
    education: useCases.getEducationHistory.execute(),
  }
}
