import React from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'

export default function About() {
  return (
    <div className="bg-cream min-h-screen text-ink pb-24">
      <Seo
        title="About Jenn — Jenn Earthtones"
        description="Meet the artist behind Jenn Earthtones. Tactile original paintings and prints rooted in warmth, texture, and organic balance."
      />

      {/* Main Feature Section */}
      <div className="container-art pt-12 sm:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Narrative Copy */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-clay">
              About the Studio
            </span>
            <h1 className="font-display text-3xl sm:text-5xl font-medium tracking-tight text-ink leading-tight">
              Art Rooted in Texture, Warmth, and Living Color
            </h1>
            
            <p className="text-base sm:text-lg text-ink/75 leading-relaxed">
              Jenn Earthtones began as an exploration of tactile serenity—bringing the raw warmth of sun-soaked horizons, architectural plaster curves, and vibrant botanical energy into everyday living spaces.
            </p>

            <p className="text-sm sm:text-base text-ink/70 leading-relaxed">
              Every piece bridges tactile minimalism with vivid character: from thick, sculpted impasto ridges and warm desert hues to playful aperitivo still lifes and vibrant fauna. Whether through original sculptural canvases or archival art prints, each creation is designed to bring warmth, grounding texture, and intentional atmosphere into your home.
            </p>

            <div className="pt-4">
              <Link
                to="/shop"
                className="inline-flex items-center rounded-full bg-ink px-6 py-3 text-sm font-medium text-cream hover:bg-clay transition-colors"
              >
                Shop the Collection →
              </Link>
            </div>
          </div>

          {/* Right Column: Artist Portrait */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-art bg-cream-dark shadow-[0_20px_40px_-20px_rgba(51,40,33,0.3)] ring-1 ring-ink/10">
              <img
                src="/artist.jpg"
                alt="Jenn - Studio Artist and Founder"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Studio Values / Highlights */}
      <div className="container-art mt-20 pt-16 border-t border-ink/10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-art bg-cream-dark/40 border border-ink/5">
            <h3 className="font-display text-lg font-medium text-ink mb-2">Tactile Warmth</h3>
            <p className="text-sm text-ink/70 leading-relaxed">
              Organic plaster contours, heavy impasto textures, and sun-warmed mineral palettes built to bring dimension to flat walls.
            </p>
          </div>

          <div className="p-6 rounded-art bg-cream-dark/40 border border-ink/5">
            <h3 className="font-display text-lg font-medium text-ink mb-2">Archival Quality</h3>
            <p className="text-sm text-ink/70 leading-relaxed">
              Reproduced with fade-resistant pigments on heavyweight fine art papers and gallery-grade canvas made to endure.
            </p>
          </div>

          <div className="p-6 rounded-art bg-cream-dark/40 border border-ink/5">
            <h3 className="font-display text-lg font-medium text-ink mb-2">Mindful Craft</h3>
            <p className="text-sm text-ink/70 leading-relaxed">
              Original canvases and small-batch prints curated with intention, packaged by hand, and shipped with care directly to you.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}