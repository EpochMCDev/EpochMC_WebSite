const STOCK_URL = 'http://epochearth.cn:54754/'

export default function Stock() {
  return (
    <div className="pt-16">
      <iframe
        src={STOCK_URL}
        className="w-full h-[calc(100svh-4rem)] border-0"
        title="国家股市"
        allowFullScreen
      />
    </div>
  )
}
