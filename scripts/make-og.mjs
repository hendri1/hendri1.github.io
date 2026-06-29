import { chromium } from 'playwright-core'

// Use a pinned binary when provided (sandbox); otherwise let Playwright resolve
// the browser it installed (CI).
const EXECUTABLE = process.env.PLAYWRIGHT_CHROMIUM_PATH || undefined

const html = `<!doctype html><html><head><meta charset="utf-8"/>
<style>
  * { margin: 0; box-sizing: border-box; }
  html, body { width: 1200px; height: 630px; }
  body {
    font-family: -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    background: #0a0e16;
    color: #e7eef8;
    position: relative;
    overflow: hidden;
    padding: 72px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .glow1 { position: absolute; width: 700px; height: 520px; top: -160px; right: -120px;
    background: radial-gradient(closest-side, rgba(129,140,248,0.45), transparent); }
  .glow2 { position: absolute; width: 600px; height: 460px; bottom: -180px; left: -120px;
    background: radial-gradient(closest-side, rgba(34,211,238,0.30), transparent); }
  .mono { width: 96px; height: 96px; border-radius: 24px; display: grid; place-items: center;
    font-size: 44px; font-weight: 800; color: #0a0e16;
    background: linear-gradient(135deg, #818cf8, #22d3ee); }
  h1 { font-size: 76px; font-weight: 800; letter-spacing: -0.02em; margin-top: 40px; line-height: 1.05; }
  .title { font-size: 40px; font-weight: 700; margin-top: 14px;
    background: linear-gradient(110deg, #818cf8, #22d3ee); -webkit-background-clip: text; background-clip: text; color: transparent; }
  .tag { font-size: 28px; color: #93a1b5; margin-top: 22px; max-width: 900px; }
  .foot { position: absolute; bottom: 56px; left: 72px; right: 72px; display: flex;
    justify-content: space-between; font-size: 24px; color: #93a1b5; }
  .foot b { color: #e7eef8; }
</style></head>
<body>
  <div class="glow1"></div><div class="glow2"></div>
  <div class="mono">HF</div>
  <h1>Hendri Faisal Hidayat</h1>
  <div class="title">Senior Software Engineer, Frontend</div>
  <div class="tag">I build scalable web apps, micro-frontends, and design systems.</div>
  <div class="foot"><span>hendri1.github.io</span><span><b>~10 yrs</b> · Bandung, Indonesia</span></div>
</body></html>`

const browser = await chromium.launch(EXECUTABLE ? { executablePath: EXECUTABLE } : {})
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })
await page.setContent(html, { waitUntil: 'load' })
await page.screenshot({ path: 'public/og.png' })
await browser.close()
console.log('Wrote public/og.png')
