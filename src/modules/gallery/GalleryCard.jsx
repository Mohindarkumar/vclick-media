import { useState } from 'react'
import { motion } from 'framer-motion'
import { Expand, AlertCircle } from 'lucide-react'

const ASPECT = {
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
  square: 'aspect-square',
}

/**
 * Individual gallery card with:
 * - Native lazy loading via loading="lazy"
 * - Skeleton shimmer while image loads
 * - Error state if image fails to load
 * - Hover overlay with title + expand icon
 * - data-cursor="image" attribute for custom cursor integration
 */
function GalleryCard({ item, onOpen }) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  const aspectClass = ASPECT[item.orientation] || ASPECT.landscape

  return (
    <motion.button
      type="button"
      onClick={() => !error && onOpen(item)}
      whileHover={error ? {} : { scale: 1.015 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      data-cursor="image"
      className={`
        group relative w-full overflow-hidden rounded-2xl text-left block
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink
        ${error ? 'cursor-default' : 'cursor-pointer'}
        ${aspectClass}
      `}
      aria-label={`View ${item.title}`}
    >
      {/* ── Skeleton shimmer ──────────────────────────────────────────── */}
      {!loaded && !error && (
        <div className="absolute inset-0 gallery-skeleton rounded-2xl" aria-hidden="true" />
      )}

      {/* ── Error state ───────────────────────────────────────────────── */}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-charcoal rounded-2xl">
          <AlertCircle size={28} className="text-mist/30" aria-hidden="true" />
          <p className="text-xs text-mist/40">Image unavailable</p>
        </div>
      )}

      {/* ── Image — blur-to-sharp on load ────────────────────────────── */}
      {!error && (
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105"
          style={{
            opacity: loaded ? 1 : 0,
            filter: loaded ? 'blur(0px)' : 'blur(10px)',
            transition: 'opacity 0.35s ease, filter 0.7s ease, transform 0.5s ease-out',
          }}
          onLoad={() => setLoaded(true)}
          onError={() => { setError(true); setLoaded(true) }}
        />
      )}

      {/* ── Hover overlay ─────────────────────────────────────────────── */}
      {!error && (
        <>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-350" />

          <div className="absolute inset-0 flex flex-col justify-end p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-350">
            <div className="flex items-end justify-between gap-2">
              <div>
                <span className="inline-flex items-center gap-1.5 text-gold text-[11px] font-semibold uppercase tracking-wider mb-1.5">
                  <Expand size={12} strokeWidth={2.5} aria-hidden="true" />
                  View Full
                </span>
                <p className="text-paper text-sm font-semibold leading-snug line-clamp-2">
                  {item.title}
                </p>
              </div>
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center">
                <Expand size={14} className="text-gold" aria-hidden="true" />
              </span>
            </div>

            <div className="mt-2 flex items-center gap-1.5">
              <span className="h-px w-4 bg-gold-sweep" aria-hidden="true" />
              <span className="text-[10px] text-gold/70 uppercase tracking-wider">{item.album}</span>
            </div>
          </div>
        </>
      )}
    </motion.button>
  )
}

export default GalleryCard
