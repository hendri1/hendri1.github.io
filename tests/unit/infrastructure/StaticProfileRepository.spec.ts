import { describe, it, expect } from 'vitest'
import { StaticProfileRepository } from '@/infrastructure/repositories/StaticProfileRepository'

/**
 * Recursively collect human-readable strings, skipping date value objects
 * (their ISO form like "2024-08-01" would otherwise look phone-shaped).
 */
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

describe('StaticProfileRepository', () => {
  const repo = new StaticProfileRepository()

  it('exposes the real profile headline', () => {
    const profile = repo.getProfile()
    expect(profile.name).toBe('Hendri Faisal Hidayat')
    expect(profile.company).toBe('Mekari')
  })

  it('includes the Mekari experience with three roles', () => {
    const mekari = repo.getExperiences().find((e) => e.id === 'mekari')
    expect(mekari).toBeDefined()
    expect(mekari?.roles.length).toBe(3)
  })

  it('offers a Calendly contact channel', () => {
    const calendly = repo.getProfile().socials.find((s) => s.kind === 'calendly')
    expect(calendly?.url).toContain('calendly.com')
  })

  it('only marks projects featured that have a display order', () => {
    const projects = repo.getProjects()
    expect(projects.length).toBeGreaterThanOrEqual(4)
    expect(projects.every((p) => p.order > 0)).toBe(true)
  })

  // --- Privacy guardrail: the public site must contain NO PII ---
  it('contains no personally identifiable contact data (phone / street address)', () => {
    const text = collectText({
      profile: repo.getProfile(),
      experiences: repo.getExperiences(),
      projects: repo.getProjects(),
      skillGroups: repo.getSkillGroups(),
      education: repo.getEducation(),
    }).join(' \n ')

    // No phone numbers (e.g. +62 812-2243-356 — 7+ digit/separator runs)
    expect(text).not.toMatch(/\+?\d[\d\s().-]{7,}\d/)
    expect(text).not.toContain('+62')
    // No street-address markers from the source CV
    expect(text).not.toMatch(/\bJl\.?\b/i) // "Jl." = Jalan (street)
    expect(text.toLowerCase()).not.toContain('green garden')
  })
})
