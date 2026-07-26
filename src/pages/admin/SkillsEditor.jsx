import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { Trash2, Plus } from 'lucide-react'

export default function SkillsEditor() {
  const [skills, setSkills] = useState([])
  const [form, setForm] = useState({ name: '', category: 'Languages', level: 80, icon: '' })
  const [editingId, setEditingId] = useState(null)

  const load = async () => {
    const { data } = await supabase.from('skills').select('*').order('category')
    setSkills(data || [])
  }

  useEffect(() => {
    load()
  }, [])

  const handleAdd = async (e) => {
    e.preventDefault()
    if (!form.name) return
    const payload = { ...form, level: Number(form.level) || null }
    if (editingId) {
      await supabase.from('skills').update(payload).eq('id', editingId)
      setEditingId(null)
    } else {
      await supabase.from('skills').insert([payload])
    }
    setForm({ name: '', category: form.category, level: 80, icon: '' })
    load()
  }

  const handleEdit = (s) => {
    setEditingId(s.id)
    setForm({ name: s.name, category: s.category, level: s.level ?? 80, icon: s.icon || '' })
  }

  const handleDelete = async (id) => {
    await supabase.from('skills').delete().eq('id', id)
    if (editingId === id) setEditingId(null)
    load()
  }

  return (
    <div>
      <h2 className="font-mono text-lg mb-4">Skills</h2>
      <p className="text-xs text-muted mb-3">
        Tip: use category "Certifications" if you want a skill entry to be excluded from the skills grid (legacy —
        prefer the dedicated Certificates tab for real certificates).
      </p>
      <form onSubmit={handleAdd} className="flex flex-wrap gap-3 mb-6 items-center">
        <input
          placeholder="Skill name (e.g. TypeScript)"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="bg-transparent border border-bg-border rounded px-3 py-2 text-sm outline-none focus:border-accent-violet"
        />
        <input
          placeholder="Category (e.g. Languages)"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="bg-transparent border border-bg-border rounded px-3 py-2 text-sm outline-none focus:border-accent-violet"
        />
        <input
          placeholder="Icon (emoji, optional)"
          value={form.icon}
          onChange={(e) => setForm({ ...form, icon: e.target.value })}
          className="w-28 bg-transparent border border-bg-border rounded px-3 py-2 text-sm outline-none focus:border-accent-violet"
        />
        <input
          type="number"
          min="0"
          max="100"
          placeholder="Level %"
          value={form.level}
          onChange={(e) => setForm({ ...form, level: e.target.value })}
          className="w-24 bg-transparent border border-bg-border rounded px-3 py-2 text-sm outline-none focus:border-accent-violet"
        />
        <button className="flex items-center gap-1 px-4 py-2 border border-accent-violet rounded font-mono text-sm hover:bg-accent-violet hover:text-bg">
          <Plus size={16} /> {editingId ? 'Update' : 'Add'}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => { setEditingId(null); setForm({ name: '', category: form.category, level: 80, icon: '' }) }}
            className="px-4 py-2 border border-bg-border rounded font-mono text-sm"
          >
            Cancel
          </button>
        )}
      </form>

      <div className="space-y-2">
        {skills.map((s) => (
          <div key={s.id} className="flex items-center justify-between border border-bg-border bg-bg-card rounded px-4 py-2">
            <span>
              {s.icon} {s.name} <span className="text-muted text-xs">— {s.category} {typeof s.level === 'number' && `· ${s.level}%`}</span>
            </span>
            <div className="flex gap-3">
              <button onClick={() => handleEdit(s)} className="text-sm font-mono text-accent-violet">Edit</button>
              <button onClick={() => handleDelete(s.id)} className="text-red-400"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
        {skills.length === 0 && <p className="text-muted text-sm">No skills yet.</p>}
      </div>
    </div>
  )
}
