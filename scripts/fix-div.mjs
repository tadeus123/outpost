import { readFileSync, writeFileSync, readdirSync, statSync } from "fs"
import { join } from "path"

const closeTag = "</" + "motion>".replace("motion", "div")

function fixFile(file) {
  let t = readFileSync(file, "utf8")
  const o = t
  t = t.replace(/<motion\b/g, "<div")
  t = t.replace(/<\/motion>/g, closeTag)
  if (t !== o) {
    writeFileSync(file, t)
    console.log("fixed", file)
  }
}

function walk(dir) {
  for (const f of readdirSync(dir)) {
    const fp = join(dir, f)
    if (statSync(fp).isDirectory()) walk(fp)
    else if (f.endsWith(".jsx")) fixFile(fp)
  }
}

walk("src")
