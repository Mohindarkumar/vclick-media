import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle2, User, Mail, Phone, MessageSquare } from 'lucide-react'
import Button from '../../components/common/Button'

const INITIAL_VALUES = { name: '', email: '', phone: '', message: '' }

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Contact form (build brief §6.13). Client-side validation, accessible
 * labels, clear error states. Submit handler is stubbed — wire to a real
 * backend/email service before going live.
 */
function ContactForm() {
  const [values, setValues] = useState(INITIAL_VALUES)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const validate = () => {
    const nextErrors = {}
    if (!values.name.trim()) nextErrors.name = 'Please enter your name.'
    if (!values.email.trim()) {
      nextErrors.email = 'Please enter your email.'
    } else if (!EMAIL_PATTERN.test(values.email)) {
      nextErrors.email = 'Please enter a valid email address.'
    }
    if (!values.phone.trim()) nextErrors.phone = 'Please enter your phone number.'
    if (!values.message.trim()) nextErrors.message = 'Tell us a little about your event.'
    return nextErrors
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setIsSubmitting(true)

    // TODO: connect to backend / email service (e.g. POST to an API route,
    // or a transactional email provider like SendGrid / Resend / Formspree).
    // Stubbed here with a simulated delay so the UX can be reviewed end-to-end.
    await new Promise((resolve) => setTimeout(resolve, 900))

    setIsSubmitting(false)
    setShowSuccess(true)
    setValues(INITIAL_VALUES)
    setTimeout(() => setShowSuccess(false), 5000)
  }

  const fields = [
    { name: 'name', label: 'Name', type: 'text', icon: User, placeholder: 'Your full name' },
    { name: 'email', label: 'Email', type: 'email', icon: Mail, placeholder: 'you@example.com' },
    { name: 'phone', label: 'Phone', type: 'tel', icon: Phone, placeholder: '+971 50 000 0000' },
  ]

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {fields.map((field) => {
        const Icon = field.icon
        const error = errors[field.name]
        return (
          <div key={field.name}>
            <label htmlFor={field.name} className="block text-sm font-medium text-paper mb-2">
              {field.label}
            </label>
            <div className="relative">
              <Icon size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-mist" />
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                value={values[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? `${field.name}-error` : undefined}
                className={`w-full bg-white/5 border rounded-xl pl-11 pr-4 py-3 text-sm text-paper placeholder:text-mist/60 focus:outline-none focus:ring-2 focus:ring-gold transition-colors duration-200 ${
                  error ? 'border-red-500/60' : 'border-white/10 focus:border-gold/50'
                }`}
              />
            </div>
            {error && (
              <p id={`${field.name}-error`} className="mt-1.5 text-xs text-red-400">
                {error}
              </p>
            )}
          </div>
        )
      })}

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-paper mb-2">
          Message
        </label>
        <div className="relative">
          <MessageSquare size={17} className="absolute left-4 top-4 text-mist" />
          <textarea
            id="message"
            name="message"
            rows={4}
            value={values.message}
            onChange={handleChange}
            placeholder="Tell us about your event — date, location, and what you have in mind."
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'message-error' : undefined}
            className={`w-full bg-white/5 border rounded-xl pl-11 pr-4 py-3 text-sm text-paper placeholder:text-mist/60 focus:outline-none focus:ring-2 focus:ring-gold resize-none transition-colors duration-200 ${
              errors.message ? 'border-red-500/60' : 'border-white/10 focus:border-gold/50'
            }`}
          />
        </div>
        {errors.message && (
          <p id="message-error" className="mt-1.5 text-xs text-red-400">
            {errors.message}
          </p>
        )}
      </div>

      <Button type="submit" variant="primary" icon={Send} disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Sending…' : 'Send Message'}
      </Button>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            role="status"
            className="flex items-center gap-2.5 bg-gold/10 border border-gold/30 text-gold text-sm rounded-xl px-4 py-3"
          >
            <CheckCircle2 size={18} />
            Thanks! Your message has been sent — we'll be in touch shortly.
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  )
}

export default ContactForm
