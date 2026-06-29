import type { ProfileRepository } from '@/domain/repositories/ProfileRepository'
import type { Experience, ExperienceRole } from '@/domain/entities/Experience'
import { DateRange } from '@/domain/value-objects/DateRange'
import type { ExperienceView, ExperienceRoleView } from '../view-models/PortfolioView'

/**
 * Builds the experience timeline, most recent first, with derived
 * tenure and duration labels computed in the application layer.
 */
export class GetExperienceTimeline {
  constructor(private readonly repository: ProfileRepository) {}

  execute(now: Date = new Date()): ExperienceView[] {
    return this.repository
      .getExperiences()
      .map((experience) => this.toView(experience, now))
      .sort((a, b) => b.sortKey - a.sortKey)
      .map(({ sortKey: _sortKey, ...view }) => view)
  }

  private toView(experience: Experience, now: Date): ExperienceView & { sortKey: number } {
    const roles = [...experience.roles].sort(
      (a, b) => b.period.start.getTime() - a.period.start.getTime(),
    )
    const isCurrent = roles.some((role) => role.period.isCurrent)
    const tenure = this.tenureRange(roles)

    return {
      id: experience.id,
      company: experience.company,
      companyUrl: experience.companyUrl,
      isCurrent,
      tenureLabel: tenure.durationLabel(now),
      roles: roles.map((role) => this.toRoleView(role, now)),
      sortKey: this.latestStart(roles),
    }
  }

  private toRoleView(role: ExperienceRole, now: Date): ExperienceRoleView {
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
  private tenureRange(roles: readonly ExperienceRole[]): DateRange {
    const start = new Date(Math.min(...roles.map((r) => r.period.start.getTime())))
    const ongoing = roles.some((r) => r.period.isCurrent)
    if (ongoing) return new DateRange(start, null)
    const end = new Date(
      Math.max(...roles.map((r) => (r.period.end ?? r.period.start).getTime())),
    )
    return new DateRange(start, end)
  }

  private latestStart(roles: readonly ExperienceRole[]): number {
    return Math.max(...roles.map((r) => r.period.start.getTime()))
  }
}
