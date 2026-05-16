import { Link } from "react-router-dom"
import Image from "./Image"

function GalleryCell({ src, className, gradientIndex, bookLink }) {
  const image = (
    <Image
      src={src}
      alt=""
      className="zoom-on-hover h-full w-full object-cover"
      gradientIndex={gradientIndex}
    />
  )

  if (bookLink) {
    return (
      <Link
        to="/book"
        className={`group block h-full w-full overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-op-text)] ${className}`}
      >
        {image}
      </Link>
    )
  }

  return <div className={className}>{image}</div>
}

export default function PhotoGallery({ images: items, className = "", bookLink = false }) {
  if (!items?.length) return null

  return (
    <div className={`editorial-gallery ${className}`}>
      <GalleryCell
        src={items[0]}
        className="editorial-gallery-main"
        gradientIndex={0}
        bookLink={bookLink}
      />
      {items.slice(1, 4).map((src, i) => (
        <GalleryCell
          key={src}
          src={src}
          className="editorial-gallery-cell"
          gradientIndex={i + 1}
          bookLink={bookLink}
        />
      ))}
    </div>
  )
}
