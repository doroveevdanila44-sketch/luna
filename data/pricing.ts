/**
 * Абонементы. Цены с 2ГИС, актуальны на 10.11.2025 (docs/CONTENT.md).
 * Ничего не округлять и не придумывать.
 */

export type Plan = {
  readonly id: string
  readonly title: string
  readonly period: string
  readonly description: string
  /** Цена в рублях, число — форматируем одной функцией */
  readonly price: number
  /** Базовая цена без скидки; показываем зачёркнутой */
  readonly basePrice?: number
  readonly badge?: string
  readonly note?: string
}

export type PriceRow = {
  readonly id: string
  readonly title: string
  readonly price: number
  readonly basePrice?: number
  readonly unit?: string
}

/** Три карточки на главной, как в макете */
export const plans: readonly Plan[] = [
  {
    id: 'standard',
    title: 'Стандарт',
    period: '1 месяц',
    description: 'Полный доступ в зал',
    price: 6500,
  },
  {
    id: 'optimal',
    title: 'Оптимальный',
    period: '3 месяца',
    description: 'Выгоднее на 2 000 ₽',
    price: 17500,
    basePrice: 19500,
    badge: 'Популярный',
  },
  {
    id: 'premium',
    title: 'Премиум',
    period: '12 месяцев',
    description: 'Максимальная выгода — 15 600 ₽',
    price: 62400,
    basePrice: 78000,
  },
]

/** Полный прайс — страница /abonementy */
export const priceList: readonly PriceRow[] = [
  { id: 'single', title: 'Разовая тренировка', price: 1200 },
  { id: 'day', title: 'Абонемент дневной', price: 5000, unit: 'мес' },
  { id: 'unlimited', title: 'Абонемент безлимит', price: 6500, unit: 'мес' },
  { id: 'm1', title: '1 месяц', price: 6500 },
  { id: 'm3', title: '3 месяца', price: 17500, basePrice: 19500 },
  { id: 'm6', title: '6 месяцев', price: 33150, basePrice: 39000 },
  { id: 'm12', title: '12 месяцев', price: 62400, basePrice: 78000 },
]

export const pricingDisclaimer = 'Информация о ценах не является публичной офертой'

/** 6500 → «6 500 ₽». Неразрывный пробел, чтобы цена не переносилась. */
export function formatPrice(value: number): string {
  return `${value.toLocaleString('ru-RU').replace(/ |\s/g, ' ')} ₽`
}
