import { useRef } from 'react'
import { motion } from 'framer-motion'

/**
 * Horizontally-scrollable album filter bar.
 * - Active album: solid gold gradient pill
 * - Inactive: glassmorphic ghost pill with hover gold underline
 * - Shows item count badge per album
 * - Smooth horizontal scroll on mobile (touch + mouse wheel)
 */
function GalleryFilter({ albums, counts, activeAlbum, onChange }) {
  const scrollRef = useRef(null)

  // Allow horizontal scroll with mouse wheel on desktop
  const handleWheel = (event) => {
    if (!scrollRef.current) return
    event.preventDefault()
    scrollRef.current.scrollLeft += event.deltaY
  }

  return (
    <div
      ref={scrollRef}
      onWheel={handleWheel}
      className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-hide"
      role="group"
      aria-label="Filter gallery by album"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {albums.map((album) => {
        const isActive = album === activeAlbum
        const count = counts[album] ?? 0

        return (
          <motion.button
            key={album}
            type="button"
            onClick={() => onChange(album)}
            whileTap={{ scale: 0.95 }}
            aria-pressed={isActive}
            className={`
              relative flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium
              transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold
              ${isActive
                ? 'bg-gold-sweep text-ink'
                : 'glass-surface text-mist hover:text-paper hover:border-gold/40'
              }
            `}
          >
            <span>{album}</span>
            {count > 0 && (
              <span
                className={`
                  text-[11px] font-semibold rounded-full px-1.5 py-0.5 min-w-[20px] text-center leading-none
                  ${isActive ? 'bg-black/20 text-ink/70' : 'bg-white/10 text-mist/70'}
                `}
              >
                {count}
              </span>
            )}
          </motion.button>
        )
      })}
    </div>
  )
}

export default GalleryFilter
