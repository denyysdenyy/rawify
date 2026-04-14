import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://rawify.app'
  const locales = ['uk', 'en']

  return locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 1.0,
  }))
}