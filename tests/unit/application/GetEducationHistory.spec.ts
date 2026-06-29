import { describe, it, expect } from 'vitest'
import { GetEducationHistory } from '@/application/use-cases/GetEducationHistory'
import { InMemoryProfileRepository } from '../_fixtures/InMemoryProfileRepository'
import { DateRange } from '@/domain/value-objects/DateRange'
import type { Education } from '@/domain/entities/Education'

function education(id: string, startYear: number): Education {
  return {
    id,
    institution: id,
    credential: 'Credential',
    field: 'Field',
    period: DateRange.fromMonth(startYear, 1, startYear + 4, 1),
  }
}

describe('GetEducationHistory', () => {
  it('orders education most recent first with formatted period labels', () => {
    const repo = new InMemoryProfileRepository({
      education: [education('older', 2012), education('newer', 2017)],
    })

    const result = new GetEducationHistory(repo).execute()

    expect(result.map((e) => e.id)).toEqual(['newer', 'older'])
    expect(result[0].periodLabel).toBe('Jan 2017 — Jan 2021')
  })
})
