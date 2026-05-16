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

app.listen(PORT, () => {
  console.log(`Outpost API http://localhost:${PORT}`)
  if (!stripe) {
    console.warn("⚠ STRIPE_SECRET_KEY missing — Pay will not work until you add it to .env")
  } else {
    console.log("✓ Stripe Checkout enabled")
  }
})
