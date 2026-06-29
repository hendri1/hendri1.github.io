# Hendri Faisal Hidayat — Portfolio

Personal CV / portfolio of **Hendri Faisal Hidayat**, Senior Software Engineer (Frontend).
A fast, accessible, dark-first single-page site.

🔗 **Live:** https://hendri1.github.io/

## Tech stack

| Concern        | Choice                                            |
| -------------- | ------------------------------------------------- |
| Framework      | **Vue 3.5** (`<script setup>` + TypeScript)       |
| Build / dev    | **Vite 8** (Rolldown)                             |
| Package mgr    | **Bun** (runtime, installs, scripts, test runner) |
| Styling        | **Tailwind CSS 4** (CSS-first config)             |
| Unit testing   | **Vitest 4**                                      |
| E2E testing    | **Playwright** (selectors keyed on `data-testid`) |
| Node           | **24 LTS** (`.nvmrc`)                             |
| Hosting        | **GitHub Pages** (live) · **Vercel** (one-click)  |

## Architecture

A flat, idiomatic Vue layout — data + types + pure utils, consumed by
components through one composable. Logic stays out of components and is
unit-tested; the UI layer is presentational.

```
src/
├── data/cv.ts          # single source of truth — the CV content (NO PII)
├── types/portfolio.ts  # entity + view-model interfaces
├── utils/
│   ├── dateRange.ts    #   DateRange value object (durations, labels)
│   └── portfolio.ts    #   pure view-model builders (timeline, projects, …)
├── composables/        # usePortfolio (facade), useTheme, useSmoothScroll
├── directives/         # v-reveal, v-parallax, v-magnetic, v-tilt
├── components/         # layout · sections · ui · fx (presentational)
├── App.vue
└── main.ts
```

`usePortfolio()` reads `data/cv.ts` through the pure functions in
`utils/portfolio.ts`. Swapping the static data for an HTTP/CMS source is a
change isolated to `data/` + `usePortfolio` — components are untouched.

## Privacy

The site contains **no personally identifiable contact data** (no phone number,
no home address). Contact is via a Calendly booking embed, email, LinkedIn and
GitHub. A unit test (`tests/unit/data.spec.ts`) and an E2E test guard against
PII regressions.

## Scripts

```bash
bun install          # install dependencies
bun run dev          # dev server (Vite on the Bun runtime)
bun run build        # production build → dist/
bun run preview      # preview the production build
bun run type-check   # vue-tsc
bun run test         # unit tests (Vitest)
bun run test:e2e     # E2E tests (Playwright)
bun run test:all     # unit + E2E
```

## Deployment

### GitHub Pages (current live target)

`.github/workflows/deploy.yml` type-checks, runs unit + E2E tests, builds with
Bun, and deploys `dist/` to Pages on every push to `master`.

### Vercel (one-click alternative)

`vercel.json` pins the Vite preset, Bun install/build, and an SPA rewrite.
Import the repo at vercel.com → it auto-detects everything. `base` is `/`, which
is correct for both Vercel and this `username.github.io` root site.
