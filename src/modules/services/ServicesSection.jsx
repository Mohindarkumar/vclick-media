import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import SectionEyebrow from '../../components/common/SectionEyebrow'
import ServiceCard from './ServiceCard'
import { services } from '../../data/services'

const FEATURED_COUNT = 6

/**
 * Services section (build brief §6.4). Surfaces the top 6 services by
 * default and lets the visitor expand to see all 16 — avoids a 16-card
 * wall on first load while keeping every service one click away.
 */
function ServicesSection() {
  const [showAll, setShowAll] = useState(false)
  const featured = services.slice(0, FEATURED_COUNT)
  const rest = services.slice(FEATURED_COUNT)

  return (
    <section id="services" className="section-padding bg-charcoal">
      <div className="section-container">
        <div className="text-center max-w-2xl mx-auto">
          <SectionEyebrow>What We Do</SectionEyebrow>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-5 text-h2 font-extrabold text-paper"
          >
            Our Services
          </motion.h2>
          <p className="mt-4 text-body-lg text-mist">
            From a single product shoot to a multi-day exhibition, our full catalogue covers
            every form of media and event production.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        <AnimatePresence>
          {showAll && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden"
            >
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {rest.map((service, index) => (
                  <ServiceCard key={service.id} service={service} index={index} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-gold hover:text-amber transition-colors duration-300"
            aria-expanded={showAll}
          >
            {showAll ? 'Show Fewer Services' : `View All Services (${services.length})`}
            <motion.span animate={{ rotate: showAll ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <ChevronDown size={18} />
            </motion.span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
