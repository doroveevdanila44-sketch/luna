import Link from 'next/link'
import { Clock, Instagram, MapPin, Phone, Send, type LucideIcon } from 'lucide-react'

import { Logo } from '@/components/ui/Logo'
import { MapCard } from '@/components/ui/MapCard'
import { contacts, type Social } from '@/data/contacts'
import { ui } from '@/data/home'
import { footerNav } from '@/data/nav'

const socialIcons: Record<Social['id'], LucideIcon> = {
  telegram: Send,
  instagram: Instagram,
}

export function Footer() {
  const telegram = contacts.socials.find((s) => s.id === 'telegram')

  return (
    <footer className="border-t border-line bg-bg">
      <div className="container-luna py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Лок-ап, слоган, соцсети */}
          <div className="lg:col-span-3">
            <Logo size="md" />
            <p className="mt-5 max-w-[26ch] font-sans text-body text-muted">
              {ui.slogan}
            </p>

            <ul className="mt-6 flex items-center gap-3">
              {contacts.socials.map((social) => {
                const Icon = socialIcons[social.id]
                return (
                  <li key={social.id}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={social.label}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-btn border border-line text-muted transition-colors hover:border-green hover:text-green"
                    >
                      <Icon size={18} />
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Колонки ссылок */}
          {footerNav.map((column) => (
            <nav key={column.title} className="lg:col-span-2" aria-label={column.title}>
              <h3 className="font-display text-[13px] font-bold uppercase tracking-[0.06em] text-text">
                {column.title}
              </h3>
              <ul className="mt-5 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-sans text-body text-muted transition-colors hover:text-green"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Контакты */}
          <div className="lg:col-span-3">
            <h3 className="font-display text-[13px] font-bold uppercase tracking-[0.06em] text-text">
              {ui.contactsTitle}
            </h3>
            <ul className="mt-5 flex flex-col gap-3.5 font-sans text-body text-muted">
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="mt-1 shrink-0 text-green" aria-hidden />
                <span>
                  {contacts.address.street}
                  <br />
                  {contacts.address.area}, {contacts.address.locality}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone size={16} className="mt-1 shrink-0 text-green" aria-hidden />
                <a
                  href={contacts.phone.href}
                  className="text-text transition-colors hover:text-green"
                >
                  {contacts.phone.display}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock size={16} className="mt-1 shrink-0 text-green" aria-hidden />
                <span>{contacts.hours}</span>
              </li>
              {telegram ? (
                <li className="flex items-start gap-2.5">
                  <Send size={16} className="mt-1 shrink-0 text-green" aria-hidden />
                  <a
                    href={telegram.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="transition-colors hover:text-green"
                  >
                    {telegram.label}
                  </a>
                </li>
              ) : null}
            </ul>
          </div>

          {/* Карта */}
          <div className="lg:col-span-2">
            <MapCard className="aspect-[16/9] w-full lg:aspect-[4/3]" />
            <p className="mt-3 font-sans text-caption text-muted">{contacts.payment}</p>
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-luna flex flex-col gap-3 py-5 font-sans text-caption text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>{ui.copyright}</span>
          <Link href={ui.privacy.href} className="transition-colors hover:text-green">
            {ui.privacy.label}
          </Link>
        </div>
      </div>
    </footer>
  )
}
