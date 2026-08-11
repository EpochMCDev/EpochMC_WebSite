import type { CSSProperties } from 'react'

interface SkeletonProps {
  className?: string
  style?: CSSProperties
}

export default function Skeleton({ className = '', ...props }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded-md bg-surface ${className}`}
      {...props}
    />
  )
}

export function SkeletonLine({ width = '100%' }: { width?: string }) {
  return <Skeleton style={{ width }} className="h-4" />
}

export function SkeletonBlock({ height = '200px' }: { height?: string }) {
  return <Skeleton style={{ height }} className="w-full" />
}
