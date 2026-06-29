import type { ProfileRepository } from '@/domain/repositories/ProfileRepository'
import type { Profile } from '@/domain/entities/Profile'
import type { Experience } from '@/domain/entities/Experience'
import type { Project } from '@/domain/entities/Project'
import type { SkillGroup } from '@/domain/entities/Skill'
import type { Education } from '@/domain/entities/Education'
import {
  profile,
  experiences,
  projects,
  skillGroups,
  education,
} from '../data/cv.data'

/**
 * Concrete repository backed by static, bundled CV data.
 * Swappable for an HTTP/CMS-backed implementation without touching
 * the domain or application layers (dependency inversion).
 */
export class StaticProfileRepository implements ProfileRepository {
  getProfile(): Profile {
    return profile
  }

  getExperiences(): readonly Experience[] {
    return experiences
  }

  getProjects(): readonly Project[] {
    return projects
  }

  getSkillGroups(): readonly SkillGroup[] {
    return skillGroups
  }

  getEducation(): readonly Education[] {
    return education
  }
}
