/**
 * Jenn Earthtones — Square checkout backend
 *
 * This server creates a secure Square-hosted checkout link.
 * The Square access token stays on the server and is never exposed
 * to the React frontend.
 *
 * SECURITY: prices are looked up server-side from products.js — never
 * trusted from the request body — so a tampered client request can't
 * change what gets charged.
 */

import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { randomUUID } from 'crypto'
import { PRODUCTS } from '../src/data/products.js'

const app = express()

app.use(cors())
app.use(express.json())

const SQUARE_ACCESS_TOKEN = process.env.SQUARE_ACCESS_TOKEN
const SQUARE_LOCATION_ID = process.env.SQUARE_LOCATION_ID
const SITE_URL = process.env.SITE_URL || 'http://localhost:5173'

const SQUARE_ENVIRONMENT =
  process.env.SQUARE_ENVIRONMENT || 'sandbox'

const SQUARE_API_URL =
  SQUARE_ENVIRONMENT === 'production'
    ? 'https://connect.squareup.com'
    : 'https://connect.squareupsandbox.com'

/**
 * Create a Square-hosted checkout page.
 */
app.post('/api/create-square-checkout', async (req, res) => {
  try {
    if (!SQUARE_ACCESS_TOKEN) {
      return res.status(500).json({
        error: 'Square access token is not configured.',
      })
    }

    if (!SQUARE_LOCATION_ID) {
      return res.status(500).json({
        error: 'Square location ID is not configured.',
      })
    }

    const { items } = req.body

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        error: 'No items provided.',
      })
    }

    /**
     * Convert the shopping cart into Square order line items.
     * Price and product identity are looked up server-side from
     * PRODUCTS — the client only tells us WHICH product/size/quantity,
     * never the price to charge.
     */
    const lineItems = []

    for (const item of items) {
      const product = PRODUCTS.find(
        (p) => p.id === item.productId || p.title === item.title
      )

      if (!product) {
        return res.status(400).json({
          error: `Product "${item.title}" could not be found.`,
        })
      }

      const selectedSize = product.sizes?.find(
        (size) => size.label === item.size
      )

      const unitPrice = selectedSize?.price ?? product.price ?? 0

      const quantity = Number(item.quantity)

      if (!Number.isInteger(quantity) || quantity < 1) {
        return res.status(400).json({
          error: `Invalid quantity for "${product.title}".`,
        })
      }

      if (unitPrice <= 0) {
        return res.status(400).json({
          error: `Invalid price for "${product.title}".`,
        })
      }

      lineItems.push({
        name: `${product.title} — ${item.size || 'Original Artwork'}`,
        quantity: String(quantity),
        base_price_money: {
          amount: Math.round(unitPrice * 100),
          currency: 'USD',
        },
      })
    }

    /**
     * Ask Square to create a hosted checkout page.
     */
    const squareResponse = await fetch(
      `${SQUARE_API_URL}/v2/online-checkout/payment-links`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${SQUARE_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
          'Square-Version': '2026-08-19',
        },
        body: JSON.stringify({
          idempotency_key: randomUUID(),

          order: {
            location_id: SQUARE_LOCATION_ID,
            line_items: lineItems,
          },

          checkout_options: {
            ask_for_shipping_address: true,
            redirect_url: `${SITE_URL}/checkout?success=true`,
          },

          payment_note: 'Jenn Earthtones artwork purchase',
        }),
      }
    )

    const data = await squareResponse.json()

    if (!squareResponse.ok) {
      console.error('Square API error:', data)

      return res.status(500).json({
        error:
          data?.errors?.[0]?.detail ||
          'Square could not create the checkout.',
      })
    }

    const checkoutUrl = data?.payment_link?.url

    if (!checkoutUrl) {
      console.error('Square response missing checkout URL:', data)

      return res.status(500).json({
        error: 'Square did not return a checkout URL.',
      })
    }

    /**
     * Send the Square checkout URL back to the React app.
     */
    res.json({
      url: checkoutUrl,
    })
  } catch (error) {
    console.error('Square checkout error:', error)

    res.status(500).json({
      error: 'Could not create Square checkout.',
    })
  }
})

const PORT = process.env.PORT || 4242

app.listen(PORT, () => {
  console.log(`Jenn Earthtones API listening on port ${PORT}`)
})
