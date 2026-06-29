export interface ProjectLink {
  readonly label: string
  readonly url: string
}

/** A featured piece of work / case study. */
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
  /** Display order, lower comes first. */
  readonly order: number
}
