import Image from 'next/image'

import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { contacts } from '@/data/contacts'
import { ctaBanner } from '@/data/home'

/**
 * Широкий баннер: гиря справа, текст слева.
 * На мобиле текст сверху, гиря снизу — кадр смещён вправо, чтобы гиря
 * не срезалась. Градиент от --bg переходит в фото без видимой линии.
 */
export function CtaBanner() {
  return (
    <section className="section pt-0 lg:pt-0">
      <div className="container-luna">
        <Reveal className="relative isolate overflow-hidden rounded-block border border-line bg-panel-2">
          <Image
            src="/images/cta-banner.jpg"
            alt={ctaBanner.imageAlt}
            fill
            sizes="(min-width: 1280px) 1232px, 100vw"
            className="-z-10 object-cover object-[72%_center] sm:object-center"
          />

          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(11,12,10,0.92)_0%,rgba(11,12,10,0.72)_46%,rgba(11,12,10,0.25)_100%)] sm:bg-[linear-gradient(to_right,var(--bg)_0%,rgba(11,12,10,0.86)_34%,rgba(11,12,10,0.35)_62%,rgba(11,12,10,0)_100%)]"
          />

          <div className="relative flex min-h-[420px] flex-col justify-start p-6 sm:min-h-[300px] sm:justify-center sm:p-10 lg:min-h-[360px] lg:p-14">
            {/* Три строки заданы явно — сама строка ломаться не должна */}
            <h2 className="font-display text-[clamp(18px,3vw,34px)] font-bold uppercase leading-[1.22] text-text sm:whitespace-nowrap">
              {ctaBanner.titleLine1}
              <br />
              {ctaBanner.titleLine2}
              <br />
              <span className="text-green">{ctaBanner.titleLine3}</span>
            </h2>

            <div className="mt-8">
              <Button href={contacts.phone.href} variant="primary" size="lg" withArrow>
                {ctaBanner.button}
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
