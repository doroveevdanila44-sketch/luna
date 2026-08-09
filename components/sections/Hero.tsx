import Image from 'next/image'

import { Button } from '@/components/ui/Button'
import { contacts } from '@/data/contacts'
import { hero } from '@/data/home'

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[600px] items-end overflow-hidden pt-[104px] sm:min-h-[660px] lg:min-h-[740px] lg:pt-[136px]">
      {/*
        Фото 2.5:1 — луна слева, зал справа.
        На телефоне кадр смещён к луне: тёмная половина держит текст,
        на десктопе видно сцену целиком.
      */}
      <Image
        src="/images/hero.jpg"
        alt={hero.imageAlt}
        fill
        priority
        sizes="100vw"
        quality={85}
        className="-z-20 object-cover object-[40%_center] sm:object-[34%_center] lg:object-center"
      />

      {/*
        Стык фона и фото не должен читаться линией — docs/DESIGN.md.
        На телефоне работает только вертикальная вуаль: горизонтальная
        на узком экране закрасила бы кадр целиком и фото пропало бы.
      */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,var(--bg)_0%,rgba(11,12,10,0.62)_16%,rgba(11,12,10,0.5)_44%,rgba(11,12,10,0.78)_80%,var(--bg)_100%)] sm:bg-[linear-gradient(to_bottom,var(--bg)_0%,rgba(11,12,10,0.55)_18%,rgba(11,12,10,0)_46%,rgba(11,12,10,0.72)_82%,var(--bg)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 hidden bg-[linear-gradient(to_right,var(--bg)_0%,rgba(11,12,10,0.78)_34%,rgba(11,12,10,0.15)_68%,rgba(11,12,10,0)_100%)] sm:block"
      />

      <div className="container-luna relative w-full pb-20 lg:pb-28">
        <div className="flex items-end justify-between gap-8">
          <div className="max-w-[640px]">
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.3em] text-muted sm:text-eyebrow">
              {hero.eyebrow}
            </p>

            {/* Переносы заданы явно — строка не должна ломаться сама */}
            <h1 className="mt-5 font-display text-h1 font-bold uppercase text-text sm:whitespace-nowrap">
              {hero.titleLine1}
              <br />
              <span className="text-green">{hero.titleLine2}</span>
            </h1>

            <p className="mt-6 max-w-[46ch] font-sans text-body text-text/80 sm:text-lead">
              {hero.lead}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Button href={hero.primaryCta.href} variant="primary" size="lg" withArrow>
                {hero.primaryCta.label}
              </Button>
              <Button href={contacts.phone.href} variant="outline" size="lg">
                {hero.secondaryCta.label}
              </Button>
            </div>
          </div>

          {/* Столбик справа, как в макете */}
          <ul className="hidden shrink-0 flex-col gap-1 pb-2 text-right xl:flex">
            {hero.marks.map((mark, index) => (
              <li
                key={mark}
                className={`border-l-2 py-1.5 pl-4 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] ${
                  index === 1 ? 'border-green text-text' : 'border-line text-muted'
                }`}
              >
                {mark}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
