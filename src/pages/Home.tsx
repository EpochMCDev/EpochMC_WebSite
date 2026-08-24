import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  CaretLeft,
  CaretRight,
  ChatTeardropText,
  Flag,
  CurrencyCircleDollar,
  Users,
  ArrowDown,
} from '@phosphor-icons/react'
import ScrollReveal from '../components/ScrollReveal'
import SectionHead from '../components/SectionHead'

const HERO_BACKGROUNDS = [
  '/images/hero/bg1.png',
  '/images/hero/bg2.png',
  '/images/hero/bg3.png',
  '/images/hero/bg4.png',
  '/images/hero/bg5.png',
]

const QQ_GROUP_URL = 'https://qm.qq.com/q/M2NJEm15uc'

// Server hosts for the live active-player count.
// Fallback order: a is the default, b is used only when a is unreachable.
const SERVER_HOSTS = ['test.epochearth.cn', 'test.epochmc.cn']

// Public Minecraft server-status API that pings the hosts and returns JSON.
// Once the domains resolve, the count becomes live automatically.
const mcStatusUrl = (host: string) => `https://api.mcsrvstat.us/3/${encodeURIComponent(host)}`

// Placeholder community stats; replace with real numbers.
const STATS = [
  { value: '8', label: '国家数量' },
  { value: null, label: '在线玩家', live: true },
  { value: '800+', label: '社区成员' },
]

async function fetchServerCount(host: string): Promise<number | null> {
  try {
    const res = await fetch(mcStatusUrl(host))
    if (!res.ok) return null
    const data = (await res.json()) as {
      online?: boolean
      players?: { online?: number; max?: number }
    }
    return data?.online ? data.players?.online ?? 0 : null
  } catch {
    return null
  }
}

function useOnlinePlayers(hosts: string[], refreshMs = 60000): number | null {
  const [online, setOnline] = useState<number | null>(null)

  useEffect(() => {
    let cancelled = false

    const fetchOnline = async () => {
      // Default to the first host; fall back to the next one when unreachable.
      let count: number | null = null
      for (const host of hosts) {
        count = await fetchServerCount(host)
        if (count !== null) break
      }
      if (!cancelled) setOnline(count)
    }

    fetchOnline()
    const timer = setInterval(fetchOnline, refreshMs)
    return () => {
      cancelled = true
      clearInterval(timer)
    }
  }, [hosts, refreshMs])

  return online
}

const UPDATE_ITEMS = [
  {
    title: '建国与国战',
    desc: '圈地建国、扩张领土、宣战结盟，在战争与和平之间成就你的帝国霸业。',
    tag: '国战',
    to: '/about',
    cover: HERO_BACKGROUNDS[1],
  },
  {
    title: '经济与股市',
    desc: '税收国库、国际贸易与国家股市，经济博弈同样左右世界格局。',
    tag: '经济',
    to: '/stock',
    cover: HERO_BACKGROUNDS[2],
  },
  {
    title: '卫星地图',
    desc: '通过卫星地图实时俯瞰全球局势，见证你的疆域与邻国的变迁。',
    tag: '地图',
    to: '/satellite',
    cover: HERO_BACKGROUNDS[3],
  },
  {
    title: '加入我们',
    desc: '三步踏上 Epoch MC 的全球战场，成为世界格局的参与者与改写者。',
    tag: '社区',
    to: '/join',
    cover: HERO_BACKGROUNDS[4],
  },
]

const FEATURE_CARDS = [
  {
    title: '建国与国战',
    desc: '圈地建国、扩张领土、宣战结盟，在战争与和平之间成就你的帝国霸业。',
    icon: Flag,
    to: '/about',
  },
  {
    title: '经济与股市',
    desc: '税收国库、国际贸易与国家股市，经济博弈同样左右世界格局。',
    icon: CurrencyCircleDollar,
    to: '/stock',
  },
]

export default function Home() {
  const [slide, setSlide] = useState(0)
  const sliderRef = useRef<HTMLDivElement | null>(null)
  const onlinePlayers = useOnlinePlayers(SERVER_HOSTS)

  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((prev) => (prev + 1) % HERO_BACKGROUNDS.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const scrollByDir = (dir: number) => {
    sliderRef.current?.scrollBy({ left: dir * 360, behavior: 'smooth' })
  }

  return (
    <>
      {/* ==================== Fullscreen banner ==================== */}
      <section
        id="home-hero"
        className="relative min-h-[100svh] flex flex-col overflow-hidden bg-fg"
      >
        {HERO_BACKGROUNDS.map((bg, i) => (
          <div
            key={bg}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[1500ms] ${
              i === slide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${bg})` }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/65" />

        <div className="relative flex-1 flex flex-col items-center justify-center text-center px-4 pt-24 pb-10">
          <img
            src="/images/logo.png"
            alt="Epoch MC"
            className="w-full max-w-[280px] sm:max-w-[420px] h-auto object-contain drop-shadow-lg"
          />
          <h1 className="mt-6 text-3xl sm:text-5xl font-bold text-white tracking-tight drop-shadow-md">
            以地球为棋盘，开创属于你的帝国
          </h1>
          <p className="mt-4 max-w-2xl text-sm sm:text-base text-white/85 leading-relaxed">
            真实地球地图上的国战服务器。建国立政、扩张领土、纵横捭阖，从一片疆土开始你的大国崛起。
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {['真实地球', '国战外交', '经济博弈'].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 text-xs sm:text-sm font-semibold text-white bg-black/60 backdrop-blur rounded-[4px] border border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/join"
              className="inline-flex items-center gap-2 px-7 py-3 bg-white text-[#24252C] font-semibold text-sm border border-white hover:bg-transparent hover:text-white active:scale-[0.97] transition-all"
            >
              立即加入
              <ArrowRight size={16} weight="bold" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-7 py-3 text-white/90 font-medium text-sm border border-white/60 hover:bg-white hover:text-[#24252C] active:scale-[0.97] transition-all"
            >
              了解更多
            </Link>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="relative pb-6 flex items-center justify-center gap-2">
          {HERO_BACKGROUNDS.map((_, i) => (
            <button
              key={i}
              aria-label={`slide-${i + 1}`}
              onClick={() => setSlide(i)}
              className={`h-[3px] transition-all duration-300 ${
                i === slide ? 'w-8 bg-white' : 'w-4 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
        <div className="relative pb-6 flex justify-center">
          <ArrowDown size={18} weight="bold" className="text-white/70 animate-float-down" />
        </div>
      </section>

      {/* ==================== Updates (recommend) ==================== */}
      <section className="bg-bg pt-20 sm:pt-28 pb-16 sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <ScrollReveal>
            <SectionHead
              title="最新动态"
              subtitle="UPDATES"
            />
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <div className="relative mt-8 sm:mt-10">
              <button
                onClick={() => scrollByDir(-1)}
                aria-label="prev"
                className="hidden sm:flex absolute left-0 top-[calc(50%-26px)] z-10 -translate-x-1/2 w-11 h-11 items-center justify-center rounded-full bg-bg border border-border text-fg shadow-[0_0_20px_0_rgba(0,0,0,0.07)] hover:opacity-80 transition-opacity"
              >
                <CaretLeft size={18} weight="bold" />
              </button>
              <div
                ref={sliderRef}
                className="flex gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2"
              >
                {UPDATE_ITEMS.map((item) => (
                  <Link
                    key={item.title}
                    to={item.to}
                    className="group w-[80vw] sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] shrink-0 snap-start rounded-[10px] overflow-hidden border border-border bg-surface no-underline transition-shadow hover:shadow-[0_0_20px_0_rgba(0,0,0,0.07)]"
                  >
                    <div className="aspect-[16/9] overflow-hidden">
                      <img
                        src={item.cover}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <span className="inline-block px-2 py-1 text-[11px] font-semibold text-fg bg-bg rounded-[4px]">
                        {item.tag}
                      </span>
                      <h3 className="mt-3 text-base font-semibold text-fg">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-sm text-muted leading-relaxed line-clamp-2">
                        {item.desc}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
              <button
                onClick={() => scrollByDir(1)}
                aria-label="next"
                className="hidden sm:flex absolute right-0 top-[calc(50%-26px)] z-10 translate-x-1/2 w-11 h-11 items-center justify-center rounded-full bg-bg border border-border text-fg shadow-[0_0_20px_0_rgba(0,0,0,0.07)] hover:opacity-80 transition-opacity"
              >
                <CaretRight size={18} weight="bold" />
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== Features (hero card + grid) ==================== */}
      <section className="bg-surface py-16 sm:py-24 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <ScrollReveal>
            <SectionHead
              title="服务器特色"
              subtitle="FEATURES"
              linkText="了解更多"
              linkTo="/about"
            />
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <div className="mt-8 grid sm:grid-cols-2 gap-5">
              {/* Hero card */}
              <Link
                to="/about"
                className="group relative overflow-hidden rounded-[10px] bg-bg flex flex-col justify-end min-h-[320px] sm:min-h-[420px] no-underline"
              >
                <img
                  src={HERO_BACKGROUNDS[0]}
                  alt="真实地球地图"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="relative p-6 sm:p-8">
                  <h3 className="text-xl sm:text-2xl font-semibold text-white">
                    真实地球地图
                  </h3>
                  <p className="mt-2 text-sm text-white/85 max-w-md leading-relaxed">
                    1:50 真实比例地球地图，山脉、海洋、沙漠与雨林如实呈现，你的疆域从这里丈量。
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
                    了解更多
                    <ArrowRight size={14} weight="bold" className="group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </Link>

              {/* Grid cards */}
              <div className="grid grid-rows-2 gap-5">
                {FEATURE_CARDS.map(({ icon: Icon, title, desc, to }) => (
                  <Link
                    key={title}
                    to={to}
                    className="group flex items-start gap-5 rounded-[10px] bg-bg border border-border p-5 sm:p-7 no-underline transition-shadow hover:shadow-[0_0_20px_0_rgba(0,0,0,0.07)]"
                  >
                    <span className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-surface text-fg">
                      <Icon size={24} weight="bold" />
                    </span>
                    <span>
                      <h3 className="text-base sm:text-lg font-semibold text-fg">
                        {title}
                      </h3>
                      <p className="mt-1.5 text-sm text-muted leading-relaxed">
                        {desc}
                      </p>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== Community data ==================== */}
      <section className="bg-bg py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <ScrollReveal>
            <SectionHead title="社群数据" subtitle="DATA" />
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <div className="mt-8 grid grid-cols-3 gap-4 sm:gap-5">
              {STATS.map(({ value, label, live }) => (
                <div
                  key={label}
                  className="rounded-[10px] bg-surface border border-border px-6 py-8 text-center transition-shadow hover:shadow-[0_0_20px_0_rgba(0,0,0,0.07)]"
                >
                  <div className="text-2xl sm:text-4xl font-bold text-fg tracking-tight">
                    {live ? (onlinePlayers === null ? 'unknown' : String(onlinePlayers)) : value}
                  </div>
                  <div className="mt-2 text-sm text-muted font-medium">
                    {label}
                    {live && (
                      <span
                        className="ml-1.5 inline-block w-1.5 h-1.5 rounded-full align-middle bg-fg animate-pulse"
                        title="实时获取"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== Join CTA ==================== */}
      <section className="bg-bg pb-20 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <ScrollReveal>
            <div className="rounded-[14px] bg-surface border border-border px-6 py-12 sm:py-16 text-center">
              <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-bg text-fg mb-6">
                <Users size={26} weight="bold" />
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-fg tracking-tight">
                准备好了吗？
              </h2>
              <p className="mt-3 max-w-xl mx-auto text-sm sm:text-base text-muted leading-relaxed">
                加入 QQ 群，获取整合包，与全球玩家一起开创属于你的帝国。
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link to="/join" className="btn btn-primary">
                  立即加入
                  <ArrowRight size={16} weight="bold" />
                </Link>
                <a
                  href={QQ_GROUP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                >
                  <ChatTeardropText size={16} weight="bold" />
                  加入 QQ 群聊
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
