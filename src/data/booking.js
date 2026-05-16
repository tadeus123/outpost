import { images } from "./images"

export const roomTypes = {
  solo: {
    id: "solo",
    name: "Solo room",
    tagline: "Private room for one",
    maxGuests: 1,
    stripeEnvKey: "STRIPE_PRICE_SOLO",
  },
  duo: {
    id: "duo",
    name: "Duo room",
    tagline: "Private room · 2 guests",
    maxGuests: 2,
    stripeEnvKey: "STRIPE_PRICE_DUO",
  },
}

/** Per-person nightly rates by open city */
export const cityRates = {
  "san-francisco": {
    currency: "USD",
    soloPerPerson: 35,
    duoPerPerson: 25,
    fromPrice: 25,
  },
  berlin: {
    currency: "EUR",
    soloPerPerson: 20,
    duoPerPerson: 10,
    fromPrice: 10,
  },
  london: {
    currency: "GBP",
    soloPerPerson: 20,
    duoPerPerson: 10,
    fromPrice: 10,
  },
}

export function getCityRoomTypes(cityId) {
  const rates = cityRates[cityId]
  if (!rates) return null

  const { soloPerPerson, duoPerPerson } = rates
  return {
    solo: {
      ...roomTypes.solo,
      pricePerPerson: soloPerPerson,
      pricePerNight: soloPerPerson,
    },
    duo: {
      ...roomTypes.duo,
      pricePerPerson: duoPerPerson,
      pricePerNight: duoPerPerson * 2,
    },
  }
}

/** Cities open for booking (others show as coming soon on book page) */
export const bookableCities = [
  {
    id: "san-francisco",
    name: "San Francisco",
    country: "United States",
    fromPrice: cityRates["san-francisco"].fromPrice,
    currency: cityRates["san-francisco"].currency,
    open: true,
    image: images.cities["san-francisco"],
    tagline: "SoMa · Hayes Valley · Mission Bay",
    address: "1455 Mission St, San Francisco, CA 94103, USA",
    lat: 37.7732,
    lng: -122.4173,
  },
  {
    id: "berlin",
    name: "Berlin",
    country: "Germany",
    fromPrice: cityRates.berlin.fromPrice,
    currency: cityRates.berlin.currency,
    open: true,
    image: images.cities.berlin,
    tagline: "Mitte · Kreuzberg · Friedrichshain",
    address: "Torstraße 124, 10119 Berlin, Germany",
    lat: 52.5294,
    lng: 13.4022,
  },
  {
    id: "london",
    name: "London",
    country: "United Kingdom",
    fromPrice: cityRates.london.fromPrice,
    currency: cityRates.london.currency,
    open: true,
    image: images.cities.london,
    tagline: "Shoreditch · King's Cross",
    address: "100 Shoreditch High St, London E1 6JQ, UK",
    lat: 51.5246,
    lng: -0.078,
  },
  {
    id: "new-york",
    name: "New York",
    country: "United States",
    fromPrice: 38,
    currency: "USD",
    open: false,
    image: images.cities["new-york"],
    tagline: "Opening soon",
    address: "455 W 37th St, New York, NY 10018, USA",
    lat: 40.7567,
    lng: -73.9982,
  },
  {
    id: "paris",
    name: "Paris",
    country: "France",
    fromPrice: 34,
    currency: "EUR",
    open: false,
    image: images.cities.paris,
    tagline: "Opening soon",
    address: "14 Rue de la Roquette, 75011 Paris, France",
    lat: 48.8558,
    lng: 2.3755,
  },
]

export const valueIncluded = [
  "Clean private room",
  "Private bathroom",
  "Fast internet",
  "Great lighting",
  "24/7 access",
  "No breakfast, no fluff, no bunks",
]

export function getCity(id) {
  return bookableCities.find((c) => c.id === id)
}

function parseLocalISO(iso) {
  const [y, m, d] = iso.split("-").map(Number)
  return new Date(y, m - 1, d)
}

export function nightsBetween(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 0
  const a = parseLocalISO(checkIn)
  const b = parseLocalISO(checkOut)
  const diff = (b - a) / (1000 * 60 * 60 * 24)
  return diff > 0 ? Math.floor(diff) : 0
}

export function calculateTotal(roomTypeId, nights, guests = 1, cityId) {
  const rooms = getCityRoomTypes(cityId)
  const room = rooms?.[roomTypeId]
  if (!room || nights < 1) return { nights: 0, perNight: 0, total: 0, guests }

  const perNight = room.pricePerNight
  return {
    nights,
    perNight,
    total: perNight * nights,
    guests: Math.min(guests, room.maxGuests),
    room,
  }
}

const moneyLocale = { USD: "en-US", EUR: "de-DE", GBP: "en-GB" }

export function formatMoney(amount, currency = "USD") {
  return new Intl.NumberFormat(moneyLocale[currency] || "en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function minCheckOut(checkIn) {
  if (!checkIn) return ""
  return addDaysISO(checkIn, 1)
}

export function todayISO() {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${day}`
}

export function addDaysISO(iso, days) {
  const d = parseLocalISO(iso)
  d.setDate(d.getDate() + days)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${day}`
}

/** Most guests book soon — default to tonight, 1 night */
export function defaultStayDates() {
  const checkIn = todayISO()
  return { checkIn, checkOut: addDaysISO(checkIn, 1) }
}

export function formatStayLabel(checkIn, checkOut) {
  if (!checkIn || !checkOut) return ""
  const a = parseLocalISO(checkIn)
  const b = parseLocalISO(checkOut)
  const nights = nightsBetween(checkIn, checkOut)
  const fmt = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  })
  const sameMonth =
    a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear()
  if (sameMonth) {
    return `${fmt.format(a)} – ${b.getDate()}, ${nights} night${nights > 1 ? "s" : ""}`
  }
  return `${fmt.format(a)} – ${fmt.format(b)} · ${nights} night${nights > 1 ? "s" : ""}`
}

/** Loose E.164-friendly check (digits only, 8–15 chars) */
export function isValidPhone(phone) {
  const digits = String(phone).replace(/\D/g, "")
  return digits.length >= 8 && digits.length <= 15
}

export function googleMapsOpenUrl(city) {
  const query =
    city.lat != null && city.lng != null
      ? `${city.lat},${city.lng}`
      : encodeURIComponent(city.address)
  return `https://www.google.com/maps/search/?api=1&query=${query}`
}

export function googleMapsEmbedUrl(city) {
  const q =
    city.lat != null && city.lng != null
      ? `${city.lat},${city.lng}`
      : encodeURIComponent(city.address)
  return `https://www.google.com/maps?q=${q}&z=15&output=embed`
}
