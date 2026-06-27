import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion'

/**
 * Subtle bouncing scroll-down indicator, bottom-center of the hero.
 * Fades out once the user has scrolled past the hero.
 */
function ScrollIndicator({ visible }) {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <motion.a
      href="#about"
      aria-label="Scroll to next section"
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.4 }}
      className="absolute bottom-8 inset-x-0 flex flex-col items-center gap-2 text-paper/70 hover:text-gold transition-colors duration-300"
    >
      <span className="text-[11px] uppercase tracking-[0.2em]">Scroll</span>
      <motion.div
        animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown size={20} />
      </motion.div>
    </motion.a>
  )
}

export default ScrollIndicator
