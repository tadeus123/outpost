import { useEffect, useState } from "react"
import { Link, NavLink } from "react-router-dom"
import BookLink from "./BookLink"
import { brand } from "../data/content"

const nav = [
  { to: "/", label: "Home", end: true },
  { to: "/product", label: "Product" },
  { to: "/cities", label: "Cities" },
  { to: "/pricing", label: "Pricing" },
  { to: "/how-it-works", label: "How it works" },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener("keydown", onKey)
    }
  }, [open])

  return (
    <header className="nav-bar fixed top-0 left-0 right-0 z-50">
      <div className="page-wide flex h-14 items-center justify-between md:h-16">
        <Link to="/" className="text-[15px] font-medium tracking-[-0.02em]">
          {brand.name}
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {nav.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `text-[13px] transition ${isActive ? "text-[var(--color-op-text)]" : "text-[var(--color-op-muted)] hover:text-[var(--color-op-text)]"}`
              }
            >
              {label}
            </NavLink>
          ))}
          <BookLink to="/book" className="btn !min-h-[40px] !px-5 !py-2 !text-[13px]">
            Book
          </BookLink>
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <BookLink to="/book" className="flex min-h-[44px] min-w-[44px] items-center justify-center text-[13px] font-medium">
            Book
          </BookLink>
          <button
            type="button"
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-[13px] active:bg-[var(--color-op-line)]"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="divider max-h-[calc(100dvh-3.5rem)] overflow-y-auto overscroll-contain px-6 py-6 md:hidden"
          aria-label="Main"
        >
          {nav.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex min-h-[48px] items-center text-[15px] ${isActive ? "font-medium text-[var(--color-op-text)]" : "text-[var(--color-op-muted)]"}`
              }
            >
              {label}
            </NavLink>
          ))}
          <BookLink to="/book" onClick={() => setOpen(false)} className="btn mt-4 w-full">
            Book a room
          </BookLink>
        </nav>
      )}
    </header>
  )
}
