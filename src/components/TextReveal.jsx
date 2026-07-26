import { motion } from 'framer-motion'

/**
 * Splits `text` into words and animates each one sliding up from behind
 * a mask as it scrolls into view. Use `wordClassName` to style all words
 * (e.g. apply the gradient accent), and `startIndex`/`stagger` to chain
 * multiple TextReveal blocks into one continuous left-to-right reveal.
 */
export default function TextReveal({
  text,
  className = '',
  wordClassName = '',
  startIndex = 0,
  stagger = 0.06,
  baseDelay = 0,
}) {
  const words = text.split(' ')

  return (
    <span className={`inline ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-1 -mb-1 align-bottom">
          <motion.span
            className={`inline-block ${wordClassName}`}
            initial={{ y: '110%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: false, amount: 0.6 }}
            transition={{
              duration: 0.6,
              delay: baseDelay + (startIndex + i) * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
