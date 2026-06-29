import type { ProfileRepository } from '@/domain/repositories/ProfileRepository'
import type { Profile } from '@/domain/entities/Profile'

/** Returns the headline profile shown in the hero / about sections. */
export class GetProfileOverview {
  constructor(private readonly repository: ProfileRepository) {}

  execute(): Profile {
    return this.repository.getProfile()
  }
}
