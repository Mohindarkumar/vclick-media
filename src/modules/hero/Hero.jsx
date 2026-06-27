import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Phone, Camera, Video, Sparkles, Award } from 'lucide-react'
import Button from '../../components/common/Button'
import GoldDivider from '../../components/common/GoldDivider'
import ScrollIndicator from './ScrollIndicator'
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion'

const SERVICE_TAGS = [
  { icon: Camera, label: 'Photography' },
  { icon: Video, label: 'Videography' },
  { icon: Sparkles, label: 'Luxury Events' },
  { icon: Award, label: 'Media Production' },
]

const STATS = [
  { value: '500+', label: 'Events Delivered' },
  { value: '8+', label: 'Years Experience' },
  { value: '200+', label: 'Happy Clients' },
  { value: 'UAE', label: 'Based in Ajman' },
]

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } },
}

// Mask reveal: clip text sliding up from behind overflow:hidden wrapper
const maskReveal = {
  hidden: { y: '108%' },
  visible: { y: '0%', transition: { duration: 0.92, ease: [0.76, 0, 0.24, 1] } },
}

// Blur-to-sharp entrance for supporting elements
const blurIn = {
  hidden: { opacity: 0, filter: 'blur(10px)', y: 8 },
  visible: { opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } },
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.9, ease: 'easeOut' } },
}

function Hero() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const sectionRef = useRef(null)
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 })
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const [showScrollIndicator, setShowScrollIndicator] = useState(true)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  // Parallax: background moves slower than scroll (depth illusion)
  const bgParallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [0, 140]
  )
  // Content moves slightly upward on scroll (foreground depth)
  const contentParallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [0, 55]
  )
  // Overlay deepens as user scrolls (ensures readability at all positions)
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.65], [0.55, 0.88])

  useEffect(() => {
    setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches)
  }, [])

  useEffect(() => {
    const handleScroll = () => setShowScrollIndicator(window.scrollY < 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleMouseMove = (event) => {
    if (prefersReducedMotion || isTouchDevice || !sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    setGlowPosition({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    })
  }

  const showGlow = !prefersReducedMotion && !isTouchDevice

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative h-screen min-h-[700px] w-full overflow-hidden flex items-center"
    >
      {/* ── Camera background with parallax ───────────────────────────────── */}
      <motion.div
        style={{ y: bgParallaxY }}
        className="absolute inset-x-0 -top-[8%] h-[116%] will-change-transform"
      >
        <img
          src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=85&w=1920&auto=format&fit=crop"
          alt="Professional photographer at work"
          className="w-full h-full object-cover object-center"
          loading="eager"
          decoding="async"
        />
      </motion.div>

      {/* ── Multi-layer cinematic gradient overlay ─────────────────────────── */}
      {/* Layer 1: scroll-responsive overall darkening */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-black will-change-opacity"
        aria-hidden="true"
      />
      {/* Layer 2: persistent left-side vignette — keeps headline legible */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(100deg, rgba(11,11,11,0.85) 0%, rgba(11,11,11,0.55) 45%, rgba(11,11,11,0.2) 100%)' }}
        aria-hidden="true"
      />
      {/* Layer 3: bottom fade-to-ink for stats strip readability */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, #0B0B0B 0%, rgba(11,11,11,0.5) 28%, transparent 55%)' }}
        aria-hidden="true"
      />
      {/* Layer 4: subtle top vignette so navbar transition stays clean */}
      <div
        className="absolute inset-x-0 top-0 h-32"
        style={{ background: 'linear-gradient(to bottom, rgba(11,11,11,0.45), transparent)' }}
        aria-hidden="true"
      />

      {/* ── Ambient gold cursor glow ───────────────────────────────────────── */}
      {showGlow && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(500px circle at ${glowPosition.x}% ${glowPosition.y}%, rgba(212,175,55,0.14), rgba(255,183,3,0.06) 48%, transparent 72%)`,
            transition: 'background 0.4s ease',
          }}
          aria-hidden="true"
        />
      )}

      {/* ── Main content ───────────────────────────────────────────────────── */}
      <motion.div
        style={{ y: contentParallaxY }}
        className="relative z-10 section-container w-full will-change-transform"
      >
        <motion.div
          className="max-w-3xl"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Eyebrow label — mask reveal (motion.div participates in stagger) */}
          <motion.div variants={{ hidden: {}, visible: {} }} className="overflow-hidden mb-7">
            <motion.div variants={maskReveal} className="flex items-center gap-3">
              <span className="h-px w-8 bg-gold-sweep" aria-hidden="true" />
              <span className="eyebrow">Premium Media & Events · UAE</span>
            </motion.div>
          </motion.div>

          {/* Headline line 1 — mask reveal */}
          <motion.div variants={{ hidden: {}, visible: {} }} className="overflow-hidden pb-1">
            <motion.h1
              variants={maskReveal}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-display-1 font-extrabold text-paper leading-[1.06] tracking-tight"
            >
              Create{' '}
              <span className="relative inline-block whitespace-nowrap">
                Unforgettable
                <GoldDivider variant="underline" className="absolute -bottom-1 left-0 w-full" />
              </span>
            </motion.h1>
          </motion.div>

          {/* Headline line 2 — mask reveal */}
          <motion.div variants={{ hidden: {}, visible: {} }} className="overflow-hidden pb-2 mb-1">
            <motion.h1
              variants={maskReveal}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-display-1 font-extrabold text-paper leading-[1.06] tracking-tight"
            >
              Experiences
            </motion.h1>
          </motion.div>

          {/* Subtitle — blur-in */}
          <motion.p
            variants={blurIn}
            className="mt-7 text-body-lg text-mist/90 max-w-xl leading-relaxed"
          >
            VClick delivers cinematic photography, videography, and full-service
            event production for brands, weddings, and exhibitions across the UAE.
          </motion.p>

          {/* Service tag chips — blur-in */}
          <motion.div variants={blurIn} className="mt-6 flex flex-wrap gap-2">
            {SERVICE_TAGS.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-gold border border-gold/35 bg-gold/8 backdrop-blur-sm select-none"
                style={{ backgroundColor: 'rgba(212,175,55,0.08)' }}
              >
                <Icon size={13} strokeWidth={2.25} aria-hidden="true" />
                {label}
              </span>
            ))}
          </motion.div>

          {/* CTA buttons — blur-in */}
          <motion.div
            variants={blurIn}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Button as="a" href="#contact" variant="primary" icon={ArrowRight}>
              Get a Free Consultation
            </Button>
            <Button as="a" href="tel:+97150000000" variant="ghost" icon={Phone} iconPosition="left">
              Call Us Now
            </Button>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            variants={fadeIn}
            className="mt-14 pt-7 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-5 max-w-lg sm:max-w-2xl"
          >
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <p className="text-2xl sm:text-3xl font-extrabold gold-text-gradient leading-none">
                  {value}
                </p>
                <p className="text-[11px] text-mist/65 mt-1.5 uppercase tracking-wider">
                  {label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      <ScrollIndicator visible={showScrollIndicator} />
    </section>
  )
}

export default Hero
