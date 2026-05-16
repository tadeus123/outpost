# Outpost

Private hotel rooms in expensive cities — **fully operated by robots**.

## Run locally

```bash
npm install
node scripts/fetch-placeholders.mjs   # optional: placeholder photos
cp .env.example .env                  # add Stripe test keys for live checkout
npm run dev                           # Vite + API on :5173 / :4242
```

- Site: [http://localhost:5173](http://localhost:5173)
- Book flow: [http://localhost:5173/book](http://localhost:5173/book)
- API health: [http://localhost:4242/api/health](http://localhost:4242/api/health)

Pay only works when **both** Stripe keys are in `.env` (publishable + secret from the same account).

## Stripe setup

1. Open [Stripe test API keys](https://dashboard.stripe.com/test/apikeys)
2. Copy **Publishable key** → `VITE_STRIPE_PUBLISHABLE_KEY` in `.env`
3. Copy **Secret key** → `STRIPE_SECRET_KEY` in `.env`
4. Restart `npm run dev` (runs Vite + API together)
5. On `/book`, fill dates and details → **Pay with Stripe** redirects to Stripe Checkout

Test card: `4242 4242 4242 4242` · any future expiry · any CVC.

```
STRIPE_SECRET_KEY=sk_test_...
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
CLIENT_URL=http://localhost:5173
```

## Deploy on Vercel

1. Push this repo to GitHub (see below).
2. [Import the repo in Vercel](https://vercel.com/new) — framework **Vite**, no extra config needed (`vercel.json` is included).
3. In Vercel → **Settings → Environment Variables**, add:
   - `STRIPE_SECRET_KEY` — secret key (server only)
   - `VITE_STRIPE_PUBLISHABLE_KEY` — publishable key (baked into the frontend build)
   - `CLIENT_URL` — your live URL, e.g. `https://outpost.vercel.app` (no trailing slash)
4. Redeploy after adding env vars.

API routes live in `/api/*` as Vercel serverless functions (same paths as local dev). Stripe Checkout success/cancel URLs use `CLIENT_URL`.

For local dev, `npm run dev` still runs Vite + the Express API on port 4242.

## Booking flow

1. **Pick city** — SF, Berlin, London (more marked “soon”)
2. **Dates + room** — solo or duo, guest count
3. **Name + email** — pay via Stripe

## Change content

- Copy & pricing: `src/data/content.js`
- Bookable cities & rates: `src/data/booking.js`
- Images: `public/images/` (see `public/images/README.md`)

## Build

```bash
npm run build
npm run preview
```
