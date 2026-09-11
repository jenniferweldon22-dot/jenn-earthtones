import { PRODUCTS } from '../src/data/products.js'
import { randomUUID } from 'crypto'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' })
  }

  try {
    // Check that Square credentials exist
    if (!process.env.SQUARE_ACCESS_TOKEN) {
      return res.status(500).json({
        error: 'SQUARE_ACCESS_TOKEN is missing in Vercel.',
      })
    }

    if (!process.env.SQUARE_LOCATION_ID) {
      return res.status(500).json({
        error: 'SQUARE_LOCATION_ID is missing in Vercel.',
      })
    }

    const locationId = process.env.SQUARE_LOCATION_ID

    // ---------------------------------------------------------
    // VERIFY THAT THIS ACCESS TOKEN CAN SEE THIS LOCATION
    // ---------------------------------------------------------
    const locationsResponse = await fetch(
      'https://connect.squareup.com/v2/locations',
      {
        method: 'GET',
        headers: {
          'Square-Version': '2026-08-19',
          Authorization: `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    )

    const locationsData = await locationsResponse.json()

    if (!locationsResponse.ok) {
      console.error(
        'Square Locations API error:',
        JSON.stringify(locationsData, null, 2)
      )

      return res.status(500).json({
        error:
          'Square could not verify your account. Make sure SQUARE_ACCESS_TOKEN is your Production access token.',
      })
    }

    const matchingLocation = locationsData.locations?.find(
      (location) => location.id === locationId
    )

    if (!matchingLocation) {
      console.error(
        'Location ID does not belong to this Square access token.',
        {
          requestedLocation: locationId,
          availableLocations: locationsData.locations?.map((location) => ({
            id: location.id,
            name: location.name,
          })),
        }
      )

      return res.status(500).json({
        error:
          'The Square access token does not have access to the Location ID configured in Vercel.',
      })
    }

    // ---------------------------------------------------------
    // CHECK CART
    // ---------------------------------------------------------
    const { items } = req.body

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        error: 'Your cart is empty.',
      })
    }

    // ---------------------------------------------------------
    // BUILD SQUARE LINE ITEMS
    // ---------------------------------------------------------
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

    // ---------------------------------------------------------
    // CREATE SQUARE PAYMENT LINK
    // ---------------------------------------------------------
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
            location_id: locationId,
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
      console.error(
        'Square Payment Link error:',
        JSON.stringify(data, null, 2)
      )

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
        'Square did not return a payment link:',
        JSON.stringify(data, null, 2)
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