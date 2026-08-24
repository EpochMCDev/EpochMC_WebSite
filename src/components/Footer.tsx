import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { GithubLogo, CaretRight } from '@phosphor-icons/react'

const QQ_GROUP_URL = 'https://qm.qq.com/q/M2NJEm15uc'
const GITHUB_REPO_URL = 'https://github.com/EpochMCDev/EpochMC_WebSite'

export default function Footer() {
  useEffect(() => {
    if (__USER_DEBUG__) {
      console.log('[UserDebug] Version:', __VERSION__)
      console.log('[UserDebug] Builder:', __BUILDER__)
      console.log('[UserDebug] Build env:', __BUILD_ENV__)
      console.log('[UserDebug] Build time:', __BUILD_TIME__)
    }
  }, [])

  return (
    <footer className="border-t border-border bg-bg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          {/* Left: logo + copyright */}
          <div className="flex items-center gap-3.5">
            <img
              src="/images/logo.webp"
              alt="EpochMC"
              className="h-10 w-auto object-contain"
            />
            <p className="text-sm font-semibold text-fg tracking-tight">
              © 2026 EpochMC
            </p>
          </div>

          {/* Right: version info + links */}
          <div className="flex flex-col items-start sm:items-end gap-2.5 text-xs text-muted">
            <p className="text-[11px] text-faint">
              版本 {__VERSION__} · 构建于 {__BUILD_TIME__} (UTC+8) · {__BUILD_ENV__} 环境
            </p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
              <a
                href={QQ_GROUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium transition-colors hover:text-fg"
              >
                QQ 群 1043737743
              </a>
              <span className="text-faint">/</span>
              <a
                href={GITHUB_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-semibold text-fg transition-colors hover:opacity-70"
              >
                <GithubLogo size={15} weight="fill" />
                GitHub 开源仓库 · GNU GPL v3
              </a>
              <span className="text-faint">/</span>
              <Link
                to="/versions"
                className="inline-flex items-center gap-1 font-semibold text-fg transition-colors hover:opacity-70"
              >
                更多详情
                <CaretRight size={13} weight="bold" />
              </Link>
            </div>
            {__USER_DEBUG__ && (
              <p className="text-[11px] text-danger">
                【测试版本】USER DEBUG 模式 · 构建者：{__BUILDER__}
              </p>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
