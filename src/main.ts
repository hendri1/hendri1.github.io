import { createApp } from 'vue'
import App from './App.vue'
import { vReveal } from './directives/reveal'
import { vMagnetic } from './directives/magnetic'
import { vTilt } from './directives/tilt'
import { vParallax } from './directives/parallax'
import '@fontsource-variable/geist'
import '@fontsource-variable/geist-mono'
import './style.css'

createApp(App)
  .directive('reveal', vReveal)
  .directive('magnetic', vMagnetic)
  .directive('tilt', vTilt)
  .directive('parallax', vParallax)
  .mount('#app')
