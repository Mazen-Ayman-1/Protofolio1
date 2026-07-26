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

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-muted font-mono">Loading...</div>
  }

  const groups = projects.reduce((acc, p) => {
    const g = p.group_name || 'projects'
    acc[g] = acc[g] || []
    acc[g].push(p)
    return acc
  }, {})

  return (
    <div className="dot-grid bg-fixed min-h-screen flex flex-col">
      <Navbar profile={profile} />
      <main className="max-w-6xl mx-auto px-5 py-16 flex-1 w-full">
        <Reveal className="mb-10">
          <h1 className="font-mono text-accent-violet text-xl">
            <TextReveal text="/projects" />
          </h1>
          <p className="text-muted text-sm mt-1">{lang === 'ar' ? 'قائمة مشاريعي' : 'List of my projects'}</p>
        </Reveal>

        {Object.keys(groups).map((g) => (
          <div key={g} className="mb-12">
            <h2 className="font-mono text-lg mb-4">#{g}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {groups[g].map((p, i) => (
                <Reveal key={p.id} delay={i * 0.05}>
                  <ProjectCard project={p} />
                </Reveal>
              ))}
            </div>
          </div>
        ))}

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
