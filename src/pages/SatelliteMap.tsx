import { Link } from 'react-router-dom'
import { ArrowLeft, MapTrifold } from '@phosphor-icons/react'

const MAP_URL = 'http://map.epochmc.cn/'

export default function SatelliteMap() {
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
            <MapTrifold size={18} weight="bold" />
            卫星地图
          </span>
        </div>
        <div className="w-full h-[calc(100vh-190px)] min-h-[480px] rounded-[14px] overflow-hidden border border-border bg-surface">
          <iframe
            src={MAP_URL}
            className="w-full h-full border-0"
            title="卫星地图"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  )
}
