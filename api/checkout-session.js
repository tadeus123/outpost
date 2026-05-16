import { retrieveCheckoutSession } from "../server/lib/stripe.js"
import { setCors } from "../server/lib/cors.js"

export default async function handler(req, res) {
  setCors(req, res)
  if (req.method === "OPTIONS") return res.status(204).end()
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" })

  try {
    const sessionId = req.query.session_id
    const data = await retrieveCheckoutSession(sessionId)
    res.status(200).json(data)
  } catch (err) {
    console.error(err)
    res.status(err.status || 500).json({ error: err.message || "Could not load session" })
  }
}
