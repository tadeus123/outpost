/**
 * Downloads placeholder photos into public/images/.
 * Run: node scripts/fetch-placeholders.mjs
 */
import { mkdir, writeFile } from "fs/promises"
import { dirname, join } from "path"
import { fileURLToPath } from "url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "images")

const assets = [
  { file: "hero.jpg", url: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1600&q=80" },
  { file: "room-single.jpg", url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80" },
  { file: "room-double.jpg", url: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&q=80" },
  { file: "bathroom.jpg", url: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=1200&q=80" },
  { file: "community.jpg", url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80" },
  { file: "lighting.jpg", url: "https://images.unsplash.com/photo-1565814636199-ae8133055c1c?w=1200&q=80" },
  { file: "checkin.jpg", url: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&q=80" },
  { file: "hallway.jpg", url: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1200&q=80" },
  { file: "bed-detail.jpg", url: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&q=80" },
  { file: "workspace.jpg", url: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=80" },
  { file: "gallery-1.jpg", url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80" },
  { file: "gallery-2.jpg", url: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&q=80" },
  { file: "gallery-3.jpg", url: "https://images.unsplash.com/photo-1616594039964-40829a9d2999?w=800&q=80" },
  { file: "gallery-4.jpg", url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80" },
  { file: "robots/hero.jpg", url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1400&q=80" },
  { file: "robots/fleet.jpg", url: "https://images.unsplash.com/photo-1535378620166-273708ff44ad?w=1200&q=80" },
  { file: "robots/housekeeping.jpg", url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80" },
  { file: "robots/logistics.jpg", url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80" },
  { file: "robots/patrol.jpg", url: "https://images.unsplash.com/photo-1558002038-1053887e4172?w=1200&q=80" },
  { file: "robots/automation.jpg", url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80" },
  { file: "cities/san-francisco.jpg", url: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=80" },
  { file: "cities/new-york.jpg", url: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80" },
  { file: "cities/london.jpg", url: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80" },
  { file: "cities/berlin.jpg", url: "https://images.unsplash.com/photo-1560930950-5cc20e80e392?w=800&q=80" },
  { file: "cities/paris.jpg", url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80" },
  { file: "cities/amsterdam.jpg", url: "https://images.unsplash.com/photo-1523906834894-d5ef930a5ccb?w=800&q=80" },
  { file: "cities/brussels.jpg", url: "https://images.unsplash.com/photo-1555992336-fb0d3daba2bf?w=800&q=80" },
  { file: "cities/tokyo.jpg", url: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80" },
  { file: "cities/munich.jpg", url: "https://images.unsplash.com/photo-1595867818082-083862f3d630?w=800&q=80" },
  { file: "cities/singapore.jpg", url: "https://images.unsplash.com/photo-1525621486881-28f57e811ac9?w=800&q=80" },
  /** Shenzhen Bay, Nanshan — skyline from North Bay Harbor (Unsplash / T Y) */
  {
    file: "cities/shenzhen.jpg",
    url: "https://images.unsplash.com/photo-1759970729294-99c7eebeaf54?w=1400&q=88&fm=jpg",
  },
  { file: "cities/shanghai.jpg", url: "https://images.unsplash.com/photo-1538428494239-9a0e2717e956?w=800&q=80" },
  { file: "cities/hong-kong.jpg", url: "https://images.unsplash.com/photo-1536599018102-eca06a50476e?w=800&q=80" },
  { file: "cities/guangzhou.jpg", url: "https://images.unsplash.com/photo-1555893527-48ab1ac3fe2f?w=800&q=80" },
  { file: "cities/las-vegas.jpg", url: "https://images.unsplash.com/photo-1605833555487-3f172afa951a?w=800&q=80" },
]

async function download(path, url) {
  const full = join(root, path)
  await mkdir(dirname(full), { recursive: true })
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${url} → ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  await writeFile(full, buf)
  console.log("✓", path)
}

for (const { file, url } of assets) {
  try {
    await download(file, url)
  } catch (err) {
    const seed = file.replace(/\W+/g, "-")
    const fallback = `https://picsum.photos/seed/outpost-${seed}/1200/800`
    console.warn("!", file, err.message, "→ picsum")
    await download(file, fallback)
  }
}

console.log("\nDone. Replace files in public/images/ anytime.")
