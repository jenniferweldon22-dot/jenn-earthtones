import React from 'react'
import ProductCard from './ProductCard.jsx'

export default function ProductGrid({ products, columns = 3 }) {
  const colClasses = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-2 lg:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-4',
  }

  if (!products || products.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="font-display text-xl text-ink/70">No artwork found.</p>
        <p className="mt-2 text-ink/50">Try a different filter or check back soon — new pieces are added often.</p>
      </div>
    )
  }

  return (
    <div className={`grid grid-cols-1 gap-x-8 gap-y-14 ${colClasses[columns]}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
