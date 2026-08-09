'use client'

import Image from 'next/image'

import { Reveal } from '@/components/ui/Reveal'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { gallery } from '@/data/gallery'
import { sectionLinks, sectionTitles } from '@/data/home'
import { anchors } from '@/data/nav'
import { useMediaQuery } from '@/hooks/useMediaQuery'

/** С этой ширины показываем десктопные кадры */
const WIDE = '(min-width: 768px)'

/**
 * Десктоп — горизонтальная лента разной ширины (ширина задаётся весом
 * элемента через flex-grow, поэтому лента корректна при любом количестве
 * фото от 1 до 5). Мобайл — две колонки; если фото нечётное число,
 * последнее занимает всю ширину. docs/CONTENT.md
 *
 * У кадра может быть своя мобильная версия (mobileSrc). Источник выбирается
 * медиавыражением, а не display:none: скрытая картинка всё равно скачивается.
 * Стартовое значение мобильное, поэтому телефон не тянет десктопный снимок.
 *
 * Единственная секция без отклика: фотографии стоят неподвижно — ни зума,
 * ни подсветки границ. Анимация появления при скролле остаётся.
 */
export function Atmosphere() {
  const isWide = useMediaQuery(WIDE)

  return (
    <section id={anchors.atmosphere} className="section pt-0 lg:pt-0">
      <div className="container-luna">
        <SectionTitle title={sectionTitles.atmosphere} link={sectionLinks.atmosphere} />

        <ul className="mt-8 grid grid-cols-2 gap-3 md:flex md:h-[320px] md:gap-4 lg:mt-10 lg:h-[420px]">
          {gallery.map((item, index) => {
            const useMobileFrame = Boolean(item.mobileSrc) && !isWide

            return (
              <Reveal
                as="li"
                key={item.id}
                delay={index * 80}
                className={`relative overflow-hidden rounded-card border border-line last:odd:col-span-2 md:aspect-auto md:h-full md:last:odd:col-span-1 ${
                  // Мобильный кадр горизонтальный — под него и пропорция ячейки,
                  // иначе гиря снова обрежется сверху и снизу
                  useMobileFrame
                    ? 'aspect-[4/3] last:odd:aspect-[4/3]'
                    : 'aspect-[3/4] last:odd:aspect-[16/10]'
                } md:last:odd:aspect-auto`}
                style={{ flexGrow: item.weight, flexBasis: 0 }}
              >
                <Image
                  src={useMobileFrame && item.mobileSrc ? item.mobileSrc : item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1280px) 420px, (min-width: 768px) 33vw, 50vw"
                  className="object-cover"
                  style={{ objectPosition: item.position ?? 'center' }}
                />
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
