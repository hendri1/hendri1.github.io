import type { ProfileRepository } from '@/domain/repositories/ProfileRepository'
import type { Profile } from '@/domain/entities/Profile'
import type { Experience } from '@/domain/entities/Experience'
import type { Project } from '@/domain/entities/Project'
import type { SkillGroup } from '@/domain/entities/Skill'
import type { Education } from '@/domain/entities/Education'
import { DateRange } from '@/domain/value-objects/DateRange'

/** A controllable repository fake for isolating use-case tests. */
export class InMemoryProfileRepository implements ProfileRepository {
  constructor(
    private readonly data: {
      profile?: Profile
      experiences?: Experience[]
      projects?: Project[]
      skillGroups?: SkillGroup[]
      education?: Education[]
    } = {},
  ) {}

  getProfile(): Profile {
    return this.data.profile ?? stubProfile()
  }
  getExperiences(): readonly Experience[] {
    return this.data.experiences ?? []
  }
  getProjects(): readonly Project[] {
    return this.data.projects ?? []
  }
  getSkillGroups(): readonly SkillGroup[] {
    return this.data.skillGroups ?? []
  }
  getEducation(): readonly Education[] {
    return this.data.education ?? []
  }
}

export function stubProfile(): Profile {
  return {
    name: 'Test Person',
    title: 'Engineer',
    company: 'ACME',
    companyUrl: 'https://acme.test',
    location: 'Somewhere',
    tagline: 'tagline',
    summary: 'summary',
    availableForWork: true,
    highlights: [],
    socials: [],
    languages: [],
    softSkills: [],
  }
}

export function makeExperience(
  id: string,
  roles: { start: [number, number]; end?: [number, number]; title?: string }[],
): Experience {
  return {
    id,
    company: id,
    roles: roles.map((r) => ({
      title: r.title ?? 'Role',
      employmentType: 'Full-time' as const,
      period: DateRange.fromMonth(r.start[0], r.start[1], r.end?.[0], r.end?.[1]),
      highlights: [],
      stack: [],
    })),
  }
}
