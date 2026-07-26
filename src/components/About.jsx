import Reveal from './Reveal'
import TextReveal from './TextReveal'
import { useLanguage } from '../context/LanguageContext'

const INFO = [
  ['university', 'University', 'الجامعة'],
  ['location', 'Location', 'المكان'],
  ['email', 'Email', 'الإيميل'],
  ['phone', 'Phone', 'التليفون'],
]

function yearsSince(dateStr) {
  if (!dateStr) return null
  const start = new Date(dateStr)
  if (isNaN(start.getTime())) return null
  const now = new Date()
  let years = now.getFullYear() - start.getFullYear()
  const hadAnniversary =
    now.getMonth() > start.getMonth() || (now.getMonth() === start.getMonth() && now.getDate() >= start.getDate())
  if (!hadAnniversary) years -= 1
  return Math.max(years, 1)
}

export default function About({ profile, projects = [], skills = [] }) {
  const { lang, pick } = useLanguage()
  const info = INFO.filter(([key]) => profile?.[key])

  // auto-computed stats: years of experience (from a start date), live project count,
  // and certificate count (skills tagged with the "Certifications" category)
  const autoYears = yearsSince(profile?.experience_start_date)
  const yearsLabel = autoYears ? `${autoYears}+` : profile?.years_experience || null
  const projectsLabel = projects.length > 0 ? `${projects.length}+` : profile?.projects_count || null
  const certCount = skills.filter((s) => (s.category || '').toLowerCase() === 'certifications').length
  const certsLabel = certCount > 0 ? `${certCount}+` : null

  const stats = [
    yearsLabel && { value: yearsLabel, label: 'Years Experience', labelAr: 'سنين الخبرة' },
    projectsLabel && { value: projectsLabel, label: 'Projects Done', labelAr: 'مشروع' },
    certsLabel && { value: certsLabel, label: 'Certificates', labelAr: 'شهادة' },
    profile?.committed_percent && { value: profile.committed_percent, label: 'Committed', labelAr: 'التزام' },
  ].filter(Boolean)

  const gridCols = stats.length >= 4 ? 'grid-cols-4' : stats.length === 3 ? 'grid-cols-3' : 'grid-cols-2'

  return (
    <section id="about-me" className="max-w-6xl mx-auto px-5 py-16">
      <Reveal className="mb-6 border-b border-bg-border pb-3">
        <h2 className="font-mono text-accent-violet text-xl">
          <TextReveal text="/about-me" />
        </h2>
        <p className="text-muted text-sm mt-1">{lang === 'ar' ? 'أنا مين؟' : 'Who am I?'}</p>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-10 items-start">
        <Reveal className="space-y-5">
          <p className="text-muted leading-relaxed whitespace-pre-line">
            {pick(profile, 'bio') || 'Add your bio from the admin panel.'}
          </p>

          {info.length > 0 && (
            <dl className="grid grid-cols-2 gap-x-6 gap-y-3 border-t border-bg-border pt-5">
              {info.map(([key, label, labelAr]) => (
                <div key={key}>
                  <dt className="font-mono text-xs text-accent-violet">{lang === 'ar' ? labelAr : label}</dt>
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
              {lang === 'ar' ? 'حمّل السيرة الذاتية' : 'Download CV'}
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
            <div className={`grid ${gridCols} gap-3 w-full max-w-xs`}>
              {stats.map((s) => (
                <div key={s.label} className="border border-bg-border bg-bg-card rounded-lg py-4 text-center">
                  <p className="font-mono text-xl font-bold gradient-text">{s.value}</p>
                  <p className="text-xs text-muted mt-1">{lang === 'ar' ? s.labelAr : s.label}</p>
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
