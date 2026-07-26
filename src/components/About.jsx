import Reveal from './Reveal'
import TextReveal from './TextReveal'

const STATS = [
  ['years_experience', 'Years Experience'],
  ['projects_count', 'Projects Done'],
  ['committed_percent', 'Committed'],
]

const INFO = [
  ['university', 'University'],
  ['location', 'Location'],
  ['email', 'Email'],
  ['phone', 'Phone'],
]

export default function About({ profile }) {
  const stats = STATS.filter(([key]) => profile?.[key])
  const info = INFO.filter(([key]) => profile?.[key])

  return (
    <section id="about-me" className="max-w-6xl mx-auto px-5 py-16">
      <Reveal className="mb-6 border-b border-bg-border pb-3">
        <h2 className="font-mono text-accent-violet text-xl">
          <TextReveal text="/about-me" />
        </h2>
        <p className="text-muted text-sm mt-1">Who am I?</p>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-10 items-start">
        <Reveal className="space-y-5">
          <p className="text-muted leading-relaxed whitespace-pre-line">
            {profile?.bio || 'Add your bio from the admin panel.'}
          </p>

          {info.length > 0 && (
            <dl className="grid grid-cols-2 gap-x-6 gap-y-3 border-t border-bg-border pt-5">
              {info.map(([key, label]) => (
                <div key={key}>
                  <dt className="font-mono text-xs text-accent-violet">{label}</dt>
                  <dd className="text-sm mt-0.5">{profile[key]}</dd>
                </div>
              ))}
            </dl>
          )}

          {profile?.cv_url && (
            <a
              href={profile.cv_url}
              target="_blank"
              rel="noreferrer"
              className="inline-block px-5 py-2.5 border border-accent-violet rounded font-mono text-sm hover:bg-accent-violet hover:text-bg transition-colors"
            >
              Download CV
            </a>
          )}
        </Reveal>

        <Reveal delay={0.15} className="flex flex-col items-center gap-6">
          {profile?.about_image_url ? (
            <img src={profile.about_image_url} alt={profile?.name} className="w-64 object-contain" />
          ) : (
            <div className="w-64 h-72 rounded-lg bg-bg-card border border-bg-border" />
          )}

          {stats.length > 0 && (
            <div className="grid grid-cols-3 gap-3 w-full max-w-xs">
              {stats.map(([key, label]) => (
                <div key={key} className="border border-bg-border bg-bg-card rounded-lg py-4 text-center">
                  <p className="font-mono text-xl font-bold gradient-text">{profile[key]}</p>
                  <p className="text-xs text-muted mt-1">{label}</p>
                </div>
              ))}
            </div>
          )}
        </Reveal>
      </div>

      {profile?.fun_facts?.length > 0 && (
        <Reveal delay={0.2} className="mt-10">
          <h3 className="font-mono text-accent-violet text-lg mb-4">#my-fun-facts</h3>
          <div className="flex flex-wrap gap-2">
            {profile.fun_facts.map((f, i) => (
              <span key={i} className="border border-bg-border bg-bg-card rounded px-3 py-1.5 text-sm text-muted">
                {f}
              </span>
            ))}
          </div>
        </Reveal>
      )}
    </section>
  )
}
