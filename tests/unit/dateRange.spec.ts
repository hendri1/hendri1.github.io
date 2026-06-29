import { describe, it, expect } from 'vitest'
import { DateRange } from '@/utils/dateRange'

describe('DateRange', () => {
  it('builds dates from year/month via fromMonth', () => {
    const range = DateRange.fromMonth(2024, 8, 2026, 3)
    expect(range.start.getFullYear()).toBe(2024)
    expect(range.start.getMonth()).toBe(7) // August is index 7
    expect(range.end?.getFullYear()).toBe(2026)
    expect(range.end?.getMonth()).toBe(2)
  })

  it('treats a null end as ongoing', () => {
    const range = DateRange.fromMonth(2024, 8)
    expect(range.isCurrent).toBe(true)
    expect(range.end).toBeNull()
  })

  it('throws when end precedes start', () => {
    expect(() => DateRange.fromMonth(2024, 8, 2023, 1)).toThrow()
  })

  it('computes whole months between fixed dates', () => {
    expect(DateRange.fromMonth(2022, 3, 2024, 8).totalMonths()).toBe(29)
  })

  it('computes months up to an injected "now" when ongoing', () => {
    const range = DateRange.fromMonth(2024, 8)
    expect(range.totalMonths(new Date(2026, 3, 1))).toBe(20)
  })

  it('formats duration labels', () => {
    expect(DateRange.fromMonth(2022, 3, 2024, 8).durationLabel()).toBe('2 yrs 5 mos')
    expect(DateRange.fromMonth(2019, 6, 2019, 11).durationLabel()).toBe('5 mos')
    expect(DateRange.fromMonth(2010, 1, 2011, 1).durationLabel()).toBe('1 yr')
    expect(DateRange.fromMonth(2020, 1, 2020, 1).durationLabel()).toBe('0 mos')
  })

  it('formats a human range label, using Present for ongoing', () => {
    expect(DateRange.fromMonth(2024, 8).rangeLabel()).toBe('Aug 2024 — Present')
    expect(DateRange.fromMonth(2022, 3, 2024, 8).rangeLabel()).toBe('Mar 2022 — Aug 2024')
  })
})
