import { describe, it, expect } from 'vitest'
import { DateRange } from '@/utils/dateRange'
import {
  buildExperienceTimeline,
  getFeaturedProjects,
  getEducationHistory,
} from '@/utils/portfolio'
import type { Experience, Project, Education } from '@/types/portfolio'

function exp(
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

const now = new Date(2026, 5, 1) // Jun 2026

describe('buildExperienceTimeline', () => {
  it('orders companies by most recent role start, descending', () => {
    const result = buildExperienceTimeline(
      [
        exp('older', [{ start: [2016, 7], end: [2017, 8] }]),
        exp('newest', [{ start: [2020, 7] }]),
        exp('middle', [{ start: [2018, 1], end: [2019, 8] }]),
      ],
      now,
    )
    expect(result.map((e) => e.id)).toEqual(['newest', 'middle', 'older'])
  })

  it('sorts roles within a company newest-first and flags ongoing tenure', () => {
    const [company] = buildExperienceTimeline(
      [
        exp('mekari', [
          { start: [2020, 7], end: [2022, 3], title: 'SE' },
          { start: [2024, 8], title: 'Senior SE' },
          { start: [2022, 3], end: [2024, 8], title: 'SE II' },
        ]),
      ],
      now,
    )
    expect(company.roles.map((r) => r.title)).toEqual(['Senior SE', 'SE II', 'SE'])
    expect(company.isCurrent).toBe(true)
  })

  it('derives company tenure across all roles', () => {
    const [company] = buildExperienceTimeline(
      [exp('mekari', [{ start: [2020, 7], end: [2022, 3] }, { start: [2022, 3], end: [2024, 7] }])],
      now,
    )
    expect(company.tenureLabel).toBe('4 yrs')
    expect(company.isCurrent).toBe(false)
  })

  it('exposes formatted period and duration labels per role', () => {
    const [company] = buildExperienceTimeline([exp('x', [{ start: [2024, 8] }])], now)
    expect(company.roles[0].periodLabel).toBe('Aug 2024 — Present')
    expect(company.roles[0].durationLabel).toBe('1 yr 10 mos')
  })
})

function project(id: string, featured: boolean, order: number): Project {
  return {
    id,
    name: id,
    tagline: '',
    description: '',
    context: '',
    stack: [],
    tags: [],
    links: [],
    featured,
    order,
  }
}

describe('getFeaturedProjects', () => {
  it('returns only featured projects, ordered by `order`', () => {
    const result = getFeaturedProjects([
      project('c', true, 3),
      project('hidden', false, 1),
      project('a', true, 1),
      project('b', true, 2),
    ])
    expect(result.map((p) => p.id)).toEqual(['a', 'b', 'c'])
  })

  it('returns an empty list when nothing is featured', () => {
    expect(getFeaturedProjects([project('x', false, 1)])).toEqual([])
  })
})

function education(id: string, startYear: number): Education {
  return {
    id,
    institution: id,
    credential: 'Credential',
    field: 'Field',
    period: DateRange.fromMonth(startYear, 1, startYear + 4, 1),
  }
}

describe('getEducationHistory', () => {
  it('orders education most recent first with formatted period labels', () => {
    const result = getEducationHistory([education('older', 2012), education('newer', 2017)])
    expect(result.map((e) => e.id)).toEqual(['newer', 'older'])
    expect(result[0].periodLabel).toBe('Jan 2017 — Jan 2021')
  })
})
