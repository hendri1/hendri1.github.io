/// <reference types="vite/client" />

declare module '@fontsource-variable/geist'
declare module '@fontsource-variable/geist-mono'

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, any>
  export default component
}
