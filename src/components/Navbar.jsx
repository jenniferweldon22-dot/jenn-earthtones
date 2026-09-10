import React, { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { SOCIAL_LINKS } from './icons/SocialIcons.jsx'

const LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [badgeBump, setBadgeBump] = useState(false)
  const { itemCount } = useCart()
  const prevItemCount = useRef(itemCount)
  const location = useLocation()

  useEffect(() => setOpen(false), [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Bounce the cart badge briefly whenever the count goes up (not on
  // page load, and not when an item is removed/decreased).
  useEffect(() => {
    if (itemCount > prevItemCount.current) {
      setBadgeBump(true)
      const t = setTimeout(() => setBadgeBump(false), 400)
      prevItemCount.current = itemCount
      return () => clearTimeout(t)
    }
    prevItemCount.current = itemCount
  }, [itemCount])

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? 'bg-cream/95 backdrop-blur-sm shadow-[0_1px_0_0_rgba(51,40,33,0.08)]' : 'bg-cream/0'
      }`}
    >
      <nav className="container-art flex items-center justify-between py-5" aria-label="Main">
        <NavLink to="/" className="font-display text-xl sm:text-2xl tracking-tight text-ink">
          Jenn <span className="text-clay">EARTH</span>tones
        </NavLink>

        <ul className="hidden md:flex items-center gap-9 font-body text-[15px]">
          {LINKS.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `relative pb-1 transition-colors duration-200 ${
                    isActive ? 'text-clay' : 'text-ink hover:text-clay'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-5">
          {/* Social icon links, opens in a new tab */}
          <div className="hidden md:flex items-center gap-4">
            {SOCIAL_LINKS.map(({ label, href, Icon }) => {
              return (
                  <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Jenn Earthtones on ${label} (opens in a new tab)`}
                  className="text-ink/70 hover:text-clay transition-colors"
                >
                  <Icon />
                </a>
              )
            })}
          </div>

          <NavLink
            to="/cart"
            aria-label={`Cart, ${itemCount} item${itemCount === 1 ? '' : 's'}`}
            className="relative hidden md:inline-flex items-center gap-2 text-ink hover:text-clay transition-colors"
          >
            <CartIcon />
            {itemCount > 0 && (
              <span
                className={`absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-clay text-[11px] font-medium text-cream ${
                  badgeBump ? 'animate-pop' : ''
                }`}
              >
                {itemCount}
              </span>
            )}
          </NavLink>

          <button
            className="md:hidden inline-flex items-center justify-center p-2 text-ink"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden border-t border-ink/10 bg-cream">
          <ul className="container-art flex flex-col py-4 font-body text-lg">
            {LINKS.map((link) => (
              <li key={link.to} className="border-b border-ink/10 last:border-none">
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `block py-4 ${isActive ? 'text-clay' : 'text-ink'}`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink to="/cart" className="flex items-center justify-between py-4">
                <span>Cart</span>
                <span className="text-sm text-ink/60">{itemCount} item{itemCount === 1 ? '' : 's'}</span>
              </NavLink>
            </li>
          </ul>

          <div className="container-art flex items-center gap-5 pb-6">
            {SOCIAL_LINKS.map(({ label, href, Icon }) => {
              return (
                  <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Jenn Earthtones on ${label} (opens in a new tab)`}
                  className="text-ink/70 hover:text-clay transition-colors"
                >
                  <Icon className="h-5 w-5" />
                </a>
              )
            })}
          </div>
        </div>
      )}
    </header>
  )
}

function CartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 7h16l-1.5 11a2 2 0 0 1-2 1.8H7.5a2 2 0 0 1-2-1.8L4 7Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 7V5.5a4 4 0 0 1 8 0V7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  )
}