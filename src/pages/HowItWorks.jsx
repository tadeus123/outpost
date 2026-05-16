import BookLink from "../components/BookLink"
import Image from "../components/Image"
import PhotoFrame from "../components/PhotoFrame"
import SectionHeading from "../components/SectionHeading"
import RobotSection from "../components/RobotSection"
import { brand, journey, robots } from "../data/content"
import { journeyImages } from "../data/productImages"
import { images } from "../data/images"

export default function HowItWorks() {
  return (
    <>
      <section className="section-space pb-0">
        <div className="page-narrow">
          <p className="label-warm">{brand.robotLine}</p>
          <SectionHeading
            title="A hotel that runs like a machine."
            subtitle="Checkout 2pm. Humanoids clean 2pm–5pm. Check-in from 5pm."
          />
        </div>
        <div className="page-wide mt-14">
          <PhotoFrame
            src={images.robots.fleet}
            alt="Humanoid staff making an Outpost bed"
            objectPosition="50% 42%"
            aspect="aspect-[16/10]"
            gradientIndex={0}
          />
        </div>
      </section>

      <RobotSection showLink={false} compact />

      <section className="divider section-space-sm">
        <div className="page-wide">
          <SectionHeading title="Your stay" />
          <ol className="mt-14 space-y-0">
            {journey.map((step, i) => (
              <li
                key={step.step}
                className={`grid gap-8 py-12 md:grid-cols-2 md:items-center md:py-16 ${
                  i > 0 ? "border-t border-[var(--color-op-line)]" : ""
                } ${i % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""}`}
              >
                <div>
                  <p className="label">{step.step}</p>
                  <h3 className="mt-4 text-[17px] font-medium">{step.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-op-muted)]">{step.desc}</p>
                </div>
                <div className="overflow-hidden rounded-sm">
                  <Image
                    src={journeyImages[i]}
                    alt={step.title}
                    className="aspect-[4/3] w-full object-cover"
                    gradientIndex={i}
                  />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-space-sm bg-[var(--color-op-surface)]">
        <div className="page-wide grid gap-10 lg:grid-cols-3">
          {robots.rollout.map((item, i) => (
            <div key={item.phase} className="border-t border-[var(--color-op-line)] pt-8 lg:border-t-0 lg:pt-0">
              <p className="label">{item.phase}</p>
              <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-op-muted)]">{item.text}</p>
              {i === 1 && (
                <div className="mt-6 overflow-hidden rounded-sm">
                  <Image
                    src={images.robots.laundry}
                    alt="Humanoid linen logistics"
                    className="aspect-[4/3] w-full object-cover"
                    gradientIndex={2}
                  />
                </div>
              )}
              {i === 2 && (
                <div className="mt-6 overflow-hidden rounded-sm">
                  <Image
                    src={images.robots.patrol}
                    alt="Humanoid night patrol"
                    className="aspect-[4/3] w-full object-cover"
                    gradientIndex={3}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        <p className="page-narrow mt-16 text-center">
          <BookLink to="/book" className="btn">Book a room</BookLink>
        </p>
      </section>
    </>
  )
}
