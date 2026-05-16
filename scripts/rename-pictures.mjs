/**
 * Renames Screenshot files in /pictures to site slot names (run once).
 * npm run images:rename
 */
import { rename } from "fs/promises"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const dir = join(dirname(fileURLToPath(import.meta.url)), "..", "pictures")

const renames = [
  ["Screenshot 2026-05-16 180730.png", "robot-hero.png"],
  ["Screenshot 2026-05-16 180600.png", "robot-fleet.png"],
  ["Screenshot 2026-05-16 180444.png", "robot-housekeeping.png"],
  ["Screenshot 2026-05-16 180747.png", "robot-logistics.png"],
  ["Screenshot 2026-05-16 180338.png", "robot-patrol.png"],
  ["Screenshot 2026-05-16 180933.png", "robot-checkin.png"],
  ["Screenshot 2026-05-16 180401.png", "robot-gallery-1.png"],
  ["Screenshot 2026-05-16 180410.png", "robot-gallery-2.png"],
  ["Screenshot 2026-05-16 180506.png", "robot-gallery-3.png"],
  ["Screenshot 2026-05-16 180959.png", "robot-gallery-4.png"],
  ["Screenshot 2026-05-16 180423.png", "robot-walk.png"],
  ["Screenshot 2026-05-16 180849.png", "robot-laundry.png"],
  ["Screenshot 2026-05-16 180914.png", "robot-fold.png"],
  ["Screenshot 2026-05-16 180650.png", "robot-lounge.png"],
  ["Screenshot 2026-05-16 180636.png", "robot-clean.png"],
  // automation uses same shot as check-in; copy manually if you add robot-automation.png
  ["Screenshot 2026-05-16 180348.png", "robot-automation.png"],
]

for (const [from, to] of renames) {
  if (from === to) continue
  try {
    await rename(join(dir, from), join(dir, to))
    console.log(`✓ ${from} → ${to}`)
  } catch (err) {
    if (err.code === "ENOENT") console.log(`– skip ${from} (not found)`)
    else if (err.code === "EEXIST") console.log(`– skip ${to} (already exists)`)
    else throw err
  }
}

console.log("\nDone. Run: npm run images:sync")
