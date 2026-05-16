export default function SectionHeading({ title, subtitle, align = "left" }) {
  const alignClass = align === "center" ? "mx-auto text-center" : ""

  return (
    <header className={`max-w-[560px] ${alignClass}`}>
      <h2 className="headline-section">{title}</h2>
      {subtitle && <p className="lead mt-6">{subtitle}</p>}
    </header>
  )
}
