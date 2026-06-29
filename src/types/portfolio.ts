import type { DateRange } from '@/utils/dateRange'

// --- Profile ---------------------------------------------------------------

export type SocialKind = 'email' | 'linkedin' | 'github' | 'calendly' | 'website'

export interface SocialLink {
  readonly kind: SocialKind
  readonly label: string
  readonly url: string
  readonly handle: string
}

export type LanguageLevel = 'Native' | 'Bilingual' | 'Professional' | 'Basic'

export interface Language {
  readonly name: string
  readonly level: LanguageLevel
}

export interface HighlightStat {
  readonly label: string
  readonly value: string
}

/** The person this portfolio represents. Contains no PII (no phone/address). */
export interface Profile {
  readonly name: string
  readonly title: string
  readonly company: string
  readonly companyUrl: string
  readonly location: string
  /** Short, client-facing value proposition — the dominant hero headline. */
  readonly valueProp: string
  /** Supporting sentence under the value proposition. */
  readonly valuePropSub: string
  readonly tagline: string
  readonly summary: string
  readonly availableForWork: boolean
  readonly highlights: readonly HighlightStat[]
  readonly socials: readonly SocialLink[]
  readonly languages: readonly Language[]
  readonly softSkills: readonly string[]
}

// --- Services & process (business-profile framing) -------------------------

/**
 * A capability offered to clients/teams. `icon` keys into the shared icon set.
 */
export interface Service {
  readonly id: string
  readonly icon: string
  readonly title: string
  readonly summary: string
  readonly capabilities: readonly string[]
}

/** One step in the "how I work" engagement flow. */
export interface ProcessStep {
  readonly id: string
  readonly title: string
  readonly description: string
}

/** A company worked with, used for the social-proof / trusted-by strip. */
export interface Client {
  readonly name: string
  readonly url?: string
}

// --- Experience ------------------------------------------------------------

export type EmploymentType = 'Full-time' | 'Part-time' | 'Freelance' | 'Internship'

export interface ExperienceRole {
  readonly title: string
  readonly employmentType: EmploymentType
  readonly period: DateRange
  readonly location?: string
  readonly highlights: readonly string[]
  readonly stack: readonly string[]
}

export interface Experience {
  readonly id: string
  readonly company: string
  readonly companyUrl?: string
  readonly roles: readonly ExperienceRole[]
}

// --- Projects --------------------------------------------------------------

export interface ProjectLink {
  readonly label: string
  readonly url: string
}

export interface Project {
  readonly id: string
  readonly name: string
  readonly tagline: string
  readonly description: string
  readonly context: string
  readonly stack: readonly string[]
  readonly tags: readonly string[]
  readonly links: readonly ProjectLink[]
  readonly featured: boolean
  readonly order: number
}

// --- Skills ----------------------------------------------------------------

export interface Skill {
  readonly name: string
  readonly years?: number
}

export interface SkillGroup {
  readonly id: string
  readonly name: string
  readonly skills: readonly Skill[]
}

// --- Education -------------------------------------------------------------

export interface Education {
  readonly id: string
  readonly institution: string
  readonly credential: string
  readonly field: string
  readonly period: DateRange
  readonly note?: string
}

// --- View models (presentation-ready, produced by utils/portfolio) ---------

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
