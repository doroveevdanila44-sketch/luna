/**
 * Преимущества — РОВНО 4 штуки (docs/CONTENT.md).
 * В макете их пять, пункт «Атмосфера Луны» убран намеренно — не возвращать.
 * Четыре пункта дают ровную сетку: 4 в ряд / 2×2 / 4 полосы.
 */

export type BenefitIcon = 'gift' | 'dumbbell' | 'trophy' | 'heart'

export type Benefit = {
  readonly id: string
  readonly title: string
  readonly text: string
  readonly icon: BenefitIcon
}

export const benefits: readonly Benefit[] = [
  {
    id: 'first-free',
    title: 'Первое занятие бесплатно',
    text: 'Оцени атмосферу и тренировки без обязательств',
    icon: 'gift',
  },
  {
    id: 'habit',
    title: 'Сила — это привычка',
    text: 'Дисциплина сегодня — результат всегда',
    icon: 'dumbbell',
  },
  {
    id: 'result',
    title: 'Твой результат',
    text: 'Современное оборудование и поддержка на каждом этапе',
    icon: 'trophy',
  },
  {
    id: 'comfort',
    title: 'Комфорт',
    text: 'Просторный зал, удобные раздевалки и душевые',
    icon: 'heart',
  },
]
