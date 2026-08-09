import { ArrowRight } from 'lucide-react'

import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/ui/Reveal'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { contacts } from '@/data/contacts'
import { sectionLinks, sectionTitles } from '@/data/home'
import { anchors } from '@/data/nav'
import { formatPrice, plans, pricingDisclaimer } from '@/data/pricing'

/**
 * Три тарифа, как в макете. Цены — только из docs/CONTENT.md.
 * На 768 три карточки остаются в одном ряду, уменьшенными.
 */
export function Pricing() {
  return (
    <section id={anchors.pricing} className="section pt-0 lg:pt-0">
      <div className="container-luna">
        <SectionTitle title={sectionTitles.pricing} link={sectionLinks.pricing} />

        <ul className="mt-8 grid gap-4 md:grid-cols-3 lg:mt-10 lg:gap-5">
          {plans.map((plan, index) => (
            <Reveal
              as="li"
              key={plan.id}
              delay={index * 70}
              className="relative flex pt-3"
            >
              {plan.badge ? (
                <span className="absolute left-1/2 top-0 z-10 -translate-x-1/2 rounded-btn bg-green px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-bg">
                  {plan.badge}
                </span>
              ) : null}

              <Card highlighted={Boolean(plan.badge)} className="w-full">
                <div className="flex flex-1 flex-col p-5 lg:p-7">
                  <h3 className="font-display text-[clamp(15px,1.6vw,20px)] font-bold uppercase tracking-[0.02em] text-text">
                    {plan.title}
                  </h3>
                  <p className="mt-2 font-sans text-body text-muted">{plan.period}</p>

                  <p className="mt-5 font-sans text-body text-muted">
                    {plan.description}
                  </p>

                  <div className="mt-auto flex items-end justify-between gap-3 pt-8">
                    <div>
                      {plan.basePrice ? (
                        <s className="block font-sans text-caption text-muted">
                          {formatPrice(plan.basePrice)}
                        </s>
                      ) : null}
                      <span className="mt-1 block font-display text-price font-bold text-text">
                        {formatPrice(plan.price)}
                      </span>
                    </div>

                    <a
                      href={contacts.phone.href}
                      aria-label={`${plan.title}, ${plan.period} — ${formatPrice(plan.price)}. Позвонить и купить`}
                      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-btn border border-line text-green transition-colors hover:border-green hover:bg-green hover:text-bg"
                    >
                      <ArrowRight size={20} aria-hidden />
                    </a>
                  </div>
                </div>
              </Card>
            </Reveal>
          ))}
        </ul>

        <p className="mt-5 font-sans text-caption text-muted">{pricingDisclaimer}</p>
      </div>
    </section>
  )
}
