import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { Trash2, Plus } from 'lucide-react'

const EMPTY = { name: '', issuer: '', icon: '🏅', credential_url: '', issue_date: '', sort_order: 0 }

export default function CertificatesEditor() {
  const [items, setItems] = useState([])
  const [editing, setEditing] = useState(null)

  const load = async () => {
    const { data } = await supabase.from('certificates').select('*').order('sort_order')
    setItems(data || [])
  }

  useEffect(() => {
    load()
  }, [])

  const handleSave = async (e) => {
    e.preventDefault()
    const { id, ...payload } = editing
    if (id) {
      await supabase.from('certificates').update(payload).eq('id', id)
    } else {
      await supabase.from('certificates').insert([payload])
    }
    setEditing(null)
    load()
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this certificate?')) return
    await supabase.from('certificates').delete().eq('id', id)
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-mono text-lg">Certificates</h2>
        <button
          onClick={() => setEditing({ ...EMPTY })}
          className="flex items-center gap-1 px-4 py-2 border border-accent-violet rounded font-mono text-sm hover:bg-accent-violet hover:text-bg"
        >
          <Plus size={16} /> New certificate
        </button>
      </div>

      <div className="space-y-2 mb-8">
        {items.map((c) => (
          <div key={c.id} className="flex items-center justify-between border border-bg-border bg-bg-card rounded px-4 py-2.5">
            <span>{c.icon} {c.name} <span className="text-muted text-sm">— {c.issuer}</span></span>
            <div className="flex gap-3">
              <button onClick={() => setEditing({ ...c })} className="text-sm font-mono text-accent-violet">Edit</button>
              <button onClick={() => handleDelete(c.id)} className="text-red-400"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-muted text-sm">No certificates yet.</p>}
      </div>

      {editing && (
        <form onSubmit={handleSave} className="space-y-3 max-w-lg border border-bg-border bg-bg-card rounded-lg p-5">
          <h3 className="font-mono text-accent-violet mb-2">{editing.id ? 'Edit certificate' : 'New certificate'}</h3>
          <input
            placeholder="Certificate name"
            value={editing.name}
            onChange={(e) => setEditing({ ...editing, name: e.target.value })}
            className="w-full bg-transparent border border-bg-border rounded px-3 py-2 text-sm outline-none focus:border-accent-violet"
          />
          <input
            placeholder="Issuer (e.g. Route Academy)"
            value={editing.issuer}
            onChange={(e) => setEditing({ ...editing, issuer: e.target.value })}
            className="w-full bg-transparent border border-bg-border rounded px-3 py-2 text-sm outline-none focus:border-accent-violet"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              placeholder="Icon (emoji)"
              value={editing.icon}
              onChange={(e) => setEditing({ ...editing, icon: e.target.value })}
              className="bg-transparent border border-bg-border rounded px-3 py-2 text-sm outline-none focus:border-accent-violet"
            />
            <input
              placeholder="Issue date (optional)"
              value={editing.issue_date}
              onChange={(e) => setEditing({ ...editing, issue_date: e.target.value })}
              className="bg-transparent border border-bg-border rounded px-3 py-2 text-sm outline-none focus:border-accent-violet"
            />
          </div>
          <input
            placeholder="Credential URL (optional)"
            value={editing.credential_url}
            onChange={(e) => setEditing({ ...editing, credential_url: e.target.value })}
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
