import { Link } from 'react-router-dom'
import { ArrowLeft, ChartLineUp } from '@phosphor-icons/react'

const STOCK_URL = 'http://epochearth.cn:54754/'

export default function Stock() {
  return (
    <div className="min-h-screen bg-bg pt-24 sm:pt-28 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between gap-3 mb-5">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted hover:text-fg border border-border rounded-[4px] hover:bg-surface transition-colors"
          >
            <ArrowLeft size={15} weight="bold" />
            返回首页
          </Link>
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-fg">
            <ChartLineUp size={18} weight="bold" />
            国家股市
          </span>
        </div>
        <div className="w-full h-[calc(100vh-190px)] min-h-[480px] rounded-[14px] overflow-hidden border border-border bg-surface">
          <iframe
            src={STOCK_URL}
            className="w-full h-full border-0"
            title="国家股市"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  )
}
