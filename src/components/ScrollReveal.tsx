import { useEffect, useRef, type ReactNode } from 'react'

export function useScrollReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('reveal-visible')
          el.classList.remove('reveal-hidden')
          observer.unobserve(el)
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return ref
}

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
}: ScrollRevealProps) {
  const ref = useScrollReveal()

  return (
    <div
      ref={ref}
      className={`reveal-hidden ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
