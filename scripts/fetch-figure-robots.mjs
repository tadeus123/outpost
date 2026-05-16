/**
 * Downloads Figure humanoid photos from Figure's public Contentful CDN
 * into public/images/robots/ (same filenames the site expects).
 *
 * Sources: figure.ai news & product pages. For production, confirm usage
 * rights with Figure — demo/marketing use of their published press assets.
 *
 * Run: node scripts/fetch-figure-robots.mjs
 */
import { mkdir, writeFile } from "fs/promises"
import { dirname, join } from "path"
import { fileURLToPath } from "url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "images", "robots")

/** High-res JPEG via Contentful image API */
function hiRes(url) {
  const u = new URL(url)
  u.searchParams.set("w", "1600")
  u.searchParams.set("fm", "jpg")
  u.searchParams.set("q", "88")
  return u.toString()
}

/**
 * Slot → Figure asset (matched to role on site)
 * @see public/images/README.md
 */
const robots = [
  {
    file: "hero.jpg",
    source: "Figure 03 hero",
    url: "https://images.ctfassets.net/qx5k8y1u9drj/2qouCIcKmTzyS3v2HqyQB2/1dbed1bf7345042abc62823d9d890593/hero-figure-03-image-02.jpg",
  },
  {
    file: "fleet.jpg",
    source: "BotQ manufacturing (Figure news)",
    url: "https://images.ctfassets.net/qx5k8y1u9drj/69cvfJk5pvV03bgXFHq0Rj/324e4f9fc59388f1ca6b0ccb09f63fe9/BotQ7.png",
  },
  {
    file: "housekeeping.jpg",
    source: "Helix bedroom tidy (Figure news)",
    url: "https://images.ctfassets.net/qx5k8y1u9drj/2VXRGwCNqarI0PwDCxgY4Y/9c51567997eff0872492d200f3751fa8/BEDROOM_TIDY_OPEN_GRAPH_IMAGE.jpg",
  },
  {
    file: "logistics.jpg",
    source: "Helix laundry (Figure news)",
    url: "https://images.ctfassets.net/qx5k8y1u9drj/2VxPzhq7dxDzEseyMqZFmF/a73064bbe899f6c614dd4ca27acebc40/Laundry_Open_Graph_Image.jpg",
  },
  {
    file: "patrol.jpg",
    source: "Figure 02 at BMW plant (Figure news)",
    url: "https://images.ctfassets.net/qx5k8y1u9drj/2pdUta3wTo71YYmgtMfSCY/09503cc7a69a7d122f36cdbf4d90f561/Open_Graph_Image_F.02_BMW.jpg",
  },
  {
    file: "automation.jpg",
    source: "Figure 03 launch / guest-facing ops",
    url: "https://images.ctfassets.net/qx5k8y1u9drj/2z6qCDWh945rVDLS2cRRfk/60ed52a56bf8f72a0d43e161aaf23a04/Launch_-_Open_Graph_Image.jpg",
  },
]

async function download(file, url) {
  const full = join(root, file)
  await mkdir(dirname(full), { recursive: true })
  const res = await fetch(hiRes(url))
  if (!res.ok) throw new Error(`${url} → ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  await writeFile(full, buf)
  const kb = Math.round(buf.length / 1024)
  console.log(`✓ robots/${file} (${kb} KB)`)
}

console.log("Fetching Figure humanoid images…\n")
for (const { file, source, url } of robots) {
  try {
    await download(file, url)
    console.log(`  ${source}`)
  } catch (err) {
    console.error(`✗ robots/${file}:`, err.message)
    process.exitCode = 1
  }
}

console.log("\nDone. Robot slots use Figure 02/03 photos from figure.ai.")
