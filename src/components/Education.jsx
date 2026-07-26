import Reveal from './Reveal'
import TextReveal from './TextReveal'
import { useLanguage } from '../context/LanguageContext'

export default function Education({ education }) {
  const { pick } = useLanguage()
  if (!education || education.length === 0) return null

  return (
    <section id="education" className="max-w-6xl mx-auto px-5 py-16">
      <Reveal className="mb-8 border-b border-bg-border pb-3">
        <h2 className="font-mono text-accent-violet text-xl">
          <TextReveal text="#education" />
        </h2>
      </Reveal>

      <div className="grid sm:grid-cols-2 gap-5">
        {education.map((ed, i) => (
          <Reveal key={ed.id} delay={i * 0.1}>
            <div className="border border-bg-border bg-bg-card rounded-lg p-5 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent-violet hover:shadow-[0_10px_30px_rgba(157,123,255,0.15)]">
              <h3 className="font-semibold">{pick(ed, 'degree')}</h3>
              {ed.school && <p className="text-sm text-accent-violet mt-1">{ed.school}</p>}
              {ed.date_range && (
                <span className="inline-block mt-2 font-mono text-xs text-muted border border-bg-border rounded px-2 py-0.5">
                  {ed.date_range}
                </span>
              )}
              {pick(ed, 'description') && (
                <p className="text-sm text-muted mt-2 leading-relaxed">{pick(ed, 'description')}</p>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
