const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
] as const

/**
 * Immutable value object describing a span of time.
 * A `null` end means the span is ongoing ("Present").
 *
 * Pure domain code: no framework, no I/O. `now` is injectable so the
 * derived duration is deterministic and unit-testable.
 */
export class DateRange {
  readonly start: Date
  readonly end: Date | null

  constructor(start: Date, end: Date | null = null) {
    if (end && end.getTime() < start.getTime()) {
      throw new Error('DateRange: end cannot be before start')
    }
    this.start = start
    this.end = end
  }

  static fromMonth(startYear: number, startMonth: number, endYear?: number, endMonth?: number): DateRange {
    const start = new Date(startYear, startMonth - 1, 1)
    const end =
      endYear !== undefined && endMonth !== undefined
        ? new Date(endYear, endMonth - 1, 1)
        : null
    return new DateRange(start, end)
  }

  get isCurrent(): boolean {
    return this.end === null
  }

  /** Whole months between start and end (or `now` when ongoing). */
  totalMonths(now: Date = new Date()): number {
    const end = this.end ?? now
    const months =
      (end.getFullYear() - this.start.getFullYear()) * 12 +
      (end.getMonth() - this.start.getMonth())
    return Math.max(0, months)
  }

  /** Human label e.g. "1 yr 8 mos", "5 mos", "9 yrs". */
  durationLabel(now: Date = new Date()): string {
    const total = this.totalMonths(now)
    const years = Math.floor(total / 12)
    const months = total % 12
    const parts: string[] = []
    if (years > 0) parts.push(`${years} ${years === 1 ? 'yr' : 'yrs'}`)
    if (months > 0) parts.push(`${months} ${months === 1 ? 'mo' : 'mos'}`)
    return parts.length ? parts.join(' ') : '0 mos'
  }

  private static label(date: Date): string {
    return `${MONTHS[date.getMonth()]} ${date.getFullYear()}`
  }

  /** Range label e.g. "Aug 2024 — Present". */
  rangeLabel(): string {
    const start = DateRange.label(this.start)
    const end = this.end ? DateRange.label(this.end) : 'Present'
    return `${start} — ${end}`
  }
}
