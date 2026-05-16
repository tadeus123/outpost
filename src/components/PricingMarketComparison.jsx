import BookLink from "./BookLink"
import SectionHeading from "./SectionHeading"
import { pricing } from "../data/content"
import { formatMoney } from "../data/booking"

function mid(low, high) {
  return Math.round((low + high) / 2)
}

function savingsVsComparable(comparableMid, outpostSolo) {
  if (comparableMid <= outpostSolo) return 0
  return Math.round(((comparableMid - outpostSolo) / comparableMid) * 100)
}

export default function PricingMarketComparison() {
  const { marketComparison: data } = pricing

  return (
    <section className="divider mt-20 md:mt-28">
      <SectionHeading title={data.title} subtitle={data.subtitle} />
      <div className="mt-12 space-y-0 border-t border-[var(--color-op-line)]">
        {data.cities.map((city, i) => {
          const comparableMid = mid(city.comparableLow, city.comparableHigh)
          const save = savingsVsComparable(comparableMid, city.outpostSolo)
          const fmt = (n) => formatMoney(n, city.currency)

          return (
            <article
              key={city.id}
              className={`grid gap-6 py-10 md:grid-cols-[1fr_auto] md:items-center md:gap-10 md:py-12 ${
                i > 0 ? "border-t border-[var(--color-op-line)]" : ""
              }`}
            >
              <div>
                <h3 className="text-[17px] font-medium">{city.name}</h3>
                <p className="mt-1 text-[13px] text-[var(--color-op-faint)]">{city.areas}</p>
                <p className="mt-4 text-[14px] leading-relaxed text-[var(--color-op-muted)]">
                  Similar hotels here:{" "}
                  <span className="text-[var(--color-op-text)]">
                    {fmt(city.comparableLow)}–{fmt(city.comparableHigh)}
                  </span>
                  <span className="text-[var(--color-op-faint)]"> / night</span>
                </p>
              </div>
              <div className="md:text-right">
                <p className="text-[12px] uppercase tracking-[0.12em] text-[var(--color-op-faint)]">Outpost</p>
                <p className="mt-2 text-[22px] font-medium tracking-tight">
                  {fmt(city.outpostSolo)}
                  <span className="text-[14px] font-normal text-[var(--color-op-faint)]"> solo</span>
                </p>
                <p className="mt-1 text-[15px] text-[var(--color-op-muted)]">
                  {fmt(city.outpostDuoTotal)} duo · 2 guests
                </p>
                {save > 0 && (
                  <p className="mt-3 text-[13px] font-medium text-[var(--color-op-warm)]">
                    ~{save}% less than typical solo rate
                  </p>
                )}
              </div>
            </article>
          )
        })}
      </div>
      <p className="photo-caption mt-8 max-w-xl">{data.footnote}</p>
      <p className="mt-10">
        <BookLink to="/book" className="btn">
          Book a room
        </BookLink>
      </p>
    </section>
  )
}
