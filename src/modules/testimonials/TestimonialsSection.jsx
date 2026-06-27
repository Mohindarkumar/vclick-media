import { motion } from 'framer-motion'
import SectionEyebrow from '../../components/common/SectionEyebrow'
import Carousel from '../../components/ui/Carousel'
import TestimonialCard from './TestimonialCard'
import { testimonials } from '../../data/testimonials'

/**
 * Testimonials section (build brief §6.9). Carousel of glass testimonial
 * cards with auto-advance, manual nav and touch swipe.
 */
function TestimonialsSection() {
  return (
    <section id="testimonials" className="section-padding bg-ink">
      <div className="section-container">
        <div className="text-center max-w-2xl mx-auto">
          <SectionEyebrow>Client Love</SectionEyebrow>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-5 text-h2 font-extrabold text-paper"
          >
            Testimonials
          </motion.h2>
        </div>

        <div className="mt-14">
          <Carousel
            items={testimonials}
            renderItem={(testimonial) => <TestimonialCard testimonial={testimonial} />}
          />
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
