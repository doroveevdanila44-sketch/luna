'use client'

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  /** Задержка каскада внутри одной секции, мс */
  delay?: number
  as?: 'div' | 'section' | 'li'
  className?: string
  id?: string
  style?: CSSProperties
}

/**
 * Появление при скролле: opacity 0→1, translateY 16px→0, 500ms, один раз.
 * Только IntersectionObserver, без библиотек анимации (CLAUDE.md).
 * prefers-reduced-motion гасится в globals.css.
 */
export function Reveal({
  children,
  delay = 0,
  as = 'div',
  className = '',
  id,
  style,
}: Props) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    // Если наблюдателя нет — показываем сразу, контент не должен пропадать
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.disconnect()
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const Tag = as as 'div'

  return (
    <Tag
      id={id}
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={delay ? { ...style, transitionDelay: `${delay}ms` } : style}
    >
      {children}
    </Tag>
  )
}
