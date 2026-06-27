import SEOHead from '../components/common/SEOHead'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Hero from '../modules/hero/Hero'
import AboutSection from '../modules/about/AboutSection'
import ServicesSection from '../modules/services/ServicesSection'
import WhyChooseUs from '../modules/why-choose-us/WhyChooseUs'
import PortfolioSection from '../modules/portfolio/PortfolioSection'
import VideoShowreel from '../modules/showreel/VideoShowreel'
import EventProcess from '../modules/process/EventProcess'
import TestimonialsSection from '../modules/testimonials/TestimonialsSection'
import ClientsLogoStrip from '../modules/clients/ClientsLogoStrip'
import PricingSection from '../modules/pricing/PricingSection'
import FAQSection from '../modules/faq/FAQSection'
import ContactSection from '../modules/contact/ContactSection'

/**
 * Feature flags — flip any value to true to restore that section instantly.
 * All component imports and routes are preserved above regardless of these flags.
 */
const SECTIONS = {
  about:        true,
  services:     true,
  whyChooseUs:  false,
  portfolio:    true,
  showreel:     false,
  process:      false,
  testimonials: false,
  clients:      false,
  pricing:      false,
  faq:          false,
  contact:      true,
}

function HomePage() {
  return (
    <>
      <SEOHead />
      <Navbar />
      <main className="bg-ink text-paper">
        <Hero />
        {SECTIONS.about        && <AboutSection />}
        {SECTIONS.services     && <ServicesSection />}
        {SECTIONS.whyChooseUs  && <WhyChooseUs />}
        {SECTIONS.portfolio    && <PortfolioSection />}
        {SECTIONS.showreel     && <VideoShowreel />}
        {SECTIONS.process      && <EventProcess />}
        {SECTIONS.testimonials && <TestimonialsSection />}
        {SECTIONS.clients      && <ClientsLogoStrip />}
        {SECTIONS.pricing      && <PricingSection />}
        {SECTIONS.faq          && <FAQSection />}
        {SECTIONS.contact      && <ContactSection />}
      </main>
      <Footer />
    </>
  )
}

export default HomePage
