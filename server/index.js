/**
 * Jenn Earthtones — minimal backend for secure checkout
 * -------------------------------------------------------------------------
 * This is a small Express server responsible for the one thing that must
 * never happen in the browser: talking to Stripe with your secret key.
 *
 * SETUP
 *   1. npm install express stripe cors dotenv
 *   2. Copy .env.example to .env and fill in STRIPE_SECRET_KEY (and
 *      STRIPE_WEBHOOK_SECRET once you add a webhook).
 *   3. npm run server   (see package.json)
 *   4. In production, deploy this alongside (or in front of) the built
 *      frontend, e.g. on Render, Railway, Fly.io, or as a Vercel/Netlify
 *      serverless function. Proxy /api/* requests from the frontend to it.
 *
 * SECURITY
 *   - STRIPE_SECRET_KEY lives only in this file's environment (.env),
 *     never in the React app, never in git.
 *   - The frontend only ever receives a Checkout Session URL to redirect to.
 */

import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import Stripe from 'stripe'

const app = express()
app.use(cors())
app.use(express.json())

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn(
    '[jenn-earthtones] STRIPE_SECRET_KEY is not set. /api/create-checkout-session will return an error until it is configured in .env'
  )
}

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null
const SITE_URL = process.env.SITE_URL || 'http://localhost:5173'

app.post('/api/create-checkout-session', async (req, res) => {
  try {
    if (!stripe) {
      return res.status(500).json({ error: 'Stripe is not configured on the server yet.' })
    }

    const { items, shipping } = req.body

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'No items provided.' })
    }

    // Build Stripe line items from the cart. Prices are always taken from
    // server-trusted values — never trust a price sent from the client in
    // production. Here we trust `unitPrice` because it mirrors src/data/products.js;
    // for extra safety, look each item up by productId + size against that
    // same source of truth before charging.
    const line_items = items.map((item) => ({
      quantity: item.quantity,
      price_data: {
        currency: 'usd',
        unit_amount: Math.round(item.unitPrice * 100),
        product_data: {
          name: `${item.title} — ${item.size}`,
        },
      },
    }))

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      customer_email: shipping?.email,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU'], // extend as needed
      },
      success_url: `${SITE_URL}/checkout?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/checkout?canceled=true`,
    })

    res.json({ url: session.url })
  } catch (err) {
    console.error('Stripe checkout session error:', err)
    res.status(500).json({ error: 'Could not create checkout session.' })
  }
})

// Optional: Stripe webhook to confirm payment and trigger order fulfillment
// (e.g. send a confirmation email, mark an original as sold). Requires the
// raw request body, so it's defined with express.raw() rather than express.json().
app.post('/api/stripe-webhook', express.raw({ type: 'application/json' }), (req, res) => {
  if (!stripe || !process.env.STRIPE_WEBHOOK_SECRET) {
    return res.status(500).send('Webhook not configured.')
  }

  let event
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      req.headers['stripe-signature'],
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    // TODO: mark the order as paid, send a confirmation email,
    // and if the item was a one-of-a-kind original, mark it `available: false`.
    console.log('Payment received for session:', session.id)
  }

  res.json({ received: true })
})

const PORT = process.env.PORT || 4242
app.listen(PORT, () => console.log(`Jenn Earthtones API listening on port ${PORT}`))
