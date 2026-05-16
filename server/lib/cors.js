import { clientUrl } from "./stripe.js"

export function isAllowedOrigin(origin) {
  if (!origin) return true
  const base = clientUrl()
  if (origin === base) return true
  if (/^https:\/\/[\w-]+\.vercel\.app$/.test(origin)) return true
  return /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)
}

export function setCors(req, res) {
  const origin = req.headers.origin
  if (origin && isAllowedOrigin(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin)
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")
}
