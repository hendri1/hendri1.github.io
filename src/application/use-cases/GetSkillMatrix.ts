import type { ProfileRepository } from '@/domain/repositories/ProfileRepository'
import type { SkillGroup } from '@/domain/entities/Skill'

/** Returns skills grouped by category for the skills section. */
export class GetSkillMatrix {
  constructor(private readonly repository: ProfileRepository) {}

  execute(): readonly SkillGroup[] {
    return this.repository.getSkillGroups()
  }
}
