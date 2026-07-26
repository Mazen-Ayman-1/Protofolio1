import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import ProfileEditor from './ProfileEditor'
import ProjectsEditor from './ProjectsEditor'
import SkillsEditor from './SkillsEditor'
import ExperienceEditor from './ExperienceEditor'
import Messages from './Messages'

const TABS = [
  { key: 'profile', label: 'Profile', Component: ProfileEditor },
  { key: 'projects', label: 'Projects', Component: ProjectsEditor },
  { key: 'skills', label: 'Skills', Component: SkillsEditor },
  { key: 'experience', label: 'Experience', Component: ExperienceEditor },
  { key: 'messages', label: 'Messages', Component: Messages },
]

export default function Dashboard() {
  const [tab, setTab] = useState('profile')
  const { signOut } = useAuth()
  const Active = TABS.find((t) => t.key === tab).Component

  return (
    <div className="min-h-screen">
      <header className="border-b border-bg-border px-5 py-4 flex items-center justify-between">
        <Link to="/" className="font-mono text-accent-violet">&larr; Back to site</Link>
        <button onClick={signOut} className="font-mono text-sm text-muted hover:text-text">Sign out</button>
      </header>
      <div className="max-w-5xl mx-auto px-5 py-8">
        <div className="flex gap-2 mb-8 border-b border-bg-border overflow-x-auto">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`font-mono text-sm px-4 py-2.5 whitespace-nowrap border-b-2 -mb-px transition-colors ${
                tab === t.key ? 'border-accent-violet text-text' : 'border-transparent text-muted hover:text-text'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <Active />
      </div>
    </div>
  )
}
