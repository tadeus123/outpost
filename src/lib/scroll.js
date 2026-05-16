/** Scroll so section sits below fixed header (see scroll-padding-top on html) */
export function scrollToId(id, behavior = "smooth") {
  requestAnimationFrame(() => {
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior, block: "start" })
  })
}
