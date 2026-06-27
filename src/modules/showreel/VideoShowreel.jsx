import { useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Play, X } from 'lucide-react'
import SectionEyebrow from '../../components/common/SectionEyebrow'
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion'

/**
 * Video Showreel section (build brief §6.7). Full-width, dark background
 * with subtle parallax (one of only two sections permitted parallax, per
 * §3.5). Opens a clean modal player on click — never autoplays with sound.
 */
function VideoShowreel() {
  const sectionRef = useRef(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const parallaxY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [-40, 40])

  return (
    <section id="showreel" ref={sectionRef} className="relative section-padding bg-ink overflow-hidden">
      <motion.div
        style={{ y: parallaxY }}
        className="absolute inset-0 bg-gradient-to-b from-charcoal via-ink to-ink"
        aria-hidden="true"
      >
        {/* TODO: replace with a still frame from the real VClick showreel as a background plate */}
        <img
          src="https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1920&auto=format&fit=crop"
          alt=""
          className="w-full h-full object-cover opacity-25"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/70 to-ink" />

      <div className="relative z-10 section-container text-center">
        <SectionEyebrow>Our Reel</SectionEyebrow>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-5 text-h2 font-extrabold text-paper"
        >
          Video Showreel
        </motion.h2>

        <motion.button
          type="button"
          onClick={() => setIsModalOpen(true)}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          whileHover={{ scale: 1.06 }}
          aria-label="Play showreel video"
          className="group relative mx-auto mt-12 w-24 h-24 md:w-28 md:h-28 rounded-full bg-gold-sweep shadow-gold-lg flex items-center justify-center"
        >
          <span className="absolute inset-0 rounded-full bg-gold-sweep animate-ping opacity-20" aria-hidden="true" />
          <Play size={32} className="text-ink fill-ink ml-1" />
        </motion.button>

        <p className="mt-8 text-body-lg text-mist">Watch how we bring stories to life</p>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
            role="dialog"
            aria-modal="true"
            aria-label="Showreel video player"
            onClick={() => setIsModalOpen(false)}
          >
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              aria-label="Close video"
              className="absolute top-5 right-5 text-paper/80 hover:text-gold p-2"
            >
              <X size={28} />
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-4xl aspect-video rounded-2xl overflow-hidden bg-charcoal"
              onClick={(event) => event.stopPropagation()}
            >
              {/* TODO: replace with real VClick showreel footage */}
              <video
                className="w-full h-full"
                controls
                autoPlay
                playsInline
                src="/src/assets/video/showreel.mp4"
              >
                Your browser does not support embedded video.
              </video>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default VideoShowreel
