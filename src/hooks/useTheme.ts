import { useCallback, useEffect, useState } from 'react'

export type ThemeMode = 'light' | 'dark' | 'auto'

const STORAGE_KEY = 'epochmc-theme'

const MODE_ORDER: ThemeMode[] = ['light', 'dark', 'auto']

function getInitialMode(): ThemeMode {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored === 'light' || stored === 'dark' || stored === 'auto' ? stored : 'auto'
}

function applyMode(mode: ThemeMode) {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const isDark = mode === 'dark' || (mode === 'auto' && prefersDark)
  document.documentElement.classList.toggle('dark', isDark)
}

export default function useTheme() {
  const [mode, setMode] = useState<ThemeMode>(getInitialMode)

  useEffect(() => {
    applyMode(mode)
    try {
      localStorage.setItem(STORAGE_KEY, mode)
    } catch {
      /* 隐私模式等场景下存储不可用，忽略即可 */
    }

    if (mode !== 'auto') return

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => applyMode('auto')
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [mode])

  const cycle = useCallback(() => {
    setMode((prev) => MODE_ORDER[(MODE_ORDER.indexOf(prev) + 1) % MODE_ORDER.length])
  }, [])

  return { mode, cycle }
}
