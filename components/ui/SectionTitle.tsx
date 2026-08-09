import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'

export type SectionLink = {
  label: string
  href: string
  /** Внешний адрес открывается в новой вкладке обычным <a> */
  external?: boolean
}

type Props = {
  title: string
  /** Ссылка «СМОТРЕТЬ ВСЕ →» справа */
  link?: SectionLink
  /** Доп. подпись слева от ссылки — например рейтинг в отзывах */
  aside?: ReactNode
  id?: string
  className?: string
}

const linkClasses =
  'group inline-flex shrink-0 items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-muted transition-colors hover:text-green sm:text-btn'

/** Стрелка уезжает вправо при наведении на ссылку целиком */
function ArrowLink({ link }: { link: SectionLink }) {
  const content = (
    <>
      {link.label}
      <ArrowRight
        size={16}
        strokeWidth={2}
        aria-hidden
        className="react nudge-x"
      />
    </>
  )

  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noreferrer noopener"
        className={linkClasses}
      >
        {content}
      </a>
    )
  }

  return (
    <Link href={link.href} className={linkClasses}>
      {content}
    </Link>
  )
}

/**
 * Слева h2, справа зелёная линия (не более 170px),
 * в конце строки ссылка «СМОТРЕТЬ ВСЕ →» цветом --muted. docs/DESIGN.md.
 */
export function SectionTitle({ title, link, aside, id, className = '' }: Props) {
  return (
    <div className={`flex flex-wrap items-center gap-x-5 gap-y-3 ${className}`}>
      <h2 id={id} className="font-display text-h2 font-bold uppercase text-text">
        {title}
      </h2>

      {/* Зелёная линия: тянется, но не длиннее 170px */}
      <span
        aria-hidden
        className="hidden h-px w-full max-w-[170px] flex-1 bg-green sm:block"
      />

      <span className="ml-auto flex items-center gap-4 sm:gap-6">
        {aside}
        {link ? <ArrowLink link={link} /> : null}
      </span>
    </div>
  )
}
