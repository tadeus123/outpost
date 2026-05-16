import { Link } from "react-router-dom"
import Image from "./Image"
import { robots } from "../data/content"
import { images } from "../data/images"

export default function RobotSection({ showLink = true, compact = false }) {
  return (
    <section className={compact ? "" : "robot-band"}>
      <div className="page-wide">
        {/* Hero band */}
        <div className="grid gap-0 lg:grid-cols-2 lg:gap-0">
          <div className="flex flex-col justify-center px-6 py-16 md:px-10 md:py-24 lg:py-32">
            <p className="label-on-dark">Why the price works</p>
            <h2 className="headline-section-on-dark mt-6 max-w-md">{robots.headline}</h2>
            <p className="mt-6 max-w-md text-[16px] leading-relaxed text-[#a8a29e]">{robots.subhead}</p>
            {showLink && (
              <Link to="/how-it-works" className="link-on-dark mt-10 inline-block text-[14px]">
                Operations & rollout →
              </Link>
            )}
          </div>
          <div className="relative min-h-[320px] lg:min-h-[min(100%,520px)]">
            <Image
              src={images.robots.hero}
              alt="Figure humanoid at Outpost"
              className="absolute inset-0 h-full w-full object-cover"
              gradientIndex={0}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1c1917]/60 via-transparent to-transparent lg:bg-gradient-to-l lg:from-[#1c1917]/40 lg:via-transparent" />
          </div>
        </div>

        {/* Roles with images */}
        <ul className={`grid gap-px bg-white/10 ${compact ? "mt-0" : ""}`}>
          {robots.roles.map((role, i) => (
            <li
              key={role.title}
              className={`grid bg-[#1c1917] lg:grid-cols-2 ${i % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""}`}
            >
              <div className="flex flex-col justify-center px-6 py-12 md:px-10 md:py-16">
                <span className="font-mono text-[11px] text-[#78716c]">0{i + 1}</span>
                <h3 className="mt-3 text-[18px] font-medium text-[#fafaf9]">{role.title}</h3>
                <p className="mt-3 max-w-md text-[15px] leading-relaxed text-[#a8a29e]">{role.desc}</p>
              </div>
              <div className="relative min-h-[260px] md:min-h-[320px]">
                <Image
                  src={images.robots[role.imageKey]}
                  alt={role.title}
                  className="absolute inset-0 h-full w-full object-cover"
                  gradientIndex={i + 2}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
