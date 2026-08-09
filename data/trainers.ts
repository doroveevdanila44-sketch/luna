/**
 * Тренеры — 4 карточки-заглушки, как в макете (docs/CONTENT.md).
 * Фотографий нет: поле photo уже в типе, значение null, рендерится
 * компонент-заглушка, а не картинка.
 * TODO: имена и фото — от клиента.
 */

export type Trainer = {
  readonly id: string
  readonly firstName: string
  readonly lastName: string
  readonly speciality: string
  readonly experienceYears: number
  readonly photo: string | null
  readonly href: string
}

export const trainers: readonly Trainer[] = [
  {
    id: 'ivanov',
    firstName: 'Алексей',
    lastName: 'Иванов',
    speciality: 'Тренажёрный зал',
    experienceYears: 8,
    photo: null,
    href: '/trenery',
  },
  {
    id: 'petrova',
    firstName: 'Мария',
    lastName: 'Петрова',
    speciality: 'Групповые программы',
    experienceYears: 6,
    photo: null,
    href: '/trenery',
  },
  {
    id: 'sidorov',
    firstName: 'Дмитрий',
    lastName: 'Сидоров',
    speciality: 'Персональный тренер',
    experienceYears: 10,
    photo: null,
    href: '/trenery',
  },
  {
    id: 'smirnova',
    firstName: 'Екатерина',
    lastName: 'Смирнова',
    speciality: 'Йога / Растяжка',
    experienceYears: 7,
    photo: null,
    href: '/trenery',
  },
]

/** «Опыт: 8 лет» — склонение в одном месте */
export function experienceLabel(years: number): string {
  const mod10 = years % 10
  const mod100 = years % 100
  let word = 'лет'
  if (mod10 === 1 && mod100 !== 11) word = 'год'
  else if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) word = 'года'
  return `Опыт: ${years} ${word}`
}
