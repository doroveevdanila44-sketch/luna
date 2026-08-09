/**
 * Отзывы. Секции нет в макете — добавлена между тренерами и абонементами
 * (docs/CONTENT.md).
 *
 * ⚠️ ТЕКСТЫ ОТЗЫВОВ ПОКА НЕ ЗАПОЛНЕНЫ.
 * Четыре записи с text: 'TODO' — реальные отзывы возьмём с карточки 2ГИС,
 * когда клиент их подтвердит. Не выдумывать: вёрстка готова, содержимое ждёт.
 * Имена и даты — тоже TODO, показываются как есть.
 */

export type Review = {
  readonly id: string
  readonly author: string
  /** ISO-дата для <time datetime>, пусто пока отзыв не заполнен */
  readonly date: string
  /** Как показываем дату в карточке */
  readonly dateLabel: string
  readonly rating: 1 | 2 | 3 | 4 | 5
  readonly text: string
}

export const reviews: readonly Review[] = [
  { id: 'r1', author: 'TODO', date: '', dateLabel: 'TODO', rating: 5, text: 'TODO' },
  { id: 'r2', author: 'TODO', date: '', dateLabel: 'TODO', rating: 5, text: 'TODO' },
  { id: 'r3', author: 'TODO', date: '', dateLabel: 'TODO', rating: 5, text: 'TODO' },
  { id: 'r4', author: 'TODO', date: '', dateLabel: 'TODO', rating: 5, text: 'TODO' },
]
