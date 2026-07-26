import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

const FIELDS = [
  ['name', 'Name'],
  ['role_line_1', 'Role line 1 (e.g. web designer)'],
  ['role_line_2', 'Role line 2 (e.g. front-end developer)'],
  ['tagline', 'Hero tagline'],
  ['currently_working_on', 'Currently working on'],
  ['avatar_url', 'Hero photo URL (cutout PNG)'],
  ['about_image_url', 'About section photo URL'],
  ['bio', 'Bio (textarea)'],
  ['years_experience', 'Years of experience (e.g. 1+)'],
  ['projects_count', 'Projects done (e.g. 6+)'],
  ['committed_percent', 'Committed % (e.g. 100%)'],
  ['university', 'University'],
  ['location', 'Location'],
  ['phone', 'Phone'],
  ['cv_url', 'CV file URL (PDF)'],
  ['quote_text', 'Quote text'],
  ['quote_author', 'Quote author'],
  ['email', 'Contact email'],
  ['discord_tag', 'Discord tag'],
  ['github_url', 'GitHub URL'],
  ['dribbble_url', 'Dribbble URL'],
  ['figma_url', 'Figma URL'],
  ['short_title', 'Footer short title'],
]

export default function ProfileEditor() {
  const [profile, setProfile] = useState(null)
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    supabase.from('profile').select('*').limit(1).maybeSingle().then(({ data }) => {
      setProfile(data || { id: undefined })
    })
  }, [])

  const handleChange = (key, value) => setProfile({ ...profile, [key]: value })

  const handleSave = async (e) => {
    e.preventDefault()
    setStatus('saving')
    const funFactsArray =
      typeof profile.fun_facts_raw === 'string'
        ? profile.fun_facts_raw.split('\n').filter(Boolean)
        : profile.fun_facts

    const payload = { ...profile, fun_facts: funFactsArray }
    delete payload.fun_facts_raw

    if (typeof payload.typing_roles_raw === 'string') {
      payload.typing_roles = payload.typing_roles_raw.split(',').map((r) => r.trim()).filter(Boolean)
    }
    delete payload.typing_roles_raw

    const { error } = profile.id
      ? await supabase.from('profile').update(payload).eq('id', profile.id)
      : await supabase.from('profile').insert([payload])

    setStatus(error ? 'error' : 'saved')
  }

  if (!profile) return <p className="text-muted font-mono text-sm">Loading...</p>

  return (
    <form onSubmit={handleSave} className="space-y-4 max-w-2xl">
      {FIELDS.map(([key, label]) => (
        <div key={key}>
          <label className="block text-xs font-mono text-muted mb-1">{label}</label>
          {key === 'bio' ? (
            <textarea
              rows={5}
              value={profile[key] || ''}
              onChange={(e) => handleChange(key, e.target.value)}
              className="w-full bg-transparent border border-bg-border rounded px-3 py-2 text-sm focus:border-accent-violet outline-none"
            />
          ) : (
            <input
              value={profile[key] || ''}
              onChange={(e) => handleChange(key, e.target.value)}
              className="w-full bg-transparent border border-bg-border rounded px-3 py-2 text-sm focus:border-accent-violet outline-none"
            />
          )}
        </div>
      ))}
      <div>
        <label className="block text-xs font-mono text-muted mb-1">Fun facts (one per line)</label>
        <textarea
          rows={4}
          value={profile.fun_facts_raw ?? (profile.fun_facts || []).join('\n')}
          onChange={(e) => handleChange('fun_facts_raw', e.target.value)}
          className="w-full bg-transparent border border-bg-border rounded px-3 py-2 text-sm focus:border-accent-violet outline-none"
        />
      </div>
      <div>
        <label className="block text-xs font-mono text-muted mb-1">Typing roles (comma-separated, rotates in hero)</label>
        <input
          value={profile.typing_roles_raw ?? (profile.typing_roles || []).join(', ')}
          onChange={(e) => handleChange('typing_roles_raw', e.target.value)}
          placeholder="Flutter Developer, Mobile App Builder, CS Student"
          className="w-full bg-transparent border border-bg-border rounded px-3 py-2 text-sm focus:border-accent-violet outline-none"
        />
      </div>
      <button
        type="submit"
        className="px-5 py-2.5 border border-accent-violet rounded font-mono text-sm hover:bg-accent-violet hover:text-bg transition-colors"
      >
        {status === 'saving' ? 'Saving...' : 'Save profile'}
      </button>
      {status === 'saved' && <p className="text-green-400 text-sm">Saved.</p>}
      {status === 'error' && <p className="text-red-400 text-sm">Failed to save.</p>}
    </form>
  )
}
