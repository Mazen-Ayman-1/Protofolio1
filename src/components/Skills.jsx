import { useState } from 'react'
import Reveal from './Reveal'
import TextReveal from './TextReveal'

export default function Skills({ skills }) {
  const visible = skills.filter((s) => (s.category || '').toLowerCase() !== 'certifications')
  const categories = ['All', ...Array.from(new Set(visible.map((s) => s.category)))]
  const [filter, setFilter] = useState('All')

  const filtered = filter === 'All' ? visible : visible.filter((s) => s.category === filter)

  return (
    <section id="skills" className="max-w-6xl mx-auto px-5 py-16">
      <Reveal className="mb-6 border-b border-bg-border pb-3">
        <h2 className="font-mono text-accent-violet text-xl">
          <TextReveal text="#skills" />
        </h2>
      </Reveal>

      <Reveal className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono border transition-colors ${
              filter === cat
                ? 'bg-accent-violet border-accent-violet text-bg'
                : 'border-bg-border text-muted hover:border-accent-violet hover:text-accent-violet'
            }`}
          >
            {cat}
          </button>
        ))}
      </Reveal>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((s, i) => (
          <Reveal key={s.id} delay={i * 0.04}>
            <div className="border border-bg-border bg-bg-card rounded-lg p-4 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-accent-violet hover:shadow-[0_10px_30px_rgba(157,123,255,0.15)]">
              {s.icon && <div className="text-3xl mb-2">{s.icon}</div>}
              <p className="text-sm font-semibold mb-2">{s.name}</p>
              {typeof s.level === 'number' && (
                <>
                  <div className="h-1 bg-bg-border rounded-full overflow-hidden">
                    <div className="h-full bg-accent-gradient rounded-full" style={{ width: `${s.level}%` }} />
                  </div>
                  <p className="text-xs text-accent-violet font-mono mt-1">{s.level}%</p>
                </>
              )}
            </div>
          </Reveal>
        ))}
        {filtered.length === 0 && <p className="text-muted text-sm">No skills yet — add some from the admin panel.</p>}
      </div>
    </section>
  )
}
