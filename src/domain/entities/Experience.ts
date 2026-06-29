import type { DateRange } from '../value-objects/DateRange'

export type EmploymentType = 'Full-time' | 'Part-time' | 'Freelance' | 'Internship'

/** A single role held at a company (a company may have several, via promotions). */
export interface ExperienceRole {
  readonly title: string
  readonly employmentType: EmploymentType
  readonly period: DateRange
  readonly location?: string
  readonly highlights: readonly string[]
  readonly stack: readonly string[]
}

/** Work experience at one organisation, possibly across multiple roles. */
export interface Experience {
  readonly id: string
  readonly company: string
  readonly companyUrl?: string
  readonly roles: readonly ExperienceRole[]
}
