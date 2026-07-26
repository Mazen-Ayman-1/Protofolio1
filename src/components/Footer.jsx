import { Github, Dribbble, Figma } from 'lucide-react'

export default function Footer({ profile }) {
  return (
    <footer className="border-t border-bg-border mt-10">
      <div className="max-w-6xl mx-auto px-5 py-8 flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <p className="font-mono font-semibold">{profile?.name || 'Elias'}</p>
          <p className="text-muted text-sm">{profile?.short_title || 'Web designer and front-end developer'}</p>
        </div>
        <div className="flex gap-4 text-muted">
          <a href={profile?.github_url || '#'} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={18} /></a>
          <a href={profile?.dribbble_url || '#'} target="_blank" rel="noreferrer" aria-label="Dribbble"><Dribbble size={18} /></a>
          <a href={profile?.figma_url || '#'} target="_blank" rel="noreferrer" aria-label="Figma"><Figma size={18} /></a>
        </div>
      </div>
      <p className="text-center text-xs text-muted pb-6">
        © {new Date().getFullYear()} Copyright. Made by {profile?.name || 'Elias'}
      </p>
    </footer>
  )
}
