import { useState } from "react"
import { submitCitySuggestion } from "../lib/api"

export default function CityWhisper() {
  const [city, setCity] = useState("")
  const [status, setStatus] = useState("idle")
  const [message, setMessage] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()
    const value = city.trim()
    if (value.length < 2 || status === "sending") return

    setStatus("sending")
    setMessage("")

    try {
      await submitCitySuggestion(value)
      setStatus("done")
      setMessage("Thank you — we read every whisper.")
      setCity("")
    } catch (err) {
      setStatus("idle")
      setMessage(err.message || "Something went wrong. Try again in a moment.")
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="page-narrow mt-20 border-t border-[var(--color-op-line)] pt-14"
    >
      <label htmlFor="city-whisper" className="block max-w-md">
        <span className="font-[family-name:var(--font-serif)] text-[15px] italic leading-relaxed text-[var(--color-op-muted)]">
          Whisper a city where you would enjoy an Outpost
        </span>
        <input
          id="city-whisper"
          name="city"
          type="text"
          autoComplete="address-level2"
          placeholder="City name"
          value={city}
          onChange={(e) => {
            setCity(e.target.value)
            if (status === "done") setStatus("idle")
            if (message) setMessage("")
          }}
          disabled={status === "sending"}
          maxLength={80}
          className="city-whisper-input mt-5 w-full max-w-[220px]"
        />
        <span className="mt-2 block text-[11px] tracking-wide text-[var(--color-op-faint)]">
          Press Enter
        </span>
      </label>
      {message ? (
        <p
          className="mt-4 max-w-md text-[13px] leading-relaxed text-[var(--color-op-faint)]"
          role={status === "done" ? "status" : "alert"}
        >
          {message}
        </p>
      ) : null}
    </form>
  )
}
