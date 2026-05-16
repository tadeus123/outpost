import { useState } from "react"
import { objectPosition as framePosition } from "../data/imageFraming"

function webpSrc(src) {
  return src.replace(/\.(png|jpe?g)$/i, ".webp")
}

export default function Image({
  src,
  alt,
  className = "",
  objectPosition,
  style,
  priority = false,
  sizes,
  gradientIndex: _g,
  ...props
}) {
  void _g
  const [error, setError] = useState(false)
  const pos = objectPosition ?? framePosition(src)
  const loading = priority ? "eager" : "lazy"
  const fetchPriority = priority ? "high" : "auto"

  if (error || !src) {
    return (
      <div
        className={`bg-[#f4f4f4] ${className}`}
        role="img"
        aria-label={alt}
      />
    )
  }

  const webp = webpSrc(src)
  const img = (
    <img
      src={src}
      alt={alt}
      className={className}
      style={{ objectPosition: pos, ...style }}
      onError={() => setError(true)}
      loading={loading}
      decoding="async"
      fetchPriority={fetchPriority}
      sizes={sizes}
      {...props}
    />
  )

  if (webp === src) return img

  return (
    <picture>
      <source type="image/webp" srcSet={webp} sizes={sizes} />
      {img}
    </picture>
  )
}
