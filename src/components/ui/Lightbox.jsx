import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

/**
 * Fullscreen lightbox used by the Portfolio masonry grid (build brief §6.6).
 * Supports prev/next navigation, closes on Escape or backdrop click, and
 * shows an image caption.
 */
function Lightbox({ items, activeIndex, onClose, onNavigate }) {
  const isOpen = activeIndex !== null
  const item = isOpen ? items[activeIndex] : null

  const goNext = useCallback(() => {
    onNavigate((activeIndex + 1) % items.length)
  }, [activeIndex, items.length, onNavigate])

  const goPrev = useCallback(() => {
    onNavigate((activeIndex - 1 + items.length) % items.length)
  }, [activeIndex, items.length, onNavigate])

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') goNext()
      if (event.key === 'ArrowLeft') goPrev()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose, goNext, goPrev])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
          role="dialog"
          aria-modal="true"
          aria-label={item?.title}
          onClick={onClose}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close lightbox"
            className="absolute top-5 right-5 text-paper/80 hover:text-gold p-2 z-10"
          >
            <X size={28} />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              goPrev()
            }}
            aria-label="Previous image"
            className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 text-paper/80 hover:text-gold p-2 z-10"
          >
            <ChevronLeft size={32} />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              goNext()
            }}
            aria-label="Next image"
            className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 text-paper/80 hover:text-gold p-2 z-10"
          >
            <ChevronRight size={32} />
          </button>

          <motion.div
            key={item?.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="max-w-4xl w-full"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={item?.image}
              alt={item?.title}
              className="w-full max-h-[78vh] object-contain rounded-2xl"
            />
            <p className="mt-4 text-center text-paper/90 text-sm md:text-base font-medium">
              {item?.title}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Lightbox
