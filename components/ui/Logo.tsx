import Link from 'next/link'

import { contacts } from '@/data/contacts'

type Props = {
  /** Крупный вариант для футера */
  size?: 'sm' | 'md'
  className?: string
}

/**
 * Логотипа нет — текстовый лок-ап (docs/ASSETS.md).
 * Когда появится SVG, заменяется здесь одной правкой.
 */
export function Logo({ size = 'sm', className = '' }: Props) {
  const isMd = size === 'md'

  return (
    <Link
      href="/"
      aria-label={`${contacts.name} — ${contacts.caption}`}
      className={`group inline-flex flex-col leading-none ${className}`}
    >
      <span
        className={`font-display font-extrabold uppercase tracking-[0.10em] text-text transition-colors group-hover:text-green ${
          isMd ? 'text-[26px]' : 'text-[20px]'
        }`}
      >
        {contacts.name}
      </span>
      <span
        className={`mt-1 font-sans font-medium uppercase tracking-[0.28em] text-muted ${
          isMd ? 'text-[10px]' : 'text-[9px]'
        }`}
      >
        {contacts.caption}
      </span>
    </Link>
  )
}
