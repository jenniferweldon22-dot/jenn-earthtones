import React from 'react'

export function TikTokIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M14.5 3c.4 2.2 1.9 3.7 4.2 3.9v3c-1.5 0-2.9-.5-4.1-1.4v6.6a5.1 5.1 0 1 1-4.4-5.1v3.1a2.1 2.1 0 1 0 1.5 2V3h2.8Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function PinterestIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M9.5 18c.4-1.6 1.1-4.3 1.5-6a2.6 2.6 0 0 1-.2-1.1c0-1 .6-1.8 1.4-1.8.6 0 1 .5 1 1.1 0 .7-.4 1.7-.7 2.6-.2.8.4 1.4 1.1 1.4 1.4 0 2.3-1.7 2.3-3.8 0-1.6-1.1-2.8-3-2.8-2.2 0-3.6 1.6-3.6 3.4 0 .6.2 1.1.5 1.4.1.1.1.2.1.3l-.2.9c0 .1-.1.2-.3.1-1-.4-1.6-1.7-1.6-2.8 0-2.3 1.9-4.9 5.3-4.9 2.8 0 4.9 2 4.9 4.5 0 2.7-1.6 4.9-4 4.9-.8 0-1.5-.4-1.8-.9l-.5 1.9c-.2.7-.6 1.6-.9 2.1"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const SOCIAL_LINKS = [
  { label: 'TikTok', href: 'https://www.tiktok.com/@jenn.earthtones', Icon: TikTokIcon },
  { label: 'Pinterest', href: 'https://www.pinterest.com/jennwebstudio', Icon: PinterestIcon },
]