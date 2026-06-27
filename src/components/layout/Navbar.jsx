import { useEffect, useState } from 'react'
import logo from '../../assets/images/logos/Logo_transparennt.png'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Button from '../common/Button'

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Process', href: '#process' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
]

/**
 * Sticky, glassmorphic navbar (build brief §6.1).
 * Transparent over the hero; transitions to a blurred ink surface on scroll.
 * Mobile collapses to a hamburger that opens a full-screen glass overlay menu.
 */
function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll while the mobile overlay menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const handleLinkClick = () => setIsMobileMenuOpen(false)

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-ink/80 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <nav
        className="section-container flex items-center justify-between py-4 md:py-5"
        aria-label="Primary"
      >
        <a href="#home" className="flex-shrink-0">
          <img src={logo} alt="VClick" className="h-10 w-auto" />
        </a>

        <ul className="hidden xl:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-paper/90 hover:text-gold transition-colors duration-300 whitespace-nowrap"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden xl:block flex-shrink-0">
          <Button as="a" href="#contact" variant="primary">
            Get a Free Consultation
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(true)}
          className="xl:hidden text-paper p-2 -mr-2"
          aria-label="Open menu"
          aria-expanded={isMobileMenuOpen}
        >
          <Menu size={26} />
        </button>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-ink/95 backdrop-blur-xl xl:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="flex justify-end section-container py-4">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-paper p-2"
                aria-label="Close menu"
              >
                <X size={28} />
              </button>
            </div>

            <motion.ul
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.06 } },
              }}
              className="flex flex-col items-center gap-7 mt-8"
            >
              {NAV_LINKS.map((link) => (
                <motion.li
                  key={link.href}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <a
                    href={link.href}
                    onClick={handleLinkClick}
                    className="text-2xl font-semibold text-paper hover:text-gold transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
                className="mt-4"
              >
                <Button as="a" href="#contact" variant="primary" onClick={handleLinkClick}>
                  Get a Free Consultation
                </Button>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
