import { Link } from "react-router-dom"
import { pricing } from "../data/content"

export default function PricingCards() {
  return (
    <div className="divider mt-20 md:mt-28">
      {pricing.launch.map((plan, i) => (
        <article
          key={plan.id}
          className={`grid gap-8 py-16 md:grid-cols-[1fr_auto] md:items-start md:gap-16 md:py-20 ${
            i < pricing.launch.length - 1 ? "border-b border-[var(--color-op-line)]" : ""
          }`}
        >
          <div>
            <p className="label">{plan.name}</p>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[var(--color-op-muted)]">
              {plan.description}
            </p>
            <ul className="mt-10 space-y-2 text-[14px] text-[var(--color-op-muted)]">
              {plan.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
          <div className="md:text-right">
            <p className="price-big">
              ${plan.price}
              <span className="ml-1 text-[15px] font-normal text-[var(--color-op-faint)]">{plan.unit}</span>
            </p>
            {plan.roomTotal && (
              <p className="mt-2 text-[13px] text-[var(--color-op-muted)]">{plan.roomTotal}</p>
            )}
            <Link to={`/book?room=${plan.id}`} className="btn mt-8 !px-5 !py-2.5 !text-[13px]">
              Book & pay
            </Link>
          </div>
        </article>
      ))}
    </div>
  )
}
