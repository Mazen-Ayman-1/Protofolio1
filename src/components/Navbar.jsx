import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Github, Dribbble, Figma, Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const LINKS = [
  { href: '#home', label: '#home' },
  { href: '#works', label: '#works' },
  { href: '#about-me', label: '#about-me' },
  { href: '#experience', label: '#experience' },
  { href: '#contacts', label: '#contacts' },
]

export default function Navbar({ profile }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href) => {
    setOpen(false)
    if (location.pathname !== '/') {
      navigate('/' + href)
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-bg-nav/90 backdrop-blur border-b border-bg-border' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-5 py-4">
        <Link to="/" className="flex items-center gap-2 font-mono font-semibold text-text">
          <span className="text-accent-violet">◆</span>
          {profile?.name || 'Elias'}
        </Link>

        <ul className="hidden md:flex items-center gap-7 font-mono text-sm text-muted">
          {LINKS.map((l) => (
            <li key={l.href}>
              <button onClick={() => handleNav(l.href)} className="hover:text-accent-violet transition-colors">
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-4">
          <span className="font-mono text-sm text-muted">EN</span>
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="text-muted hover:text-text transition-colors"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a href={profile?.github_url || '#'} target="_blank" rel="noreferrer" aria-label="GitHub" className="text-muted hover:text-text">
            <Github size={18} />
          </a>
          <a href={profile?.dribbble_url || '#'} target="_blank" rel="noreferrer" aria-label="Dribbble" className="text-muted hover:text-text">
            <Dribbble size={18} />
          </a>
          <a href={profile?.figma_url || '#'} target="_blank" rel="noreferrer" aria-label="Figma" className="text-muted hover:text-text">
            <Figma size={18} />
          </a>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <button onClick={toggleTheme} aria-label="Toggle theme" className="text-text">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className="text-text" onClick={() => setOpen(true)} aria-label="Open menu">
            <Menu size={22} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 bg-bg-nav md:hidden"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex justify-between items-center px-5 py-4">
              <span className="font-mono font-semibold">{profile?.name || 'Elias'}</span>
              <button onClick={() => setOpen(false)} aria-label="Close menu">
                <X size={22} />
              </button>
            </div>
            <ul className="flex flex-col gap-6 px-6 mt-8 font-mono text-2xl">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <button onClick={() => handleNav(l.href)}>{l.label}</button>
                </li>
              ))}
            </ul>
            <div className="flex gap-5 px-6 mt-10">
              <a href={profile?.github_url || '#'} target="_blank" rel="noreferrer"><Github /></a>
              <a href={profile?.dribbble_url || '#'} target="_blank" rel="noreferrer"><Dribbble /></a>
              <a href={profile?.figma_url || '#'} target="_blank" rel="noreferrer"><Figma /></a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
