import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import SectionEyebrow from '../../components/common/SectionEyebrow'
import GoldDivider from '../../components/common/GoldDivider'
import Lightbox from '../../components/ui/Lightbox'
import PortfolioFilter from './PortfolioFilter'
import PortfolioGrid from './PortfolioGrid'
import { portfolioCategories, portfolioItems } from '../../data/portfolio'

/**
 * Portfolio section (build brief §6.6). Composes the filter bar, masonry
 * grid and lightbox, and owns the active-category / lightbox-index state.
 */
function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') return portfolioItems
    return portfolioItems.filter((item) => item.categories.includes(activeCategory))
  }, [activeCategory])

  const openLightbox = (item) => {
    const index = filteredItems.findIndex((current) => current.id === item.id)
    setLightboxIndex(index)
  }

  return (
    <section id="portfolio" className="section-padding bg-charcoal">
      <div className="section-container">
        <div className="text-center max-w-2xl mx-auto">
          <SectionEyebrow>Our Work</SectionEyebrow>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-5 text-h2 font-extrabold text-paper"
          >
            <span className="relative inline-block">
              Portfolio
              <GoldDivider variant="underline" className="absolute -bottom-1 left-0 w-full" />
            </span>
          </motion.h2>
        </div>

        <div className="mt-10">
          <PortfolioFilter
            categories={portfolioCategories}
            activeCategory={activeCategory}
            onChange={(category) => {
              setActiveCategory(category)
              setLightboxIndex(null)
            }}
          />
        </div>

        <div className="mt-10">
          <PortfolioGrid items={filteredItems} onItemClick={openLightbox} />
        </div>
      </div>

      <Lightbox
        items={filteredItems}
        activeIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </section>
  )
}

export default PortfolioSection
