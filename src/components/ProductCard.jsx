import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { CATEGORIES } from '../data/products.js'

const BADGE_STYLES = {
  'Best Seller': 'bg-clay text-cream',
  'Original Edition': 'bg-olive text-cream',
  'Limited Edition': 'bg-rust text-cream',
  New: 'bg-ochre text-ink',
}

function categoryLabel(value) {
  return CATEGORIES.find((c) => c.value === value)?.label || value
}

export default function ProductCard({ product }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  function handleAddToCart(e) {
    e.preventDefault()
    e.stopPropagation()
    addItem(product, product.sizes[0], 1)
    setAdded(true)
    setTimeout(() => setAdded(false), 1600)
  }

  return (
    <article className="group">
      <Link to={`/shop/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-art bg-cream-dark">
          {/*
            Real artwork photography. Files live in /public/art/ and are
            referenced from src/data/products.js as product.images[0].
          */}
          <img
            src={product.images[0]}
            alt={product.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />

          {product.badge && (
            <span
              className={`absolute top-3 left-3 rounded-full px-3 py-1 text-[11px] font-medium tracking-wide ${
                BADGE_STYLES[product.badge] || 'bg-cream text-ink'
              }`}
            >
              {product.badge}
            </span>
          )}

          {!product.available && (
            <div className="absolute inset-0 flex items-center justify-center bg-ink/40">
              <span className="rounded-full bg-cream px-4 py-1.5 text-xs font-medium text-ink">Sold</span>
            </div>
          )}
        </div>

        <div className="mt-4 flex items-start justify-between gap-3">
          <div>
            <p className="text-xs text-ink/50 mb-1">{product.artNumber}</p>
            <h3 className="font-display text-lg leading-snug group-hover:text-clay transition-colors">
              {product.title}
            </h3>
            <p className="mt-1 text-sm text-ink/60">{categoryLabel(product.category)}</p>
          </div>
          <p className="whitespace-nowrap font-body text-ink pt-1">
            ${product.price.toLocaleString()}
          </p>
        </div>
      </Link>

      <button
        onClick={handleAddToCart}
        disabled={!product.available}
        className="mt-3 w-full rounded-art bg-clay px-4 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-clay-dark disabled:cursor-not-allowed disabled:opacity-40"
      >
        {added ? 'Added to Cart ✓' : product.available ? 'Add to Cart' : 'Sold Out'}
      </button>
    </article>
  )
}