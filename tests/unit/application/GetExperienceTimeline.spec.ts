import { describe, it, expect } from 'vitest'
import { GetExperienceTimeline } from '@/application/use-cases/GetExperienceTimeline'
import { InMemoryProfileRepository, makeExperience } from '../_fixtures/InMemoryProfileRepository'

describe('GetExperienceTimeline', () => {
  const now = new Date(2026, 5, 1) // Jun 2026

  it('orders companies by most recent role start, descending', () => {
    const repo = new InMemoryProfileRepository({
      experiences: [
        makeExperience('older', [{ start: [2016, 7], end: [2017, 8] }]),
        makeExperience('newest', [{ start: [2020, 7] }]),
        makeExperience('middle', [{ start: [2018, 1], end: [2019, 8] }]),
      ],
    })

    const result = new GetExperienceTimeline(repo).execute(now)

    expect(result.map((e) => e.id)).toEqual(['newest', 'middle', 'older'])
  })

  it('sorts roles within a company newest-first and flags ongoing tenure', () => {
    const repo = new InMemoryProfileRepository({
      experiences: [
        makeExperience('mekari', [
          { start: [2020, 7], end: [2022, 3], title: 'SE' },
          { start: [2024, 8], title: 'Senior SE' },
          { start: [2022, 3], end: [2024, 8], title: 'SE II' },
        ]),
      ],
    })

    const [company] = new GetExperienceTimeline(repo).execute(now)

    expect(company.roles.map((r) => r.title)).toEqual(['Senior SE', 'SE II', 'SE'])
    expect(company.isCurrent).toBe(true)
  })

  it('derives company tenure across all roles', () => {
    const repo = new InMemoryProfileRepository({
      experiences: [
        makeExperience('mekari', [
          { start: [2020, 7], end: [2022, 3] },
          { start: [2022, 3], end: [2024, 7] },
        ]),
      ],
    })

    const [company] = new GetExperienceTimeline(repo).execute(now)

    // Jul 2020 -> Jul 2024 = 4 years
    expect(company.tenureLabel).toBe('4 yrs')
    expect(company.isCurrent).toBe(false)
  })

  it('exposes formatted period and duration labels per role', () => {
    const repo = new InMemoryProfileRepository({
      experiences: [makeExperience('x', [{ start: [2024, 8] }])],
    })

    const [company] = new GetExperienceTimeline(repo).execute(now)

    expect(company.roles[0].periodLabel).toBe('Aug 2024 — Present')
    expect(company.roles[0].durationLabel).toBe('1 yr 10 mos')
  })
})
