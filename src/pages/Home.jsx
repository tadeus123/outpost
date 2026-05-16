import { Link } from "react-router-dom"
import Image from "../components/Image"
import PhotoFrame from "../components/PhotoFrame"
import PhotoGallery from "../components/PhotoGallery"
import SectionHeading from "../components/SectionHeading"
import PricingCards from "../components/PricingCards"
import RobotSection from "../components/RobotSection"
import { brand, product } from "../data/content"
import { productImageByTitle, productThumbObjectPosition } from "../data/productImages"
import { images } from "../data/images"

export default function Home() {
  return (
    <>
      <section className="section-space pb-16 md:pb-24">
        <div className="page-narrow text-center">
          <p className="label-warm">{brand.name}</p>
          <h1 className="headline-hero mt-5">{brand.headline}</h1>
          <p className="lead mx-auto mt-8 max-w-[540px]">{brand.pitch}</p>
          <div className="mt-14 flex flex-col items-center gap-5 sm:flex-row sm:justify-center">
            <Link to="/book" className="btn">
              Book a room
            </Link>
            <Link to="/how-it-works" className="link-quiet text-[14px]">
              How robots run it
            </Link>
          </div>
        </div>

        <div className="hero-split page-wide">
          <Link
            to="/book"
            className="hero-split-image group block overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-op-text)]"
          >
            <Image
              src={images.hero}
              alt="Humanoid staff making an Outpost bed"
              className="zoom-on-hover aspect-[16/10] w-full object-cover md:aspect-[5/3]"
              priority
              sizes="(min-width: 768px) 1200px, 100vw"
            />
          </Link>
        </div>
      </section>

      <section className="page-wide pb-12 md:pb-16">
        <PhotoFrame
          src={images.bathroom}
          alt="Private bathroom with walk-in rain shower"
          caption="Private bath in every room — rain shower, backlit mirror, matte black fixtures."
          aspect="aspect-[16/10] md:aspect-[2/1]"
          objectPosition="42% 48%"
          gradientIndex={1}
          to="/book"
        />
      </section>

      <section className="page-wide pb-20 md:pb-28">
        <PhotoGallery images={images.gallery} className="fade-in" bookLink />
        <p className="photo-caption mt-4 text-center md:text-left">
          Same pod room and bath in every city — one standard, not a photo collage.
        </p>
      </section>

      <div className="defer-paint">
        <RobotSection />
      </div>

      <section className="divider section-space-sm defer-paint">
        <div className="page-wide">
          <SectionHeading
            title="Private hotel room. Nothing you don't need."
            subtitle="No breakfast. No front desk. No daily housekeeping unless you ask."
            align="center"
          />
          <ul className="mt-16 space-y-0">
            {product.included.map((item, i) => (
              <li
                key={item.title}
                className={`product-row ${i > 0 ? "border-t border-[var(--color-op-line)]" : ""}`}
              >
                <div className="product-thumb">
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
                  <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-op-muted)]">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-12 text-center">
            <Link to="/product" className="link-quiet text-[14px]">
              Full product details
            </Link>
          </p>
        </div>
      </section>

      <section className="section-space bg-[var(--color-op-surface)]">
        <div className="page-wide grid gap-12 lg:grid-cols-2 lg:items-center">
          <PhotoFrame
            src={images.bathroom}
            alt="Private Outpost bathroom"
            caption="Premium bath in every room — rain shower, backlit mirror, stone and wood."
            aspect="aspect-[4/5]"
            inset
            gradientIndex={2}
            to="/book"
          />
          <div>
            <SectionHeading
              title="Pricing"
              subtitle="Bed-night economics — no human staff bill, only robot operations."
            />
            <div className="mt-10">
              <PricingCards />
            </div>
          </div>
        </div>
      </section>

      <section className="divider section-space">
        <div className="page-wide">
          <div className="grid gap-3 md:grid-cols-3">
            <PhotoFrame
              src={images.bathroom}
              alt="Walk-in rain shower"
              aspect="aspect-[3/4]"
              objectPosition="42% 48%"
              gradientIndex={0}
              to="/book"
            />
            <PhotoFrame
              src={images.bathroomAlt}
              alt="Vanity with backlit mirror"
              aspect="aspect-[3/4]"
              objectPosition="50% 36%"
              gradientIndex={1}
              to="/book"
            />
            <PhotoFrame
              src={images.roomSingle}
              alt="Outpost pod room"
              aspect="aspect-[3/4]"
              gradientIndex={2}
              className="hidden md:block"
              to="/book"
            />
          </div>
          <div className="mt-16 grid items-end gap-10 lg:grid-cols-2">
            <SectionHeading
              title="Small. Never cheap."
              subtitle="Rooms built for fast robotic reset. Premium bathroom. Best light."
            />
            <Link to="/how-it-works" className="link-quiet text-[14px] lg:justify-self-end">
              How it works →
            </Link>
          </div>
        </div>
      </section>

      <section className="section-space-sm">
        <div className="page-narrow text-center">
          <PhotoFrame
            src={images.robots.checkin}
            alt="Humanoid at Outpost check-in"
            aspect="aspect-[16/10]"
            objectPosition="72% 40%"
            className="mb-12"
            gradientIndex={3}
            to="/book"
          />
          <SectionHeading
            title="Be among the first 100."
            subtitle="Private hotel rooms in expensive cities — fully operated by robots."
            align="center"
          />
          <Link to="/book" className="btn mt-14">
            Book your Outpost
          </Link>
        </div>
      </section>
    </>
  )
}
