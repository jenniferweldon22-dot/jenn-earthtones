import React from 'react'

export default function Section({
  children,
  className = '',
  tone = 'cream',
  narrow = false,
  as: Tag = 'section',
}) {
  const tones = {
    cream: 'bg-cream',
    dark: 'bg-ink text-cream',
    olive: 'bg-olive text-cream',
    creamDark: 'bg-cream-dark',
  }

  return (
    <Tag className={`${tones[tone]} py-20 sm:py-28 ${className}`}>
      <div className={`container-art ${narrow ? 'max-w-3xl' : ''}`}>{children}</div>
    </Tag>
  )
}

export function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  return (
    <div className={`mb-12 ${align === 'center' ? 'text-center mx-auto max-w-2xl' : 'max-w-2xl'}`}>
      {eyebrow && (
        <p className="mb-3 text-sm text-clay font-medium">{eyebrow}</p>
      )}
      <h2 className="text-3xl sm:text-4xl font-display font-medium leading-tight">{title}</h2>
      {description && <p className="mt-4 text-ink-light/80 text-lg leading-relaxed">{description}</p>}
    </div>
  )
}
