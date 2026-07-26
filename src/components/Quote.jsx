import Reveal from './Reveal'

export default function Quote({ text, author }) {
  if (!text) return null
  return (
    <Reveal className="max-w-6xl mx-auto px-5 pb-16">
      <div className="border border-bg-border bg-bg-card rounded-lg px-6 py-6 max-w-md">
        <p className="text-lg font-medium">
          <span className="text-accent-violet text-2xl leading-none mr-1">“</span>
          {text}
          <span className="text-accent-pink text-2xl leading-none ml-1">”</span>
        </p>
        {author && <p className="text-muted text-sm mt-3">— {author}</p>}
      </div>
    </Reveal>
  )
}
