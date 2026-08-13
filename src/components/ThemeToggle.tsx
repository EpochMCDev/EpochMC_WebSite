import { Sun, Moon, CircleHalf } from '@phosphor-icons/react'
import useTheme, { type ThemeMode } from '../hooks/useTheme'

const MODE_LABEL: Record<ThemeMode, string> = {
  light: '浅色',
  dark: '深色',
  auto: '自动',
}

const MODE_ICON: Record<ThemeMode, typeof Sun> = {
  light: Sun,
  dark: Moon,
  auto: CircleHalf,
}

interface ThemeToggleProps {
  transparent?: boolean
  visible?: boolean
}

export default function ThemeToggle({ transparent = false, visible = true }: ThemeToggleProps) {
  const { mode, cycle } = useTheme()
  const Icon = MODE_ICON[mode]
  const label = MODE_LABEL[mode]

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={`切换主题，当前${label}模式`}
      title={`当前${label}模式，点击切换`}
      className={`flex h-9 w-9 items-center justify-center rounded-md transition-[opacity,visibility] duration-300 ${
        transparent
          ? 'text-white/80 hover:text-white hover:bg-white/10'
          : 'text-muted hover:text-fg hover:bg-surface'
      } ${visible ? 'opacity-100' : 'opacity-0 invisible'}`}
    >
      <Icon size={19} weight="bold" aria-hidden="true" />
    </button>
  )
}
