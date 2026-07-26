import { motion } from 'framer-motion'
import { Lock, ArrowUpRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const LINK_LABELS = {
  live_url: 'Live',
  demo_url: 'Demo',
  github_url: 'GitHub',
  cached_url: 'Cached',
  figma_url: 'Figma',
  linkedin_url: 'LinkedIn',
}

export default function ProjectCard({ project }) {
  const { pick } = useLanguage()
  const title = pick(project, 'title') || project.title
  const description = pick(project, 'description')
  const links = Object.keys(LINK_LABELS).filter((k) => project[k])

  return (
    <motion.div
      className="border border-bg-border bg-bg-card rounded-lg overflow-hidden flex flex-col"
      whileHover={{ y: -4, borderColor: '#9d7bff' }}
      transition={{ duration: 0.2 }}
    >
      <div
        className="h-28 flex items-center justify-between px-4"
        style={{ background: project.banner_color || 'linear-gradient(135deg,#2a2a3a,#1a1a26)' }}
      >
        <span className="font-mono font-bold text-lg">{title}</span>
        {project.is_private && <Lock size={18} className="text-text/80" />}
      </div>
      <div className="p-4 flex flex-col flex-1">
        {project.tech_stack && (
          <p className="font-mono text-xs text-muted mb-2">{project.tech_stack}</p>
        )}
        <h3 className="font-semibold">{title}</h3>
        {description && (
          <p className="text-sm text-muted mt-1 flex-1">{description}</p>
        )}
        {links.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {links.map((k) => (
              <a
                key={k}
                href={project[k]}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs font-mono border border-bg-border rounded px-2.5 py-1 hover:border-accent-violet hover:text-accent-violet transition-colors"
              >
                {LINK_LABELS[k]} <ArrowUpRight size={12} />
              </a>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}
