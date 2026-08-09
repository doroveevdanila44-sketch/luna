'use client'

import { Star } from 'lucide-react'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/ui/Reveal'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { contacts } from '@/data/contacts'
import { sectionLinks, sectionTitles, ui } from '@/data/home'
import { anchors } from '@/data/nav'
import { reviews, type Review } from '@/data/reviews'
import { useVisibleCount, type VisibleCounts } from '@/hooks/useVisibleCount'

/**
 * 1440 и 1024 — 3 карточки в ряд · 768 — 2 · 390 — одна на экран,
 * остальные листаются свайпом (поэтому на base показываем весь массив).
 * Срез — через .slice(), не через display:none. docs/CONTENT.md
 */
const COUNTS: VisibleCounts = { base: reviews.length, md: 2, lg: 3 }

const useIsomorphicLayoutEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect

function ReviewCard({ review }: { review: Review }) {
  const [expanded, setExpanded] = useState(false)
  const [clamped, setClamped] = useState(false)
  const textRef = useRef<HTMLParagraphElement | null>(null)

  // «Читать полностью» появляется, только если текст реально не поместился
  useIsomorphicLayoutEffect(() => {
    const node = textRef.current
    if (!node) return

    const measure = () => {
      if (expanded) return
      setClamped(node.scrollHeight - node.clientHeight > 1)
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(node)
    return () => observer.disconnect()
  }, [expanded])

  return (
    <Card interactive={false} className="h-full w-full">
      <div className="flex h-full flex-col p-5 lg:p-6">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-h3 font-bold uppercase text-text">
            {review.author}
          </h3>
          {review.date ? (
            <time dateTime={review.date} className="font-sans text-caption text-muted">
              {review.dateLabel}
            </time>
          ) : (
            <span className="font-sans text-caption text-muted">{review.dateLabel}</span>
          )}
        </div>

        <div
          className="mt-3 flex items-center gap-1"
          role="img"
          aria-label={`Оценка ${review.rating} из 5`}
        >
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              size={15}
              aria-hidden
              className={
                i < review.rating ? 'fill-green text-green' : 'text-line'
              }
            />
          ))}
        </div>

        <p
          ref={textRef}
          className={`mt-4 font-sans text-body text-muted ${
            expanded ? '' : 'line-clamp-3 lg:line-clamp-4'
          }`}
        >
          {review.text}
        </p>

        {clamped ? (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="mt-3 self-start font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-green transition-colors hover:text-green-dim"
          >
            {expanded ? ui.collapse : ui.readMore}
          </button>
        ) : null}
      </div>
    </Card>
  )
}

export function Reviews() {
  const visible = useVisibleCount(COUNTS)

  const ratingAside = (
    <span className="hidden font-sans text-caption text-muted sm:inline">
      {contacts.rating.value} на 2ГИС · {contacts.rating.reviewCount} отзывов
    </span>
  )

  return (
    <section id={anchors.reviews} className="section pt-0 lg:pt-0">
      <div className="container-luna">
        <SectionTitle
          title={sectionTitles.reviews}
          aside={ratingAside}
          link={{
            label: sectionLinks.reviews.label,
            href: contacts.maps2gis,
            external: true,
          }}
        />

        <ul className="no-scrollbar -mx-5 mt-8 flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto px-5 pb-1 sm:mx-0 sm:px-0 md:grid md:grid-cols-2 md:overflow-visible lg:mt-10 lg:grid-cols-3">
          {reviews.slice(0, visible).map((review, index) => (
            <Reveal
              as="li"
              key={review.id}
              delay={index * 70}
              className="flex w-[86%] shrink-0 snap-center md:w-auto"
            >
              <ReviewCard review={review} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
