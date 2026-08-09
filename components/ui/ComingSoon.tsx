import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import { Button } from './Button'
import { contacts } from '@/data/contacts'
import { ui } from '@/data/home'

type Props = {
  title: string
  text: string
}

/** Общая заглушка для маршрутов, которых ещё нет. */
export function ComingSoon({ title, text }: Props) {
  return (
    <section className="section pt-[120px] lg:pt-[176px]">
      <div className="container-luna">
        <div className="mx-auto flex max-w-[720px] flex-col items-start rounded-block border border-line bg-panel p-7 sm:p-10">
          <span className="font-sans text-eyebrow font-semibold uppercase text-muted">
            {ui.comingSoonEyebrow}
          </span>

          <h1 className="mt-4 font-display text-h1 font-bold uppercase text-text">
            {title}
          </h1>

          <p className="mt-5 max-w-[52ch] font-sans text-lead text-muted">{text}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href={contacts.phone.href} variant="primary" withArrow>
              {contacts.phone.display}
            </Button>
            <Link
              href="/"
              className="group inline-flex items-center gap-2 font-sans text-btn font-semibold uppercase text-muted transition-colors hover:text-green"
            >
              <ArrowLeft
                size={16}
                aria-hidden
                className="transition-transform duration-200 group-hover:-translate-x-1 motion-reduce:transition-none"
              />
              {ui.backHome}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
