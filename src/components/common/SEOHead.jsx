import { Helmet } from 'react-helmet-async'

const DEFAULT_TITLE =
  'VClick Media & Events | Premium Photography, Videography & Event Management in Ajman, UAE'
const DEFAULT_DESCRIPTION =
  'VClick Media & Events delivers cinematic photography, videography and full-service event production for corporate clients, weddings, exhibitions and brand activations across the UAE. Based in Ajman Free Zone.'
// TODO: replace with the real production domain + a real OG image asset once available
const SITE_URL = 'https://www.vclickmedia.ae'
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`

/**
 * Central SEO component: document title, meta description, Open Graph tags,
 * and JSON-LD structured data for LocalBusiness/Organization schema
 * (build brief §7). Mounted once near the top of HomePage.
 */
function SEOHead({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_OG_IMAGE,
  url = SITE_URL,
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'VClick Media & Events',
    image,
    url,
    // TODO: replace with real WhatsApp/phone number once supplied by the client
    telephone: '+971-50-000-0000',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Ajman Free Zone',
      addressLocality: 'Ajman',
      addressCountry: 'AE',
    },
    areaServed: 'United Arab Emirates',
    priceRange: 'AED',
    // TODO: replace placeholder social links with real VClick profiles
    sameAs: [
      'https://www.instagram.com/vclickmedia',
      'https://www.facebook.com/vclickmedia',
      'https://www.linkedin.com/company/vclickmedia',
      'https://www.youtube.com/@vclickmedia',
    ],
    description,
  }

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />

      {/* Twitter Card (complements OG, negligible cost to include) */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  )
}

export default SEOHead
