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

/** Порог, после которого шапка становится сплошной и сжимается */
const SCROLL_THRESHOLD = 40

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Safari на iOS применяет :active к произвольным элементам только если у
  // документа есть хоть один обработчик касания. Пустой passive-слушатель
  // включает отклик по касанию и ничего не перехватывает — скролл не страдает.
  useEffect(() => {
    const noop = () => {}
    document.addEventListener('touchstart', noop, { passive: true })
    return () => document.removeEventListener('touchstart', noop)
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

  // Шесть пунктов, телефон, адрес и кнопка должны уместиться в одну строку
  // в контейнере 1232px — отсюда мелкий кегль и скупой трекинг
  const navLinkClasses =
    'whitespace-nowrap font-sans text-[11px] font-medium uppercase tracking-[0.03em] text-text transition-colors hover:text-green xl:text-[12px] xl:tracking-[0.04em]'

  // Фон сплошной, а не полупрозрачный: сквозь bg/95 просвечивали карточки секций
  const solid = scrolled || open

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] transition-[background-color,border-color] duration-300 ease-out ${
        solid
          ? 'border-b border-line bg-bg supports-[backdrop-filter]:backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div
        className={`container-luna flex items-center gap-3 transition-[height] duration-300 ease-out xl:gap-4 ${
          solid ? 'h-[60px] lg:h-16' : 'h-[72px] lg:h-[88px]'
        }`}
      >
        <Logo className="shrink-0" />

        <nav aria-label="Основная навигация" className="hidden lg:block">
          <ul className="flex items-center gap-3 xl:gap-4">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={navLinkClasses}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Телефон, адрес и кнопка — той же строкой, кнопка у правого края */}
        <div className="ml-auto hidden shrink-0 items-center gap-3 lg:flex xl:gap-4">
          <a
            href={contacts.phone.href}
            className="inline-flex items-center gap-2 whitespace-nowrap font-sans text-[13px] font-semibold text-text transition-colors hover:text-green"
          >
            <Phone size={14} className="shrink-0 text-muted" aria-hidden />
            {contacts.phone.display}
          </a>

          {/* Полный адрес живёт в футере и на /kontakty — здесь только улица.
              На 1024 не помещается и уходит совсем */}
          <span className="hidden items-center gap-2 whitespace-nowrap font-sans text-[13px] text-text xl:inline-flex">
            <MapPin size={14} className="shrink-0 text-muted" aria-hidden />
            {contacts.address.street}
          </span>

          <Button
            href={headerCta.href}
            variant="primary"
            className="shrink-0 !px-4 xl:!px-5"
          >
            {headerCta.label}
          </Button>
        </div>

        {/* 768 и ниже: логотип, телефон-иконка, бургер */}
        <div className="ml-auto flex items-center gap-1 lg:hidden">
          <a
            href={contacts.phone.href}
            aria-label={`${ui.callAria}: ${contacts.phone.display}`}
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
          className="max-h-[calc(100dvh-60px)] overflow-y-auto border-t border-line bg-bg lg:hidden"
        >
          <div className="container-luna py-6">
            <nav aria-label="Мобильная навигация">
              <ul className="flex flex-col">
                {mainNav.map((item) => (
                  <li key={item.href} className="border-b border-line">
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
