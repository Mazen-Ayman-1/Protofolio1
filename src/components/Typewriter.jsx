import { useEffect, useState } from 'react'

export default function Typewriter({ roles }) {
  const list = roles?.length ? roles : ['developer']
  const [text, setText] = useState('')
  const [idx, setIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = list[idx % list.length]
    let timeout

    if (!deleting) {
      if (text.length < current.length) {
        timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), 70)
      } else {
        timeout = setTimeout(() => setDeleting(true), 1600)
      }
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), 35)
      } else {
        setDeleting(false)
        setIdx((i) => i + 1)
      }
    }
    return () => clearTimeout(timeout)
  }, [text, deleting, idx, list])

  return (
    <span className="font-mono text-accent-violet font-semibold inline-flex items-center gap-1">
      {text}
      <span className="w-[2px] h-4 bg-accent-violet animate-pulse" />
    </span>
  )
}
