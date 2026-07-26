import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { Trash2 } from 'lucide-react'

export default function Messages() {
  const [messages, setMessages] = useState([])

  const load = async () => {
    const { data } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false })
    setMessages(data || [])
  }

  useEffect(() => {
    load()
  }, [])

  const handleDelete = async (id) => {
    await supabase.from('contact_messages').delete().eq('id', id)
    load()
  }

  return (
    <div>
      <h2 className="font-mono text-lg mb-4">Messages</h2>
      <div className="space-y-3">
        {messages.map((m) => (
          <div key={m.id} className="border border-bg-border bg-bg-card rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{m.name} <span className="text-muted text-sm">· {m.email}</span></p>
                {m.title && <p className="text-sm text-accent-violet">{m.title}</p>}
              </div>
              <button onClick={() => handleDelete(m.id)} className="text-red-400"><Trash2 size={16} /></button>
            </div>
            <p className="text-sm text-muted mt-2">{m.message}</p>
            <p className="text-xs text-muted mt-2">{new Date(m.created_at).toLocaleString()}</p>
          </div>
        ))}
        {messages.length === 0 && <p className="text-muted text-sm">No messages yet.</p>}
      </div>
    </div>
  )
}
