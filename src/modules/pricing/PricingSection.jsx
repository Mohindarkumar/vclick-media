import { motion } from 'framer-motion'
import SectionEyebrow from '../../components/common/SectionEyebrow'
import GoldDivider from '../../components/common/GoldDivider'
import PricingCard from './PricingCard'
import { pricingPackages } from '../../data/pricing'

/**
 * Pricing section (build brief §6.11). Cards stack vertically on mobile;
 * the Most Popular card keeps its distinct gold treatment at every breakpoint.
 */
function PricingSection() {
  return (
    <section id="pricing" className="section-padding bg-ink">
      <div className="section-container">
        <GoldDivider className="mb-16 md:mb-20" />
        <div className="text-center max-w-2xl mx-auto">
          <SectionEyebrow>Packages</SectionEyebrow>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-5 text-h2 font-extrabold text-paper"
          >
            Pricing
          </motion.h2>
          <p className="mt-4 text-body-lg text-mist">
            Transparent starting points for every kind of project. Final scope and pricing are
            always confirmed together before booking.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-5 items-stretch">
          {pricingPackages.map((pkg, index) => (
            <PricingCard key={pkg.id} pkg={pkg} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default PricingSection
