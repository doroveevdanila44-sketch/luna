import type { Metadata } from 'next'

import { PriceTable } from '@/components/sections/PriceTable'
import { ComingSoon } from '@/components/ui/ComingSoon'
import { stubPages } from '@/data/stub-pages'

const page = stubPages['abonementy']

export const metadata: Metadata = {
  title: page.title,
  description: page.text,
}

export default function Page() {
  return (
    <>
      <ComingSoon title={page.title} text={page.text} />
      {/* Онлайн-покупки ещё нет, но цены показываем сразу — docs/CONTENT.md */}
      <PriceTable />
    </>
  )
}
