import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Quote from '../components/Quote'
import ProjectsPreview from '../components/ProjectsPreview'
import Skills from '../components/Skills'
import About from '../components/About'
import Education from '../components/Education'
import Experience from '../components/Experience'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import { CursorGlow, ScrollToTop } from '../components/PageFx'
import { usePortfolioData } from '../hooks/usePortfolioData'

export default function Home() {
  const { profile, projects, skills, experience, education, loading } = usePortfolioData()

  useEffect(() => {
    if (!profile) return
    const title = profile.name
      ? `${profile.name}${profile.role_line_1 ? ' | ' + profile.role_line_1 : ''}`
      : 'Portfolio'
    document.title = title
    const desc = profile.tagline || profile.bio?.slice(0, 155) || ''
    let meta = document.querySelector('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'description'
      document.head.appendChild(meta)
    }
    meta.content = desc
  }, [profile])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-muted font-mono">Loading...</div>
  }

  return (
    <div className="dot-grid bg-fixed">
      <CursorGlow />
      <Navbar profile={profile} />
      <Hero profile={profile} />
      <Quote profile={profile} />
      <About profile={profile} projects={projects} skills={skills} />
      <Education education={education} />
      <Experience experience={experience} />
      <ProjectsPreview projects={projects} />
      <Skills skills={skills} />
      <Contact profile={profile} />
      <Footer profile={profile} />
      <ScrollToTop />
    </div>
  )
}
