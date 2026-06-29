import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  // Reduced motion keeps boot/scroll choreography deterministic.
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
})

test('hero status reads ONLINE once booted', async ({ page }) => {
  // With reduced motion the boot sequence is skipped straight to ONLINE.
  await expect(page.getByTestId('hero-status')).toHaveText(/ONLINE/)
})

test('copy-email button flips to a confirmed state', async ({ page, context }) => {
  // Best-effort clipboard grant; the button confirms even if the API is denied.
  await context.grantPermissions(['clipboard-read', 'clipboard-write']).catch(() => {})

  const button = page.getByTestId('copy-email')
  await expect(page.getByTestId('copy-email-label')).toHaveText('Copy')
  await button.click()
  await expect(page.getByTestId('copy-email-label')).toHaveText('Copied')
})

test('primary nav reflects the active section via aria-current', async ({ page }) => {
  await page.locator('#services').scrollIntoViewIfNeeded()
  await expect(page.getByTestId('nav-services')).toHaveAttribute('aria-current', 'true')

  await page.locator('#contact').scrollIntoViewIfNeeded()
  await expect(page.getByTestId('nav-contact')).toHaveAttribute('aria-current', 'true')
})
