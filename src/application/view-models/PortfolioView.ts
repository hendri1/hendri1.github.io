/**
 * Presentation-ready view models produced by the application layer.
 * They are plain data (no framework, no domain value objects) so Vue
 * components stay dumb and all formatting logic remains unit-testable.
 */

export interface ExperienceRoleView {
  readonly title: string
  readonly employmentType: string
  readonly periodLabel: string
  readonly durationLabel: string
  readonly isCurrent: boolean
  readonly location?: string
  readonly highlights: readonly string[]
  readonly stack: readonly string[]
}

export interface ExperienceView {
  readonly id: string
  readonly company: string
  readonly companyUrl?: string
  readonly tenureLabel: string
  readonly isCurrent: boolean
  readonly roles: readonly ExperienceRoleView[]
}

export interface EducationView {
  readonly id: string
  readonly institution: string
  readonly credential: string
  readonly field: string
  readonly periodLabel: string
  readonly note?: string
}
