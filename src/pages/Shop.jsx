import React, { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import { CATEGORIES, PRODUCTS } from '../data/products.js'

const SORTS = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
]

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const category = searchParams.get('category') || 'all'
  const sort = searchParams.get('sort') || 'newest'

  function setParam(key, value) {
    const next = new URLSearchParams(searchParams)
    if (value === 'all' || !value) next.delete(key)
    else next.set(key, value)
    setSearchParams(next, { replace: true })
  }

  const products = useMemo(() => {
    let list = PRODUCTS.filter((p) => category === 'all' || p.category === category)

    switch (sort) {
      case 'price-asc':
        list = [...list].sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        list = [...list].sort((a, b) => b.price - a.price)
        break
      default:
        list = [...list].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    }
    return list
  }, [category, sort])

  return (
    <>
      <Seo
        title="Shop Original Artwork — Jenn Earthtones"
        description="Browse original abstract paintings and fine art prints in warm, earthy colors. Filter by category and sort by price or newest arrivals."
      />

      <header className="container-art pt-14 pb-10">
        <p className="text-sm text-clay font-medium mb-3">The collection</p>
        <h1 className="font-display text-4xl sm:text-5xl font-medium">Shop Artwork</h1>
        <p className="mt-4 max-w-xl text-lg text-ink/70">
          Original paintings and fine art prints, each made by hand in the studio.
        </p>
      </header>

      <div className="container-art pb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-b border-ink/10">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.value}
              onClick={() => setParam('category', c.value)}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                category === c.value
                  ? 'border-clay bg-clay text-cream'
                  : 'border-ink/20 text-ink/70 hover:border-ink'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-3 text-sm text-ink/70">
          Sort
          <select
            value={sort}
            onChange={(e) => setParam('sort', e.target.value)}
            className="rounded-art border border-ink/20 bg-cream px-3 py-2 text-sm text-ink focus:border-clay focus:outline-none"
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="container-art py-14">
        <p className="mb-8 text-sm text-ink/50">
          {products.length} piece{products.length === 1 ? '' : 's'}
        </p>
        <ProductGrid products={products} />
      </div>
    </>
  )
}
