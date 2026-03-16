import { MetadataRoute } from 'next'
import { products } from '../data/products'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://rawify.app'
  const locales = ['uk', 'en']

  const mainRoutes = locales.flatMap((locale) => [
    {
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1.0,
    },
  ])

  const productRoutes = locales.flatMap((locale) =>
    products.map((product) => ({
      url: `${baseUrl}/${locale}/coefficient/${product.value}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  )

  return [...mainRoutes, ...productRoutes]
}