import { Dumbbell, Gift, HeartPulse, Trophy, type LucideIcon } from 'lucide-react'

import { Reveal } from '@/components/ui/Reveal'
import { benefits, type BenefitIcon } from '@/data/benefits'
import { sectionTitles } from '@/data/home'
import { anchors } from '@/data/nav'

const icons: Record<BenefitIcon, LucideIcon> = {
  gift: Gift,
  dumbbell: Dumbbell,
  trophy: Trophy,
  heart: HeartPulse,
}

/**
 * Плашка наезжает на hero снизу.
 * 1440/1024 — 4 в ряд · 768 — 2×2 · 390 — 4 полосы во всю ширину
 * (иконка слева, текст справа), не квадратные плитки. docs/CONTENT.md
 *
 * Пункты — блоки на общем фоне, а не отдельные карточки: своего фона, рамки,
 * скругления и тени у них нет. Делит их только вертикальная линия --line
 * (на телефоне колонка одна — там делит воздух).
 *
 * При наведении растут заголовок и иконка, сам блок не трогается — поэтому
 * контейнер снова может обрезать содержимое по скруглению.
 */

// Линия слева: на двух колонках — у правой, на четырёх — у всех, кроме первой
const dividerClasses =
  'sm:[&:nth-child(even)]:border-l lg:[&:not(:first-child)]:border-l border-line'

export function Benefits() {
  return (
    <section id={anchors.about} className="relative z-10 -mt-10 lg:-mt-16">
      <div className="container-luna">
        <h2 className="sr-only">{sectionTitles.about}</h2>

        <Reveal>
          <ul className="grid overflow-hidden rounded-block border border-line bg-panel sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => {
              const Icon = icons[benefit.icon]

              return (
                <li
                  key={benefit.id}
                  className={`group flex items-start gap-4 p-5 sm:flex-col sm:gap-0 sm:p-6 lg:p-7 ${dividerClasses}`}
                >
                  <Icon
                    size={24}
                    strokeWidth={1.5}
                    className="react grow-text mt-0.5 shrink-0 origin-left text-green sm:mt-0"
                    aria-hidden
                  />

                  <div className="sm:mt-4">
                    <h3 className="react grow-text origin-left font-display text-h3 font-bold uppercase leading-snug text-text">
                      {benefit.title}
                    </h3>
                    <p className="mt-2 font-sans text-caption text-muted">
                      {benefit.text}
                    </p>
                  </div>
                </li>
              )
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
