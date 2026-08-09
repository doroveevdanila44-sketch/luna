import Image from 'next/image'

import { Reveal } from '@/components/ui/Reveal'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { gallery } from '@/data/gallery'
import { sectionLinks, sectionTitles } from '@/data/home'
import { anchors } from '@/data/nav'

/**
 * Десктоп — горизонтальная лента разной ширины (ширина задаётся весом
 * элемента через flex-grow, поэтому лента корректна при любом количестве
 * фото от 1 до 5). Мобайл — две колонки; если фото нечётное число,
 * последнее занимает всю ширину. docs/CONTENT.md
 */
export function Atmosphere() {
  return (
    <section id={anchors.atmosphere} className="section pt-0 lg:pt-0">
      <div className="container-luna">
        <SectionTitle title={sectionTitles.atmosphere} link={sectionLinks.atmosphere} />

        <ul className="mt-8 grid grid-cols-2 gap-3 md:flex md:h-[320px] md:gap-4 lg:mt-10 lg:h-[420px]">
          {gallery.map((item, index) => (
            <Reveal
              as="li"
              key={item.id}
              delay={index * 80}
              className="relative aspect-[3/4] overflow-hidden rounded-card border border-line last:odd:col-span-2 last:odd:aspect-[16/10] md:aspect-auto md:h-full md:last:odd:col-span-1 md:last:odd:aspect-auto"
              style={{ flexGrow: item.weight, flexBasis: 0 }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 33vw, 50vw"
                className="object-cover transition-transform duration-500 ease-out hover:scale-[1.04] motion-reduce:transition-none motion-reduce:hover:scale-100"
                style={{ objectPosition: item.position ?? 'center' }}
              />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
