import type { Metadata } from 'next'

import { ComingSoon } from '@/components/ui/ComingSoon'
import { stubPages } from '@/data/stub-pages'

const page = stubPages['akcii']

export const metadata: Metadata = {
  title: page.title,
  description: page.text,
}

export default function Page() {
  return <ComingSoon title={page.title} text={page.text} />
}
