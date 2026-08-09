/**
 * Настройки сайта, не относящиеся к контенту клуба.
 * После привязки домена меняется только siteUrl.
 */
export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://luna-gym.vercel.app',
  locale: 'ru_RU',
  ogImage: '/images/hero.jpg',
  ogImageWidth: 1983,
  ogImageHeight: 793,
  description:
    'Тренажёрный зал, групповые программы и персональные тренировки в самом современном клубе Северо-Востока. Первое занятие бесплатно.',
} as const
