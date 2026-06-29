import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  // Disable Lenis/cursor/particle motion for deterministic, fast runs.
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
})

test('has the correct document title and hero identity', async ({ page }) => {
  await expect(page).toHaveTitle(/Hendri Faisal Hidayat/)
  await expect(page.getByTestId('hero-name')).toHaveText('Hendri Faisal Hidayat')
  await expect(page.getByTestId('hero-tagline')).toContainText('micro-frontends')
})

test('renders every primary section', async ({ page }) => {
  for (const id of [
    'hero',
    'trusted-by',
    'services',
    'work',
    'process',
    'experience',
    'about',
    'skills',
    'contact',
  ]) {
    await expect(page.getByTestId(id)).toBeAttached()
  }
})

test('presents the business-profile value proposition and services', async ({ page }) => {
  await expect(page.getByTestId('hero-valueprop')).toContainText('scales')
  await expect(page.getByTestId('services-grid').locator('> article')).toHaveCount(4)
  await expect(page.getByTestId('service-architecture')).toContainText('Architecture')
  await expect(page.getByTestId('process-list').locator('> li')).toHaveCount(4)
  await expect(page.getByTestId('client-list')).toContainText('Mekari')
})

test('shows the four hero highlight stats', async ({ page }) => {
  const stats = page.getByTestId('hero-stats').locator('> div')
  await expect(stats).toHaveCount(4)
})

test('lists the Mekari experience as current with three roles', async ({ page }) => {
  const mekari = page.getByTestId('experience-mekari')
  await expect(mekari).toContainText('Mekari')
  await expect(mekari).toContainText('Current')
  await expect(mekari.locator('article')).toHaveCount(3)
})

test('renders the four featured projects', async ({ page }) => {
  await expect(page.getByTestId('projects-grid').locator('> article')).toHaveCount(4)
  await expect(page.getByTestId('project-klikpajak')).toContainText('KlikPajak')
})

test('exposes skill groups and education', async ({ page }) => {
  await expect(page.getByTestId('skill-group-frontend')).toContainText('Vue')
  await expect(page.getByTestId('education-widyatama')).toContainText('Widyatama')
})

test('provides a Calendly scheduler and a working fallback link', async ({ page }) => {
  await expect(page.getByTestId('contact-calendly')).toBeVisible()
  const fallback = page.getByTestId('contact-calendly-fallback')
  await expect(fallback).toHaveAttribute('href', /calendly\.com/)
})

test('hero "Book a call" points to Calendly', async ({ page }) => {
  await expect(page.getByTestId('hero-cta-call')).toHaveAttribute('href', /calendly\.com/)
})

test('surfaces email, LinkedIn and GitHub contact channels', async ({ page }) => {
  await expect(page.getByTestId('contact-email')).toHaveAttribute('href', /mailto:/)
  await expect(page.getByTestId('contact-linkedin')).toHaveAttribute('href', /linkedin\.com/)
  await expect(page.getByTestId('contact-github')).toHaveAttribute('href', /github\.com/)
})
