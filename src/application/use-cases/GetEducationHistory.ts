import type { ProfileRepository } from '@/domain/repositories/ProfileRepository'
import type { EducationView } from '../view-models/PortfolioView'

/** Returns education entries, most recent first. */
export class GetEducationHistory {
  constructor(private readonly repository: ProfileRepository) {}

  execute(): EducationView[] {
    return this.repository
      .getEducation()
      .map((education) => ({
        id: education.id,
        institution: education.institution,
        credential: education.credential,
        field: education.field,
        periodLabel: education.period.rangeLabel(),
        note: education.note,
        sortKey: education.period.start.getTime(),
      }))
      .sort((a, b) => b.sortKey - a.sortKey)
      .map(({ sortKey: _sortKey, ...view }) => view)
  }
}
