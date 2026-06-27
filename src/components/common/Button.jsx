import { motion } from 'framer-motion'

/**
 * Shared button used for every CTA across the site.
 * variant "primary"   -> solid gold-to-amber gradient fill (main CTAs)
 * variant "ghost"      -> transparent with gold border (secondary CTAs)
 * variant "text"       -> no background/border, used inline (e.g. "Learn More")
 */
function Button({
  children,
  variant = 'primary',
  as = 'button',
  href,
  icon: Icon,
  iconPosition = 'right',
  className = '',
  ...props
}) {
  const variants = {
    primary:
      'bg-gold-sweep text-ink shadow-gold hover:shadow-gold-lg hover:brightness-110',
    ghost:
      'bg-transparent text-paper border border-gold/60 hover:bg-gold/10 hover:border-gold',
    text: 'bg-transparent text-gold hover:text-amber px-0 py-0 gap-1.5',
  }

  const Component = as === 'a' ? motion.a : motion.button
  const baseClasses = variant === 'text' ? 'inline-flex items-center font-medium text-sm transition-colors duration-300' : 'btn-base'

  return (
    <Component
      href={as === 'a' ? href : undefined}
      whileHover={{ scale: variant === 'text' ? 1 : 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon size={18} strokeWidth={2.25} />}
      {children}
      {Icon && iconPosition === 'right' && <Icon size={18} strokeWidth={2.25} />}
    </Component>
  )
}

export default Button
