import Reveal from './Reveal'
import TextReveal from './TextReveal'

export default function Skills({ skills }) {
  const groups = skills.reduce((acc, s) => {
    acc[s.category] = acc[s.category] || []
    acc[s.category].push(s.name)
    return acc
  }, {})

  const categories = Object.keys(groups)

  return (
    <section id="skills" className="max-w-6xl mx-auto px-5 py-16">
      <Reveal className="mb-6 border-b border-bg-border pb-3">
        <h2 className="font-mono text-accent-violet text-xl">
          <TextReveal text="#skills" />
        </h2>
      </Reveal>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories.map((cat, i) => (
          <Reveal key={cat} delay={i * 0.06} className="border border-bg-border bg-bg-card rounded-lg p-4">
            <h3 className="font-mono text-sm text-text mb-2">{cat}</h3>
            <ul className="text-sm text-muted space-y-1">
              {groups[cat].map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </Reveal>
        ))}
        {categories.length === 0 && (
          <p className="text-muted text-sm">No skills yet — add some from the admin panel.</p>
        )}
      </div>
    </section>
  )
}
