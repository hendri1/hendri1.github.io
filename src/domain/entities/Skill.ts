export interface Skill {
  readonly name: string
  /** Years of hands-on experience, when known. */
  readonly years?: number
}

export interface SkillGroup {
  readonly id: string
  readonly name: string
  readonly skills: readonly Skill[]
}
