import type { Metadata, Viewport } from 'next'
import { Onest, Unbounded } from 'next/font/google'

import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { LocalBusinessJsonLd } from '@/components/seo/LocalBusinessJsonLd'
import { contacts } from '@/data/contacts'
import { site } from '@/data/site'

import './globals.css'

// Unbounded нужен только заголовкам и лок-апу. Файл тяжёлый (кириллица +
// латиница), и при preload он отбирает канал у hero-фотографии — на мобильном
// это прямой минус к LCP. Грузим без preload, подмена гасится метриками
// системного фолбэка, которые next/font подставляет сам.
const unbounded = Unbounded({
  subsets: ['cyrillic', 'latin'],
  weight: ['700', '800'],
  variable: '--font-unbounded',
  display: 'swap',
  preload: false,
})

const onest = Onest({
  subsets: ['cyrillic', 'latin'],
  weight: ['400', '500', '600'],
  variable: '--font-onest',
  display: 'swap',
})

const title = `${contacts.name} — ${contacts.caption} в ${contacts.address.localityIn}`

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: `%s — ${contacts.caption} «${contacts.name}»`,
  },
  description: site.description,
  applicationName: contacts.name,
  keywords: [
    'фитнес-клуб',
    'тренажёрный зал',
    contacts.address.locality,
    'групповые занятия',
    'персональные тренировки',
    'абонемент',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: site.locale,
    url: site.url,
    siteName: `${contacts.caption} «${contacts.name}»`,
    title,
    description: site.description,
    images: [
      {
        url: site.ogImage,
        width: site.ogImageWidth,
        height: site.ogImageHeight,
        alt: title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: site.description,
    images: [site.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#0B0C0A',
  colorScheme: 'dark',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${unbounded.variable} ${onest.variable}`}>
      <body className="min-h-dvh bg-bg text-text antialiased">
        <Header />
        {/* Отступ под фиксированную шапку задаёт сама страница:
            hero уходит под прозрачную шапку, остальные — нет */}
        <main>{children}</main>
        <Footer />
        <LocalBusinessJsonLd siteUrl={site.url} />
      </body>
    </html>
  )
}
