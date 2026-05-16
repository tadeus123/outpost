import { Link } from "react-router-dom"
import Image from "./Image"

export default function PhotoFrame({
  src,
  alt,
  caption,
  className = "",
  aspect = "aspect-[4/3]",
  gradientIndex = 0,
  inset = false,
  to,
  objectPosition,
}) {
  const frame = (
    <div className={`photo-frame overflow-hidden ${aspect}`}>
      <Image
        src={src}
        alt={alt}
        objectPosition={objectPosition}
        className="zoom-on-hover h-full w-full object-cover"
        gradientIndex={gradientIndex}
      />
    </div>
  )

  return (
    <figure className={`${inset ? "photo-inset" : ""} ${className}`}>
      {to ? (
        <Link
          to={to}
          className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-op-text)] focus-visible:ring-offset-2"
        >
          {frame}
        </Link>
      ) : (
        frame
      )}
      {caption && (
        <figcaption className="photo-caption">{caption}</figcaption>
      )}
    </figure>
  )
}
