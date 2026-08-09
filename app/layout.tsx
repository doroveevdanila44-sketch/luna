import type { Metadata, Viewport } from 'next'
import { Onest, Unbounded } from 'next/font/google'

import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { contacts } from '@/data/contacts'

import './globals.css'

const unbounded = Unbounded({
  subsets: ['cyrillic', 'latin'],
  weight: ['600', '700', '800'],
  variable: '--font-unbounded',
  display: 'swap',
})

const onest = Onest({
  subsets: ['cyrillic', 'latin'],
  weight: ['400', '500', '600'],
  variable: '--font-onest',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: `${contacts.name} — ${contacts.caption} в ${contacts.address.locality}`,
    template: `%s — ${contacts.caption} «${contacts.name}»`,
  },
  description:
    'Тренажёрный зал, групповые программы и персональные тренировки в самом современном клубе Северо-Востока. Первое занятие бесплатно.',
  metadataBase: new URL('https://luna-gym.vercel.app'),
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
      </body>
    </html>
  )
}
