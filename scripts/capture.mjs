import { chromium } from 'playwright-core'

const EXECUTABLE = process.env.PLAYWRIGHT_CHROMIUM_PATH || '/opt/pw-browsers/chromium'
const BASE = 'http://localhost:4173/'
const OUT = process.env.OUT_DIR || '/tmp/claude-0/-home-user-hendri1-github-io/f3a55897-0e1d-53d9-925c-ea2c2c9dbf57/scratchpad'

async function revealAll(page) {
  // Scroll through the page so every IntersectionObserver fires, then return to top.
  await page.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.7)
    for (let y = 0; y <= document.body.scrollHeight; y += step) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 120))
    }
    window.scrollTo(0, 0)
    await new Promise((r) => setTimeout(r, 200))
  })
}

const browser = await chromium.launch({ executablePath: EXECUTABLE })

// Desktop — dark (default)
const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 })
await desktop.goto(BASE, { waitUntil: 'networkidle' })
await desktop.waitForTimeout(400)
await desktop.screenshot({ path: `${OUT}/desktop-dark-hero.png` })
await revealAll(desktop)
await desktop.waitForTimeout(300)
await desktop.screenshot({ path: `${OUT}/desktop-dark-full.png`, fullPage: true })

for (const id of ['about', 'experience', 'work', 'skills', 'contact']) {
  const el = desktop.getByTestId(id)
  await el.scrollIntoViewIfNeeded()
  await desktop.waitForTimeout(350)
  await el.screenshot({ path: `${OUT}/section-${id}.png` })
}

// Desktop — light
await desktop.getByTestId('theme-toggle').click()
await desktop.evaluate(() => window.scrollTo(0, 0))
await desktop.waitForTimeout(500)
await desktop.screenshot({ path: `${OUT}/desktop-light-hero.png` })

// Mobile — dark
const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 })
await mobile.goto(BASE, { waitUntil: 'networkidle' })
await revealAll(mobile)
await mobile.waitForTimeout(300)
await mobile.screenshot({ path: `${OUT}/mobile-dark-full.png`, fullPage: true })

await browser.close()
console.log('Captured screenshots to', OUT)
