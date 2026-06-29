import type { ProfileRepository } from '@/domain/repositories/ProfileRepository'
import { StaticProfileRepository } from '@/infrastructure/repositories/StaticProfileRepository'
import { GetProfileOverview } from '@/application/use-cases/GetProfileOverview'
import { GetExperienceTimeline } from '@/application/use-cases/GetExperienceTimeline'
import { GetFeaturedProjects } from '@/application/use-cases/GetFeaturedProjects'
import { GetSkillMatrix } from '@/application/use-cases/GetSkillMatrix'
import { GetEducationHistory } from '@/application/use-cases/GetEducationHistory'

/** The application's use-case surface, wired to a repository implementation. */
export interface UseCases {
  readonly getProfileOverview: GetProfileOverview
  readonly getExperienceTimeline: GetExperienceTimeline
  readonly getFeaturedProjects: GetFeaturedProjects
  readonly getSkillMatrix: GetSkillMatrix
  readonly getEducationHistory: GetEducationHistory
}

/**
 * Composition root — the single place where concrete implementations are
 * wired to abstractions. Pass a different repository (e.g. an HTTP one or a
 * test fake) to swap the data source without changing any other layer.
 */
export function createUseCases(
  repository: ProfileRepository = new StaticProfileRepository(),
): UseCases {
  return {
    getProfileOverview: new GetProfileOverview(repository),
    getExperienceTimeline: new GetExperienceTimeline(repository),
    getFeaturedProjects: new GetFeaturedProjects(repository),
    getSkillMatrix: new GetSkillMatrix(repository),
    getEducationHistory: new GetEducationHistory(repository),
  }
}

export const useCases: UseCases = createUseCases()
