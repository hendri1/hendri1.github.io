import type { vReveal } from './directives/reveal'
import type { vMagnetic } from './directives/magnetic'
import type { vTilt } from './directives/tilt'
import type { vParallax } from './directives/parallax'

declare module 'vue' {
  interface GlobalDirectives {
    vReveal: typeof vReveal
    vMagnetic: typeof vMagnetic
    vTilt: typeof vTilt
    vParallax: typeof vParallax
  }
}

export {}
