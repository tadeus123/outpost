import { useMemo, useState } from "react"
import { addDaysISO, formatStayLabel, todayISO } from "../../data/booking"

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

const PRESETS = [
  { id: "tonight", label: "Tonight", nights: 1 },
  { id: "2n", label: "2 nights", nights: 2 },
  { id: "3n", label: "3 nights", nights: 3 },
  { id: "week", label: "1 week", nights: 7 },
]

function parseLocalISO(iso) {
  const [y, m, d] = iso.split("-").map(Number)
  return new Date(y, m - 1, d)
}

function buildMonthDays(year, month) {
  const first = new Date(year, month, 1).getDay()
  const count = new Date(year, month + 1, 0).getDate()
  const cells = []
  for (let i = 0; i < first; i++) cells.push(null)
  for (let d = 1; d <= count; d++) cells.push(d)
  return cells
}

function toISO(year, month, day) {
  const m = String(month + 1).padStart(2, "0")
  const d = String(day).padStart(2, "0")
  return `${year}-${m}-${d}`
}

export default function StayDatesPicker({ checkIn, checkOut, onChange }) {
  const today = todayISO()
  const [view, setView] = useState(() => {
    const base = checkIn ? parseLocalISO(checkIn) : new Date()
    return { year: base.getFullYear(), month: base.getMonth() }
  })
  const [selecting, setSelecting] = useState("in")

  const todayMonth = parseLocalISO(today)
  const canPrev =
    view.year > todayMonth.getFullYear() ||
    (view.year === todayMonth.getFullYear() && view.month > todayMonth.getMonth())

  const monthLabel = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(new Date(view.year, view.month, 1))

  const cells = useMemo(
    () => buildMonthDays(view.year, view.month),
    [view.year, view.month],
  )

  const activePreset = PRESETS.find(
    (p) => checkIn === today && addDaysISO(checkIn, p.nights) === checkOut,
  )?.id

  const applyPreset = (nights) => {
    const ci = today
    onChange({ checkIn: ci, checkOut: addDaysISO(ci, nights) })
    setSelecting("in")
    const t = parseLocalISO(ci)
    setView({ year: t.getFullYear(), month: t.getMonth() })
  }

  const pickDay = (day) => {
    const iso = toISO(view.year, view.month, day)
    if (iso < today) return

    if (selecting === "in" || !checkIn || iso <= checkIn) {
      onChange({ checkIn: iso, checkOut: addDaysISO(iso, 1) })
      setSelecting("out")
      return
    }

    if (iso > checkIn) {
      onChange({ checkIn, checkOut: iso })
      setSelecting("in")
    }
  }

  const shiftMonth = (delta) => {
    const d = new Date(view.year, view.month + delta, 1)
    const min = new Date(todayMonth.getFullYear(), todayMonth.getMonth(), 1)
    if (d < min) return
    setView({ year: d.getFullYear(), month: d.getMonth() })
  }

  return (
    <div className="book-card space-y-5">
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => applyPreset(p.nights)}
            className={`min-h-[44px] touch-manipulation rounded-full border px-3.5 py-2 text-[13px] transition active:scale-[0.98] ${
              activePreset === p.id
                ? "border-[var(--color-op-text)] bg-[var(--color-op-text)] text-[var(--color-op-bg)]"
                : "border-[var(--color-op-line)] text-[var(--color-op-muted)] hover:border-[var(--color-op-text)] hover:text-[var(--color-op-text)]"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {checkIn && checkOut && (
        <p className="font-[family-name:var(--font-serif)] text-[20px] tracking-[-0.02em] text-[var(--color-op-text)]">
          {formatStayLabel(checkIn, checkOut)}
        </p>
      )}

      <p className="text-[13px] text-[var(--color-op-faint)]">
        {selecting === "in"
          ? "Tap check-in, then check-out — same month, no typing."
          : "Now tap your check-out day."}
      </p>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <button
            type="button"
            onClick={() => shiftMonth(-1)}
            disabled={!canPrev}
            className="icon-btn text-[18px] text-[var(--color-op-muted)] disabled:opacity-30"
            aria-label="Previous month"
          >
            ←
          </button>
          <p className="text-[15px] font-medium">{monthLabel}</p>
          <button
            type="button"
            onClick={() => shiftMonth(1)}
            className="icon-btn text-[18px] text-[var(--color-op-muted)]"
            aria-label="Next month"
          >
            →
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-[11px] text-[var(--color-op-faint)]">
          {WEEKDAYS.map((w) => (
            <span key={w} className="py-1">
              {w}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {cells.map((day, i) =>
            day === null ? (
              <span key={`e-${i}`} />
            ) : (
              (() => {
                const iso = toISO(view.year, view.month, day)
                const disabled = iso < today
                const isIn = iso === checkIn
                const isOut = iso === checkOut
                const inRange =
                  checkIn && checkOut && iso > checkIn && iso < checkOut
                return (
                  <button
                    key={iso}
                    type="button"
                    disabled={disabled}
                    onClick={() => pickDay(day)}
                    className={`calendar-day ${
                      disabled
                        ? "cursor-not-allowed text-[var(--color-op-faint)]/40"
                        : isIn || isOut
                          ? "bg-[var(--color-op-text)] font-medium text-[var(--color-op-bg)]"
                          : inRange
                            ? "bg-[var(--color-op-line)]/60 text-[var(--color-op-text)]"
                            : "text-[var(--color-op-text)] hover:bg-[var(--color-op-line)]"
                    }`}
                  >
                    {day}
                  </button>
                )
              })()
            ),
          )}
        </div>
      </div>
    </div>
  )
}
