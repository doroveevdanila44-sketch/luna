import type { MetadataRoute } from 'next'

import { site } from '@/data/site'
import { stubPages } from '@/data/stub-pages'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', ...Object.keys(stubPages).map((slug) => `/${slug}`)]

  return routes.map((route) => ({
    url: `${site.url}${route}`,
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.5,
  }))
}
