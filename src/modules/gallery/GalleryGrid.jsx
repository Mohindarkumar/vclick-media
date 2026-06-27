import { useState, useMemo, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, RefreshCw } from 'lucide-react'
import GalleryCard from './GalleryCard'
import Button from '../../components/common/Button'

const ITEMS_PER_PAGE = 12

/**
 * Gallery masonry grid.
 *
 * Layout strategy: CSS `columns` (not CSS grid) for a true masonry flow.
 * AnimatePresence is applied at the grid-container level (key on activeAlbum)
 * so the entire grid cross-fades on filter change instead of trying to
 * animate individual items across column re-flows — avoids layout thrashing.
 *
 * Pagination: "Load More" reveals the next ITEMS_PER_PAGE items.
 * Resetting visibleCount on filter change avoids showing a truncated filtered list.
 */
function GalleryGrid({ items, activeAlbum, onOpenLightbox }) {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE)

  // Reset visible count whenever the active album changes
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE)
  }, [activeAlbum])

  const handleLoadMore = useCallback(() => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE)
  }, [])

  const visibleItems = useMemo(() => items.slice(0, visibleCount), [items, visibleCount])
  const hasMore = visibleCount < items.length

  // ── Empty state ────────────────────────────────────────────────────────
  if (items.length === 0) {
    return (
      <motion.div
        key="empty"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-5 py-24 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/25 flex items-center justify-center">
          <Camera size={28} className="text-gold/60" aria-hidden="true" />
        </div>
        <div>
          <p className="text-paper/70 font-medium">No images in this album yet.</p>
          <p className="text-sm text-mist/50 mt-1">Check back soon — more work is on the way.</p>
        </div>
      </motion.div>
    )
  }

  return (
    <div>
      {/* Grid — key on activeAlbum triggers cross-fade on filter change */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeAlbum}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="columns-2 sm:columns-2 md:columns-3 xl:columns-4 gap-3 md:gap-4"
        >
          {visibleItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: Math.min(index * 0.04, 0.4),
                ease: [0.22, 1, 0.36, 1],
              }}
              className="break-inside-avoid mb-3 md:mb-4"
            >
              <GalleryCard item={item} onOpen={onOpenLightbox} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Load more */}
      {hasMore && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col items-center gap-3 mt-12"
        >
          <p className="text-sm text-mist/50">
            Showing {visibleItems.length} of {items.length}
          </p>
          <Button
            as="button"
            variant="ghost"
            icon={RefreshCw}
            iconPosition="left"
            onClick={handleLoadMore}
          >
            Load More
          </Button>
        </motion.div>
      )}

      {/* End of results */}
      {!hasMore && items.length > ITEMS_PER_PAGE && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-xs text-mist/35 mt-10 uppercase tracking-wider"
        >
          — End of gallery —
        </motion.p>
      )}
    </div>
  )
}

export default GalleryGrid
