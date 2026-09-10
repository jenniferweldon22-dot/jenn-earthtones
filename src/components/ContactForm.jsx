import React, { useState } from 'react'

/**
 * Contact form.
 *
 * >>> CONNECT THIS <<<
 * This form currently simulates submission. To make it real, POST the
 * `form` state to a server endpoint that sends the email — e.g. a small
 * serverless function using Resend, Postmark, SendGrid, or Nodemailer.
 * Keep the email-provider API key on the server, never in this file.
 *
 * Example:
 *   await fetch('/api/contact', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify(form),
 *   })
 */
export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle')

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    try {
      await new Promise((res) => setTimeout(res, 700))
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-art border border-olive/30 bg-olive/10 p-8 text-center">
        <h3 className="font-display text-xl mb-2">Message sent</h3>
        <p className="text-ink/70">Thanks for reaching out — I read every message and will reply within a couple of days.</p>
        <button onClick={() => setStatus('idle')} className="mt-4 text-sm text-clay underline underline-offset-4">
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-ink mb-2">Name</label>
        <input
          id="name"
          type="text"
          required
          value={form.name}
          onChange={update('name')}
          className="w-full rounded-art border border-ink/20 bg-white px-4 py-3 text-sm focus:border-clay focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-ink mb-2">Email</label>
        <input
          id="email"
          type="email"
          required
          value={form.email}
          onChange={update('email')}
          className="w-full rounded-art border border-ink/20 bg-white px-4 py-3 text-sm focus:border-clay focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-ink mb-2">Message</label>
        <textarea
          id="message"
          required
          rows={6}
          value={form.message}
          onChange={update('message')}
          className="w-full rounded-art border border-ink/20 bg-white px-4 py-3 text-sm focus:border-clay focus:outline-none resize-none"
        />
      </div>
      {status === 'error' && <p className="text-sm text-rust">Something went wrong. Please try again or email directly.</p>}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full sm:w-auto rounded-art bg-clay px-8 py-3.5 text-sm font-medium text-cream hover:bg-clay-dark transition-colors disabled:opacity-50"
      >
        {status === 'loading' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  )
}
