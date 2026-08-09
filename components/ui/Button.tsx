import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'outline' | 'ghost'
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

const base =
  'inline-flex items-center justify-center gap-3 rounded-btn font-sans font-semibold uppercase text-btn ' +
  'transition-[transform,background-color,border-color,color] duration-200 ease-out ' +
  'motion-reduce:transition-none hover:scale-[1.03] active:scale-[0.99] motion-reduce:hover:scale-100'

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-green text-bg hover:bg-green-dim',
  outline: 'border border-line text-text hover:border-green hover:text-green',
  ghost: 'text-muted hover:text-green',
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
