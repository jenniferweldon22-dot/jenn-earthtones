import React, { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import Button from '../components/Button.jsx'
import Section, { SectionHeading } from '../components/Section.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import { useCart } from '../context/CartContext.jsx'
import { getProductBySlug, getRelatedProducts } from '../data/products.js'
import NotFound from './NotFound.jsx'

const BADGE_STYLES = {
  'Best Seller': 'bg-clay text-cream',
  'Original Edition': 'bg-olive text-cream',
  'Limited Edition': 'bg-rust text-cream',
  New: 'bg-ochre text-ink',
}

export default function ProductDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCart()
  const product = getProductBySlug(slug)

  const [sizeIndex, setSizeIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  const related = useMemo(() => (product ? getRelatedProducts(product) : []), [product])

  if (!product) return <NotFound />

  const size = product.sizes[sizeIndex]

  function handleAddToCart() {
    addItem(product, size, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2200)
  }

  function handleBuyNow() {
    addItem(product, size, quantity)
    navigate('/checkout')
  }

  return (
    <>
      <Seo title={`${product.title} — Jenn Earthtones`} description={product.description} />

      {/* Structured data for search engines */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: product.title,
          description: product.description,
          category: product.category,
          image: product.images?.[0],
          offers: {
            '@type': 'Offer',
            price: size.price,
            priceCurrency: 'USD',
            availability: product.available
              ? 'https://schema.org/InStock'
              : 'https://schema.org/SoldOut',
          },
        })}
      </script>

      <div className="container-art pt-8 pb-4 text-sm text-ink/50">
        <Link to="/shop" className="hover:text-clay transition-colors">Shop</Link>
        <span className="mx-2">/</span>
        <span className="text-ink/70">{product.title}</span>
      </div>

      <div className="container-art pb-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* FRAMED IMAGE PREVIEW */}
        <div className="relative">
          <div className="relative rounded-art bg-cream-dark p-3 sm:p-5 shadow-[0_25px_50px_-25px_rgba(51,40,33,0.4)]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1px] ring-1 ring-ink/10">
              <img src={product.images[0]} alt={product.title} className="h-full w-full object-cover" />
            </div>
          </div>

          {product.badge && (
            <span
              className={`absolute top-6 left-6 rounded-full px-3 py-1.5 text-xs font-medium tracking-wide ${
                BADGE_STYLES[product.badge] || 'bg-cream text-ink'
              }`}
            >
              {product.badge}
            </span>
          )}
          {!product.available && (
            <span className="absolute top-6 right-6 rounded-full bg-ink/80 px-4 py-1.5 text-xs font-medium text-cream">
              Sold
            </span>
          )}
        </div>

        {/* DETAILS */}
        <div className="lg:pt-4">
          <p className="text-sm text-ink/50 mb-2">{product.artNumber} · {product.medium}</p>
          <h1 className="font-display text-3xl sm:text-4xl font-medium leading-tight">{product.title}</h1>
          <p className="mt-4 text-2xl text-clay font-medium">${size.price.toLocaleString()}</p>

          <p className="mt-6 text-lg text-ink/70 leading-relaxed">{product.description}</p>

          {/* Dimension selector */}
          {product.sizes.length > 1 && (
            <div className="mt-8">
              <p className="text-sm font-medium text-ink mb-3">Dimensions</p>
              <div className="flex flex-col gap-2">
                {product.sizes.map((s, i) => (
                  <button
                    key={s.label}
                    onClick={() => setSizeIndex(i)}
                    className={`flex items-center justify-between rounded-art border px-4 py-3 text-sm text-left transition-colors ${
                      sizeIndex === i ? 'border-clay bg-clay/5' : 'border-ink/15 hover:border-ink/40'
                    }`}
                  >
                    <span>{s.label}</span>
                    <span className="text-ink/60">${s.price.toLocaleString()}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
          {product.sizes.length === 1 && (
            <p className="mt-6 text-sm text-ink/60">Dimensions: {product.dimensions}</p>
          )}

          {/* Quantity */}
          <div className="mt-8">
            <p className="text-sm font-medium text-ink mb-3">Quantity</p>
            <div className="inline-flex items-center rounded-art border border-ink/20">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-4 py-2 text-lg hover:text-clay transition-colors"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="w-10 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-4 py-2 text-lg hover:text-clay transition-colors"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          {/* Purchase CTA */}
          <div className="mt-9 flex flex-col sm:flex-row gap-3">
            <Button onClick={handleAddToCart} disabled={!product.available} size="lg" fullWidth>
              {added ? 'Added to cart ✓' : product.available ? 'Add to Cart' : 'Sold Out'}
            </Button>
            {product.available && (
              <Button onClick={handleBuyNow} size="lg" variant="secondary" fullWidth>
                Buy Now
              </Button>
            )}
          </div>

          {/* Details */}
          <div className="mt-12 space-y-6 border-t border-ink/10 pt-8">
            <div>
              <h2 className="font-display text-lg mb-2">Details</h2>
              {product.details.map((p, i) => (
                <p key={i} className="text-ink/70 leading-relaxed mb-3 last:mb-0">{p}</p>
              ))}
            </div>
            <div>
              <h2 className="font-display text-lg mb-2">Shipping</h2>
              <p className="text-ink/70 leading-relaxed">
                Originals and relief pieces ship in a custom crate within 5–7 business
                days, carefully packed and fully insured. Prints ship flat or rolled
                within 2–3 business days. Domestic shipping is calculated at checkout;
                international shipping is available to most countries.
              </p>
            </div>
            <div>
              <h2 className="font-display text-lg mb-2">Returns</h2>
              <p className="text-ink/70 leading-relaxed">
                If a piece doesn't feel right in your space, you can return it within 14
                days of delivery for a full refund, minus shipping. Please keep original
                packaging in case a return is needed.
              </p>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <Section tone="creamDark">
          <SectionHeading eyebrow="You might also like" title="Related artwork" />
          <ProductGrid products={related} columns={4} />
        </Section>
      )}
    </>
  )
}