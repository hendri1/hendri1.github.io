import { DateRange } from './dateRange'
import type {
  Experience,
  ExperienceRole,
  ExperienceView,
  ExperienceRoleView,
  Project,
  Education,
  EducationView,
} from '@/types/portfolio'

/**
 * Pure presentation logic for the portfolio. Framework-free and unit-tested;
 * components consume the finished view models via `usePortfolio`.
 */

function toRoleView(role: ExperienceRole, now: Date): ExperienceRoleView {
  return {
    title: role.title,
    employmentType: role.employmentType,
    periodLabel: role.period.rangeLabel(),
    durationLabel: role.period.durationLabel(now),
    isCurrent: role.period.isCurrent,
    location: role.location,
    highlights: role.highlights,
    stack: role.stack,
  }
}

/** A range spanning the earliest start to the latest end (or Present). */
function tenureRange(roles: readonly ExperienceRole[]): DateRange {
  const start = new Date(Math.min(...roles.map((r) => r.period.start.getTime())))
  if (roles.some((r) => r.period.isCurrent)) return new DateRange(start, null)
  const end = new Date(Math.max(...roles.map((r) => (r.period.end ?? r.period.start).getTime())))
  return new DateRange(start, end)
}

/** Experience timeline, most recent first, with derived tenure/duration labels. */
export function buildExperienceTimeline(
  experiences: readonly Experience[],
  now: Date = new Date(),
): ExperienceView[] {
  return experiences
    .map((experience) => {
      const roles = [...experience.roles].sort(
        (a, b) => b.period.start.getTime() - a.period.start.getTime(),
      )
      const view: ExperienceView = {
        id: experience.id,
        company: experience.company,
        companyUrl: experience.companyUrl,
        isCurrent: roles.some((r) => r.period.isCurrent),
        tenureLabel: tenureRange(roles).durationLabel(now),
        roles: roles.map((role) => toRoleView(role, now)),
      }
      const sortKey = Math.max(...roles.map((r) => r.period.start.getTime()))
      return { view, sortKey }
    })
    .sort((a, b) => b.sortKey - a.sortKey)
    .map(({ view }) => view)
}

/** Featured projects, ordered for display. */
export function getFeaturedProjects(projects: readonly Project[]): Project[] {
  return projects.filter((p) => p.featured).sort((a, b) => a.order - b.order)
}

/** Education entries, most recent first, with formatted period labels. */
export function getEducationHistory(education: readonly Education[]): EducationView[] {
  return education
    .map((item) => ({
      view: {
        id: item.id,
        institution: item.institution,
        credential: item.credential,
        field: item.field,
        periodLabel: item.period.rangeLabel(),
        note: item.note,
      } satisfies EducationView,
      sortKey: item.period.start.getTime(),
    }))
    .sort((a, b) => b.sortKey - a.sortKey)
    .map(({ view }) => view)
}
