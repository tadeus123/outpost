const TABLE = "outpost_city_suggestions"

function supabaseConfig() {
  const rawUrl =
    process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL ?? ""
  const url = rawUrl.replace(/\/$/, "")
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  return { url, key }
}

export function citySuggestionsEnabled() {
  const { url, key } = supabaseConfig()
  return Boolean(url && key)
}

export function normalizeCity(raw) {
  return String(raw ?? "")
    .trim()
    .replace(/\s+/g, " ")
}

export async function saveCitySuggestion(rawCity) {
  const city = normalizeCity(rawCity)

  if (city.length < 2) {
    const err = new Error("Please enter a city name.")
    err.status = 400
    throw err
  }
  if (city.length > 80) {
    const err = new Error("City name is too long.")
    err.status = 400
    throw err
  }

  const { url, key } = supabaseConfig()
  if (!url || !key) {
    const err = new Error("Suggestions are not available right now.")
    err.status = 503
    throw err
  }

  const res = await fetch(`${url}/rest/v1/${TABLE}`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({ city }),
  })

  if (!res.ok) {
    const body = await res.text().catch(() => "")
    console.error("Supabase city suggestion failed:", res.status, body)
    const err = new Error("Could not save your suggestion.")
    err.status = 502
    throw err
  }

  return { ok: true }
}
