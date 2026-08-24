import { useState } from 'react'
import {
  ChatTeardropText,
  Article,
  Play,
  Desktop,
  Gear,
  User,
  Cpu,
  DeviceMobileCamera,
  Copy,
} from '@phosphor-icons/react'
import ScrollReveal from '../components/ScrollReveal'
import SectionHead from '../components/SectionHead'

const QQ_GROUP_URL = 'https://qm.qq.com/q/M2NJEm15uc'

const STEPS = [
  {
    step: '01',
    title: '加入 QQ 群',
    desc: '点击下方按钮加入 QQ 群 1043737743，获取最新通知与入服资讯。',
    icon: ChatTeardropText,
  },
  {
    step: '02',
    title: '获取整合包',
    desc: '在群文件中下载官方整合包，按照说明完成安装与配置。',
    icon: Article,
  },
  {
    step: '03',
    title: '进入游戏',
    desc: '启动整合包，连接服务器，开启属于你的国战征程。',
    icon: Play,
  },
]

const SERVER_INFO = [
  { icon: Desktop, label: '游戏版本', value: '26.2' },
  {
    icon: Gear,
    label: '核心框架',
    value: 'EpochCore (Leaf)',
    link: 'https://github.com/EpochMCDev/EpochCore_26.2',
  },
  { icon: User, label: 'QQ 群号', value: '1043737743', copyable: true },
]

const HARDWARE = [
  { icon: Cpu, label: '处理器', value: 'Intel i7-14700K' },
  { icon: DeviceMobileCamera, label: '内存', value: '128GB' },
]

const FAQS = [
  {
    q: '需要正版 Minecraft 才能加入吗？',
    a: '不需要，服务器支持离线登录，没有正版账号也可以正常游玩。',
  },
  {
    q: '什么是国战服？',
    a: '以 1:50 真实地球为地图，玩家可以建国圈地、宣战结盟、发展经济与股市，通过战争与外交重塑世界格局。',
  },
  {
    q: '服务器有哪些规则？',
    a: '主要包括：禁止作弊与恶意破坏、尊重他人建筑、遵守国战与外交规则。详细规则将在 QQ 群内公布。',
  },
  {
    q: '整合包在哪里获取？',
    a: '加入 QQ 群后，在群文件中即可下载官方整合包，拖入启动器即可',
  },
]

function showToast(message: string) {
  const el = document.createElement('div')
  el.textContent = message
  el.className =
    'fixed bottom-6 left-1/2 -translate-x-1/2 bg-primary text-on-primary text-sm font-medium px-5 py-2.5 rounded-[6px] z-50'
  document.body.appendChild(el)
  setTimeout(() => el.remove(), 2000)
}

function copyToClipboard(text: string, label: string) {
  navigator.clipboard.writeText(text).then(
    () => showToast(`已复制${label}: ${text}`),
    () => showToast('复制失败，请手动复制')
  )
}

export default function Join() {
  return (
    <>
      {/* Page head */}
      <section className="bg-bg pt-32 sm:pt-36 pb-10 sm:pb-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <p className="text-xs font-medium tracking-[0.18em] text-faint">JOIN US</p>
          <h1 className="mt-3 text-3xl sm:text-4xl font-bold text-fg tracking-tight">
            加入服务器
          </h1>
          <p className="mt-4 text-sm sm:text-base text-muted leading-relaxed">
            几步踏上 EpochMC 的全球战场，成为世界格局的参与者与改写者。
          </p>
        </div>
      </section>

      {/* Three steps */}
      <section className="bg-bg pb-16 sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <ScrollReveal>
            <div className="grid sm:grid-cols-3 gap-5">
              {SERVER_INFO.map(({ icon: Icon, label, value, copyable, link }) => (
                  <div
                      key={label}
                      className={`rounded-[10px] bg-bg border border-border p-6 ${
                          copyable || link
                              ? 'cursor-pointer transition-shadow hover:shadow-[0_0_20px_0_rgba(0,0,0,0.07)] active:scale-[0.98]'
                              : 'transition-shadow hover:shadow-[0_0_20px_0_rgba(0,0,0,0.07)]'
                      }`}
                      onClick={() => {
                        if (copyable) copyToClipboard(value, label)
                        if (link) window.open(link, '_blank')  // 👈 就改这一行
                      }}
                      title={copyable ? `点击复制${label}` : link ? '点击访问' : undefined}
                  >
                    <div className="flex items-center justify-between">
                      <Icon size={20} weight="bold" className="text-fg" />
                      {copyable && <Copy size={14} weight="bold" className="text-faint" />}
                      {link && <span className="text-muted text-sm">||</span>}
                    </div>
                    <div className="mt-4 text-xs text-muted font-medium">{label}</div>
                    <div className="mt-1 text-base font-semibold text-fg">{value}</div>
                  </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <div className="mt-10 text-center">
              <a
                href={QQ_GROUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <ChatTeardropText size={18} weight="bold" />
                加入 QQ 群聊
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Server info */}
      <section className="bg-surface border-y border-border py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <ScrollReveal>
            <SectionHead title="服务器信息" subtitle="SERVER" />
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <div className="mt-8 grid sm:grid-cols-3 gap-5">
              {SERVER_INFO.map(({ icon: Icon, label, value, copyable }) => (
                <div
                  key={label}
                  className={`rounded-[10px] bg-bg border border-border p-6 ${
                    copyable
                      ? 'cursor-pointer transition-shadow hover:shadow-[0_0_20px_0_rgba(0,0,0,0.07)] active:scale-[0.98]'
                      : 'transition-shadow hover:shadow-[0_0_20px_0_rgba(0,0,0,0.07)]'
                  }`}
                  onClick={() => copyable && copyToClipboard(value, label)}
                  title={copyable ? `点击复制${label}` : undefined}
                >
                  <div className="flex items-center justify-between">
                    <Icon size={20} weight="bold" className="text-fg" />
                    {copyable && <Copy size={14} weight="bold" className="text-faint" />}
                  </div>
                  <div className="mt-4 text-xs text-muted font-medium">{label}</div>
                  <div className="mt-1 text-base font-semibold text-fg">{value}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={160}>
            <SectionHead className="mt-14" title="硬件配置" subtitle="HARDWARE" />
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {HARDWARE.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="rounded-[10px] bg-bg border border-border p-6 flex items-center gap-5 transition-shadow hover:shadow-[0_0_20px_0_rgba(0,0,0,0.07)]"
                >
                  <span className="flex items-center justify-center w-12 h-12 rounded-full bg-surface text-fg flex-shrink-0">
                    <Icon size={22} weight="bold" />
                  </span>
                  <div>
                    <div className="text-xs text-muted font-medium">{label}</div>
                    <div className="mt-1 text-base font-semibold text-fg">{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-bg py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <ScrollReveal>
            <SectionHead title="常见问题" subtitle="FAQ" />
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <div className="mt-8 divide-y divide-border border border-border rounded-[10px] bg-bg">
              {FAQS.map(({ q, a }) => (
                <FAQItem key={q} question={q} answer={a} />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-4.5 text-left text-sm font-semibold text-fg hover:bg-surface/60 transition-colors"
      >
        {question}
        <span
          className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full border border-border text-muted transition-transform duration-300 ${
            open ? 'rotate-45' : ''
          }`}
        >
          +
        </span>
      </button>
      {open && (
        <div className="px-6 pb-5 text-sm text-muted leading-relaxed">{answer}</div>
      )}
    </div>
  )
}
