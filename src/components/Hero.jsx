import { motion } from 'framer-motion'
import Reveal from './Reveal'
import { RotatedSquares, DotGrid } from './Decor'
import Typewriter from './Typewriter'
import TextReveal from './TextReveal'
import { useLanguage } from '../context/LanguageContext'
import { computeStats } from '../lib/stats'

export default function Hero({ profile, projects = [], experience = [], certificates = [] }) {
  const { lang, pick } = useLanguage()
  const typingRoles = profile?.typing_roles?.length
    ? profile.typing_roles
    : [profile?.role_line_1, profile?.role_line_2].filter(Boolean)

  const name = profile?.name || 'Portfolio'
  const role1 = profile?.role_line_1 || 'web designer'
  const role2 = profile?.role_line_2 || 'front-end developer'

  const leadWords = lang === 'ar' ? `${name} مطوّر`.split(' ').length : `${name} is a`.split(' ').length
  const role1Words = role1.split(' ').length

  const stats = computeStats({ profile, projects, experience, certificates })
  const statBoxes = [
    stats.projectsCount && { value: stats.projectsCount, label: lang === 'ar' ? 'مشروع' : 'Projects' },
    stats.internships && { value: stats.internships, label: lang === 'ar' ? 'تدريب' : 'Internships' },
    stats.certs && { value: stats.certs, label: lang === 'ar' ? 'شهادة' : 'Certs' },
  ].filter(Boolean)

  return (
    <section id="home" className="relative max-w-6xl mx-auto px-5 pt-16 pb-24 grid md:grid-cols-2 gap-10 items-center">
      <div>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          <TextReveal text={lang === 'ar' ? `${name} مطوّر` : `${name} is a`} startIndex={0} />{' '}
          <TextReveal text={role1} wordClassName="gradient-text" startIndex={leadWords} />{' '}
          <TextReveal text={lang === 'ar' ? 'و' : 'and'} startIndex={leadWords + role1Words} />{' '}
          <TextReveal text={role2} wordClassName="gradient-text" startIndex={leadWords + role1Words + 1} />
        </h1>
        <Reveal delay={0.6}>
          <p className="text-muted mt-5 max-w-md">
            {pick(profile, 'tagline') || 'He crafts responsive websites where technologies meet creativity'}
          </p>
          {typingRoles.length > 0 && (
            <p className="mt-2 text-sm text-muted">
              {lang === 'ar' ? 'أنا ' : "I'm a "}<Typewriter roles={typingRoles} />
            </p>
          )}
          <div className="flex flex-wrap items-center gap-4 mt-7">
            <a
              href="#contacts"
              className="inline-block px-5 py-2.5 border border-accent-violet rounded font-mono text-sm hover:bg-accent-violet hover:text-bg transition-colors"
            >
              {lang === 'ar' ? 'تواصل معايا !!' : 'Contact me !!'}
            </a>
            {profile?.cv_url && (
              <a
                href={profile.cv_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-sm text-accent-violet hover:text-text transition-colors"
              >
                ↓ {lang === 'ar' ? 'حمّل السيرة الذاتية' : 'Download CV'}
              </a>
            )}
          </div>
          {statBoxes.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-7">
              {statBoxes.map((s) => (
                <div key={s.label} className="border border-bg-border bg-bg-card rounded-lg px-4 py-2 text-center min-w-[80px]">
                  <p className="font-mono text-lg font-bold text-accent-violet">{s.value}</p>
                  <p className="text-[11px] text-muted uppercase tracking-wide">{s.label}</p>
                </div>
              ))}
            </div>
          )}
        </Reveal>
      </div>

      <Reveal delay={0.15} className="relative flex justify-center">
        <RotatedSquares className="absolute -left-4 top-4 hidden md:block" />
        <DotGrid className="absolute right-2 bottom-10 hidden md:grid" />
        <div className="relative">
          {profile?.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt={profile?.name || 'Portrait'}
              className="w-72 md:w-80 object-contain drop-shadow-[0_0_40px_rgba(157,123,255,0.25)]"
            />
          ) : (
            <div className="w-72 h-80 md:w-80 md:h-96 rounded-lg bg-bg-card border border-bg-border flex items-center justify-center text-muted font-mono text-sm text-center px-4">
              Upload your cutout photo from the admin panel
            </div>
          )}
          {profile?.currently_working_on && (
            <motion.div
              className="mt-4 flex items-center gap-2 border border-bg-border bg-bg-card px-4 py-2.5 rounded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="w-2.5 h-2.5 bg-accent-pink rounded-sm" />
              <span className="text-sm text-muted">
                {lang === 'ar' ? 'بشتغل دلوقتي على ' : 'Currently working on '}
                <b className="text-text">{profile.currently_working_on}</b>
              </span>
            </motion.div>
          )}
        </div>
      </Reveal>
    </section>
  )
}
