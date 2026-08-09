import Image from 'next/image'

import { HeroMarks } from '@/components/sections/HeroMarks'
import { Button } from '@/components/ui/Button'
import { contacts } from '@/data/contacts'
import { hero } from '@/data/home'

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[600px] items-end overflow-hidden pt-[104px] sm:min-h-[660px] lg:min-h-[740px] lg:pt-[136px]">
      {/*
        Фото 16:9 — крупная луна слева, зал справа.
        От 1280px кадр виден по всей ширине и позиция по X роли не играет;
        ниже контейнер уже кадра, поэтому смещаем окно влево — иначе луна,
        главный образ бренда, уезжает за левый край.

        quality 78, а не 85: кадр лежит под вуалью и почти монохромный,
        артефактов не видно, а это самый первый байт страницы — LCP.

        sizes на телефоне занижены намеренно. Кадр 16:9 растягивается по
        высоте экрана, и «честный» размер потребовал бы вдвое больше пикселей,
        чем есть смысл грузить по мобильной сети. Под вуалью разница не видна,
        а LCP держится.
      */}
      <Image
        src="/images/hero.jpg"
        alt={hero.imageAlt}
        fill
        priority
        sizes="(max-width: 640px) 80vw, 100vw"
        quality={78}
        className="-z-20 object-cover object-[12%_center] sm:object-[18%_center] lg:object-[25%_center] xl:object-center"
      />

      {/*
        Стык фона и фото не должен читаться линией — docs/DESIGN.md.
        На телефоне работает только вертикальная вуаль: горизонтальная
        на узком экране закрасила бы кадр целиком и фото пропало бы.
      */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(11,12,10,0.86)_0%,rgba(11,12,10,0.55)_18%,rgba(11,12,10,0.42)_46%,rgba(11,12,10,0.7)_80%,var(--bg)_100%)] sm:bg-[linear-gradient(to_bottom,rgba(11,12,10,0.82)_0%,rgba(11,12,10,0.3)_24%,rgba(11,12,10,0.05)_52%,rgba(11,12,10,0.62)_84%,var(--bg)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 hidden bg-[linear-gradient(to_right,rgba(11,12,10,0.55)_0%,rgba(11,12,10,0.42)_38%,rgba(11,12,10,0.15)_66%,rgba(11,12,10,0)_88%)] sm:block"
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

            <p className="mt-6 max-w-[46ch] font-sans text-body text-text sm:text-lead">
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

          {/* Столбик справа, как в макете, — но кликабельный */}
          <HeroMarks />
        </div>
      </div>
    </section>
  )
}
