import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

/**
 * "Added to cart" toast — mounted once, globally, in App.jsx.
 *
 * It reads `toast` from CartContext, which CartContext.addItem() sets
 * automatically and clears after ~3 seconds. This component doesn't touch
 * routing, doesn't reload anything, and doesn't block interaction with the
 * rest of the page (the outer wrapper is pointer-events-none; only the
 * toast pill itself is clickable).
 *
 * `lastToast` keeps the last message around for the duration of the
 * fade-out transition — CartContext sets `toast` to null immediately, but
 * we still want ~300ms to animate out smoothly instead of popping away.
 */
export default function Toast() {
  const { toast, dismissToast } = useCart()
  const [lastToast, setLastToast] = useState(null)

  useEffect(() => {
    if (toast) setLastToast(toast)
  }, [toast])

  const visible = Boolean(toast)

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-6 z-[60] flex justify-center px-4 sm:bottom-8"
    >
      <div
        className={`pointer-events-auto flex items-center gap-3 rounded-art bg-ink px-5 py-3.5 text-cream shadow-[0_20px_40px_-15px_rgba(51,40,33,0.5)] transition-all duration-300 ease-out ${
          visible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
        }`}
      >
        {lastToast && (
          <>
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-olive text-xs text-cream">
              ✓
            </span>
            <p className="text-sm leading-snug">
              <span className="font-medium">{lastToast.title}</span> added to your cart
            </p>
            <Link
              to="/cart"
              onClick={dismissToast}
              className="ml-1 shrink-0 whitespace-nowrap text-sm font-medium text-ochre underline underline-offset-4 hover:text-ochre-light"
            >
              View Cart
            </Link>
            <button
              onClick={dismissToast}
              aria-label="Dismiss notification"
              className="ml-1 shrink-0 text-cream/50 transition-colors hover:text-cream"
            >
              ×
            </button>
          </>
        )}
      </div>
    </div>
  )
}