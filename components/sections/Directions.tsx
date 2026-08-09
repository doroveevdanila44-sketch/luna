'use client'

import Image from 'next/image'
import {
  Activity,
  ClipboardList,
  Dumbbell,
  Users,
  type LucideIcon,
} from 'lucide-react'

import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/ui/Reveal'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { directions, type DirectionIcon } from '@/data/directions'
import { sectionLinks, sectionTitles } from '@/data/home'
import { anchors } from '@/data/nav'
import { useVisibleCount, type VisibleCounts } from '@/hooks/useVisibleCount'

const icons: Record<DirectionIcon, LucideIcon> = {
  dumbbell: Dumbbell,
  users: Users,
  clipboard: ClipboardList,
  activity: Activity,
}

/** На телефоне две карточки, дальше — по ссылке «СМОТРЕТЬ ВСЕ» */
const COUNTS: VisibleCounts = { base: 2, sm: 4 }

/** Смещения кропа подобраны по кадру: люди не срезаются */
const positions: Record<string, string> = {
  gym: 'object-[50%_45%]',
  group: 'object-[50%_58%]',
  personal: 'object-[52%_58%]',
  functional: 'object-[56%_46%]',
}

export function Directions() {
  const visible = useVisibleCount(COUNTS)

  return (
    <section id={anchors.directions} className="section">
      <div className="container-luna">
        <SectionTitle title={sectionTitles.directions} link={sectionLinks.directions} />

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:mt-10 lg:grid-cols-4">
          {directions.slice(0, visible).map((direction, index) => {
            const Icon = icons[direction.icon]

            return (
              <Reveal as="li" key={direction.id} delay={index * 70} className="flex">
                <Card href={direction.href} className="w-full">
                  <div className="relative aspect-[16/10] w-full overflow-hidden sm:aspect-[4/3]">
                    <Image
                      src={direction.image}
                      alt=""
                      fill
                      sizes="(min-width: 1280px) 300px, (min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className={`object-cover ${positions[direction.id] ?? 'object-center'}`}
                    />
                    <span
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-panel to-transparent"
                    />
                    <Icon
                      size={30}
                      strokeWidth={1.5}
                      className="absolute bottom-4 left-5 text-green"
                      aria-hidden
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-h3 font-bold uppercase leading-snug text-text">
                      {direction.title}
                    </h3>
                    <p className="mt-2.5 font-sans text-caption text-muted">
                      {direction.text}
                    </p>
                  </div>
                </Card>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
