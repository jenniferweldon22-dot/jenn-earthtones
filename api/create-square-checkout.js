import { PRODUCTS } from '../src/data/products.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' })
  }

  try {
    const { items } = req.body

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Your cart is empty.' })
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
          idempotency_key: crypto.randomUUID(),
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

    if (!response.ok) {
      console.error('Square API error:', data)
      return res.status(500).json({
        error: 'Square could not create the checkout.',
      })
    }

    return res.status(200).json({
      url: data.payment_link.url,
    })
  } catch (error) {
    console.error('Checkout error:', error)

    return res.status(500).json({
      error: 'Could not create checkout.',
    })
  }
}