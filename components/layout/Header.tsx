'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Clock, MapPin, Menu, Phone, X } from 'lucide-react'

import { Button } from '@/components/ui/Button'
import { Logo } from '@/components/ui/Logo'
import { contacts } from '@/data/contacts'
import { ui } from '@/data/home'
import { headerCta, mainNav } from '@/data/nav'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  // Прозрачная поверх hero, при скролле — фон --bg с границей
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Меню закрывается при переходе и не даёт скроллить фон
  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const navLinkClasses =
    'font-sans text-[13px] font-medium uppercase tracking-[0.08em] text-text/85 transition-colors hover:text-green'

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? 'border-b border-line bg-bg/95 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="container-luna flex items-center gap-6 py-4 lg:py-5">
        <Logo />

        <nav aria-label="Основная навигация" className="mx-auto hidden lg:block">
          <ul className="flex items-center gap-6 xl:gap-8">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={navLinkClasses}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Контакты и кнопка, как в макете: справа столбиком */}
        <div className="ml-auto hidden shrink-0 flex-col items-end gap-2.5 lg:flex">
          <div className="hidden items-start gap-6 xl:flex">
            <a
              href={contacts.phone.href}
              className="inline-flex items-center gap-2 font-sans text-[15px] font-semibold text-text transition-colors hover:text-green"
            >
              <Phone size={15} className="text-green" aria-hidden />
              {contacts.phone.display}
            </a>

            <span className="inline-flex max-w-[240px] items-start gap-2 font-sans text-caption text-muted">
              <MapPin size={15} className="mt-0.5 shrink-0 text-green" aria-hidden />
              <span>
                {contacts.address.street}
                <br />
                {contacts.address.area}, {contacts.address.locality}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={contacts.phone.href}
              aria-label={ui.callAria}
              className="inline-flex items-center gap-2 font-sans text-[15px] font-semibold text-text transition-colors hover:text-green xl:hidden"
            >
              <Phone size={15} className="text-green" aria-hidden />
              {contacts.phone.display}
            </a>
            <Button href={headerCta.href} variant="primary">
              {headerCta.label}
            </Button>
          </div>
        </div>

        {/* Мобильная часть */}
        <div className="ml-auto flex items-center gap-1 lg:hidden">
          <a
            href={contacts.phone.href}
            aria-label={ui.callAria}
            className="inline-flex h-11 w-11 items-center justify-center rounded-btn text-green transition-colors hover:bg-panel"
          >
            <Phone size={20} aria-hidden />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? ui.menuClose : ui.menuOpen}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-btn text-text transition-colors hover:bg-panel"
          >
            {open ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-menu"
          className="max-h-[calc(100dvh-72px)] overflow-y-auto border-t border-line bg-bg lg:hidden"
        >
          <div className="container-luna py-6">
            <nav aria-label="Мобильная навигация">
              <ul className="flex flex-col">
                {mainNav.map((item) => (
                  <li key={item.href} className="border-b border-line/70">
                    <Link
                      href={item.href}
                      className="block py-3.5 font-sans text-[15px] font-medium uppercase tracking-[0.06em] text-text transition-colors hover:text-green"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-6 flex flex-col gap-3 font-sans text-caption text-muted">
              <span className="inline-flex items-start gap-2">
                <MapPin size={15} className="mt-0.5 shrink-0 text-green" aria-hidden />
                <span>
                  {contacts.address.street}
                  <br />
                  {contacts.address.area}, {contacts.address.locality}
                </span>
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock size={15} className="shrink-0 text-green" aria-hidden />
                {contacts.hours}
              </span>
            </div>

            <Button
              href={headerCta.href}
              variant="primary"
              size="lg"
              fullWidth
              withArrow
              className="mt-6"
            >
              {headerCta.label}
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  )
}
