import type { vReveal } from './presentation/directives/reveal'

declare module 'vue' {
  interface GlobalDirectives {
    vReveal: typeof vReveal
  }
}

export {}
