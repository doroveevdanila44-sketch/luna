/**
 * Маршруты-заглушки. Пока рендерят <ComingSoon /> с шапкой и футером,
 * дальше каждый превращается в полноценную страницу — файл маршрута уже есть.
 */

export type StubPage = {
  readonly slug: string
  readonly title: string
  readonly text: string
}

export const stubPages = {
  napravleniya: {
    slug: 'napravleniya',
    title: 'Направления',
    text: 'Собираем описания программ, расписание групповых занятий и подбор нагрузки. Пока задай вопрос по телефону — расскажем, что подойдёт именно тебе.',
  },
  trenery: {
    slug: 'trenery',
    title: 'Тренеры',
    text: 'Готовим страницы тренеров с фотографиями, специализацией и записью на персональную тренировку.',
  },
  abonementy: {
    slug: 'abonementy',
    title: 'Абонементы',
    text: 'Здесь появится полный прайс с онлайн-покупкой и продлением. Актуальные цены — ниже, а купить абонемент можно на ресепшене.',
  },
  galereya: {
    slug: 'galereya',
    title: 'Галерея',
    text: 'Снимаем зал целиком: тренажёры, раздевалки, зону групповых занятий. Скоро выложим всё.',
  },
  kontakty: {
    slug: 'kontakty',
    title: 'Контакты',
    text: 'Схема проезда, парковка и форма обратной связи будут здесь. Телефон и адрес работают уже сейчас.',
  },
  raspisanie: {
    slug: 'raspisanie',
    title: 'Расписание',
    text: 'Таблица групповых занятий по дням недели готовится. Актуальное расписание уточняй по телефону.',
  },
  novosti: {
    slug: 'novosti',
    title: 'Новости',
    text: 'Раздел в работе.',
  },
  akcii: {
    slug: 'akcii',
    title: 'Акции',
    text: 'Раздел в работе.',
  },
  dokumenty: {
    slug: 'dokumenty',
    title: 'Документы',
    text: 'Раздел в работе.',
  },
  pravila: {
    slug: 'pravila',
    title: 'Правила клуба',
    text: 'Раздел в работе.',
  },
  'politika-konfidencialnosti': {
    slug: 'politika-konfidencialnosti',
    title: 'Политика конфиденциальности',
    text: 'Раздел в работе.',
  },
} as const satisfies Record<string, StubPage>

export type StubSlug = keyof typeof stubPages
