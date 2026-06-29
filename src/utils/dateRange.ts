const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
] as const

/**
 * Immutable value object describing a span of time.
 * A `null` end means the span is ongoing ("Present").
 * `now` is injectable so derived durations are deterministic and testable.
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

  totalMonths(now: Date = new Date()): number {
    const end = this.end ?? now
    const months =
      (end.getFullYear() - this.start.getFullYear()) * 12 +
      (end.getMonth() - this.start.getMonth())
    return Math.max(0, months)
  }

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

  rangeLabel(): string {
    const start = DateRange.label(this.start)
    const end = this.end ? DateRange.label(this.end) : 'Present'
    return `${start} — ${end}`
  }
}
