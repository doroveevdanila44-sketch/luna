import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'outline'
export type ButtonSize = 'md' | 'lg'

type CommonProps = {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  /** Стрелка справа, как в макете */
  withArrow?: boolean
  className?: string
  fullWidth?: boolean
}

type Props = CommonProps & {
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  ariaLabel?: string
}

// docs/DESIGN.md: реакция появляется при наведении, нажатие только добавляет.
// Один рост в 1.04 на кнопке высотой 44px — это два пикселя, его не видно,
// поэтому наведение ещё и подсвечивает: смена фона плюс свечение hover-glow.
// prefers-reduced-motion гасит оба scale в globals.css, свечение остаётся.
const base =
  'inline-flex items-center justify-center gap-3 rounded-btn font-sans font-semibold uppercase text-btn ' +
  'transition-[transform,background-color,border-color,color,box-shadow] duration-200 ease-out ' +
  'hover-glow hover:scale-[1.04] active:scale-[1.06]'

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-green text-bg hover:bg-green-dim',
  // bg-green/5 не использовать: модификатор прозрачности на var()-токене
  // не генерирует правило (см. globals.css)
  outline: 'border border-line text-text hover:border-green hover:bg-panel hover:text-green',
}

const sizes: Record<ButtonSize, string> = {
  md: 'h-11 px-5',
  lg: 'h-[52px] px-7',
}

export function Button({
  children,
  href,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  withArrow = false,
  fullWidth = false,
  className = '',
  ariaLabel,
}: Props) {
  const classes = [
    base,
    variants[variant],
    sizes[size],
    fullWidth ? 'w-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const content = (
    <>
      <span>{children}</span>
      {withArrow ? <ArrowRight size={18} strokeWidth={2} aria-hidden /> : null}
    </>
  )

  if (href) {
    const isExternal = /^(https?:|tel:|mailto:)/.test(href)

    if (isExternal) {
      return (
        <a
          href={href}
          className={classes}
          aria-label={ariaLabel}
          {...(href.startsWith('http')
            ? { target: '_blank', rel: 'noreferrer noopener' }
            : {})}
        >
          {content}
        </a>
      )
    }

    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {content}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes} aria-label={ariaLabel}>
      {content}
    </button>
  )
}
