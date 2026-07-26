import Reveal from './Reveal'
import TextReveal from './TextReveal'

export default function Certificates({ certificates }) {
  if (!certificates || certificates.length === 0) return null

  return (
    <section id="certificates" className="max-w-6xl mx-auto px-5 py-16">
      <Reveal className="mb-6 border-b border-bg-border pb-3">
        <h2 className="font-mono text-accent-violet text-xl">
          <TextReveal text="#certificates" />
        </h2>
      </Reveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {certificates.map((c, i) => {
          const Wrapper = c.credential_url ? 'a' : 'div'
          const wrapperProps = c.credential_url
            ? { href: c.credential_url, target: '_blank', rel: 'noreferrer' }
            : {}
          return (
            <Reveal key={c.id} delay={i * 0.06}>
              <Wrapper
                {...wrapperProps}
                className="flex items-center gap-3 border border-bg-border bg-bg-card rounded-lg px-4 py-3.5 hover:border-accent-violet transition-colors"
              >
                <span className="text-2xl flex-shrink-0">{c.icon || '🏅'}</span>
                <div>
                  <p className="text-sm font-semibold">{c.name}</p>
                  {c.issuer && <p className="text-xs text-muted">{c.issuer}</p>}
                </div>
              </Wrapper>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
