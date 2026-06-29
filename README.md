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

## Architecture (Clean Architecture)

Dependencies point inwards — outer layers depend on inner ones, never the reverse.

```
src/
├── domain/                 # Enterprise rules — pure, framework-free
│   ├── entities/           #   Profile, Experience, Project, Skill, Education
│   ├── value-objects/      #   DateRange (durations, labels)
│   └── repositories/       #   ProfileRepository (port / interface)
├── application/            # Use cases + presentation-ready view models
│   ├── use-cases/          #   GetExperienceTimeline, GetFeaturedProjects, …
│   └── view-models/
├── infrastructure/         # Concrete adapters
│   ├── data/               #   cv.data.ts — the CV content (NO PII)
│   └── repositories/       #   StaticProfileRepository (implements the port)
├── presentation/           # Vue layer (dumb components)
│   ├── components/          (layout · sections · ui)
│   ├── composables/         (useTheme, usePortfolio)
│   └── directives/          (v-reveal scroll animation)
├── composition-root.ts     # Dependency injection wiring
└── main.ts                 # Entry
```

Swapping the static data for an HTTP/CMS source means writing one new
`ProfileRepository` implementation and changing one line in `composition-root.ts`
— no domain, application, or UI changes.

## Privacy

The site contains **no personally identifiable contact data** (no phone number,
no home address). Contact is via a Calendly booking embed, email, LinkedIn and
GitHub. A unit test (`StaticProfileRepository.spec.ts`) and an E2E test guard
against PII regressions.

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
