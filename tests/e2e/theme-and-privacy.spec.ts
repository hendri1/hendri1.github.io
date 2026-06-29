import { test, expect } from '@playwright/test'

test('defaults to dark theme and toggles to light (persisted)', async ({ page }) => {
  await page.goto('/')
  const html = page.locator('html')

  // Dark-first default
  await expect(html).toHaveClass(/dark/)

  await page.getByTestId('theme-toggle').click()
  await expect(html).not.toHaveClass(/dark/)

  const stored = await page.evaluate(() => localStorage.getItem('theme'))
  expect(stored).toBe('light')

  // Preference survives a reload
  await page.reload()
  await expect(page.locator('html')).not.toHaveClass(/dark/)
})

test('navigation anchors jump to the matching section', async ({ page }) => {
  await page.goto('/')
  await page.getByTestId('nav-experience').click()
  await expect(page).toHaveURL(/#experience$/)
  await expect(page.getByTestId('experience')).toBeInViewport()
})

test('mobile menu opens and exposes navigation', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await expect(page.getByTestId('mobile-menu')).toBeHidden()
  await page.getByTestId('menu-toggle').click()
  await expect(page.getByTestId('mobile-menu')).toBeVisible()
})

test('PRIVACY: no PII (phone number or street address) is rendered', async ({ page }) => {
  await page.goto('/')
  // Reveal everything so all section text is in the accessibility tree.
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  await page.waitForTimeout(300)

  const text = await page.locator('body').innerText()

  expect(text).not.toContain('+62')
  expect(text).not.toMatch(/\b\d{3,4}-\d{3,4}-\d{3,4}\b/) // grouped phone digits
  expect(text).not.toMatch(/\bJl\.?\b/i) // "Jalan" — street
  expect(text.toLowerCase()).not.toContain('green garden')
})
