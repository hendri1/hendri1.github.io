export type SocialKind = 'email' | 'linkedin' | 'github' | 'calendly' | 'website'

export interface SocialLink {
  readonly kind: SocialKind
  readonly label: string
  readonly url: string
  /** Visible handle, e.g. "@hendri1" or "hendrifaisal18@gmail.com". */
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
  /** One-line value proposition for the hero. */
  readonly tagline: string
  /** Longer "about" narrative. */
  readonly summary: string
  readonly availableForWork: boolean
  readonly highlights: readonly HighlightStat[]
  readonly socials: readonly SocialLink[]
  readonly languages: readonly Language[]
  readonly softSkills: readonly string[]
}
