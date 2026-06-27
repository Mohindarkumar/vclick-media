import { motion } from 'framer-motion'
import { InstagramIcon, FacebookIcon, LinkedinIcon, YoutubeIcon } from '../common/BrandIcons'
import GoldDivider from '../common/GoldDivider'
import { services } from '../../data/services'
import { MapPin, Mail, Phone } from 'lucide-react'
import { animationVariants } from '../../hooks/useScrollReveal'

/**
 * Quick-link registry preserved for future restoration.
 * Rendered inside a hidden div below — no visual output, no dead links.
 */
const QUICK_LINKS = [
  { label: 'Home',         href: '#home' },
  { label: 'About',        href: '#about' },
  { label: 'Services',     href: '#services' },
  { label: 'Portfolio',    href: '#portfolio' },
  { label: 'Process',      href: '#process' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Pricing',      href: '#pricing' },
  { label: 'Contact',      href: '#contact' },
]

const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://www.instagram.com', icon: InstagramIcon },
  { label: 'Facebook',  href: 'https://www.facebook.com',  icon: FacebookIcon  },
  { label: 'LinkedIn',  href: 'https://www.linkedin.com',  icon: LinkedinIcon  },
  { label: 'YouTube',   href: 'https://www.youtube.com',   icon: YoutubeIcon   },
]

const CONTACT_ITEMS = [
  { icon: MapPin, text: 'Ajman Free Zone, United Arab Emirates', href: null },
  { icon: Mail,   text: 'hello@vclickmedia.ae', href: 'mailto:hello@vclickmedia.ae' },
  { icon: Phone,  text: '+971 50 000 0000',      href: 'tel:+97150000000' },
]

function Footer() {
  const year = new Date().getFullYear()
  const footerServices = services.slice(0, 8)

  return (
    <footer
      id="contact"
      className="bg-charcoal pt-16 pb-8"
    >
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">

          {/* ── Brand column ──────────────────────────────────────────────── */}
          <motion.div
            variants={animationVariants.fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <a href="#home" className="text-2xl font-extrabold gold-text-gradient tracking-tight">
              VClick
            </a>
            <p className="mt-4 text-sm text-mist leading-relaxed max-w-xs">
              Media & Events Management — turning high-stakes moments into cinematic,
              professionally documented experiences across the UAE.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3 mt-7">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full glass-surface flex items-center justify-center text-paper hover:text-gold hover:border-gold/50 transition-colors duration-300"
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* ── Contact column ────────────────────────────────────────────── */}
          <motion.div
            variants={animationVariants.fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <h3 className="text-sm font-semibold text-paper uppercase tracking-wide mb-5">
              Get In Touch
            </h3>
            <ul className="space-y-4 text-sm text-mist">
              {CONTACT_ITEMS.map(({ icon: Icon, text, href }) => (
                <li key={text} className="flex items-start gap-3">
                  <Icon size={15} className="text-gold mt-0.5 shrink-0" aria-hidden="true" />
                  {href ? (
                    <a href={href} className="hover:text-gold transition-colors duration-300 leading-snug">
                      {text}
                    </a>
                  ) : (
                    <span className="leading-snug">{text}</span>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* ── Preserved data (not rendered) — restore by moving out of hidden ── */}
        <div className="hidden" aria-hidden="true">
          <ul>
            {QUICK_LINKS.map((l) => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}
          </ul>
          <ul>
            {footerServices.map((s) => <li key={s.id}><a href="#services">{s.title}</a></li>)}
          </ul>
        </div>

        <GoldDivider className="my-10" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-mist">
          <p>© {year} VClick Media & Events. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-gold transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-gold transition-colors duration-300">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
