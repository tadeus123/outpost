const API_BASE = import.meta.env.VITE_API_URL || ""

export async function createCheckoutSession(payload) {
  const res = await fetch(`${API_BASE}/api/create-checkout-session`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    throw new Error(data.error || "Could not start checkout")
  }

  return data
}

export async function getCheckoutSession(sessionId) {
  const res = await fetch(
    `${API_BASE}/api/checkout-session?session_id=${encodeURIComponent(sessionId)}`,
  )
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || "Could not load session")
  return data
}

export async function getStripeConfig() {
  const res = await fetch(`${API_BASE}/api/config`)
  const data = await res.json().catch(() => ({}))
  if (!res.ok) return { stripeEnabled: false, publishableKey: null }
  return data
}

export function publishableKeyFromEnv() {
  return import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || null
}
