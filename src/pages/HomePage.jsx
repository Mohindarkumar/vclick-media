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
 * Single-page scrolling layout (build brief §5). Composes every module in
 * the exact top-to-bottom order specified in §6.
 */
function HomePage() {
  return (
    <>
      <SEOHead />
      <Navbar />
      <main className="bg-ink text-paper">
        <Hero />
        <AboutSection />
        <ServicesSection />
        <WhyChooseUs />
        <PortfolioSection />
        <VideoShowreel />
        <EventProcess />
        <TestimonialsSection />
        <ClientsLogoStrip />
        <PricingSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}

export default HomePage
