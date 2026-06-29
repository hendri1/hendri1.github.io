import type { ProfileRepository } from '@/domain/repositories/ProfileRepository'
import type { Project } from '@/domain/entities/Project'

/** Returns featured projects ordered for display. */
export class GetFeaturedProjects {
  constructor(private readonly repository: ProfileRepository) {}

  execute(): Project[] {
    return this.repository
      .getProjects()
      .filter((project) => project.featured)
      .sort((a, b) => a.order - b.order)
  }
}
