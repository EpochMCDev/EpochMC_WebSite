import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, GithubLogo } from '@phosphor-icons/react';

const GITHUB_REPO_URL = 'https://github.com/EpochMCDev/EpochMC_WebSite';

const BUILD_INFO = [
  { label: '当前版本', value: __VERSION__ },
  { label: '构建时间', value: __BUILD_TIME__ },
  { label: '构建环境', value: __BUILD_ENV__ },
  { label: '总Commit次数', value: __COMMIT_COUNT__ },
  { label: '框架', value: 'React & Vite' },
  { label: '工程师', value: '深水6' },
];

export default function Versions() {
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
                当前站点构建的详细版本信息。
              </p>
            </div>
          </div>
        </section>

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
  );
}