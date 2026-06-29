import { describe, it, expect } from 'vitest'
import { profile, experiences, projects, skillGroups, education } from '@/data/cv'

/** Collect human-readable strings, skipping date value objects. */
function collectText(value: unknown, acc: string[] = []): string[] {
  if (typeof value === 'string') {
    if (!/^\d{4}-\d{2}-\d{2}T/.test(value)) acc.push(value)
  } else if (Array.isArray(value)) {
    value.forEach((item) => collectText(item, acc))
  } else if (value && typeof value === 'object') {
    for (const [key, child] of Object.entries(value)) {
      if (key === 'period' || key === 'start' || key === 'end') continue
      collectText(child, acc)
    }
  }
  return acc
}

describe('cv data', () => {
  it('exposes the real profile headline', () => {
    expect(profile.name).toBe('Hendri Faisal Hidayat')
    expect(profile.company).toBe('Mekari')
  })

  it('includes the Mekari experience with three roles', () => {
    const mekari = experiences.find((e) => e.id === 'mekari')
    expect(mekari).toBeDefined()
    expect(mekari?.roles.length).toBe(3)
  })

  it('offers a Calendly contact channel', () => {
    expect(profile.socials.find((s) => s.kind === 'calendly')?.url).toContain('calendly.com')
  })

  it('marks at least four ordered featured projects', () => {
    expect(projects.length).toBeGreaterThanOrEqual(4)
    expect(projects.every((p) => p.order > 0)).toBe(true)
  })

  // --- Privacy guardrail: the public site must contain NO PII ---
  it('contains no personally identifiable contact data (phone / street address)', () => {
    const text = collectText({ profile, experiences, projects, skillGroups, education }).join(' \n ')
    expect(text).not.toMatch(/\+?\d[\d\s().-]{7,}\d/)
    expect(text).not.toContain('+62')
    expect(text).not.toMatch(/\bJl\.?\b/i)
    expect(text.toLowerCase()).not.toContain('green garden')
  })
})
