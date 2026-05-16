/** Scroll so section sits below fixed header (see scroll-padding-top on html) */
export function scrollToId(id, behavior = "smooth") {
  const run = () => {
    const el = document.getElementById(id)
    if (!el) return false
    el.scrollIntoView({ behavior, block: "start" })
    return true
  }

  requestAnimationFrame(() => {
    if (run()) return
    let attempts = 0
    const retry = () => {
      if (run() || ++attempts > 12) return
      requestAnimationFrame(retry)
    }
    requestAnimationFrame(retry)
  })
}
