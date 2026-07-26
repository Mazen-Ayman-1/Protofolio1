import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function SplashScreen({ name = 'Elias', role = 'developer', onDone }) {
  const [phase, setPhase] = useState(0) // 0: fly-in, 1: portal grow, 2: fade out

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 1300)
    const t2 = setTimeout(() => setPhase(2), 2250)
    const t3 = setTimeout(() => setPhase(3), 2750)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  return (
    <AnimatePresence onExitComplete={onDone}>
      {phase < 3 && (
        <motion.div
          className="fixed inset-0 z-[100] bg-bg overflow-hidden flex flex-col items-center justify-center gap-5"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55 }}
        >
          {/* portal mark that flies in, then grows to swallow the screen */}
          <motion.div
            className="rounded-full bg-gradient-to-br from-accent-violet to-accent-pink"
            style={{ width: 72, height: 72, filter: 'drop-shadow(0 0 30px rgba(157,123,255,0.9))' }}
            initial={{ y: -160, opacity: 0, scale: 1 }}
            animate={
              phase === 0
                ? { y: 0, opacity: 1, scale: 1 }
                : { y: 0, opacity: 1, scale: 42 }
            }
            transition={
              phase === 0
                ? { duration: 0.65, delay: 0.1, ease: [0.34, 1.4, 0.64, 1] }
                : { duration: 0.9, ease: [0.4, 0, 0.6, 1] }
            }
          />

          <motion.div
            className="text-center"
            initial={{ y: 100, opacity: 0 }}
            animate={
              phase === 0
                ? { y: 0, opacity: 1 }
                : { y: 60, opacity: 0.7, scale: 0.6 }
            }
            transition={
              phase === 0
                ? { duration: 0.65, delay: 0.1, ease: [0.34, 1.4, 0.64, 1] }
                : { duration: 0.9, ease: 'easeInOut' }
            }
          >
            <p className="font-mono text-2xl md:text-3xl font-extrabold tracking-widest gradient-text">
              {name.toUpperCase()}
            </p>
            <p className="font-mono text-xs text-muted mt-1 tracking-widest uppercase">{role}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
