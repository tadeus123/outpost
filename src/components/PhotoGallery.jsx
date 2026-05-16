import BookLink from "./BookLink"
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
      <BookLink
        to="/book"
        className={`group relative block h-full min-h-0 w-full overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-op-text)] ${className}`}
      >
        {image}
      </BookLink>
    )
  }

  return (
    <div className={`relative h-full min-h-0 overflow-hidden ${className}`}>{image}</div>
  )
}

export default function PhotoGallery({ images: items, className = "", bookLink = false }) {
  if (!items?.length) return null

  const side = items.slice(1, 3)

  return (
    <div className={`editorial-gallery ${className}`}>
      <GalleryCell
        src={items[0]}
        className="editorial-gallery-main"
        gradientIndex={0}
        bookLink={bookLink}
      />
      {side.length > 0 && (
        <div className="editorial-gallery-stack">
          {side.map((src, i) => (
            <GalleryCell
              key={src}
              src={src}
              className="editorial-gallery-cell"
              gradientIndex={i + 1}
              bookLink={bookLink}
            />
          ))}
        </div>
      )}
    </div>
  )
}
