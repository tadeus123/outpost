import { stripe } from "../server/lib/stripe.js"
import { citySuggestionsEnabled } from "../server/lib/citySuggestion.js"
import { setCors } from "../server/lib/cors.js"

export default function handler(req, res) {
  setCors(req, res)
  if (req.method === "OPTIONS") return res.status(204).end()
  res.status(200).json({
    ok: true,
    stripe: Boolean(stripe),
    citySuggestions: citySuggestionsEnabled(),
  })
}
