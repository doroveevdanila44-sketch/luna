import Link from 'next/link'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  href?: string
  /** Подсвеченная карточка — «Популярный» тариф */
  highlighted?: boolean
  /** Отключить hover-эффект (карточки без интерактива) */
  interactive?: boolean
  /** Направление раскладки внутри карточки */
  direction?: 'col' | 'row'
  className?: string
}

/**
 * Общая оболочка карточки: панель, граница, радиус.
 * При наведении увеличивается ВСЯ карточка, а не только фотография
 * (docs/DESIGN.md, раздел «Анимации»).
 */
export function Card({
  children,
  href,
  highlighted = false,
  interactive = true,
  direction = 'col',
  className = '',
}: Props) {
  const classes = [
    'relative flex overflow-hidden rounded-card border bg-panel',
    direction === 'row' ? 'flex-row' : 'flex-col',
    highlighted ? 'border-green' : 'border-line',
    interactive
      ? 'transition-[transform,border-color] duration-300 ease-out ' +
        'hover:scale-[1.02] hover:border-green/50 ' +
        'motion-reduce:transition-none motion-reduce:hover:scale-100'
      : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (href) {
    return (
      <Link href={href} className={`${classes} focus-visible:border-green`}>
        {children}
      </Link>
    )
  }

  return <div className={classes}>{children}</div>
}
