import { motion } from 'framer-motion'
import { MessageCircle, PhoneCall, Mail, MapPin, Clock } from 'lucide-react'
import SectionEyebrow from '../../components/common/SectionEyebrow'
import ContactForm from './ContactForm'
import MapEmbed from './MapEmbed'

// TODO: replace placeholder WhatsApp number, phone number, and email address
// once supplied by the client.
const WHATSAPP_NUMBER = '971500000000'
const PHONE_NUMBER = '+971500000000'
const EMAIL_ADDRESS = 'hello@vclickmedia.ae'

const QUICK_CONTACTS = [
  {
    label: 'WhatsApp',
    icon: MessageCircle,
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
  },
  {
    label: 'Call Us',
    icon: PhoneCall,
    href: `tel:${PHONE_NUMBER}`,
  },
  {
    label: 'Email',
    icon: Mail,
    href: `mailto:${EMAIL_ADDRESS}`,
  },
]

/**
 * Contact section (build brief §6.13). Two-column: form left, map +
 * company info + quick-contact buttons right.
 */
function ContactSection() {
  return (
    <section id="contact" className="section-padding bg-ink">
      <div className="section-container">
        <div className="text-center max-w-2xl mx-auto">
          <SectionEyebrow>Get In Touch</SectionEyebrow>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-5 text-h2 font-extrabold text-paper text-balance"
          >
            Let's Create Something Unforgettable
          </motion.h2>
        </div>

        <div className="mt-16 grid lg:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-surface rounded-3xl p-7 md:p-9"
          >
            <ContactForm />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            <MapEmbed />

            <div className="glass-surface rounded-2xl p-6 space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-gold mt-0.5 flex-shrink-0" />
                <p className="text-sm text-mist">Ajman Free Zone, United Arab Emirates</p>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={18} className="text-gold mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-mist">Sun – Thu, 9:00 AM – 7:00 PM</p>
                  {/* TODO: confirm real business hours with the client before launch */}
                  <p className="text-xs text-mist/60 mt-0.5">Placeholder hours — pending confirmation</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {QUICK_CONTACTS.map((contact) => {
                const Icon = contact.icon
                return (
                  <a
                    key={contact.label}
                    href={contact.href}
                    target={contact.label === 'WhatsApp' ? '_blank' : undefined}
                    rel={contact.label === 'WhatsApp' ? 'noopener noreferrer' : undefined}
                    className="glass-surface rounded-2xl flex flex-col items-center gap-2 py-5 text-paper hover:text-gold hover:border-gold/40 transition-colors duration-300"
                  >
                    <Icon size={20} />
                    <span className="text-xs font-medium">{contact.label}</span>
                  </a>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
