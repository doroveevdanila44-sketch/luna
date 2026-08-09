/**
 * Атмосфера клуба.
 * Готовы три фото (1, 3, 4). Сетка рассчитана на 5 позиций — добавление
 * четвёртого и пятого элемента в массив не должно ломать раскладку
 * (docs/CONTENT.md, docs/ASSETS.md).
 */

export type GalleryItem = {
  readonly id: string
  readonly src: string
  /**
   * Отдельный кадр для ширин до 768px. Нужен там, где вертикальный
   * десктопный снимок на телефоне режется по главному объекту.
   * Если не задан — на всех ширинах показывается src.
   */
  readonly mobileSrc?: string
  readonly alt: string
  /**
   * Вес колонки в горизонтальной ленте на десктопе.
   * Сумма весов нормализуется во flex-basis, поэтому лента остаётся
   * корректной при любом количестве элементов от 1 до 5.
   */
  readonly weight: number
  /** Куда смещать кроп, чтобы главный объект не срезался */
  readonly position?: string
}

export const gallery: readonly GalleryItem[] = [
  {
    id: 'atmosphere-1',
    src: '/images/atmosphere-1.jpg',
    alt: 'Зал со свободными весами под шестиугольными светильниками',
    weight: 1,
    position: 'center',
  },
  {
    id: 'atmosphere-3',
    src: '/images/atmosphere-3.jpg',
    alt: 'Стойка с гантелями и подсвеченная луна на стене',
    weight: 1.3,
    position: 'center',
  },
  {
    id: 'atmosphere-4',
    src: '/images/atmosphere-4.jpg',
    // Вертикальный кадр режет гирю на телефоне — там свой снимок
    mobileSrc: '/images/atmosphere-4-mobile.jpg',
    alt: 'Гиря «Луна» 24 кг под фирменным знаком клуба',
    weight: 1,
    position: 'center',
  },
  // TODO: «Атмосфера 2» и «Атмосфера 5» — фото пока нет.
  // Добавить сюда, когда клиент пришлёт; сетка их примет без правок.
]
