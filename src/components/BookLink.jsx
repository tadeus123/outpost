import { Link } from "react-router-dom"
import { preloadBook } from "../lib/preloadBook"

export default function BookLink({ to = "/book", onMouseEnter, onFocus, onTouchStart, ...props }) {
  const warm = () => preloadBook()

  return (
    <Link
      to={to}
      onMouseEnter={(e) => {
        warm()
        onMouseEnter?.(e)
      }}
      onFocus={(e) => {
        warm()
        onFocus?.(e)
      }}
      onTouchStart={(e) => {
        warm()
        onTouchStart?.(e)
      }}
      {...props}
    />
  )
}
