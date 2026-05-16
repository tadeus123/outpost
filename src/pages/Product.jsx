import { Link } from "react-router-dom"
import BookLink from "../components/BookLink"
import Image from "../components/Image"
import PhotoFrame from "../components/PhotoFrame"
import PhotoGallery from "../components/PhotoGallery"
import SectionHeading from "../components/SectionHeading"
import { brand, product } from "../data/content"
import { productImageByTitle, productThumbObjectPosition } from "../data/productImages"
import { images } from "../data/images"

export default function Product() {
  return (
    <>
      <section className="section-space">
        <div className="page-narrow">
          <p className="label-warm">{brand.robotLine}</p>
          <SectionHeading
            title={product.heroTitle}
            subtitle={product.heroSubtitle}
          />
        </div>
        <div className="page-wide mt-16 grid gap-3 md:grid-cols-2">
          <PhotoFrame
            src={images.robots.fleet}
            alt="Humanoid staff making an Outpost bed"
            aspect="aspect-[4/3]"
            objectPosition="50% 42%"
            gradientIndex={0}
            to="/book"
          />
          <PhotoFrame
            src={images.robots.hero}
            alt="Figure humanoid at Outpost"
            aspect="aspect-[4/3]"
            objectPosition="50% 12%"
            gradientIndex={1}
          />
        </div>
      </section>

      <section className="page-wide pb-12">
        <PhotoGallery images={images.gallery} bookLink />
      </section>

      <section className="divider section-space-sm">
        <div className="page-wide">
          <ul className="space-y-0">
            {product.included.map((item, i) => (
              <li
                key={item.title}
                className={`product-row ${i > 0 ? "border-t border-[var(--color-op-line)]" : ""}`}
              >
                <div className="product-thumb md:aspect-square">
                  <Image
                    src={productImageByTitle[item.title]}
                    alt={item.title}
                    objectPosition={productThumbObjectPosition[item.title]}
                    className="h-full w-full object-cover"
                    gradientIndex={i}
                  />
                </div>
                <div>
                  <h3 className="text-[17px] font-medium">{item.title}</h3>
                  <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-[var(--color-op-muted)]">
                    {item.desc}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="robot-band py-20 md:py-28">
        <div className="page-wide grid gap-10 lg:grid-cols-2 lg:items-center">
          <PhotoFrame
            src={images.robots.fold}
            alt="Humanoid folding linens at Outpost"
            aspect="aspect-[4/3]"
            className="[&_.photo-frame]:border-white/10"
            gradientIndex={0}
          />
          <div>
            <p className="label-on-dark">{brand.robotLine}</p>
            <h2 className="headline-section-on-dark mt-4 text-white">Rooms built for robot housekeeping.</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[#a8a29e]">
              Humanoid cleaners reset your room after checkout — not a human housekeeper. No carpet, washable surfaces, fast turnarounds.
            </p>
          </div>
        </div>
      </section>

      <section className="section-space-sm">
        <div className="page-narrow">
          <SectionHeading
            title={product.excludedSection.title}
            subtitle={product.excludedSection.subtitle}
          />
          <p className="mt-8 max-w-xl text-[15px] leading-relaxed text-[var(--color-op-muted)]">
            {product.excludedIntro}
          </p>
          <ul className="mt-10 flex flex-col gap-3 border-t border-[var(--color-op-line)] pt-10 text-[15px] text-[var(--color-op-muted)]">
            {product.excluded.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="text-[var(--color-op-faint)]" aria-hidden>—</span>
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-20">
            <Link to="/how-it-works" className="link-quiet mr-8 text-[14px]">
              How robots run it
            </Link>
            <BookLink to="/book" className="btn">
              Book a room
            </BookLink>
          </p>
        </div>
      </section>
    </>
  )
}
