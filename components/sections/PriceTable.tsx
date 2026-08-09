import { contacts } from '@/data/contacts'
import { formatPrice, priceList, pricingDisclaimer } from '@/data/pricing'
import { sectionTitles } from '@/data/home'
import { Button } from '@/components/ui/Button'
import { SectionTitle } from '@/components/ui/SectionTitle'

/**
 * Полный прайс — docs/CONTENT.md, раздел «Абонементы».
 * Цены берутся из того же /data/pricing.ts, что и карточки на главной.
 */
export function PriceTable() {
  return (
    <section className="section pt-0 lg:pt-0">
      <div className="container-luna">
        <SectionTitle title={sectionTitles.pricing} />

        <ul className="mt-8 overflow-hidden rounded-block border border-line bg-panel">
          {priceList.map((row, index) => (
            <li
              key={row.id}
              className={`flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-5 py-4 sm:px-7 ${
                index > 0 ? 'border-t border-line' : ''
              }`}
            >
              <span className="font-sans text-body text-text">{row.title}</span>

              <span className="flex items-baseline gap-3">
                {row.basePrice ? (
                  <s className="font-sans text-caption text-muted">
                    {formatPrice(row.basePrice)}
                  </s>
                ) : null}
                <span className="font-display text-[17px] font-bold text-text sm:text-[19px]">
                  {formatPrice(row.price)}
                  {row.unit ? (
                    <span className="font-sans text-caption font-normal text-muted">
                      {' / '}
                      {row.unit}
                    </span>
                  ) : null}
                </span>
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-5 font-sans text-caption text-muted">{pricingDisclaimer}</p>

        <div className="mt-8">
          <Button href={contacts.phone.href} variant="primary" size="lg" withArrow>
            {contacts.phone.display}
          </Button>
        </div>
      </div>
    </section>
  )
}
