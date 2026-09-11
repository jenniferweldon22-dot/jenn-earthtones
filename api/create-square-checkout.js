import { PRODUCTS } from '../src/data/products.js'
import { randomUUID } from 'crypto'

const SQUARE_API_URL = 'https://connect.squareup.com'
const SQUARE_VERSION = '2026-08-19'

export default async function handler(req, res) {
  // ---------------------------------------------------------
  // ONLY ALLOW POST REQUESTS
  // ---------------------------------------------------------
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed.',
    })
  }

  try {
    // ---------------------------------------------------------
    // CHECK SQUARE ACCESS TOKEN
    // ---------------------------------------------------------
    const accessToken = process.env.SQUARE_ACCESS_TOKEN

    if (!accessToken) {
      return res.status(500).json({
        error: 'SQUARE_ACCESS_TOKEN is missing in Vercel.',
      })
    }

    // ---------------------------------------------------------
    // GET LOCATIONS AVAILABLE TO THIS SQUARE ACCESS TOKEN
    // ---------------------------------------------------------
    const locationsResponse = await fetch(
      `${SQUARE_API_URL}/v2/locations`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Square-Version': SQUARE_VERSION,
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
          locationsData?.errors?.[0]?.detail ||
          'Square could not access your account.',
      })
    }

    const locations = locationsData.locations || []

    // ---------------------------------------------------------
    // MAKE SURE SQUARE RETURNED A LOCATION
    // ---------------------------------------------------------
    if (locations.length === 0) {
      console.error('No Square locations available for this access token.')

      return res.status(500).json({
        error:
          'No Square locations are available for this access token. Make sure you are using your Production access token.',
      })
    }

    // ---------------------------------------------------------
    // USE THE LOCATION ID FROM VERCEL IF IT EXISTS
    // OTHERWISE USE THE ONLY AVAILABLE LOCATION
    // ---------------------------------------------------------
    const configuredLocationId = process.env.SQUARE_LOCATION_ID

    let location = null

    if (configuredLocationId) {
      location = locations.find(
        (item) => item.id === configuredLocationId
      )
    }

    // If Vercel's Location ID doesn't match, but Square only
    // gives this token one location, use that location.
    if (!location && locations.length === 1) {
      location = locations[0]

      console.log(
        'Using the only Square location available to this access token:',
        {
          id: location.id,
          name: location.name,
        }
      )
    }

    // ---------------------------------------------------------
    // STOP IF WE CANNOT SAFELY DETERMINE THE LOCATION
    // ---------------------------------------------------------
    if (!location) {
      console.error(
        'Configured Square location was not found.',
        {
          configuredLocationId,
          availableLocations: locations.map((item) => ({
            id: item.id,
            name: item.name,
            status: item.status,
          })),
        }
      )

      return res.status(500).json({
        error:
          'The Square access token does not have access to the configured location. Check that your Production access token and Location ID belong to the same Square account.',
      })
    }

    const locationId = location.id

    console.log('Using Square location:', {
      id: location.id,
      name: location.name,
      status: location.status,
    })

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
        (product) =>
          product.id === item.productId ||
          product.title === item.title
      )

      if (!product) {
        return res.status(400).json({
          error: `Product "${item.title}" could not be found.`,
        })
      }

      const selectedSize = product.sizes?.find(
        (size) => size.label === item.size
      )

      const unitPrice =
        selectedSize?.price ??
        product.price ??
        0

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

    // ---------------------------------------------------------
    // CREATE SQUARE PAYMENT LINK
    // ---------------------------------------------------------
    const paymentLinkResponse = await fetch(
      `${SQUARE_API_URL}/v2/online-checkout/payment-links`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Square-Version': SQUARE_VERSION,
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

    const paymentLinkData = await paymentLinkResponse.json()

    // ---------------------------------------------------------
    // HANDLE SQUARE PAYMENT LINK ERRORS
    // ---------------------------------------------------------
    if (!paymentLinkResponse.ok) {
      console.error(
        'Square Payment Link error:',
        JSON.stringify(paymentLinkData, null, 2)
      )

      const squareError =
        paymentLinkData?.errors?.[0]?.detail ||
        paymentLinkData?.errors?.[0]?.code ||
        'Square rejected the checkout request.'

      return res.status(paymentLinkResponse.status).json({
        error: squareError,
      })
    }

    // ---------------------------------------------------------
    // GET CHECKOUT URL
    // ---------------------------------------------------------
    const checkoutUrl = paymentLinkData?.payment_link?.url

    if (!checkoutUrl) {
      console.error(
        'Square did not return a checkout URL:',
        JSON.stringify(paymentLinkData, null, 2)
      )

      return res.status(500).json({
        error: 'Square did not return a checkout URL.',
      })
    }

    // ---------------------------------------------------------
    // SEND CHECKOUT URL BACK TO WEBSITE
    // ---------------------------------------------------------
    return res.status(200).json({
      url: checkoutUrl,
    })
  } catch (error) {
    console.error('Square checkout error:', error)

    return res.status(500).json({
      error:
        error?.message ||
        'Could not connect to Square.',
    })
  }
}