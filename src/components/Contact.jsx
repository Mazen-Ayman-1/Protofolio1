import { useState } from 'react'
import { Mail, Phone, Linkedin, Github, MessageCircle } from 'lucide-react'
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

  const infoCards = [
    profile?.email && { Icon: Mail, label: lang === 'ar' ? 'الإيميل' : 'Email', value: profile.email, href: `mailto:${profile.email}` },
    profile?.phone && { Icon: Phone, label: lang === 'ar' ? 'التليفون' : 'Phone', value: profile.phone, href: `tel:${profile.phone}` },
    profile?.linkedin_url && { Icon: Linkedin, label: 'LinkedIn', value: profile.name || 'LinkedIn', href: profile.linkedin_url },
  ].filter(Boolean)

  const socials = [
    profile?.github_url && { Icon: Github, href: profile.github_url, label: 'GitHub' },
    profile?.linkedin_url && { Icon: Linkedin, href: profile.linkedin_url, label: 'LinkedIn' },
    profile?.whatsapp_url && { Icon: MessageCircle, href: profile.whatsapp_url, label: 'WhatsApp' },
  ].filter(Boolean)

  return (
    <section id="contacts" className="max-w-6xl mx-auto px-5 py-16">
      <Reveal className="mb-6 border-b border-bg-border pb-3">
        <h2 className="font-mono text-accent-violet text-xl">
          <TextReveal text="#contacts" />
        </h2>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-10">
        <Reveal className="space-y-3">
          <p className="text-muted mb-4">
            {lang === 'ar'
              ? 'أنا مهتم بفرص العمل الحر (freelance). لو عندك طلب أو سؤال تاني، متترددش تتواصل معايا.'
              : "I'm interested in freelance opportunities. However, if you have other request or question, don't hesitate to contact me."}
          </p>

          {infoCards.map(({ Icon, label, value, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              className="flex items-center gap-3 border border-bg-border bg-bg-card rounded-lg px-4 py-3 hover:border-accent-violet transition-colors"
            >
              <span className="w-9 h-9 rounded-full bg-accent-violet/10 flex items-center justify-center text-accent-violet flex-shrink-0">
                <Icon size={16} />
              </span>
              <div>
                <p className="text-[11px] text-muted uppercase tracking-wide">{label}</p>
                <p className="text-sm font-medium break-all">{value}</p>
              </div>
            </a>
          ))}

          {socials.length > 0 && (
            <div className="flex gap-3 pt-2">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full border border-bg-border flex items-center justify-center text-muted hover:border-accent-violet hover:text-accent-violet transition-colors"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          )}
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
              placeholder={lang === 'ar' ? 'الرسالة' : "I'd love to hear about your project"}
              rows={5}
              className="w-full bg-transparent border border-bg-border rounded px-3 py-2.5 text-sm focus:border-accent-violet outline-none"
            />
            <button
              type="submit"
              disabled={status === 'sending'}
              className="px-5 py-2.5 border border-accent-violet rounded font-mono text-sm hover:bg-accent-violet hover:text-bg transition-colors disabled:opacity-50"
            >
              {status === 'sending' ? (lang === 'ar' ? 'بيترسل...' : 'Sending...') : lang === 'ar' ? 'إرسال' : 'Send Message'}
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
