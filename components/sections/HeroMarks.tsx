'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { hero } from '@/data/home'
import { anchors } from '@/data/nav'

/** Сколько держится подсветка карточки после клика */
const HIGHLIGHT_MS = 1200

/**
 * Столбик «Твоя сила / Твой ритм / Твой результат» в hero.
 * Зелёный индикатор слева переезжает к активному пункту через translateY,
 * а не перерисовывается. Клик уводит к нужной карточке направлений
 * и коротко её подсвечивает.
 */
export function HeroMarks() {
  const [active, setActive] = useState<number>(hero.defaultMark)
  const [indicator, setIndicator] = useState({ y: 0, height: 0 })
  const itemsRef = useRef<(HTMLLIElement | null)[]>([])
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Позицию и высоту меряем по самому пункту — не зависим от того,
  // как шрифт разложит строку на конкретной ширине
  useEffect(() => {
    const node = itemsRef.current[active]
    if (node) setIndicator({ y: node.offsetTop, height: node.offsetHeight })
  }, [active])

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current)
  }, [])

  const goToDirection = useCallback((target: string) => {
    const section = document.getElementById(anchors.directions)
    const card = document.getElementById(`direction-${target}`)

    // behavior не задаём: плавность уже описана в globals.css через
    // scroll-behavior, и там же она отключается при prefers-reduced-motion
    section?.scrollIntoView({ block: 'start' })

    if (!card) return
    card.classList.add('is-highlighted')
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(
      () => card.classList.remove('is-highlighted'),
      HIGHLIGHT_MS,
    )
  }, [])

  return (
    <ul
      className="relative hidden shrink-0 flex-col pb-2 xl:flex"
      onMouseLeave={() => setActive(hero.defaultMark)}
    >
      {/* Индикатор: один элемент, который переезжает, а не три статичные полоски */}
      <span
        aria-hidden
        className="absolute left-0 w-0.5 bg-green transition-transform duration-300 ease-out"
        style={{
          height: `${indicator.height}px`,
          transform: `translateY(${indicator.y}px)`,
        }}
      />
      <span aria-hidden className="absolute inset-y-0 left-0 -z-10 w-0.5 bg-line" />

      {hero.marks.map((mark, index) => (
        <li key={mark.target} ref={(el) => void (itemsRef.current[index] = el)}>
          <button
            type="button"
            onClick={() => goToDirection(mark.target)}
            onMouseEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
            className={`block w-full origin-right py-1.5 pl-4 text-right font-sans text-[11px] font-semibold uppercase tracking-[0.16em] transition-[transform,color] duration-300 ease-out hover:scale-[1.06] ${
              index === active ? 'text-text' : 'text-muted hover:text-text'
            }`}
          >
            {mark.label}
          </button>
        </li>
      ))}
    </ul>
  )
}
