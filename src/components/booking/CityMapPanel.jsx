import { googleMapsEmbedUrl, googleMapsOpenUrl } from "../../data/booking"

export default function CityMapPanel({ city, className = "" }) {
  if (!city?.address) return null

  const mapsOpen = googleMapsOpenUrl(city)
  const embedSrc = googleMapsEmbedUrl(city)

  return (
    <aside className={`book-card overflow-hidden p-0 ${className}`}>
      <div className="border-b border-[var(--color-op-line)] px-6 py-5">
        <p className="label">Outpost location</p>
        <p className="mt-2 font-[family-name:var(--font-serif)] text-[20px] leading-snug tracking-[-0.02em]">
          Outpost {city.name}
        </p>
        <p className="mt-2 text-[14px] leading-relaxed text-[var(--color-op-muted)]">{city.address}</p>
        <a
          href={mapsOpen}
          target="_blank"
          rel="noopener noreferrer"
          className="link-quiet mt-3 inline-flex min-h-[44px] items-center text-[13px]"
        >
          Open in Google Maps →
        </a>
      </div>
      <div className="relative aspect-[4/3] w-full bg-[#e7e5e4] lg:aspect-square">
        <iframe
          title={`Map — Outpost ${city.name}`}
          src={embedSrc}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      <p className="border-t border-[var(--color-op-line)] px-6 py-3 text-center text-[12px] text-[var(--color-op-faint)] lg:hidden">
        Pinch or drag the map · or use the link above to open in Google Maps
      </p>
    </aside>
  )
}
