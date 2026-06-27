import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

/**
 * Single service card: icon, representative image, title, one-line
 * description, "Learn More" link. Glass surface with gold border-glow +
 * lift on hover (build brief §6.4).
 */
function ServiceCard({ service, index }) {
  const Icon = service.icon

  return (
    <motion.a
      href="#contact"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
      whileHover={{ scale: 1.03, y: -4 }}
      className="group glass-surface rounded-2xl overflow-hidden flex flex-col hover:border-gold/50 hover:shadow-gold transition-shadow duration-300"
    >
      <div className="relative h-40 overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent" />
        <div className="absolute bottom-3 left-4 w-10 h-10 rounded-xl bg-ink/70 backdrop-blur-md border border-gold/30 flex items-center justify-center text-gold">
          <Icon size={18} strokeWidth={2} />
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-base font-semibold text-paper">{service.title}</h3>
        <p className="mt-2 text-sm text-mist leading-relaxed flex-1">{service.description}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-gold group-hover:text-amber transition-colors duration-300">
          Learn More
          <ArrowUpRight size={15} />
        </span>
      </div>
    </motion.a>
  )
}

export default ServiceCard
