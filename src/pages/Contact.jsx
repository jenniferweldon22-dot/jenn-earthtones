import React, { useState } from 'react'
import Seo from '../components/Seo.jsx'
import Button from '../components/Button.jsx'
import { TikTokIcon, PinterestIcon } from '../components/icons/SocialIcons.jsx'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="bg-cream min-h-screen text-ink pb-24">
      <Seo
        title="Contact — Jenn Earthtones"
        description="Get in touch with Jenn Earthtones for inquiries, commissions, or fine art print questions."
      />

      <div className="container-art pt-12 sm:pt-16 max-w-4xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-clay">
            Get in Touch
          </span>
          <h1 className="mt-3 font-display text-3xl sm:text-5xl font-medium tracking-tight text-ink">
            Studio Inquiries
          </h1>
          <p className="mt-4 text-sm sm:text-base text-ink/70 leading-relaxed">
            Have a question about a print, custom dimensions, or order details? Send a note below or reach out via social.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Contact Details & Social Links */}
          <div className="md:col-span-5 space-y-8 bg-cream-dark/50 p-6 sm:p-8 rounded-art border border-ink/5">
            <div>
              <h2 className="font-display text-lg font-medium text-ink mb-2">Connect</h2>
              <p className="text-sm text-ink/70 leading-relaxed">
                Follow behind-the-scenes painting processes, studio updates, and new piece releases:
              </p>
              
              <div className="mt-5 space-y-3">
                <a
                  href="https://www.tiktok.com/@jenn.earthtones"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-art border border-ink/10 bg-cream/70 hover:border-clay hover:text-clay transition-colors group text-sm font-medium"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-cream group-hover:bg-clay transition-colors">
                    <TikTokIcon />
                  </span>
                  <span>TikTok <span className="text-xs text-ink/50 font-normal">(@jenn.earthtones)</span></span>
                </a>

                <a
                  href="https://www.pinterest.com/jennwebstudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-art border border-ink/10 bg-cream/70 hover:border-clay hover:text-clay transition-colors group text-sm font-medium"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-cream group-hover:bg-clay transition-colors">
                    <PinterestIcon />
                  </span>
                  <span>Pinterest <span className="text-xs text-ink/50 font-normal">(@jennwebstudio)</span></span>
                </a>
              </div>
            </div>

            <div className="border-t border-ink/10 pt-6">
              <h3 className="font-display text-base font-medium text-ink mb-1">Studio Response Time</h3>
              <p className="text-xs text-ink/60 leading-relaxed">
                Messages are typically answered within 24–48 business hours.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-7 bg-cream-dark/30 p-6 sm:p-8 rounded-art border border-ink/5">
            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <span className="text-2xl">✓</span>
                <h3 className="font-display text-xl font-medium text-ink">Message Sent</h3>
                <p className="text-sm text-ink/70 max-w-xs mx-auto">
                  Thank you for reaching out! We'll be in touch with you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-xs font-medium text-ink/70 mb-1.5 uppercase tracking-wide">
                    Your Name
                  </label>
                  <input
                    required
                    id="name"
                    type="text"
                    className="w-full rounded-art border border-ink/15 bg-cream px-4 py-2.5 text-sm text-ink outline-none focus:border-clay"
                    placeholder="Jane Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-ink/70 mb-1.5 uppercase tracking-wide">
                    Email Address
                  </label>
                  <input
                    required
                    id="email"
                    type="email"
                    className="w-full rounded-art border border-ink/15 bg-cream px-4 py-2.5 text-sm text-ink outline-none focus:border-clay"
                    placeholder="jane@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-medium text-ink/70 mb-1.5 uppercase tracking-wide">
                    Message
                  </label>
                  <textarea
                    required
                    id="message"
                    rows={5}
                    className="w-full rounded-art border border-ink/15 bg-cream px-4 py-2.5 text-sm text-ink outline-none focus:border-clay"
                    placeholder="Ask about a print, custom dimensions, or framing..."
                  />
                </div>

                <Button type="submit" size="lg" fullWidth>
                  Send Message
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
