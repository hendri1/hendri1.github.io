import { ref, watch, type Ref } from 'vue'

export type Theme = 'dark' | 'light'

const STORAGE_KEY = 'theme'
const theme: Ref<Theme> = ref(initialTheme())

function initialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'dark' || stored === 'light') return stored
  // Dark-first: default to dark unless the visitor explicitly chose light.
  return 'dark'
}

function apply(value: Theme): void {
  if (typeof document === 'undefined') return
  document.documentElement.classList.toggle('dark', value === 'dark')
  document.documentElement.style.colorScheme = value
}

watch(theme, (value) => {
  apply(value)
  if (typeof window !== 'undefined') window.localStorage.setItem(STORAGE_KEY, value)
})

/** Shared, persisted dark/light theme state. */
export function useTheme() {
  apply(theme.value)
  const toggle = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }
  return { theme, toggle }
}
