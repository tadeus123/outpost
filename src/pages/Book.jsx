import { useEffect, useMemo, useRef, useState } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import Image from "../components/Image"
import CityMapPanel from "../components/booking/CityMapPanel"
import StayDatesPicker from "../components/booking/StayDatesPicker"
import ValuePanel from "../components/booking/ValuePanel"
import { brand } from "../data/content"
import {
  bookableCities,
  roomTypes,
  getCityRoomTypes,
  getCity,
  nightsBetween,
  calculateTotal,
  formatMoney,
  stripeCurrencyCode,
  defaultStayDates,
  isValidPhone,
} from "../data/booking"
import { createCheckoutSession, getStripeConfig } from "../lib/api"
import { scrollToId } from "../lib/scroll"

function saveDemoBooking(payload) {
  const key = "outpost-bookings"
  const list = JSON.parse(localStorage.getItem(key) || "[]")
  list.push({ ...payload, id: `demo_${Date.now()}`, status: "confirmed_demo" })
  localStorage.setItem(key, JSON.stringify(list))
}

export default function Book() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const preCity = params.get("city")
  const preRoom = params.get("room")
  const canceled = params.get("canceled") === "1"
  const preCityOpen = preCity && getCity(preCity)?.open
  const initialDates = preCityOpen ? defaultStayDates() : { checkIn: "", checkOut: "" }

  const [cityId, setCityId] = useState(preCityOpen ? preCity : "")
  const [checkIn, setCheckIn] = useState(initialDates.checkIn)
  const [checkOut, setCheckOut] = useState(initialDates.checkOut)
  const [roomType, setRoomType] = useState(
    preRoom && roomTypes[preRoom] ? preRoom : "solo",
  )
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [stripeReady, setStripeReady] = useState(null)
  const checkoutRef = useRef(null)

  useEffect(() => {
    getStripeConfig()
      .then((cfg) => setStripeReady(Boolean(cfg.stripeEnabled)))
      .catch(() => setStripeReady(false))
  }, [])

  const city = getCity(cityId)
  const cityRooms = useMemo(() => getCityRoomTypes(cityId), [cityId])

  const applyDefaultDates = () => {
    const { checkIn: ci, checkOut: co } = defaultStayDates()
    setCheckIn(ci)
    setCheckOut(co)
  }

  useEffect(() => {
    if (!cityId || !city?.open) return
    if (window.location.hash !== "#book-details") return
    scrollToId("book-details", "auto")
  }, [cityId, city?.open])

  const nights = nightsBetween(checkIn, checkOut)
  const guests = roomTypes[roomType]?.maxGuests ?? 1
  const pricing = calculateTotal(roomType, nights, guests, cityId)
  const currency = city?.currency || "USD"

  const canPay = city?.open && nights > 0 && name.trim() && isValidPhone(phone)

  const summary = useMemo(
    () =>
      nights > 0
        ? {
            nights,
            checkIn,
            checkOut,
            roomName: cityRooms?.[roomType]?.name ?? roomTypes[roomType]?.name,
            total: pricing.total,
          }
        : null,
    [nights, checkIn, checkOut, roomType, pricing.total, cityRooms],
  )

  const handleCity = (id) => {
    const c = getCity(id)
    if (!c?.open) return
    setCityId(id)
    setError("")
    if (!checkIn) applyDefaultDates()
    requestAnimationFrame(() => scrollToId("book-details"))
  }

  const handlePay = async () => {
    if (!canPay) return
    setLoading(true)
    setError("")

    const payload = {
      cityId,
      cityName: city.name,
      roomType,
      roomName: cityRooms[roomType].name,
      checkIn,
      checkOut,
      nights,
      total: pricing.total,
      currency: stripeCurrencyCode(currency),
      phone: phone.trim(),
      name: name.trim(),
      guests,
    }

    try {
      if (stripeReady) {
        const data = await createCheckoutSession(payload)
        if (data.url) {
          globalThis.location.assign(data.url)
          return
        }
        throw new Error("No checkout URL returned")
      }

      saveDemoBooking(payload)
      const q = new URLSearchParams({
        demo: "1",
        city: cityId,
        checkIn,
        checkOut,
        room: roomType,
      })
      navigate(`/book/success?${q}`)
    } catch (err) {
      setError(err.message || "Booking could not be completed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="book-shell">
      <div className="page-wide border-b border-[var(--color-op-line)]/80 px-6 py-4 md:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-[14px] font-medium">
            ← {brand.name}
          </Link>
          <span className="label hidden sm:inline">Book your Outpost</span>
        </div>
      </div>

      <div
        className={`page-wide grid gap-10 py-10 lg:items-start lg:py-16 ${
          cityId && city?.open ? "lg:grid-cols-[1fr_340px] lg:gap-14" : ""
        }`}
      >
        <div className="min-w-0 space-y-10">
          {canceled && (
            <p className="fade-in rounded-lg border border-[var(--color-op-line)] bg-[var(--color-op-surface)] px-4 py-3 text-[14px] text-[var(--color-op-muted)]">
              Payment canceled — no charge. Pick up where you left off.
            </p>
          )}

          <section className="fade-in">
            <h1 className="headline-section">Where?</h1>
            <p className="lead mt-3">{brand.pitch}</p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {bookableCities.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  disabled={!c.open}
                  onClick={() => handleCity(c.id)}
                  className={`group city-tile touch-manipulation ${cityId === c.id ? "city-tile-selected" : ""} ${!c.open ? "cursor-not-allowed opacity-50" : ""}`}
                >
                  <div className="aspect-[2/1] overflow-hidden">
                    <Image
                      src={c.image}
                      alt={c.name}
                      className="zoom-on-hover h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="text-[16px] font-medium">{c.name}</p>
                      {c.open ? (
                        <p className="text-[12px] text-[var(--color-op-muted)]">
                          from {formatMoney(c.fromPrice, c.currency)}/person
                        </p>
                      ) : (
                        <p className="text-[12px] text-[var(--color-op-faint)]">Soon</p>
                      )}
                    </div>
                    <p className="mt-1 text-[12px] text-[var(--color-op-faint)]">{c.tagline}</p>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {cityId && city?.open && (
            <section id="book-details" className="fade-in stagger-1 scroll-mt-[4.5rem] space-y-8 md:scroll-mt-20">
              <ol className="flex flex-wrap gap-2 text-[12px] text-[var(--color-op-faint)]">
                <li className="rounded-full border border-[var(--color-op-line)] px-3 py-1 text-[var(--color-op-text)]">
                  1 · {city.name}
                </li>
                <li className="rounded-full border border-[var(--color-op-line)] px-3 py-1">2 · Dates & room</li>
                <li className="rounded-full border border-[var(--color-op-line)] px-3 py-1">3 · Pay</li>
              </ol>

              <CityMapPanel city={city} className="lg:hidden" />

              <div className="divider pt-4 lg:pt-10">
                <h2 className="headline-section text-[26px] md:text-[30px]">When & what room?</h2>
              </div>

              <StayDatesPicker
                checkIn={checkIn}
                checkOut={checkOut}
                onChange={({ checkIn: ci, checkOut: co }) => {
                  setCheckIn(ci)
                  setCheckOut(co)
                }}
              />

              <div className="grid gap-3 sm:grid-cols-2">
                {cityRooms &&
                  Object.values(cityRooms).map((room) => (
                    <button
                      key={room.id}
                      type="button"
                      onClick={() => setRoomType(room.id)}
                      className={`room-tile touch-manipulation active:scale-[0.99] ${roomType === room.id ? "room-tile-selected" : ""}`}
                    >
                      <p className="text-[15px] font-medium">{room.name}</p>
                      <p className="mt-1 text-[13px] text-[var(--color-op-muted)]">{room.tagline}</p>
                      <p className="mt-4 text-[22px] font-medium tracking-tight">
                        {formatMoney(room.pricePerPerson, currency)}
                        <span className="text-[13px] font-normal text-[var(--color-op-faint)]">
                          {" "}
                          / person / night
                        </span>
                      </p>
                      {room.id === "duo" && (
                        <p className="text-[12px] text-[var(--color-op-faint)]">
                          {formatMoney(room.pricePerNight, currency)} total · 2 guests
                        </p>
                      )}
                    </button>
                  ))}
              </div>

              {/* Mobile value + total */}
              <div className="book-card lg:hidden">
                <p className="label">Included</p>
                <p className="mt-2 text-[14px] text-[var(--color-op-muted)]">
                  Private room · Private bath · Wi‑Fi · 24/7 access · Robots run the building
                </p>
                {nights > 0 && (
                  <p className="mt-6 text-[28px] font-medium tracking-tight">
                    {formatMoney(pricing.total, currency)}
                    <span className="ml-2 text-[14px] font-normal text-[var(--color-op-faint)]">
                      · {nights} night{nights > 1 ? "s" : ""}
                    </span>
                  </p>
                )}
              </div>

              <div ref={checkoutRef} id="book-checkout" className="divider scroll-mt-[4.5rem] space-y-6 pt-10 md:scroll-mt-20">
                <h2 className="headline-section text-[26px] md:text-[30px]">Almost done</h2>
                <div className="book-card space-y-5">
                  <label className="block">
                    <span className="label">Full name</span>
                    <input
                      type="text"
                      required
                      className="input-field"
                      placeholder="As on your ID"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </label>
                  <label className="block">
                    <span className="label">WhatsApp / phone</span>
                    <input
                      type="tel"
                      required
                      inputMode="tel"
                      autoComplete="tel"
                      className="input-field"
                      placeholder="+1 415 555 0100"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    {phone && !isValidPhone(phone) && (
                      <p className="mt-2 text-[13px] text-[var(--color-op-warm)]">
                        Use a full number with country code (8–15 digits).
                      </p>
                    )}
                  </label>
                </div>

                {stripeReady === false && import.meta.env.DEV && (
                  <p className="rounded-lg border border-[var(--color-op-line)] bg-[var(--color-op-surface)] px-4 py-3 text-[13px] leading-relaxed text-[var(--color-op-muted)]">
                    Stripe is off — you&apos;ll complete a demo booking. Add{" "}
                    <code className="text-[12px]">STRIPE_SECRET_KEY</code> to{" "}
                    <code className="text-[12px]">.env</code> and run{" "}
                    <code className="text-[12px]">npm run dev</code> for real card checkout.
                  </p>
                )}

                {error && <p className="text-[14px] text-red-700">{error}</p>}

                <button
                  type="button"
                  disabled={!canPay || loading || stripeReady === null}
                  onClick={handlePay}
                  className="btn w-full sm:w-auto"
                >
                  {loading
                    ? stripeReady
                      ? "Redirecting to Stripe…"
                      : "Confirming…"
                    : stripeReady === null
                      ? "Checking payment…"
                      : stripeReady
                        ? `Pay ${nights > 0 ? formatMoney(pricing.total, currency) : ""} with Stripe`
                        : `Book your room · ${nights > 0 ? formatMoney(pricing.total, currency) : ""}`}
                </button>
                <p className="text-[12px] text-[var(--color-op-faint)]">
                  {stripeReady
                    ? "Secure card checkout on Stripe. Confirmation & door code via WhatsApp."
                    : "Demo booking — no charge. Confirmation screen only until Stripe is connected."}
                </p>
              </div>
            </section>
          )}
        </div>

        {cityId && city?.open && (
          <div className="hidden space-y-6 lg:block">
            <CityMapPanel city={city} className="sticky top-24" />
            <ValuePanel city={city} summary={summary} />
          </div>
        )}
      </div>
    </div>
  )
}
