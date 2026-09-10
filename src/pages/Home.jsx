import React from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import Button from '../components/Button.jsx'
import Section from '../components/Section.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import Newsletter from '../components/Newsletter.jsx'
import PlaceholderArt from '../components/PlaceholderArt.jsx'
import { PRODUCTS } from '../data/products.js'

const hero = PRODUCTS.find((p) => p.slug === 'sedona-sunset')

export default function Home() {
  return (
    <>
      <Seo
        title="Jenn Earthtones — Art for Colorful, Beautiful Spaces"
        description="Shop original abstract paintings, textured relief pieces, and fine art prints from Jenn Earthtones — colorful, earthy artwork made for homes that like to be lived in."
      />

      {/* HERO */}
      <section className="relative container-art grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center pt-8 pb-16 sm:pt-12 sm:pb-24 overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-ochre/25 blur-[90px]" />
        <div aria-hidden className="pointer-events-none absolute top-1/3 -right-16 w-[320px] h-[320px] rounded-full bg-clay/20 blur-[90px]" />
        <div aria-hidden className="pointer-events-none absolute bottom-0 left-1/3 w-[260px] h-[260px] rounded-full bg-olive/20 blur-[90px]" />

        <div className="relative order-2 lg:order-1 animate-reveal">
          <p className="mb-6 text-sm text-clay font-medium">Originals, textured relief &amp; fine art prints</p>
          <h1 className="font-display text-[15vw] leading-[0.95] sm:text-6xl lg:text-7xl font-medium tracking-tight">
            Art for colorful,
            <br />
            beautiful spaces.
          </h1>
          <p className="mt-6 max-w-md text-lg text-ink/70 leading-relaxed">
            I'm Jenn — I paint warm, earthy work inspired by desert light, canyon
            color, and the occasional aperitivo. Every piece is made to bring a
            little more warmth (and a little more fun) into your home.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Button to="/shop" size="lg">Shop Art</Button>
            <Button to="/about" size="lg" variant="secondary">My Story</Button>
          </div>
        </div>

        <div className="relative order-1 lg:order-2">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-art shadow-[0_30px_60px_-20px_rgba(51,40,33,0.35)]">
            <img src={hero.images[0]} alt={hero.title} className="h-full w-full object-cover" />
          </div>
          <div className="absolute -bottom-5 -left-5 hidden sm:block rounded-art bg-cream border border-ink/10 px-5 py-4 shadow-lg">
            <p className="text-xs text-ink/50">{hero.artNumber}</p>
            <p className="font-display text-lg">{hero.title}</p>
          </div>
        </div>
      </section>

      {/* CURATED GRID — all 6 pieces */}
      <Section tone="creamDark">
        <div className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="mb-3 text-sm text-clay font-medium">Fresh off the easel</p>
            <h2 className="text-3xl sm:text-4xl font-display font-medium leading-tight">
              The current collection
            </h2>
            <p className="mt-3 text-ink/70 text-lg max-w-lg">
              Six pieces, six moods — from quiet desert minimalism to a very
              enthusiastic cheetah. Add straight to cart or take a closer look.
            </p>
          </div>
          <Link to="/shop" className="text-sm font-medium text-clay underline underline-offset-4 whitespace-nowrap">
            View full collection →
          </Link>
        </div>

        <ProductGrid products={PRODUCTS} />
      </Section>

      {/* BRAND INTRO */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative aspect-square overflow-hidden rounded-art">
            {/* REPLACE with a real studio/process photo when you have one */}
            <PlaceholderArt palette={['#707A46', '#EFC876', '#F7F1E7', '#332821']} seed={20} />
          </div>
          <div>
            <p className="mb-3 text-sm text-clay font-medium">The brand</p>
            <h2 className="font-display text-3xl sm:text-4xl font-medium leading-tight">
              A modern studio, rooted in old, warm colors.
            </h2>
            <p className="mt-5 text-lg text-ink/70 leading-relaxed">
              Jenn Earthtones started on a kitchen table with a handful of tubes of paint
              in clay, ochre, and sage. It's grown into a small studio practice, but the
              goal hasn't changed: paint work that feels like it belongs in a home, not a
              gallery you have to tiptoe through.
            </p>
            <p className="mt-4 text-lg text-ink/70 leading-relaxed">
              Every piece is made by hand, in small batches — sculptural originals,
              textured relief work, and archival prints for every wall and budget.
            </p>
            <div className="mt-8">
              <Button to="/about" variant="ghost">Read the full story</Button>
            </div>
          </div>
        </div>
      </Section>

      {/* LIFESTYLE / EXPLORE CTA */}
      <section className="container-art py-20 sm:py-28">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <Link to="/shop/the-sentinel" className="relative aspect-[3/4] sm:col-span-2 sm:aspect-auto overflow-hidden rounded-art group">
            <img
              src="/art/art-5.jpg"
              alt="The Sentinel — cheetah portrait artwork"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </Link>
          <div className="flex flex-col gap-4 sm:gap-6">
            <Link to="/shop/aperitivo-hour" className="relative aspect-[4/3] overflow-hidden rounded-art group">
              <img
                src="/art/art-6.jpg"
                alt="Aperitivo Hour — summer flat-lay artwork"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </Link>
            <div className="flex-1 flex flex-col justify-center rounded-art bg-clay text-cream p-8">
              <h3 className="font-display text-2xl leading-snug">
                See it on your own walls.
              </h3>
              <p className="mt-3 text-cream/80 text-sm leading-relaxed">
                Every original comes ready to hang, and every print ships archival and
                fade-resistant.
              </p>
              <Link to="/shop" className="mt-5 inline-flex items-center text-sm font-medium underline underline-offset-4">
                Explore the collection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <Section tone="creamDark" className="!py-16">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-medium">Join the studio list</h2>
            <p className="mt-2 text-ink/60 max-w-sm">New work, first access, and the occasional look behind the scenes.</p>
          </div>
          <Newsletter />
        </div>
      </Section>
    </>
  )
}