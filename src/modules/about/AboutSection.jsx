import { motion } from 'framer-motion'
import { Target, Eye, Clock, Users } from 'lucide-react'
import SectionEyebrow from '../../components/common/SectionEyebrow'
import GoldDivider from '../../components/common/GoldDivider'

const PILLARS = [
  {
    icon: Target,
    label: 'Mission',
    copy: 'To document every milestone our clients trust us with as a cinematic, lasting memory.',
  },
  {
    icon: Eye,
    label: 'Vision',
    copy: "To be the UAE's most trusted name in creative media and event production.",
  },
  {
    icon: Clock,
    label: 'Years of Experience',
    copy: 'A decade-deep team that has covered everything from intimate weddings to national expos.',
  },
  {
    icon: Users,
    label: 'Professional Team',
    copy: 'Photographers, editors, drone pilots and planners working as one coordinated crew.',
  },
]

// TODO: replace every image below with real VClick brand photography
const COLLAGE_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=700&auto=format&fit=crop',
    alt: 'Photographer directing a shoot on location in the UAE',
    className: 'absolute top-0 left-0 w-3/5 rotate-[-3deg] z-20',
  },
  {
    src: 'https://images.unsplash.com/photo-1556745757-8d76bdb6984b?q=80&w=700&auto=format&fit=crop',
    alt: 'Cinematic event lighting setup at a corporate venue',
    className: 'absolute top-16 right-0 w-1/2 rotate-[4deg] z-10',
  },
  {
    src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=700&auto=format&fit=crop',
    alt: 'Wedding videography crew capturing a couple at golden hour',
    className: 'absolute bottom-0 left-10 w-2/3 rotate-[2deg] z-0',
  },
]

/**
 * About / Who We Are section (build brief §6.3).
 * Asymmetric overlapping image collage rather than a uniform grid, per
 * §3.3's instruction to avoid grid-monotony in this section specifically.
 */
function AboutSection() {
  return (
    <section id="about" className="pt-8 md:pt-10 pb-20 md:pb-28 lg:pb-section bg-ink overflow-hidden">
      <GoldDivider className="mb-10 md:mb-14" />
      <div className="section-container grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <SectionEyebrow align="left">Who We Are</SectionEyebrow>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-5 text-3xl md:text-4xl lg:text-h2 font-extrabold text-paper text-balance"
          >
            Who We Are
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-body-lg text-mist max-w-xl"
          >
            VClick Media & Events is a UAE-based creative production house headquartered in
            Ajman Free Zone. We specialize in high-end photography, videography and full-service
            event management — covering weddings, corporate conferences, exhibitions, brand
            activations and product launches across all seven Emirates. Every project is treated
            as a story worth telling well, backed by a crew that brings cinematic standards to
            every brief, big or small.
          </motion.p>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {PILLARS.map((pillar, index) => {
              const Icon = pillar.icon
              return (
                <motion.div
                  key={pillar.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold">
                    <Icon size={20} strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-paper">{pillar.label}</h3>
                    <p className="mt-1 text-sm text-mist leading-relaxed">{pillar.copy}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Mobile: clean stacked image grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-2 gap-3 lg:hidden"
        >
          <img
            src={COLLAGE_IMAGES[0].src}
            alt={COLLAGE_IMAGES[0].alt}
            loading="lazy"
            className="w-full rounded-2xl object-cover aspect-[3/4] col-span-1 row-span-2"
          />
          <img
            src={COLLAGE_IMAGES[1].src}
            alt={COLLAGE_IMAGES[1].alt}
            loading="lazy"
            className="w-full rounded-2xl object-cover aspect-[4/3]"
          />
          <img
            src={COLLAGE_IMAGES[2].src}
            alt={COLLAGE_IMAGES[2].alt}
            loading="lazy"
            className="w-full rounded-2xl object-cover aspect-[4/3]"
          />
        </motion.div>

        {/* Desktop: asymmetric overlapping collage */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative h-[520px] w-full hidden lg:block"
        >
          {COLLAGE_IMAGES.map((img) => (
            <img
              key={img.src}
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className={`${img.className} rounded-3xl shadow-2xl shadow-black/60 border border-white/10 object-cover aspect-[4/3]`}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSection
