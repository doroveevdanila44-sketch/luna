'use client'

import { useEffect, useState } from 'react'

export type VisibleCounts = {
  /** < 640px — телефон */
  base: number
  sm?: number
  /** ≥ 768px — iPad вертикально */
  md?: number
  /** ≥ 1024px */
  lg?: number
  /** ≥ 1280px */
  xl?: number
}

const ORDER = [
  ['xl', '(min-width: 1280px)'],
  ['lg', '(min-width: 1024px)'],
  ['md', '(min-width: 768px)'],
  ['sm', '(min-width: 640px)'],
] as const

/**
 * Сколько карточек показывать на текущей ширине.
 * Массив данных общий, компонент режет его через .slice() — лишние карточки
 * не рендерятся вовсе, а не прячутся через display:none (CLAUDE.md, п.7).
 *
 * Стартовое значение — мобильное, и это принципиально: при десктопном
 * стартовом значении сервер отдавал бы телефону все карточки, браузер начинал
 * качать их фотографии ещё до гидратации и отбирал канал у hero. Ровно та
 * проблема, от которой правило и защищает.
 *
 * Объект counts должен быть константой на уровне модуля, иначе эффект
 * будет пересоздаваться на каждый рендер.
 */
export function useVisibleCount(counts: VisibleCounts): number {
  const [count, setCount] = useState(counts.base)

  useEffect(() => {
    const list = ORDER.map(([key, query]) => [key, window.matchMedia(query)] as const)

    const update = () => {
      for (const [key, mql] of list) {
        const value = counts[key]
        if (mql.matches && value != null) {
          setCount(value)
          return
        }
      }
      setCount(counts.base)
    }

    update()
    for (const [, mql] of list) mql.addEventListener('change', update)
    return () => {
      for (const [, mql] of list) mql.removeEventListener('change', update)
    }
  }, [counts])

  return count
}
