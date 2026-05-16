import Stripe from "stripe"

const stripeSecret = process.env.STRIPE_SECRET_KEY?.trim()
const publishableKey =
  process.env.VITE_STRIPE_PUBLISHABLE_KEY?.trim() ||
  process.env.STRIPE_PUBLISHABLE_KEY?.trim()

export const stripe = stripeSecret ? new Stripe(stripeSecret) : null

export function clientUrl() {
  if (process.env.CLIENT_URL?.trim()) {
    return process.env.CLIENT_URL.trim().replace(/\/$/, "")
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  return "http://localhost:5173"
}

export function getConfig() {
  return {
    stripeEnabled: Boolean(stripe),
    publishableKey: publishableKey || null,
  }
}

export async function createCheckoutSession(body) {
  if (!stripe) {
    const err = new Error(
      "Stripe is not configured. Add STRIPE_SECRET_KEY in your environment.",
    )
    err.status = 503
    throw err
  }

  const {
    cityId,
    cityName,
    roomType,
    roomName,
    checkIn,
    checkOut,
    nights,
    total,
    currency = "usd",
    phone,
    name,
    guests,
  } = body

  if (!cityId || !roomType || !checkIn || !checkOut || !nights || !total || !phone) {
    const err = new Error("Missing booking details")
    err.status = 400
    throw err
  }

  const nightCount = Number(nights)
  const totalCents = Math.round(Number(total) * 100)
  if (nightCount < 1 || totalCents < 50) {
    const err = new Error("Invalid booking total")
    err.status = 400
    throw err
  }

  const unitAmount = Math.round(totalCents / nightCount)
  const base = clientUrl()

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    phone_number_collection: { enabled: true },
    line_items: [
      {
        price_data: {
          currency: currency.toLowerCase(),
          unit_amount: unitAmount,
          product_data: {
            name: `Outpost ${cityName} — ${roomName}`,
            description: `${nightCount} night${nightCount > 1 ? "s" : ""} · ${checkIn} → ${checkOut} · Robot-operated`,
          },
        },
        quantity: nightCount,
      },
    ],
    metadata: {
      cityId,
      cityName,
      roomType,
      roomName: roomName || "",
      checkIn,
      checkOut,
      nights: String(nightCount),
      guests: String(guests || 1),
      guestName: name || "",
      phone: String(phone).trim(),
    },
    success_url: `${base}/book/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${base}/book?canceled=1&city=${encodeURIComponent(cityId)}`,
  })

  return { url: session.url, sessionId: session.id }
}

export async function retrieveCheckoutSession(sessionId) {
  if (!stripe) {
    const err = new Error("Stripe not configured")
    err.status = 503
    throw err
  }
  if (!sessionId) {
    const err = new Error("session_id required")
    err.status = 400
    throw err
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId)
  return {
    id: session.id,
    status: session.payment_status,
    phone: session.metadata?.phone || session.customer_details?.phone,
    metadata: session.metadata,
    amountTotal: session.amount_total,
    currency: session.currency,
  }
}
