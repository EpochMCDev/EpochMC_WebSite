import { Link } from 'react-router-dom'
import { Buildings, Globe, Star, Rocket, ArrowRight } from '@phosphor-icons/react'
import ScrollReveal from '../components/ScrollReveal'
import SectionHead from '../components/SectionHead'

// Placeholder stats; replace with real numbers.
const ABOUT_STATS = [
  { value: '12+', label: '领土国家' },
  { value: '3+', label: '长期存档' },
  { value: '40+', label: '平均在线' },
]

const IDEA_CARDS = [
  {
    title: '社群理念',
    sub: 'VISION',
    desc: '开放、公平、精彩。无论你是运筹帷幄的领袖，还是逐鹿沙场的将领，都能在这里找到属于你的舞台。',
    icon: Star,
  },
  {
    title: '未来展望',
    sub: 'FUTURE',
    desc: '持续优化国战与外交机制，推出更多国际组织与事件，让世界格局因你而改变。',
    icon: Rocket,
  },
]

export default function About() {
  return (
    <>
      {/* Page head */}
      <section className="bg-bg pt-32 sm:pt-36 pb-10 sm:pb-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <p className="text-xs font-medium tracking-[0.18em] text-faint">ABOUT US</p>
          <h1 className="mt-3 text-3xl sm:text-4xl font-bold text-fg tracking-tight">
            关于我们
          </h1>
          <p className="mt-4 text-sm sm:text-base text-muted leading-relaxed">
            EpochMC 是一款以真实地球为地图的国战服务器。在这里，疆域、战争与外交，都由玩家亲手书写。
          </p>
        </div>
      </section>

      {/* Story blocks */}
      <section className="bg-bg pb-16 sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 space-y-16 sm:space-y-24">
          <ScrollReveal>
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <SectionHead title="我们是谁" subtitle="ABOUT" />
                <p className="mt-6 text-sm sm:text-base text-muted leading-relaxed">
                  EpochMC 由一群热爱国战与外交博弈的玩家共同运营，以 1:50 真实地球地图为舞台，见证一个个国家的兴起与沉浮。
                </p>
                <p className="mt-4 text-sm sm:text-base text-muted leading-relaxed">
                  我们注重规则与公平，完善的领土、战争与经济机制，让每一场博弈都有章可循。
                </p>
                <Link to="/join" className="btn mt-8">
                  立即加入
                  <ArrowRight size={16} weight="bold" />
                </Link>
              </div>
              <div className="rounded-[14px] bg-surface border border-border p-8 sm:p-10">
                <span className="flex items-center justify-center w-16 h-16 rounded-full bg-bg text-fg mb-6">
                  <Buildings size={30} weight="bold" />
                </span>
                <p className="text-2xl sm:text-3xl font-semibold text-fg tracking-tight leading-snug">
                  “开放、公平、精彩。无论你是运筹帷幄的领袖，还是逐鹿沙场的将领，都能在这里找到属于你的舞台。”
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="order-2 lg:order-1 rounded-[14px] overflow-hidden border border-border bg-surface">
                <img
                  src="/images/hero/bg1.webp"
                  alt="我们的世界"
                  className="w-full h-64 sm:h-80 object-cover"
                />
              </div>
              <div className="order-1 lg:order-2">
                <SectionHead title="我们的世界" subtitle="WORLD" />
                <p className="mt-6 text-sm sm:text-base text-muted leading-relaxed">
                  基于真实地形数据生成的地球地图，山脉、海洋、沙漠与雨林一一呈现。你的国家将从哪片大陆崛起，由你决定。
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <span className="flex items-center justify-center w-11 h-11 rounded-full bg-surface text-fg">
                    <Globe size={22} weight="bold" />
                  </span>
                  <span className="text-sm font-semibold text-fg">1:50</span>
                  <span className="text-sm text-faint">/</span>
                  <span className="text-sm text-muted">真实地球地图</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <div className="grid sm:grid-cols-2 gap-5">
              {IDEA_CARDS.map(({ icon: Icon, title, sub, desc }) => (
                <div
                  key={title}
                  className="rounded-[14px] bg-surface border border-border p-7 sm:p-9 transition-shadow hover:shadow-[0_0_20px_0_rgba(0,0,0,0.07)]"
                >
                  <span className="flex items-center justify-center w-12 h-12 rounded-full bg-bg text-fg mb-5">
                    <Icon size={24} weight="bold" />
                  </span>
                  <p className="text-[11px] font-medium tracking-[0.18em] text-faint">{sub}</p>
                  <h2 className="mt-1.5 text-xl font-semibold text-fg">{title}</h2>
                  <p className="mt-3 text-sm sm:text-base text-muted leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
