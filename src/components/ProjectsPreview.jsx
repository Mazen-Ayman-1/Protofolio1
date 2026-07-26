import { Link } from 'react-router-dom'
import Reveal from './Reveal'
import ProjectCard from './ProjectCard'
import TextReveal from './TextReveal'

export default function ProjectsPreview({ projects }) {
  const featured = projects.filter((p) => p.is_featured).slice(0, 3)

  return (
    <section id="works" className="max-w-6xl mx-auto px-5 py-16">
      <Reveal className="flex items-end justify-between mb-6 border-b border-bg-border pb-3">
        <h2 className="font-mono text-accent-violet text-xl">
          <TextReveal text="#projects" />
        </h2>
        <Link to="/projects" className="font-mono text-sm text-muted hover:text-text">
          View all &rarr;
        </Link>
      </Reveal>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {featured.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.08}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
        {featured.length === 0 && (
          <p className="text-muted text-sm">No featured projects yet — add some from the admin panel.</p>
        )}
      </div>
    </section>
  )
}
