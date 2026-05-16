import BookLink from "../components/BookLink"
import Image from "../components/Image"
import SectionHeading from "../components/SectionHeading"
import { cities } from "../data/content"
import { bookableCities } from "../data/booking"

const openIds = new Set(bookableCities.filter((c) => c.open).map((c) => c.id))

export default function Cities() {
  const real = cities.filter((c) => c.status !== "joke")

  return (
    <section className="section-space">
      <div className="page-narrow">
        <SectionHeading
          title="Cities"
          subtitle="Private hotel rooms in the world's most expensive cities — each Outpost fully operated by robots."
        />
      </div>

      <div className="page-wide mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {bookableCities
          .filter((c) => c.open)
          .map((city) => (
          <BookLink
            key={city.id}
            to={`/book?city=${city.id}#book-details`}
            className="group overflow-hidden rounded-lg border border-[var(--color-op-line)] bg-[var(--color-op-surface)] transition hover:shadow-[0_12px_40px_-12px_rgba(28,25,23,0.12)]"
          >
            <div className="aspect-[16/10] overflow-hidden">
              <Image
                src={city.image}
                alt={city.name}
                className="zoom-on-hover h-full w-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-[16px] font-medium">Outpost {city.name}</h3>
              <p className="mt-1 text-[13px] text-[var(--color-op-muted)]">{city.tagline}</p>
            </div>
          </BookLink>
        ))}
      </div>

      <ul className="page-narrow mt-16 space-y-0">
        {real.map((city, i) => (
          <li
            key={city.id}
            className={`flex flex-wrap items-center justify-between gap-x-4 gap-y-2 py-8 ${
              i > 0 ? "border-t border-[var(--color-op-line)]" : ""
            }`}
          >
            <div className="min-w-0 flex-1">
              <h3 className="text-[16px] font-medium">Outpost {city.name}</h3>
              <p className="mt-1 text-[13px] text-[var(--color-op-faint)]">{city.region}</p>
            </div>
            {openIds.has(city.id) ? (
              <BookLink to={`/book?city=${city.id}#book-details`} className="link-quiet shrink-0 text-[13px]">
                Book →
              </BookLink>
            ) : (
              <span className="label shrink-0 capitalize">{city.status}</span>
            )}
          </li>
        ))}
      </ul>

      <p className="page-narrow mt-20 text-center">
        <BookLink to="/book" className="btn">Book a room</BookLink>
      </p>
    </section>
  )
}
