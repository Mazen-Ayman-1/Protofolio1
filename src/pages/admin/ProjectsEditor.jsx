import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { Trash2, Plus } from 'lucide-react'

const EMPTY = {
  title: '',
  description: '',
  tech_stack: '',
  group_name: 'complete-apps',
  is_featured: false,
  is_private: false,
  sort_order: 0,
  live_url: '',
  demo_url: '',
  github_url: '',
  cached_url: '',
  figma_url: '',
  linkedin_url: '',
  banner_color: '',
}

export default function ProjectsEditor() {
  const [projects, setProjects] = useState([])
  const [editing, setEditing] = useState(null)

  const load = async () => {
    const { data } = await supabase.from('projects').select('*').order('sort_order')
    setProjects(data || [])
  }

  useEffect(() => {
    load()
  }, [])

  const handleSave = async (e) => {
    e.preventDefault()
    const { id, ...payload } = editing
    if (id) {
      await supabase.from('projects').update(payload).eq('id', id)
    } else {
      await supabase.from('projects').insert([payload])
    }
    setEditing(null)
    load()
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return
    await supabase.from('projects').delete().eq('id', id)
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-mono text-lg">Projects</h2>
        <button
          onClick={() => setEditing({ ...EMPTY })}
          className="flex items-center gap-1 px-4 py-2 border border-accent-violet rounded font-mono text-sm hover:bg-accent-violet hover:text-bg"
        >
          <Plus size={16} /> New project
        </button>
      </div>

      <div className="space-y-2 mb-8">
        {projects.map((p) => (
          <div key={p.id} className="flex items-center justify-between border border-bg-border bg-bg-card rounded px-4 py-2.5">
            <div>
              <p className="font-medium">{p.title}</p>
              <p className="text-xs text-muted">{p.group_name} {p.is_featured && '· featured'}</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setEditing(p)} className="text-sm font-mono text-accent-violet">Edit</button>
              <button onClick={() => handleDelete(p.id)} className="text-red-400"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
        {projects.length === 0 && <p className="text-muted text-sm">No projects yet.</p>}
      </div>

      {editing && (
        <form onSubmit={handleSave} className="space-y-3 max-w-xl border border-bg-border bg-bg-card rounded-lg p-5">
          <h3 className="font-mono text-accent-violet mb-2">{editing.id ? 'Edit project' : 'New project'}</h3>
          {['title', 'tech_stack', 'group_name', 'banner_color'].map((k) => (
            <input
              key={k}
              placeholder={k}
              value={editing[k] || ''}
              onChange={(e) => setEditing({ ...editing, [k]: e.target.value })}
              className="w-full bg-transparent border border-bg-border rounded px-3 py-2 text-sm outline-none focus:border-accent-violet"
            />
          ))}
          <textarea
            placeholder="description"
            rows={3}
            value={editing.description || ''}
            onChange={(e) => setEditing({ ...editing, description: e.target.value })}
            className="w-full bg-transparent border border-bg-border rounded px-3 py-2 text-sm outline-none focus:border-accent-violet"
          />
          <input
            placeholder="title (Arabic, optional)"
            dir="rtl"
            value={editing.title_ar || ''}
            onChange={(e) => setEditing({ ...editing, title_ar: e.target.value })}
            className="w-full bg-transparent border border-bg-border rounded px-3 py-2 text-sm outline-none focus:border-accent-violet"
          />
          <textarea
            placeholder="description (Arabic, optional)"
            dir="rtl"
            rows={3}
            value={editing.description_ar || ''}
            onChange={(e) => setEditing({ ...editing, description_ar: e.target.value })}
            className="w-full bg-transparent border border-bg-border rounded px-3 py-2 text-sm outline-none focus:border-accent-violet"
          />
          {['live_url', 'demo_url', 'github_url', 'cached_url', 'figma_url', 'linkedin_url'].map((k) => (
            <input
              key={k}
              placeholder={k}
              value={editing[k] || ''}
              onChange={(e) => setEditing({ ...editing, [k]: e.target.value })}
              className="w-full bg-transparent border border-bg-border rounded px-3 py-2 text-sm outline-none focus:border-accent-violet"
            />
          ))}
          <div className="flex items-center gap-4 text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={!!editing.is_featured}
                onChange={(e) => setEditing({ ...editing, is_featured: e.target.checked })}
              />
              Featured
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={!!editing.is_private}
                onChange={(e) => setEditing({ ...editing, is_private: e.target.checked })}
              />
              Private (lock icon)
            </label>
            <input
              type="number"
              placeholder="sort order"
              value={editing.sort_order || 0}
              onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })}
              className="w-24 bg-transparent border border-bg-border rounded px-2 py-1 outline-none focus:border-accent-violet"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" className="px-4 py-2 border border-accent-violet rounded font-mono text-sm hover:bg-accent-violet hover:text-bg">
              Save
            </button>
            <button type="button" onClick={() => setEditing(null)} className="px-4 py-2 border border-bg-border rounded font-mono text-sm">
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
