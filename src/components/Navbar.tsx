import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { List, X, CaretRight } from '@phosphor-icons/react'
import ThemeToggle from './ThemeToggle'

const NAV_ITEMS = [
  { path: '/', label: '首页' },
  { path: '/about', label: '关于' },
  { path: '/join', label: '加入' },
  // { path: '/satellite', label: '卫星地图' },
  // { path: '/stock', label: '国家股市' },
  // { path: 'https://wiki.epochmc.cn/', label: 'WIKI' },
  { path: 'https://kook.vip/rImL25', label: 'KOOK' },
]

const QQ_GROUP_URL = 'https://qm.qq.com/q/M2NJEm15uc'
const NAVBAR_HEIGHT = 64

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const updateScrolled = () => {
      if (location.pathname !== '/') {
        setScrolled(true)
        return
      }
      const hero = document.getElementById('home-hero')
      if (!hero) {
        setScrolled(window.scrollY > NAVBAR_HEIGHT)
        return
      }
      // 透明背景持续到首页大图最底部，越过图片底部边界后才切换为实心背景。
      const heroBottom = hero.offsetTop + hero.offsetHeight
      setScrolled(window.scrollY >= heroBottom - NAVBAR_HEIGHT)
    }
    updateScrolled()
    window.addEventListener('scroll', updateScrolled, { passive: true })
    window.addEventListener('resize', updateScrolled)
    return () => {
      window.removeEventListener('scroll', updateScrolled)
      window.removeEventListener('resize', updateScrolled)
    }
  }, [location.pathname])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const transparent = location.pathname === '/' && !scrolled && !mobileOpen

  const linkClass = (path: string) =>
    `relative px-3 py-2 text-sm font-medium transition-colors after:absolute after:bottom-0 after:left-3 after:right-3 after:h-px after:bg-current after:scale-x-0 after:transition-transform after:origin-center ${
      location.pathname === path
        ? `${transparent ? 'text-white' : 'text-fg'} after:scale-x-100`
        : `${transparent ? 'text-white/80 hover:text-white' : 'text-muted hover:text-fg'} hover:after:scale-x-100`
    }`

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          transparent
            ? 'bg-transparent'
            : 'bg-bg/90 backdrop-blur-md border-b border-border'
        }`}
      >
        <div className="mx-auto max-w-7xl flex items-center justify-between h-16 px-4 sm:px-6">
          <Link
            to="/"
            className="flex items-center gap-2.5 no-underline"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img
              src="/images/logo.webp"
              alt="EpochMC"
              className="h-8 w-auto object-contain"
            />
            <span
              className={`hidden sm:inline text-base font-semibold tracking-tight transition-colors ${
                transparent ? 'text-white' : 'text-fg'
              }`}
            >
              EpochMC
            </span>
          </Link>

          <div className="flex items-center gap-1">
            <div className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map(({ path, label }) => (
                path.startsWith('http') ? (
                  <a
                    key={path}
                    href={path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                      transparent
                        ? 'text-white/80 hover:text-white'
                        : 'text-muted hover:text-fg'
                    }`}
                  >
                    {label}
                  </a>
                ) : (
                  <Link key={path} to={path} className={linkClass(path)}>
                    {label}
                  </Link>
                )
              ))}
            </div>
            <ThemeToggle transparent={transparent} visible={!transparent} />
            <button
              type="button"
              className={`flex h-9 w-9 items-center justify-center rounded-md transition-colors lg:hidden ${
                transparent
                  ? 'text-white/80 hover:text-white hover:bg-white/10'
                  : 'text-muted hover:text-fg hover:bg-surface'
              }`}
              onClick={() => setMobileOpen(true)}
              aria-label="打开菜单"
            >
              <List size={22} weight="bold" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden ${mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        role="dialog"
        aria-modal="true"
      >
        <div
          className={`fixed inset-0 bg-black/40 transition-opacity duration-300 ${
            mobileOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`fixed top-0 right-0 bottom-0 w-72 p-6 transition-transform duration-300 ease-out bg-bg border-l border-border ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-semibold text-fg">EpochMC</span>
            <button
              className="p-2 text-fg"
              onClick={() => setMobileOpen(false)}
              aria-label="关闭菜单"
            >
              <X size={22} weight="bold" />
            </button>
          </div>
          <nav className="mt-8 flex flex-col">
            {NAV_ITEMS.map(({ path, label }) => (
              path.startsWith('http') ? (
                <a
                  key={path}
                  href={path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between px-4 py-3.5 border-b border-border text-sm font-medium transition-colors text-muted hover:text-fg"
                >
                  {label}
                  <CaretRight
                    size={14}
                    weight="bold"
                    className="text-faint group-hover:translate-x-0.5 transition-transform"
                  />
                </a>
              ) : (
                <Link
                  key={path}
                  to={path}
                  className={`group flex items-center justify-between px-4 py-3.5 border-b border-border text-sm font-medium transition-colors ${
                    location.pathname === path ? 'text-fg' : 'text-muted hover:text-fg'
                  }`}
                >
                  {label}
                  <CaretRight
                    size={14}
                    weight="bold"
                    className="text-faint group-hover:translate-x-0.5 transition-transform"
                  />
                </Link>
              )
            ))}
            <a
              href={QQ_GROUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 btn btn-primary w-full"
            >
              加入 QQ 群聊
            </a>
          </nav>
        </div>
      </div>
    </>
  )
}
