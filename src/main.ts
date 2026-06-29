import { createApp } from 'vue'
import App from './App.vue'
import { vReveal } from './presentation/directives/reveal'
import { vMagnetic } from './presentation/directives/magnetic'
import { vTilt } from './presentation/directives/tilt'
import '@fontsource-variable/geist'
import '@fontsource-variable/geist-mono'
import './style.css'

createApp(App)
  .directive('reveal', vReveal)
  .directive('magnetic', vMagnetic)
  .directive('tilt', vTilt)
  .mount('#app')
