import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Join from './pages/Join'
import Event from './pages/Event'
import SatelliteMap from './pages/SatelliteMap'
import Stock from './pages/Stock'
import Versions from './pages/Versions'

function ScrollToTop() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  return null
}

function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="text-8xl font-bold text-faint select-none tracking-tight">404</div>
      <p className="mt-4 text-lg font-semibold text-fg">这片领土尚未被征服...</p>
      <p className="mt-1 text-sm text-muted">你访问的页面不存在，也许它还在等待被你占领</p>
      <Link to="/" className="btn btn-primary mt-8">
        返回首页
      </Link>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-bg">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/join" element={<Join />} />
            <Route path="/event" element={<Event />} />
            <Route path="/satellite" element={<SatelliteMap />} />
            <Route path="/stock" element={<Stock />} />
            <Route path="/versions" element={<Versions />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
