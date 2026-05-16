import { Link } from "react-router-dom"
import { brand } from "../data/content"

export default function Footer() {
  return (
    <footer className="divider">
      <div className="page-wide flex flex-col gap-12 py-16 md:flex-row md:items-end md:justify-between md:py-20">
        <div>
          <p className="text-[15px] font-medium">{brand.name}</p>
            <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-[var(--color-op-muted)]">
              {brand.pitch}
            </p>
        </div>
        <nav className="flex flex-wrap gap-x-8 gap-y-2 text-[13px] text-[var(--color-op-muted)]">
          <Link to="/product" className="hover:text-[var(--color-op-text)]">Product</Link>
          <Link to="/cities" className="hover:text-[var(--color-op-text)]">Cities</Link>
          <Link to="/pricing" className="hover:text-[var(--color-op-text)]">Pricing</Link>
          <Link to="/how-it-works" className="hover:text-[var(--color-op-text)]">How it works</Link>
          <Link to="/book" className="hover:text-[var(--color-op-text)]">Book</Link>
        </nav>
      </div>
      <div className="page-wide pb-10 text-[12px] text-[var(--color-op-faint)]">
        © {new Date().getFullYear()} Outpost
      </div>
    </footer>
  )
}
