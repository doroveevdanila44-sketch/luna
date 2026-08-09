import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'

type Props = {
  title: string
  /** Ссылка «СМОТРЕТЬ ВСЕ →» справа */
  link?: { label: string; href: string; external?: boolean }
  /** Доп. подпись слева от ссылки — например рейтинг в отзывах */
  aside?: ReactNode
  id?: string
  className?: string
}

/**
 * Слева h2, справа зелёная линия (не более 170px),
 * в конце строки ссылка «СМОТРЕТЬ ВСЕ →» цветом --muted. docs/DESIGN.md.
 */
export function SectionTitle({ title, link, aside, id, className = '' }: Props) {
  const linkClasses =
    'group inline-flex shrink-0 items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-muted transition-colors hover:text-green sm:text-btn'

  return (
    <div
      className={`flex flex-wrap items-center gap-x-5 gap-y-3 ${className}`}
    >
      <h2
        id={id}
        className="font-display text-h2 font-bold uppercase text-text"
      >
        {title}
      </h2>

      {/* Зелёная линия: тянется, но не длиннее 170px */}
      <span
        aria-hidden
        className="hidden h-px w-full max-w-[170px] flex-1 bg-green sm:block"
      />

      <span className="ml-auto flex items-center gap-4 sm:gap-6">
        {aside}
        {link ? (
          link.external ? (
            <a
              href={link.href}
              target="_blank"
              rel="noreferrer noopener"
              className={linkClasses}
            >
              {link.label}
              <ArrowRight
                size={16}
                strokeWidth={2}
                aria-hidden
                className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
              />
            </a>
          ) : (
            <Link href={link.href} className={linkClasses}>
              {link.label}
              <ArrowRight
                size={16}
                strokeWidth={2}
                aria-hidden
                className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
              />
            </Link>
          )
        ) : null}
      </span>
    </div>
  )
}
