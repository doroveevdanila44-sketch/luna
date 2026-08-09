/**
 * Направления — 4 карточки: фото сверху, текст снизу (docs/CONTENT.md).
 * Фото — public/images, таблица в docs/ASSETS.md.
 */

export type DirectionIcon = 'dumbbell' | 'users' | 'clipboard' | 'activity'

export type Direction = {
  readonly id: string
  readonly title: string
  readonly text: string
  readonly image: string
  readonly icon: DirectionIcon
  /** Куда ведёт карточка. Пока общий маршрут-заглушка. */
  readonly href: string
}

export const directions: readonly Direction[] = [
  {
    id: 'gym',
    title: 'Тренажёрный зал',
    text: 'Современное оборудование для любых целей',
    image: '/images/dir-gym.jpg',
    icon: 'dumbbell',
    href: '/napravleniya',
  },
  {
    id: 'group',
    title: 'Групповые занятия',
    text: 'Энергия команды, мотивация и результат каждый день',
    image: '/images/dir-group.jpg',
    icon: 'users',
    href: '/napravleniya',
  },
  {
    id: 'personal',
    title: 'Персональные тренировки',
    text: 'Индивидуальный подход к твоему прогрессу',
    image: '/images/dir-personal.jpg',
    icon: 'clipboard',
    href: '/napravleniya',
  },
  {
    id: 'functional',
    title: 'Функциональный тренинг',
    text: 'Сила, выносливость и новые возможности',
    image: '/images/dir-functional.jpg',
    icon: 'activity',
    href: '/napravleniya',
  },
]
