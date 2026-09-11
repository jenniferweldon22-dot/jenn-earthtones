import { PRODUCTS } from '../src/data/products.js'
import { randomUUID } from 'crypto'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' })
  }

  try {
    // Check that Square credentials exist on the server.
    if (!process.env.SQUARE_ACCESS_TOKEN) {
      console.error('Missing SQUARE_ACCESS_TOKEN')
      return res.status(500).json({
        error: 'Square access token is not configured in Vercel.',
      })
    }

    if (!process.env.SQUARE_LOCATION_ID) {
      console.error('Missing SQUARE_LOCATION_ID')
      return res.status(500).json({
        error: 'Square location ID is not configured in Vercel.',
      })
    }

    const { items } = req.body

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        error: 'Your cart is empty.',
      })
    }

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

      const unitPrice = selectedSize?.price ?? product.price

      lineItems.push({
        name: `${product.title} — ${item.size}`,
        quantity: String(item.quantity),
        base_price_money: {
          amount: Math.round(unitPrice * 100),
          currency: 'USD',
        },
      })
    }

    const response = await fetch(
      'https://connect.squareup.com/v2/online-checkout/payment-links',
      {
        method: 'POST',
        headers: {
          'Square-Version': '2026-08-19',
          Authorization: `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idempotency_key: randomUUID(),

          order: {
            location_id: process.env.SQUARE_LOCATION_ID,
            line_items: lineItems,
          },

          checkout_options: {
            ask_for_shipping_address: true,
          },
        }),
      }
    )

    const data = await response.json()

    // IMPORTANT:
    // Show the actual Square error so we can diagnose the problem.
    if (!response.ok) {
      console.error('Square API error:', JSON.stringify(data, null, 2))

      const squareError =
        data?.errors?.[0]?.detail ||
        data?.errors?.[0]?.code ||
        'Square rejected the checkout request.'

      return res.status(response.status).json({
        error: squareError,
      })
    }

    const checkoutUrl = data?.payment_link?.url

    if (!checkoutUrl) {
      console.error(
        'Square response did not contain a payment link:',
        data
      )

      return res.status(500).json({
        error: 'Square did not return a checkout URL.',
      })
    }

    return res.status(200).json({
      url: checkoutUrl,
    })
  } catch (error) {
    console.error('Checkout error:', error)

    return res.status(500).json({
      error: 'Could not connect to Square.',
    })
  }
}