import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Quote from '../components/Quote'
import ProjectsPreview from '../components/ProjectsPreview'
import Skills from '../components/Skills'
import About from '../components/About'
import Experience from '../components/Experience'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import { CursorGlow, ScrollToTop } from '../components/PageFx'
import { usePortfolioData } from '../hooks/usePortfolioData'

export default function Home() {
  const { profile, projects, skills, experience, loading } = usePortfolioData()

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-muted font-mono">Loading...</div>
  }

  return (
    <div className="dot-grid bg-fixed">
      <CursorGlow />
      <Navbar profile={profile} />
      <Hero profile={profile} />
      <Quote text={profile?.quote_text} author={profile?.quote_author} />
      <ProjectsPreview projects={projects} />
      <Skills skills={skills} />
      <About profile={profile} />
      <Experience experience={experience} />
      <Contact profile={profile} />
      <Footer profile={profile} />
      <ScrollToTop />
    </div>
  )
}
