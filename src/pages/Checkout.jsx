import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import Button from '../components/Button.jsx'
import { useCart } from '../context/CartContext.jsx'
import products from '../data/products.js'

export default function Checkout() {
  const { items, subtotal } = useCart()
  const [status, setStatus] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')

  function handleSquareCheckout(e) {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    // Grab the first cart item to route to its Square link
    const primaryItem = items[0]
    const matchedProduct = products.find(
      (p) => p.id === primaryItem?.productId || p.title === primaryItem?.title
    )

    const checkoutUrl = primaryItem?.checkoutUrl || matchedProduct?.checkoutUrl

    if (checkoutUrl) {
      window.location.href = checkoutUrl
    } else {
      setStatus('error')
      setErrorMessage(
        'A checkout link could not be found for this item. Please ensure checkoutUrl is configured in products.js.'
      )
    }
  }

  if (items.length === 0) {
    return <Navigate to="/cart" replace />
  }

  return (
    <>
      <Seo title="Checkout — Jenn Earthtones" description="Complete your order securely." />

      <div className="container-art pt-14 pb-24 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12">
        <div>
          <h1 className="font-display text-4xl font-medium mb-8">Checkout</h1>

          <div className="rounded-art border border-ink/10 bg-cream-dark/40 p-8 space-y-6">
            <div>
              <h2 className="font-display text-xl mb-2 text-ink">Ready to Complete Your Purchase</h2>
              <p className="text-sm text-ink/70 leading-relaxed">
                Click below to finalize your order through our secure payment partner, Square. You will enter your delivery address and card details on their encrypted checkout page.
              </p>
            </div>

            {status === 'error' && (
              <div className="rounded-art border border-rust/30 bg-rust/5 p-4 text-sm text-rust">
                {errorMessage}
              </div>
            )}

            <Button
              type="button"
              size="lg"
              fullWidth
              disabled={status === 'loading'}
              onClick={handleSquareCheckout}
            >
              {status === 'loading' ? 'Redirecting to Square…' : 'Proceed to Secure Checkout'}
            </Button>

            <p className="text-xs text-ink/45 text-center">
              Payments are encrypted and processed securely by Square. Jenn Earthtones never stores your card information.
            </p>
          </div>
        </div>

        <aside className="h-fit rounded-art bg-cream-dark p-7">
          <h2 className="font-display text-xl mb-6">Order Summary</h2>
          <ul className="space-y-4 mb-6">
            {items.map((item) => (
              <li key={item.key || item.productId} className="flex justify-between text-sm">
                <span className="text-ink/70">
                  {item.title} <span className="text-ink/40">× {item.quantity}</span>
                  <br />
                  <span className="text-ink/40 text-xs">{item.size?.label || 'Original Artwork'}</span>
                </span>
                <span className="whitespace-nowrap">
                  ${((item.size?.price || item.price || 0) * item.quantity).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
          <div className="border-t border-ink/10 pt-4 flex justify-between font-medium">
            <span>Subtotal</span>
            <span>${subtotal.toLocaleString()}</span>
          </div>
          <p className="text-xs text-ink/50 mt-2">Shipping and sales tax calculated at payment.</p>
          <Link to="/cart" className="mt-6 block text-center text-sm text-ink/60 hover:text-clay transition-colors">
            Back to cart
          </Link>
        </aside>
      </div>
    </>
  )
}