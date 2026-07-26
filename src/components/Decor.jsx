import { motion } from 'framer-motion'

export function DotGrid({ className = '', cols = 4, rows = 4 }) {
  return (
    <div className={`grid gap-2 ${className}`} style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
      {Array.from({ length: cols * rows }).map((_, i) => (
        <span key={i} className="w-1 h-1 rounded-full bg-bg-border" />
      ))}
    </div>
  )
}

export function RotatedSquares({ className = '' }) {
  return (
    <motion.div
      className={`pointer-events-none ${className}`}
      animate={{ rotate: [0, 8, 0] }}
      transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div className="w-24 h-24 border border-accent-violet/40 rotate-12" />
      <div className="w-16 h-16 border border-accent-pink/40 -rotate-6 -mt-16 ml-8" />
    </motion.div>
  )
}
