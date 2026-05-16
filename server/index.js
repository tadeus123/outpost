import "dotenv/config"
import express from "express"
import cors from "cors"
import {
  stripe,
  getConfig,
  createCheckoutSession,
  retrieveCheckoutSession,
} from "./lib/stripe.js"
import { isAllowedOrigin } from "./lib/cors.js"
import { saveCitySuggestion } from "./lib/citySuggestion.js"

const app = express()
const PORT = process.env.PORT || 4242

app.use(
  cors({
    origin(origin, callback) {
      callback(null, isAllowedOrigin(origin))
    },
  }),
)
app.use(express.json())

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, stripe: Boolean(stripe) })
})

app.get("/api/config", (_req, res) => {
  res.json(getConfig())
})

app.post("/api/create-checkout-session", async (req, res) => {
  try {
    const data = await createCheckoutSession(req.body)
    res.json(data)
  } catch (err) {
    console.error(err)
    res.status(err.status || 500).json({ error: err.message || "Checkout failed" })
  }
})

app.get("/api/checkout-session", async (req, res) => {
  try {
    const data = await retrieveCheckoutSession(req.query.session_id)
    res.json(data)
  } catch (err) {
    console.error(err)
    res.status(err.status || 500).json({ error: err.message || "Could not load session" })
  }
})

app.post("/api/city-suggestion", async (req, res) => {
  try {
    await saveCitySuggestion(req.body?.city)
    res.status(201).json({ ok: true })
  } catch (err) {
    if (err.status !== 400) console.error(err)
    res.status(err.status || 500).json({ error: err.message || "Could not save suggestion" })
  }
})

app.listen(PORT, () => {
  console.log(`Outpost API http://localhost:${PORT}`)
  if (!stripe) {
    console.warn("⚠ STRIPE_SECRET_KEY missing — Pay will not work until you add it to .env")
  } else {
    console.log("✓ Stripe Checkout enabled")
  }
})
