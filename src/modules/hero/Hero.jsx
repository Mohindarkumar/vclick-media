import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, PlayCircle } from 'lucide-react'
import Button from '../../components/common/Button'
import GoldDivider from '../../components/common/GoldDivider'
import ScrollIndicator from './ScrollIndicator'
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion'

/**
 * Hero section (build brief §6.2). Sets the tone for the entire site —
 * fullscreen video background, cinematic gradient overlay, and the
 * cursor-following ambient gold glow that is exclusive to this section
 * (per §3.4, restraint matters — it does not appear anywhere else).
 */
function Hero() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const sectionRef = useRef(null)
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 })
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const [showScrollIndicator, setShowScrollIndicator] = useState(true)

  // Subtle parallax on the hero video background only (build brief §3.5 —
  // one of just two sections permitted scroll-parallax, alongside Showreel).
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const videoParallaxY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, 120])

  useEffect(() => {
    setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollIndicator(window.scrollY < 80)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleMouseMove = (event) => {
    if (prefersReducedMotion || isTouchDevice || !sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100
    setGlowPosition({ x, y })
  }

  const showGlow = !prefersReducedMotion && !isTouchDevice

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative h-screen min-h-[640px] w-full overflow-hidden flex items-center"
    >
      {/* Background video — TODO: replace with VClick showreel footage */}
      <motion.video
        style={{ y: videoParallaxY }}
        className="absolute inset-0 w-full h-[112%] object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1920&auto=format&fit=crop"
      >
        <source src="/src/assets/video/hero-bg.mp4" type="video/mp4" />
      </motion.video>

      {/* Cinematic dark gradient overlay so text stays legible over any footage */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black" />

      {/* Signature ambient gold cursor-glow — hero section only, desktop + motion-enabled only */}
      {showGlow && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-700"
          style={{
            background: `radial-gradient(420px circle at ${glowPosition.x}% ${glowPosition.y}%, rgba(212,175,55,0.18), rgba(255,183,3,0.08) 40%, transparent 70%)`,
          }}
          aria-hidden="true"
        />
      )}

      <div className="relative z-10 section-container w-full">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="h-px w-6 bg-gold-sweep" aria-hidden="true" />
            <span className="eyebrow">Premium Media & Events · UAE</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-display-1 font-extrabold text-paper text-balance"
          >
            Create{' '}
            <span className="relative inline-block">
              Unforgettable
              <GoldDivider variant="underline" className="absolute -bottom-1 left-0 w-full" />
            </span>{' '}
            Experiences
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-7 text-body-lg text-mist max-w-xl"
          >
            Premium Photography · Creative Videography · Luxury Events · Professional Media Production
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Button as="a" href="#contact" variant="primary" icon={ArrowRight}>
              Get a Free Consultation
            </Button>
            <Button as="a" href="#portfolio" variant="ghost" icon={PlayCircle} iconPosition="left">
              View Portfolio
            </Button>
          </motion.div>
        </div>
      </div>

      <ScrollIndicator visible={showScrollIndicator} />
    </section>
  )
}

export default Hero
