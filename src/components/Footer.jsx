import React from 'react'
import { Link } from 'react-router-dom'
import Newsletter from './Newsletter.jsx'
import { SOCIAL_LINKS } from './icons/SocialIcons.jsx'

export default function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="container-art py-16 grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-12">
        <div>
          <Link to="/" className="font-display text-xl">
            Jenn <span className="text-ochre">EARTH</span>tones
          </Link>
          <p className="mt-4 max-w-xs text-sm text-cream/60 leading-relaxed">
            An independent art studio painting colorful, earthy abstract work for homes that
            like to be lived in.
          </p>

          <div className="mt-6 flex items-center gap-4">
            {SOCIAL_LINKS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Jenn Earthtones on ${label} (opens in a new tab)`}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 text-cream/80 transition-colors hover:border-cream hover:text-cream"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-cream/90 mb-4">Shop</h4>
          <ul className="space-y-3 text-sm text-cream/60">
            <li><Link to="/shop" className="hover:text-cream transition-colors">All Artwork</Link></li>
            <li><Link to="/shop?category=originals" className="hover:text-cream transition-colors">Originals</Link></li>
            <li><Link to="/shop?category=prints" className="hover:text-cream transition-colors">Prints</Link></li>
            <li><Link to="/cart" className="hover:text-cream transition-colors">Cart</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-medium text-cream/90 mb-4">Studio</h4>
          <ul className="space-y-3 text-sm text-cream/60">
            <li><Link to="/about" className="hover:text-cream transition-colors">About Jenn</Link></li>
            <li><Link to="/contact" className="hover:text-cream transition-colors">Contact</Link></li>
            {SOCIAL_LINKS.map(({ label, href }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer" className="hover:text-cream transition-colors">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-medium text-cream/90 mb-4">Stay in the loop</h4>
          <Newsletter tone="dark" />
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="container-art py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream/40">
          <p>© {new Date().getFullYear()} Jenn Earthtones. All rights reserved.</p>
          <p>Original art, made by hand, shipped with care.</p>
        </div>
      </div>
    </footer>
  )
}