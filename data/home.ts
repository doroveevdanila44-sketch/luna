/**
 * Тексты главной страницы: hero, CTA-баннер, заголовки секций.
 * Ни одной строки текста в JSX — всё отсюда (CLAUDE.md, п.2).
 */

import { anchors } from './nav'

export const hero = {
  eyebrow: 'Фитнес-клуб Луна',
  titleLine1: 'Ты можешь',
  /** Вторая строка — зелёная */
  titleLine2: 'стать лучше',
  lead: 'Тренажёрный зал, групповые программы и персональные тренировки в самом современном клубе Северо-Востока.',
  primaryCta: { label: 'Купить абонемент', href: `#${anchors.pricing}` },
  secondaryCta: { label: 'Первое занятие бесплатно' },
  /** Столбик справа, как в макете */
  marks: ['Твоя сила', 'Твой ритм', 'Твой результат'],
  imageAlt: 'Тренажёрный зал клуба «Луна» с шестиугольными светильниками',
} as const

export const ctaBanner = {
  titleLine1: 'Луна благодарит сильных',
  titleLine2: 'не только мышцами,',
  /** Третья строка — зелёная */
  titleLine3: 'но и дисциплиной.',
  button: 'Начать сегодня',
  imageAlt: 'Гиря в виде луны',
} as const

export const sectionTitles = {
  /** Заголовок плашки преимуществ — визуально скрыт, нужен для порядка h1→h2→h3 */
  about: 'О клубе',
  directions: 'Наши направления',
  atmosphere: 'Атмосфера клуба',
  trainers: 'Наши тренеры',
  reviews: 'Отзывы',
  pricing: 'Абонементы',
} as const

export const sectionLinks = {
  directions: { label: 'Смотреть все направления', href: '/napravleniya' },
  atmosphere: { label: 'Смотреть галерею', href: '/galereya' },
  trainers: { label: 'Смотреть всех тренеров', href: '/trenery' },
  reviews: { label: 'Смотреть все отзывы' },
  pricing: { label: 'Все тарифы', href: '/abonementy' },
} as const

export const ui = {
  readMore: 'Читать полностью',
  collapse: 'Свернуть',
  trainerPhotoStub: 'Фото скоро появится',
  showAll: 'Смотреть все',
  copyright: '© 2026 Фитнес-клуб ЛУНА. Все права защищены.',
  privacy: { label: 'Политика конфиденциальности', href: '/politika-konfidencialnosti' },
  slogan: 'Твоя сила. Твой ритм. Твой результат.',
  // Содержит слово «ЛУНА» — оно видно на карте, доступное имя должно его включать
  mapAria: 'ЛУНА на карте — открыть карточку клуба в 2ГИС',
  menuOpen: 'Открыть меню',
  menuClose: 'Закрыть меню',
  contactsTitle: 'Контакты',
  comingSoonEyebrow: 'Скоро',
  backHome: 'На главную',
  callAria: 'Позвонить в клуб',
} as const
