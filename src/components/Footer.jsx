import { Github, Linkedin, MessageCircle } from 'lucide-react'

export default function Footer({ profile }) {
  return (
    <footer className="border-t border-bg-border mt-10">
      <div className="max-w-6xl mx-auto px-5 py-8 flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <p className="font-mono font-semibold">{profile?.name || 'Portfolio'}</p>
          <p className="text-muted text-sm">{profile?.short_title || 'Web designer and front-end developer'}</p>
        </div>
        <div className="flex gap-4 text-muted">
          {profile?.github_url && (
            <a href={profile.github_url} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={18} /></a>
          )}
          {profile?.linkedin_url && (
            <a href={profile.linkedin_url} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a>
          )}
          {profile?.whatsapp_url && (
            <a href={profile.whatsapp_url} target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle size={18} /></a>
          )}
        </div>
      </div>
      <p className="text-center text-xs text-muted pb-6">
        © {new Date().getFullYear()} Copyright. Made by {profile?.name || 'Portfolio'}
      </p>
    </footer>
  )
}
