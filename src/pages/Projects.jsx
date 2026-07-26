import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProjectCard from '../components/ProjectCard'
import Reveal from '../components/Reveal'
import TextReveal from '../components/TextReveal'
import { useLanguage } from '../context/LanguageContext'
import { usePortfolioData } from '../hooks/usePortfolioData'

export default function Projects() {
  const { profile, projects, loading } = usePortfolioData()
  const { lang } = useLanguage()
  const [filter, setFilter] = useState('All')

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-muted font-mono">Loading...</div>
  }

  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.group_name || 'projects')))]
  const filtered = filter === 'All' ? projects : projects.filter((p) => (p.group_name || 'projects') === filter)

  return (
    <div className="dot-grid bg-fixed min-h-screen flex flex-col">
      <Navbar profile={profile} />
      <main className="max-w-6xl mx-auto px-5 py-16 flex-1 w-full">
        <Reveal className="mb-8">
          <h1 className="font-mono text-accent-violet text-xl">
            <TextReveal text="/projects" />
          </h1>
          <p className="text-muted text-sm mt-1">{lang === 'ar' ? 'قائمة مشاريعي' : 'List of my projects'}</p>
        </Reveal>

        <Reveal className="flex flex-wrap gap-2 mb-8">
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.05}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>

        {projects.length === 0 && (
          <p className="text-muted text-sm">
            {lang === 'ar' ? 'لسه مفيش مشاريع — ضيف من لوحة التحكم.' : 'No projects yet — add some from the admin panel.'}
          </p>
        )}
      </main>
      <Footer profile={profile} />
    </div>
  )
}
