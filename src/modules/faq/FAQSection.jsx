import { motion } from 'framer-motion'
import SectionEyebrow from '../../components/common/SectionEyebrow'
import Accordion from '../../components/ui/Accordion'
import { faqItems } from '../../data/faq'

/**
 * FAQ section (build brief §6.12).
 */
function FAQSection() {
  return (
    <section id="faq" className="section-padding bg-charcoal">
      <div className="section-container max-w-3xl">
        <div className="text-center max-w-2xl mx-auto">
          <SectionEyebrow>Questions</SectionEyebrow>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-5 text-h2 font-extrabold text-paper"
          >
            Frequently Asked Questions
          </motion.h2>
        </div>

        <div className="mt-14">
          <Accordion items={faqItems} />
        </div>
      </div>
    </section>
  )
}

export default FAQSection
