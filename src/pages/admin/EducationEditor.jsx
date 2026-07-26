import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { Trash2, Plus } from 'lucide-react'

const EMPTY = {
  degree: '',
  degree_ar: '',
  field: '',
  field_ar: '',
  school: '',
  location: '',
  date_range: '',
  description: '',
  description_ar: '',
  sort_order: 0,
}

export default function EducationEditor() {
  const [items, setItems] = useState([])
  const [editing, setEditing] = useState(null)

  const load = async () => {
    const { data } = await supabase.from('education').select('*').order('sort_order')
    setItems(data || [])
  }

  useEffect(() => {
    load()
  }, [])

  const handleSave = async (e) => {
    e.preventDefault()
    const { id, ...payload } = editing
    if (id) {
      await supabase.from('education').update(payload).eq('id', id)
    } else {
      await supabase.from('education').insert([payload])
    }
    setEditing(null)
    load()
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this education entry?')) return
    await supabase.from('education').delete().eq('id', id)
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-mono text-lg">Education</h2>
        <button
          onClick={() => setEditing({ ...EMPTY })}
          className="flex items-center gap-1 px-4 py-2 border border-accent-violet rounded font-mono text-sm hover:bg-accent-violet hover:text-bg"
        >
          <Plus size={16} /> New entry
        </button>
      </div>

      <div className="space-y-2 mb-8">
        {items.map((edu) => (
          <div key={edu.id} className="flex items-center justify-between border border-bg-border bg-bg-card rounded px-4 py-2.5">
            <div>
              <p className="font-medium">{edu.degree} {edu.field && <span className="text-muted text-sm">· {edu.field}</span>}</p>
              <p className="text-xs text-muted">{edu.school} · {edu.date_range}</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setEditing({ ...edu })} className="text-sm font-mono text-accent-violet">Edit</button>
              <button onClick={() => handleDelete(edu.id)} className="text-red-400"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-muted text-sm">No education entries yet.</p>}
      </div>

      {editing && (
        <form onSubmit={handleSave} className="space-y-3 max-w-xl border border-bg-border bg-bg-card rounded-lg p-5">
          <h3 className="font-mono text-accent-violet mb-2">{editing.id ? 'Edit entry' : 'New entry'}</h3>
          <input
            placeholder="Degree (e.g. Bachelor of Science)"
            value={editing.degree}
            onChange={(e) => setEditing({ ...editing, degree: e.target.value })}
            className="w-full bg-transparent border border-bg-border rounded px-3 py-2 text-sm outline-none focus:border-accent-violet"
          />
          <input
            placeholder="Degree (Arabic, optional)"
            value={editing.degree_ar}
            onChange={(e) => setEditing({ ...editing, degree_ar: e.target.value })}
            className="w-full bg-transparent border border-bg-border rounded px-3 py-2 text-sm outline-none focus:border-accent-violet"
            dir="rtl"
          />
          <input
            placeholder="Field of study (e.g. Computer Science)"
            value={editing.field}
            onChange={(e) => setEditing({ ...editing, field: e.target.value })}
            className="w-full bg-transparent border border-bg-border rounded px-3 py-2 text-sm outline-none focus:border-accent-violet"
          />
          <input
            placeholder="Field of study (Arabic, optional)"
            dir="rtl"
            value={editing.field_ar}
            onChange={(e) => setEditing({ ...editing, field_ar: e.target.value })}
            className="w-full bg-transparent border border-bg-border rounded px-3 py-2 text-sm outline-none focus:border-accent-violet"
          />
          <input
            placeholder="School / University"
            value={editing.school}
            onChange={(e) => setEditing({ ...editing, school: e.target.value })}
            className="w-full bg-transparent border border-bg-border rounded px-3 py-2 text-sm outline-none focus:border-accent-violet"
          />
          <input
            placeholder="Location"
            value={editing.location}
            onChange={(e) => setEditing({ ...editing, location: e.target.value })}
            className="w-full bg-transparent border border-bg-border rounded px-3 py-2 text-sm outline-none focus:border-accent-violet"
          />
          <input
            placeholder="Date range (e.g. 2023 - 2027)"
            value={editing.date_range}
            onChange={(e) => setEditing({ ...editing, date_range: e.target.value })}
            className="w-full bg-transparent border border-bg-border rounded px-3 py-2 text-sm outline-none focus:border-accent-violet"
          />
          <textarea
            placeholder="Description (optional)"
            rows={3}
            value={editing.description}
            onChange={(e) => setEditing({ ...editing, description: e.target.value })}
            className="w-full bg-transparent border border-bg-border rounded px-3 py-2 text-sm outline-none focus:border-accent-violet"
          />
          <textarea
            placeholder="Description (Arabic, optional)"
            dir="rtl"
            rows={3}
            value={editing.description_ar}
            onChange={(e) => setEditing({ ...editing, description_ar: e.target.value })}
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
