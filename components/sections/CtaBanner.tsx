'use client'

import Image from 'next/image'

import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { contacts } from '@/data/contacts'
import { ctaBanner } from '@/data/home'
import { useMediaQuery } from '@/hooks/useMediaQuery'

/** Ниже этой ширины — своя раскладка и свой кадр */
const WIDE = '(min-width: 768px)'

/**
 * До 768px — раскладка в поток: заголовок, кадр гири целиком, кнопка под ним.
 * Общий кадр на телефоне обрезал гирю, а кнопка ложилась прямо на неё.
 * От 768px — широкий баннер как в макете: гиря справа, текст слева.
 *
 * Вариант выбирается по медиавыражению, а не через display:none: скрытый
 * блок всё равно тянет свою фотографию по сети — проверено, телефон качал
 * оба кадра.
 */
export function CtaBanner() {
  const isWide = useMediaQuery(WIDE)

  const title = (
    <>
      {ctaBanner.titleLine1}
      <br />
      {ctaBanner.titleLine2}
      <br />
      <span className="text-green">{ctaBanner.titleLine3}</span>
    </>
  )

  const button = (
    <Button
      href={contacts.phone.href}
      variant="primary"
      size="lg"
      withArrow
      fullWidth={!isWide}
    >
      {ctaBanner.button}
    </Button>
  )

  return (
    <section className="section pt-0 lg:pt-0">
      <div className="container-luna">
        <Reveal>
          {isWide ? (
            /*
              Растёт на 1.01, а не на 1.02: при 1.02 баннер вылезает за паддинг
              контейнера и на 1280px даёт горизонтальную прокрутку.
            */
            <div className="group react grow-wide lit relative isolate overflow-hidden rounded-block border border-line bg-panel-2">
              <Image
                src="/images/cta-banner.jpg"
                alt={ctaBanner.imageAlt}
                fill
                sizes="(min-width: 1280px) 1232px, 100vw"
                className="react grow-photo -z-10 object-cover object-center"
              />

              <div
                aria-hidden
                className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--bg)_0%,rgba(11,12,10,0.86)_34%,rgba(11,12,10,0.35)_62%,rgba(11,12,10,0)_100%)]"
              />

              <div className="relative flex min-h-[300px] flex-col justify-center p-10 lg:min-h-[360px] lg:p-14">
                {/* Три строки заданы явно — сама строка ломаться не должна */}
                <h2 className="whitespace-nowrap font-display text-[clamp(18px,3vw,34px)] font-bold uppercase leading-[1.22] text-text">
                  {title}
                </h2>

                <div className="mt-8">{button}</div>
              </div>
            </div>
          ) : (
            <div className="overflow-hidden rounded-block border border-line bg-panel-2">
              <h2 className="px-5 pt-6 font-display text-[clamp(16px,4.6vw,22px)] font-bold uppercase leading-[1.24] text-text">
                {title}
              </h2>

              <div className="relative mt-5">
                <Image
                  src="/images/cta-banner-mobile.jpg"
                  alt={ctaBanner.imageAlt}
                  width={1100}
                  height={825}
                  sizes="100vw"
                  className="h-auto w-full"
                />
                {/* Оба стыка гасятся градиентом в цвет плашки, чтобы кадр
                    не читался вклеенным прямоугольником */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-14 bg-[linear-gradient(to_bottom,var(--panel-2)_0%,rgba(14,16,13,0)_100%)]"
                />
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(to_top,var(--panel-2)_0%,rgba(14,16,13,0)_100%)]"
                />
              </div>

              <div className="px-5 pb-5">{button}</div>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  )
}
