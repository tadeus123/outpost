import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { brand } from "../data/content"
import { getCity } from "../data/booking"
import { getCheckoutSession } from "../lib/api"

export default function BookSuccess() {
  const [params] = useSearchParams()
  const demo = params.get("demo") === "1"
  const sessionId = params.get("session_id")
  const cityId = params.get("city")
  const checkIn = params.get("checkIn")
  const checkOut = params.get("checkOut")
  const roomType = params.get("room")
  const city = getCity(cityId)
  const [session, setSession] = useState(null)

  useEffect(() => {
    if (sessionId && !demo) {
      getCheckoutSession(sessionId)
        .then(setSession)
        .catch(() => {})
    }
  }, [sessionId, demo])

  const meta = session?.metadata

  return (
    <div className="book-shell flex min-h-[80vh] items-center">
      <div className="page-narrow w-full text-center fade-in">
        <p className="label">
          {demo ? "Demo booking" : session?.status === "paid" ? "Paid" : "Confirmed"}
        </p>
        <h1 className="headline-section mt-4">You&apos;re booked.</h1>
        <p className="lead mx-auto mt-6 max-w-md">
          {meta?.cityName || city?.name
            ? `Outpost ${meta?.cityName || city?.name} is yours.`
            : "Your Outpost is reserved."}{" "}
          We&apos;ll message you on WhatsApp with confirmation and self check-in details.
        </p>

        {(meta?.checkIn || meta?.checkOut || (demo && checkIn && checkOut)) && (
          <div className="book-card mx-auto mt-10 max-w-sm text-left text-[14px]">
            <p className="text-[var(--color-op-muted)]">
              <span className="text-[var(--color-op-text)]">Dates</span>
              <br />
              {meta?.checkIn || checkIn} → {meta?.checkOut || checkOut}
            </p>
            {(meta?.roomName || meta?.roomType || roomType) && (
              <p className="mt-4 text-[var(--color-op-muted)]">
                <span className="text-[var(--color-op-text)]">Room</span>
                <br />
                {meta?.roomName || meta?.roomType || roomType}
              </p>
            )}
          </div>
        )}

        <p className="mt-8 text-[13px] text-[var(--color-op-faint)]">
          {brand.robotLine} Door code sent on WhatsApp before arrival.
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Link to="/" className="btn">Back home</Link>
          <Link to="/how-it-works" className="btn-ghost">How check-in works</Link>
        </div>
      </div>
    </div>
  )
}
