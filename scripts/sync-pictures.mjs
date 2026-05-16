/**
 * Copies /pictures → public/pictures (filenames = site slot names).
 * Run: npm run images:sync
 */
import { copyFile, mkdir, readdir } from "fs/promises"
import { dirname, join } from "path"
import { fileURLToPath } from "url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const srcDir = join(root, "pictures")
const destDir = join(root, "public", "pictures")

const slots = [
  "robot-hero.png",
  "robot-fleet.png",
  "robot-housekeeping.png",
  "robot-logistics.png",
  "robot-patrol.png",
  "robot-automation.png",
  "robot-checkin.png",
  "robot-gallery-1.png",
  "robot-gallery-2.png",
  "robot-gallery-3.png",
  "robot-gallery-4.png",
  "robot-walk.png",
  "robot-laundry.png",
  "robot-fold.png",
  "robot-lounge.png",
  "robot-clean.png",
]

await mkdir(destDir, { recursive: true })

let n = 0
for (const name of slots) {
  const src = join(srcDir, name)
  try {
    await copyFile(src, join(destDir, name))
    console.log(`✓ ${name}`)
    n++
  } catch {
    console.log(`– missing ${name}`)
  }
}

const all = await readdir(srcDir)
const extras = all.filter((f) => f.endsWith(".png") && !slots.includes(f))
for (const name of extras) {
  await copyFile(join(srcDir, name), join(destDir, name))
  console.log(`✓ ${name} (extra)`)
  n++
}

console.log(`\nSynced ${n} images → public/pictures/`)
