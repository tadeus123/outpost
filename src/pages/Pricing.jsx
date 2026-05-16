import { Link } from "react-router-dom"
import SectionHeading from "../components/SectionHeading"
import PricingCards from "../components/PricingCards"
import PricingMarketComparison from "../components/PricingMarketComparison"
import { brand, pricing } from "../data/content"

export default function Pricing() {
  return (
    <>
      <section className="section-space pb-0">
        <div className="page-narrow">
          <p className="label">{brand.robotLine}</p>
          <SectionHeading
            title="Pricing"
            subtitle="Private room and bath in expensive neighborhoods — without paying for a full human hotel crew."
          />
        </div>
      </section>

      <section className="section-space-sm pt-0">
        <div className="page-narrow">
          <PricingMarketComparison />
        </div>
      </section>

      <section className="section-space-sm pt-0">
        <div className="page-narrow">
          <p className="label">Outpost rates</p>
          <h2 className="headline-section mt-4">What you pay</h2>
          <p className="lead mt-6 max-w-[540px]">
            Launch pricing while we open the first buildings. Robot operations — not robot guests.
          </p>
          <PricingCards />
        </div>
      </section>

      <section className="section-space-sm pt-0 pb-28 md:pb-40">
        <div className="page-narrow">
          <div className="divider">
            <p className="label pt-16">Launch · Normal · Peak</p>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[var(--color-op-muted)]">
              Rates move with demand once each city is fully open.
            </p>
            <div className="mt-8 space-y-8 text-[15px]">
              <p className="grid gap-2 md:grid-cols-[120px_1fr_1fr_1fr]">
                <span className="sr-only md:not-sr-only md:text-[var(--color-op-faint)]" />
                <span className="text-[12px] uppercase tracking-[0.1em] text-[var(--color-op-faint)]">Launch</span>
                <span className="text-[12px] uppercase tracking-[0.1em] text-[var(--color-op-faint)]">Normal</span>
                <span className="text-[12px] uppercase tracking-[0.1em] text-[var(--color-op-faint)]">Peak</span>
              </p>
              <p className="grid gap-2 md:grid-cols-[120px_1fr_1fr_1fr]">
                <span className="text-[var(--color-op-faint)]">Solo</span>
                <span>${pricing.normal.solo.launch}</span>
                <span className="text-[var(--color-op-muted)]">${pricing.normal.solo.normal}</span>
                <span className="text-[var(--color-op-muted)]">${pricing.normal.solo.peak}</span>
              </p>
              <p className="grid gap-2 md:grid-cols-[120px_1fr_1fr_1fr]">
                <span className="text-[var(--color-op-faint)]">Duo / person</span>
                <span>${pricing.normal.duoPerPerson.launch}</span>
                <span className="text-[var(--color-op-muted)]">${pricing.normal.duoPerPerson.normal}</span>
                <span className="text-[var(--color-op-muted)]">${pricing.normal.duoPerPerson.peak}</span>
              </p>
            </div>
            <p className="mt-16 text-[13px] leading-relaxed text-[var(--color-op-faint)]">
              San Francisco hotel tax may apply. Prices before tax.
            </p>
          </div>

          <p className="mt-20 text-center">
            <Link to="/book" className="btn">
              Book a room
            </Link>
          </p>
        </div>
      </section>
    </>
  )
}
