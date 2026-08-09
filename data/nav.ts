/**
 * Навигация. Внутренние ссылки ведут на реальные маршруты, а не на "#".
 * Источник — docs/CONTENT.md.
 */

export type NavLink = {
  readonly label: string
  readonly href: string
}

/** Якоря секций главной — используются шапкой и футером */
export const anchors = {
  about: 'about',
  directions: 'napravleniya',
  atmosphere: 'atmosfera',
  trainers: 'trenery',
  reviews: 'otzyvy',
  pricing: 'abonementy',
} as const

export const mainNav: readonly NavLink[] = [
  { label: 'О клубе', href: `#${anchors.about}` },
  { label: 'Направления', href: '/napravleniya' },
  { label: 'Атмосфера', href: '/galereya' },
  { label: 'Тренеры', href: '/trenery' },
  { label: 'Абонементы', href: '/abonementy' },
  { label: 'Контакты', href: '/kontakty' },
]

/** Кнопка в шапке ведёт к секции тарифов на главной */
export const headerCta: NavLink = {
  label: 'Купить абонемент',
  href: `/#${anchors.pricing}`,
}

export const footerNav: readonly { title: string; links: readonly NavLink[] }[] = [
  {
    title: 'Клуб',
    links: [
      { label: 'О клубе', href: `/#${anchors.about}` },
      { label: 'Направления', href: '/napravleniya' },
      { label: 'Тренеры', href: '/trenery' },
      { label: 'Расписание', href: '/raspisanie' },
      { label: 'Абонементы', href: '/abonementy' },
    ],
  },
  {
    title: 'Информация',
    links: [
      { label: 'Новости', href: '/novosti' },
      { label: 'Акции', href: '/akcii' },
      { label: 'Документы', href: '/dokumenty' },
      { label: 'Правила клуба', href: '/pravila' },
    ],
  },
]
