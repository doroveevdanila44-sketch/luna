import Link from 'next/link'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  href?: string
  id?: string
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
  id,
  highlighted = false,
  interactive = true,
  direction = 'col',
  className = '',
}: Props) {
  const classes = [
    // group нужен всегда: по нему фотография внутри карточки ловит
    // group-hover и растёт вместе с ней (docs/DESIGN.md)
    'group relative flex overflow-hidden rounded-card border bg-panel',
    direction === 'row' ? 'flex-row' : 'flex-col',
    highlighted ? 'border-green' : 'border-line',
    interactive
      ? 'transition-[transform,border-color,box-shadow] duration-300 ease-out ' +
        'hover:scale-[1.02] active:scale-[1.03] hover-border-green'
      : 'transition-[border-color,box-shadow] duration-300 ease-out',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (href) {
    return (
      <Link id={id} href={href} className={`${classes} focus-visible:border-green`}>
        {children}
      </Link>
    )
  }

  return (
    <div id={id} className={classes}>
      {children}
    </div>
  )
}
