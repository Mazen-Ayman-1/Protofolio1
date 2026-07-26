import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { Trash2, Plus } from 'lucide-react'

export default function SkillsEditor() {
  const [skills, setSkills] = useState([])
  const [form, setForm] = useState({ name: '', category: 'Languages' })

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
    await supabase.from('skills').insert([form])
    setForm({ ...form, name: '' })
    load()
  }

  const handleDelete = async (id) => {
    await supabase.from('skills').delete().eq('id', id)
    load()
  }

  return (
    <div>
      <h2 className="font-mono text-lg mb-4">Skills</h2>
      <form onSubmit={handleAdd} className="flex flex-wrap gap-3 mb-6">
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
        <button className="flex items-center gap-1 px-4 py-2 border border-accent-violet rounded font-mono text-sm hover:bg-accent-violet hover:text-bg">
          <Plus size={16} /> Add
        </button>
      </form>

      <div className="space-y-2">
        {skills.map((s) => (
          <div key={s.id} className="flex items-center justify-between border border-bg-border bg-bg-card rounded px-4 py-2">
            <span>{s.name} <span className="text-muted text-xs">— {s.category}</span></span>
            <button onClick={() => handleDelete(s.id)} className="text-red-400"><Trash2 size={16} /></button>
          </div>
        ))}
        {skills.length === 0 && <p className="text-muted text-sm">No skills yet.</p>}
      </div>
    </div>
  )
}
