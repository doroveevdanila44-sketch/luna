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
 * Разделители — просветы сетки (gap-px) на фоне --line: работают
 * одинаково при 1, 2 и 4 колонках без nth-child-правил.
 */
export function Benefits() {
  return (
    <section id={anchors.about} className="relative z-10 -mt-10 lg:-mt-16">
      <div className="container-luna">
        <h2 className="sr-only">{sectionTitles.about}</h2>

        <Reveal>
          <ul className="grid gap-px overflow-hidden rounded-block border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => {
              const Icon = icons[benefit.icon]

              return (
                <li
                  key={benefit.id}
                  className="flex items-start gap-4 bg-panel p-5 sm:flex-col sm:gap-0 sm:p-6 lg:p-7"
                >
                  <Icon
                    size={24}
                    strokeWidth={1.5}
                    className="mt-0.5 shrink-0 text-green sm:mt-0"
                    aria-hidden
                  />

                  <div className="sm:mt-4">
                    <h3 className="font-display text-h3 font-bold uppercase leading-snug text-text">
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
