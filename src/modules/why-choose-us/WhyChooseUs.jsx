import { motion } from 'framer-motion'
import {
  Palette,
  Camera,
  Wand2,
  Zap,
  Wallet,
  Settings2,
  UserCog,
  Award,
  SmilePlus,
  Headset,
} from 'lucide-react'
import SectionEyebrow from '../../components/common/SectionEyebrow'
import StatBlock from './StatBlock'

const REASONS = [
  { icon: Palette, label: 'Creative Team' },
  { icon: Camera, label: 'Latest Equipment' },
  { icon: Wand2, label: 'Professional Editing' },
  { icon: Zap, label: 'Fast Delivery' },
  { icon: Wallet, label: 'Affordable Packages' },
  { icon: Settings2, label: 'Customized Solutions' },
  { icon: UserCog, label: 'Experienced Event Managers' },
  { icon: Award, label: 'High Quality Output' },
  { icon: SmilePlus, label: 'Customer Satisfaction' },
  { icon: Headset, label: '24/7 Support' },
]

const STATS = [
  { target: 500, suffix: '+', label: 'Events Completed' },
  { target: 1000, suffix: '+', label: 'Happy Clients' },
  { target: 50, suffix: '+', label: 'Corporate Partners' },
  { target: 10, suffix: '+', label: 'Years Experience' },
]

/**
 * Why Choose Us section (build brief §6.5). Icon-led reason grid plus
 * scroll-triggered animated stat counters.
 */
function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="section-padding bg-ink">
      <div className="section-container">
        <div className="text-center max-w-2xl mx-auto">
          <SectionEyebrow>Why VClick</SectionEyebrow>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-5 text-h2 font-extrabold text-paper"
          >
            Why Choose Us
          </motion.h2>
        </div>

        <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {REASONS.map((reason, index) => {
            const Icon = reason.icon
            return (
              <motion.div
                key={reason.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: (index % 5) * 0.07 }}
                className="flex flex-col items-center text-center gap-3 p-5 rounded-2xl hover:bg-white/5 transition-colors duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold">
                  <Icon size={22} strokeWidth={2} />
                </div>
                <p className="text-sm font-medium text-paper">{reason.label}</p>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-20 glass-surface rounded-3xl py-12 px-6 grid grid-cols-2 md:grid-cols-4 gap-10">
          {STATS.map((stat) => (
            <StatBlock key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
