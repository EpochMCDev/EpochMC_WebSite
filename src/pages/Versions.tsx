import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, GithubLogo, Tag } from '@phosphor-icons/react'

const GITHUB_REPO_URL = 'https://github.com/EpochMCDev/EpochMC_WebSite'
const RELEASES_API = 'https://api.github.com/repos/EpochMCDev/EpochMC_WebSite/releases'

interface Release {
  tag_name: string
  name: string
  published_at: string
  body: string
  html_url: string
}

const BUILD_INFO = [
  { label: '当前版本', value: __VERSION__ },
  { label: '构建时间', value: __BUILD_TIME__ },
  { label: '构建环境', value: __BUILD_ENV__ },
  { label: '总Commit次数', value: __COMMIT_COUNT__ },
  { label: '框架', value: 'React & Vite' },
  { label: '工程师', value: '深水6' },
]

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString('zh-CN', {
      timeZone: 'Asia/Shanghai',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
  } catch {
    return iso
  }
}

export default function Versions() {
  const [releases, setReleases] = useState<Release[] | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let cancelled = false

    fetch(RELEASES_API, {
      headers: { Accept: 'application/vnd.github+json' },
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))))
      .then((data: unknown) => {
        if (!cancelled) setReleases(Array.isArray(data) ? (data as Release[]) : [])
      })
      .catch(() => {
        if (!cancelled) setFailed(true)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <>
      <section className="bg-bg pt-32 sm:pt-36 pb-10 sm:pb-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-fg transition-colors"
          >
            <ArrowLeft size={15} weight="bold" />
            返回首页
          </Link>
          <div className="mt-6">
            <p className="text-xs font-medium tracking-[0.18em] text-faint">VERSIONS</p>
            <h1 className="mt-3 text-3xl sm:text-4xl font-bold text-fg tracking-tight">
              版本信息
            </h1>
            <p className="mt-4 text-sm sm:text-base text-muted leading-relaxed">
              当前站点构建的详细版本信息与历史发布记录。
            </p>
          </div>
        </div>
      </section>

      {/* 构建信息 */}
      <section className="bg-bg pb-16 sm:pb-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-xl font-semibold text-fg">当前构建</h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BUILD_INFO.map(({ label, value }) => (
              <div
                key={label}
                className="rounded-[10px] bg-surface border border-border px-5 py-4 transition-shadow hover:shadow-[0_0_20px_0_rgba(0,0,0,0.07)]"
              >
                <div className="text-xs text-muted font-medium">{label}</div>
                <div className="mt-1.5 text-sm font-semibold text-fg break-all">{value}</div>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <h2 className="text-xl font-semibold text-fg">往前版本</h2>
            <div className="mt-6">
              {releases === null && !failed && (
                <div className="rounded-[10px] bg-surface border border-border px-5 py-6 text-sm text-muted">
                  加载中...
                </div>
              )}
              {failed && (
                <div className="rounded-[10px] bg-surface border border-border px-5 py-6 text-sm text-muted">
                  暂时无法获取发布记录，可前往
                  <a
                    href={GITHUB_REPO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mx-1 font-semibold text-fg underline underline-offset-4"
                  >
                    GitHub 仓库
                  </a>
                  查看提交记录。
                </div>
              )}
              {releases !== null && releases.length === 0 && (
                <div className="rounded-[10px] bg-surface border border-border px-5 py-6 text-sm text-muted">
                  暂无正式发布版本，可通过
                  <a
                    href={GITHUB_REPO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mx-1 font-semibold text-fg underline underline-offset-4"
                  >
                    GitHub 仓库
                  </a>
                  查看提交与构建记录。
                </div>
              )}
              {releases !== null && releases.length > 0 && (
                <div className="divide-y divide-border border border-border rounded-[10px] bg-bg">
                  {releases.map((release) => (
                    <a
                      key={release.tag_name}
                      href={release.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-5 py-5 transition-colors hover:bg-surface/60"
                    >
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                        <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-[4px] bg-bg border border-border text-xs font-semibold text-fg">
                          <Tag size={13} weight="bold" />
                          {release.tag_name}
                        </span>
                        {release.name && (
                          <span className="text-sm font-semibold text-fg">{release.name}</span>
                        )}
                        <span className="text-xs text-faint">{formatDate(release.published_at)}</span>
                      </div>
                      {release.body && (
                        <p className="mt-2.5 text-sm text-muted leading-relaxed line-clamp-2 whitespace-pre-line">
                          {release.body}
                        </p>
                      )}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-10">
            <a
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-fg transition-opacity hover:opacity-70"
            >
              <GithubLogo size={17} weight="fill" />
              前往 GitHub 开源仓库（GNU GPL v3）
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
