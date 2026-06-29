import type { vReveal } from './presentation/directives/reveal'
import type { vMagnetic } from './presentation/directives/magnetic'
import type { vTilt } from './presentation/directives/tilt'
import type { vParallax } from './presentation/directives/parallax'

declare module 'vue' {
  interface GlobalDirectives {
    vReveal: typeof vReveal
    vMagnetic: typeof vMagnetic
    vTilt: typeof vTilt
    vParallax: typeof vParallax
  }
}

export {}
