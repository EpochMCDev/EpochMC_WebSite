import { Link } from 'react-router-dom'
import { ArrowRight } from '@phosphor-icons/react'

interface SectionHeadProps {
  title: string
  subtitle?: string
  linkText?: string
  linkTo?: string
  className?: string
}

export default function SectionHead({
  title,
  subtitle,
  linkText,
  linkTo,
  className = '',
}: SectionHeadProps) {
  return (
    <div className={`part-head ${className}`}>
      <div>
        <h2 className="part-title">{title}</h2>
        {subtitle && <p className="part-subtitle">{subtitle}</p>}
      </div>
      {linkText && linkTo && (
        <Link to={linkTo} className="part-link">
          {linkText}
          <ArrowRight size={14} weight="bold" />
        </Link>
      )}
    </div>
  )
}
