import { saveCitySuggestion } from "../server/lib/citySuggestion.js"
import { setCors } from "../server/lib/cors.js"

export default async function handler(req, res) {
  setCors(req, res)
  if (req.method === "OPTIONS") return res.status(204).end()
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" })

  try {
    const city = req.body?.city
    await saveCitySuggestion(city)
    res.status(201).json({ ok: true })
  } catch (err) {
    if (err.status !== 400) console.error(err)
    res.status(err.status || 500).json({ error: err.message || "Could not save suggestion" })
  }
}
