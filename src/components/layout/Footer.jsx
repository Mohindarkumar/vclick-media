import { InstagramIcon, FacebookIcon, LinkedinIcon, YoutubeIcon } from '../common/BrandIcons'
import GoldDivider from '../common/GoldDivider'
import { services } from '../../data/services'

const QUICK_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Process', href: '#process' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
]

const SOCIAL_LINKS = [
  // TODO: replace with real VClick social profile URLs once supplied
  { label: 'Instagram', href: 'https://www.instagram.com', icon: InstagramIcon },
  { label: 'Facebook', href: 'https://www.facebook.com', icon: FacebookIcon },
  { label: 'LinkedIn', href: 'https://www.linkedin.com', icon: LinkedinIcon },
  { label: 'YouTube', href: 'https://www.youtube.com', icon: YoutubeIcon },
]

function Footer() {
  const year = new Date().getFullYear()
  const footerServices = services.slice(0, 8)

  return (
    <footer className="bg-charcoal pt-20 pb-8">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo + tagline */}
          <div className="md:col-span-1">
            <a href="#home" className="text-2xl font-extrabold gold-text-gradient tracking-tight">
              VClick
            </a>
            <p className="mt-4 text-sm text-mist leading-relaxed">
              Media & Events Management. Turning high-stakes moments into cinematic,
              professionally documented experiences across the UAE.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full glass-surface flex items-center justify-center text-paper hover:text-gold hover:border-gold/50 transition-colors duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold text-paper uppercase tracking-wide mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-mist hover:text-gold transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-paper uppercase tracking-wide mb-5">
              Services
            </h3>
            <ul className="space-y-3">
              {footerServices.map((service) => (
                <li key={service.id}>
                  <a
                    href="#services"
                    className="text-sm text-mist hover:text-gold transition-colors duration-300"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact snapshot */}
          <div>
            <h3 className="text-sm font-semibold text-paper uppercase tracking-wide mb-5">
              Get In Touch
            </h3>
            <ul className="space-y-3 text-sm text-mist">
              <li>Ajman Free Zone, United Arab Emirates</li>
              {/* TODO: replace with real phone/email/WhatsApp once supplied by the client */}
              <li>
                <a href="mailto:hello@vclickmedia.ae" className="hover:text-gold transition-colors duration-300">
                  hello@vclickmedia.ae
                </a>
              </li>
              <li>
                <a href="tel:+97150000000" className="hover:text-gold transition-colors duration-300">
                  +971 50 000 0000
                </a>
              </li>
            </ul>
          </div>
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
