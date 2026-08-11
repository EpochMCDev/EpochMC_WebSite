import { CalendarBlank } from '@phosphor-icons/react'
import ScrollReveal from '../components/ScrollReveal'

export default function Event() {
  return (
    <>
      <section className="bg-bg pt-32 sm:pt-36 pb-10 sm:pb-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <p className="text-xs font-medium tracking-[0.18em] text-faint">EVENT</p>
          <h1 className="mt-3 text-3xl sm:text-4xl font-bold text-fg tracking-tight">
            活动与动态
          </h1>
          <p className="mt-4 text-sm sm:text-base text-muted leading-relaxed">
            Epoch MC 的最新动态、版本更新与国战事件
          </p>
        </div>
      </section>

      <section className="bg-bg pb-20 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <ScrollReveal>
            <div className="rounded-[14px] bg-surface border border-border py-24 text-center">
              <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-bg text-faint mb-5">
                <CalendarBlank size={30} weight="bold" />
              </span>
              <p className="text-base font-semibold text-muted">无</p>
              <p className="mt-2 text-sm text-faint">Coming Soon</p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
