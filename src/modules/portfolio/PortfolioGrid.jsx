import { motion, AnimatePresence } from 'framer-motion'
import { Expand } from 'lucide-react'

/**
 * Masonry grid (CSS grid + varying row-spans) of portfolio images,
 * filtered by active category. Filtering animates with AnimatePresence
 * (fade + slight scale) rather than a jarring re-layout (build brief §6.6).
 */
function PortfolioGrid({ items, onItemClick }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[180px] md:auto-rows-[220px] gap-4 md:gap-5">
      <AnimatePresence mode="popLayout">
        {items.map((item) => (
          <motion.button
            key={item.id}
            type="button"
            onClick={() => onItemClick(item)}
            layout
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.35 }}
            whileHover={{ scale: 1.02 }}
            className={`group relative overflow-hidden rounded-2xl text-left focus-visible:ring-2 focus-visible:ring-gold ${item.span}`}
          >
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
            <div className="absolute inset-0 flex flex-col justify-end p-4">
              <span className="inline-flex items-center gap-1.5 text-gold text-xs font-semibold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                <Expand size={14} /> View
              </span>
              <p className="text-paper text-sm font-medium mt-1">{item.title}</p>
            </div>
          </motion.button>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default PortfolioGrid
