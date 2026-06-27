import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronRight, Image } from 'lucide-react'
import GoldDivider from '../../components/common/GoldDivider'

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

/**
 * Compact page hero for the Gallery route (/gallery).
 * Keeps brand consistency without competing with the masonry grid below.
 */
function GalleryHero({ totalCount }) {
  return (
    <section className="relative pt-32 pb-14 md:pt-40 md:pb-16 bg-ink overflow-hidden">
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle at 25% 50%, #D4AF37 0%, transparent 60%), radial-gradient(circle at 75% 50%, #FFB703 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />

      <div className="section-container relative z-10">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          aria-label="Breadcrumb"
          className="mb-8"
        >
          <ol className="flex items-center gap-1.5 text-xs text-mist/60">
            <li>
              <Link to="/" className="hover:text-gold transition-colors duration-200">
                Home
              </Link>
            </li>
            <li aria-hidden="true"><ChevronRight size={12} /></li>
            <li className="text-gold font-medium">Gallery</li>
          </ol>
        </motion.nav>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          {/* Eyebrow */}
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-5">
            <span className="h-px w-7 bg-gold-sweep" aria-hidden="true" />
            <span className="eyebrow">VClick Portfolio</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="text-h1 md:text-display-2 font-extrabold text-paper leading-[1.06] tracking-tight"
          >
            Our{' '}
            <span className="relative inline-block">
              Gallery
              <GoldDivider variant="underline" className="absolute -bottom-1 left-0 w-full" />
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p variants={fadeUp} className="mt-6 text-body-lg text-mist/80 leading-relaxed max-w-xl">
            A curated collection of our finest work — spanning weddings, corporate events,
            fashion editorials, drone photography, and more.
          </motion.p>

          {/* Count badge */}
          {totalCount > 0 && (
            <motion.div variants={fadeUp} className="mt-6 flex items-center gap-2">
              <Image size={15} className="text-gold" aria-hidden="true" />
              <span className="text-sm text-mist/70">
                <span className="text-gold font-semibold">{totalCount}</span> images in collection
              </span>
            </motion.div>
          )}
        </motion.div>
      </div>

      <GoldDivider className="mt-12 md:mt-16" />
    </section>
  )
}

export default GalleryHero
