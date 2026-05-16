/**
 * Copies curated photos from pictures/hotel/ → public/images/
 * One room look + one bath look, reused everywhere so the site reads as one property.
 * Run: npm run images:hotel
 */
import { copyFile, mkdir } from "fs/promises"
import { dirname, join } from "path"
import { fileURLToPath } from "url"

const hotelDir = join(dirname(fileURLToPath(import.meta.url)), "..", "pictures", "hotel")
const outDir = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "images")

/** Pod room + premium grey bath suite (same moody palette in both bath shots) */
const ROOM = "1d90410afd500985c1a60e900792643f.jpg"
const WORKSPACE = "3c76b69d47306eb0f02a392d0507fda7.jpg"
const BATH = "download (4).jpg"
const BATH_ALT = "download (5).jpg"
const COMMUNITY = "community-lounge.jpg"

/** [source in pictures/hotel, destination in public/images] */
const picks = [
  [ROOM, "room-single.jpg"],
  [ROOM, "room-double.jpg"],
  [WORKSPACE, "workspace.jpg"],
  [BATH, "bathroom.jpg"],
  [BATH_ALT, "bathroom-alt.jpg"],
  [COMMUNITY, "community.jpg"],
]

await mkdir(outDir, { recursive: true })

for (const [from, to] of picks) {
  const src = join(hotelDir, from)
  const dest = join(outDir, to)
  await copyFile(src, dest)
  console.log(`✓ ${to} ← ${from}`)
}

console.log(`\n${picks.length} hotel images → public/images/ (reused in src/data/images.js)`)
