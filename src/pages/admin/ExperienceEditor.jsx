import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { Trash2, Plus } from 'lucide-react'

const EMPTY = { role: '', company: '', date_range: '', points_raw: '', sort_order: 0 }

export default function ExperienceEditor() {
  const [items, setItems] = useState([])
  const [editing, setEditing] = useState(null)

  const load = async () => {
    const { data } = await supabase.from('experience').select('*').order('sort_order')
    setItems(data || [])
  }

  useEffect(() => {
    load()
  }, [])

  const handleSave = async (e) => {
    e.preventDefault()
    const { id, points_raw, ...rest } = editing
    const payload = { ...rest, points: (points_raw || '').split('\n').filter(Boolean) }
    if (id) {
      await supabase.from('experience').update(payload).eq('id', id)
    } else {
      await supabase.from('experience').insert([payload])
    }
    setEditing(null)
    load()
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this experience entry?')) return
    await supabase.from('experience').delete().eq('id', id)
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-mono text-lg">Experience</h2>
        <button
          onClick={() => setEditing({ ...EMPTY })}
          className="flex items-center gap-1 px-4 py-2 border border-accent-violet rounded font-mono text-sm hover:bg-accent-violet hover:text-bg"
        >
          <Plus size={16} /> New entry
        </button>
      </div>

      <div className="space-y-2 mb-8">
        {items.map((exp) => (
          <div key={exp.id} className="flex items-center justify-between border border-bg-border bg-bg-card rounded px-4 py-2.5">
            <div>
              <p className="font-medium">{exp.role} <span className="text-muted text-sm">· {exp.company}</span></p>
              <p className="text-xs text-muted">{exp.date_range}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setEditing({ ...exp, points_raw: (exp.points || []).join('\n') })}
                className="text-sm font-mono text-accent-violet"
              >
                Edit
              </button>
              <button onClick={() => handleDelete(exp.id)} className="text-red-400"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-muted text-sm">No experience entries yet.</p>}
      </div>

      {editing && (
        <form onSubmit={handleSave} className="space-y-3 max-w-xl border border-bg-border bg-bg-card rounded-lg p-5">
          <h3 className="font-mono text-accent-violet mb-2">{editing.id ? 'Edit entry' : 'New entry'}</h3>
          <input
            placeholder="Role (e.g. Front-end Developer Intern)"
            value={editing.role}
            onChange={(e) => setEditing({ ...editing, role: e.target.value })}
            className="w-full bg-transparent border border-bg-border rounded px-3 py-2 text-sm outline-none focus:border-accent-violet"
          />
          <input
            placeholder="Company"
            value={editing.company}
            onChange={(e) => setEditing({ ...editing, company: e.target.value })}
            className="w-full bg-transparent border border-bg-border rounded px-3 py-2 text-sm outline-none focus:border-accent-violet"
          />
          <input
            placeholder="Date range (e.g. Jun 2025 - Aug 2025)"
            value={editing.date_range}
            onChange={(e) => setEditing({ ...editing, date_range: e.target.value })}
            className="w-full bg-transparent border border-bg-border rounded px-3 py-2 text-sm outline-none focus:border-accent-violet"
          />
          <textarea
            placeholder={'Bullet points (one per line)'}
            rows={4}
            value={editing.points_raw}
            onChange={(e) => setEditing({ ...editing, points_raw: e.target.value })}
            className="w-full bg-transparent border border-bg-border rounded px-3 py-2 text-sm outline-none focus:border-accent-violet"
          />
          <input
            type="number"
            placeholder="Sort order"
            value={editing.sort_order}
            onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })}
            className="w-32 bg-transparent border border-bg-border rounded px-3 py-2 text-sm outline-none focus:border-accent-violet"
          />
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
