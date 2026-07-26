import { motion } from 'framer-motion'
import Reveal from './Reveal'
import { RotatedSquares, DotGrid } from './Decor'
import Typewriter from './Typewriter'
import TextReveal from './TextReveal'

export default function Hero({ profile }) {
  const typingRoles = profile?.typing_roles?.length
    ? profile.typing_roles
    : [profile?.role_line_1, profile?.role_line_2].filter(Boolean)

  const name = profile?.name || 'Elias'
  const role1 = profile?.role_line_1 || 'web designer'
  const role2 = profile?.role_line_2 || 'front-end developer'

  const leadWords = `${name} is a`.split(' ').length
  const role1Words = role1.split(' ').length

  return (
    <section id="home" className="relative max-w-6xl mx-auto px-5 pt-16 pb-24 grid md:grid-cols-2 gap-10 items-center">
      <div>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          <TextReveal text={`${name} is a`} startIndex={0} />{' '}
          <TextReveal text={role1} wordClassName="gradient-text" startIndex={leadWords} />{' '}
          <TextReveal text="and" startIndex={leadWords + role1Words} />{' '}
          <TextReveal text={role2} wordClassName="gradient-text" startIndex={leadWords + role1Words + 1} />
        </h1>
        <Reveal delay={0.6}>
          <p className="text-muted mt-5 max-w-md">
            {profile?.tagline || 'He crafts responsive websites where technologies meet creativity'}
          </p>
          {typingRoles.length > 0 && (
            <p className="mt-2 text-sm text-muted">
              I'm a <Typewriter roles={typingRoles} />
            </p>
          )}
          <a
            href="#contacts"
            className="inline-block mt-7 px-5 py-2.5 border border-accent-violet rounded font-mono text-sm hover:bg-accent-violet hover:text-bg transition-colors"
          >
            Contact me !!
          </a>
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
                Currently working on <b className="text-text">{profile.currently_working_on}</b>
              </span>
            </motion.div>
          )}
        </div>
      </Reveal>
    </section>
  )
}
