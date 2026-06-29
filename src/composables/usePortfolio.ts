import {
  profile,
  experiences,
  projects,
  skillGroups,
  education,
  services,
  process,
  clients,
} from '@/data/cv'
import {
  buildExperienceTimeline,
  getFeaturedProjects,
  getEducationHistory,
} from '@/utils/portfolio'

/**
 * Single facade the components read from: the raw CV content passed through
 * the pure view-model builders. No classes, no DI — just data + functions.
 */
export function usePortfolio() {
  const now = new Date()
  return {
    profile,
    experiences: buildExperienceTimeline(experiences, now),
    projects: getFeaturedProjects(projects),
    skillGroups,
    education: getEducationHistory(education),
    services,
    process,
    clients,
  }
}
