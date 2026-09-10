import React from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import Button from '../components/Button.jsx'
import { useCart } from '../context/CartContext.jsx'

export default function Cart() {
  const { items, subtotal, updateQuantity, removeItem } = useCart()

  return (
    <>
      <Seo title="Your Cart — Jenn Earthtones" description="Review the artwork in your cart before checkout." />

      <div className="container-art pt-14 pb-24">
        <h1 className="font-display text-4xl sm:text-5xl font-medium mb-10">Your Cart</h1>

        {items.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-lg text-ink/60 mb-6">Your cart is empty — let's fix that.</p>
            <Button to="/shop">Browse the Collection</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12">
            <ul className="divide-y divide-ink/10 border-y border-ink/10">
              {items.map((item) => (
                <li key={item.key} className="flex gap-5 py-6">
                  <Link to={`/shop/${item.slug}`} className="relative w-24 h-28 sm:w-28 sm:h-32 shrink-0 overflow-hidden rounded-art bg-cream-dark">
                    {item.image ? (
                      <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                    ) : (
                      <span className="absolute inset-0" style={{ backgroundColor: item.palette?.[0] || '#EFE6D6' }} />
                    )}
                  </Link>

                  <div className="flex flex-1 flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <Link to={`/shop/${item.slug}`} className="font-display text-lg hover:text-clay transition-colors">
                        {item.title}
                      </Link>
                      <p className="text-sm text-ink/50 mt-1">{item.size.label}</p>
                      <button
                        onClick={() => removeItem(item.key)}
                        className="mt-2 text-sm text-rust underline underline-offset-4 hover:text-rust/80"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="inline-flex items-center rounded-art border border-ink/20">
                        <button
                          onClick={() => updateQuantity(item.key, item.quantity - 1)}
                          className="px-3 py-1.5 text-lg hover:text-clay transition-colors"
                          aria-label={`Decrease quantity of ${item.title}`}
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.key, item.quantity + 1)}
                          className="px-3 py-1.5 text-lg hover:text-clay transition-colors"
                          aria-label={`Increase quantity of ${item.title}`}
                        >
                          +
                        </button>
                      </div>
                      <p className="w-20 text-right font-medium">
                        ${(item.size.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <aside className="h-fit rounded-art bg-cream-dark p-7">
              <h2 className="font-display text-xl mb-6">Order Summary</h2>
              <div className="flex justify-between text-ink/70 mb-2">
                <span>Subtotal</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
              <p className="text-sm text-ink/50 mb-6">Shipping and taxes calculated at checkout.</p>
              <Button to="/checkout" fullWidth size="lg">Proceed to Checkout</Button>
              <Link to="/shop" className="mt-4 block text-center text-sm text-ink/60 hover:text-clay transition-colors">
                Continue shopping
              </Link>
            </aside>
          </div>
        )}
      </div>
    </>
  )
}