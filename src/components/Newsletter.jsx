import React, { useState } from 'react'

/**
 * Newsletter signup form.
 *
 * >>> CONNECT THIS <<<
 * Currently this just simulates a submission. To go live, wire the `onSubmit`
 * handler to your email provider of choice (Mailchimp, Klaviyo, ConvertKit,
 * Beehiiv, etc). Most providers give you a POST endpoint or a hosted form
 * action you can call from here — keep any API keys server-side.
 */
export default function Newsletter({ tone = 'light' }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      // await fetch('/api/newsletter', { method: 'POST', body: JSON.stringify({ email }) })
      await new Promise((res) => setTimeout(res, 600))
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  const isDark = tone === 'dark'

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <label htmlFor="newsletter-email" className={`block text-sm mb-2 ${isDark ? 'text-cream/80' : 'text-ink/70'}`}>
        Get new artwork drops and studio notes in your inbox.
      </label>
      <div className="flex gap-2">
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          className={`min-w-0 flex-1 rounded-art border px-4 py-3 text-sm focus:outline-none ${
            isDark
              ? 'bg-transparent border-cream/30 text-cream placeholder:text-cream/40 focus:border-cream'
              : 'bg-white border-ink/20 text-ink placeholder:text-ink/40 focus:border-clay'
          }`}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className={`shrink-0 rounded-art px-5 py-3 text-sm font-medium transition-colors disabled:opacity-50 ${
            isDark ? 'bg-cream text-ink hover:bg-white' : 'bg-clay text-cream hover:bg-clay-dark'
          }`}
        >
          {status === 'loading' ? 'Joining…' : 'Sign up'}
        </button>
      </div>
      {status === 'success' && (
        <p className={`mt-2 text-sm ${isDark ? 'text-cream/80' : 'text-olive-dark'}`}>You're on the list — welcome!</p>
      )}
      {status === 'error' && <p className="mt-2 text-sm text-rust">Something went wrong. Please try again.</p>}
    </form>
  )
}
