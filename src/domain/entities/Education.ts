import type { DateRange } from '../value-objects/DateRange'

export interface Education {
  readonly id: string
  readonly institution: string
  readonly credential: string
  readonly field: string
  readonly period: DateRange
  readonly note?: string
}
