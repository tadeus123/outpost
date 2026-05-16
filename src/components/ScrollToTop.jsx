import { useEffect } from "react"
import { useLocation } from "react-router-dom"

/** Reset scroll on route change; in-page #anchors use scroll-padding-top on html */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) return
    window.scrollTo({ top: 0, left: 0, behavior: "auto" })
  }, [pathname, hash])

  return null
}
