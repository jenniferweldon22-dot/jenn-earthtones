import React from 'react'
import { Link } from 'react-router-dom'

const VARIANTS = {
  primary: 'bg-clay text-cream hover:bg-clay-dark',
  secondary: 'bg-transparent text-ink border border-ink/30 hover:border-ink hover:bg-ink hover:text-cream',
  ghost: 'bg-transparent text-ink hover:text-clay underline underline-offset-4 decoration-1',
  light: 'bg-cream text-ink hover:bg-white',
}

const SIZES = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

export default function Button({
  children,
  to,
  href,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  fullWidth = false,
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-art font-body font-medium tracking-wide transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed ${VARIANTS[variant]} ${SIZES[size]} ${fullWidth ? 'w-full' : ''} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noreferrer">
        {children}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  )
}
