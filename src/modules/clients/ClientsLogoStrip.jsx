import { motion } from 'framer-motion'
import { Building } from 'lucide-react'
import SectionEyebrow from '../../components/common/SectionEyebrow'
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion'
import { clientLogos } from '../../data/clients'

/**
 * Clients section (build brief §6.10). Infinite horizontal auto-scrolling
 * strip of placeholder logo blocks — duplicated once so the marquee loops
 * seamlessly. Monochrome by default, gold-tinted on hover.
 */
function ClientsLogoStrip() {
  const prefersReducedMotion = usePrefersReducedMotion()
  // Duplicate the list so the CSS marquee (-50% translateX) loops seamlessly
  const loopedLogos = [...clientLogos, ...clientLogos]

  return (
    <section id="clients" className="section-padding bg-charcoal">
      <div className="section-container text-center">
        <SectionEyebrow>Trusted By</SectionEyebrow>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-5 text-h2 font-extrabold text-paper"
        >
          Our Clients
        </motion.h2>
      </div>

      <div className="mt-14 relative overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-charcoal to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-charcoal to-transparent z-10" />

        <div
          className={`flex items-center gap-12 w-max ${prefersReducedMotion ? '' : 'animate-marquee'}`}
        >
          {loopedLogos.map((client, index) => (
            <div
              key={`${client.id}-${index}`}
              className="flex items-center gap-2.5 px-6 py-4 rounded-xl grayscale opacity-60 hover:grayscale-0 hover:opacity-100 hover:text-gold transition-all duration-300 text-mist whitespace-nowrap"
              // TODO: replace placeholder labeled block with real client/corporate partner logo asset
            >
              <Building size={20} strokeWidth={2} />
              <span className="text-sm font-medium">{client.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ClientsLogoStrip
