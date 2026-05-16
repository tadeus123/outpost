/**
 * Generates .webp siblings for images in public/ (smaller transfer).
 * Run: npm run images:optimize
 */
import { readdir, stat } from "fs/promises"
import { join, dirname } from "path"
import { fileURLToPath } from "url"
import sharp from "sharp"

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "public")
const dirs = ["images", "images/cities", "images/robots", "pictures"]
const exts = new Set([".jpg", ".jpeg", ".png"])

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const e of entries) {
    const full = join(dir, e.name)
    if (e.isDirectory()) files.push(...(await walk(full)))
    else if (exts.has(e.name.slice(e.name.lastIndexOf(".")).toLowerCase())) files.push(full)
  }
  return files
}

let done = 0
let skipped = 0

for (const sub of dirs) {
  const dir = join(root, sub)
  let files
  try {
    files = await walk(dir)
  } catch {
    continue
  }

  for (const file of files) {
    const out = file.replace(/\.(png|jpe?g)$/i, ".webp")
    try {
      const [srcStat, outStat] = await Promise.all([
        stat(file),
        stat(out).catch(() => null),
      ])
      if (outStat && outStat.mtimeMs >= srcStat.mtimeMs) {
        skipped++
        continue
      }
    } catch {
      /* write fresh */
    }

    await sharp(file)
      .webp({ quality: 82, effort: 4 })
      .toFile(out)
    const before = (await stat(file)).size
    const after = (await stat(out)).size
    console.log(`✓ ${out.replace(root, "")} (${Math.round(before / 1024)}KB → ${Math.round(after / 1024)}KB)`)
    done++
  }
}

console.log(`\nWebP: ${done} written, ${skipped} up to date`)
