const MAP_URL = 'http://map.epochmc.cn/'

export default function SatelliteMap() {
  return (
    <div className="pt-16">
      <iframe
        src={MAP_URL}
        className="w-full h-[calc(100svh-4rem)] border-0"
        title="卫星地图"
        allowFullScreen
      />
    </div>
  )
}
