'use client'

import { useEffect, useState } from 'react'

/**
 * Совпадает ли медиавыражение сейчас.
 *
 * До монтирования всегда false — то есть серверная разметка мобильная.
 * Это осознанный порядок: телефон получает ровно тот вариант, который ему
 * нужен, и ничего лишнего не качает. На десктопе лишний запрос уходит
 * ниже первого экрана и стоит копейки.
 *
 * Нужен там, где разные разрешения требуют разной РАЗМЕТКИ, а не разных
 * стилей: спрятать лишний вариант через display:none нельзя — браузер
 * всё равно грузит картинки внутри скрытого блока.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia(query)
    const update = () => setMatches(mql.matches)

    update()
    mql.addEventListener('change', update)
    return () => mql.removeEventListener('change', update)
  }, [query])

  return matches
}
