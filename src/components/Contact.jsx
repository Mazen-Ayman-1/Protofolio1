import { useState } from 'react'
import Reveal from './Reveal'
import TextReveal from './TextReveal'
import { supabase } from '../lib/supabaseClient'
import { useLanguage } from '../context/LanguageContext'

export default function Contact({ profile }) {
  const { lang } = useLanguage()
  const [form, setForm] = useState({ name: '', email: '', title: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    const { error } = await supabase.from('contact_messages').insert([form])
    if (error) {
      console.error(error)
      setStatus('error')
      return
    }
    setStatus('sent')
    setForm({ name: '', email: '', title: '', message: '' })
  }

  return (
    <section id="contacts" className="max-w-6xl mx-auto px-5 py-16">
      <Reveal className="mb-6 border-b border-bg-border pb-3">
        <h2 className="font-mono text-accent-violet text-xl">
          <TextReveal text="#contacts" />
        </h2>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-10">
        <Reveal className="text-muted">
          <p>
            {lang === 'ar'
              ? 'أنا مهتم بفرص العمل الحر (freelance). لو عندك طلب أو سؤال تاني، متترددش تتواصل معايا.'
              : "I'm interested in freelance opportunities. However, if you have other request or question, don't hesitate to contact me."}
          </p>
          <div className="mt-6 border border-bg-border bg-bg-card rounded-lg p-4 max-w-xs">
            <p className="font-mono text-sm text-text mb-1">{lang === 'ar' ? 'ابعتلي رسالة هنا' : 'Message me here'}</p>
            {profile?.discord_tag && <p className="text-sm">{profile.discord_tag}</p>}
            {profile?.email && (
              <p className="text-sm break-all">{profile.email}</p>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                required
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder={lang === 'ar' ? 'الاسم' : 'Name'}
                className="bg-transparent border border-bg-border rounded px-3 py-2.5 text-sm focus:border-accent-violet outline-none"
              />
              <input
                required
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="bg-transparent border border-bg-border rounded px-3 py-2.5 text-sm focus:border-accent-violet outline-none"
              />
            </div>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder={lang === 'ar' ? 'العنوان' : 'Title'}
              className="w-full bg-transparent border border-bg-border rounded px-3 py-2.5 text-sm focus:border-accent-violet outline-none"
            />
            <textarea
              required
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder={lang === 'ar' ? 'الرسالة' : 'Message'}
              rows={5}
              className="w-full bg-transparent border border-bg-border rounded px-3 py-2.5 text-sm focus:border-accent-violet outline-none"
            />
            <button
              type="submit"
              disabled={status === 'sending'}
              className="px-5 py-2.5 border border-accent-violet rounded font-mono text-sm hover:bg-accent-violet hover:text-bg transition-colors disabled:opacity-50"
            >
              {status === 'sending' ? (lang === 'ar' ? 'بيترسل...' : 'Sending...') : lang === 'ar' ? 'إرسال' : 'Send'}
            </button>
            {status === 'sent' && (
              <p className="text-sm text-green-400">{lang === 'ar' ? 'اتبعتت الرسالة — شكرًا!' : 'Message sent — thank you!'}</p>
            )}
            {status === 'error' && (
              <p className="text-sm text-red-400">{lang === 'ar' ? 'حصل خطأ، جرب تاني.' : 'Something went wrong. Try again.'}</p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  )
}
