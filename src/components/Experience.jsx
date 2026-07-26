import Reveal from './Reveal'
import TextReveal from './TextReveal'

export default function Experience({ experience }) {
  if (!experience || experience.length === 0) return null

  return (
    <section id="experience" className="max-w-6xl mx-auto px-5 py-16">
      <Reveal className="mb-8 border-b border-bg-border pb-3">
        <h2 className="font-mono text-accent-violet text-xl">
          <TextReveal text="#experience" />
        </h2>
      </Reveal>

      <div className="relative border-l border-bg-border ml-2 space-y-8">
        {experience.map((exp, i) => (
          <Reveal key={exp.id} delay={i * 0.1} className="relative pl-8">
            <span className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-accent-gradient" />
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-semibold">
                {exp.role}
                {exp.company && <span className="text-muted font-normal"> · {exp.company}</span>}
              </h3>
              {exp.date_range && (
                <span className="font-mono text-xs text-muted border border-bg-border rounded px-2 py-0.5">
                  {exp.date_range}
                </span>
              )}
            </div>
            {exp.points?.length > 0 && (
              <ul className="mt-2 space-y-1 text-sm text-muted list-disc list-inside">
                {exp.points.map((p, j) => (
                  <li key={j}>{p}</li>
                ))}
              </ul>
            )}
          </Reveal>
        ))}
      </div>
    </section>
  )
}
