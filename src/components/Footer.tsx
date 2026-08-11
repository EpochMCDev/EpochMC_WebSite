import { useEffect } from 'react'

const QQ_GROUP_URL = 'https://qm.qq.com/q/M2NJEm15uc'

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
        <div className="flex flex-col sm:flex-row items-center justify-center gap-x-2 gap-y-2 text-center flex-wrap text-xs text-muted font-medium">
          <span>© 2026 Epoch MC 版权所有</span>
          <span className="hidden sm:inline text-faint">/</span>
          <a
            href={QQ_GROUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-fg"
          >
            QQ 群 1043737743
          </a>
        </div>
        <p className="mt-3 text-center text-[11px] text-faint">
          版本 {__VERSION__} · 构建于 {__BUILD_TIME__} (UTC+8) · {__BUILD_ENV__} 环境
        </p>
        {__USER_DEBUG__ && (
          <p className="mt-2 text-center text-[11px] text-danger">
            【测试版本】USER DEBUG 模式 · 构建者：{__BUILDER__}
          </p>
        )}
      </div>
    </footer>
  )
}
