import { brand } from "../../data/content"
import { valueIncluded } from "../../data/booking"

export default function ValuePanel({ city, summary }) {
  return (
    <aside className="book-card sticky top-24 hidden h-fit self-start lg:block">
      <p className="label">What you get</p>
      <p className="mt-3 font-[family-name:var(--font-serif)] text-[22px] leading-snug tracking-[-0.02em]">
        {brand.headline}
      </p>
      <p className="mt-4 text-[13px] leading-relaxed text-[var(--color-op-muted)]">{brand.pitch}</p>

      <ul className="mt-8 space-y-3 border-t border-[var(--color-op-line)] pt-8">
        {valueIncluded.map((item) => (
          <li key={item} className="flex gap-2 text-[14px] text-[var(--color-op-muted)]">
            <span className="text-[var(--color-op-text)]" aria-hidden>—</span>
            {item}
          </li>
        ))}
      </ul>

      {summary?.nights > 0 && (
        <div className="mt-8 border-t border-[var(--color-op-line)] pt-8">
          <p className="label">Your stay</p>
          <p className="mt-2 text-[15px] font-medium">{city?.name}</p>
          <p className="text-[13px] text-[var(--color-op-muted)]">
            {summary.checkIn} → {summary.checkOut}
          </p>
          <p className="mt-1 text-[13px] text-[var(--color-op-muted)]">
            {summary.roomName} · {summary.nights} night{summary.nights > 1 ? "s" : ""}
          </p>
        </div>
      )}
    </aside>
  )
}
