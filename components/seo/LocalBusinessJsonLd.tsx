import { contacts } from '@/data/contacts'
import { priceList } from '@/data/pricing'

type Props = {
  siteUrl: string
}

/**
 * Разметка LocalBusiness: адрес, телефон, координаты, часы, рейтинг.
 * Данные берутся из /data/contacts.ts — второго источника правды не заводим.
 */
export function LocalBusinessJsonLd({ siteUrl }: Props) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'HealthAndBeautyBusiness',
    additionalType: 'https://schema.org/ExerciseGym',
    '@id': `${siteUrl}/#business`,
    name: `${contacts.caption} «${contacts.name}»`,
    alternateName: contacts.name,
    url: siteUrl,
    telephone: contacts.phone.display,
    image: `${siteUrl}/images/hero.jpg`,
    priceRange: '₽₽',
    currenciesAccepted: 'RUB',
    paymentAccepted: 'Наличные, банковская карта, QR-код, банковский перевод',
    address: {
      '@type': 'PostalAddress',
      streetAddress: contacts.address.street,
      addressLocality: contacts.address.locality,
      addressRegion: 'Камчатский край',
      postalCode: contacts.address.postalCode,
      addressCountry: 'RU',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: contacts.geo.lat,
      longitude: contacts.geo.lon,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: contacts.hoursMachine.opens,
        closes: contacts.hoursMachine.closes,
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: contacts.rating.value,
      reviewCount: contacts.rating.reviewCount,
      ratingCount: contacts.rating.ratingCount,
      bestRating: 5,
      worstRating: 1,
    },
    sameAs: [contacts.maps2gis, ...contacts.socials.map((s) => s.href)],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Абонементы',
      itemListElement: priceList.map((row) => ({
        '@type': 'Offer',
        name: row.title,
        price: row.price,
        priceCurrency: 'RUB',
      })),
    },
  }

  return (
    <script
      type="application/ld+json"
      // Данные наши, не пользовательские — подстановка безопасна
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
