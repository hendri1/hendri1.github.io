import type { Profile } from '../entities/Profile'
import type { Experience } from '../entities/Experience'
import type { Project } from '../entities/Project'
import type { SkillGroup } from '../entities/Skill'
import type { Education } from '../entities/Education'

/**
 * Port (dependency-inversion boundary) for reading portfolio data.
 * The domain/application layers depend on this interface; the
 * infrastructure layer provides a concrete implementation.
 */
export interface ProfileRepository {
  getProfile(): Profile
  getExperiences(): readonly Experience[]
  getProjects(): readonly Project[]
  getSkillGroups(): readonly SkillGroup[]
  getEducation(): readonly Education[]
}
